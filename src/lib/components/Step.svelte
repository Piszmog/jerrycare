<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import type { CareStep } from '$lib/utils/types';
  import { State } from '$lib/utils/types';

  export let step: CareStep;
  export let state: State.Completed | State.NotCompleted;

  const dispatch = createEventDispatcher();
  const onChanged = () => dispatch('completed', { id: step.id });

  let checked = '';
  if (state === State.Completed) {
    checked = 'checked';
  }
</script>

<div class='form-control'>
  <label class='label cursor-pointer'>
    <input
      {checked}
      class='checkbox'
      on:change={onChanged}
      type='checkbox'
    />
    <span class='label-text'>{step.title}</span>
  </label>
</div>
