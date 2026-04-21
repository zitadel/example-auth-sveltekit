<script lang="ts">
  import '../app.css';
  import ErrorBoundary from '$lib/components/ErrorBoundary.svelte';
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
  <ErrorBoundary>
    <slot />
  </ErrorBoundary>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
