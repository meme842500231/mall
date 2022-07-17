<template>
    <transition name="fade">
        <div class="modal" v-show="showModal">
            <div class="modal-mask">
                <div class="modal-content">
                    <div class="modal-header">
                        <span>{{title}}</span>
                        <!-- <a href="javascript:;" class="icon-close" @click="cancel"></a>
                    </div>
                    <div class="modal-body">
                        <slot name="body">商品添加成功</slot>
                    </div>
                    <div class="modal-footer">
                        <a href="javascript:;" class="btn" v-if="btntype == 1" @click="submit">确定</a>
                        <a href="javascript:;" class="btn btn-default" v-if="btntype == 2" @click="cancel">取消</a>
                        <div class="btn-group" v-if="btntype == 3">
                            <a href="javascript:;" class="btn" @click="submit">确定</a>
                            <a href="javascript:;" class="btn btn-default" @click="cancel">取消</a>
                        </div>
                    </div> -->
                        <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
                    </div>
                    <div class="modal-body">
                        <slot name="body">商品添加成功</slot>
                    </div>
                    <div class="modal-footer">
                        <a href="javascript:;" class="btn" v-if="btntype == 1" @click="$emit('submit')">{{sureText}}</a>
                        <a href="javascript:;" class="btn btn-default" v-if="btntype == 2" @click="$emit('cancel')">{{cancelText}}</a>
                        <div class="btn-group" v-if="btntype == 3">
                            <a href="javascript:;" class="btn" @click="$emit('submit')">{{cancelText}}</a>
                            <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>

export default {
    name: 'modal',
    props: {
        modaltype: {
            type: String,
            default: 'form'
        },
        title: String,
        btntype: String,
        sureText: {
            type: String,
            default: '确认'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        showModal: Boolean
    },
    // methods: {
    //     submit() {
    //         this.$emit('submitCart')
    //     },
    //     cancel(){
    //         this.$emit('cancelCart')
    //     }
    // },
}
</script>
<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/modal.scss';
</style>