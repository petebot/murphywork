<script lang="ts">
  import { urlFor } from "../sanity";
  export let data: any;

  function formatDate(dateString: string): string {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
</script>

<svelte:head>
  <title>Let's Worm</title>
  <meta name="description" content="Let's Worm" />
</svelte:head>
<section>
  <h1>Let's Worm</h1>
  {#if data.data && data.data.length > 0}
    <ul class="auto-grid">
      {#each data.data as item}
        <li>
          {#if item.mainImage && item.mainImage.asset}<a
              href="/{item.slug.current}"
            >
              <div
                class="image"
                style:background-image={`url(${urlFor(item.mainImage).url()})`}
              ></div></a
            >
          {/if}
          <h3><a href="/{item.slug.current}">{item.title}</a></h3>
          {#if item.publishedAt}
            <time datetime={item.publishedAt}
              >{formatDate(item.publishedAt)}</time
            >
          {/if}
          {#if item.excerpt}
            <p class="excerpt">
              {item.excerpt}
              <a href="/{item.slug.current}" class="cta">Look & Read &rarr;</a>
            </p>
          {/if}
        </li>
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

  h1 {
    text-transform: uppercase;
    font-size: 4rem;
    margin: 0;
    width: 100%;
  }
  h3 {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 200;
    margin: 1rem 0 0.5rem;
  }
  .excerpt {
    color: var(--color-text-subtle);
  }
  time {
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 200;
    font-family: var(--font-head);
  }
  .cta {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    font-family: var(--font-head);
    word-break: keep-all;
    display: inline-flex;
    align-items: center;
  }
  .image {
    width: 100%;
    height: 15rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  ul {
    padding: 0;
  }
  .auto-grid > * {
    max-width: 25rem;
    margin-left: auto;
    margin-right: auto;
  }

  .auto-grid > * + * {
    margin-top: 1rem;
  }

  .auto-grid li {
    list-style: none;
  }
  @supports (display: grid) {
    .auto-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(var(--auto-grid-min-size, 16rem), 1fr)
      );
      grid-gap: 1rem;
    }

    .auto-grid > * {
      max-width: unset;
      margin: unset;
    }
  }
  @media screen and (max-width: 470px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
