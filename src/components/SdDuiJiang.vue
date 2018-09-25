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
                <div style="padding:.28rem;margin-bottom:.28rem;">                    
                    <p><span>请输入保安区的兑奖码</span></p>                    
                </div>
            </yd-flexbox-item>                
        </yd-flexbox>
        <yd-flexbox>
            <yd-flexbox-item>
               <yd-cell-group>
                <!-- <yd-cell-item>
                    <span slot="left">票号：</span>
                    <input slot="right" type="text" placeholder="请输入保安区右侧16位或18位票号">
                </yd-cell-item> -->
                <yd-cell-item>
                    <span slot="left">兑奖码：</span>
                    <input slot="right" type="text" v-model="ticketCode" placeholder="请输入保安区11位兑奖码">
                </yd-cell-item>
               </yd-cell-group>
            </yd-flexbox-item>
        </yd-flexbox>

        <yd-flexbox>
          <yd-flexbox-item>
            <div class="btn-wrapper">
              <yd-button type="hollow" style="border-radius:5px;" @click.native="okClick">立即兑奖</yd-button>
            </div>
          </yd-flexbox-item>
        </yd-flexbox>

         <yd-flexbox v-if="!disableScan">
            <yd-flexbox-item>
                <div class="btn-wrapper">
                    <yd-icon name="qrscan" style="font-size:.35rem;margin-right:5px;"></yd-icon>
                    <span style="color:#ef4f4f" @click="sdDuiJiangClick">切换到扫码兑奖</span>
                </div>
            </yd-flexbox-item>
        </yd-flexbox>
        
        <div class="help-item">
            <p>温馨提示</p>
            <p style="color:#ef4f4f">1.奖金超过1000元,需要前往即开票归属地区的销售网点按照规定进行兑奖。</p>
            <p>2.每台手机设备每人每日最多兑奖100次,且每日兑奖额上限为2万元。</p>
            <p>3.奖金将于1小时内直接发放至您的微信账户,若没有到账,可以拨打24小时服务热线:<a href="tel:400-900-5369">400-900-5369</a>,也可以通过关注公众号联系客服处理。<a href="#" @click="enterHome">点我进入公众号>></a></p>
        </div>

    </div>
</template>


<script>
// import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      logoTips: require("../assets/tips.png"),
      disableScan: false,
      ticketCode: ""
    };
  },
  created() {
    this.disableScan = this.$util.isIos();
  },
  methods: {
    tipsClick() {
      //跳转到帮助页面
      this.$router.push({ path: "/help" });
    },
    sdDuiJiangClick() {
      //跳转到扫码兑奖页面
      this.$router.push({ path: "/duijiang" });
    },
    okClick() {
      //调用兑奖接口
      //TODO:检查参数
      if (!this.ticketCode) {
        this.$dialog.showErrToast("请输入兑奖码");
        return;
      }
      this.queryResult(this.ticketCode);
    },
    queryResult(ticketCode) {
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
            // self.$dialog.alert({ mes: res.data.resMsg });
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
  font-size: .23rem;
}
a {
  /* color: rgb(51, 153, 255); */
  color: rgb(0, 102, 255);
}
</style>