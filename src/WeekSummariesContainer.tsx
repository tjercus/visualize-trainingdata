import React, {FunctionComponent, useEffect} from "react";
import WeekSummariesView from "./WeekSummariesView";
import dataService from "./model/";

const WeekSummariesContainer: FunctionComponent = () => {

  // TODO use state when the user can pass filters/sorters to the service
  //useEffect(() => getWeekSummaries(), [])

  return (<WeekSummariesView weekSummaries={dataService.getWeekSummaries()} />);
};

export default WeekSummariesContainer;