'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/features/shared/ui/button';
import { Form } from '@/features/shared/ui/form';
import { createJob, CreateJobDto } from '@/features/dashboard/data-access';
import {
  createJobSchema,
  JobMode,
  JobStatus,
} from '@/features/dashboard/domain';
import { Field } from '@/features/shared/ui/field';
import { FormSelect } from '@/features/shared/ui/form-select';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/features/shared/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { auth } from '@clerk/nextjs/server';

interface CreateJobFormProps {
  userId: string;
}

export function CreateJobForm({ userId }: CreateJobFormProps) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<CreateJobDto>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.PENDING,
      mode: JobMode.FULL_TIME,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateJobDto) => createJob(userId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'There was an error',
        });

        return;
      }

      toast({
        description: 'Job Created',
      });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      router.push('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(values: CreateJobDto) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded bg-muted p-8"
      >
        <h2 className="mb-6 text-4xl font-semibold">Add job</h2>
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
            {isPending ? 'Loading...' : 'Create Job'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
