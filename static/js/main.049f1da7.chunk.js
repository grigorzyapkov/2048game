(this.webpackJsonp2048game=this.webpackJsonp2048game||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),c=n(8),o=n.n(c),a=(n(13),n(14),n(3)),u=(n(15),n(0)),s=function(e){return Object(u.jsx)("div",{className:"container",children:e.children})},l=(n(17),function(e){return Object(r.useEffect)((function(){}),[e.showAddition]),Object(u.jsxs)("div",{className:"scoreBox",children:[Object(u.jsx)("span",{className:"title",children:e.title}),Object(u.jsx)("span",{className:"score",children:e.score})]})}),f=function(){var e=Object(r.useContext)(R),t=e.score,n=e.addScore;return Object(r.useEffect)((function(){if(0!==n){var e=document.createElement("div");e.id="additionScore",e.classList.add("addScore"),e.innerText="+".concat(n);var t=document.getElementById("currentScoreBox");2===t.childElementCount?t.replaceChild(e,t.lastChild):t.appendChild(e)}}),[t,n]),Object(u.jsxs)("div",{className:"scoresContainer",children:[Object(u.jsx)("div",{id:"currentScoreBox",style:{position:"relative"},children:Object(u.jsx)(l,{title:"SCORE",score:t})}),Object(u.jsx)(l,{title:"BEST",score:t})]})},j=n(6),d=n(7),v=[0,1,2,3],b=function(e){if(e.length<16)return!1;for(var t=function(e,t,n){return e.some((function(e){return t.some((function(t){return n(e)===n(t)&&e.value===t.value}))}))},n=0;n<3;n++)if(t(y(e,n),y(e,n+1),(function(e){return e.positionY}))||t(C(e,n),C(e,n+1),(function(e){return e.positionX})))return!1;return!0},O=function(e){var t=N(e),n=0,r={};return e.forEach((function(e){var i="".concat(e.positionX).concat(e.positionY);if(r[i]){var c=2*parseInt(e.value);r[i]=Object(d.a)(Object(d.a)({},e),{},{id:t++,value:c.toString()}),n+=c}else r[i]=e})),[Object.values(r),n]},h=function(e,t){return m(e,(function(e){return e.positionY}),(function(e,t){return e.positionY=t}),t)},x=function(e,t){return m(e,(function(e){return e.positionX}),(function(e,t){return e.positionX=t}),t)},m=function(e,t,n,r){if(0===e.length)return[];var i=JSON.parse(JSON.stringify(e));i.sort((function(e,n){return t(e)-t(n)}));for(var c="left"===r?0:4-i.length,o=0;o<i.length;o++)n(i[o],c+o);"left"===r&&i.reverse();for(var a=i.length-1;a>=1;)if(i[a].value!==i[a-1].value||"2048"===i[a].value)a--;else{for(var u=0;u<=a-1;u++){var s="right"===r?1:-1;n(i[u],t(i[u])+s)}a-=2}return i},p=function(e,t,n){return e.some((function(e){return e.positionX===t&&e.positionY===n}))},g=function(e){var t=Date.now(),n=JSON.parse(JSON.stringify(e)),r=function(e){return[Math.floor(e/4),e%4]};Math.floor(16*Math.random());for(var i=Math.floor(16*Math.random()),c=r(i);p.apply(void 0,[e].concat(Object(j.a)(c)));)c=r(i=15===i?0:i+1);var o=Math.random()<=.2?"4":"2",a=[].concat(Object(j.a)(n),[{id:N(e),value:o,positionX:c[0],positionY:c[1]}]);return console.log("addRandomNumber - "+(Date.now()-t)),a},y=function(e,t){return e.filter((function(e){return e.positionX===t}))},C=function(e,t){return e.filter((function(e){return e.positionY===t}))},N=function(e){return S(e)+1},S=function(e){return Math.max.apply(Math,e.map((function(e){return e.id})))},w=function(e,t){var n,r;return null===e&&null===t||(e&&(null===(n=Object.keys(e))||void 0===n?void 0:n.length))===(t&&(null===(r=Object.keys(t))||void 0===r?void 0:r.length))&&Object.keys(e).every((function(n){return e[n]===t[n]}))},k=(n(18),function(e){return Object(u.jsx)("button",{className:"appButton",onClick:e.onClick,children:e.children})}),E=(n(19),function(e){var t=121*e.x,n=121*e.y;return Object(u.jsx)("div",{className:"tile tile-".concat(e.value),style:{transform:"translate(".concat(t,"px, ").concat(n,"px)")},children:Object(u.jsx)("div",{className:"tileInner",children:e.value})})}),X=(n(20),function(e){return Object(u.jsx)("div",{className:"boardContainer",children:e.children})}),Y=function(){var e=Object(r.useContext)(R).handleRestart;return Object(u.jsxs)("div",{id:"gameOverContainer",className:"gameOverContainer",children:[Object(u.jsx)("p",{children:"Game Over!"}),Object(u.jsx)(k,{onClick:e,children:"Try again"})]})},A=function(){var e=Array.from(Array(4).keys()).map((function(e){var t=Array.from(Array(4).keys()).map((function(e){return Object(u.jsx)("div",{className:"cell"},e)}));return Object(u.jsx)("div",{className:"row",children:t},e)}));return Object(u.jsx)("div",{className:"gridContainer",children:e})},B=function(e){return Object(u.jsx)(u.Fragment,{children:e.values.map((function(e){return Object(u.jsx)(E,{value:e.value,x:e.positionY,y:e.positionX},e.id)}))})},M=function(){var e=Object(r.useContext)(R).boardState.sort((function(e,t){return e.id-t.id}));return Object(u.jsx)("div",{className:"tileContainer",children:Object(u.jsx)(B,{values:e})})},T=function(){var e=Object(r.useContext)(R).boardState;return Object(u.jsxs)(X,{children:[b(O(e)[0])&&Object(u.jsx)(Y,{}),Object(u.jsx)(A,{}),Object(u.jsx)(M,{})]})},J=(n(21),function(){return Object(u.jsx)("span",{className:"gameTitle",children:"2048"})}),F=function(){return Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Join the tiles, get to 2048!"}),Object(u.jsx)("br",{}),Object(u.jsx)("a",{href:"#id",children:"How to play \u2192"})]})},L=function(){var e=Object(r.useContext)(R).handleRestart;return Object(u.jsxs)("div",{className:"header",children:[Object(u.jsxs)("div",{className:"flex",children:[Object(u.jsx)(J,{}),Object(u.jsx)(f,{})]}),Object(u.jsxs)("div",{className:"flexWithSpaceBetween",children:[Object(u.jsx)(F,{}),Object(u.jsx)(k,{onClick:function(t){return e()},children:"New Game"})]})]})},R=i.a.createContext(null),D={ArrowUp:function(e){return v.map((function(t){return x(C(e,t),"left")})).flat()},ArrowDown:function(e){return v.map((function(t){return x(C(e,t),"right")})).flat()},ArrowRight:function(e){return v.map((function(t){return h(y(e,t),"right")})).flat()},ArrowLeft:function(e){return v.map((function(t){return h(y(e,t),"left")})).flat()}},I=function(){var e=Object(r.useState)([].concat(G)),t=Object(a.a)(e,2),n=t[0],i=t[1],c=Object(r.useState)(0),o=Object(a.a)(c,2),l=o[0],f=o[1],j=Object(r.useState)(0),d=Object(a.a)(j,2),v=d[0],b=d[1];Object(r.useEffect)((function(){var e=function(e){e.preventDefault();var t=D[e.key];if(t){var r,c=t(n);if(r=c,n.every((function(e){return r.some((function(t){return w(e,t)}))})))console.log("equal");else i(c),requestAnimationFrame((function(){var e=O(c),t=Object(a.a)(e,2),n=t[0],r=t[1];i(n),f(l+r),b(r),setTimeout((function(){var e=g(n);i(e)}),50)}))}};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[n,l]);return Object(u.jsx)(R.Provider,{value:{boardState:n,score:l,addScore:v,handleRestart:function(){i([]),setTimeout((function(){i([].concat(G))}),100),f(0)}},children:Object(u.jsxs)(s,{children:[Object(u.jsx)(L,{}),Object(u.jsx)(k,{onClick:function(){i(g(n))},children:"Generate Tile"}),Object(u.jsx)(T,{})]})})},G=[{id:1,value:"2",positionX:1,positionY:0},{id:2,value:"2",positionX:1,positionY:1},{id:3,value:"2",positionX:1,positionY:2},{id:4,value:"2",positionX:2,positionY:1}];var P=function(){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("header",{}),Object(u.jsx)("main",{children:Object(u.jsx)(I,{})})]})},q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,23)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),i(e),c(e),o(e)}))};o.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(P,{})}),document.getElementById("root")),q()}],[[22,1,2]]]);
//# sourceMappingURL=main.049f1da7.chunk.js.map