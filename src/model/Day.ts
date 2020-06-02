import {Activity} from "./Activity";

export interface Day {
  date: string;
  activities: Map<string, Activity>;
}