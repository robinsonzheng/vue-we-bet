<template>
    <div class="content">
        <yd-cell-group style="margin:0px">
            <yd-cell-item>
                <span slot="left">手机号:</span>
                <yd-input slot="right" v-model="mobile" ref="mobile" regex="mobile" required placeholder="请输入手机号" />
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
            <yd-cell-item>
                <span slot="left">新密码:</span>
                <yd-input slot="right" v-model="pwd" ref="pwd" regex="^[\w]{6,15}$" required type="password" placeholder="至少6位,仅支持数字、字母、下划线" />
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">确认新密码:</span>
                <yd-input slot="right" v-model="pwdConfirm" ref="pwdConfirm" regex="^[\w]{6,15}$" required type="password" placeholder="请再次输入新密码" />
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
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (this.mobile == "") {
        this.$dialog.showErrToast("请输入手机号码");
      } else if (!reg.test(this.mobile)) {
        this.$dialog.showErrToast("手机格式不正确");
      } else {
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
              }
            })
            .then(res => {
              this.$dialog.loading.close();
              this.$dialog.toast({
                mes: "已发送",
                icon: "success",
                timeout: 1000
              });
            })
            .catch(err => {
              this.$dialog.loading.close();
            });
        }, 1000);
      }
    },
    okClick() {
      var self = this;
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

      //密码与密码确认是否一致
      if (this.pwd != this.pwdConfirm) {
        this.$dialog.showErrToast("两次输入的密码不一致");
        return;
      }

      var reg = /^[\w]{6,15}$/;
      if (!reg.test(this.pwd)) {
        this.$dialog.showErrToast("密码至少6位,只支持数字、字母、下划线");
        return;
      }

      //修改密码
      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110203,
          content: {
            username: this.mobile,
            newPwd: this.pwd,
            code: this.verifyCode
          }
        })
        .then(res => {
          if (res.data.resCode === 0) {
            //修改成功
            self.$dialog.toast({
              mes: "修改成功",
              icon: "success",
              timeout: 1000
            });
            setTimeout(() => {
              self.$router.go(-1);
            }, 1000);
          } else {
            //失败
            self.$dialog.alert({ mes: "修改失败，" + res.data.resMsg });
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
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
}
.content .center-holder {
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex;
}
.content .center-holder .yd-btn {
  width: 60px;
  margin: 10px;
}
</style>