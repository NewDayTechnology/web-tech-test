import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { navigationActions } from './navigation.slice';

export const useNavigation = () => {
  const dispatch = useDispatch();
  const pathname = useSelector(
    ({ navigation }: AppState) => navigation.pathname
  );

  const navigateTo = useCallback((newLocation: string) => {
    dispatch(navigationActions.push(newLocation));
  }, []);

  const navigateBack = () => {
    dispatch(navigationActions.back());
  };

  const navigateForward = () => {
    dispatch(navigationActions.forward());
  };

  return { pathname, navigateTo, navigateBack, navigateForward };
};
