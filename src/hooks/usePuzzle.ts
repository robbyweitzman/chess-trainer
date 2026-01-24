import { useState, useCallback, useMemo, useEffect } from 'react';
import { Chess, type Square } from 'chess.js';
import type { Puzzle } from '@/types';
import { useAppStore } from '@/store/useAppStore';

export type PuzzleStatus = 'playing' | 'correct' | 'incorrect';
export type HintLevel = 0 | 1 | 2 | 3; // none, theme, piece type, exact square

export function usePuzzle(puzzle: Puzzle | null) {
  const [game, setGame] = useState<Chess | null>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [status, setStatus] = useState<PuzzleStatus>('playing');
  const [hintLevel, setHintLevel] = useState<HintLevel>(0);
  const [attempts, setAttempts] = useState(0);

  const { recordPuzzleAttempt, updateStreak } = useAppStore();

  // Initialize game from puzzle FEN
  useEffect(() => {
    if (puzzle) {
      const newGame = new Chess(puzzle.fen);
      setGame(newGame);
      setCurrentMoveIndex(0);
      setStatus('playing');
      setHintLevel(0);
      setAttempts(0);

      // Make the first move (opponent's last move that sets up the puzzle)
      if (puzzle.moves.length > 0) {
        const firstMove = puzzle.moves[0];
        try {
          newGame.move({
            from: firstMove.slice(0, 2) as Square,
            to: firstMove.slice(2, 4) as Square,
            promotion: firstMove[4] as 'q' | 'r' | 'b' | 'n' | undefined,
          });
          setGame(new Chess(newGame.fen()));
          setCurrentMoveIndex(1);
        } catch (e) {
          console.error('Failed to make initial puzzle move:', e);
        }
      }
    }
  }, [puzzle]);

  const fen = useMemo(() => game?.fen() || puzzle?.fen || '', [game, puzzle]);
  const turn = useMemo(() => game?.turn() || 'w', [game]);

  const expectedMove = useMemo(() => {
    if (!puzzle || currentMoveIndex >= puzzle.moves.length) return null;
    return puzzle.moves[currentMoveIndex];
  }, [puzzle, currentMoveIndex]);

  const makeMove = useCallback(
    (from: Square, to: Square, promotion?: 'q' | 'r' | 'b' | 'n'): boolean => {
      if (!game || !puzzle || status !== 'playing' || !expectedMove) {
        return false;
      }

      const moveUci = `${from}${to}${promotion || ''}`;
      const isCorrect = moveUci === expectedMove ||
        (moveUci + 'q' === expectedMove); // Handle auto-queen

      if (isCorrect) {
        // Make the move
        const newGame = new Chess(game.fen());
        try {
          newGame.move({ from, to, promotion: promotion || 'q' });
        } catch {
          return false;
        }

        const nextMoveIndex = currentMoveIndex + 1;

        // Check if puzzle is complete
        if (nextMoveIndex >= puzzle.moves.length) {
          setGame(newGame);
          setStatus('correct');
          recordPuzzleAttempt(puzzle.id, true, hintLevel);
          updateStreak();
          return true;
        }

        // Make opponent's response
        const opponentMove = puzzle.moves[nextMoveIndex];
        try {
          newGame.move({
            from: opponentMove.slice(0, 2) as Square,
            to: opponentMove.slice(2, 4) as Square,
            promotion: opponentMove[4] as 'q' | 'r' | 'b' | 'n' | undefined,
          });
        } catch (e) {
          console.error('Failed to make opponent move:', e);
        }

        setGame(new Chess(newGame.fen()));
        setCurrentMoveIndex(nextMoveIndex + 1);
        return true;
      } else {
        setAttempts((a) => a + 1);

        // After 3 wrong attempts, mark as incorrect
        if (attempts >= 2) {
          setStatus('incorrect');
          recordPuzzleAttempt(puzzle.id, false, hintLevel);
        }

        return false;
      }
    },
    [game, puzzle, status, expectedMove, currentMoveIndex, attempts, hintLevel, recordPuzzleAttempt, updateStreak]
  );

  const showHint = useCallback(() => {
    if (hintLevel < 3) {
      setHintLevel((h) => (h + 1) as HintLevel);
    }
  }, [hintLevel]);

  const getHint = useCallback((): string => {
    if (!puzzle || !expectedMove) return '';

    switch (hintLevel) {
      case 1:
        return `Theme: ${puzzle.themes.join(', ')}`;
      case 2: {
        const from = expectedMove.slice(0, 2);
        const piece = game?.get(from as Square);
        return `Move the ${piece?.type === 'p' ? 'pawn' : piece?.type === 'n' ? 'knight' : piece?.type === 'b' ? 'bishop' : piece?.type === 'r' ? 'rook' : piece?.type === 'q' ? 'queen' : 'king'}`;
      }
      case 3:
        return `Move from ${expectedMove.slice(0, 2)} to ${expectedMove.slice(2, 4)}`;
      default:
        return '';
    }
  }, [puzzle, expectedMove, hintLevel, game]);

  const retry = useCallback(() => {
    if (puzzle) {
      const newGame = new Chess(puzzle.fen);
      if (puzzle.moves.length > 0) {
        const firstMove = puzzle.moves[0];
        try {
          newGame.move({
            from: firstMove.slice(0, 2) as Square,
            to: firstMove.slice(2, 4) as Square,
            promotion: firstMove[4] as 'q' | 'r' | 'b' | 'n' | undefined,
          });
        } catch (e) {
          console.error('Failed to make initial move on retry:', e);
        }
      }
      setGame(new Chess(newGame.fen()));
      setCurrentMoveIndex(1);
      setStatus('playing');
      setHintLevel(0);
      setAttempts(0);
    }
  }, [puzzle]);

  return {
    fen,
    turn,
    status,
    hintLevel,
    attempts,
    currentMoveIndex,
    totalMoves: puzzle?.moves.length || 0,
    makeMove,
    showHint,
    getHint,
    retry,
  };
}
