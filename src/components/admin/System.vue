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
      logoStock: require("../../assets/stock.png")
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
              self.$dialog.loading.close();
              if (res.data.resCode == 0) {
                //开锁成功
                setTimeout(() => {
                  self.$dialog.alert({
                    mes: "设备门已打开，请记得及时关好设备门哦！"
                  });
                }, 2000);
              } else {
                self.$dialog.alert({
                  mes: res.data.resMsg
                });
              }
            })
            .catch(err => {
              self.$dialog.loading.close();
              self.$dialog.alert({ mes: "网络不给力~" });
            });
        }
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
