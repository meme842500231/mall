<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" :class="{ 'checked': selectedAll }" @click="checkedAll"></span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in productList" :key="index">
              <div class="item-check">
                <span class="checkbox" :class="{ 'checked': item.productSelected }" @click="updatedCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{ item.productName }}</span>
              </div>
              <div class="item-price">{{ item.productPrice }}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updatedCart(item, '-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="updatedCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{ item.productTotalPrice }}元</div>
              <div class="item-del" @click='openModal(item)'></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共<span>{{ cartTotalQuantity }}</span>件商品，已选择<span>{{ checkedNum }}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{ cartTotalPrice }}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <modal title="提示" btntype="3" modaltype="middle" :showModal="showModal" @submit="submit" @cancel="cancel">
      <template v-slot:body>
        确定要删除这个商品吗？
      </template>
    </modal>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
import Modal from '../components/Modal'
// import { Message } from 'element-ui';
export default {
  name: 'index',
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter,
    Modal,
  
  },
  data() {
    return {
      productList: [],
      cartTotalPrice: 0,
      selectedAll: false,
      cartTotalQuantity: 0,
      showModal: false,
      itemCart: {},
    }
  },
  computed: {
    checkedNum() {
      let totalNum = 0
      this.productList.forEach((item) => {
        if (item.productSelected) {
          totalNum += item.quantity
        }
      })
      return totalNum
    }
  },
  mounted() {
    this.getCartList()
    this.checkedAll()
  },
  methods: {
    // 购物车下单
    getCartList() {
      this.axios.get('/carts').then((res) => {
        this.productList = res.cartProductVoList
        this.cartTotalPrice = res.cartTotalPrice
        this.cartTotalQuantity = res.cartTotalQuantity
        this.selectedAll = res.selectedAll
        // const selectArr = this.productList.filter(item => item.productSelected)
        // let num = 0
        // selectArr.forEach(item => {
        //   num += item.quantity
        //   // console.log(num)
        // })
        // console.log(num)
        // this.checkedNum = ).length
      })
    },
    openModal(item) {
      this.showModal = true
      this.itemCart = item
    },
    submit() {
      // console.log(this.itemCart)
      this.deleteQuantityCart(this.itemCart)
      this.showModal = false
    },
    cancel() {
      this.showModal = false
    },
    checkedAll() {
      let url = this.selectedAll ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(url).then((res) => {
        this.productList = res.cartProductVoList
        this.cartTotalPrice = res.cartTotalPrice
        this.cartTotalQuantity = res.cartTotalQuantity
        this.selectedAll = res.selectedAll
      })
    },
    updatedCart(item, type) {
      let selected = item.productSelected
      let quantity = item.quantity
      if (type == '+') {
        ++quantity
        if (quantity > item.productStock) {
          // alert()
         this.$message.warning('已超过商品库存')
          return
        }
      } else if (type == '-') {
        --quantity
        if (quantity < 1) {
           this.$message.warning('至少保留一件商品')
          return
        }
      } else {
        selected = !item.productSelected
      }
      this.axios.put(`/carts/${item.productId}`, {
        quantity,
        selected
      }).then((res) => {
        this.productList = res.cartProductVoList
        this.cartTotalPrice = res.cartTotalPrice
        this.cartTotalQuantity = res.cartTotalQuantity
        this.selectedAll = res.selectedAll
      })
    },
    deleteQuantityCart(item) {
      this.axios.delete(`/carts/${item.productId}`).then((res) => {
        this.productList = res.cartProductVoList
        this.cartTotalPrice = res.cartTotalPrice
        this.cartTotalQuantity = res.cartTotalQuantity
        this.selectedAll = res.selectedAll
      })
    },
    order() {
      if(this.checkedNum<1){
       this.$message.warning('请至少加入一件商品')
         return
      }
      this.$router.push('/order/confirm')
    }

  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/button.scss';

.cart {
  .wrapper {
    background-color: #F5F5F5;
    padding-top: 30px;
    padding-bottom: 114px;

    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;

      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #E5E5E5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;

        &.checked {
          background: url('/imgs/icon-gou.png') #FF6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }

      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;

        .col-1 {
          flex: 1;
        }

        .col-2 {
          flex: 2;
        }

        .col-3 {
          flex: 3;
        }
      }

      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #E5E5E5;
          font-size: 16px;

          .item-check {
            flex: 1;
          }

          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;

            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }

            span {
              margin-left: 30px;
            }
          }

          .item-price {
            flex: 1;
            color: #333333;
          }

          .item-num {
            flex: 2;

            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #E5E5E5;
              font-size: 14px;

              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }

              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }

          .item-total {
            flex: 1;
            color: #FF6600;
          }

          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }

    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      // height: 50px;
      // line-height: 50px;
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      box-sizing: border-box;

      .cart-tip {
        margin-left: 29px;

        a {
          color: #666666;
          margin-right: 37px;
        }

        span {
          color: #FF6600;
          margin: 0 5px;
        }
      }

      .total {
        font-size: 14px;
        color: #FF6600;


        span {
          font-size: 24px;
        }

        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }


    }
  }
}
</style>