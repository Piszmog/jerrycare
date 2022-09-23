export enum State {
  Completed,
  NotCompleted,
  Partial,
}

export type CheckedEvent = {
  id: number;
  checked: boolean;
}

export type User = {
  id: number;
  name: string;
  email: string;
  auth_user_id: string;
}

export type Animal = {
  id: number;
  name: string;
  created_at: string | Date;

  care?: CareDetails[];
  days?: Day[];
}

export type AnimalOnUser = {
  user_id: number;
  animal_id: number;
  role: Role;
  created_at: string | Date;
  updated_at: string | Date;

  user?: User;
  animal?: Animal;
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type CareDetails = {
  id: number;
  animal_id: number;
  title: string;
  description?: string;
  link?: string;
  complete_by: string;

  steps?: StepDetails[];
}

export type DayCareResult = {
  care_id: number;
  day_id: number;
  completed_state: CompletedState;
  completed_at: string | Date | null;
}

export enum CompletedState {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
  Partial = 'PARTIAL',
}

export type StepDetails = {
  id: number;
  care_id: number;
  title: string;
  description?: string;
  link?: string;
}

export type DayStepResult = {
  step_id: number;
  day_id: number;
  completed: boolean;
  completed_at: string | Date | null;
}

export const getCompletedState = (results: DayStepResult[]): CompletedState => {
  const isComplete = results.every((step) => step.completed);
  if (isComplete) {
    return CompletedState.Completed;
  }

  const isPartial = results.some((step) => step.completed);
  if (isPartial) {
    return CompletedState.Partial;
  }

  return CompletedState.NotCompleted;
};


export type Day = {
  id: number;
  animal_id: number;
  date: string;
  updated_at: string;

  day_care_results?: DayCareResult[];
  day_step_results?: DayStepResult[];
}
