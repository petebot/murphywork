<script lang="ts">
  import { page } from "$app/stores";
  export let categories: any = [];
  export let pages: any = [];
</script>

<h1>
  <a class={$page.url.pathname === "/" ? "active" : ""} href="/">Murphy Work</a>
</h1>

<ul class="categories metadata">
  <li>
    <a class={$page.url.pathname === "/" ? "active" : ""} href="/">All Work</a>
  </li>
  {#if categories}
    {#each categories as item}
      <li>
        <a
          class={$page.url.pathname === `/category/${item.slug?.current}`
            ? "active"
            : ""}
          href={`/category/${item.slug?.current}`}>{item.title}</a
        >
      </li>
    {/each}
  {/if}
  {#if pages}
    {#each pages as item}
      <li>
        <a
          class={$page.url.pathname === `/page/${item.slug?.current}`
            ? "active"
            : ""}
          href={`/page/${item.slug?.current}`}>{item.title}</a
        >
      </li>
    {/each}
  {/if}
</ul>

<style>
  h1 {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .metadata {
    gap: 1rem;
    padding: 0;
    list-style: none;
  }
  a {
    position: relative;
  }
  a:hover {
    text-decoration: none;
  }
  a::after {
    content: "";
    display: block;
    background-color: var(--color-text);
    position: absolute;
    width: 100%;
    height: 0.0125rem;
    transform-origin: center;
    transform: scaleX(0);
    transition: 0.4s ease-in-out;
  }
  a:hover::after {
    transform: scaleX(0.25);
  }
  .active::after {
    transform: scaleX(1) !important;
  }
</style>
