import { Trophy, Timer, Calendar } from 'lucide-react';
import type { ChessComGame } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatTimeControl, parseGameResult } from '@/services/chesscom';
import { cn } from '@/lib/utils';

interface GameListProps {
  games: ChessComGame[];
  username: string;
  selectedGame: ChessComGame | null;
  onSelectGame: (game: ChessComGame) => void;
}

export function GameList({
  games,
  username,
  selectedGame,
  onSelectGame,
}: GameListProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No games found. Import games from Chess.com to get started.
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
      {games.map((game, index) => {
        const result = parseGameResult(game, username);
        const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
        const opponent = isWhite ? game.black : game.white;
        const playerRating = isWhite ? game.white.rating : game.black.rating;
        const date = new Date(game.end_time * 1000);

        return (
          <Card
            key={index}
            className={cn(
              'cursor-pointer transition-colors',
              selectedGame === game
                ? 'border-primary bg-accent'
                : 'hover:bg-accent/50'
            )}
            onClick={() => onSelectGame(game)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Result indicator */}
                  <div
                    className={cn(
                      'w-1 h-10 rounded-full',
                      result === 'win'
                        ? 'bg-green-500'
                        : result === 'loss'
                        ? 'bg-red-500'
                        : 'bg-gray-400'
                    )}
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{opponent.username}</span>
                      <span className="text-sm text-muted-foreground">
                        ({opponent.rating})
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {formatTimeControl(game.time_control)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {date.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      result === 'win'
                        ? 'success'
                        : result === 'loss'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {result === 'win' ? (
                      <Trophy className="h-3 w-3 mr-1" />
                    ) : null}
                    {result.charAt(0).toUpperCase() + result.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {playerRating}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
