import { Job } from '@/features/dashboard/domain';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/shared/ui/card';
import { Briefcase, CalendarDays, MapPin, RadioTower } from 'lucide-react';
import { Separator } from '@/features/shared/ui/separator';
import { Badge } from '@/features/shared/ui/badge';
import { JobInfo } from '@/features/dashboard/ui/job-info';
import { Button } from '@/features/shared/ui/button';
import { DeleteButton } from '@/features/dashboard/ui/delete-button';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <JobInfo icon={<Briefcase />} text={job.mode} />
          <JobInfo icon={<MapPin />} text={job.location} />
          <JobInfo
            icon={<CalendarDays />}
            text={new Date(job.createdAt).toLocaleDateString()}
          />
          <Badge className="w-32 justify-center">
            <JobInfo
              icon={<RadioTower className="h-4 w-4" />}
              text={job.status}
            />
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild>
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteButton id={job.id} />
      </CardFooter>
    </Card>
  );
}
