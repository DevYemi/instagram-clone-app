import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext(); // recat context API

export const StateProvider = ({ reducer, initialState, children }) => ( // provides state to all the App component children
    <StateContext.Provider value={useReducer(reducer, initialState)}> 
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext); // extract state value from context API (which is array of initialState and dispatch function)

// useReducer function it returns an array of initialState and dispatch which can be used to change initialState value
