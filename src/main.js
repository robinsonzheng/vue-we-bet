import Vue from "vue";
import App from "./App";
import router from "./router";
import YDUI from "vue-ydui"; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import "vue-ydui/dist/ydui.rem.css"; /* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
// import "vue-ydui/dist/ydui.px.css";
import "vue-ydui/dist/ydui.base.css";
// import MintUI from "mint-ui";
// import "mint-ui/lib/style.css";
import {
  Confirm,
  Alert,
  Toast,
  Notify,
  Loading
} from "vue-ydui/dist/lib.rem/dialog";
// import VueClipboard from "vue-clipboard2";
import axios from "axios";
import Vuex from "vuex";
// import "assets/unlock.png"
// import "assets/copy.png"
// import "assets/star.png"
// import "assets/location.png"
// import "assets/stock.png"
import api from "./http/index";
import wx from "weixin-js-sdk";
// import VueCookies  from "vue-cookies";

Vue.config.productionTip = false;

Vue.use(YDUI);
Vue.use(Vuex);
Vue.use(api);
// Vue.use(VueCookies);

// Vue.use(MintUI);
// Vue.use(VueClipboard);

Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading,
  showOkToast(mes, timeout) {
    this.toast({
      mes: mes,
      icon: "success",
      timeout: timeout || 2000
    });
  },
  showErrToast(mes, timeout) {
    this.toast({
      mes: mes,
      icon: "error",
      timeout: timeout || 2000
    });
  }
};

const util = {
  getParamVal(keyValues, key) {
    var start = keyValues.indexOf("?");
    if (start != -1) {
      keyValues = keyValues.substring(start + 1);
    }
    var arrPara = keyValues.split("&");
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");
      if (arr != null && arr[0] == key) {
        return arr[1];
      }
    }
    return "";
  }
};

const VueCookies = require("vue-cookies");
Vue.prototype.$cookie = VueCookies;

// axios.defaults.baseURL = process.env.SERVER_HOST;
axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.prototype.$ajax = axios;
console.log("baseURL:" + axios.defaults.baseURL);

// //用于微信api请求的axios实例
// var wxaxios = axios.create({
//   baseURL: process.env.WX_SERVER
// });
// Vue.prototype.$wxajax = wxaxios;

// Vue.prototype.$VueClipboard = VueClipboard

const store = new Vuex.Store({
  state: {
    managerId: "", //管理员ID
    managerToken: "", //管理员token
    apiToken: "", //API调用的token
    terminalNo: "", //设备编号,
    serialCode: "", //设备码
    ticketInfo: {}, //票种信息
    orderNo: "" //订单号
  },
  mutations: {
    updateSerialCode(state, serialCode) {
      state.serialCode = serialCode;
    },
    updateManagerToken(state, managerToken) {
      state.managerToken = managerToken;
    },
    updateToken(state, apiToken) {
      state.apiToken = apiToken;
    },
    updateManagerId(state, managerId) {
      state.managerId = managerId;
    },
    updateTerminalNo(state, terminalNo) {
      state.terminalNo = terminalNo;
    },
    updateTicketInfo(state, ticketInfo) {
      state.ticketInfo = ticketInfo;
    },
    updateOrderNo(state, orderNo) {
      state.orderNo = orderNo;
    }
  }
});

var store2 = store;
var util2 = util;
Vue.prototype.$util = util;
Vue.prototype.$wx = wx;

router.beforeEach((to, from, next) => {
  //判断是否已经获取用户的openid
  // debugger;

  if (location.href.indexOf("localhost") >= 0) {
    // 开发环境
    VueCookies.set("openId", "o3gJ71TPzO7fbpRwhzoWYuLJIQYw");
  }

  var openId = VueCookies.get("openId");

  if (!openId) {
    var url = location.href;
    // var code = util2.getParamVal(location.search, "code");
    // var home = location.href.split("#")[0];
    console.log("beforeEach::beforeLoginUrl", url);
    if (to.path === "/") {
      //除了首页，其他的页面都需要获取openid
      // debugger;
    } else {
      // store2.commit("updateBeforeLoginUrl", url); //保存用户希望进入的URL
      VueCookies.set("beforeLoginUrl", url);
      // debugger;
      // window.location.href = home;
      next("/", true);
      return;
    }
  }

  //校验serialCode设备码
  //没有serialCode，说明不是从扫码页面进入
  if (store2.state.serialCode || to.path === "/order") {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
