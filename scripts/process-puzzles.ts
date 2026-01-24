/**
 * Script to process Lichess puzzle database
 *
 * Usage:
 * 1. Download the Lichess puzzle database from https://database.lichess.org/
 * 2. Run: npx tsx scripts/process-puzzles.ts path/to/lichess_puzzles.csv
 *
 * This will filter puzzles for beginners (400-1600 rating) and prioritize
 * educational themes like mateIn1, mateIn2, fork, pin, etc.
 */

import * as fs from 'fs';
import * as readline from 'readline';

interface LichessPuzzle {
  PuzzleId: string;
  FEN: string;
  Moves: string;
  Rating: number;
  RatingDeviation: number;
  Popularity: number;
  NbPlays: number;
  Themes: string;
  GameUrl: string;
}

interface ProcessedPuzzle {
  id: string;
  fen: string;
  moves: string[];
  rating: number;
  themes: string[];
  gameUrl?: string;
}

// Priority themes for beginners (200-1000 ELO target)
const PRIORITY_THEMES = [
  'mateIn1',
  'mateIn2',
  'fork',
  'pin',
  'hangingPiece',
  'backRankMate',
  'discoveredAttack',
  'skewer',
  'trappedPiece',
  'mate',
  'short',
  'oneMove',
];

const MIN_RATING = 400;
const MAX_RATING = 1600;
const TARGET_COUNT = 30000;
const CHUNK_SIZE = 1000;

async function processPuzzles(inputFile: string, outputDir: string) {
  console.log(`Processing puzzles from ${inputFile}...`);

  if (!fs.existsSync(inputFile)) {
    console.error(`Input file not found: ${inputFile}`);
    console.log('\nTo download the Lichess puzzle database:');
    console.log('1. Visit https://database.lichess.org/');
    console.log('2. Download "lichess_db_puzzle.csv.zst"');
    console.log('3. Extract using: unzstd lichess_db_puzzle.csv.zst');
    console.log('4. Run this script again with the extracted CSV file');
    process.exit(1);
  }

  const puzzles: ProcessedPuzzle[] = [];
  let processed = 0;
  let skipped = 0;

  const fileStream = fs.createReadStream(inputFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let isFirstLine = true;
  let headers: string[] = [];

  for await (const line of rl) {
    if (isFirstLine) {
      headers = line.split(',');
      isFirstLine = false;
      continue;
    }

    processed++;

    if (processed % 100000 === 0) {
      console.log(`Processed ${processed} puzzles, found ${puzzles.length} matching...`);
    }

    const values = line.split(',');
    const puzzle: Partial<LichessPuzzle> = {};

    headers.forEach((header, index) => {
      (puzzle as Record<string, string | number>)[header] = values[index];
    });

    const rating = parseInt(puzzle.Rating as unknown as string, 10);

    // Filter by rating
    if (rating < MIN_RATING || rating > MAX_RATING) {
      skipped++;
      continue;
    }

    const themes = (puzzle.Themes as string || '').split(' ').filter(Boolean);

    // Prioritize puzzles with beginner-friendly themes
    const hasPriorityTheme = themes.some(t => PRIORITY_THEMES.includes(t));

    // For non-priority puzzles, only include a small percentage
    if (!hasPriorityTheme && Math.random() > 0.1) {
      skipped++;
      continue;
    }

    puzzles.push({
      id: puzzle.PuzzleId as string,
      fen: puzzle.FEN as string,
      moves: (puzzle.Moves as string || '').split(' '),
      rating,
      themes,
      gameUrl: puzzle.GameUrl as string,
    });

    if (puzzles.length >= TARGET_COUNT) {
      break;
    }
  }

  console.log(`\nProcessed ${processed} total puzzles`);
  console.log(`Found ${puzzles.length} matching puzzles`);
  console.log(`Skipped ${skipped} puzzles`);

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Split into chunks and save
  const chunks: ProcessedPuzzle[][] = [];
  for (let i = 0; i < puzzles.length; i += CHUNK_SIZE) {
    chunks.push(puzzles.slice(i, i + CHUNK_SIZE));
  }

  console.log(`\nWriting ${chunks.length} chunk files...`);

  for (let i = 0; i < chunks.length; i++) {
    const filename = `${outputDir}/puzzles-${String(i).padStart(3, '0')}.json`;
    fs.writeFileSync(filename, JSON.stringify(chunks[i], null, 2));
  }

  // Write manifest
  const manifest = {
    totalPuzzles: puzzles.length,
    chunks: chunks.length,
    chunkSize: CHUNK_SIZE,
    ratingRange: { min: MIN_RATING, max: MAX_RATING },
    themes: PRIORITY_THEMES,
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(`${outputDir}/manifest.json`, JSON.stringify(manifest, null, 2));

  console.log(`\nDone! Puzzles saved to ${outputDir}/`);
  console.log(`Manifest: ${outputDir}/manifest.json`);
}

// Run the script
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: npx tsx scripts/process-puzzles.ts <input-csv-file>');
  console.log('Example: npx tsx scripts/process-puzzles.ts lichess_db_puzzle.csv');
  process.exit(1);
}

const inputFile = args[0];
const outputDir = args[1] || 'public/puzzles';

processPuzzles(inputFile, outputDir).catch(console.error);
