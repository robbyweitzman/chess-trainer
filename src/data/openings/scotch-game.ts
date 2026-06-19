import type { Opening } from '@/types';

export const scotchGame: Opening = {
  id: "scotch-game",
  name: "Scotch Game",
  color: "white",
  eco: "C45",
  description:
    "White strikes in the center immediately with d4, opening the position early. The Scotch leads to clear, active piece play — great for understanding open positions.",
  keyPrinciples: [
    "Open the center early with d4",
    "Develop pieces to active, central squares",
    "Use your lead in development to create pressure",
    "Castle and connect your rooks",
  ],
  moves: [
    {
      san: "e4",
      explanation:
        "Take the center with the King’s Pawn.",
      fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      san: "e5",
      explanation:
        "Black fights back for central space.",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      san: "Nf3",
      explanation:
        "Develop and attack the e5 pawn.",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    },
    {
      san: "Nc6",
      explanation:
        "Black defends e5 naturally.",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    },
    {
      san: "d4",
      explanation:
        "The Scotch! Strike in the center immediately and open lines.",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
    },
    {
      san: "exd4",
      explanation:
        "Black captures — the center opens up.",
      fen: "r1bqkbnr/pppp1ppp/2n5/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    },
    {
      san: "Nxd4",
      explanation:
        "Recapture with the knight, landing it on a strong central square.",
      fen: "r1bqkbnr/pppp1ppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    },
    {
      san: "Bc5",
      explanation:
        "Black develops actively, eyeing your knight on d4.",
      fen: "r1bqk1nr/pppp1ppp/2n5/2b5/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    },
    {
      san: "Be3",
      explanation:
        "Support the knight and develop — a rock-solid setup.",
      fen: "r1bqk1nr/pppp1ppp/2n5/2b5/3NP3/4B3/PPP2PPP/RN1QKB1R b KQkq - 2 5",
    },
    {
      san: "Qf6",
      explanation:
        "Black piles pressure on the d4 knight.",
      fen: "r1b1k1nr/pppp1ppp/2n2q2/2b5/3NP3/4B3/PPP2PPP/RN1QKB1R w KQkq - 3 6",
    },
    {
      san: "c3",
      explanation:
        "Reinforce d4 and give your knight a safe foundation.",
      fen: "r1b1k1nr/pppp1ppp/2n2q2/2b5/3NP3/2P1B3/PP3PPP/RN1QKB1R b KQkq - 0 6",
    },
  ],
};
