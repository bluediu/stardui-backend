(this.webpackJsonpstardui=this.webpackJsonpstardui||[]).push([[6],{72:function(e,t,c){"use strict";function r(e,t){var c={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(c[r]=e[r]);return c}function i(e,t){var c=t.distance,r=t.left,i=t.right,n=t.up,a=t.down,o=t.top,l=t.bottom,d=t.big,u=t.mirror,m=t.opposite,b=(c?c.toString():0)+((r?1:0)|(i?2:0)|(o||a?4:0)|(l||n?8:0)|(u?16:0)|(m?32:0)|(e?64:0)|(d?128:0));if(j.hasOwnProperty(b))return j[b];var f=r||i||n||a||o||l,h=void 0,v=void 0;if(f){if(!u!=!(e&&m)){var p=[i,r,l,o,a,n];r=p[0],i=p[1],o=p[2],l=p[3],n=p[4],a=p[5]}var x=c||(d?"2000px":"100%");h=r?"-"+x:i?x:"0",v=a||o?"-"+x:n||l?x:"0"}return j[b]=(0,s.animation)((e?"to":"from")+" {opacity: 0;"+(f?" transform: translate3d("+h+", "+v+", 0);":"")+"}\n     "+(e?"from":"to")+" {opacity: 1;transform: none;} "),j[b]}function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.defaults,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],c=e.children,n=(e.out,e.forever),a=e.timeout,o=e.duration,l=void 0===o?s.defaults.duration:o,u=e.delay,j=void 0===u?s.defaults.delay:u,m=e.count,b=void 0===m?s.defaults.count:m,f=r(e,["children","out","forever","timeout","duration","delay","count"]),h={make:i,duration:void 0===a?l:a,delay:j,forever:n,count:b,style:{animationFillMode:"both"},reverse:f.left};return t?(0,d.default)(f,h,h,c):h}Object.defineProperty(t,"__esModule",{value:!0});var a,o=c(20),s=c(35),l=c(47),d=(a=l)&&a.__esModule?a:{default:a},u={out:o.bool,left:o.bool,right:o.bool,top:o.bool,bottom:o.bool,big:o.bool,mirror:o.bool,opposite:o.bool,duration:o.number,timeout:o.number,distance:o.string,delay:o.number,count:o.number,forever:o.bool},j={};n.propTypes=u,t.default=n,e.exports=t.default},73:function(e,t,c){},74:function(e,t,c){},75:function(e,t,c){},77:function(e,t,c){"use strict";c.d(t,"a",(function(){return l})),c.d(t,"b",(function(){return b})),c.d(t,"c",(function(){return f.a})),c.d(t,"d",(function(){return k})),c.d(t,"e",(function(){return E.a}));c(0);var r=c(4),i=c(1);var n=function(e){var t=e.item,c=e.image,n=e.title,a=e.desc;return Object(i.jsxs)(r.l,{itemId:t,className:"".concat(0===t&&"active"),children:[Object(i.jsx)(r.j,{style:{borderRadius:"12px"},src:c,alt:a}),Object(i.jsxs)(r.i,{children:[Object(i.jsx)("h5",{children:n}),Object(i.jsx)("p",{children:a})]})]})},a=c.p+"static/media/coffe-cup.811c6884.jpg",o=c.p+"static/media/coffe-shop.1a194405.jpg",s=[{item:0,title:"Mejor",desc:"El mejor caf\xe9 de El Salvador",img:a},{item:1,title:"Disfrutar",desc:"Disfruta del mejor caf\xe9 con nosotros",img:c.p+"static/media/person-drink-coffe.6ab05fef.jpg"},{item:2,title:"Excelente",desc:"Excelente servicio y con un lugar moderno",img:o}];c(73);var l=function(){return Object(i.jsxs)("div",{className:"container-fluid p-4 text-center mb-4 carousel-width",children:[Object(i.jsx)("h2",{className:"mb-4",children:"Services"}),Object(i.jsx)(r.h,{showControls:!0,showIndicators:!0,children:Object(i.jsx)(r.k,{children:s.map((function(e){return Object(i.jsx)(n,{item:e.item,title:e.title,image:e.img,desc:e.desc},e.item)}))})})]})};c(74);var d=function(e){var t=e.children;return Object(i.jsx)("section",{className:"container my-5",children:Object(i.jsx)("article",{className:"row",children:t})})},u=c.p+"static/media/descImage.d571ba5c.svg";var j=function(){return Object(i.jsx)("div",{className:"col-lg-6",children:Object(i.jsx)("img",{src:u,className:"img-fluid w-75 center-desc-img",alt:"Stardiu description image",loading:"lazy"})})};var m=function(){return Object(i.jsxs)("div",{className:"col-lg-6",children:[Object(i.jsx)("h2",{className:"my-4",children:"BIENVENIDO"}),Object(i.jsx)("p",{children:"Tenemos el mejor caf\xe9 y servicio un lugar moderno, disfruta de una buena taza de caf\xe9 con nosotros y recuerda que no hay nada mejor que un caf\xe9 con estilo"})]})};var b=function(){return Object(i.jsx)("div",{children:Object(i.jsxs)(d,{children:[Object(i.jsx)(j,{}),Object(i.jsx)(m,{})]})})},f=c(34),h=c.p+"static/media/hero.1382a501.svg",v=c(72),p=c.n(v),x=c.p+"static/media/coffee-cup.9433a695.svg";var O=function(){return Object(i.jsx)("div",{className:"col-lg-6 hero-title-image",children:Object(i.jsx)(p.a,{children:Object(i.jsx)("img",{src:x,alt:"coffe cup",loading:"lazy",className:"img-fluid hero-image-size"})})})},g=c(5),y=c(9);var N=function(){var e=Object(g.g)();return Object(i.jsxs)("div",{className:"col-lg-6 hero-back hero-title-center",style:{letterSpacing:"3px",paddingTop:"4.8rem",paddingLeft:"2rem"},children:[Object(i.jsxs)("div",{children:[Object(i.jsxs)(p.a,{children:[Object(i.jsx)("span",{className:"d-block fw-bold font-title",children:"EL"}),Object(i.jsx)("span",{className:"d-block fw-bold font-title",id:"test",children:"CAF\xc9 CON"})]}),Object(i.jsx)(p.a,{right:!0,cascade:!0,children:Object(i.jsx)("span",{className:"d-block fw-bold font-title green-text",children:"ESTILO"})})]}),Object(i.jsx)("div",{className:"discover-btn-center",children:Object(i.jsx)(p.a,{delay:1e3,children:Object(i.jsx)(r.b,{rounded:!0,outline:!0,color:"dark",className:"mt-3",onClick:function(){return e.push(y.a.MENU_BASE)},children:"Descubrir"})})})]})};c(75);var w=function(e){var t=e.children;return Object(i.jsx)("article",{className:"mask hero-image-position",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsx)("div",{className:"row",children:t})})})};var k=function(){return Object(i.jsx)("section",{className:"p-5 text-center bg-image",style:{backgroundImage:'url("'.concat(h,'")'),height:640},children:Object(i.jsxs)(w,{children:[Object(i.jsx)(O,{}),Object(i.jsx)(N,{})]})})},E=c(33)},96:function(e,t,c){"use strict";c.r(t);c(0);var r=c(77),i=c(1);t.default=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)(r.e,{}),Object(i.jsx)("h1",{children:"Our company"}),Object(i.jsx)(r.c,{})]})}}}]);
//# sourceMappingURL=6.51c59016.chunk.js.map