'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllJobs } from '@/features/dashboard/data-access';
import { useSearchParams } from 'next/navigation';
import { JobCard } from '@/features/dashboard/ui/job-card';

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
    return <div>Loading...</div>;
  }

  const jobs = data?.jobs ?? [];

  if (jobs.length === 0) {
    return <div>No jobs found...</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
