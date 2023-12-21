import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  // Add more properties as needed
}

interface UserContextProps {
  loggedInUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const login = (user: User) => {
    setLoggedInUser(user);
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  const contextValue: UserContextProps = {
    loggedInUser,
    login,
    logout,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
