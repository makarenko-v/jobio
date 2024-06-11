import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/features/shared/ui/form';
import { Control } from 'react-hook-form';
import { Input } from '@/features/shared/ui/input';

interface FieldProps {
  name: string;
  control: Control<any>;
}

export function Field({ name, control }: FieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
