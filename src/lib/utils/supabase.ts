import { createClient } from '@supabase/supabase-js';
import type { Animal, CareOnDay, CompletedState, Day, StepOnDay } from '$lib/utils/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getAnimal = async (id: number) => {
  return supabase.from<Animal>('animals')
    .select('*, care(*, steps(*))')
    .eq('id', id)
    .single();
};

export const getDay = async (animalId: number, date: Date) => {
  const queryDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return supabase.from<Day>('days')
    .select('*, care_on_days(*), steps_on_days(*)')
    .eq('animal_id', animalId)
    .eq('date', queryDate)
    .single();
};

export const newDay = async (animalId: number, date: Date) => {
  const queryDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return supabase.rpc<number>('new_day', { animal_id_input: animalId, date_input: queryDate})
    .then((resp) => {
      if (resp.error) {
        throw resp.error;
      }
      return getDay(animalId, date);
    });
};

export const setCareCompletedState = (animalId: number, dayId: number, state: CompletedState, completedAt: Date | null) => {
  return supabase.from<CareOnDay>('care_on_days')
    .update({
      completed_state: state,
      completed_at: completedAt,
    })
    .match({ animal_id: animalId, day_id: dayId })
    .single();
};

export const setCareAndStepCompletedState = (animalId: number, dayId: number, state: CompletedState, completedAt: Date | null) => {
  return supabase.rpc<void>('set_care_and_step_completed_state', {
    care_id_input: animalId,
    day_id_input: dayId,
    state_input: state,
    completed_at_input: completedAt,
  });
};

export const setStepCompletedState = (stepId: number, dayId: number, completed: boolean, completedAt: Date | null) => {
  return supabase.from<StepOnDay>('steps_on_days')
    .update({
      completed,
      completed_at: completedAt,
    })
    .match({ step_id: stepId, day_id: dayId })
    .single();
};

