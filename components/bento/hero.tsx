"use client";

import { Mail } from "lucide-react";
import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AnimatedMark } from "@/components/logo";
import { profile } from "@/lib/content";
import { RiseWords, focusRing } from "./tiles";

/** The small corner tick from the reference, in the current text colour. */
export function CornerTick({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute right-3.5 top-3.5 size-2.5 border-r-2 border-t-2 border-current opacity-70 ${className}`}
    />
  );
}

/** Hero intro: the page's h1, photo ring (JD mark for now), email and a spinning badge. */
export function IntroCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const badgeTurn = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden rounded-[22px] bg-grape"
    >
      <span className="absolute left-0 top-0 z-10 flex items-center gap-1.5 rounded-br-[18px] bg-navy py-2 pl-4 pr-4 text-xs font-semibold">
        <span aria-hidden="true">✦</span> About me
      </span>

      <motion.div
        style={{ y: photoY }}
        className="absolute inset-x-0 top-[12%] grid place-items-center"
      >
        <div className="relative w-[min(58%,190px)]">
          <div className="photo-ring grid aspect-square w-full place-items-center rounded-full border-[3px] border-white">
            <div className="grid aspect-square w-[80%] place-items-center rounded-full bg-white">
              <AnimatedMark className="w-[52%] text-navy" />
            </div>
          </div>
          {/* Sticker badge on the photo ring. */}
          <motion.div
            style={{ rotate: badgeTurn }}
            className="absolute -bottom-4 -right-8 grid size-[64px] place-items-center rounded-full bg-navy ring-4 ring-grape sm:size-[72px]"
            aria-hidden="true"
          >
            {/* The spin sits on a plain div: Chrome only runs transform animations off the main thread on HTML elements, not on an <svg>. */}
            <div className="badge-spin absolute inset-0">
              <svg viewBox="0 0 100 100" className="size-full">
                <defs>
                  <path
                    id="badge-circle"
                    d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0"
                  />
                </defs>
                <text
                  fontSize="9.6"
                  fill="currentColor"
                  fontFamily="var(--font-jetbrains), monospace"
                  letterSpacing="1.6"
                >
                  <textPath href="#badge-circle">
                    FRONT-END DEVELOPER · OPEN TO WORK ·
                  </textPath>
                </text>
              </svg>
            </div>
            <span className="size-3.5 rounded-full bg-white" />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-5 bottom-5">
        <h1 className="leading-[0.92] tracking-[-0.02em]">
          <span className="block text-3xl font-light sm:text-4xl">
            <RiseWords text="I’m" />
          </span>{" "}
          <span className="block text-[2.6rem] font-bold sm:text-5xl lg:text-[2.6rem] xl:text-5xl">
            <span className="block">
              <RiseWords text="John" start={1} />
            </span>{" "}
            <span className="block">
              <RiseWords text="Martin" start={2} />
            </span>
          </span>
          <span className="sr-only"> Demonteverde, {profile.role}</span>
        </h1>
        <a
          href={`mailto:${profile.email}`}
          className={`mt-3 inline-flex max-w-full items-center gap-1.5 truncate border-b border-dashed border-white/60 pb-0.5 text-xs transition-colors hover:border-white ${focusRing}`}
        >
          <span className="truncate">{profile.email}</span>
          <Mail size={13} aria-hidden="true" className="shrink-0" />
        </a>
      </div>
    </div>
  );
}

/** The big "Portfolio" wordmark. It drifts left a little as the hero scrolls away. */
export function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -80]);
  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-end overflow-hidden px-1 pb-1"
    >
      <motion.p
        style={{ x }}
        className="relative pr-8 text-[clamp(3rem,13vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.045em] lg:text-[clamp(4rem,8vw,7.5rem)]"
      >
        <RiseWords text="Portfolio" />
        <span
          aria-hidden="true"
          className="absolute right-0 top-[0.08em] size-[0.18em] border-r-[0.06em] border-t-[0.06em] border-ink"
        />
      </motion.p>
    </div>
  );
}

/** Showreel slot. Until a video exists the play button says it's coming soon. */
export function VideoTile({
  src,
  poster,
  label = "Showreel",
}: {
  src?: string;
  poster?: string;
  label?: string;
}) {
  const [said, setSaid] = useState(false);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  if (src && playing) {
    return (
      <video
        ref={(v) => v?.focus()}
        tabIndex={0}
        src={src}
        poster={poster}
        aria-label={label}
        controls
        autoPlay
        playsInline
        className="absolute inset-0 size-full rounded-[22px] bg-navy object-cover"
      />
    );
  }

  if (src) {
    // Until play is pressed the tile is just the poster: no <video>, no player controls to lay
    // out and nothing downloaded, so the first paint stays light.
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play ${label}`}
        className={`group absolute inset-0 overflow-hidden rounded-[22px] bg-navy ${focusRing}`}
      >
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element -- preloaded in page.tsx; already small
          <img src={poster} alt="" width={960} height={540} fetchPriority="high" className="size-full object-cover" />
        )}
        <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-active:scale-95">
          <span className="ml-1 border-y-[9px] border-l-[14px] border-y-transparent border-l-navy" />
        </span>
      </button>
    );
  }

  const say = () => {
    setSaid(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaid(false), 2200);
  };

  return (
    <>
      <button
        type="button"
        onClick={say}
        aria-label="Play showreel"
        className={`video-poster group absolute inset-0 overflow-hidden rounded-[22px] border border-line text-left ${focusRing}`}
      >
        <CornerTick className="text-white" />
        <span className="play-pulse absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 transition-transform duration-300 motion-safe:group-hover:scale-110">
          <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-navy" />
        </span>
        <span className="absolute bottom-4 left-4 text-xs text-ink-2">
          Showreel · coming soon
        </span>
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-tuscan px-3 py-1 text-xs font-semibold text-navy transition-all duration-300 motion-reduce:transition-none ${
          said ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        {said ? "Showreel coming soon" : ""}
      </span>
    </>
  );
}

/** A number that counts up from 0 the first time it scrolls into view. Renders the final value on the server. */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || typeof IntersectionObserver === "undefined") return;
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const controls = animate(0, to, {
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => (el.textContent = String(Math.round(v))),
        });
        stop = () => controls.stop();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
    };
  }, [to, reduce]);
  return <span ref={ref}>{to}</span>;
}

const TONE = { vanilla: "bg-banana", green: "bg-emerald" } as const;

export function StatTile({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: keyof typeof TONE;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end rounded-[22px] p-4 text-navy ${TONE[tone]}`}
    >
      <CornerTick />
      <span className="text-[2.5rem] font-extrabold leading-none tracking-[-0.03em] sm:text-5xl">
        <CountUp to={value} />
      </span>
      <span className="mt-1 text-sm font-medium">{label}</span>
    </div>
  );
}
