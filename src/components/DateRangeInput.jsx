import { useController } from 'react-hook-form';

import { DateRangePicker } from '@/components/ui';

const DateRangeInput = ({ control, name, placeholder, minDate, maxDate }) => {
  const form = useController({ control, name });

  return (
    <div className='flex flex-col gap-2'>
      <DateRangePicker
        value={form.field.value}
        onChange={form.field.onChange}
        placeholder={placeholder}
        minDate={minDate}
        maxDate={maxDate}
      />
      {form.fieldState.error?.message && (
        <div className='text-sm text-red-500'>
          {form.fieldState.error.message}
        </div>
      )}
    </div>
  );
};

export default DateRangeInput;
