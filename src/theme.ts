import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4683d9',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          transition: 'margin-bottom 0.4s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'inherit',
          fontSize: 16,
          transition: 'none',
          '&:active': {
            boxShadow: 'none',

            transform: 'translateY(1px)',
          },
        },
        contained: {
          fontWeight: '600',
          textTransform: 'uppercase',
          boxShadow:
            '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
          '&:hover': {
            boxShadow:
              '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
          },
          ':disabled': {
            backgroundColor: '#555881',
            opacity: '0.6',
          },
        },
        text: {
          backgroundColor: 'transparent',
          padding: '0px',
          border: '1px solid black',
          boxShadow:
            '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:hover': {
            border: '1px solid wheat',
            color: 'wheat',
            boxShadow:
              '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          minWidth: '0',
          border: 'none',
          padding: '2',

          '&:hover': {
            border: 'none',
            backgroundColor: 'transparent',
            boxShadow:
              '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
          },
        },
        containedPrimary: {
          backgroundColor: '#555881',
          '&:hover': {
            backgroundColor: '#38547c',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: '-9px',
          color: 'wheat',

          '&.MuiFormLabel-filled': {
            top: '-25px',
          },
          '&.Mui-error': {
            color: 'inherit',
          },
        },

        filled: {
          '&.Mui-focused': {
            color: 'wheat',

            top: '-25px',

            transition: 'all 0.5s ease',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          bottom: '-60%',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'wheat',
          fontSize: '22px',
          textAlign: 'center',
          '&.Mui-focused': {
            padding: '0 10px',
          },
        },

        input: {
          textAlign: 'center',
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: 'wheat',
          border: '1px solid wheat',
          borderRadius: '40px',

          ':before, :after': {
            display: 'none',
          },

          '&:hover': {
            borderBottom: '1px solid wheat',
          },

          '&:hover:not(.Mui-focused):before': {
            borderBottom: '2px solid wheat !important',
          },
          '&:after': {
            borderBottom: '2px solid green !important',
          },

          '&.Mui-error': {
            borderBottom: '1px solid red',
          },
        },

        input: {
          padding: '5px 15px',
          '&:-webkit-autofill': {
            WebkitTransitionDelay: '9999999s',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {},
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          width: '100px',
          maxWidth: '100px',
          borderRadius: '15px',
          padding: '5px 25px 5px 10px',
          border: '1px solid rgba(245, 222, 179, 0.439)',
          color: 'white',
        },
        icon: {
          color: 'white',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'blue',
            borderWidth: '0',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
            borderWidth: '0',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'unset',
          transition: 'none !important',
          color: 'white',
          borderRadius: '0 0 25px 25px',
          maxWidth: '142px !important',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgb(0 0 0 / 39%)',
          maxHeight: '400px',
          overflowY: 'auto',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ':hover': {
            backgroundColor: 'rgb(172 172 172 / 33%)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgb(30 111 224 / 41%)',
          },
        },
      },
    },
  },
});
