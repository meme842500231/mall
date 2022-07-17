<template>
    <div class="nav-header" :class="{ 'is_fixed': fixed }">
        <div class="container">
            <span>{{ name }}</span>
            <div class="item">
                <a href="##">概述</a><span>|</span>
                <a href="##">参数</a><span>|</span>
                <a href="##">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'productParam',
    props: {
        name: String
    },
    data() {
        return {
            fixed: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.isfixed)
    },
    methods: {
        isfixed() {
            let scrollTop = Window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.fixed = scrollTop > 152 ? true : false;
        },
        destroyed() {
            window.removeaddEventListener('scroll', this.isfixed, false)
        },
    },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

.nav-header {
    box-shadow: 0px 20px 39px 1px rgba(225, 225, 225, 0.1900);

    &.is_fixed {
        background-color: #fff;
        width: 100%;
        position: fixed;
        top: 0px;
        left: 0;
        box-shadow: 2px #E5E5E5;
        z-index: 11;
    }

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 69px;
        line-height: 69px;
        border-top: 1px solid #E5E5E5;

        span {
            font-size: 18px;
            color: $colorB;
        }

        .item {
            a {
                font-size: 14px;
                color: $colorC;
            }

            span {
                margin: 0 11px;
            }


        }
    }
}
</style>