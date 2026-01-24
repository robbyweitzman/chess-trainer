import { useMemo, useCallback } from 'react';
import { Chessboard, type ChessboardOptions } from 'react-chessboard';
import type { Square } from 'chess.js';
import { useAppStore } from '@/store/useAppStore';

const BOARD_THEMES = {
  green: {
    light: '#eeeed2',
    dark: '#769656',
  },
  brown: {
    light: '#f0d9b5',
    dark: '#b58863',
  },
  blue: {
    light: '#dee3e6',
    dark: '#8ca2ad',
  },
  purple: {
    light: '#e8e0f0',
    dark: '#9078b0',
  },
};

interface ChessBoardProps {
  fen: string;
  orientation?: 'white' | 'black';
  onMove?: (from: Square, to: Square, promotion?: string) => boolean;
  allowMoves?: boolean;
  highlightSquares?: Square[];
  lastMove?: { from: Square; to: Square };
}

export function ChessBoard({
  fen,
  orientation = 'white',
  onMove,
  allowMoves = true,
  highlightSquares = [],
  lastMove,
}: ChessBoardProps) {
  const { settings } = useAppStore();
  const theme = BOARD_THEMES[settings.boardTheme];

  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};

    // Highlight squares
    highlightSquares.forEach((square) => {
      styles[square] = {
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      };
    });

    // Last move highlight
    if (lastMove) {
      styles[lastMove.from] = {
        ...styles[lastMove.from],
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      };
      styles[lastMove.to] = {
        ...styles[lastMove.to],
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      };
    }

    return styles;
  }, [highlightSquares, lastMove]);

  const handlePieceDrop = useCallback(
    ({ sourceSquare, targetSquare, piece }: {
      piece: { pieceType: string; isSparePiece: boolean; position: string };
      sourceSquare: string;
      targetSquare: string | null
    }): boolean => {
      if (!allowMoves || !onMove || !targetSquare) return false;

      // Check if it's a pawn promotion
      const isPromotion =
        piece.pieceType[1] === 'P' &&
        ((piece.pieceType[0] === 'w' && targetSquare[1] === '8') ||
          (piece.pieceType[0] === 'b' && targetSquare[1] === '1'));

      return onMove(sourceSquare as Square, targetSquare as Square, isPromotion ? 'q' : undefined);
    },
    [allowMoves, onMove]
  );

  const options: ChessboardOptions = {
    position: fen,
    boardOrientation: orientation,
    onPieceDrop: handlePieceDrop,
    allowDragging: allowMoves,
    boardStyle: {
      borderRadius: '4px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
    darkSquareStyle: { backgroundColor: theme.dark },
    lightSquareStyle: { backgroundColor: theme.light },
    squareStyles: customSquareStyles,
    showNotation: settings.showCoordinates,
  };

  return (
    <div className="w-full max-w-[600px] aspect-square">
      <Chessboard options={options} />
    </div>
  );
}
