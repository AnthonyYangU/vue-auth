<template>
    <div class="firstHeader">
        <!-- 折叠按钮 -->
        <!-- <div class="bookIcon">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div> -->
        <div class="logo">论文格式检测系统</div>
        <!-- 全屏显示 -->
        <div class="header-right">
                <!-- 全屏显示 -->
            <div class="btn-fullscreen" @click="handleFullScreen">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="el-icon-rank"></i>
                </el-tooltip>
            </div>
            <span class="backFirst" @click="returnFirstPage">返回首页</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fullscreen: false,
        };
    },
    computed: {
    },
    methods: {
        // 全屏事件
        returnFirstPage(){
            this.$router.push('firstPage');
        },
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
    }
};
</script>
<style scoped>
.firstHeader{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    color: #fff;
    background-color:rgba(50, 65, 87, 0.2)
}
.logo {
    width:200px;
    height:50px;
    line-height: 50px;
    margin-left:3.125rem;
    /* background: red */
}
.header-right {
    position:absolute;
    top:0;
    right:50px;
    height:50px;
    width:150px;
    cursor: pointer;
}

.btn-fullscreen {
    position:absolute;
    top:11px;
    text-align: center;
    transform: rotate(45deg);
    font-size: 24px;
}
.btn-fullscreen:hover{
    color:rgb(97, 97, 158)
}

.backFirst{
    position:absolute;
    right:0;
    line-height: 50px;
    margin-right:20px;
    font-size:17px;
}

.backFirst:hover{
    border-bottom:solid 2px skyblue;
    background:rgba(90, 86, 86,0.4)
}
</style>
