import {getWeekSummaries} from "./dataService";
import {WeekSummary} from "./WeekSummary";
import {Activity} from "./Activity";

const data: Array<Activity> = [
  { },
  {}
];

test("getWeeklySummaries", () => {
  const weekSummaries: Array<WeekSummary> = getWeekSummaries(data);
});