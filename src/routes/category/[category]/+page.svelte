<script lang="ts">
  import { beforeUpdate } from "svelte";
  import Work from "$lib/display/Work.svelte";
  export let data: any;

  let categoryTitle;
  let category;
  let posts;
  let cyclePosts;
  let groupedStoriesArray = [];

  beforeUpdate(() => {
    categoryTitle = data.data.categoryTitle;
    category = data.data.category;
    posts = data.data.posts || [];
    cyclePosts = data.data.storyCycles || [];
    updateGroupedStories();
  });

  // Update grouped stories whenever cyclePosts change
  const updateGroupedStories = () => {
    if (cyclePosts.length > 0) {
      const groupedStories = cyclePosts.reduce((grouped, story) => {
        const storyCycleName = story.storyCycleName[0].title;
        const storyCycleDescription = story.storyCycleName[0].description;

        if (!grouped[storyCycleName]) {
          grouped[storyCycleName] = { stories: [] };
        }

        grouped[storyCycleName].stories.push(story);
        return grouped;
      }, {});

      for (const key in groupedStories) {
        groupedStories[key].stories.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      }

      groupedStoriesArray = Object.entries(groupedStories).map(
        ([key, value]) => ({
          storyCycleName: key,
          stories: value.stories,
        })
      );
    }
  };
</script>

<main>
  <h1>{categoryTitle}</h1>

  {#if category === "story-cycles"}
    {#each groupedStoriesArray as cycle}
      <h2>{cycle.storyCycleName}</h2>
      <ul class="auto-grid">
        {#each cycle.stories as item}
          <Work {item} />
        {/each}
      </ul>
    {/each}
  {:else if posts && posts.length > 0}
    <ul class="auto-grid">
      {#each posts as item}
        <Work {item} />
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
