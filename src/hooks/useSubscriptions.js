import { useState, useCallback, useEffect } from 'react';
import useApi from '../configs/useApi';

export default function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toastQueue, setToastQueue] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  
  const size = 10;
  const { get } = useApi();

  // Fetch subscriptions from API
  const fetchSubscriptions = useCallback(
    async (opts = {}) => {
      setLoading(true);
      try {
        // Build query parameters
        const params = new URLSearchParams();

        if (opts.search && opts.search.trim()) {
          params.append('email', opts.search.trim());
        }

        params.append('page', opts.page ?? page);
        params.append('size', size);

        const queryString = params.toString();
        const url = `/api/subscription${queryString ? `?${queryString}` : ''}`;

        const response = await get(url);

        if (response && Array.isArray(response)) {
          // If response is an array, treat it as the data
          setSubscriptions(response);
          setTotalCount(response.length);
          setPageCount(Math.ceil(response.length / size));
        } else if (response && response.content) {
          // If response has pagination structure
          setSubscriptions(response.content);
          setTotalCount(response.totalElements || 0);
          setPageCount(Math.ceil((response.totalElements || 0) / size));
        } else {
          setSubscriptions([]);
          setTotalCount(0);
          setPageCount(1);
        }
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setToastQueue(queue => [
          ...queue,
          { message: 'Failed to fetch subscriptions.', severity: 'error' },
        ]);
        setSubscriptions([]);
        setTotalCount(0);
        setPageCount(1);
      } finally {
        setLoading(false);
      }
    },
    [page, size, refreshFlag]
  );

  useEffect(() => {
    fetchSubscriptions({ search: appliedSearch, page });
    // eslint-disable-next-line
  }, [refreshFlag]);

  const handleApply = () => {
    setAppliedSearch(search);
    setPage(0);
    fetchSubscriptions({ search, page: 0 });
  };

  const handleReset = () => {
    setSearch('');
    setAppliedSearch('');
    setPage(0);
    fetchSubscriptions({ search: '', page: 0 });
  };

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchSubscriptions({ search: appliedSearch, page: newPage });
  };

  // Fetch ALL subscriptions for export (without pagination)
  const fetchAllSubscriptions = useCallback(async () => {
    try {
      // Build query parameters for all subscriptions
      const params = new URLSearchParams();
      
      // Use applied filters but get ALL results
      if (appliedSearch && appliedSearch.trim()) {
        params.append('email', appliedSearch.trim());
      }

      // Get all subscriptions by setting a very high page size
      params.append('page', '0');
      params.append('size', '10000'); // Large number to get all subscriptions

       const queryString = params.toString();
       const url = `/api/subscription${queryString ? `?${queryString}` : ''}`;

      const response = await get(url);
      console.log('Export API response:', response);

      if (response && Array.isArray(response)) {
        console.log('Returning array response:', response);
        return response;
      } else if (response && response.content) {
        console.log('Returning paginated response:', response.content);
        return response.content;
      } else {
        console.log('No valid response data found');
        return [];
      }
    } catch (err) {
      console.error('Error fetching all subscriptions for export:', err);
      return [];
    }
  }, [appliedSearch, get]);

  // Map API fields to table columns
  const mappedSubscriptions = subscriptions.map(subscription => ({
    email: subscription.email || subscription, // Handle both object and string responses
  }));

  return {
    subscriptions: mappedSubscriptions,
    search,
    setSearch,
    page,
    setPage: handlePageChange,
    pageCount,
    totalCount,
    loading,
    toastQueue,
    setToastQueue,
    handleReset,
    handleApply,
    setRefreshFlag,
    fetchAllSubscriptions,
  };
}
