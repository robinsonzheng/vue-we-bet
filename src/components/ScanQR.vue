<template>
    <div class="box">
        <div>
            <span>请扫描设备上的二维码进行购买,购买成功后,记得在出票口取票哦</span>
        </div>
         <yd-button-group>
            <yd-button size="large" type="danger" @click.native="scanQR">开始扫码</yd-button>
         </yd-button-group>
    </div>
</template>

<script>
export default {
  name: "Help",
  data() {
    return {};
  },
  methods:{
    scanQR:function(event){
      var WxJsSDK= require("wx-jssdk")
      alert(WxJsSDK);
    }
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