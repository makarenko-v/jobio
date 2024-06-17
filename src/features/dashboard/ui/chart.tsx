'use client';

import { useQuery } from '@tanstack/react-query';
import { getChartData } from '@/features/dashboard/data-access';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Skeleton } from '@/features/shared/ui/skeleton';
import Link from 'next/link';

export function Chart() {
  const { data } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getChartData(),
  });

  if (data?.length === 0) {
    return (
      <div className="mt-10 text-center text-xl font-bold">
        No data to visualize,{' '}
        <Link className="underline underline-offset-4" href="/jobs/add">
          create a job first.
        </Link>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Bar dataKey="count" fill="#e11d48" barSize={75} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ChartLoading() {
  return <Skeleton className="h-60 w-full" />;
}
