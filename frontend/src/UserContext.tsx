import React, { createContext, useState, ReactNode } from "react";

// Define the user interface
interface User {
  firstName?: string;
  lastName?: string;
  userId?: string | number; // Change to number if the userId is a number
  userName?: string;
}

// Define the type for the context value
type UserContextType = [User, React.Dispatch<React.SetStateAction<User>>];

// Create the context with a default value
export const UserContext = createContext<UserContextType>([{}, () => {}]);

// Define the props for UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User>({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {children}
    </UserContext.Provider>
  );
};
