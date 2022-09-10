<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import type { CheckedEvent } from '$lib/utils/types';

  export let id: number;
  export let title: string;
  export let description: string | null | undefined;
  export let link: string | null | undefined;
  export let completed_at: string | Date | null;
  export let checked: boolean;

  const dispatch = createEventDispatcher<{ changed: CheckedEvent }>();
</script>

<div class='form-control m-2'>
  <label class='cursor-pointer'>
    <input
      bind:checked
      class='checkbox'
      on:change={()=> dispatch('changed', { id, checked })}
      type='checkbox'
    />
    <span class='label-text'>{title}</span>
    <span class='label-text text-xs'>
      {#if completed_at}
        (Completed on: {new Date(completed_at).toLocaleString()})
      {/if}
    </span>
  </label>
</div>
