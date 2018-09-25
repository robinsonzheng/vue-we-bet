<template>
    <div class="content">
        <yd-cell-group style="margin:0px">
            <yd-cell-item>
                <span slot="left">原始密码:</span>
                <yd-input slot="right" v-model="oldPwd" ref="oldPwd" required type="password" placeholder="" />
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">新密码:</span>
                <yd-input slot="right" v-model="pwd" ref="pwd" regex="^[\w]{6,15}$" required type="password" placeholder="至少6位,仅支持数字、字母、下划线" />
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">确认新密码:</span>
                <yd-input slot="right" v-model="pwdConfirm" ref="pwdConfirm" regex="^[\w]{6,15}$" required type="password" placeholder="" />
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
      verifyCode: "",
      oldPwd: "",
      pwd: "",
      pwdConfirm: "",
      userName: ""
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.userName = this.$route.params.userName;
    },
    okClick() {
      var self = this;
      //验证原始密码
      if (this.oldPwd == "") {
        this.$dialog.showErrToast("请输入原始密码");
        return;
      }
      //验证密码
      if (this.pwd == "") {
        this.$dialog.showErrToast("请输入新密码");
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
      this.$dialog.loading.open("载入中...");
      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110203,
          content: {
            username: self.userName,
            oldPwd: self.oldPwd,
            newPwd: self.pwd,
            code: self.verifyCode,
            token: self.$store.state.managerToken
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == "0") {
            //成功
            self.$dialog.showOkToast("修改成功", null, () => {
              self.$router.replace("/system");
            });
          } else {
            //失败，显示错误页面
            self.$dialog.showErrToast(res.data.resMsg);
          }
        })
        .catch(err => {
          //异常
          self.$dialog.loading.close();
          self.$dialog.showErrToast("出错了,请检查网络~");
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