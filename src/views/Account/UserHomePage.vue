<template>
  <v-card max-width="auto" class="mx-auto mainCard" flat tile>
    <v-app-bar dark color="blue darken-4">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Connect</v-toolbar-title>

      <v-spacer></v-spacer>
       <v-badge
        bordered
        color="blue"
        content="6"
        overlap
        class="mr-3 mt-2"
      >
        <v-btn icon color="white">
          <v-icon>mdi-chat</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col col-xs="12" col-sm="12" col-md="12" col-lg="12" col-xl="12" class="Chats">
            <v-row v-for="item in items" :key="item.title" class="chatItem">
                <v-col cols="1" xs="1">
                    <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>
                </v-col>
                <v-col cols="10" xs="10" class="chatHeadBrief">
                    <p class="chatHeader chatUserName font-regular text-truncate">
                        {{ item.title }}<span class="float-right">21:00</span>
                    </p>
                    <p class="chatMessage chatUserName font-weight-light text-truncate" v-html="item.subtitle"></p>
                </v-col>
            </v-row>

        </v-col>
        <!--<v-col col-xs="9" col-sm="9" col-md="9" col-lg="9" col-xl="9">
            <v-card max-width="auto" class="mx-auto mainCard messageViewHeader" flat tile>
                <v-card-text class="messagesViewPane">
                    <h1>Welcome {{Message}}</h1>
                </v-card-text>
                <v-card-actions class="messageViewHeader-content sendMessageView">
                    <v-container>
                        <v-row>
                            <v-col col-sm="6" col-md="6" col-lg="6" col-xl="6">
                                <v-text-field type="text" aria-autocomplete="off"  class="mt-2" label="Message..." outlined dense v-model="Message"></v-text-field>
                            </v-col>
                            <v-col col-sm="2" col-md="2" col-lg="2" col-xl="2">
                                <v-btn icon color="pink" v-if="Message.length > 0">
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-col>-->
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      userName: 'Mpwanyi Samuel Chats',
      Message: ''
    }
  },
  computed: {
    userChatRooms () {
      return this.$store.getters.getUserProfile
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
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        bottom: 0;
        width: 100%;
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
</style>
