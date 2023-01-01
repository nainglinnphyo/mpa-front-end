// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Box, IconButton, TextField, TextFieldProps } from '@mui/material';

import { useState } from 'react';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  require?: boolean;
  type?: string;
};

export default function RHFTextField({ name, require, type = 'text', ...other }: Props) {
  const { control } = useFormContext();

  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ position: 'relative' }}>
          <TextField
            {...field}
            fullWidth
            type={inputType}
            label={name}
            sx={{ display: 'flex' }}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value || ""}
            error={!!error}
            helperText={error?.message}
            autoComplete="off"
            {...other}
          />
          {type === 'password' ? (
            <Box onClick={togglePassword} sx={{ cursor: 'pointer' }}>
              {inputType !== 'password' ? (
                <Box sx={{ position: 'absolute', top: '8px', right: '1rem' }}>
                  <IconButton edge="end">
                    <Iconify
                      icon={inputType !== 'password' ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ position: 'absolute', top: '8px', right: '1rem' }}>
                  <IconButton edge="end">
                    <Iconify
                      icon={inputType !== 'password' ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </Box>
              )}
            </Box>
          ) : (
            ''
          )}
        </Box>
      )}
    />
  );
}
