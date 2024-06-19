// @ts-nocheck
import type { LayoutLoad } from "./$types";
import client from "../sanity";

export const load = async ({ url: { pathname } }: Parameters<LayoutLoad>[0]) => {
  // Fetch categories
  const categories = await client.fetch(`
    *[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0]{
      title,
      slug
    }
  `);

  // Fetch pages for navigation
  const navPages = await client.fetch(`
    *[_type == "page" && includeInNav == true]{
      title,
      slug
    }
  `);

  return { categories, navPages, pathname };
};
