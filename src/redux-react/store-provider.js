import { StoreContext } from './store-context';

const initialData = {
  a: 1,
};

const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={initialData}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
