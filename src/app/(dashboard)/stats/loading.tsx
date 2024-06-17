import { ChartLoading, StatsLoading } from '@/features/dashboard/ui';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <StatsLoading />
      <ChartLoading />
    </div>
  );
}
