import { Outlet } from 'react-router-dom';
import BlogActions from '../blog-posts/BlogActions';

function BlogLayout() {
  return (
    <>
      <BlogActions />
      <Outlet />
    </>
  );
}

export default BlogLayout;
