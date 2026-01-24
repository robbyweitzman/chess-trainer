import { useState, useEffect, useCallback } from 'react';
import { Target, Flame, Award, RefreshCw } from 'lucide-react';
import type { Puzzle } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { puzzleStorage } from '@/services/storage';
import { initializePuzzles } from '@/services/puzzleLoader';
import { PuzzleBoard } from '@/components/puzzles/PuzzleBoard';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function PuzzlesPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);

  const { progress } = useAppStore();

  // Load puzzles
  useEffect(() => {
    const loadPuzzles = async () => {
      setLoading(true);
      try {
        // Initialize puzzles from public folder
        await initializePuzzles();

        // Try to get puzzles from IndexedDB based on user rating
        const stored = await puzzleStorage.getByRatingRange(
          progress.puzzleRating - 200,
          progress.puzzleRating + 200,
          50
        );

        if (stored.length > 0) {
          // Shuffle the puzzles for variety
          const shuffled = stored.sort(() => Math.random() - 0.5);
          setPuzzles(shuffled);
          setCurrentPuzzle(shuffled[0]);
        }
      } catch (err) {
        console.error('Error loading puzzles:', err);
      }
      setLoading(false);
    };

    loadPuzzles();
  }, [progress.puzzleRating]);

  const handleComplete = useCallback((correct: boolean) => {
    setSessionStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = (puzzleIndex + 1) % puzzles.length;
    setPuzzleIndex(nextIndex);
    setCurrentPuzzle(puzzles[nextIndex]);
  }, [puzzleIndex, puzzles]);

  const shufflePuzzles = () => {
    const shuffled = [...puzzles].sort(() => Math.random() - 0.5);
    setPuzzles(shuffled);
    setPuzzleIndex(0);
    setCurrentPuzzle(shuffled[0]);
    setSessionStats({ correct: 0, total: 0 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading puzzles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold mb-2">Tactics Trainer</h1>
          <p className="text-muted-foreground">
            Solve puzzles to improve your pattern recognition
          </p>
        </div>
        <Button variant="outline" onClick={shufflePuzzles}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Shuffle
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <div>
                <p className="text-2xl font-display font-semibold">{progress.puzzleRating}</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-amber-500" />
              <div>
                <p className="text-2xl font-display font-semibold">{sessionStats.correct}</p>
                <p className="text-xs text-muted-foreground">Correct Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-2xl font-display font-semibold">{progress.streaks.current}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-display font-semibold">
                  {sessionStats.total > 0
                    ? Math.round((sessionStats.correct / sessionStats.total) * 100)
                    : 0}
                  %
                </p>
                <p className="text-xs text-muted-foreground">Session Accuracy</p>
              </div>
              <Badge variant="outline">
                {sessionStats.correct}/{sessionStats.total}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Puzzle board */}
      {currentPuzzle ? (
        <PuzzleBoard
          puzzle={currentPuzzle}
          onComplete={handleComplete}
          onNext={handleNext}
        />
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No puzzles available.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
