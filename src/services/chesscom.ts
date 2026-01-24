import type { ChessComGame } from '@/types';

const BASE_URL = 'https://api.chess.com/pub';

interface ChessComArchive {
  games: ChessComGame[];
}

interface ChessComPlayer {
  username: string;
  player_id: number;
  status: string;
  country: string;
  joined: number;
  last_online: number;
}

export async function getPlayerProfile(username: string): Promise<ChessComPlayer | null> {
  try {
    const response = await fetch(`${BASE_URL}/player/${username}`);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function getMonthlyArchives(username: string): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/player/${username}/games/archives`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.archives || [];
  } catch {
    return [];
  }
}

export async function getGamesFromArchive(archiveUrl: string): Promise<ChessComGame[]> {
  try {
    const response = await fetch(archiveUrl);
    if (!response.ok) return [];
    const data: ChessComArchive = await response.json();
    return data.games || [];
  } catch {
    return [];
  }
}

export async function getRecentGames(username: string, limit = 50): Promise<ChessComGame[]> {
  const archives = await getMonthlyArchives(username);
  if (archives.length === 0) return [];

  const games: ChessComGame[] = [];

  // Start from most recent archive
  for (let i = archives.length - 1; i >= 0 && games.length < limit; i--) {
    const archiveGames = await getGamesFromArchive(archives[i]);
    games.push(...archiveGames.reverse());
  }

  return games.slice(0, limit);
}

// Parse game result from Chess.com perspective
export function parseGameResult(
  game: ChessComGame,
  username: string
): 'win' | 'loss' | 'draw' {
  const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
  const playerResult = isWhite ? game.white.result : game.black.result;

  if (playerResult === 'win') return 'win';
  if (['checkmated', 'resigned', 'timeout', 'abandoned'].includes(playerResult)) {
    return 'loss';
  }
  return 'draw';
}

// Extract time control in readable format
export function formatTimeControl(timeControl: string): string {
  if (timeControl === '-') return 'Correspondence';

  const parts = timeControl.split('+');
  const base = parseInt(parts[0], 10);
  const increment = parts[1] ? parseInt(parts[1], 10) : 0;

  if (base >= 86400) {
    return `${Math.floor(base / 86400)} days`;
  }

  const minutes = Math.floor(base / 60);
  if (increment > 0) {
    return `${minutes}+${increment}`;
  }
  return `${minutes} min`;
}
