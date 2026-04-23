import { useController } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

const SelectInput = ({ control, name, options, placeholder, ...rest }) => {
  const form = useController({ control, name });

  return (
    <div className='flex flex-col gap-2'>
      <Select
        onValueChange={form.field.onChange}
        value={form.field.value || ''}
        {...rest}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>;
          })}
        </SelectContent>
      </Select>
      {form.fieldState.error?.message && (
        <div className='text-sm text-red-500'>
          {form.fieldState.error.message}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
