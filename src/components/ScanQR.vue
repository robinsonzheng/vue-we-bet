<template>
    <div class="box">
        <div>
            <span>请扫描设备上的二维码进行购买,购买成功后,记得在出票口取票哦</span>
        </div>
         <yd-button-group>
            <yd-button size="large" type="danger" @click.native="scan">开始扫码</yd-button>
         </yd-button-group>
    </div>
</template>

<script>
  export default {
    name: "ScanQR",
    data() {
      return {}
    },
    methods: {
      scan:function(event) {
        var WxJsSDK = require("wx-jssdk")
        console.log(WxJsSDK)
      },
      //获取微信参数
      getConfig() {
        let url = location.href.split('#')[0] //获取锚点之前的链接
        this.$http.get('/index.php',{
          params: {
            url: url
          }
        }).then(response => {
            let res = response.data;
            this.wxScan(res);
          })
      },
      //微信扫码
      wxScan(res){
        //TODO
      }
    },
    mounted(){
      this.$nextTick(function () {
        //this.getConfig()
        console.log("scan qr page mounted.")
      })
    }
  }
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