<template>
    <div class="page-wrapper">
      <div class="content" v-if="error==null">
          <yd-cell-group style="margin-top:20px;margin-bottom:40px;">
              <yd-cell-item>
                  <span slot="left">设备地址:</span>
                  <span slot="left" style="margin-left:.28rem">{{address}}</span>
              </yd-cell-item>         
          </yd-cell-group>                
          <div class="center-holder">
            <router-link to="/newlocation" replace>
              <yd-button type="hollow">修改地址</yd-button>
            </router-link>
              <yd-button type="hollow" @click.native="cancelClick">返回</yd-button>                     
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

<script>
export default {
  data() {
    return {
      error: {},
      address: ""
    };
  },
  created() {
    // 获取数据
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    cancelClick() {
      this.$router.go(-1);
    },
    fetchData() {
      var self = this;
      this.error = null;
      this.$dialog.loading.open("载入中...");
      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110705,
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
            self.address = res.data.content.address;
          } else if (res.data.resCode == "23001" || res.data.resCode == "000802") {
            // TODO:管理员未登录
            self.$router.push({
              name: "Login",
              params: { redirect_path: "/location" }
            });
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
          // self.$dialog.showErrToast("出错了,请检查网络~");
          self.error = { msg: "出错了,请检查网络~" };
        });
    }
  }
};
</script>

<style scoped>
</style>