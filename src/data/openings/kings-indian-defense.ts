import type { Opening } from '@/types';

export const kingsIndianDefense: Opening = {
  id: "kings-indian-defense",
  name: "King’s Indian Defense",
  color: "black",
  eco: "E60",
  description:
    "A dynamic, fighting defense against 1.d4. Black lets White build a big center, then strikes back with ...e5 or ...c5 and a fierce kingside attack. Bold and rewarding.",
  keyPrinciples: [
    "Fianchetto the bishop on g7 to pressure the long diagonal",
    "Allow White a big center, then counterattack it",
    "Strike with ...e5 (or ...c5) at the right moment",
    "Castle early, then launch a kingside pawn storm",
  ],
  moves: [
    {
      san: "d4",
      explanation:
        "White opens with the Queen’s Pawn.",
      fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      san: "Nf6",
      explanation:
        "Develop the knight and control the center from afar.",
      fen: "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2",
    },
    {
      san: "c4",
      explanation:
        "White grabs more central space.",
      fen: "rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
    },
    {
      san: "g6",
      explanation:
        "Prepare to fianchetto the bishop — the heart of the King’s Indian.",
      fen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    },
    {
      san: "Nc3",
      explanation:
        "White develops and reinforces the center.",
      fen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3",
    },
    {
      san: "Bg7",
      explanation:
        "The King’s Indian bishop eyes the long diagonal and the center.",
      fen: "rnbqk2r/ppppppbp/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
    },
    {
      san: "e4",
      explanation:
        "White builds a massive pawn center.",
      fen: "rnbqk2r/ppppppbp/5np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq - 0 4",
    },
    {
      san: "d6",
      explanation:
        "Restrain the e5 square and prepare to strike the center.",
      fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5",
    },
    {
      san: "Nf3",
      explanation:
        "White develops naturally.",
      fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R b KQkq - 1 5",
    },
    {
      san: "O-O",
      explanation:
        "Castle quickly — king safety before the fireworks.",
      fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQ - 2 6",
    },
    {
      san: "Be2",
      explanation:
        "White completes development, ready to castle.",
      fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R b KQ - 3 6",
    },
    {
      san: "e5",
      explanation:
        "Strike at the center — the thematic King’s Indian counterpunch.",
      fen: "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQK2R w KQ - 0 7",
    },
  ],
};
