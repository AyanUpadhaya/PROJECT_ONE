import { createContext } from "react";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  return (
    <OrderContext.Provider value={orders}>{children}</OrderContext.Provider>
  );
};
