import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import CustomTextField from '../../CustomTextField/CustomTextField';
import Button from '../../Button/Button';
import CustomLoader from '../../skeletons/CustomLoader';
import newsSchema from './newsSchema';

const NewsForm = ({ onSubmit, initialValues, isLoading, isEditMode = false }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(newsSchema),
    mode: 'onChange',
    defaultValues: initialValues || {
      titleArabic: '',
      titleEnglish: '',
      descriptionArabic: '',
      descriptionEnglish: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
    },
  });

  const category = watch('category');
  console.log(category);

  useEffect(() => {
    if (initialValues) {
      setValue('titleArabic', initialValues.titleArabic || '');
      setValue('titleEnglish', initialValues.titleEnglish || '');
      setValue('descriptionArabic', initialValues.descriptionArabic || '');
      setValue('descriptionEnglish', initialValues.descriptionEnglish || '');
      setValue('category', initialValues.category || '');
      setValue('date', initialValues.date || new Date().toISOString().split('T')[0]);
      setValue('image',  initialValues.image || '');
      if (initialValues.image) {
        setImagePreview(initialValues.image);
      }
    }
  }, [initialValues, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (data) => {
    // Pass form data and image file separately
    const newsData = {
      titleArabic: data.titleArabic || '',
      titleEnglish: data.titleEnglish || '',
      descriptionArabic: data.descriptionArabic || '',
      descriptionEnglish: data.descriptionEnglish || '',
      category: data.category.toLowerCase(), // Send lowercase to backend
      date: data.date,
    };

    await onSubmit(newsData, imageFile);
  };

  return (
    <>
      <CustomLoader show={isLoading} />
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '0.889rem',
          p: '2rem',
          border: '1px solid #3788F442',
        }}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <Typography
            sx={{
              mb: '1.5rem',
              color: '#111928',
              fontSize: '1.2rem',
              fontWeight: 600,
            }}
          >
            {isEditMode ? 'Edit News' : 'Add News'}
          </Typography>

          {/* Title AR */}
          <CustomTextField
            label="Title (Arabic)"
            placeholder="أدخل العنوان بالعربية"
            type="text"
            fullWidth
            error={!!errors.titleArabic}
            helperText={errors.titleArabic ? errors.titleArabic.message : ''}
            {...register('titleArabic')}
            sx={{ mb: '1.333rem' }}
          />

          {/* Title EN */}
          <CustomTextField
            label="Title (English)"
            placeholder="Enter title in English"
            type="text"
            fullWidth
            error={!!errors.titleEnglish}
            helperText={errors.titleEnglish ? errors.titleEnglish.message : ''}
            {...register('titleEnglish')}
            sx={{ mb: '1.333rem' }}
          />

          {/* Description AR */}
          <CustomTextField
            label="Description (Arabic)"
            placeholder="أدخل الوصف بالعربية"
            type="text"
            fullWidth
            multiline
            rows={4}
            error={!!errors.descriptionArabic}
            helperText={errors.descriptionArabic ? errors.descriptionArabic.message : ''}
            {...register('descriptionArabic')}
            sx={{ mb: '1.333rem' }}
          />

          {/* Description EN */}
          <CustomTextField
            label="Description (English)"
            placeholder="Enter description in English"
            type="text"
            fullWidth
            multiline
            rows={4}
                error={!!errors.descriptionEnglish}
            helperText={errors.descriptionEnglish ? errors.descriptionEnglish.message : ''}
            {...register('descriptionEnglish')}
            sx={{ mb: '1.333rem' }}
          />

          {/* Category */}
          <FormControl
            fullWidth
            error={!!errors.category}
            sx={{ mb: '1.333rem' }}
          >
            <InputLabel
              sx={{
                color: '#6B7280',
                '&.Mui-focused': { color: '#3788F4' },
              }}
            >
              Category
            </InputLabel>
            <Select
              value={category || ''}
              label="Category"
              {...register('category')}
              onChange={(e) => setValue('category', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: errors.category ? '#EF4444' : '#D1D5DB',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: errors.category ? '#EF4444' : '#3788F4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: errors.category ? '#EF4444' : '#3788F4',
                },
              }}
            >
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Lifestyle">Lifestyle</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Opinions">Opinions</MenuItem>
              <MenuItem value="Interviews">Interviews</MenuItem>
            </Select>
            {errors.category && (
                <FormHelperText>{errors.category ? errors.category.message : ''   }</FormHelperText>
            )}
          </FormControl>

          {/* Date */}
          <CustomTextField
            label="Date"
            type="date"
            fullWidth
            error={!!errors.date}
            helperText={errors.date ? errors.date.message : ''}
            {...register('date')}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: '1.333rem' }}
          />

          {/* Image Upload */}
          <Box sx={{ mb: '1.333rem' }}>
            <Typography
              sx={{
                mb: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                display: 'block',
                marginBottom: '1rem',
                padding: '0.5rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                width: '100%',
                cursor: 'pointer',
              }}
            />
            {imagePreview && (
              <Box
                sx={{
                  mt: '1rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  p: '1rem',
                  textAlign: 'center',
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '0.375rem',
                  }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: '1rem', mt: '2rem' }}>
            <Button type="submit" fullWidth disabled={isLoading}>
              {isEditMode ? 'Update News' : 'Add News'}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default NewsForm;

