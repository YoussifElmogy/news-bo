import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewsForm from '../components/form/news/NewsForm';
import useNews from '../hooks/useNews';
import useApi from '../configs/useApi';

export default function AddNews() {
  const navigate = useNavigate();
  const { createNews } = useNews();
  const { post } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (newsData, imageFile) => {
    setIsLoading(true);
    try {
      let imageUrl = '';
      
      // First, upload the image if there is one
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        
        const imageResponse = await post('/api/images/upload', imageFormData);
        imageUrl = imageResponse; // Assuming the API returns the image URL/path directly
      }
      
      // Then create the news with the image URL
      const finalNewsData = {
        ...newsData,
        image: imageUrl?.imageUrl || imageUrl || '',
      };
      
      console.log('Final news data:', finalNewsData);
      await createNews(finalNewsData);
      
      navigate('/news');
    } catch (error) {
      console.error('Error adding news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '1.556rem' }}>
        <IconButton
          onClick={() => navigate('/news')}
          sx={{
            mr: '1rem',
            color: '#3788F4',
            '&:hover': {
              bgcolor: '#E0F2FE',
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ color: '#111928', fontSize: '1.6rem', fontWeight: 700 }}>
          Add News
        </Typography>
      </Box>

      <NewsForm onSubmit={handleSubmit} isLoading={isLoading} isEditMode={false} />
    </>
  );
}

