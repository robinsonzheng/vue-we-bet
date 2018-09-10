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
    console.log("home page created");
  },
  mounted() {
    console.log("home page mounted");
    // debugger;
    console.log(this.$api);
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
