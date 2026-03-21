// Single rAF loop - all rendering goes through here
const callbacks = new Map();
let rafId = null;
let running = false;

function tick(timestamp) {
  callbacks.forEach((cb) => cb(timestamp));
  if (running) {
    rafId = requestAnimationFrame(tick);
  }
}

function start() {
  if (running) return;
  running = true;
  rafId = requestAnimationFrame(tick);
}

function stop() {
  running = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function subscribe(key, callback) {
  callbacks.set(key, callback);
  if (!running) start();
}

export function unsubscribe(key) {
  callbacks.delete(key);
  if (callbacks.size === 0) stop();
}
