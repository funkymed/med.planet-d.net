"use strict";
window.onhashchange = function () {
    tools.play(tools.getURLParameter());
};

window.onload = function () {
    d.getElementById("instruments").style.display = "none";
    var uri = tools.getURLParameter();
    if (uri) {
        tools.play(uri);
    }
    c.width = W;
    c.height = H;
    d.getElementById("tracks").style.height = H - 50;
    d.getElementById("pause").addEventListener("click", tools.pause);
    d.getElementById("stop").addEventListener("click", tools.stop);
    d.getElementById("hide").addEventListener("click", tools.hide);
    d.getElementById("info").addEventListener("click", tools.info);

    if (isIOS) {
        d.getElementById("main").style.display = "none";
        d.getElementById("locked").style.display = "block";

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.neoart.audioContext = new AudioContext();
        StartAudioContext(window.neoart.audioContext, "#unlock-button").then(function () {
            d.getElementById("main").style.display = "";
            d.getElementById("locked").style.display = "none";
        });

    } else {
        d.getElementById("locked").style.display = "none";
    }
};


window.onresize = function () {
    W = w.innerWidth || e.clientWidth || g.clientWidth;
    H = w.innerHeight || e.clientHeight || g.clientHeight;
    c.width = W;
    c.height = H;
    d.getElementById("tracks").style.height = H - 50;
};

window.onkeypress = function (evt) {
    if (evt.key == "p") {
        tools.pause();
    }
    if (evt.key == "s") {
        tools.stop();
    }
    if (evt.key == "h") {
        tools.hide();
    }
    if (evt.key == "i") {
        tools.info();
    }
};
