import type { Opening } from '@/types';

export const italianGame: Opening = {
  id: 'italian-game',
  name: 'Italian Game',
  color: 'white',
  eco: 'C50',
  description:
    'A classical opening that emphasizes rapid development and control of the center. Perfect for beginners to learn fundamental opening principles.',
  keyPrinciples: [
    'Control the center with pawns',
    'Develop knights before bishops',
    'Castle early for king safety',
    'Connect your rooks',
  ],
  moves: [
    {
      san: 'e4',
      explanation:
        'Control the center! This pawn controls d5 and f5, and opens lines for your queen and bishop.',
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    },
    {
      san: 'e5',
      explanation: "Black mirrors your center control. Now it's a fight for the center!",
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
    },
    {
      san: 'Nf3',
      explanation:
        'Develop your knight toward the center! This knight attacks the e5 pawn and controls d4.',
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
    },
    {
      san: 'Nc6',
      explanation: 'Black defends the e5 pawn with the knight. Good development!',
      fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    },
    {
      san: 'Bc4',
      explanation:
        'The Italian Bishop! This bishop aims at the weak f7 square near Black\'s king. It also prepares to castle.',
      fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    },
    {
      san: 'Bc5',
      explanation:
        'Black develops their bishop actively, also targeting f2. Now both sides have strong bishops!',
      fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    },
    {
      san: 'c3',
      explanation:
        'Preparing d4! This move supports a central pawn push and gives your bishop a retreat square on c2.',
      fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4',
    },
    {
      san: 'Nf6',
      explanation:
        'Black develops their last minor piece, attacking your e4 pawn.',
      fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5',
    },
    {
      san: 'd4',
      explanation:
        'Strike in the center! This opens up the position and challenges Black\'s setup. Your pieces are ready for action!',
      fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQK2R b KQkq d3 0 5',
    },
    {
      san: 'exd4',
      explanation: 'Black captures, opening the center.',
      fen: 'r1bqk2r/pppp1ppp/2n2n2/2b5/2BpP3/2P2N2/PP3PPP/RNBQK2R w KQkq - 0 6',
    },
    {
      san: 'cxd4',
      explanation:
        'Recapture with the pawn! You now have a strong pawn center and open lines for all your pieces.',
      fen: 'r1bqk2r/pppp1ppp/2n2n2/2b5/2BPP3/5N2/PP3PPP/RNBQK2R b KQkq - 0 6',
    },
  ],
};
