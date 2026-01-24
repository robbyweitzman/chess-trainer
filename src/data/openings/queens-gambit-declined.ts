import type { Opening } from '@/types';

export const queensGambitDeclined: Opening = {
  id: 'qgd',
  name: "Queen's Gambit Declined",
  color: 'black',
  eco: 'D30',
  description:
    'A classical, solid response to 1.d4. Black maintains the central tension and develops naturally. Favored by world champions for its reliability.',
  keyPrinciples: [
    'Maintain the d5 pawn as an anchor',
    'Develop pieces to natural squares',
    'Be patient - don\'t rush to resolve the tension',
    'The c8 bishop is tricky - plan for it',
  ],
  moves: [
    {
      san: 'd4',
      explanation: 'White opens with the Queen\'s Pawn.',
      fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    },
    {
      san: 'd5',
      explanation: 'Take your share of the center! This leads to solid, classical play.',
      fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2',
    },
    {
      san: 'c4',
      explanation:
        'The Queen\'s Gambit! White offers a pawn to undermine your center. Don\'t take it!',
      fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2',
    },
    {
      san: 'e6',
      explanation:
        'Decline the gambit! This solidly defends d5 and prepares to develop the bishop.',
      fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    },
    {
      san: 'Nc3',
      explanation: 'White develops and puts more pressure on d5.',
      fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3',
    },
    {
      san: 'Nf6',
      explanation: 'Develop the knight! It defends d5 and controls e4.',
      fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
    },
    {
      san: 'Bg5',
      explanation: 'White pins the knight to the queen. A standard move.',
      fen: 'rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4',
    },
    {
      san: 'Be7',
      explanation:
        'Break the pin naturally. The bishop develops and you can castle next.',
      fen: 'rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR w KQkq - 4 5',
    },
    {
      san: 'Nf3',
      explanation: 'White continues development.',
      fen: 'rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R b KQkq - 5 5',
    },
    {
      san: 'O-O',
      explanation: 'Castle to safety! Your king is secure and your rook enters the game.',
      fen: 'rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R w KQ - 6 6',
    },
    {
      san: 'e3',
      explanation: 'White solidifies the center.',
      fen: 'rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R b KQ - 0 6',
    },
  ],
};
