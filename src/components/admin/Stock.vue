<template>
    <!-- <yd-layout> -->
        <div v-if="post" class="content">
            
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
            <div class="center-holder">
                <span slot="left">最后变更时间:</span>
                <span slot="right">{{post.lastModifiedTime}}</span>
            </div>
            <div class="center-holder">
                <yd-button type="hollow" @click.native="okClick">编辑库存</yd-button>
                <yd-button type="hollow" @click.native="cancelClick">取消</yd-button>                     
            </div>
        </div>
    <!-- </yd-layout> -->
</template>

<script type="text/babel">
export default {
  data() {
    return {
      post: {lastModifiedTime:"2018-09-12 00:00:00"}
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
  font-size: .28rem;
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
  font-size: .5rem;
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
  font-size: .5rem;
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