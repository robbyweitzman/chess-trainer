import type { Opening } from '@/types';

export const ruyLopez: Opening = {
  id: "ruy-lopez",
  name: "Ruy Lopez",
  color: "white",
  eco: "C60",
  description:
    "One of the oldest and most respected openings. White pressures the knight defending e5 and builds a powerful, flexible position. A cornerstone of classical chess.",
  keyPrinciples: [
    "Pressure the e5 pawn by attacking its defender",
    "Develop pieces toward the center and castle quickly",
    "Keep the strong light-squared bishop active",
    "Prepare the central break d4 at the right moment",
  ],
  moves: [
    {
      san: "e4",
      explanation:
        "Open with the King’s Pawn, staking a claim in the center and freeing your bishop and queen.",
      fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      san: "e5",
      explanation:
        "Black mirrors you and fights for the center.",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      san: "Nf3",
      explanation:
        "Develop with a threat: the knight attacks the e5 pawn.",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    },
    {
      san: "Nc6",
      explanation:
        "Black defends e5 with the knight — natural development.",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    },
    {
      san: "Bb5",
      explanation:
        "The Ruy Lopez! The bishop pins pressure on the knight that guards e5.",
      fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    },
    {
      san: "a6",
      explanation:
        "The Morphy Defense. Black questions the bishop right away.",
      fen: "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
    },
    {
      san: "Ba4",
      explanation:
        "Keep the bishop on the strong diagonal rather than trading it off.",
      fen: "r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 4",
    },
    {
      san: "Nf6",
      explanation:
        "Black develops and counterattacks your e4 pawn.",
      fen: "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5",
    },
    {
      san: "O-O",
      explanation:
        "Castle for king safety — you can ignore the e4 pawn for now, it is hard to win.",
      fen: "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 3 5",
    },
    {
      san: "Be7",
      explanation:
        "Black calmly develops and prepares to castle.",
      fen: "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 6",
    },
    {
      san: "Re1",
      explanation:
        "Bring the rook to the central file and re-defend e4.",
      fen: "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQR1K1 b kq - 5 6",
    },
    {
      san: "b5",
      explanation:
        "Black gains space and nudges your bishop again.",
      fen: "r1bqk2r/2ppbppp/p1n2n2/1p2p3/B3P3/5N2/PPPP1PPP/RNBQR1K1 w kq - 0 7",
    },
    {
      san: "Bb3",
      explanation:
        "Retreat to a great diagonal aiming at Black’s f7 and the center.",
      fen: "r1bqk2r/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 b kq - 1 7",
    },
  ],
};
