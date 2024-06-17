'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllJobs } from '@/features/dashboard/data-access';
import { useSearchParams } from 'next/navigation';
import { JobCard } from '@/features/dashboard/ui/job-card';
import { Pagination } from '@/features/shared/ui/pagination';
import { Skeleton } from '@/features/shared/ui/skeleton';

export function JobList() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const jobStatus = searchParams.get('status') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, jobStatus, page],
    queryFn: () => getAllJobs({ search, jobStatus, page }),
  });

  if (isPending) {
    return <JobListLoading />;
  }

  const jobs = data?.jobs ?? [];

  if (jobs.length === 0) {
    return <div>No jobs found...</div>;
  }

  const count = data?.count ?? 0;
  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className="mb-4 mt-4 flex items-center justify-between">
        <p className="text-xl font-semibold capitalize">{count} jobs found</p>
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}

export function JobListLoading() {
  return (
    <>
      <div className="mb-4 mt-4 flex items-center justify-between">
        <Skeleton className="hidden h-12 w-14 md:block md:h-8 md:w-40" />
        <Skeleton className="h-16 w-full md:h-10 md:w-96" />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    </>
  );
}
