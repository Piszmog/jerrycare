import type { RequestEvent, RequestHandler } from './$types';
import { getAnimal, setCompleteSteps } from '$lib/utils/database';

export const GET: RequestHandler = async ({ params }: RequestEvent) => {
  const a = await getAnimal(1);
  return new Response();
};
