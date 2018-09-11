<template>
	<div>
      <yd-button-group>                     
        <yd-button size="large" type="danger" @click.native="scanClick">扫码</yd-button>
        <yd-button size="large" type="primary" @click.native="helpClick">帮助</yd-button>
        <yd-button size="large" type="hollow" @click.native="payClick">支付测试</yd-button>
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

    // // 获取openid
    // var url =
    //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1578db3d1b70d661&redirect_uri=http%3A%2F%2Fdev.joylott.net%2Fjkp%2Fgw%2FgetOpenId&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    // // this.$root.$wxajax
    // //   .get(process.env.WX_API_GET_OPENID)
    // //   .then(function(res) {
    // //     console.log(res);
    // //   })
    // //   .catch(function(err) {
    // //     console.log(err);
    // //   });
    // this.$root.$wxajax
    //   .get(url)
    //   .then(function(res) {
    //     console.log(res);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });

    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener(
          "WeixinJSBridgeReady",
          this.onBridgeReady,
          false
        );
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
        document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady);
      }
    } else {
      this.onBridgeReady();
    }
  },
  mounted() {
    console.log("home page mounted");
    // debugger;
    console.log(this.$api);
  },
  methods: {
    scanClick() {
      this.$router.replace("/scan");
    },
    helpClick() {
      this.$router.replace("/help");
    },
    payClick() {
      if (this.wxJSBridgeReady) {
        console.log("WeixinJSBridge已准备好，正在发起支付");
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: "wx1578db3d1b70d661", //公众号名称，由商户传入
            timeStamp: "1536650319892", //时间戳，自1970年以来的秒数
            nonceStr: "ecba022a54094f55bb09b96ff499ff98", //随机串
            package: "wx1115183841078699f638e3611861205894",
            signType: "HMAC-SHA256", //微信签名方式：
            paySign:
              "2AA49DF904AD4B1ED32EEBD7F2022696646D75DA1AC270B7FB4BFFB6299FB5D8" //微信签名
          },
          function(res) {
            console.log("微信支付返回：" + res.errMsg);
            if (res.errMsg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.errMsg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              console.log("支付成功");
            }
          }
        );
      } else {
        console.log("WeixinJSBridge未准备好，无法发起支付");
      }
    },
    onBridgeReady() {
      this.wxJSBridgeReady = true;
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
