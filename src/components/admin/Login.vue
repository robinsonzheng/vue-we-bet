<template>
    <div class="content">
        <yd-cell-group style="margin:0px">
            <yd-cell-item>
                <span slot="left">请输入管理员密码:</span>
                <yd-input slot="right" v-model="pwd" ref="pwd" regex="^[\w]{6,15}$" required type="password" placeholder="密码" />
            </yd-cell-item>                
        </yd-cell-group>                
        <div class="center-holder">
            <yd-button type="hollow" @click.native="okClick">确定</yd-button>
            <yd-button type="hollow" @click.native="cancelClick">取消</yd-button>                     
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pwd: ""
    };
  },
  methods: {
    okClick() {
      var self = this;
      //验证密码
      if (this.pwd === "") {
        this.$dialog.alert({ mes: "请输入密码" });
        this.$refs.pwd.setFocus();
        return;
      }

      //管理员登录
      this.$ajax
        .post("/api", {
          apiCode: 110201,
          content: {
            username: this.$router.params.username,
            password: this.pwd
          }
        })
        .then(res => {
          if (res.resCode === 0) {
            //登录成功
            //更新管理员信息
            self.$store.commit("updateToken", res.token);
            self.$store.commit("updateManagerId", res.managerId);

            self.$dialog.toast({
              mes: "登录成功",
              icon: "success",
              timeout: 1000
            });

            //TODO：登录成功后跳转到


          } else {
            //失败
            self.$dialog.alert({ mes: "登录失败，请重试" });
          }
        })
        .catch(err => {
          //失败
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