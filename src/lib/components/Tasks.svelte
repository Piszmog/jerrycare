<script lang='ts'>
  import type { CareDetails, Day } from '$lib/utils/types';
  import Task from '$lib/components/Task.svelte';
  import InfoDrawer from '$lib/components/InfoDrawer.svelte';

  export let care: CareDetails[];
  export let day: Day;

  export let showInfoDrawer = false;
  export let infoDrawerTitle: string;
  export let infoDrawerDescription: string | null;
  export let infoDrawerLink: string | null;
</script>

<InfoDrawer
  bind:checked={showInfoDrawer}
  title={infoDrawerTitle}
  description={infoDrawerDescription}
  link={infoDrawerLink}
>
  <div class='m-2'>
    {#each care as c}
      {@const careResult = day.day_care_results.find((result) => result.care_id === c.id)}
      {@const stepResults = day.day_step_results.filter((s) => c.steps.some((careStep) => careStep.id === s.step_id))}
      <Task
        {...c}
        {...careResult}
        dayId={day.id}
        stepResults={stepResults}
        bind:showInfoDrawer={showInfoDrawer}
        bind:infoDrawerTitle={infoDrawerTitle}
        bind:infoDrawerDescription={infoDrawerDescription}
        bind:infoDrawerLink={infoDrawerLink}
      />
    {/each}
  </div>
</InfoDrawer>
