import React from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { Alert, AsyncStorage } from 'react-native'
import AppNavigator from './src/navigation/App.navigator'
import LoginScreen from './src/screens/Login/Login.screen'
import Splash from './src/screens/splash/Splash'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthContext from './src/context/Auth'
import * as AuthSession from "expo-auth-session"
import { getAuthUrl, getLogoutUrl } from './src/auth'

const url = 'http://f59dc73d87c1.ngrok.io';

export default () => {
  const [state, dispatch] = React.useReducer(
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
  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        
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
  
        const { data: userData } = await axios.get(`${url}/user/${userId}`, { headers })
        
        dispatch({ type: 'RESTORE_TOKEN', token, userData })
        
      } catch (e) {
        console.log(e)
        Alert.alert('A problem occurred', e.message, [{ text: 'OK' }], { cancelable: false })
        dispatch({ type: 'SIGN_OUT' })
      }
    }
    
    bootstrapAsync()
  }, [])
  
  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
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
          
          const { data: userData } = await axios.post(`${url}/user`, {
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
      signOut: async () => {
        await AuthSession.startAsync({
          authUrl: getLogoutUrl()
        });
        
        await AsyncStorage.removeItem('token')
        
        dispatch({ type: 'SIGN_OUT' })
      }
    }),
    []
  )
  
  const renderScreen = () => {
    if (state.isLoading) {
      return <Splash />
    } else if (!state.token) {
      return <LoginScreen />
    }
    
    return <AppNavigator />
  }
  
  return (
    <AuthContext.Provider value={{...authContext, userData: state.userData }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{ flex: 1 }}>{renderScreen()}</SafeAreaView>
      </ApplicationProvider>
    </AuthContext.Provider>
  )
}
