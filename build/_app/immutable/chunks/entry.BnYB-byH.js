import{n as z,s as ge,a9 as me,r as _e,J as ye,F as wt}from"./scheduler.CSB6Q-Hs.js";new URL("sveltekit-internal://");function we(t,n){return t==="/"||n==="ignore"?t:n==="never"?t.endsWith("/")?t.slice(0,-1):t:n==="always"&&!t.endsWith("/")?t+"/":t}function ve(t){return t.split("%25").map(decodeURI).join("%25")}function be(t){for(const n in t)t[n]=decodeURIComponent(t[n]);return t}function gt({href:t}){return t.split("#")[0]}const Ee=["href","pathname","search","toString","toJSON"];function ke(t,n,e){const a=new URL(t);Object.defineProperty(a,"searchParams",{value:new Proxy(a.searchParams,{get(r,o){if(o==="get"||o==="getAll"||o==="has")return s=>(e(s),r[o](s));n();const i=Reflect.get(r,o);return typeof i=="function"?i.bind(r):i}}),enumerable:!0,configurable:!0});for(const r of Ee)Object.defineProperty(a,r,{get(){return n(),t[r]},enumerable:!0,configurable:!0});return a}const Ae="/__data.json",Se=".html__data.json";function Re(t){return t.endsWith(".html")?t.replace(/\.html$/,Se):t.replace(/\/$/,"")+Ae}function Ie(...t){let n=5381;for(const e of t)if(typeof e=="string"){let a=e.length;for(;a;)n=n*33^e.charCodeAt(--a)}else if(ArrayBuffer.isView(e)){const a=new Uint8Array(e.buffer,e.byteOffset,e.byteLength);let r=a.length;for(;r;)n=n*33^a[--r]}else throw new TypeError("value must be a string or TypedArray");return(n>>>0).toString(36)}function Le(t){const n=atob(t),e=new Uint8Array(n.length);for(let a=0;a<n.length;a++)e[a]=n.charCodeAt(a);return e.buffer}const zt=window.fetch;window.fetch=(t,n)=>((t instanceof Request?t.method:(n==null?void 0:n.method)||"GET")!=="GET"&&B.delete(At(t)),zt(t,n));const B=new Map;function Pe(t,n){const e=At(t,n),a=document.querySelector(e);if(a!=null&&a.textContent){let{body:r,...o}=JSON.parse(a.textContent);const i=a.getAttribute("data-ttl");return i&&B.set(e,{body:r,init:o,ttl:1e3*Number(i)}),a.getAttribute("data-b64")!==null&&(r=Le(r)),Promise.resolve(new Response(r,o))}return window.fetch(t,n)}function Ue(t,n,e){if(B.size>0){const a=At(t,e),r=B.get(a);if(r){if(performance.now()<r.ttl&&["default","force-cache","only-if-cached",void 0].includes(e==null?void 0:e.cache))return new Response(r.body,r.init);B.delete(a)}}return window.fetch(n,e)}function At(t,n){let a=`script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;if(n!=null&&n.headers||n!=null&&n.body){const r=[];n.headers&&r.push([...new Headers(n.headers)].join(",")),n.body&&(typeof n.body=="string"||ArrayBuffer.isView(n.body))&&r.push(n.body),a+=`[data-hash="${Ie(...r)}"]`}return a}const xe=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Te(t){const n=[];return{pattern:t==="/"?/^\/$/:new RegExp(`^${Oe(t).map(a=>{const r=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(a);if(r)return n.push({name:r[1],matcher:r[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(a);if(o)return n.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!a)return;const i=a.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,l)=>{if(l%2){if(c.startsWith("x+"))return mt(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return mt(String.fromCharCode(...c.slice(2).split("-").map(f=>parseInt(f,16))));const u=xe.exec(c),[,h,p,d,g]=u;return n.push({name:d,matcher:g,optional:!!h,rest:!!p,chained:p?l===1&&i[0]==="":!1}),p?"(.*?)":h?"([^/]*)?":"([^/]+?)"}return mt(c)}).join("")}).join("")}/?$`),params:n}}function Ne(t){return!/^\([^)]+\)$/.test(t)}function Oe(t){return t.slice(1).split("/").filter(Ne)}function je(t,n,e){const a={},r=t.slice(1),o=r.filter(s=>s!==void 0);let i=0;for(let s=0;s<n.length;s+=1){const c=n[s];let l=r[s-i];if(c.chained&&c.rest&&i&&(l=r.slice(s-i,s+1).filter(u=>u).join("/"),i=0),l===void 0){c.rest&&(a[c.name]="");continue}if(!c.matcher||e[c.matcher](l)){a[c.name]=l;const u=n[s+1],h=r[s+1];u&&!u.rest&&u.optional&&h&&c.chained&&(i=0),!u&&!h&&Object.keys(a).length===o.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return a}function mt(t){return t.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function $e({nodes:t,server_loads:n,dictionary:e,matchers:a}){const r=new Set(n);return Object.entries(e).map(([s,[c,l,u]])=>{const{pattern:h,params:p}=Te(s),d={id:s,exec:g=>{const f=h.exec(g);if(f)return je(f,p,a)},errors:[1,...u||[]].map(g=>t[g]),layouts:[0,...l||[]].map(i),leaf:o(c)};return d.errors.length=d.layouts.length=Math.max(d.errors.length,d.layouts.length),d});function o(s){const c=s<0;return c&&(s=~s),[c,t[s]]}function i(s){return s===void 0?s:[r.has(s),t[s]]}}function Bt(t,n=JSON.parse){try{return n(sessionStorage[t])}catch{}}function Ot(t,n,e=JSON.stringify){const a=e(n);try{sessionStorage[t]=a}catch{}}const j=[];function De(t,n){return{subscribe:ot(t,n).subscribe}}function ot(t,n=z){let e;const a=new Set;function r(s){if(ge(t,s)&&(t=s,e)){const c=!j.length;for(const l of a)l[1](),j.push(l,t);if(c){for(let l=0;l<j.length;l+=2)j[l][0](j[l+1]);j.length=0}}}function o(s){r(s(t))}function i(s,c=z){const l=[s,c];return a.add(l),a.size===1&&(e=n(r,o)||z),s(t),()=>{a.delete(l),a.size===0&&e&&(e(),e=null)}}return{set:r,update:o,subscribe:i}}function fn(t,n,e){const a=!Array.isArray(t),r=a?[t]:t;if(!r.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const o=n.length<2;return De(e,(i,s)=>{let c=!1;const l=[];let u=0,h=z;const p=()=>{if(u)return;h();const g=n(a?l[0]:l,i,s);o?i(g):h=ye(g)?g:z},d=r.map((g,f)=>me(g,_=>{l[f]=_,u&=~(1<<f),c&&p()},()=>{u|=1<<f}));return c=!0,p(),function(){_e(d),h(),c=!1}})}var Gt;const P=((Gt=globalThis.__sveltekit_1t5dcz9)==null?void 0:Gt.base)??"";var Mt;const Ce=((Mt=globalThis.__sveltekit_1t5dcz9)==null?void 0:Mt.assets)??P,Ve="1723023858416",Ht="sveltekit:snapshot",Jt="sveltekit:scroll",Kt="sveltekit:states",Fe="sveltekit:pageurl",C="sveltekit:history",J="sveltekit:navigation",Q={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},X=location.origin;function Yt(t){if(t instanceof URL)return t;let n=document.baseURI;if(!n){const e=document.getElementsByTagName("base");n=e.length?e[0].href:document.URL}return new URL(t,n)}function St(){return{x:pageXOffset,y:pageYOffset}}function $(t,n){return t.getAttribute(`data-sveltekit-${n}`)}const jt={...Q,"":Q.hover};function Wt(t){let n=t.assignedSlot??t.parentNode;return(n==null?void 0:n.nodeType)===11&&(n=n.host),n}function Xt(t,n){for(;t&&t!==n;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=Wt(t)}}function vt(t,n){let e;try{e=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const a=t instanceof SVGAElement?t.target.baseVal:t.target,r=!e||!!a||st(e,n)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),o=(e==null?void 0:e.origin)===X&&t.hasAttribute("download");return{url:e,external:r,target:a,download:o}}function tt(t){let n=null,e=null,a=null,r=null,o=null,i=null,s=t;for(;s&&s!==document.documentElement;)a===null&&(a=$(s,"preload-code")),r===null&&(r=$(s,"preload-data")),n===null&&(n=$(s,"keepfocus")),e===null&&(e=$(s,"noscroll")),o===null&&(o=$(s,"reload")),i===null&&(i=$(s,"replacestate")),s=Wt(s);function c(l){switch(l){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:jt[a??"off"],preload_data:jt[r??"off"],keepfocus:c(n),noscroll:c(e),reload:c(o),replace_state:c(i)}}function $t(t){const n=ot(t);let e=!0;function a(){e=!0,n.update(i=>i)}function r(i){e=!1,n.set(i)}function o(i){let s;return n.subscribe(c=>{(s===void 0||e&&c!==s)&&i(s=c)})}return{notify:a,set:r,subscribe:o}}function qe(){const{set:t,subscribe:n}=ot(!1);let e;async function a(){clearTimeout(e);try{const r=await fetch(`${Ce}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const i=(await r.json()).version!==Ve;return i&&(t(!0),clearTimeout(e)),i}catch{return!1}}return{subscribe:n,check:a}}function st(t,n){return t.origin!==X||!t.pathname.startsWith(n)}const Ge=-1,Me=-2,ze=-3,Be=-4,He=-5,Je=-6;function un(t,n){return Zt(JSON.parse(t),n)}function Zt(t,n){if(typeof t=="number")return r(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const e=t,a=Array(e.length);function r(o,i=!1){if(o===Ge)return;if(o===ze)return NaN;if(o===Be)return 1/0;if(o===He)return-1/0;if(o===Je)return-0;if(i)throw new Error("Invalid input");if(o in a)return a[o];const s=e[o];if(!s||typeof s!="object")a[o]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const c=s[0],l=n==null?void 0:n[c];if(l)return a[o]=l(r(s[1]));switch(c){case"Date":a[o]=new Date(s[1]);break;case"Set":const u=new Set;a[o]=u;for(let d=1;d<s.length;d+=1)u.add(r(s[d]));break;case"Map":const h=new Map;a[o]=h;for(let d=1;d<s.length;d+=2)h.set(r(s[d]),r(s[d+1]));break;case"RegExp":a[o]=new RegExp(s[1],s[2]);break;case"Object":a[o]=Object(s[1]);break;case"BigInt":a[o]=BigInt(s[1]);break;case"null":const p=Object.create(null);a[o]=p;for(let d=1;d<s.length;d+=2)p[s[d]]=r(s[d+1]);break;default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(s.length);a[o]=c;for(let l=0;l<s.length;l+=1){const u=s[l];u!==Me&&(c[l]=r(u))}}else{const c={};a[o]=c;for(const l in s){const u=s[l];c[l]=r(u)}}return a[o]}return r(0)}const Qt=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...Qt];const Ke=new Set([...Qt]);[...Ke];function Ye(t){return t.filter(n=>n!=null)}class it{constructor(n,e){this.status=n,typeof e=="string"?this.body={message:e}:e?this.body=e:this.body={message:`Error: ${n}`}}toString(){return JSON.stringify(this.body)}}class te{constructor(n,e){this.status=n,this.location=e}}class Rt extends Error{constructor(n,e,a){super(a),this.status=n,this.text=e}}const We="x-sveltekit-invalidated",Xe="x-sveltekit-trailing-slash";function et(t){return t instanceof it||t instanceof Rt?t.status:500}function Ze(t){return t instanceof Rt?t.text:"Internal Error"}const O=Bt(Jt)??{},K=Bt(Ht)??{},x={url:$t({}),page:$t({}),navigating:ot(null),updated:qe()};function It(t){O[t]=St()}function Qe(t,n){let e=t+1;for(;O[e];)delete O[e],e+=1;for(e=n+1;K[e];)delete K[e],e+=1}function F(t){return location.href=t.href,new Promise(()=>{})}function Dt(){}let ct,bt,nt,U,Et,G;const ee=[],at=[];let I=null;const ne=[],tn=[];let D=[],y={branch:[],error:null,url:null},Lt=!1,rt=!1,Ct=!0,Y=!1,M=!1,ae=!1,lt=!1,N,A,L,S,q;const H=new Set;let _t;async function dn(t,n,e){var r,o;document.URL!==location.href&&(location.href=location.href),G=t,ct=$e(t),U=document.documentElement,Et=n,bt=t.nodes[0],nt=t.nodes[1],bt(),nt(),A=(r=history.state)==null?void 0:r[C],L=(o=history.state)==null?void 0:o[J],A||(A=L=Date.now(),history.replaceState({...history.state,[C]:A,[J]:L},""));const a=O[A];a&&(history.scrollRestoration="manual",scrollTo(a.x,a.y)),e?await cn(Et,e):on(location.href,{replaceState:!0}),sn()}async function en(){if(await(_t||(_t=Promise.resolve())),!_t)return;_t=null;const t=dt(y.url,!0);I=null;const n=q={},e=t&&await xt(t);if(!(!e||n!==q)){if(e.type==="redirect")return ft(new URL(e.location,y.url).href,{},1,n);e.props.page&&(S=e.props.page),y=e.state,re(),N.$set(e.props)}}function re(){ee.length=0,lt=!1}function oe(t){at.some(n=>n==null?void 0:n.snapshot)&&(K[t]=at.map(n=>{var e;return(e=n==null?void 0:n.snapshot)==null?void 0:e.capture()}))}function se(t){var n;(n=K[t])==null||n.forEach((e,a)=>{var r,o;(o=(r=at[a])==null?void 0:r.snapshot)==null||o.restore(e)})}function Vt(){It(A),Ot(Jt,O),oe(L),Ot(Ht,K)}async function ft(t,n,e,a){return Z({type:"goto",url:Yt(t),keepfocus:n.keepFocus,noscroll:n.noScroll,replace_state:n.replaceState,state:n.state,redirect_count:e,nav_token:a,accept:()=>{n.invalidateAll&&(lt=!0)}})}async function nn(t){if(t.id!==(I==null?void 0:I.id)){const n={};H.add(n),I={id:t.id,token:n,promise:xt({...t,preload:n}).then(e=>(H.delete(n),e.type==="loaded"&&e.state.error&&(I=null),e))}}return I.promise}async function yt(t){const n=ct.find(e=>e.exec(le(t)));n&&await Promise.all([...n.layouts,n.leaf].map(e=>e==null?void 0:e[1]()))}function ie(t,n,e){var o;y=t.state;const a=document.querySelector("style[data-sveltekit]");a&&a.remove(),S=t.props.page,N=new G.root({target:n,props:{...t.props,stores:x,components:at},hydrate:e}),se(L);const r={from:null,to:{params:y.params,route:{id:((o=y.route)==null?void 0:o.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};D.forEach(i=>i(r)),rt=!0}async function W({url:t,params:n,branch:e,status:a,error:r,route:o,form:i}){let s="never";if(P&&(t.pathname===P||t.pathname===P+"/"))s="always";else for(const d of e)(d==null?void 0:d.slash)!==void 0&&(s=d.slash);t.pathname=we(t.pathname,s),t.search=t.search;const c={type:"loaded",state:{url:t,params:n,branch:e,error:r,route:o},props:{constructors:Ye(e).map(d=>d.node.component),page:S}};i!==void 0&&(c.props.form=i);let l={},u=!S,h=0;for(let d=0;d<Math.max(e.length,y.branch.length);d+=1){const g=e[d],f=y.branch[d];(g==null?void 0:g.data)!==(f==null?void 0:f.data)&&(u=!0),g&&(l={...l,...g.data},u&&(c.props[`data_${h}`]=l),h+=1)}return(!y.url||t.href!==y.url.href||y.error!==r||i!==void 0&&i!==S.form||u)&&(c.props.page={error:r,params:n,route:{id:(o==null?void 0:o.id)??null},state:{},status:a,url:new URL(t),form:i??null,data:u?l:S.data}),c}async function Pt({loader:t,parent:n,url:e,params:a,route:r,server_data_node:o}){var u,h,p;let i=null,s=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},l=await t();if((u=l.universal)!=null&&u.load){let d=function(...f){for(const _ of f){const{href:b}=new URL(_,e);c.dependencies.add(b)}};const g={route:new Proxy(r,{get:(f,_)=>(s&&(c.route=!0),f[_])}),params:new Proxy(a,{get:(f,_)=>(s&&c.params.add(_),f[_])}),data:(o==null?void 0:o.data)??null,url:ke(e,()=>{s&&(c.url=!0)},f=>{s&&c.search_params.add(f)}),async fetch(f,_){let b;f instanceof Request?(b=f.url,_={body:f.method==="GET"||f.method==="HEAD"?void 0:await f.blob(),cache:f.cache,credentials:f.credentials,headers:f.headers,integrity:f.integrity,keepalive:f.keepalive,method:f.method,mode:f.mode,redirect:f.redirect,referrer:f.referrer,referrerPolicy:f.referrerPolicy,signal:f.signal,..._}):b=f;const R=new URL(b,e);return s&&d(R.href),R.origin===e.origin&&(b=R.href.slice(e.origin.length)),rt?Ue(b,R.href,_):Pe(b,_)},setHeaders:()=>{},depends:d,parent(){return s&&(c.parent=!0),n()},untrack(f){s=!1;try{return f()}finally{s=!0}}};i=await l.universal.load.call(null,g)??null}return{node:l,loader:t,server:o,universal:(h=l.universal)!=null&&h.load?{type:"data",data:i,uses:c}:null,data:i??(o==null?void 0:o.data)??null,slash:((p=l.universal)==null?void 0:p.trailingSlash)??(o==null?void 0:o.slash)}}function Ft(t,n,e,a,r,o){if(lt)return!0;if(!r)return!1;if(r.parent&&t||r.route&&n||r.url&&e)return!0;for(const i of r.search_params)if(a.has(i))return!0;for(const i of r.params)if(o[i]!==y.params[i])return!0;for(const i of r.dependencies)if(ee.some(s=>s(new URL(i))))return!0;return!1}function Ut(t,n){return(t==null?void 0:t.type)==="data"?t:(t==null?void 0:t.type)==="skip"?n??null:null}function an(t,n){if(!t)return new Set(n.searchParams.keys());const e=new Set([...t.searchParams.keys(),...n.searchParams.keys()]);for(const a of e){const r=t.searchParams.getAll(a),o=n.searchParams.getAll(a);r.every(i=>o.includes(i))&&o.every(i=>r.includes(i))&&e.delete(a)}return e}function qt({error:t,url:n,route:e,params:a}){return{type:"loaded",state:{error:t,url:n,route:e,params:a,branch:[]},props:{page:S,constructors:[]}}}async function xt({id:t,invalidating:n,url:e,params:a,route:r,preload:o}){if((I==null?void 0:I.id)===t)return H.delete(I.token),I.promise;const{errors:i,layouts:s,leaf:c}=r,l=[...s,c];i.forEach(m=>m==null?void 0:m().catch(()=>{})),l.forEach(m=>m==null?void 0:m[1]().catch(()=>{}));let u=null;const h=y.url?t!==y.url.pathname+y.url.search:!1,p=y.route?r.id!==y.route.id:!1,d=an(y.url,e);let g=!1;const f=l.map((m,v)=>{var T;const E=y.branch[v],k=!!(m!=null&&m[0])&&((E==null?void 0:E.loader)!==m[1]||Ft(g,p,h,d,(T=E.server)==null?void 0:T.uses,a));return k&&(g=!0),k});if(f.some(Boolean)){try{u=await de(e,f)}catch(m){const v=await V(m,{url:e,params:a,route:{id:t}});return H.has(o)?qt({error:v,url:e,params:a,route:r}):ut({status:et(m),error:v,url:e,route:r})}if(u.type==="redirect")return u}const _=u==null?void 0:u.nodes;let b=!1;const R=l.map(async(m,v)=>{var ht;if(!m)return;const E=y.branch[v],k=_==null?void 0:_[v];if((!k||k.type==="skip")&&m[1]===(E==null?void 0:E.loader)&&!Ft(b,p,h,d,(ht=E.universal)==null?void 0:ht.uses,a))return E;if(b=!0,(k==null?void 0:k.type)==="error")throw k;return Pt({loader:m[1],url:e,params:a,route:r,parent:async()=>{var Nt;const Tt={};for(let pt=0;pt<v;pt+=1)Object.assign(Tt,(Nt=await R[pt])==null?void 0:Nt.data);return Tt},server_data_node:Ut(k===void 0&&m[0]?{type:"skip"}:k??null,m[0]?E==null?void 0:E.server:void 0)})});for(const m of R)m.catch(()=>{});const w=[];for(let m=0;m<l.length;m+=1)if(l[m])try{w.push(await R[m])}catch(v){if(v instanceof te)return{type:"redirect",location:v.location};if(H.has(o))return qt({error:await V(v,{params:a,url:e,route:{id:r.id}}),url:e,params:a,route:r});let E=et(v),k;if(_!=null&&_.includes(v))E=v.status??E,k=v.error;else if(v instanceof it)k=v.body;else{if(await x.updated.check())return await F(e);k=await V(v,{params:a,url:e,route:{id:r.id}})}const T=await ce(m,w,i);return T?await W({url:e,params:a,branch:w.slice(0,T.idx).concat(T.node),status:E,error:k,route:r}):await ue(e,{id:r.id},k,E)}else w.push(void 0);return await W({url:e,params:a,branch:w,status:200,error:null,route:r,form:n?void 0:null})}async function ce(t,n,e){for(;t--;)if(e[t]){let a=t;for(;!n[a];)a-=1;try{return{idx:a+1,node:{node:await e[t](),loader:e[t],data:{},server:null,universal:null}}}catch{continue}}}async function ut({status:t,error:n,url:e,route:a}){const r={};let o=null;if(G.server_loads[0]===0)try{const l=await de(e,[!0]);if(l.type!=="data"||l.nodes[0]&&l.nodes[0].type!=="data")throw 0;o=l.nodes[0]??null}catch{(e.origin!==X||e.pathname!==location.pathname||Lt)&&await F(e)}const s=await Pt({loader:bt,url:e,params:r,route:a,parent:()=>Promise.resolve({}),server_data_node:Ut(o)}),c={node:await nt(),loader:nt,universal:null,server:null,data:null};return await W({url:e,params:r,branch:[s,c],status:t,error:n,route:null})}function dt(t,n){if(!t||st(t,P))return;let e;try{e=G.hooks.reroute({url:new URL(t)})??t.pathname}catch{return}const a=le(e);for(const r of ct){const o=r.exec(a);if(o)return{id:t.pathname+t.search,invalidating:n,route:r,params:be(o),url:t}}}function le(t){return ve(t.slice(P.length)||"/")}function fe({url:t,type:n,intent:e,delta:a}){let r=!1;const o=pe(y,e,t,n);a!==void 0&&(o.navigation.delta=a);const i={...o.navigation,cancel:()=>{r=!0,o.reject(new Error("navigation cancelled"))}};return Y||ne.forEach(s=>s(i)),r?null:o}async function Z({type:t,url:n,popped:e,keepfocus:a,noscroll:r,replace_state:o,state:i={},redirect_count:s=0,nav_token:c={},accept:l=Dt,block:u=Dt}){const h=dt(n,!1),p=fe({url:n,type:t,delta:e==null?void 0:e.delta,intent:h});if(!p){u();return}const d=A,g=L;l(),Y=!0,rt&&x.navigating.set(p.navigation),q=c;let f=h&&await xt(h);if(!f){if(st(n,P))return await F(n);f=await ue(n,{id:null},await V(new Rt(404,"Not Found",`Not found: ${n.pathname}`),{url:n,params:{},route:{id:null}}),404)}if(n=(h==null?void 0:h.url)||n,q!==c)return p.reject(new Error("navigation aborted")),!1;if(f.type==="redirect")if(s>=20)f=await ut({status:500,error:await V(new Error("Redirect loop"),{url:n,params:{},route:{id:null}}),url:n,route:{id:null}});else return ft(new URL(f.location,n).href,{},s+1,c),!1;else f.props.page.status>=400&&await x.updated.check()&&await F(n);if(re(),It(d),oe(g),f.props.page.url.pathname!==n.pathname&&(n.pathname=f.props.page.url.pathname),i=e?e.state:i,!e){const w=o?0:1,m={[C]:A+=w,[J]:L+=w,[Kt]:i};(o?history.replaceState:history.pushState).call(history,m,"",n),o||Qe(A,L)}if(I=null,f.props.page.state=i,rt){y=f.state,f.props.page&&(f.props.page.url=n);const w=(await Promise.all(tn.map(m=>m(p.navigation)))).filter(m=>typeof m=="function");if(w.length>0){let m=function(){D=D.filter(v=>!w.includes(v))};w.push(m),D.push(...w)}N.$set(f.props),ae=!0}else ie(f,Et,!1);const{activeElement:_}=document;await wt();const b=e?e.scroll:r?St():null;if(Ct){const w=n.hash&&document.getElementById(decodeURIComponent(n.hash.slice(1)));b?scrollTo(b.x,b.y):w?w.scrollIntoView():scrollTo(0,0)}const R=document.activeElement!==_&&document.activeElement!==document.body;!a&&!R&&kt(),Ct=!0,f.props.page&&(S=f.props.page),Y=!1,t==="popstate"&&se(L),p.fulfil(void 0),D.forEach(w=>w(p.navigation)),x.navigating.set(null)}async function ue(t,n,e,a){return t.origin===X&&t.pathname===location.pathname&&!Lt?await ut({status:a,error:e,url:t,route:n}):await F(t)}function rn(){let t;U.addEventListener("mousemove",o=>{const i=o.target;clearTimeout(t),t=setTimeout(()=>{a(i,2)},20)});function n(o){a(o.composedPath()[0],1)}U.addEventListener("mousedown",n),U.addEventListener("touchstart",n,{passive:!0});const e=new IntersectionObserver(o=>{for(const i of o)i.isIntersecting&&(yt(i.target.href),e.unobserve(i.target))},{threshold:0});function a(o,i){const s=Xt(o,U);if(!s)return;const{url:c,external:l,download:u}=vt(s,P);if(l||u)return;const h=tt(s);if(!h.reload)if(i<=h.preload_data){const p=dt(c,!1);p&&nn(p)}else i<=h.preload_code&&yt(c.pathname)}function r(){e.disconnect();for(const o of U.querySelectorAll("a")){const{url:i,external:s,download:c}=vt(o,P);if(s||c)continue;const l=tt(o);l.reload||(l.preload_code===Q.viewport&&e.observe(o),l.preload_code===Q.eager&&yt(i.pathname))}}D.push(r),r()}function V(t,n){if(t instanceof it)return t.body;const e=et(t),a=Ze(t);return G.hooks.handleError({error:t,event:n,status:e,message:a})??{message:a}}function on(t,n={}){return t=Yt(t),t.origin!==X?Promise.reject(new Error("goto: invalid URL")):ft(t,n,0)}function hn(){return lt=!0,en()}async function pn(t){if(t.type==="error"){const n=new URL(location.href),{branch:e,route:a}=y;if(!a)return;const r=await ce(y.branch.length,e,a.errors);if(r){const o=await W({url:n,params:y.params,branch:e.slice(0,r.idx).concat(r.node),status:t.status??500,error:t.error,route:a});y=o.state,N.$set(o.props),wt().then(kt)}}else t.type==="redirect"?ft(t.location,{invalidateAll:!0},0):(N.$set({form:null,page:{...S,form:t.data,status:t.status}}),await wt(),N.$set({form:t.data}),t.type==="success"&&kt())}function sn(){var n;history.scrollRestoration="manual",addEventListener("beforeunload",e=>{let a=!1;if(Vt(),!Y){const r=pe(y,void 0,null,"leave"),o={...r.navigation,cancel:()=>{a=!0,r.reject(new Error("navigation cancelled"))}};ne.forEach(i=>i(o))}a?(e.preventDefault(),e.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Vt()}),(n=navigator.connection)!=null&&n.saveData||rn(),U.addEventListener("click",e=>{var p;if(e.button||e.which!==1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.defaultPrevented)return;const a=Xt(e.composedPath()[0],U);if(!a)return;const{url:r,external:o,target:i,download:s}=vt(a,P);if(!r)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const c=tt(a);if(!(a instanceof SVGAElement)&&r.protocol!==location.protocol&&!(r.protocol==="https:"||r.protocol==="http:")||s)return;if(o||c.reload){fe({url:r,type:"link"})?Y=!0:e.preventDefault();return}const[u,h]=r.href.split("#");if(h!==void 0&&u===gt(location)){const[,d]=y.url.href.split("#");if(d===h){e.preventDefault(),h===""||h==="top"&&a.ownerDocument.getElementById("top")===null?window.scrollTo({top:0}):(p=a.ownerDocument.getElementById(h))==null||p.scrollIntoView();return}if(M=!0,It(A),t(r),!c.replace_state)return;M=!1}e.preventDefault(),Z({type:"link",url:r,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??r.href===location.href})}),U.addEventListener("submit",e=>{if(e.defaultPrevented)return;const a=HTMLFormElement.prototype.cloneNode.call(e.target),r=e.submitter;if(((r==null?void 0:r.formMethod)||a.method)!=="get")return;const i=new URL((r==null?void 0:r.hasAttribute("formaction"))&&(r==null?void 0:r.formAction)||a.action);if(st(i,P))return;const s=e.target,c=tt(s);if(c.reload)return;e.preventDefault(),e.stopPropagation();const l=new FormData(s),u=r==null?void 0:r.getAttribute("name");u&&l.append(u,(r==null?void 0:r.getAttribute("value"))??""),i.search=new URLSearchParams(l).toString(),Z({type:"form",url:i,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??i.href===location.href})}),addEventListener("popstate",async e=>{var a;if((a=e.state)!=null&&a[C]){const r=e.state[C];if(q={},r===A)return;const o=O[r],i=e.state[Kt]??{},s=new URL(e.state[Fe]??location.href),c=e.state[J],l=gt(location)===gt(y.url);if(c===L&&(ae||l)){t(s),O[A]=St(),o&&scrollTo(o.x,o.y),i!==S.state&&(S={...S,state:i},N.$set({page:S})),A=r;return}const h=r-A;await Z({type:"popstate",url:s,popped:{state:i,scroll:o,delta:h},accept:()=>{A=r,L=c},block:()=>{history.go(-h)},nav_token:q})}else if(!M){const r=new URL(location.href);t(r)}}),addEventListener("hashchange",()=>{M&&(M=!1,history.replaceState({...history.state,[C]:++A,[J]:L},"",location.href))});for(const e of document.querySelectorAll("link"))e.rel==="icon"&&(e.href=e.href);addEventListener("pageshow",e=>{e.persisted&&x.navigating.set(null)});function t(e){y.url=e,x.page.set({...S,url:e}),x.page.notify()}}async function cn(t,{status:n=200,error:e,node_ids:a,params:r,route:o,data:i,form:s}){Lt=!0;const c=new URL(location.href);({params:r={},route:o={id:null}}=dt(c,!1)||{});let l;try{const u=a.map(async(d,g)=>{const f=i[g];return f!=null&&f.uses&&(f.uses=he(f.uses)),Pt({loader:G.nodes[d],url:c,params:r,route:o,parent:async()=>{const _={};for(let b=0;b<g;b+=1)Object.assign(_,(await u[b]).data);return _},server_data_node:Ut(f)})}),h=await Promise.all(u),p=ct.find(({id:d})=>d===o.id);if(p){const d=p.layouts;for(let g=0;g<d.length;g++)d[g]||h.splice(g,0,void 0)}l=await W({url:c,params:r,branch:h,status:n,error:e,form:s,route:p??null})}catch(u){if(u instanceof te){await F(new URL(u.location,location.href));return}l=await ut({status:et(u),error:await V(u,{url:c,params:r,route:o}),url:c,route:o})}l.props.page&&(l.props.page.state={}),ie(l,t,!0)}async function de(t,n){var r;const e=new URL(t);e.pathname=Re(t.pathname),t.pathname.endsWith("/")&&e.searchParams.append(Xe,"1"),e.searchParams.append(We,n.map(o=>o?"1":"0").join(""));const a=await zt(e.href);if(!a.ok){let o;throw(r=a.headers.get("content-type"))!=null&&r.includes("application/json")?o=await a.json():a.status===404?o="Not Found":a.status===500&&(o="Internal Error"),new it(a.status,o)}return new Promise(async o=>{var h;const i=new Map,s=a.body.getReader(),c=new TextDecoder;function l(p){return Zt(p,{Promise:d=>new Promise((g,f)=>{i.set(d,{fulfil:g,reject:f})})})}let u="";for(;;){const{done:p,value:d}=await s.read();if(p&&!u)break;for(u+=!d&&u?`
`:c.decode(d,{stream:!0});;){const g=u.indexOf(`
`);if(g===-1)break;const f=JSON.parse(u.slice(0,g));if(u=u.slice(g+1),f.type==="redirect")return o(f);if(f.type==="data")(h=f.nodes)==null||h.forEach(_=>{(_==null?void 0:_.type)==="data"&&(_.uses=he(_.uses),_.data=l(_.data))}),o(f);else if(f.type==="chunk"){const{id:_,data:b,error:R}=f,w=i.get(_);i.delete(_),R?w.reject(l(R)):w.fulfil(l(b))}}}})}function he(t){return{dependencies:new Set((t==null?void 0:t.dependencies)??[]),params:new Set((t==null?void 0:t.params)??[]),parent:!!(t!=null&&t.parent),route:!!(t!=null&&t.route),url:!!(t!=null&&t.url),search_params:new Set((t==null?void 0:t.search_params)??[])}}function kt(){const t=document.querySelector("[autofocus]");if(t)t.focus();else{const n=document.body,e=n.getAttribute("tabindex");n.tabIndex=-1,n.focus({preventScroll:!0,focusVisible:!1}),e!==null?n.setAttribute("tabindex",e):n.removeAttribute("tabindex");const a=getSelection();if(a&&a.type!=="None"){const r=[];for(let o=0;o<a.rangeCount;o+=1)r.push(a.getRangeAt(o));setTimeout(()=>{if(a.rangeCount===r.length){for(let o=0;o<a.rangeCount;o+=1){const i=r[o],s=a.getRangeAt(o);if(i.commonAncestorContainer!==s.commonAncestorContainer||i.startContainer!==s.startContainer||i.endContainer!==s.endContainer||i.startOffset!==s.startOffset||i.endOffset!==s.endOffset)return}a.removeAllRanges()}})}}}function pe(t,n,e,a){var c,l;let r,o;const i=new Promise((u,h)=>{r=u,o=h});return i.catch(()=>{}),{navigation:{from:{params:t.params,route:{id:((c=t.route)==null?void 0:c.id)??null},url:t.url},to:e&&{params:(n==null?void 0:n.params)??null,route:{id:((l=n==null?void 0:n.route)==null?void 0:l.id)??null},url:e},willUnload:!n,type:a,complete:i},fulfil:r,reject:o}}export{pn as a,dn as b,fn as d,hn as i,un as p,De as r,x as s,ot as w};
