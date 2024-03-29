/**
 * 获取页面视口大小
 * @returns {{pageHeight: number, pageWidth: number}}
 */
export function getViewPortSize() {
  let pageWidth = window.innerWidth;
  let pageHeight = window.innerHeight;
  if (typeof pageWidth !== 'number') {
    if (document.compatMode === 'CSS1Compat') {
      //  是在标准模式下
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      //  混杂模式下
      pageWidth = document.body.clientWidth;
      pageHeight = document.body.clientHeight;
    }
  }
  return {
    pageWidth,
    pageHeight
  }
}

/**
 * 下载资源
 * @param src
 */
export function downloadSource(src) {
  const link = document.createElement('a');
  const bodyDOM = document.body || document.getElementsByTagName('body')[0] || document.documentElement;
  if (typeof link.download !== 'undefined') {
    link.href = src;
    link.setAttribute('download', '');
    bodyDOM.appendChild(link);
    link.onclick = function(e) {
      e.stopPropagation();
    }
    link.click();
    bodyDOM.removeChild(link);
  } else {
    window.open(src, '_blank');
  }
}

/**
 * 判断是否IOS 环境《ipad || iphone》
 * @returns {boolean}
 */
export function isIos() {
  const ua = navigator.userAgent;
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const isIos = ipad || isIphone;
  return !!isIos;
}

/**
 * 判断是否微信环境
 */
export function isWeiXin() {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
}
