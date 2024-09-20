import{s as ie,e as p,t as k,a as j,c as m,b,d as y,f as d,g as z,m as l,i as q,h as a,o as ue,u as ce,n as le,v as de,p as fe,j as X}from"../chunks/scheduler.kFxmatEa.js";import{S as pe,i as me}from"../chunks/index._l53GamT.js";import{t as U,e as he}from"../chunks/i18n.Dfv-DUWN.js";function re(n){let e,t;return{c(){e=p("p"),t=k(n[0]),this.h()},l(r){e=m(r,"P",{class:!0});var s=b(e);t=y(s,n[0]),s.forEach(d),this.h()},h(){l(e,"class","text-green-500 mb-4")},m(r,s){q(r,e,s),a(e,t)},p(r,s){s&1&&X(t,r[0])},d(r){r&&d(e)}}}function oe(n){let e,t=n[1].username+"",r;return{c(){e=p("p"),r=k(t),this.h()},l(s){e=m(s,"P",{class:!0});var o=b(e);r=y(o,t),o.forEach(d),this.h()},h(){l(e,"class","text-red-500 text-sm mt-1")},m(s,o){q(s,e,o),a(e,r)},p(s,o){o&2&&t!==(t=s[1].username+"")&&X(r,t)},d(s){s&&d(e)}}}function ne(n){let e,t=n[1].password+"",r;return{c(){e=p("p"),r=k(t),this.h()},l(s){e=m(s,"P",{class:!0});var o=b(e);r=y(o,t),o.forEach(d),this.h()},h(){l(e,"class","text-red-500 text-sm mt-1")},m(s,o){q(s,e,o),a(e,r)},p(s,o){o&2&&t!==(t=s[1].password+"")&&X(r,t)},d(s){s&&d(e)}}}function _e(n){let e,t,r=U("change_password")+"",s,o,E,h,v,_,D,Y=U("current_password")+"",A,B,F,I,O,S,g,P,$=U("new_password")+"",V,R,C,x,Z,G,H,ee=U("change_password")+"",J,K,se,i=n[0]&&re(n),u=n[1].username&&oe(n),c=n[1].password&&ne(n);return{c(){e=p("main"),t=p("h1"),s=k(r),o=j(),i&&i.c(),E=j(),h=p("form"),v=p("div"),_=p("div"),D=p("label"),A=k(Y),B=k(":"),F=j(),I=p("input"),O=j(),u&&u.c(),S=j(),g=p("div"),P=p("label"),V=k($),R=k(":"),C=j(),x=p("input"),Z=j(),c&&c.c(),G=j(),H=p("button"),J=k(ee),this.h()},l(f){e=m(f,"MAIN",{class:!0});var w=b(e);t=m(w,"H1",{class:!0});var te=b(t);s=y(te,r),te.forEach(d),o=z(w),i&&i.l(w),E=z(w),h=m(w,"FORM",{class:!0,method:!0,action:!0});var N=b(h);v=m(N,"DIV",{class:!0});var T=b(v);_=m(T,"DIV",{class:!0});var L=b(_);D=m(L,"LABEL",{for:!0,class:!0});var Q=b(D);A=y(Q,Y),B=y(Q,":"),Q.forEach(d),F=z(L),I=m(L,"INPUT",{type:!0,id:!0,name:!0,class:!0}),O=z(L),u&&u.l(L),L.forEach(d),S=z(T),g=m(T,"DIV",{class:!0});var M=b(g);P=m(M,"LABEL",{for:!0,class:!0});var W=b(P);V=y(W,$),R=y(W,":"),W.forEach(d),C=z(M),x=m(M,"INPUT",{type:!0,id:!0,name:!0,class:!0}),Z=z(M),c&&c.l(M),M.forEach(d),T.forEach(d),G=z(N),H=m(N,"BUTTON",{type:!0,class:!0});var ae=b(H);J=y(ae,ee),ae.forEach(d),N.forEach(d),w.forEach(d),this.h()},h(){l(t,"class","text-5xl font-bold mb-4"),l(D,"for","username"),l(D,"class","block mb-2"),l(I,"type","password"),l(I,"id","password"),l(I,"name","password"),I.required=!0,l(I,"class","w-full p-2 border border-gray-300 rounded"),l(_,"class","flex-1"),l(P,"for","password"),l(P,"class","block mb-2"),l(x,"type","password"),l(x,"id","password_repeat"),l(x,"name","password_repeat"),x.required=!0,l(x,"class","w-full p-2 border border-gray-300 rounded"),l(g,"class","flex-1"),l(v,"class","flex gap-4"),l(H,"type","submit"),l(H,"class","w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"),l(h,"class","flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-3xl"),l(h,"method","post"),l(h,"action","?/ZmianaHasła"),l(e,"class","flex flex-col items-center justify-center h-screen bg-gray-100 p-6")},m(f,w){q(f,e,w),a(e,t),a(t,s),a(e,o),i&&i.m(e,null),a(e,E),a(e,h),a(h,v),a(v,_),a(_,D),a(D,A),a(D,B),a(_,F),a(_,I),a(_,O),u&&u.m(_,null),a(v,S),a(v,g),a(g,P),a(P,V),a(P,R),a(g,C),a(g,x),a(g,Z),c&&c.m(g,null),a(h,G),a(h,H),a(H,J),K||(se=[ue(he.call(null,h)),ce(h,"submit",n[2])],K=!0)},p(f,[w]){f[0]?i?i.p(f,w):(i=re(f),i.c(),i.m(e,E)):i&&(i.d(1),i=null),f[1].username?u?u.p(f,w):(u=oe(f),u.c(),u.m(_,null)):u&&(u.d(1),u=null),f[1].password?c?c.p(f,w):(c=ne(f),c.c(),c.m(g,null)):c&&(c.d(1),c=null)},i:le,o:le,d(f){f&&d(e),i&&i.d(),u&&u.d(),c&&c.d(),K=!1,de(se)}}}function we(n,e,t){let r="",s={imie:"",nazwisko:"",stanowisko:"",cardID:"",fingerID:"",username:"",password:""};fe(()=>{const E=new URLSearchParams(window.location.search);t(0,r=E.get("success")==="true"?"Poprawnie zmieniono Hasło":"")});function o(E){t(1,s={imie:"",nazwisko:"",stanowisko:"",cardID:"",fingerID:"",username:"",password:""});const v=new FormData(E.target).get("password");(!v||v.length<6)&&t(1,s.password="Hasło musi mieć co najmniej 6 znaków.",s),Object.values(s).some(_=>_!=="")?E.preventDefault():window.location.href="/zmianaHaslaIndiwidualna?success=true"}return[r,s,o]}class Ee extends pe{constructor(e){super(),me(this,e,we,_e,ie,{})}}export{Ee as component};
