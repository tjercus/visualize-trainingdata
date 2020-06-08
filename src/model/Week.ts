import { Day } from "./Day";

export interface Week {
  startDate: string;
  days: Map<string, Day>;
}
