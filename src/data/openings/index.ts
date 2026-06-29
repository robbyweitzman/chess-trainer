import { italianGame } from './italian-game';
import { londonSystem } from './london-system';
import { caroKann } from './caro-kann';
import { scandinavian } from './scandinavian';
import { queensGambitDeclined } from './queens-gambit-declined';
import { ruyLopez } from './ruy-lopez';
import { viennaGame } from './vienna-game';
import { scotchGame } from './scotch-game';
import { queensGambitAccepted } from './queens-gambit-accepted';
import { frenchDefense } from './french-defense';
import { sicilianNajdorf } from './sicilian-najdorf';
import { kingsIndianDefense } from './kings-indian-defense';
import { slavDefense } from './slav-defense';
import type { Opening } from '@/types';

export const openings: Opening[] = [
  italianGame,
  londonSystem,
  caroKann,
  scandinavian,
  queensGambitDeclined,
  ruyLopez,
  viennaGame,
  scotchGame,
  queensGambitAccepted,
  frenchDefense,
  sicilianNajdorf,
  kingsIndianDefense,
  slavDefense,
];

export const openingsById = openings.reduce(
  (acc, opening) => {
    acc[opening.id] = opening;
    return acc;
  },
  {} as Record<string, Opening>
);

export const whiteOpenings = openings.filter((o) => o.color === 'white');
export const blackOpenings = openings.filter((o) => o.color === 'black');

export {
  italianGame,
  londonSystem,
  caroKann,
  scandinavian,
  queensGambitDeclined,
  ruyLopez,
  viennaGame,
  scotchGame,
  queensGambitAccepted,
  frenchDefense,
  sicilianNajdorf,
  kingsIndianDefense,
  slavDefense,
};
