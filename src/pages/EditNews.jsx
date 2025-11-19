import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewsForm from '../components/form/news/NewsForm';
import useNews from '../hooks/useNews';
import useApi from '../configs/useApi';
import CustomLoader from '../components/skeletons/CustomLoader';

export default function EditNews() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchNewsById, updateNews, loadingSingleNews } = useNews();
  const { post } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchNewsById(id);
      console.log(newsData);
      if (newsData) {
        // Capitalize first letter of category to match form options
        const capitalizeFirstLetter = (str) => {
          if (!str) return '';
          return str.charAt(0).toUpperCase() + str.slice(1);
        };

        setInitialValues({
          titleArabic: newsData.titleArabic || '',
          titleEnglish: newsData.titleEnglish || '',
          descriptionArabic: newsData.descriptionArabic || '',
          descriptionEnglish: newsData.descriptionEnglish || '',
          category: capitalizeFirstLetter(newsData.category) || '',
          date: newsData.date ? new Date(newsData.date).toISOString().split('T')[0] : '',
          image: newsData.image || '',
        });
      }
    };

    loadNews();
  }, [id, fetchNewsById]);

  const handleSubmit = async (newsData, imageFile) => {
    setIsLoading(true);
    try {
      let imageUrl = initialValues?.image || ''; // Keep existing image by default
      
      // If a new image is uploaded, upload it first
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        
        const imageResponse = await post('/api/images/upload', imageFormData);
        imageUrl = imageResponse; // Use the new image URL
      }
      
      // Then update the news with the image URL
      const finalNewsData = {
        ...newsData,
        image: imageUrl?.imageUrl || imageUrl || initialValues?.image || '',
      };
      
      console.log('Final news data for update:', finalNewsData);
      await updateNews(id, finalNewsData);
      
      navigate('/news');
    } catch (error) {
      console.error('Error updating news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingSingleNews) {
    return <CustomLoader show={true} />;
  }

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
          Edit News
        </Typography>
      </Box>

      {initialValues && (
        <NewsForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          isLoading={isLoading}
          isEditMode={true}
        />
      )}
    </>
  );
}

