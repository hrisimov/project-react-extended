import { useCallback, useMemo, useState } from 'react';

import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import useListingsQuery from '@/hooks/queries/useListingsQuery';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: { data: listings } = {},
    isError,
    isLoading,
  } = useListingsQuery(fetchOptions);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div className='container py-4' data-testid='homepage'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRenderer error={isError} isLoading={isLoading}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;
