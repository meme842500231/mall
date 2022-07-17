<template>
  <div class="product">
    <div class="container">
      <productParam :name="info.name">
        <template v-slot:buy>
          <button class="btn" @click="buy">立即购买</button>
        </template>
      </productParam>

    </div>
    <div class="details">
      <div class="content">
        <h1>{{info.name}}</h1>
        <h3>{{info.subtitle}}</h3>
        <div class="description">
          <p>全球首款双频 GP</p><span>|</span>
          <p>骁龙845</p><span>|</span>
          <p>AI 变焦双摄</p><span>|</span>
          <p>红外人脸识别</p>
        </div>
        <div class="price">
          <h2>¥ {{info.price}}</h2>
          <h5>¥ 2999</h5>
        </div>

      </div>
    </div>
    <div class="container">
      <img src="/imgs/product/product-bg-2.png" alt="">
    </div>
    <div class="bg"><img src="/imgs/product/product-bg-3.png" alt=""></div>
    <div class="adscontent">
      <img src="../../public/imgs/product/gallery-3.png" alt="">
      <img src="../../public/imgs/product/gallery-4.png" alt="">
      <img src="../../public/imgs/product/gallery-2.png" alt="">
    </div>
    <div class="animation">
      <div class="animation-box">
        <h3>60帧超慢动作摄影</h3>
        <h3>慢慢回味每一瞬间的精彩</h3>
        <p class="description">后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！ </p>
        <p>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg" @click="isSlide = 'slideDown'"></div>
        <div class="video-box" v-show="isSlide">
          <div class="video-mask"></div>
          <div class="video" :class="{ slideDown: isSlide == 'slideDown', slideUp: isSlide == 'slideUp' }">
            <img class="icon" src="/imgs/icon-close.png" @click="slideClose">
            <video src="/imgs/product/video.mp4" controls></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productParam from '../components/productParam'
export default {
  name: 'product',
  components: {
    productParam
  },
  data() {
    return {
      info:{},
      isSlide: ''
    }
  },
  mounted() {
    this.getProductInfo()
  },
  methods: {
    slideClose() {
      this.isSlide = 'slideUp'
      setTimeout(() => {
        this.isSlide = ''
      }, 600)
    },
    getProductInfo(){
      let id=this.$route.params.id
      this.axios.get('/products/'+id).then((res)=>{
        this.info=res
      })
    },
    buy(){
      let id=this.$route.params.id
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

.product {
  .container {
    .btn {
      margin-left: 11px;
    }

    img {
      height: 397px;
      margin-top: 38px;
      margin-bottom: 45px;
    }
  }

  .details {
    background: url("/imgs/product/product-bg-1.png") no-repeat center;
    height: 718px;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        font-size: 80px;
        font-weight: 600;
        color: $colorB;
        margin-top: 55px;
        margin-bottom: 13px;
      }

      h3 {
        font-size: 24px;
        font-weight: 300;
        color: $colorB;
      }

      .description {
        display: flex;
        justify-content: center;
        font-size: 16px;
        font-weight: 100;
        color: $colorB;

        span {
          margin: 0 16px 40px;
        }
      }

      .price {
        display: flex;
        justify-content: center;
        color: $colorB;

        h2 {
          height: 75px;
          font-size: 38px;
          line-height: 50px;
          margin-right: 11px;
          font-weight: 400;
        }

        h5 {
          font-size: 26px;
          line-height: 50px;
          text-decoration: line-through;
          font-weight: 400;
        }
      }

    }
  }

  .adscontent {
    display: flex;
    justify-content: center;
    margin: 36px 0 31px;

    img {
      width: 627px;
      height: 356px;

      &:nth-child(2) {
        padding: 0 20px;
        box-sizing: border-box;
      }
    }
  }

  .bg {
    img {
      width: 100%;
    }
  }

  .animation {
    width: 100%;
    height: 1044px;
    background: #070708;

    .animation-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 82px 0 120px;
      box-sizing: border-box;

      h3 {
        font-size: 60px;
        height: 80px;
        line-height: 80px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 80px;
      }

      p {
        font-size: 24px;
        font-weight: 300;
        color: #FFFFFF;
        height: 40px;
        line-height: 40px;
      }

      .description {
        margin-top: 25px;
      }

      .video-bg {
        margin-top: 58px;
        width: 1226px;
        height: 540px;
        background: url("/imgs/product/gallery-1.png") no-repeat center/100%;
      }

      .video-box {
        img {
          color: red;
        }

        .video-mask {
          @include position(fixed);
          background-color: rgba(0, 0, 0, .4);
        }

        .video {
          position: fixed;
          left: 50%;
          top: -50%;
          transform: translate(-50%, -50%);
          width: 1000px;
          height: 536px;

          @keyframes slideDown {
            from {
              top: -50%;
              opacity: 0;

            }

            to {
              top: 50%;
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              top: 50%;
              opacity: 1;
            }

            to {
              top: -50%;
              opacity: 0;
            }
          }

          &.slideDown {
            animation: slideDown .5s linear;
            top: 50%;
          }

          &.slideUp {
            animation: slideUp .5s linear;
          }


          .icon {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            z-index: 10;
          }

          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>