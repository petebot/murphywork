<script lang="ts">
  import Worm from "../lib/display/Worm.svelte";

  export let data: any;
</script>

<svelte:head>
  <title>Let's Worm</title>
  <meta name="description" content="Let's Worm" />
</svelte:head>
<section>
  {#if data.data && data.data.length > 0}
    <ul class="auto-grid">
      {#each data.data as item}
        <Worm {item}></Worm>
      {/each}
    </ul>
  {:else}
    <p>No data available.</p>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    z-index: 1;
  }

  ul {
    padding: 0;
    list-style: none;
  }
</style>
