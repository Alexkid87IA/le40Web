import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({ className = '', animate = true }: SkeletonProps) {
  return (
    <div
      className={`bg-white/5 rounded-lg overflow-hidden ${className}`}
      role="status"
      aria-label="Chargement..."
    >
      {animate && (
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}

/**
 * Skeleton for text lines
 */
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`} role="status" aria-label="Chargement du texte...">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for cards
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-white/5 rounded-2xl p-6 border border-white/10 ${className}`}
      role="status"
      aria-label="Chargement de la carte..."
    >
      <Skeleton className="h-40 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <SkeletonText lines={2} />
    </div>
  );
}

/**
 * Skeleton for product cards
 */
export function SkeletonProductCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-white/5 rounded-2xl overflow-hidden border border-white/10 ${className}`}
      role="status"
      aria-label="Chargement du produit..."
    >
      <Skeleton className="h-48 w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for list items
 */
export function SkeletonListItem({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl ${className}`}
      role="status"
      aria-label="Chargement de l'élément..."
    >
      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

/**
 * Skeleton for hero sections
 */
export function SkeletonHero({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative h-[60vh] min-h-[400px] bg-black ${className}`}
      role="status"
      aria-label="Chargement de la section..."
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-96 max-w-full mb-8" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for grid of cards
 */
export function SkeletonGrid({
  count = 6,
  columns = 3,
  className = ''
}: {
  count?: number;
  columns?: number;
  className?: string;
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div
      className={`grid ${gridCols} gap-6 ${className}`}
      role="status"
      aria-label="Chargement de la grille..."
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton for form inputs
 */
export function SkeletonForm({ fields = 4, className = '' }: { fields?: number; className?: string }) {
  return (
    <div className={`space-y-6 ${className}`} role="status" aria-label="Chargement du formulaire...">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-12 w-full rounded-xl mt-4" />
    </div>
  );
}

/**
 * Skeleton for pricing cards
 */
export function SkeletonPricingCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-white/5 rounded-2xl p-6 border border-white/10 ${className}`}
      role="status"
      aria-label="Chargement du tarif..."
    >
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-10 w-3/4 mb-6" />
      <div className="space-y-3 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

export default Skeleton;
