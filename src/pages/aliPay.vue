<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>
<script>
import Loading from '../components/Loading';
export default {
  name: 'alipay',
  components: {
    Loading
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      loading: true
    }
  },
  mounted() {
    this.sumbitPay();
  },
  methods: {
    sumbitPay() {
        this.axios.post('/pay', {
          orderId: this.orderId,
          orderName: '杨玉玲的支付宝付款',
          amount: 0.01,
          payType: 1
        }).then((res) => {
          console.log(res)
          // this.$router('/alipay/')
          this.content=res.content
          setTimeout(() => {
            document.forms[0].submit()
          }, 100);
        })
      }
    }
  }
</script>