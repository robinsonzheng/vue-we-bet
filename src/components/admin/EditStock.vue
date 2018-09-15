<template>
    <!-- <yd-layout> -->
        

        <div v-if="post" class="content">
            <!-- 数量输入弹出框 -->
            <yd-popup v-model="post.showOtherQty" class="popup" :close-on-masker=false position="center" width="80%">
                <div style="background-color:#fff;">
                    <div>
                        <p><span>请输入数量</span></p>
                        <span class="close" @click="post.showOtherQty=false"></span>
                    </div>                    
                    <p style="margin:5px">
                        <yd-spinner min="1" unit="1" width="160px" height="40px" v-model="post.tmpQty"></yd-spinner>
                    </p>                    
                    <p style="height:50px;line-height:50px">
                        <yd-button type="danger" style="width:80px;height:35px"  @click.native="confirmQtyClick">确定</yd-button>
                    </p>               
                </div>
            </yd-popup>

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

            <yd-tab bg-color2="rgb(185, 183, 183)" active-color3="rgb(185, 183, 183)">
                <yd-tab-panel label="增加库存">                    
                    <!-- <span>增加数量:</span> -->
                    <table>
                        <tr>
                            <td><yd-button :type="post.activeIndex === 0?'danger':'hollow'" @click.native="qtyBtnClick(0,30)">30张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 1?'danger':'hollow'" @click.native="qtyBtnClick(1,60)">60张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 2?'danger':'hollow'" @click.native="qtyBtnClick(2,120)">120张</yd-button></td>
                        </tr>
                        <tr>
                            <td><yd-button :type="post.activeIndex === 3?'danger':'hollow'" @click.native="qtyBtnClick(3,240)">240张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 4?'danger':'hollow'"  @click.native="qtyBtnClick(4)">其他数量</yd-button></td>                            
                        </tr>
                    </table>                   
                </yd-tab-panel>
                <yd-tab-panel label="减少库存">      
                    <table>
                        <tr>
                            <td><yd-button :type="post.activeIndex === 5?'danger':'hollow'" @click.native="qtyBtnClick(5,30)">30张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 6?'danger':'hollow'" @click.native="qtyBtnClick(6,60)">60张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 7?'danger':'hollow'" @click.native="qtyBtnClick(7,120)">120张</yd-button></td>
                        </tr>
                        <tr>
                            <td><yd-button :type="post.activeIndex === 8?'danger':'hollow'" @click.native="qtyBtnClick(8,240)">240张</yd-button></td>
                            <td><yd-button :type="post.activeIndex === 9?'danger':'hollow'"  @click.native="qtyBtnClick(9)">其他数量</yd-button></td>                            
                        </tr>
                    </table>           
                    <div class="center-holder">                 
                    </div>                      
                </yd-tab-panel>
                <yd-tab-panel label="更换票种">
                    <!-- <div class="flexbox">             
                        <div>           
                            <span>减少数量:</span>
                        </div>
                        <div class="flexbox-qty">                            
                            <yd-button type="hollow">30张</yd-button>
                            <yd-button type="hollow">60张</yd-button>
                            <yd-button type="hollow">120张</yd-button>
                            <yd-button type="hollow">240张</yd-button>
                            <yd-button type="hollow">其他</yd-button>
                        </div>
                    </div> -->


                </yd-tab-panel>                 
            </yd-tab>
            
            <!-- <div class="center-holder">
                <yd-button type="hollow" @click.native="okClick">编辑库存</yd-button>
                <yd-button type="hollow" @click.native="cancelClick">取消</yd-button>                     
            </div> -->
        </div>
    <!-- </yd-layout> -->
</template>

<script type="text/babel">
export default {
  data() {
    return {
      post: {
        lastModifiedTime: "2018-09-12 00:00:00",
        activeIndex: -1
      }
    };
  },
  created() {
    // 组件创建完后
    // 获取数据
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData"
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
    okClick() {
      this.$router.replace("/editstock");
    },
    cancelClick() {
      this.$router.go(-1);
    },
    qtyBtnClick(index, qty) {
      this.$set(this.post, "activeIndex", index);
      if (index === 4 || index === 9) {
        this.$set(this.post, "showOtherQty", true);
      }
    }
  }
};
</script>

<style scoped>
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
  height: 35px;
}
.footer {
  width: 100%;
  height: 45px;
}
.footer div {
  width: 50%;
  height: 45px;
  vertical-align: middle;
  font-size: 0.28rem;
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
  font-size: 0.28rem;
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
  font-size: 0.5rem;
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

.content {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 10px;
}
.content .center-holder {
  justify-content: center; /*子元素水平居中*/
  align-items: flex-start; /*子元素垂直居中*/
  display: -webkit-flex;
  /* margin-top: 10px; */
}
.content .center-holder .yd-btn {
  width: 60px;
  margin: 10px;
}

.flexbox {
  display: flex;
  display: -webkit-flex;
  direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.flexbox-qty {
  display: flex;
  display: -webkit-flex;
  direction: row;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
}
.flexbox-qty button {
  width: 15%;
  margin: 4px;
  border-radius: 4px;
}
</style>

<style>
.yd-grids-3 {
  padding: 0;
}
.yd-grids-item {
  padding: 0;
}
.yd-grids-txt {
  height: 30px;
  line-height: 30px;
  border-color: #bbb;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  margin: 5px;
  padding: 0;
}
.yd-grids-txt-activate {
  background-color: red;
}
.yd-grids-item span {
}
.yd-tab-panel {
  margin-top: 10px;
}
.yd-tab-nav-nomal {
  border-color: #bbb;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
</style>