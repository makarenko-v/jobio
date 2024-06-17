import { Skeleton } from '@/features/shared/ui/skeleton';

export default function Loading() {
  return (
    <div className="p-8">
      <Skeleton className="mb-6 h-10 w-28" />
      <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="mb-2 h-4 w-10" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
