import { createClient } from '@supabase/supabase-js';
import type { Animal, Care, Day, Step } from '$lib/utils/types';
import { CompletedState } from '$lib/utils/types';

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
    .select('*')
    .eq('animal_id', animalId)
    .eq('date', queryDate)
    .single();
};

export const setCareCompletedState = (id: number, state: CompletedState, completedAt: Date | null) => {
  return supabase.from<Care>('care')
    .update({
      completed_state: state,
      completed_at: completedAt,
    })
    .eq('id', id)
    .single();
};

export const setCareAndStepCompletedState = (id: number, state: CompletedState, completedAt: Date | null) => {
  return supabase.from<Care>('care')
    .update({
      completed_state: state,
      completed_at: completedAt,
    })
    .eq('id', id)
    .single()
    .then(() => {
      if (state === CompletedState.Completed) {
        return setStepsCompletedState(id, true, completedAt);
      } else if (state === CompletedState.NotCompleted) {
        return setStepsCompletedState(id, false, null);
      }
    });
};

export const setStepsCompletedState = (careId: number, completed: boolean, completedAt: Date | null) => {
  return supabase.from<Step>('steps')
    .update({
      completed,
      completed_at: completedAt,
    })
    .eq('care_id', careId)
    .eq('completed', !completed);
};

export const setStepCompletedState = (id: number, completed: boolean, completedAt: Date | null) => {
  return supabase.from<Step>('steps')
    .update({
      completed,
      completed_at: completedAt,
    })
    .eq('id', id)
    .single();
};

