import React from 'react'
import { Layout, Button } from '@ui-kitten/components'
import AuthContext from "../../context/Auth"

const Auth0LoginContainer = () => {
  const { signIn } = React.useContext(AuthContext)
  
    return (
     
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40}}>
        <Button onPress={signIn}>Login</Button>
      </Layout>
      
    );
}

export default Auth0LoginContainer
