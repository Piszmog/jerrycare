import { createClient } from '@supabase/supabase-js';
import type { Animal, CompletedState, Day, DayCareResult, DayStepResult } from '$lib/utils/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getAnimal = async (id: number, dayId: number) => {
  return supabase.from<Animal>('animals')
    .select('*, care(*, steps(*))')
    .match({ id: id })
    .single();
};

export const getDay = async (animalId: number, date: Date) => {
  const queryDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return supabase.from<Day>('days')
    .select('*, day_care_results(*), day_step_results(*)')
    .eq('animal_id', animalId)
    .eq('date', queryDate)
    .single();
};

export const newDay = async (animalId: number, date: Date) => {
  const queryDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return supabase.rpc<number>('new_day', { animal_id_input: animalId, date_input: queryDate })
    .then((resp) => {
      if (resp.error) {
        throw resp.error;
      }
      return getDay(animalId, date);
    });
};

export const setCareCompletedState = (careId: number, dayId: number, state: CompletedState, completedAt: Date | null) => {
  return supabase.from<DayCareResult>('day_care_results')
    .update({
      completed_state: state,
      completed_at: completedAt,
    })
    .match({ care_id: careId, day_id: dayId })
    .single();
};

export const setCareAndStepCompletedState = (careId: number, dayId: number, state: CompletedState, completedAt: Date | null) => {
  return supabase.rpc<void>('set_care_and_step_completed_state', {
    care_id_input: careId,
    day_id_input: dayId,
    state_input: state,
    completed_at_input: completedAt,
  });
};

export const setStepCompletedState = (stepId: number, dayId: number, completed: boolean, completedAt: Date | null) => {
  return supabase.from<DayStepResult>('day_step_results')
    .update({
      completed,
      completed_at: completedAt,
    })
    .match({ step_id: stepId, day_id: dayId })
    .single();
};

