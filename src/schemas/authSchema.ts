import * as yup from 'yup';

export const RecoverPassSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

export const LoginSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Min length is a 6 characters'),
  })
  .concat(RecoverPassSchema);

export const RegisterSchema = yup
  .object()
  .shape({
    passwordConfirm: yup
      .string()
      .required('Password is required')
      .oneOf([yup.ref('password')], 'Password does not match'),
  })
  .concat(LoginSchema);

export const RecoverSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Min length is a 6 characters'),
  passwordConfirm: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Password does not match'),
});

export const CodeSchema = yup.object().shape({
  code: yup
    .string()
    .required('Code is required')
    .min(6, 'Min length is a 6 characters'),
});
