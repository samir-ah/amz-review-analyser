import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import Posts from '../components/blog-posts/Posts';
import { getSlowPosts, Post } from '../utils/posts';

function DeferredBlogPostsPage() {
  const loaderData = useLoaderData() as DeferredBlogPostsLoaderData;

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={loaderData.posts} errorElement={<p>Error loading blog posts.</p>}>
          {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DeferredBlogPostsPage;

interface DeferredBlogPostsLoaderData {
  posts: Array<Post>;
}
export async function loader() {
  return defer({ posts: getSlowPosts() });
}
