'use client';

import { useQuery } from '@tanstack/react-query';
import { getStats } from '@/features/dashboard/data-access';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/shared/ui/card';

export function Stats() {
  const { data } = useQuery({
    queryFn: () => getStats(),
    queryKey: ['stats'],
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.map(({ status, count }) => (
        <Card className="bg-muted" key={status}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="capitalize">{status}</CardTitle>
            <CardDescription className="text-4xl font-extrabold text-primary">
              {count}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
