<script lang='ts'>
  import type { Care } from '$lib/utils/types';
  import Task from '$lib/components/Task.svelte';
  import { State } from '$lib/utils/types.js';

  export let care: Care[];
</script>

<div>
  {#each care as c}
    <Task {c} state={State.NotCompleted} />
  {/each}
</div>
