import { getStats } from '@/features/dashboard/data-access';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Stats } from '@/features/dashboard/ui';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStats(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stats />
    </HydrationBoundary>
  );
}
