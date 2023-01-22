import classes from './BlogPost.module.css';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
  text: string;
}>;

function BlogPost({ title, text }: Props) {
  return (
    <article className={classes.post}>
      <h1>{title}</h1>
      <p>{text}</p>
    </article>
  );
}

export default BlogPost;
