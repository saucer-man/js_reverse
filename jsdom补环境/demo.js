const {JSDOM, VirtualConsole} = require("jsdom");
const dom = new JSDOM("<!DOCTYPE html><p>Hello world</p>", {
    url: "https://market.waimai.meituan.com", runScripts: 'dangerously', resources: 'usable', fetchOptions: {
        credentials: 'include'
    },
})
const {
    performance, PerformanceObserver,
} = require('perf_hooks');

window = dom.window;
Window = window;
// 添加matchMedia方法
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false, addListener: function () {
        }, removeListener: function () {
        }
    };
};
document = window.document;
window.performance.timing = performance.nodeTiming
localStorage = window.localStorage;
navigator = window.navigator;
Navigator = navigator
location = window.location;
history = window.history;
screen = window.screen;
// XMLHttpRequest = window.XMLHttpRequest;
const XMLHttpRequest = require('xhr2');

