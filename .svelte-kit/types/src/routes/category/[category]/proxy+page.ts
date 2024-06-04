// @ts-nocheck
import type { PageLoad } from './$types';
import client from '../../../sanity';

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const { category } = params;
  console.log('Fetching posts for category slug:', category); // Log the category slug

  // Fetch the category details using the slug
  const categoryData = await client.fetch(`
    *[_type == "category" && slug.current == $category][0]{
      _id,
      title,
      slug,
      description
    } 
  `, { category });


  // Fetch posts for the specific category
  let posts = await client.fetch(`
    *[_type == "post" && references($categoryId)] {
      title,
      mainImage,
      publishedAt,
      excerpt,
      slug,
      "author": author->name,
      "categories": categories[]->{
        _id,
        title,
        slug,
        description
      },
      "storyCycleName": storyCycleName[]->{
        _id,
        title,
        slug,
        description
      },
    } 
  `, { categoryId: categoryData._id });

  console.log('Fetched posts for category:', posts); // Log the fetched posts

  // If the category is 'story-cycle', group the posts by their 'storyCycleName'

  let storyCycles
  if (category === 'story-cycles') {
    const groupedPosts = posts.reduce((grouped, post) => {
        const key = post.storyCycleName[0].title; // Access the title from the storyCycleName array
        if (!grouped[key]) {
            grouped[key] = [];
        }
        
        // Check if the post is not already in the group before adding it
        if (!grouped[key].some(p => p.title === post.title)) {
            grouped[key].push(post);
        }
        
        return grouped;
    }, {});
    
    // Flatten the grouped posts into a single array and store in a writable store
    storyCycles =  Object.values(groupedPosts).flat()
}

  console.log('storyCycles: ', storyCycles)

  return { data: { posts, categoryTitle: categoryData.title }, categoryDescription: categoryData.description, storyCycles, category };
};
