/** Local time in Bacolod (Philippine Standard Time, UTC+8, no daylight saving), e.g. "3:42 PM". */
export function localTime(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" }).format(now);
}
