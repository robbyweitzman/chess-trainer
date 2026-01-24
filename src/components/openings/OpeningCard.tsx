import { Link } from 'react-router-dom';
import { BookOpen, Crown, Timer } from 'lucide-react';
import type { Opening, OpeningProgress } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import {
  getReviewStatus,
  getTimeUntilReview,
  getMasteryPercentage,
} from '@/services/spacedRepetition';

interface OpeningCardProps {
  opening: Opening;
  progress?: OpeningProgress;
}

export function OpeningCard({ opening, progress }: OpeningCardProps) {
  const reviewStatus = progress ? getReviewStatus(progress) : null;
  const masteryPercent = progress ? getMasteryPercentage(progress) : 0;
  const timeUntilReview = progress ? getTimeUntilReview(progress) : null;

  return (
    <Link to={`/openings/${opening.id}`}>
      <Card className="group cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-base font-display group-hover:text-primary transition-colors">{opening.name}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 mt-1 text-xs">
                <Crown className="h-3 w-3" />
                {opening.color === 'white' ? 'White' : 'Black'}
                {opening.eco && <span className="text-muted-foreground/70">· {opening.eco}</span>}
              </CardDescription>
            </div>
            {reviewStatus === 'due' && (
              <Badge variant="warning" className="flex items-center gap-1 shrink-0">
                <Timer className="h-3 w-3" />
                Due
              </Badge>
            )}
            {reviewStatus === 'mastered' && (
              <Badge variant="success" className="shrink-0">Mastered</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {opening.description}
          </p>

          {progress ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Mastery: Box {progress.box}/4</span>
                {timeUntilReview && reviewStatus !== 'due' && (
                  <span>Review in {timeUntilReview}</span>
                )}
              </div>
              <Progress value={masteryPercent} />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{progress.correctCount} correct</span>
                <span>{progress.incorrectCount} incorrect</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Not started</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
