function w(){}const X=t=>t;function q(t,e){for(const n in e)t[n]=e[n];return t}function Y(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function P(t){return t()}function Z(){return Object.create(null)}function H(t){t.forEach(P)}function B(t){return typeof t=="function"}function $(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function tt(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function et(t){return Object.keys(t).length===0}function A(t,...e){if(t==null){for(const i of e)i(void 0);return w}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function nt(t){let e;return A(t,n=>e=n)(),e}function it(t,e,n){t.$$.on_destroy.push(A(e,n))}function rt(t,e,n,i){if(t){const r=C(t,e,n,i);return t[0](r)}}function C(t,e,n,i){return t[1]&&i?q(n.ctx.slice(),t[1](i(e))):n.ctx}function ct(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],c=Math.max(e.dirty.length,r.length);for(let s=0;s<c;s+=1)l[s]=e.dirty[s]|r[s];return l}return e.dirty|r}return e.dirty}function ot(t,e,n,i,r,l){if(r){const c=C(e,n,i,l);t.p(c,r)}}function st(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function lt(t,e,n){return t.set(n),e}function ut(t){return t&&B(t.destroy)?t.destroy:w}let y=!1;function at(){y=!0}function ft(){y=!1}function L(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function M(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&o.push(a)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,a=(r>0&&e[n[r]].claim_order<=u?r+1:L(1,r,T=>e[n[T]].claim_order,u))-1;i[o]=n[a]+1;const k=a+1;n[k]=o,r=Math.max(k,r)}const l=[],c=[];let s=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(l.push(e[o-1]);s>=o;s--)c.push(e[s]);s--}for(;s>=0;s--)c.push(e[s]);l.reverse(),c.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<c.length;o++){for(;u<l.length&&c[o].claim_order>=l[u].claim_order;)u++;const a=u<l.length?l[u]:null;t.insertBefore(c[o],a)}}function O(t,e){t.appendChild(e)}function R(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function _t(t){const e=j("style");return e.textContent="/* empty */",I(R(t),e),e.sheet}function I(t,e){return O(t.head||t,e),e.sheet}function U(t,e){if(y){for(M(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function dt(t,e,n){y&&!n?U(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ht(t){t.parentNode&&t.parentNode.removeChild(t)}function pt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function j(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function mt(){return v(" ")}function yt(){return v("")}function bt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function gt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function xt(t){return function(e){e.target===this&&t.call(this,e)}}function Et(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function vt(t){return t.dataset.svelteH}function kt(t){return Array.from(t.childNodes)}function z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,i,r=!1){z(t);const l=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(e(s)){const o=n(s);return o===void 0?t.splice(c,1):t[c]=o,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(e(s)){const o=n(s);return o===void 0?t.splice(c,1):t[c]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function F(t,e,n,i){return D(t,r=>r.nodeName===e,r=>{const l=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];n[s.name]||l.push(s.name)}l.forEach(c=>r.removeAttribute(c))},()=>i(e))}function Nt(t,e,n){return F(t,e,n,j)}function W(t,e){return D(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>v(e),!0)}function wt(t){return W(t," ")}function At(t,e){e=""+e,t.data!==e&&(t.data=e)}function Ct(t,e){t.value=e??""}function jt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Dt(t,e,n){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===e){r.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function St(t){const e=t.querySelector(":checked");return e&&e.__value}function Tt(t,e,n){t.classList.toggle(e,!!n)}function G(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function qt(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const l=r.textContent.trim();l===`HEAD_${t}_END`?(i-=1,n.push(r)):l===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function Pt(t,e){return new t(e)}let m;function b(t){m=t}function d(){if(!m)throw new Error("Function called outside component initialization");return m}function Ht(t){d().$$.before_update.push(t)}function Bt(t){d().$$.on_mount.push(t)}function Lt(t){d().$$.after_update.push(t)}function Mt(){const t=d();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const l=G(e,n,{cancelable:i});return r.slice().forEach(c=>{c.call(t,l)}),!l.defaultPrevented}return!0}}function Ot(t,e){return d().$$.context.set(t,e),e}function Rt(t){return d().$$.context.get(t)}function It(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const h=[],N=[];let _=[];const x=[],S=Promise.resolve();let E=!1;function J(){E||(E=!0,S.then(Q))}function Ut(){return J(),S}function K(t){_.push(t)}function zt(t){x.push(t)}const g=new Set;let f=0;function Q(){if(f!==0)return;const t=m;do{try{for(;f<h.length;){const e=h[f];f++,b(e),V(e.$$)}}catch(e){throw h.length=0,f=0,e}for(b(null),h.length=0,f=0;N.length;)N.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];g.has(n)||(g.add(n),n())}_.length=0}while(h.length);for(;x.length;)x.pop()();E=!1,g.clear(),b(t)}function V(t){if(t.fragment!==null){t.update(),H(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(K)}}function Ft(t){const e=[],n=[];_.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),_=e}export{m as $,Pt as A,Ut as B,tt as C,Mt as D,Y as E,d as F,b as G,Q as H,pt as I,rt as J,qt as K,ot as L,st as M,ct as N,gt as O,xt as P,It as Q,B as R,zt as S,K as T,R as U,_t as V,G as W,X,Z as Y,et as Z,Ft as _,mt as a,P as a0,h as a1,J as a2,at as a3,ft as a4,nt as a5,Rt as a6,Ot as a7,Ht as a8,Dt as a9,St as aa,Tt as ab,A as ac,kt as b,Nt as c,W as d,j as e,ht as f,wt as g,U as h,dt as i,At as j,it as k,vt as l,Et as m,w as n,ut as o,Bt as p,lt as q,Ct as r,$ as s,v as t,bt as u,H as v,yt as w,Lt as x,jt as y,N as z};
