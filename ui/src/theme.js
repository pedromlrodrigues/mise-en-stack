import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", system-ui, "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#333333',
          fontSize: '1rem',
          textTransform: 'none',
          position: 'relative',
          transition: 'transform 0.1s ease-out',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:active': {
            transform: 'scale(0.90)',
          },
          '&.active::after': {
            transform: 'scaleX(1)',
            transformOrigin: 'bottom left',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'currentColor',
            transform: 'scaleX(0)',
            transformOrigin: 'bottom right',
            transition: 'transform 0.25s ease-out',
          },
          '&:hover::after': {
            transform: 'scaleX(1)',
            transformOrigin: 'bottom left',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333333',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#333333',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#333333',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#555555',
            },
          },
        },
      },
    },
  },
});

export default theme;
