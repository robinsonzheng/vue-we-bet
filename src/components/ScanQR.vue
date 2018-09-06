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
console.log(wx);
// debugger;

export default {
  name: "ScanQR",
  data() {
    return {};
  },
  methods: {
    scanClick: function(event) {
      this.getConfig();
    },
    //调用微信js api
    getConfig() {
      let url = location.href.split("#")[0]; //获取锚点之前的链接      
      // url = "http://dev.joylott.net/jkp/server";
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

    }
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