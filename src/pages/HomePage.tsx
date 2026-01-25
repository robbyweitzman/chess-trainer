import { Link } from 'react-router-dom';
import {
  BookOpen,
  Puzzle,
  Gamepad2,
  Flame,
  Target,
  Trophy,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { useAppStore } from '@/store/useAppStore';
import { openings } from '@/data/openings';
import { isDueForReview, getReviewStatus } from '@/services/spacedRepetition';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function HomePage() {
  const { progress } = useAppStore();

  // Calculate opening stats
  const openingsWithProgress = openings.filter(
    (o) => progress.openingProgress[o.id]
  );
  const openingsDue = openings.filter((o) => {
    const p = progress.openingProgress[o.id];
    return p && isDueForReview(p);
  });
  const openingsMastered = openings.filter((o) => {
    const p = progress.openingProgress[o.id];
    return p && getReviewStatus(p) === 'mastered';
  });

  // Rating history for chart
  const ratingData = progress.puzzleRatingHistory.slice(-20).map((point) => ({
    date: new Date(point.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    rating: point.rating,
  }));

  return (
    <div className="space-y-10">
      {/* Welcome section - Felt Banner Style */}
      <div className="felt-banner stitched stitched-top rounded-xl text-center py-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <h1 className="text-4xl font-display font-semibold text-white text-embossed relative z-10">
          Welcome to Chess Trainer
        </h1>
      </div>

      {/* Quick stats */}
      <div>
        <h2 className="chevron-title text-xl font-display mb-5">Your Stats</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium card-text-secondary">Puzzle Rating</CardTitle>
              <Target className="h-5 w-5 text-[var(--felt-green)] dark:text-[var(--felt-highlight)] icon-embossed" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-display font-semibold card-text-primary">{progress.puzzleRating}</div>
              <p className="text-sm card-text-muted mt-1">
                {progress.puzzleRating < 1000
                  ? `${1000 - progress.puzzleRating} to goal`
                  : 'Goal reached!'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium card-text-secondary">Current Streak</CardTitle>
              <Flame className="h-5 w-5 text-orange-500 icon-embossed" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-display font-semibold card-text-primary">{progress.streaks.current}</div>
              <p className="text-sm card-text-muted mt-1">
                Best: {progress.streaks.best} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium card-text-secondary">Openings</CardTitle>
              <BookOpen className="h-5 w-5 text-[var(--felt-green)] dark:text-[var(--felt-highlight)] icon-embossed" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-display font-semibold card-text-primary">
                {openingsMastered.length}<span className="text-xl card-text-muted font-normal">/{openings.length}</span>
              </div>
              <p className="text-sm card-text-muted mt-1">
                {openingsDue.length} due for review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium card-text-secondary">Puzzles Solved</CardTitle>
              <Trophy className="h-5 w-5 text-[var(--gold)] icon-embossed" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-display font-semibold card-text-primary">
                {Object.keys(progress.puzzleProgress).length}
              </div>
              <p className="text-sm card-text-muted mt-1">Total puzzles</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rating chart */}
      {ratingData.length > 1 && (
        <div>
          <h2 className="chevron-title text-xl font-display mb-5">Rating Progress</h2>
          <Card>
            <CardContent className="pt-5">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ratingData}>
                    <XAxis
                      dataKey="date"
                      stroke="#888"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      domain={['dataMin - 50', 'dataMax + 50']}
                      stroke="#888"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FAFAFA',
                        border: '1px solid #AAA',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="var(--felt-green)"
                      strokeWidth={3}
                      dot={{ fill: 'var(--felt-green)', strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--gold)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Training modes */}
      <div>
        <h2 className="chevron-title text-xl font-display mb-5">Training Modes</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <Card className="flex flex-col">
            <CardContent className="pt-5 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[var(--felt-highlight)] to-[var(--felt-dark)] flex items-center justify-center mb-3 shadow-md">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg card-text-primary">Opening Trainer</h3>
                <p className="text-sm card-text-secondary mt-1">
                  Learn and practice essential openings for beginners.
                </p>
              </div>
              <div className="space-y-2 mb-5 mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="card-text-secondary">Progress</span>
                  <span className="font-semibold card-text-primary">
                    {openingsWithProgress.length}/{openings.length}
                  </span>
                </div>
                <Progress
                  value={(openingsWithProgress.length / openings.length) * 100}
                />
              </div>
              <Link to="/openings">
                <Button className="w-full">
                  {openingsDue.length > 0
                    ? `Review ${openingsDue.length} Opening${openingsDue.length > 1 ? 's' : ''}`
                    : 'Start Learning'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardContent className="pt-5 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[var(--felt-highlight)] to-[var(--felt-dark)] flex items-center justify-center mb-3 shadow-md">
                  <Puzzle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg card-text-primary">Tactics Trainer</h3>
                <p className="text-sm card-text-secondary mt-1">
                  Solve puzzles to improve pattern recognition.
                </p>
              </div>
              <div className="space-y-2 mb-5 mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="card-text-secondary">Current Rating</span>
                  <span className="font-semibold card-text-primary">{progress.puzzleRating}</span>
                </div>
                <Progress value={(progress.puzzleRating / 1000) * 100} max={100} />
              </div>
              <Link to="/puzzles">
                <Button className="w-full">Solve Puzzles</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardContent className="pt-5 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[var(--gold-light)] to-[var(--gold-dark)] flex items-center justify-center mb-3 shadow-md">
                  <Gamepad2 className="h-6 w-6 text-[#4A3510]" />
                </div>
                <h3 className="font-display font-semibold text-lg card-text-primary">Game Analysis</h3>
                <p className="text-sm card-text-secondary mt-1">
                  Import and review your Chess.com games.
                </p>
              </div>
              <div className="mb-5 mt-auto">
                <p className="text-sm card-text-secondary">
                  Learn from your mistakes and find patterns in your play.
                </p>
              </div>
              <Link to="/games">
                <Button variant="secondary" className="w-full">Import Games</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
