import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import type { ChessComGame } from '@/types';
import { ChessBoard } from '@/components/board/ChessBoard';
import { MoveHistory } from '@/components/board/MoveHistory';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface GameReplayProps {
  game: ChessComGame;
  username: string;
}

export function GameReplay({ game, username }: GameReplayProps) {
  const [chess] = useState(() => {
    const c = new Chess();
    c.loadPgn(game.pgn);
    return c;
  });

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const allMoves = chess.history({ verbose: true });

  // Calculate FEN at current position
  const getFenAtMove = useCallback(
    (moveIndex: number) => {
      const tempChess = new Chess();
      for (let i = 0; i < moveIndex; i++) {
        tempChess.move(allMoves[i].san);
      }
      return tempChess.fen();
    },
    [allMoves]
  );

  const currentFen = getFenAtMove(currentMoveIndex);
  const isWhite = game.white.username.toLowerCase() === username.toLowerCase();

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    if (currentMoveIndex >= allMoves.length) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentMoveIndex((i) => i + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentMoveIndex, allMoves.length]);

  const goToMove = (index: number) => {
    setCurrentMoveIndex(Math.max(0, Math.min(allMoves.length, index)));
  };

  const togglePlay = () => {
    if (currentMoveIndex >= allMoves.length) {
      setCurrentMoveIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  // Extract opening name from PGN if available
  const openingMatch = game.pgn.match(/\[ECOUrl ".*\/(.+)"\]/);
  const openingName = openingMatch
    ? openingMatch[1].replace(/-/g, ' ')
    : 'Unknown Opening';

  return (
    <div className="grid lg:grid-cols-[1fr,350px] gap-6">
      {/* Board */}
      <div className="flex flex-col items-center">
        <ChessBoard
          fen={currentFen}
          orientation={isWhite ? 'white' : 'black'}
          allowMoves={false}
          lastMove={
            currentMoveIndex > 0
              ? {
                  from: allMoves[currentMoveIndex - 1].from,
                  to: allMoves[currentMoveIndex - 1].to,
                }
              : undefined
          }
        />

        {/* Playback controls */}
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToMove(0)}
            disabled={currentMoveIndex === 0}
          >
            <ChevronFirst className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToMove(currentMoveIndex - 1)}
            disabled={currentMoveIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToMove(currentMoveIndex + 1)}
            disabled={currentMoveIndex >= allMoves.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToMove(allMoves.length)}
            disabled={currentMoveIndex >= allMoves.length}
          >
            <ChevronLast className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Side panel */}
      <div className="space-y-4">
        {/* Game info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Game Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white border" />
                <span>{game.white.username}</span>
              </div>
              <Badge variant="outline">{game.white.rating}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                <span>{game.black.username}</span>
              </div>
              <Badge variant="outline">{game.black.rating}</Badge>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm card-text-muted">Opening</p>
              <p className="text-sm font-medium card-text-primary capitalize">{openingName}</p>
            </div>
          </CardContent>
        </Card>

        {/* Move history */}
        <MoveHistory
          moves={allMoves}
          currentMoveIndex={currentMoveIndex}
          onMoveClick={goToMove}
        />
      </div>
    </div>
  );
}
