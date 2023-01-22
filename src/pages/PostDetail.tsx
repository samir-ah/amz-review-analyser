import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import BlogPost from '../components/blog-posts/BlogPost';
import NewsletterSignup from '../components/blog-posts/NewsletterSignup';

import { getPost } from '../utils/posts';

function PostDetailPage() {
  const postData: any = useLoaderData();

  return (
    <>
      <BlogPost title={postData.title} text={postData.body} />
      <NewsletterSignup />
    </>
  );
}

export default PostDetailPage;

export function loader({ params }: LoaderFunctionArgs) {
  const postId = Number(params.id);

  if (typeof postId == 'number') {
    return getPost(postId);
  }
  throw new Response('', {
    status: 404,
    statusText: 'Not Found',
  });
}
