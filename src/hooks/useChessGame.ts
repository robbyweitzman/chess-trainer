import { useState, useCallback, useMemo } from 'react';
import { Chess, type Square, type Move } from 'chess.js';

export interface UseChessGameOptions {
  initialFen?: string;
  onMove?: (move: Move) => void;
}

export function useChessGame(options: UseChessGameOptions = {}) {
  const [game, setGame] = useState(() => new Chess(options.initialFen));
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const fen = useMemo(() => game.fen(), [game]);
  const turn = useMemo(() => game.turn(), [game]);
  const isGameOver = useMemo(() => game.isGameOver(), [game]);
  const isCheck = useMemo(() => game.isCheck(), [game]);
  const isCheckmate = useMemo(() => game.isCheckmate(), [game]);
  const isStalemate = useMemo(() => game.isStalemate(), [game]);
  const isDraw = useMemo(() => game.isDraw(), [game]);

  const makeMove = useCallback(
    (
      move:
        | string
        | { from: Square; to: Square; promotion?: 'q' | 'r' | 'b' | 'n' }
    ): Move | null => {
      try {
        const newGame = new Chess(game.fen());
        const result = newGame.move(move);

        if (result) {
          setGame(newGame);
          setMoveHistory((prev) => [...prev, result]);
          setCurrentMoveIndex((prev) => prev + 1);
          options.onMove?.(result);
        }

        return result;
      } catch {
        return null;
      }
    },
    [game, options]
  );

  const undoMove = useCallback(() => {
    const newGame = new Chess(game.fen());
    const undone = newGame.undo();

    if (undone) {
      setGame(newGame);
      setMoveHistory((prev) => prev.slice(0, -1));
      setCurrentMoveIndex((prev) => Math.max(0, prev - 1));
    }

    return undone;
  }, [game]);

  const reset = useCallback(
    (fen?: string) => {
      setGame(new Chess(fen || options.initialFen));
      setMoveHistory([]);
      setCurrentMoveIndex(0);
    },
    [options.initialFen]
  );

  const loadPgn = useCallback((pgn: string): boolean => {
    try {
      const newGame = new Chess();
      newGame.loadPgn(pgn);
      setGame(newGame);
      setMoveHistory(newGame.history({ verbose: true }));
      setCurrentMoveIndex(newGame.history().length);
      return true;
    } catch {
      return false;
    }
  }, []);

  const goToMove = useCallback(
    (index: number) => {
      if (index < 0 || index > moveHistory.length) return;

      const newGame = new Chess(options.initialFen);
      for (let i = 0; i < index; i++) {
        newGame.move(moveHistory[i].san);
      }
      setGame(newGame);
      setCurrentMoveIndex(index);
    },
    [moveHistory, options.initialFen]
  );

  const getLegalMoves = useCallback(
    (square: Square): Square[] => {
      const moves = game.moves({ square, verbose: true });
      return moves.map((m) => m.to);
    },
    [game]
  );

  return {
    game,
    fen,
    turn,
    isGameOver,
    isCheck,
    isCheckmate,
    isStalemate,
    isDraw,
    moveHistory,
    currentMoveIndex,
    makeMove,
    undoMove,
    reset,
    loadPgn,
    goToMove,
    getLegalMoves,
  };
}
