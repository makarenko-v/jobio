import { z } from 'zod';
import { createJobSchema, editJobSchema } from '@/features/dashboard/domain';

export type CreateJobDto = z.infer<typeof createJobSchema>;
export type EditJobDto = z.infer<typeof editJobSchema>;
