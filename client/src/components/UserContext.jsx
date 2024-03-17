import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.get('/account');
            setUser(data);
            console.log("User context updated:", data);
        } catch (error) {
            console.log("Not logged in or token expired");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    fetchUserProfile();
}, []);


  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
