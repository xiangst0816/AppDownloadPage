(function () {
  window.onload = function () {
    var ua = window.navigator.userAgent.toLowerCase()
    var isWeiXin = ua.indexOf('micromessenger') != -1
    if (isWeiXin) {
      document.getElementById('weixinDiv').style.display = 'block'
      var dpr = 462
      var pxPerRem = document.documentElement.clientWidth * dpr / 750
      document.getElementById('weixinImg').style.width = pxPerRem + 'px'
    }
  }
})()
