(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/promote"],{"14c1":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"725b"))},uLoading:function(){return n.e("uview-ui/components/u-loading/u-loading").then(n.bind(null,"2c5b"))}},a=function(){var e=this,t=e.$createElement;e._self._c},r=[]},"2f3b":function(e,t,n){},"60a4":function(e,t,n){"use strict";n.r(t);var o=n("caa8"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},"75ea":function(e,t,n){"use strict";(function(e){n("8ef2");o(n("66fd"));var t=o(n("d5a3"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"96bf":function(e,t,n){"use strict";var o=n("2f3b"),a=n.n(o);a.a},caa8:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("a34a")),a=n("a608"),r=n("52b8"),c=n("3735");function u(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,o,a,r,c){try{var u=e[r](c),i=u.value}catch(s){return void n(s)}u.done?t(i):Promise.resolve(i).then(o,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var r=e.apply(t,n);function c(e){i(r,o,a,c,u,"next",e)}function u(e){i(r,o,a,c,u,"throw",e)}c(void 0)}))}}var l={data:function(){return{ercode:"",coding:"",content:"",cover:""}},onLoad:function(t){e.showLoading({title:"正在加载..."}),t.parent_code&&e.setStorageSync("parent_code",t.parent_code),this.getInviteCode(t.m_id),this.getRulePage()},onShareAppMessage:function(){return{title:"邀请好友",path:"/pages/Home/index?parent_code="+this.coding,success:function(e){console.log("分享成功"+e)},fail:function(e){console.log(e+"失败")}}},methods:{getInviteCode:function(t){var n=this;return s(o.default.mark((function a(){var c;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,(0,r.inviteCode)(t);case 3:c=o.sent,n.ercode=c.url,n.coding=c.member_sn,e.hideLoading(),o.next=12;break;case 9:o.prev=9,o.t0=o["catch"](0),e.showToast({title:o.t0,icon:"none"});case 12:case"end":return o.stop()}}),a,null,[[0,9]])})))()},copyTetx:function(){var e=this;wx.setClipboardData({data:e.coding,success:function(e){wx.showToast({title:"邀请码复制成功"})}})},saveImage:function(){var t=this;return s(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,c.downloadFile)(t.ercode);case 3:a=n.sent,console.log(a),200===a.statusCode&&e.saveImageToPhotosAlbum({filePath:a.tempFilePath,success:function(){e.showToast({title:"保存成功"})}}),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),e.showToast({title:n.t0,icon:"none"});case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()},getRulePage:function(){var t=this;return s(o.default.mark((function n(){var r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,a.rulePage)(7);case 3:r=n.sent,t.cover=r.cover,t.content=r.content,e.hideLoading(),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](0),e.showToast({title:n.t0,icon:"none"});case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))()}}};t.default=l}).call(this,n("543d")["default"])},d5a3:function(e,t,n){"use strict";n.r(t);var o=n("14c1"),a=n("60a4");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("96bf");var c,u=n("f0c5"),i=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=i.exports}},[["75ea","common/runtime","common/vendor"]]]);