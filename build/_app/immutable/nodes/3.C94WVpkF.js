import{s as P,e as h,a as y,c as b,b as H,g as x,d as C,f as k,h as g,i as z,j as o,k as j,l as A,n as I,r as E,m as F,o as O,p as S}from"../chunks/scheduler.CSB6Q-Hs.js";import{S as U,i as V}from"../chunks/index.BR2gqvZK.js";import{e as B}from"../chunks/forms.BgChqCnb.js";import{i as N}from"../chunks/stores.WBD-hLTP.js";function q(c){let e,a="Niepoprawny login lub hasło";return{c(){e=h("p"),e.textContent=a,this.h()},l(n){e=b(n,"P",{class:!0,"data-svelte-h":!0}),x(e)!=="svelte-10zl4bi"&&(e.textContent=a),this.h()},h(){g(e,"class","text-red-500 text-sm mt-1")},m(n,r){z(n,e,r)},d(n){n&&k(e)}}}function R(c){let e,a,n="Login",r,t,i,f='<label for="username" class="block mb-2">Username:</label> <input type="text" id="username" name="username" required="" class="w-full p-2 border border-gray-300 rounded"/>',w,l,_='<label for="password" class="block mb-2">Password:</label> <input type="password" id="password" name="password" required="" class="w-full p-2 border border-gray-300 rounded"/>',L,v,d,T="Login",M,D,s=c[0]&&!c[1]&&q();return{c(){e=h("main"),a=h("h1"),a.textContent=n,r=y(),t=h("form"),i=h("div"),i.innerHTML=f,w=y(),l=h("div"),l.innerHTML=_,L=y(),s&&s.c(),v=y(),d=h("button"),d.textContent=T,this.h()},l(u){e=b(u,"MAIN",{class:!0});var p=H(e);a=b(p,"H1",{class:!0,"data-svelte-h":!0}),x(a)!=="svelte-q9i5rl"&&(a.textContent=n),r=C(p),t=b(p,"FORM",{class:!0,method:!0});var m=H(t);i=b(m,"DIV",{"data-svelte-h":!0}),x(i)!=="svelte-68r9w9"&&(i.innerHTML=f),w=C(m),l=b(m,"DIV",{"data-svelte-h":!0}),x(l)!=="svelte-7rt5f5"&&(l.innerHTML=_),L=C(m),s&&s.l(m),v=C(m),d=b(m,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),x(d)!=="svelte-9kldnz"&&(d.textContent=T),m.forEach(k),p.forEach(k),this.h()},h(){g(a,"class","text-2xl font-bold mb-4"),g(d,"type","submit"),g(d,"class","w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"),g(t,"class","flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md"),g(t,"method","post"),g(e,"class","flex flex-col items-center justify-center h-screen bg-gray-100")},m(u,p){z(u,e,p),o(e,a),o(e,r),o(e,t),o(t,i),o(t,w),o(t,l),o(t,L),s&&s.m(t,null),o(t,v),o(t,d),M||(D=[j(B.call(null,t)),A(t,"submit",c[2])],M=!0)},p(u,[p]){u[0]&&!u[1]?s||(s=q(),s.c(),s.m(t,v)):s&&(s.d(1),s=null)},i:I,o:I,d(u){u&&k(e),s&&s.d(),M=!1,E(D)}}}function $(c,e,a){let n;F(c,N,f=>a(1,n=f));let r={username:"",password:"",general:""},t=!1;O(()=>{S(N,n=!1,n)});function i(f){r={username:"",password:"",general:""},a(0,t=!0);const w=new FormData(f.target),l=w.get("username");(!l||l.length<3)&&(r.username="Niepoprawna nazwa użytkownika.");const _=w.get("password");(!_||_.length<6)&&(r.password="Niepoprawne hasło."),(r.username||r.password)&&f.preventDefault()}return[t,n,i]}class W extends U{constructor(e){super(),V(this,e,$,R,P,{})}}export{W as component};