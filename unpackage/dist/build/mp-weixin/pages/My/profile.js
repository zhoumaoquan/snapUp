(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/profile"],{"317d":function(t,n,e){"use strict";e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}));var a={uImage:function(){return e.e("uview-ui/components/u-image/u-image").then(e.bind(null,"725b"))},uSkeleton:function(){return e.e("uview-ui/components/u-skeleton/u-skeleton").then(e.bind(null,"1822"))}},r=function(){var t=this,n=t.$createElement;t._self._c},u=[]},"4e7a":function(t,n,e){"use strict";var a=e("6e12"),r=e.n(a);r.a},5689:function(t,n,e){"use strict";e.r(n);var a=e("6e48"),r=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=r.a},"622c":function(t,n,e){"use strict";(function(t){e("8ef2");a(e("66fd"));var n=a(e("fb94"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"6e12":function(t,n,e){},"6e48":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("a34a")),r=e("52b8"),u=i(e("0bd6"));function i(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e,a,r,u,i){try{var o=t[u](i),c=o.value}catch(s){return void e(s)}o.done?n(c):Promise.resolve(c).then(a,r)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(a,r){var u=t.apply(n,e);function i(t){o(u,a,r,i,c,"next",t)}function c(t){o(u,a,r,i,c,"throw",t)}i(void 0)}))}}var s={data:function(){return{avatar:{id:"",url:""},nickname:"",loading:!0,m_id:""}},onLoad:function(n){t.showLoading({title:"Loading"}),this.getUserInfo(n.m_id)},methods:{getUserInfo:function(n){var e=this;return c(a.default.mark((function u(){var i;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,(0,r.userInfo)(n);case 3:i=a.sent,e.avatar.id=i.avatar,e.avatar.url=i.avatar_path,e.nickname=i.nickname,e.m_id=i.m_id,t.hideLoading(),e.loading=!1,a.next=15;break;case 12:a.prev=12,a.t0=a["catch"](0),t.showToast({title:"获取信息失败",icon:"none"});case 15:case"end":return a.stop()}}),u,null,[[0,12]])})))()},editAvatar:function(){var n=this;return c(a.default.mark((function e(){var r;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,new u.default({url:"System/upload"}).uploadPic();case 3:r=e.sent,n.avatar.url=r[0].data.list[0].abs_url,n.avatar.id=r[0].data.list[0].id,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),t.showToast({title:"修改头像失败",icon:"none"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},saveEdit:function(){var n=this;return c(a.default.mark((function e(){return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,console.log(111),e.next=4,(0,r.editUserInfo)({avatar:n.avatar.id,nickname:n.nickname,m_id:n.m_id});case 4:e.sent,t.showToast({title:"保存成功",mask:!0,success:function(){setTimeout((function(){t.navigateBack({delta:1})}),1500)}}),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),t.showToast({title:"保存失败",icon:"none"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}};n.default=s}).call(this,e("543d")["default"])},fb94:function(t,n,e){"use strict";e.r(n);var a=e("317d"),r=e("5689");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("4e7a");var i,o=e("f0c5"),c=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=c.exports}},[["622c","common/runtime","common/vendor"]]]);