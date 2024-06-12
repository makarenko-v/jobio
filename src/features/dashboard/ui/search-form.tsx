'use client';

import { Input } from '@/features/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/shared/ui/select';
import { JobStatus } from '@/features/dashboard/domain';
import { Button } from '@/features/shared/ui/button';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const jobStatus = searchParams.get('status') ?? 'all';

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('job-status') as string;

    params.set('search', search);
    params.set('status', jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      className="mb-16 grid gap-4 rounded-lg bg-muted p-8 sm:grid-cols-2 md:grid-cols-3"
      onSubmit={handleSearch}
    >
      <Input placeholder="Search jobs..." name="search" defaultValue={search} />
      <Select name="job-status" defaultValue={jobStatus}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['all', ...Object.values(JobStatus)].map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}
