import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Order from "@/components/Order";
import Help from "@/components/Help";
import ScanQR from "@/components/ScanQR";
import TicketLoading from "@/components/TicketLoading";
import Ticket from "@/components/Ticket";
import TicketErr from "@/components/TicketErr";
import DeviceErr from "@/components/DeviceErr";
import BindIns from "@/components/admin/BindInstruction";
import BindDevice from "@/components/admin/BindDevice";
import FindPwd from "@/components/admin/FindPwd";
import Register from "@/components/admin/Register";
import BindAdmin from "@/components/admin/BindAdmin";
import System from "@/components/admin/System";
import Location from "@/components/admin/Location";
import NewLocation from "@/components/admin/NewLocation";
import ResetPwd from "@/components/admin/ResetPwd";
import Login from "@/components/admin/Login";
import Stock from "@/components/admin/Stock";
import EditStock from "@/components/admin/EditStock";
import DuiJiang from "@/components/DuiJiang";
import SdDuiJiang from "@/components/SdDuiJiang";
import Bonus from "@/components/Bonus";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "即开票"
      }
    },
    {
      path: "/order",
      name: "Order",
      component: Order,
      meta: {
        title: "即开票购买"
      }
    },
    {
      path: "/scan",
      name: "ScanQR",
      component: ScanQR,
      meta: {
        title: "扫码"
      }
    },
    {
      path: "/ticketloading",
      name: "TicketLoading",
      component: TicketLoading,
      meta: {
        title: "即开票购买"
      }
    },
    {
      path: "/ticket",
      name: "Ticket",
      component: Ticket,
      meta: {
        title: "即开票购买"
      }
    },
    {
      path: "/ticketerr",
      name: "TicketErr",
      component: TicketErr,
      meta: {
        title: "即开票购买"
      }
    },
    {
      path: "/deviceerr",
      name: "DeviceErr",
      component: DeviceErr,
      meta: {
        title: "即开票购买"
      }
    },
    {
      path: "/help",
      name: "Help",
      component: Help,
      meta: {
        title: "帮助"
      }
    },
    {
      path: "/bindins",
      name: "BindIns",
      component: BindIns,
      meta: {
        title: "设备绑定说明"
      }
    },
    {
      path: "/bind",
      name: "Bind",
      component: BindDevice,
      meta: {
        title: "设备绑定"
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        title: "注册管理员"
      }
    },
    {
      path: "/bindadmin",
      name: "BindAdmin",
      component: BindAdmin,
      meta: {
        title: "绑定管理员"        
      }
    },
    {
      path: "/resetpwd",
      name: "ResetPwd",
      component: ResetPwd,
      meta: {
        title: "重设密码",
        requireLogin: true
      }
    },
    {
      path: "/findpwd",
      name: "FindPwd",
      component: FindPwd,
      meta: {
        title: "找回密码"
      }
    },

    {
      path: "/system",
      name: "System",
      component: System,
      meta: {
        title: "系统设置",
        requireLogin: true
      }
    },
    {
      path: "/location",
      name: "Location",
      component: Location,
      meta: {
        title: "设备地址",
        requireLogin: true
      }
    },
    {
      path: "/newlocation",
      name: "NewLocation",
      component: NewLocation,
      meta: {
        title: "修改地址",
        requireLogin: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "管理员登录"
      }
    },
    {
      path: "/stock",
      name: "Stock",
      component: Stock,
      meta: {
        title: "库存信息",
        requireLogin: true
      }
    },
    {
      path: "/editstock",
      name: "EditStock",
      component: EditStock,
      meta: {
        title: "编辑库存",
        requireLogin: true
      }
    },
    {
      path: "/duijiang",
      name: "DuiJiang",
      component: DuiJiang,
      meta: {
        title: "即开票兑奖"
      }
    },
    {
      path: "/sdduijiang",
      name: "SdDuiJiang",
      component: SdDuiJiang,
      meta: {
        title: "即开票兑奖"
      }
    },
    {
      path: "/bonus",
      name: "Bonus",
      component: Bonus,
      meta: {
        title: "中奖结果"
      }
    }
  ]
});
