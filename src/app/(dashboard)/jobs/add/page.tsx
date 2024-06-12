import { CreateJobForm } from '@/features/dashboard/ui';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const queryClient = new QueryClient();

  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobForm userId={userId} />
    </HydrationBoundary>
  );
}
