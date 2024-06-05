// @ts-nocheck
import type { PageLoad } from './$types';
import client from '../../sanity';

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
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
      },
      "storyCycleName": storyCycleName[]->{
        _id,
        title,
        slug
      },
    }
  `, { slug });

  console.log("Fetched post:", post);

  if (!post) {
    return { data: { post: null, relatedPosts: [], suitePosts: [] } };
  }

  

  // Fetch related posts based on the same categories
  const categoryIds: string[] | undefined = post?.categories?.map((category: { _id: string }) => category._id);
  const relatedPosts = await client.fetch(`
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
  `, { slug, categoryIds });


  console.log("Related posts:", relatedPosts);


  if (post?.storyCycleName) {
    const suiteSlug = post.storyCycleName[0]?.slug?.current;

    console.log("Suite slug:", suiteSlug);

    // Fetch all posts in the same story cycle
    console.log(suiteSlug, post.storyCycleName[0]?.slug?.current)
    const suitePosts = suiteSlug ? await client.fetch(`
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
    `, { suiteSlug }) : [];
    console.log("Suite posts:", suitePosts);
  }


  

  let suitePosts;
  if (post?.storyCycleName) {
    const suiteSlug = post.storyCycleName[0]?.slug?.current;

    console.log("Suite slug:", suiteSlug);

    // Fetch all posts in the same story cycle
    console.log(suiteSlug, post.storyCycleName[0]?.slug?.current)
    suitePosts = suiteSlug ? await client.fetch(`
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
    `, { suiteSlug }) : [];
    console.log("Suite posts:", suitePosts);
  }
  return { data: { post, relatedPosts, suitePosts } };
};
