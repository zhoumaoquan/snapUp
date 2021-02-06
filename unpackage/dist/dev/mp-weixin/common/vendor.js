(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"SnapUp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/network/config.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.METHOD = exports.HEADER = exports.TIME_IUT = exports.BASE_URL = void 0;var BASE_URL = 'https://api.pddblj.com/';exports.BASE_URL = BASE_URL;

var TIME_IUT = 6000;exports.TIME_IUT = TIME_IUT;

var HEADER = {
  "Content-Type": "application/x-www-form-urlencoded" };exports.HEADER = HEADER;


var METHOD = 'POST';exports.METHOD = METHOD;

/***/ }),

/***/ 13:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 133:
/*!************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/libs/upload.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 22));var _config = __webpack_require__(/*! @/network/config */ 10);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var



Upload = /*#__PURE__*/function () {
  function Upload(object) {_classCallCheck(this, Upload);
    this.obj = {
      count: 1 };

    if (Object.prototype.toString.call(object) === "[object Object]") {
      Object.assign(this.obj, object);
    } else {
      uni.showToast({
        title: '参数必须为对象',
        icon: "icon",
        duration: 2000 });

    }


    return this;
  }
  // 上传图片 返回一个图片的数组集合
  _createClass(Upload, [{ key: "uploadPic", value: function () {var _uploadPic = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var _this = this;var chooseImageResult, imgArr;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  this.chooseImage());case 2:chooseImageResult = _context2.sent;
                console.log("选择图片", chooseImageResult);_context2.next = 6;return (

                  chooseImageResult.tempFilePaths.map( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(item, index) {var uploadFileResult;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                              uni.showLoading({
                                title: '正在上传,请等待...',
                                mask: true });_context.next = 3;return (

                                _this.uploadFile(item));case 3:uploadFileResult = _context.sent;return _context.abrupt("return",
                              uploadFileResult);case 5:case "end":return _context.stop();}}}, _callee);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}()));case 6:imgArr = _context2.sent;return _context2.abrupt("return",


                new Promise(function (resolve, reject) {
                  Promise.all(imgArr).then(function (result) {

                    // uni.hideLoading();
                    uni.showToast({
                      title: '上传成功',
                      icon: "none",
                      duration: 2000 });

                    resolve(result);
                  });
                }));case 8:case "end":return _context2.stop();}}}, _callee2, this);}));function uploadPic() {return _uploadPic.apply(this, arguments);}return uploadPic;}() }, { key: "uploadFile", value: function uploadFile(

    file) {var _this2 = this;
      return new Promise(function (resolve, reject) {
        uni.uploadFile({
          url: _config.BASE_URL + _this2.obj.url,
          filePath: file,
          name: 'image',
          success: function success(res) {
            var data = res.data;
            resolve(JSON.parse(data));
          },
          header: {
            'content-type': 'multipart/form-data' },

          formData: {
            folder: 1 },

          fail: function fail(res) {
            reject("上传失败");
          },
          complete: function complete(res) {
            uni.hideToast();
          } });

      });
    } }, { key: "chooseImage", value: function chooseImage()
    {var _this3 = this;
      return new Promise(function (resolve, reject) {
        uni.showActionSheet({
          itemList: ['从手机相册中选择', '拍摄'],
          itemColor: '#000000',
          success: function success(status) {
            if (!status.cancel) {
              var Type = status.tapIndex == 0 ? 'album' : 'camera';
              uni.chooseImage({
                count: _this3.obj.count, //1, // 默认9
                sizeType: ['compressed'], //['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: [Type], //['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function success(res) {
                  resolve(res);
                },
                fail: function fail() {
                  reject("选择图片失败");
                } });

            }
          } });


      });
    } }]);return Upload;}();exports.default = Upload;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 15));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 16));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 20));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 21));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 25));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 26));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 27));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 28));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 29));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 30));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 31));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 18));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 17));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 32));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 19));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 33));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 34));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 35));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 36));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 37));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 38);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 39));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 40));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 41));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 142:
/*!******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/network/Login-api.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getUserPhone = exports.saveUserInfo = exports.getOpenCode = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 获取openid
var getOpenCode = function getOpenCode(code) {
  return (0, _request.default)({
    url: 'Passport/openidForCode',
    data: {
      code: code || '' } });


};

// 保存用户信息
exports.getOpenCode = getOpenCode;var saveUserInfo = function saveUserInfo(option) {
  return (0, _request.default)({
    url: 'Passport/login',
    data: {
      openid: option.openid,
      avatar: option.avatar,
      gender: option.gender,
      nickname: option.nickname,
      account: option.account,
      code: option.code || '' } });


};

// 获取手机号
exports.saveUserInfo = saveUserInfo;var getUserPhone = function getUserPhone(option) {
  return (0, _request.default)({
    url: 'Passport/getphone',
    data: _objectSpread({},
    option) });


};exports.getUserPhone = getUserPhone;

/***/ }),

/***/ 143:
/*!*************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/libs/loadimg.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.downloadFile = exports.uploadHead = void 0;var _config = __webpack_require__(/*! @/network/config */ 10);
var uploadHead = function uploadHead(option) {
  if (option.loading) {
    uni.showLoading({
      title: '上传中...',
      mask: true });

  }
  return new Promise(function (resolve, reject) {
    uni.uploadFile({
      url: _config.BASE_URL + option.url,
      filePath: option.imgUrl,
      name: 'image',
      header: {
        'content-type': 'multipart/form-data' },

      formData: {
        folder: 1 },

      success: function success(res) {
        var data = JSON.parse(res.data);
        resolve(data);
      },
      complete: function complete() {
        if (option.loading) {
          uni.hideLoading();
        }
      },
      file: function file(err) {
        reject(err);
      } });

  });
};exports.uploadHead = uploadHead;

var downloadFile = function downloadFile(ImgUrl) {
  return new Promise(function (resolve, reject) {
    uni.downloadFile({
      url: ImgUrl,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
};exports.downloadFile = downloadFile;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!**************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/mixin/mixin.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/request/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 17));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/deepMerge.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 18:
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/deepClone.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 19:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/test.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"SnapUp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"SnapUp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"SnapUp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"SnapUp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/queryParams.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 208:
/*!**************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/static/image/not-address.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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gGDYBWiSRBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQeBOROD/A1ZYSTpaE83YAAAAAElFTkSuQmCC"

/***/ }),

/***/ 21:
/*!*****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/route.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 23);

/***/ }),

/***/ 23:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 24);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 24:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 25:
/*!**********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/timeFormat.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(Number(dateTime));
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 26:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/timeFrom.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 25));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timedats = timedat(timestamp);
  var week = getWeek(timedats);

  var timer = new Date().getTime() - timestamp;


  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      if (timer >= 86400 && timer < 172800) {
        tips = '昨天';
        break;
      } else if (timer >= 172800 && timer < 259200) {
        tips = '前天';
        break;
      } else if (timer >= 259200 && timer < 604800) {
        tips = week;
        break;
      } else {
        tips = parseInt(timer / 86400) + '天前';
        break;
      }
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}
function timedat(res) {//res 为传入的时间戳   例：1509091800000
  var time = new Date(res);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '-' + m + '-' + d;
};

//根据时间判断星期几
function getWeek(timedat) {//timedat参数格式：   getWeek（new Date("2017-10-27" )）
  var weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  var week = weekArr[new Date(timedat).getDay()];

  return week;
}var _default =
timeFrom;exports.default = _default;

/***/ }),

/***/ 27:
/*!*************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/colorGradient.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 28:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/guid.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 29:
/*!*****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/color.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/type2icon.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 301:
/*!**********************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/static/image/history.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 31:
/*!***********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/randomArray.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 32:
/*!*******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/addUnit.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 33:
/*!******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/random.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 34:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/trim.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 35:
/*!*****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/toast.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/getParent.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 37:
/*!*******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/$parent.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 38:
/*!***************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/sys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 381:
/*!***********************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/static/image/not-data.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 39:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/debounce.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 4:
/*!********************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/pages.json ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/function/throttle.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 41:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/config/config.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-11-19
var version = '1.8.2';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 42:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/config/zIndex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 438:
/*!**********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/components/u-parse/libs/MpHtmlParser.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * html 解析器
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20201029
 * @author JinYufeng
 * @listens MIT
 */
var cfg = __webpack_require__(/*! ./config.js */ 439),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 440),
windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;

function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.attrs = {};
  this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
  this.data = data;
  this.domain = options.domain;
  this.DOM = [];
  this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
  options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
  this.options = options;
  this.state = this.Text;
  this.STACK = [];
  // 工具函数
  this.bubble = function () {
    for (var i = _this.STACK.length, item; item = _this.STACK[--i];) {
      if (cfg.richOnlyTags[item.name]) return false;
      item.c = 1;
    }
    return true;
  };
  this.decode = function (val, amp) {
    var i = -1,
    j,en;
    while (1) {
      if ((i = val.indexOf('&', i + 1)) == -1) break;
      if ((j = val.indexOf(';', i + 2)) == -1) break;
      if (val[i + 1] == '#') {
        en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
        if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
      } else {
        en = val.substring(i + 1, j);
        if (cfg.entities[en] || en == amp)
        val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
      }
    }
    return val;
  };
  this.getUrl = function (url) {
    if (url[0] == '/') {
      if (url[1] == '/') url = _this.options.prot + ':' + url;else
      if (_this.domain) url = _this.domain + url;
    } else if (_this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
    url = _this.domain + '/' + url;
    return url;
  };
  this.isClose = function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';};
  this.section = function () {return _this.data.substring(_this.start, _this.i);};
  this.parent = function () {return _this.STACK[_this.STACK.length - 1];};
  this.siblings = function () {return _this.STACK.length ? _this.parent().children : _this.DOM;};
}
MpHtmlParser.prototype.parse = function () {
  if (emoji) this.data = emoji.parseEmoji(this.data);
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  if (this.state == this.Text) this.setText();
  while (this.STACK.length) {this.popNode(this.STACK.pop());}
  return this.DOM;
};
// 设置属性
MpHtmlParser.prototype.setAttr = function () {
  var name = this.attrName.toLowerCase(),
  val = this.attrVal;
  if (cfg.boolAttrs[name]) this.attrs[name] = 'T';else
  if (val) {
    if (name == 'src' || name == 'data-src' && !this.attrs.src) this.attrs.src = this.getUrl(this.decode(val, 'amp'));else
    if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else
    if (name.substr(0, 5) != 'data-') this.attrs[name] = val;
  }
  this.attrVal = '';
  while (blankChar[this.data[this.i]]) {this.i++;}
  if (this.isClose()) this.setNode();else
  {
    this.start = this.i;
    this.state = this.AttrName;
  }
};
// 设置文本节点
MpHtmlParser.prototype.setText = function () {
  var back,text = this.section();
  if (!text) return;
  text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;
  if (back) {
    this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
    var j = this.start + text.length;
    for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}
    return;
  }
  if (!this.pre) {
    // 合并空白符
    var flag,tmp = [];
    for (var i = text.length, c; c = text[--i];) {
      if (!blankChar[c]) {
        tmp.unshift(c);
        if (!flag) flag = 1;
      } else {
        if (tmp[0] != ' ') tmp.unshift(' ');
        if (c == '\n' && flag == void 0) flag = 0;
      }}
    if (flag == 0) return;
    text = tmp.join('');
  }
  this.siblings().push({
    type: 'text',
    text: this.decode(text) });

};
// 设置元素节点
MpHtmlParser.prototype.setNode = function () {
  var node = {
    name: this.tagName.toLowerCase(),
    attrs: this.attrs },

  close = cfg.selfClosingTags[node.name];
  if (this.options.nodes.length) node.type = 'node';
  this.attrs = {};
  if (!cfg.ignoreTags[node.name]) {
    // 处理属性
    var attrs = node.attrs,
    style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
    styleObj = {};
    if (attrs.id) {
      if (this.options.compress & 1) attrs.id = void 0;else
      if (this.options.useAnchor) this.bubble();
    }
    if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
    switch (node.name) {
      case 'a':
      case 'ad':


        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'embed':

        var src = node.attrs.src || '',
        type = node.attrs.type || '';
        if (type.includes('video') || src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8'))
        node.name = 'video';else
        if (type.includes('audio') || src.includes('.m4a') || src.includes('.wav') || src.includes('.mp3') || src.includes(
        '.aac'))
        node.name = 'audio';else
        break;
        if (node.attrs.autostart)
        node.attrs.autoplay = 'T';
        node.attrs.controls = 'T';





      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else
        this["".concat(node.name, "Num")]++;
        if (node.name == 'video') {
          if (this.videoNum > 3)
          node.lazyLoad = 1;
          if (attrs.width) {
            styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
            attrs.width = void 0;
          }
          if (attrs.height) {
            styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
            attrs.height = void 0;
          }
        }
        if (!attrs.controls && !attrs.autoplay) attrs.controls = 'T';
        attrs.source = [];
        if (attrs.src) {
          attrs.source.push(attrs.src);
          attrs.src = void 0;
        }
        this.bubble();
        break;
      case 'td':
      case 'th':
        if (attrs.colspan || attrs.rowspan)
        for (var k = this.STACK.length, item; item = this.STACK[--k];) {
          if (item.name == 'table') {
            item.flag = 1;
            break;
          }}}

    if (attrs.align) {
      if (node.name == 'table') {
        if (attrs.align == 'center') styleObj['margin-inline-start'] = styleObj['margin-inline-end'] = 'auto';else
        styleObj['float'] = attrs.align;
      } else styleObj['text-align'] = attrs.align;
      attrs.align = void 0;
    }
    // 压缩 style
    var styles = style.split(';');
    style = '';
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var _key = info[0].trim().toLowerCase(),
      _value = info.slice(1).join(':').trim();
      if (_value[0] == '-' || _value.includes('safe'))
      style += ";".concat(_key, ":").concat(_value);else
      if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import'))
      styleObj[_key] = _value;
    }
    if (node.name == 'img') {
      if (attrs.src && !attrs.ignore) {
        if (this.bubble())
        attrs.i = (this.imgNum++).toString();else
        attrs.ignore = 'T';
      }
      if (attrs.ignore) {
        style += ';-webkit-touch-callout:none';
        styleObj['max-width'] = '100%';
      }
      var width;
      if (styleObj.width) width = styleObj.width;else
      if (attrs.width) width = attrs.width.includes('%') ? attrs.width : parseFloat(attrs.width) + 'px';
      if (width) {
        styleObj.width = width;
        attrs.width = '100%';
        if (parseInt(width) > windowWidth) {
          styleObj.height = '';
          if (attrs.height) attrs.height = void 0;
        }
      }
      if (styleObj.height) {
        attrs.height = styleObj.height;
        styleObj.height = '';
      } else if (attrs.height && !attrs.height.includes('%'))
      attrs.height = parseFloat(attrs.height) + 'px';
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (!value) continue;
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // 填充链接
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      }
      // 转换 rpx
      else if (value.includes('rpx'))
        value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * windowWidth / 750 + 'px';});else
        if (key == 'white-space' && value.includes('pre') && !close)
        this.pre = node.pre = true;
      style += ";".concat(key, ":").concat(value);
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (!close) {
      node.children = [];
      if (node.name == 'pre' && cfg.highlight) {
        this.remove(node);
        this.pre = node.pre = true;
      }
      this.siblings().push(node);
      this.STACK.push(node);
    } else if (!cfg.filter || cfg.filter(node, this) != false)
    this.siblings().push(node);
  } else {
    if (!close) this.remove(node);else
    if (node.name == 'source') {
      var parent = this.parent();
      if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
      parent.attrs.source.push(node.attrs.src);
    } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
  }
  if (this.data[this.i] == '/') this.i++;
  this.start = this.i + 1;
  this.state = this.Text;
};
// 移除标签
MpHtmlParser.prototype.remove = function (node) {var _this2 = this;
  var name = node.name,
  j = this.i;
  // 处理 svg
  var handleSvg = function handleSvg() {
    var src = _this2.data.substring(j, _this2.i + 1);
    node.attrs.xmlns = 'http://www.w3.org/2000/svg';
    for (var key in node.attrs) {
      if (key == 'viewbox') src = " viewBox=\"".concat(node.attrs.viewbox, "\"") + src;else
      if (key != 'style') src = " ".concat(key, "=\"").concat(node.attrs[key], "\"") + src;
    }
    src = '<svg' + src;
    var parent = _this2.parent();
    if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
    parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
    _this2.siblings().push({
      name: 'img',
      attrs: {
        src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
        style: node.attrs.style,
        ignore: 'T' } });


  };
  if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
  while (1) {
    if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
      if (name == 'pre' || name == 'svg') this.i = j;else
      this.i = this.data.length;
      return;
    }
    this.start = this.i += 2;
    while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}
    if (this.section().toLowerCase() == name) {
      // 代码块高亮
      if (name == 'pre') {
        this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.
        substr(this.i - 5);
        return this.i = j;
      } else if (name == 'style')
      this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else
      if (name == 'title')
      this.DOM.title = this.data.substring(j + 1, this.i - 7);
      if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
      if (name == 'svg') handleSvg();
      return;
    }
  }
};
// 节点出栈处理
MpHtmlParser.prototype.popNode = function (node) {
  // 空白符处理
  if (node.pre) {
    node.pre = this.pre = void 0;
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].pre)
      this.pre = true;}
  }
  var siblings = this.siblings(),
  len = siblings.length,
  childs = node.children;
  if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false)
  return siblings.pop();
  var attrs = node.attrs;
  // 替换一些标签名
  if (cfg.blockTags[node.name]) node.name = 'div';else
  if (!cfg.trustTags[node.name]) node.name = 'span';
  // 处理列表
  if (node.c && (node.name == 'ul' || node.name == 'ol')) {
    if ((node.attrs.style || '').includes('list-style:none')) {
      for (var _i = 0, child; child = childs[_i++];) {
        if (child.name == 'li')
        child.name = 'div';}
    } else if (node.name == 'ul') {
      var floor = 1;
      for (var _i2 = this.STACK.length; _i2--;) {
        if (this.STACK[_i2].name == 'ul') floor++;}
      if (floor != 1)
      for (var _i3 = childs.length; _i3--;) {
        childs[_i3].floor = floor;}
    } else {
      for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
        if (_child.name == 'li') {
          _child.type = 'ol';
          _child.num = function (num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
              ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
              res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          }(num++, attrs.type) + '.';
        }}
    }
  }
  // 处理表格
  if (node.name == 'table') {
    var padding = parseFloat(attrs.cellpadding),
    spacing = parseFloat(attrs.cellspacing),
    border = parseFloat(attrs.border);
    if (node.c) {
      if (isNaN(padding)) padding = 2;
      if (isNaN(spacing)) spacing = 2;
    }
    if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
    if (node.flag && node.c) {
      // 有 colspan 或 rowspan 且含有链接的表格转为 grid 布局实现
      attrs.style = "".concat(attrs.style || '', ";").concat(spacing ? ";grid-gap:".concat(spacing, "px") : ';border-left:0;border-top:0');
      var row = 1,
      col = 1,
      colNum,
      trs = [],
      children = [],
      map = {};
      (function f(ns) {
        for (var i = 0; i < ns.length; i++) {
          if (ns[i].name == 'tr') trs.push(ns[i]);else
          f(ns[i].children || []);
        }
      })(node.children);
      for (var _i5 = 0; _i5 < trs.length; _i5++) {
        for (var j = 0, td; td = trs[_i5].children[j]; j++) {
          if (td.name == 'td' || td.name == 'th') {
            while (map[row + '.' + col]) {col++;}
            var cell = {
              name: 'div',
              c: 1,
              attrs: {
                style: (td.attrs.style || '') + (border ? ";border:".concat(border, "px solid gray") + (spacing ? '' :
                ';border-right:0;border-bottom:0') : '') + (padding ? ";padding:".concat(padding, "px") : '') },

              children: td.children };

            if (td.attrs.colspan) {
              cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + parseInt(td.attrs.colspan));
              if (!td.attrs.rowspan) cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + 1);
              col += parseInt(td.attrs.colspan) - 1;
            }
            if (td.attrs.rowspan) {
              cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + parseInt(td.attrs.rowspan));
              if (!td.attrs.colspan) cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + 1);
              for (var k = 1; k < td.attrs.rowspan; k++) {map[row + k + '.' + col] = 1;}
            }
            children.push(cell);
            col++;
          }
        }
        if (!colNum) {
          colNum = col - 1;
          attrs.style += ";grid-template-columns:repeat(".concat(colNum, ",auto)");
        }
        col = 1;
        row++;
      }
      node.children = children;
    } else {
      attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
      if (border || padding)
      (function f(ns) {
        for (var i = 0, n; n = ns[i]; i++) {
          if (n.name == 'th' || n.name == 'td') {
            if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style || '');
            if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style || '');
          } else f(n.children || []);
        }
      })(childs);
    }
    if (this.options.autoscroll) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:scroll' };

      node.children = [table];
    }
  }
  this.CssHandler.pop && this.CssHandler.pop(node);
  // 自动压缩
  if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
  siblings[len - 1] = childs[0];
};
// 状态机
MpHtmlParser.prototype.Text = function (c) {
  if (c == '<') {
    var next = this.data[this.i + 1],
    isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};
    if (isLetter(next)) {
      this.setText();
      this.start = this.i + 1;
      this.state = this.TagName;
    } else if (next == '/') {
      this.setText();
      if (isLetter(this.data[++this.i + 1])) {
        this.start = this.i + 1;
        this.state = this.EndTag;
      } else this.Comment();
    } else if (next == '!' || next == '?') {
      this.setText();
      this.Comment();
    }
  }
};
MpHtmlParser.prototype.Comment = function () {
  var key;
  if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
  if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
  key = '>';
  if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
  this.i += key.length - 1;
  this.start = this.i + 1;
  this.state = this.Text;
};
MpHtmlParser.prototype.TagName = function (c) {
  if (blankChar[c]) {
    this.tagName = this.section();
    while (blankChar[this.data[this.i]]) {this.i++;}
    if (this.isClose()) this.setNode();else
    {
      this.start = this.i;
      this.state = this.AttrName;
    }
  } else if (this.isClose()) {
    this.tagName = this.section();
    this.setNode();
  }
};
MpHtmlParser.prototype.AttrName = function (c) {
  if (c == '=' || blankChar[c] || this.isClose()) {
    this.attrName = this.section();
    if (blankChar[c])
    while (blankChar[this.data[++this.i]]) {;}
    if (this.data[this.i] == '=') {
      while (blankChar[this.data[++this.i]]) {;}
      this.start = this.i--;
      this.state = this.AttrValue;
    } else this.setAttr();
  }
};
MpHtmlParser.prototype.AttrValue = function (c) {
  if (c == '"' || c == "'") {
    this.start++;
    if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
    this.attrVal = this.section();
    this.i++;
  } else {
    for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
    this.attrVal = this.section();
  }
  this.setAttr();
};
MpHtmlParser.prototype.EndTag = function (c) {
  if (blankChar[c] || c == '>' || c == '/') {
    var name = this.section().toLowerCase();
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].name == name) break;}
    if (i != -1) {
      var node;
      while ((node = this.STACK.pop()).name != name) {this.popNode(node);}
      this.popNode(node);
    } else if (name == 'p' || name == 'br')
    this.siblings().push({
      name: name,
      attrs: {} });

    this.i = this.data.indexOf('>', this.i);
    this.start = this.i + 1;
    if (this.i == -1) this.i = this.data.length;else
    this.state = this.Text;
  }
};
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 439:
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/components/u-parse/libs/config.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */
var cfg = {
  // 出错占位图
  errorImg: null,
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr'),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend'),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = Object.create(null),
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}


if (wx.canIUse('editor')) {
  cfg.blockTags.pre = void 0;
  cfg.ignoreTags.rp = true;
  Object.assign(cfg.richOnlyTags, makeMap('bdi,bdo,caption,rt,ruby'));
  Object.assign(cfg.trustTags, makeMap('bdi,bdo,caption,pre,rt,ruby'));
}







module.exports = cfg;

/***/ }),

/***/ 440:
/*!********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/components/u-parse/libs/CssHandler.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cfg = __webpack_require__(/*! ./config.js */ 439),
isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};

function CssHandler(tagStyle) {
  var styles = Object.assign(Object.create(null), cfg.userAgentStyles);
  for (var item in tagStyle) {
    styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}
  this.styles = styles;
}
CssHandler.prototype.getStyle = function (data) {
  this.styles = new parser(data, this.styles).parse();
};
CssHandler.prototype.match = function (name, attrs) {
  var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
  if (attrs.class) {
    var items = attrs.class.split(' ');
    for (var i = 0, item; item = items[i]; i++) {
      if (tmp = this.styles['.' + item])
      matched += tmp + ';';}
  }
  if (tmp = this.styles['#' + attrs.id])
  matched += tmp + ';';
  return matched;
};
module.exports = CssHandler;

function parser(data, init) {
  this.data = data;
  this.floor = 0;
  this.i = 0;
  this.list = [];
  this.res = init;
  this.state = this.Space;
}
parser.prototype.parse = function () {
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  return this.res;
};
parser.prototype.section = function () {
  return this.data.substring(this.start, this.i);
};
// 状态机
parser.prototype.Space = function (c) {
  if (c == '.' || c == '#' || isLetter(c)) {
    this.start = this.i;
    this.state = this.Name;
  } else if (c == '/' && this.data[this.i + 1] == '*')
  this.Comment();else
  if (!cfg.blankChar[c] && c != ';')
  this.state = this.Ignore;
};
parser.prototype.Comment = function () {
  this.i = this.data.indexOf('*/', this.i) + 1;
  if (!this.i) this.i = this.data.length;
  this.state = this.Space;
};
parser.prototype.Ignore = function (c) {
  if (c == '{') this.floor++;else
  if (c == '}' && ! --this.floor) {
    this.list = [];
    this.state = this.Space;
  }
};
parser.prototype.Name = function (c) {
  if (cfg.blankChar[c]) {
    this.list.push(this.section());
    this.state = this.NameSpace;
  } else if (c == '{') {
    this.list.push(this.section());
    this.Content();
  } else if (c == ',') {
    this.list.push(this.section());
    this.Comma();
  } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
  this.state = this.Ignore;
};
parser.prototype.NameSpace = function (c) {
  if (c == '{') this.Content();else
  if (c == ',') this.Comma();else
  if (!cfg.blankChar[c]) this.state = this.Ignore;
};
parser.prototype.Comma = function () {
  while (cfg.blankChar[this.data[++this.i]]) {;}
  if (this.data[this.i] == '{') this.Content();else
  {
    this.start = this.i--;
    this.state = this.Name;
  }
};
parser.prototype.Content = function () {
  this.start = ++this.i;
  if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
  var content = this.section();
  for (var i = 0, item; item = this.list[i++];) {
    if (this.res[item]) this.res[item] += ';' + content;else
    this.res[item] = content;}
  this.list = [];
  this.state = this.Space;
};

/***/ }),

/***/ 455:
/*!*****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/component/lime-painter/utils.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.isNumber = isNumber;exports.toPx = toPx;exports.compareVersion = compareVersion;exports.base64ToPath = base64ToPath;exports.pathToBase64 = pathToBase64;exports.getImageInfo = getImageInfo;exports.CHAR_WIDTH_SCALE_MAP = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}var screen = uni.getSystemInfoSync().windowWidth / 750;
// 缓存图片
var cache = {};
function isNumber(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
}
function toPx(value, baseSize) {
  // 如果是数字
  if (typeof value === 'number') {
    return value;
  }
  // 如果是字符串数字
  if (isNumber(value)) {
    return value * 1;
  }
  // 如果有单位
  if (typeof value === 'string') {
    var reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(em|rpx|px|%)$/g;
    var results = reg.exec(value);
    if (!value || !results) {
      return 0;
    }
    var unit = results[2];
    value = parseFloat(value);
    var res = 0;
    if (unit === 'rpx') {
      res = Math.floor(value * (screen || 0.5) * 1);
    } else if (unit === 'px') {
      res = Math.floor(value * 1);
    } else if (unit === '%') {
      res = Math.floor(value * toPx(baseSize) / 100);
    } else if (unit === 'em') {
      res = Math.ceil(value * toPx(baseSize || 14));
    }
    return res;
  }
}

// 计算版本
function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var len = Math.max(v1.length, v2.length);
  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }
  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i], 10);
    var num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

/** 从 0x20 开始到 0x80 的字符宽度数据 */
var CHAR_WIDTH_SCALE_MAP = [0.296, 0.313, 0.436, 0.638, 0.586, 0.89, 0.87, 0.256, 0.334, 0.334, 0.455, 0.742,
0.241, 0.433, 0.241, 0.427, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.241, 0.241, 0.742,
0.742, 0.742, 0.483, 1.031, 0.704, 0.627, 0.669, 0.762, 0.55, 0.531, 0.744, 0.773, 0.294, 0.396, 0.635, 0.513, 0.977,
0.813, 0.815, 0.612, 0.815, 0.653, 0.577, 0.573, 0.747, 0.676, 1.018, 0.645, 0.604, 0.62, 0.334, 0.416, 0.334, 0.742,
0.448, 0.295, 0.553, 0.639, 0.501, 0.64, 0.567, 0.347, 0.64, 0.616, 0.266, 0.267, 0.544, 0.266, 0.937, 0.616, 0.636,
0.639, 0.64, 0.382, 0.463, 0.373, 0.616, 0.525, 0.79, 0.507, 0.529, 0.492, 0.334, 0.269, 0.334, 0.742, 0.296];exports.CHAR_WIDTH_SCALE_MAP = CHAR_WIDTH_SCALE_MAP;


var prefix = function prefix() {




  return wx;













};

var base64ToArrayBuffer = function base64ToArrayBuffer(data) {
  /**
                                                               * base64ToArrayBuffer
                                                               * Base64Binary.decode(base64_string);  
                                                               * Base64Binary.decodeArrayBuffer(base64_string); 
                                                               */
  var Base64Binary = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /* will return a  Uint8Array type */
    decodeArrayBuffer: function decodeArrayBuffer(input) {
      var bytes = input.length / 4 * 3;
      var ab = new ArrayBuffer(bytes);
      this.decode(input, ab);
      return ab;
    },

    removePaddingChars: function removePaddingChars(input) {
      var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
      if (lkey == 64) {
        return input.substring(0, input.length - 1);
      }
      return input;
    },

    decode: function decode(input, arrayBuffer) {
      //get last chars to see if are valid
      input = this.removePaddingChars(input);
      input = this.removePaddingChars(input);

      var bytes = parseInt(input.length / 4 * 3, 10);

      var uarray;
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      var j = 0;

      if (arrayBuffer)
      uarray = new Uint8Array(arrayBuffer);else

      uarray = new Uint8Array(bytes);

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      for (i = 0; i < bytes; i += 3) {
        //get the 3 octects in 4 ascii chars
        enc1 = this._keyStr.indexOf(input.charAt(j++));
        enc2 = this._keyStr.indexOf(input.charAt(j++));
        enc3 = this._keyStr.indexOf(input.charAt(j++));
        enc4 = this._keyStr.indexOf(input.charAt(j++));

        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;

        uarray[i] = chr1;
        if (enc3 != 64) uarray[i + 1] = chr2;
        if (enc4 != 64) uarray[i + 2] = chr3;
      }
      return uarray;
    } };

  return uni.base64ToArrayBuffer && uni.base64ToArrayBuffer(data) || Base64Binary.decodeArrayBuffer(data);
};


/**
    * base64转路径
    * @param {Object} base64
    */
function base64ToPath(base64) {var _ref =
  /data:image\/(\w+);base64,(.*)/.exec(base64) || [],_ref2 = _slicedToArray(_ref, 3),format = _ref2[1],bodyData = _ref2[2];

  return new Promise(function (resolve, reject) {

    var fs = uni.getFileSystemManager();

    //自定义文件名
    if (!format) {
      console.error('ERROR_BASE64SRC_PARSE');
      reject(new Error('ERROR_BASE64SRC_PARSE'));
    }
    var time = new Date().getTime();
    var pre = prefix();
    var filePath = "".concat(pre.env.USER_DATA_PATH, "/").concat(time, ".").concat(format);
    var buffer = base64ToArrayBuffer(bodyData);
    fs.writeFile({
      filePath: filePath,
      data: buffer,
      encoding: 'binary',
      success: function success() {
        resolve(filePath);
      },
      fail: function fail(err) {
        console.error('获取base64图片失败', JSON.stringify(err));
        reject(err);
      } });












































  });
}

/**
   * 路径转base64
   * @param {Object} string
   */

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {





























































    if (uni.canIUse('getFileSystemManager')) {
      uni.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          console.error('urlToBase64 error:', JSON.stringify(error));
          reject(error);
        } });

    }























  });
}
























function getImageInfo(img, isH5PathToBase64) {
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var base64Reg, localReg, networkReg, imgName;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              base64Reg = /^data:image\/(\w+);base64/;
              localReg = /^\.|^\/(?=[^\/])/;
              networkReg = /^(http|\/\/)/;if (!






              base64Reg.test(img)) {_context.next = 13;break;}if (
              cache[img]) {_context.next = 12;break;}
              imgName = img;_context.next = 8;return (
                base64ToPath(img));case 8:img = _context.sent;
              cache[imgName] = img;_context.next = 13;break;case 12:

              img = cache[img];case 13:



              if (cache[img] && cache[img].errMsg) {
                resolve(cache[img]);
              } else {
                uni.getImageInfo({
                  src: img,
                  success: function success(image) {

                    image.path = localReg.test(img) ? "/".concat(image.path) : image.path;

                    // image.path = /^(http|\/\/|\/|wxfile|data:image\/(\w+);base64|file|bdfile|ttfile|blob)/.test(image.path) ? image.path : `/${image.path}`;
                    cache[img] = image;
                    resolve(cache[img]);
                  },
                  fail: function fail(err) {
                    resolve({ path: img });
                    console.error("getImageInfo:fail ".concat(img, " failed ").concat(JSON.stringify(err)));
                  } });

              }case 14:case "end":return _context.stop();}}}, _callee);}));return function (_x, _x2) {return _ref3.apply(this, arguments);};}());

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 456:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/component/lime-painter/draw.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.Draw = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 22));var _utils = __webpack_require__(/*! ./utils */ 455);
var _gradient = __webpack_require__(/*! ./gradient */ 457);
var _qrcode = _interopRequireDefault(__webpack_require__(/*! ./qrcode */ 458));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}
var id = 0;var

Draw = /*#__PURE__*/function () {
  function Draw(context, canvas) {var use2dCanvas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var isH5PathToBase64 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;var boundary = arguments.length > 4 ? arguments[4] : undefined;_classCallCheck(this, Draw);
    this.ctx = context;
    this.canvas = canvas || null;
    this.root = boundary;
    this.use2dCanvas = use2dCanvas;
    this.isH5PathToBase64 = isH5PathToBase64;
  }_createClass(Draw, [{ key: "roundRect", value: function roundRect(
    x, y, w, h, r) {var fill = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;var stroke = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      if (r < 0) return;var
      ctx = this.ctx;
      ctx.beginPath();
      if (!r) {
        ctx.rect(x, y, w, h);
      } else if (typeof r === 'number' && [0, 1, -1].includes(w - r * 2) && [0, 1, -1].includes(h - r * 2)) {
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 2);
      } else {var _ref2;var _ref =





        r || (_ref2 = { r: r }, _defineProperty(_ref2, "r", r), _defineProperty(_ref2, "r", r), _defineProperty(_ref2, "r", r), _ref2),_ref$borderTopLeftRad = _ref.borderTopLeftRadius,tl = _ref$borderTopLeftRad === void 0 ? r || 0 : _ref$borderTopLeftRad,_ref$borderTopRightRa = _ref.borderTopRightRadius,tr = _ref$borderTopRightRa === void 0 ? r || 0 : _ref$borderTopRightRa,_ref$borderBottomRigh = _ref.borderBottomRightRadius,br = _ref$borderBottomRigh === void 0 ? r || 0 : _ref$borderBottomRigh,_ref$borderBottomLeft = _ref.borderBottomLeftRadius,bl = _ref$borderBottomLeft === void 0 ? r || 0 : _ref$borderBottomLeft;
        ctx.beginPath();
        // 右下角
        ctx.arc(x + w - br, y + h - br, br, 0, Math.PI * 0.5);
        ctx.lineTo(x + bl, y + h);
        // 左下角
        ctx.arc(x + bl, y + h - bl, bl, Math.PI * 0.5, Math.PI);
        ctx.lineTo(x, y + tl);
        // 左上角
        ctx.arc(x + tl, y + tl, tl, Math.PI, Math.PI * 1.5);
        ctx.lineTo(x + w - tr, y);
        // 右上角
        ctx.arc(x + w - tr, y + tr, tr, Math.PI * 1.5, Math.PI * 2);
        ctx.lineTo(x + w, y + h - br);
      }
      ctx.closePath();
      if (stroke) ctx.stroke();
      if (fill) ctx.fill();
    } }, { key: "measureText", value: function measureText(
    text, fontSize) {var
      ctx = this.ctx;

      return ctx.measureText(text).width;









    } }, { key: "setFont", value: function setFont(_ref3)
    {var _ref3$fontFamily = _ref3.fontFamily,ff = _ref3$fontFamily === void 0 ? 'sans-serif' : _ref3$fontFamily,_ref3$fontSize = _ref3.fontSize,fs = _ref3$fontSize === void 0 ? 14 : _ref3$fontSize,_ref3$fontWeight = _ref3.fontWeight,fw = _ref3$fontWeight === void 0 ? 'normal' : _ref3$fontWeight,_ref3$textStyle = _ref3.textStyle,ts = _ref3$textStyle === void 0 ? 'normal' : _ref3$textStyle;
      var ctx = this.ctx;
      // 设置属性

      // fw = fw == 'bold' ? 'bold' : 'normal'
      // ts = ts == 'italic' ? 'italic' : 'normal'





      // fs = toPx(fs)
      ctx.font = "".concat(ts, " ").concat(fw, " ").concat(fs, "px ").concat(ff);
    } }, { key: "setTransform", value: function setTransform(
    box, _ref4) {var transform = _ref4.transform;var
      ctx = this.ctx;var _ref5 =








      transform || {},_ref5$scaleX = _ref5.scaleX,scaleX = _ref5$scaleX === void 0 ? 1 : _ref5$scaleX,_ref5$scaleY = _ref5.scaleY,scaleY = _ref5$scaleY === void 0 ? 1 : _ref5$scaleY,_ref5$translateX = _ref5.translateX,translateX = _ref5$translateX === void 0 ? 0 : _ref5$translateX,_ref5$translateY = _ref5.translateY,translateY = _ref5$translateY === void 0 ? 0 : _ref5$translateY,_ref5$rotate = _ref5.rotate,rotate = _ref5$rotate === void 0 ? 0 : _ref5$rotate,_ref5$skewX = _ref5.skewX,skewX = _ref5$skewX === void 0 ? 0 : _ref5$skewX,_ref5$skewY = _ref5.skewY,skewY = _ref5$skewY === void 0 ? 0 : _ref5$skewY;var

      x =



      box.left,y = box.top,w = box.width,h = box.height;

      ctx.scale(scaleX, scaleY);
      ctx.translate(
      w * (scaleX > 0 ? 1 : -1) / 2 + (x + translateX) / scaleX,
      h * (scaleY > 0 ? 1 : -1) / 2 + (y + translateY) / scaleY);

      if (rotate) {
        ctx.rotate(rotate * Math.PI / 180);
      }
      if (skewX || skewY) {
        ctx.transform(1, Math.tan(skewY * Math.PI / 180), Math.tan(skewX * Math.PI / 180), 1, 0, 0);
      }
    } }, { key: "setBackground", value: function setBackground(
    bd, w, h) {var
      ctx = this.ctx;
      if (!bd) {

        ctx.setFillStyle('transparent');




      } else if (_gradient.GD.isGradient(bd)) {
        _gradient.GD.doGradient(bd, w, h, ctx);
      } else {
        ctx.setFillStyle(bd);
      }
    } }, { key: "setShadow", value: function setShadow(_ref6)
    {var _ref6$boxShadow = _ref6.boxShadow,bs = _ref6$boxShadow === void 0 ? [] : _ref6$boxShadow;var

      ctx = this.ctx;
      if (bs.length) {var _bs = _slicedToArray(
        bs, 4),x = _bs[0],y = _bs[1],b = _bs[2],c = _bs[3];
        ctx.setShadow(x, y, b, c);
      }

    } }, { key: "setBorder", value: function setBorder(
    box, style) {var _ref13,_this = this;var
      ctx = this.ctx;var

      x =



      box.left,y = box.top,w = box.width,h = box.height;var
      border = style.border,borderBottom = style.borderBottom,borderTop = style.borderTop,borderRight = style.borderRight,borderLeft = style.borderLeft,r = style.borderRadius,_style$opacity = style.opacity,opacity = _style$opacity === void 0 ? 1 : _style$opacity;var _ref7 =




      border || {},_ref7$borderWidth = _ref7.borderWidth,bw = _ref7$borderWidth === void 0 ? 0 : _ref7$borderWidth,bs = _ref7.borderStyle,bc = _ref7.borderColor;var _ref8 =




      borderBottom || {},_ref8$borderBottomWid = _ref8.borderBottomWidth,bbw = _ref8$borderBottomWid === void 0 ? bw : _ref8$borderBottomWid,_ref8$borderBottomSty = _ref8.borderBottomStyle,bbs = _ref8$borderBottomSty === void 0 ? bs : _ref8$borderBottomSty,_ref8$borderBottomCol = _ref8.borderBottomColor,bbc = _ref8$borderBottomCol === void 0 ? bc : _ref8$borderBottomCol;var _ref9 =




      borderTop || {},_ref9$borderTopWidth = _ref9.borderTopWidth,btw = _ref9$borderTopWidth === void 0 ? bw : _ref9$borderTopWidth,_ref9$borderTopStyle = _ref9.borderTopStyle,bts = _ref9$borderTopStyle === void 0 ? bs : _ref9$borderTopStyle,_ref9$borderTopColor = _ref9.borderTopColor,btc = _ref9$borderTopColor === void 0 ? bc : _ref9$borderTopColor;var _ref10 =




      borderRight || {},_ref10$borderRightWid = _ref10.borderRightWidth,brw = _ref10$borderRightWid === void 0 ? bw : _ref10$borderRightWid,_ref10$borderRightSty = _ref10.borderRightStyle,brs = _ref10$borderRightSty === void 0 ? bs : _ref10$borderRightSty,_ref10$borderRightCol = _ref10.borderRightColor,brc = _ref10$borderRightCol === void 0 ? bc : _ref10$borderRightCol;var _ref11 =




      borderLeft || {},_ref11$borderLeftWidt = _ref11.borderLeftWidth,blw = _ref11$borderLeftWidt === void 0 ? bw : _ref11$borderLeftWidt,_ref11$borderLeftStyl = _ref11.borderLeftStyle,bls = _ref11$borderLeftStyl === void 0 ? bs : _ref11$borderLeftStyl,_ref11$borderLeftColo = _ref11.borderLeftColor,blc = _ref11$borderLeftColo === void 0 ? bc : _ref11$borderLeftColo;var _ref12 =






      r || (_ref13 = { r: r }, _defineProperty(_ref13, "r", r), _defineProperty(_ref13, "r", r), _defineProperty(_ref13, "r", r), _ref13),_ref12$borderTopLeftR = _ref12.borderTopLeftRadius,tl = _ref12$borderTopLeftR === void 0 ? r || 0 : _ref12$borderTopLeftR,_ref12$borderTopRight = _ref12.borderTopRightRadius,tr = _ref12$borderTopRight === void 0 ? r || 0 : _ref12$borderTopRight,_ref12$borderBottomRi = _ref12.borderBottomRightRadius,br = _ref12$borderBottomRi === void 0 ? r || 0 : _ref12$borderBottomRi,_ref12$borderBottomLe = _ref12.borderBottomLeftRadius,bl = _ref12$borderBottomLe === void 0 ? r || 0 : _ref12$borderBottomLe;
      if (!borderBottom && !borderLeft && !borderTop && !borderRight && !border) return;
      var _borderType = function _borderType(w, s, c) {

        if (s == 'dashed') {

          ctx.setLineDash([Math.ceil(w * 4 / 3), Math.ceil(w * 4 / 3)]);




        } else if (s == 'dotted') {
          ctx.setLineDash([w, w]);
        }

        ctx.setStrokeStyle(c);
      };
      var _setBorder = function _setBorder(x1, y1, x2, y2, x3, y3, r1, r2, p1, p2, p3, bw, bs, bc) {
        ctx.save();
        _this.setOpacity(style);
        _this.setTransform(box, style);
        ctx.setLineWidth(bw);
        _borderType(bw, bs, bc);
        ctx.beginPath();
        ctx.arc(x1, y1, r1, Math.PI * p1, Math.PI * p2);
        ctx.lineTo(x2, y2);
        ctx.arc(x3, y3, r2, Math.PI * p2, Math.PI * p3);
        ctx.stroke();
        ctx.restore();
      };

      if (border) {
        ctx.save();
        this.setOpacity(style);
        this.setTransform(box, style);
        ctx.setLineWidth(bw);
        _borderType(bw, bs, bc);
        this.roundRect(-w / 2, -h / 2, w, h, r, false, bc ? true : false);
        ctx.restore();
      }
      x = -w / 2;
      y = -h / 2;
      if (borderBottom) {
        _setBorder(x + w - br, y + h - br, x + bl, y + h, x + bl, y + h - bl, br, bl, 0.25, 0.5, 0.75, bbw, bbs, bbc);
      }
      if (borderLeft) {
        // 左下角
        _setBorder(x + bl, y + h - bl, x, y + tl, x + tl, y + tl, bl, tl, 0.75, 1, 1.25, blw, bls, blc);
      }
      if (borderTop) {
        // 左上角
        _setBorder(x + tl, y + tl, x + w - tr, y, x + w - tr, y + tr, tl, tr, 1.25, 1.5, 1.75, btw, bts, btc);
      }
      if (borderRight) {
        // 右上角
        _setBorder(x + w - tr, y + tr, x + w, y + h - br, x + w - br, y + h - br, tr, br, 1.75, 2, 0.25, btw, bts, btc);
      }
    } }, { key: "setOpacity", value: function setOpacity(_ref14)
    {var _ref14$opacity = _ref14.opacity,opacity = _ref14$opacity === void 0 ? 1 : _ref14$opacity;
      this.ctx.setGlobalAlpha(opacity);
    } }, { key: "drawView", value: function drawView(
    box, style) {var
      ctx = this.ctx;var

      x =



      box.left,y = box.top,w = box.width,h = box.height;var _ref15 =











      style || {},_ref15$borderRadius = _ref15.borderRadius,borderRadius = _ref15$borderRadius === void 0 ? 0 : _ref15$borderRadius,border = _ref15.border,borderTop = _ref15.borderTop,borderBottom = _ref15.borderBottom,borderLeft = _ref15.borderLeft,borderRight = _ref15.borderRight,_ref15$color = _ref15.color,color = _ref15$color === void 0 ? '#000000' : _ref15$color,bg = _ref15.backgroundColor,rotate = _ref15.rotate,shadow = _ref15.shadow;
      ctx.save();
      this.setOpacity(style);
      this.setTransform(box, style);
      this.setShadow(style);
      this.setBackground(bg, w, h);
      this.roundRect(-w / 2, -h / 2, w, h, borderRadius, true, false);
      ctx.restore();
      this.setBorder(box, style);
    } }, { key: "drawImage", value: function () {var _drawImage2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(
      img) {var _this2 = this;var box,style,custom,_args2 = arguments;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:box = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};style = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};custom = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : true;_context2.next = 5;return (
                  new Promise( /*#__PURE__*/function () {var _ref16 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var ctx, canvas, _style$borderRadius, borderRadius, mode, bg, x, y, w, h, _modeImage, _drawImage, _restore, _yield$getImageInfo, src, width, height;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                              ctx = _this2.ctx;
                              canvas = _this2.canvas;_style$borderRadius =




                              style.borderRadius, borderRadius = _style$borderRadius === void 0 ? 0 : _style$borderRadius, mode = style.mode, bg = style.backgroundColor;

                              x =



                              box.left, y = box.top, w = box.width, h = box.height;
                              ctx.save();
                              if (!custom) {
                                _this2.setOpacity(style);
                                _this2.setTransform(box, style);
                                _this2.setBackground(bg, w, h);
                                _this2.setShadow(style);
                                x = -w / 2;
                                y = -h / 2;
                                _this2.roundRect(x, y, w, h, borderRadius, true, false);
                              }
                              ctx.clip();
                              _modeImage = function _modeImage(img) {
                                // 获得图片原始大小
                                var rWidth = img.width;
                                var rHeight = img.height;
                                var startX = 0;
                                var startY = 0;
                                // 绘画区域比例
                                var cp = w / h;
                                // 原图比例
                                var op = rWidth / rHeight;
                                if (cp >= op) {
                                  rHeight = rWidth / cp;
                                  // startY = Math.round((h - rHeight) / 2)
                                } else {
                                  rWidth = rHeight * cp;
                                  startX = Math.round(((img.width || w) - rWidth) / 2);
                                }
                                if (mode === 'scaleToFill' || !img.width) {
                                  ctx.drawImage(img.src, x, y, w, h);
                                } else {
                                  // 百度小程序 开发工具 顺序有问题 暂不知晓真机




                                  ctx.drawImage(img.src, startX, startY, rWidth, rHeight, x, y, w, h);

                                }
                              };
                              _drawImage = function _drawImage(img) {
                                if (_this2.use2dCanvas) {
                                  var Image = canvas.createImage();
                                  Image.onload = function () {
                                    img.src = Image;
                                    _modeImage(img);
                                    _restore();
                                  };
                                  Image.onerror = function () {
                                    console.error("createImage fail: ".concat(img));
                                    reject(new Error("createImage fail: ".concat(img)));
                                  };
                                  Image.src = img.src;
                                } else {
                                  _modeImage(img);
                                  _restore();
                                }
                              };
                              _restore = function _restore() {
                                ctx.restore();
                                _this2.setBorder(box, style);
                                setTimeout(function () {
                                  resolve(true);
                                }, _this2.root.sleep);
                              };if (!(
                              typeof img === 'string')) {_context.next = 20;break;}_context.next = 13;return (
                                (0, _utils.getImageInfo)(img, _this2.isH5PathToBase64));case 13:_yield$getImageInfo = _context.sent;src = _yield$getImageInfo.path;width = _yield$getImageInfo.width;height = _yield$getImageInfo.height;
                              _drawImage({ src: src, width: width, height: height });_context.next = 21;break;case 20:

                              _drawImage(img);case 21:case "end":return _context.stop();}}}, _callee);}));return function (_x3, _x4) {return _ref16.apply(this, arguments);};}()));case 5:case "end":return _context2.stop();}}}, _callee2);}));function drawImage(_x2) {return _drawImage2.apply(this, arguments);}return drawImage;}() }, { key: "drawText", value: function drawText(



    text, box, style, rules) {var _this3 = this;var
      ctx = this.ctx;var

      x =




      box.left,y = box.top,w = box.width,h = box.height,_box$offsetLeft = box.offsetLeft,ol = _box$offsetLeft === void 0 ? 0 : _box$offsetLeft;var _style$color =












      style.color,color = _style$color === void 0 ? '#000000' : _style$color,_style$lineHeight = style.lineHeight,lineHeight = _style$lineHeight === void 0 ? '1.4em' : _style$lineHeight,_style$fontSize = style.fontSize,fontSize = _style$fontSize === void 0 ? 14 : _style$fontSize,fontWeight = style.fontWeight,fontFamily = style.fontFamily,textStyle = style.textStyle,_style$textAlign = style.textAlign,textAlign = _style$textAlign === void 0 ? 'left' : _style$textAlign,_style$verticalAlign = style.verticalAlign,va = _style$verticalAlign === void 0 ? 'top' : _style$verticalAlign,bg = style.backgroundColor,maxLines = style.maxLines,td = style.textDecoration;
      lineHeight = (0, _utils.toPx)(lineHeight, fontSize);

      if (!text) return;
      ctx.save();

      this.setOpacity(style);
      this.setTransform(box, style);
      x = -w / 2;
      y = -h / 2;
      ctx.setTextBaseline(va);
      this.setFont({ fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight, textStyle: textStyle });
      ctx.setTextAlign(textAlign);

      if (bg) {
        this.setBackground(bg, w, h);
        this.roundRect(x, y, w, h, 1, bg);
      }
      this.setShadow(style);
      ctx.setFillStyle(color);
      var rulesObj = {};
      if (rules) {
        if (rules.word.length > 0) {
          for (var i = 0; i < rules.word.length; i++) {
            var startIndex = 0,
            index = void 0;
            while ((index = text.indexOf(rules.word[i], startIndex)) > -1) {
              rulesObj[index] = {
                reset: true };

              for (var j = 0; j < rules.word[i].length; j++) {
                rulesObj[index + j] = {
                  reset: true };

              }
              startIndex = index + 1;
            }
          }
        }
      }
      // 水平布局
      switch (textAlign) {
        case 'left':
          break;
        case 'center':
          x += 0.5 * w;
          break;
        case 'right':
          x += w;
          break;
        default:
          break;}

      var textWidth = this.measureText(text, fontSize);
      var actualHeight = Math.ceil(textWidth / w) * lineHeight;
      var paddingTop = Math.ceil((h - actualHeight) / 2);
      if (paddingTop < 0) paddingTop = 0;
      // 垂直布局
      switch (va) {
        case 'top':
          break;
        case 'middle':
          y += fontSize / 2;
          break;
        case 'bottom':
          y += fontSize;
          break;
        default:
          break;}


      // 绘线
      var _drawLine = function _drawLine(x, y, textWidth) {var _uni$getSystemInfoSyn =
        uni.getSystemInfoSync(),system = _uni$getSystemInfoSyn.system;
        if (/win|mac/.test(system)) {
          y += fontSize / 3;
        }
        // 垂直布局
        switch (va) {
          case 'top':
            break;
          case 'middle':
            y -= fontSize / 2;
            break;
          case 'bottom':
            y -= fontSize;
            break;
          default:
            break;}

        var to = x;
        switch (textAlign) {
          case 'left':
            x = x;
            to += textWidth;
            break;
          case 'center':
            x = x - textWidth / 2;
            to = x + textWidth;
            break;
          case 'right':
            to = x;
            x = x - textWidth;
            break;
          default:
            break;}


        if (td) {
          ctx.setLineWidth(fontSize / 13);
          ctx.beginPath();

          if (/\bunderline\b/.test(td)) {
            y -= inlinePaddingTop * 0.8;
            ctx.moveTo(x, y);
            ctx.lineTo(to, y);
          }

          if (/\boverline\b/.test(td)) {
            y += inlinePaddingTop;
            ctx.moveTo(x, y - lineHeight);
            ctx.lineTo(to, y - lineHeight);
          }
          if (/\bline-through\b/.test(td)) {
            ctx.moveTo(x, y - lineHeight / 2);
            ctx.lineTo(to, y - lineHeight / 2);
          }
          ctx.closePath();
          ctx.setStrokeStyle(color);
          ctx.stroke();
        }
      };

      var _reset = function _reset(text, x, y) {
        var rs = Object.keys(rulesObj);
        for (var _i2 = 0; _i2 < rs.length; _i2++) {
          var item = rulesObj[rs[_i2]];
          // ctx.globalCompositeOperation = "destination-out";
          ctx.save();
          ctx.setFillStyle(rules.color);
          if (item.char) {
            ctx.fillText(item.char, item.x, item.y);
          }
          ctx.restore();
        }
      };
      var _setText = function _setText(isReset, _char2) {
        if (isReset) {
          var t1 = Math.round(_this3.measureText(" ", fontSize));
          var t2 = Math.round(_this3.measureText("\u3000", fontSize));
          var t3 = Math.round(_this3.measureText(_char2, fontSize));
          var _char = '';
          var _num = 1;
          if (t3 == t2) {
            _char = "\u3000";
            _num = 1;
          } else {
            _char = " ";
            _num = Math.ceil(t3 / t1);
          }
          return new Array(_num).fill(_char).join('');
        } else {
          return _char2;
        }
      };
      var _setRulesObj = function _setRulesObj(text, index, x, y) {
        rulesObj[index].x = x;
        rulesObj[index].y = y;
        rulesObj[index].char = text;
      };
      var inlinePaddingTop = Math.ceil((lineHeight - fontSize) / 2);
      // 不超过一行
      if (textWidth + ol <= w && !text.includes('\n')) {
        x = x + ol;
        var _rs = Object.keys(rulesObj);
        var _text = text.split('');
        if (_rs) {
          for (var _i3 = 0; _i3 < _rs.length; _i3++) {
            var _index = _rs[_i3];
            var t = _text[_index];
            var _char3 = _setText(rulesObj[_index], t);
            _text[_index] = _char3;
            _setRulesObj(t, _index, x + this.measureText(text.substring(0, _index), fontSize), y + inlinePaddingTop);
          }
          _reset();
        }
        ctx.fillText(_text.join(''), x, y + inlinePaddingTop);
        y += lineHeight;
        _drawLine(x, y, textWidth);
        ctx.restore();
        this.setBorder(box, style);
        return;
      }
      // 多行文本
      var chars = text.split('');
      var _y = y;
      var _x = x;
      // 逐行绘制
      var line = '';
      var lineIndex = 0;

      for (var _index2 = 0; _index2 <= chars.length; _index2++) {
        var ch = chars[_index2] || '';
        var isLine = ch === '\n';
        var isRight = ch == ''; // index == chars.length
        ch = isLine ? '' : ch;

        var textline = line + _setText(rulesObj[_index2], ch);
        var _textWidth = this.measureText(textline, fontSize);


        // 绘制行数大于最大行数，则直接跳出循环
        if (lineIndex >= maxLines) {
          break;
        }
        if (lineIndex == 0) {
          _textWidth = _textWidth + ol;
          _x += ol;
        }
        if (rulesObj[_index2]) {
          _setRulesObj(ch, _index2, _x + this.measureText(line, fontSize), y + inlinePaddingTop);
        }
        if (_textWidth > w || isLine || isRight) {
          lineIndex++;
          line = isRight && _textWidth <= w ? textline : line;
          if (lineIndex === maxLines && _textWidth > w) {
            while (this.measureText("".concat(line, "..."), fontSize) > w) {
              if (line.length <= 1) {
                // 如果只有一个字符时，直接跳出循环
                break;
              }
              line = line.substring(0, line.length - 1);
              if (rulesObj[_index2 - 1]) {
                rulesObj[_index2 - 1].char = '';
              }
            }
            line += '...';
          }
          ctx.fillText(line, _x, y + inlinePaddingTop);
          y += lineHeight;
          _drawLine(_x, y, _textWidth);
          line = ch;
          if (y + lineHeight > _y + h) break;
        } else {
          line = textline;
        }
      }
      var rs = Object.keys(rulesObj);
      if (rs) {
        _reset();
      }
      ctx.restore();
      this.setBorder(box, style);
    } }, { key: "findNode", value: function () {var _findNode = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(
      element) {var parent,index,siblings,source,computedStyle,attributes,node,_computedStyle$left,left,_computedStyle$top,top,_computedStyle$width,width,_computedStyle$height,height,childrens,i,v,_args3 = arguments;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:parent = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};index = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 0;siblings = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : [];source = _args3.length > 4 ? _args3[4] : undefined;
                computedStyle = Object.assign({}, this.getComputedStyle(element, parent, index));_context3.next = 7;return (
                  this.getAttributes(element));case 7:attributes = _context3.sent;
                node = {
                  id: id++,
                  parent: parent,
                  computedStyle: computedStyle,
                  rules: element.rules,
                  attributes: Object.assign({}, attributes),
                  name: (element === null || element === void 0 ? void 0 : element.type) || 'view' };

                if (JSON.stringify(parent) === '{}' && !element.type) {_computedStyle$left =
                  computedStyle.left, left = _computedStyle$left === void 0 ? 0 : _computedStyle$left, _computedStyle$top = computedStyle.top, top = _computedStyle$top === void 0 ? 0 : _computedStyle$top, _computedStyle$width = computedStyle.width, width = _computedStyle$width === void 0 ? 0 : _computedStyle$width, _computedStyle$height = computedStyle.height, height = _computedStyle$height === void 0 ? 0 : _computedStyle$height;
                  node.layoutBox = { left: left, top: top, width: width, height: height };
                } else {
                  node.layoutBox = Object.assign({ left: 0, top: 0 }, this.getLayoutBox(node, parent, index, siblings, source));
                }if (!(

                element === null || element === void 0 ? void 0 : element.views)) {_context3.next = 25;break;}
                childrens = [];
                node.children = [];
                i = 0;case 14:if (!(i < element.views.length)) {_context3.next = 24;break;}
                v = element.views[i];_context3.t0 =
                childrens;_context3.next = 19;return this.findNode(v, node, i, childrens, element);case 19:_context3.t1 = _context3.sent;_context3.t0.push.call(_context3.t0, _context3.t1);case 21:i++;_context3.next = 14;break;case 24:

                node.children = childrens;case 25:return _context3.abrupt("return",

                node);case 26:case "end":return _context3.stop();}}}, _callee3, this);}));function findNode(_x5) {return _findNode.apply(this, arguments);}return findNode;}() }, { key: "getComputedStyle", value: function getComputedStyle(

    element) {var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var style = {};
      var node = JSON.stringify(parent) == '{}' && !element.type ? element : element.css;
      if (parent.computedStyle) {
        for (var _i4 = 0, _Object$keys = Object.keys(parent.computedStyle); _i4 < _Object$keys.length; _i4++) {var value = _Object$keys[_i4];
          var item = parent.computedStyle[value];
          if (['color', 'fontSize', 'lineHeight', 'verticalAlign', 'fontWeight', 'textAlign'].includes(value)) {
            style[value] = /em|px$/.test(item) ? (0, _utils.toPx)(item, node === null || node === void 0 ? void 0 : node.fontSize) : item;
          }
        }
      }
      if (!node) return style;var _loop = function _loop() {
        var value = _Object$keys2[_i5];
        var item = node[value];
        if (value == 'views') {
          return "continue";
        }
        if (['boxShadow', 'shadow'].includes(value)) {
          var shadows = item.split(' ').map(function (v) {return /^\d/.test(v) ? (0, _utils.toPx)(v) : v;});
          style.boxShadow = shadows;
          return "continue";
        }
        if (value.includes('border') && !value.includes('adius')) {
          var prefix = value.match(/^border([BTRLa-z]+)?/)[0];
          var type = value.match(/[W|S|C][a-z]+/);
          var v = item.split(' ').map(function (v) {return /^\d/.test(v) ? (0, _utils.toPx)(v) : v;});

          if (v.length > 1) {var _style$prefix;
            style[prefix] = (_style$prefix = {}, _defineProperty(_style$prefix,
            prefix + 'Width', v[0] || 1), _defineProperty(_style$prefix,
            prefix + 'Style', v[1] || 'solid'), _defineProperty(_style$prefix,
            prefix + 'Color', v[2] || 'black'), _style$prefix);

          } else {var _style$prefix2;
            style[prefix] = (_style$prefix2 = {}, _defineProperty(_style$prefix2,
            prefix + 'Width', 1), _defineProperty(_style$prefix2,
            prefix + 'Style', 'solid'), _defineProperty(_style$prefix2,
            prefix + 'Color', 'black'), _style$prefix2);

            style[prefix][prefix + type[0]] = v[0];
          }
          return "continue";
        }
        if (['background', 'backgroundColor'].includes(value)) {
          style['backgroundColor'] = item;
          return "continue";
        }
        if (value.includes('padding') || value.includes('margin') || value.includes('adius')) {
          var isRadius = value.includes('adius');
          var _prefix = isRadius ? 'borderRadius' : value.match(/[a-z]+/)[0];
          var pre = [0, 0, 0, 0].map(function (item, i) {return isRadius ? ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'][i] : [_prefix + 'Top', _prefix + 'Right', _prefix + 'Bottom', _prefix + 'Left'][i];});
          if (value === 'padding' || value === 'margin' || value === 'radius' || value === 'borderRadius') {
            var _v = (item === null || item === void 0 ? void 0 : item.split(' ').map(function (item) {return /^\d/.test(item) && (0, _utils.toPx)(item, node['width']);}, [])) || [0];
            var _type = isRadius ? 'borderRadius' : value;
            if (_v.length == 1) {
              style[_type] = _v[0];
            } else {var _style$_type;var _v2 = _slicedToArray(
              _v, 4),t = _v2[0],r = _v2[1],b = _v2[2],l = _v2[3];
              style[_type] = (_style$_type = {}, _defineProperty(_style$_type,
              pre[0], t), _defineProperty(_style$_type,
              pre[1], (0, _utils.isNumber)(r) ? r : t), _defineProperty(_style$_type,
              pre[2], (0, _utils.isNumber)(b) ? b : t), _defineProperty(_style$_type,
              pre[3], (0, _utils.isNumber)(l) ? l : r), _style$_type);

            }
          } else {
            if (typeof style[_prefix] === 'object') {
              style[_prefix][value] = (0, _utils.toPx)(item, node['width']);
            } else {var _style$_prefix;
              style[_prefix] = (_style$_prefix = {}, _defineProperty(_style$_prefix,
              pre[0], style[_prefix] || 0), _defineProperty(_style$_prefix,
              pre[1], style[_prefix] || 0), _defineProperty(_style$_prefix,
              pre[2], style[_prefix] || 0), _defineProperty(_style$_prefix,
              pre[3], style[_prefix] || 0), _style$_prefix);

              style[_prefix][value] = (0, _utils.toPx)(item, node['width']);
            }
          }
          return "continue";
        }
        if (value.includes('width') || value.includes('height')) {
          if (/%$/.test(item)) {
            style[value] = (0, _utils.toPx)(item, parent.layoutBox[value]);
          } else {
            style[value] = /px|rpx$/.test(item) ? (0, _utils.toPx)(item) : item;
          }
          return "continue";
        }
        if (value.includes('transform')) {
          style[value] = {};
          item.replace(/([a-zA-Z]+)\(([0-9,-\.%rpxdeg\s]+)\)/g, function (g1, g2, g3) {
            var v = g3.split(',').map(function (k) {return k.replace(/(^\s*)|(\s*$)/g, '');});
            var transform = function transform(v, r) {
              return v.includes('deg') ? v * 1 : (0, _utils.toPx)(v, r);
            };
            if (g2.includes('matrix')) {
              style[value][g2] = v.map(function (v) {return v * 1;});
            } else if (g2.includes('rotate')) {
              style[value][g2] = g3.match(/\d+/)[0] * 1;
            } else if (/[X, Y]/.test(g2)) {
              style[value][g2] = /[X]/.test(g2) ? transform(v[0], node['width']) : transform(v[0], node['height']);
            } else {
              style[value][g2 + 'X'] = transform(v[0], node['width']);
              style[value][g2 + 'Y'] = transform(v[1] || v[0], node['height']);
            }
          });
          return "continue";
        }
        if (/em$/.test(item) && !value.includes('lineHeight')) {
          style[value] = Math.ceil(parseFloat(item.replace('em')) * (0, _utils.toPx)(node['fontSize'] || 14));
        } else {
          style[value] = /%|px|rpx$/.test(item) ? (0, _utils.toPx)(item, node['width']) : item;
        }};for (var _i5 = 0, _Object$keys2 = Object.keys(node); _i5 < _Object$keys2.length; _i5++) {var _ret = _loop();if (_ret === "continue") continue;
      }
      if ((element.name == 'image' || element.type == 'image') && !style.mode) {
        style.mode = 'aspectFill';
        if ((!node.width || node.width == 'auto') && (!node.height || node.width == 'auto')) {
          style.mode = '';
        }
      }
      return style;
    } }, { key: "getLayoutBox", value: function getLayoutBox(
    element) {var _this4 = this;var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var siblings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var source = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var box = {};var _ref17 =
      element || {},name = _ref17.name,cstyle = _ref17.computedStyle,layoutBox = _ref17.layoutBox,attributes = _ref17.attributes;
      if (!name) return box;var
      ctx = this.ctx;
      var pbox = parent.layoutBox || this.root;
      var pstyle = parent.computedStyle;var

      v =












      cstyle.verticalAlign,x = cstyle.left,y = cstyle.top,w = cstyle.width,h = cstyle.height,_cstyle$fontSize = cstyle.fontSize,fontSize = _cstyle$fontSize === void 0 ? 14 : _cstyle$fontSize,_cstyle$lineHeight = cstyle.lineHeight,lineHeight = _cstyle$lineHeight === void 0 ? '1.4em' : _cstyle$lineHeight,maxLines = cstyle.maxLines,fontWeight = cstyle.fontWeight,fontFamily = cstyle.fontFamily,textStyle = cstyle.textStyle,position = cstyle.position,display = cstyle.display;var _ref18 =

      cstyle.padding || {},_ref18$paddingTop = _ref18.paddingTop,pt = _ref18$paddingTop === void 0 ? 0 : _ref18$paddingTop,_ref18$paddingRight = _ref18.paddingRight,pr = _ref18$paddingRight === void 0 ? 0 : _ref18$paddingRight,_ref18$paddingBottom = _ref18.paddingBottom,pb = _ref18$paddingBottom === void 0 ? 0 : _ref18$paddingBottom,_ref18$paddingLeft = _ref18.paddingLeft,pl = _ref18$paddingLeft === void 0 ? 0 : _ref18$paddingLeft;var _ref19 =
      cstyle.margin || {},_ref19$marginTop = _ref19.marginTop,mt = _ref19$marginTop === void 0 ? 0 : _ref19$marginTop,_ref19$marginRight = _ref19.marginRight,mr = _ref19$marginRight === void 0 ? 0 : _ref19$marginRight,_ref19$marginBottom = _ref19.marginBottom,mb = _ref19$marginBottom === void 0 ? 0 : _ref19$marginBottom,_ref19$marginLeft = _ref19.marginLeft,ml = _ref19$marginLeft === void 0 ? 0 : _ref19$marginLeft;

      if (position == 'relative') {
        x += pbox.left;
        y += pbox.top;
      }
      if (name === 'text') {
        var text = attributes.text || '';
        lineHeight = (0, _utils.toPx)(lineHeight, fontSize);
        ctx.save();
        this.setFont({ fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight, textStyle: textStyle });var _ref20 =
        siblings[index - 1] || {},lbox = _ref20.layoutBox,ls = _ref20.computedStyle;var _ref21 =
        siblings[index + 1] || {},rbox = _ref21.layoutBox,rs = _ref21.computedStyle;
        var isLeft = index == 0;
        var isblock = display === 'block' || (ls === null || ls === void 0 ? void 0 : ls.display) === 'block';
        var isOnly = isLeft && !rbox || !(parent === null || parent === void 0 ? void 0 : parent.id);
        var lboxR = isLeft || isblock ? 0 : lbox.offsetRight || 0;
        var texts = text.split('\n');
        var lineIndex = 1;
        var line = '';
        var textIndent = cstyle.textIndent || 0;
        if (!isOnly) {
          texts.map(function (t, i) {
            lineIndex += i;
            var chars = t.split('');
            for (var j = 0; j < chars.length; j++) {
              var ch = chars[j];
              var textline = line + ch;
              var textWidth = _this4.measureText(textline, fontSize);
              if (lineIndex == 1) {
                textWidth = textWidth + (isblock ? 0 : lboxR) + textIndent;
              }
              if (textWidth > pbox.width) {
                lineIndex++;
                line = ch;
              } else {
                line = textline;
              }
            }
          });
        } else {
          line = text;
          lineIndex = Math.max(texts.length, Math.ceil(this.measureText(text, fontSize) / ((w || pbox.width) - this.measureText('0', fontSize))));
        }
        box.offsetLeft = ((0, _utils.isNumber)(x) || isblock || isOnly ? textIndent : lboxR) + pl + ml;
        // 剩下的字宽度
        var remain = this.measureText(line, fontSize);
        var width = lineIndex > 1 ? pbox.width : remain + box.offsetLeft;
        box.offsetRight = box.offsetLeft + (w ? w : isblock ? pbox.width : remain) + pr + mr;


        var _getLeft = function _getLeft() {
          return x || pbox.left;
        };
        var _getWidth = function _getWidth() {
          return w || (isOnly ? pbox.width : width > pbox.width - box.left || lineIndex > 1 ? pbox.width - box.left : width);
        };
        var _getHeight = function _getHeight() {
          if (h) {
            return h;
          } else if (lineIndex > 1) {
            return (maxLines || lineIndex) * lineHeight + pt + pb + mt + mb;
          } else {
            return lineHeight + pt + pb + mt + mb;
          }
        };
        var _getTop = function _getTop() {
          var _y = y;
          if (_y) {
            return _y + pt + mt;
          }
          if (isLeft) {
            _y = pbox.top;
          } else if (lbox.width < pbox.width) {
            _y = lbox.top;
          } else {
            _y = lbox.top + lbox.height - ((ls === null || ls === void 0 ? void 0 : ls.lineHeight) || 0);
          }
          return _y + pt + mt + (isblock && (ls === null || ls === void 0 ? void 0 : ls.lineHeight) || 0);
        };
        box.left = _getLeft();
        box.width = _getWidth();
        box.height = _getHeight();
        box.top = _getTop();
        ctx.restore();
      } else if (['view', 'qrcode'].includes(name)) {
        box.left = x || pbox.left;
        box.width = (w || (pbox === null || pbox === void 0 ? void 0 : pbox.width)) - pl - pr;
        box.height = h || 0;
        box.top = y || pbox.top;
      } else if (name === 'image') {
        box.left = x || pbox.left;
        box.width = (w || (pbox === null || pbox === void 0 ? void 0 : pbox.width)) - pl - pr;var

        rWidth =

        attributes.width,rHeight = attributes.height;
        box.height = h || box.width * rHeight / rWidth;
        box.top = y || pbox.top;
      }
      return box;
    } }, { key: "getAttributes", value: function () {var _getAttributes = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(
      element) {var arr, _ref22, _ref22$width, width, _ref22$height, height, src;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                arr = {};if (!(
                (element === null || element === void 0 ? void 0 : element.url) || (element === null || element === void 0 ? void 0 : element.src))) {_context4.next = 15;break;}
                arr.src = element.url || (element === null || element === void 0 ? void 0 : element.src);_context4.next = 5;return (
                  (0, _utils.getImageInfo)(arr.src, this.isH5PathToBase64));case 5:_context4.t0 = _context4.sent;if (_context4.t0) {_context4.next = 8;break;}_context4.t0 = {};case 8:_ref22 = _context4.t0;_ref22$width = _ref22.width;width = _ref22$width === void 0 ? 0 : _ref22$width;_ref22$height = _ref22.height;height = _ref22$height === void 0 ? 0 : _ref22$height;src = _ref22.path;
                arr = Object.assign({}, arr, { width: width, height: height, src: src });case 15:

                if (element === null || element === void 0 ? void 0 : element.text) {
                  arr.text = element.text;
                }return _context4.abrupt("return",
                arr);case 17:case "end":return _context4.stop();}}}, _callee4, this);}));function getAttributes(_x6) {return _getAttributes.apply(this, arguments);}return getAttributes;}() }, { key: "drawBoard", value: function () {var _drawBoard = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(

      element) {var node;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                  this.findNode(element));case 2:node = _context5.sent;return _context5.abrupt("return",
                this.drawNode(node));case 4:case "end":return _context5.stop();}}}, _callee5, this);}));function drawBoard(_x7) {return _drawBoard.apply(this, arguments);}return drawBoard;}() }, { key: "drawNode", value: function () {var _drawNode = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(

      element) {var layoutBox, computedStyle, name, rules, _element$attributes, src, text, childs, _iterator, _step, child;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:

                layoutBox =



                element.layoutBox, computedStyle = element.computedStyle, name = element.name, rules = element.rules;_element$attributes =



                element.attributes, src = _element$attributes.src, text = _element$attributes.text;if (!(
                name === 'view')) {_context6.next = 6;break;}
                this.drawView(layoutBox, computedStyle);_context6.next = 12;break;case 6:if (!(
                name === 'image' && src)) {_context6.next = 11;break;}_context6.next = 9;return (
                  this.drawImage(element.attributes, layoutBox, computedStyle, false));case 9:_context6.next = 12;break;case 11:
                if (name === 'text') {
                  this.drawText(text, layoutBox, computedStyle, rules);
                } else if (name === 'qrcode') {
                  _qrcode.default.api.draw(text, this, layoutBox, computedStyle);
                }case 12:if (
                element.children) {_context6.next = 14;break;}return _context6.abrupt("return");case 14:
                childs = Object.values ? Object.values(element.children) : Object.keys(element.children).map(function (key) {return element.children[key];});_iterator = _createForOfIteratorHelper(
                childs);_context6.prev = 16;_iterator.s();case 18:if ((_step = _iterator.n()).done) {_context6.next = 24;break;}child = _step.value;_context6.next = 22;return (
                  this.drawNode(child));case 22:_context6.next = 18;break;case 24:_context6.next = 29;break;case 26:_context6.prev = 26;_context6.t0 = _context6["catch"](16);_iterator.e(_context6.t0);case 29:_context6.prev = 29;_iterator.f();return _context6.finish(29);case 32:case "end":return _context6.stop();}}}, _callee6, this, [[16, 26, 29, 32]]);}));function drawNode(_x8) {return _drawNode.apply(this, arguments);}return drawNode;}() }]);return Draw;}();exports.Draw = Draw;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 457:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/component/lime-painter/gradient.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.GD = void 0;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} /* eslint-disable */

var GD = {
  isGradient: function isGradient(bg) {
    if (bg && (bg.startsWith('linear') || bg.startsWith('radial'))) {
      return true;
    }
    return false;
  },
  doGradient: function doGradient(bg, width, height, ctx) {
    if (bg.startsWith('linear')) {
      linearEffect(width, height, bg, ctx);
    } else if (bg.startsWith('radial')) {
      radialEffect(width, height, bg, ctx);
    }
  } };exports.GD = GD;


function analizeGrad(string) {
  var colorPercents = string.substring(0, string.length - 1).split("%,");
  var colors = [];
  var percents = [];var _iterator = _createForOfIteratorHelper(
  colorPercents),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var colorPercent = _step.value;
      colors.push(colorPercent.substring(0, colorPercent.lastIndexOf(" ")).trim());
      percents.push(colorPercent.substring(colorPercent.lastIndexOf(" "), colorPercent.length) / 100);
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  return {
    colors: colors,
    percents: percents };

}

function radialEffect(width, height, bg, ctx) {
  var colorPer = analizeGrad(bg.match(/radial-gradient\((.+)\)/)[1]);
  var grd = ctx.createCircularGradient(0, 0, width < height ? height / 2 : width / 2);
  for (var i = 0; i < colorPer.colors.length; i++) {
    grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
  }
  ctx.setFillStyle(grd);
}

function analizeLinear(bg, width, height) {
  var direction = bg.match(/([-]?\d{1,3})deg/);
  var dir = direction && direction[1] ? parseFloat(direction[1]) : 0;
  var coordinate;
  switch (dir) {
    case 0:
      coordinate = [0, -height / 2, 0, height / 2];
      break;
    case 90:
      coordinate = [width / 2, 0, -width / 2, 0];
      break;
    case -90:
      coordinate = [-width / 2, 0, width / 2, 0];
      break;
    case 180:
      coordinate = [0, height / 2, 0, -height / 2];
      break;
    case -180:
      coordinate = [0, -height / 2, 0, height / 2];
      break;
    default:
      var x1 = 0;
      var y1 = 0;
      var x2 = 0;
      var y2 = 0;
      if (direction[1] > 0 && direction[1] < 90) {
        x1 = width / 2 - (width / 2 * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (
        90 - direction[1]) * Math.PI * 2 / 360) / 2;
        y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
        x2 = -x1;
        y1 = -y2;
      } else if (direction[1] > -180 && direction[1] < -90) {
        x1 = -(width / 2) + (width / 2 * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (
        90 - direction[1]) * Math.PI * 2 / 360) / 2;
        y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
        x2 = -x1;
        y1 = -y2;
      } else if (direction[1] > 90 && direction[1] < 180) {
        x1 = width / 2 + (-(width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (
        90 - direction[1]) * Math.PI * 2 / 360) / 2;
        y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
        x2 = -x1;
        y1 = -y2;
      } else {
        x1 = -(width / 2) - (-(width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (
        90 - direction[1]) * Math.PI * 2 / 360) / 2;
        y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
        x2 = -x1;
        y1 = -y2;
      }
      coordinate = [x1, y1, x2, y2];
      break;}

  return coordinate;
}

function linearEffect(width, height, bg, ctx) {
  var param = analizeLinear(bg, width, height);
  var grd = ctx.createLinearGradient(param[0], param[1], param[2], param[3]);
  var content = bg.match(/linear-gradient\((.+)\)/)[1];
  var colorPer = analizeGrad(content.substring(content.indexOf(',') + 1));
  for (var i = 0; i < colorPer.colors.length; i++) {
    grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
  }
  ctx.setFillStyle(grd);
}

/***/ }),

/***/ 458:
/*!******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/component/lime-painter/qrcode.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 请去下载覆盖：https://gitee.com/liangei/lime-painter/blob/master/qrcode.js

/***/ }),

/***/ 459:
/*!******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/component/lime-painter/canvas.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.adaptor = adaptor;function adaptor(ctx) {
  return Object.assign(ctx, {
    setStrokeStyle: function setStrokeStyle(val) {
      ctx.strokeStyle = val;
    },
    setLineWidth: function setLineWidth(val) {
      ctx.lineWidth = val;
    },
    setLineCap: function setLineCap(val) {
      ctx.lineCap = val;
    },
    setFillStyle: function setFillStyle(val) {
      ctx.fillStyle = val;
    },
    setFontSize: function setFontSize(val) {
      ctx.font = String(val);
    },
    setGlobalAlpha: function setGlobalAlpha(val) {
      ctx.globalAlpha = val;
    },
    setLineJoin: function setLineJoin(val) {
      ctx.lineJoin = val;
    },
    setTextAlign: function setTextAlign(val) {
      ctx.textAlign = val;
    },
    setMiterLimit: function setMiterLimit(val) {
      ctx.miterLimit = val;
    },
    setShadow: function setShadow(offsetX, offsetY, blur, color) {
      ctx.shadowOffsetX = offsetX;
      ctx.shadowOffsetY = offsetY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
    },
    setTextBaseline: function setTextBaseline(val) {
      ctx.textBaseline = val;
    },
    createCircularGradient: function createCircularGradient() {},
    draw: function draw() {} });

}

/***/ }),

/***/ 493:
/*!***************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/uview-ui/libs/util/emitter.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 57:
/*!******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/network/Goods-api.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.goodsList = exports.goodsClassList = exports.receipt = exports.logistics = exports.orderDetail = exports.orderList = exports.payMoney = exports.payRender = exports.goodsSubmit = exports.goodsConOrder = exports.goodsInquire = exports.attentionGoods = exports.goodsDetail = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 商品详情

var goodsDetail = function goodsDetail(option) {
  return (0, _request.default)({
    url: 'Goods/goodsDetail',
    data: {
      m_id: option.m_id || '',
      goods_id: option.goods_id || '' } });


};

// 关注商品
exports.goodsDetail = goodsDetail;var attentionGoods = function attentionGoods(option) {
  return (0, _request.default)({
    url: 'Goods/doCollect',
    data: {
      m_id: option.m_id || '',
      goods_id: option.goods_id || '',
      is_coll: option.is_coll } });


};

// 商品规格查询
exports.attentionGoods = attentionGoods;var goodsInquire = function goodsInquire(option) {
  return (0, _request.default)({
    url: 'Goods/getSku',
    data: {
      goods_id: option.goods_id || '',
      goods_attr_ids: option.attr_id || '' } });


};

// 确认下单
exports.goodsInquire = goodsInquire;var goodsConOrder = function goodsConOrder(option) {
  return (0, _request.default)({
    url: 'Flow/fastConfirmOrder',
    data: {
      m_id: option.m_id || '',
      goods_id: option.goods_id || '',
      quantity: option.quantity || 1,
      goods_attr_ids: option.goods_attr_ids || '',
      goods_attr_desc: option.goods_attr_desc || '' } });


};

// 提交订单
exports.goodsConOrder = goodsConOrder;var goodsSubmit = function goodsSubmit(option) {
  return (0, _request.default)({
    url: 'Flow/fastSubmitOrder',
    data: {
      m_id: option.m_id || '',
      adr_id: option.adr_id || '',
      goods_id: option.goods_id || '',
      quantity: option.quantity || 1,
      goods_attr_ids: option.goods_attr_ids || '',
      goods_attr_desc: option.goods_attr_desc || '',
      remark: option.remark || '',
      state: option.state || 0 } });


};


// 支付页面渲染
exports.goodsSubmit = goodsSubmit;var payRender = function payRender(option) {
  return (0, _request.default)({
    url: 'Flow/pay',
    mode: 'loading',
    data: {
      m_id: option.m_id || '',
      order_id: option.order_id || '' } });


};

// 支付
exports.payRender = payRender;var payMoney = function payMoney(option) {
  return (0, _request.default)({
    url: 'Flow/doPay',
    data: {
      m_id: option.m_id || '',
      order_id: option.order_id || '',
      payment: option.payment || '' } });


};


// 订单列表
exports.payMoney = payMoney;var orderList = function orderList(option) {
  return (0, _request.default)({
    url: 'OrderInfo/orderList',
    data: {
      m_id: option.m_id || '',
      status: option.status || 0,
      p: option.p || 1 } });


};

// 订单详情
exports.orderList = orderList;var orderDetail = function orderDetail(option) {
  return (0, _request.default)({
    url: 'OrderInfo/orderDetail',
    mode: 'loading',
    data: {
      m_id: option.m_id || '',
      order_id: option.order_id || '' } });


};

// 物流信息
exports.orderDetail = orderDetail;var logistics = function logistics(option) {
  return (0, _request.default)({
    url: 'OrderInfo/fegine',
    data: {
      m_id: option.m_id || '',
      order_id: option.order_id || '' } });


};

// 确认收货
exports.logistics = logistics;var receipt = function receipt(option) {
  return (0, _request.default)({
    url: 'OrderInfo/signFor',
    mode: 'spin',
    data: {
      m_id: option.m_id || '',
      order_id: option.order_id || '' } });


};

// 商品分类
exports.receipt = receipt;var goodsClassList = function goodsClassList(id) {
  return (0, _request.default)({
    url: 'Goods/goodsCategoryList',
    data: {
      goods_cate_id: id || '' } });


};

// 商品列表
exports.goodsClassList = goodsClassList;var goodsList = function goodsList(option) {
  return (0, _request.default)({
    url: 'Goods/goodsList',
    data: {
      sort: option.sorts || 0,
      goods_cate_id: option.id || '',
      m_id: option.m_id || '',
      p: option.p || 1 } });


};exports.goodsList = goodsList;

/***/ }),

/***/ 74:
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/network/My-api.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.inviteCode = exports.newsDetail = exports.newsList = exports.withdrawMoney = exports.topupOrderPay = exports.topupOrder = exports.incomeDesc = exports.incomePage = exports.withdrawPage = exports.myBalance = exports.myWallet = exports.myAttention = exports.helpDeta = exports.helpList = exports.feedback = exports.aboutUs = exports.delAddress = exports.setDefault = exports.newAddress = exports.addressDeta = exports.addressList = exports.editUserInfo = exports.userInfo = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 个人信息
var userInfo = function userInfo(id) {
  return (0, _request.default)({
    url: 'Passport/member_info',
    data: {
      m_id: id || '' } });


};

// 修改个人信息
exports.userInfo = userInfo;var editUserInfo = function editUserInfo(option) {
  return (0, _request.default)({
    url: 'Center/modifyInfo',
    mode: 'loading',
    message: '保存中...',
    data: {
      m_id: option.m_id || '',
      avatar: option.avatar || '',
      nickname: option.nickname || '' } });


};

// 地址列表
exports.editUserInfo = editUserInfo;var addressList = function addressList(id) {
  return (0, _request.default)({
    url: 'Center/addresses',
    mode: 'loading',
    data: {
      m_id: id || '' } });


};

// 地址详情
exports.addressList = addressList;var addressDeta = function addressDeta(option) {
  return (0, _request.default)({
    url: 'Center/address',
    mode: 'loading',
    data: {
      m_id: option.m_id || '',
      adr_id: option.id || '' } });


};

// 添加新地址
exports.addressDeta = addressDeta;var newAddress = function newAddress(option) {
  return (0, _request.default)({
    url: 'Center/updAddress',
    mode: 'loading',
    message: '添加地址中...',
    data: _objectSpread({
      m_id: option.m_id || '' },
    option) });


};

// 设置默认地址
exports.newAddress = newAddress;var setDefault = function setDefault(option) {
  return (0, _request.default)({
    url: 'Center/setDefault',
    mode: 'spin',
    data: {
      m_id: option.m_id || '',
      adr_id: option.id || '' } });


};

// 删除地址
exports.setDefault = setDefault;var delAddress = function delAddress(option) {
  return (0, _request.default)({
    url: 'Center/delAddress',
    mode: 'loading',
    message: '正在删除...',
    data: {
      m_id: option.m_id || '',
      adr_id: option.id || '' } });


};

// 关于我们
exports.delAddress = delAddress;var aboutUs = function aboutUs() {
  return (0, _request.default)({
    mode: 'loading',
    url: 'System/aboutUs' });

};

// 反馈意见
exports.aboutUs = aboutUs;var feedback = function feedback(option) {
  return (0, _request.default)({
    url: 'System/feedback',
    mode: 'loading',
    message: '正在提交...',
    data: {
      content: option.content || '',
      contact: option.contact || '',
      image: option.image || '',
      title: option.title || '' } });


};

// 帮助列表
exports.feedback = feedback;var helpList = function helpList() {
  return (0, _request.default)({
    mode: 'loading',
    url: 'System/helpArticle' });

};

// 文档详情
exports.helpList = helpList;var helpDeta = function helpDeta(id) {
  return (0, _request.default)({
    url: 'System/articleDetail',
    mode: 'loading',
    data: {
      id: id || '' } });


};

// 我的关注
exports.helpDeta = helpDeta;var myAttention = function myAttention(option) {
  return (0, _request.default)({
    url: 'Center/myCollGoods',
    mode: 'spin',
    data: {
      m_id: option.m_id || '',
      type: option.type || 1 } });


};

// 我的钱包
exports.myAttention = myAttention;var myWallet = function myWallet(id) {
  return (0, _request.default)({
    url: 'Center/withdrawPage',
    mode: 'spin',
    data: {
      m_id: id || '' } });


};

// 余额明细
exports.myWallet = myWallet;var myBalance = function myBalance(option) {
  return (0, _request.default)({
    url: 'Center/balanceRecords',
    mode: 'loading',
    data: {
      m_id: option.m_id || '',
      p: option.p || 1 } });


};

// 提现页面
exports.myBalance = myBalance;var withdrawPage = function withdrawPage(option) {
  return (0, _request.default)({
    url: 'Center/withdraw_type',
    mode: 'loading',
    data: {
      m_id: option.m_id || '',
      type: option.type || 1 } });


};

// 收益总页面
exports.withdrawPage = withdrawPage;var incomePage = function incomePage(id) {
  return (0, _request.default)({
    url: 'Center/sales_withdraw',
    mode: 'spin',
    data: {
      m_id: id || '' } });


};

// 收益明细
exports.incomePage = incomePage;var incomeDesc = function incomeDesc(option) {
  return (0, _request.default)({
    url: 'Center/sales_withdraw_desc',
    mode: 'loading',
    data: {
      m_id: option.m_id || '',
      type: option.type || 1,
      p: option.p || 1 } });


};

// 创建充值订单
exports.incomeDesc = incomeDesc;var topupOrder = function topupOrder(option) {
  return (0, _request.default)({
    url: 'Center/createRechargeOrder',
    data: {
      m_id: option.m_id || '',
      recharge_amounts: option.number || 0 } });


};

// 充值订单在线支付
exports.topupOrder = topupOrder;var topupOrderPay = function topupOrderPay(option) {
  return (0, _request.default)({
    url: 'Center/doBRPay',
    data: {
      m_id: option.m_id || '',
      payment: 2,
      recharge_order_id: option.orderId || '' } });


};

// 提现
exports.topupOrderPay = topupOrderPay;var withdrawMoney = function withdrawMoney(option) {
  return (0, _request.default)({
    url: 'Center/withdraw',
    data: {
      m_id: option.m_id || '',
      amounts: option.amounts || '',
      type: option.type || 1,
      account_name: option.username || '',
      account_number: option.number || '' } });


};

// 消息列表
exports.withdrawMoney = withdrawMoney;var newsList = function newsList(option) {
  return (0, _request.default)({
    url: 'HomeMessage/messages',
    data: {
      m_id: option.m_id || '',
      p: option.p || 1 } });


};

// 消息详情
exports.newsList = newsList;var newsDetail = function newsDetail(option) {
  return (0, _request.default)({
    url: 'HomeMessage/detail',
    data: {
      m_id: option.m_id || '',
      home_msg_id: option.id || '' } });


};

// 邀请码
exports.newsDetail = newsDetail;var inviteCode = function inviteCode(id) {
  return (0, _request.default)({
    url: 'Center/distributeCode',
    data: {
      m_id: id || '' } });


};exports.inviteCode = inviteCode;

/***/ }),

/***/ 8:
/*!*****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/network/Home-api.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.loginCount = exports.rulePage = exports.searchGoods = exports.SeachPopular = exports.classGoods = exports.HomeCate = exports.HomeGoods = exports.HomeBase = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 获取首页轮播、导航栏、公共数据
var HomeBase = function HomeBase(id) {
  return (0, _request.default)({
    url: 'Index/index',
    data: {
      m_id: id || '' } });


};

// 获取首页推荐商品数据
exports.HomeBase = HomeBase;var HomeGoods = function HomeGoods(option) {
  return (0, _request.default)({
    url: 'Goods/goodsList',
    mode: 'spin',
    data: {
      is_best: option.is_best || '',
      p: option.p || 1,
      goods_cate_id: option.id,
      m_id: option.m_id || '' } });


};

// 获取首页 商品分类数据
exports.HomeGoods = HomeGoods;var HomeCate = function HomeCate(id) {
  return (0, _request.default)({
    url: 'Goods/goodsCategoryList',
    mode: 'spin',
    data: {
      id: id || '' } });


};

// 获取某个分类下的商品 
exports.HomeCate = HomeCate;var classGoods = function classGoods(option) {
  return (0, _request.default)({
    url: 'Goods/goodsList',
    mode: 'spin',
    data: {
      sort: option.sorts || 0,
      p: option.p || 1,
      m_id: option.m_id || '',
      goods_cate_id: option.cate_id || '' } });


};

// 热门搜索
exports.classGoods = classGoods;var SeachPopular = function SeachPopular() {
  return (0, _request.default)({
    url: 'System/getKeywords',
    mode: 'spin' });

};

// 搜索
exports.SeachPopular = SeachPopular;var searchGoods = function searchGoods(option) {
  return (0, _request.default)({
    url: 'Goods/goodsList',
    mode: 'spin',
    data: {
      keywords: option.keywords || '',
      sort: option.sorts || 0,
      p: option.p || 1,
      m_id: option.m_id || '' } });


};

// 规则
exports.searchGoods = searchGoods;var rulePage = function rulePage(type) {
  return (0, _request.default)({
    url: 'System/userInstructions',
    mode: 'spin',
    data: {
      type: type } });


};exports.rulePage = rulePage;

var loginCount = function loginCount(id) {
  return (0, _request.default)({
    url: 'Passport/login_count',
    data: {
      m_id: id || '' } });


};exports.loginCount = loginCount;

/***/ }),

/***/ 81:
/*!*************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/static/image/not-search.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAABLAAAAADYYILnAABAAElEQVR4Ae19CZBcx3neO+fY2Qs3SHBxkAQFCaRFMrQkU7JIlFWRzESSo1h0EitVscuOS6lS7DhVdqWcVNFxqmzHlbjKssuOE6UqTsWR6EO+yrEiWyuREs1YoACIBiUKJI7FwQVAANxrrnfl+/pNz868md3Z2Z3deTP7N7DTb/r16+N7733z999//20YEgQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBASBbYrA9NnL909/49JnoyiytykE0m1BYOARcAa+B2vowJkzs4U71crnIyN68CunZm7gkn+5hsskiyAgCKQMAStl7dmU5twOKp+BZPUgCwdpferL35j55KZUJIUKAoLApiIw9IT15dMzPw2a+qFmFKNfw/DwA81p8k0QEATSjoCZ9gZupH3Tpy4/aUbhFyFVtQx9TdN4y7Hc97zvnQde3Ugdcq0gIAhsHQJDS1jTZ67cY4b+S1Fk7F0JTtM0z2Uy1nsePz51e6U8ki4ICALpQWAoh4TnzkVZMwz+YDWy4i2AXutotRr8/skoctNzS6QlgoAgsBICQ0lYVxdnPg0yetdKnW5MB6mdWDw98xuNaXIsCAgC6URg6Ahr+tTFHwNZ/Xg3cDP/9KlLP9XNNZJXEBAEth6BoSMs0zA/uh4Yzcj4GIhr6PBYDxZyjSCQVgSG7gWNJg9+3DDML3QHuPmF0f3uh6CED7u7TnILAoLAViIwlLOEVLpfXbz0h9BPPdUJTJDUs6MPH/zEY6bpdcor5wUBQaC/CAwlYRHSs2ejzM3KzO/DBuvDK0EMsvrtJx4++EmRrFZCSNIFgXQhMHRDQg3v8eNmdU/24A8apvnHOq0xtizzl5585NBPCFk1oiLHgkC6ERhaCUvDThurxVPw0mAYH9NpsHL/mScfOfwr+rvEgoAgMBgIDD1h8TZMR5Fjnp75Xei0PmYZ0U888ejhzwzG7ZFWCgKCwLZEgKT13KlL792WnZdOCwKCgCAgCAgCgoAgIAgIAoKAINAWgW2hw2rbc0ncVghMT0eONXb+7eHCzLdOnDjhb6vOD1Fnh9asYYjukXRlgwhgyZVpjF4+FkbWLmvs/rer7xssUy7vDwJCWP3BXWrdQgS+9tIbU4YR7GaVYeTv+tJLl+/dwuqlqh4iIITVQzClqPQh8Pzzl3Z4UaWJoKwomJr+mwv709daaVEnBISwOiEk5wcWgXPnzmW9nPGOdh2wHPuBF1+8Nd7unKSlFwEhrPTeG2nZBhB45pnIemPOPW4aYVtvsmEQWBVr4UGS2gaqkUu3GAEhrC0GXKrbGgROfPTKfUEUrSpBhWaUuXLbeujZZ5+VzXW35rZsuBYhrA1DKAWkDYG/fPH8vtD3D6ypXZY1uv/+d79tTXklU98REMLq+y1o34Dps5fvx96Jn8UUvPz6t4eobSp3+TYtoysCCoJw79e+ce1Q2wIlMVUICGGl6nbEjVEvXTX8PDeA/cqpmV9NYRNT2aTp6Wnnlld60DJBWV2GalA58txz5/Z0eZlk32IEur6xW9y+bVnd7aDyGUhWD7LzcED4qS9/Y+aT2xKIbjs9OnUMvvnz3V6m84eF7LHpszdG9XeJ04eAEFbK7smXT8/8NCWr5mZFv4bh4Qea0+RbIwJfPPn6QcOwlXFoY3o3x1EY2EZ56cFnz57NdHOd5N06BISwtg7rjjVNn7r8JEyxfzmZEVKWY5rR7331zNWudDPJcob1+/SpC5NZK3OkJ/0Ljdy+YuE4zSJ6Up4U0lME5Kb0FM71FzZ95so9phF8juTUrhQ4H5z0Q/9PXzh7eWe789s5zQ7Me4PA79lC/tCIJp546uLe7YxpWvsuhJWCO8Ndfsww+AOQ0qovCfRaR6vV4Pfp9jkFzU5NE4Jd0SuGZZR71aDQ9C+feNeR2V6VJ+X0DgEhrN5hue6Sri7OfBpk9K61FABSO7F4euY31pJ3u+Q5ceRI2dhpnDZDs7LRPod2dOH7Hjv6+kbLkes3BwEhrM3Bdc2lTp+6+GMgqx9f8wXIyPzTpy79VDfXDHteklYmsDdEWlnXOfd9j957adixGuT+CWH1+e6ZhvnR9TQB0/cfA3HJ/WsA7/HHp0rrJq3I+PbjD09dbShODlOIgDzwfb4p0eTBjxuG+YXummF+YXS/+yHZU7EVtW5JC0PsyLZzZ0Vn1YplGlN6NrOSxs4NSpuodL+6eOkP8fI81anNIKlnRx8++InHTNPrlHc7n3/hhcv5qh08HFnRit4YrCgK3YL7t48fn7q9nbEapL6LhJWCu3X0qFnZkzn0DzA8/NPVmgOy+u0nHj74j4WsVkMpPleXtOz2ingTXvzCJfObQladsUxTDpGwUnQ3zp6NMjeqM89Cq96i17Is85eeePjQv0lRcweiKUrSykHSCpYlLduwPGts5JvvO7ZnYSA6IY2sIyCEVYciHQe0sVo8BS8NhvEx3SLTNH7myUcO/4r+LnF3CDSSlhWZ1XI2d+aD79y/1F0pkjsNCAhhpeEuJNowjV2qzdMzvwud1scsI/qJJx49/JlEFvnaJQIkLc8Njrme/W0OF7u8XLILAoLAagiQtJ47dem9q+WRc4KAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAICAICAKCgCAgCAgCgoAgIAgIAoKAINAHBMS9TB9AH4QqscHFxHw5+IgZmXssy3q5kDX+Eh5P4aZLgiAgCAgCKUEARGXPlYOfmisF83NFP9J/86Xg5YVS9GRKminN2KYIiIS1TW98u24vVaO/4/vhb2Pnw0fbnVdppvk5N2f96xHTlC2xVgRJTmwWAkJYm4XsAJULqWp0sRT+QmQan6KE1bHpprmEweEvjOWtX8Uwsdoxv2QQBHqEgBBWj4Ac1GLmK9FHozD8NDa+mOq2DyCr71im9anRnPl/u71W8gsC60FACGs9qA3BNcUouscvBZ+GFv0HGrsThkjBU2Fh54uQu4zya+17Y77GY5z+vGva/yqfNy81psuxINBrBPCsSdhuCMyVo++PwuBzURiNBUFogJaMIEQMsnJs2wgDw6gGvuFg10ob38FehknyAlDYbsywLWyUhbgxQNoqIc+Pjo04n21Ml2NBoJcIND91vSxZykolApdvFH/SyVi/7Fe8rB+QgvAImKGxc7yAo9BYKFaNAEcOkl07Mnw/MlzXNSzbMoIgMJbKVcPC+UzGMVwHxIV0SmMMIK0ATPaD41nzj1SCfAgCPUZACKvHgKatuGeeiayP/4ubI24p2ms6mZ/LOZkPe763x7Jdo1wuQ4IiEYGwJrJGPusad+bKRrHiGeOjWUhYELFqkhXICHkdI6Qkpv6ZuI4SGdIhilHqUrxlmq9N5O2jacNB2jMcCDjD0Q3pRTsEZmdnC7dLt/9+puI8atrW99uWc3+5Ws0zb9WLt+aj1MRQqviGC9IhgVF3RRKzwUBqGKh+1ihteSovhbIKJC9kMRaWqiAtyxjJZYwc/sBx92OmcQwEJ7sqx2jJZw8REMLqIZhpKurl89f3LXiZT4/kM++NQmN31StnPN9fsYmVSmDMRxXDAxFxiFeuBoYPRnJBRlS8k7hcSFMmdFccEgYoi3mY14OkVa76GFAiD4aJ85a9D4dCWCuiLSfWi4AMCdeLXEqvO3nt2sjOyJ3yA+cXs1n3I57n234bouKNJwmpWUHEPmcHETj0I1ExZEhWiGGfRaHKyLv4fYMBltZZVbxYOmNe180YtmsbXrkCzbzxc6XbC7/5Xd916A7PSRAEeoWAEFavkExBOa+9Nrs3yGR+DEO7D2Ns9h7Pq0I6iomo3rza1yqHfR6IiRISpKpsxlbSlAey4kxhBtJU2fMN6uWhyVL6Kc4kksFwieFAKw+tFb7US64dQGHv2FdNy/idcin8reP37ZxJ5pDvgsB6EWh53NZbkFzXXwQuXLiQ883xTzuu+4N+GExAN9Vybyk4BZCkqCxnyEAiIvuMY2XzCAiLyS5NGPDHvDAoVeYL1GlRx1XGsNFHGhXvlMwsK5a2SGDLQREWZg/tUhgEZ6LA/k+nFmf+5Onjx8UifhkkOVonAk2P2jrLkMv6jIAiK3fHj8Crwn8GyeSSQ0DSE4dvYRiTyfhIxijkYKqAu09pisM8jgg51KtLZDhH3wy8lkE9KDhP8vJQ1txixShCAgt9SGSQthwSXcPTZEGBn8lmK37gv+BHlU8eO7Dn1bgk+RQE1o9AwyO2/kLkyv4gMF+K3gdJ6keK5coPVCr+DpCL6Xm1mTw0iaNBGiFUPdKOCVurvJGDJJWHDRWJhzc/PkMDUZIVDUM1cUEa41mmISNttni+MdDQtOyDvBagrIehqbIxbRgjgsIMy7GqUIX98uzFxV98/PGpeGqysRA5FgS6QEAIqwuw0pIVXhUe8YPgP4JMPrBUrIA0fMPDkK0uHaGh5BYP0g+lKhp37hnPQU/lKBMEkhUDFewkI9cltaiUJilJJeGD5XKIqBX0VGU1Eh5nCOeW0A60gVIadfM6KEnLdX3Yfn2+aIY//c57dl3R5yQWBLpFQAirW8T6nH+hHPxz8Mevg0RckBYMPZcg2bhGpYLZuYZQgcmBaTnGRCFjjOYxgwcJSgcO3/idQ7jkEhudZ6WYXEc9GGcSSVwMNHMIYTtRBGHNg0BDnKOkpoPjOKjPqUAa/K3xzPi/3bvXXNTnJBYEukGg4bHq5jLJ2w8E4FTv30PK+S8kqwDSU6nsgXQs6JSWh4EUraoYvgWRZYxBVzUBi3VNVoyzrmW4GVim47hbsmKfSXK0bs9CYZ9FOTwOqezCCRqPjuKPxg6UwGI5DsNJSIBB4GeiKPzAm+Xrh9F+ee768QANQZ3y4AzITVws+T+Msdm/082F3sqo0tpcSTqxqKOkH3xw8fIkiIrSFQmGgcRSl6zipA19slwbkpoyb9CVgKIKIMndEyMoG4uo2aBa8P0AI1DzWNbMfeKll3BSgiCwDgRqj/M6rpRLtgwBuII54JfDc5BM1LIa2kPdvrOk6o+NPGMFehXkRRvR3TtGIOm4yjyBwo+DtX4wQAd5bc7tDiHRQeDDUBEqfgpb+FfBDCL1WpSudLWUBm3HXoQ56s/v2T3xF2sFEGVW7ayxCBqcRx9kOLlW4IYw3+Y8wUMIVD+7BH/qnwFZ/SjbQMV3FWRwZ34JCm6s+6MiiYIM7mSpEhp5ENVdu0aVopxpXFpD6UqTxmb2gzOJVRqjIpBCOWSdXyrq5ql0mF6o5TtjozkVq8QuPtCTW7C3gImE+TLc2UwbeXsaCxdvdFGEZB1gBISwUn7zFqJob1QOr4Gw1DCKEkuxVFVGnAHHfgiUajj8gmUBpKuCUci7irA4A0gL9q0gK92OMgiL5g4qILr5VhHSF6SsOIVW8Dg2oV9zjWwuW0tdfwSJC7VEz6OE3xnL2Z8TCWz9WA7ClaLDSvldisrBhzVZsalcaByAuzgrpwP5IcSCvz0YCuaytiIr2kTR7ctWkRXbwroyYEldJ1XrO8Zy8K21/JhBl2XAc4RRwixmo45L96XbGNjQt+D78fffFkrhecyi0i+92205kn8wEFh+kgajvduulRha/V3dab7sJUhXYdRscxWAvDJgqGzWUXZQJAxasNO7wlYHchOV8axZ68/oW4tDQR2qtBkzQbpaEtMnNhhjXnIPyvy1+XL4rYWi/0Mksw0WKZenDIHlpyhlDZPmxAhAfDiosahiSQyWuhh+TU+k0jn6wnvJoZ9dIwUq1xv4QV++JTFNJTgbyWYxkLocmFKQxHTgKC6Eb60yvJduSoii+yB/fhbS1tc4YbEpdUihfUFACKsvsK+90sg079a56c+KOvawprsiBdAtTAam5S7soijRULRR5KCGiZi5wxBSWbxjzIT/SqphmiYUXXYvY4smFDXpjjXZpqOkP10HJB9IiWgqSKzXUpaugzGq+R6/FH59rhq9uzFdjgcXASGslN87kJAyZeCLzZtFq3HFSrV2B3grRzAUHMHsIA04qdJmXg/rB2ntXoE0pmbvMINYgreFchXfcT6ADRfdytAsgpbrvQ5KoKoLVZGRQ7ux7X29GpIWJw96oceqF9rmAIR5lxmEX54r+Z9oc1qSBgwBIawBuWF8sWHDBAt1ThbWCIYR/jgUVE71cEwCU0tnajZR7B6SlDdQHjNQwqrCcIqSlyItEBfNEfjH78y/0QDJkMJePVCHlcGEgA602bIc11gCaW12ADnmgNP/XCgFP7fZdUn5m4uAENbm4tuz0qmXwjbyyhBTF0pPDHRJvJFAcorXBlLaItnFRBaTVyyNrad8GpM2Eh8nAhRr1siQX/0qHAxS2tsECa9dm0H6/wHK+H/U7pykDQYCDevqB6PB27WV1E9V8IJjBFcP1Gdlcw52u+Ft7IFYhFJYJolQBbCKje90M8MULnJ26NmhRj4c4fGQ38k5Kh2x1pnFhcSflLCo2zJqbuU5JIS/LDUk1fka9PI6aUMxCZPtbgyQ/P47vF28VsiYJxvT5XgwEBDCGoz7hBcP3hHQVi5viaLYYFQptcAUJAMSQM8DiuQQUwdYPBkBRnAqCdxD76S0aKdURraiuM7DmN70VXHM9uWwjVgJW4jpUIWHCW7a41p5OBSkzRjpr3eBdXJ3H6651AFpeSwc/6OlKPrugmm+odMlHgwEZEg4GPcJrYSfKeivuA2XDjxSwymKX1sQSFSKrFgXjmnESqW9Sq8N7dqRlW4aJwO06YVKA0FluD0YvD70mqxYPsvMckfYREAbDwTl4HcTyfJ1ABBYfvoHoLHbuYlckmNhI1O9jyCxoF0kPYhGII60B5IH9VW00Nekx4kCr8Jh7ua1f6WS0YYn58vRh9OOm7SvGQEZEjbjkdpvnCH0sY28WuxcayUHiUznS9kqR6SrKxyecR1hbfSoGkdHf1ioY8DAUw1rN0OHVaEbiZVCFP4S2vXnINPaGHuljJKeFgSEsNJyJzq0g6M+Sig0EOUmEAzcHj7Ech1bLXbuUECfT5NUOVyk48BGY1EOc0tl38hscLZzPd0DWb0DZPnPcO1n1nO9XLP1CMiQcOsxX1eNnLnLZrDTDdwhx4HW5JbhawX8ukrduosoAdLnO8VBkhcDbbV4rJT2KqUPH5H58yCujbuN6EPTt2OVA01Y09OR85WTrz80PT099JIifV9Rj1WFzoeBa/a4RIcSCgeEjYuLVYaUfYCbEDAEjEWtuHU4rsJUg2YZHDL2I1ABv1gKPtKPuqXO7hEYWMLCA24ao5ePhZG1yxq7/+3qe/f9H5grODvI4WDsQ4pkhf0AXfi9AhPE5LWKriYFvYz16mStkBYQKtBUgxb3NhI2Y5Zwrd0GVf7TteaVfP1FYGAJ62svvTGFwcRuwgd3K7u+9NLle/sL5ebWTgkkh/WCPraf15tHeNhei390OxOvMdzcNqy3dC7Sod6NQpResKMEKvzmsN1rnSWkUr6bvxovdm62aX4I+BY6Z5Qc/UZgIIdSzz9/aYcXVZoIyoqCqem/ubB04l1HZvsN6mbUTwmEawAzbkZZvOs6KLlUQVhcoqNMB/o0tNLtaRuDOTy0sYLdfUi8bCelLDoiLOTtOgG3vRaJ9PyQVxb2a6YgVRTrShqOtqsD+Vy4n38fzn2h3XlJSw8CAydhnTt3LuvljHe0g9By7AdefPHWeLtzw5BGpXsId8ONs2yceatbmvfaLqCHoLGNbLce+nEAG0EvB6eoytxhtapo/KmvWy1f8hyvaWc4mszH77APe6JduqSlC4GBIqxnnomsN+bc49Dg6KmyJjTDILAq1sKDJLWmE0PyhVIJvYq60F3FAeIV/tONjIeNKfRwK1XdVdIVhq1Yg1MnHbSZ7aYExNnPRud+7dq+EaGRVa0pRNGDa8onmfqKwEAR1omPXrkPa9tWlaDgEypz5bb10LPPPrsxNwZ9vS0rV56BzodrCWM3M5AMILlUQViLpQokFii0UyZl0XZsseSBUJct3ElSXINoQ8LKwHq/UyjR7Q2Gw9R1dfNH7xMl+P9aUzDNt60pn2TqKwKdn5a+Nm+58r988fy+0PfX5u7Wskb33/9uPoCvLJcwHEeUUrDtO4xIa24P2C0QVQVK7RIsxnM0EcC/NAS2lS6dq5gYUG2CtEUtFK3dI8s1RjKcSOj8u0IJa83Es/6OH1z/pXLlViEwEBLWmTOzBfwYd/ULiB2R937tG9cObRWQW1WPBfOGCG+8DbfI9SEWaID+p0q00YIUwjxpCHQ6WAaJBjXjVpIVA6Uk/nNgqR/bkcXp/fzE8DSHv4H5Ae8nVv2sOx1P9ioI0Cj0lld6EAtlu25rNagcee65c3tWKX7gTvGlHxvLQm/l13VZ1AXxH80buPszxoYNZNafLlIqKmKYWsLMoNatUe5T7pnRxBDpmQzb2Z/2rVDr2ArpkpwSBLomgS1v9+jUMayjU37N11N3WMgemz57Y3Q916b1GrpoGR2B8zv4edJSFkmLpgMLixW4Oq6qNXv63Jb3AyxUrFagu4InhprHQfISSazqQxrEwSg2UuXmGWkKi3DNlab2SFtaEUg1YX3x5OvQK9jKOLS16WtLicLANspLDz579mxmbVekPxfdsqhdaRCTBHQgQXnQGc0tlI0iHeXh+1YHNieAPq245NFUoF490z0MBU0sJeKeieOQErkWUoIg0A0CqX1ipk9dmMxamSPddGbFvKGR21csHKdZxIp5BuwE/WBlsVTHathFh1IWgwcdVxGuaKjwplU8vTroYdlmdTOWoGCoCaKcL5Wgt8KMJf4xsFngKvjtIodiRRWlq4R3BnJrN1bsa827Wf1NQ7m43+Zz37j0jpMnr42koT1b0YZ0yeQNPbYD894gwvihRwFT6RNPPHVxr/GMMRSW8HzxC3jxi7c8KOAzcDNTUUhpf1kkLbptsfPcUQe9V/5pegRmm2JIlvPFsvLIwGOSlBbwOASEyk2RVtbCcDCfqQ9lWVQOVuwZWpBuQqBpQ3Gtpg2bUP9mFvnVkzNHAiPcWzIrYydPnvzGY489tux/ejMr7mPZm/OU9KBDwa7oFTgJL/egKFVEaPqXh23ZDn1L7ZjMKkt3mgk0hhCLipdAIDfnFo1F7LAcEwiV3D37DVDVUaajBfudpSKkK5gvsCIEXQ0Hhdwb0YMuy0HiRMHFMqJmH/TcKXqzwrCOOjmZhDUPUJlgIgM63gV711CNIFZ6HlJLWCeOHCkbO43TZmjGosNKPVhDemhHF77vsaOvryHrQGWhLiuH5Toj2DkHGyuAuJabH88bYhiGtCIIq1zmOj4QCe54r+ihCnc3nAm8s7ikzBcoSenAQ36PN3KNh3scvXLTiYUlDFcxQaBDGYTWjUFoN3kr2FB22AKHgGHBPtbUL9+Y/MDfu3a0KW0Iv/Tq2d00aF544XK+agcPR9b6nKxlXefc4w9PXd20Bm5ywfPF4AbIZ1XTDJIDSYB/2EkQuz8vSzhsHqUeWsbbWJNHu6eRbAa6rdhjqToPkwj+7xSok4rAgJSoFssVtSSIawRjqYrS23IJ8QYV8V6HJEkO+TLc5gtluGCuHDafGMHGqmmxGWPLrby9b8w0byz3In1HNPOxRw89ioVObfVWVpR5/Yl3Hbicvpb3pkWplbB09x5/fKqUCez1SVqR8e1BJiuNQaeYREGLcceFk78A0pYJP+9ksRoJ6WEgdPBKulKOACGOleE8zw8wmwcCYnaG5SFdzD7UiTGN5gmL5bKxBOPUWwtF7Njs4dpYSmL5jWRVQV4lWaFcSoF5tAv/a4HLa+C5AXXPg2Cr1Vjy02cl7oAAzHxWIiteGZrV+6ZPvrqhmfUOLejr6YbfxL62o2Pl3UhaeL8ix8m98v5H77rZseCUZ1iLhKW7wGHWUhFmDSCT0PcgycC5X9MdNjF8tKHkdkBSICJcSLKBt1KO3sgtamhG8lKSE3LgrLLvIjkxXROarlPH1OmzRCxrVOsGuQ19CIbkcDUHtqpicXZjoB8sSld03leAEp7OCfsd0i5h/dXXzh+yMuaRTjiZlh1E8wunTpw4DtOy4Qr13720d2utkpaFMUuu4Lw8DGTV7T3hrjRjoxljB/64JVg1tCHpQCmLmTKSjUlWoYzF/xgTKrfKOAZb4TngORAOiGVusaTsvEYxdKSZAtMohfGvXWByGTo0umz31KalsBPDbCBdH+8Yy7HiuK6Gi7W7ZxJhEfo1Gr1KWBmBv3jh8s61kBVLoO2hOVJ46OwQ2R5qZAaGsNjgOmnZ7RXxJrz4hUvmNx8/PnVbd3C7xbS7KoxkjHHMxpnUN2GZDoeI8ZIYLt+BgpvaeZAXJSrqpRCpQEJSwzuUoYxTOZTLYkavdp75GwPz00FeqcIlQZTKoJ+C65sJkNTuybyxf9eoMQLpKQ99lavWPrY+bvRESlJcKoIYocTnkiO2UdfZWN92PeboIpsJ2/qAWwkT6nxvlQoPQiJuBX2liwYgfeA6o0irDJ1WgrSgvvWcwtjpEyeOvDUAuG9qEzkMnBjNGlP7xo09u0bgxM5V3j2rngVbKUhQIIeFJd9YxHFVuS6O6YGSEsnMgfTFoR89QEAOU4TGHPGQMF4PWKpiYTPIqkq3McjhQKLLZrPhSM40do5nMRTMwDFf/HgpA1co3Dnsa10SGm+uSiPXm28uGDffKkFXRv9eInHxIaGbpEouOg6xqWubSbpi+qv/N9M8m7ipT97mF574zdz8CntVg9Jp5TB7GESwRTSr5WzuzAffuX+pV+WnpZxudFjt2kxd1Rys3oswIq1izMbv+A+SgdIKfJKhHokEpbgFaTV6otzFjS+oy6ICnURG6YukRsnKwmwjfV3B+R6dcM3CD9epyVHniR1j+bbrNjnkW1IbwcZrHrnjTzIUKygcbSH52VZoTIJ08/Bj38nBX7Kc9X5Pow7rKy9dfDvw3rfePqnrfOPiie85cnFDZaTk4oElLOJH0vLc4Jjr2d+m5JUSTHvajI0Slm4MJSQfpDM3X1YW6RwpUKEeYr0MSYwEpTa3wBNBVzWK0EBQjElSXN6jhpH4wG49JvKcg/V8NvKC/w3N+e+Uq8XZ44fv+jaKWdEEg5p9LhkqYWaQ6w1ZNgMfQiWtYSjIJG5p5mazhgWfX/sgIVI3pzfeUBds0kfaCGv6xXP3wBbl/l50F04eX/nge+9PtcnGWvo50IS1lg4Oep5eEZbGgRtZcNMKmhZ4MKpcgEeFctWfN8FgkKBKtuOMw0FgFu6mqWyvOhkHGlwr6/nerYztYk11tWxbzmcxZJz1veKLF88eePnpp+Ot3tfSVg/lLi7CXgzk5XFTCrAhaErpwUiMOlCaY5gYzxsT0MlloE/TaTpPr+M0Edb09IVJu2C8M1hWMW6ou5CIw6Vq5fRT7zk6v6GC+nxx1+PiPrdXqt8gAlzOk6fHUviqC+DxcwQzebeL4VOlsncD6xE/GPjBQ5jBuwD903egcfonph9cDSxjGjr6ReiZduQz0fML198sOs5c6V3rWLtGp31ZkA+t731MCkDPrsgLPKokLd096tDIWYvw+lCGmQZ1cqOFzJYND3U7+hXbY1xLixmTHgXud1Cw3ftQ3KkeFdmXYoSw+gJ7/yslGdBFDfVFBybtc6NG/k206jcgxSg558xsVHjtud/746effhrvDbZrraVvtOWsdwS+vLgcJ/TgQtmvwuDVNnbkLBilYp9FzmDWJC0q+QMwmonF3QuYKKCn1TEQF3Vrwx6CBaylzRsPY9kC7EI2HjBjvLT0ZjjwLsOFsDb+LAxFCSAkjszq4Z37zfoERq/IShfO4SAXQPtBVdmDFbBEJwPSIhHNcZ0hSasWqOfyvAr0bNRr4e2Fnov6LLRJZxnKGLPdZez+dGp2znmYi5s30kkY586PmHdefvKpwffmMPw/VRu503LtpiBAGy9u/DqSha0YyKcIyYo7/3A2cGzEgdQX237VBC3VBs5Mlkqhcf12CUt6sCyIU51DHo4ePVpZmPBPY2C47gkl6Btvz54/dGZYXM8IYQ35Q5/W7nF3H5KTCxuxKkSIRRiPlmFRz8XZNHrNK0PTZSmKOq2qV1YmFW9hplGbSKS1f71q11MgrfIN/zSMSIrdlgmJ9caX/vSev9WTIt1en8b8QlhpvCvbpE00Lh0vYOccriO0HLWsh26VXUhYBZIZLWAbA0QuzFYaHiSyOUhZS1jSsx3CU08drewaKZ2Gie6aSQumJ9e+95GD33rmmeah/qDjJYQ16HdwgNtPNdR4IWvsnsgZWUwA0Lh9qRK7r6GzPy6cjp39NXcSa+WUJfwcNtxYWKoo49bmHMP37fjx49VbIC0qzzv1DsvKZ7734Xu+02vdY6d6t+K8ENZWoCx1rIgASauQd42dkzkjD2eEVbgzfgvSE7cry0Hy4vBwBNbujYG6rYB2YiC4m3dKxp15kBbtIoY8PA3SGrXuPY3ZiRW9MNAf1vd+96HzwwqFENaw3tkB6hdn/Ki7ojscF6TFBdtFrCfkKkWuayzQJQ423Wgy1EL/fGxnRuV7EaJZGQuwt0N47DHTGwtvnIEyr4W0MBv46jA77+P9FcLaDk/5APSRBq2TWDQ9lscyHBAVFwuphdUQnGjGQANXkldTwDkuHqJO6+b8knELC6eVHVdTpuH7whm/MfvOGeCxwN5hPiKyS/7Z9z92+I3h621zjxJPQPNJ+SYIbCUCNGeYxH6Fe3fllaeHeRiLLsLKnct3qMua5PZgkLQaVfHKuBTDQwN2WgvI+9ZcqcmOayvbv5V1kbT8+YNnHDu641asb77//UcH3lnlWvATw9G1oDTkecpFwzl58vWJhbyVDyv0foF5OzPMVOAJI+uGLiykMpYZZULEUehn4YcXow94H1M7iIVwlgFrqtCk29IsdVIbCRwe5uA4cAxLdgJYwys/WyXfGM/DgwMIbQIxF8NVeKIhcLdrOiSswJMp/XON5reDcalJN65nGmAY+kMhrKG/xZ07eOHyGx8vWfaCBSsB5V7GpicFuJ4BATBWadArqW9wBqh2uWCxNN6kFwfGWNEz++b8b2L7+V0wCp2AacKE6VgT2MJrAkQyAR6aBJetyWKbBqR5WLWX8VehMz80go4C89i/kJ4cRjE8pAsJdQ7N0BxJrxOVSsW4jeU8nueqGUjtk4vNlTD4CAhhDf49XHMPIL3ArVX0JtwSX/e88LoXetehrL4OJ36LFn0a03icTwRjFSjFgJCMWJpp/ha7nIHfh9j1DHLdvLP4qrpMf1DhwLJqigcH2+UUXHtHJpMdhww3iSonkDbhmNYEOGoSuqoJuLGZsGxzLIutoffstNVGFW/NlY0SHPzZIEtayNsYHhY4c0gLeeVAkLQaB5IW9rvGUBIbyVaLxv6dI9ti7aHu/7DHQlhDdodBSiFI6TZe3Fksd7nhR8FsuRzcKFW82cVi8SbUPVFNcKr3nBIK/ygngVtguhkLLZZlc70x3L/bihG0wlPHJDC416vRWb24+oGiOmRmzODB6nPB828ExYryy0T1OucCGTPoY1himXCrPIY9FyewTds+bE/2fvhBfftbSxWnkIt9xbvw+DBuu7CQ5wzh8s47sU6LIyU0GQS3iOHkKHRfW+UEUHVEPjYNAS1Nb1oFUnD3CNA7wldfnpnEmrudD95799dBHzsaSwEpRbA7egtW4bPw5HnD96PZShDMYlPT6wulyo3Qo9MWBi0dxZQBywHYKyG1xiC0ZeJ+hYzj7M0ZzDA0wW4RY55Hu2K3DVwng6CvZcwAkgS5WSC5OL8+Zszzum5dHbiVbrhQZpyfeRoDr/NQFvxw7XZt92Mg2nfDr5NVyNDdMpqEYSp3CiIpcXiY1J/heiyqdv3xkYw3PprJ4qvm2sZq6scXbtz6h3NvlS44mcztyci5dfz43hbTgXpmOegLAkJYfYG9uVI4a8vld7q7Q8fcg6HRbkg1u/E2KmvJB6b2/CS0OEu+B4nJD66Xq97s0tLSDRhWwqu6jVc2gPYoloBwM+kbBml1tU5TRfocY55I5k+ehw8l7BgFKQsx8ycJKpm/U3mdzrOOlQKY5pDrZh6Hc8HHsa5unDouSlnsMG2xyjA4LcENNG23GoODtYokrsD3vg4Xpv+nkMMul449DtfQGJJak9hqTOnZMG0weWn2zq9iQ4wi+8UyQj+EDt+6gYXXbzq2f3PpHYffPGEqRXdjFXK8hQioB3EL69v2VVFI+etXruyAUnoPeGAPnv/dQWiNrwUYyjFaj8T8+rgmH7UUgfe0NqSrvYBqeBentWRGQrJ8LV0xZv6kBNWujNXSum1PsiwnMgpuduRD4JOnIJU5BSjf6ZaGklUACasEA9IS9FqNnktZBiRSw8m4Fa9Sfc4Pyv9LE3yy/E79Z/7QDO+EVeNNzInetHOVm+85OtgePJMYpP27ENYW3KGTr9+eqC7N3WWazn6MaPbBH3pGVYtpeiyEA1PURir6WPuDan2D4IYTwycMo9T1HHqRTGpDMFWOLiPOgE+WTc03QieG61Sfrrs+hNNlr7H9yfrX0X9IoA9gk9YfzmZy9/rVijEKK3iSVsyoETaRrapNM5IPNiUt/Fi8CB9cfxBCUo0BSXyup/9mUIwCaxaupN8wR4PZx+6+e80LlBO1y9c1IJC8r2u4RLJ0QuDM7GzBu2nu963gLryT+4IoHFHXUPfDn/uaDgj71YBKuJUW3xT1603jpgi/4uq+6GPGKkPyI/mCJZVELUorFKCvYVn6OK6+RYKiDklLVarqBOHotjNm6NQf1e8N9t+Em1To1PbBnOKjlum8By61nJEMagbQBIkbaCzCi0M5YaeVy+ZAZJUvIseXMNS7ohq8Cf0P7GgeP0LX3VzhjYnw1nX6tFJ1yUdPEBDC6gGM4B/7r79zZT/enQN4Ye7GVFuBxSbeh1YBh7oh6IigjY7vgz5m3C4EUDtRmGDMoI9rAkZLfSgXeico6NuX35JfFRkLYqr85Eey/uT5Tu1Jlr+R/lv2fnDXR0zL/R700NGeHXSTSFjKrTLg4l6I+FuAav6/Wn50NqrtabkV/Q9N8w6UbG/A9PbKI/fvfxN83f7e6oZLvCoCQlirwrPyyRcuX87D5PpAzs3eXfW9u2FDpObKtBDCK5M6oOSsm84byyeQUGrSlZaoOs2i6Rk2xqwvmR/yHGbgoJfW+2nVh4fxEK4lPyQq3UZVHoaaug/8nqyPkqBuM88nCUBfq3VgumzGzL/e/kNEzRZGrEfhRuU9S759DDuzF2xs3FOgNTwUZapsKLJIWNzxGor6hapf/SrO/IkRBTCU70//scSoCknwamgFV407d73BhcyqsfKxZgSEsNYMlWF889KlHdFS9oBvhgfAELsww4QZNLy0iNsVo88x5nkOW7ghKWMGXKRm9BjzezI/0xpDsr5O+RuvVcest0HHhW/K5ooxz6ORTbOMndqXbE+yvmT7Ntr/rGPbrht+V961HkZdWfCwVa5au8q+eRg7k0Gb5cMVDe3yLW5dRrtSmmxgt5/g98DpJ2Em8lZa+g/bNs4NXMec4zUniK6KCUXy6Wn/XQirPS711JOvXtvtWu5B6GmmIKnEuqj62W4PkjJF8vqkjJI8n7w+mb/T+WR5ye8bvT5ZXvJ7svzk+WR/4vMYRlmFrHkMbrMewVs+EhNrAP6BDjAMLIwscyXfOQgPy7sxTLRg5QAHpnRTExa9auXPYfrxxzAQY+UdQrJ97dvToZBVTifLX84Kx3xzlu3OlKKFGZl5XMYleSSElUQE38+evbyz6poHLceZglZc6aOYLanTTl6afLyTj2eLDhxmBtQVQ+hR90EfM25XX8v1qECnMb8+ZqxCogGJr635a5etFG15/4HLaM64L+OYj0AKHONaa4ikxIqfnLxQx1h0bS0VzfMV0zlhWc5dGAPD2D+8DMv6GdcO/4cZRmroNTj9D+8EkTmTrdozInk1P41CWDU8Tl24MAkzwYM2pCmMKOok1QhX61ISkAQy8EVgMDH0izA8ZKwS9MkageCFwxAMQ0jEPK+XojBmaC0/Xraiz6PQxJANdaG8qFZeojpVZuNHsr7W8pqHqI3X8ri1fZvX/7xjHsy44SPYN3EigN0AfWLRjCzCHCp4il8R1IyrBTfvpxeqzhkj8h+qhtEEBt5XTcu5YwfhTdNZNvQcpP6zd6q9lnsbz8zMnpx3+W4xmVC/VsRmW4Zr166N3PGyh6E8OoihxngAZTCUtvh5rumcoPgIoFi2a0rtug2UtkNiOo/1+SRjtPykA2adRsRZT6MdVafykncpeb0uizGDrkszarJ9ifLS0P9sJrwrl3XfCeOFncAWghVIGi5IwczcHQziqCKrmqQVmViEdGmhFMBcAQH9xo9BBsQVemHkY5l0M6MOQP9Xe54gNd5yIuuSUbkJyet4VfV5m32o36nt1GeaILxy/s4BaD6O4Kd6X2Pfk0po7HUAhToU09qMIMkALWOwxtLaHCfHVInrW+rHy6rT2pTWorTHRBkkPEhJur0dXtBkmbouxjy3lf2Hg75dWKP8EPTq+yhFqeEeVyxzUgPyFEjLghwK2oKhAH4mKF1BoX5rvmL9GYaEau3kIPefeLfgv8L9Bw6ha9pXgpHshQf3Fm5sJ1OJbUNYZy9f3mkGucN4nQ/ihVDr9DoKIMkXPnkBn7LGkLSj6mRnlDzfWFab42T1yea1uWTVpI7lJStIXpAsfR39z2TdsYwZPgQ91V34MeEUnyIr0BLJGt+40jsEZVlUooPBKGdRDomKby14fxZadpHNXE9IdifZ3fp4X1eQvCBZ6Tr6D0Xish1esrzE92T1bBYQKdp+cCmqWBe3g75rqAnrHDxg+lffPORXw8N4E1rW6yUX89JrgU5LPCttv+q8jBmUbyg85YwZOCTRaSoh8ZGsL1leIjun6JPt4/2jNKTuI65XRqKMeW2b/Eyuh2R9nfLXL6wdtFyP3uo+M4s+VkOzxMXQTWFbQvOYY3E4TlUc3dhAkoK+ChyF3xUylBoyg7CUb1M1I4hTOGkEi+Xoz314rECxA9l/wpHEO4lnArKW/DjfdP/hmQKeO8qXZi/uv3LixLLuLlnOIH8fSsJ69dr8bjOo3ocH4h56pMPgQfUTo0G8B/BugLjdTdPn1pq/XRm9TeNIhy7L1Iin4Xhtbsy67U+3+dfTVzBTbqyQuR9zEwfBPTBGUkO8WLLCneJ3JVnhZaRyHXVgBMiJhQhsxmPqrcy/KnrmtU71d9ufbvN3qn/j59d3/wGcj8VKl0w/PH/06C56lB6aMDSENT097dx15JEpy/Tvw3IyJU0lVEQtN62DSgm/aLD0sfGbjzi+GJZYakjCGBIEBCtdBr8n8+trGfN8MoBQm5fO1MkpJqTk9Z3K121hzJBsX5y6/Nkpf7I+CDPr7j+H4WMjuSMw2TiMcR0m8ALM+EFNDkCVbgpEBNZShAR1FbIQaNjSI5ngg7Ro7IEJWPtv4LTvNfaiFZ/lPsfnm+8P0xrDVva/sV59vBX3H55lb8IB4utvm9r9xjDougaesM7euDFqV6J7LRPmCFGYwRtF45y2/Wr1HxX7kqJPKT5E+lrG/N5JiduSH5fotLblJc4nXxit4GfM6/H64U9rLtipDu1NlK+KaPjoR/8xvnPguupgLuscgsbcVcM/zvhBkoKBJ4aBgBkzf9A44wMT+NA9U5KCTSiGguAqC30OqY82TGzhda7k2S+teL9S2H8+i3wmeBv0MWN+38r7j9+GUuQF5+3grYuDvCBbAUfwBilAOWtevLm0r1Jaus+xMnu1zijZB+py9K+YOsfZM71AFwlav6SvT+pckueT5Xf63kw3yI32UAxTMevHsW4jy0rm11RVE5hadEKd2qfLZszy0eEt6z+Ge7BOt+7G8p3DcA6agTYKuicISVj4B0qCaIXhHxxV1F5eSFmwtWIWKt7VhBmaqyQwCFqYGcQw8I1iKfgaZ0G1TizN/SfcyfuZhvtvuYC16l8rm5nzx6cmbrOdgxQGirBoknDp+tzBaiW4H5Y5hZYHAhsUYFM6qH14pk3Q5xi3C4nrMWRpWjxMha9Oa3d5vW5dfqK8jZ4PUC68ZcJZXdz+NPYfdGzmMs5eONc7hGEgPLCr4bRaksxZPvAYVEWY20JK7F4ekhZ4ixZtathHiQQ/SApr7CYGt59YamPOlQLzy7Bc99Pef/XsDcj9xzsEi3rj3CANFweCsM5GUSZ/7c0jVmjfC9Vr7PyuDWMkVZQca0SQLhgze4vEkSiDLxtkEdgm4qee+WvHjBNZ1ddkfVo9rlXiyfI02TFmAa35IXFhQiCoTRLoY8bt6k+mJduz1f2Hb6pdru0cxKaGeYz34MlF6aggL+Gu1YQpuDCmmMUxYJ2gwGKmT+V7LFkhK0gLiiwlDprYuasaTsOHfTnZ3+T3fve/9X42P09pvf+QbpewGPu1rz8/efnpp6EISXFINWHREr0U5O7D7+xBPM6I+Cu8rKPSx4wVxgktc/KF7ZS/RamQuHHJ+hOn2QilP1upPcnyk+W1XJ+ooGP+PvUfrtUnMln7HgzzsDgcXEQdDcQirMU0A9+nBh0261RbgYTUFxqB0jiUI0Pkpv+Z2AarZmsFBqMEht01Kp75PKSAOUKR1v6zbQwt9y9xP9J+/zHDUcFtu3DvgbELEHFT6fqGj0vqwuu3b0/YQfa+MKgcsCGHQFcRt5Pcr8dBPEzoqJgP+o1I54e6A8fU3+K3TYXm38BkflTUVH58zfJnS30JHVS9bbURqW4LY5bSqb6W8hP9SbavU/7N7j8YZzTv2ndDWBpTJoxKCQVeAQ1BjCK/0HYKOit4rsKbABCYAyNCMBSO4M0UMfiNTldJYJSsYHNFfRe18OUgPInJxFl9P9PW/6QOcljuf4S94TDRcSlr7nh9asosLb8B/T9KFWFduTK/y3Oio/ht3dMeGmxDYPhoM2MGfcx4LaGZsHAFy+G1tfLqx7q8rs4HaA8IFiQZt0dza42/UE2n+jv1JyX9h8vnfM7eBxfF4yQgOHkhXjD74RCQxBTrqmgICmjBWpSwQGs+JSfqqJAPFAXneuQtOAlEKbBfgNSlTBd4ne/738JuzxdRbkNISf/jZ4btano+hu3+Q+rF6nvn2ogxcm7vXjMVW57pF7Phodj6QxKV7xoPYEPfXXqqt10r9DnGDK0SN3YHtiGRYZfg+Hx8zDSG5PUqsYuP1vqW28BiWs4zDX91pQDbxbbU2pcksOT1LLMxJNufzM9+b2b/XQdbBFrGHm5Fj3eWnMMA4QkkRbkKxENTBdxHEA4pCmxE3RUJCUp1bJcVp9WICz/j8TUxj9FqFOctw4uCK55nvBIXv/zZ7/634r18z9nKlvNMw98w3P/Isq+mgbj6SlgkKiMfHQ08E/vw8YbHRpqM+V0ZeGuhhN/1ccw/nc/zmobA7UUdXKu3GdXHjNcTOpaX1AIn2o8RZZNhapr7n89m9kLTNElpSRERpCnsB0iFFUgHvj79EJ55IHIgHYSFoaAiMnIamM3BoJzkRNureNYQl0GnhdlCYEKJi8p4ZsZ1tyFZnVKpHfDr+HwkbmrH+5XI3+lrx/I6tH+Q7n8dC8e+OucVXzu+tz+bzPaFsObm5naWDPeoV/F2OWALiP8KDzWVjRk0xkzAg7yqWYEdYfhlYhiGWBWQIITkA+0jwcE/xgyd6lOZGj50WxmrkHggdVsYN1xWP4T0A7swtBcxE9lvXSa/d2pP8vxW9j/j2DtgrrC75vYYTYl1UBzGUWyiPkpxE44jm2k4jz8QnIUz1EkRE7VqhBounDFDn7osi7qseBgZmcWyH30dtx2Xyv1P8/OP+fdr/SCuti8WH5bNCJdBVIZnHHUsZ6cqH9aAeGMjvLm1djTrKEAs+AF24DskPo+XO8JLbjJue70uq34euTSJ8QJ9XOMbVUbDhy6bscrebX0NZa3pcMD675rBXjubGzc834ZQpe5dCNMobvygCEtZrtskIApLtErAMI9DQ3wlcUG/ReKKSQ7Kd2UkSvqCDgz+q8BfJ2FrBT9PNUKX+5/65z/wq284eybP7TfNpTU98xvMtCWExVm/kTD3NiP0dq02JsNIEBIThkmI2S/aI2lbpLifzYyDbLQwpKGhyp80Y6jXpSWiDmC1lFdbKM1FserShETVWn5LBlym03iIY7alJlHWj2vtG4T+Z3L2fphVjYKD6LqQVEQuopCFlcxquY06Bl8p6YpKHFqG8jzIDTEkLRIbknHTlNjFm1eNzDPwfbUg938wn3/I1VerS3fOTU1Nbeqs4qYS1rVr0YidXzoKn+V34Znks4sZNM4qxbNy+pgxzzfT0fKrzlc+DlRfLqsxsakT6CDAdUxrl18l1z86l1/Pqg6S+ZvPttYHfXoEvbfJmHn1MWN+H4r+4wcihyU3YKscNoW3HDjZgy6LRAROIimFFpzxgZNCK4QgZlgeCAoxOo//NekrHh5SEuM11SB61YuMW0m8NdXL/efTw5Dy5x+LMAI/vHzXrrHX8Zhsih3XphAWJJXMrVuL9wWOO4W3lkOHGO+6tFF7BJNPZPKJTVJYQkJB4/krHRv8oIYIRMGpc8aqwmT5tVbUo2R9nfLXL6wddLpeS1ND1n88jFbGsQ5gvJd1oGn3TRiHQrHO4SEoSElQJCdKVbBdsEK1lY0ibTVMxENtIzsZH9bwwQx8sseuYpJ4yv1XIMU/5TzEA6qfKXxN6/OPLT/8nGOfn5jIzeBZIcv2LPSUsOji5R2PPHIoMpzDKBiCRqzgZsyQVHrjB6NpMS5+guNdjRm3CZ3KazkPsoSjuMgnaSLoY8ZtisdSvy7zo0e6znbl6XOMGYap/xjwOZYZHLAxRjQMj1trQVhSOipwVGi7arCoZgo5cIQuxjaroQeego6LOivot0LfvFUJ/AvqOSBAcv+H6vm3IrtiZqPXduXz10Bcbd853vZuQk8ICxKVdbtUOhBWgvswa52JX082o1mJnmxYi1IdGbSQE+dNXk/i0WnMoY8ZM+irGTM0/2S3qY/OwNXMerv8KG/V+tqUV29BrTy0S5cRpzR+dn+9LosxQ3/7jx2Ms1nbvQsEBKN7SFZY1AwqghmDmvnjuJDbmKlZQMtyQVT0I6MICzYN5kLRr77uRE5IHFRv8KHvIL+36d+q92P5arn/NfwQLSPa5nnbmuffshYzZv7c2Jh5M27X+j9rD/76C5idXdibGbGP4iHNJ3U2eFvVcI0xa0BlTUO4ZTDjByzCrBz9iDBm/ma6adUJJYeAejjImNcnQycdU2t5cVvYpris5hZ1LG8b9B+SVT7rWvthNGnC2JMbGsNtDIeFISQvBBBZ6PnYIxTLc5SunZqYyKt64Xe4pPYQmwAAB89JREFUu83yXeaQXu7/MD//mBeeM/2RV3ftMtftBXVZGIrfyDV/3oDjvExh8gHfC3fG0r9iJUU0mqBqw208h3GxMBfAsbK7Uvnq4/FaBkUHeGh1oxJDdmbH3Dce8ZqOisckDcYM+pgxv6M+5F228+LLARsKnItr0Pl0zGtUFnWg6FS1BcXH7a2lN0Y4UT+nj3XMbqEJQ91/EFap6nk3oLzaC8tR6itAWpCiMLxzLZo4BJadxQ8QFOxQskNL7wRhxXsNUjlmS2KAVIwLeVd8uf9D/PxHE3a28q5bCwvXdo6OvoZhYtdblbWVRBpfyOTxyZOR+8CDlSOmF92j3bAk82zWdxKTfsZZhz5mzABBCDZacGiNmN/1MWN+r0vHNYKL3xBmVGdbPjrV13LBJid0ak8/+5+xrHE8gDuVsSiHh5w5hEQNQ1MawkM/H0u9+Lm4CK+j65r6TnP/N/nWq+KHqf94I4OckzufyxlX8NwoQ+G1YLhmwsIvolkqle42Tffeio+Vf22CDeaASxBIOjEDaKtuxio7/UDRip1xu6DPMWZI5OcYQ0/sqvMJxtJ1M1ahU3kd2pu0TG8pP66l/rnd+5/PuDugwxonSbmua1YqFRiYgrfwnUPDatW7BgXXgtx/ef71S4NlH0Uz757Dr90tnbZavCbCAllNzpdKD8Cqc5TDpwa7ogSB4EZQf1QbkiV1WiCcVe2w8MKjbCxdQawanfhJAVkpGy7GPK/bsjykU4MKnKkRZq0slqnyJ+pvEdGYqSmQ+HSZrTq0VgKV/mOX7D3YHh5+seiD3bBzcJZF2ywsvrkVVMPb+h4SZn28fD/l/m/X598x7VuFgnsO0laRz8ZKYVXCAlHlFhcX78dLG7t7IZHw5V8mlPi4Rgj1dzvmC9RJ4iFZ1AioflyTuJr5ANkS5cfERPKK25kgsI75Y/0Sr20v0XUqP4lasn0aC+l/fH9ibjftjLUX6qqcbVMQx5AwshaqYYQZIv0syP1Xj5Y8/3jngURtQIT3GTtaB1ez2exFEJdObXoL4wetKckwnnnmGetnf/Zn70Fph3CKgoR64VGCMgFgzEtQV9O0aHLalHkaQ9IuCec0GbUtP6l0wvVqXSFjlptsTzL/Mhp1Bm1sTkv7cVKTm8Zl1fZJ/1e8/1xfuBfbznMXowqU8tcJvNz/ZrtEQLLq85V8nrfL8w/9lhcEzmswg7jB56Yx6BeznnYb6/6yozuOhoFf0ORXf92TCWAMvvXLDFk71hckzie+1uvUB7oofXm97FpCi4C1enUgbDQNlTJWoUMDkqd5mU5T1ycT9EnGDB3OJ7PHFy1/Ji9Plqf7wpghmT9Zfp/7b7tQwntRdAsgKqVqsn1xL5Y/k/1JdnDA+r/88NTul/R/+ZldvuvLR8n7H1jhnUImw2FifZKmTlgnI8z+VSpHXNver4tI/iK2mgnonLU4WWPyDrWej/Vd2m5KWR1AyqnpwOpsUbvhyQc4eV6bMDBm6Lq9tW7oSPrfLBF0jafc/+Y3VJ7/ZRJXL2jtXV/9/Q/xIs/kcjk1m6jebOip9lkl/14TW57USEANueLS45JrLzEIjnZMtSEhdDp4iOvuXvQx41r+5SKQkBRpDadmE6ViZEXDwTVYkqbLVzZWTFPtwfOvjhmzfBBTPESkbgkhWb8639g+dE6TEPPj6+qEqcCIM6r8ql7pP7BYxr8R39qx3H95/mvvSy/ef5juKdXUHujUXzMrUfSQ5RtwecuyQT41PRG/62PG/I4ceFB5rG+IPtbn41xr/0yWt/qYvvv2NP/EK8Kr6d3YxmR50n+5//qZaPd8yPOffF+3/v2nL6lHNMHQHwTndbRfCH3c1uhKX9TDuNv6sRTEcNE4xgz6mPF6Qrf1r6eO1a7ptn7p//I9J65y/+N3Ybs8/6u9S3JOEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQaABgf8PtPt2mjRdNicAAAAASUVORK5CYII="

/***/ }),

/***/ 9:
/*!****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/network/request.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 10);var _default =






function _default(Option) {

  if (Option.mode === 'loading') {
    uni.showLoading({
      title: Option.message || '加载中...',
      mask: true });

  } else if (Option.mode === 'spin') {
    uni.showNavigationBarLoading();
  }
  return new Promise(function (resolve, reject) {
    uni.request({
      url: _config.BASE_URL + Option.url,
      method: Option.method || _config.METHOD,
      header: Option.header || _config.HEADER,
      data: Option.data || {},
      success: function success(res) {
        if (res.data.flag === 'success') {
          resolve(res.data.data);
        } else {
          reject(res.data.message);
        }
      },
      fail: function fail(err) {
        reject(err);
      },
      complete: function complete() {
        if (Option.mode === 'loading') {
          uni.hideLoading();
        } else if (Option.mode && Option.mode !== 'none') {
          uni.hideNavigationBarLoading();
        }
      } });

  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 92:
/*!*******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/SnapUp/static/image/bg-1.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map