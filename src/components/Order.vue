<template>
    <yd-layout>
        
        <yd-cell-group style="margin:0px">
            <yd-cell-item>                
                <span slot="left">设备编号:{{post.serialNo}}</span>
                <div slot="right">
                    <!-- <router-link slot="right"> -->
                        <yd-icon name="setting" size="1.5rem" color="#777" @click.native ="bindClick"></yd-icon>
                    <!-- </router-link> -->
                </div>
            </yd-cell-item>
        </yd-cell-group>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <!-- 数量输入弹出框 -->
        <yd-popup v-model="post.showOtherQty" class="popup" :close-on-masker=false position="center" width="80%">
            <div style="background-color:#fff;">
                <div>
                    <p><span>请输入购买数量</span></p>
                    <span class="close" @click="post.showOtherQty=false"></span>
                </div>
                <span slot="left">剩余库存:{{post.inventory}}张</span>  
                <p style="margin:5px">
                    <yd-spinner min="1" unit="1" width="160px" height="40px" v-model="post.tmpQty"></yd-spinner>
                </p>
                <div v-if="post.qtyErr"><span style="color:rgb(229, 28, 35)">{{post.qtyErr}}</span></div>
                <p style="height:50px;line-height:50px">
                    <yd-button type="danger" style="width:80px;height:35px"  @click.native="confirmQtyClick">确定</yd-button>
                </p>               
            </div>
        </yd-popup>

        <div v-if="post">
            <!-- 游戏详情 -->
            <yd-flexbox>
                <yd-flexbox-item>
                    <div style="padding:20px;">
                        <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png" style="width: 100%;height:auto;" />
                    </div>
                </yd-flexbox-item>
                <yd-flexbox-item>
                    <yd-flexbox direction="vertical">
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">游戏:</span>
                                <span slot="left" style="margin-left:10px">{{post.game}}</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">单价:</span>
                                <span slot="left" style="margin-left:10px">{{post.price}}元</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">库存:</span>
                                <span slot="left" style="margin-left:10px">{{post.inventory}}张</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                    </yd-flexbox>
                </yd-flexbox-item>
            </yd-flexbox>

            <!-- 数量选择 -->
            <yd-grids-group :rows="3" title="请选择购买数量">
            </yd-grids-group>

            <table style="width:100%">
                <tr>
                    <td><yd-button :type="post.activeIndex === 0?'danger':'hollow'" :disabled="post.inventory<1" @click.native="buttonClick(0,1)">1张</yd-button></td>
                    <td><yd-button :type="post.activeIndex === 1?'danger':'hollow'" :disabled="post.inventory<2" @click.native="buttonClick(1,2)">2张</yd-button></td>
                    <td><yd-button :type="post.activeIndex === 2?'danger':'hollow'" :disabled="post.inventory<3" @click.native="buttonClick(2,3)">3张</yd-button></td>
                </tr>
                <tr>
                    <td><yd-button :type="post.activeIndex === 3?'danger':'hollow'" :disabled="post.inventory<5" @click.native="buttonClick(3,5)">5张</yd-button></td>
                    <td><yd-button :type="post.activeIndex === 4?'danger':'hollow'" :disabled="post.inventory<10" @click.native="buttonClick(4,10)">10张</yd-button></td>
                    <td><yd-button :type="post.activeIndex === 5?'danger':'hollow'" :disabled="post.inventory<1" @click.native="buttonClick(5)">其他数量</yd-button></td>
                </tr>
            </table>

        </div>

        <yd-tabbar slot="tabbar">
            <yd-flexbox class="footer">
                <yd-flexbox-item>
                    支付金额: {{post.amount}}元
                </yd-flexbox-item>
                <yd-flexbox-item style="background-color:rgb(229, 28, 35);color:white" @click.native="payClick">
                    立即支付
                </yd-flexbox-item>
            </yd-flexbox>
        </yd-tabbar>


    </yd-layout>

</template>

<script type="text/babel">
export default {
  data() {
    return {
      post: { activeIndex: 0 },
      error: null
    };
  },
  created() {
    // 组件创建完后
    // 获取openid
    this.$root.$wxajax
      .get(process.env.WX_API_GET_OPENID)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });

    // 获取数据
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
    "post.qty": "watchQty",
    "post.tmpQty": "watchTmpQty"
  },
  methods: {
    fetchData() {
      this.error = null;
      this.$root.$dialog.loading.open();
      // replace getPost with your data fetching util / API wrapper
      this.getPost(this.$route.params.id, (err, data) => {
        this.$root.$dialog.loading.close();
        if (err) {
          this.error = err.toString();
        } else {
          this.$set(this.post, "serialNo", data.serialNo);
          this.$set(this.post, "game", data.game);
          this.$set(this.post, "price", data.price);
          this.$set(this.post, "inventory", data.inventory);
          this.$set(this.post, "qty", 1);
          this.$set(this.post, "pic", data.pic);
        }
      });
    },
    watchTmpQty: function() {
      this.post.qtyErr = null;
      //监听数量变化
      if (this.post.tmpQty <= 0) {
        this.post.qtyErr = "数量不能为0";
      } else if (this.post.tmpQty > this.post.inventory) {
        this.post.qtyErr = "库存不足，请重新选择";
      }
    },
    watchQty: function() {
      if (!this.post.qtyErr) {
        this.post.amount = this.post.price * this.post.qty;
      }
    },
    buttonClick: function(index, qty) {
      this.$set(this.post, "activeIndex", index);
      console.log(this.post.activeIndex);
      if (index > 4) {
        //其他数量
        if (!this.post.qty) {
          this.$set(this.post, "qty", 1);
        }
        this.$set(this.post, "tmpQty", this.post.qty);
        this.$set(this.post, "showOtherQty", true);
      } else {
        this.$set(this.post, "qty", qty);
      }
    },
    confirmQtyClick: function() {
      if (!this.post.qtyErr) {
        this.post.qty = this.post.tmpQty;
        this.post.showOtherQty = false;
      }
    },
    payClick: function() {
      console.log("go to pay page");
      wxPay({}, (err, res) => {
        //支付成功，跳转到成功页面
        //支付失败，跳转到失败页面
      });
    },
    getPost(id, callback) {
      //TODO: 调用数据API，包括返回数据以及错误处理
      setTimeout(() => {
        //模拟数据加载过程
        var data = {};
        data.serialNo = "123456";
        data.game = "福彩";
        data.price = 2;
        data.inventory = 6;
        data.pic = "http://static.ydcss.com/uploads/ydui/2.jpg";
        var err = null;
        callback && callback(err, data);
      }, 500);
    },
    wxPay(params, callback) {
      //TODO: 微信支付
    },
    bindClick(event) {
      this.$router.replace(this.$store.state.isAdminBinded ? '/login' : '/bindins');
    }
  }
};
</script>

<style>
.left-panel {
  width: 60%;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.left-panel img {
  width: 100%;
  height: auto;
}
.right-panel {
  width: 40%;
}
table {
  width: 100%;
}
td {
  width: 30%;
  padding: 5px;
}
td button {
  width: 70%;
  height: 40px;
}
.yd-btn {
  height: 40px;
}
.footer {
  width: 100%;
  height: 45px;
}
.footer div {
  width: 50%;
  height: 45px;
  vertical-align: middle;
  font-size: 14px;
  color: rgb(229, 28, 35);
  line-height: 45px;
}
.popup {
  width: 80%;
}
.popup p {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
/* basic style */
.close {
  /* still bad on picking color */
  color: black;
  /* make a round button */
  border-radius: 12px;
  /* center text */
  line-height: 30px;
  text-align: center;
  height: 30px;
  width: 30px;
  font-size: 20px;
  padding: 0px;
}
/* use cross as close button */
.close::before {
  content: "\2716";
}
/* place the button on top-right */
.close {
  top: 5px;
  right: 5px;
  position: absolute;
}
</style>

