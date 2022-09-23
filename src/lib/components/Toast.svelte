<script lang='ts'>
  export let variant: 'info' | 'success' | 'error' = 'info';
  export let message: string;
</script>

<div class='toast'>
  <div
    class='alert'
    class:alert-info={variant === 'info'}
    class:alert-success={variant === 'success'}
    class:alert-error={variant === 'error'}
  >
    <div>
      <span>{message}</span>
    </div>
  </div>
</div>
