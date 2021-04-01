!(function(w, d) {
  var init = function() {
    d.body.style.fontSize = "14px";
    var MaxWidth = 640;
    var rootDOM = d.documentElement;
    var isMobile =
      navigator.userAgent.indexOf("iPhone") > 0 ||
      navigator.userAgent.indexOf("Android") > 0;
    var supportOrientation =
      typeof w.orientation === "number" &&
      typeof w.onorientationchange === "object";
    var baseRadix = 7.5;
    var unit = "px";
    var htmlNode = d.body.parentNode;
    var orientation;
    var updateOrientation = function() {
      d.getElementById("app").style.display = "none";
      w.setTimeout(function() {
        if (supportOrientation) {
          orientation = w.orientation;
          switch (orientation) {
            case 90:
            case -90:
              orientation = "landscape";
              break;
            default:
              orientation = "portrait";
              break;
          }
        } else {
          orientation = w.innerWidth > w.innerHeight ? "landscape" : "portrait";
        }
        htmlNode.setAttribute("class", orientation);
        rootDOM.style.fontSize =
          (orientation === "portrait"
            ? rootDOM.clientWidth
            : rootDOM.clientHeight) /
            baseRadix +
          unit;
        if (!isMobile) {
          rootDOM.style.fontSize = MaxWidth / 7.5 + "px";
          rootDOM.style.width = MaxWidth + "px";
          rootDOM.style.margin = "0 auto";
        }
        d.getElementById("app").style.display = "";
      }, 300);
    };
    w.addEventListener(
      supportOrientation ? "orientationchange" : "resize",
      updateOrientation,
      false
    );
    updateOrientation();
  };
  d.addEventListener("DOMContentLoaded", init, false);
})(window, document);
