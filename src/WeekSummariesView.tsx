import React, { FunctionComponent } from "react";
import { WeekSummary } from "./model/WeekSummary";
import WeekSummaryView from "./WeekSummaryView";

interface Props {
  weekSummaries: Array<WeekSummary>; // TODO proper report definition
}

// weekSummaries.map(weekSummary => weekSummary.weekStart)

const WeekSummariesView: FunctionComponent<Props> = ({ weekSummaries }) => {
  // className={"tile is-ancestor"}
  return (
    <section className={"vt-weeksummaries tile is-ancestor"}>
      {weekSummaries.map((weekSummary) => (
        <WeekSummaryView
          key={weekSummary.startDate}
          weekSummary={weekSummary}
        />
      ))}
    </section>
  );
};

export default WeekSummariesView;
