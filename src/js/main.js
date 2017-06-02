/**
 * get userAgent info
 * */
window.ua = (function () {
  var u = navigator.userAgent
  var u2 = navigator.userAgent.toLowerCase()
  return { //移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
    weixin: u2.match(/MicroMessenger/i) == 'micromessenger',
    qq: u.indexOf('mqqbrowser') > -1,
    dingtalk: u.indexOf('dingtalk') > -1,
    ucbrowser: u.indexOf('ucbrowser') > -1,
    weibo: u.indexOf('Weibo') > -1,
    ali: u.indexOf('AliApp') > -1
  }
})();

(function () {
  window.onload = function () {
    if (ua.weixin) {
      document.getElementById('weixinDiv').style.display = 'block'
      var dpr = 462
      var pxPerRem = document.documentElement.clientWidth * dpr / 750
      document.getElementById('weixinImg').style.width = pxPerRem + 'px'
    }
  }
})()

/**
 * @function getQueryValue
 * @description
 * 获取地址栏search参数
 * @param {String} name - key
 * @return {String}
 * @example
 * getQueryValue('name')
 * */
function getQueryValue (name) {
  var result = window.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'))
  if (result == null || result.length < 1 || result[1] == 'undefined') {
    return ''
  }
  return decodeURIComponent(result[1])
}