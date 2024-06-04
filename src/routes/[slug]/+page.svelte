<script lang="ts">
  import Worm from "$lib/display/Worm.svelte";
  import { urlFor } from "../../sanity";
  import { PortableText } from "@portabletext/svelte";

  export let data: any;

  $: worm = data.data.post;
  $: relatedWorms = data.data.relatedPosts;
  console.log(data.data);

  function formatDate(dateString: string): string {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Define the components object
  const components = {};
</script>

<main>
  {#if worm}
    <h1>{worm.title}</h1>
    {#if worm.mainImage && worm.mainImage.asset}
      <img src={urlFor(worm.mainImage).url()} alt={worm.title} />
    {/if}
    <div class="metadata">
      {#if worm.publishedAt}
        <p>{formatDate(worm.publishedAt)}</p>
      {/if}
      {#if worm.author}
        <p>Written by {worm.author}</p>
      {/if}
      {#if worm.illustrator}
        <p>Illustrated by {worm.illustrator}</p>
      {/if}
      {#if worm.categories}
        {#each worm.categories as category}
          <p>{category.title}</p>
        {/each}
      {/if}
    </div>
    {#if worm.body}
      <div class="write"><PortableText value={worm?.body} {components} /></div>
    {/if}
    {#if relatedWorms && relatedWorms > 0}
      <section>
        <h3>Related Worms</h3>
        <div class="auto-grid">
          {#each relatedWorms as item}
            <Worm {item} />
          {/each}
        </div>
      </section>
    {/if}
  {:else}
    <p>Loading worm...</p>
  {/if}
</main>

<style>
  img {
    max-width: 100%;
  }
  .write {
    font-size: 1.2rem;
  }
</style>
