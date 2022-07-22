<template>
    <div class="loading">
        <img src="/imgs/loading-svg/loading-bars.svg" alt="">
    </div>
</template>
<script>
export default {
    name: 'loading'
}
</script>
<style lang="scss">
.loading {
    height: 300px;
    line-height:300px;
    text-align: center;
    padding-top:30px ;
    img{
        height: 100px;
    }
}
</style>
