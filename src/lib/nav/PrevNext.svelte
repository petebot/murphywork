<script lang="ts">
  export let previousPost;
  export let nextPost;
</script>

{#if previousPost || nextPost}
  <div class="navigation">
    <div class="prev">
      {#if previousPost}
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
          <a href={`/${previousPost.slug.current}`}
            ><div class="prehead">Previous</div>
            <div class="title">{previousPost.title}</div></a
          >
        </div>
      {/if}
    </div>
    <div class="next">
      {#if nextPost}
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
          <a href={`/${nextPost.slug.current}`}
            ><div class="prehead">Next</div>
            <div class="title">{nextPost.title}</div></a
          >
        </div>
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
  .next,
  .prev {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .worm-info {
    display: flex;
    flex-direction: column;
  }
  .next {
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
