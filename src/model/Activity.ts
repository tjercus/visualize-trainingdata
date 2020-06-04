enum HillType {
  NONE,
  MODERATE,
  STEEP
}

export enum ActivityState {
  COMPLETED,
  PLANNED,
  SKIPPED
}

export enum ActivityType {
  CYCLING = "Cycling",
  RUNNING = "Running",
  SWIMMING = "Swimming",
}

export enum TrainingType {
  EASY,
  INTERVAL,
  LONG,
  MIXED,
  PROGRESSIVE,
  RECOVERY
}

interface Material {
  shoes?: string;
  socks?: string;
  watch?: string;
}

export interface Activity {
  dateTime: string;
  distance?: number;
  duration?: string;
  hills?: HillType;
  id: string;
  material?: Material;
  notes?: string;
  RPE?: number;
  state: ActivityState;
  type: ActivityType;
  weekNr?: number;
}