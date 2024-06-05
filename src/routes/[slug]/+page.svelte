<script lang="ts">
  import PrevNext from '$lib/nav/PrevNext.svelte';

  import Worm from '$lib/display/Worm.svelte';
  import { urlFor } from '../../sanity';
  import { PortableText } from '@portabletext/svelte';

  export let data: any;

  let worm: any;
  let relatedWorms: string | any[] = [];
  let suitePosts: any[] = [];
  let previousPost: { slug: { current: any; }; title: any; } | null = null;
  let nextPost: { slug: { current: any; }; title: any; } | null = null;

  function formatDate(dateString: string): string {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  $: {
    worm = data.data.post;
    relatedWorms = data.data.relatedPosts;
    suitePosts = data.data.suitePosts;

    updatePreviousNextPosts();
  }

  function updatePreviousNextPosts() {
    if (suitePosts && suitePosts.length > 0 && worm && worm.publishedAt) {
      suitePosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      const currentIndex = suitePosts.findIndex(post => new Date(post.publishedAt).getTime() === new Date(worm.publishedAt).getTime());
      if (currentIndex !== -1) {
        previousPost = suitePosts[currentIndex - 1] || null;
        nextPost = suitePosts[currentIndex + 1] || null;
      }
    }
  }
</script>

<main>
  <PrevNext {previousPost} {nextPost}></PrevNext>
  {#if worm}
    {#if worm.title}
      <h1>{worm.title}</h1>
    {/if}
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
      <div class="write">
        <PortableText value={worm.body} components={{}} />
      </div>
    {/if}
    <PrevNext {previousPost} {nextPost}></PrevNext>

    {#if relatedWorms.length > 0}
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
