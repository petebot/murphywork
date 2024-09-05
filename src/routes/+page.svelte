<script lang="ts">
  import Work from "../lib/display/Work.svelte";

  export let data: any;
</script>

<svelte:head>
  <title>Let's Work</title>
  <meta name="description" content="Let's Work" />
</svelte:head>
<section>
  {#if data.data && data.data.length > 0}
    <ul class="auto-grid">
      {#each data.data as item}
        <Work {item}></Work>
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
