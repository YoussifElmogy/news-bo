import React, { useEffect, useState } from 'react';
import CustomLoader from '../components/skeletons/CustomLoader';
import { Box, Typography } from '@mui/material';
import SearchAndFilter from '../components/SearchAndFilter/SearchAndFilter';
import CustomPaginatedTable from '../components/CustomPaginatedTable/CustomPaginatedTable';
import CustomPagination from '../components/Pagination/Pagination';
import CustomSkeleton from '../components/skeletons/CustomSkeleton';
import useSubscriptions from '../hooks/useSubscriptions';

export default function SubscribedUsers() {
  const {
    subscriptions,
    search,
    setSearch,
    page,
    setPage,
    pageCount,
    loading,
    totalCount,
    handleReset,
    handleApply,
    fetchAllSubscriptions,
  } = useSubscriptions();

  const columns = [
    { key: 'email', label: 'Email Address' },
  ];

  return (
    <>
      <CustomLoader show={loading} />

      {loading ? (
        <CustomSkeleton width="14.111rem" height="2.5rem" borderRadius="2rem" sx={{ m: 0, mb: '1.556rem' }} />
      ) : (
        <Typography sx={{mb:'1.556rem', color:'#111928', fontSize:'1.6rem', fontWeight:700}} >Subscribed Users {totalCount}</Typography>
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
          onReset={handleReset}
          onApply={handleApply}
          maxLength={50}
          searchPlaceholder="Search by email"
          fetchAllUsers={fetchAllSubscriptions}
          exportFilename="subscribed_users_export"
          dataType="subscriptions"
        />
        <CustomPaginatedTable
          columns={columns}
          data={subscriptions}
          loading={loading}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1.556rem' }}>
        {loading ? (
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
    </>
  );
}
