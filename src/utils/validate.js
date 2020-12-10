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
  return /[a-zA-Z][\w]{1,5}/.test(str)
}

/**
 * @description 验证密码格式
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(str) {
  return /[a-zA-Z][\w\.\?!]{5,15}/.test(str)
}
