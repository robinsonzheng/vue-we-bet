<template>
	<div>
		<yd-accordion>
			<yd-accordion-item v-for="item in items" :title="item.title" :key="item.index">
				<div style="padding: .24rem;text-align:left;padding:10px">
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
          title: "1.购买即开票时已支付，但出票失败怎么办？",
          detail: "出票失败后，系统将于1个小时内自动退款至您的微信钱包，若未及时退款，可通过公众号联系我们，或者拨打24小时服务热线：400-9005369"
        },
        {
          key: 2,
          title: "2.即开票如何兑奖？",
          detail: "进入公众号，点击“兑奖”，进入兑奖页面，刮开保安区，扫描保安区二维码即可兑奖，也可输入票号及保安区兑奖码进行兑奖。"
        }
        ,
        {
          key: 3,
          title: "3.即开票兑奖后未到账怎么办？",
          detail: "领取奖金后，系统将在1小时内将奖金发送至您的微信钱包，若未及时发放，可通过公众号联系我们，或者拨打24小时服务热线：400-9005369"
        }
      ]
    };
  },
  methods:{
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
