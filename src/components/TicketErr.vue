<template>
     <div class="content">
        <yd-flexbox direction="vertical">
            <!-- <yd-flexbox-item></yd-flexbox-item> -->
            <yd-flexbox-item style="margin-top:50px;">
                <yd-flexbox direction="vertical">
                    <yd-flexbox-item>
                        <div class="holder">
                            <div style="height:60px;line-height:60px;text-align:right;padding-right:20px;">
                                <yd-icon name="warn-outline" slot="icon" style="height:50px;font-size: .5rem;color:rgb(255, 104, 93)"></yd-icon>
                            </div>
                            <p class="title"><span>出票失败</span></p>  
                        </div>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <div class="holder">
                            <span style="font-size:.5rem;">设备编号: {{this.serialNo}}</span>
                            <yd-icon name="feedback" style="font-size: .5rem;margin-left:10px;" @click.native="copyBtnClick"></yd-icon>
                        </div>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <p class="desc">我们将在1个小时内自动退款至您的微信钱包，若未及时退款，进入公众号后可告知我们设备编号及相关情况进行退款申请。您也可拨打24小时服务热线：400-9005369 进行退款申请。</p>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
            
            <yd-flexbox-item>
                <p style="height:50px;line-height:50px;margin-top:20px;">
                    <yd-button type="danger" style="width:100px;height:35px"  @click.native="okClick">进入微信公众号</yd-button>
                </p>
            </yd-flexbox-item>
        </yd-flexbox>
    </div>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
  data() {
    return { serialNo: "12345678" };
  },
  methods: {
    okClick() {
      //回到公众号主体
      let url = location.href.split("#")[0]; //获取锚点之前的链接
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
            jsApiList: ["checkJsApi", "closeWindow"]
          });
        });

      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["scanQRCode"],
          success: function(res) {}
        });
        wx.closeWindow();
      });

      wx.error(function(err) {
        alert(err);
      });
    }
  },
  copyBtnClick() {
    //复制
  },
  mounted() {
    // console.log(WeixinJSBridge)
    // var clipboard = new ClipboardJS('.yd-icon-feedback')
    // console.log(clipboard)
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
  padding: (10px, 0, 0, 10px);
  font-size: .5rem;
}
.content .title {
  /* text-align: center; */
  height: 60px;
  line-height: 60px;
  text-align: left;
  font-size: 5rem;
}
.content .holder {
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex;
}
</style>