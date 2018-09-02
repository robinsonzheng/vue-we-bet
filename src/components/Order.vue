<template>
    <div class="post">
        <div v-if="error" class="error">
        {{ error }}
        </div>

        <div v-if="post" class="content">
            <yd-cell-group style="margin:0px">
                <yd-cell-item>                
                    <span slot="left">设备编号:{{post.serialNo}}</span>
                    <div slot="right">
                        <router-link to="#" slot="right">
                            <yd-icon name="setting" size="1.5rem" color="#777"></yd-icon>
                        </router-link>
                    </div>
                </yd-cell-item>
            </yd-cell-group>

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
                                <span slot="right">{{post.game}}</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">单价:</span>
                                <span slot="right">{{post.price}}</span>
                            </yd-cell-item>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <yd-cell-item>
                                <span slot="left">库存:</span>
                                <span slot="right">{{post.inventory}}</span>
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
                    <td><yd-button :type="post.buttonTypes[0]" :class="post.buttonTypes[0]=='danger'" @click.native="buttonClick(0)">1张</yd-button></td>
                    <td><yd-button :type="post.buttonTypes[1]" @click.native="buttonClick(1)">2张</yd-button></td>
                    <td><yd-button :type="post.buttonTypes[2]" @click.native="buttonClick(2)">3张</yd-button></td>
                </tr>
                <tr>
                    <td><yd-button :type="post.buttonTypes[3]" @click.native="buttonClick(3)">5张</yd-button></td>
                    <td><yd-button :type="post.buttonTypes[4]" @click.native="buttonClick(4)">10张</yd-button></td>
                    <td><yd-button type="hollow" @click.native="buttonClick(5)">其他数量</yd-button></td>
                </tr>
            </table>

        </div>
  </div>
</template>

</<script>

export default {
    data () {
        return {
        post: null,
        error: null,
        }
    },
    created () {
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.fetchData()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
        this.error = this.post = null
        this.$root.$dialog.loading.open();
        // replace getPost with your data fetching util / API wrapper
        getPost(this.$route.params.id, (err, data) => {
            this.$root.$dialog.loading.close();
            if (err) {
                this.error = err.toString()
            } else {
                this.post = data
            }
        })
        },
        buttonClick:function(index) {
            if(index) {
                //其他数量

            } else {
                this.post.buttonTypes[index] = "danger"
                //debugger
            }
        }
    }
}

function getPost(id, callback) {
    //TODO: 调用数据API，包括返回数据以及错误处理
    setTimeout(() => {//模拟数据加载过程
        var data = {};
        data.serialNo = "123456"
        data.title = "测试标题"
        data.body = "测试内容"
        data.pic = "http://static.ydcss.com/uploads/ydui/2.jpg"
        data.buttonTypes = ["hollow","hollow","hollow","hollow","disabled"]
        callback && callback(null,data);
    }, 300);    
}

</script>

<style>
.left-panel {
  width: 50%;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.left-panel img {
  width: 100%;
  height: auto;
}
.right-panel {
  width: 50%;
}
table{
    width:100%;
}
td{
    width:30%;
    padding: 5px;
}
td button{
    width:70%;
    height:38px;
}
.active{
    background-color: red;
}
</style>

