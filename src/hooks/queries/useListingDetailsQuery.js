import { useQuery } from '@tanstack/react-query';

import api from '@/api';

const useListingDetailsQuery = (listingId) => {
  return useQuery({
    queryKey: ['listing', listingId],
    queryFn: () => api.get(`/api/listings/${listingId}`),
  });
};

export default useListingDetailsQuery;
