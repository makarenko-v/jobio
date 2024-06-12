import { Job } from '@/features/dashboard/domain';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return <div>job card</div>;
}
