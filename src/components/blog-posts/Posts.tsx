import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import classes from './Posts.module.css';
import { Post } from '../../utils/posts';

type Props = PropsWithChildren<{
  blogPosts: Array<Post>;
}>;

function Posts({ blogPosts }: Props) {
  return (
    <ul className={classes.posts}>
      {blogPosts.map(
        (post) =>
          post.id && (
            <li key={post.id}>
              <Link to={post.id.toString()}>
                <h2>{post.title}</h2>
              </Link>
            </li>
          ),
      )}
    </ul>
  );
}

export default Posts;
