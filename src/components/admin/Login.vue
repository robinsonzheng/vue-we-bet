<template>
    <div class="content">
        <yd-cell-group>
          <yd-cell-item>
                <span slot="left">用户名:</span>
                <yd-input slot="right" v-model="userName" ref="userName" required placeholder="" />
            </yd-cell-item> 
            <yd-cell-item>
                <span slot="left">密码:</span>
                <yd-input slot="right" v-model="pwd" ref="pwd" regex="^[\w]{6,15}$" required type="password" placeholder="" />
            </yd-cell-item>                
        </yd-cell-group>                
        <div class="center-holder">
            <yd-button type="hollow" @click.native="okClick">登录</yd-button>
            <yd-button type="hollow" @click.native="cancelClick">取消</yd-button>                     
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      pwd: ""
    };
  },
  methods: {
    okClick() {
      var self = this;

      if (this.userName === "") {
        this.$dialog.alert({ mes: "请输入用户名" });
        this.$refs.userName.setFocus();
        return;
      }

      //验证密码
      if (this.pwd === "") {
        this.$dialog.alert({ mes: "请输入密码" });
        this.$refs.pwd.setFocus();
        return;
      }

      //管理员登录
      this.$dialog.loading.open("登录中...");
      this.$ajax
        .post("/api", {
          apiCode: 110201,
          content: {
            username: this.userName, //TODO:使用接口返回的管理员用户名
            password: this.pwd
          }
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == 0) {
            //登录成功
            //更新管理员信息
            debugger;
            self.$store.commit("updateManagerToken", res.token);
            self.$store.commit("updateManagerId", res.managerId);

            self.$dialog.toast({
              mes: "登录成功",
              icon: "success",
              timeout: 1000
            });

            //登录成功后跳转到系统设置页面
            self.$router.replace("/system");

          } else {
            //失败
            self.$dialog.alert({ mes: "登录失败，请检查用户名、密码" });
          }
        })
        .catch(err => {
          //失败
          self.$dialog.loading.close();
          self.$dialog.alert({ mes: err });
        });
    },
    cancelClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>