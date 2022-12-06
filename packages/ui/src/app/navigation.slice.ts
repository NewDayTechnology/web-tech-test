import {
  Action,
  createAction,
  createSlice,
  Middleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import { createBrowserHistory, Location } from 'history';
import { store } from '../store';

const history = createBrowserHistory();

export type NavigationState = {
  pathname: string;
};

export const initialNavigationState: NavigationState = {
  pathname: '/',
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialNavigationState,
  reducers: {
    locationChange(state, { payload }: PayloadAction<NavigationState>) {
      state.pathname = payload.pathname;
    },
  },
});

export const navigationReducer = navigationSlice.reducer;

export const navigationActions = {
  ...navigationSlice.actions,
  push: createAction<string>('navigation/push'),
  back: createAction('navigation/back'),
  forward: createAction('navigation/forward'),
};

export const navigationMiddleware: Middleware =
  () => (next) => (action: Action) => {
    // TODO implementation
    if (navigationActions.push.match(action)) {
      console.log('push path to browser history');
    }
    if (navigationActions.back.match(action)) {
      console.log('navigate back in browser history');
    }
    if (navigationActions.forward.match(action)) {
      console.log('navigate forward in browser history');
    }
    return next(action);
  };

// TODO refactoring opportunity
const captureLocation = (location: Location) => {
  store.dispatch(
    navigationActions.locationChange({ pathname: location.pathname })
  );
};

export const setup = () => {
  // store initial location
  captureLocation(history.location);

  // listen for location changes
  history.listen((update) => captureLocation(update.location));
};
