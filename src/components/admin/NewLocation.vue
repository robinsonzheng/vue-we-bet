<template>
    <div class="content">
        <yd-cell-group style="margin:0px">
            <yd-cell-item arrow>
                <span slot="left">修改地址:</span>
                <input slot="right" type="text" @click.stop="show = true" v-model="location" readonly placeholder="请选择区域">
            </yd-cell-item>            
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入详细街道、门牌号等" maxlength="100" 
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
      district: District
    };
  },
  methods: {
    okClick() {},
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