import type { Opening } from '@/types';

export const scandinavian: Opening = {
  id: 'scandinavian',
  name: 'Scandinavian Defense',
  color: 'black',
  eco: 'B01',
  description:
    'An aggressive defense that immediately challenges White\'s e4 pawn. Simple to learn with clear plans. The queen comes out early but finds a safe home.',
  keyPrinciples: [
    'Challenge the center immediately',
    'Place the queen on a5 for safety',
    'Develop pieces quickly after the queen moves',
    'Aim for rapid development and solid position',
  ],
  moves: [
    {
      san: 'e4',
      explanation: 'White plays the most popular first move.',
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    },
    {
      san: 'd5',
      explanation:
        'The Scandinavian! Immediately attack White\'s e4 pawn. Simple and direct.',
      fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2',
    },
    {
      san: 'exd5',
      explanation: 'White almost always captures. Now you recapture with the queen.',
      fen: 'rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2',
    },
    {
      san: 'Qxd5',
      explanation:
        'Recapture with the queen! Yes, the queen is out early, but you\'ll find a safe spot for her.',
      fen: 'rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3',
    },
    {
      san: 'Nc3',
      explanation: 'White attacks your queen and develops a piece.',
      fen: 'rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3',
    },
    {
      san: 'Qa5',
      explanation:
        'The modern main line! The queen is safe here, pins the knight to the king, and stays active.',
      fen: 'rnb1kbnr/ppp1pppp/8/q7/8/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 4',
    },
    {
      san: 'd4',
      explanation: 'White claims the center.',
      fen: 'rnb1kbnr/ppp1pppp/8/q7/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq d3 0 4',
    },
    {
      san: 'Nf6',
      explanation:
        'Develop the knight! Attack the now-undefended e4 square and prepare ...Bf5.',
      fen: 'rnb1kb1r/ppp1pppp/5n2/q7/3P4/2N5/PPP2PPP/R1BQKBNR w KQkq - 1 5',
    },
    {
      san: 'Nf3',
      explanation: 'White develops, defending d4.',
      fen: 'rnb1kb1r/ppp1pppp/5n2/q7/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 2 5',
    },
    {
      san: 'Bf5',
      explanation:
        'Develop the bishop actively! Like the Caro-Kann, get this bishop out before playing ...e6.',
      fen: 'rn2kb1r/ppp1pppp/5n2/q4b2/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 3 6',
    },
    {
      san: 'Bc4',
      explanation: 'White develops aggressively, targeting f7.',
      fen: 'rn2kb1r/ppp1pppp/5n2/q4b2/2BP4/2N2N2/PPP2PPP/R1BQK2R b KQkq - 4 6',
    },
  ],
};
