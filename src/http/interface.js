import axios from './api' // 倒入 api

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

//发送验证码
const sendVerifyCode = content => {
  return generalPost(110204, content);
}

//注册管理员
const register = content => {
  return generalPost(110205, content);
}

//绑定管理员
const bind = content => {
  return generalPost(110207, content);
}

//登录
const login = content => {
  return generalPost(110201, content);
}

//TODO:更多业务接口

const generalPost = (apiCode, content) => {
  return axios({
    url: '/',
    method: 'POST',
    data: {
      apiCode: apiCode,
      content: content || {}
    }
  })
}

// 默认全部导出
// 根据需要进行导出
export default {
  register,
  bind,
  login,
  sendVerifyCode
}
