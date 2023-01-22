import React, { PropsWithChildren } from 'react';
export enum Theme {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}
type ThemeContextObj = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      if (storedPrefs === Theme.DARK) {
        return Theme.DARK;
      }
      return Theme.LIGHT;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return Theme.DARK;
    }
  }

  return Theme.LIGHT; // light theme as the default;
};

export const ThemeContext = React.createContext<ThemeContextObj>({
  theme: getInitialTheme(),
  setTheme: () => {},
});
type Props = PropsWithChildren<{}>;
export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = React.useState<Theme>(getInitialTheme);

  const rawSetTheme = (rawTheme: Theme) => {
    const themeLink = document.getElementById('app-theme') as HTMLAnchorElement;
    if (themeLink) {
      const isDark = rawTheme === Theme.DARK;
      themeLink.href = themeLink.href.replace(isDark ? 'light' : 'dark', isDark ? 'dark' : 'light');

      localStorage.setItem('color-theme', rawTheme);
    }
  };

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  return React.useContext(ThemeContext);
}
