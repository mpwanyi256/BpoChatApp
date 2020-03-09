import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import ChatsHomePage from '../views/Account/UserHomePage.vue'
import Messages from '../views/Chat/Messages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Account',
    name: 'Account',
    component: Messages
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
