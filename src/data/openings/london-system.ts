import type { Opening } from '@/types';

export const londonSystem: Opening = {
  id: 'london-system',
  name: 'London System',
  color: 'white',
  eco: 'D02',
  description:
    'A solid, systematic opening where White develops pieces to the same squares regardless of what Black plays. Easy to learn and hard to refute.',
  keyPrinciples: [
    'Develop bishop to f4 before playing e3',
    'Build the "pyramid" pawn structure',
    'Castle kingside for safety',
    'Keep a solid, hard-to-attack position',
  ],
  moves: [
    {
      san: 'd4',
      explanation:
        'The London starts with d4, controlling the center and opening a path for your dark-squared bishop.',
      fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    },
    {
      san: 'd5',
      explanation: 'Black stakes their claim in the center. A classical response.',
      fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2',
    },
    {
      san: 'Bf4',
      explanation:
        'The signature move of the London! Develop the bishop BEFORE playing e3. This bishop is your most active piece.',
      fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2',
    },
    {
      san: 'Nf6',
      explanation: 'Black develops a knight, a natural move attacking nothing yet.',
      fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3',
    },
    {
      san: 'e3',
      explanation:
        'Solidify the center and complete the bishop\'s protection. This creates the "London pyramid" structure.',
      fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR b KQkq - 0 3',
    },
    {
      san: 'e6',
      explanation: 'Black supports their d5 pawn, creating a solid structure.',
      fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 4',
    },
    {
      san: 'Nf3',
      explanation:
        'Develop the knight to its best square, controlling e5 and preparing to castle.',
      fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R b KQkq - 1 4',
    },
    {
      san: 'c5',
      explanation: 'Black challenges your center. This is the main test of the London.',
      fen: 'rnbqkb1r/pp3ppp/4pn2/2pp4/3P1B2/4PN2/PPP2PPP/RN1QKB1R w KQkq c6 0 5',
    },
    {
      san: 'c3',
      explanation:
        'Support the d4 pawn! This maintains your strong center and completes the pyramid.',
      fen: 'rnbqkb1r/pp3ppp/4pn2/2pp4/3P1B2/2P1PN2/PP3PPP/RN1QKB1R b KQkq - 0 5',
    },
    {
      san: 'Nc6',
      explanation: 'Black develops, putting pressure on d4.',
      fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P1B2/2P1PN2/PP3PPP/RN1QKB1R w KQkq - 1 6',
    },
    {
      san: 'Bd3',
      explanation:
        'Develop the bishop to a great diagonal, eyeing the kingside. You\'re almost ready to castle!',
      fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P1B2/2PBPN2/PP3PPP/RN1QK2R b KQkq - 2 6',
    },
  ],
};
