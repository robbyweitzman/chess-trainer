import type { Opening } from '@/types';

export const slavDefense: Opening = {
  id: "slav-defense",
  name: "Slav Defense",
  color: "black",
  eco: "D10",
  description:
    "A rock-solid answer to the Queen’s Gambit. Black supports the d5 pawn with ...c6, keeping the light-squared bishop free — a key improvement over the Queen’s Gambit Declined.",
  keyPrinciples: [
    "Support d5 with ...c6 while keeping the bishop free",
    "Develop the light-squared bishop outside the pawn chain",
    "Hold a solid central structure",
    "Complete development before seeking activity",
  ],
  moves: [
    {
      san: "d4",
      explanation:
        "White opens with the Queen’s Pawn.",
      fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      san: "d5",
      explanation:
        "Contest the center immediately.",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      san: "c4",
      explanation:
        "The Queen’s Gambit — White pressures your d5 pawn.",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
    },
    {
      san: "c6",
      explanation:
        "The Slav! Defend d5 while keeping your light-squared bishop’s diagonal open.",
      fen: "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    },
    {
      san: "Nf3",
      explanation:
        "White develops toward the center.",
      fen: "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3",
    },
    {
      san: "Nf6",
      explanation:
        "Develop and guard the d5 pawn.",
      fen: "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4",
    },
    {
      san: "Nc3",
      explanation:
        "White piles up on d5.",
      fen: "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 3 4",
    },
    {
      san: "dxc4",
      explanation:
        "Capture on c4 — a key Slav idea now that you can hold the pawn with ...b5 ideas.",
      fen: "rnbqkb1r/pp2pppp/2p2n2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
    },
    {
      san: "a4",
      explanation:
        "White stops ...b5 and prepares to regain the pawn.",
      fen: "rnbqkb1r/pp2pppp/2p2n2/8/P1pP4/2N2N2/1P2PPPP/R1BQKB1R b KQkq - 0 5",
    },
    {
      san: "Bf5",
      explanation:
        "Develop the bishop actively outside the pawn chain — the point of the Slav.",
      fen: "rn1qkb1r/pp2pppp/2p2n2/5b2/P1pP4/2N2N2/1P2PPPP/R1BQKB1R w KQkq - 1 6",
    },
    {
      san: "e3",
      explanation:
        "White opens lines and prepares to recapture c4.",
      fen: "rn1qkb1r/pp2pppp/2p2n2/5b2/P1pP4/2N1PN2/1P3PPP/R1BQKB1R b KQkq - 0 6",
    },
    {
      san: "e6",
      explanation:
        "Solidify the center and open a path for your dark-squared bishop.",
      fen: "rn1qkb1r/pp3ppp/2p1pn2/5b2/P1pP4/2N1PN2/1P3PPP/R1BQKB1R w KQkq - 0 7",
    },
  ],
};
