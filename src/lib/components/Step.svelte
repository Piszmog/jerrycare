<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import type { CheckedEvent } from '$lib/utils/types';
  import InfoIcon from '$lib/components/InfoIcon.svelte';

  export let id: number;
  export let title: string;
  export let description: string | null;
  export let link: string | null;
  export let completed_at: string | Date | null;
  export let checked: boolean;

  export let showInfoDrawer = false;
  export let infoDrawerTitle: string;
  export let infoDrawerDescription: string | null;
  export let infoDrawerLink: string | null;

  const dispatch = createEventDispatcher<{ changed: CheckedEvent }>();

  const handleInfoClick = () => {
    showInfoDrawer = !showInfoDrawer;
    infoDrawerTitle = title;
    infoDrawerDescription = description;
    infoDrawerLink = link;
  };
</script>

<div class='flex'>
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
  <label class='drawer-button btn btn-ghost' on:click={handleInfoClick}>
    <InfoIcon />
  </label>
</div>
