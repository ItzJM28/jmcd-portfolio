import { Fragment, type CSSProperties } from "react";

/** Splits a line into words that rise out of a mask, one after another. */
export function SplitWords({
  text,
  start = 0,
  step = 70,
}: {
  text: string;
  start?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="split-word">
            <span style={{ "--d": `${start + i * step}ms` } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** A word that types itself in, character by character. */
export function TypeIn({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <span
      className="type"
      style={{ "--n": text.length, "--t": `${start}ms` } as CSSProperties}
    >
      {text}
    </span>
  );
}

/** Inline style that sets the stagger delay used by the reveal CSS. */
export function delay(ms: number) {
  return { "--d": `${ms}ms` } as CSSProperties;
}
