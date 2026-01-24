import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function useTheme() {
  const { settings, setSettings } = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (theme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    };

    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      applyTheme(systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(settings.theme);
    }
  }, [settings.theme]);

  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(settings.theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setSettings({ theme: themes[nextIndex] });
  };

  return {
    theme: settings.theme,
    setTheme: (theme: 'light' | 'dark' | 'system') => setSettings({ theme }),
    toggleTheme,
  };
}
