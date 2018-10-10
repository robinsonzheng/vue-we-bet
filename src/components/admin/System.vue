<template>
    <yd-grids-group :rows="3">
        <yd-grids-item @click.native="logoUnlockClick">
            <img slot="icon" :src="logoUnlock">
            <span slot="text">设备开锁</span>
        </yd-grids-item>
        <yd-grids-item @click.native="logoStarClick">
            <img slot="icon" :src="logoStar">
            <span slot="text">修改密码</span>
        </yd-grids-item>
        <yd-grids-item @click.native="logoLocationClick">
            <img slot="icon" :src="logoLocation">
            <span slot="text">设备地址</span>
        </yd-grids-item>
        <yd-grids-item @click.native="logoStockClick">
            <img slot="icon" :src="logoStock">
            <span slot="text">库存信息</span>
        </yd-grids-item>
    </yd-grids-group>
</template>

<script>
export default {
  data() {
    return {
      logoUnlock: require("../../assets/unlock.png"),
      logoStar: require("../../assets/star.png"),
      logoLocation: require("../../assets/location.png"),
      logoStock: require("../../assets/stock.png"),
      intervalId: null
    };
  },
  created() {
    // if (!this.$store.state.managerToken) {
    //   this.$router.push({
    //     name: "Login",
    //     params: { redirect_path: "/system" }
    //   });
    // }
  },
  methods: {
    logoUnlockClick(event) {
      var self = this;
      this.$dialog.confirm({
        mes: "是否确定开锁？",
        opts: () => {
          self.$dialog.loading.open("开锁中...");
          self.$ajax
            .post(process.env.SERVER_HOST, {
              apiCode: 110704,
              content: {
                serialCode: self.$store.state.serialCode, //设备序列号
                managerId: self.$store.state.managerId,
                token: self.$store.state.managerToken
              },
              token: self.$store.state.apiToken,
              terminalNo: self.$store.state.terminalNo
            })
            .then(res => {
              // self.$dialog.loading.close();
              if (res.data.resCode == 0) {
                //成功发送开锁请求
                // self.$dialog.loading.open("开锁中...");
                self.intervalId = setInterval(function() {
                  console.log("setInterval-Beg");
                  self.queryDeviceStatus(res.data.content.applyId);
                  console.log("setInterval-End");
                }, 1000);
              } else {
                self.$dialog.loading.close();
                self.$dialog.alert({
                  mes: res.data.resMsg
                });
              }
            })
            .catch(err => {
              // debugger;
              self.$dialog.loading.close();
              self.$dialog.alert({ mes: "网络不给力~" });
            });
        }
      });
    },
    async queryDeviceStatus(applyIdParam) {
      //查询设备开启状态
      var self = this;
      // debugger;
      console.log("queryDeviceStatus-Beg");
      await this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110707,
          content: {
            applyId: applyIdParam
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          // debugger;
          if (res.data.resCode == 0) {
            //成功发送开锁请求
            if (res.data.content.status == 0) {
              //开锁成功
              console.log("queryDeviceStatus-Opened");
              self.$dialog.loading.close();
              window.clearInterval(self.intervalId);
              self.$dialog.alert({
                mes: "设备门已打开，请记得及时关好设备门哦！"
              });
              return true;
            } else if (res.data.content.status == 1) {
              //开锁失败
              console.log("queryDeviceStatus-Failed to open");
              self.$dialog.loading.close();
              window.clearInterval(self.intervalId);
              self.$dialog.alert({ mes: "开锁失败,请稍后重试~" });
              return true;
            } else if (res.data.content.status == 3) {
              self.$dialog.loading.close();
              window.clearInterval(self.intervalId);
              self.$dialog.alert({
                mes: "设备锁门已开,请先关好门"
              });
              return true;
            } else {
              //开锁中或者待开锁，继续等待
              console.log("继续等待");
              return true;
            }
          } else {
            console.log("queryDeviceStatus-Failed");
            self.$dialog.loading.close();
            self.$dialog.alert({
              mes: res.data.resMsg
            });
            return true;
          }
        })
        .catch(err => {
          console.log("queryDeviceStatus-Exception");
          debugger;
          self.$dialog.loading.close();
          self.$dialog.alert({ mes: "网络不给力~" });
          return true;
        });
    },
    logoStarClick(event) {
      //修改密码
      console.log("userName:", this.$store.state.managerUserName);
      this.$router.push({
        name: "ResetPwd",
        params: { userName: this.$store.state.managerUserName }
      });
    },
    logoLocationClick(event) {
      //设备地址
      this.$router.push("/location");
    },
    logoStockClick(event) {
      //库存信息
      this.$router.push("/stock");
    }
  }
};
</script>

<style>
.yd-grids-txt {
  border-style: none;
}
</style>
