import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

import BlogLayout from './components/layout/BlogLayout';

import ErrorPage from './pages/Error';
import NewPostPage, { action as newPostAction } from './pages/NewPost';
import { action as newsletterAction } from './pages/Newsletter';
import PostDetailPage, { loader as blogPostLoader } from './pages/PostDetail';
import RootLayout from './components/layout/RootLayout';
import WelcomePage from './pages/Welcome';
import { ToastContextProvider } from './context/ToastContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ConfirmPopup } from 'primereact/confirmpopup';
import BlogPostsPage from './pages/BlogPosts';
import AuthContextProvider, { useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/Login';
import AuthLayout from './components/layout/AuthLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthContextProvider />} errorElement={<ErrorPage />}>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<WelcomePage />} />

        <Route path='/blog' element={<BlogLayout />}>
          <Route index element={<BlogPostsPage />} />
          <Route path=':id' element={<PostDetailPage />} loader={blogPostLoader} />
        </Route>
        <Route
          path='/blog/new'
          element={
            <RequireAuth>
              <NewPostPage />
            </RequireAuth>
          }
          action={newPostAction}
        />
      </Route>

      <Route path='/newsletter' action={newsletterAction} />

      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginPage />} />
      </Route>
    </Route>,
  ),
);

function App() {
  return (
    <ThemeContextProvider>
      <ToastContextProvider>
        <RouterProvider router={router} />
        <ConfirmDialog />
        <ConfirmPopup />
      </ToastContextProvider>
    </ThemeContextProvider>
  );
}

type RequireAuthProps = {
  children: JSX.Element;
  roles?: Array<string>;
};
export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useAuth();
  const location = useLocation();

  if (
    !auth.isLoggedIn ||
    (auth.isLoggedIn && roles && !roles.some((e) => (auth.user?.roles || []).includes(e)))
  ) {
    //   // Redirect them to the /login page, but save the current location they were
    //   // trying to go to when they were redirected. This allows us to send them
    //   // along to that page after they login, which is a nicer user experience
    //   // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}

export default App;
