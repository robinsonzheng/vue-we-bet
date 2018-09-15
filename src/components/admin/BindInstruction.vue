<template>
    <div class="content">
        <div class="holder">
            <div class="title"><p class="desc">设备绑定说明</p></div>
            <p class="desc">1.一台设备仅支持绑定一个管理员账号，该账号可维护该设备。</p>
            <p class="desc">2.若您没有管理员账号，稍后可注册管理员账号，注册后的管理员账号会直接与该设备进行绑定。</p>
            <p class="desc">3.若您已拥有管理员账号，则稍后可与该设备绑定。</p>
            <p><yd-button type="hollow" style="width:80px;height:35px;margin-top:20px;"  @click.native="okClick">我知道了</yd-button></p>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    okClick() {
      this.$router.replace("/bind");
    }
  }
};
</script>


<style scoped>
.content {
  padding: 30px;
}
.content .desc {
  text-align: left;
  padding: 10px;
  font-size: .35rem;
}
.content .title {
  text-align: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #bbb;
}
.content .title p {
  text-align: center;
}
.content .holder {
  margin-top: 50px;
  border-style: solid;
  border-width: 1px;
  border-color: #bbb;
  padding-bottom: 40px;
}
</style>