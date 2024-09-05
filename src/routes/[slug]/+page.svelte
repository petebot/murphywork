<script lang="ts">
  import PrevNext from "$lib/nav/PrevNext.svelte";

  import Work from "$lib/display/Work.svelte";
  import { urlFor } from "../../sanity";
  import { PortableText } from "@portabletext/svelte";
  import InlineImage from "$lib/display/InlineImage.svelte";

  export let data: any;

  let work: any;
  let relatedWorks: string | any[] = [];
  let suitePosts: any[] = [];
  let previousPost: { slug: { current: any }; title: any } | null = null;
  let nextPost: { slug: { current: any }; title: any } | null = null;

  function formatDate(dateString: string): string {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  $: {
    work = data.data.post;
    relatedWorks = data.data.relatedPosts;
    suitePosts = data.data.suitePosts;

    updatePreviousNextPosts();
  }

  function updatePreviousNextPosts() {
    if (suitePosts && suitePosts.length > 0 && work && work.publishedAt) {
      suitePosts.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      const currentIndex = suitePosts.findIndex(
        (post) =>
          new Date(post.publishedAt).getTime() ===
          new Date(work.publishedAt).getTime()
      );
      if (currentIndex !== -1) {
        previousPost = suitePosts[currentIndex - 1] || null;
        nextPost = suitePosts[currentIndex + 1] || null;
      }
    }
  }
</script>

<main>
  <PrevNext {previousPost} {nextPost}></PrevNext>
  {#if work}
    {#if work.title}
      <h1>{work.title}</h1>
    {/if}
    {#if work.mainImage && work.mainImage.asset}
      <img src={urlFor(work.mainImage).url()} alt={work.title} />
    {/if}
    <div class="metadata">
      {#if work.publishedAt}
        <p>{formatDate(work.publishedAt)}</p>
      {/if}
      {#if work.author}
        <p>Written by {work.author}</p>
      {/if}
      {#if work.illustrator}
        <p>Illustrated by {work.illustrator}</p>
      {/if}
      {#if work.categories}
        {#each work.categories as category}
          <p>{category.title}</p>
        {/each}
      {/if}
    </div>
    {#if work.body}
      <div class="write">
        <PortableText
          value={work.body}
          components={{ types: { image: InlineImage } }}
        />
      </div>
    {/if}
    <PrevNext {previousPost} {nextPost}></PrevNext>

    {#if relatedWorks.length > 0}
      <section>
        <h3>Related Works</h3>
        <div class="auto-grid">
          {#each relatedWorks as item}
            <Work {item} />
          {/each}
        </div>
      </section>
    {/if}
  {:else}
    <p>Loading work...</p>
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
