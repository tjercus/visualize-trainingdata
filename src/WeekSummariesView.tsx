import React, {FunctionComponent} from "react";
import {WeekSummary} from "./model/WeekSummary";

interface Props {
  weekSummaries: Array<WeekSummary>; // TODO proper report definition
}

// weekSummaries.map(weekSummary => weekSummary.weekStart)

const WeekSummariesView: FunctionComponent<Props> = ({weekSummaries}) => {
  return (
    <div></div>
  )
};

export default WeekSummariesView;