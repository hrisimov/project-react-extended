import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

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

  return <div></div>;
};

export default CreateListingForm;
