/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import {cookieStorage} from '../../common/storage'
import {localStorage} from '../../common/storage'

export default {
  //用户信息和是否登录
  user_info: 'xiaobo',
  menu_info: localStorage.get('menu_info'),
  left_menu_info: localStorage.get('left_menu_info'),
}
