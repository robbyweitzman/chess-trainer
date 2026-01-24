import type { Opening } from '@/types';

export const caroKann: Opening = {
  id: 'caro-kann',
  name: 'Caro-Kann Defense',
  color: 'black',
  eco: 'B10',
  description:
    'A rock-solid defense against 1.e4. Black builds a sturdy pawn structure and develops pieces to natural squares. Great for beginners who want safety.',
  keyPrinciples: [
    'Build a solid pawn structure',
    'Develop the light-squared bishop before playing e6',
    'Don\'t rush - patience wins in the Caro-Kann',
    'Aim for a safe, long-term position',
  ],
  moves: [
    {
      san: 'e4',
      explanation: "White opens with the King's Pawn. Time to respond with Caro-Kann!",
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    },
    {
      san: 'c6',
      explanation:
        'The Caro-Kann! This prepares ...d5 while keeping options open for the light-squared bishop.',
      fen: 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    },
    {
      san: 'd4',
      explanation: 'White builds a strong center. Standard play.',
      fen: 'rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2',
    },
    {
      san: 'd5',
      explanation:
        'Challenge the center immediately! This is the point of ...c6 - supporting this pawn push.',
      fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3',
    },
    {
      san: 'e5',
      explanation:
        'The Advance Variation. White pushes forward, but the center becomes fixed.',
      fen: 'rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
    },
    {
      san: 'Bf5',
      explanation:
        'Develop the bishop BEFORE playing e6! This is the key idea - the bishop is active outside the pawn chain.',
      fen: 'rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 1 4',
    },
    {
      san: 'Nf3',
      explanation: 'White develops naturally.',
      fen: 'rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/5N2/PPP2PPP/RNBQKB1R b KQkq - 2 4',
    },
    {
      san: 'e6',
      explanation:
        'Now we can play e6! The bishop is already out, so we\'re not blocking it in.',
      fen: 'rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    },
    {
      san: 'Be2',
      explanation: 'White prepares to castle.',
      fen: 'rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQK2R b KQkq - 1 5',
    },
    {
      san: 'Ne7',
      explanation:
        'The knight goes to e7, heading for f5 or g6. A typical Caro-Kann maneuver!',
      fen: 'rn1qkb1r/pp2nppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQK2R w KQkq - 2 6',
    },
    {
      san: 'O-O',
      explanation: 'White castles to safety.',
      fen: 'rn1qkb1r/pp2nppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQ1RK1 b kq - 3 6',
    },
  ],
};
