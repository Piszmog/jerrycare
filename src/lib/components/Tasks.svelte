<script lang='ts'>
  import type { Care } from '$lib/utils/types';
  import Task from '$lib/components/Task.svelte';

  export let care: Care[];
</script>

<div class='m-2'>
  {#each care as c}
    <Task {...c} />
  {/each}
</div>
