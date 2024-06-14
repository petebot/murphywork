import type { PageLoad } from "./$types";
import client from "../../sanity";

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  // Fetch the current post data
  const post = await client.fetch(
    `
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
      },
      "storyCycleName": storyCycleName[]->{
        _id,
        title,
        slug
      },
    }
  `,
    { slug }
  );

  if (!post) {
    return { data: { post: null, relatedPosts: [], suitePosts: [] } };
  }

  // Fetch related posts based on the same categories
  const categoryIds: string[] | undefined = post?.categories?.map(
    (category: { _id: string }) => category._id
  );
  const relatedPosts = await client.fetch(
    `
    *[_type == "post" && slug.current != $slug && references($categoryIds)] | order(_createdAt desc)[0...3] {
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
      },
    }
  `,
    { slug, categoryIds }
  );

  if (post?.storyCycleName) {
    const suiteSlug = post.storyCycleName[0]?.slug?.current;

    // Fetch all posts in the same story cycle
    const suitePosts = suiteSlug
      ? await client.fetch(
          `
      *[_type == "post" && storyCycleName[0]->slug.current == $suiteSlug] | order(publishedAt asc) {
        title,
        mainImage,
        publishedAt,
        slug,
        "author": author->name,
        "categories": categories[]->{
          _id,
          title,
          slug
        },
        "author": author->name,
        "storyCycleName": storyCycleName[]->{
          _id,
          title,
          slug
        },
      }
    `,
          { suiteSlug }
        )
      : [];
  }

  let suitePosts;
  if (post?.storyCycleName) {
    const suiteSlug = post.storyCycleName[0]?.slug?.current;

    // Fetch all posts in the same story cycle
    suitePosts = suiteSlug
      ? await client.fetch(
          `
      *[_type == "post" && storyCycleName[0]->slug.current == $suiteSlug] | order(publishedAt asc) {
        title,
        mainImage,
        publishedAt,
        slug,
        "author": author->name,
        "categories": categories[]->{
          _id,
          title,
          slug
        },
        "author": author->name,
        "storyCycleName": storyCycleName[]->{
          _id,
          title,
          slug
        },
      }
    `,
          { suiteSlug }
        )
      : [];
  }
  return { data: { post, relatedPosts, suitePosts } };
};
