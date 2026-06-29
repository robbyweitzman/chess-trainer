import type { Opening } from '@/types';

export const frenchDefense: Opening = {
  id: "french-defense",
  name: "French Defense",
  color: "black",
  eco: "C02",
  description:
    "A solid, strategic answer to 1.e4. Black builds a sturdy pawn chain and aims to undermine White’s center. Famous for its reliable structures and counterattacking chances.",
  keyPrinciples: [
    "Challenge White’s center with ...d5 and ...c5",
    "Solve the problem of the light-squared bishop",
    "Aim for the freeing pawn breaks ...c5 and ...f6",
    "Stay patient — the French rewards good structure",
  ],
  moves: [
    {
      san: "e4",
      explanation:
        "White opens with the King’s Pawn.",
      fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      san: "e6",
      explanation:
        "The French! This prepares ...d5 to challenge White’s center.",
      fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      san: "d4",
      explanation:
        "White builds a big center.",
      fen: "rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2",
    },
    {
      san: "d5",
      explanation:
        "Strike at the center immediately — the key French idea.",
      fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
    },
    {
      san: "Nc3",
      explanation:
        "White defends e4 and develops.",
      fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3",
    },
    {
      san: "Nf6",
      explanation:
        "Develop and pressure the e4 pawn.",
      fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4",
    },
    {
      san: "e5",
      explanation:
        "White pushes ahead, gaining space and kicking your knight.",
      fen: "rnbqkb1r/ppp2ppp/4pn2/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4",
    },
    {
      san: "Nfd7",
      explanation:
        "Retreat the knight to a flexible square, ready to support ...c5.",
      fen: "rnbqkb1r/pppn1ppp/4p3/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR w KQkq - 1 5",
    },
    {
      san: "f4",
      explanation:
        "White bolsters the e5 spearhead.",
      fen: "rnbqkb1r/pppn1ppp/4p3/3pP3/3P1P2/2N5/PPP3PP/R1BQKBNR b KQkq - 0 5",
    },
    {
      san: "c5",
      explanation:
        "Counterattack the base of White’s pawn chain — the thematic break.",
      fen: "rnbqkb1r/pp1n1ppp/4p3/2ppP3/3P1P2/2N5/PPP3PP/R1BQKBNR w KQkq - 0 6",
    },
    {
      san: "Nf3",
      explanation:
        "White develops and defends d4.",
      fen: "rnbqkb1r/pp1n1ppp/4p3/2ppP3/3P1P2/2N2N2/PPP3PP/R1BQKB1R b KQkq - 1 6",
    },
    {
      san: "Nc6",
      explanation:
        "Pile up on d4 and complete your development.",
      fen: "r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P1P2/2N2N2/PPP3PP/R1BQKB1R w KQkq - 2 7",
    },
  ],
};
