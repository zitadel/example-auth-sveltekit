<script lang="ts">
  import { enhance } from '$app/forms';
</script>

<form action="/auth/logout" method="POST" use:enhance>
  <button
    type="submit"
    class="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-600"
  >
    Sign out
  </button>
</form>
