<template>
    <!-- <yd-layout> -->
        

        <div v-if="post" class="content">
            <!-- 数量输入弹出框 -->
            <yd-popup v-model="post.showOtherQty" class="popup" :close-on-masker=false position="center" width="80%">
                <div style="background-color:#fff;">
                    <div>
                        <p><span>请输入数量</span></p>
                        <span class="close" @click="post.showOtherQty=false"></span>
                    </div>                    
                    <p style="margin:5px">
                        <yd-spinner min="1" unit="1" width="160px" height="40px" v-model="post.tmpQty"></yd-spinner>
                    </p>                    
                    <p style="height:50px;line-height:50px">
                        <yd-button type="danger" style="width:80px;height:35px"  @click.native="confirmQtyClick">
                          <span>确定{{post.activeTab==0?"增加":post.activeTab==1?"减少":""}}</span>
                        </yd-button>
                    </p>               
                </div>
            </yd-popup>

            <!-- 游戏选择弹出框 -->
            <yd-popup position="bottom" height="100%" v-model="post.showTicketList">          
              <yd-cell-group title="游戏选择">
                <yd-cell-item type="radio" v-for="ticketInfo in post.ticketList" v-bind:key="ticketInfo.ticketId" v-bind:value="ticketInfo.ticketId" @click.native="chooseTicket(ticketInfo)">
                    <span slot="left">{{ticketInfo.ticketName}}</span>
                    <input slot="right" type="radio" :value="ticketInfo.ticketId" v-model="post.pickedTicketId"/>
                </yd-cell-item>               
              </yd-cell-group>
            </yd-popup>            

            <!-- 游戏详情 -->
            <yd-flexbox>
                <yd-flexbox-item>
                    <div style="padding:20px;">
                        <img slot="icon" :src="post.frontIcon" />
                    </div>
                </yd-flexbox-item>
                <yd-flexbox-item>
                    <yd-flexbox direction="vertical">
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">游戏:</span>
                                <span slot="left" style="margin-left:10px">{{post.ticketName}}</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">单价:</span>
                                <span slot="left" style="margin-left:10px">{{post.money}}元</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">库存:</span>
                                <span slot="left" style="margin-left:10px">{{post.inventory}}张</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                    </yd-flexbox>
                </yd-flexbox-item>
            </yd-flexbox>

            <yd-tab bg-color2="rgb(185, 183, 183)" active-color3="rgb(185, 183, 183)" :callback="tabSwitch" v-model="post.activeTab">
                <yd-tab-panel label="增加库存">                    
                    <!-- <span>增加数量:</span> -->
                    <table>
                        <tr>
                            <td><yd-button :type="post.activeIndex === 0?'danger':'hollow'" @click.native="qtyBtnClick(0,30)">30张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 1?'danger':'hollow'" @click.native="qtyBtnClick(1,60)">60张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 2?'danger':'hollow'" @click.native="qtyBtnClick(2,120)">120张</yd-button></td>
                        </tr>
                        <tr>
                            <td><yd-button :type="post.activeIndex === 3?'danger':'hollow'" @click.native="qtyBtnClick(3,240)">240张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 4?'danger':'hollow'"  @click.native="qtyBtnClick(4)">其他数量</yd-button></td>                            
                        </tr>
                    </table>                   
                </yd-tab-panel>
                <yd-tab-panel label="减少库存">      
                    <table>
                        <tr>
                            <td><yd-button :type="post.activeIndex === 5?'danger':'hollow'" @click.native="qtyBtnClick(5,30)">30张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 6?'danger':'hollow'" @click.native="qtyBtnClick(6,60)">60张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 7?'danger':'hollow'" @click.native="qtyBtnClick(7,120)">120张</yd-button></td>
                        </tr>
                        <tr>
                            <td><yd-button :type="post.activeIndex === 8?'danger':'hollow'" @click.native="qtyBtnClick(8,240)">240张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 9?'danger':'hollow'"  @click.native="qtyBtnClick(9)">其他数量</yd-button></td>                            
                        </tr>
                    </table>          
                </yd-tab-panel>
                <yd-tab-panel label="更换票种">
                  <yd-cell-item arrow type="label" @click.native="ticketListClick">
                      <span slot="left">更换票种：</span>
                      <span slot="right">{{post.newTicketInfo.ticketName}}</span>                 
                  </yd-cell-item>
                  <table>
                      <tr>
                          <td><yd-button :type="post.activeIndex === 10?'danger':'hollow'" @click.native="qtyBtnClick(10,30)">30张</yd-button></td>
                          <td><yd-button :type="post.activeIndex === 11?'danger':'hollow'" @click.native="qtyBtnClick(11,60)">60张</yd-button></td>
                          <td><yd-button :type="post.activeIndex === 12?'danger':'hollow'" @click.native="qtyBtnClick(12,120)">120张</yd-button></td>
                      </tr>
                      <tr>
                          <td><yd-button :type="post.activeIndex === 13?'danger':'hollow'" @click.native="qtyBtnClick(13,240)">240张</yd-button></td>
                          <td><yd-button :type="post.activeIndex === 14?'danger':'hollow'"  @click.native="qtyBtnClick(14)">其他数量</yd-button></td>                            
                      </tr>
                  </table>   
                </yd-tab-panel>                 
            </yd-tab>
            
            <div class="center-holder">
                <yd-button type="hollow" @click.native="okClick">确定</yd-button>
                <yd-button type="hollow" @click.native="cancelClick">取消</yd-button>                     
            </div>
        </div>
    <!-- </yd-layout> -->
</template>

<script type="text/babel">
export default {
  data() {
    return {
      post: {
        activeIndex: -1,
        tmpQty: 1,
        qty: 0,
        pickedTicketId: 0,
        ticketList: [],
        newTicketInfo: {},
        activeTab: 0
      }
    };
  },
  created() {
    // 组件创建完后
    // 获取数据
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
    "post.activeTab": "onActiveTabChanged"
  },
  methods: {
    fetchData() {
      let params = this.$route.params;
      this.$set(this.post, "ticketId", params.ticketId);
      this.$set(this.post, "houseId", params.houseId);
      this.$set(this.post, "ticketName", params.ticketName);
      this.$set(this.post, "money", params.money);
      this.$set(this.post, "frontIcon", params.frontIcon);
      this.$set(this.post, "inventory", params.inventory);

      this.$set(this.post, "newTicketInfo", {
        ticketId: params.ticketId,
        ticketName: params.ticketName
      });
    },
    okClick() {
      console.log("qty=", this.post.qty);

      if (!this.post.qty) {
        this.$dialog.showErrToast("请输入数量");
        return;
      }

      if (this.post.activeTab == 2) {
        //验证游戏是否变更
        if (this.post.newTicketInfo.ticketId == this.post.ticketId) {
          this.$dialog.showErrToast("请更换不同票种");
          return;
        }
      }

      this.callUpdateRequest();
    },
    tabSwitch(label) {
      if (label == "更换票种") {
        this.loadTicketPanel();
      }
    },
    loadTicketPanel() {
      var self = this;
      this.error = null;
      this.$dialog.loading.open("载入中...");

      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110702,
          content: {
            token: self.$store.state.managerToken
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == 0) {
            //成功
            self.post.ticketList.splice(0, self.post.ticketList.length);
            if (res.data.content.ticketInfo) {
              res.data.content.ticketInfo.forEach(element => {
                self.post.ticketList.push({
                  ticketId: element.ticketId,
                  ticketName: element.ticketName
                });
              });
            }
          } else if (
            res.data.resCode == "23001" ||
            res.data.resCode == "000802"
          ) {
            //管理员未登录
            self.$router.push({
              name: "Login",
              params: {
                redirect_path: "/editstock",
                redirect_params: {
                  ticketName: self.post.ticketName,
                  money: self.post.money,
                  frontIcon: self.post.frontIcon,
                  inventory: self.post.inventory
                }
              }
            });
          } else {
            //失败，显示错误信息
            self.$dialog.showErrToast(res.data.resMsg);
          }
        })
        .catch(err => {
          //异常
          self.$dialog.loading.close();
          self.$dialog.showErrToast("出错了,请检查网络~");
        });
    },
    callUpdateRequest() {
      var self = this;
      this.error = null;
      this.$dialog.loading.open("请稍后...");

      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110703,
          content: {
            token: self.$store.state.managerToken,
            ticketInfo: [
              {
                ticketId:
                  self.post.activeTab == 2
                    ? self.post.newTicketInfo.ticketId
                    : self.post.ticketId,
                houseId: self.post.houseId,
                addType:
                  self.post.activeTab == 0
                    ? 1
                    : self.post.activeTab == 1 ? 3 : 2, //1,补票；2,更换彩种放票；3,减票
                amount: Math.abs(self.post.qty)
              }
            ]
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == 0) {
            //成功
            self.$dialog.showOkToast("修改成功", null, () => {
              //如果是更换票种，重新载入设备信息
              if (self.post.activeTab == 2) {
                self.$dialog.loading.open("载入中...");
                self.$ajax
                  .post(process.env.SERVER_HOST, {
                    apiCode: 110301,
                    content: {
                      serialCode: self.$store.state.serialCode
                    }
                  })
                  .then(res => {
                    if (res.data.resCode == 0) {
                      let allHouseInfo = res.data.content.houseInfo; //多票仓
                      let houseInfo = allHouseInfo[0];
                      //记录票种信息
                      self.$store.commit("updateTicketInfo", {
                        houseId: houseInfo.houseId,
                        ticketId: houseInfo.ticketId,
                        ticketName: houseInfo.ticketName,
                        money: houseInfo.money,
                        frontIcon: houseInfo.frontIcon
                      });
                      //记录管理员ID，终端号码
                      self.$store.commit(
                        "updateManagerId",
                        res.data.content.managerId
                      );
                      self.$store.commit(
                        "updateTerminalNo",
                        res.data.terminalNo
                      );
                      self.$store.commit("updateToken", res.data.token);
                      self.$router.replace({ path: "/stock" });
                    } else {
                      self.$dialog.showErrToast(
                        "加载设备信息发生异常，系统将跳转到首页",
                        null,
                        () => {
                          self.$router.replace({ path: "/order" });
                        }
                      );
                    }
                  })
                  .catch(err => {
                    self.$dialog.showErrToast(
                      "加载设备信息发生异常，系统将跳转到首页",
                      null,
                      () => {
                        self.$router.replace({ path: "/order" });
                      }
                    );
                  });
              } else {
                self.$router.replace({ path: "/stock" });
              }
            });
          } else if (
            res.data.resCode == "23001" ||
            res.data.resCode == "000802"
          ) {
            //管理员未登录
            self.$router.push({
              name: "Login",
              params: {
                redirect_path: "/editstock",
                redirect_params: {
                  ticketName: self.post.ticketName,
                  money: self.post.money,
                  frontIcon: self.post.frontIcon,
                  inventory: self.post.inventory
                }
              }
            });
          } else {
            //失败，显示错误信息
            self.$dialog.showErrToast(res.data.resMsg);
          }
        })
        .catch(err => {
          //异常
          self.$dialog.loading.close();
          self.$dialog.showErrToast("出错了,请检查网络~");
        });
    },
    cancelClick() {
      this.$router.replace("/stock");
    },
    qtyBtnClick(index, qty) {
      this.$set(this.post, "activeIndex", index);
      if (index === 4 || index === 9 || index == 14) {
        this.$set(this.post, "showOtherQty", true);
      } else {
        this.$set(this.post, "tmpQty", qty);
        this.$set(this.post, "qty", index > 4 ? -qty : qty);
      }
    },
    confirmQtyClick() {
      if (this.post.activeIndex == 4 || this.post.activeIndex == 14) {
        //增加其他数量
        this.$set(this.post, "qty", this.post.tmpQty);
      }
      if (this.post.activeIndex == 9) {
        //减少其他数量
        this.$set(this.post, "qty", -this.post.tmpQty);
      }
      this.$set(this.post, "showOtherQty", false);

      //如果是增加/减少，直接发起请求，不需要再按以下确定按钮
      if (this.post.activeIndex == 4 || this.post.activeIndex == 9) {
        this.callUpdateRequest();
      }
    },
    ticketListClick() {
      this.$set(this.post, "showTicketList", true);
    },
    chooseTicket(ticketInfo) {
      this.$set(this.post, "newTicketInfo", ticketInfo);
      this.$set(this.post, "showTicketList", false);
    },
    onActiveTabChanged() {
      // console.log("activeTab=", this.post.activeTab);
      var resetQty = false;
      if (this.post.activeTab == 0 && this.post.activeIndex > 4) {
        resetQty = true;
      }
      if (
        this.post.activeTab == 1 &&
        (this.post.activeIndex <= 4 || this.post.activeIndex > 9)
      ) {
        resetQty = true;
      }
      if (this.post.activeTab == 2 && this.post.activeIndex < 10) {
        resetQty = true;
      }
      if (resetQty) {
        this.$set(this.post, "tmpQty", 1);
        this.$set(this.post, "qty", 0);
        this.$set(this.post, "activeIndex", -1);
      }
    }
  }
};
</script>

<style scoped>
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
  height: 40px;
}
.popup {
  width: 80%;
}
.popup p {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 0.28rem;
}
/* basic style */
.close {
  /* still bad on picking color */
  color: black;
  /* make a round button */
  border-radius: 12px;
  /* center text */
  line-height: 30px;
  text-align: center;
  height: 30px;
  width: 30px;
  font-size: 0.5rem;
  padding: 0px;
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

.content {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 10px;
}
.content .center-holder {
  justify-content: center; /*子元素水平居中*/
  align-items: flex-start; /*子元素垂直居中*/
  display: -webkit-flex;
  /* margin-top: 10px; */
}
.content .center-holder .yd-btn {
  width: 60px;
  margin: 10px;
}

.flexbox {
  display: flex;
  display: -webkit-flex;
  direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.flexbox-qty {
  display: flex;
  display: -webkit-flex;
  direction: row;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
}
.flexbox-qty button {
  width: 15%;
  margin: 4px;
  border-radius: 5px;
}

img {
  width: 100%;
  height: auto !important;
  max-width: 100% !important;
  max-height: 300px !important;
}
</style>

<style>
/* .yd-grids-3 {
  padding: 0;
}
.yd-grids-item {
  padding: 0;
} */
/* .yd-grids-txt {
  height: 30px;
  line-height: 30px;
  border-color: #bbb;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  margin: 5px;
  padding: 0;
}
.yd-grids-txt-activate {
  background-color: red;
} */
.yd-tab-panel {
  margin-top: 10px;
}
.yd-tab-nav-nomal {
  border-color: #bbb;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}
</style>
