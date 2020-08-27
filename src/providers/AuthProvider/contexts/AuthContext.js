import { createContext } from 'react';

export default createContext({
  userData: {},
  initApp: () => { console.log('asdasd')},
  signIn: () => {},
  signOut: () => {},
})
