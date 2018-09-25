<template>
     <div class="content">
        <yd-flexbox direction="vertical">
            <yd-flexbox-item style="margin-top:50px;">
                <yd-flexbox direction="vertical">
                    <yd-flexbox-item>
                        <div class="title-holder">
                            <div style="height:80px;line-height:80px;text-align:right;padding-right:20px;">
                                <yd-icon name="checkoff" slot="icon" style="height:50px;font-size: 1rem;color:green"></yd-icon>
                            </div>
                             <p class="title"><span>出票成功</span></p>         
                        </div>
                        <span>请在出票口领取即开票</span>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
            
            <yd-flexbox-item>
                <p style="height:50px;line-height:50px">
                    <yd-button type="hollow" style="width:100px;height:35px"  @click.native="okClick">完成</yd-button>
                </p>
            </yd-flexbox-item>
        </yd-flexbox>
    </div>
</template>

<script>
export default {
  data() {
    return {
      wxJSBridgeReady: false
    };
  },
  methods: {
    okClick() {    
      //回到公众号主体
      this.$util.redirectToWxHome();
    },
    onBridgeReady() {
      this.wxJSBridgeReady = true;
    }
  },
  created() {
    // 初始化微信支付组件
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
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 30px;
}
.content .desc {
  text-align: left;
  padding: 10px;
}
.content .title {
  /* text-align: center; */
  height: 60px;
  line-height: 60px;
  text-align: left;
  font-size: 0.5rem;
}
.content .title-holder {
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex;
}
</style>
