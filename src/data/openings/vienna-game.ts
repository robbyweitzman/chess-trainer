import type { Opening } from '@/types';

export const viennaGame: Opening = {
  id: "vienna-game",
  name: "Vienna Game",
  color: "white",
  eco: "C25",
  description:
    "A flexible King’s Pawn opening where White develops the queen’s knight first, keeping options open for an early f4 push or a quiet, solid setup.",
  keyPrinciples: [
    "Develop knights toward the center early",
    "Keep the option of an f4 pawn break",
    "Aim the bishop at the weak f7 square",
    "Stay flexible before committing your central pawns",
  ],
  moves: [
    {
      san: "e4",
      explanation:
        "Claim the center with the King’s Pawn.",
      fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      san: "e5",
      explanation:
        "Black contests the center symmetrically.",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      san: "Nc3",
      explanation:
        "The Vienna idea: develop the queen’s knight first, eyeing d5 and keeping f-pawn options open.",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
    },
    {
      san: "Nf6",
      explanation:
        "Black develops and hits your e4 pawn.",
      fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3",
    },
    {
      san: "Bc4",
      explanation:
        "Target the sensitive f7 square and prepare to castle.",
      fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR b KQkq - 3 3",
    },
    {
      san: "Nc6",
      explanation:
        "Black develops the other knight, defending e5.",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR w KQkq - 4 4",
    },
    {
      san: "d3",
      explanation:
        "Support e4 and open a path for your dark-squared bishop.",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2NP4/PPP2PPP/R1BQK1NR b KQkq - 0 4",
    },
    {
      san: "Bb4",
      explanation:
        "Black pins your knight against the king.",
      fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP4/PPP2PPP/R1BQK1NR w KQkq - 1 5",
    },
    {
      san: "Ne2",
      explanation:
        "Unpin gracefully and reroute the knight, keeping your structure intact.",
      fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP4/PPP1NPPP/R1BQK2R b KQkq - 2 5",
    },
  ],
};
