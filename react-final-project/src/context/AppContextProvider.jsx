import React, {useReducer, createContext, useContext, useEffect} from 'react'
import { initialState, reducer } from './reducer'
import { tokenIsValid } from '../utils/jwt'
import {authAction} from "./actionsCreator" 

const context = createContext()
const AppContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token && tokenIsValid(token)) {
      dispatch(authAction(token))
   }
  }, [])

  return (
  <context.Provider value={{state, dispatch}}>
    {children}
  </context.Provider>)
}

export const useAppContext = () => {
  const appContext = useContext(context)
  if (appContext) {
    return appContext
  }
  throw new Error("App contest ist not working")
}


export default AppContextProvider