import type { PageLoad } from './$types';
import client from '../../sanity';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;
  console.log('Fetching post with slug:', slug); // Log the slug
  const data = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      "author": author->name,
      "illustrator": illustrator->name,
      publishedAt,
      body,
"categories": categories[]->title
    }
  `, { slug });
  return { data };
};
