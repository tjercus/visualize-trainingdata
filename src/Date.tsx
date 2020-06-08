import React, { FunctionComponent } from "react";
import { NL_DATE_FORMAT } from "./model/utils";
import moment from "moment";

interface Props {
  date: string;
}

const Date: FunctionComponent<Props> = ({ date }) => {
  return <span>{moment(date).format(NL_DATE_FORMAT)}</span>;
};

export default Date;
