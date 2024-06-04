<script lang="ts">
  import Worm from "$lib/display/Worm.svelte";
  export let data: any;
  $: categoryTitle = data.data.categoryTitle;
  $: posts = data.data.posts;

  function formatDate(dateString: string): string {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
</script>

<main>
  <h1>{categoryTitle}</h1>
  {#if posts && posts.length > 0}
    <ul class="auto-grid">
      {#each posts as item}
        <Worm {item} />
      {/each}
    </ul>
  {:else}
    <p>No posts found in this category.</p>
  {/if}
</main>

<style>
  h1 {
    text-align: left;
  }
</style>
