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
      slug
    }
  `, { category });

  // Fetch posts for the specific category
  const posts = await client.fetch(`
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
        slug
      }
    }
  `, { categoryId: categoryData._id });

  console.log('Fetched posts for category:', posts); // Log the fetched posts

  return { data: { posts, categoryTitle: categoryData.title } };
};
