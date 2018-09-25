<template>
    <div class="content">
        <yd-flexbox direction="vertical" v-if="orderStatus==3">
            <yd-flexbox-item style="margin-top:50px;">
                <yd-flexbox direction="vertical">
                    <yd-flexbox-item>
                        <div class="title-holder">                            
                             <p class="title">恭喜您中奖<span class="bonus">{{bonus}}</span>元</p>                                      
                        </div>                        
                    </yd-flexbox-item>
                    <yd-flexbox-item>                        
                        <p v-if="bonusStatus==0">奖金将直接发送至您的微信账户</p>

                         <div v-if="bonusStatus = 1">
                            <p class="tips">兑奖失败</p>
                            <div class="help-item">
                            <p>请拨打24小时服务热线:<a href="tel:400-900-5369">400-900-5369</a>,或关注公众号联系客服处理。<a href="#" @click="enterHome">点我进入公众号>></a></p>
                            </div>
                        </div>

                        <!-- <div v-if="orderStatus==5">
                            <p class="tips">当日兑奖已达最高兑奖额,本次兑奖失败。</p>
                            <div class="help-item">
                            <p>请拨打24小时服务热线:<a href="tel:400-900-5369">400-900-5369</a>,或关注公众号联系客服处理。<a href="#" @click="enterHome">点我进入公众号>></a></p>
                            </div>
                        </div>

                        <div v-if="bonus>1000">
                            <p class="tips">您的中奖金额达最高兑奖额,本次兑奖失败。</p>
                            <div class="help-item">
                            <p>请拨打24小时服务热线:<a href="tel:400-900-5369">400-900-5369</a>,或关注公众号联系客服进行人工转账处理。<a href="#" @click="enterHome">点我进入公众号>></a></p>
                            </div>
                        </div> -->

                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
            
            <!-- <yd-flexbox-item>
                <div class="help-item">
                    <p>温馨提示</p>
                    <p style="color:#ef4f4f">1.奖金超过1000元,需要前往即开票归属地区的销售网点按照规定进行兑奖。</p>
                    <p>2.每台手机设备每人每日最多兑奖100次,且每日兑奖额上限为2万元。</p>
                    <p>3.奖金将于1小时内直接发放至您的微信账户,若没有到账,可以拨打24小时服务热线:<a href="tel:400-900-5369">400-900-5369</a>,也可以通过关注公众号联系客服处理。<a href="#" @click="enterHome">点我进入公众号>></a></p>
                </div>
            </yd-flexbox-item> -->
        </yd-flexbox>

        <yd-flexbox direction="vertical" v-if="orderStatus!=3">
            <yd-flexbox-item>     
            </yd-flexbox-item>
            <yd-flexbox-item>
                <div class="title-holder">                            
                    <p class="title" v-if="orderStatus==2">很遗憾, 您未中奖</p>      
                    <p class="title" v-if="orderStatus==4">该票已兑奖</p>               
                    <p class="title" v-if="orderStatus==0">未查询到中奖信息</p>
                    <p class="title" v-if="errMsg">"出错了~"</p>
                </div>    
                <div style="margin-top:.5rem">
                <yd-button type="hollow" style="border-radius:5px;" @click.native="backClick">继续兑奖</yd-button>
                </div>
            </yd-flexbox-item>
            <yd-flexbox-item>     
            </yd-flexbox-item>
        </yd-flexbox>

    </div>
</template>

<script>
export default {
  data() {
    return {
      orderStatus: -1, //中奖状态
      bonusStatus: -1, //兑奖状态
      bonus: 0, //奖金金额,
      errMsg: ""
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      let params = this.$route.params;
      if (params) {
        this.$set(this, "orderStatus", params.orderStatus);
        this.$set(this, "bonusStatus", params.bonusStatus);
        this.$set(this, "bonus", params.bonus || 0);
      }
    },
    enterHome() {
      //进入公众号
      this.$util.redirectToWxHome();
    },
    backClick() {
      this.$router.replace({ path: "/duijiang" });
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 30px;
}
.content .desc {
  text-align: left;
  padding: 10px;
}
.content .title {
  /* text-align: center; */
  height: 60px;
  line-height: 60px;
  text-align: left;
  font-size: 0.4rem;
}
.content .title-holder {
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex;
}
.help-item {
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
}
.help-item p {
  padding-bottom: 5px;
  font-size: 0.2rem;
}
a {
  /* color: rgb(51, 153, 255); */
  color: rgb(0, 102, 255);
}
.bonus {
  color: rgb(229, 28, 35);
  padding-left: 0.14rem;
  padding-right: 0.14rem;
}
.tips {
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
