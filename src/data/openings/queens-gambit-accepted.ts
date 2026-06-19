import type { Opening } from '@/types';

export const queensGambitAccepted: Opening = {
  id: "queens-gambit-accepted",
  name: "Queen’s Gambit Accepted",
  color: "white",
  eco: "D20",
  description:
    "Black grabs the c4 pawn, and White uses the time to build a strong center and develop quickly. White rarely loses the pawn permanently — it is a temporary sacrifice for activity.",
  keyPrinciples: [
    "Don’t rush to recapture the c4 pawn — develop first",
    "Build a strong central pawn duo",
    "Use your lead in development for pressure",
    "Castle early and target the center",
  ],
  moves: [
    {
      san: "d4",
      explanation:
        "Open with the Queen’s Pawn, grabbing central space.",
      fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      san: "d5",
      explanation:
        "Black mirrors and contests the center.",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      san: "c4",
      explanation:
        "The Queen’s Gambit — offer a pawn to deflect Black’s d5 pawn.",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
    },
    {
      san: "dxc4",
      explanation:
        "Black accepts the gambit, taking the pawn.",
      fen: "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    },
    {
      san: "Nf3",
      explanation:
        "Develop calmly — there is no rush to win the pawn back.",
      fen: "rnbqkbnr/ppp1pppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3",
    },
    {
      san: "Nf6",
      explanation:
        "Black develops and controls central squares.",
      fen: "rnbqkb1r/ppp1pppp/5n2/8/2pP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4",
    },
    {
      san: "e3",
      explanation:
        "Open a path for the bishop and prepare to recapture on c4.",
      fen: "rnbqkb1r/ppp1pppp/5n2/8/2pP4/4PN2/PP3PPP/RNBQKB1R b KQkq - 0 4",
    },
    {
      san: "e6",
      explanation:
        "Black opens lines for the kingside bishop.",
      fen: "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/4PN2/PP3PPP/RNBQKB1R w KQkq - 0 5",
    },
    {
      san: "Bxc4",
      explanation:
        "Recapture the pawn with active development — your bishop eyes f7.",
      fen: "rnbqkb1r/ppp2ppp/4pn2/8/2BP4/4PN2/PP3PPP/RNBQK2R b KQkq - 0 5",
    },
    {
      san: "c5",
      explanation:
        "Black strikes at your center to free their position.",
      fen: "rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQK2R w KQkq - 0 6",
    },
    {
      san: "O-O",
      explanation:
        "Castle to safety with a comfortable, well-developed position.",
      fen: "rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 b kq - 1 6",
    },
  ],
};
