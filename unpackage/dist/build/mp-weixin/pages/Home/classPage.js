(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Home/classPage"],{"1d10":function(t,n,e){"use strict";e.r(n);var o=e("befe"),r=e("74a0");for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);e("cfde");var a,s=e("f0c5"),u=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=u.exports},"74a0":function(t,n,e){"use strict";e.r(n);var o=e("8797"),r=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=r.a},8797:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("a608");function r(t){return u(t)||s(t)||a(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,n){if(t){if("string"===typeof t)return c(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?c(t,n):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function u(t){if(Array.isArray(t))return c(t)}function c(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,o=new Array(n);e<n;e++)o[e]=t[e];return o}var l=function(){Promise.all([e.e("common/vendor"),e.e("component/GoodsCard")]).then(function(){return resolve(e("d3b9"))}.bind(null,e)).catch(e.oe)},d=function(){Promise.all([e.e("common/vendor"),e.e("component/Z-empty")]).then(function(){return resolve(e("1839"))}.bind(null,e)).catch(e.oe)},f={data:function(){return{currentNav:0,priceSort:!0,status:"loadmore",loadText:{loadmore:"轻轻往上拉",loading:"努力加载中",nomore:"实在没有了"},goodsList:[],params:{p:1,m_id:"",sorts:0,cate_id:""},loading:!0,timer:null,flag:!0,scrollTop:-1}},components:{GoodsCard:l,ZEmpty:d},onLoad:function(n){this.params.cate_id=n.id,this.params.m_id=t.getStorageSync("m_id"),this.getProduct()},onShow:function(){this.params.m_id=t.getStorageSync("m_id")},methods:{changeNav:function(t){if(t!==this.currentNav||1===t){switch(1===t&&1===this.currentNav?this.priceSort=!this.priceSort:this.priceSort=!0,this.currentNav=t,this.status="loadmore",this.scrollTop=0==this.scrollTop?-1:0,this.flag=!0,t){case 0:this.params.sorts=0;break;case 1:this.priceSort?this.params.sorts=2:this.params.sorts=3;break;case 2:this.params.sorts=1;break}this.getProduct()}},getProduct:function(){var n=this;this.loading=!0,this.isSearch=!0,this.timer&&clearTimeout(this.timer),this.timer=setTimeout((function(){(0,o.classGoods)(n.params).then((function(e){t.setNavigationBarTitle({title:e.cate_name}),n.goodsList=e.list,n.loading=!1}))}),500)},onreachBottom:function(){var t=this;this.flag&&(this.status="loading",this.params.p+=1,(0,o.classGoods)(this.params).then((function(n){0===n.list.length?(t.flag=!1,t.status="nomore",t.params.p-=1):t.goodsList=[].concat(r(t.goodsList),r(n.list))})))}}};n.default=f}).call(this,e("543d")["default"])},befe:function(t,n,e){"use strict";e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var o={uSticky:function(){return e.e("uview-ui/components/u-sticky/u-sticky").then(e.bind(null,"7a33"))},uIcon:function(){return e.e("uview-ui/components/u-icon/u-icon").then(e.bind(null,"6679"))},uLoadmore:function(){return e.e("uview-ui/components/u-loadmore/u-loadmore").then(e.bind(null,"e8a4"))},uLoading:function(){return e.e("uview-ui/components/u-loading/u-loading").then(e.bind(null,"2c5b"))}},r=function(){var t=this,n=t.$createElement,o=(t._self._c,0===t.goodsList.length?e("4424"):null);t.$mp.data=Object.assign({},{$root:{m0:o}})},i=[]},cfde:function(t,n,e){"use strict";var o=e("dc70"),r=e.n(o);r.a},dc70:function(t,n,e){},e67a:function(t,n,e){"use strict";(function(t){e("8ef2");o(e("66fd"));var n=o(e("1d10"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["e67a","common/runtime","common/vendor"]]]);