(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{79:function(e,t){},87:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);var c,a,r=n(1),s=n.n(r),o=n(46),i=n.n(o),l=n(7),u=n.n(l),j=n(10),d=n(4),b=n(9),m=n(2),p=Object(r.createContext)(null),O=n(48),x=n(21),h=n.n(x),v=n(0),f=function(e){var t=e.name;return Object(v.jsx)("div",{className:"card horizontal",children:Object(v.jsx)("div",{className:"card-stacked",children:Object(v.jsx)("div",{className:"card-content",children:Object(v.jsx)("p",{children:t})})})})},g=function(e){var t=e.rooms;return Object(v.jsx)("div",{children:t&&t.map((function(e){return Object(v.jsx)(b.b,{to:"/room/".concat(e._id,"/").concat(e.name),children:Object(v.jsx)(f,{name:e.name})},e._id)}))})},N=function(){var e="https://blackboard-application.herokuapp.com/",t=Object(r.useContext)(p),n=t.user,a=(t.setUser,Object(r.useState)("")),s=Object(d.a)(a,2),o=s[0],i=s[1],l=Object(r.useState)([]),u=Object(d.a)(l,2),j=u[0],b=u[1],x=Object(r.useState)(""),f=Object(d.a)(x,2),N=f[0],k=f[1];Object(r.useEffect)((function(){return c=h()(e),function(){c.emit("disconnect"),c.off()}}),[e]),Object(r.useEffect)((function(){c.on("output-rooms",(function(e){b(e)}))}),[]),Object(r.useEffect)((function(){c.on("room-created",(function(e){b([].concat(Object(O.a)(j),[e]))}))}),[j]),Object(r.useEffect)((function(){c.on("error-room-exist",(function(e){k("this room already exist")}))}));return n?Object(v.jsx)("div",{className:"container-fluid",children:Object(v.jsx)("div",{className:"jumbotron home-container mx-auto",children:Object(v.jsx)("div",{className:"row justify-content-between mx-auto w-100",children:Object(v.jsx)("div",{className:"col-12 form-container mx-auto",children:Object(v.jsxs)("div",{className:"row content-rooms",children:[Object(v.jsxs)("div",{className:"col-8",children:[Object(v.jsx)("p",{className:"saludo-usuario text-center",children:"Hola, ".concat(n.name)}),Object(v.jsxs)("form",{className:"form-container form-room",onSubmit:function(e){e.preventDefault(),c.emit("create-room",o),i("")},children:[Object(v.jsx)("input",{className:"room-input",onChange:function(e){i(e.target.value)},onFocus:function(){return k("")},required:!0,type:"text",placeholder:"Create Room",value:o}),Object(v.jsx)("button",{className:"create-btn btn btn-secondary",type:"submit",children:"Create a room"}),Object(v.jsx)("span",{className:"error-room",children:N})]})]}),Object(v.jsxs)("div",{className:"col-4 room-list",children:[Object(v.jsx)("h6",{children:"Room List"}),Object(v.jsx)(g,{rooms:j})]})]})})})})}):Object(v.jsx)(m.a,{to:"/login"})},k=function(){var e=Object(r.useContext)(p),t=(e.user,e.setUser),n=function(){var e=Object(j.a)(u.a.mark((function e(){var n,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://blackboard-application.herokuapp.com/logout",{credentials:"include"});case 3:n=e.sent,c=n.json(),console.log("logout data",c),t(null),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return Object(v.jsx)("nav",{className:"navbar navbar-expand-lg navbar-light",children:Object(v.jsxs)("div",{className:"container-fluid",children:[Object(v.jsx)("a",{className:"navbar-brand",href:"/",children:"Blackboard"}),Object(v.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarScroll","aria-controls":"navbarScroll","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(v.jsx)("span",{className:"navbar-toggler-icon"})}),Object(v.jsx)("div",{className:"d-flex",id:"navbarScroll",children:Object(v.jsxs)("ul",{className:"navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll",children:[Object(v.jsx)("li",{className:"nav-item",children:Object(v.jsx)("a",{className:"nav-link active","aria-current":"page",href:"/login",children:" Login  "})}),Object(v.jsx)("li",{className:"nav-item",children:Object(v.jsx)("a",{className:"nav-link active",href:"#",onClick:n,children:"Logout"})}),Object(v.jsx)("li",{className:"nav-item",children:Object(v.jsx)("a",{className:"nav-link active",href:"/signup",children:" Signup "})})]})})]})})},y=function(){var e=Object(r.useContext)(p),t=e.user,n=e.setUser,c=Object(r.useState)(""),a=Object(d.a)(c,2),s=a[0],o=a[1],i=Object(r.useState)(""),l=Object(d.a)(i,2),b=l[0],O=l[1],x=Object(r.useState)(""),h=Object(d.a)(x,2),f=h[0],g=h[1],N=Object(r.useState)(""),k=Object(d.a)(N,2),y=k[0],w=k[1],C=Object(r.useState)(""),S=Object(d.a)(C,2),F=S[0],E=S[1],T=Object(r.useState)(""),L=Object(d.a)(T,2),_=L[0],P=L[1],R=function(){var e=Object(j.a)(u.a.mark((function e(t){var c,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),w(""),E(""),P(""),e.prev=4,e.next=7,fetch("https://blackboard-application.herokuapp.com/signup",{method:"POST",credentials:"include",body:JSON.stringify({name:s,email:b,password:f}),headers:{"Content-Type":"application/json"}});case 7:return c=e.sent,e.next=10,c.json();case 10:a=e.sent,console.log(a),a.errors&&(E(a.errors.email),w(a.errors.name),P(a.errors.password)),a.user&&n(a.user),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(4),console.log(e.t0);case 19:case"end":return e.stop()}}),e,null,[[4,16]])})));return function(t){return e.apply(this,arguments)}}();return t?Object(v.jsx)(m.a,{to:"/"}):Object(v.jsx)("div",{className:"container-fluid",children:Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)("h2",{children:"Signup"}),Object(v.jsxs)("form",{className:"col col-12",onSubmit:R,children:[Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("input",{id:"name",type:"text",className:"validate form-control",value:s,onChange:function(e){return o(e.target.value)}}),Object(v.jsx)("div",{className:"name error red-text",children:y}),Object(v.jsx)("label",{htmlFor:"name",children:"Name"})]}),Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("input",{id:"email",type:"email",className:"validate form-control",value:b,onChange:function(e){return O(e.target.value)}}),Object(v.jsx)("div",{className:"name error red-text",children:F}),Object(v.jsx)("label",{htmlFor:"email",children:"Email"})]}),Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("input",{id:"password",type:"password",className:"validate form-control",value:f,onChange:function(e){return g(e.target.value)}}),Object(v.jsx)("div",{className:"name error red-text",children:_}),Object(v.jsx)("label",{htmlFor:"password",children:"Password"})]}),Object(v.jsx)("button",{className:"btn btn-primary",children:" Sign up "})]})]})})},w=function(){var e=Object(r.useContext)(p),t=e.user,n=e.setUser,c=Object(r.useState)(""),a=Object(d.a)(c,2),s=a[0],o=a[1],i=Object(r.useState)(""),l=Object(d.a)(i,2),b=l[0],O=l[1],x=Object(r.useState)(""),h=Object(d.a)(x,2),f=h[0],g=h[1],N=Object(r.useState)(""),k=Object(d.a)(N,2),y=k[0],w=k[1],C=function(){var e=Object(j.a)(u.a.mark((function e(t){var c,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),g(""),w(""),e.prev=3,e.next=6,fetch("https://blackboard-application.herokuapp.com/login",{method:"POST",credentials:"include",body:JSON.stringify({email:s,password:b}),headers:{"Content-Type":"application/json"}});case 6:return c=e.sent,e.next=9,c.json();case 9:a=e.sent,console.log(a),a.errors&&(g(a.errors.email),w(a.errors.password)),a.user&&n(a.user),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(t){return e.apply(this,arguments)}}();return t?Object(v.jsx)(m.a,{to:"/"}):Object(v.jsx)("div",{className:"container-fluid",children:Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)("h2",{children:"Login"}),Object(v.jsxs)("form",{className:"col-12",onSubmit:C,children:[Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("input",{id:"email",type:"email",className:"validate form-control",value:s,onChange:function(e){return o(e.target.value)}}),Object(v.jsx)("div",{className:"name error red-text",children:f}),Object(v.jsx)("label",{htmlFor:"email",children:"Email"})]}),Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("input",{id:"password",type:"password",className:"validate form-control",value:b,onChange:function(e){return O(e.target.value)}}),Object(v.jsx)("div",{className:"name error red-text",children:y}),Object(v.jsx)("label",{htmlFor:"password",children:"Password"})]}),Object(v.jsx)("button",{className:"btn btn-primary",children:" Login "})]})]})})},C=function(e){var t=e.getColor,n=e.user,c=function(e){t(e),n.emit("change-color",e)};return Object(v.jsxs)("div",{className:"paleta-colores",children:[Object(v.jsx)("span",{id:"red",onClick:function(){t("#FF0000"),c("#FF0000")}}),Object(v.jsx)("span",{id:"blue",onClick:function(){t("#0000FF"),c("#0000FF")}}),Object(v.jsx)("span",{id:"yellow",onClick:function(){t("#FFFF00"),c("#FFFF00")}}),Object(v.jsx)("span",{id:"green",onClick:function(){t("#00FF00"),c("#00FF00")}}),Object(v.jsx)("span",{id:"black",onClick:function(){t("#000000"),c("#000000")}})]})},S=function(){var e=Object(r.useRef)(null),t=Object(r.useRef)(null),n="#000000",c=Object(r.useRef)(null),s=Object(r.useContext)(p),o=s.user,i=(s.setUser,Object(m.g)()),l=i.room_id,u=i.room_name;a=h()("https://blackboard-application.herokuapp.com/");return Object(r.useEffect)((function(){var r=c.current,s=r.getContext("2d");r.width=window.innerWidth,r.height=window.innerHeight;var i=!1,j=!1,d=!0,b=!1;a.emit("join",{name:o.name,room_id:l,user_id:o._id,room_name:u});var m={x:0,y:0},p={x:0,y:0};function O(e){var t=r.getBoundingClientRect();return m.x=e.clientX-t.left,m.y=e.clientY-t.top,m}s.lineWidth=1,e.current.addEventListener("click",(function(e){b=!0,d=!1}),!1),t.current.addEventListener("click",(function(e){b=!1,d=!0}),!1),r.addEventListener("mousedown",(function(e){d?i=!0:b&&(j=!0),O(e)})),r.addEventListener("mouseup",(function(){j=!1,i=!1})),r.addEventListener("mousemove",(function(e){var t;d&&i?(t=e,s.beginPath(),s.lineCap="round",s.strokeStyle=n||"#000000",s.moveTo(m.x,m.y),p.x=m.x,p.y=m.y,O(t),a.emit("dibujando-socket",{oldCoord:p,coordenadas:m,room_id:l,color:n}),s.lineTo(m.x,m.y),s.stroke()):b&&j&&function(e){var t=O(e);a.emit("borrando",{pos:t,room_id:l}),s.clearRect(t.x-50,t.y-50,100,100)}(e)}),!1),a.on("dibujando-socket",(function(e){!function(e){s.beginPath(),s.lineCap="round",s.strokeStyle=e.color?e.color:"#000000",s.moveTo(e.oldCoord.x,e.oldCoord.y),s.lineTo(e.coordenadas.x,e.coordenadas.y),s.stroke()}(e)})),a.on("borrando",(function(e){!function(e){s.clearRect(e.pos.x-50,e.pos.y-50,100,100)}(e)})),a.on("change-color",(function(e){n=e}))}),[]),Object(v.jsx)("div",{className:"container-fluid",children:Object(v.jsxs)("div",{className:"row jumbotron",children:[Object(v.jsx)(C,{getColor:function(e){n=e,console.log("color value ",n)},user:a}),Object(v.jsxs)("div",{className:"col-6",children:[Object(v.jsx)("span",{id:"borrador",ref:e,children:Object(v.jsx)("i",{className:"bi bi-eraser"})}),Object(v.jsx)("span",{id:"pen",ref:t,children:Object(v.jsx)("i",{className:"bi bi-pencil"})})]}),Object(v.jsx)("canvas",{className:"col-12",id:"canvas",ref:c,children:"Tu navegador no es compatible"})]})})};n(87);var F=function(){var e=Object(r.useState)(null),t=Object(d.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){(function(){var e=Object(j.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://blackboard-application.herokuapp.com/verifyuser",{credentials:"include",headers:{"Content-Type":"application/json"}});case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,c(n),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()})),Object(v.jsx)(b.a,{children:Object(v.jsx)("div",{className:"App",children:Object(v.jsxs)(p.Provider,{value:{user:n,setUser:c},children:[Object(v.jsx)(k,{}),Object(v.jsxs)(m.d,{children:[Object(v.jsx)(m.b,{exact:!0,path:"/",component:N}),Object(v.jsx)(m.b,{path:"/room/:room_id/:room_name",component:S}),Object(v.jsx)(m.b,{path:"/signup",component:y}),Object(v.jsx)(m.b,{path:"/login",component:w})]})]})})})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,89)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};i.a.render(Object(v.jsx)(s.a.StrictMode,{children:Object(v.jsx)(F,{})}),document.getElementById("root")),E()}},[[88,1,2]]]);
//# sourceMappingURL=main.3b4b54f9.chunk.js.map