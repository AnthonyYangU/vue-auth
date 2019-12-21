<template>
        <div class="firstHeader">
            <div class="logo">论文格式检测系统</div>
            <!-- 全屏显示 -->
            <div class="header-right">
                    
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <span class="login" @click="login">登陆</span>
                <span class="register" @click="register"> 注册</span>
            </div>
        </div>
</template>
<script>
export default {
    methods:{
        data() {
            return {
                fullscreen: false,
            };
        },
        login(){
            this.$store.commit('updateRegisterState',true)
            console.log(this.$store.state.registerState);
            this.$router.push('/login');
        },
        register(){
            this.$store.commit('updateRegisterState',false)
            console.log(this.$store.state.registerState);
            this.$router.push('/login');
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
        },

    }
}
</script>

<style >
.firstHeader{
    position:fixed;
    top:0px;
    left:0px;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    color: #fff;
    background-color:rgba(50, 65, 87, 0.5);
    z-index:1;
}
.firstHeader .logo {
    position: absolute;
    top:0;
    left:50px;
    width: 300px;
    line-height: 50px;
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

.register,
.login{
    position:absolute;
    line-height: 50px;
    margin-right:20px;
    font-size:17px;
}

.register{
    right:0;
}

.login{
    right:50px;
}

.register:hover,
.login:hover{
    border-bottom:solid 2px skyblue;
    background:grey
}

</style>