import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { Alert, AsyncStorage } from 'react-native'
import AppNavigator from './src/navigation/Home.navigator'
import LoginScreen from './src/screens/Login/Login.screen'
import Splash from './src/screens/splash/Splash'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthContext from './src/context/Auth'
import * as AuthSession from "expo-auth-session"

export default () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false
          }
        case 'SIGN_IN':
          return {
            isLoading: false,
            token: action.token
          }
        case 'SIGN_OUT':
          return {
            isLoading: false,
            token: null
          }
      }
    },
    {
      isLoading: true,
      token: null
    }
  )
  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
  
        dispatch({ type: 'SIGN_IN', token })
        
        // TODO add token expiration validator
        // if (exp > currentDate) {
        //   dispatch({ type: 'SIGN_OUT' })
        // } else {
        //   dispatch({ type: 'SIGN_IN', userSettings: JSON.parse(userSettings) })
        // }
      } catch (e) {
        console.log(e)
        dispatch({ type: 'SIGN_OUT' })
      }
    }
    
    bootstrapAsync()
  }, [])
  
  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        try {
        const auth0Domain = 'https://dev-lizyo13l.us.auth0.com'
        const auth0ClientId = 'pNVKPxObaOYK8ENSNeLTNIjnaSNVYzui'
        
        const redirectUrl = AuthSession.getRedirectUrl();
        const params = new URLSearchParams({
          client_id: auth0ClientId,
          response_type: 'token',
          scope: 'openid,profile,email',
          redirect_uri: redirectUrl,
        }).toString();
        
        let authUrl = `${auth0Domain}/authorize?${params}`
        
        console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
        console.log(`AuthURL is:  ${authUrl}`);
  
        const result = await AuthSession.startAsync({
          authUrl: authUrl
        });
        
        console.log(result)
        
        if (result.type === 'success') {
          console.log('entraaaa', result)
          let token = result.params.access_token;
          await AsyncStorage.setItem('token', token)
          dispatch({ type: 'SIGN_IN', token })
        }
       
        
        } catch (e) {
          
          Alert.alert('A problem occurred', [{ text: 'OK' }], {
            cancelable: false
          })
        }
      },
      signOut: async () => {
        // TODO hit auth0 logout url
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
    <AuthContext.Provider value={authContext}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{ flex: 1 }}>{renderScreen()}</SafeAreaView>
      </ApplicationProvider>
    </AuthContext.Provider>
  )
}
