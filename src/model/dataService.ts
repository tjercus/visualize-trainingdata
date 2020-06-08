import { WeekSummary } from "./WeekSummary";
import { Activity } from "./Activity";
import runkeeperActivities from "../model/data/runkeeper.json";
import { Period } from "./Period";
import { convertMapToArray, makeWeeks, makeWeekSummary } from "./utils";

/**
 * Service object has no state but acts as gateway of API to the View layer.
 * It knows where to get the data and allows the View layer to pass in filtering
 * parameters to modify the returned data sets.
 */

/**
 * @param {Period} period - from start to end date
 */
export const getWeekSummaries = (period?: Period): Array<WeekSummary> => {
  const weeks = makeWeeks(runkeeperActivities as Array<Activity>);
  // TODO apply filter for period
  return convertMapToArray(weeks).map((week) => makeWeekSummary(week));
};

// ---------------- incubator functions below ------------------

// what return type would this require? a TopThree type?
export const getWeekRecords = () => {};

export const getWeeksAbove100 = () => {};
export const getWeeksWith3plusActivitiesOf20plus = () => {};
export const getWeeksWithActivitiesOf30plus = () => {};
