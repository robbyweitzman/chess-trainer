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
import { Button } from '@/components/ui/Button';

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
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-sm shadow-sm">
        <div className="container flex h-14 items-center">
          <Link to="/" className="flex items-center gap-2.5 mr-8 group">
            <span className="text-xl chess-icon text-primary">&#9816;</span>
            <span className="font-display font-semibold hidden sm:inline-block">
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
                    'flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={`Current theme: ${theme}`}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <ThemeIcon className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-10">{children}</main>

      {/* Footer */}
      <footer className="border-t py-5 mt-auto bg-card/50">
        <div className="container flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="chess-icon text-primary/60">&#9822;</span>
          <span>Train your chess skills from 200 to 1000 ELO</span>
        </div>
      </footer>
    </div>
  );
}
