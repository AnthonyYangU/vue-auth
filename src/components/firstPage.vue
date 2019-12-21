<template>
  <vuescroll :ops="ops" >
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
    <div class="swiper-container" :style="containerObj">
        <div class="swiper-wrapper">
          <div class="swiper-slide mt1">
            <div class="word1 animated bounceInRight">支持本科和研究生论文格式检测</div>
            <div class="word2 animated bounceInRight">专为民航大学设计</div>
            <div class="word3 animated bounceInRight textButton" @click="login">立即体验</div>
          </div>
          <div class="swiper-slide mt2" >
            <div class="word4 animated rotateInDownLeft">遵循论文排版审核的国家标准</div>
            <div class="word5 animated rotateInDownLeft">GB7714参考文献规则</div>
            <div class="word6 animated rotateInDownLeft textButton" @click="login">立即体验</div>            
          </div>
          <div class="swiper-slide mt3" >
            <div class="word7 animated bounceInDown">GB15834标点符号标准</div>
            <div class="word8 animated bounceInRight">智能检测格式错误</div>
            <div class="word9 animated bounceInRight textButton" @click="login">立即体验</div>                
          </div>
          <div class="swiper-slide mt4" >
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <!-- <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> -->
    </div>
    <div class="footer">
        <i class="el-icon-phone">  Phone: 18745123123</i>
        <i class="el-icon-message"> Email: 15264789@qq.com</i>
        <i class="el-icon-chat-square">  Customer Wechat: q131415q</i>
    </div>
  </vuescroll>

</template>

<script>
// import vFirstHead from '@/components/firstPageHead.vue';
import 'vuescroll/dist/vuescroll.css';
import Swiper from "swiper";
import vuescroll from 'vuescroll';
export default {
  name: 'carrousel',
  inject:['reload'],
  data() {
    return {
      ops:{
          bar: {
            showDelay: 500,
            background: '#c1c1c1',
            opacity: 0.5,
            minSize: 0,
            size: '6px',
          }        
      },
      containerObj:{
        height:''
      },
      fullscreen: false,
    }
  },
  components:{
    vuescroll
  },
  computed: {
  },
  mounted(){
    new Swiper('.swiper-container',{
        // autoplay:6000,
        // effect:'fade',
        // fade:{
        //   crossFade:true
        // }
        autoplay:{
          delay:6000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
        },
        on:{
          reachEnd:() =>{
            this.reload();
          }
        }
    })
    this.containerObj.height = window.innerHeight +'px';
    window.onresize = () =>{
      this.reload();
    }
  },
  methods:{
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
<style>
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
    left:3.125rem;
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
.swiper-container{
  position: relative;
  width: 100%;
  height: 600px;
  z-index:0;
}
.mt1,
.mt2,
.mt3{
  background-position: center;
  background-size: cover; 
}
.mt1{
  background-image:url(../assets/img/portfolio/fullsize/1.jpg);
}
.mt2{
  background-image:url(../assets/img/portfolio/fullsize/2.jpg);
}
.mt3{
  background-image:url(../assets/img/portfolio/fullsize/3.jpg);
}

div[class^="word"]{
  position:absolute;
  left:10%;
  height:50px;
  width:250px;
  background:rgba(34, 49, 63, 0.6);
  color:white;
  border-radius: 10px;
  line-height: 50px;
  text-align: center;
  font-weight: 700;
  animation-duration:1s;
}

.word1{
  top:20%;
}
.word2{
  top:35%;
  animation-delay:0.5s;
}
.word3{
  top:50%;
  animation-delay:1.5s;
}

.word4{
  top:20%;
  animation-delay:6s;
}

.word5{
  top:35%;
  animation-duration:1s;
  animation-delay:6.5s;
}

.word6{
  top:50%;
  animation-duration:1s;
  animation-delay:7.5s;
}

.word7{
  top:20%;
  animation-delay:12s;
}

.word8{
  top:35%;
  animation-delay:12.5s;
}

.word9{
  top:50%;
  animation-delay:13.5s;
}
.textButton{
  cursor: pointer;
}
.textButton:hover{
  background: rgba(34, 49, 63, 1);
}
.swiper-slide .title {
  font-size: 41px;
  font-weight: 300;
}
.swiper-slide .subtitle {
  font-size: 21px;
}
.swiper-slide .text {
  font-size: 14px;
  max-width: 400px;
  line-height: 1.3;
}
.footer{
  height: 30px;
  font-size:.14px;
  font-weight: 500;
  background-color: rgba(34, 49, 63, 1);
  color:white;
  padding:10px 50px;
}

.footer i{
  margin-right:50px;
}
</style>
