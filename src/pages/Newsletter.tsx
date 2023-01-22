import { ActionFunctionArgs, redirect } from 'react-router-dom';

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  console.log(data.get('email'));
  return redirect('/');
  // send to backend server etc.
}
