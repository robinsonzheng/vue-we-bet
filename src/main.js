import Vue from "vue";
import App from "./App";
import router from "./router";
import YDUI from "vue-ydui"; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import "vue-ydui/dist/ydui.rem.css"; /* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
// import "vue-ydui/dist/ydui.px.css";
import "vue-ydui/dist/ydui.base.css";
import { Picker } from "mint-ui";
// import "mint-ui/lib/style.css";
import {
  Confirm,
  Alert,
  Toast,
  Notify,
  Loading
} from "vue-ydui/dist/lib.rem/dialog";
import VueClipboard from "vue-clipboard2";
import axios from "axios";
import Vuex from "vuex";
// import "assets/unlock.png"
// import "assets/copy.png"
// import "assets/star.png"
// import "assets/location.png"
// import "assets/stock.png"
// import api from "./http/index";
import wx from "weixin-js-sdk";
// import VueCookies  from "vue-cookies";

Vue.config.productionTip = false;

Vue.use(YDUI);
Vue.use(Vuex);
// Vue.use(api);
// Vue.use(VueCookies);
Vue.component(Picker.name, Picker);
// Vue.use(MintUI);
Vue.use(VueClipboard);

Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading,
  showOkToast(mes, timeout, callback) {
    this.toast({
      mes: mes,
      icon: "success",
      timeout: timeout || 1000
    });
    setTimeout(() => {
      callback && callback();
    }, timeout || 1000);
  },
  showErrToast(mes, timeout) {
    this.toast({
      mes: mes,
      icon: "error",
      timeout: timeout || 1000
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
  },
  formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return (
      year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
    );
  },
  isEmptyString(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  },
  isIos: function() {
    var agent = navigator.userAgent;
    var isiOS = !!agent.match(/iPhone|mac|iPod|iPad|ios/i);
    return isiOS;
  },
  redirectToWxHome() {
    //进入微信公众号
    window.location.href =
      "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MTYwODY3MA==#wechat_redirect";
  }
};

const VueCookies = require("vue-cookies");
Vue.prototype.$cookie = VueCookies;

// axios.defaults.baseURL = process.env.SERVER_HOST;
axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.prototype.$ajax = axios;
console.log("baseURL:" + axios.defaults.baseURL);

// Vue.prototype.$VueClipboard = VueClipboard

const store = new Vuex.Store({
  state: {
    managerId: "", //管理员ID
    managerToken: "", //管理员token
    managerUserName: "", //管理员用户名
    apiToken: "", //API调用的token
    terminalNo: "", //设备编号,
    serialCode: "", //设备码
    ticketInfo: {}, //票种信息
    orderNo: "", //订单号
    waitingTag: false
  },
  mutations: {
    updateSerialCode(state, serialCode) {
      state.serialCode = serialCode;
    },
    updateManagerToken(state, managerToken) {
      state.managerToken = managerToken;
    },
    updateManagerUserName(state, userName) {
      state.managerUserName = userName;
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
    },
    updateWaitingTag(state, tag) {
      state.waitingTag = tag;
    }
  }
});

Vue.prototype.$util = util;
Vue.prototype.$wx = wx;

async function refreshDeviceToken(serialCode) {
  store.commit("updateWaitingTag", true);
  console.log("refreshDeviceToken begin");
  //请求
  await axios
    .post(process.env.SERVER_HOST, {
      apiCode: 110301,
      content: {
        serialCode: serialCode
      }
    })
    .then(res => {
      if (res.data.resCode == 0) {
        console.log("refreshDeviceToken ok");
        //成功
        store.commit("updateManagerId", res.data.content.managerId);
        store.commit("updateTerminalNo", res.data.terminalNo);
        store.commit("updateToken", res.data.token);
        // store.commit("updateWaitingTag", false);
        return true;
      } else {
        //失败
        console.log("refreshDeviceToken failed:", res);
        alert("设备异常~");
        // store.commit("updateWaitingTag", false);
        return false;
      }
    })
    .catch(err => {
      //异常
      console.log(err);
      alert("出错了,请检查网络~");
      // store.commit("updateWaitingTag", false);
      return false;
    });
}

router.beforeEach((to, from, next) => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) != "micromessenger") {
    if (location.href.indexOf("localhost") < 0) {
      Alert({ mes: "请在手机微信客户端打开" });
      return;
    }
  }

  //判断是否已经获取用户的openid
  if (location.href.indexOf("localhost") >= 0) {
    // 开发环境
    VueCookies.set("openId", "o3gJ71TPzO7fbpRwhzoWYuLJIQYw");
    // VueCookies.set("openId", "");

    //TODO:删除TOKEN调试代码
    // store.commit("updateToken", "c33367701511b4f6020ec61ded352059");
    // store.commit("updateManagerId", "4");
    // store.commit("updateManagerToken", "7e92cdace0c348e39f7d2e569be46b07");
    // store.commit("updateManagerUserName", "18603017085");
  }

  //A02183000001

  // VueCookies.set("openId", "");

  var openId = VueCookies.get("openId");

  if (!openId) {
    var url = location.href;
    console.log("beforeEach::beforeLoginUrl", url);
    if (to.path == "/") {
      //除了首页，其他的页面都需要获取openid
      console.log("授权页面");
    } else {
      // store2.commit("updateBeforeLoginUrl", url); //保存用户希望进入的URL
      VueCookies.set("beforeLoginUrl", url);
      next("/", true);
      return;
    }
  }

  //校验serialCode设备码
  //没有serialCode，说明不是从扫码页面进入
  var serialCode = util.getParamVal(window.location.search, "serialCode");
  // console.log("serialCode", serialCode);
  if (serialCode) {
    store.commit("updateSerialCode", serialCode);
  }

  //检查api token
  if (!store.state.apiToken && serialCode) {
    refreshDeviceToken(serialCode).then(v => {
      console.log("then...");
      if (!store.state.apiToken) {
        console.log("设备异常");
        return;
      }
    });
  }

  //拦截需要管理员登录的路由
  console.log("store.state.managerToken=", store.state.managerToken);
  if (to.meta.requireLogin && !store.state.managerToken) {
    router.replace({
      name: "Login",
      params: { redirect_path: to.fullPath }
    });
    return;
  }

  //避免返回到登录页面
  if (to.fullPath == "/login" && store.state.managerToken) {
    router.go(-1);
    return;
  }

  // debugger;
  if (
    (store.state.serialCode && store.state.serialCode.length > 0) ||
    (to.path == "/order" ||
      to.path == "/scan" ||
      to.path == "/help" ||
      to.path == "/duijiang" ||
      to.path == "/sdduijiang" ||
      to.path == "/bonus" ||
      to.path == "/")
  ) {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  } else {
    console.log("设备码缺失,无法打开页面");
    // debugger;
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
