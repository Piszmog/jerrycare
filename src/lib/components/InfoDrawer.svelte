<script lang='ts'>
  export let title;
  export let description: string | null;
  export let link: string | null;
  export let checked: boolean;
</script>

<div class='drawer drawer-end'>
  <input id='info-drawer' type='checkbox' class='drawer-toggle' bind:checked />
  <div class='drawer-content'>
    <slot />
  </div>
  <div class='drawer-side'>
    <label for='info-drawer' class='drawer-overlay'></label>
    <ul class='menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content'>
      {title}
      <!-- Sidebar content here -->
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
