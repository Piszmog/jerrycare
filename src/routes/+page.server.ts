import type { PageServerLoad } from './$types';
import { getAnimal, getDay, newDay } from '$lib/utils/supabase';

export const load: PageServerLoad = async ({ locals }) => {
  const { data: animal } = await getAnimal(1);
  animal!.care!.sort((a, b) => new Date(a.complete_by).getTime() - new Date(b.complete_by).getTime());
  animal!.care!.forEach((care) => care.steps!.sort((a, b) => a.id - b.id));

  let { data: day } = await getDay(1, new Date());
  if (!day) {
    const newDayResp = await newDay(animal!.id, new Date());
    day = newDayResp.data;
  }

  return {
    animal,
    day,
  };
};
