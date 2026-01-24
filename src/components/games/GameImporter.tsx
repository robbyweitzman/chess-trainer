import { useState } from 'react';
import { Search, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getPlayerProfile, getRecentGames } from '@/services/chesscom';
import { gameStorage } from '@/services/storage';
import { useAppStore } from '@/store/useAppStore';
import type { ChessComGame } from '@/types';

interface GameImporterProps {
  onGamesLoaded: (games: ChessComGame[]) => void;
}

export function GameImporter({ onGamesLoaded }: GameImporterProps) {
  const { settings, setSettings } = useAppStore();
  const [username, setUsername] = useState(settings.chessComUsername || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Verify user exists
      const profile = await getPlayerProfile(username);
      if (!profile) {
        setError('User not found. Please check the username.');
        setLoading(false);
        return;
      }

      // Fetch recent games
      const games = await getRecentGames(username, 50);
      if (games.length === 0) {
        setError('No games found for this user.');
        setLoading(false);
        return;
      }

      // Store games in IndexedDB
      await gameStorage.addMany(games, username);

      // Save username to settings
      setSettings({ chessComUsername: username });

      onGamesLoaded(games);
    } catch (err) {
      setError('Failed to fetch games. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Import from Chess.com
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            placeholder="Chess.com username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleImport()}
            disabled={loading}
          />
          <Button onClick={handleImport} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}

        <p className="text-xs text-muted-foreground mt-2">
          Enter your Chess.com username to import your recent games for analysis.
        </p>
      </CardContent>
    </Card>
  );
}
