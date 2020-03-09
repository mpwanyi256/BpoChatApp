<template>
        <v-card max-width="auto" class="mx-auto mainCard" flat tile>
            <v-app-bar dark color="blue darken-4">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>Connect</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon color="white" @click.stop="dialog = true">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn icon color="white" class="ml-3" @click="logOut()">
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
            </v-app-bar>
           <v-row>
                <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" class="Chats">
                    <p class="ma-3">{{userChatRooms.length}} Chats</p>
                    <v-row v-for="item in userChatRooms" :key="item.ChatId" class="chatItem" @click="getChatMessages(item)">
                        <v-col cols="12" xs="2" sm="2" md="2" lg="2" xl="2">
                            <v-list-item-avatar>
                                <v-img :src="ChatIcon"></v-img>
                            </v-list-item-avatar>
                        </v-col>
                        <v-col cols="12" xs="3" sm="9" md="9" lg="9" xl="9" class="chatHeadBrief">
                            <p class="chatHeader chatUserName font-regular text-truncate">
                                    {{item.RoomName}}<span class="float-right">21:00</span>
                                </p>
                                <p class="chatMessage chatUserName font-weight-light text-truncate" v-html="item.Status"></p>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" xs="8" sm="8" md="8" lg="8" xl="8" class="chatViewSelectedPane">
                    <v-row class="selectedChatHead">
                        <v-col cols="12" xs="12">
                            <h3>{{ChatSelected.RoomName}}</h3>
                        </v-col>
                    </v-row>
                    <v-row class="MesegesSentViewPane">
                        <v-col cols="12" xs="12">
                            <v-row v-for="Message in mChatMessages" :key="Message.Id">
                                <v-col cols="12" xs="12" v-if="Message.UserId === Profile.Id">
                                    <v-card flat class="mx-auto float-right SenderMessage" max-width="336">
                                        <p class="font-weight-light">{{Message.Message}}</p>
                                        <small class="float-right">{{timeElapsed(Message.Date)}}</small>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" xs="12" v-else-if="Message.UserId != Profile.Id">
                                    <v-card flat class="mx-auto float-left chatPopReply" max-width="336">
                                        <p dark class="font-weight-light">{{Message.Message}}</p>
                                        <small class="float-right">{{timeElapsed(Message.Date)}}</small>
                                    </v-card>
                                </v-col>
                            </v-row>

                        </v-col>
                    </v-row>
                    <v-row class="sendReplyPane">
                        <v-col cols="12" xs="10" sm="10" md="10" lg="10" xl="10">
                            <v-text-field label="Type A Message..." filled v-model="newMessage"></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="1" sm="1" md="1" lg="1" xl="1">
                            <v-btn class="mx-2" fab dark color="indigo" @click="sendMessage()">
                                <v-icon dark>mdi-chat</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Create Chat Room</v-card-title>

                <v-card-text>
                    <v-text-field label="Chatroom Name" aria-autocomplete="off" outlined dense v-model="ChatRoomName" class="mt-4"></v-text-field>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="createChatRoom()">
                    Create Room
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-card>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      userName: 'Mpwanyi Samuel Chats',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Samuel Mpwanyi',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mama Kathy',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Allan Equatorsun',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Bridget',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Carol',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Samuel Mpwanyi2',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mama Kathy2',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Allan Equatorsun2',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Bridget2',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Carol2',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ],
      Message: '',
      dialog: false,
      ChatRoomName: null,
      newMessage: null,
      ChatSelected: { ChatName: '' }
    }
  },
  computed: {
    userChatRooms () {
      return this.$store.getters.getChatRooms
    },
    ChatIcon () {
      return this.$store.getters.ChatIcon
    },
    mChatMessages () {
      return this.$store.getters.getMessages
    },
    Profile () {
      return this.$store.getters.getUserProfile
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('Logout')
    },
    getChatRoomInfo (ChatId) {
      return this.$store.getters.getChatRoomName(ChatId)
    },
    createChatRoom () {
      var chatRoom = {
        Name: this.ChatRoomName
      }
      this.$store.dispatch('createChatRoom', chatRoom)
      this.dialog = false
    },
    getChatMessages (ChatRoom) {
      this.MessagesLoader = null
      this.ChatSelected = ChatRoom
      var ChatSelected = { Chat: ChatRoom.ChatId }
      this.$store.dispatch('getMessages', ChatSelected)
    },
    sendMessage () {
      var message = {
        ChatId: this.ChatSelected.ChatId,
        Message: this.newMessage,
        UserId: this.Profile.Id
      }
      this.$store.dispatch('sendNewMessage', message)
      this.newMessage = ''
    },
    timeElapsed (mDate) {
      return moment(mDate, 'YYYY-MM-DD hh:mm A z').fromNow()
    }
  }
}
</script>
<style scoped>
    .SelectedChat, .ProfileInfo{
        background-color: #ededed;
    }
    .mainCard{
        border: none;
        border-radius: 0px;
    }
    .Chats{
        max-height: 610px;
        overflow-y: scroll;
        overflow-x: hidden;
        bottom: 0;
    }
    .chatItem{
        padding-left: 10px;
    }
    .chatItem:hover{
        background-color: #ededed;
    }
    .chatHeadBrief{
        border-bottom: 1px solid #ededed;
    }
    .messageViewHeader{
        position: relative;
        min-height: 100%;
    }
    .messageViewHeader-content {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: red;
        height: 100px;
    }
    .messagesViewPane{
        height: 350px;
        overflow-y: scroll;
    }
    .selectedChatHead{
        background-color: #ededed;
        color: #2c002c;
        border-bottom: 0.1px solid #ededed;
    }
    .chatViewSelectedPane{
        background-color: #ededed;
    }
    .MesegesSentViewPane{
        min-height: 450px;
        overflow-y: scroll;
        background-color: #e5ddd5;
    }
    .chatPopReply{
        background-color: whitesmoke;
        border: 1px solid black;
        border-bottom-right-radius: 8px;
    }
    .chatPopReply p{
        text-align: left;
        margin: 5px;
        font-size: 14px;
    }
    .SenderMessage{
        background-color: #d8fdd8!important;
        padding: 5px;
        font-size: 14px;
    }
</style>
