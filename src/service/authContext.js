import React, { useReducer } from 'react';
import { initialState, AuthReducer } from './authReducer';
 
const AuthStateContext = React.createContext(); //This context object will contain the authentication token and user details.
const AuthDispatchContext = React.createContext(); //We will use this context object to pass the dispatch method for UserReducer

// Function to read value from User context
export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
 
  return context;
}
 
// Function to read value from Dispatch context
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
 
  return context;
}

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
    return (
        <AuthStateContext.Provider value={user}>
          <AuthDispatchContext.Provider value={dispatch}>
              {children}
          </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};