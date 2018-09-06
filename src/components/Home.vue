<template>
	<div>
      <yd-button-group>                     
        <yd-button size="large" type="danger" @click.native="scanClick">扫码</yd-button>
        <yd-button size="large" type="primary" @click.native="helpClick">帮助</yd-button>
      </yd-button-group>
	</div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
    console.log("created");

    // 获取openid
    var url =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1578db3d1b70d661&redirect_uri=http%3A%2F%2Fdev.joylott.net%2Fjkp%2Fgw%2FgetOpenId&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    // this.$root.$wxajax
    //   .get(process.env.WX_API_GET_OPENID)
    //   .then(function(res) {
    //     console.log(res);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    this.$root.$wxajax
      .get(url)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    scanClick() {
      this.$router.push("/scan");
    },
    helpClick() {
      this.$router.push("/help");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
