import {
  fetchNavigation,
  navigationAdapter,
  navigationReducer,
} from './navigation.slice';

describe('navigation reducer', () => {
  it('should handle initial state', () => {
    const expected = navigationAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(navigationReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchNavigations', () => {
    let state = navigationReducer(
      undefined,
      fetchNavigation.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = navigationReducer(
      state,
      fetchNavigation.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = navigationReducer(
      state,
      fetchNavigation.rejected(new Error('Uh oh'), null, null)
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
