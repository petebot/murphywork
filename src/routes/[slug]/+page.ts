import type { PageLoad } from './$types';
import client from '../../sanity';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  // Fetch the current post data
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      "author": author->name,
      "illustrator": illustrator->name,
      publishedAt,
      body,
      "categories": categories[]->{
        _id,
        title,
        slug
      }
    }
  `, { slug });

  // Fetch related posts based on the same categories
  const categoryIds = post.categories.map(category => category._id);
  const relatedPosts = await client.fetch(`
    *[_type == "post" && slug.current != $slug && references($categoryIds)] | order(_createdAt desc)[0...3] {
      title,
      mainImage,
      publishedAt,
      excerpt,
      slug,
      "author": author->name,
      "categories": categories[]->title
    } | order(publishedAt desc)
  `, { slug, categoryIds });


  return { data: { post, relatedPosts } };
};
