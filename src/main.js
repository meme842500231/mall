import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import env from './env'
// import VueAxios from 'VueAxios'
Vue.prototype.$axios = axios
Vue.use(axios)
const mock=true
if(mock){
  require('./mock/api')
}
Vue.config.productionTip = false
axios.defaults.baseURL='/api'
axios.defaults.baseURL=env.baseURL
axios.defaults.timeout=8000
axios. interceptors. response. use(function(response){ 
  let res=response.data
  if(res.status==0){
    return res.data
  }else if(res.status==10){
    window.location.href='/ #/ login'
  }else{
    alert(res.msg)
  }
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
