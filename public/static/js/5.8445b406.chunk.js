(this.webpackJsonpstardui=this.webpackJsonpstardui||[]).push([[5],{100:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(77),a=n(8),i=n.n(a),s=n(17),o=n(25),l=n(4),u=n(1);var d=function(e){var t=e.item,n=e.name,r=e.img;return Object(u.jsxs)(l.l,{style:{borderRadius:"12px"},itemId:t,className:"".concat(0===t&&"active"),children:[Object(u.jsx)(l.j,{style:{borderRadius:"12px"},src:r,alt:n}),Object(u.jsx)(l.i,{children:Object(u.jsx)("h5",{children:"Test"})})]})},j=n(78);n(85);var b=function(){var e=Object(r.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],a=function(){var e=Object(s.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(j.a)();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){a()}),[]),Object(u.jsx)(u.Fragment,{children:n.length>0?Object(u.jsx)("div",{className:"container-fluid p-4 text-center mb-4 carousel-width-latest",children:Object(u.jsx)(l.h,{showIndicators:!0,showControls:!0,fade:!0,children:Object(u.jsx)(l.k,{children:null===n||void 0===n?void 0:n.map((function(e,t){var n=e._id,r=e.name,c=e.img;return Object(u.jsx)(d,{item:t,name:r,img:c},n)}))})})}):"Loading..."})},f=n.p+"static/media/recommended.c4e0cdc2.svg",m=n.p+"static/media/blob.19e15694.svg";n(86);var p=function(){return Object(u.jsx)("section",{className:"latest-container container my-5",children:Object(u.jsxs)("div",{className:"row",children:[Object(u.jsx)("div",{className:"latest-left col-lg-6",children:Object(u.jsxs)("section",{className:"blod-container",children:[Object(u.jsx)("div",{children:Object(u.jsx)("img",{src:m,alt:"blod",className:"blod"})}),Object(u.jsxs)("div",{className:"blod-info",children:[Object(u.jsx)("img",{className:"img-fluid w-100",src:f,alt:""}),Object(u.jsx)("span",{children:"Recomendaciones para ti"})]})]})}),Object(u.jsx)("div",{className:"latest-right col-lg-6",children:Object(u.jsx)(b,{})})]})})};t.default=function(){return Object(r.useEffect)((function(){document.title="Stardui - Home"}),[]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(c.e,{}),Object(u.jsx)(c.d,{}),Object(u.jsx)(c.b,{}),Object(u.jsx)(p,{}),Object(u.jsx)(c.a,{}),Object(u.jsx)(c.c,{})]})}},72:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function c(e,t){var n=t.distance,r=t.left,c=t.right,a=t.up,i=t.down,s=t.top,l=t.bottom,u=t.big,d=t.mirror,b=t.opposite,f=(n?n.toString():0)+((r?1:0)|(c?2:0)|(s||i?4:0)|(l||a?8:0)|(d?16:0)|(b?32:0)|(e?64:0)|(u?128:0));if(j.hasOwnProperty(f))return j[f];var m=r||c||a||i||s||l,p=void 0,h=void 0;if(m){if(!d!=!(e&&b)){var v=[c,r,l,s,i,a];r=v[0],c=v[1],s=v[2],l=v[3],a=v[4],i=v[5]}var O=n||(u?"2000px":"100%");p=r?"-"+O:c?O:"0",h=i||s?"-"+O:a||l?O:"0"}return j[f]=(0,o.animation)((e?"to":"from")+" {opacity: 0;"+(m?" transform: translate3d("+p+", "+h+", 0);":"")+"}\n     "+(e?"from":"to")+" {opacity: 1;transform: none;} "),j[f]}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.defaults,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.children,a=(e.out,e.forever),i=e.timeout,s=e.duration,l=void 0===s?o.defaults.duration:s,d=e.delay,j=void 0===d?o.defaults.delay:d,b=e.count,f=void 0===b?o.defaults.count:b,m=r(e,["children","out","forever","timeout","duration","delay","count"]),p={make:c,duration:void 0===i?l:i,delay:j,forever:a,count:f,style:{animationFillMode:"both"},reverse:m.left};return t?(0,u.default)(m,p,p,n):p}Object.defineProperty(t,"__esModule",{value:!0});var i,s=n(20),o=n(35),l=n(47),u=(i=l)&&i.__esModule?i:{default:i},d={out:s.bool,left:s.bool,right:s.bool,top:s.bool,bottom:s.bool,big:s.bool,mirror:s.bool,opposite:s.bool,duration:s.number,timeout:s.number,distance:s.string,delay:s.number,count:s.number,forever:s.bool},j={};a.propTypes=d,t.default=a,e.exports=t.default},73:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){},76:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return a}));var r=n(7),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{type:r.a.ERROR_TO_FETCH,payload:e}},a=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return{type:r.a.IS_LOADING,payload:e}}},77:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return m.a})),n.d(t,"d",(function(){return k})),n.d(t,"e",(function(){return E.a}));n(0);var r=n(4),c=n(1);var a=function(e){var t=e.item,n=e.image,a=e.title,i=e.desc;return Object(c.jsxs)(r.l,{itemId:t,children:[Object(c.jsx)(r.j,{style:{borderRadius:"12px"},src:n,alt:i}),Object(c.jsxs)(r.i,{children:[Object(c.jsx)("h5",{children:a}),Object(c.jsx)("p",{children:i})]})]})},i=n.p+"static/media/coffe-cup.811c6884.jpg",s=n.p+"static/media/coffe-shop.1a194405.jpg",o=[{item:0,title:"Mejor",desc:"El mejor caf\xe9 de El Salvador",img:i},{item:1,title:"Disfrutar",desc:"Disfruta del mejor caf\xe9 con nosotros",img:n.p+"static/media/person-drink-coffe.6ab05fef.jpg"},{item:2,title:"Excelente",desc:"Excelente servicio y con un lugar moderno",img:s}];n(73);var l=function(){return Object(c.jsxs)("div",{className:"container-fluid p-4 text-center mb-4 carousel-width",children:[Object(c.jsx)("h2",{className:"mb-4",children:"Services"}),Object(c.jsx)(r.h,{showControls:!0,showIndicators:!0,children:Object(c.jsx)(r.k,{children:o.map((function(e){return Object(c.jsx)(a,{item:e.item,title:e.title,image:e.img,desc:e.desc},e.item)}))})})]})};n(74);var u=function(e){var t=e.children;return Object(c.jsx)("section",{className:"container my-5",children:Object(c.jsx)("article",{className:"row",children:t})})},d=n.p+"static/media/descImage.d571ba5c.svg";var j=function(){return Object(c.jsx)("div",{className:"col-lg-6",children:Object(c.jsx)("img",{src:d,className:"img-fluid w-75 center-desc-img",alt:"Stardiu description image",loading:"lazy"})})};var b=function(){return Object(c.jsxs)("div",{className:"col-lg-6",children:[Object(c.jsx)("h2",{className:"my-4",children:"BIENVENIDO"}),Object(c.jsx)("p",{children:"Tenemos el mejor caf\xe9 y servicio un lugar moderno, disfruta de una buena taza de caf\xe9 con nosotros y recuerda que no hay nada mejor que un caf\xe9 con estilo"})]})};var f=function(){return Object(c.jsx)("div",{children:Object(c.jsxs)(u,{children:[Object(c.jsx)(j,{}),Object(c.jsx)(b,{})]})})},m=n(34),p=n.p+"static/media/hero.1382a501.svg",h=n(72),v=n.n(h),O=n.p+"static/media/coffee-cup.9433a695.svg";var x=function(){return Object(c.jsx)("div",{className:"col-lg-6 hero-title-image",children:Object(c.jsx)(v.a,{children:Object(c.jsx)("img",{src:O,alt:"coffe cup",loading:"lazy",className:"img-fluid hero-image-size"})})})},g=n(5),y=n(9);var N=function(){var e=Object(g.g)();return Object(c.jsxs)("div",{className:"col-lg-6 hero-back hero-title-center",style:{letterSpacing:"3px",paddingTop:"4.8rem",paddingLeft:"2rem"},children:[Object(c.jsxs)("div",{children:[Object(c.jsxs)(v.a,{children:[Object(c.jsx)("span",{className:"d-block fw-bold font-title",children:"EL"}),Object(c.jsx)("span",{className:"d-block fw-bold font-title",id:"test",children:"CAF\xc9 CON"})]}),Object(c.jsx)(v.a,{right:!0,cascade:!0,children:Object(c.jsx)("span",{className:"d-block fw-bold font-title green-text",children:"ESTILO"})})]}),Object(c.jsx)("div",{className:"discover-btn-center",children:Object(c.jsx)(v.a,{delay:1e3,children:Object(c.jsx)(r.b,{rounded:!0,outline:!0,color:"dark",className:"mt-3",onClick:function(){return e.push(y.a.MENU_BASE)},children:"Descubrir"})})})]})};n(75);var w=function(e){var t=e.children;return Object(c.jsx)("article",{className:"mask hero-image-position",children:Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("div",{className:"row",children:t})})})};var k=function(){return Object(c.jsx)("section",{className:"p-5 text-center bg-image",style:{backgroundImage:'url("'.concat(p,'")'),height:640},children:Object(c.jsxs)(w,{children:[Object(c.jsx)(x,{}),Object(c.jsx)(N,{})]})})},E=n(33)},78:function(e,t,n){"use strict";n.d(t,"c",(function(){return d})),n.d(t,"e",(function(){return j})),n.d(t,"d",(function(){return b})),n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return h}));var r=n(8),c=n.n(r),a=n(17),i=n(18),s=n(26),o=n(7),l=n(76),u=Object(s.a)(),d=function(){return function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.get("".concat(i.a.getProducts,"/?page=1&limit=").concat(8));case 3:n=e.sent,r=Math.ceil(n.total/8),t(Object(l.b)(!1)),n.err?t(Object(l.a)(n)):t(m(n.products,n.total,8,r)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return function(){var t=Object(a.a)(c.a.mark((function t(n){var r,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.get("".concat(i.a.getProducts,"/?page=").concat(e,"&limit=").concat(8));case 3:r=t.sent,a=Math.ceil(r.total/8),n(Object(l.b)(!1)),r.err?n(Object(l.a)(r)):n(m(r.products,r.total,8,a)),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.error(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},b=function(e){return function(){var t=Object(a.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.get("".concat(i.a.getProducts,"/").concat(e));case 3:r=t.sent,n(Object(l.b)(!1)),r.err?n(Object(l.a)(r)):(delete r.user,n(p(r))),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},f=function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.get("".concat(i.a.getProducts,"/latest"));case 3:return t=e.sent,e.abrupt("return",t);case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return{type:o.a.PRODUCT_GET,payload:{data:e,total:t,limit:n,pagesNumber:r}}},p=function(e){return{type:o.a.PRODUCT_GET_DETAILS,payload:e}},h=function(e){return{type:o.a.CURRENT_PAGE,payload:e}}},85:function(e,t,n){},86:function(e,t,n){}}]);
//# sourceMappingURL=5.8445b406.chunk.js.map