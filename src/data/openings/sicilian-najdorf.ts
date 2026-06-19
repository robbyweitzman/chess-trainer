import type { Opening } from '@/types';

export const sicilianNajdorf: Opening = {
  id: "sicilian-najdorf",
  name: "Sicilian Defense: Najdorf",
  color: "black",
  eco: "B90",
  description:
    "The most respected answer to 1.e4. Black fights for the center asymmetrically and plays for a win. The Najdorf, with the flexible ...a6, is a favorite of world champions.",
  keyPrinciples: [
    "Fight for the center asymmetrically with ...c5",
    "Play the flexible ...a6 to control b5 and prepare expansion",
    "Aim for active, unbalanced positions",
    "Develop quickly and watch for tactical chances",
  ],
  moves: [
    {
      san: "e4",
      explanation:
        "White opens with the King’s Pawn.",
      fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      san: "c5",
      explanation:
        "The Sicilian! Fight for the center without symmetry and play for the win.",
      fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      san: "Nf3",
      explanation:
        "White develops toward the center.",
      fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    },
    {
      san: "d6",
      explanation:
        "Control e5 and open a path for the light-squared bishop.",
      fen: "rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    },
    {
      san: "d4",
      explanation:
        "White opens the center.",
      fen: "rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
    },
    {
      san: "cxd4",
      explanation:
        "Capture — trading a wing pawn for a central one.",
      fen: "rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    },
    {
      san: "Nxd4",
      explanation:
        "White recaptures with the knight.",
      fen: "rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    },
    {
      san: "Nf6",
      explanation:
        "Develop and attack the e4 pawn.",
      fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    },
    {
      san: "Nc3",
      explanation:
        "White defends e4 and develops.",
      fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5",
    },
    {
      san: "a6",
      explanation:
        "The Najdorf move! It controls b5 and prepares queenside play.",
      fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6",
    },
    {
      san: "Be2",
      explanation:
        "White develops solidly, ready to castle.",
      fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP1BPPP/R1BQK2R b KQkq - 1 6",
    },
    {
      san: "e5",
      explanation:
        "Grab central space and gain time — a thematic Najdorf strike.",
      fen: "rnbqkb1r/1p3ppp/p2p1n2/4p3/3NP3/2N5/PPP1BPPP/R1BQK2R w KQkq - 0 7",
    },
  ],
};
