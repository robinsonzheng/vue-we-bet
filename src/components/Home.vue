<template>
	<div>
      <yd-button-group>                     
        <yd-button size="large" type="danger" @click.native="scanClick">扫码</yd-button>
        <yd-button size="large" type="primary" @click.native="helpClick">帮助</yd-button>
        <!-- <yd-button size="large" type="hollow" @click.native="payClick">支付测试</yd-button> -->
      </yd-button-group>
	</div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      wxJSBridgeReady: false
    };
  },
  created() {
    console.log("home page created");    
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      // 跳转到微信授权页面
      var redirect_uri = location.href.split("#")[0];
      // redirect_uri = redirect_uri.replace(
      //   "localhost:8080",
      //   "dev.joylott.net/jkp/gw"
      // );
      redirect_uri = encodeURIComponent(redirect_uri);
      // 获取openid
      var url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1578db3d1b70d661&redirect_uri=" +
        redirect_uri +
        "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";

      var openId = this.$cookie.get("openId");
      if (!openId) {
        //检查是否有code参数，如果有，是微信重定向过来的，获取code并向后端请求openId
        console.log(window.location.search);
        var code = this.$util.getParamVal(window.location.search, "code") || "";
        console.log("code:" + code);
        if (!code) {
          //第一次需要重定向到微信的链接
          console.log("重定向到微信授权URL" + url);

          //微信回调
          window.location.href = url;

          // // debugger;
          // setTimeout(() => {
          //   var virUrl = decodeURIComponent(redirect_uri);
          //   if (virUrl.endsWith("/")) {
          //     virUrl = virUrl.substring(0, virUrl.length - 1);
          //   }
          //   virUrl =
          //     virUrl +
          //     (redirect_uri.indexOf("?") >= 0 ? "&" : "?") +
          //     "code=1234567";
          //   debugger;
          //   window.location.href = virUrl;
          // }, 1500);
        } else {
          console.log("从微信取到code，请求后台API");
          var self = this;
          self.$ajax
            .post("/getOpenId?code=" + code, {
              code: code
            })
            .then(function(res) {
              if (res.status === 200) {
                console.log("请求成功");
                // alert(res);
                console.log(res);
                self.$cookie.set("openId", res.data.openId);
                //跳转到原始URL
                let beforeLoginUrl = self.$cookie.get("beforeLoginUrl");
                console.log("beforeLoginUrl", beforeLoginUrl);
                if (beforeLoginUrl) {
                  self.$cookie.set("beforeLoginUrl", "");
                  window.location.href = beforeLoginUrl;
                }
              } else {
                console.log("请求失败");
                alert(res);
              }
            })
            .catch(function(err) {
              console.log("请求失败");
              alert(err);
            });

          // setTimeout(() => {
          //   self.$cookie.set("openId", "TestOpenId");
          //   //跳转到原始URL
          //   let beforeLoginUrl = self.$cookie.get("beforeLoginUrl");
          //   console.log("beforeLoginUrl", beforeLoginUrl);
          //   self.$cookie.set("beforeLoginUrl", "");
          //   debugger;
          //   if (beforeLoginUrl) {
          //     window.location.href = beforeLoginUrl;
          //   }
          // }, 1000);
        }
      } else {
        console.log("openId:" + openId);
        debugger;
      }
    }
  },
  methods: {
    scanClick() {
      this.$router.replace("/scan");
    },
    helpClick() {
      this.$router.replace("/help");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
