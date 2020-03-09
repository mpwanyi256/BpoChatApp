import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ChatRoom: null,
    ChatImageRef: require('@/assets/chat.png'),
    userProfiles: [
      { Id: 1, Name: 'Mpwanyi Samuel', Gender: 'M', Public: false, Status: true },
      { Id: 2, Name: 'Nanyonga Angella', Gender: 'F', Public: true, Status: true },
      { Id: 3, Name: 'Nanyonjo Catherine', Gender: 'F', Public: false, Status: false },
      { Id: 4, Name: 'Semakula Allan', Gender: 'M', Public: false, Status: true }
    ],
    LoggedProfile: { Id: 1, Name: 'Mpwanyi Samuel', Gender: 'M', Public: false, Status: true },
    chatsCreated: [
      { ChatId: 1, Type: 1, Name: 'Kampala Developers', CreatedBy: 1 },
      { ChatId: 2, Type: 1, Name: 'Kenya Dwags', CreatedBy: 1 },
      { ChatId: 3, Type: 2, Name: 'The lil Weezy', CreatedBy: 4 }
    ],
    ChatUsers: [
      { ChatId: 1, User: 1, Status: 0 },
      { ChatId: 1, User: 2, Status: 0 },
      { ChatId: 3, User: 1, Status: 0 }
    ],
    Messages: [
      { Id: 1, ChatId: 1, Message: 'Hi Bro, I Hope You Are Well', Date: '2020-03-04 21:04', Time: '21:04', UserId: 1 },
      { Id: 2, ChatId: 1, Message: 'Am Great Man sap there!!', Date: '2020-03-04 21:04', Time: '21:05', UserId: 2 }
    ],
    MessagesLoaded: []
  },
  mutations: {
    setProfile (state, payload) {
      state.LoggedProfile = payload
    },
    loadMessages (state, payload) {
      state.MessagesLoaded = payload
    }
  },
  actions: {
    sendNewMessage ({ state, commit }, payload) {
      var messagesLength = state.Messages.length + 1
      var dateToday = moment().format('YYYY-MM-DD hh:mm Africa/Kampala')
      var timeNow = moment().format('LT')
      var newMessage = {
        Id: messagesLength,
        ChatId: payload.ChatId,
        Date: dateToday,
        Time: timeNow,
        UserId: payload.UserId,
        Message: payload.Message
      }
      state.Messages.push(newMessage)
      // Commit Chat Messages Here
      var ChatRoomId = payload.ChatId
      var AllMessages = state.Messages
      var mMessages = []
      AllMessages.forEach((Message) => {
        if (Message.ChatId === ChatRoomId) {
          mMessages.push(Message)
        }
      })
      commit('loadMessages', mMessages)
      console.log(newMessage)
    },
    loginUser ({ state, commit }, payload) {
      var profile = state.userProfiles[0]
      commit('setProfile', profile)
      if (payload.username.length > 0) {
        router.push({ name: 'Account' })
      }
    },
    Logout () {
      router.push({ name: 'Home' })
    },
    createChatRoom ({ state }, payload) {
      var newChatId = state.chatsCreated.length + 1
      var userId = state.LoggedProfile.Id
      state.chatsCreated.push({
        ChatId: newChatId,
        Type: 2,
        Name: payload.Name,
        CreatedBy: userId
      })
      state.ChatUsers.push({
        ChatId: newChatId,
        User: userId,
        Status: 0
      })
    },
    getMessages ({ state, commit }, payload) {
      var ChatRoomId = payload.Chat
      var AllMessages = state.Messages
      var mMessages = []
      AllMessages.forEach((Message) => {
        if (Message.ChatId === ChatRoomId) {
          mMessages.push(Message)
        }
      })
      commit('loadMessages', mMessages)
    },
    sendMessage ({ state }, payload) {
      state.Messages.push(payload)
    }
  },
  modules: {
  },
  getters: {
    ChatIcon (state) {
      return state.ChatImageRef
    },
    PublicProfiles (state) {
      return state.userProfiles
    },
    getChatRooms (state) {
      var allChats = state.ChatUsers
      var profile = state.LoggedProfile
      var userChats = []
      if (profile != null) {
        allChats.forEach((Chat) => {
          if (Chat.User === profile.Id) {
            if (Chat.Status === 0) {
              userChats.push({
                ChatId: Chat.ChatId,
                Status: 'Private',
                RoomName: state.chatsCreated.find((Room) => { return Room.ChatId === Chat.ChatId }).Name
              })
            } else {
              userChats.push({
                ChatId: Chat.ChatId,
                Status: 'Public',
                RoomName: state.chatsCreated.find((Room) => { return Room.ChatId === Chat.ChatId }).Name
              })
            }
          }
        })
      }
      return userChats.sort((a, b) => {
        return a.ChatId < b.ChatId
      })
    },
    getUserProfile (state) {
      return state.LoggedProfile
    },
    getChatRoomName (state) {
      return (ChatRoomId) => {
        return state.chatsCreated.find((Room) => {
          return Room.ChatId === ChatRoomId
        })
      }
    },
    getMessages (state) {
      return state.MessagesLoaded
    }
  }
})
