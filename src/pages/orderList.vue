<template>
  <div class="order-list ">
    <OrderHeader title="订单列表">
      <template v-slot:tip>
        <span class="tips">请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </OrderHeader>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(item, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ item.createTime }}
                <span>|</span>
                {{ item.receiverName }}
                <span>|</span>
                订单号：{{ item.orderNo }}
                <span>|</span>
                {{ item.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ item.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(order, j) in item.orderItemVoList" :key="j">
                  <div class="good-img">
                    <img v-lazy="order.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ order.productName }}</div>
                    <div class="p-money">{{ order.totalPrice }} X {{ order.quantity }}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="item.status == 20">
                <a href="javascript:;">{{ item.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goOrderPay(item.orderNo)">{{ item.statusDesc }}</a>
              </div>
            </div>
          </div>
          <nodata v-if="!loading && list.length == 0"></nodata>

        </div>
      </div>
      <pagination v-if="false" background layout="prev, pager, next" :pageSize="pageSize" :total="50"
        @current-change="currentPage" class="pagination">
      </pagination>
      <div class="btnloading" v-show="loadmore">
        <el-button type="primary" :loading="loading" @click="loadingMore">加载更多</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from 'element-ui'
import { Pagination } from 'element-ui';
import OrderHeader from './../components/OrderHeader'
import Loading from '../components/Loading'
import Nodata from './../components/Nodata'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading,
    Nodata,
    Pagination,
   [Button.name]:Button
  },
  data() {
    return {
      list: [],
      loading: false,
      pageSize: 10,
      pageNum: 1,
      loadmore: true,

    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.axios.get('/orders', {
        params: {
          pageSize:1,
          pageNum: this.pageNum
        }
      }).then((res) => {

        console.log(res)
        this.list = this.list.concat(res.list)
        this.loading = false
        this.loadmore = res.hasNextPage
      })
    },
    goOrderPay(orderNo) {
      // this.$router.push('/order/pay')
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    },
    currentPage(pageNum) {
      this.pageNum = pageNum
      this.getOrderList()
    },
    loadingMore() {
      this.pageNum++
      this.getOrderList()
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

.order-list {
  .tips {
    font-size: 12px;
  }

  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;

    .order-box {

      .order {
        border: 1px $colorF solid;
        background-color: $colorG;
        margin-bottom: 31px;

        &:last-child {
          margin-bottom: 0;
        }

        .order-title {
          height: 74px;
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          display: flex;
          justify-content: space-between;
          align-items: center;


          .item-info {


            span {
              margin: 0 9px;
              color: #E5E5E5;
            }
          }

          .money {
            font-size: 26px;
            color: $colorB;
          }
        }

        .order-content {
          padding: 0 43px;
          display: flex;
          justify-content: space-between;

          .good-box {
            width: 88%;
            display: flex;
            flex-direction: column;

            .good-list {
              display: flex;
              align-items: center;
              height: 145px;

              .good-img {
                width: 112px;

                img {
                  width: 100%;
                }
              }

              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }

          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;

            a {
              color: $colorA;
            }
          }
        }
      }


      .load-more,
      .scroll-more {
        text-align: center;
      }
    }


    .pagination {
      text-align: center;

    }

    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #FF6600;
      color: #FFF;
    }

     .btnloading {
      font-size: 24px;
      width: 140px;
      height: 40px;
      line-height: 40px;
      margin: 20px auto;
      text-align: center;
      // background-color: #FF6600;
      color: #FFF;

    }
    }
.el-button--primary {
    color: #FFF;
    background-color:#FF6600;
    border-color:#FF6600;
  }
}
</style>