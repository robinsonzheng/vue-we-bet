<template>
    <div class="content">
        <yd-cell-group style="margin:0px">
            <yd-cell-item>
                <span slot="left">原始密码:</span>
                <yd-input slot="right" v-model="oldPwd" ref="oldPwd" regex="^[\w]{6,15}$" required type="password" placeholder="请输入原始密码" />
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
    okClick() {
      var self = this;
      //验证原始密码
      if (this.oldPwd === "") {
        this.$dialog.alert({ mes: "请输入原始密码" });
        this.$refs.oldPwd.setFocus();
        return;
      }
      //验证密码
      if (this.pwd === "") {
        this.$dialog.alert({ mes: "请输入密码" });
        this.$refs.pwd.setFocus();
        return;
      }

      //密码与密码确认是否一致
      if (this.pwd != this.pwdConfirm) {
        this.$dialog.alert({ mes: "两次输入的密码不一致" });
        this.$refs.pwdConfirm.setFocus();
        return;
      }

      var reg = /^[\w]{6,15}$/;
      if (!reg.test(this.pwd)) {
        this.$dialog.alert({ mes: "密码至少6位,只支持数字、字母、下划线" });
        this.$refs.pwd.setFocus();
        return;
      }

      //修改密码
      this.$ajax
        .post("/api", {
          apiCode: 110203,
          content: {
            username: this.mobile,
            newPwd: this.pwd,
            code: this.verifyCode
          }
        })
        .then(res => {
          if (res.resCode === 0) {
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
            self.$dialog.alert({ mes: "修改失败" });
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