import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getJob } from '@/features/dashboard/data-access';
import { EditJobForm } from '@/features/dashboard/ui/edit-job-form';

type PageParams = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: PageParams) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['job', id],
    queryFn: () => getJob(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={id} />
    </HydrationBoundary>
  );
}
