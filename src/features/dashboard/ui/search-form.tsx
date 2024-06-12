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

export function SearchForm() {
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('job-status') as string;

    console.log(search, jobStatus);
  }

  return (
    <form
      className="mb-16 grid gap-4 rounded-lg bg-muted p-8 sm:grid-cols-2 md:grid-cols-3"
      onSubmit={handleSearch}
    >
      <Input placeholder="Search jobs..." name="search" />
      <Select name="job-status">
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
