import React, { FunctionComponent } from "react";
import { WeekSummary } from "./model/WeekSummary";
import Date from "./Date";

interface Props {
  weekSummary: WeekSummary;
}

const WeekSummaryView: FunctionComponent<Props> = ({ weekSummary }) => {
  return (
    <div className={"tile is-child"}>
      <div className={"card"}>
        <div className={"card-header vt-weeksummary-header"}>
          <Date date={weekSummary.startDate} />
        </div>
        <div className="card-content">
          <dl>
            <dt>Distance</dt>
            <dd>{weekSummary.distance}</dd>
            <dt>Duration</dt>
            <dd>{weekSummary.duration}</dd>
            <dt>Activities</dt>
            <dd>{weekSummary.nrOfActivities}</dd>
            <dt>avg-dist.</dt>
            <dd>{weekSummary.averageDistance}</dd>
            <dt>avg-dur.</dt>
            <dd>{weekSummary.averageDuration}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default WeekSummaryView;
