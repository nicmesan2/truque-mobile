import React, { memo, useCallback, useMemo, useReducer, useEffect } from 'react'
import axios from "axios"
import jwtDecode from 'jwt-decode'
import AuthContext from './contexts/AuthContext'
import * as AuthSession from "expo-auth-session"
import {getAuthUrl, getLogoutUrl} from "../../auth"
import {Alert, AsyncStorage} from "react-native"
import ENV from "../../../env"
import Splash from "../../screens/splash/Splash"
import LoginScreen from "../../screens/Login/Login.screen"

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userData: action.userData,
            token: action.token,
            isLoading: false
          }
        case 'SIGN_IN':
          return {
            isLoading: false,
            token: action.token,
            userData: action.userData
          }
        case 'SIGN_OUT':
          return {
            isLoading: false,
            token: null,
            userData: null
          }
      }
    },
    {
      isLoading: true,
      userData: null,
      token: null
    }
  )

  const signIn = useCallback(
    async() => {
    try {
      
      const result = await AuthSession.startAsync({
        authUrl: getAuthUrl()
      });
      
      
      if (result.type === 'success') {
        let token = result.params.access_token;
        
        await AsyncStorage.setItem('token', token)
        
        const decodedJwtIdToken = jwtDecode(result.params.id_token);
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        
        const { data: userData } = await axios.post(`${ENV().apiUrl}/user`, {
          id: decodedJwtIdToken.sub,
          name: decodedJwtIdToken.name,
          picture: decodedJwtIdToken.picture,
          email: decodedJwtIdToken.email
        }, { headers })
        
        dispatch({ type: 'SIGN_IN', token, userData })
      }
      
      
    } catch (e) {
      console.log('error', e.message)
      Alert.alert('A problem occurred', e.message, [{ text: 'OK' }], { cancelable: false })
    }
  },
    []
  )

  const signOut = useCallback(async () => {
    await AuthSession.startAsync({
      authUrl: getLogoutUrl()
    });
  
    await AsyncStorage.removeItem('token')
  
    dispatch({ type: 'SIGN_OUT' })
  }, [])
  
  const initApp = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      console.log('se llama', token)
    
      if (!token) {
        return dispatch({ type: 'RESTORE_TOKEN'})
      }
    
      const decodedToken = jwtDecode(token)
    
      const secondsSinceEpoch = Math.round(Date.now() / 1000)
    
      if (decodedToken.exp < secondsSinceEpoch) {
        await AsyncStorage.removeItem('token')
        return dispatch({ type: 'SIGN_OUT' })
      }
    
      const userId = decodedToken.sub
    
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    
      const { data: userData } = await axios.get(`${ENV().apiUrl}/user/${userId}`, { headers })
    
      dispatch({ type: 'RESTORE_TOKEN', token, userData })
    
    } catch (e) {
      console.log(e)
      Alert.alert('A problem occurred', e.message, [{ text: 'OK' }], { cancelable: false })
      dispatch({ type: 'SIGN_OUT' })
    }
  }, [])

  const value = useMemo(
    () => ({
      userData: state.userData,
      isInitializing: state.isLoading,
      initApp,
      signIn,
      signOut
    }),
    [state.userData, initApp, signIn, signOut]
  )
  
  useEffect(() => {
    initApp()
  }, [])
  
  const renderChildren = () => {
    if (state.isLoading) {
      return <Splash />
    } else if (!state.token) {
      return <LoginScreen />
    }
    
    return children
  }

  return <AuthContext.Provider value={value}>{renderChildren()}</AuthContext.Provider>
}

export default AuthProvider
