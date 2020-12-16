/**
 * Created by Wansongtao on 10/12/20.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description 验证用户账号的格式
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return /^[a-zA-Z][\w]{1,5}$/.test(str)
}

/**
 * @description 验证密码格式
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(str) {
  return /^[a-zA-Z][\w\.\?!]{5,15}$/.test(str)
}

/**
 * @description 验证用户昵称
 * @param {*} str
 */
export function validateNickName(str) {
  return /^[\u4e00-\u9fa5]{1,8}$/.test(str)
}

/**
 * @description 验证qq号格式
 * @param {*} str
 */
export function validateQqAcc(str) {
  return /^[1-9][0-9]{4, 10}$/.test(str)
}

/**
 * @description 验证邮箱格式
 * @param {*} str
 */
export function validateEmail(str) {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)
}

/**
 * @description 验证人生格言格式
 * @param {*} str
 */
export function validateLifeMotto(str) {
  return /^[\u4e00-\u9fa5]{1,50}$/.test(str)
}

/**
 * @description 验证个人简介格式
 * @param {*} str
 */
export function validatePersonalDes(str) {
  return /^[\u4e00-\u9fa5]{10,200}$/.test(str)
}
