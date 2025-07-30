<script lang="ts">
  import { onMount } from 'svelte';

  export let showDetails = false;

  let hasError = false;
  let error: Error | null = null;

  onMount(() => {
    const handleError = (event: ErrorEvent) => {
      hasError = true;
      error = event.error;
      console.error('Error Boundary caught an error:', event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      hasError = true;
      error = new Error(event.reason);
      console.error('Error Boundary caught a promise rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection,
      );
    };
  });

  function handleReload() {
    window.location.reload();
  }
</script>

{#if hasError}
  <main
    class="grid flex-1 place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <div
        class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
      >
        <!--suppress HtmlDeprecatedAttribute -->
        <svg
          class="h-8 w-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>

      <p class="text-base font-semibold text-red-600">Error</p>
      <h1
        class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
      >
        Something went wrong
      </h1>
      <p
        class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
      >
        An unexpected error occurred. Please try reloading the page.
      </p>

      {#if showDetails && error}
        <div
          class="mx-auto mt-6 max-w-2xl rounded-lg bg-gray-100 p-4 text-left"
        >
          <h3 class="mb-2 text-sm font-semibold text-gray-800">
            Error Details:
          </h3>
          <p class="font-mono text-sm text-gray-600">{error.message}</p>
          {#if error.stack}
            <pre
              class="mt-2 overflow-auto text-xs text-gray-500">{error.stack}</pre>
          {/if}
        </div>
      {/if}

      <div class="mt-10 flex items-center justify-center gap-x-6">
        <button
          on:click={handleReload}
          class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Reload page
        </button>
        <a
          href="/"
          class="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
        >
          Go back home
        </a>
      </div>
    </div>
  </main>
{:else}
  <slot />
{/if}
