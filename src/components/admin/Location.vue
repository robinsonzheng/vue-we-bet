<template>
    <div class="content">
        <yd-cell-group style="margin-top:20px;margin-bottom:40px;">
            <yd-cell-item>
                <span slot="left">设备地址:</span>
                <span slot="right">{{location}}</span>
            </yd-cell-item>         
        </yd-cell-group>                
        <div class="center-holder">
          <router-link to="/newlocation" replace>
            <yd-button type="hollow" @click.native="okClick">修改地址</yd-button>
          </router-link>
            <yd-button type="hollow" @click.native="cancelClick">返回</yd-button>                     
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {location:""};
  },
  methods: {
    okClick() {},
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