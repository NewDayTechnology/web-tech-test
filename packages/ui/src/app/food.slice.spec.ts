import { fetchFood, foodAdapter, foodReducer } from './food.slice';

describe('food reducer', () => {
  it('should handle initial state', () => {
    const expected = foodAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(foodReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchFoods', () => {
    let state = foodReducer(undefined, fetchFood.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = foodReducer(state, fetchFood.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = foodReducer(
      state,
      fetchFood.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
