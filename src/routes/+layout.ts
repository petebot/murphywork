import type { LayoutLoad } from "./$types";
import client from "../sanity";

export const load: LayoutLoad = async ({
  url: { pathname },
}: {
  url: { pathname: string };
}) => {
  const data = await client.fetch(`
    *[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0]`);

  return { data, pathname };
};
