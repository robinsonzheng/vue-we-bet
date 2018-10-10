<template>
    <div class="content">
        <yd-cell-group style="margin:0px">
            <yd-cell-item arrow>
                <span slot="left">修改地址:</span>
                <input slot="right" type="text" @click.stop="show = true" v-model="location" readonly placeholder="请选择区域">
            </yd-cell-item>            
            <yd-cell-item>
                <yd-textarea slot="right" v-model="detail" placeholder="请输入详细街道、门牌号等" maxlength="100" 
                  style="border-color:#888;border-style:solid;border-width:1px;padding:10px;">
                </yd-textarea>
            </yd-cell-item>
            <yd-cityselect v-model="show" :callback="getResult" :items="district"></yd-cityselect>     
        </yd-cell-group>                
        <div class="center-holder">
            <yd-button type="hollow" @click.native="okClick">保存</yd-button>
            <yd-button type="hollow" @click.native="cancelClick">取消</yd-button>                     
        </div>
    </div>
</template>

<script>
import District from "ydui-district/dist/jd_province_city_area_id";
export default {
  data() {
    return {
      show: false,
      location: "",
      detail: "",
      district: District
    };
  },
  methods: {
    okClick() {
      var self = this;

      if (!this.location) {
        this.$dialog.showErrToast("请选择区域");
        return;
      }
      if (!this.detail) {
        this.$dialog.showErrToast("请输入详细地址");
        return;
      }

      this.$dialog.loading.open("更新中...");
      this.$ajax
        .post(process.env.SERVER_HOST, {
          apiCode: 110706,
          content: {
            token: self.$store.state.managerToken,
            address: self.location + " " + self.detail
          },
          token: self.$store.state.apiToken,
          terminalNo: self.$store.state.terminalNo
        })
        .then(res => {
          self.$dialog.loading.close();
          if (res.data.resCode == 0) {
            //成功
            self.$dialog.showOkToast("修改成功", null, () => {
              self.$router.replace("/location");
            });
          } else if (
            res.data.resCode == "23001" ||
            res.data.resCode == "000802"
          ) {
            // 管理员未登录
            self.$router.push({
              name: "Login",
              params: { redirect_path: "/newlocation" }
            });
          } else {
            //失败，显示错误页面
            self.$dialog.alert({ mes: res.data.resMsg });
          }
        })
        .catch(err => {
          //异常
          self.$dialog.loading.close();
          self.$dialog.alert({ mes: "出错了,请检查网络~" });
        });
    },
    cancelClick() {
      this.$router.go(-1);
    },
    getResult(ret) {
      this.location = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
    }
  }
};
</script>

<style scoped>
</style>