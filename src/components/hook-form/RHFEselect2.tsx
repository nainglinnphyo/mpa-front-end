import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

type SelectProps = TextFieldProps & {
  optionsService: any;
  value: string;
  error?: any;
  errorMessage?: any;
  onChange?: any;
  label: string;
  register: any;
};

const INPUT_WIDTH = 240;

const RHFEselect2: React.FC<SelectProps> = ({
  optionsService,
  value,
  error,
  errorMessage,
  onChange,
  label,
  register,
}) => (
  <TextField
    fullWidth
    select
    label={label}
    value={value}
    {...register}
    onChange={onChange}
    error={errorMessage}
    helperText={errorMessage}
    SelectProps={{
      MenuProps: {
        PaperProps: {
          sx: { maxHeight: 220 },
        },
      },
    }}
    sx={{
      maxWidth: { md: INPUT_WIDTH },
      textTransform: 'capitalize',
    }}
  >
    {optionsService.map((option: any) => (
      <MenuItem
        key={option.code}
        value={option.label}
        sx={{
          mx: 1,
          my: 0.5,
          borderRadius: 0.75,
          typography: 'body2',
          textTransform: 'capitalize',
          '&:first-of-type': { mt: 0 },
          '&:last-of-type': { mb: 0 },
        }}
      >
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default RHFEselect2;
