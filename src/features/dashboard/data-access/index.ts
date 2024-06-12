'use server';

import { z } from 'zod';
import {
  createJobSchema,
  editJobSchema,
  Job,
} from '@/features/dashboard/domain';
import { db } from '@/features/shared/data-access';
import { jobs } from '@/features/shared/data-access/schema';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { and, desc, eq, ilike, or } from 'drizzle-orm';

export type CreateJobDto = z.infer<typeof createJobSchema>;
export type EditJobDto = z.infer<typeof editJobSchema>;

export async function createJob(
  userId: string,
  values: CreateJobDto,
): Promise<Job | null> {
  try {
    createJobSchema.safeParse(values);

    const [job] = (await db
      .insert(jobs)
      .values({
        ...values,
        clerkId: userId,
      })
      .returning()) as Job[];

    return job;
  } catch (e) {
    console.log(e);

    return null;
  }
}

interface GetAllJobsParams {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
}

export async function getAllJobs({
  search,
  jobStatus,
}: GetAllJobsParams): Promise<{
  jobs: Job[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  try {
    const foundJobs = (await db
      .select()
      .from(jobs)
      .where(
        and(
          eq(jobs.clerkId, user.id),
          search
            ? or(ilike(jobs.position, search), ilike(jobs.company, search))
            : undefined,
          jobStatus && jobStatus !== 'all'
            ? eq(jobs.status, jobStatus)
            : undefined,
        ),
      )
      .orderBy(desc(jobs.createdAt))) as Job[];

    return { jobs: foundJobs, count: 0, page: 1, totalPages: 0 };
  } catch (_) {
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}
