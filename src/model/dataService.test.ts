import { getWeekSummaries } from "./dataService";
import { WeekSummary } from "./WeekSummary";

test("getWeeklySummaries", () => {
  const weekSummaries: Array<WeekSummary> = getWeekSummaries();
});
