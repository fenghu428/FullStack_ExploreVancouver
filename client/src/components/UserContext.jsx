import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get('/profile')
      .then(({ data }) => {
        setUser(data);
        console.log("User context updated:", data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setUser(null);
      })
      .finally(() => {
        setReady(true);
      });
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
