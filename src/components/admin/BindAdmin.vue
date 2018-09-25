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
          .post(process.env.SERVER_HOST, {
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

      //绑定管理员
      self.$dialog.loading.open("绑定管理员...");

      self.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110207,
          content: {
            serialCode: self.$store.state.serialCode, //设备序列号
            username: this.mobile,
            password: this.pwd,
            code: this.verifyCode
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.resCode === 0) {
            //更新管理员信息
            self.$store.commit("updateToken", res.token);
            self.$store.commit("updateManagerId", res.managerId);

            this.$dialog.showOkToast("绑定成功");
            setTimeout(() => {
              self.$router.replace("/system"); //跳转到系统设置页面
            }, 1000);
          } else {
            this.$dialog.showErrToast(res.data.resMsg);
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