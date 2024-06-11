'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/features/shared/ui/button';
import { Form } from '@/features/shared/ui/form';
import { CreateJobDto } from '@/features/dashboard/data-access';
import {
  createJobSchema,
  JobMode,
  JobStatus,
} from '@/features/dashboard/domain';
import { Field } from '@/features/shared/ui/field';
import { FormSelect } from '@/features/shared/ui/form-select';

export function CreateJobForm() {
  // 1. Define your form.
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

  // 2. Define a submit handler.
  function onSubmit(values: CreateJobDto) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            Create Job
          </Button>
        </div>
      </form>
    </Form>
  );
}
