// import React, { useReducer } from "react";

// export const APIbackend = React.createContext();

// export const APIbackendProvider = ({ children }) => {
//   const initialState = {
//     basePointUrl: "http://192.168.2.87:9411/",
//   };

//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "create":
//         return {
//           basePointUrl: "http://192.168.2.87:9411/",
//         };
//       default:
//         return state;
//     }
//   };

//   //master module
//   const [APIbackendURl, dispatchAPIbackendUrl] = useReducer(
//     reducer,
//     initialState
//   );

//   const state = { APIbackendURl, dispatchAPIbackendUrl };
//   return <APIbackend.Provider value={state}>{children}</APIbackend.Provider>;
// };
//
import React, { useReducer } from "react";

export const APIbackend = React.createContext();

export const APIbackendProvider = ({ children }) => {
  const initialState = {
    basePointUrl: "http://192.168.2.87:9411/",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return {
          ...state,
          basePointUrl: action.payload,
        };
      default:
        return state;
    }
  };

  // Master module
  const [APIbackendURl, dispatchAPIbackendUrl] = useReducer(
    reducer,
    initialState
  );

  const state = { APIbackendURl, dispatchAPIbackendUrl };
  return <APIbackend.Provider value={state}>{children}</APIbackend.Provider>;
};
