(this.webpackJsonp2048game=this.webpackJsonp2048game||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),i=n(8),o=n.n(i),u=(n(13),n(14),n(3)),a=n(2),s=(n(15),n(0)),l=function(e){return Object(s.jsx)("div",{className:"container",children:e.children})},f=420,d=520,j=73,v=97,b=121,O=n(7),h=[0,1,2,3],x=function(e){if(e.length<16)return!1;for(var t=function(e,t,n){return e.some((function(e){return t.some((function(t){return n(e)===n(t)&&e.value===t.value}))}))},n=0;n<3;n++)if(t(S(e,n),S(e,n+1),(function(e){return e.positionY}))||t(E(e,n),E(e,n+1),(function(e){return e.positionX})))return!1;return!0},m=function(e){var t=k(e),n=0,r={};return e.forEach((function(e){var c="".concat(e.positionX).concat(e.positionY);if(r[c]){var i=2*parseInt(e.value);r[c]=Object(O.a)(Object(O.a)({},e),{},{id:t++,value:i.toString()}),n+=i}else r[c]=e})),[Object.values(r),n]},p=function(e,t){return y(e,(function(e){return e.positionY}),(function(e,t){return e.positionY=t}),t)},g=function(e,t){return y(e,(function(e){return e.positionX}),(function(e,t){return e.positionX=t}),t)},y=function(e,t,n,r){if(0===e.length)return[];var c=JSON.parse(JSON.stringify(e));c.sort((function(e,n){return t(e)-t(n)}));for(var i="left"===r?0:4-c.length,o=0;o<c.length;o++)n(c[o],i+o);"left"===r&&c.reverse();for(var u=c.length-1;u>=1;)if(c[u].value!==c[u-1].value||"2048"===c[u].value)u--;else{for(var a=0;a<=u-1;a++){var s="right"===r?1:-1;n(c[a],t(c[a])+s)}u-=2}return c},C=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,t=[];e>0;)t=[].concat(Object(u.a)(t),[N(t)]),e--;return t},N=function(e){var t=function(e){return[Math.floor(e/4),e%4]};Math.floor(16*Math.random());for(var n=Math.floor(16*Math.random()),r=t(n);w.apply(void 0,[e].concat(Object(u.a)(r)));)r=t(n=15===n?0:n+1);var c=Math.random()<=.2?"4":"2";return{id:k(e),value:c,positionX:r[0],positionY:r[1]}},w=function(e,t,n){return e.some((function(e){return e.positionX===t&&e.positionY===n}))},S=function(e,t){return e.filter((function(e){return e.positionX===t}))},E=function(e,t){return e.filter((function(e){return e.positionY===t}))},k=function(e){return A(e)+1},A=function(e){return Math.max.apply(Math,[0].concat(Object(u.a)(e.map((function(e){return e.id})))))},T=function(e,t){var n,r;return null===e&&null===t||(e&&(null===(n=Object.keys(e))||void 0===n?void 0:n.length))===(t&&(null===(r=Object.keys(t))||void 0===r?void 0:r.length))&&Object.keys(e).every((function(n){return e[n]===t[n]}))},B=(n(17),function(e){return Object(s.jsx)("button",{id:e.id,className:"appButton",onClick:e.onClick,children:e.children})}),M=(n(18),function(e){return Object(s.jsx)("div",{className:"tile tile-".concat(e.value),style:{transform:"translate(".concat(e.x,"px, ").concat(e.y,"px)")},children:Object(s.jsx)("div",{className:"tileInner",children:e.value})})}),L=(n(19),function(e){return Object(s.jsx)("div",{className:"boardContainer",children:e.children})}),X=function(){var e=Object(r.useContext)(q).handleRestart;return Object(s.jsxs)("div",{id:"gameOverContainer",className:"gameOverContainer",children:[Object(s.jsx)("p",{children:"Game Over!"}),Object(s.jsx)(B,{onClick:e,children:"Try again"})]})},Y=function(){var e=Array.from(Array(4).keys()).map((function(e){var t=Array.from(Array(4).keys()).map((function(e){return Object(s.jsx)("div",{className:"cell"},e)}));return Object(s.jsx)("div",{className:"row",children:t},e)}));return Object(s.jsx)("div",{className:"gridContainer",children:e})},I=function(){return window.innerWidth<=f?j:window.innerWidth<=d?v:b},J=function(e){var t=Object(r.useState)(I()),n=Object(a.a)(t,2),c=n[0],i=n[1];return Object(r.useEffect)((function(){var e=function(){i(I())};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),Object(s.jsx)("div",{children:e.values.map((function(e){return Object(s.jsx)(M,{value:e.value,x:e.positionY*c,y:e.positionX*c},e.id)}))})},R=function(){var e=Object(r.useContext)(q).tiles.sort((function(e,t){return e.id-t.id}));return Object(s.jsx)("div",{className:"tileContainer",children:Object(s.jsx)(J,{values:e})})},F=function(){var e=Object(r.useContext)(q).tiles;return Object(s.jsxs)(L,{children:[x(m(e)[0])&&Object(s.jsx)(X,{}),Object(s.jsx)(Y,{}),Object(s.jsx)(R,{})]})},D=(n(20),n(21),function(e){return Object(r.useEffect)((function(){}),[e.showAddition]),Object(s.jsxs)("div",{className:"scoreBox",children:[Object(s.jsx)("span",{className:"title",children:e.title}),Object(s.jsx)("span",{className:"score",children:e.score})]})}),G=function(){var e=Object(r.useContext)(q),t=e.score,n=e.addScore;return Object(r.useEffect)((function(){if(0!==n){var e=document.createElement("div");e.id="additionScore",e.classList.add("addScore"),e.innerText="+".concat(n);var t=document.getElementById("currentScoreBox");2===t.childElementCount?t.replaceChild(e,t.lastChild):t.appendChild(e)}}),[t,n]),Object(s.jsxs)("div",{className:"scoresContainer",children:[Object(s.jsx)("div",{id:"currentScoreBox",style:{position:"relative"},children:Object(s.jsx)(D,{title:"SCORE",score:t})}),Object(s.jsx)(D,{title:"BEST",score:t})]})},P=(n(22),function(){return Object(s.jsx)("span",{className:"gameTitle",children:"2048"})}),z=function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)("span",{children:"Join the tiles, get to 2048!"}),Object(s.jsx)("br",{}),Object(s.jsx)("a",{href:"#id",children:"How to play \u2192"})]})},W=function(){var e=Object(r.useContext)(q).handleRestart;return Object(s.jsxs)("div",{className:"header",children:[Object(s.jsxs)("div",{className:"centeredText",children:[Object(s.jsx)(P,{}),Object(s.jsx)(z,{})]}),Object(s.jsxs)("div",{className:"actions",children:[Object(s.jsx)(G,{}),Object(s.jsx)(B,{id:"restartGameBtn",onClick:function(t){return e()},children:"New Game"})]})]})},q=c.a.createContext(null),H={ArrowUp:function(e){return h.map((function(t){return g(E(e,t),"left")})).flat()},ArrowDown:function(e){return h.map((function(t){return g(E(e,t),"right")})).flat()},ArrowRight:function(e){return h.map((function(t){return p(S(e,t),"right")})).flat()},ArrowLeft:function(e){return h.map((function(t){return p(S(e,t),"left")})).flat()}},U=function(){var e=Object(r.useState)(C()),t=Object(a.a)(e,2),n=t[0],c=t[1],i=Object(r.useState)(0),o=Object(a.a)(i,2),f=o[0],d=o[1],j=Object(r.useState)(0),v=Object(a.a)(j,2),b=v[0],O=v[1];Object(r.useEffect)((function(){var e=function(e){e.preventDefault();var t=H[e.key];if(t){var r,i=t(n);if(r=i,n.every((function(e){return r.some((function(t){return T(e,t)}))})))console.log("equal");else c(i),setTimeout((function(){var e=m(i),t=Object(a.a)(e,2),n=t[0],r=t[1];c(n),d(f+r),O(r),setTimeout((function(){c([].concat(Object(u.a)(n),[N(n)]))}),150)}),100)}};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[n,f]);return Object(s.jsx)(q.Provider,{value:{tiles:n,score:f,addScore:b,handleRestart:function(){c([]),setTimeout((function(){c(C())}),100),d(0)}},children:Object(s.jsxs)(l,{children:[Object(s.jsx)(W,{}),Object(s.jsx)(F,{})]})})};var K=function(){return Object(s.jsx)("div",{className:"App",children:Object(s.jsx)("main",{children:Object(s.jsx)(U,{})})})},Q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),r(e),c(e),i(e),o(e)}))};o.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(K,{})}),document.getElementById("root")),Q()}],[[23,1,2]]]);
//# sourceMappingURL=main.d23bfe35.chunk.js.map