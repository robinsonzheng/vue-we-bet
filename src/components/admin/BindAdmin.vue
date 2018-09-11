<template>
    <div class="content">
        <yd-cell-group style="margin:0px">
            <yd-cell-item>
                <span slot="left">手机号:</span>
                <yd-input slot="right" v-model="mobile" ref="mobile" regex="mobile" required placeholder="请输入手机号" />
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">密码:</span>
                <yd-input slot="right" v-model="pwd" ref="pwd" regex="^[\w]{6,15}$" required type="password" placeholder="请输入密码" />
            </yd-cell-item>  
            <yd-cell-item>
                <span slot="left">验证码:</span>
                <yd-input slot="right" v-model="verifyCode" ref="verifyCode" required placeholder="请输入验证码" />
                <yd-sendcode slot="right" v-model="start"
                    storage-key="verifyCode"
                    @click.native="sendVerifyCode"
                    type="hollow"
                    init-str="获取验证码"></yd-sendcode>
            </yd-cell-item>        
        </yd-cell-group>                
        <div class="center-holder">
            <yd-button type="hollow" @click.native="okClick">确认绑定</yd-button>
            <yd-button type="hollow" @click.native="cancelClick">取消</yd-button>                     
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      start: false,
      mobile: "",
      verifyCode: "",
      pwd: "",
      pwdConfirm: "",
      verifyCodeReceived: ""
    };
  },
  methods: {
    sendVerifyCode() {
      //调用发送验证码api
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.mobile == "") {
        this.$dialog.toast({
          mes: "请输入手机号码",
          icon: "error",
          timeout: 1000
        });
        this.$refs.mobile.setFocus();
      } else if (!reg.test(this.mobile)) {
        this.$dialog.toast({
          mes: "手机格式不正确",
          icon: "error",
          timeout: 1000
        });
        this.$refs.mobile.setFocus();
      } else {

        this.$api.sendVerifyCode();
        
        // this.$dialog.loading.open("发送中...");
        // var self = this;
        // setTimeout(() => {
        //   this.start = true;
        //   //发送验证码
        //   this.$ajax
        //     .post("/api", {
        //       apiCode: 110204,
        //       content: {
        //         mobile: self.mobile,
        //         type: "SMS_JKP"
        //       }
        //     })
        //     .then(res => {
        //       this.$dialog.loading.close();
        //       this.$dialog.toast({
        //         mes: "已发送",
        //         icon: "success",
        //         timeout: 1000
        //       });
        //     })
        //     .catch(err => {
        //       this.$dialog.loading.close();
        //     });
        // }, 1000);


      }
    },
    okClick() {
      var self = this;
      //验证验证码
      if (this.verifyCode === "") {
        this.$dialog.alert({ mes: "请输入验证码" });
        this.$refs.verifyCode.setFocus();
        return;
      }
      //验证密码
      if (this.pwd === "") {
        this.$dialog.alert({ mes: "请输入密码" });
        this.$refs.pwd.setFocus();
        return;
      }

      //绑定管理员
      self.$dialog.loading.open("绑定管理员...");

      self.$ajax
        .post("/api", {
          apiCode: 110207,
          content: {
            serialCode: 0, //TODO：设备序列号
            username: this.mobile,
            password: this.pwd,
            code: this.verifyCode
          }
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.resCode === 0) {
            //更新管理员信息
            self.$store.commit("updateToken", res.token);
            self.$store.commit("updateManagerId", res.managerId);

            self.$dialog.toast({
              mes: "绑定成功",
              icon: "success",
              timeout: 1000
            });
            setTimeout(() => {
              self.$router.go(-1);
            }, 1000);
          } else {
            self.$dialog.toast({
              mes: "绑定失败，请重试",
              icon: "error",
              timeout: 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
          self.$dialog.loading.close();
          self.$dialog.alert({ mes: "绑定失败，请重试" });
          //TODO:获取错误代码并作相应处理
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