<template lang="">
  <div>
    
  </div>
</template>
<script>
import axios from 'axios'
// import jsonp from 'jsonp'
export default {
  // comments:{
  //   axios
  // },
  data(){
    return{
      age:30
    }
  },
  mounted(){
    let url ="https://www.imooc.com/activity/servicetime"
    axios.get(url).then(()=>{
    })
    // jsonp(url,()=>{

    // })
  }
}
</script>
<style lang="">
  
</style>