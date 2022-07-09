<template lang="">
  <div>
    
  </div>
</template>
<script>
// import axios from 'axios'
// import jsonp from 'jsonp'
export default {
  components:{

  },
  data(){
    return{
      age:30
    }
  },
  mounted(){
    let url ="/api/u/card"
    this.$axios.get(url).then(()=>{
    })
    // jsonp(url,()=>{

    // })
  }
}
</script>
<style lang="">
  
</style>