import client from '../sanity';

export async function load() {
  const data = await client.fetch(`
    *[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0]`);

  return { data };
}
