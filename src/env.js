let baseURL
console.log(process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
    case 'development':
        baseURL = 'http://dev-mall-pre.springboot.cn/development/api'
        break;
    case 'production':
        baseURL = 'http://mall-pre.springboot.cn/production/api'
        break;
    default:
        break;
}
export default {
    baseURL
}