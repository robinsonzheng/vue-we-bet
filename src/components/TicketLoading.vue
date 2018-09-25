<template>
    <!-- 错误页面 -->
    <div v-if="error" class="error">
        <div>                  
        </div>          
        <div class="error-content">
        <div><span>{{ error.msg }}</span></div>      
        <div><yd-button type="hollow" @click.native="fetchStatus(this)">刷新</yd-button></div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      timeStart: new Date(),
      error: null
    };
  },
  methods: {
    fetchStatus(self) {
      try {
        if (!self) {
          self = this;
        }
        var orderNo = self.$store.state.orderNo;
        self.error = null;
        self.$ajax
          .post(process.env.SERVER_HOST, {
            apiCode: 110402,
            content: {
              orderNo: orderNo
            },
            token: self.$store.state.apiToken,
            terminalNo: self.$store.state.terminalNo
          })
          .then(res => {
            if (res.data.resCode == 0) {
              if (res.data.content.orderStatus == 0) {
                //待出票，等待5秒后继续查询
                //TODO:确认一下是否有超时的限制
                // var timeNow = new Date();
                // if (timeNow - this.timeStart > 10000) {
                //   //超时
                //   self.$dialog.loading.close();
                //   self.$router.replace({ path: "/ticketerr" });
                // }
                setTimeout(() => {
                  self.fetchStatus(self);
                }, 5000);
              } else if (res.data.content.orderStatus == 3) {
                //出票成功
                //转到出票页面
                self.$store.commit("updateOrderNo", "");
                self.$dialog.loading.close();
                self.$router.replace({ path: "/ticket" });
              } else {
                //出票失败,转到出票错误页面
                self.$store.commit("updateOrderNo", "");
                self.$dialog.loading.close();
                self.$router.replace({ path: "/ticketerr" });
              }
            } else {
              //查询异常
              self.$dialog.loading.close();
              self.error = { msg: res.data.resMsg };
            }
          })
          .catch(err => {
            // self.$store.commit("updateOrderNo", "");
            self.$dialog.loading.close();
            // self.$router.replace({ path: "/ticketerr" });
            self.error = { msg: "出错了~" };
          });
      } catch (err) {
        self.$dialog.loading.close();
        self.error = { msg: "出错了~" };
      }
    }
  },
  created() {
    // this.$store.commit("updateOrderNo", "SJK1000000000180919135644111");
    this.$dialog.loading.open("出票中...");
    this.timeStart = new Date();
    this.fetchStatus(this);
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchStatus"
  }
};
</script>
