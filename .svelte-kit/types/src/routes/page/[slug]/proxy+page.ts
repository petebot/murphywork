// @ts-nocheck
import type { PageLoad } from "./$types";
import client from "../../../sanity";

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const { slug } = params;

  // Fetch the page data based on the slug
  const page = await client.fetch(
    `
    *[_type == "page" && slug.current == $slug][0]{
      title,
      includeInNav,
      hero,
      body,
      slug
    }
  `,
    { slug }
  );

  console.log(page);
  return { data: { page, slug } };
};
