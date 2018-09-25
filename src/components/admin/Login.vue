<template>
    <div class="content">
        <yd-cell-group>
          <yd-cell-item>
                <span slot="left">用户名:</span>
                <yd-input slot="right" v-model="userName" ref="userName" required placeholder="" />
            </yd-cell-item> 
            <yd-cell-item>
                <span slot="left">密码:</span>
                <yd-input slot="right" v-model="pwd" ref="pwd" required type="password" :show-success-icon="false" :show-error-icon="false" placeholder="" />
            </yd-cell-item>                
        </yd-cell-group>  
        <div class="flex-right">
          <router-link :to="'/findpwd'">
            <a href="#">忘记密码?</a>
          </router-link>
        </div> 
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
  created() {
    console.log("redirect_path", this.$route.params);
  },
  methods: {
    okClick() {
      var self = this;

      if (this.userName === "") {
        this.$dialog.showErrToast("请输入用户名");
        return;
      }

      //验证密码
      if (this.pwd === "") {
        this.$dialog.showErrToast("请输入密码");
        return;
      }

      //管理员登录
      this.$dialog.loading.open("登录中...");
      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110201,
          content: {
            username: this.userName,
            password: this.pwd
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == 0) {
            //登录成功
            //更新管理员信息
            self.$store.commit("updateManagerToken", res.data.content.token);
            self.$store.commit("updateManagerId", res.data.content.managerId);
            self.$store.commit("updateManagerUserName", self.userName);

            self.$dialog.showOkToast("登录成功", null, () => {
              //登录成功后跳转
              if (self.$route.params && self.$route.params.redirect_path) {
                self.$router.push({
                  path: self.$route.params.redirect_path,
                  params: self.$route.params.redirect_params
                });
              } else {
                self.$router.push("/order");
              }
            });
          } else if (res.data.resCode == "21002") {
            self.$dialog.alert({ mes: res.data.resMsg });
          } else {
            //失败
            self.$dialog.alert({ mes: "出错了~" });
          }
        })
        .catch(err => {
          //失败
          self.$dialog.loading.close();
          self.$dialog.alert({ mes: err });
        });
    },
    cancelClick() {
      if (this.$store.state.managerToken) {
        this.$router.go(-1);
      } else {
        this.$router.replace("/order");
      }
    }
  }
};
</script>

<style scoped>
.flex-right{
  justify-content: flex-end; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex;
}
a {
  /* color: rgb(51, 153, 255); */
  color: rgb(0, 102, 255);
}
</style>