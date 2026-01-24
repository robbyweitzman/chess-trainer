import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Puzzle,
  Gamepad2,
  Settings,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/openings', icon: BookOpen, label: 'Openings' },
  { path: '/puzzles', icon: Puzzle, label: 'Puzzles' },
  { path: '/games', icon: Gamepad2, label: 'Games' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Felt Banner Style */}
      <header className="header-felt sticky top-0 z-50 w-full stitched">
        <div className="container flex h-14 items-center relative z-10">
          <Link to="/" className="flex items-center gap-2.5 mr-8 group">
            <span className="text-2xl chess-icon text-[var(--gold-light)] icon-glow">&#9816;</span>
            <span className="font-display font-semibold hidden sm:inline-block text-white text-embossed text-lg">
              Chess Trainer
            </span>
          </Link>

          <nav className="flex items-center gap-1 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all',
                    isActive
                      ? 'bg-black/20 text-[var(--gold-light)] font-medium shadow-inner'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  <item.icon className={cn('h-4 w-4', isActive && 'icon-glow')} />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={toggleTheme}
            title={`Current theme: ${theme}`}
            className="flex items-center justify-center h-8 w-8 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ThemeIcon className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-8">{children}</main>
    </div>
  );
}
