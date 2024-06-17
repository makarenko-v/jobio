import { JobListLoading, SearchFormLoading } from '@/features/dashboard/ui';

export default function Loading() {
  return (
    <>
      <SearchFormLoading />
      <JobListLoading />
    </>
  );
}
