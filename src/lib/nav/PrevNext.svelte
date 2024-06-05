<script lang="ts">
  import { navigationStore } from "$lib/store";
  export let previousPost;
  export let nextPost;

  function updateNavType(direction: string) {
    navigationStore.set({ useFly: true, flyDirection: direction });

    // Reset the store after .25 second
    setTimeout(() => {
      navigationStore.set({ useFly: false, flyDirection: "next" });
    }, 250);
  }
</script>

{#if previousPost || nextPost}
  <div class="navigation">
    <div class="prev">
      {#if previousPost}
        <a
          href={`/${previousPost.slug.current}`}
          on:click={() => updateNavType("prev")}
        >
          <div class="arrow">
            <svg viewBox="0 0 23 48">
              <g class="svg-icon">
                <polyline
                  fill="none"
                  stroke-miterlimit="10"
                  points="21.5,1.3 2.6,23.4 21.5,45.7 "
                ></polyline>
              </g>
            </svg>
          </div>
          <div class="worm-info">
            <div class="prehead">Previous</div>
            <div class="title">{previousPost.title}</div>
          </div>
        </a>
      {/if}
    </div>

    <div class="next">
      {#if nextPost}
        <a
          href={`/${nextPost.slug.current}`}
          on:click={() => updateNavType("next")}
        >
          <div class="arrow">
            <svg viewBox="0 0 23 48">
              <g class="svg-icon">
                <polyline
                  fill="none"
                  stroke-miterlimit="10"
                  points="1.5,45.7 20.4,23.5 1.5,1.3 "
                ></polyline>
              </g>
            </svg>
          </div>
          <div class="worm-info">
            <div class="prehead">Next</div>
            <div class="title">{nextPost.title}</div>
          </div>
        </a>
      {/if}
    </div>
  </div>
{/if}

<style>
  .navigation {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-family: var(--font-head);
  }
  .next a,
  .prev a {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .worm-info {
    display: flex;
    flex-direction: column;
  }
  .next a {
    text-align: right;
    flex-direction: row-reverse;
  }
  .prehead {
    text-transform: uppercase;
    color: var(--color-text-subtle);
    font-size: 0.875rem;
  }
  .title {
    font-size: 1.25rem;
  }
  svg {
    stroke: var(--color-text);
    width: 1.5rem;
  }

  @media (max-width: 430px) {
    .navigation {
      margin-top: 1rem;
    }
    .worm-info .title {
      max-width: 6rem;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .prehead {
      font-size: 0.75rem;
    }
    .title {
      font-size: 1rem;
    }
  }
</style>
