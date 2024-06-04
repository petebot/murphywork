<script lang="ts">
  import { onMount } from 'svelte';
  import Worm from "$lib/display/Worm.svelte";
  export let data: any;
  $: categoryTitle = data.data.categoryTitle;
  $: categoryDescription = data.categoryDescription;
  $: category = data.category;
  $: posts = data.data.posts;

  let cyclePosts = data.storyCycles;

  let groupedStoriesArray = [];

  onMount(() => {
    // Update grouped stories on mount and whenever cyclePosts change
    if (cyclePosts) {
      const groupedStories = cyclePosts.reduce((grouped, story) => {
        const storyCycleName = story.storyCycleName[0].title;
        const storyCycleDescription = story.storyCycleName[0].description;
        
        if (!grouped[storyCycleName]) {
          grouped[storyCycleName] = { stories: [], description: storyCycleDescription };
        }
        
        grouped[storyCycleName].stories.push(story);
        return grouped;
      }, {});

      for (const key in groupedStories) {
        groupedStories[key].stories.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      }

      groupedStoriesArray = Object.entries(groupedStories).map(([key, value]) => ({ storyCycleName: key, storyCycleDescription: value.description, stories: value.stories }));
    }
  });
</script>

<main>
  <h1>{categoryTitle}</h1>
  <p class="lead">{categoryDescription}</p>
  
  {#if category === 'story-cycles'}
    {#each groupedStoriesArray as cycle }
      <h2>{cycle.storyCycleName}</h2>
      <p>{cycle.storyCycleDescription}</p>
      <ul class="auto-grid">
        {#each cycle.stories as item}
          <Worm {item} />
        {/each}
      </ul>
    {/each}
    
    {:else if posts && posts.length > 0}
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
