export type Theme = 'light' | 'dark';

export function useTheme() {
  let currentTheme: Theme = 'light';

  const getTheme = (): Theme => {
    return currentTheme;
  };

  const setTheme = (theme: Theme) => {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    const configProvider = document.querySelector('hy-config-provider') as any;
    if (configProvider) {
      configProvider.theme = theme;
    }
  };

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme,
    getTheme,
    unsubscribe: () => {},
  };
}
