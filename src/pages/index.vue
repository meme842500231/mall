<template lang="">
    <div>{{url}}</div>
</template>
<script>
import env from '../env'
export default {
    name: 'index',
    data(){
        return{
            url:env.baseURL
        }
    }
}
</script>
<style lang="">
    
</style>