import { italianGame } from './italian-game';
import { londonSystem } from './london-system';
import { caroKann } from './caro-kann';
import { scandinavian } from './scandinavian';
import { queensGambitDeclined } from './queens-gambit-declined';
import type { Opening } from '@/types';

export const openings: Opening[] = [
  italianGame,
  londonSystem,
  caroKann,
  scandinavian,
  queensGambitDeclined,
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
};
