import React, { FunctionComponent } from "react";
import WeekSummariesView from "./WeekSummariesView";
import dataService from "./model/";

const WeekSummariesContainer: FunctionComponent = () => {
  // TODO use state when the user can pass filters/sorters to the service
  //useEffect(() => getWeekSummaries(), [])

  return <section>
    <WeekSummariesView header="Top 3 weeks based on distance" weekSummaries={dataService.getWeekRecords()} />
    <WeekSummariesView header="Weeks as a timeline" weekSummaries={dataService.getWeekSummaries()} />
  </section>;
};

export default WeekSummariesContainer;
