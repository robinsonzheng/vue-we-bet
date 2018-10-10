<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      ready: false
    };
  },
  methods: {},
  created() {
    var serialCode = this.$util.getParamVal(
      window.location.search,
      "serialCode"
    );
    console.log("serialCode=", serialCode);
    if (serialCode) {
      this.$store.commit("updateSerialCode", serialCode);
    }
  }
};
</script>

<style>
html {
  font-size: 55px;
}
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  background-color: transparent;
  height: 100%;
  /* font-size: 0.28rem; */
  color: #555;
}
.content {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 10px;
}
.content .center-holder {
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex;
  margin-top: 10px;
  padding-top: 0;
}
.content .center-holder .yd-btn {
  width: 50px;
  margin: 10px;
  border-radius: 5px;
}
.page-wrapper {
  width: 100%;
  height: 100%;
}
.error {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  flex-direction: column;
}
.error div {
  flex: 1;
}
.error .error-content {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  /* align-items: flex-start; */
  flex-wrap: wrap;
}
.error .error-content div {
  flex-basis: 100%;
}
.yd-cell-right input[type="password"] {
  font-size: 0.1rem;
}
.flex-right {
  justify-content: flex-end; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex;
  padding:.28rem;
}
a {
  /* color: rgb(51, 153, 255); */
  color: rgb(0, 102, 255);
}
</style>
