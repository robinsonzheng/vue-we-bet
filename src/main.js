import Vue from "vue";
import App from "./App";
import router from "./router";
import YDUI from "vue-ydui"; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
/*import 'vue-ydui/dist/ydui.rem.css'; /* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
import "vue-ydui/dist/ydui.px.css";
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

Vue.config.productionTip = false;

Vue.use(YDUI);
Vue.use(Vuex);
// Vue.use(MintUI);
// Vue.use(VueClipboard);

Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading
};

axios.defaults.baseURL = process.env.SERVER_HOST;
axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.prototype.$ajax = axios;
console.log("baseURL:" + axios.defaults.baseURL);

//用于微信api请求的axios实例
var wxaxios = axios.create({
  baseURL: process.env.WX_SERVER
});
Vue.prototype.$wxajax = wxaxios;

// Vue.prototype.$VueClipboard = VueClipboard

const store = new Vuex.Store({
  state: {
    openId: "",
    isAdminBinded: false
  },
  mutations: {
    updateOpenId(state, openId) {
      state.openId = openId;
    },
    updateAdminBindStatus(state, isBinded) {
      state.isAdminBinded = isBinded;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});
