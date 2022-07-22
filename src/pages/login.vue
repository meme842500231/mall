<template>
    <div class="login">
        <div class="container">
            <img src="/imgs/login-logo.png" class="login-header">
        </div>
        <div class="login-content">
            <div class="container">
                <div class="login-box">
                    <div class="login-header">
                        <span>账号登录</span>
                        <span></span>
                        <span>扫码登录</span>
                    </div>
                    <div class="login-input">
                        <input type="text" placeholder="邮箱/手机号码/小米ID" v-model="username">
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    <div class="login-btn" @click="loginenter">登录</div>
                    <div class="login-zhuce">
                        <a href="##" @click="register">手机登录/注册</a>
                        <div class="zhuce-header">
                            <span>立即注册</span>
                            <span>|</span>
                            <span>忘记密码？</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-footer">
            <div class="container">
                <div class="copy">
                    <span>简体</span>
                    <span>繁体</span>
                    <span>English</span>
                    <span>常见问题</span>
                    <span>隐私政策</span>
                </div>
                <div class="copyright">小米公司版权所有-京ICP备10046444- 京公网安备11010802020134号-京ICP证110507号
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            userId: ''


        }
    }, methods: {
        loginenter() {
            let { username, password } = this
            this.axios.post('/user/login', {
                username,
                password
            }).then((res={}) => {
                this.$cookie.set('userId', res.id, { expires: '1M' });
                this.$store.commit('saveUsername', res.username)
                this.$router.push('/index')
            })
        },
        register() {
            this.axios.post('/user/register', {
                username: 'yangyuling',
                password: 'yangyuling'

            }).then(() => {
                alert('注册成功')
            })
        }
    },
}
</script>
<style lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

.login {
    background: #FFFFFF;
    width: 100%;
    height: 1080px;

    .container {
        width: 1226px;
        // padding-top: 19px;
        // padding-bottom: 32px;
        box-sizing: border-box;
    }

    .login-content {

        width: 100%;
        height: 576px;
        background: url('../../public/imgs/login-bg.jpg') no-repeat center;
        padding-top: 1px;
        padding-bottom: 17px;
        box-sizing: border-box;
        margin-bottom: 252px;


        .container {
            height: 558px;


            .login-box {
                position: absolute;
                right: 20px;
                top: 37px;
                width: 410px;
                height: 510px;
                background: #FFFFFF;
                display: flex;
                flex-direction: column;
                align-items: center;

                .login-header {
                    font-size: 24px;
                    color: #666666;
                    height: 112px;
                    line-height: 112px;

                    &>span:nth-child(1) {
                        font-weight: 400;
                        color: #FF6600;
                    }

                    &>span:nth-child(2) {
                        width: 2px;
                        height: 25px;
                        border: 2px solid #D7D7D7;
                        margin: auto 34px;
                    }
                }

                .login-input {
                    display: flex;
                    flex-direction: column;


                    input {
                        padding-left: 18px;
                        margin-bottom: 20px;
                        box-sizing: border-box;
                        width: 348px;
                        height: 50px;
                        border: 1px solid #E5E5E5;
                        font-size: 14px;
                        font-weight: 300;
                        color: #999999;
                        line-height: 50px;
                    }
                }

                .login-btn {
                    width: 348px;
                    height: 50px;
                    font-size: 16px;
                    color: #FFFFFF;
                    background: #FF6600;
                    line-height: 50px;
                    text-align: center;
                    margin: 12px 0;
                }

                .login-zhuce {
                    width: 348px;
                    height: 30px;
                    line-height: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 300;
                    color: #999999;

                    a {

                        color: #FF6600;
                    }

                    .zhuce-header {
                        width: 160px;
                        display: flex;
                        justify-content: space-between;
                    }
                }


            }
        }
    }

    .login-footer {
        width: 100%;
        font-size: 14px;
        color: #333333;

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;

            .copy {
                display: flex;
                justify-content: center;
                // justify-content: center;
                align-items: center;

                span {
                    width: 100px;
                    border-right: 1px solid #999999;
                    line-height: 20px;
                    text-align: center;
                    margin-bottom: 20px;
                }

                &>span:nth-child(5) {
                    width: 100px;
                    border-right: 0px solid #999999;
                    line-height: 20px;
                    text-align: center;
                }
            }

        }
    }
}
</style>