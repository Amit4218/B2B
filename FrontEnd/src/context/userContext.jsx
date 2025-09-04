import React from "react";
import { createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  // Get the logged-in user from local storage

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update local storage whenever the user state changes
  React.useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
