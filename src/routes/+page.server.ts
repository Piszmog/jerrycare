import type { PageServerLoad } from './$types';
import { getAnimal, getDay, newDay } from '$lib/utils/supabase';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  let { data: day, error: dayError } = await getDay(1, new Date());
  if (dayError && dayError.code === 'PGRST116') {
    const newDayResp = await newDay(1, new Date());
    if (newDayResp.error) {
      throw error(500, newDayResp.error.message);
    }
    day = newDayResp.data;
  }

  const { data: animal, error: animalError } = await getAnimal(1, day!.id);
  if (animalError) {
    throw error(500, animalError.message);
  }
  animal!.care!.sort((a, b) => new Date(a.complete_by).getTime() - new Date(b.complete_by).getTime());
  animal!.care!.forEach((care) => care.steps!.sort((a, b) => a.id - b.id));

  return {
    animal,
    day,
  };
};
