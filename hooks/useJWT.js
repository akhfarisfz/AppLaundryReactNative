// import { STORAGE, TOKEN_KEY, TOKEN_PREFIX } from "../config/settings";

import { TOKEN_KEY, TOKEN_PREFIX, STORAGE } from "../settings"

const useJWT = () => {
  const get = async () => {
    return `${await STORAGE.getItem(TOKEN_KEY)}`
  }

  const set = async (token) => {
    await STORAGE.setItem(TOKEN_KEY, `${TOKEN_PREFIX} ${token}`)
  }

  const signOut = async () => {
    await STORAGE.setItem(TOKEN_KEY, "")
  }

  return {get, set, signOut}
}

export default useJWT;