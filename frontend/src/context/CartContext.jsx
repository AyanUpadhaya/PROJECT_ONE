import { createContext, useState } from "react";
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    return (
      <BookContext.Provider value={cart}>{children}</BookContext.Provider>
    );
}

