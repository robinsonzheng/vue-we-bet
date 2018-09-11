<template>
    <yd-grids-group :rows="3">
        <yd-grids-item @click.native="logoUnlockClick">
            <img slot="icon" :src="logoUnlock">
            <span slot="text">设备开锁</span>
        </yd-grids-item>
        <yd-grids-item @click.native="logoStarClick">
            <img slot="icon" :src="logoStar">
            <span slot="text">修改密码</span>
        </yd-grids-item>
        <yd-grids-item @click.native="logoLocationClick">
            <img slot="icon" :src="logoLocation">
            <span slot="text">设备地址</span>
        </yd-grids-item>
        <yd-grids-item @click.native="logoStockClick">
            <img slot="icon" :src="logoStock">
            <span slot="text">库存信息</span>
        </yd-grids-item>
    </yd-grids-group>
</template>

<script>
export default {
    data(){
        return {
            logoUnlock:require('../../assets/logo.png'),
            logoStar:require('../../assets/star.png'),
            logoLocation:require('../../assets/location.png'),
            logoStock:require('../../assets/stock.png')
        }
    },
    methods:{
        logoUnlockClick(event){
            this.$dialog.confirm({mes:"是否确定开锁？"});
        },
        logoStarClick(event){

        },
        logoLocationClick(event){

        },
        logoStockClick(event){

        }
    }
}
</script>
