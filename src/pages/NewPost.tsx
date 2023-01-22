import {
  ActionFunctionArgs,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import NewPostForm from '../components/blog-posts/NewPostForm';

import { savePost } from '../utils/posts';

function NewPostPage() {
  const data: any = useActionData();

  const navigation = useNavigation();
  console.log(navigation.state);

  const navigate = useNavigate();

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <>
      {data && data.isError && <p>{data.message}</p>}
      <NewPostForm onCancel={cancelHandler} submitting={navigation.state === 'submitting'} />
    </>
  );
}

export default NewPostPage;

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  const validationError = await savePost(data);
  if (validationError) {
    return validationError;
  }
  return redirect('/blog');
}
