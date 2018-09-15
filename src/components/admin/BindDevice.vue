<!-- 注册或绑定管理员 -->
<template>
    <div class="content">
        <div class="holder">                        
            <p>
              <yd-button type="hollow" style="width:200px;height:50px;margin-top:40px;"  @click.native="okRegisterClick">
                <span>没有账号, 点我注册</span>
              </yd-button>
            </p>
            <p>
              <yd-button type="hollow" style="width:200px;height:50px;margin-top:40px;"  @click.native="okBindClick">
                <span>已有账号, 点我绑定</span>
              </yd-button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    okRegisterClick(event) {
      this.$router.replace("/register");
    },
    okBindClick(event) {
      this.$router.replace("/bindadmin");
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
  font-size: .5rem;
}
/* .content .title {
  text-align: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #bbb;
}
.content .title p {
  text-align: center;
} */
.content .holder {
  margin-top: 50px;
  /* border-style: solid;
  border-width: 1px;
  border-color: #bbb; */
  padding-bottom: 40px;
}
</style>