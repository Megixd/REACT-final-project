import { jwtDecode } from "jwt-decode"

function toggleLocalStorage (token) {
  if (token) {
    localStorage.setItem("token", token) 
  } else {
    localStorage.removeItem("token")
  }
}

function tokenIsValid(token) {
  const decodedToken = jwtDecode(token)
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime
}

export {toggleLocalStorage, tokenIsValid}