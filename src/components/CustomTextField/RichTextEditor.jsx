import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Box, Typography } from '@mui/material';

const RichTextEditor = ({ label, value, onChange, error, helperText, placeholder }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align'
  ];

  return (
    <Box sx={{ mb: '1.333rem' }}>
      <Typography
        sx={{
          mb: '0.5rem',
          color: error ? '#EF4444' : '#374151',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          '& .quill': {
            bgcolor: '#fff',
          },
          '& .ql-container': {
            minHeight: '150px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            border: error ? '1px solid #EF4444' : '1px solid #D1D5DB',
            borderBottomLeftRadius: '0.375rem',
            borderBottomRightRadius: '0.375rem',
          },
          '& .ql-toolbar': {
            border: error ? '1px solid #EF4444' : '1px solid #D1D5DB',
            borderTopLeftRadius: '0.375rem',
            borderTopRightRadius: '0.375rem',
            bgcolor: '#F9FAFB',
          },
          '& .ql-editor': {
            minHeight: '150px',
          },
          '& .ql-editor.ql-blank::before': {
            color: '#9CA3AF',
            fontStyle: 'normal',
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={value || ''}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
        />
      </Box>
      {helperText && (
        <Typography
          sx={{
            mt: '0.25rem',
            color: '#EF4444',
            fontSize: '0.75rem',
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default RichTextEditor;

