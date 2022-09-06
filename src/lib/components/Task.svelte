<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import { State } from '$lib/utils/types';
  import type { Care } from '@prisma/client';
  import Step from '$lib/components/Step.svelte';

  export let care: Care;
  export let state: State;

  const dispatch = createEventDispatcher();

  const onChanged = () => dispatch('completed', {
    id: care.id,
  });

  let checked = '';
  let indeterminate = false;
  switch (state) {
    case State.Completed:
      checked = 'checked';
      break;
    case State.Partial:
      indeterminate = true;
      break;
  }
</script>

{@debug care}

<div class='form-control'>
  <label class='label cursor-pointer'>
    <input
      bind:indeterminate
      {checked}
      class='checkbox'
      on:change={onChanged}
      type='checkbox'
    />
    <span class='label-text'>{care.title}</span>
  </label>
</div>

<!--{#each care.steps as step}-->
<!--  <Step-->
<!--    {step}-->
<!--    state={State.NotCompleted}-->
<!--  />-->
<!--{/each}-->
