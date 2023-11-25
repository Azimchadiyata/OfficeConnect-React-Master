import React, { createContext, useEffect, useReducer } from 'react';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN':
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const AuthContext = createContext({
  ...initialState,
  method: 'SessionStorage',
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setToken = (token) => {
    sessionStorage.setItem('token', token);
  };

  const removeToken = () => {
    sessionStorage.removeItem('token');
  };

  const login = async (token) => {
    setToken(token);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: null, // You can set user data if needed
      },
    });
  };

  const register = async (token) => {
    setToken(token);

    dispatch({
      type: 'REGISTER',
      payload: {
        user: null, // You can set user data if needed
      },
    });
  };

  const logout = () => {
    removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
      dispatch({
        type: 'INIT',
        payload: {
          isAuthenticated: true,
          user: null, // You can set user data if needed
        },
      });
    } else {
      dispatch({
        type: 'INIT',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  if (!state.isInitialised) {
    return null; // You can return a loading component here if needed
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'SessionStorage',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;