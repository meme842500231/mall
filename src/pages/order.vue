<template>
  <div class="order">
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template> 
<script>
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
export default {
  name: 'order',
  data() {
    return {
      title: '',
      tip: ''
    }
  },
  components: {
    ServiceBar,
    NavFooter
  },
  mounted() {
   
  }
}
</script>