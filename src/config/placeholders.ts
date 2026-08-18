/**
 * Template placeholders, and how the site treats them.
 *
 * This project ships with `*_PLACEHOLDER` tokens standing in for details only
 * the team can supply — names, meeting times, sponsor logos. A half-filled
 * config is the normal state of a site like this, so the rule is that a
 * placeholder is never rendered: the component drops the row, hides the
 * section, or substitutes plain language. A visitor reading
 * `SPONSOR_NAME_PLACEHOLDER` learns strictly less than they would from a
 * section that is honestly empty.
 */

/**
 * True while a value is still a template token, or simply blank.
 *
 * The match is case-insensitive because the template writes the marker two
 * ways: as a token in short fields (`SPONSOR_NAME_PLACEHOLDER`) and as prose in
 * long ones ("Short bio placeholder — what this student is building"). Both are
 * template text and neither belongs on the page. The cost is that real copy
 * containing the word "placeholder" would be suppressed; no copy on this site
 * does, and a sentence that needs the word can say "stand-in" instead.
 */
export function isPlaceholder(value: string): boolean {
  return value.trim().length === 0 || value.toLowerCase().includes('placeholder')
}

/** The value if it is real, otherwise `fallback` — for copy that must render. */
export function orFallback(value: string, fallback: string): string {
  return isPlaceholder(value) ? fallback : value
}
