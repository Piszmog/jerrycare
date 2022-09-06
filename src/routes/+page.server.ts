import type { PageServerLoad } from './$types';
import { getAnimal, getDay, newDay } from '$lib/utils/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const animal = await getAnimal(1);
  if (!animal) {
    throw error(404, 'Animal not found');
  }
  const date = new Date();
  let day = await getDay(animal.id, date);
  if (!day) {
    day = await newDay(animal.id, date);
  }
  return {
    animal,
    day,
  };
};
