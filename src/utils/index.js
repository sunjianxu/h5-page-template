/**
 * 获取页面视口大小
 * @returns {{pageHeight: number, pageWidth: number}}
 */
export function getViewPortSize() {
  var pageWidth = window.innerWidth;
  var pageHeight = window.innerHeight;
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
  var link = document.createElement('a');
  if (typeof link.download !== 'undefined') {
    link.href = src;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.onclick = function(e) {
      e.stopPropagation();
    }
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(src, '_blank');
  }
}
