<template>    
  <div class="page-wrapper">
      <div class="content" v-if="error==null">            
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
          <div class="center-holder">
              <span slot="left">最后变更时间:</span>
              <span slot="right">{{post.lastModifiedTime}}</span>
          </div>
          <div class="center-holder">
              <yd-button type="hollow" @click.native="okClick">编辑库存</yd-button>
              <yd-button type="hollow" @click.native="cancelClick">取消</yd-button>                     
          </div>
      </div>

      <!-- 错误页面 -->
      <div v-if="error" class="error">
          <div>                  
          </div>          
          <div class="error-content">
            <div><span>{{ error.msg }}</span></div>      
            <div><yd-button type="hollow" @click.native="fetchData">刷新</yd-button></div>
          </div>
      </div>
  </div>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      post: {},
      error: {}
    };
  },
  created() {
    // 组件创建完后
    let ticketInfo = this.$store.state.ticketInfo;
    if (ticketInfo && ticketInfo.ticketId) {
      // 获取数据
      // 此时 data 已经被 observed 了
      this.fetchData(ticketInfo);
    } else {
      this.$router.replace("/order");
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData"
  },
  methods: {
    fetchData(ticketInfo) {
      var self = this;
      this.error = null;
      this.$dialog.loading.open("载入中...");

      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110701,
          content: {
            houseId: ticketInfo.houseId,
            token: self.$store.state.managerToken
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == 0) {
            //成功
            self.$set(self.post, "ticketId", ticketInfo.ticketId);
            self.$set(self.post, "houseId", ticketInfo.houseId);
            self.$set(self.post, "ticketName", ticketInfo.ticketName);
            self.$set(self.post, "money", ticketInfo.money);
            self.$set(self.post, "frontIcon", ticketInfo.frontIcon);

            if (
              res.data.content.warehouseInfo &&
              res.data.content.warehouseInfo.length
            ) {
              let warehouseInfo = res.data.content.warehouseInfo[0];
              self.$set(self.post, "inventory", warehouseInfo.amount);
              var d = new Date(warehouseInfo.lastUpdate);
              self.$set(
                self.post,
                "lastModifiedTime",
                self.$util.formatDate(d)
              );
            }
          } else if (
            res.data.resCode == "23001" ||
            res.data.resCode == "000802"
          ) {
            // 管理员未登录
            self.$router.push({
              name: "Login",
              params: { redirect_path: "/stock" }
            });
            // alert(res.data.resMsg);
          } else {
            //失败，显示错误页面
            self.error = {
              msg: res.data.resMsg
            };
          }
        })
        .catch(err => {
          //异常
          self.$dialog.loading.close();
          self.error = { msg: "出错了,请检查网络~" };
        });
    },
    okClick() {
      this.$router.replace({
        name: "EditStock",
        params: {
          ticketId: this.post.ticketId,
          houseId: this.post.houseId,
          ticketName: this.post.ticketName,
          money: this.post.money,
          inventory: this.post.inventory,
          frontIcon: this.post.frontIcon
        }
      });
    },
    cancelClick() {
      this.$router.replace("/system");
    }
  }
};
</script>
