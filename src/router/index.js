import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Order from '@/components/Order'
import Help from '@/components/Help'
import ScanQR from '@/components/ScanQR'
import Ticket from '@/components/Ticket'
import TicketErr from '@/components/TicketErr'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '即开票'
      }
    },{
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        title: '即开票购买'
      }
    },{
      path: '/scan',
      name: 'ScanQR',
      component: ScanQR,
      meta: {
        title: '扫码'
      }
    },{
      path: '/ticket',
      name: 'Ticket',
      component: Ticket,
      meta: {
        title: '即开票购买'
      }
    },{
      path: '/ticketerr',
      name: 'TicketErr',
      component: TicketErr,
      meta: {
        title: '即开票购买'
      }
    },{
      path: '/help',
      name: 'Help',
      component: Help,
      meta: {
        title: '帮助'
      }
    }
  ]
})
