import { z } from 'zod';

export const JobStatus = {
  PENDING: 'pending',
  DECLINED: 'declined',
  ACCEPTED: 'accepted',
} as const;

export type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];

export const JobMode = {
  INTERNSHIP: 'internship',
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
} as const;

export type JobModeType = (typeof JobMode)[keyof typeof JobMode];

export interface Job {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: JobStatusType;
  mode: JobModeType;
}

export const createJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters',
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters',
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters',
  }),
  status: z.enum([JobStatus.DECLINED, JobStatus.PENDING, JobStatus.ACCEPTED]),
  mode: z.enum([JobMode.INTERNSHIP, JobMode.FULL_TIME, JobMode.PART_TIME]),
});

// clone the schema
export const editJobSchema = createJobSchema.extend({});
