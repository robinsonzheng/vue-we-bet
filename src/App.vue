<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      ready: false
    };
  },
  methods: {},
  created() {
    // debugger;
    // var url = location.href;
    // console.log("App.vue_url", url);
    // var home = url.split("#")[0];
    // var router = url.split("#")[1];
    // var routerPath = "/";
    // console.log("router", router);
    // if(router.indexOf("?") >= 0) {
    //   routerPath = router.split("?")[0];
    // }
    // if(routerPath === "/") {
    //   //除了首页，其他的页面都需要获取openid
    //   return;
    // }

    // //TODO:删除调试代码
    // var openId = this.$util.getParamVal(location.search, "openId");
    // console.log("openId in query string", openId);
    // if (openId) {
    //   console.log("use debug open id");
    //   this.$store.commit("updateOpenId", openId);
    // }

    // if (!this.$store.state.openId) {
    //   //未获取，进行微信静默授权并获取openid
    //   this.$store.commit("updateBeforeLoginUrl", url); //保存用户希望进入的URL
    //   // this.$router.replace("/");
    //   window.location.href = home;
    //   debugger;
    // }
  }
};
</script>

<style>
html {
  font-size: 50px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  background-color: transparent;
  height: 100%;
  font-size: 0.28rem;
  color: #555;
}
.content {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 10px;
}
.content .center-holder {
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex;
  margin-top: 10px;
  padding-top: 0;
}
.content .center-holder .yd-btn {
  width: 50px;
  margin: 10px;
  border-radius: 4px;
}
</style>
