import client from '../sanity';

export async function load() {
  const data = await client.fetch(`
    *[_type == "post"]{
      title,
      mainImage,
      publishedAt,
      excerpt,
      slug,
      "author": author->name,
"categories": categories[]->title
    }
  `);

  return { data };
}
