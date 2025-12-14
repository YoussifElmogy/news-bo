import * as yup from 'yup';

const newsSchema = yup.object().shape({
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['Business', 'Entertainment', 'Lifestyle', 'Travel', 'Sports', 'Tech', 'Opinions', 'Interviews'], 'Invalid category'),
  date: yup
    .string()
    .required('Date is required'),
  isFeatured: yup
    .boolean()
    .required('Please select if this news is featured'),
});

export default newsSchema;

