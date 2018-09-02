import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Order from '@/components/Order'
import Help from '@/components/Help'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: '即开票'
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        title: '即开票购买'
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      meta: {
        title: '帮助'
      }
    }
  ]
})
