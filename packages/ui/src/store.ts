import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FOOD_FEATURE_KEY, foodReducer } from './app/food.slice';
import {
  navigationMiddleware,
  navigationReducer,
} from './app/navigation.slice';

const reducer = combineReducers({
  [FOOD_FEATURE_KEY]: foodReducer,
  navigation: navigationReducer,
});

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer,
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(navigationMiddleware),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});
