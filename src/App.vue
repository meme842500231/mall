<template lang="">
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
// import storage from './storage'
export default {
  components: {

  },
  data() {
    return {
      res:{}
    }
  },
  mounted() {
    // storage.setItem('user',{a:1})
    // storage.setItem('abc', { a: 1 }, 'user')
    this.axios.get('/user/login').then((res)=>{this.res=res})

  }
}
</script>
<style lang="">
  
</style>