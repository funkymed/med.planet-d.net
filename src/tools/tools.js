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

export function getList(modules) {
  const list = [];
  for (let f in modules) {
    let d = modules[f].filename.split("/");

    if (typeof list[d[1]] === "undefined") {
      list[d[1]] = [];
    }
    list[d[1]].push({
      filename: modules[f].filename,
      size: modules[f].size,
      name: d[2].toLowerCase(),
      filters: modules[f]?.filters,
      text: modules[f]?.text,
    });
  }

  const mapList = [];
  for (let year in list) {
    mapList.push({
      year,
      mods: list[year].sort((a, b) => (a.name < b.name ? -1 : 1)),
    });
  }
  mapList.reverse();
  return mapList;
}
