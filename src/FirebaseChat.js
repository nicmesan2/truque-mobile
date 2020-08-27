import * as firebase from 'firebase'
import 'firebase/firestore'

class FirebaseChat {
  constructor() {
    this.init()
  }

  get db() {
    return firebase.firestore()
  }

  off() {
    this.db.off()
  }

  parse = (message) => {
    const { user, content, createdAt, _id } = message
    const timeStamp = new Date(createdAt.seconds * 1000)

    return {
      _id,
      createdAt: timeStamp,
      text: content,
      user
    }
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyB8wH1j8tJvQ45CWHP0M6o0CQKL1cXy8Rs',
        authDomain: 'trueque-285816.firebaseapp.com',
        databaseURL: 'https://trueque-285816.firebaseio.com',
        projectId: 'trueque-285816',
        storageBucket: 'trueque-285816.appspot.com',
        messagingSenderId: '756693770584',
        appId: '1:756693770584:web:6317ecaf246335cc06c52d',
        measurementId: 'G-Q9B41BT5BT'
      })
    }
  }

  async updateProfile(profile) {
    if (!firebase.auth().currentUser) return
    await firebase.auth().currentUser.updateProfile({
      displayName: profile.name,
      photoURL: profile.picture
    })
  }

  setAuthStateListener(listener) {
    firebase.auth().onAuthStateChanged(listener)
  }

  setMessagesListener = (chatId, callback) =>
    this.db
      .collection('chats')
      .doc(chatId)
      .onSnapshot((doc) => {
        const parsedMessages = doc.data().messages.map(this.parse)

        callback(parsedMessages)
      })

  async setToken(token) {
    await firebase.auth().signInWithCustomToken(token)
  }

  async signOut() {
    await firebase.auth().signOut()
  }

  addMessage = async (chatId, message) => {
    const createdAt = new Date()
    console.log(message)
    return await this.db
      .collection('chats')
      .doc(chatId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          _id: message[0]._id,
          user: message[0].user,
          createdAt,
          content: message[0].text
        })
      })
  }
}

export default new FirebaseChat()
