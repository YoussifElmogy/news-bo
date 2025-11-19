import { useState, useCallback, useEffect } from 'react';
import useApi from '../configs/useApi';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loadingResendActivation, setLoadingResendActivation] = useState(false);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toastQueue, setToastQueue] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingDeleteUser, setLoadingDeleteUser] = useState(false);
  const size = 10;
  const { get, post, del } = useApi();
  console.log({totalCount});
  // Fetch users from real API
  const fetchUsers = useCallback(
    async (opts = {}) => {
      setLoadingUser(true);
      try {
        // Build query parameters
        const params = new URLSearchParams();

        if (opts.search && opts.search.trim()) {
          params.append('name', opts.search.trim());
        }

        if (opts.status && opts.status !== '') {
          // Convert status string to boolean for API
          const isActive = opts.status === 'active' ? 'true' : 'false';
          params.append('IsActive', isActive);
        }

        params.append('page', opts.page ?? page); // API uses 1-based pagination
        params.append('size', size);

        const queryString = params.toString();
        const url = `/api/admin/users${queryString ? `?${queryString}` : ''}`;

        const response = await get(url);

        if (response && response.content) {
          setUsers(response.content);
          setTotalCount(response.totalElements || 0);
          setPageCount(Math.ceil((response.totalElements || 0) / size));
        } else {
          setUsers([]);
          setTotalCount(0);
          setPageCount(1);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setToastQueue(queue => [
          ...queue,
          { message: 'Failed to fetch users.', severity: 'error' },
        ]);
        setUsers([]);
        setTotalCount(0);
        setPageCount(1);
      } finally {
        setLoadingUser(false);
      }
    },
    [page, size, refreshFlag, get]
  );

  useEffect(() => {
    fetchUsers({ search: appliedSearch, status: appliedStatus, page });
    // eslint-disable-next-line
  }, [refreshFlag]);

  const handleApply = () => {
    setAppliedSearch(search);
    setAppliedStatus(status);
    setPage(0);
    fetchUsers({ search, status, page: 0 });
  };

  const handleReset = () => {
    setSearch('');
    setStatus('');
    setAppliedSearch('');
    setAppliedStatus('');
    setPage(0);
    fetchUsers({ search: '', status: '', page: 0 });
  };

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchUsers({ search: appliedSearch, status: appliedStatus, page: newPage });
  };

  const handleConfirmDelete = async () => {
    if (userToDelete !== null) {
      setLoadingDeleteUser(true);
      const user = users[userToDelete];
      try {
        await del(`/api/Users/${user.id}`);

        setUsers(prev => prev.filter((_, i) => i !== userToDelete));
        setTotalCount(prev => prev - 1);
        setToastQueue(queue => [
          ...queue,
          { message: 'User deleted successfully.', severity: 'success' },
        ]);

        // Refresh the current page data
        fetchUsers({ search: appliedSearch, status: appliedStatus, page });
      } catch (err) {
        console.error('Error deleting user:', err);
        setToastQueue(queue => [
          ...queue,
          {
            message: err.message || 'Failed to delete user. Please try again.',
            severity: 'error',
          },
        ]);
      } finally {
        setUserToDelete(null);
        setModalOpen(false);
        setLoadingDeleteUser(false);
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setUserToDelete(null);
  };

  const handleResendActivation = async (id, email) => {
    setLoadingResendActivation(true);
    try {
      await post(`/api/Users/${id}/resend-activation`);

      setToastQueue(queue => [
        ...queue,
        {
          message: `Activation email sent to ${email}`,
          severity: 'success',
        },
      ]);
    } catch (err) {
      setLoadingResendActivation(false);
      console.error('Error resending activation:', err);
      setToastQueue(queue => [
        ...queue,
        {
          message: 'Failed to send activation email. Please try again.',
          severity: 'error',
        },
      ]);
    } finally {
      setLoadingResendActivation(false);
    }
  };

  // Delete user modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Open delete confirmation modal
  const openDeleteModal = (userId) => {
    setUserIdToDelete(userId);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserIdToDelete(null);
  };

  // Delete user function
  const handleDeleteUser = async () => {
    if (!userIdToDelete) return;

    setLoadingDeleteUser(true);
    try {
      await del(`/api/admin/users/${userIdToDelete}`);

      setToastQueue(queue => [
        ...queue,
        { message: 'User deleted successfully.', severity: 'success' },
      ]);

      // Refresh the current page data
      setRefreshFlag(prev => prev + 1);
      closeDeleteModal();
    } catch (err) {
      console.error('Error deleting user:', err);
      setToastQueue(queue => [
        ...queue,
        {
          message: err.message || 'Failed to delete user. Please try again.',
          severity: 'error',
        },
      ]);
    } finally {
      setLoadingDeleteUser(false);
    }
  };

  // Fetch ALL users for export (without pagination)
  const fetchAllUsers = useCallback(async () => {
    try {
      // Build query parameters for all users
      const params = new URLSearchParams();
      
      // Use applied filters but get ALL results
      if (appliedSearch && appliedSearch.trim()) {
        params.append('name', appliedSearch.trim());
      }

      if (appliedStatus && appliedStatus !== '') {
        const isActive = appliedStatus === 'active' ? 'true' : 'false';
        params.append('IsActive', isActive);
      }

      // Get all users by setting a very high page size
      params.append('page', '0');
      params.append('size', '10000'); // Large number to get all users

      const queryString = params.toString();
      const url = `/api/admin/users${queryString ? `?${queryString}` : ''}`;

      const response = await get(url);

      if (response && response.content) {
        return response.content;
      } else {
        return [];
      }
    } catch (err) {
      console.error('Error fetching all users for export:', err);
      return [];
    }
  }, [appliedSearch, appliedStatus, get]);

  // Map API fields to table columns
  const mappedUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    speciality: user.speciality,
    organizationName: user.organizationName,
    nationality: user.nationality,
    airportName: user.airportName,
    flightDetails: user.flightDetails,

  }));

  return {
    users: mappedUsers,
    status,
    setStatus,
    search,
    setSearch,
    page,
    setPage: handlePageChange,
    pageCount,
    totalCount,
    modalOpen,
    setModalOpen,
    userToDelete,
    setUserToDelete,
    toastQueue,
    setToastQueue,
    loadingUser,
    loadingDeleteUser,
    handleConfirmDelete,
    handleCloseModal,
    handleReset,
    handleApply,
    handleResendActivation,
    setRefreshFlag,
    loadingResendActivation,
    fetchAllUsers,
    handleDeleteUser,
    deleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
  };
}
