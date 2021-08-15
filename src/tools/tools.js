export const tools = {
  getURLParameter: function () {
    return decodeURIComponent(
      document.location.href.split("#")[1]
        ? document.location.href.split("#")[1]
        : ""
    );
  },
  streamXhr: function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onprogress = this.update_progress;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var stream = xhr.response;
        callback(stream);
        //d.getElementById("progress").style.width = "100%";
        //d.getElementById("progress").style.width = 0;
      }
    };
    xhr.send();
  },
};

export function getInnerSize() {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight || e.clientHeight || g.clientHeight;
  return { width, height };
}

function cutHex(h) {
  return h.charAt(0) === "#" ? h.substring(1, 7) : h;
}
function hexToR(h) {
  return parseInt(cutHex(h).substring(0, 2), 16);
}
function hexToG(h) {
  return parseInt(cutHex(h).substring(2, 4), 16);
}
function hexToB(h) {
  return parseInt(cutHex(h).substring(4, 6), 16);
}
export function hextoRGB(h) {
  return [hexToR(h), hexToG(h), hexToB(h)].join(",");
}

