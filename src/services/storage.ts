import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Puzzle, ChessComGame } from '@/types';

interface ChessTrainerDB extends DBSchema {
  puzzles: {
    key: string;
    value: Puzzle;
    indexes: { 'by-rating': number; 'by-theme': string };
  };
  games: {
    key: string;
    value: ChessComGame & { username: string };
    indexes: { 'by-username': string; 'by-date': number };
  };
}

let dbPromise: Promise<IDBPDatabase<ChessTrainerDB>> | null = null;

async function getDB(): Promise<IDBPDatabase<ChessTrainerDB>> {
  if (!dbPromise) {
    dbPromise = openDB<ChessTrainerDB>('chess-trainer', 1, {
      upgrade(db) {
        // Puzzles store
        const puzzleStore = db.createObjectStore('puzzles', { keyPath: 'id' });
        puzzleStore.createIndex('by-rating', 'rating');
        puzzleStore.createIndex('by-theme', 'themes', { multiEntry: true });

        // Games store
        const gameStore = db.createObjectStore('games', { keyPath: 'url' });
        gameStore.createIndex('by-username', 'username');
        gameStore.createIndex('by-date', 'end_time');
      },
    });
  }
  return dbPromise;
}

export const puzzleStorage = {
  async add(puzzle: Puzzle): Promise<void> {
    const db = await getDB();
    await db.put('puzzles', puzzle);
  },

  async addMany(puzzles: Puzzle[]): Promise<void> {
    const db = await getDB();
    const tx = db.transaction('puzzles', 'readwrite');
    await Promise.all([
      ...puzzles.map((puzzle) => tx.store.put(puzzle)),
      tx.done,
    ]);
  },

  async get(id: string): Promise<Puzzle | undefined> {
    const db = await getDB();
    return db.get('puzzles', id);
  },

  async getByRatingRange(min: number, max: number, limit = 50): Promise<Puzzle[]> {
    const db = await getDB();
    const puzzles: Puzzle[] = [];
    const tx = db.transaction('puzzles', 'readonly');
    const index = tx.store.index('by-rating');

    let cursor = await index.openCursor(IDBKeyRange.bound(min, max));
    while (cursor && puzzles.length < limit) {
      puzzles.push(cursor.value);
      cursor = await cursor.continue();
    }

    return puzzles;
  },

  async getByTheme(theme: string, limit = 50): Promise<Puzzle[]> {
    const db = await getDB();
    const puzzles: Puzzle[] = [];
    const tx = db.transaction('puzzles', 'readonly');
    const index = tx.store.index('by-theme');

    let cursor = await index.openCursor(theme);
    while (cursor && puzzles.length < limit) {
      puzzles.push(cursor.value);
      cursor = await cursor.continue();
    }

    return puzzles;
  },

  async count(): Promise<number> {
    const db = await getDB();
    return db.count('puzzles');
  },

  async getRandom(rating: number, tolerance = 200): Promise<Puzzle | null> {
    const puzzles = await this.getByRatingRange(
      rating - tolerance,
      rating + tolerance,
      100
    );
    if (puzzles.length === 0) return null;
    return puzzles[Math.floor(Math.random() * puzzles.length)];
  },
};

export const gameStorage = {
  async add(game: ChessComGame, username: string): Promise<void> {
    const db = await getDB();
    await db.put('games', { ...game, username });
  },

  async addMany(games: ChessComGame[], username: string): Promise<void> {
    const db = await getDB();
    const tx = db.transaction('games', 'readwrite');
    await Promise.all([
      ...games.map((game) => tx.store.put({ ...game, username })),
      tx.done,
    ]);
  },

  async getByUsername(username: string): Promise<ChessComGame[]> {
    const db = await getDB();
    return db.getAllFromIndex('games', 'by-username', username);
  },

  async get(url: string): Promise<ChessComGame | undefined> {
    const db = await getDB();
    const result = await db.get('games', url);
    return result;
  },
};
