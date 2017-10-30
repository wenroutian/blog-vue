/**
 * @file: index.
 * @intro: 数据请求统一封装.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 14:52.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入模块
import axios from 'axios'
import {port_code} from 'common/port_uri'
import router from 'src/router'
import {Message} from 'element-ui'
import store from 'store'
import {SET_USER_INFO} from 'store/actions/type'
import {server_base_url} from 'common/config'
import {cookieStorage} from 'common/storage'

//设置用户信息action
const setUserInfo = function (user) {
  store.dispatch(SET_USER_INFO, user)
}

const getAuthorization = function () {
  var userInfo = cookieStorage.get('user_info');
  var authorization = '';
  if (Object.keys(userInfo).length != 0) {
    authorization = userInfo.user.authorization;
  }
  return authorization;
}


export default function fetch(options) {
  return new Promise((resolve, reject) => {
    // https://github.com/mzabriskie/axios

    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: server_base_url,
      //设置请求超时设置
      timeout: 10000,
      //设置请求时的header
      headers: {
        'Authorization': getAuthorization(),
        //'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC92dWUtc3RvcmVhcGktd2ViLmRldi5jb20iLCJhdWQiOiJodHRwOlwvXC92dWUtc3RvcmVhcGktd2ViLmRldi5jb20iLCJpYXQiOjE1MDc3OTkzNzMsIm5iZiI6MTUwNzc5OTM3MywiZXhwIjoxNTEwMzkxMzczLCJqdGkiOjF9.K5sU_7CbPBfdovA8UEen9f-18A4KnzZb6JtJOMxafGk',
        'X-Powered-By': 'zhidian team'
      }
    })
    //请求处理
    instance(options)
      .then(({data: {code, msg, data}}) => {
        //console.log(data);
        //请求成功时,根据业务判断状态
        if (code === port_code.success) {
          resolve({code, msg, data})
          return false
        } else if (code === port_code.unlogin) {
          setUserInfo(null)
          router.replace({name: "login"})
        }
        Message.warning(msg)
        reject({code, msg, data})
      })
      .catch((error) => {
        console.log(error);
        //请求失败时,根据业务判断状态
        if (error.response) {
          let resError = error.response
          let resCode = resError.status
          let resMsg = error.message
          Message.error('操作失败！错误原因 ' + resMsg)
          reject({code: resCode, msg: resMsg})
        }
      })
  })
}
