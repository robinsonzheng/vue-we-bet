<template>
    <div class="page-wrapper">
        <yd-flexbox>
            <yd-flexbox-item>
                <div style="padding:.28rem;text-align:right;">                    
                    <img slot="icon" :src="logoTips" style="width:.38rem;;height:.38rem;" @click="tipsClick" />
                </div>
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox>            
            <yd-flexbox-item>
                <div style="padding:.28rem">                    
                    <img slot="icon" :src="logo1" style="width: 100%;height:auto;" />
                    <p><span>刮开保安区</span></p>
                    <p><span>01</span></p>
                </div>
            </yd-flexbox-item>
            <yd-flexbox-item>
            <div style="padding:.28rem">
                <img slot="icon" :src="logo2" style="width: 100%;height:auto;" />
                <p><span>扫描二维码兑奖</span></p>
                <p><span>02</span></p>
            </div>
            </yd-flexbox-item>            
        </yd-flexbox>
        <yd-flexbox>
            <yd-flexbox-item>
                <div class="btn-wrapper">
                    <div class="btn-scan" @click="scanClick">
                        <img slot="icon" :src="logoScan" style="width:.38rem;margin-right:5px;">
                        <span style="color:white">立即扫码</span>
                    </div>
                </div>
            </yd-flexbox-item>
        </yd-flexbox>

        <!-- <yd-flexbox>
            <yd-flexbox-item>
                <div class="btn-wrapper">
                    <div>
                        <span style="margin-right:5px;">扫码有问题?</span>
                        <img slot="icon" :src="logoKeyboard" style="width:.38rem;margin-right:5px;">
                        <span style="color:#ef4f4f" @click="sdDuiJiangClick">手动兑奖</span>
                    </div>
                </div>
            </yd-flexbox-item>
        </yd-flexbox> -->

        <div class="help-item">
            <p>温馨提示:</p>
            <p style="color:#ef4f4f">1.若您单笔奖金超过2万元,或者由于扫码有问题等情况无法兑奖,您需要前往即开票归属地区的销售网点按照规定进行兑奖。</p>            
            <p>2.奖金将于1小时内直接发放至您的微信账户,若没有到账,可以拨打24小时服务热线:<a href="tel:400-900-5369">400-900-5369</a>,也可以通过关注公众号联系客服处理。<a href="#" @click="enterHome">点我进入公众号>></a></p>
        </div>

    </div>
</template>


<script>
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      logo1: require("../assets/no_1.png"),
      logo2: require("../assets/no_2.png"),
      logoScan: require("../assets/scan.png"),
      logoTips: require("../assets/tips.png"),
      logoKeyboard: require("../assets/keyboard.png")
    };
  },
  created() {
    // if (this.$util.isIos()) {
    //   this.$router.replace({
    //     name: "SdDuiJiang",
    //     params: { disableScan: true }
    //   });
    // }
  },
  methods: {
    tipsClick() {
      //跳转到帮助页面
      this.$router.push({ path: "/help" });
    },
    sdDuiJiangClick() {
      //跳转到手动兑奖页面
      this.$router.push({ path: "/sdduijiang" });
    },
    scanClick: function(event) {
      // var result = "PDF_147,J060017130008209510294570479972029459015"; // 当needResult 为 1 时，扫码返回的结果
      // var ticketCode;
      // //调用中奖查询接口
      // if (result) {
      //   try {
      //     var values = result.split(",");
      //     ticketCode = values[1];
      //   } catch (err) {}
      //   if (!ticketCode) {
      //     this.$dialog.showErrToast("无效票");
      //     return;
      //   }
      //   this.queryResult(ticketCode);
      // } else {
      //   this.$dialog.showErrToast("无效票");
      // }

      if (this.$util.isIos()) {
        this.$dialog.alert({ mes: "ios系统暂时不支持兑奖" });
        return;
      }

      this.$nextTick(function() {
        this.getConfig();
      });
    },
    //调用微信js api
    getConfig() {
      console.log("getting wx config");
      let url = encodeURIComponent(location.href.split("#")[0]); //获取锚点之前的链接
      // let url = "http://dev.joylott.net/jkp/gw";
      // alert(url);
      this.$ajax
        .post(process.env.SERVER_HOST + "scan?url=" + url, {
          url: url
        })
        .then(response => {
          let res = response.data;
          wx.config({
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug: false,
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

      var self = this;
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["scanQRCode"],
          success: function(res) {}
        });

        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            var ticketCode;
            // alert("扫描结果：" + result);
            //调用中奖查询接口
            if (result) {
              try {
                var values = result.split(",");
                ticketCode = values[1];
              } catch (err) {
                // alert("[debug]解析条码信息异常,条码信息:" + result);
              }
              if (!ticketCode) {
                self.$dialog.showErrToast("无效票");
                return;
              }
              self.queryResult(ticketCode);
            } else {
              // alert("[debug]无效票"); //TODO:delete debug msg
              self.$dialog.showErrToast("无效票");
            }
          }
        });
      });

      wx.error(function(err) {
        alert(err);
      });
    },
    queryResult(ticketCode) {
      // alert("[debug]查询兑奖信息:" + ticketCode); //TODO:delete debug msg

      this.$dialog.loading.open("查询中...");
      var self = this;
      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110403,
          content: {
            ticketCode: ticketCode,
            openId: self.$cookie.get("openId") //微信用户的openId
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          // alert("[debug]查询成功, 返回" + JSON.stringify(res.data)); //TODO:delete debug msg

          self.$dialog.loading.close();
          var bonusParams = {};
          if (res.data.resCode == 0) {
            //查询成功
            switch (res.data.content.status) {
              case 0:
                //未开奖
                console.log("未开奖");
                break;
              case 2:
                //未中奖
                console.log("未中奖");
                break;
              case 3:
                //中奖
                console.log("中奖");
                break;
              case 4:
                //已派奖
                console.log("已派奖");
                break;
            }

            // res.data.content.status = 4;
            // res.data.content.totalPrize = 1001;

            bonusParams = {
              orderStatus: res.data.content.status,
              bonusStatus: res.data.content.status == 3 ? 0 : 1,
              bonus: res.data.content.totalPrize
            };
          } else if (res.data.resCode == 9000) {
            bonusParams = {
              orderStatus: 0, //未查询到
              bonusStatus: 1, //兑奖失败
              errMsg: res.data.resMsg
            };
          } else {
            bonusParams = {
              orderStatus: 9999, //其他未知错误
              bonusStatus: 1, //兑奖失败
              errMsg: res.data.resMsg
            };
          }

          self.$router.replace({
            name: "Bonus",
            params: bonusParams
          });
        })
        .catch(err => {
          // alert("[debug]查询异常"); //TODO:delete debug msg
          //失败
          self.$dialog.loading.close();
          self.$router.replace({
            name: "Bonus",
            params: {
              orderStatus: 9999,
              bonusStatus: 1 //兑奖失败
            }
          });
        });
    },
    enterHome() {
      //进入公众号
      this.$util.redirectToWxHome();
    }
  }
};
</script>

<style scoped>
.btn-wrapper {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.btn-scan {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  background-color: #ef4f4f;
  width: 50%;
  padding: 0.15rem;
  border-radius: 5px;
  height: 42px;
  line-height: 42px;
}
.help-item {
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
}
.help-item p {
  padding-bottom: 5px;
  font-size: 0.23rem;
}
a {
  /* color: rgb(51, 153, 255); */
  color: rgb(0, 102, 255);
}
</style>

