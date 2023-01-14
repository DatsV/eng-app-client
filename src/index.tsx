import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { theme } from './theme';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeStore } from './redux/store';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-2RP0H05W3T');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={makeStore}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </>,
);
