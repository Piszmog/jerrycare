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

  care?: Care[];
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

export type Care = {
  id: number;
  animal_id: number;
  title: string;
  description?: string;
  link?: string;
  completed_state: CompletedState;
  completed_at: string | Date | null;
  complete_by: string;

  steps?: Step[];
}

export const getCompletedState = (steps: Step[]): CompletedState => {
  const isComplete = steps.every((step) => step.completed);
  if (isComplete) {
    return CompletedState.Completed;
  }

  const isPartial = steps.some((step) => step.completed);
  if (isPartial) {
    return CompletedState.Partial;
  }

  return CompletedState.NotCompleted;
};

export enum CompletedState {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
  Partial = 'PARTIAL',
}

export type Step = {
  id: number;
  care_id: number;
  title: string;
  description?: string;
  link?: string;
  completed: boolean;
  completed_at: string | Date | null;
}

export type Day = {
  id: number;
  animal_id: number;
  date: string;
  updated_at: string;
}
