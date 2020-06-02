import {
  addDays, addDurations,
  convertDateTimeToDate,
  convertMapToArray, getActivitiesFromWeek,
  getSunday, makeAverageDistance, makeAverageDuration, makeTotalDistance, makeTotalDuration,
  makeWeeks,
  newActivity,
  newDay,
  newWeek
} from "./utils";
import {Activity} from "./Activity";

// 23 may = zaterdag. It's sunday was 17 may
// 24 may = zondag.   It's sunday was 24 may
// 25 may = maandag.  It's sunday was 24 may

test("getSunday", () => {
  // wrapping around the change of year
  expect(getSunday("2019-12-30 18:00:00")).toEqual("2019-12-29");
  expect(getSunday("2020-01-01 18:00:00")).toEqual("2019-12-29");
  expect(getSunday("2020-01-05 18:00:00")).toEqual("2020-01-05");
  // in the middle of a month
  expect(getSunday("2020-05-23 18:00:00")).toEqual("2020-05-17");
  expect(getSunday("2020-05-24 18:00:00")).toEqual("2020-05-24");
  expect(getSunday("2020-05-25 18:00:00")).toEqual("2020-05-24");
});

test("addDays", () => {
  expect(addDays("2020-05-05", 2)).toEqual("2020-05-07");
  expect(addDays("2020-05-31", 2)).toEqual("2020-06-02");
});

test("convertDateTimeToDate", () => {
  expect(convertDateTimeToDate("2020-05-18 12:34:10")).toEqual("2020-05-18");
});

test("makeWeeks", () => {
  const activities: Array<Activity> = [
    newActivity({id: "one", dateTime: "2020-05-18 10:15:00"}),
    newActivity({id: "two", dateTime: "2020-05-19 07:12:00"}),
    newActivity({id: "three", dateTime: "2020-05-19 14:30:00"}),
    newActivity({id: "four", dateTime: "2020-05-31 06:21:00"}),
  ];
  const weeks = makeWeeks(activities);
  expect(weeks.size).toEqual(2);
  const firstWeek = weeks.get("2020-05-17");
  expect(firstWeek).not.toBeNull();
  if (firstWeek) {
    const firstWeekDays = firstWeek.days;
    expect(firstWeekDays.size).toEqual(7);
    const eighteenth = firstWeekDays.get("2020-05-18");
    if (typeof eighteenth !== "undefined") {
      expect(eighteenth.activities.size).toEqual(1);
    } else {
      throw new Error("eighteenth not found in: " + JSON.stringify(firstWeek));
    }
    const nineteenth = firstWeekDays.get("2020-05-19");
    if (nineteenth) {
      // console.log(nineteenth);
      expect(nineteenth.activities.size).toEqual(2);
    } else {
      throw new Error("nineteenth not found");
    }
  }
  const secondWeek = weeks.get("2020-05-31");
  //console.log(secondWeek);
  expect(secondWeek).not.toBeNull();
  if (secondWeek) {
    const secondWeekDays = secondWeek.days;
    expect(secondWeekDays.size).toEqual(7);
    const thirtyone = secondWeekDays.get("2020-05-31");
    if (typeof thirtyone !== "undefined") {
      expect(thirtyone.activities.size).toEqual(1);
    } else {
      throw new Error("thirtyone not found in: " + JSON.stringify(secondWeek));
    }
  }
});

test("convertMapToArray", () => {
  const myMap = new Map();
  myMap.set("one", "onevalue");
  myMap.set("two", "twovalue");
  const arr = convertMapToArray(myMap);
  expect(arr).toEqual(["onevalue", "twovalue"]);
});

test("getActivitiesFromWeek", () => {
  const week = newWeek({startDate: "2020-05-15"});
  const dayOne = week.days.get("2020-05-15") || newDay();
  dayOne.activities.set("2020-05-15 10:00:00", newActivity({dateTime: "2020-05-15 10:00:00"}));
  const dayThree = week.days.get("2020-05-17") || newDay();
  dayThree.activities.set("2020-05-17 15:30:00", newActivity({dateTime: "2020-05-17 15:30"}));
  const activities = getActivitiesFromWeek(week);
  expect(activities).toBeInstanceOf(Array);
});

test("makeAverageDistance", () => {
  const activities = [
    newActivity({distance: 12.2}),
    newActivity(),
    newActivity({distance: 6.58})
  ];
  const average = makeAverageDistance(activities);
  expect(average).toEqual(6.260000000000001);
});

test("addDurations", () => {
  expect(addDurations("01:10:23", "00:53:12"))
    .toEqual("02:03:35");
});

// test("makeAverageDuration", () => {
//   const activities = [
//     newActivity({duration: "01:10:23"}),
//     newActivity({duration: "00:53:12"})
//   ];
//   expect(makeAverageDuration(activities)).toEqual("01:01:37");
// });

test("makeTotalDistance", () => {
  const activities = [
    newActivity({distance: 23.12}),
    newActivity({distance: 11}),
    newActivity({distance: 3.3}),
  ];
  expect(makeTotalDistance()).toEqual(0);
  expect(makeTotalDistance(activities)).toEqual(37.42);
});

test("makeTotalDuration", () => {
  const activities = [
    newActivity({duration: "01:10:23"}),
    newActivity({duration: "00:53:12"})
  ];
  expect(makeTotalDuration(activities)).toEqual("02:03:35");
});

test("makeWeekSummary", () => {
  const activities: Array<Activity> = [];
  const weeks = makeWeeks(activities);

});