import React, { useState, useEffect } from 'react'
import { Spinner, Layout } from '@ui-kitten/components'
import FirebaseChat from '../../FirebaseChat'
import axios from '../../utils/http'
import { SafeAreaView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import AuthContext from '../../providers/AuthProvider/contexts/AuthContext.js'

const ChatScreen = ({ chatId = 'SdRUNtbqo5vXv3Tr0FWj' }) => {
  const { userData } = React.useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState(null)

  const user = {
    ...userData,
    _id: userData.id
  }

  useEffect(() => {
    const chatLogin = async () => {
      try {
        const response = await axios.get('/firebase')

        await FirebaseChat.setToken(response.data.firebaseToken)
        await FirebaseChat.updateProfile(userData)
      } catch (e) {
        console.log(e)
      }
    }

    chatLogin()

    const unsubscribe = FirebaseChat.setMessagesListener(chatId, (messages) => {
      if (isLoading) setIsLoading(false)
      setMessages(messages)
    })

    return () => unsubscribe()
  }, [])

  const addMessage = (message) => FirebaseChat.addMessage(chatId, message)

  if (isLoading) {
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size={'giant'} />
      </Layout>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GiftedChat alwaysShowSend inverted={false} messages={messages} onSend={addMessage} user={user} />
    </SafeAreaView>
  )
}

export default ChatScreen
