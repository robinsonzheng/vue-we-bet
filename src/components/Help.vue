<template>
	<div>
		<!--
		<yd-button size="large" type="primary">primary</yd-button>
		<yd-button size="large" type="danger">danger</yd-button>
		<yd-button size="large" type="warning">warning</yd-button>
		<yd-button size="large" type="disabled" disabled>disabled</yd-button>
		<yd-button size="large" type="hollow">hollow</yd-button>
		<yd-button size="large" bgcolor="#000" color="#FFF">Custom Color</yd-button>
		-->
		<yd-accordion>
			<yd-accordion-item v-for="item in items" :title="item.title" :key="item.index">
				<div style="padding: .24rem;">
					<p>{{item.detail}}</p>
				</div>
			</yd-accordion-item>
		</yd-accordion>
	</div>
</template>

<script>
export default {
  name: "Help",
  data() {
    return {
      msg: "帮助页面",
      items: [
        {
          key: 1,
          title: "帮助1",
          detail: "帮助1的内容"
        },
        {
          key: 2,
          title: "帮助2",
          detail: "帮助2的内容"
        }
      ]
    };
  },
  methods:{
    testClick(){
      alert('click ')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
