<script lang='ts'>
  import type { CheckedEvent, Step as CareStep } from '$lib/utils/types';
  import { CompletedState, getCompletedState } from '$lib/utils/types';
  import Step from '$lib/components/Step.svelte';
  import { setCareAndStepCompletedState, setCareCompletedState, setStepCompletedState } from '$lib/utils/supabase';
  import { formatTimetz } from '$lib/utils/time.js';

  export let id: number;
  export let title: string;
  export let description: string | null;
  export let link: string | null | undefined;
  export let completed_state: CompletedState;
  export let completed_at: Date | null;
  export let complete_by: string;
  export let steps: CareStep[];

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
    steps.forEach((step) => {
      if (checked) {
        if (!step.completed) {
          step.completed = true;
          step.completed_at = new Date();
        }
      } else {
        step.completed = false;
        step.completed_at = null;
      }
    });
    steps = [...steps];

    completed_state = checked ? CompletedState.Completed : CompletedState.NotCompleted;
    completed_at = checked ? new Date() : null;
    await setCareAndStepCompletedState(id, completed_state, completed_at);
  };

  const handleStepChecked = async (event: CustomEvent<CheckedEvent>) => {
    const currentStep = steps!.find((step: CareStep) => step.id === event.detail.id);
    const stepChecked = event.detail.checked;
    if (stepChecked) {
      currentStep.completed = true;
      currentStep.completed_at = new Date();
    } else {
      currentStep.completed = false;
      currentStep.completed_at = null;
    }
    steps = [...steps];

    completed_state = getCompletedState(steps);
    if (completed_state == CompletedState.Completed) {
      completed_at = new Date();
    } else if (completed_state == CompletedState.NotCompleted) {
      completed_at = null;
    }
    await setCareCompletedState(id, completed_state, completed_at);
    await setStepCompletedState(event.detail.id, stepChecked, stepChecked ? new Date() : null);
  };
</script>

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

<div class='ml-8'>
  {#each steps as step}
    <Step
      {...step}
      on:changed={handleStepChecked}
      bind:checked={step.completed}
      bind:completed_at={step.completed_at}
    />
  {/each}
</div>
