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
import { and, asc, count, desc, eq, gte, ilike, or, SQL } from 'drizzle-orm';
import dayjs from 'dayjs';

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
  page = 1,
  limit = 10,
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

  const filters: (SQL<unknown> | undefined)[] = [eq(jobs.clerkId, user.id)];

  if (search) {
    filters.push(
      or(
        ilike(jobs.position, `%${search}%`),
        ilike(jobs.company, `%${search}%`),
      ),
    );
  }

  if (jobStatus && jobStatus !== 'all') {
    filters.push(eq(jobs.status, jobStatus));
  }

  const offset = (page - 1) * limit;

  try {
    const foundJobs = (await db
      .select()
      .from(jobs)
      .where(and(...filters))
      .orderBy(desc(jobs.createdAt))
      .offset(offset)
      .limit(limit)) as Job[];

    const [totalJobs] = await db
      .select({ count: count() })
      .from(jobs)
      .where(and(...filters));

    console.log('total jobs', totalJobs);

    const jobsCount = totalJobs.count;

    const totalPages = Math.ceil(jobsCount / limit);

    return {
      jobs: foundJobs,
      count: jobsCount,
      page,
      totalPages,
    };
  } catch (e) {
    console.log(e);

    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteJob(id: string): Promise<Job | null> {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  try {
    const [job] = (await db
      .delete(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.clerkId, user.id)))
      .returning()) as Job[];

    return job;
  } catch (e) {
    console.log(e);

    return null;
  }
}

export async function getJob(id: string): Promise<Job | null> {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  let job: Job | null;

  try {
    const [foundJob] = (await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.clerkId, user.id)))) as [
      Job | undefined,
    ];

    if (foundJob === undefined) {
      job = null;
    } else {
      job = foundJob;
    }
  } catch (e) {
    console.log(e);

    job = null;
  }

  if (!job) {
    redirect('/jobs');
  }

  return job;
}

export async function updateJob(
  id: string,
  values: EditJobDto,
): Promise<Job | null> {
  try {
    const [job] = (await db
      .update(jobs)
      .set({
        ...values,
      })
      .where(eq(jobs.id, id))
      .returning()) as Job[];

    return job;
  } catch (e) {
    console.log(e);

    return null;
  }
}

interface Stat {
  status: string;
  count: number;
}

export async function getStats() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (await db
    .select({ status: jobs.status, count: count() })
    .from(jobs)
    .where(eq(jobs.clerkId, user.id))
    .groupBy(jobs.status)) as Stat[];
}

export async function getChartData() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();

  const foundJobs = await db
    .select()
    .from(jobs)
    .where(and(eq(jobs.clerkId, user.id), gte(jobs.createdAt, sixMonthsAgo)))
    .orderBy(asc(jobs.createdAt));

  const data = foundJobs.reduce(
    (acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');

      return { ...acc, [date]: (acc[date] ?? 0) + 1 };
    },
    {} as Record<string, number>,
  );

  return Object.entries(data).map(([key, value]) => ({
    date: key,
    count: value,
  }));
}
