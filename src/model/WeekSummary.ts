
export interface WeekSummary {
  averageDistance: number;
  averageDuration: string;
  distance: number;
  duration: string; // Moment.Duration or custom type?
  weekStart: string;
}