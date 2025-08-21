import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <UserContext.Provider value={{ email, setEmail, phone, setPhone }}>
      {children}
    </UserContext.Provider>
  );
};
