<script lang="ts">
  import { urlFor } from "../../sanity";
  import { PortableText } from "@portabletext/svelte";

  export let data: any;
  let post = data.data;

  function formatDate(dateString: string): string {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Define the components object
  const components = {};
</script>

<main>
  {#if post}
    <h1>{post.title}</h1>
    {#if post.mainImage && post.mainImage.asset}
      <img src={urlFor(post.mainImage).url()} alt={post.title} />
    {/if}
    <div class="metadata">
      {#if post.publishedAt}
        <p>{formatDate(post.publishedAt)}</p>
      {/if}
      {#if post.author}
        <p>Written by {post.author}</p>
      {/if}
      {#if post.illustrator}
        <p>Illustrated by {post.illustrator}</p>
      {/if}
      {#if post.categories}
        <p>{post.categories}</p>
      {/if}
    </div>
    {#if post.body}
      <div class="write"><PortableText value={post?.body} {components} /></div>
    {/if}
  {:else}
    <p>Loading post...</p>
  {/if}
</main>

<style>
  .metadata {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    font-family: var(--font-head);
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  img {
    max-width: 100%;
  }
  .write {
    font-size: 1.2rem;
  }
</style>
