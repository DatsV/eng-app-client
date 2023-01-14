import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  optionClass?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  type,
  label,
  placeholder,
  className,
  optionClass,
}) => {
  const { register, formState } = useFormContext();

  return (
    <TextField
      type={type}
      label={label}
      {...register(name)}
      placeholder={placeholder || ''}
      helperText={formState.errors[name]?.message as string}
      error={!!formState.errors[name]?.message}
      variant='filled'
      className={clsx(
        className,
        !!formState.errors[name]?.message && optionClass,
      )}
      fullWidth
    />
  );
};
