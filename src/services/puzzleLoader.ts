import type { Puzzle } from '@/types';
import { puzzleStorage } from './storage';

interface PuzzleManifest {
  totalPuzzles: number;
  chunks: number;
  chunkSize: number;
  ratingRange: { min: number; max: number };
  themes: string[];
  createdAt: string;
}

let manifest: PuzzleManifest | null = null;
let loadedChunks: Set<number> = new Set();

export async function loadPuzzleManifest(): Promise<PuzzleManifest | null> {
  if (manifest) return manifest;

  try {
    const response = await fetch('/puzzles/manifest.json');
    if (!response.ok) return null;
    manifest = await response.json();
    return manifest;
  } catch {
    console.error('Failed to load puzzle manifest');
    return null;
  }
}

export async function loadPuzzleChunk(chunkIndex: number): Promise<Puzzle[]> {
  if (loadedChunks.has(chunkIndex)) {
    return [];
  }

  try {
    const paddedIndex = String(chunkIndex).padStart(3, '0');
    const response = await fetch(`/puzzles/puzzles-${paddedIndex}.json`);
    if (!response.ok) return [];

    const puzzles: Puzzle[] = await response.json();
    loadedChunks.add(chunkIndex);

    // Store in IndexedDB for faster access
    await puzzleStorage.addMany(puzzles);

    return puzzles;
  } catch {
    console.error(`Failed to load puzzle chunk ${chunkIndex}`);
    return [];
  }
}

export async function initializePuzzles(): Promise<number> {
  const m = await loadPuzzleManifest();
  if (!m) return 0;

  // Check if puzzles are already in storage
  const count = await puzzleStorage.count();
  if (count > 0) {
    return count;
  }

  // Load all chunks (for small datasets)
  // For larger datasets, load on demand
  let total = 0;
  for (let i = 0; i < m.chunks; i++) {
    const puzzles = await loadPuzzleChunk(i);
    total += puzzles.length;
  }

  return total;
}

export async function getRandomPuzzle(rating: number, tolerance = 200): Promise<Puzzle | null> {
  // Try from IndexedDB first
  const puzzle = await puzzleStorage.getRandom(rating, tolerance);
  if (puzzle) return puzzle;

  // Load puzzles if not available
  await initializePuzzles();
  return puzzleStorage.getRandom(rating, tolerance);
}
