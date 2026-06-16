import * as tls from "node:tls";

export const runtime = "nodejs";

const gmailHost = "smtp.gmail.com";
const gmailPort = 465;
const fallbackEmail = "jmc.demonteverde@gmail.com";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = normalizeField(payload.name);
  const email = normalizeField(payload.email);
  const message = normalizeField(payload.message);

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const gmailUser = process.env.GMAIL_USER ?? fallbackEmail;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.CONTACT_TO_EMAIL ?? fallbackEmail;

  if (!gmailAppPassword) {
    return Response.json(
      {
        error:
          "Email is not configured. Add GMAIL_APP_PASSWORD to your environment.",
      },
      { status: 500 },
    );
  }

  try {
    await sendMail({
      from: gmailUser,
      to: recipient,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return Response.json(
      { error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendMail({
  from,
  to,
  replyTo,
  subject,
  text,
}: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}) {
  const socket = tls.connect({
    host: gmailHost,
    port: gmailPort,
    servername: gmailHost,
  });

  socket.setEncoding("utf8");
  socket.setTimeout(15000);

  let buffer = "";
  let expectedCode: number | null = null;
  let resolver: (() => void) | null = null;
  let rejecter: ((error: Error) => void) | null = null;

  const waitFor = (code: number) =>
    new Promise<void>((resolve, reject) => {
      expectedCode = code;
      resolver = resolve;
      rejecter = reject;
      flushBuffer();
    });

  const write = (command: string) => {
    socket.write(`${command}\r\n`);
  };

  const close = () => {
    socket.end();
  };

  socket.on("data", (chunk) => {
    buffer += chunk;
    flushBuffer();
  });

  socket.on("error", (error) => {
    rejecter?.(error);
  });

  socket.on("timeout", () => {
    rejecter?.(new Error("SMTP connection timed out."));
    socket.destroy();
  });

  function flushBuffer() {
    if (expectedCode === null || !buffer.includes("\r\n")) {
      return;
    }

    const lines = buffer.split("\r\n");
    buffer = lines.pop() ?? "";

    const finalLine = lines.findLast((line) =>
      line.startsWith(`${expectedCode} `),
    );

    if (!finalLine) {
      const errorLine = lines.find((line) => /^[45]\d\d[ -]/.test(line));
      if (errorLine) {
        const reject = rejecter;
        resetWaiters();
        reject?.(new Error(errorLine));
      }
      return;
    }

    const resolve = resolver;
    resetWaiters();
    resolve?.();
  }

  function resetWaiters() {
    expectedCode = null;
    resolver = null;
    rejecter = null;
  }

  await waitFor(220);
  write("EHLO localhost");
  await waitFor(250);
  write("AUTH LOGIN");
  await waitFor(334);
  write(Buffer.from(from).toString("base64"));
  await waitFor(334);
  write(Buffer.from(process.env.GMAIL_APP_PASSWORD ?? "").toString("base64"));
  await waitFor(235);
  write(`MAIL FROM:<${from}>`);
  await waitFor(250);
  write(`RCPT TO:<${to}>`);
  await waitFor(250);
  write("DATA");
  await waitFor(354);
  write(buildMessage({ from, to, replyTo, subject, text }));
  await waitFor(250);
  write("QUIT");
  close();
}

function buildMessage({
  from,
  to,
  replyTo,
  subject,
  text,
}: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}) {
  return [
    `From: ${formatAddress(from)}`,
    `To: ${formatAddress(to)}`,
    `Reply-To: ${formatAddress(replyTo)}`,
    `Subject: ${sanitizeHeader(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    text.replace(/\r?\n/g, "\r\n").replace(/^\./gm, ".."),
    ".",
  ].join("\r\n");
}

function formatAddress(address: string) {
  return `<${sanitizeHeader(address)}>`;
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}
