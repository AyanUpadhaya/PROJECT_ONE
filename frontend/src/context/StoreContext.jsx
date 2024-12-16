import { createContext } from "react";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);

  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
};
