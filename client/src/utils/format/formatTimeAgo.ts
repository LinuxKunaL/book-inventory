export function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "second"],        // 60 seconds = 1 min
    [60, "minute"],        // 60 mins = 1 hr
    [24, "hour"],          // 24 hrs = 1 day
    [7, "day"],            // 7 days = 1 week
    [4.34524, "week"],     // ~4.3 weeks = 1 month
    [12, "month"],         // 12 months = 1 year
  ];

  let unit = "second";
  let count = seconds;

  for (let [step, name] of intervals) {
    if (count < step) {
      unit = name;
      break;
    }
    count = Math.floor(count / step);
    unit = name;
  }

  return count + " " + unit + (count > 1 ? "s" : "") + " ago";
}
