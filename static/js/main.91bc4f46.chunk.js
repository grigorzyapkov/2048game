(this.webpackJsonp2048game=this.webpackJsonp2048game||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),i=n(8),o=n.n(i),u=(n(13),n(14),n(3)),a=n(2),s=(n(15),n(0)),l=function(e){return Object(s.jsx)("div",{className:"container",children:e.children})},f=420,j=520,d=73,v=97,b=121,O=n(4),h=[0,1,2,3],m=function(e,t){var n,r;return null===e&&null===t||(e&&(null===(n=Object.keys(e))||void 0===n?void 0:n.length))===(t&&(null===(r=Object.keys(t))||void 0===r?void 0:r.length))&&Object.keys(e).every((function(n){return e[n]===t[n]}))},p=function(e){if(e.length<16)return!1;for(var t=function(e,t,n){return e.some((function(e){return t.some((function(t){return n(e)===n(t)&&e.value===t.value}))}))},n=0;n<3;n++)if(t(E(e,n),E(e,n+1),(function(e){return e.positionY}))||t(S(e,n),S(e,n+1),(function(e){return e.positionX})))return!1;return!0},x=function(e){var t=A(e),n={};return e.forEach((function(e){var r="".concat(e.positionX).concat(e.positionY);if(n[r]){var c=2*parseInt(e.value);n[r]=Object(O.a)(Object(O.a)({},e),{},{id:t++,value:c.toString(),type:"merged"})}else n[r]=e})),Object.values(n)},y=function(e,t){return w(e,(function(e){return e.positionY}),(function(e,t){return e.positionY=t}),t)},g=function(e,t){return w(e,(function(e){return e.positionX}),(function(e,t){return e.positionX=t}),t)},w=function(e,t,n,r){if(0===e.length)return[];var c=JSON.parse(JSON.stringify(e));c.sort((function(e,n){return t(e)-t(n)}));for(var i="left"===r?0:4-c.length,o=0;o<c.length;o++)n(c[o],i+o);"left"===r&&c.reverse();for(var u=c.length-1;u>=1;)if(c[u].value!==c[u-1].value||"2048"===c[u].value)u--;else{for(var a=0;a<=u-1;a++){var s="right"===r?1:-1;n(c[a],t(c[a])+s)}u-=2}return c},N=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,t=[];e>0;)t=[].concat(Object(u.a)(t),[C(t)]),e--;return t},C=function(e){var t=function(e){return[Math.floor(e/4),e%4]};Math.floor(16*Math.random());for(var n=Math.floor(16*Math.random()),r=t(n);k.apply(void 0,[e].concat(Object(u.a)(r)));)r=t(n=15===n?0:n+1);var c=Math.random()<=.2?"4":"2";return{id:A(e),value:c,type:"new",positionX:r[0],positionY:r[1]}},k=function(e,t,n){return e.some((function(e){return e.positionX===t&&e.positionY===n}))},E=function(e,t){return e.filter((function(e){return e.positionX===t}))},S=function(e,t){return e.filter((function(e){return e.positionY===t}))},A=function(e){return M(e)+1},M=function(e){return Math.max.apply(Math,[0].concat(Object(u.a)(e.map((function(e){return e.id})))))},G=(n(17),function(e){return Object(s.jsx)("button",{id:e.id,className:"appButton",onClick:e.onClick,children:e.children})}),L=(n(18),Object(r.memo)((function(e){return Object(s.jsx)("div",{className:"tile tile-".concat(e.value),style:{transform:"translate(".concat(e.x,"px, ").concat(e.y,"px)")},children:Object(s.jsx)("div",{className:"tileInner ".concat(e.type),children:e.value})})}))),P=(n(19),function(e){return Object(s.jsx)("div",{className:"boardContainer",children:e.children})}),T=function(){var e=Object(r.useContext)(K).restartGame;return Object(s.jsxs)("div",{id:"gameOverContainer",className:"gameOverContainer",children:[Object(s.jsx)("p",{children:"Game Over!"}),Object(s.jsx)(G,{onClick:e,children:"Try again"})]})},X=function(){var e=Array.from(Array(4).keys()).map((function(e){var t=Array.from(Array(4).keys()).map((function(e){return Object(s.jsx)("div",{className:"cell"},e)}));return Object(s.jsx)("div",{className:"row",children:t},e)}));return Object(s.jsx)("div",{className:"gridContainer",children:e})},Y=function(){return window.innerWidth<=f?d:window.innerWidth<=j?v:b},B=function(e){var t=Object(r.useState)(Y()),n=Object(a.a)(t,2),c=n[0],i=n[1];return Object(r.useEffect)((function(){var e=function(){i(Y())};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),Object(s.jsx)("div",{children:e.tiles.map((function(e){return Object(s.jsx)(L,{value:e.value,type:e.type,x:e.positionY*c,y:e.positionX*c},e.id)}))})},I=function(){var e=Object(r.useContext)(K).tiles.sort((function(e,t){return e.id-t.id}));return Object(s.jsx)("div",{className:"tileContainer",children:Object(s.jsx)(B,{tiles:e})})},J=function(){var e=Object(r.useContext)(K).tiles;return Object(s.jsxs)(P,{children:[p(x(e))&&Object(s.jsx)(T,{}),Object(s.jsx)(X,{}),Object(s.jsx)(I,{})]})},D=(n(20),n(21),function(e){return Object(s.jsxs)("div",{className:"scoreBox",children:[Object(s.jsx)("span",{className:"title",children:e.title}),Object(s.jsx)("span",{className:"score",children:e.score})]})}),F=function(){var e=Object(r.useContext)(K).tiles,t=Object(r.useReducer)(z,R(e)),n=Object(a.a)(t,2),c=n[0],i=n[1];return Object(r.useEffect)((function(){i({type:"change",payload:e})}),[e]),Object(r.useEffect)((function(){if(c.newPoints>0){var e=document.getElementById("additionScore");e.innerText="+".concat(c.newPoints);var t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)}}),[c]),Object(s.jsxs)("div",{className:"scoresContainer",children:[Object(s.jsxs)("div",{style:{position:"relative"},children:[Object(s.jsx)(D,{title:"SCORE",score:c.score}),Object(s.jsx)("div",{className:"addScore",id:"additionScore"})]}),Object(s.jsx)(D,{title:"BEST",score:c.score})]})},R=function(e){return{score:0,newPoints:0,tiles:e}},U=function(e,t){return e.some((function(e){return e.id===t.id}))},z=function(e,t){switch(t.type){case"change":var n=t.payload;if(2===n.length&&[1,2].every((function(e){return n.find((function(t){return t.id===e}))}))&&!e.tiles.every((function(e){return U(n,e)})))return R(n);if(e.tiles.every((function(e){return U(n,e)}))&&n.length===e.tiles.length+1)return Object(O.a)(Object(O.a)({},e),{},{tiles:n,newPoints:0});var r=M(n),c=n.reduce((function(t,n){return t+(n.id===r||U(e.tiles,n)?0:parseInt(n.value))}),0);return{tiles:n,newPoints:c,score:e.score+c};default:throw new Error("Unhandled action type: ".concat(t.type))}},W=(n(22),function(){return Object(s.jsx)("span",{className:"gameTitle",children:"2048"})}),H=function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)("span",{children:"Join the tiles, get to 2048!"}),Object(s.jsx)("br",{}),Object(s.jsx)("a",{href:"#id",children:"How to play \u2192"})]})},q=function(){var e=Object(r.useContext)(K).restartGame;return Object(s.jsxs)("div",{className:"header",children:[Object(s.jsxs)("div",{className:"centeredText",children:[Object(s.jsx)(W,{}),Object(s.jsx)(H,{})]}),Object(s.jsxs)("div",{className:"actions",children:[Object(s.jsx)(F,{}),Object(s.jsx)(G,{id:"restartGameBtn",onClick:function(t){return e()},children:"New Game"})]})]})},K=c.a.createContext(null),Q=function(){var e=Z(),t=e.tiles,n=e.registerMove,c=e.restartGame;return Object(r.useEffect)((function(){var e=function(e){e.preventDefault(),["ArrowUp","ArrowDown","ArrowRight","ArrowLeft"].includes(e.key)&&n(e.key)};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[n]),Object(s.jsx)(K.Provider,{value:{tiles:t,restartGame:c},children:Object(s.jsxs)(l,{children:[Object(s.jsx)(q,{}),Object(s.jsx)(J,{})]})})},V={ArrowUp:function(e){return h.map((function(t){return g(S(e,t),"left")})).flat()},ArrowDown:function(e){return h.map((function(t){return g(S(e,t),"right")})).flat()},ArrowRight:function(e){return h.map((function(t){return y(E(e,t),"right")})).flat()},ArrowLeft:function(e){return h.map((function(t){return y(E(e,t),"left")})).flat()}},Z=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1],i=Object(r.useState)(!1),o=Object(a.a)(i,2),s=o[0],l=o[1],f=Object(r.useState)(N()),j=Object(a.a)(f,2),d=j[0],v=j[1];Object(r.useEffect)((function(){if(0!==n.length&&!s){var e=V[n[0]];c(n.slice(1)),l(!0);var t,r=e(d);if(t=r,d.every((function(e){return t.some((function(t){return m(e,t)}))})))l(!1);else v(r),setTimeout((function(){var e=x(r);v([].concat(Object(u.a)(e),[C(e)])),l(!1)}),100)}}),[n,s,d]);return{tiles:d,registerMove:function(e){c([].concat(Object(u.a)(n),[e]))},restartGame:function(){v(N())}}};var $=function(){return Object(s.jsx)("div",{className:"App",children:Object(s.jsx)("main",{children:Object(s.jsx)(Q,{})})})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),r(e),c(e),i(e),o(e)}))};o.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)($,{})}),document.getElementById("root")),_()}],[[23,1,2]]]);
//# sourceMappingURL=main.91bc4f46.chunk.js.map