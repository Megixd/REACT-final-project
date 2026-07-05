import appActions from "./actions"

const loginActions = (payload) => {
  return {type: appActions.LogIn, payload }
}

const authAction = (payload) => {
  return {type: appActions.Auth, payload}
}

const logoutAction = () => {
  return {type: appActions.LogOut}
}


export {loginActions, authAction, logoutAction}