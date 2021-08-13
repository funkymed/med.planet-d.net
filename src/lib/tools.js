"use strict";
var tools = {
  getURLParameter: function () {
    return decodeURIComponent(
      location.href.split("#")[1] ? location.href.split("#")[1] : ""
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
        d.getElementById("progress").style.width = "100%";
        d.getElementById("progress").style.width = 0;
      }
    };
    xhr.send();
  },
  pause: function () {
    d.getElementById("pause").blur();
    if (player) {
      if (player.paused) {
        d.getElementById("pause").innerText = "Pause";
        player.play();
        player.node.connect(analyser);
      } else {
        d.getElementById("pause").innerText = "Play";
        player.pause();
      }
    }
  },
  stop: function () {
    if (player) {
      player.stop();
      player.play();
      player.pause();
    }
    d.getElementById("stop").blur();
  },
  activeBtn: function (title) {
    var splited_title = title.split("/");
    var title_music = splited_title[splited_title.length - 1];
    for (var item of document.body.querySelectorAll("li > a")) {
        item.className = "";
    }
    for (var item of document.body.querySelectorAll("li > a")) {
      if (item.innerText === title_music) {
        item.className = "active";
        item.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
      }
    }
  },
  play: function (url) {
    var _this = this;
    d.getElementById("progress").style.width = 0;
    tools.streamXhr(url, function (b) {
      if (b) {
        if (player) {
          player.stop();
        }
        player = loader.load(b);
        _this.activeBtn(url);
        player.loopSong = true;
        player.play();
        d.getElementById("pause").innerText = "Pause";
        analyser = window.neoart.audioContext.createAnalyser();
        analyser.smoothingTimeConstant = 0.75;
        analyser.fftSize = 2048;
        player.node.connect(analyser);

        _this.updateInstrumentsList();
        startTime = Date.now();
        d.getElementById("title-track").innerText =
          "Now Playing : " +
          (player.title.trim() !== ""
            ? player.title.trim()
            : url.split("/").slice(-1)[0]);
        d.getElementsByTagName("title")[0].innerText =
          d.getElementById("title-track").innerText;
      }
    });
  },
  info: function () {
    d.getElementById("info").blur();
    var display = d.getElementById("instruments").style.display;
    d.getElementById("instruments").style.display =
      display === "none" ? "" : "none";
  },
  hide: function () {
    d.getElementById("hide").blur();
    var display = d.getElementById("hide").innerText === "Show" ? true : false;
    if (display) {
      d.getElementById("block").style.display = "";
      d.getElementById("hide").innerText = "Hide";
    } else {
      d.getElementById("block").style.display = "none";
      d.getElementById("hide").innerText = "Show";
    }
  },
  getList: function () {
    list = [];
    for (var f in modules) {
      var d = modules[f].split("/");
      if (typeof list[d[2]] === "undefined") {
        list[d[2]] = [];
      }
      list[d[2]].push({
        filename: modules[f],
        name: d[3],
      });
    }
    return list;
  },
  update_progress: function (e) {
    if (e.lengthComputable) {
      var percentage = Math.round((e.loaded / e.total) * 100);
      d.getElementById("progress").style.width = percentage + "%";
    }
  },
  updateInstrumentsList: function () {
    var instDiv = d.getElementById("instruments");
    instDiv.innerHTML = "";
    var names = !!player.instruments ? player.instruments : player.samples;
    for (var b in names) {
      if (names[b]) {
        instDiv.innerHTML += names[b].name + "<br/>";
      }
    }
  },
  spectrum: function (ctx, clear, speccolor, color, opacity, nbBar) {
    if (!analyser) return false;
    var cW = ctx.canvas.width;
    var cH = ctx.canvas.height;
    //if (clear) {
      
    //}
    if (color) {
      //ctx.fillStyle = "rgba(" + color + ", " + (opacity ? opacity : 1) + ")";
      //ctx.fillRect(0, 0, cW, cH);
    }

    nbBar = nbBar ? nbBar : 256;
    var i,
      SPACER_WIDTH = Math.round(cW / nbBar),
      BAR_WIDTH = SPACER_WIDTH,
      count = 0,
      fb = analyser.frequencyBinCount;

    BAR_WIDTH = BAR_WIDTH < 1 ? 1 : BAR_WIDTH;
    var freqByteData = new Uint8Array(fb);

    analyser.getByteFrequencyData(freqByteData);

    ctx.fillStyle = "rgba(" + speccolor + ",.8) ";
    for (var i = 0; i < cW; i += BAR_WIDTH) {
      var magnitude = freqByteData[count];
      magnitude = (magnitude / 256) * (cH - 50);
      //ctx.fillStyle = "rgba("+(i)+","+(i)+","+(i)+", .2)";
      var r = Math.round(Math.sin(count / nbBar) * 256);
      var v = 64;
      var b = Math.round(256 - (count / nbBar) * 256);
      ctx.fillStyle = "rgba(" + r + "," + v + "," + b + ", .5)";
      ctx.fillRect(i, cH, BAR_WIDTH, -magnitude);
      count++;
    }
  },
  oscillo: function (ctx, clear, oscillocolor, color, opacity) {
    if (!analyser) return false;
    var cW = ctx.canvas.width;
    var cH = ctx.canvas.height;
    if (clear) {
      ctx.clearRect(0, 0, cW, cH);
    }
    if (color) {
      ctx.fillStyle = "rgba(" + color + ", " + (opacity ? opacity : 1) + ")";
      ctx.fillRect(0, 0, cW, cH);
    }
    var i,
      fb = analyser.frequencyBinCount;
    var freqByteData = new Uint8Array(fb);
    analyser.getByteTimeDomainData(freqByteData);
    ctx.fillStyle = oscillocolor;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    for (i = 0; i < fb; i++) {
      var value_old = freqByteData[i - 1];

      var percent_old = value_old / 256;
      var height_old = cH/2 * percent_old/2;
      var offset_old = cH/2 - height_old/2 - 1;
      var barWidth_old = cW / analyser.frequencyBinCount;

      var value = freqByteData[i];
      var percent = value / 256;
      var height = cH/2 * percent/2;
      var offset = cH/2 - height/2 - 1;
      var barWidth = cW / analyser.frequencyBinCount;

      ctx.beginPath();
      ctx.moveTo((i - 1) * barWidth_old, offset_old);
      ctx.lineTo(i * barWidth, offset);
      ctx.stroke();
    }
  },
};

function rgbToHex(r, g, b) {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
function hextoRGB(h) {
  return [hexToR(h), hexToG(h), hexToB(h)].join(",");
}
function hexToDec(h) {
  return parseInt(cutHex(h), 16);
}
