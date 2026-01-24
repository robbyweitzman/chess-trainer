import { Moon, Sun, Monitor, Palette, Volume2, Grid3X3, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const BOARD_THEMES = [
  { id: 'green', name: 'Green', light: '#eeeed2', dark: '#769656' },
  { id: 'brown', name: 'Brown', light: '#f0d9b5', dark: '#b58863' },
  { id: 'blue', name: 'Blue', light: '#dee3e6', dark: '#8ca2ad' },
  { id: 'purple', name: 'Purple', light: '#e8e0f0', dark: '#9078b0' },
] as const;

export function SettingsPage() {
  const { settings, setSettings, progress, updateProgress } = useAppStore();

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      updateProgress({
        puzzleRating: 600,
        puzzleRatingHistory: [{ date: Date.now(), rating: 600 }],
        openingProgress: {},
        puzzleProgress: {},
        streaks: { current: 0, best: 0, lastPracticeDate: '' },
        themeAccuracy: {},
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="felt-banner stitched stitched-top rounded-xl py-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-semibold mb-2 text-white text-embossed relative z-10">Settings</h1>
        <p className="text-white/80 relative z-10">
          Customize your chess training experience
        </p>
      </div>

      {/* Settings cards - constrained width */}
      <div className="max-w-2xl space-y-8">
      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-display">
            <Palette className="h-5 w-5 text-[var(--felt-green)] dark:text-[var(--felt-highlight)]" />
            Appearance
          </CardTitle>
          <CardDescription>
            Choose your preferred theme and color scheme.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme toggle */}
          <div>
            <label className="text-sm font-medium mb-3 block card-text-primary">Color Mode</label>
            <div className="flex gap-2">
              <Button
                variant={settings.theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettings({ theme: 'light' })}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button
                variant={settings.theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettings({ theme: 'dark' })}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
              <Button
                variant={settings.theme === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettings({ theme: 'system' })}
              >
                <Monitor className="h-4 w-4 mr-2" />
                System
              </Button>
            </div>
          </div>

          {/* Board theme */}
          <div>
            <label className="text-sm font-medium mb-3 block card-text-primary">Board Theme</label>
            <div className="grid grid-cols-4 gap-3">
              {BOARD_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() =>
                    setSettings({ boardTheme: theme.id as typeof settings.boardTheme })
                  }
                  className={cn(
                    'p-2 rounded-lg border-2 transition-colors',
                    settings.boardTheme === theme.id
                      ? 'border-[var(--felt-green)] dark:border-[var(--felt-highlight)]'
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <div className="grid grid-cols-2 w-12 h-12 rounded overflow-hidden mx-auto mb-2">
                    <div style={{ backgroundColor: theme.light }} />
                    <div style={{ backgroundColor: theme.dark }} />
                    <div style={{ backgroundColor: theme.dark }} />
                    <div style={{ backgroundColor: theme.light }} />
                  </div>
                  <p className="text-xs text-center card-text-secondary">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Board settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-display">
            <Grid3X3 className="h-5 w-5 text-[var(--felt-green)] dark:text-[var(--felt-highlight)]" />
            Board Settings
          </CardTitle>
          <CardDescription>Configure your chess board preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium card-text-primary">Show Coordinates</p>
              <p className="text-sm card-text-muted">
                Display rank and file labels on the board
              </p>
            </div>
            <Button
              variant={settings.showCoordinates ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                setSettings({ showCoordinates: !settings.showCoordinates })
              }
            >
              {settings.showCoordinates ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium card-text-primary">Sound Effects</p>
              <p className="text-sm card-text-muted">
                Play sounds for moves and captures
              </p>
            </div>
            <Button
              variant={settings.soundEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSettings({ soundEnabled: !settings.soundEnabled })}
            >
              <Volume2 className="h-4 w-4 mr-1" />
              {settings.soundEnabled ? 'On' : 'Off'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-display">
            <RotateCcw className="h-5 w-5 text-[var(--felt-green)] dark:text-[var(--felt-highlight)]" />
            Progress Data
          </CardTitle>
          <CardDescription>Manage your training progress data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="card-text-muted">Puzzle Rating</p>
              <p className="font-medium card-text-primary">{progress.puzzleRating}</p>
            </div>
            <div>
              <p className="card-text-muted">Puzzles Solved</p>
              <p className="font-medium card-text-primary">
                {Object.keys(progress.puzzleProgress).length}
              </p>
            </div>
            <div>
              <p className="card-text-muted">Openings Started</p>
              <p className="font-medium card-text-primary">
                {Object.keys(progress.openingProgress).length}
              </p>
            </div>
            <div>
              <p className="card-text-muted">Best Streak</p>
              <p className="font-medium card-text-primary">{progress.streaks.best} days</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="destructive" onClick={resetProgress}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All Progress
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
