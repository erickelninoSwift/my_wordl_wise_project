import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Erick",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  userError: "",
};

const reducer = (initialState, action) => {
  if (action.type === "login") {
    return { ...initialState, user: action.payload, isAuthenticated: true };
  }

  if (action.type === "logout") {
    return { ...initialState, user: null, isAuthenticated: false };
  }
  if (action.type === "error") {
    return {
      ...initialState,
      user: null,
      isAuthenticated: false,
      userError: action.payload,
    };
  }
};

const AuthContextProvider = ({ children }) => {
  const [{ user, isAuthenticated, userError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const loginUser = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({ type: "error", payload: "username or password not valid" });
    }
  };

  const logOut = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loginUser, logOut, userError, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("was used outside of the Context Scope");
  return context;
};

export { AuthContextProvider, useAuth };
