<script lang="ts">
  import Worm from "$lib/display/Worm.svelte";
  export let data: any;
  $: categoryTitle = data.data.categoryTitle;
  $: categoryDescription = data.categoryDescription;
  $: category = data.category
  $: posts = data.data.posts;

  let cyclePosts = data.storyCycles
  console.log('cyclePosts: ',data.storyCycles)

  const groupedStories = cyclePosts
  ? cyclePosts.reduce((grouped, story) => {
      const storyCycleName = story.storyCycleName[0].title; // Access the title from the storyCycleName array
      const storyCycleDescription = story.storyCycleName[0].description; // Access the description from the storyCycleName array
      if (!grouped[storyCycleName]) {
          grouped[storyCycleName] = { stories: [], description: storyCycleDescription };
      }
      grouped[storyCycleName].stories.push(story);
      return grouped;
    }, {})
  : {};

// Sort the stories within each group by the 'publishedAt' date
for (const key in groupedStories) {
  groupedStories[key].stories.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

const groupedStoriesArray = cyclePosts 
  ? Object.entries(groupedStories).map(([key, value]) => ({ storyCycleName: key, storyCycleDescription: value.description, stories: value.stories })) 
  : [];

console.log('Grouped Stories by Story Cycle Name with Description and Sorted by PublishedAt Date:', groupedStoriesArray);
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
