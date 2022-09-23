<script lang='ts'>
  import type { CareDetails, Day } from '$lib/utils/types';
  import Task from '$lib/components/Task.svelte';

  export let care: CareDetails[];
  export let day: Day;
</script>

<div class='m-2'>
  {#each care as c}
    {@const careResult = day.day_care_results.find((result) => result.care_id === c.id)}
    {@const stepResults = day.day_step_results.filter((s) => c.steps.some((careStep) => careStep.id === s.step_id))}
    <Task
      {...c}
      {...careResult}
      dayId={day.id}
      stepResults={stepResults}
    />
  {/each}
</div>
