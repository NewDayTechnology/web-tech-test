import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const FOOD_FEATURE_KEY = 'food';

/*
 * Update these interfaces according to your requirements.
 */
export interface FoodEntity {
  id: number;
}

export interface FoodState extends EntityState<FoodEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const foodAdapter = createEntityAdapter<FoodEntity>();

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
 *   dispatch(fetchFood())
 * }, [dispatch]);
 * ```
 */
export const fetchFood = createAsyncThunk(
  'food/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getFoods()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialFoodState: FoodState = foodAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
});

export const foodSlice = createSlice({
  name: FOOD_FEATURE_KEY,
  initialState: initialFoodState,
  reducers: {
    add: foodAdapter.addOne,
    remove: foodAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (state: FoodState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchFood.fulfilled,
        (state: FoodState, action: PayloadAction<FoodEntity[]>) => {
          foodAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchFood.rejected, (state: FoodState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message || 'Fetch food error';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const foodReducer = foodSlice.reducer;

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
 *   dispatch(foodActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const foodActions = foodSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllFood);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = foodAdapter.getSelectors();

export const getFoodState = (rootState: unknown): FoodState =>
  // eslint-disable-next-line
  // @ts-ignore
  rootState[FOOD_FEATURE_KEY];

export const selectAllFood = createSelector(getFoodState, selectAll);

export const selectFoodEntities = createSelector(getFoodState, selectEntities);
