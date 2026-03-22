import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import api from '@/api';
import DataRenderer from '@/components/DataRenderer';
import ListingList from '@/components/ListingList';

const ListingFavoritesPage = () => {
  const { favoriteListingIds } = useSelector((state) => state.listings);

  const {
    data: { data: listings } = {},
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['listings'],
    queryFn: () => api.get('/api/listings'),
  });

  const favoriteListings = useMemo(() => {
    if (!listings) {
      return [];
    }

    return listings.filter((listing) =>
      favoriteListingIds.includes(listing.id),
    );
  }, [listings, favoriteListingIds]);

  return (
    <div className='container py-4'>
      <DataRenderer error={isError} isLoading={isLoading}>
        <ListingList listings={favoriteListings} />
      </DataRenderer>
    </div>
  );
};

export default ListingFavoritesPage;
