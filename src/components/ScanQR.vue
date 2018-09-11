<template>
    <div class="box">
        <div>
            <span>请扫描设备上的二维码进行购买,购买成功后,记得在出票口取票哦</span>
        </div>
         <yd-button-group>
            <yd-button size="large" type="danger" @click.native="scanClick">开始扫码</yd-button>
         </yd-button-group>
    </div>
</template>

<script>
import wx from "weixin-js-sdk";
// console.log(wx);
// debugger;

export default {
  name: "ScanQR",
  data() {
    return {};
  },
  methods: {
    scanClick: function(event) {
      console.log("scan clicked");
      if (!this.ready) {
        this.$router.go(0);
      }
      this.$nextTick(function(){
        console.log("try to get wx config");
        this.getConfig();
      });
    },
    //调用微信js api
    getConfig() {
      console.log("getting wx config");
      let url = encodeURIComponent(location.href.split("#")[0]); //获取锚点之前的链接
      // let url = "http://dev.joylott.net/jkp/gw";

      alert(url);

      this.$ajax
        .post("/scan?url=" + url, {
          url: url
        })
        .then(response => {
          let res = response.data;
          wx.config({
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug: true,
            // 必填，公众号的唯一标识
            appId: "wx1578db3d1b70d661",
            // 必填，生成签名的时间戳
            timestamp: "" + res.timestamp,
            // 必填，生成签名的随机串
            nonceStr: res.noncestr,
            // 必填，签名
            signature: res.signature,
            // 必填，需要使用的JS接口列表，所有JS接口列表
            jsApiList: ["checkJsApi", "scanQRCode"]
          });
        });

      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["scanQRCode"],
          success: function(res) {}
        });

        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            alert("扫描结果：" + result);
            // window.location.href = result; //因为我这边是扫描后有个链接，然后跳转到该页面
          }
        });
      });

      wx.error(function(err) {
        alert(err);
      });
    },
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
  },
  created() {
    var redirect_uri = location.href;
    redirect_uri = redirect_uri.replace(
      "localhost:8080",
      "dev.joylott.net/jkp/gw"
    );
    console.log(redirect_uri);
    redirect_uri = encodeURIComponent(redirect_uri);
    // 获取openid
    var url =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1578db3d1b70d661&redirect_uri=" +
      redirect_uri +
      "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";

    this.ready = true; //TODO: 把ready设为false
    // if (!this.$store.state.openId) {
    //   //检查是否有code参数，如果有，是微信重定向过来的，获取code并向后端请求openId
    //   console.log(window.location.search);
    //   var code = this.getParamVal(window.location.search, "code") || "";
    //   console.log("code:" + code);
    //   if (!code) {
    //     //第一次需要重定向到微信的链接
    //     console.log("重定向到微信授权URL" + url);
    //     window.location.href = url;
    //   } else {
    //     console.log("从微信取到code，请求后台API");
    //     var self = this;
    //     self.$ajax
    //       .post("/getOpenId?code=" + code, {
    //         code: code
    //       })
    //       .then(function(res) {
    //         console.log("请求成功");
    //         // alert(res);
    //         console.log(res);
    //         self.$store.commit("updateOpenId", res.openId);
    //         self.ready = true;
    //       })
    //       .catch(function(err) {
    //         console.log("请求失败");
    //         alert(err);
    //       });
    //   }
    // } else {
    //   console.log("openId:" + this.$store.state.openId);
    //   this.ready = true;
    // }
  },
  mounted() {
    this.$nextTick(function() {
      //this.getConfig()
      console.log("scan qr page mounted.");
    });
  }
};
</script>

<style scoped>
.box {
  overflow-y: auto;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.box span {
  vertical-align: middle;
  display: inline-block;
  text-align: left;
}
</style>