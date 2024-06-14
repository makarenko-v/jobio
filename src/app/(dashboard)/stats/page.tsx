import { getChartData, getStats } from '@/features/dashboard/data-access';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Chart, Stats } from '@/features/dashboard/ui';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStats(),
  });

  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartData(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stats />
      <Chart />
    </HydrationBoundary>
  );
}
