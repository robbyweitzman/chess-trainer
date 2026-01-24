import { useState, useEffect } from 'react';
import type { ChessComGame } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { gameStorage } from '@/services/storage';
import { GameImporter } from '@/components/games/GameImporter';
import { GameList } from '@/components/games/GameList';
import { GameReplay } from '@/components/games/GameReplay';
import { Card, CardContent } from '@/components/ui/Card';

export function GamesPage() {
  const { settings } = useAppStore();
  const [games, setGames] = useState<ChessComGame[]>([]);
  const [selectedGame, setSelectedGame] = useState<ChessComGame | null>(null);
  const [loading, setLoading] = useState(true);

  // Load stored games on mount
  useEffect(() => {
    const loadGames = async () => {
      if (settings.chessComUsername) {
        const stored = await gameStorage.getByUsername(settings.chessComUsername);
        // Sort by date descending
        stored.sort((a, b) => b.end_time - a.end_time);
        setGames(stored);
      }
      setLoading(false);
    };

    loadGames();
  }, [settings.chessComUsername]);

  const handleGamesLoaded = (newGames: ChessComGame[]) => {
    // Sort by date descending
    newGames.sort((a, b) => b.end_time - a.end_time);
    setGames(newGames);
    setSelectedGame(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="wood-text-secondary">Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="felt-banner stitched stitched-top rounded-xl py-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-semibold mb-2 text-white text-embossed relative z-10">Game Analysis</h1>
        <p className="text-white/80 relative z-10">
          Import and review your Chess.com games to learn from your play
        </p>
      </div>

      {/* Import section */}
      <GameImporter onGamesLoaded={handleGamesLoaded} />

      {/* Main content */}
      {games.length > 0 && settings.chessComUsername ? (
        <div className="grid lg:grid-cols-[350px,1fr] gap-6">
          {/* Game list */}
          <div>
            <h2 className="text-lg font-semibold mb-3 wood-text-primary">Recent Games</h2>
            <GameList
              games={games}
              username={settings.chessComUsername}
              selectedGame={selectedGame}
              onSelectGame={setSelectedGame}
            />
          </div>

          {/* Game viewer */}
          <div>
            {selectedGame ? (
              <GameReplay
                game={selectedGame}
                username={settings.chessComUsername}
              />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="card-text-secondary">
                    Select a game from the list to view and analyze it.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="card-text-secondary">
              No games imported yet. Enter your Chess.com username above to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
