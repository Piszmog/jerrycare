import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

export const getUser = (authUserId: string) =>
  database.user.findFirst({
    where: { authUserId },
    include: {
      animals: true,
    },
  });

export const getAnimal = (id: number) =>
  database.animal.findFirst({
    where: { id },
    include: {
      care: {
        include: {
          steps: true,
        },
      },
    },
  });

export const getDay = (animalId: number, date: Date) =>
  database.day.findFirst({
    where: { animalId, date },
  });

export const completeStep = (dayId: number, stepId: number) =>
  database.day.update({
    where: { id: dayId },
    data: {
      completedSteps: {
        push: stepId,
      },
    },
  });

export const newDay = (animalId: number, date: Date) =>
  database.day.create({
    data: {
      animalId,
      date,
    },
  });

export const setCompleteSteps = (dayId: number, stepIds: number[]) =>
  database.day.update({
    where: { id: dayId },
    data: {
      completedSteps: {
        set: stepIds,
      },
    },
  });
