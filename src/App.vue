<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: transparent;
  height: 100%;
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
}
.content .center-holder .yd-btn {
  width: 60px;
  margin: 10px;
}
</style>
