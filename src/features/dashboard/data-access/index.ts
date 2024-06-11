import { z } from 'zod';
import {
  createJobSchema,
  editJobSchema,
  Job,
} from '@/features/dashboard/domain';
import { db } from '@/features/shared/data-access';
import { jobs } from '@/features/shared/data-access/schema';

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
