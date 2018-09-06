<template>
     <div class="content">
        <yd-flexbox direction="vertical">
            <!-- <yd-flexbox-item></yd-flexbox-item> -->
            <yd-flexbox-item style="margin-top:50px;">
                <yd-flexbox direction="vertical">
                    <yd-flexbox-item>
                        <div class="holder">
                            <div style="height:60px;line-height:60px;text-align:right;padding-right:20px;">
                                <yd-icon name="warn-outline" slot="icon" style="height:50px;font-size: 2.5rem;color:rgb(255, 104, 93)"></yd-icon>
                            </div>
                            <p class="title"><span>设备异常</span></p>  
                        </div>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <div class="holder">                            
                            <span style="font-size:.85rem;">设备编号: {{this.serialNo}}</span>
                            <yd-icon name="feedback" style="font-size: 1.2rem;margin-left:10px;" @click.native="copyBtnClick"></yd-icon>
                        </div>
                    </yd-flexbox-item>
                    <yd-flexbox-item>        
                        <p class="desc">很抱歉设备异常，无法进行出票：</p>    
                        <p class="desc">1.您可通过关注微信公众号告知设备异常信息，我们将及时对设备进行维护；</p>
                        <p class="desc">2.若您已经支付，我们将在1小时内自动退款至您的微信钱包，若未及时退款，进入公众号后可告知我们设备编号及相关情况进行退款申请。</p>
                        <p class="desc">3.您也可拨打24小时服务热线：400-9005369 进行退款申请或者设备异常信息上报。</p>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
            
            <yd-flexbox-item>
                <p style="height:50px;line-height:50px;margin-top:20px;">
                    <yd-button type="danger" style="width:100px;height:35px"  @click.native="okClick">进入微信公众号</yd-button>
                </p>
            </yd-flexbox-item>
        </yd-flexbox>
    </div>
</template>

<script>
export default {
    data() {
        return {serialNo:'12345678'}
    },
    methods:{
        okClick() {
            // console.log(WeixinJSBridge)
            //回到公众号主体
            if(WeixinJSBridge){
                WeixinJSBridge.call('closeWindow') 
            }           
        },
        copyBtnClick() {
            //复制

        }
    },
    mounted(){
        // console.log(WeixinJSBridge)
        // var clipboard = new ClipboardJS('.yd-icon-feedback')
        // console.log(clipboard)
    }
}
</script>

<style scoped>
    .content {
        width: 100%;
        height: 100%;
        padding: 30px;
    }
    .content .desc {
        text-align: left;
        padding: (10px,0,0,10px);
        font-size: .85rem;
    }
    .content .title {
        /* text-align: center; */
        height: 60px;
        line-height: 60px;
        text-align:left;font-size:1.5rem
    }
    .content .holder {
        justify-content:center;/*子元素水平居中*/
        align-items:center;/*子元素垂直居中*/
        display:-webkit-flex;
    } 
</style>