import { useState, useCallback, useMemo } from 'react';
import { Chess } from 'chess.js';
import type { Opening, OpeningMove } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import {
  createInitialProgress,
  updateProgressAfterPractice,
} from '@/services/spacedRepetition';

export type TrainingMode = 'learn' | 'practice';

export interface UseOpeningTrainerOptions {
  opening: Opening;
  mode: TrainingMode;
}

export function useOpeningTrainer({ opening, mode }: UseOpeningTrainerOptions) {
  const [game] = useState(() => new Chess());
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showingHint, setShowingHint] = useState(false);

  const { progress, updateOpeningProgress, updateStreak } = useAppStore();

  const playerColor = opening.color;
  const isPlayerTurn = useMemo(() => {
    const currentTurn = game.turn();
    return (playerColor === 'white' && currentTurn === 'w') ||
           (playerColor === 'black' && currentTurn === 'b');
  }, [game, playerColor, currentMoveIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentMove: OpeningMove | undefined = opening.moves[currentMoveIndex];
  const expectedMove = currentMove?.san;

  const fen = useMemo(() => {
    if (currentMoveIndex === 0) {
      return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    }
    return opening.moves[currentMoveIndex - 1]?.fen || game.fen();
  }, [currentMoveIndex, opening.moves, game]);

  const makeMove = useCallback(
    (san: string): { correct: boolean; message: string } => {
      if (isComplete) {
        return { correct: false, message: 'Opening complete!' };
      }

      if (!isPlayerTurn) {
        return { correct: false, message: "Wait for opponent's move" };
      }

      const isCorrect = san === expectedMove;

      if (isCorrect) {
        const newIndex = currentMoveIndex + 1;
        setCurrentMoveIndex(newIndex);
        setShowingHint(false);

        // Check if there's an opponent response
        if (newIndex < opening.moves.length) {
          const nextMove = opening.moves[newIndex];
          const nextTurn = nextMove.fen.split(' ')[1];
          const isOpponentNext =
            (playerColor === 'white' && nextTurn === 'b') ||
            (playerColor === 'black' && nextTurn === 'w');

          if (!isOpponentNext && newIndex + 1 < opening.moves.length) {
            // Auto-play opponent's move after a short delay would be nice
            // For now, just advance past opponent moves
            setCurrentMoveIndex(newIndex + 1);
          }
        }

        // Check if complete
        if (newIndex >= opening.moves.length - 1) {
          setIsComplete(true);

          if (mode === 'practice') {
            const openingProgress =
              progress.openingProgress[opening.id] || createInitialProgress();
            const correct = mistakes === 0;
            const newProgress = updateProgressAfterPractice(openingProgress, correct);
            updateOpeningProgress(opening.id, newProgress);
            updateStreak();
          }
        }

        return {
          correct: true,
          message: currentMove?.explanation || 'Correct!',
        };
      } else {
        setMistakes((m) => m + 1);
        return {
          correct: false,
          message: mode === 'learn'
            ? `Try again. The correct move is ${expectedMove}`
            : 'Incorrect. Try again!',
        };
      }
    },
    [
      isComplete,
      isPlayerTurn,
      expectedMove,
      currentMoveIndex,
      opening,
      playerColor,
      mode,
      progress.openingProgress,
      mistakes,
      updateOpeningProgress,
      updateStreak,
      currentMove,
    ]
  );

  const advanceOpponentMove = useCallback(() => {
    if (isComplete || isPlayerTurn) return;

    const newIndex = currentMoveIndex + 1;
    setCurrentMoveIndex(newIndex);

    if (newIndex >= opening.moves.length) {
      setIsComplete(true);
    }
  }, [isComplete, isPlayerTurn, currentMoveIndex, opening.moves.length]);

  const reset = useCallback(() => {
    setCurrentMoveIndex(0);
    setIsComplete(false);
    setMistakes(0);
    setShowingHint(false);
  }, []);

  const showHint = useCallback(() => {
    setShowingHint(true);
  }, []);

  const goToMove = useCallback((index: number) => {
    if (index >= 0 && index < opening.moves.length) {
      setCurrentMoveIndex(index);
      setIsComplete(false);
    }
  }, [opening.moves.length]);

  return {
    fen,
    currentMoveIndex,
    currentMove,
    expectedMove,
    isPlayerTurn,
    isComplete,
    mistakes,
    showingHint,
    playerColor,
    totalMoves: opening.moves.length,
    makeMove,
    advanceOpponentMove,
    reset,
    showHint,
    goToMove,
  };
}
