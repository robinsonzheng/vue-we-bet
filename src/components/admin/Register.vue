<template>
    <div class="content">
        <yd-cell-group style="margin:0px">
            <yd-cell-item>
                <span slot="left">姓名:</span>
                <yd-input slot="right" v-model="name" ref="name" regex="^.{1,18}$" required placeholder="请输入姓名" />
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号:</span>
                <yd-input slot="right" v-model="mobile" ref="mobile" regex="mobile" required placeholder="请输入手机号" />
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">设置密码:</span>
                <yd-input slot="right" v-model="pwd" ref="pwd" regex="^[\w]{6,15}$" required type="password" placeholder="至少6位,仅支持数字、字母、下划线" />
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
            <yd-button type="hollow" @click.native="okClick">注册</yd-button>
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
      name: "",
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
        this.$dialog.showErrToast("请输入手机号码");
        return;
      }
      if (!reg.test(this.mobile)) {
        this.$dialog.showErrToast("手机格式不正确");
        return;
      }

      this.$dialog.loading.open("发送中...");
      var self = this;
      setTimeout(() => {
        this.start = true;
        //发送验证码
        this.$ajax
          .post("/api", {
            apiCode: 110204,
            content: {
              mobile: self.mobile,
              type: "SMS_JKP"
            },
            token: self.$store.state.apiToken,
            terminalNo: self.$store.state.terminalNo
          })
          .then(res => {
            this.$dialog.loading.close();
            this.$dialog.showOkToast("已发送");
          })
          .catch(err => {
            this.$dialog.loading.close();
          });
      }, 1000);
    },
    okClick() {
      var self = this;
      //验证姓名
      if (this.name === "") {
        this.$dialog.showErrToast("请输入姓名");
        return;
      }

      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.mobile == "") {
        this.$dialog.showErrToast("请输入手机号码");
        return;
      } else if (!reg.test(this.mobile)) {
        this.$dialog.showErrToast("手机格式不正确");
        return;
      }

      //验证验证码
      if (this.verifyCode === "") {
        this.$dialog.showErrToast("请输入验证码");
        return;
      }
      //验证密码
      if (this.pwd === "") {
        this.$dialog.showErrToast("请输入密码");
        return;
      }
      var reg = /^[\w]{6,15}$/;
      if (!reg.test(this.pwd)) {
        this.$dialog.showErrToast("密码至少6位,只支持数字、字母、下划线");
        return;
      }

      //注册
      this.$dialog.loading.open("注册中...");
      this.$ajax
        .post("/api", {
          apiCode: 110205,
          content: {
            serialCode: self.$store.state.serialCode, //设备序列号
            username: this.mobile,
            realname: this.name,
            password: this.pwd,
            code: this.verifyCode
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == 0) {
            //注册成功
            self.$dialog.showOkToast("注册成功");
            // setTimeout(() => {
            //   //绑定管理员
            //   self.$dialog.loading.open("绑定管理员...");
            //   self.$ajax
            //     .post("/api", {
            //       apiCode: 110207,
            //       content: {
            //         serialCode: self.$store.state.serialCode, //设备序列号
            //         username: this.mobile,
            //         password: this.pwd,
            //         code: this.verifyCode
            //       },
            //       token: self.$store.state.apiToken,
            //       terminalNo: self.$store.state.terminalNo
            //     })
            //     .then(res => {
            //       self.$dialog.loading.close();
            //       if (res.data.resCode == 0) {
            //         //更新管理员信息
            //         self.$store.commit("updateToken", res.data.token);
            //         self.$store.commit("updateManagerId", res.data.managerId);

            //         setTimeout(() => {
            //           self.$router.go(-1);
            //         }, 1000);
            //       } else {
            //         this.$dialog.showErrToast(res.data.resMsg);
            //         self.$router.replace("bindamin"); //跳到绑定页面
            //       }
            //     })
            //     .catch(err => {
            //       console.log(err);
            //       self.$dialog.toast({
            //         mes: "网络不给力~",
            //         icon: "error",
            //         timeout: 2000
            //       });
            //     });
            // }, 1000);

            //跳转到系统设置页面
            setTimeout(() => {
              self.$router.replace("/system");
            }, 3000);
          } else {
            //失败
            self.$dialog.toast({
              mes: res.data.resMsg,
              icon: "error",
              timeout: 2000
            });
          }
        })
        .catch(err => {
          //失败
          self.$dialog.loading.close();
          self.$dialog.toast({
            mes: "网络不给力~",
            icon: "error",
            timeout: 2000
          });
        });
    },
    cancelClick() {
      this.$router.replace("/order");
    }
  }
};
</script>

<style scoped>
</style>