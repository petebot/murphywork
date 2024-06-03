import client from '../sanity';

export async function load() {
  const data = await client.fetch(`
    *[_type == "post"]{
      title,
      mainImage,
      publishedAt,
      excerpt,
      "author": author->name
    }
  `);

  return { data };
}
