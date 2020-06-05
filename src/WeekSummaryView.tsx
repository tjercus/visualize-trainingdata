import React, { FunctionComponent } from "react";
import {WeekSummary} from "./model/WeekSummary";

interface Props {
  weekSummary: WeekSummary;
}
 
const WeekSummaryView: FunctionComponent<Props> = ({weekSummary}) => {
 return (
  <div>
    {weekSummary.startDate}
  </div>
 );
};

export default WeekSummaryView;