import { useState, useMemo, useCallback } from 'react';
import { Chessboard, type ChessboardOptions } from 'react-chessboard';
import { Chess, type Square } from 'chess.js';
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

  // State for click-to-move
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);

  // Get legal moves for a piece at a square
  const getLegalMovesForSquare = useCallback((square: Square, currentFen: string): Square[] => {
    try {
      const chess = new Chess(currentFen);
      const moves = chess.moves({ square, verbose: true });
      return moves.map(move => move.to as Square);
    } catch {
      return [];
    }
  }, []);

  // Handle square click for click-to-move
  const handleSquareClick = useCallback(({ square }: { piece?: unknown; square: string }) => {
    if (!allowMoves || !onMove) return;

    const clickedSquare = square as Square;

    // If we have a selected square and click on a legal move target
    if (selectedSquare && legalMoves.includes(clickedSquare)) {
      // Check if it's a pawn promotion
      const chess = new Chess(fen);
      const piece = chess.get(selectedSquare);
      const isPromotion = piece?.type === 'p' &&
        ((piece.color === 'w' && clickedSquare[1] === '8') ||
         (piece.color === 'b' && clickedSquare[1] === '1'));

      onMove(selectedSquare, clickedSquare, isPromotion ? 'q' : undefined);
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // Check if clicked square has a piece we can move
    try {
      const chess = new Chess(fen);
      const piece = chess.get(clickedSquare);

      if (piece && piece.color === chess.turn()) {
        // Select this piece
        setSelectedSquare(clickedSquare);
        setLegalMoves(getLegalMovesForSquare(clickedSquare, fen));
      } else {
        // Clicked empty square or opponent piece - deselect
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    } catch {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }, [allowMoves, onMove, selectedSquare, legalMoves, fen, getLegalMovesForSquare]);

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

    // Selected square highlight
    if (selectedSquare) {
      styles[selectedSquare] = {
        ...styles[selectedSquare],
        backgroundColor: 'rgba(100, 150, 255, 0.5)',
      };
    }

    // Legal move indicators
    legalMoves.forEach((square) => {
      styles[square] = {
        ...styles[square],
        background: styles[square]?.backgroundColor
          ? `radial-gradient(circle, rgba(0, 0, 0, 0.2) 25%, transparent 25%), ${styles[square].backgroundColor}`
          : 'radial-gradient(circle, rgba(0, 0, 0, 0.2) 25%, transparent 25%)',
        backgroundSize: '100% 100%',
      };
    });

    return styles;
  }, [highlightSquares, lastMove, selectedSquare, legalMoves]);

  const handlePieceDrop = useCallback(
    ({ sourceSquare, targetSquare, piece }: {
      piece: { pieceType: string; isSparePiece: boolean; position: string };
      sourceSquare: string;
      targetSquare: string | null
    }): boolean => {
      // Clear click-to-move selection when dragging
      setSelectedSquare(null);
      setLegalMoves([]);

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
    onSquareClick: handleSquareClick,
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
