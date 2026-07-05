import appActions from "./actions"
import {jwtDecode} from "jwt-decode"
import { toggleLocalStorage } from "../utils/jwt"

export const initialState = {
  user: null,
  userIsLoggedIn: false,
}

export const reducer = (state, actions) => {
  const {type, payload} = actions;

  switch (type) {
    case appActions.LogIn:
      const {token} = payload
      const decoded = jwtDecode(token)
      toggleLocalStorage(token)

      return {...state, user: decoded, userIsLoggedIn: true}

      case appActions.Auth:
        const user = jwtDecode(payload)
        return {...state, user, userIsLoggedIn: true }

      case appActions.LogOut:
        toggleLocalStorage(null)
        return { ...state, user:null, userIsLoggedIn: false}
        
    default:
      return state
  }
}