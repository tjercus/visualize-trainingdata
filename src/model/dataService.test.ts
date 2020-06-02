import {getWeekSummaries} from "./dataService";
import {WeekSummary} from "./WeekSummary";

const data: Array<Activity> = [
  { },
  {}
];

test("getWeeklySummaries", () => {
  const weekSummaries: Array<WeekSummary> = getWeekSummaries(data);
});