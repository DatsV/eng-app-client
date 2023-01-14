import * as yup from 'yup';

const checker = (value: string, characters: number) => {
  let fail: string[] = [];
  value.split(' ').forEach((el) => {
    if (el.length > characters) {
      fail.push(el);
    }
  });
  return fail;
};

export const AddWordSchema = yup.object().shape({
  english: yup
    .string()
    .min(2, 'enter more letters')
    .max(40)

    .test('test', 'error', function (values) {
      if (!values) {
        return false;
      }

      const { path, createError } = this;

      const fail = checker(values, 16);

      if (fail.length >= 1) {
        return createError({
          path,
          message: `word "${fail[0]}" is too long, max 16 characters`,
        });
      }
      return true;
    })
    .required(),

  translate: yup
    .string()
    .min(2, 'enter more letters')
    .max(40)
    .test('test', 'error', function (values) {
      if (!values) {
        return false;
      }

      const { path, createError } = this;

      const fail = checker(values, 16);

      if (fail.length >= 1) {
        return createError({
          path,
          message: `word "${fail[0]}" is too long, max 16 characters`,
        });
      }
      return true;
    })
    .required(),
});

export const GroupSchema = yup.object().shape({
  group: yup
    .string()
    .min(2, 'enter more letters')
    .max(20)
    .test('test', 'error', function (values) {
      if (!values) {
        return false;
      }

      const { path, createError } = this;

      const fail = checker(values, 14);

      if (fail.length >= 1) {
        return createError({
          path,
          message: `word "${fail[0]}" is too long, max 14 characters`,
        });
      }
      return true;
    })
    .required(),
});
