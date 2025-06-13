import React from 'react';

import { createStore } from '../myredux/createStore';
import todoReducer, { initialState } from './reducer';
import { StoreContext } from './store-context';

const store = createStore(todoReducer, initialState);

const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
