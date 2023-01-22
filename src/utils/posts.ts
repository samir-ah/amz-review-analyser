import { sleep } from './sleep';
export interface Post {
  id?: number;
  title: string;
  body: string;
}
export async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Response('Failed to fetch posts.', { status: 500 });
  }
  return response.json();
}

export async function getSlowPosts() {
  await sleep(2000);
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Response('Failed to fetch posts.', { status: 500 });
  }
  return response.json();
}

export async function getPost(id: number) {
  return fetch('https://jsonplaceholder.typicode.com/posts/' + id);
}

export async function savePost(data: FormData) {
  const post: Post = {
    title: data.get('title') as string,
    body: data.get('post-text') as string,
  };

  if (post.title.trim().length < 5 || post.body.trim().length < 10) {
    return { isError: true, message: 'Invalid input data provided.' };
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw response;
  }
}
