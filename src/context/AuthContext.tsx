import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import { parseJwt } from '../utils/utils';

let logoutTimer: number;
type AuthContextObj = {
  token: string | null | undefined;
  user: any;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};
export const AuthContext = React.createContext<AuthContextObj>({
  token: null,
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime: number | null | undefined) => {
  if (!expirationTime) {
    return 0;
  }
  const currentTime = new Date().getTime() / 1000;
  return (expirationTime - currentTime) * 1000;
};
type Props = PropsWithChildren<{}>;
const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    redirect('/login');
  }, []);

  const loginHandler = (token: string) => {
    const user: any = parseJwt(token);
    setToken(token);
    setUser(user);
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user));
    const remainingTime = calculateRemainingTime(user.exp);
    logoutTimer = window.setTimeout(logoutHandler, remainingTime);
    // Send them back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    navigate(from, { replace: true });
  };

  useEffect(() => {
    const retrieveStoredToken = () => {
      const storedToken = window.localStorage.getItem('token');
      const storedUser = window.localStorage.getItem('user');
      let remainingTime = 0;
      let user: any;
      if (storedUser && storedToken) {
        user = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(user);
        const storedExpirationDate = user.exp;
        remainingTime = calculateRemainingTime(storedExpirationDate);
        logoutTimer = window.setTimeout(logoutHandler, remainingTime);
      }
      if (remainingTime <= 3600) {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
      }
    };
    retrieveStoredToken();
  }, [logoutHandler]);

  const contextValue: AuthContextObj = {
    token: token,
    user: user,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {' '}
      <Outlet />
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthContextProvider;
