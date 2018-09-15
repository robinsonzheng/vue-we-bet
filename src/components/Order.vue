<template>
    <yd-layout>
        
        <yd-cell-group v-if="error == null" style="margin:0px">
            <yd-cell-item>                
                <span slot="left">设备编号:{{post.terminalNo}}</span>
                <div slot="right">
                    <!-- <router-link slot="right"> -->
                        <yd-icon name="setting" size=".5rem" color="#777" @click.native ="bindClick"></yd-icon>
                    <!-- </router-link> -->
                </div>
            </yd-cell-item>
        </yd-cell-group>

        <div v-if="error" class="error">
            <div>{{ error }}</div>
            <div><yd-button type="hollow">刷新</yd-button></div>            
        </div>

        <!-- 数量输入弹出框 -->
        <yd-popup v-model="post.showOtherQty" class="popup" :close-on-masker=false position="center" width="80%">
            <div style="background-color:#fff;">
                <div>
                    <p><span>请输入购买数量</span></p>
                    <span class="close" @click="post.showOtherQty=false"></span>
                </div>
                <span slot="left">剩余库存:{{post.number}}张</span>  
                <p style="margin:5px">
                    <yd-spinner min="1" unit="1" width="160px" height="40px" v-model="post.tmpQty"></yd-spinner>
                </p>
                <div v-if="post.qtyErr"><span style="color:rgb(229, 28, 35)">{{post.qtyErr}}</span></div>
                <p style="height:50px;line-height:50px">
                    <yd-button type="danger" style="width:80px;height:35px"  @click.native="confirmQtyClick">确定</yd-button>
                </p>               
            </div>
        </yd-popup>

        <div v-if="error == null">
            <!-- 游戏详情 -->
            <yd-flexbox>
                <yd-flexbox-item>
                    <div style="padding:20px;">
                        <img slot="icon" :src="post.frontIcon" style="width: 100%;height:auto;" />
                    </div>
                </yd-flexbox-item>
                <yd-flexbox-item>
                    <yd-flexbox direction="vertical">
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">游戏:</span>
                                <span slot="left" style="margin-left:10px;font-weight:bold;">{{post.ticketName}}</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">单价:</span>
                                <span slot="left" style="margin-left:10px;font-weight:bold;">{{post.money}}元</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">库存:</span>
                                <span slot="left" style="margin-left:10px;font-weight:bold;">{{post.number}}张</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                    </yd-flexbox>
                </yd-flexbox-item>
            </yd-flexbox>

            <!-- 数量选择 -->
            <yd-grids-group :rows="3" title="请选择购买数量">
            </yd-grids-group>

            <table style="width:100%">
                <tr>
                    <td><yd-button :type="post.activeIndex === 0?'danger':'hollow'" :disabled="post.number<1" @click.native="buttonClick(0,1)">1张</yd-button></td>
                    <td><yd-button :type="post.activeIndex === 1?'danger':'hollow'" :disabled="post.number<2" @click.native="buttonClick(1,2)">2张</yd-button></td>
                    <td><yd-button :type="post.activeIndex === 2?'danger':'hollow'" :disabled="post.number<3" @click.native="buttonClick(2,3)">3张</yd-button></td>
                </tr>
                <tr>
                    <td><yd-button :type="post.activeIndex === 3?'danger':'hollow'" :disabled="post.number<5" @click.native="buttonClick(3,5)">5张</yd-button></td>
                    <td><yd-button :type="post.activeIndex === 4?'danger':'hollow'" :disabled="post.number<10" @click.native="buttonClick(4,10)">10张</yd-button></td>
                    <td><yd-button :type="post.activeIndex === 5?'danger':'hollow'" :disabled="post.number<1" @click.native="buttonClick(5)">其他数量</yd-button></td>
                </tr>
            </table>

        </div>

        <yd-tabbar v-if="error == null" slot="tabbar" style="padding:0">
            <yd-flexbox class="footer">
                <yd-flexbox-item>
                    支付金额: {{post.amount}}元
                </yd-flexbox-item>
                <yd-flexbox-item style="background-color:rgb(229, 28, 35);color:white" @click.native="wxPayClick">
                    立即支付
                </yd-flexbox-item>
            </yd-flexbox>
        </yd-tabbar>


    </yd-layout>

</template>

<script type="text/babel">
export default {
  data() {
    return {
      post: { activeIndex: 0 },
      error: null,
      wxJSBridgeReady: false
    };
  },
  created() {
    // debugger;
    // 组件创建完后，获取设备序列号参数，请求彩票信息
    var serialCode = this.$util.getParamVal(
      window.location.search,
      "serialCode"
    );
    console.log("serialCode", serialCode);

    this.$store.commit("updateSerialCode", serialCode);

    // 获取数据
    // 此时 data 已经被 observed 了
    this.fetchData(serialCode);

    // 初始化微信支付组件
    // debugger;
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
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
    "post.qty": "watchQty",
    "post.tmpQty": "watchTmpQty"
  },
  methods: {
    fetchData(serialCode) {
      this.error = null;
      this.$root.$dialog.loading.open();
      // replace getPost with your data fetching util / API wrapper
      this.getPost(serialCode, (err, data) => {
        this.$root.$dialog.loading.close();
        if (err) {
          this.error = err;
        } else {
          // this.$set(this.post, "serialNo", data.serialNo);
          var allHouseInfo = data.content.houseInfo; //多票仓
          var houseInfo = allHouseInfo[0];

          //记录票种信息
          this.$store.commit("updateTicketInfo", {
            houseId: houseInfo.houseId,
            ticketId: houseInfo.ticketId
          });

          //TODO:删除调试代码
          data.content.managerId = 0;

          //记录管理员ID，终端号码
          this.$store.commit("updateManagerId", data.content.managerId);
          this.$store.commit("updateTerminalNo", data.terminalNo);
          this.$store.commit("updateToken", data.token);

          this.$set(this.post, "terminalNo", data.terminalNo);
          this.$set(this.post, "ticketName", houseInfo.ticketName);
          this.$set(this.post, "money", houseInfo.money);
          this.$set(this.post, "number", houseInfo.number);
          this.$set(this.post, "qty", 1); //默认1张
          this.$set(this.post, "frontIcon", houseInfo.frontIcon);
        }
      });
    },
    watchTmpQty: function() {
      this.post.qtyErr = null;
      //监听数量变化
      if (this.post.tmpQty <= 0) {
        this.post.qtyErr = "数量不能为0";
      } else if (this.post.tmpQty > this.post.number) {
        this.post.qtyErr = "库存不足，请重新选择";
      }
    },
    watchQty: function() {
      if (!this.post.qtyErr) {
        this.post.amount = this.post.money * this.post.qty;
      }
    },
    buttonClick: function(index, qty) {
      this.$set(this.post, "activeIndex", index);
      console.log(this.post.activeIndex);
      if (index > 4) {
        //其他数量
        if (!this.post.qty) {
          this.$set(this.post, "qty", 1);
        }
        this.$set(this.post, "tmpQty", this.post.qty);
        this.$set(this.post, "showOtherQty", true);
      } else {
        this.$set(this.post, "qty", qty);
      }
    },
    confirmQtyClick: function() {
      if (!this.post.qtyErr) {
        this.post.qty = this.post.tmpQty;
        this.post.showOtherQty = false;
      }
    },
    getPost(serialCode, callback) {
      //调用数据API，包括返回数据以及错误处理
      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110301,
          content: {
            serialCode: serialCode
          }
        })
        .then(res => {
          if (res.data.resCode == "0") {
            //成功
            callback && callback(null, res.data);
          } else {
            //失败
            console.log("res", res);
            callback && callback(res.data.resMsg, res.data);
          }
        })
        .catch(err => {
          //异常
          // alert(err);
          callback && callback(err.toString(), null);
        });
    },
    wxPayClick(event) {
      //1、生成订单
      this.$dialog.loading.open("生成订单...");
      var self = this;
      this.$ajax
        .post("/api", {
          apiCode: 110401,
          content: {
            openId: self.$cookie.get("openId"), //微信用户的openId
            ticketInfo: [
              {
                houseId: self.$store.state.ticketInfo.houseId,
                ticketId: self.$store.state.ticketInfo.ticketId,
                amount: self.post.qty,
                betMoney: self.post.amount
              }
            ] //购票信息
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == 0) {
            //生成订单成功
            console.log("订单号", res.data.content.orderNo);
            //更新订单信息
            self.$store.commit("updateOrderNo", res.data.content.orderNo);

            //发起支付
            wxPay(
              res.data.payInfo,
              res => {
                console.log("支付成功");
                //转到出票页面
                self.$router.replace("/ticket");
              },
              err => {
                console.log("支付失败");
              }
            );
          } else {
            //失败
            self.$dialog.alert({ mes: "生成订单失败，请重试" });
            return;
          }
        })
        .catch(err => {
          //失败
          self.$dialog.loading.close();
          self.$dialog.alert({ mes: err });
        });
    },
    // 微信支付
    wxPay(payInfo, resorve, reject) {
      if (this.wxJSBridgeReady) {
        console.log("WeixinJSBridge已准备好，正在发起支付");
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: payInfo.appId, //公众号名称，由商户传入
            timeStamp: payInfo.timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: payInfo.nonceStr, //随机串
            package: payInfo.package,
            signType: payInfo.signType, //微信签名方式：
            paySign: payInfo.paySign //微信签名
          },
          function(res) {
            console.log("微信支付返回：" + res.errMsg);
            if (res.errMsg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.errMsg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              console.log("支付成功");
              resorve && resorve();
            }
          }
        );
      } else {
        console.log("WeixinJSBridge未准备好，无法发起支付");
        reject && reject();
      }
    },
    bindClick(event) {
      this.$router.push(this.$store.state.managerId ? "/login" : "/bindins");
    },
    onBridgeReady() {
      this.wxJSBridgeReady = true;
    }
  }
};
</script>

<style>
.left-panel {
  width: 60%;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.left-panel img {
  width: 100%;
  height: auto;
}
.right-panel {
  width: 40%;
}
table {
  width: 100%;
}
td {
  width: 30%;
  padding: 5px;
}
td button {
  width: 70%;
  height: 0.9rem;
}
.yd-btn {
  height: 0.9rem;
  border-radius: 4px;
}
.footer {
  width: 100%;
  height: 1rem;
}
.footer div {
  width: 50%;
  height: 1rem;
  vertical-align: middle;
  font-size: 0.28rem;
  color: rgb(229, 28, 35);
  line-height: 1rem;
}
.popup {
  width: 80%;
}
.popup p {
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.28rem;
}
/* basic style */
.close {
  /* still bad on picking color */
  color: black;
  /* make a round button */
  border-radius: 12px;
  /* center text */
  line-height: 0.85rem;
  text-align: center;
  height: 0.85rem;
  width: 0.85rem;
  font-size: 0.28rem;
  padding: 0;
}
/* use cross as close button */
.close::before {
  content: "\2716";
}
/* place the button on top-right */
.close {
  top: 5px;
  right: 5px;
  position: absolute;
}
.yd-gridstitle {
  color: #555;
}
</style>

