<script lang='ts'>
  import { page } from '$app/stores';
  import Tasks from '$lib/components/Tasks.svelte';
</script>

<svelte:head>
  <title>{$page.data.animal.name} - {$page.data.day.date.toLocaleDateString()}</title>
  <meta name='description' content="{$page.data.animal.name}'s care on {$page.data.day.date.toLocaleDateString()}" />
</svelte:head>

<section>
  <Tasks care={$page.data.animal.care} />
</section>
