import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './app/app';
import { createTheme, ThemeProvider } from '@mui/material';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { FOOD_FEATURE_KEY, foodReducer } from './app/food.slice';

import {
  NAVIGATION_FEATURE_KEY,
  navigationReducer,
} from './app/navigation.slice';

const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: {
    [NAVIGATION_FEATURE_KEY]: navigationReducer,
    [FOOD_FEATURE_KEY]: foodReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

root.render(
  <Provider store={store}>
    <StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  </Provider>
);
