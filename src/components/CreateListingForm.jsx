import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Form from '@/components/Form';
import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import { Card, CardContent, CardHeader, Separator } from '@/components/ui';
import useCreateListingMutation from '@/hooks/mutations/useCreateListingMutation';

const createListingFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  locationId: z.coerce.number(),
  images: z.array(z.string()).min(1),
  price: z.coerce
    .number({
      invalid_type_error: 'Price must be a whole number',
    })
    .min(1),
  maxGuests: z.number().min(1),
  availability: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

const CreateListingForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(createListingFormSchema),
    defaultValues: {
      maxGuests: 1,
    },
  });

  const createListingMutation = useCreateListingMutation();

  const onSubmit = async (data) => {
    try {
      const response = await createListingMutation.mutateAsync(data);
      navigate(`/listings/${response.data.id}`);
    } catch (e) {
      form.setError('root', {
        message: e.response.data.message,
      });
    }
  };

  const locationOptions = [
    { value: '1', label: 'London' },
    { value: '2', label: 'Paris' },
  ];

  return (
    <Card className='mx-auto w-[800px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Create Listing</h2>
        <p className='text-center text-muted-foreground'>
          Create a new listing
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <TextInput
            control={form.control}
            name='name'
            placeholder='Listing name'
          />
          <TextInput
            control={form.control}
            multiline
            name='description'
            placeholder='Description'
          />
          <SelectInput
            control={form.control}
            name='locationId'
            options={locationOptions}
            placeholder='Select a location'
          />
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateListingForm;
