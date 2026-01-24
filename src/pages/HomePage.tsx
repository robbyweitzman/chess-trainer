import { Link } from 'react-router-dom';
import {
  BookOpen,
  Puzzle,
  Gamepad2,
  TrendingUp,
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
    <div className="space-y-12">
      {/* Welcome section */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-display font-semibold mb-4">
          Welcome to Chess Trainer
        </h1>
        <p className="text-muted-foreground text-lg">
          Your journey from 200 to 1000 ELO starts here
        </p>
        <div className="w-16 h-0.5 bg-primary/30 mx-auto mt-6" />
      </div>

      {/* Quick stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Puzzle Rating</CardTitle>
            <Target className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-semibold">{progress.puzzleRating}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {progress.puzzleRating < 1000
                ? `${1000 - progress.puzzleRating} to goal`
                : 'Goal reached!'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
            <Flame className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-semibold">{progress.streaks.current}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Best: {progress.streaks.best} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Openings</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-semibold">
              {openingsMastered.length}<span className="text-xl text-muted-foreground font-normal">/{openings.length}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {openingsDue.length} due for review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Puzzles Solved</CardTitle>
            <Trophy className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-semibold">
              {Object.keys(progress.puzzleProgress).length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total puzzles</p>
          </CardContent>
        </Card>
      </div>

      {/* Rating chart */}
      {ratingData.length > 1 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <TrendingUp className="h-5 w-5 text-primary" />
              Rating Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingData}>
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={['dataMin - 50', 'dataMax + 50']}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Training modes */}
      <div>
        <h2 className="text-xl font-display font-semibold mb-5">Training Modes</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="flex flex-col">
            <CardContent className="pt-6 flex-1 flex flex-col">
              <div className="mb-4">
                <BookOpen className="h-7 w-7 text-primary mb-3" />
                <h3 className="font-display font-semibold text-lg">Opening Trainer</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn and practice essential openings for beginners.
                </p>
              </div>
              <div className="space-y-2 mb-5 mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
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
            <CardContent className="pt-6 flex-1 flex flex-col">
              <div className="mb-4">
                <Puzzle className="h-7 w-7 text-primary mb-3" />
                <h3 className="font-display font-semibold text-lg">Tactics Trainer</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Solve puzzles to improve pattern recognition.
                </p>
              </div>
              <div className="space-y-2 mb-5 mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Rating</span>
                  <span className="font-medium">{progress.puzzleRating}</span>
                </div>
                <Progress value={(progress.puzzleRating / 1000) * 100} max={100} />
              </div>
              <Link to="/puzzles">
                <Button className="w-full">Solve Puzzles</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardContent className="pt-6 flex-1 flex flex-col">
              <div className="mb-4">
                <Gamepad2 className="h-7 w-7 text-primary mb-3" />
                <h3 className="font-display font-semibold text-lg">Game Analysis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Import and review your Chess.com games.
                </p>
              </div>
              <div className="mb-5 mt-auto">
                <p className="text-sm text-muted-foreground">
                  Learn from your mistakes and find patterns in your play.
                </p>
              </div>
              <Link to="/games">
                <Button className="w-full">Import Games</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
