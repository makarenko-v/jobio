import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJob } from '@/features/dashboard/data-access';
import { useToast } from '@/features/shared/ui/use-toast';
import { Button } from '@/features/shared/ui/button';

interface DeleteButtonProps {
  id: string;
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'There was an error' });

        return;
      }

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      toast({ description: `Job '${data.position}' was deleted` });
    },
  });

  return (
    <Button disabled={isPending} onClick={() => mutate(id)}>
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
