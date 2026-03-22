import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import api from '@/api';
import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/ListingDetailsCard';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: { data: listing } = {},
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['listing', listingId],
    queryFn: () => api.get(`/api/listings/${listingId}`),
  });

  return (
    <div className='container py-4'>
      <DataRenderer error={isError} isLoading={isLoading}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;
