import type {
  Animal as PrismaAnimal,
  Care as PrismaCare,
  CareStep as PrismaCareStep,
  Day as PrismaDay,
} from '@prisma/client';

export enum State {
  Completed,
  NotCompleted,
  Partial,
}

export type Animal = PrismaAnimal & {
  care: Care[];
};

export type Care = PrismaCare & {
  steps: CareStep[];
}

export type CareStep = PrismaCareStep

export type Day = PrismaDay;
