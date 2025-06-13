import { useContext, useSyncExternalStore } from 'react';
import { StoreContext } from './store-context';

export const useCustomDispatch = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useCustomDispatch must be used within a StoreProvider.');
  }
  return store.dispatch;
};

export const useCustomSelector = (selector) => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useCustomSelector must be used within a StoreProvider.');
  }

  const selectedState = useSyncExternalStore(
    (onStoreChange) => store.subscribe(onStoreChange),
    () => selector(store.getState())
  );

  return selectedState;
};
