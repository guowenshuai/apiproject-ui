import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Websocket from './views/WebSocket.vue'
import JobTable from './views/JobTable.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: Websocket
    },
    {
      path: '/job',
      name: 'job',
      component: JobTable
    }
  ]
})
