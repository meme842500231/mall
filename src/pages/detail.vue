<template>
  <div class="detail">
    <productParam :name="product.name"></productParam>
    <div class="container-content">
      <div class="detail-img">
        <swiper v-bind:options="swiperOption">
          <swiper-slide v-for="(item, index) in imgList" v-bind:key="index">
            <a><img :src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
        </swiper>
      </div>
      <div class="detail-description">
        <div class="description-header">
          <h2 class="item-title">{{ product.name }}</h2>
          <p class="item-info">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
          <div class="delivery">{{ product.subtitle }}</div>
          <div class="item-price">{{ product.price }}元<span class="del">1999元</span>
          </div>
        </div>
        <div class="item-addr">
          <div class="icon-loc"><img src="/imgs/detail/icon-loc.png">
            <div class="addr">北京 北京市朝阳区安定门门街道<a> 修改</a></div>
          </div>

          <div class="stock">有现货</div>
        </div>

        <p class="check">选择版本</p>
        <div class="item-version">
          <div class="phone" :class="{ 'checked': version == 1 }" @click="version = 1">6GB+64GB 全网通 <span
              class="light-color">{{ product.price }}元</span></div>
          <div class="phone" :class="{ 'checked': version == 2 }" @click="version = 2">4GB+64GB 移动4G <span>1049元</span>
          </div>
        </div>
        <p class="check">选择颜色</p>
        <div class="item-color">
          <div class="phone-color"></div>
          <span>深空灰</span>
        </div>
        <div class="buyphone-checked">
          <div class="foot-description">
            <span class="description" >{{product.name}} {{version == 1? '6GB+64GB 全网通':'4GB+64GB 移动4G '}}</span>
            <div class="foot-right">
              <span>{{ product.price }}元</span>
              <p>1699元</p>
            </div>
          </div>
          <div class="phone-total">总计: {{ product.price }}元</div>
        </div>
        <div class="btn-group">
          <a href="javascript: ;" class="btn btn-huge" @click="addCart">加入购物车</a>
          <div class="like">
            <img src="/imgs/detail/icon-like.png" class="icon-like">
            <span>喜欢</span>
          </div>
        </div>
      </div>
    </div>
    <div class="description-content">
      <div class="content">
        <h3>价格说明</h3>
        <img src="/imgs/detail/item-price.jpeg" alt="">
      </div>
    </div>
    <ServiceBar></ServiceBar>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import productParam from '../components/productParam'
import ServiceBar from '../components/ServiceBar'
export default {
  name: 'detail',
  components: {
    productParam,
    swiper,
    swiperSlide,
    ServiceBar
  },
  data() {
    return {
      product: {},
      version: 0,
      imgList: [
        { id: 1, img: "/imgs/detail/phone-1.jpg" },
        { id: 2, img: "/imgs/detail/phone-2.jpg" },
        { id: 3, img: "/imgs/detail/phone-3.jpg" },
        { id: 4, img: "/imgs/detail/phone-4.jpg" }

      ],
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

      },
    }
  },
  mounted() {
    this.getImgInfo()
  },
  methods: {
    getImgInfo() {
      let id = this.$route.params.id
      this.axios.get('/products/' + id).then((res) => {
        this.product = res
      })
    },
    addCart(){
      this.axios.post('/carts',{
        productId:this.$route.params.id,
        selected: true
      }).then((res={})=>{
        console.log(res)
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
        // this.$router.push('/cart')
      })
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

.detail {
  .container-content {
    width: 1226px;
    // height: 870px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    box-sizing: border-box;

    .detail-img {
      width: 565px;
      height: 527px;
      background: #FFFFFF;
      margin-top: 90px;
      display: flex;
      justify-content: center;

      ::v-deep .swiper-button-black {
        width: 13px;
        height: 22px;
        background-size: 13px 22px;
      }

      ::v-deep .swiper-pagination-bullet {
        width: 25px;
        height: 2px;
        display: inline-block;
        background: #CCCCCC;
        opacity: 0.2;
        border-radius: 0;

        &.swiper-pagination-bullet-active {
          background: #999999;
        }
      }

      a {
        display: fixed;
        width: 384px;
        height: 486px;

        img {
          width: 384px;
          height: 486px;
          margin: 0 75px;
          object-fit: contain;
        }
      }
    }

    .detail-description {
      width: 584px;
      // height: 870px;
      padding: 0 0 50px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .description-header {
        box-sizing: border-box;
        // height: 207px;
        border-bottom: 1px solid #E5E5E5;

        h2 {
          font-size: 28px;
          font-weight: 400;
          color: #333333;
          height: 30px;
          line-height: 30px;
        }

        p {
          margin-top: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
        }

        .delivery {
          font-size: 16px;
          font-weight: 400;
          color: #FF6700;
          margin-top: 26px;

        }

        .item-price {
          font-size: 20px;
          font-weight: 400;
          color: #FF6700;
          margin: 14px 0 26px;

          .del {
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            margin-left: 10px;
            text-decoration: line-through;
          }
        }
      }

      .item-addr {
        height: 108px;
        width: 100%;
        margin: 29px 0;
        background: #FAFAFA;
        border: 1px solid #E5E5E5;
        padding-top: 27px;
        padding-left: 34px;
        box-sizing: border-box;

        .icon-loc {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          img {
            height: 22px;
            width: 20px;
            margin-right: 10px;
          }

          .addr {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 400;
            color: #666666;

            a {
              font-size: 14px;
              font-weight: 400;
              color: #FF6700;
              margin-left: 20px;
            }
          }

        }

        .stock {
          font-size: 14px;
          font-weight: 400;
          color: #FF6700;
          margin-top: 15px;
          margin-left: 64px;
          margin-bottom: 34px;
        }
      }
    }

    .check {
      font-size: 18px;
      font-weight: 400;
      color: #333333;
    }



    .item-version {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 25px 0;

      .phone {
        width: 287px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border: 1px solid #E5E5E5;
        font-size: 16px;
        font-weight: 400;
        color: #333333;

        &~.phone {
          margin-left: 10px;
        }

        span {
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          margin-left: 10px;
        }

        &.checked {
          border: 1px solid #FF6600;
          color: #FF6700;
        }
      }
    }

    .item-color {
      width: 287px;
      height: 50px;
      border: 1px solid #FF6600;
      font-size: 16px;
      font-weight: 400;
      color: #FF6700;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      .phone-color {
        width: 14px;
        height: 16px;
        background: #666666;
        margin-right: 9px;
      }
    }

    .buyphone-checked {
      width: 584px;
      height: 108px;
      background: #FAFAFA;
      padding: 24px 32px 29px;
      margin-top: 50px;
      box-sizing: border-box;

      .foot-description {

        display: flex;
        justify-content: space-between;


        .description {
          font-size: 14px;
          font-weight: 300;
          color: #333333;
        }

        .foot-right {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 300;
          color: #333333;

          p {
            color: #666666;
            text-decoration: underline;
            margin-left: 9px;
          }
        }
      }

      .phone-total {
        font-size: 24px;
        font-weight: 400;
        color: #FF6600;
        margin-top: 18px;
      }

    }

    .btn-group {
      margin: 30px 0 50px 0;
      display: flex;
      justify-content: flex-start;
      color: #FFFFFF;

      .like {
        width: 142px;
        height: 54px;
        line-height: 54px;
        background: #BBBBBB;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-like {
          width: 18px;
          height: 16px;
          margin-right: 7px;
        }
      }
    }
  }

  .description-content {
    width: 100%;
    height: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F3F3F3;

    .content {
      width: 1226px;
      height: 100%;
      margin: 36px 0 60px;

      h3 {
        font-size: 24px;
        font-weight: 400;
        color: #333333;
      }

      img {
        width: 1226px;
        height: 189px;
        margin-top: 30px;
      }
    }
  }

}
</style>