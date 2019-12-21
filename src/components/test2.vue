<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>Pagination / Dynamic Bullets</span>
        <span>（</span>
        <span>分页器 / 动态指示点</span>
        <span>）</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-awesome-swiper/blob/master/examples/04-pagination-dynamic.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </md-card-media>
  </md-card>
</template>

<script>
import 'swiper/css/swiper.css'

// import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        swiperOption: {
          speed: 600,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-slide {
    font-size: 18px;
    color:#fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 60px;
    background-color: transparent!important;
    justify-content: space-around!important;
  }
  .parallax-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 130%;
    height: 100%;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    background-image: url(/static/images/surmon-1.jpg);
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
</style>