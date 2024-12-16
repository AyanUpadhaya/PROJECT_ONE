import { createContext, useState } from "react";

export const BookContext = createContext(null);


export const BookProvider = ({ children }) => {
    const [books, setbooks] = useState([])

    return (
      <BookContext.Provider value={books}>{children}</BookContext.Provider>
    );
}

