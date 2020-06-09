import moment, { Duration, Moment } from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { WeekSummary } from "./WeekSummary";
import { Week } from "./Week";
import { Day } from "./Day";
import { Activity, ActivityState, ActivityType } from "./Activity";
import { Measurable } from "./Measurable";
// TODO perhaps switch to Luxon

const ISO_DATE = "YYYY-MM-DD";
export const NL_DATE_FORMAT = "DD-MM-YYYY";
const EMPTY_DURATION = "00:00:00";

// @ts-ignore
momentDurationFormatSetup(moment);

// precisionRound :: number -> number -> number
export const precisionRound = (number: number, precision: number): number => {
  if (precision < 0) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
  return +(Math.round(Number(number + "e+" + precision)) + "e-" + precision);
};

// get reduce for fp-ts Array module
// const average = xs => reduce(add, 0, xs) / xs.length;

export const isARunningActivity = (
  activity: Activity = newActivity()
): boolean => activity.type === "Running";

/**
 * Compare two activities by dateTime
 * @param {Activity} actOne
 * @param {Activity} actTwo
 * @returns {number} difference
 */
// byDateTimeAscending :: Activity -> Activity -> number
export const byDateTimeAscending = (
  actOne: Activity,
  actTwo: Activity
): number => moment(actOne.dateTime).diff(moment(actTwo.dateTime));

export const byDistanceDescending = (
  one: Measurable,
  two: Measurable
): number => two.distance - one.distance;

/**
 * Given a date return it's previous sunday
 *  and return it's ISO date part
 * @param {string} dateTimeStr in pseudo-ISO format
 * @returns {string}
 */
// TODO perhaps make a JustTheDate object instead of string
export const getSunday = (dateTimeStr: string): string => {
  const date: Moment = moment(dateTimeStr);
  const dnr: number = date.day(); // 30 = 1
  return date.subtract(dnr, "days").format(ISO_DATE);
};

/**
 * @param {string} date in ISO - no time
 * @param {number} nrOfDays
 */
export const addDays = (date: string, nrOfDays: number): string =>
  moment(date).add(nrOfDays, "days").format(ISO_DATE);

/**
 * Basically return the date part from dateTime string
 * @param {string} dateTime
 * @returns {string} date
 */
export const convertDateTimeToDate = (dateTime: string) =>
  dateTime.substr(0, 10);

/**
 * factory function to make new empty object with minimal and sane defaults.
 * Optionally pass properties that will override the defaults
 */
export const newActivity = (props: Object = {}): Activity => ({
  ...{
    dateTime: "",
    distance: 0,
    duration: "",
    id: "",
    state: ActivityState.PLANNED,
    type: ActivityType.RUNNING,
  },
  ...props,
});

/**
 * Make a new Day with optional props which override the defaults
 * @param props
 */
export const newDay = (props: Object = {}): Day => ({
  ...{ date: "", activities: new Map() },
  ...props,
});

/**
 * Make a new week with optional props. When startDate is provided,
 *  then the days from this day forward are created
 * @param {Object} props
 * @returns {Week} week
 */
export const newWeek = (props: Object = {}): Week => {
  const newDays = new Map();
  if ("startDate" in props) {
    newDays.set(props["startDate"], newDay({ date: props["startDate"] }));
    newDays.set(
      addDays(props["startDate"], 1),
      newDay({ date: addDays(props["startDate"], 1) })
    );
    newDays.set(
      addDays(props["startDate"], 2),
      newDay({ date: addDays(props["startDate"], 2) })
    );
    newDays.set(
      addDays(props["startDate"], 3),
      newDay({ date: addDays(props["startDate"], 3) })
    );
    newDays.set(
      addDays(props["startDate"], 4),
      newDay({ date: addDays(props["startDate"], 4) })
    );
    newDays.set(
      addDays(props["startDate"], 5),
      newDay({ date: addDays(props["startDate"], 5) })
    );
    newDays.set(
      addDays(props["startDate"], 6),
      newDay({ date: addDays(props["startDate"], 6) })
    );
  }
  return { ...{ startDate: "", days: newDays }, ...props };
};

/**
 * Partition list of activities into an array of weeks with days in them
 * @param {Array<Activity>} activities
 * @returns {Map<string, Week>} weeks
 */
export const makeWeeks = (
  activities: Array<Activity> = []
): Map<string, Week> => {
  return activities
    .sort(byDateTimeAscending)
    .filter(isARunningActivity)
    .reduce((weeks: Map<string, Week>, activity = newActivity()) => {
      const sun = getSunday(activity.dateTime);
      const activityDate = convertDateTimeToDate(activity.dateTime);
      // TODO use ADT's to make more declarative
      // fromNullable(activities).
      // getFromMapSafely(weeks, sun).
      let weekForActivity = weeks.get(sun) || newWeek({ startDate: sun });
      const dayForActivity =
        weekForActivity.days.get(activityDate) ||
        newDay({ date: activityDate });
      dayForActivity.activities.set(activity.dateTime, activity);
      return weeks.set(sun, weekForActivity);
    }, new Map());
};

// export const mapOverMap = (fn: Function, theMap: Map<string, any>): Map<string, any> => {
//   theMap
// }

/**
 * Create an Array with the values from a Map, discarding the keys
 * @param {Map<string, any>} map
 */
export const convertMapToArray = (map: Map<string, any>): Array<any> =>
  Array.from(map.values());

export const padDuration = (duration: string): string =>
  duration.length === 5 ? "00:" + duration : duration;

/**
 * Add two durations into a new duration
 * @param {string} aDuration - HH:MM:SS
 * @param {string} anotherDuration - HH:MM:SS
 * @returns {string} - HH:MM:SS
 */
export const addDurations = (
  aDuration: string,
  anotherDuration: string
): string => {
  const durationOne: Duration = moment.duration(padDuration(aDuration));
  const durationTwo: Duration = moment.duration(padDuration(anotherDuration));
  return durationOne.add(durationTwo).format("HH:mm:ss");
};

/**
 * Get all activities from a Week and put them in an Array
 * @param {Week} week
 * @returns {Array<Activity>} activities
 */
export const getActivitiesFromWeek = (week: Week): Array<Activity> => {
  let activities = [] as Array<Activity>;
  week.days.forEach((day: Day, key: string) => {
    activities = activities.concat(...convertMapToArray(day.activities));
  });
  convertMapToArray(week.days).map((day) => day.activities.values(), week.days);
  return activities;
};

export const makeTotalDistance = (activities: Array<Activity> = []): number =>
  precisionRound(
    activities
      .map((activity) => activity.distance || 0)
      .reduce((sum: number, distance: number) => sum + distance, 0),
    2
  );

export const makeAverageDistance = (activities: Array<Activity> = []): number =>
  precisionRound(makeTotalDistance(activities) / activities.length, 2);

export const makeAverageDuration = (activities: Array<Activity> = []): string =>
  makeTotalDuration(activities); // / activities.length // TODO divide a duration by a number

/**
 * TODO hindly milner
 * @param activities
 */
export const makeTotalDuration = (activities: Array<Activity> = []): string =>
  activities
    .map((activity) => activity.duration || EMPTY_DURATION)
    .reduce(
      (sum: string, duration: string) => addDurations(sum, duration),
      EMPTY_DURATION
    );

/**
 * @param {Week} week - containing days which contain activities
 */
export const makeWeekSummary = (week: Week): WeekSummary => {
  const activities = getActivitiesFromWeek(week);
  return {
    averageDistance: makeAverageDistance(activities),
    averageDuration: "unknown",
    distance: makeTotalDistance(activities),
    duration: makeTotalDuration(activities),
    nrOfActivities: activities.length,
    startDate: week.startDate,
  } as WeekSummary;
};
