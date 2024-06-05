// @ts-nocheck
import type { PageLoad } from './$types';
import client from '../../../sanity';

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const { category } = params;

  // Fetch the category details using the slug
  const categoryData = await client.fetch(`
    *[_type == "category" && slug.current == $category][0]{
      _id,
      title,
      slug
    }
  `, { category });

  if (!categoryData) {
    console.error(`Category data not found for slug: ${category}`);
    return { data: { posts: [], categoryTitle: '', storyCycles: [], category: '' } };
  }

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
        slug
      },
      "storyCycleName": storyCycleName[]->{
        _id,
        title,
        slug
      }
    }
  `, { categoryId: categoryData._id });

  let storyCycles: any[] = [];
  if (category === 'story-cycles') {
    const groupedPosts: Record<string, any[]> = posts.reduce((grouped: Record<string, any[]>, post: any) => {
      const key: string | undefined = post.storyCycleName[0]?.title;
      if (key) {
      if (!grouped[key]) {
        grouped[key] = [];
      }
      if (!grouped[key].some((p: any) => p.title === post.title)) {
        grouped[key].push(post);
      }
      }
      return grouped;
    }, {});

    storyCycles = Object.values(groupedPosts).flat();
  }

  return {
    data: {
      posts,
      categoryTitle: categoryData.title,
      storyCycles,
      category
    }
  };
};
