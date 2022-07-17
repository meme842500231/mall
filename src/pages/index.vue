<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="wrap-nav">
          <ul class="wrap-menu">
            <li class="warp-item">
              <a href="##">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" :key="i">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub ? '/#/product/' + sub.id : ''"><img :src="sub ? sub.img : '/imgs/item-box-1.png'">
                      {{ sub ? sub.name : '小米9' }}</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="warp-item">
              <a href="javascript：；">电视 盒子</a>
              <div class="children"></div>
            </li>
            <li class="warp-item">
              <a href="javascript：；">笔记本 平板</a>
              <div class="children"></div>
            </li>
            <li class="warp-item">
              <a href="javascript：；">家电 插线板</a>
              <div class="children"></div>
            </li>
            <li class="warp-item">
              <a href="javascript：；">出行 穿戴</a>
            </li>
            <li class="warp-item">
              <a href="javascript：；">耳机 音箱</a>
            </li>
            <li class="warp-item">
              <a href="javascript：；">电源 配件</a>
            </li>
            <li class="warp-item">
              <a href="javascript：；">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper v-bind:options="swiperOption">
          <swiper-slide v-for="(item, index) in slideList" v-bind:key="index">
            <a v-bind:href="'/#/product/' + item.id"><img v-bind:src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/' + item.id" v-for="(item, index) in adsList" :key="index">
          <img v-lazy="item.img"></a>
      </div>
      <div class="banner">
        <a :href="'/#/product/' + 30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>

    </div>
    <div class="product-container">
      <div class="product-box">
        <span>手机</span>
        <div class="product-content">
          <div class="left-banner">
            <a :href="'/#/product/'"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
          </div>
          <div class="phone-list">
            <div class="item" v-for="(item, index) in phoneList" :key="index">
              <div class="phone-item" v-for="(innerItem, innerIndex) in item" :key="innerIndex">
                <span :class="{ 'new-product': innerIndex % 2 == 0 }">新品</span>
                <a :href="'/#/product/' + innerItem.id"><img v-lazy="innerItem.mainImage"></a>
                <h3>{{ innerItem.name }}</h3>
                <p>{{ innerItem.subtitle }}</p>
                <h5 @click="addCart(innerItem.id)">{{ innerItem.price }}元</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal title="提示" sureText="查看购物车" btntype="1" modaltype="middle" :showModal="showModal" @submit="submit"
      @cancel="cancel">
      <template>
        <slot name="body">
        </slot>
      </template>
    </modal>
  </div>
</template>
<script>
import ServiceBar from './../components/ServiceBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Modal from '../components/Modal'
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  data() {
    return {
      showModal: false,
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6,

        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

      },
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-1.jpg'
        }
      ],
      menuList: [
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9 '
          }, {
            id: 31,
            img: '/imgs/item-box-2.png',
            name: '小米8青春版'
          }, {
            id: 32,
            img: '/imgs/item-box-3.jpg',
            name: 'Redmi K20 Pro'
          }, {
            id: 33,
            img: '/imgs/item-box-4.jpg ',
            name: '移动4G专区'
          }],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        }, {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        }, {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList: []
    }

  },
  mounted() {
    this.getProduct()
    console.log(this.$route)
  },
  methods: {
    getProduct() {
      this.axios.get('/products', {
        params: {
          categoryId: 100012,
          pageSize: 14
        }
      }).then((res) => {
        res.list.slice(6, 14)
        this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
      })
    },
    addCart(id) {
      this.axios.post('/carts', {
        productId: id,
        selected: true
      }).then((res) => {
         this.showModal = true
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
      }).catch(() => {
        this.showModal = true
      })

    },
    submit() {
      this.$router.push('/cart')
    },
    cancel() {
      this.showModal = false
    }

  },


}
</script>

<style lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

.index {
  .swiper-box {
    .swiper-container {
      height: 451px;

      .swiper-button-prev {
        left: 274px;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .wrap-nav {
      position: absolute;
      width: 264px;
      height: 451px;
      Z-index: 9;
      padding: 26px 0;
      background: #55585a6b;
      box-sizing: border-box;

      .wrap-menu {
        .warp-item {
          width: 264px;
          height: 50px;

          a {
            position: relative;
            display: block;
            font-size: 16px;
            color: #fff;
            line-height: 50px;
            padding-left: 30px;
            box-sizing: border-box;

            &:after {
              position: absolute;
              right: 30px;
              top: 17px;
              content: '';
              @include bgImg(10px, 15px, '/imgs/icon-arrow.png')
            }
          }

          .children {
            position: absolute;
            left: 264px;
            top: 0;
            width: 964px;
            height: 451px;
            background: #FFFFFF;
            border: 1px solid $colorH;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.1100);
            padding: 14px 20px;
            box-sizing: border-box;
            display: none;

            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;

              li {
                height: 75px;
                line-height: 75px;
                width: 241px;

                a {
                  font-size: 14px;
                  font-weight: 400;
                  color: #333333;

                  img {
                    width: 42px;
                    height: 35px;
                    vertical-align: middle;
                    margin-right: 10px;
                  }
                }
              }
            }
          }

          &:hover {
            background: #FF6600;

            .children {
              display: block;
            }


          }
        }
      }
    }
  }

  .ads-box {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    margin-bottom: 31px;

    a {
      width: 296px;
      height: 167px;
    }
  }

  .banner {
    width: 1226px;
    height: 130px;
    margin-bottom: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .product-container {
    width: 100%;
    background: #F5F5F5;

    .product-box {
      margin: 0 auto;
      width: 1226px;
      height: 740px;
      padding: 30px 0 50px;
      box-sizing: border-box;

      span {
        font-size: 22px;
        font-weight: 400;
        color: #333333;
      }

      .product-content {
        display: flex;
        margin-top: 20px;

        .left-banner {
          width: 224px;
          height: 619px;
          margin-right: 16px;
        }

        .phone-list {
          .item {
            width: 986px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;

            &:nth-last-child {
              margin-bottom: 0px;
            }

            .phone-item {
              width: 236px;
              height: 302px;
              background: #FFFFFF;
              font-size: 14px;
              font-weight: 400;
              display: flex;
              flex-direction: column;
              align-items: center;

              span {
                width: 67px;
                height: 24px;
                color: #FFFFFF;
                font-size: 14px;
                display: block;
                line-height: 24px;
                text-align: center;

                &.new-product {
                  background-color: #7ECF68;
                }

                &.kill-product {
                  background-color: #E82626;
                }
              }

              img {
                width: 100%;
                height: 195px;
              }

              h3 {
                font-size: 14px;
                font-weight: 400;
                color: #333333;
              }

              p {
                font-size: 12px;
                font-weight: 400;
                color: #999999;
                margin-top: 6px;
                margin-bottom: 13px;
              }

              h5 {
                color: #F20A0A;
              }
            }
          }

        }
      }
    }
  }
}
</style>