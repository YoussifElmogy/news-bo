import * as yup from 'yup';

const newsSchema = yup.object().shape({
  titleArabic: yup
    .string()
    .required('Arabic title is required')
    .min(3, 'Arabic title must be at least 3 characters'),
  titleEnglish: yup
    .string()
    .required('English title is required')
    .min(3, 'English title must be at least 3 characters'),
  descriptionArabic: yup
    .string()
    .required('Arabic description is required')
    .min(10, 'Arabic description must be at least 10 characters'),
  descriptionEnglish: yup
    .string()
    .required('English description is required')
    .min(10, 'English description must be at least 10 characters'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['Business', 'Entertainment', 'Lifestyle', 'Travel', 'Sports', 'Tech', 'Opinions', 'Interviews'], 'Invalid category'),
  date: yup
    .string()
    .required('Date is required'),
});

export default newsSchema;

