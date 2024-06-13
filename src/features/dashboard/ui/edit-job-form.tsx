'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/features/shared/ui/button';
import { Form } from '@/features/shared/ui/form';
import {
  EditJobDto,
  getJob,
  updateJob,
} from '@/features/dashboard/data-access';
import {
  editJobSchema,
  JobMode,
  JobModeType,
  JobStatus,
  JobStatusType,
} from '@/features/dashboard/domain';
import { Field } from '@/features/shared/ui/field';
import { FormSelect } from '@/features/shared/ui/form-select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/features/shared/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface EditJobFormProps {
  jobId: string;
}

export function EditJobForm({ jobId }: EditJobFormProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJob(jobId),
  });

  const form = useForm<EditJobDto>({
    resolver: zodResolver(editJobSchema),
    defaultValues: {
      position: data?.position ?? '',
      company: data?.company ?? '',
      location: data?.location ?? '',
      status: (data?.status as JobStatusType) ?? JobStatus.PENDING,
      mode: (data?.mode as JobModeType) ?? JobMode.FULL_TIME,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: EditJobDto) => updateJob(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'There was an error',
        });

        return;
      }

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });

      router.push('/jobs');
    },
  });

  const { toast } = useToast();

  const router = useRouter();

  function onSubmit(values: EditJobDto) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded bg-muted p-8"
      >
        <h2 className="mb-6 text-4xl font-semibold">Edit job</h2>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Field name="position" control={form.control} />
          <Field name="company" control={form.control} />
          <Field name="location" control={form.control} />
          <FormSelect
            name="status"
            control={form.control}
            items={Object.values(JobStatus)}
          />
          <FormSelect
            name="mode"
            control={form.control}
            items={Object.values(JobMode)}
          />
          <Button className="self-end" type="submit">
            {isPending ? 'Loading...' : 'Edit Job'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
