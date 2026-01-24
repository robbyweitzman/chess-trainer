import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Crown } from 'lucide-react';
import { openings, openingsById, whiteOpenings, blackOpenings } from '@/data/openings';
import { useAppStore } from '@/store/useAppStore';
import { OpeningCard } from '@/components/openings/OpeningCard';
import { OpeningTrainer } from '@/components/openings/OpeningTrainer';
import { Button } from '@/components/ui/Button';

export function OpeningsPage() {
  const { openingId } = useParams<{ openingId: string }>();
  const { progress } = useAppStore();

  // If an opening is selected, show the trainer
  if (openingId) {
    const opening = openingsById[openingId];

    if (!opening) {
      return (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4 wood-text-primary">Opening not found</h2>
          <Link to="/openings">
            <Button>Back to Openings</Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/openings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-semibold wood-text-primary">{opening.name}</h1>
            <p className="wood-text-secondary flex items-center gap-1.5 text-sm">
              <Crown className="h-3 w-3" />
              {opening.color === 'white' ? 'White' : 'Black'}
              {opening.eco && <span className="opacity-70">· {opening.eco}</span>}
            </p>
          </div>
        </div>

        <OpeningTrainer opening={opening} />
      </div>
    );
  }

  // Show opening selection
  return (
    <div className="space-y-10">
      <div className="felt-banner stitched stitched-top rounded-xl text-center py-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <h1 className="text-3xl font-display font-semibold mb-2 text-white text-embossed relative z-10">Opening Trainer</h1>
        <p className="text-white/80 relative z-10">
          Learn and practice essential chess openings for beginners
        </p>
      </div>

      {/* White openings */}
      <section>
        <h2 className="chevron-title text-lg font-display mb-4">
          Openings for White
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whiteOpenings.map((opening) => (
            <OpeningCard
              key={opening.id}
              opening={opening}
              progress={progress.openingProgress[opening.id]}
            />
          ))}
        </div>
      </section>

      {/* Black openings */}
      <section>
        <h2 className="chevron-title text-lg font-display mb-4">
          Openings for Black
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blackOpenings.map((opening) => (
            <OpeningCard
              key={opening.id}
              opening={opening}
              progress={progress.openingProgress[opening.id]}
            />
          ))}
        </div>
      </section>

      {/* All openings summary */}
      <section className="pt-6 border-t border-white/20">
        <p className="text-sm wood-text-secondary text-center">
          {openings.length} openings available · {Object.keys(progress.openingProgress).length} started · {Object.values(progress.openingProgress).filter((p) => p.box === 4).length} mastered
        </p>
      </section>
    </div>
  );
}
