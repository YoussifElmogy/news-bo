import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomLoader from '../components/skeletons/CustomLoader';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchAndFilter from '../components/SearchAndFilter/SearchAndFilter';
import CustomPaginatedTable from '../components/CustomPaginatedTable/CustomPaginatedTable';
import CustomPagination from '../components/Pagination/Pagination';
import CustomSkeleton from '../components/skeletons/CustomSkeleton';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';
import useNews from '../hooks/useNews';

export default function News() {
  const navigate = useNavigate();
  const {
    news,
    status,
    setStatus,
    search,
    setSearch,
    page,
    setPage,
    pageCount,
    loadingNews,
    loadingDeleteNews,
    totalCount,
    handleReset,
    handleApply,
    fetchAllNews,
    handleDeleteNews,
    deleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    fetchNews,
  } = useNews();

  // Fetch news when component mounts
  useEffect(() => {
    fetchNews({ page: 0 });
    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    await handleDeleteNews();
    // Refresh the news list after deletion with current filters
    fetchNews({ search, category: status, page });
  };

  const columns = [
    { 
      key: 'titleEn', 
      label: 'Title',
      render: (row) => (
        <Box
          onClick={() => navigate(`/news/edit/${row.id}`)}
          sx={{
            cursor: 'pointer',
            color: '#3788F4',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {row.titleEnglish || row.titleArabic || '-'}
        </Box>
      )
    },
    { 
      key: 'category', 
      label: 'Category',
      render: (row) => (
        <Box
          sx={{
            display: 'inline-block',
            px: '0.75rem',
            py: '0.25rem',
            borderRadius: '1rem',
            bgcolor: getCategoryColor(row.category),
            color: '#fff',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'capitalize',
          }}
        >
          {row.category}
        </Box>
      )
    },
    { 
      key: 'date', 
      label: 'Date',
      render: (row) => row.date ? new Date(row.date).toLocaleDateString() : '-'
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row) => (
        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
          <IconButton
            onClick={() => navigate(`/news/edit/${row.id}`)}
            sx={{
              color: '#3788F4',
              '&:hover': {
                bgcolor: '#E0F2FE',
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => openDeleteModal(row.id)}
            disabled={loadingDeleteNews}
            sx={{
              color: '#EF4444',
              '&:hover': {
                bgcolor: '#FEE2E2',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    },
  ];

  const getCategoryColor = (category) => {
    const categoryLower = category?.toLowerCase();
    switch (categoryLower) {
      case 'business':
        return '#3B82F6'; // Blue
      case 'entertainment':
        return '#EC4899'; // Pink
      case 'lifestyle':
        return '#10B981'; // Green
      case 'travel':
        return '#8B5CF6'; // Purple
      case 'sports':
        return '#EF4444'; // Red
      case 'tech':
        return '#06B6D4'; // Cyan
      case 'opinions':
        return '#F59E0B'; // Orange
      case 'interviews':
        return '#6366F1'; // Indigo
      default:
        return '#6B7280'; // Gray
    }
  };

  return (
    <>
      <CustomLoader show={loadingDeleteNews} />

      {loadingNews ? (
        <CustomSkeleton width="14.111rem" height="2.5rem" borderRadius="2rem" sx={{m:0, mb:'1.556rem'}} />
      ) : (
        <Typography sx={{mb:'1.556rem', color:'#111928', fontSize:'1.6rem', fontWeight:700}}>
          News {totalCount}
        </Typography>
      )}

      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '0.889rem',
          overflowX: 'auto',
          maxWidth: '100%',
          border: '1px solid #3788F442',
        }}
      >
        <SearchAndFilter
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          onReset={handleReset}
          onApply={handleApply}
          maxLength={30}
          statusOptions={[
            { value: 'business', label: 'Business' },
            { value: 'entertainment', label: 'Entertainment' },
            { value: 'lifestyle', label: 'Lifestyle' },
            { value: 'travel', label: 'Travel' },
            { value: 'sports', label: 'Sports' },
            { value: 'tech', label: 'Tech' },
            { value: 'opinions', label: 'Opinions' },
            { value: 'interviews', label: 'Interviews' },
          ]}
          searchPlaceholder="Search by title"
          fetchAllUsers={fetchAllNews}
        />
        <CustomPaginatedTable
          columns={columns}
          data={news}
          loading={loadingNews}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1.556rem' }}>
        {loadingNews ? (
          <CustomSkeleton
            width="14.111rem"
            height="2.5rem"
            borderRadius="2rem"
          />
        ) : pageCount > 1 ? (
          <CustomPagination
            page={page + 1}
            count={pageCount}
            onChange={uiPage => setPage(uiPage - 1)}
          />
        ) : (
          ''
        )}
      </Box>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Delete News"
        message="Are you sure you want to delete this news article? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={loadingDeleteNews}
      />
    </>
  );
}

