import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
/*import 'vue-ydui/dist/ydui.rem.css'; /* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
import 'vue-ydui/dist/ydui.px.css'

Vue.config.productionTip = false

Vue.use(YDUI);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
