import React, {FunctionComponent, useEffect} from "react";
import WeekSummariesView from "./WeekSummariesView";
import {getWeekSummaries} from "./model/dataService";

const WeekSummariesContainer: FunctionComponent = () => {

  // useEffect(() => getWeekSummaries(), [])

  return (<WeekSummariesView weekSummaries={[]} />);
};

export default WeekSummariesContainer;