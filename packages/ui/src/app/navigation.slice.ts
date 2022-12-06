import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const NAVIGATION_FEATURE_KEY = 'navigation';

/*
 * Update these interfaces according to your requirements.
 */
export interface NavigationEntity {
  path: string;
}

export interface NavigationState extends EntityState<NavigationEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const navigationAdapter = createEntityAdapter<NavigationEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchNavigation())
 * }, [dispatch]);
 * ```
 */
export const fetchNavigation = createAsyncThunk(
  'navigation/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getNavigations()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialNavigationState: NavigationState =
  navigationAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: '',
  });

export const navigationSlice = createSlice({
  name: NAVIGATION_FEATURE_KEY,
  initialState: initialNavigationState,
  reducers: {
    add: navigationAdapter.addOne,
    remove: navigationAdapter.removeOne,
    // ...
  },
});

/*
 * Export reducer for store configuration.
 */
export const navigationReducer = navigationSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(navigationActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const navigationActions = navigationSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllNavigation);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = navigationAdapter.getSelectors();

export const getNavigationState = (rootState: unknown): NavigationState =>
  // eslint-disable-next-line
  // @ts-ignore
  rootState[NAVIGATION_FEATURE_KEY];

export const selectAllNavigation = createSelector(
  getNavigationState,
  selectAll
);

export const selectNavigationEntities = createSelector(
  getNavigationState,
  selectEntities
);
