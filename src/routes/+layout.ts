import client from '../sanity';

export async function load() {
  const data = await client.fetch(`
    *[_type == "category"]`);

  return { data };
}
