import { useState, useCallback, useEffect } from 'react';
import useApi from '../configs/useApi';

export default function useNews() {
  const [news, setNews] = useState([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [toastQueue, setToastQueue] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [loadingNews, setLoadingNews] = useState(false);
  const [loadingDeleteNews, setLoadingDeleteNews] = useState(false);
  const [loadingSingleNews, setLoadingSingleNews] = useState(false);
  const [singleNews, setSingleNews] = useState(null);
  const size = 10;
  const { get, post, put, del } = useApi();
console.log(news);
  // Fetch news from API
  const fetchNews = useCallback(
    async (opts = {}) => {
      setLoadingNews(true);
      try {
        const params = new URLSearchParams();

      if (opts.search && opts.search.trim()) {
        params.append('search', opts.search.trim());
      }

      params.append('page', opts.page ?? page);
      params.append('size', size);

      // Build URL with category in path
      const category = opts.category && opts.category !== '' ? opts.category : 'all';
      const queryString = params.toString();
      const url = `/api/news/category/${category}${queryString ? `?${queryString}` : ''}`;

        const response = await get(url);
        console.log(response);

        if (response) {
          setNews(response.content);
          setTotalCount(response.totalElements || 0);
          setPageCount(Math.ceil((response.totalElements || 0) / size));
        } else {
          setNews([]);
          setTotalCount(0);
          setPageCount(1);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setToastQueue(queue => [
          ...queue,
          { message: 'Failed to fetch news.', severity: 'error' },
        ]);
        setNews([]);
        setTotalCount(0);
        setPageCount(1);
      } finally {
        setLoadingNews(false);
      }
    },
    [page, size, refreshFlag]
  );

  // Removed automatic fetch - pages control when to fetch

  const handleApply = (callback) => {
    setAppliedSearch(search);
    setAppliedStatus(status);
    setPage(0);
    fetchNews({ search, category: status, page: 0 });
    if (callback) callback();
  };

  const handleReset = (callback) => {
    setSearch('');
    setStatus('');
    setAppliedSearch('');
    setAppliedStatus('');
    setPage(0);
    fetchNews({ search: '', category: '', page: 0 });
    if (callback) callback();
  };

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchNews({ search: appliedSearch, category: appliedStatus, page: newPage });
  };

  // Delete news modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newsIdToDelete, setNewsIdToDelete] = useState(null);

  // Open delete confirmation modal
  const openDeleteModal = (newsId) => {
    setNewsIdToDelete(newsId);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setNewsIdToDelete(null);
  };

  // Delete news function
  const handleDeleteNews = async (callback) => {
    if (!newsIdToDelete) return;

    setLoadingDeleteNews(true);
    try {
      await del(`/api/news/${newsIdToDelete}`);

      setToastQueue(queue => [
        ...queue,
        { message: 'News deleted successfully.', severity: 'success' },
      ]);

      // Refresh the current page data
      closeDeleteModal();
      if (callback) callback();
    } catch (err) {
      console.error('Error deleting news:', err);
      setToastQueue(queue => [
        ...queue,
        {
          message: err.message || 'Failed to delete news. Please try again.',
          severity: 'error',
        },
      ]);
    } finally {
      setLoadingDeleteNews(false);
    }
  };

  // Fetch single news by ID
  const fetchNewsById = useCallback(async (id) => {
    setLoadingSingleNews(true);
    try {
      const response = await get(`/api/news/${id}`);
      setSingleNews(response);
      return response;
    } catch (err) {
      console.error('Error fetching news by ID:', err);
      setToastQueue(queue => [
        ...queue,
        { message: 'Failed to fetch news details.', severity: 'error' },
      ]);
      return null;
    } finally {
      setLoadingSingleNews(false);
    }
  }, []);

  // Create news
  const createNews = async (newsData) => {
    try {
      const response = await post('/api/news', newsData);
      setToastQueue(queue => [
        ...queue,
        { message: 'News created successfully.', severity: 'success' },
      ]);
      return response;
    } catch (err) {
      console.error('Error creating news:', err);
      setToastQueue(queue => [
        ...queue,
        {
          message: err.message || 'Failed to create news. Please try again.',
          severity: 'error',
        },
      ]);
      throw err;
    }
  };

  // Update news
  const updateNews = async (id, newsData) => {
    try {
      const response = await put(`/api/news/${id}`, newsData);
      setToastQueue(queue => [
        ...queue,
        { message: 'News updated successfully.', severity: 'success' },
      ]);
      return response;
    } catch (err) {
      console.error('Error updating news:', err);
      setToastQueue(queue => [
        ...queue,
        {
          message: err.message || 'Failed to update news. Please try again.',
          severity: 'error',
        },
      ]);
      throw err;
    }
  };

  // Fetch ALL news for export (without pagination)
  const fetchAllNews = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      
      if (appliedSearch && appliedSearch.trim()) {
            params.append('titleEnglish', appliedSearch.trim());
      }

      params.append('page', '0');
      params.append('size', '10000');

      // Build URL with category in path
      const category = appliedStatus && appliedStatus !== '' ? appliedStatus : 'all';
      const queryString = params.toString();
      const url = `/api/news/category/${category}${queryString ? `?${queryString}` : ''}`;
      const response = await get(url);
      console.log(response);

      if (response && response.content) {
        return response.content;
      } else {
        return [];
      }
    } catch (err) {
      console.error('Error fetching all news for export:', err);
      return [];
    }
  }, [appliedSearch, appliedStatus, get]);

  return {
    news,
    status,
    setStatus,
    search,
    setSearch,
    page,
    setPage: handlePageChange,
    pageCount,
    totalCount,
    toastQueue,
    setToastQueue,
    loadingNews,
    loadingDeleteNews,
    loadingSingleNews,
    singleNews,
    handleReset,
    handleApply,
    fetchNews,
    fetchAllNews,
    handleDeleteNews,
    deleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    fetchNewsById,
    createNews,
    updateNews,
    setRefreshFlag,
  };
}

