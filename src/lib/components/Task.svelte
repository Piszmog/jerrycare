<script lang='ts'>
  import type { CheckedEvent, DayStepResult, StepDetails } from '$lib/utils/types';
  import { CompletedState, getCompletedState } from '$lib/utils/types';
  import Step from '$lib/components/Step.svelte';
  import { setCareAndStepCompletedState, setCareCompletedState, setStepCompletedState } from '$lib/utils/supabase';
  import { formatTimetz } from '$lib/utils/time.js';
  import InfoIcon from '$lib/components/InfoIcon.svelte';

  export let id: number;
  export let dayId: number;
  export let title: string;
  export let description: string | null;
  export let link: string | null;
  export let completed_state: CompletedState;
  export let completed_at: Date | null;
  export let complete_by: string;
  export let steps: StepDetails[];
  export let stepResults: DayStepResult[];

  export let showInfoDrawer = false;
  export let infoDrawerTitle: string;
  export let infoDrawerDescription: string | null;
  export let infoDrawerLink: string | null;

  let checked: boolean;
  let indeterminate: boolean;

  $: {
    switch (completed_state) {
      case CompletedState.NotCompleted:
        checked = false;
        indeterminate = false;
        break;
      case CompletedState.Completed:
        checked = true;
        indeterminate = false;
        break;
      case CompletedState.Partial:
        checked = false;
        indeterminate = true;
        break;
    }
  }

  const handleCareChange = async () => {
    stepResults.forEach((result) => {
      if (checked) {
        if (!result.completed) {
          result.completed = true;
          result.completed_at = new Date();
        }
      } else {
        result.completed = false;
        result.completed_at = null;
      }
    });
    stepResults = [...stepResults];

    completed_state = checked ? CompletedState.Completed : CompletedState.NotCompleted;
    completed_at = checked ? new Date() : null;
    await setCareAndStepCompletedState(id, dayId, completed_state, completed_at);
  };

  const handleStepChecked = async (event: CustomEvent<CheckedEvent>) => {
    const currentStepResult = stepResults!.find((results) => results.step_id === event.detail.id);
    const stepChecked = event.detail.checked;
    if (stepChecked) {
      currentStepResult.completed = true;
      currentStepResult.completed_at = new Date();
    } else {
      currentStepResult.completed = false;
      currentStepResult.completed_at = null;
    }
    stepResults = [...stepResults];

    completed_state = getCompletedState(stepResults);
    if (completed_state == CompletedState.Completed) {
      completed_at = new Date();
    } else {
      completed_at = null;
    }
    await setCareCompletedState(id, dayId, completed_state, completed_at);
    await setStepCompletedState(event.detail.id, dayId, stepChecked, stepChecked ? new Date() : null);
  };

  const handleInfoClick = () => {
    showInfoDrawer = !showInfoDrawer;
    infoDrawerTitle = title;
    infoDrawerDescription = description;
    infoDrawerLink = link;
  };
</script>

<div class='flex'>
  <div class='form-control m-1'>
    <label class='cursor-pointer'>
      <input
        bind:indeterminate
        bind:checked
        on:change={handleCareChange}
        class='checkbox'
        type='checkbox'
      />
      <span class='label-text'>{title}</span>
      <span class='label-text text-xs'>
      {#if completed_at}
        (Completed on: {new Date(completed_at).toLocaleString()})
      {:else}
        (Complete by: {formatTimetz(complete_by)})
      {/if}
    </span>
    </label>
  </div>

  <!--{#if description || link}-->
  <label class='drawer-button btn btn-ghost' on:click={handleInfoClick}>
    <InfoIcon />
  </label>
  <!--{/if}-->
</div>


<div class='ml-8'>
  {#each stepResults as result}
    {@const step = steps.find((step) => step.id === result.step_id)}
    <Step
      {...step}
      {...result}
      on:changed={handleStepChecked}
      bind:checked={result.completed}
      bind:completed_at={result.completed_at}
      bind:showInfoDrawer={showInfoDrawer}
      bind:infoDrawerTitle={infoDrawerTitle}
      bind:infoDrawerDescription={infoDrawerDescription}
      bind:infoDrawerLink={infoDrawerLink}
    />
  {/each}
</div>
