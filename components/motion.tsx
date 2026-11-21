import { Fragment, type CSSProperties } from 'react';

/**
 * Shared pieces of the site's CSS motion (see "Home-page load sequence" and
 * "Scroll reveals" in globals.css). The animations live in CSS so they start
 * at first paint; these helpers only set when each piece joins in.
 */

/** Delays a piece's entrance by `ms`, through the --d custom property. */
export const joinsAt = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/**
 * Sets `text` one letter per box so each can enter on its own beat, starting
 * at `startMs` and `stepMs` apart. `rise` (the home page's name) slides each
 * letter up into a window; `flip` (case-study names) turns each one down
 * into place like a split-flap departure board. Use inside a heading that carries
 * `aria-label={text}`: the letters are hidden from screen readers, which hear
 * the label as one phrase instead of letter by letter.
 */
export const LetterByLetter = ({
  text,
  startMs,
  stepMs,
  variant = 'rise',
}: {
  text: string;
  startMs: number;
  stepMs: number;
  variant?: 'rise' | 'flip';
}) => {
  const words = text.split(' ');

  return words.map((word, wordIndex) => {
    const lettersBefore = words.slice(0, wordIndex).join('').length;

    return (
      <Fragment key={`${word}-${wordIndex}`}>
        {wordIndex > 0 ? ' ' : null}
        <span
          aria-hidden='true'
          className={variant === 'rise' ? 'intro-mask' : 'intro-flip'}
        >
          {Array.from(word).map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={variant === 'rise' ? 'intro-char' : 'intro-flip-char'}
              style={joinsAt(startMs + (lettersBefore + letterIndex) * stepMs)}
            >
              {letter}
            </span>
          ))}
        </span>
      </Fragment>
    );
  });
};
