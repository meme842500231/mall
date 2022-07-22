<template>
  <div class="order-pay">
    <OrderHeader title="订单支付">
      <template v-slot:tip>
       请谨防钓鱼链接或诈骗电话，了解更多>
      </template>
    </OrderHeader>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{ receiverName }} {{ receiverMobile }} {{ addressDetail }}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{ payment }}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{ 'up': orderShow }" @click="orderShow = !orderShow"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="orderShow">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{ orderNo }}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{ receiverName }} {{ receiverMobile }} {{ addressDetail }}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) in orderList" :key="index">
                    <img v-lazy="item.productImage" alt="">{{ item.productName }}
                    {{ item.currentUnitPrice }}*{{ item.quantity }} {{ item.totalPrice }}元
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{ 'checked': payType == 1 }" @click="sumbitPay(1)"></div>
            <div class="pay pay-wechat" :class="{ 'checked': payType == 2 }" @click="sumbitPay(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <Modal title='支付确认' sureText="查看订单" btntype="3" :showModal="showModalPay" @submit="goOrderList"
      @cancel="showModalPay = flase">
      <template v-slot:body>
        请确认是否完成订单支付？
      </template>
    </Modal>
    <ScanPanCode v-if="showPay" @closeBtn="close" :img="payImg"></ScanPanCode>
  </div>
</template>
<script>

import QRCode from 'qrcode'
import ScanPanCode from '../components/ScanPanCode'
import Modal from '../components/Modal'
import OrderHeader from '../components/OrderHeader'
export default {
  name: 'order-pay',
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      orderList: [],
      addressDetail: [],
      receiverName: '',
      receiverMobile: '',
      payment: 0,
      orderShow: false,
      payType: '',
      showPay: false,
      payImg: "",
      showModalPay: false,
      T:''

    }
  },
  components: {
    ScanPanCode,
    Modal,
    OrderHeader
  },
  mounted() {
    this.getOrderList()
    this.sumbitPay()
  },
  methods: {
    getOrderList() {
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        this.payment = res.payment
        this.orderList = res.orderItemVoList
        let item = res.shippingVo
        this.receiverName = item.receiverName
        this.receiverMobile = item.receiverMobile
        this.addressDetail = `${item.receiverCity} ${item.receiverDistrict} ${item.receiverCity} ${item.receiverAddress}`
      })
    },
    sumbitPay(payType) {
      if (payType == 1) {
        window.open('/#/order/alipay?orderId=' + this.orderNo)
      } else {
        this.axios.post('/pay', {
          orderId: this.orderNo,
          orderName: '杨玉玲的付款',
          amount: 0.01,
          payType: 2
        }).then(() => {
          QRCode.toDataURL('res.content')
            .then(url => {
              this.showPay = true
              this.payImg = url
              this.looporderstate()
            })
            .catch(() => {
              this.$message.error('生成二维码失败，请稍后重试')
            })
        })
      }
    },
    close() {
      this.showModalPay = true
      this.showPay = false
       clearInterval(this.T)
    },
    looporderstate() {
     this.T=setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
          if(res.status ==20) {
           clearInterval(this.T)
            this. goOrderList()
          }
        })
      }, 1000);

    },
    goOrderList() {
      this.$router.push('/order/list')
    }

  }
}
</script>
<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #F5F5F5;
    padding-top: 30px;
    padding-bottom: 61px;

    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;

      .item-order {
        display: flex;
        align-items: center;

        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }

        .order-info {
          margin-right: 248px;

          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }

          p {
            color: #666666;

            span {
              color: #FF6700;
            }
          }
        }

        .order-total {
          &>p:first-child {
            margin-bottom: 30px;
          }

          span {
            font-size: 28px;
            color: #FF6700;
          }

          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url('/imgs/icon-down.png') no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all .5s;
            cursor: pointer;

            &.up {
              transform: rotate(180deg);
            }
          }

          .icon-up {
            transform: rotate(180deg);
          }
        }
      }

      .item-detail {
        border-top: 1px solid #D7D7D7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;

        .item {
          margin-bottom: 19px;

          .detail-title {
            float: left;
            width: 100px;
          }

          .detail-info {
            display: inline-block;

            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;

      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #D7D7D7;
        margin-bottom: 26px;
      }

      .pay-way {
        font-size: 18px;

        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #D7D7D7;
          cursor: pointer;

          &:last-child {
            margin-left: 20px;
          }

          &.checked {
            border: 1px solid #FF6700;
          }
        }

        .pay-ali {
          background: url('/imgs/pay/icon-ali.png') no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }

        .pay-wechat {
          background: url('/imgs/pay/icon-wechat.png') no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>