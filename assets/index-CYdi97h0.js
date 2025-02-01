(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const Is=Symbol("solid-proxy"),Fn=typeof Proxy=="function";let Vr=Ur;const Ae=1,Ui=2,Nr={owned:null,cleanups:null,context:null,owner:null};var yt=null;let fs=null,Bn=null,te=null,Mt=null,le=null,Ji=0;function Vn(t,e){const i=te,s=yt,o=t.length===0,r=e===void 0?s:e,n=o?Nr:{owned:null,cleanups:null,context:r?r.context:null,owner:r},l=o?t:()=>t(()=>vi(()=>pi(n)));yt=n,te=null;try{return ts(l,!0)}finally{te=i,yt=s}}function Fe(t,e,i){const s=Hr(t,e,!1,Ae);Xs(s)}function Nn(t,e,i){Vr=Wn;const s=Hr(t,e,!1,Ae);s.user=!0,le?le.push(s):Xs(s)}function vi(t){if(te===null)return t();const e=te;te=null;try{return t()}finally{te=e}}function St(){return yt}function Hn(t,e,i){let s=t.value;return(!t.comparator||!t.comparator(s,e))&&(t.value=e,t.observers&&t.observers.length&&ts(()=>{for(let o=0;o<t.observers.length;o+=1){const r=t.observers[o],n=fs&&fs.running;n&&fs.disposed.has(r),(n?!r.tState:!r.state)&&(r.pure?Mt.push(r):le.push(r),r.observers&&jr(r)),n||(r.state=Ae)}if(Mt.length>1e6)throw Mt=[],new Error},!1)),e}function Xs(t){if(!t.fn)return;pi(t);const e=Ji;Un(t,t.value,e)}function Un(t,e,i){let s;const o=yt,r=te;te=yt=t;try{s=t.fn(e)}catch(n){return t.pure&&(t.state=Ae,t.owned&&t.owned.forEach(pi),t.owned=null),t.updatedAt=i+1,Wr(n)}finally{te=r,yt=o}(!t.updatedAt||t.updatedAt<=i)&&(t.updatedAt!=null&&"observers"in t?Hn(t,s):t.value=s,t.updatedAt=i)}function Hr(t,e,i,s=Ae,o){const r={fn:t,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:yt,context:yt?yt.context:null,pure:i};return yt===null||yt!==Nr&&(yt.owned?yt.owned.push(r):yt.owned=[r]),r}function ji(t){if(t.state===0)return;if(t.state===Ui)return Ms(t);if(t.suspense&&vi(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<Ji);)t.state&&e.push(t);for(let i=e.length-1;i>=0;i--)if(t=e[i],t.state===Ae)Xs(t);else if(t.state===Ui){const s=Mt;Mt=null,ts(()=>Ms(t,e[0]),!1),Mt=s}}function ts(t,e){if(Mt)return t();let i=!1;e||(Mt=[]),le?i=!0:le=[],Ji++;try{const s=t();return jn(i),s}catch(s){i||(le=null),Mt=null,Wr(s)}}function jn(t){if(Mt&&(Ur(Mt),Mt=null),t)return;const e=le;le=null,e.length&&ts(()=>Vr(e),!1)}function Ur(t){for(let e=0;e<t.length;e++)ji(t[e])}function Wn(t){let e,i=0;for(e=0;e<t.length;e++){const s=t[e];s.user?t[i++]=s:ji(s)}for(e=0;e<i;e++)ji(t[e])}function Ms(t,e){t.state=0;for(let i=0;i<t.sources.length;i+=1){const s=t.sources[i];if(s.sources){const o=s.state;o===Ae?s!==e&&(!s.updatedAt||s.updatedAt<Ji)&&ji(s):o===Ui&&Ms(s,e)}}}function jr(t){for(let e=0;e<t.observers.length;e+=1){const i=t.observers[e];i.state||(i.state=Ui,i.pure?Mt.push(i):le.push(i),i.observers&&jr(i))}}function pi(t){let e;if(t.sources)for(;t.sources.length;){const i=t.sources.pop(),s=t.sourceSlots.pop(),o=i.observers;if(o&&o.length){const r=o.pop(),n=i.observerSlots.pop();s<o.length&&(r.sourceSlots[n]=s,o[s]=r,i.observerSlots[s]=n)}}if(t.tOwned){for(e=t.tOwned.length-1;e>=0;e--)pi(t.tOwned[e]);delete t.tOwned}if(t.owned){for(e=t.owned.length-1;e>=0;e--)pi(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0}function qn(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function Wr(t,e=yt){throw qn(t)}function U(t,e){return vi(()=>t(e||{}))}function Ti(){return!0}const Ko={get(t,e,i){return e===Is?i:t.get(e)},has(t,e){return e===Is?!0:t.has(e)},set:Ti,deleteProperty:Ti,getOwnPropertyDescriptor(t,e){return{configurable:!0,enumerable:!0,get(){return t.get(e)},set:Ti,deleteProperty:Ti}},ownKeys(t){return t.keys()}};function Kn(t,...e){if(Fn&&Is in t){const o=new Set(e.length>1?e.flat():e[0]),r=e.map(n=>new Proxy({get(l){return n.includes(l)?t[l]:void 0},has(l){return n.includes(l)&&l in t},keys(){return n.filter(l=>l in t)}},Ko));return r.push(new Proxy({get(n){return o.has(n)?void 0:t[n]},has(n){return o.has(n)?!1:n in t},keys(){return Object.keys(t).filter(n=>!o.has(n))}},Ko)),r}const i={},s=e.map(()=>({}));for(const o of Object.getOwnPropertyNames(t)){const r=Object.getOwnPropertyDescriptor(t,o),n=!r.get&&!r.set&&r.enumerable&&r.writable&&r.configurable;let l=!1,c=0;for(const u of e)u.includes(o)&&(l=!0,n?s[c][o]=r.value:Object.defineProperty(s[c],o,r)),++c;l||(n?i[o]=r.value:Object.defineProperty(i,o,r))}return[...s,i]}const Yn=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Xn=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Yn]),Gn=new Set(["innerHTML","textContent","innerText","children"]),Qn=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Zn=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Jn(t,e){const i=Zn[t];return typeof i=="object"?i[e]?i.$:void 0:i}const tl=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),el=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),il={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function sl(t,e,i){let s=i.length,o=e.length,r=s,n=0,l=0,c=e[o-1].nextSibling,u=null;for(;n<o||l<r;){if(e[n]===i[l]){n++,l++;continue}for(;e[o-1]===i[r-1];)o--,r--;if(o===n){const f=r<s?l?i[l-1].nextSibling:i[r-l]:c;for(;l<r;)t.insertBefore(i[l++],f)}else if(r===l)for(;n<o;)(!u||!u.has(e[n]))&&e[n].remove(),n++;else if(e[n]===i[r-1]&&i[l]===e[o-1]){const f=e[--o].nextSibling;t.insertBefore(i[l++],e[n++].nextSibling),t.insertBefore(i[--r],f),e[o]=i[r]}else{if(!u){u=new Map;let h=l;for(;h<r;)u.set(i[h],h++)}const f=u.get(e[n]);if(f!=null)if(l<f&&f<r){let h=n,p=1,m;for(;++h<o&&h<r&&!((m=u.get(e[h]))==null||m!==f+p);)p++;if(p>f-l){const g=e[n];for(;l<f;)t.insertBefore(i[l++],g)}else t.replaceChild(i[l++],e[n++])}else n++;else e[n++].remove()}}}const Yo="_$DX_DELEGATE";function ol(t,e,i,s={}){let o;return Vn(r=>{o=r,e===document?t():j(e,t(),e.firstChild?null:void 0,i)},s.owner),()=>{o(),e.textContent=""}}function rl(t,e,i){let s;const o=()=>{const n=document.createElement("template");return n.innerHTML=t,n.content.firstChild},r=()=>vi(()=>document.importNode(s||(s=o()),!0));return r.cloneNode=r,r}function al(t,e=window.document){const i=e[Yo]||(e[Yo]=new Set);for(let s=0,o=t.length;s<o;s++){const r=t[s];i.has(r)||(i.add(r),e.addEventListener(r,bl))}}function Os(t,e,i){i==null?t.removeAttribute(e):t.setAttribute(e,i)}function nl(t,e,i,s){s==null?t.removeAttributeNS(e,i):t.setAttributeNS(e,i,s)}function ll(t,e,i){i?t.setAttribute(e,""):t.removeAttribute(e)}function cl(t,e){e==null?t.removeAttribute("class"):t.className=e}function dl(t,e,i,s){if(s)Array.isArray(i)?(t[`$$${e}`]=i[0],t[`$$${e}Data`]=i[1]):t[`$$${e}`]=i;else if(Array.isArray(i)){const o=i[0];t.addEventListener(e,i[0]=r=>o.call(t,i[1],r))}else t.addEventListener(e,i,typeof i!="function"&&i)}function hl(t,e,i={}){const s=Object.keys(e||{}),o=Object.keys(i);let r,n;for(r=0,n=o.length;r<n;r++){const l=o[r];!l||l==="undefined"||e[l]||(Xo(t,l,!1),delete i[l])}for(r=0,n=s.length;r<n;r++){const l=s[r],c=!!e[l];!l||l==="undefined"||i[l]===c||!c||(Xo(t,l,!0),i[l]=c)}return i}function ul(t,e,i){if(!e)return i?Os(t,"style"):e;const s=t.style;if(typeof e=="string")return s.cssText=e;typeof i=="string"&&(s.cssText=i=void 0),i||(i={}),e||(e={});let o,r;for(r in i)e[r]==null&&s.removeProperty(r),delete i[r];for(r in e)o=e[r],o!==i[r]&&(s.setProperty(r,o),i[r]=o);return i}function pl(t,e={},i,s){const o={};return s||Fe(()=>o.children=Ve(t,e.children,o.children)),Fe(()=>typeof e.ref=="function"&&ml(e.ref,t)),Fe(()=>qr(t,e,i,!0,o,!0)),o}function fl(t,e){const i=t[e];return Object.defineProperty(t,e,{get(){return i()},enumerable:!0}),t}function ml(t,e,i){return vi(()=>t(e,i))}function j(t,e,i,s){if(i!==void 0&&!s&&(s=[]),typeof e!="function")return Ve(t,e,s,i);Fe(o=>Ve(t,e(),o,i),s)}function qr(t,e,i,s,o={},r=!1){e||(e={});for(const n in o)if(!(n in e)){if(n==="children")continue;o[n]=Go(t,n,null,o[n],i,r,e)}for(const n in e){if(n==="children"){s||Ve(t,e.children);continue}const l=e[n];o[n]=Go(t,n,l,o[n],i,r,e)}}function gl(t){return t.toLowerCase().replace(/-([a-z])/g,(e,i)=>i.toUpperCase())}function Xo(t,e,i){const s=e.trim().split(/\s+/);for(let o=0,r=s.length;o<r;o++)t.classList.toggle(s[o],i)}function Go(t,e,i,s,o,r,n){let l,c,u,f,h;if(e==="style")return ul(t,i,s);if(e==="classList")return hl(t,i,s);if(i===s)return s;if(e==="ref")r||i(t);else if(e.slice(0,3)==="on:"){const p=e.slice(3);s&&t.removeEventListener(p,s,typeof s!="function"&&s),i&&t.addEventListener(p,i,typeof i!="function"&&i)}else if(e.slice(0,10)==="oncapture:"){const p=e.slice(10);s&&t.removeEventListener(p,s,!0),i&&t.addEventListener(p,i,!0)}else if(e.slice(0,2)==="on"){const p=e.slice(2).toLowerCase(),m=tl.has(p);if(!m&&s){const g=Array.isArray(s)?s[0]:s;t.removeEventListener(p,g)}(m||i)&&(dl(t,p,i,m),m&&al([p]))}else if(e.slice(0,5)==="attr:")Os(t,e.slice(5),i);else if(e.slice(0,5)==="bool:")ll(t,e.slice(5),i);else if((h=e.slice(0,5)==="prop:")||(u=Gn.has(e))||!o&&((f=Jn(e,t.tagName))||(c=Xn.has(e)))||(l=t.nodeName.includes("-")||"is"in n))h&&(e=e.slice(5),c=!0),e==="class"||e==="className"?cl(t,i):l&&!c&&!u?t[gl(e)]=i:t[f||e]=i;else{const p=o&&e.indexOf(":")>-1&&il[e.split(":")[0]];p?nl(t,p,e,i):Os(t,Qn[e]||e,i)}return i}function bl(t){let e=t.target;const i=`$$${t.type}`,s=t.target,o=t.currentTarget,r=c=>Object.defineProperty(t,"target",{configurable:!0,value:c}),n=()=>{const c=e[i];if(c&&!e.disabled){const u=e[`${i}Data`];if(u!==void 0?c.call(e,u,t):c.call(e,t),t.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(t.target)&&r(e.host),!0},l=()=>{for(;n()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return e||document}}),t.composedPath){const c=t.composedPath();r(c[0]);for(let u=0;u<c.length-2&&(e=c[u],!!n());u++){if(e._$host){e=e._$host,l();break}if(e.parentNode===o)break}}else l();r(s)}function Ve(t,e,i,s,o){for(;typeof i=="function";)i=i();if(e===i)return i;const r=typeof e,n=s!==void 0;if(t=n&&i[0]&&i[0].parentNode||t,r==="string"||r==="number"){if(r==="number"&&(e=e.toString(),e===i))return i;if(n){let l=i[0];l&&l.nodeType===3?l.data!==e&&(l.data=e):l=document.createTextNode(e),i=Le(t,i,s,l)}else i!==""&&typeof i=="string"?i=t.firstChild.data=e:i=t.textContent=e}else if(e==null||r==="boolean")i=Le(t,i,s);else{if(r==="function")return Fe(()=>{let l=e();for(;typeof l=="function";)l=l();i=Ve(t,l,i,s)}),()=>i;if(Array.isArray(e)){const l=[],c=i&&Array.isArray(i);if(Ls(l,e,i,o))return Fe(()=>i=Ve(t,l,i,s,!0)),()=>i;if(l.length===0){if(i=Le(t,i,s),n)return i}else c?i.length===0?Qo(t,l,s):sl(t,i,l):(i&&Le(t),Qo(t,l));i=l}else if(e.nodeType){if(Array.isArray(i)){if(n)return i=Le(t,i,s,e);Le(t,i,null,e)}else i==null||i===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);i=e}}return i}function Ls(t,e,i,s){let o=!1;for(let r=0,n=e.length;r<n;r++){let l=e[r],c=i&&i[t.length],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)t.push(l);else if(Array.isArray(l))o=Ls(t,l,c)||o;else if(u==="function")if(s){for(;typeof l=="function";)l=l();o=Ls(t,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||o}else t.push(l),o=!0;else{const f=String(l);c&&c.nodeType===3&&c.data===f?t.push(c):t.push(document.createTextNode(f))}}return o}function Qo(t,e,i=null){for(let s=0,o=e.length;s<o;s++)t.insertBefore(e[s],i)}function Le(t,e,i,s){if(i===void 0)return t.textContent="";const o=s||document.createTextNode("");if(e.length){let r=!1;for(let n=e.length-1;n>=0;n--){const l=e[n];if(o!==l){const c=l.parentNode===t;!r&&!n?c?t.replaceChild(o,l):t.insertBefore(o,i):c&&l.remove()}else r=!0}}else t.insertBefore(o,i);return[o]}/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const vl={outline:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},filled:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"}},Ii=Symbol("hyper-element");function yl(t){function e(){let i=[].slice.call(arguments),s,o=[],r=!1;for(;Array.isArray(i[0]);)i=i[0];i[0][Ii]&&i.unshift(e.Fragment),typeof i[0]=="string"&&u(i);const n=()=>{for(;i.length;)l(i.shift());return s instanceof Element&&o.length&&s.classList.add(...o),s};return n[Ii]=!0,n;function l(f){const h=typeof f;if(f!=null){if(h==="string")s?s.appendChild(document.createTextNode(f)):c(f);else if(h==="number"||h==="boolean"||h==="bigint"||h==="symbol"||f instanceof Date||f instanceof RegExp)s.appendChild(document.createTextNode(f.toString()));else if(Array.isArray(f))for(let p=0;p<f.length;p++)l(f[p]);else if(f instanceof Element)t.insert(s,f,r?null:void 0);else if(h==="object"){let p=!1;const m=Object.getOwnPropertyDescriptors(f);for(const g in m){if(g==="class"&&o.length!==0){const b=o.join(" "),_=typeof m.class.value=="function"?()=>b+" "+m.class.value():b+" "+f.class;Object.defineProperty(f,"class",{...m[g],value:_}),o=[]}g!=="ref"&&g.slice(0,2)!=="on"&&typeof m[g].value=="function"?(t.dynamicProperty(f,g),p=!0):m[g].get&&(p=!0)}p?t.spread(s,f,s instanceof SVGElement,!!i.length):t.assign(s,f,s instanceof SVGElement,!!i.length)}else if(h==="function")if(s){for(;f[Ii];)f=f();t.insert(s,f,r?null:void 0)}else{let p,m=i[0];(m==null||typeof m=="object"&&!Array.isArray(m)&&!(m instanceof Element))&&(p=i.shift()),p||(p={}),i.length&&(p.children=i.length>1?i:i[0]);const g=Object.getOwnPropertyDescriptors(p);for(const b in g)if(Array.isArray(g[b].value)){const _=g[b].value;p[b]=()=>{for(let C=0;C<_.length;C++)for(;_[C][Ii];)_[C]=_[C]();return _},t.dynamicProperty(p,b)}else typeof g[b].value=="function"&&!g[b].value.length&&t.dynamicProperty(p,b);s=t.createComponent(f,p),i=[]}}}function c(f){const h=f.split(/([\.#]?[^\s#.]+)/);/^\.|#/.test(h[1])&&(s=document.createElement("div"));for(let p=0;p<h.length;p++){const m=h[p],g=m.substring(1,m.length);m&&(s?m[0]==="."?o.push(g):m[0]==="#"&&s.setAttribute("id",g):s=t.SVGElements.has(m)?document.createElementNS("http://www.w3.org/2000/svg",m):document.createElement(m))}}function u(f){for(let h=1;h<f.length;h++)if(typeof f[h]=="function"){r=!0;return}else Array.isArray(f[h])&&u(f[h])}}return e.Fragment=i=>i.children,e}const ms=yl({spread:pl,assign:qr,insert:j,createComponent:U,dynamicProperty:fl,SVGElements:el});/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=(t,e,i,s)=>{const o=r=>{const[n,l]=Kn(r,["color","size","stroke","title","children","class"]),c=vl[t],u={...c,width:()=>n.size!=null?n.size:c.width,height:()=>n.size!=null?n.size:c.height,title:()=>n.title!=null?n.title:void 0,...t==="filled"?{fill:()=>n.color!=null?n.color:"currentColor"}:{stroke:()=>n.color!=null?n.color:"currentColor","stroke-width":()=>n.stroke!=null?n.stroke:c["stroke-width"]},class:()=>`tabler-icon tabler-icon-${e} ${n.class!=null?n.class:""}`};return ms("svg",[u,l],[n.title&&ms("title",{},n.title),...s.map(([f,h])=>ms(f,h)),n.children])};return o.displayName=`${i}`,o};/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var _l=lt("outline","api-app","IconApiApp",[["path",{d:"M12 15h-6.5a2.5 2.5 0 1 1 0 -5h.5"}],["path",{d:"M15 12v6.5a2.5 2.5 0 1 1 -5 0v-.5"}],["path",{d:"M12 9h6.5a2.5 2.5 0 1 1 0 5h-.5"}],["path",{d:"M9 12v-6.5a2.5 2.5 0 0 1 5 0v.5"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var wl=lt("outline","brackets-angle","IconBracketsAngle",[["path",{d:"M8 4l-5 8l5 8"}],["path",{d:"M16 4l5 8l-5 8"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var xl=lt("outline","brand-codesandbox","IconBrandCodesandbox",[["path",{d:"M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z"}],["path",{d:"M12 12l4 -2.25l4 -2.25"}],["path",{d:"M12 12l0 9"}],["path",{d:"M12 12l-4 -2.25l-4 -2.25"}],["path",{d:"M20 12l-4 2v4.75"}],["path",{d:"M4 12l4 2l0 4.75"}],["path",{d:"M8 5.25l4 2.25l4 -2.25"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var kl=lt("outline","brand-docker","IconBrandDocker",[["path",{d:"M22 12.54c-1.804 -.345 -2.701 -1.08 -3.523 -2.94c-.487 .696 -1.102 1.568 -.92 2.4c.028 .238 -.32 1 -.557 1h-14c0 5.208 3.164 7 6.196 7c4.124 .022 7.828 -1.376 9.854 -5c1.146 -.101 2.296 -1.505 2.95 -2.46z"}],["path",{d:"M5 10h3v3h-3z"}],["path",{d:"M8 10h3v3h-3z"}],["path",{d:"M11 10h3v3h-3z"}],["path",{d:"M8 7h3v3h-3z"}],["path",{d:"M11 7h3v3h-3z"}],["path",{d:"M11 4h3v3h-3z"}],["path",{d:"M4.571 18c1.5 0 2.047 -.074 2.958 -.78"}],["path",{d:"M10 16l0 .01"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Cl=lt("outline","brand-github","IconBrandGithub",[["path",{d:"M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var $l=lt("outline","brand-telegram","IconBrandTelegram",[["path",{d:"M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Zo=lt("outline","brand-terraform","IconBrandTerraform",[["path",{d:"M15 15.5l-11.476 -6.216a1 1 0 0 1 -.524 -.88v-4.054a1.35 1.35 0 0 1 2.03 -1.166l9.97 5.816v10.65a1.35 1.35 0 0 1 -2.03 1.166l-3.474 -2.027a1 1 0 0 1 -.496 -.863v-11.926"}],["path",{d:"M15 15.5l5.504 -3.21a1 1 0 0 0 .496 -.864v-3.576a1.35 1.35 0 0 0 -2.03 -1.166l-3.97 2.316"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Sl=lt("outline","chart-dots","IconChartDots",[["path",{d:"M3 3v18h18"}],["path",{d:"M9 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}],["path",{d:"M19 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}],["path",{d:"M14 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}],["path",{d:"M10.16 10.62l2.34 2.88"}],["path",{d:"M15.088 13.328l2.837 -4.586"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var zl=lt("outline","christmas-tree","IconChristmasTree",[["path",{d:"M12 3l4 4l-2 1l4 4l-3 1l4 4h-14l4 -4l-3 -1l4 -4l-2 -1z"}],["path",{d:"M14 17v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-3"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Al=lt("outline","clock-hour-4","IconClockHour4",[["path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"}],["path",{d:"M12 12l3 2"}],["path",{d:"M12 7v5"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var El=lt("outline","cloud-lock","IconCloudLock",[["path",{d:"M19 18a3.5 3.5 0 0 0 0 -7h-1c.397 -1.768 -.285 -3.593 -1.788 -4.787c-1.503 -1.193 -3.6 -1.575 -5.5 -1s-3.315 2.019 -3.712 3.787c-2.199 -.088 -4.155 1.326 -4.666 3.373c-.512 2.047 .564 4.154 2.566 5.027"}],["path",{d:"M8 15m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"}],["path",{d:"M10 15v-2a2 2 0 1 1 4 0v2"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Tl=lt("outline","dice-3","IconDice3",[["path",{d:"M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"}],["circle",{cx:"8.5",cy:"8.5",r:".5",fill:"currentColor"}],["circle",{cx:"15.5",cy:"15.5",r:".5",fill:"currentColor"}],["circle",{cx:"12",cy:"12",r:".5",fill:"currentColor"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Il=lt("outline","discount","IconDiscount",[["path",{d:"M9 15l6 -6"}],["circle",{cx:"9.5",cy:"9.5",r:".5",fill:"currentColor"}],["circle",{cx:"14.5",cy:"14.5",r:".5",fill:"currentColor"}],["path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ml=lt("outline","file-invoice","IconFileInvoice",[["path",{d:"M14 3v4a1 1 0 0 0 1 1h4"}],["path",{d:"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"}],["path",{d:"M9 7l1 0"}],["path",{d:"M9 13l6 0"}],["path",{d:"M13 17l2 0"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ol=lt("outline","geometry","IconGeometry",[["path",{d:"M7 21l4 -12m2 0l1.48 4.439m.949 2.847l1.571 4.714"}],["path",{d:"M12 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}],["path",{d:"M4 12c1.526 2.955 4.588 5 8 5c3.41 0 6.473 -2.048 8 -5"}],["path",{d:"M12 5v-2"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ll=lt("outline","phone","IconPhone",[["path",{d:"M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Pl=lt("outline","stretching","IconStretching",[["path",{d:"M16 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"}],["path",{d:"M5 20l5 -.5l1 -2"}],["path",{d:"M18 20v-5h-5.5l2.5 -6.5l-5.5 1l1.5 2"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Jo=lt("outline","users","IconUsers",[["path",{d:"M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"}],["path",{d:"M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75"}],["path",{d:"M21 21v-2a4 4 0 0 0 -3 -3.85"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Dl=lt("outline","vector-spline","IconVectorSpline",[["path",{d:"M17 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"}],["path",{d:"M3 17m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"}],["path",{d:"M17 5c-6.627 0 -12 5.373 -12 12"}]]);/**
 * @license @tabler/icons-solidjs v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var ye=lt("filled","point-filled","IconPointFilled",[["path",{d:"M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"}]]);const Kr="http://www.w3.org/2000/svg";let Rl=class{constructor(e){this.seed=e}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}};function Ut(t,e,i,s,o){return{type:"path",ops:Wi(t,e,i,s,o)}}function Yr(t,e,i){const s=(t||[]).length;if(s>2){const o=[];for(let r=0;r<s-1;r++)o.push(...Wi(t[r][0],t[r][1],t[r+1][0],t[r+1][1],i));return e&&o.push(...Wi(t[s-1][0],t[s-1][1],t[0][0],t[0][1],i)),{type:"path",ops:o}}return s===2?Ut(t[0][0],t[0][1],t[1][0],t[1][1],i):{type:"path",ops:[]}}function Fl(t,e,i,s,o){return function(r,n){return Yr(r,!0,n)}([[t,e],[t+i,e],[t+i,e+s],[t,e+s]],o)}function tr(t,e,i,s,o){return function(r,n,l,c){const[u,f]=sr(c.increment,r,n,c.rx,c.ry,1,c.increment*Ps(.1,Ps(.4,1,l),l),l);let h=ir(u,null,l);if(!l.disableMultiStroke){const[p]=sr(c.increment,r,n,c.rx,c.ry,1.5,0,l),m=ir(p,null,l);h=h.concat(m)}return{estimatedPoints:f,opset:{type:"path",ops:h}}}(t,e,o,function(r,n,l){const c=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(r/2,2)+Math.pow(n/2,2))/2)),u=Math.max(l.curveStepCount,l.curveStepCount/Math.sqrt(200)*c),f=2*Math.PI/u;let h=Math.abs(r/2),p=Math.abs(n/2);const m=1-l.curveFitting;return h+=ct(h*m,l),p+=ct(p*m,l),{increment:f,rx:h,ry:p}}(i,s,o)).opset}function Xr(t){return t.randomizer||(t.randomizer=new Rl(t.seed||0)),t.randomizer.next()}function Ps(t,e,i,s=1){return i.roughness*s*(Xr(i)*(e-t)+t)}function ct(t,e,i=1){return Ps(-t,t,e,i)}function Wi(t,e,i,s,o,r=!1){const n=r?o.disableMultiStrokeFill:o.disableMultiStroke,l=er(t,e,i,s,o,!0,!1);if(n)return l;const c=er(t,e,i,s,o,!0,!0);return l.concat(c)}function er(t,e,i,s,o,r,n){const l=Math.pow(t-i,2)+Math.pow(e-s,2),c=Math.sqrt(l);let u=1;u=c<200?1:c>500?.4:-.0016668*c+1.233334;let f=o.maxRandomnessOffset||0;f*f*100>l&&(f=c/10);const h=f/2,p=.2+.2*Xr(o);let m=o.bowing*o.maxRandomnessOffset*(s-e)/200,g=o.bowing*o.maxRandomnessOffset*(t-i)/200;m=ct(m,o,u),g=ct(g,o,u);const b=[],_=()=>ct(h,o,u),C=()=>ct(f,o,u);return n?b.push({op:"move",data:[t+_(),e+_()]}):b.push({op:"move",data:[t+ct(f,o,u),e+ct(f,o,u)]}),n?b.push({op:"bcurveTo",data:[m+t+(i-t)*p+_(),g+e+(s-e)*p+_(),m+t+2*(i-t)*p+_(),g+e+2*(s-e)*p+_(),i+_(),s+_()]}):b.push({op:"bcurveTo",data:[m+t+(i-t)*p+C(),g+e+(s-e)*p+C(),m+t+2*(i-t)*p+C(),g+e+2*(s-e)*p+C(),i+C(),s+C()]}),b}function ir(t,e,i){const s=t.length,o=[];if(s>3){const r=[],n=1-i.curveTightness;o.push({op:"move",data:[t[1][0],t[1][1]]});for(let l=1;l+2<s;l++){const c=t[l];r[0]=[c[0],c[1]],r[1]=[c[0]+(n*t[l+1][0]-n*t[l-1][0])/6,c[1]+(n*t[l+1][1]-n*t[l-1][1])/6],r[2]=[t[l+1][0]+(n*t[l][0]-n*t[l+2][0])/6,t[l+1][1]+(n*t[l][1]-n*t[l+2][1])/6],r[3]=[t[l+1][0],t[l+1][1]],o.push({op:"bcurveTo",data:[r[1][0],r[1][1],r[2][0],r[2][1],r[3][0],r[3][1]]})}}else s===3?(o.push({op:"move",data:[t[1][0],t[1][1]]}),o.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):s===2&&o.push(...Wi(t[0][0],t[0][1],t[1][0],t[1][1],i));return o}function sr(t,e,i,s,o,r,n,l){const c=[],u=[],f=ct(.5,l)-Math.PI/2;u.push([ct(r,l)+e+.9*s*Math.cos(f-t),ct(r,l)+i+.9*o*Math.sin(f-t)]);for(let h=f;h<2*Math.PI+f-.01;h+=t){const p=[ct(r,l)+e+s*Math.cos(h),ct(r,l)+i+o*Math.sin(h)];c.push(p),u.push(p)}return u.push([ct(r,l)+e+s*Math.cos(f+2*Math.PI+.5*n),ct(r,l)+i+o*Math.sin(f+2*Math.PI+.5*n)]),u.push([ct(r,l)+e+.98*s*Math.cos(f+n),ct(r,l)+i+.98*o*Math.sin(f+n)]),u.push([ct(r,l)+e+.9*s*Math.cos(f+.5*n),ct(r,l)+i+.9*o*Math.sin(f+.5*n)]),[u,c]}function gs(t,e){return{maxRandomnessOffset:2,roughness:t==="highlight"?3:1.5,bowing:1,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,combineNestedSvgPaths:!1,disableMultiStroke:t!=="double",disableMultiStrokeFill:!1,seed:e}}function Bl(t,e,i,s,o,r){const n=[];let l=i.strokeWidth||2;const c=function(m){const g=m.padding;if(g||g===0){if(typeof g=="number")return[g,g,g,g];if(Array.isArray(g)){const b=g;if(b.length)switch(b.length){case 4:return[...b];case 1:return[b[0],b[0],b[0],b[0]];case 2:return[...b,...b];case 3:return[...b,b[1]];default:return[b[0],b[1],b[2],b[3]]}}}return[5,5,5,5]}(i),u=i.animate===void 0||!!i.animate,f=i.iterations||2,h=i.rtl?1:0,p=gs("single",r);switch(i.type){case"underline":{const m=e.y+e.h+c[2];for(let g=h;g<f+h;g++)g%2?n.push(Ut(e.x+e.w,m,e.x,m,p)):n.push(Ut(e.x,m,e.x+e.w,m,p));break}case"strike-through":{const m=e.y+e.h/2;for(let g=h;g<f+h;g++)g%2?n.push(Ut(e.x+e.w,m,e.x,m,p)):n.push(Ut(e.x,m,e.x+e.w,m,p));break}case"box":{const m=e.x-c[3],g=e.y-c[0],b=e.w+(c[1]+c[3]),_=e.h+(c[0]+c[2]);for(let C=0;C<f;C++)n.push(Fl(m,g,b,_,p));break}case"bracket":{const m=Array.isArray(i.brackets)?i.brackets:i.brackets?[i.brackets]:["right"],g=e.x-2*c[3],b=e.x+e.w+2*c[1],_=e.y-2*c[0],C=e.y+e.h+2*c[2];for(const w of m){let x;switch(w){case"bottom":x=[[g,e.y+e.h],[g,C],[b,C],[b,e.y+e.h]];break;case"top":x=[[g,e.y],[g,_],[b,_],[b,e.y]];break;case"left":x=[[e.x,_],[g,_],[g,C],[e.x,C]];break;case"right":x=[[e.x+e.w,_],[b,_],[b,C],[e.x+e.w,C]]}x&&n.push(Yr(x,!1,p))}break}case"crossed-off":{const m=e.x,g=e.y,b=m+e.w,_=g+e.h;for(let C=h;C<f+h;C++)C%2?n.push(Ut(b,_,m,g,p)):n.push(Ut(m,g,b,_,p));for(let C=h;C<f+h;C++)C%2?n.push(Ut(m,_,b,g,p)):n.push(Ut(b,g,m,_,p));break}case"circle":{const m=gs("double",r),g=e.w+(c[1]+c[3]),b=e.h+(c[0]+c[2]),_=e.x-c[3]+g/2,C=e.y-c[0]+b/2,w=Math.floor(f/2),x=f-2*w;for(let v=0;v<w;v++)n.push(tr(_,C,g,b,m));for(let v=0;v<x;v++)n.push(tr(_,C,g,b,p));break}case"highlight":{const m=gs("highlight",r);l=.95*e.h;const g=e.y+e.h/2;for(let b=h;b<f+h;b++)b%2?n.push(Ut(e.x+e.w,g,e.x,g,m)):n.push(Ut(e.x,g,e.x+e.w,g,m));break}}if(n.length){const m=function(w){const x=[];for(const v of w){let y="";for(const E of v.ops){const T=E.data;switch(E.op){case"move":y.trim()&&x.push(y.trim()),y=`M${T[0]} ${T[1]} `;break;case"bcurveTo":y+=`C${T[0]} ${T[1]}, ${T[2]} ${T[3]}, ${T[4]} ${T[5]} `;break;case"lineTo":y+=`L${T[0]} ${T[1]} `}}y.trim()&&x.push(y.trim())}return x}(n),g=[],b=[];let _=0;const C=(w,x,v)=>w.setAttribute(x,v);for(const w of m){const x=document.createElementNS(Kr,"path");if(C(x,"d",w),C(x,"fill","none"),C(x,"stroke",i.color||"currentColor"),C(x,"stroke-width",""+l),u){const v=x.getTotalLength();g.push(v),_+=v}t.appendChild(x),b.push(x)}if(u){let w=0;for(let x=0;x<b.length;x++){const v=b[x],y=g[x],E=_?o*(y/_):0,T=s+w,R=v.style;R.strokeDashoffset=""+y,R.strokeDasharray=""+y,R.animation=`rough-notation-dash ${E}ms ease-out ${T}ms forwards`,w+=E}}}}let Vl=class{constructor(e,i){this._state="unattached",this._resizing=!1,this._seed=Math.floor(Math.random()*2**31),this._lastSizes=[],this._animationDelay=0,this._resizeListener=()=>{this._resizing||(this._resizing=!0,setTimeout(()=>{this._resizing=!1,this._state==="showing"&&this.haveRectsChanged()&&this.show()},400))},this._e=e,this._config=JSON.parse(JSON.stringify(i)),this.attach()}get animate(){return this._config.animate}set animate(e){this._config.animate=e}get animationDuration(){return this._config.animationDuration}set animationDuration(e){this._config.animationDuration=e}get iterations(){return this._config.iterations}set iterations(e){this._config.iterations=e}get color(){return this._config.color}set color(e){this._config.color!==e&&(this._config.color=e,this.refresh())}get strokeWidth(){return this._config.strokeWidth}set strokeWidth(e){this._config.strokeWidth!==e&&(this._config.strokeWidth=e,this.refresh())}get padding(){return this._config.padding}set padding(e){this._config.padding!==e&&(this._config.padding=e,this.refresh())}attach(){if(this._state==="unattached"&&this._e.parentElement){(function(){if(!window.__rno_kf_s){const o=window.__rno_kf_s=document.createElement("style");o.textContent="@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }",document.head.appendChild(o)}})();const e=this._svg=document.createElementNS(Kr,"svg");e.setAttribute("class","rough-annotation");const i=e.style;i.position="absolute",i.top="0",i.left="0",i.overflow="visible",i.pointerEvents="none",i.width="100px",i.height="100px";const s=this._config.type==="highlight";if(this._e.insertAdjacentElement(s?"beforebegin":"afterend",e),this._state="not-showing",s){const o=window.getComputedStyle(this._e).position;(!o||o==="static")&&(this._e.style.position="relative")}this.attachListeners()}}detachListeners(){window.removeEventListener("resize",this._resizeListener),this._ro&&this._ro.unobserve(this._e)}attachListeners(){this.detachListeners(),window.addEventListener("resize",this._resizeListener,{passive:!0}),!this._ro&&"ResizeObserver"in window&&(this._ro=new window.ResizeObserver(e=>{for(const i of e)i.contentRect&&this._resizeListener()})),this._ro&&this._ro.observe(this._e)}haveRectsChanged(){if(this._lastSizes.length){const e=this.rects();if(e.length!==this._lastSizes.length)return!0;for(let i=0;i<e.length;i++)if(!this.isSameRect(e[i],this._lastSizes[i]))return!0}return!1}isSameRect(e,i){const s=(o,r)=>Math.round(o)===Math.round(r);return s(e.x,i.x)&&s(e.y,i.y)&&s(e.w,i.w)&&s(e.h,i.h)}isShowing(){return this._state!=="not-showing"}refresh(){this.isShowing()&&!this.pendingRefresh&&(this.pendingRefresh=Promise.resolve().then(()=>{this.isShowing()&&this.show(),delete this.pendingRefresh}))}show(){switch(this._state){case"unattached":break;case"showing":this.hide(),this._svg&&this.render(this._svg,!0);break;case"not-showing":this.attach(),this._svg&&this.render(this._svg,!1)}}hide(){if(this._svg)for(;this._svg.lastChild;)this._svg.removeChild(this._svg.lastChild);this._state="not-showing"}remove(){this._svg&&this._svg.parentElement&&this._svg.parentElement.removeChild(this._svg),this._svg=void 0,this._state="unattached",this.detachListeners()}render(e,i){let s=this._config;i&&(s=JSON.parse(JSON.stringify(this._config)),s.animate=!1);const o=this.rects();let r=0;o.forEach(c=>r+=c.w);const n=s.animationDuration||800;let l=0;for(let c=0;c<o.length;c++){const u=n*(o[c].w/r);Bl(e,o[c],s,l+this._animationDelay,u,this._seed),l+=u}this._lastSizes=o,this._state="showing"}rects(){const e=[];if(this._svg)if(this._config.multiline){const i=this._e.getClientRects();for(let s=0;s<i.length;s++)e.push(this.svgRect(this._svg,i[s]))}else e.push(this.svgRect(this._svg,this._e.getBoundingClientRect()));return e}svgRect(e,i){const s=e.getBoundingClientRect(),o=i;return{x:(o.x||o.left)-(s.x||s.left),y:(o.y||o.top)-(s.y||s.top),w:o.width,h:o.height}}};function or(t,e){return new Vl(t,e)}var Nl=rl('<div class=columns><div class="column auto has-background-light is-3"><div class=container><div class="has-text-centered m-6"><figure class="image is-256x256 is-inline-block"><img class=is-rounded src=/photo.jpg></figure></div><div class="mb-4 has-text-centered"><p class=is-size-3><emy>Контакты</emy></p></div><div><div class="is-flex is-align-items-center is-justify-content-center"><div style=height:32px;width:32px;></div><p>codewars.com/users/fu3fi</p></div><div class="is-flex is-align-items-center is-justify-content-center"><div style=height:32px;width:32px;></div><p>+7 980 006 98 23</p></div><div class="is-flex is-align-items-center is-justify-content-center"><div style=height:32px;width:32px;></div><p>github.com/fu3fi</p></div><div class="is-flex is-align-items-center is-justify-content-center"><div style=height:32px;width:32px;></div><p>@devangel36</p></div></div><div class="my-4 has-text-centered"><p class=is-size-3><emy>Компетенции</emy></p></div><div><div class="is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center"style=width:100%;><div class="is-flex mb-2"><p style=margin-left:5px;>Управление командой</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Стратегическое планирование</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Архитектура систем</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Внедрение DevOps</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Информационная безопасность</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Менторство</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Бюджетирование</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Контроль затрат</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Развитие продуктов и R&D</p></div></div></div><div class="my-4 has-text-centered"><p class=is-size-3><emy>Языки</emy></p></div><div class=mx-6><div class="is-flex is-justify-content-space-between is-align-items-center"style=width:100%;><p class=is-size-5>Русский</p><p>C1</p></div><sl-progress-bar value=100 label=language style=--indicator-color:#404654;--height:6px;></sl-progress-bar></div><div class="mx-6 mt-2"><div class="is-flex is-justify-content-space-between is-align-items-center"style=width:100%;><p class=is-size-5>Английский</p><p>B1</p></div><sl-progress-bar value=65 label=language style=--indicator-color:#404654;--height:6px;></sl-progress-bar></div><div class="my-4 has-text-centered"><p class=is-size-3><emy>Интересы</emy></p></div><div><div class="is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center"style=width:100%;><div class="is-flex mb-2"><p style=margin-left:5px;>R&D/Pet проекты</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Настольные игры</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Активный отдых</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Разработка</p></div><div class="is-flex mb-2"><p style=margin-left:5px;>Йога</p></div></div></div></div></div><div class="column is-9 m-4 pr-6"><p class=is-size-1>Мухин Александр</p><p class=is-size-3>Chief Technology Officer</p><p class=is-size-6>19.07.1999</p><sl-divider></sl-divider><div class=mb-4><p class=is-size-5>CTO с более чем 3 годами опыта управления DevOps-командами, обеспечения информационной безопасности и разработки технологических стратегий</p><p class=is-size-5>Специализируюсь на создании масштабируемых IT-решений, сочетающих бизнес-цели с потребностями рынка</p></div><div><div class=mb-4><p class=is-size-3><emy>Образование</emy></p></div><sl-divider></sl-divider><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2024-202X</emg></p></div><div><p class=is-size-6>Москва, Россия</p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"><div style=height:32px;><sl-spinner class=mt-2 style=--indicator-color:#0054FF;--track-color:#FFFFFF;></sl-spinner></div><sl-divider vertical style=height:64px;></sl-divider></div></div><div class="column is-8"><div><p class=is-size-5>МФТИ — Московский физико-технический институт</p></div><div><p class="is-size-6 mb-4">Физтех-школа бизнеса высоких технологий</p></div></div></div><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2024</emg></p></div><div><p class=is-size-6>Москва, Россия</p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"><sl-divider vertical style=height:64px;></sl-divider></div></div><div class="column is-8"><div><p class=is-size-5>СберУниверситет</p></div><div><p class="is-size-6 mb-4">Управление командами и продуктовая разработка</p></div></div></div><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2024</emg></p></div><div><p class=is-size-6>Москва, Россия</p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"><sl-divider vertical style=height:64px;></sl-divider></div></div><div class="column is-8"><div><p class=is-size-5>Центральная гоусдарственная медицинская академия</p></div><div><p class="is-size-6 mb-4">Практическая психология</p></div></div></div><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2017-2021</emg></p></div><div><p class=is-size-6>Питер, Россия</p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"><sl-divider vertical style=height:64px;></sl-divider></div></div><div class="column is-8"><div><p class=is-size-5>Университет ИТМО</p></div><div><p class="is-size-6 mb-4">Software Engineering</p></div></div></div><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2012 - 2017</emg></p></div><div><p class=is-size-6>Пенза, Россия</p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"></div></div><div class="column is-8"><div><p class=is-size-5>Губернский лицей</p></div><div><p class=is-size-6>Физико-математический класс</p></div></div></div></div><div class=my-4></div><div><div class=mb-4><p class=is-size-3><emy>Опыт</emy></p></div><sl-divider></sl-divider><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2021-202X</emg></p></div><div><p class=is-size-6></p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"><div style=height:32px;><sl-spinner class=mt-2 style=--indicator-color:#0054FF;--track-color:#FFFFFF;></sl-spinner></div><sl-divider vertical style=height:256px;></sl-divider></div></div><div class="column is-8"><div><p class=is-size-5>Chief Technology Officer</p></div><div><p class=is-size-6>Руководство командами от 7 до 20 человек. Контроль релизов, архитектуры и качества кода</p><div class="is-flex is-align-items-center"><div style=height:32px;width:32px;></div><p>Сократил время релизного цикла на 80% (с 2 недель до 8 часов)</p></div><div class="is-flex is-align-items-center"><div style=height:32px;width:32px;></div><p>Мигрировал систему на микросервисную архитектуру, обеспечив рост отказоустойчивости (uptime 99.9%)</p></div><div class="is-flex is-align-items-center"><div style=height:32px;width:32px;></div><p>Масштабировал команду с 7 до 20 человек</p></div></div><p class=is-size-6><emg>Стек</emg></p><p class="is-size-7 mb-4">Go, Python, TS, NodeJS, NATS, RabbitMQ, PostgreSQL, Redis, Neo4j, Nomad, Kubernetes, Docker Compose, Ansible, GitLab, AWS Lambda.. </p></div></div><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2022-2023</emg></p></div><div><p class=is-size-6></p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"><sl-divider vertical style=height:224px;></sl-divider></div></div><div class="column is-8"><div><p class=is-size-5>Head of Security (Blue Team)</p></div><div><p class=is-size-6>Возглавлял синюю команду отдела информационной безопасности (команда защиты информационной инфраструктуры и расследования внутренних инцидентов) </p><p class=is-size-6>Проводил настройку и мониторинг безопасности внутренних информационных систем систем</p><p class=is-size-6>Производил необходимые ииследования при возникновении инцидентов</p><p class=is-size-6><emg>Стек</emg></p><p class="is-size-7 mb-4">BloodHound, WireShark, Sysmon, Kibana, Logstash, chainsaw..</p></div></div></div><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2022-2023</emg></p></div><div><p class=is-size-6></p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"><sl-divider vertical style=height:224px;></sl-divider></div></div><div class="column is-8"><div><p class=is-size-5>Head of Security (RedTeam)</p></div><div><p class=is-size-6>Возглавлял красную команду отдела информационной безопасности (команда наступления при проверке безопасности информационных систем) </p><p class=is-size-6>Проводил аудит и пентест внутренних систем</p><p class=is-size-6>Руководил R&D-проектами, направленными на разработку инструментов наступления и анализа уязвимостей</p><p class=is-size-6><emg>Стек</emg></p><p class="is-size-7 mb-4">CME, NXC, Proxifier, winPEAS, lazagne, Inveigh, gowitness, Chisel..</p></div></div></div><div class=columns style=margin-bottom:0px;><div class="column is-3"><div><p class=is-size-5><emg>2019 - 2021</emg></p></div><div><p class=is-size-6></p></div></div><div class="column is-1 is-hidden-mobile"style=padding-bottom:0px;><div class="is-flex is-flex-direction-column is-align-items-center"></div></div><div class="column is-8"><div><p class=is-size-5>Частный преподаватель / Ментор</p></div><div><p class=is-size-6>Обучил более 20 студентов основам Go, Python, DevOps и безопасной разработки</p><p class=is-size-6>Менторство в области практической информационной безопасности</p><p class=is-size-6><emg>Стек</emg></p><p class="is-size-7 mb-4">Go, Python, PHP, SQL, TypeScript, JavaScript, React, SolidJS, TailwindCSS, Docker, k8s, VM..');function Hl(){return Nn(()=>{let t=document.querySelectorAll("emy");for(const e of t)or(e,{type:"circle",color:"#0054FF",iterations:1,multiline:!0}).show();t=document.querySelectorAll("emg");for(const e of t)or(e,{type:"highlight",color:"#00FFAB",iterations:1,multiline:!0}).show()}),(()=>{var t=Nl(),e=t.firstChild,i=e.firstChild,s=i.firstChild,o=s.nextSibling,r=o.nextSibling,n=r.firstChild,l=n.firstChild,c=l.nextSibling,u=n.nextSibling,f=u.firstChild,h=f.nextSibling,p=u.nextSibling,m=p.firstChild,g=m.nextSibling,b=p.nextSibling,_=b.firstChild,C=_.nextSibling,w=r.nextSibling,x=w.nextSibling,v=x.firstChild,y=v.firstChild,E=y.firstChild,T=y.nextSibling,R=T.firstChild,L=T.nextSibling,I=L.firstChild,Q=L.nextSibling,J=Q.firstChild,rt=Q.nextSibling,tt=rt.firstChild,xt=rt.nextSibling,Bt=xt.firstChild,$t=xt.nextSibling,Zt=$t.firstChild,Vt=$t.nextSibling,cs=Vt.firstChild,fo=Vt.nextSibling,Oa=fo.firstChild,La=x.nextSibling,mo=La.nextSibling,Pa=mo.firstChild,Da=Pa.nextSibling,go=mo.nextSibling,Ra=go.firstChild,Fa=Ra.nextSibling,Ba=go.nextSibling,Va=Ba.nextSibling,Na=Va.firstChild,ds=Na.firstChild,Ha=ds.firstChild,hs=ds.nextSibling,Ua=hs.firstChild,us=hs.nextSibling,ja=us.firstChild,ps=us.nextSibling,Wa=ps.firstChild,bo=ps.nextSibling,qa=bo.firstChild,Ka=e.nextSibling,Ya=Ka.firstChild,Xa=Ya.nextSibling,Ga=Xa.nextSibling,vo=Ga.nextSibling,Qa=vo.nextSibling,yo=Qa.nextSibling,Za=yo.firstChild,_o=Za.nextSibling,wo=_o.nextSibling,Ja=wo.firstChild,tn=Ja.nextSibling,en=tn.firstChild,xo=en.firstChild,sn=xo.firstChild,on=xo.nextSibling,ko=wo.nextSibling,rn=ko.firstChild,an=rn.nextSibling,Co=an.firstChild,$o=Co.firstChild,So=ko.nextSibling,nn=So.firstChild,ln=nn.nextSibling,zo=ln.firstChild,Ao=zo.firstChild,Eo=So.nextSibling,cn=Eo.firstChild,dn=cn.nextSibling,To=dn.firstChild,Io=To.firstChild,hn=Eo.nextSibling,un=hn.firstChild,pn=un.nextSibling,fn=pn.firstChild,mn=yo.nextSibling,gn=mn.nextSibling,bn=gn.firstChild,Mo=bn.nextSibling,Oo=Mo.nextSibling,vn=Oo.firstChild,Lo=vn.nextSibling,yn=Lo.firstChild,Po=yn.firstChild,_n=Po.firstChild,wn=Po.nextSibling,xn=Lo.nextSibling,kn=xn.firstChild,Cn=kn.nextSibling,$n=Cn.firstChild,Do=$n.nextSibling,Ro=Do.firstChild,Sn=Ro.nextSibling,Fo=Do.nextSibling,Bo=Fo.firstChild,zn=Bo.nextSibling,An=Fo.nextSibling,Vo=An.firstChild,En=Vo.nextSibling,No=Oo.nextSibling,Tn=No.firstChild,In=Tn.nextSibling,Ho=In.firstChild,Uo=Ho.firstChild,jo=No.nextSibling,Mn=jo.firstChild,On=Mn.nextSibling,Wo=On.firstChild,qo=Wo.firstChild,Ln=jo.nextSibling,Pn=Ln.firstChild,Dn=Pn.nextSibling,Rn=Dn.firstChild;return j(l,U(xl,{stroke:2,style:"margin-right: 10px; margin-top: 5px;"})),c.style.setProperty("margin","0"),j(f,U(Ll,{stroke:2,style:"margin-right: 10px; margin-top: 5px;"})),h.style.setProperty("margin","0"),j(m,U(Cl,{stroke:2,style:"margin-right: 10px; margin-top: 5px;"})),g.style.setProperty("margin","0"),j(_,U($l,{stroke:2,style:"margin-right: 10px; margin-top: 5px;"})),C.style.setProperty("margin","0"),j(y,U(Jo,{stroke:2}),E),j(T,U(Sl,{stroke:2}),R),j(L,U(Ol,{stroke:2}),I),j(Q,U(Zo,{stroke:2}),J),j(rt,U(El,{stroke:2}),tt),j(xt,U(Dl,{stroke:2}),Bt),j($t,U(Ml,{stroke:2}),Zt),j(Vt,U(Il,{stroke:2}),cs),j(fo,U(_l,{stroke:2}),Oa),Da._$owner=St(),Fa._$owner=St(),j(ds,U(kl,{stroke:2}),Ha),j(hs,U(Tl,{stroke:2}),Ua),j(us,U(zl,{stroke:2}),ja),j(ps,U(wl,{stroke:2}),Wa),j(bo,U(Pl,{stroke:2}),qa),vo._$owner=St(),_o._$owner=St(),sn._$owner=St(),on._$owner=St(),j(Co,U(ye,{size:32}),$o),$o._$owner=St(),j(zo,U(ye,{size:32}),Ao),Ao._$owner=St(),j(To,U(ye,{size:32}),Io),Io._$owner=St(),j(fn,U(ye,{size:32})),Mo._$owner=St(),_n._$owner=St(),wn._$owner=St(),j(Ro,U(Al,{stroke:2,style:"margin-right: 10px; margin-top: 5px;"})),Sn.style.setProperty("margin","0"),j(Bo,U(Zo,{stroke:2,style:"margin-right: 10px; margin-top: 5px;"})),zn.style.setProperty("margin","0"),j(Vo,U(Jo,{stroke:2,style:"margin-right: 10px; margin-top: 5px;"})),En.style.setProperty("margin","0"),j(Ho,U(ye,{size:32}),Uo),Uo._$owner=St(),j(Wo,U(ye,{size:32}),qo),qo._$owner=St(),j(Rn,U(ye,{size:32})),t})()}var Gr=Object.defineProperty,Ul=Object.defineProperties,jl=Object.getOwnPropertyDescriptor,Wl=Object.getOwnPropertyDescriptors,rr=Object.getOwnPropertySymbols,ql=Object.prototype.hasOwnProperty,Kl=Object.prototype.propertyIsEnumerable,bs=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Gs=t=>{throw TypeError(t)},ar=(t,e,i)=>e in t?Gr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,ce=(t,e)=>{for(var i in e||(e={}))ql.call(e,i)&&ar(t,i,e[i]);if(rr)for(var i of rr(e))Kl.call(e,i)&&ar(t,i,e[i]);return t},yi=(t,e)=>Ul(t,Wl(e)),a=(t,e,i,s)=>{for(var o=s>1?void 0:s?jl(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Gr(e,i,o),o},Qr=(t,e,i)=>e.has(t)||Gs("Cannot "+i),Yl=(t,e,i)=>(Qr(t,e,"read from private field"),e.get(t)),Xl=(t,e,i)=>e.has(t)?Gs("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Gl=(t,e,i,s)=>(Qr(t,e,"write to private field"),e.set(t,i),i),Ql=function(t,e){this[0]=t,this[1]=e},Zl=t=>{var e=t[bs("asyncIterator")],i=!1,s,o={};return e==null?(e=t[bs("iterator")](),s=r=>o[r]=n=>e[r](n)):(e=e.call(t),s=r=>o[r]=n=>{if(i){if(i=!1,r==="throw")throw n;return n}return i=!0,{done:!1,value:new Ql(new Promise(l=>{var c=e[r](n);c instanceof Object||Gs("Object expected"),l(c)}),1)}}),o[bs("iterator")]=()=>o,s("next"),"throw"in e?s("throw"):o.throw=r=>{throw r},"return"in e&&s("return"),o},Qe=new WeakMap,Ze=new WeakMap,Je=new WeakMap,vs=new WeakSet,Mi=new WeakMap,de=class{constructor(t,e){this.handleFormData=i=>{const s=this.options.disabled(this.host),o=this.options.name(this.host),r=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!s&&!n&&typeof o=="string"&&o.length>0&&typeof r<"u"&&(Array.isArray(r)?r.forEach(l=>{i.formData.append(o,l.toString())}):i.formData.append(o,r.toString()))},this.handleFormSubmit=i=>{var s;const o=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&((s=Qe.get(this.form))==null||s.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!o&&!r(this.host)&&(i.preventDefault(),i.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Mi.set(this.host,[])},this.handleInteraction=i=>{const s=Mi.get(this.host);s.includes(i.type)||s.push(i.type),s.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const s of i)if(typeof s.checkValidity=="function"&&!s.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const s of i)if(typeof s.reportValidity=="function"&&!s.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=ce({form:i=>{const s=i.form;if(s){const r=i.getRootNode().querySelector(`#${s}`);if(r)return r}return i.closest("form")},name:i=>i.name,value:i=>i.value,defaultValue:i=>i.defaultValue,disabled:i=>{var s;return(s=i.disabled)!=null?s:!1},reportValidity:i=>typeof i.reportValidity=="function"?i.reportValidity():!0,checkValidity:i=>typeof i.checkValidity=="function"?i.checkValidity():!0,setValue:(i,s)=>i.value=s,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),Mi.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Mi.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,Qe.has(this.form)?Qe.get(this.form).add(this.host):Qe.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Ze.has(this.form)||(Ze.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Je.has(this.form)||(Je.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=Qe.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Ze.has(this.form)&&(this.form.reportValidity=Ze.get(this.form),Ze.delete(this.form)),Je.has(this.form)&&(this.form.checkValidity=Je.get(this.form),Je.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?vs.add(t):vs.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const i=document.createElement("button");i.type=t,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",e&&(i.name=e.name,i.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(s=>{e.hasAttribute(s)&&i.setAttribute(s,e.getAttribute(s))})),this.form.append(i),i.click(),i.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,i=!!vs.has(e),s=!!e.required;e.toggleAttribute("data-required",s),e.toggleAttribute("data-optional",!s),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&i),e.toggleAttribute("data-user-valid",t&&i)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t==null||t.preventDefault()}},es=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),Jl=Object.freeze(yi(ce({},es),{valid:!1,valueMissing:!0})),tc=Object.freeze(yi(ce({},es),{valid:!1,customError:!0}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bi=globalThis,Qs=Bi.ShadowRoot&&(Bi.ShadyCSS===void 0||Bi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zs=Symbol(),nr=new WeakMap;let Zr=class{constructor(e,i,s){if(this._$cssResult$=!0,s!==Zs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(Qs&&e===void 0){const s=i!==void 0&&i.length===1;s&&(e=nr.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&nr.set(i,e))}return e}toString(){return this.cssText}};const ec=t=>new Zr(typeof t=="string"?t:t+"",void 0,Zs),M=(t,...e)=>{const i=t.length===1?t[0]:e.reduce((s,o,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[r+1],t[0]);return new Zr(i,t,Zs)},ic=(t,e)=>{if(Qs)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const s=document.createElement("style"),o=Bi.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}},lr=Qs?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const s of e.cssRules)i+=s.cssText;return ec(i)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:sc,defineProperty:oc,getOwnPropertyDescriptor:rc,getOwnPropertyNames:ac,getOwnPropertySymbols:nc,getPrototypeOf:lc}=Object,pe=globalThis,cr=pe.trustedTypes,cc=cr?cr.emptyScript:"",ys=pe.reactiveElementPolyfillSupport,oi=(t,e)=>t,Ne={toAttribute(t,e){switch(e){case Boolean:t=t?cc:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},Js=(t,e)=>!sc(t,e),dr={attribute:!0,type:String,converter:Ne,reflect:!1,hasChanged:Js};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),pe.litPropertyMetadata??(pe.litPropertyMetadata=new WeakMap);class De extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=dr){if(i.state&&(i.attribute=!1),this._$Ei(),this.elementProperties.set(e,i),!i.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,i);o!==void 0&&oc(this.prototype,e,o)}}static getPropertyDescriptor(e,i,s){const{get:o,set:r}=rc(this.prototype,e)??{get(){return this[i]},set(n){this[i]=n}};return{get(){return o==null?void 0:o.call(this)},set(n){const l=o==null?void 0:o.call(this);r.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??dr}static _$Ei(){if(this.hasOwnProperty(oi("elementProperties")))return;const e=lc(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(oi("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oi("properties"))){const i=this.properties,s=[...ac(i),...nc(i)];for(const o of s)this.createProperty(o,i[o])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[s,o]of i)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const o=this._$Eu(i,s);o!==void 0&&this._$Eh.set(o,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const o of s)i.unshift(lr(o))}else e!==void 0&&i.push(lr(e));return i}static _$Eu(e,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(i=>i(this))}addController(e){var i;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var i;(i=this._$EO)==null||i.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ic(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostConnected)==null?void 0:s.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostDisconnected)==null?void 0:s.call(i)})}attributeChangedCallback(e,i,s){this._$AK(e,s)}_$EC(e,i){var r;const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(o!==void 0&&s.reflect===!0){const n=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:Ne).toAttribute(i,s.type);this._$Em=e,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,i){var r;const s=this.constructor,o=s._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const n=s.getPropertyOptions(o),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((r=n.converter)==null?void 0:r.fromAttribute)!==void 0?n.converter:Ne;this._$Em=o,this[o]=l.fromAttribute(i,n.type),this._$Em=null}}requestUpdate(e,i,s){if(e!==void 0){if(s??(s=this.constructor.getPropertyOptions(e)),!(s.hasChanged??Js)(this[e],i))return;this.P(e,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,i,s){this._$AL.has(e)||this._$AL.set(e,i),s.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,n]of o)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],n)}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(s=this._$EO)==null||s.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(i)):this._$EU()}catch(o){throw e=!1,this._$EU(),o}e&&this._$AE(i)}willUpdate(e){}_$AE(e){var i;(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdated)==null?void 0:o.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(i=>this._$EC(i,this[i]))),this._$EU()}updated(e){}firstUpdated(e){}}De.elementStyles=[],De.shadowRootOptions={mode:"open"},De[oi("elementProperties")]=new Map,De[oi("finalized")]=new Map,ys==null||ys({ReactiveElement:De}),(pe.reactiveElementVersions??(pe.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ri=globalThis,qi=ri.trustedTypes,hr=qi?qi.createPolicy("lit-html",{createHTML:t=>t}):void 0,Jr="$lit$",he=`lit$${Math.random().toFixed(9).slice(2)}$`,ta="?"+he,dc=`<${ta}>`,Ce=document,fi=()=>Ce.createComment(""),mi=t=>t===null||typeof t!="object"&&typeof t!="function",to=Array.isArray,hc=t=>to(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",_s=`[ 	
\f\r]`,ti=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ur=/-->/g,pr=/>/g,_e=RegExp(`>|${_s}(?:([^\\s"'>=/]+)(${_s}*=${_s}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fr=/'/g,mr=/"/g,ea=/^(?:script|style|textarea|title)$/i,uc=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),k=uc(1),It=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),gr=new WeakMap,xe=Ce.createTreeWalker(Ce,129);function ia(t,e){if(!to(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return hr!==void 0?hr.createHTML(e):e}const pc=(t,e)=>{const i=t.length-1,s=[];let o,r=e===2?"<svg>":e===3?"<math>":"",n=ti;for(let l=0;l<i;l++){const c=t[l];let u,f,h=-1,p=0;for(;p<c.length&&(n.lastIndex=p,f=n.exec(c),f!==null);)p=n.lastIndex,n===ti?f[1]==="!--"?n=ur:f[1]!==void 0?n=pr:f[2]!==void 0?(ea.test(f[2])&&(o=RegExp("</"+f[2],"g")),n=_e):f[3]!==void 0&&(n=_e):n===_e?f[0]===">"?(n=o??ti,h=-1):f[1]===void 0?h=-2:(h=n.lastIndex-f[2].length,u=f[1],n=f[3]===void 0?_e:f[3]==='"'?mr:fr):n===mr||n===fr?n=_e:n===ur||n===pr?n=ti:(n=_e,o=void 0);const m=n===_e&&t[l+1].startsWith("/>")?" ":"";r+=n===ti?c+dc:h>=0?(s.push(u),c.slice(0,h)+Jr+c.slice(h)+he+m):c+he+(h===-2?l:m)}return[ia(t,r+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class gi{constructor({strings:e,_$litType$:i},s){let o;this.parts=[];let r=0,n=0;const l=e.length-1,c=this.parts,[u,f]=pc(e,i);if(this.el=gi.createElement(u,s),xe.currentNode=this.el.content,i===2||i===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=xe.nextNode())!==null&&c.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(Jr)){const p=f[n++],m=o.getAttribute(h).split(he),g=/([.?@])?(.*)/.exec(p);c.push({type:1,index:r,name:g[2],strings:m,ctor:g[1]==="."?mc:g[1]==="?"?gc:g[1]==="@"?bc:is}),o.removeAttribute(h)}else h.startsWith(he)&&(c.push({type:6,index:r}),o.removeAttribute(h));if(ea.test(o.tagName)){const h=o.textContent.split(he),p=h.length-1;if(p>0){o.textContent=qi?qi.emptyScript:"";for(let m=0;m<p;m++)o.append(h[m],fi()),xe.nextNode(),c.push({type:2,index:++r});o.append(h[p],fi())}}}else if(o.nodeType===8)if(o.data===ta)c.push({type:2,index:r});else{let h=-1;for(;(h=o.data.indexOf(he,h+1))!==-1;)c.push({type:7,index:r}),h+=he.length-1}r++}}static createElement(e,i){const s=Ce.createElement("template");return s.innerHTML=e,s}}function He(t,e,i=t,s){var n,l;if(e===It)return e;let o=s!==void 0?(n=i._$Co)==null?void 0:n[s]:i._$Cl;const r=mi(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==r&&((l=o==null?void 0:o._$AO)==null||l.call(o,!1),r===void 0?o=void 0:(o=new r(t),o._$AT(t,i,s)),s!==void 0?(i._$Co??(i._$Co=[]))[s]=o:i._$Cl=o),o!==void 0&&(e=He(t,o._$AS(t,e.values),o,s)),e}class fc{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:s}=this._$AD,o=((e==null?void 0:e.creationScope)??Ce).importNode(i,!0);xe.currentNode=o;let r=xe.nextNode(),n=0,l=0,c=s[0];for(;c!==void 0;){if(n===c.index){let u;c.type===2?u=new _i(r,r.nextSibling,this,e):c.type===1?u=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(u=new vc(r,this,e)),this._$AV.push(u),c=s[++l]}n!==(c==null?void 0:c.index)&&(r=xe.nextNode(),n++)}return xe.currentNode=Ce,o}p(e){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,i),i+=s.strings.length-2):s._$AI(e[i])),i++}}class _i{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,s,o){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=s,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=He(this,e,i),mi(e)?e===X||e==null||e===""?(this._$AH!==X&&this._$AR(),this._$AH=X):e!==this._$AH&&e!==It&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):hc(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==X&&mi(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ce.createTextNode(e)),this._$AH=e}$(e){var r;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=gi.createElement(ia(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(i);else{const n=new fc(o,this),l=n.u(this.options);n.p(i),this.T(l),this._$AH=n}}_$AC(e){let i=gr.get(e.strings);return i===void 0&&gr.set(e.strings,i=new gi(e)),i}k(e){to(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const r of e)o===i.length?i.push(s=new _i(this.O(fi()),this.O(fi()),this,this.options)):s=i[o],s._$AI(r),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(e=this._$AA.nextSibling,i){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,i);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}}class is{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,s,o,r){this.type=1,this._$AH=X,this._$AN=void 0,this.element=e,this.name=i,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=X}_$AI(e,i=this,s,o){const r=this.strings;let n=!1;if(r===void 0)e=He(this,e,i,0),n=!mi(e)||e!==this._$AH&&e!==It,n&&(this._$AH=e);else{const l=e;let c,u;for(e=r[0],c=0;c<r.length-1;c++)u=He(this,l[s+c],i,c),u===It&&(u=this._$AH[c]),n||(n=!mi(u)||u!==this._$AH[c]),u===X?e=X:e!==X&&(e+=(u??"")+r[c+1]),this._$AH[c]=u}n&&!o&&this.j(e)}j(e){e===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let mc=class extends is{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===X?void 0:e}};class gc extends is{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==X)}}class bc extends is{constructor(e,i,s,o,r){super(e,i,s,o,r),this.type=5}_$AI(e,i=this){if((e=He(this,e,i,0)??X)===It)return;const s=this._$AH,o=e===X&&s!==X||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==X&&(s===X||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,e):this._$AH.handleEvent(e)}}class vc{constructor(e,i,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){He(this,e)}}const ws=ri.litHtmlPolyfillSupport;ws==null||ws(gi,_i),(ri.litHtmlVersions??(ri.litHtmlVersions=[])).push("3.2.1");const yc=(t,e,i)=>{const s=(i==null?void 0:i.renderBefore)??e;let o=s._$litPart$;if(o===void 0){const r=(i==null?void 0:i.renderBefore)??null;s._$litPart$=o=new _i(e.insertBefore(fi(),r),r,void 0,i??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ai=class extends De{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const e=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=e.firstChild),e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=yc(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return It}};var Br;ai._$litElement$=!0,ai.finalized=!0,(Br=globalThis.litElementHydrateSupport)==null||Br.call(globalThis,{LitElement:ai});const xs=globalThis.litElementPolyfillSupport;xs==null||xs({LitElement:ai});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");var _c=M`
  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,D=M`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wc={attribute:!0,type:String,converter:Ne,reflect:!1,hasChanged:Js},xc=(t=wc,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),r.set(i.name,t),s==="accessor"){const{name:n}=i;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,c,t)},init(l){return l!==void 0&&this.P(n,void 0,t),l}}}if(s==="setter"){const{name:n}=i;return function(l){const c=this[n];e.call(this,l),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+s)};function d(t){return(e,i)=>typeof i=="object"?xc(t,e,i):((s,o,r)=>{const n=o.hasOwnProperty(r);return o.constructor.createProperty(r,n?{...s,wrapped:!0}:s),n?Object.getOwnPropertyDescriptor(o,r):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function O(t){return d({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function wi(t){return(e,i)=>{const s=typeof e=="function"?e:e[i];Object.assign(s,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const sa=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(t,e){return(i,s,o)=>{const r=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(t))??null};return sa(i,s,{get(){return r(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function kc(t){return(e,i)=>sa(e,i,{async get(){var s;return await this.updateComplete,((s=this.renderRoot)==null?void 0:s.querySelector(t))??null}})}var Vi,A=class extends ai{constructor(){super(),Xl(this,Vi,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const i=new CustomEvent(t,ce({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(i),i}static define(t,e=this,i={}){const s=customElements.get(t);if(!s){try{customElements.define(t,e,i)}catch{customElements.define(t,class extends e{},i)}return}let o=" (unknown version)",r=o;"version"in e&&e.version&&(o=" v"+e.version),"version"in s&&s.version&&(r=" v"+s.version),!(o&&r&&o===r)&&console.warn(`Attempted to register <${t}>${o}, but <${t}>${r} has already been registered.`)}attributeChangedCallback(t,e,i){Yl(this,Vi)||(this.constructor.elementProperties.forEach((s,o)=>{s.reflect&&this[o]!=null&&this.initialReflectedProperties.set(o,this[o])}),Gl(this,Vi,!0)),super.attributeChangedCallback(t,e,i)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&this[i]==null&&(this[i]=e)})}};Vi=new WeakMap;A.version="2.19.1";A.dependencies={};a([d()],A.prototype,"dir",2);a([d()],A.prototype,"lang",2);var eo=class extends A{render(){return k` <slot></slot> `}};eo.styles=[D,_c];eo.define("sl-visually-hidden");var Cc=M`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,$c=M`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const Ds=new Set,Re=new Map;let we,io="ltr",so="en";const oa=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(oa){const t=new MutationObserver(aa);io=document.documentElement.dir||"ltr",so=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function ra(...t){t.map(e=>{const i=e.$code.toLowerCase();Re.has(i)?Re.set(i,Object.assign(Object.assign({},Re.get(i)),e)):Re.set(i,e),we||(we=e)}),aa()}function aa(){oa&&(io=document.documentElement.dir||"ltr",so=document.documentElement.lang||navigator.language),[...Ds.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let Sc=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Ds.add(this.host)}hostDisconnected(){Ds.delete(this.host)}dir(){return`${this.host.dir||io}`.toLowerCase()}lang(){return`${this.host.lang||so}`.toLowerCase()}getTranslationData(e){var i,s;const o=new Intl.Locale(e.replace(/_/g,"-")),r=o==null?void 0:o.language.toLowerCase(),n=(s=(i=o==null?void 0:o.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&s!==void 0?s:"",l=Re.get(`${r}-${n}`),c=Re.get(r);return{locale:o,language:r,region:n,primary:l,secondary:c}}exists(e,i){var s;const{primary:o,secondary:r}=this.getTranslationData((s=i.lang)!==null&&s!==void 0?s:this.lang());return i=Object.assign({includeFallback:!1},i),!!(o&&o[e]||r&&r[e]||i.includeFallback&&we&&we[e])}term(e,...i){const{primary:s,secondary:o}=this.getTranslationData(this.lang());let r;if(s&&s[e])r=s[e];else if(o&&o[e])r=o[e];else if(we&&we[e])r=we[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof r=="function"?r(...i):r}date(e,i){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),i).format(e)}number(e,i){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),i).format(e)}relativeTime(e,i,s){return new Intl.RelativeTimeFormat(this.lang(),s).format(e,i)}};var na={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};ra(na);var zc=na,N=class extends Sc{};ra(zc);const fe=Math.min,Tt=Math.max,Ki=Math.round,Oi=Math.floor,ee=t=>({x:t,y:t}),Ac={left:"right",right:"left",bottom:"top",top:"bottom"},Ec={start:"end",end:"start"};function Rs(t,e,i){return Tt(t,fe(e,i))}function je(t,e){return typeof t=="function"?t(e):t}function me(t){return t.split("-")[0]}function We(t){return t.split("-")[1]}function la(t){return t==="x"?"y":"x"}function oo(t){return t==="y"?"height":"width"}function $e(t){return["top","bottom"].includes(me(t))?"y":"x"}function ro(t){return la($e(t))}function Tc(t,e,i){i===void 0&&(i=!1);const s=We(t),o=ro(t),r=oo(o);let n=o==="x"?s===(i?"end":"start")?"right":"left":s==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(n=Yi(n)),[n,Yi(n)]}function Ic(t){const e=Yi(t);return[Fs(t),e,Fs(e)]}function Fs(t){return t.replace(/start|end/g,e=>Ec[e])}function Mc(t,e,i){const s=["left","right"],o=["right","left"],r=["top","bottom"],n=["bottom","top"];switch(t){case"top":case"bottom":return i?e?o:s:e?s:o;case"left":case"right":return e?r:n;default:return[]}}function Oc(t,e,i,s){const o=We(t);let r=Mc(me(t),i==="start",s);return o&&(r=r.map(n=>n+"-"+o),e&&(r=r.concat(r.map(Fs)))),r}function Yi(t){return t.replace(/left|right|bottom|top/g,e=>Ac[e])}function Lc(t){return{top:0,right:0,bottom:0,left:0,...t}}function ca(t){return typeof t!="number"?Lc(t):{top:t,right:t,bottom:t,left:t}}function Xi(t){const{x:e,y:i,width:s,height:o}=t;return{width:s,height:o,top:i,left:e,right:e+s,bottom:i+o,x:e,y:i}}function br(t,e,i){let{reference:s,floating:o}=t;const r=$e(e),n=ro(e),l=oo(n),c=me(e),u=r==="y",f=s.x+s.width/2-o.width/2,h=s.y+s.height/2-o.height/2,p=s[l]/2-o[l]/2;let m;switch(c){case"top":m={x:f,y:s.y-o.height};break;case"bottom":m={x:f,y:s.y+s.height};break;case"right":m={x:s.x+s.width,y:h};break;case"left":m={x:s.x-o.width,y:h};break;default:m={x:s.x,y:s.y}}switch(We(e)){case"start":m[n]-=p*(i&&u?-1:1);break;case"end":m[n]+=p*(i&&u?-1:1);break}return m}const Pc=async(t,e,i)=>{const{placement:s="bottom",strategy:o="absolute",middleware:r=[],platform:n}=i,l=r.filter(Boolean),c=await(n.isRTL==null?void 0:n.isRTL(e));let u=await n.getElementRects({reference:t,floating:e,strategy:o}),{x:f,y:h}=br(u,s,c),p=s,m={},g=0;for(let b=0;b<l.length;b++){const{name:_,fn:C}=l[b],{x:w,y:x,data:v,reset:y}=await C({x:f,y:h,initialPlacement:s,placement:p,strategy:o,middlewareData:m,rects:u,platform:n,elements:{reference:t,floating:e}});f=w??f,h=x??h,m={...m,[_]:{...m[_],...v}},y&&g<=50&&(g++,typeof y=="object"&&(y.placement&&(p=y.placement),y.rects&&(u=y.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:o}):y.rects),{x:f,y:h}=br(u,p,c)),b=-1)}return{x:f,y:h,placement:p,strategy:o,middlewareData:m}};async function ao(t,e){var i;e===void 0&&(e={});const{x:s,y:o,platform:r,rects:n,elements:l,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:f="viewport",elementContext:h="floating",altBoundary:p=!1,padding:m=0}=je(e,t),g=ca(m),_=l[p?h==="floating"?"reference":"floating":h],C=Xi(await r.getClippingRect({element:(i=await(r.isElement==null?void 0:r.isElement(_)))==null||i?_:_.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(l.floating)),boundary:u,rootBoundary:f,strategy:c})),w=h==="floating"?{x:s,y:o,width:n.floating.width,height:n.floating.height}:n.reference,x=await(r.getOffsetParent==null?void 0:r.getOffsetParent(l.floating)),v=await(r.isElement==null?void 0:r.isElement(x))?await(r.getScale==null?void 0:r.getScale(x))||{x:1,y:1}:{x:1,y:1},y=Xi(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:w,offsetParent:x,strategy:c}):w);return{top:(C.top-y.top+g.top)/v.y,bottom:(y.bottom-C.bottom+g.bottom)/v.y,left:(C.left-y.left+g.left)/v.x,right:(y.right-C.right+g.right)/v.x}}const Dc=t=>({name:"arrow",options:t,async fn(e){const{x:i,y:s,placement:o,rects:r,platform:n,elements:l,middlewareData:c}=e,{element:u,padding:f=0}=je(t,e)||{};if(u==null)return{};const h=ca(f),p={x:i,y:s},m=ro(o),g=oo(m),b=await n.getDimensions(u),_=m==="y",C=_?"top":"left",w=_?"bottom":"right",x=_?"clientHeight":"clientWidth",v=r.reference[g]+r.reference[m]-p[m]-r.floating[g],y=p[m]-r.reference[m],E=await(n.getOffsetParent==null?void 0:n.getOffsetParent(u));let T=E?E[x]:0;(!T||!await(n.isElement==null?void 0:n.isElement(E)))&&(T=l.floating[x]||r.floating[g]);const R=v/2-y/2,L=T/2-b[g]/2-1,I=fe(h[C],L),Q=fe(h[w],L),J=I,rt=T-b[g]-Q,tt=T/2-b[g]/2+R,xt=Rs(J,tt,rt),Bt=!c.arrow&&We(o)!=null&&tt!==xt&&r.reference[g]/2-(tt<J?I:Q)-b[g]/2<0,$t=Bt?tt<J?tt-J:tt-rt:0;return{[m]:p[m]+$t,data:{[m]:xt,centerOffset:tt-xt-$t,...Bt&&{alignmentOffset:$t}},reset:Bt}}}),Rc=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var i,s;const{placement:o,middlewareData:r,rects:n,initialPlacement:l,platform:c,elements:u}=e,{mainAxis:f=!0,crossAxis:h=!0,fallbackPlacements:p,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:b=!0,..._}=je(t,e);if((i=r.arrow)!=null&&i.alignmentOffset)return{};const C=me(o),w=$e(l),x=me(l)===l,v=await(c.isRTL==null?void 0:c.isRTL(u.floating)),y=p||(x||!b?[Yi(l)]:Ic(l)),E=g!=="none";!p&&E&&y.push(...Oc(l,b,g,v));const T=[l,...y],R=await ao(e,_),L=[];let I=((s=r.flip)==null?void 0:s.overflows)||[];if(f&&L.push(R[C]),h){const tt=Tc(o,n,v);L.push(R[tt[0]],R[tt[1]])}if(I=[...I,{placement:o,overflows:L}],!L.every(tt=>tt<=0)){var Q,J;const tt=(((Q=r.flip)==null?void 0:Q.index)||0)+1,xt=T[tt];if(xt)return{data:{index:tt,overflows:I},reset:{placement:xt}};let Bt=(J=I.filter($t=>$t.overflows[0]<=0).sort(($t,Zt)=>$t.overflows[1]-Zt.overflows[1])[0])==null?void 0:J.placement;if(!Bt)switch(m){case"bestFit":{var rt;const $t=(rt=I.filter(Zt=>{if(E){const Vt=$e(Zt.placement);return Vt===w||Vt==="y"}return!0}).map(Zt=>[Zt.placement,Zt.overflows.filter(Vt=>Vt>0).reduce((Vt,cs)=>Vt+cs,0)]).sort((Zt,Vt)=>Zt[1]-Vt[1])[0])==null?void 0:rt[0];$t&&(Bt=$t);break}case"initialPlacement":Bt=l;break}if(o!==Bt)return{reset:{placement:Bt}}}return{}}}};async function Fc(t,e){const{placement:i,platform:s,elements:o}=t,r=await(s.isRTL==null?void 0:s.isRTL(o.floating)),n=me(i),l=We(i),c=$e(i)==="y",u=["left","top"].includes(n)?-1:1,f=r&&c?-1:1,h=je(e,t);let{mainAxis:p,crossAxis:m,alignmentAxis:g}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:h.mainAxis||0,crossAxis:h.crossAxis||0,alignmentAxis:h.alignmentAxis};return l&&typeof g=="number"&&(m=l==="end"?g*-1:g),c?{x:m*f,y:p*u}:{x:p*u,y:m*f}}const Bc=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var i,s;const{x:o,y:r,placement:n,middlewareData:l}=e,c=await Fc(e,t);return n===((i=l.offset)==null?void 0:i.placement)&&(s=l.arrow)!=null&&s.alignmentOffset?{}:{x:o+c.x,y:r+c.y,data:{...c,placement:n}}}}},Vc=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:i,y:s,placement:o}=e,{mainAxis:r=!0,crossAxis:n=!1,limiter:l={fn:_=>{let{x:C,y:w}=_;return{x:C,y:w}}},...c}=je(t,e),u={x:i,y:s},f=await ao(e,c),h=$e(me(o)),p=la(h);let m=u[p],g=u[h];if(r){const _=p==="y"?"top":"left",C=p==="y"?"bottom":"right",w=m+f[_],x=m-f[C];m=Rs(w,m,x)}if(n){const _=h==="y"?"top":"left",C=h==="y"?"bottom":"right",w=g+f[_],x=g-f[C];g=Rs(w,g,x)}const b=l.fn({...e,[p]:m,[h]:g});return{...b,data:{x:b.x-i,y:b.y-s,enabled:{[p]:r,[h]:n}}}}}},Nc=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var i,s;const{placement:o,rects:r,platform:n,elements:l}=e,{apply:c=()=>{},...u}=je(t,e),f=await ao(e,u),h=me(o),p=We(o),m=$e(o)==="y",{width:g,height:b}=r.floating;let _,C;h==="top"||h==="bottom"?(_=h,C=p===(await(n.isRTL==null?void 0:n.isRTL(l.floating))?"start":"end")?"left":"right"):(C=h,_=p==="end"?"top":"bottom");const w=b-f.top-f.bottom,x=g-f.left-f.right,v=fe(b-f[_],w),y=fe(g-f[C],x),E=!e.middlewareData.shift;let T=v,R=y;if((i=e.middlewareData.shift)!=null&&i.enabled.x&&(R=x),(s=e.middlewareData.shift)!=null&&s.enabled.y&&(T=w),E&&!p){const I=Tt(f.left,0),Q=Tt(f.right,0),J=Tt(f.top,0),rt=Tt(f.bottom,0);m?R=g-2*(I!==0||Q!==0?I+Q:Tt(f.left,f.right)):T=b-2*(J!==0||rt!==0?J+rt:Tt(f.top,f.bottom))}await c({...e,availableWidth:R,availableHeight:T});const L=await n.getDimensions(l.floating);return g!==L.width||b!==L.height?{reset:{rects:!0}}:{}}}};function ss(){return typeof window<"u"}function qe(t){return da(t)?(t.nodeName||"").toLowerCase():"#document"}function Ot(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function se(t){var e;return(e=(da(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function da(t){return ss()?t instanceof Node||t instanceof Ot(t).Node:!1}function jt(t){return ss()?t instanceof Element||t instanceof Ot(t).Element:!1}function ie(t){return ss()?t instanceof HTMLElement||t instanceof Ot(t).HTMLElement:!1}function vr(t){return!ss()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Ot(t).ShadowRoot}function xi(t){const{overflow:e,overflowX:i,overflowY:s,display:o}=Wt(t);return/auto|scroll|overlay|hidden|clip/.test(e+s+i)&&!["inline","contents"].includes(o)}function Hc(t){return["table","td","th"].includes(qe(t))}function os(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function rs(t){const e=no(),i=jt(t)?Wt(t):t;return["transform","translate","scale","rotate","perspective"].some(s=>i[s]?i[s]!=="none":!1)||(i.containerType?i.containerType!=="normal":!1)||!e&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!e&&(i.filter?i.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(s=>(i.willChange||"").includes(s))||["paint","layout","strict","content"].some(s=>(i.contain||"").includes(s))}function Uc(t){let e=ge(t);for(;ie(e)&&!Ue(e);){if(rs(e))return e;if(os(e))return null;e=ge(e)}return null}function no(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Ue(t){return["html","body","#document"].includes(qe(t))}function Wt(t){return Ot(t).getComputedStyle(t)}function as(t){return jt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ge(t){if(qe(t)==="html")return t;const e=t.assignedSlot||t.parentNode||vr(t)&&t.host||se(t);return vr(e)?e.host:e}function ha(t){const e=ge(t);return Ue(e)?t.ownerDocument?t.ownerDocument.body:t.body:ie(e)&&xi(e)?e:ha(e)}function bi(t,e,i){var s;e===void 0&&(e=[]),i===void 0&&(i=!0);const o=ha(t),r=o===((s=t.ownerDocument)==null?void 0:s.body),n=Ot(o);if(r){const l=Bs(n);return e.concat(n,n.visualViewport||[],xi(o)?o:[],l&&i?bi(l):[])}return e.concat(o,bi(o,[],i))}function Bs(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function ua(t){const e=Wt(t);let i=parseFloat(e.width)||0,s=parseFloat(e.height)||0;const o=ie(t),r=o?t.offsetWidth:i,n=o?t.offsetHeight:s,l=Ki(i)!==r||Ki(s)!==n;return l&&(i=r,s=n),{width:i,height:s,$:l}}function lo(t){return jt(t)?t:t.contextElement}function Be(t){const e=lo(t);if(!ie(e))return ee(1);const i=e.getBoundingClientRect(),{width:s,height:o,$:r}=ua(e);let n=(r?Ki(i.width):i.width)/s,l=(r?Ki(i.height):i.height)/o;return(!n||!Number.isFinite(n))&&(n=1),(!l||!Number.isFinite(l))&&(l=1),{x:n,y:l}}const jc=ee(0);function pa(t){const e=Ot(t);return!no()||!e.visualViewport?jc:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Wc(t,e,i){return e===void 0&&(e=!1),!i||e&&i!==Ot(t)?!1:e}function Se(t,e,i,s){e===void 0&&(e=!1),i===void 0&&(i=!1);const o=t.getBoundingClientRect(),r=lo(t);let n=ee(1);e&&(s?jt(s)&&(n=Be(s)):n=Be(t));const l=Wc(r,i,s)?pa(r):ee(0);let c=(o.left+l.x)/n.x,u=(o.top+l.y)/n.y,f=o.width/n.x,h=o.height/n.y;if(r){const p=Ot(r),m=s&&jt(s)?Ot(s):s;let g=p,b=Bs(g);for(;b&&s&&m!==g;){const _=Be(b),C=b.getBoundingClientRect(),w=Wt(b),x=C.left+(b.clientLeft+parseFloat(w.paddingLeft))*_.x,v=C.top+(b.clientTop+parseFloat(w.paddingTop))*_.y;c*=_.x,u*=_.y,f*=_.x,h*=_.y,c+=x,u+=v,g=Ot(b),b=Bs(g)}}return Xi({width:f,height:h,x:c,y:u})}function co(t,e){const i=as(t).scrollLeft;return e?e.left+i:Se(se(t)).left+i}function fa(t,e,i){i===void 0&&(i=!1);const s=t.getBoundingClientRect(),o=s.left+e.scrollLeft-(i?0:co(t,s)),r=s.top+e.scrollTop;return{x:o,y:r}}function qc(t){let{elements:e,rect:i,offsetParent:s,strategy:o}=t;const r=o==="fixed",n=se(s),l=e?os(e.floating):!1;if(s===n||l&&r)return i;let c={scrollLeft:0,scrollTop:0},u=ee(1);const f=ee(0),h=ie(s);if((h||!h&&!r)&&((qe(s)!=="body"||xi(n))&&(c=as(s)),ie(s))){const m=Se(s);u=Be(s),f.x=m.x+s.clientLeft,f.y=m.y+s.clientTop}const p=n&&!h&&!r?fa(n,c,!0):ee(0);return{width:i.width*u.x,height:i.height*u.y,x:i.x*u.x-c.scrollLeft*u.x+f.x+p.x,y:i.y*u.y-c.scrollTop*u.y+f.y+p.y}}function Kc(t){return Array.from(t.getClientRects())}function Yc(t){const e=se(t),i=as(t),s=t.ownerDocument.body,o=Tt(e.scrollWidth,e.clientWidth,s.scrollWidth,s.clientWidth),r=Tt(e.scrollHeight,e.clientHeight,s.scrollHeight,s.clientHeight);let n=-i.scrollLeft+co(t);const l=-i.scrollTop;return Wt(s).direction==="rtl"&&(n+=Tt(e.clientWidth,s.clientWidth)-o),{width:o,height:r,x:n,y:l}}function Xc(t,e){const i=Ot(t),s=se(t),o=i.visualViewport;let r=s.clientWidth,n=s.clientHeight,l=0,c=0;if(o){r=o.width,n=o.height;const u=no();(!u||u&&e==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:r,height:n,x:l,y:c}}function Gc(t,e){const i=Se(t,!0,e==="fixed"),s=i.top+t.clientTop,o=i.left+t.clientLeft,r=ie(t)?Be(t):ee(1),n=t.clientWidth*r.x,l=t.clientHeight*r.y,c=o*r.x,u=s*r.y;return{width:n,height:l,x:c,y:u}}function yr(t,e,i){let s;if(e==="viewport")s=Xc(t,i);else if(e==="document")s=Yc(se(t));else if(jt(e))s=Gc(e,i);else{const o=pa(t);s={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return Xi(s)}function ma(t,e){const i=ge(t);return i===e||!jt(i)||Ue(i)?!1:Wt(i).position==="fixed"||ma(i,e)}function Qc(t,e){const i=e.get(t);if(i)return i;let s=bi(t,[],!1).filter(l=>jt(l)&&qe(l)!=="body"),o=null;const r=Wt(t).position==="fixed";let n=r?ge(t):t;for(;jt(n)&&!Ue(n);){const l=Wt(n),c=rs(n);!c&&l.position==="fixed"&&(o=null),(r?!c&&!o:!c&&l.position==="static"&&!!o&&["absolute","fixed"].includes(o.position)||xi(n)&&!c&&ma(t,n))?s=s.filter(f=>f!==n):o=l,n=ge(n)}return e.set(t,s),s}function Zc(t){let{element:e,boundary:i,rootBoundary:s,strategy:o}=t;const n=[...i==="clippingAncestors"?os(e)?[]:Qc(e,this._c):[].concat(i),s],l=n[0],c=n.reduce((u,f)=>{const h=yr(e,f,o);return u.top=Tt(h.top,u.top),u.right=fe(h.right,u.right),u.bottom=fe(h.bottom,u.bottom),u.left=Tt(h.left,u.left),u},yr(e,l,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Jc(t){const{width:e,height:i}=ua(t);return{width:e,height:i}}function td(t,e,i){const s=ie(e),o=se(e),r=i==="fixed",n=Se(t,!0,r,e);let l={scrollLeft:0,scrollTop:0};const c=ee(0);if(s||!s&&!r)if((qe(e)!=="body"||xi(o))&&(l=as(e)),s){const p=Se(e,!0,r,e);c.x=p.x+e.clientLeft,c.y=p.y+e.clientTop}else o&&(c.x=co(o));const u=o&&!s&&!r?fa(o,l):ee(0),f=n.left+l.scrollLeft-c.x-u.x,h=n.top+l.scrollTop-c.y-u.y;return{x:f,y:h,width:n.width,height:n.height}}function ks(t){return Wt(t).position==="static"}function _r(t,e){if(!ie(t)||Wt(t).position==="fixed")return null;if(e)return e(t);let i=t.offsetParent;return se(t)===i&&(i=i.ownerDocument.body),i}function ga(t,e){const i=Ot(t);if(os(t))return i;if(!ie(t)){let o=ge(t);for(;o&&!Ue(o);){if(jt(o)&&!ks(o))return o;o=ge(o)}return i}let s=_r(t,e);for(;s&&Hc(s)&&ks(s);)s=_r(s,e);return s&&Ue(s)&&ks(s)&&!rs(s)?i:s||Uc(t)||i}const ed=async function(t){const e=this.getOffsetParent||ga,i=this.getDimensions,s=await i(t.floating);return{reference:td(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:s.width,height:s.height}}};function id(t){return Wt(t).direction==="rtl"}const Ni={convertOffsetParentRelativeRectToViewportRelativeRect:qc,getDocumentElement:se,getClippingRect:Zc,getOffsetParent:ga,getElementRects:ed,getClientRects:Kc,getDimensions:Jc,getScale:Be,isElement:jt,isRTL:id};function ba(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function sd(t,e){let i=null,s;const o=se(t);function r(){var l;clearTimeout(s),(l=i)==null||l.disconnect(),i=null}function n(l,c){l===void 0&&(l=!1),c===void 0&&(c=1),r();const u=t.getBoundingClientRect(),{left:f,top:h,width:p,height:m}=u;if(l||e(),!p||!m)return;const g=Oi(h),b=Oi(o.clientWidth-(f+p)),_=Oi(o.clientHeight-(h+m)),C=Oi(f),x={rootMargin:-g+"px "+-b+"px "+-_+"px "+-C+"px",threshold:Tt(0,fe(1,c))||1};let v=!0;function y(E){const T=E[0].intersectionRatio;if(T!==c){if(!v)return n();T?n(!1,T):s=setTimeout(()=>{n(!1,1e-7)},1e3)}T===1&&!ba(u,t.getBoundingClientRect())&&n(),v=!1}try{i=new IntersectionObserver(y,{...x,root:o.ownerDocument})}catch{i=new IntersectionObserver(y,x)}i.observe(t)}return n(!0),r}function od(t,e,i,s){s===void 0&&(s={});const{ancestorScroll:o=!0,ancestorResize:r=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=s,u=lo(t),f=o||r?[...u?bi(u):[],...bi(e)]:[];f.forEach(C=>{o&&C.addEventListener("scroll",i,{passive:!0}),r&&C.addEventListener("resize",i)});const h=u&&l?sd(u,i):null;let p=-1,m=null;n&&(m=new ResizeObserver(C=>{let[w]=C;w&&w.target===u&&m&&(m.unobserve(e),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var x;(x=m)==null||x.observe(e)})),i()}),u&&!c&&m.observe(u),m.observe(e));let g,b=c?Se(t):null;c&&_();function _(){const C=Se(t);b&&!ba(b,C)&&i(),b=C,g=requestAnimationFrame(_)}return i(),()=>{var C;f.forEach(w=>{o&&w.removeEventListener("scroll",i),r&&w.removeEventListener("resize",i)}),h==null||h(),(C=m)==null||C.disconnect(),m=null,c&&cancelAnimationFrame(g)}}const rd=Bc,ad=Vc,nd=Rc,wr=Nc,ld=Dc,cd=(t,e,i)=>{const s=new Map,o={platform:Ni,...i},r={...o.platform,_c:s};return Pc(t,e,{...o,platform:r})};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ki=t=>(...e)=>({_$litDirective$:t,values:e});let Ci=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,s){this._$Ct=e,this._$AM=i,this._$Ci=s}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=ki(class extends Ci{constructor(t){var e;if(super(t),t.type!==Jt.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var s,o;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!((s=this.nt)!=null&&s.has(r))&&this.st.add(r);return this.render(e)}const i=t.element.classList;for(const r of this.st)r in e||(i.remove(r),this.st.delete(r));for(const r in e){const n=!!e[r];n===this.st.has(r)||(o=this.nt)!=null&&o.has(r)||(n?(i.add(r),this.st.add(r)):(i.remove(r),this.st.delete(r)))}return It}});function dd(t){return hd(t)}function Cs(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function hd(t){for(let e=t;e;e=Cs(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Cs(t);e;e=Cs(e)){if(!(e instanceof Element))continue;const i=getComputedStyle(e);if(i.display!=="contents"&&(i.position!=="static"||rs(i)||e.tagName==="BODY"))return e}return null}function ud(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var W=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom");let s=0,o=0,r=0,n=0,l=0,c=0,u=0,f=0;i?t.top<e.top?(s=t.left,o=t.bottom,r=t.right,n=t.bottom,l=e.left,c=e.top,u=e.right,f=e.top):(s=e.left,o=e.bottom,r=e.right,n=e.bottom,l=t.left,c=t.top,u=t.right,f=t.top):t.left<e.left?(s=t.right,o=t.top,r=e.left,n=e.top,l=t.right,c=t.bottom,u=e.left,f=e.bottom):(s=e.right,o=e.top,r=t.left,n=t.top,l=e.right,c=e.bottom,u=t.left,f=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${s}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${f}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||ud(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=od(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[rd({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(wr({apply:({rects:i})=>{const s=this.sync==="width"||this.sync==="both",o=this.sync==="height"||this.sync==="both";this.popup.style.width=s?`${i.reference.width}px`:"",this.popup.style.height=o?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(nd({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(ad({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(wr({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:s})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${s}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(ld({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?i=>Ni.getOffsetParent(i,dd):Ni.getOffsetParent;cd(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:yi(ce({},Ni),{getOffsetParent:e})}).then(({x:i,y:s,middlewareData:o,placement:r})=>{const n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${i}px`,top:`${s}px`}),this.arrow){const c=o.arrow.x,u=o.arrow.y;let f="",h="",p="",m="";if(this.arrowPlacement==="start"){const g=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",h=n?g:"",m=n?"":g}else if(this.arrowPlacement==="end"){const g=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=n?"":g,m=n?g:"",p=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(m=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":"",f=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(m=typeof c=="number"?`${c}px`:"",f=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:f,right:h,bottom:p,left:m,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return k`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${P({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${P({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?k`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};W.styles=[D,$c];a([S(".popup")],W.prototype,"popup",2);a([S(".popup__arrow")],W.prototype,"arrowEl",2);a([d()],W.prototype,"anchor",2);a([d({type:Boolean,reflect:!0})],W.prototype,"active",2);a([d({reflect:!0})],W.prototype,"placement",2);a([d({reflect:!0})],W.prototype,"strategy",2);a([d({type:Number})],W.prototype,"distance",2);a([d({type:Number})],W.prototype,"skidding",2);a([d({type:Boolean})],W.prototype,"arrow",2);a([d({attribute:"arrow-placement"})],W.prototype,"arrowPlacement",2);a([d({attribute:"arrow-padding",type:Number})],W.prototype,"arrowPadding",2);a([d({type:Boolean})],W.prototype,"flip",2);a([d({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],W.prototype,"flipFallbackPlacements",2);a([d({attribute:"flip-fallback-strategy"})],W.prototype,"flipFallbackStrategy",2);a([d({type:Object})],W.prototype,"flipBoundary",2);a([d({attribute:"flip-padding",type:Number})],W.prototype,"flipPadding",2);a([d({type:Boolean})],W.prototype,"shift",2);a([d({type:Object})],W.prototype,"shiftBoundary",2);a([d({attribute:"shift-padding",type:Number})],W.prototype,"shiftPadding",2);a([d({attribute:"auto-size"})],W.prototype,"autoSize",2);a([d()],W.prototype,"sync",2);a([d({type:Object})],W.prototype,"autoSizeBoundary",2);a([d({attribute:"auto-size-padding",type:Number})],W.prototype,"autoSizePadding",2);a([d({attribute:"hover-bridge",type:Boolean})],W.prototype,"hoverBridge",2);var va=new Map,pd=new WeakMap;function fd(t){return t??{keyframes:[],options:{duration:0}}}function xr(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function q(t,e){va.set(t,fd(e))}function G(t,e,i){const s=pd.get(t);if(s!=null&&s[e])return xr(s[e],i.dir);const o=va.get(e);return o?xr(o,i.dir):{keyframes:[],options:{duration:0}}}function kt(t,e){return new Promise(i=>{function s(o){o.target===t&&(t.removeEventListener(e,s),i())}t.addEventListener(e,s)})}function it(t,e,i){return new Promise(s=>{if((i==null?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const o=t.animate(e,yi(ce({},i),{duration:Vs()?0:i.duration}));o.addEventListener("cancel",s,{once:!0}),o.addEventListener("finish",s,{once:!0})})}function kr(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function Vs(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function nt(t){return Promise.all(t.getAnimations().map(e=>new Promise(i=>{e.cancel(),requestAnimationFrame(i)})))}function Gi(t,e){return t.map(i=>yi(ce({},i),{height:i.height==="auto"?`${e}px`:i.height}))}function $(t,e){const i=ce({waitUntilFirstUpdate:!1},e);return(s,o)=>{const{update:r}=s,n=Array.isArray(t)?t:[t];s.update=function(l){n.forEach(c=>{const u=c;if(l.has(u)){const f=l.get(u),h=this[u];f!==h&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[o](f,h)}}),r.call(this,l)}}}var ut=class extends A{constructor(){super(),this.localize=new N(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=kr(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=kr(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await nt(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:i,options:s}=G(this,"tooltip.show",{dir:this.localize.dir()});await it(this.popup.popup,i,s),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await nt(this.body);const{keyframes:i,options:s}=G(this,"tooltip.hide",{dir:this.localize.dir()});await it(this.popup.popup,i,s),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,kt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,kt(this,"sl-after-hide")}render(){return k`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${P({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};ut.styles=[D,Cc];ut.dependencies={"sl-popup":W};a([S("slot:not([name])")],ut.prototype,"defaultSlot",2);a([S(".tooltip__body")],ut.prototype,"body",2);a([S("sl-popup")],ut.prototype,"popup",2);a([d()],ut.prototype,"content",2);a([d()],ut.prototype,"placement",2);a([d({type:Boolean,reflect:!0})],ut.prototype,"disabled",2);a([d({type:Number})],ut.prototype,"distance",2);a([d({type:Boolean,reflect:!0})],ut.prototype,"open",2);a([d({type:Number})],ut.prototype,"skidding",2);a([d()],ut.prototype,"trigger",2);a([d({type:Boolean})],ut.prototype,"hoist",2);a([$("open",{waitUntilFirstUpdate:!0})],ut.prototype,"handleOpenChange",1);a([$(["content","distance","hoist","placement","skidding"])],ut.prototype,"handleOptionsChange",1);a([$("disabled")],ut.prototype,"handleDisabledChange",1);q("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});q("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});ut.define("sl-tooltip");var md=M`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`,gd=M`
  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`,bd=M`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,Ke=(t="value")=>(e,i)=>{const s=e.constructor,o=s.prototype.attributeChangedCallback;s.prototype.attributeChangedCallback=function(r,n,l){var c;const u=s.getPropertyOptions(t),f=typeof u.attribute=="string"?u.attribute:t;if(r===f){const h=u.converter||Ne,m=(typeof h=="function"?h:(c=h==null?void 0:h.fromAttribute)!=null?c:Ne.fromAttribute)(l,u.type);this[t]!==m&&(this[i]=m)}o.call(this,r,n,l)}},Ee=M`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,Ct=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=i=>{const s=i.target;(this.slotNames.includes("[default]")&&!s.name||s.name&&this.slotNames.includes(s.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function vd(t){if(!t)return"";const e=t.assignedNodes({flatten:!0});let i="";return[...e].forEach(s=>{s.nodeType===Node.TEXT_NODE&&(i+=s.textContent)}),i}var yd=M`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,Ns="";function Cr(t){Ns=t}function _d(t=""){if(!Ns){const e=[...document.getElementsByTagName("script")],i=e.find(s=>s.hasAttribute("data-shoelace"));if(i)Cr(i.getAttribute("data-shoelace"));else{const s=e.find(r=>/shoelace(\.min)?\.js($|\?)/.test(r.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(r.src));let o="";s&&(o=s.getAttribute("src")),Cr(o.split("/").slice(0,-1).join("/"))}}return Ns.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var wd={name:"default",resolver:t=>_d(`assets/icons/${t}.svg`)},xd=wd,$r={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},kd={name:"system",resolver:t=>t in $r?`data:image/svg+xml,${encodeURIComponent($r[t])}`:""},Cd=kd,$d=[xd,Cd],Hs=[];function Sd(t){Hs.push(t)}function zd(t){Hs=Hs.filter(e=>e!==t)}function Sr(t){return $d.find(e=>e.name===t)}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ad=(t,e)=>(t==null?void 0:t._$litType$)!==void 0,ya=t=>t.strings===void 0,Ed={},Td=(t,e=Ed)=>t._$AH=e;var ei=Symbol(),Li=Symbol(),$s,Ss=new Map,Y=class extends A{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var i;let s;if(e!=null&&e.spriteSheet)return this.svg=k`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(s=await fetch(t,{mode:"cors"}),!s.ok)return s.status===410?ei:Li}catch{return Li}try{const o=document.createElement("div");o.innerHTML=await s.text();const r=o.firstElementChild;if(((i=r==null?void 0:r.tagName)==null?void 0:i.toLowerCase())!=="svg")return ei;$s||($s=new DOMParser);const l=$s.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):ei}catch{return ei}}connectedCallback(){super.connectedCallback(),Sd(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),zd(this)}getIconSource(){const t=Sr(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:i}=this.getIconSource(),s=i?Sr(this.library):void 0;if(!e){this.svg=null;return}let o=Ss.get(e);if(o||(o=this.resolveIcon(e,s),Ss.set(e,o)),!this.initialRender)return;const r=await o;if(r===Li&&Ss.delete(e),e===this.getIconSource().url){if(Ad(r)){if(this.svg=r,s){await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");typeof s.mutator=="function"&&n&&s.mutator(n)}return}switch(r){case Li:case ei:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),(t=s==null?void 0:s.mutator)==null||t.call(s,this.svg),this.emit("sl-load")}}}render(){return this.svg}};Y.styles=[D,yd];a([O()],Y.prototype,"svg",2);a([d({reflect:!0})],Y.prototype,"name",2);a([d()],Y.prototype,"src",2);a([d()],Y.prototype,"label",2);a([d({reflect:!0})],Y.prototype,"library",2);a([$("label")],Y.prototype,"handleLabelChange",1);a([$(["name","src","library"])],Y.prototype,"setIcon",1);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=t=>t??X;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze=ki(class extends Ci{constructor(t){if(super(t),t.type!==Jt.PROPERTY&&t.type!==Jt.ATTRIBUTE&&t.type!==Jt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ya(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===It||e===X)return e;const i=t.element,s=t.name;if(t.type===Jt.PROPERTY){if(e===i[s])return It}else if(t.type===Jt.BOOLEAN_ATTRIBUTE){if(!!e===i.hasAttribute(s))return It}else if(t.type===Jt.ATTRIBUTE&&i.getAttribute(s)===e+"")return It;return Td(t),e}});var dt=class extends A{constructor(){super(...arguments),this.formControlController=new de(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new Ct(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return k`
      <div
        class=${P({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${P({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${z(this.value)}
            .indeterminate=${ze(this.indeterminate)}
            .checked=${ze(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?k`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?k`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};dt.styles=[D,Ee,bd];dt.dependencies={"sl-icon":Y};a([S('input[type="checkbox"]')],dt.prototype,"input",2);a([O()],dt.prototype,"hasFocus",2);a([d()],dt.prototype,"title",2);a([d()],dt.prototype,"name",2);a([d()],dt.prototype,"value",2);a([d({reflect:!0})],dt.prototype,"size",2);a([d({type:Boolean,reflect:!0})],dt.prototype,"disabled",2);a([d({type:Boolean,reflect:!0})],dt.prototype,"checked",2);a([d({type:Boolean,reflect:!0})],dt.prototype,"indeterminate",2);a([Ke("checked")],dt.prototype,"defaultChecked",2);a([d({reflect:!0})],dt.prototype,"form",2);a([d({type:Boolean,reflect:!0})],dt.prototype,"required",2);a([d({attribute:"help-text"})],dt.prototype,"helpText",2);a([$("disabled",{waitUntilFirstUpdate:!0})],dt.prototype,"handleDisabledChange",1);a([$(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],dt.prototype,"handleStateChange",1);var Id=M`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,$i=class extends A{constructor(){super(...arguments),this.localize=new N(this)}render(){return k`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};$i.styles=[D,Id];/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function zr(t,e,i){return t?e(t):i==null?void 0:i(t)}var st=class Us extends A{constructor(){super(...arguments),this.localize=new N(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.emit("sl-collapse"),await nt(this.childrenContainer);const{keyframes:e,options:i}=G(this,"tree-item.collapse",{dir:this.localize.dir()});await it(this.childrenContainer,Gi(e,this.childrenContainer.scrollHeight),i),this.childrenContainer.hidden=!0,this.emit("sl-after-collapse")}isNestedItem(){const e=this.parentElement;return!!e&&Us.isTreeItem(e)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.emit("sl-expand"),await nt(this.childrenContainer),this.childrenContainer.hidden=!1;const{keyframes:e,options:i}=G(this,"tree-item.expand",{dir:this.localize.dir()});await it(this.childrenContainer,Gi(e,this.childrenContainer.scrollHeight),i),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(i=>Us.isTreeItem(i)&&(e||!i.disabled)):[]}render(){const e=this.localize.dir()==="rtl",i=!this.loading&&(!this.isLeaf||this.lazy);return k`
      <div
        part="base"
        class="${P({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":i,"tree-item--rtl":this.localize.dir()==="rtl"})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${P({"tree-item__expand-button":!0,"tree-item__expand-button--visible":i})}
            aria-hidden="true"
          >
            ${zr(this.loading,()=>k` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${zr(this.selectable,()=>k`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${ze(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `)}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};st.styles=[D,gd];st.dependencies={"sl-checkbox":dt,"sl-icon":Y,"sl-spinner":$i};a([O()],st.prototype,"indeterminate",2);a([O()],st.prototype,"isLeaf",2);a([O()],st.prototype,"loading",2);a([O()],st.prototype,"selectable",2);a([d({type:Boolean,reflect:!0})],st.prototype,"expanded",2);a([d({type:Boolean,reflect:!0})],st.prototype,"selected",2);a([d({type:Boolean,reflect:!0})],st.prototype,"disabled",2);a([d({type:Boolean,reflect:!0})],st.prototype,"lazy",2);a([S("slot:not([name])")],st.prototype,"defaultSlot",2);a([S("slot[name=children]")],st.prototype,"childrenSlot",2);a([S(".tree-item__item")],st.prototype,"itemElement",2);a([S(".tree-item__children")],st.prototype,"childrenContainer",2);a([S(".tree-item__expand-button slot")],st.prototype,"expandButtonSlot",2);a([$("loading",{waitUntilFirstUpdate:!0})],st.prototype,"handleLoadingChange",1);a([$("disabled")],st.prototype,"handleDisabledChange",1);a([$("selected")],st.prototype,"handleSelectedChange",1);a([$("expanded",{waitUntilFirstUpdate:!0})],st.prototype,"handleExpandedChange",1);a([$("expanded",{waitUntilFirstUpdate:!0})],st.prototype,"handleExpandAnimation",1);a([$("lazy",{waitUntilFirstUpdate:!0})],st.prototype,"handleLazyChange",1);var ni=st;q("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});q("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});function at(t,e,i){const s=o=>Object.is(o,-0)?0:o;return t<e?s(e):t>i?s(i):s(t)}function Ar(t,e=!1){function i(r){const n=r.getChildrenItems({includeDisabled:!1});if(n.length){const l=n.every(u=>u.selected),c=n.every(u=>!u.selected&&!u.indeterminate);r.selected=l,r.indeterminate=!l&&!c}}function s(r){const n=r.parentElement;ni.isTreeItem(n)&&(i(n),s(n))}function o(r){for(const n of r.getChildrenItems())n.selected=e?r.selected||n.selected:!n.disabled&&r.selected,o(n);e&&i(r)}o(t),s(t)}var Te=class extends A{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new N(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{const i=t.querySelector(`[slot="${e}-icon"]`),s=this.getExpandButtonIcon(e);s&&(i===null?t.append(s):i.hasAttribute("data-default")&&i.replaceWith(s))})},this.handleTreeChanged=t=>{for(const e of t){const i=[...e.addedNodes].filter(ni.isTreeItem),s=[...e.removedNodes].filter(ni.isTreeItem);i.forEach(this.initTreeItem),this.lastFocusedItem&&s.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{const e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)},this.handleFocusIn=t=>{const e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),ni.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect()}getExpandButtonIcon(t){const i=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(i){const s=i.cloneNode(!0);return[s,...s.querySelectorAll("[id]")].forEach(o=>o.removeAttribute("id")),s.setAttribute("data-default",""),s.slot=`${t}-icon`,s}return null}selectItem(t){const e=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=!0),Ar(t);else if(this.selection==="single"||t.isLeaf){const s=this.getAllTreeItems();for(const o of s)o.selected=o===t}else this.selection==="leaf"&&(t.expanded=!t.expanded);const i=this.selectedItems;(e.length!==i.length||i.some(s=>!e.includes(s)))&&Promise.all(i.map(s=>s.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:i}})})}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}focusItem(t){t==null||t.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(o=>{var r;return["input","textarea"].includes((r=o==null?void 0:o.tagName)==null?void 0:r.toLowerCase())}))return;const e=this.getFocusableItems(),i=this.localize.dir()==="ltr",s=this.localize.dir()==="rtl";if(e.length>0){t.preventDefault();const o=e.findIndex(c=>c.matches(":focus")),r=e[o],n=c=>{const u=e[at(c,0,e.length-1)];this.focusItem(u)},l=c=>{r.expanded=c};t.key==="ArrowDown"?n(o+1):t.key==="ArrowUp"?n(o-1):i&&t.key==="ArrowRight"||s&&t.key==="ArrowLeft"?!r||r.disabled||r.expanded||r.isLeaf&&!r.lazy?n(o+1):l(!0):i&&t.key==="ArrowLeft"||s&&t.key==="ArrowRight"?!r||r.disabled||r.isLeaf||!r.expanded?n(o-1):l(!1):t.key==="Home"?n(0):t.key==="End"?n(e.length-1):(t.key==="Enter"||t.key===" ")&&(r.disabled||this.selectItem(r))}}handleClick(t){const e=t.target,i=e.closest("sl-tree-item"),s=t.composedPath().some(o=>{var r;return(r=o==null?void 0:o.classList)==null?void 0:r.contains("tree-item__expand-button")});!i||i.disabled||e!==this.clickTarget||(s?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){const t=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(const i of e)i.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(i=>Ar(i,!0)))}get selectedItems(){const t=this.getAllTreeItems(),e=i=>i.selected;return t.filter(e)}getFocusableItems(){const t=this.getAllTreeItems(),e=new Set;return t.filter(i=>{var s;if(i.disabled)return!1;const o=(s=i.parentElement)==null?void 0:s.closest("[role=treeitem]");return o&&(!o.expanded||o.loading||e.has(o))&&e.add(i),!e.has(i)})}render(){return k`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};Te.styles=[D,md];a([S("slot:not([name])")],Te.prototype,"defaultSlot",2);a([S("slot[name=expand-icon]")],Te.prototype,"expandedIconSlot",2);a([S("slot[name=collapse-icon]")],Te.prototype,"collapsedIconSlot",2);a([d()],Te.prototype,"selection",2);a([$("selection")],Te.prototype,"handleSelectionChange",1);Te.define("sl-tree");ni.define("sl-tree-item");var Md=M`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group--has-scroll-controls .tab-group__scroll-button--start--hidden,
  .tab-group--has-scroll-controls .tab-group__scroll-button--end--hidden {
    visibility: hidden;
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,Od=M`
  :host {
    display: contents;
  }
`,Si=class extends A{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const t=this.shadowRoot.querySelector("slot");if(t!==null){const e=t.assignedElements({flatten:!0});this.observedElements.forEach(i=>this.resizeObserver.unobserve(i)),this.observedElements=[],e.forEach(i=>{this.resizeObserver.observe(i),this.observedElements.push(i)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return k` <slot @slotchange=${this.handleSlotChange}></slot> `}};Si.styles=[D,Od];a([d({type:Boolean,reflect:!0})],Si.prototype,"disabled",2);a([$("disabled",{waitUntilFirstUpdate:!0})],Si.prototype,"handleDisabledChange",1);function Ld(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var js=new Set;function Pd(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Dd(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function li(t){if(js.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const e=Pd()+Dd();let i=getComputedStyle(document.documentElement).scrollbarGutter;(!i||i==="auto")&&(i="stable"),e<2&&(i=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",i),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function ci(t){js.delete(t),js.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function Ws(t,e,i="vertical",s="smooth"){const o=Ld(t,e),r=o.top+e.scrollTop,n=o.left+e.scrollLeft,l=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,u=e.scrollTop,f=e.scrollTop+e.offsetHeight;(i==="horizontal"||i==="both")&&(n<l?e.scrollTo({left:n,behavior:s}):n+t.clientWidth>c&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:s})),(i==="vertical"||i==="both")&&(r<u?e.scrollTo({top:r,behavior:s}):r+t.clientHeight>f&&e.scrollTo({top:r-e.offsetHeight+t.clientHeight,behavior:s}))}var Rd=M`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _a=Symbol.for(""),Fd=t=>{if((t==null?void 0:t.r)===_a)return t==null?void 0:t._$litStatic$},Qi=(t,...e)=>({_$litStatic$:e.reduce((i,s,o)=>i+(r=>{if(r._$litStatic$!==void 0)return r._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(s)+t[o+1],t[0]),r:_a}),Er=new Map,Bd=t=>(e,...i)=>{const s=i.length;let o,r;const n=[],l=[];let c,u=0,f=!1;for(;u<s;){for(c=e[u];u<s&&(r=i[u],(o=Fd(r))!==void 0);)c+=o+e[++u],f=!0;u!==s&&l.push(r),n.push(c),u++}if(u===s&&n.push(e[s]),f){const h=n.join("$$lit$$");(e=Er.get(h))===void 0&&(n.raw=n,Er.set(h,e=n)),i=l}return t(e,...i)},di=Bd(k);var ht=class extends A{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?Qi`a`:Qi`button`;return di`
      <${e}
        part="base"
        class=${P({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${z(t?void 0:this.disabled)}
        type=${z(t?void 0:"button")}
        href=${z(t?this.href:void 0)}
        target=${z(t?this.target:void 0)}
        download=${z(t?this.download:void 0)}
        rel=${z(t&&this.target?"noreferrer noopener":void 0)}
        role=${z(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${z(this.name)}
          library=${z(this.library)}
          src=${z(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};ht.styles=[D,Rd];ht.dependencies={"sl-icon":Y};a([S(".icon-button")],ht.prototype,"button",2);a([O()],ht.prototype,"hasFocus",2);a([d()],ht.prototype,"name",2);a([d()],ht.prototype,"library",2);a([d()],ht.prototype,"src",2);a([d()],ht.prototype,"href",2);a([d()],ht.prototype,"target",2);a([d()],ht.prototype,"download",2);a([d()],ht.prototype,"label",2);a([d({type:Boolean,reflect:!0})],ht.prototype,"disabled",2);var gt=class extends A{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new N(this),this.hasScrollControls=!1,this.shouldHideScrollStartButton=!1,this.shouldHideScrollEndButton=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1,this.fixedScrollControls=!1,this.scrollOffset=1}connectedCallback(){const t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{if(e.some(i=>!["aria-labelledby","aria-controls"].includes(i.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(i=>i.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(i=>i.attributeName==="active")){const s=e.filter(o=>o.attributeName==="active"&&o.target.tagName.toLowerCase()==="sl-tab").map(o=>o.target).find(o=>o.active);s&&this.setActiveTab(s)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((i,s)=>{var o;i[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((o=this.getActiveTab())!=null?o:this.tabs[0],{emitEvents:!1}),s.unobserve(i[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){var t,e;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect(),this.nav&&((e=this.resizeObserver)==null||e.unobserve(this.nav))}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const i=t.target.closest("sl-tab");(i==null?void 0:i.closest("sl-tab-group"))===this&&i!==null&&this.setActiveTab(i,{scrollBehavior:"smooth"})}handleKeyDown(t){const i=t.target.closest("sl-tab");if((i==null?void 0:i.closest("sl-tab-group"))===this&&(["Enter"," "].includes(t.key)&&i!==null&&(this.setActiveTab(i,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){const o=this.tabs.find(l=>l.matches(":focus")),r=this.localize.dir()==="rtl";let n=null;if((o==null?void 0:o.tagName.toLowerCase())==="sl-tab"){if(t.key==="Home")n=this.focusableTabs[0];else if(t.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(r?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){const l=this.tabs.findIndex(c=>c===o);n=this.findNextFocusableTab(l,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(r?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){const l=this.tabs.findIndex(c=>c===o);n=this.findNextFocusableTab(l,"forward")}if(!n)return;n.tabIndex=0,n.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(l=>{l.tabIndex=l===n?0:-1}),["top","bottom"].includes(this.placement)&&Ws(n,this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e=ce({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){const i=this.activeTab;this.activeTab=t,this.tabs.forEach(s=>{s.active=s===this.activeTab,s.tabIndex=s===this.activeTab?0:-1}),this.panels.forEach(s=>{var o;return s.active=s.name===((o=this.activeTab)==null?void 0:o.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Ws(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(i&&this.emit("sl-tab-hide",{detail:{name:i.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(i=>i.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}repositionIndicator(){const t=this.getActiveTab();if(!t)return;const e=t.clientWidth,i=t.clientHeight,s=this.localize.dir()==="rtl",o=this.getAllTabs(),n=o.slice(0,o.indexOf(t)).reduce((l,c)=>({left:l.left+c.clientWidth,top:l.top+c.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=s?`${-1*n.left}px`:`${n.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${i}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}findNextFocusableTab(t,e){let i=null;const s=e==="forward"?1:-1;let o=t+s;for(;t<this.tabs.length;){if(i=this.tabs[o]||null,i===null){e==="forward"?i=this.focusableTabs[0]:i=this.focusableTabs[this.focusableTabs.length-1];break}if(!i.disabled)break;o+=s}return i}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd())}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons()}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(t){const e=this.tabs.find(i=>i.panel===t);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}render(){const t=this.localize.dir()==="rtl";return k`
      <div
        part="base"
        class=${P({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?k`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${P({"tab-group__scroll-button":!0,"tab-group__scroll-button--start":!0,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls?k`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${P({"tab-group__scroll-button":!0,"tab-group__scroll-button--end":!0,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};gt.styles=[D,Md];gt.dependencies={"sl-icon-button":ht,"sl-resize-observer":Si};a([S(".tab-group")],gt.prototype,"tabGroup",2);a([S(".tab-group__body")],gt.prototype,"body",2);a([S(".tab-group__nav")],gt.prototype,"nav",2);a([S(".tab-group__indicator")],gt.prototype,"indicator",2);a([O()],gt.prototype,"hasScrollControls",2);a([O()],gt.prototype,"shouldHideScrollStartButton",2);a([O()],gt.prototype,"shouldHideScrollEndButton",2);a([d()],gt.prototype,"placement",2);a([d()],gt.prototype,"activation",2);a([d({attribute:"no-scroll-controls",type:Boolean})],gt.prototype,"noScrollControls",2);a([d({attribute:"fixed-scroll-controls",type:Boolean})],gt.prototype,"fixedScrollControls",2);a([wi({passive:!0})],gt.prototype,"updateScrollButtons",1);a([$("noScrollControls",{waitUntilFirstUpdate:!0})],gt.prototype,"updateScrollControls",1);a([$("placement",{waitUntilFirstUpdate:!0})],gt.prototype,"syncIndicator",1);gt.define("sl-tab-group");var Vd=M`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`,H=class extends A{constructor(){super(...arguments),this.formControlController=new de(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ct(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input))}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=""}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i)}setRangeText(t,e,i,s="preserve"){const o=e??this.input.selectionStart,r=i??this.input.selectionEnd;this.input.setRangeText(t,o,r,s),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?!0:!!t,s=this.helpText?!0:!!e;return k`
      <div
        part="form-control"
        class=${P({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${P({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${z(this.name)}
              .value=${ze(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${z(this.placeholder)}
              rows=${z(this.rows)}
              minlength=${z(this.minlength)}
              maxlength=${z(this.maxlength)}
              autocapitalize=${z(this.autocapitalize)}
              autocorrect=${z(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${z(this.spellcheck)}
              enterkeyhint=${z(this.enterkeyhint)}
              inputmode=${z(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${this.resize!=="auto"}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};H.styles=[D,Ee,Vd];a([S(".textarea__control")],H.prototype,"input",2);a([S(".textarea__size-adjuster")],H.prototype,"sizeAdjuster",2);a([O()],H.prototype,"hasFocus",2);a([d()],H.prototype,"title",2);a([d()],H.prototype,"name",2);a([d()],H.prototype,"value",2);a([d({reflect:!0})],H.prototype,"size",2);a([d({type:Boolean,reflect:!0})],H.prototype,"filled",2);a([d()],H.prototype,"label",2);a([d({attribute:"help-text"})],H.prototype,"helpText",2);a([d()],H.prototype,"placeholder",2);a([d({type:Number})],H.prototype,"rows",2);a([d()],H.prototype,"resize",2);a([d({type:Boolean,reflect:!0})],H.prototype,"disabled",2);a([d({type:Boolean,reflect:!0})],H.prototype,"readonly",2);a([d({reflect:!0})],H.prototype,"form",2);a([d({type:Boolean,reflect:!0})],H.prototype,"required",2);a([d({type:Number})],H.prototype,"minlength",2);a([d({type:Number})],H.prototype,"maxlength",2);a([d()],H.prototype,"autocapitalize",2);a([d()],H.prototype,"autocorrect",2);a([d()],H.prototype,"autocomplete",2);a([d({type:Boolean})],H.prototype,"autofocus",2);a([d()],H.prototype,"enterkeyhint",2);a([d({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],H.prototype,"spellcheck",2);a([d()],H.prototype,"inputmode",2);a([Ke()],H.prototype,"defaultValue",2);a([$("disabled",{waitUntilFirstUpdate:!0})],H.prototype,"handleDisabledChange",1);a([$("rows",{waitUntilFirstUpdate:!0})],H.prototype,"handleRowsChange",1);a([$("value",{waitUntilFirstUpdate:!0})],H.prototype,"handleValueChange",1);H.define("sl-textarea");var Nd=M`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,be=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return k`
      <span
        part="base"
        class=${P({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?k`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};be.styles=[D,Nd];be.dependencies={"sl-icon-button":ht};a([d({reflect:!0})],be.prototype,"variant",2);a([d({reflect:!0})],be.prototype,"size",2);a([d({type:Boolean,reflect:!0})],be.prototype,"pill",2);a([d({type:Boolean})],be.prototype,"removable",2);be.define("sl-tag");var Hd=M`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) {
    color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,Ud=0,qt=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.attrId=++Ud,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id.length>0?this.id:this.componentId,k`
      <div
        part="base"
        class=${P({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?k`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};qt.styles=[D,Hd];qt.dependencies={"sl-icon-button":ht};a([S(".tab")],qt.prototype,"tab",2);a([d({reflect:!0})],qt.prototype,"panel",2);a([d({type:Boolean,reflect:!0})],qt.prototype,"active",2);a([d({type:Boolean,reflect:!0})],qt.prototype,"closable",2);a([d({type:Boolean,reflect:!0})],qt.prototype,"disabled",2);a([d({type:Number,reflect:!0})],qt.prototype,"tabIndex",2);a([$("active")],qt.prototype,"handleActiveChange",1);a([$("disabled")],qt.prototype,"handleDisabledChange",1);qt.define("sl-tab");var jd=M`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,Wd=0,zi=class extends A{constructor(){super(...arguments),this.attrId=++Wd,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return k`
      <slot
        part="base"
        class=${P({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};zi.styles=[D,jd];a([d({reflect:!0})],zi.prototype,"name",2);a([d({type:Boolean,reflect:!0})],zi.prototype,"active",2);a([$("active")],zi.prototype,"handleActiveChange",1);zi.define("sl-tab-panel");$i.define("sl-spinner");var qd=M`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,_t=class extends A{constructor(){super(...arguments),this.formControlController=new de(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new Ct(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return k`
      <div
        class=${P({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${P({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${z(this.value)}
            .checked=${ze(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};_t.styles=[D,Ee,qd];a([S('input[type="checkbox"]')],_t.prototype,"input",2);a([O()],_t.prototype,"hasFocus",2);a([d()],_t.prototype,"title",2);a([d()],_t.prototype,"name",2);a([d()],_t.prototype,"value",2);a([d({reflect:!0})],_t.prototype,"size",2);a([d({type:Boolean,reflect:!0})],_t.prototype,"disabled",2);a([d({type:Boolean,reflect:!0})],_t.prototype,"checked",2);a([Ke("checked")],_t.prototype,"defaultChecked",2);a([d({reflect:!0})],_t.prototype,"form",2);a([d({type:Boolean,reflect:!0})],_t.prototype,"required",2);a([d({attribute:"help-text"})],_t.prototype,"helpText",2);a([$("checked",{waitUntilFirstUpdate:!0})],_t.prototype,"handleCheckedChange",1);a([$("disabled",{waitUntilFirstUpdate:!0})],_t.prototype,"handleDisabledChange",1);_t.define("sl-switch");var Kd=M`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;function hi(t,e){function i(o){const r=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,l=r.left+n.scrollX,c=r.top+n.scrollY,u=o.pageX-l,f=o.pageY-c;e!=null&&e.onMove&&e.onMove(u,f)}function s(){document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",s),e!=null&&e.onStop&&e.onStop()}document.addEventListener("pointermove",i,{passive:!0}),document.addEventListener("pointerup",s),(e==null?void 0:e.initialEvent)instanceof PointerEvent&&i(e.initialEvent)}var Lt=class extends A{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new N(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=!1,this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this)}detectSize(){const{width:t,height:e}=this.getBoundingClientRect();this.size=this.vertical?e:t}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){const e=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),hi(this,{onMove:(i,s)=>{let o=this.vertical?s:i;this.primary==="end"&&(o=this.size-o),this.snap&&this.snap.split(" ").forEach(n=>{let l;n.endsWith("%")?l=this.size*(parseFloat(n)/100):l=parseFloat(n),e&&!this.vertical&&(l=this.size-l),o>=l-this.snapThreshold&&o<=l+this.snapThreshold&&(o=l)}),this.position=at(this.pixelsToPercentage(o),0,100)},initialEvent:t}))}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let e=this.position;const i=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(e-=i),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(e+=i),t.key==="Home"&&(e=this.primary==="end"?100:0),t.key==="End"&&(e=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)e=this.positionBeforeCollapsing,this.isCollapsed=!1;else{const s=this.position;e=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=s})}this.position=at(e,0,100)}}handleResize(t){const{width:e,height:i}=t[0].contentRect;this.size=this.vertical?i:e,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){const t=this.vertical?"gridTemplateRows":"gridTemplateColumns",e=this.vertical?"gridTemplateColumns":"gridTemplateRows",i=this.localize.dir()==="rtl",s=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,o="auto";return this.primary==="end"?i&&!this.vertical?this.style[t]=`${s} var(--divider-width) ${o}`:this.style[t]=`${o} var(--divider-width) ${s}`:i&&!this.vertical?this.style[t]=`${o} var(--divider-width) ${s}`:this.style[t]=`${s} var(--divider-width) ${o}`,this.style[e]="",k`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${z(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};Lt.styles=[D,Kd];a([S(".divider")],Lt.prototype,"divider",2);a([d({type:Number,reflect:!0})],Lt.prototype,"position",2);a([d({attribute:"position-in-pixels",type:Number})],Lt.prototype,"positionInPixels",2);a([d({type:Boolean,reflect:!0})],Lt.prototype,"vertical",2);a([d({type:Boolean,reflect:!0})],Lt.prototype,"disabled",2);a([d()],Lt.prototype,"primary",2);a([d()],Lt.prototype,"snap",2);a([d({type:Number,attribute:"snap-threshold"})],Lt.prototype,"snapThreshold",2);a([$("position")],Lt.prototype,"handlePositionChange",1);a([$("positionInPixels")],Lt.prototype,"handlePositionInPixelsChange",1);a([$("vertical")],Lt.prototype,"handleVerticalChange",1);Lt.define("sl-split-panel");var Yd=M`
  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbol--active,
  .rating__partial--filled {
    color: var(--symbol-color-active);
  }

  .rating__partial-symbol-container {
    position: relative;
  }

  .rating__partial--filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
    pointer-events: none;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbol--active {
      color: SelectedItem;
    }
  }
`;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wa="important",Xd=" !"+wa,zt=ki(class extends Ci{constructor(t){var e;if(super(t),t.type!==Jt.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return s==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const s of this.ft)e[s]==null&&(this.ft.delete(s),s.includes("-")?i.removeProperty(s):i[s]=null);for(const s in e){const o=e[s];if(o!=null){this.ft.add(s);const r=typeof o=="string"&&o.endsWith(Xd);s.includes("-")||r?i.setProperty(s,r?o.slice(0,-11):o,r?wa:""):i[s]=o}}return It}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let qs=class extends Ci{constructor(e){if(super(e),this.it=X,e.type!==Jt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===X||e==null)return this._t=void 0,this.it=e;if(e===It)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const i=[e];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};qs.directiveName="unsafeHTML",qs.resultType=1;const Hi=ki(qs);var wt=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){const e=this.localize.dir()==="rtl",{left:i,right:s,width:o}=this.rating.getBoundingClientRect(),r=e?this.roundToPrecision((s-t)/o*this.max,this.precision):this.roundToPrecision((t-i)/o*this.max,this.precision);return at(r,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"))}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=!1)}handleKeyDown(t){const e=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl",s=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||e&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight"){const o=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-o),t.preventDefault()}if(t.key==="ArrowUp"||e&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft"){const o=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+o),t.preventDefault()}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==s&&this.emit("sl-change")}}handleMouseEnter(t){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(t)}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(t){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault()}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t)}handleTouchEnd(t){this.isHovering=!1,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault()}roundToPrecision(t,e=.5){const i=1/e;return Math.ceil(t*i)/i}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}})}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}})}focus(t){this.rating.focus(t)}blur(){this.rating.blur()}render(){const t=this.localize.dir()==="rtl",e=Array.from(Array(this.max).keys());let i=0;return this.disabled||this.readonly?i=this.value:i=this.isHovering?this.hoverValue:this.value,k`
      <div
        part="base"
        class=${P({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":t})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled||this.readonly?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols">
          ${e.map(s=>i>s&&i<s+1?k`
                <span
                  class=${P({rating__symbol:!0,"rating__partial-symbol-container":!0,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===s+1})}
                  role="presentation"
                >
                  <div
                    style=${zt({clipPath:t?`inset(0 ${(i-s)*100}% 0 0)`:`inset(0 0 0 ${(i-s)*100}%)`})}
                  >
                    ${Hi(this.getSymbol(s+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${zt({clipPath:t?`inset(0 0 0 ${100-(i-s)*100}%)`:`inset(0 ${100-(i-s)*100}% 0 0)`})}
                  >
                    ${Hi(this.getSymbol(s+1))}
                  </div>
                </span>
              `:k`
              <span
                class=${P({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===s+1,"rating__symbol--active":i>=s+1})}
                role="presentation"
              >
                ${Hi(this.getSymbol(s+1))}
              </span>
            `)}
        </span>
      </div>
    `}};wt.styles=[D,Yd];wt.dependencies={"sl-icon":Y};a([S(".rating")],wt.prototype,"rating",2);a([O()],wt.prototype,"hoverValue",2);a([O()],wt.prototype,"isHovering",2);a([d()],wt.prototype,"label",2);a([d({type:Number})],wt.prototype,"value",2);a([d({type:Number})],wt.prototype,"max",2);a([d({type:Number})],wt.prototype,"precision",2);a([d({type:Boolean,reflect:!0})],wt.prototype,"readonly",2);a([d({type:Boolean,reflect:!0})],wt.prototype,"disabled",2);a([d()],wt.prototype,"getSymbol",2);a([wi({passive:!0})],wt.prototype,"handleTouchMove",1);a([$("hoverValue")],wt.prototype,"handleHoverValueChange",1);a([$("isHovering")],wt.prototype,"handleIsHoveringChange",1);wt.define("sl-rating");var Gd=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],Ie=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const t=new Date,e=new Date(this.date);if(isNaN(e.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const i=e.getTime()-t.getTime(),{unit:s,value:o}=Gd.find(r=>Math.abs(i)<r.max);if(this.isoTime=e.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(i/o),s,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let r;s==="minute"?r=Pi("second"):s==="hour"?r=Pi("minute"):s==="day"?r=Pi("hour"):r=Pi("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),r)}return k` <time datetime=${this.isoTime}>${this.relativeTime}</time> `}};a([O()],Ie.prototype,"isoTime",2);a([O()],Ie.prototype,"relativeTime",2);a([d()],Ie.prototype,"date",2);a([d()],Ie.prototype,"format",2);a([d()],Ie.prototype,"numeric",2);a([d({type:Boolean})],Ie.prototype,"sync",2);function Pi(t){const i={second:1e3,minute:6e4,hour:36e5,day:864e5}[t];return i-Date.now()%i}Ie.define("sl-relative-time");var Qd=M`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,ho=class extends A{constructor(){super(...arguments),this.effect="none"}render(){return k`
      <div
        part="base"
        class=${P({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};ho.styles=[D,Qd];a([d()],ho.prototype,"effect",2);ho.define("sl-skeleton");var Zd=M`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,Z=class extends A{constructor(){super(...arguments),this.formControlController=new de(this),this.hasSlotController=new Ct(this,"help-text","label"),this.localize=new N(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`)}syncTooltip(t){if(this.output!==null){const e=this.input.offsetWidth,i=this.output.offsetWidth,s=getComputedStyle(this.input).getPropertyValue("--thumb-size"),o=this.localize.dir()==="rtl",r=e*t;if(o){const n=`${e-r}px + ${t} * ${s}`;this.output.style.translate=`calc((${n} - ${i/2}px - ${s} / 2))`}else{const n=`${r}px - ${t} * ${s}`;this.output.style.translate=`calc(${n} - ${i/2}px + ${s} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){const t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t))}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}focus(t){this.input.focus(t)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?!0:!!t,s=this.helpText?!0:!!e;return k`
      <div
        part="form-control"
        class=${P({"form-control":!0,"form-control--medium":!0,"form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${P({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${z(this.name)}
              ?disabled=${this.disabled}
              min=${z(this.min)}
              max=${z(this.max)}
              step=${z(this.step)}
              .value=${ze(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?k`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Z.styles=[D,Ee,Zd];a([S(".range__control")],Z.prototype,"input",2);a([S(".range__tooltip")],Z.prototype,"output",2);a([O()],Z.prototype,"hasFocus",2);a([O()],Z.prototype,"hasTooltip",2);a([d()],Z.prototype,"title",2);a([d()],Z.prototype,"name",2);a([d({type:Number})],Z.prototype,"value",2);a([d()],Z.prototype,"label",2);a([d({attribute:"help-text"})],Z.prototype,"helpText",2);a([d({type:Boolean,reflect:!0})],Z.prototype,"disabled",2);a([d({type:Number})],Z.prototype,"min",2);a([d({type:Number})],Z.prototype,"max",2);a([d({type:Number})],Z.prototype,"step",2);a([d()],Z.prototype,"tooltip",2);a([d({attribute:!1})],Z.prototype,"tooltipFormatter",2);a([d({reflect:!0})],Z.prototype,"form",2);a([Ke()],Z.prototype,"defaultValue",2);a([wi({passive:!0})],Z.prototype,"handleThumbDragStart",1);a([$("value",{waitUntilFirstUpdate:!0})],Z.prototype,"handleValueChange",1);a([$("disabled",{waitUntilFirstUpdate:!0})],Z.prototype,"handleDisabledChange",1);a([$("hasTooltip",{waitUntilFirstUpdate:!0})],Z.prototype,"syncRange",1);Z.define("sl-range");var Jd=M`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`,B=class extends A{constructor(){super(...arguments),this.formControlController=new de(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ct(this,"help-text","label"),this.localize=new N(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=!1,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=t=>k`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,i=e.closest(".select__clear")!==null,s=e.closest("sl-icon-button")!==null;if(!(i||s)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const o=this.getAllOptions(),r=o.indexOf(this.currentOption);let n=Math.max(0,r);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=r+1,n>o.length-1&&(n=0)):t.key==="ArrowUp"?(n=r-1,n<0&&(n=o.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=o.length-1),this.setCurrentOption(o[n])}if(t.key&&t.key.length===1||t.key==="Backspace"){const o=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const r of o)if(r.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(r);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange()}),this.open=!1}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const i=t.composedPath().some(s=>s instanceof Element&&s.tagName.toLowerCase()==="sl-icon-button");this.disabled||i||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=!0,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const i=t.target.closest("sl-option"),s=this.value;i&&!i.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(i):this.setSelectedOptions(i),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==s&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions(),e=this.valueHasChanged?this.value:this.defaultValue,i=Array.isArray(e)?e:[e],s=[];t.forEach(o=>s.push(o.value)),this.setSelectedOptions(t.filter(o=>i.includes(o.value)))}handleTagRemove(t,e){t.stopPropagation(),this.valueHasChanged=!0,this.disabled||(this.toggleOptionSelection(e,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(i=>{i.current=!1,i.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),i=Array.isArray(t)?t:[t];e.forEach(s=>s.selected=!1),i.length&&i.forEach(s=>s.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){var t,e,i;const s=this.getAllOptions();this.selectedOptions=s.filter(r=>r.selected);const o=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(r=>r.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const r=this.selectedOptions[0];this.value=(t=r==null?void 0:r.value)!=null?t:"",this.displayLabel=(i=(e=r==null?void 0:r.getTextLabel)==null?void 0:e.call(r))!=null?i:""}this.valueHasChanged=o,this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const i=this.getTag(t,e);return k`<div @sl-remove=${s=>this.handleTagRemove(s,t)}>
          ${typeof i=="string"?Hi(i):i}
        </div>`}else if(e===this.maxOptionsVisible)return k`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`;return k``})}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}attributeChangedCallback(t,e,i){if(super.attributeChangedCallback(t,e,i),t==="value"){const s=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=s}}handleValueChange(){if(!this.valueHasChanged){const i=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=i}const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(i=>e.includes(i.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await nt(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:t,options:e}=G(this,"select.show",{dir:this.localize.dir()});await it(this.popup.popup,t,e),this.currentOption&&Ws(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await nt(this);const{keyframes:t,options:e}=G(this,"select.hide",{dir:this.localize.dir()});await it(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,kt(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,kt(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?!0:!!t,s=this.helpText?!0:!!e,o=this.clearable&&!this.disabled&&this.value.length>0,r=this.placeholder&&this.value&&this.value.length<=0;return k`
      <div
        part="form-control"
        class=${P({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${P({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":r,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?k`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${o?k`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};B.styles=[D,Ee,Jd];B.dependencies={"sl-icon":Y,"sl-popup":W,"sl-tag":be};a([S(".select")],B.prototype,"popup",2);a([S(".select__combobox")],B.prototype,"combobox",2);a([S(".select__display-input")],B.prototype,"displayInput",2);a([S(".select__value-input")],B.prototype,"valueInput",2);a([S(".select__listbox")],B.prototype,"listbox",2);a([O()],B.prototype,"hasFocus",2);a([O()],B.prototype,"displayLabel",2);a([O()],B.prototype,"currentOption",2);a([O()],B.prototype,"selectedOptions",2);a([O()],B.prototype,"valueHasChanged",2);a([d()],B.prototype,"name",2);a([O()],B.prototype,"value",1);a([d({attribute:"value"})],B.prototype,"defaultValue",2);a([d({reflect:!0})],B.prototype,"size",2);a([d()],B.prototype,"placeholder",2);a([d({type:Boolean,reflect:!0})],B.prototype,"multiple",2);a([d({attribute:"max-options-visible",type:Number})],B.prototype,"maxOptionsVisible",2);a([d({type:Boolean,reflect:!0})],B.prototype,"disabled",2);a([d({type:Boolean})],B.prototype,"clearable",2);a([d({type:Boolean,reflect:!0})],B.prototype,"open",2);a([d({type:Boolean})],B.prototype,"hoist",2);a([d({type:Boolean,reflect:!0})],B.prototype,"filled",2);a([d({type:Boolean,reflect:!0})],B.prototype,"pill",2);a([d()],B.prototype,"label",2);a([d({reflect:!0})],B.prototype,"placement",2);a([d({attribute:"help-text"})],B.prototype,"helpText",2);a([d({reflect:!0})],B.prototype,"form",2);a([d({type:Boolean,reflect:!0})],B.prototype,"required",2);a([d()],B.prototype,"getTag",2);a([$("disabled",{waitUntilFirstUpdate:!0})],B.prototype,"handleDisabledChange",1);a([$(["defaultValue","value"],{waitUntilFirstUpdate:!0})],B.prototype,"handleValueChange",1);a([$("open",{waitUntilFirstUpdate:!0})],B.prototype,"handleOpenChange",1);q("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});q("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});B.define("sl-select");Si.define("sl-resize-observer");var th=M`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,eh=M`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,Me=class extends A{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){const e=ii(t.target);e==null||e.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(t){const e=ii(t.target);e==null||e.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(t){const e=ii(t.target);e==null||e.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(t){const e=ii(t.target);e==null||e.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach(e=>{const i=t.indexOf(e),s=ii(e);s&&(s.toggleAttribute("data-sl-button-group__button",!0),s.toggleAttribute("data-sl-button-group__button--first",i===0),s.toggleAttribute("data-sl-button-group__button--inner",i>0&&i<t.length-1),s.toggleAttribute("data-sl-button-group__button--last",i===t.length-1),s.toggleAttribute("data-sl-button-group__button--radio",s.tagName.toLowerCase()==="sl-radio-button"))})}render(){return k`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Me.styles=[D,eh];a([S("slot")],Me.prototype,"defaultSlot",2);a([O()],Me.prototype,"disableRole",2);a([d()],Me.prototype,"label",2);function ii(t){var e;const i="sl-button, sl-radio-button";return(e=t.closest(i))!=null?e:t.querySelector(i)}var bt=class extends A{constructor(){super(...arguments),this.formControlController=new de(this),this.hasSlotController=new Ct(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){const t=this.required&&!this.value;return this.customValidityMessage!==""?tc:t?Jl:es}get validationMessage(){const t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){const e=t.target.closest("sl-radio, sl-radio-button"),i=this.getAllRadios(),s=this.value;!e||e.disabled||(this.value=e.value,i.forEach(o=>o.checked=o===e),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;const i=this.getAllRadios().filter(l=>!l.disabled),s=(e=i.find(l=>l.checked))!=null?e:i[0],o=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,r=this.value;let n=i.indexOf(s)+o;n<0&&(n=i.length-1),n>i.length-1&&(n=0),this.getAllRadios().forEach(l=>{l.checked=!1,this.hasButtonGroup||l.setAttribute("tabindex","-1")}),this.value=i[n].value,i[n].checked=!0,this.hasButtonGroup?i[n].shadowRoot.querySelector("button").focus():(i[n].setAttribute("tabindex","0"),i[n].focus()),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault()}handleLabelClick(){this.focus()}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}async syncRadioElements(){var t,e;const i=this.getAllRadios();if(await Promise.all(i.map(async s=>{await s.updateComplete,s.checked=s.value===this.value,s.size=this.size})),this.hasButtonGroup=i.some(s=>s.tagName.toLowerCase()==="sl-radio-button"),i.length>0&&!i.some(s=>s.checked))if(this.hasButtonGroup){const s=(t=i[0].shadowRoot)==null?void 0:t.querySelector("button");s&&s.setAttribute("tabindex","0")}else i[0].setAttribute("tabindex","0");if(this.hasButtonGroup){const s=(e=this.shadowRoot)==null?void 0:e.querySelector("sl-button-group");s&&(s.disableRole=!0)}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios())}updateCheckedRadio(){this.getAllRadios().forEach(e=>e.checked=e.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){const t=this.required&&!this.value,e=this.customValidityMessage!=="";return t||e?(this.formControlController.emitInvalidEvent(),!1):!0}getForm(){return this.formControlController.getForm()}reportValidity(){const t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){const e=this.getAllRadios(),i=e.find(r=>r.checked),s=e.find(r=>!r.disabled),o=i||s;o&&o.focus(t)}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?!0:!!t,s=this.helpText?!0:!!e,o=k`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return k`
      <fieldset
        part="form-control"
        class=${P({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":!0,"form-control--has-label":i,"form-control--has-help-text":s})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?k`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${o}
                </sl-button-group>
              `:o}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};bt.styles=[D,Ee,th];bt.dependencies={"sl-button-group":Me};a([S("slot:not([name])")],bt.prototype,"defaultSlot",2);a([S(".radio-group__validation-input")],bt.prototype,"validationInput",2);a([O()],bt.prototype,"hasButtonGroup",2);a([O()],bt.prototype,"errorMessage",2);a([O()],bt.prototype,"defaultValue",2);a([d()],bt.prototype,"label",2);a([d({attribute:"help-text"})],bt.prototype,"helpText",2);a([d()],bt.prototype,"name",2);a([d({reflect:!0})],bt.prototype,"value",2);a([d({reflect:!0})],bt.prototype,"size",2);a([d({reflect:!0})],bt.prototype,"form",2);a([d({type:Boolean,reflect:!0})],bt.prototype,"required",2);a([$("size",{waitUntilFirstUpdate:!0})],bt.prototype,"handleSizeChange",1);a([$("value")],bt.prototype,"handleValueChange",1);bt.define("sl-radio-group");var xa=M`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,ih=M`
  ${xa}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`,Kt=class extends A{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){return di`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${P({button:!0,"button--default":!0,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${z(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Kt.styles=[D,ih];a([S(".button")],Kt.prototype,"input",2);a([S(".hidden-input")],Kt.prototype,"hiddenInput",2);a([O()],Kt.prototype,"hasFocus",2);a([d({type:Boolean,reflect:!0})],Kt.prototype,"checked",2);a([d()],Kt.prototype,"value",2);a([d({type:Boolean,reflect:!0})],Kt.prototype,"disabled",2);a([d({reflect:!0})],Kt.prototype,"size",2);a([d({type:Boolean,reflect:!0})],Kt.prototype,"pill",2);a([$("disabled",{waitUntilFirstUpdate:!0})],Kt.prototype,"handleDisabledChange",1);Kt.define("sl-radio-button");var sh=M`
  :host {
    --size: 128px;
    --track-width: 4px;
    --track-color: var(--sl-color-neutral-200);
    --indicator-width: var(--track-width);
    --indicator-color: var(--sl-color-primary-600);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    width: var(--size);
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .progress-ring__track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--indicator-width);
    stroke-linecap: round;
    transition-property: stroke-dashoffset;
    transition-duration: var(--indicator-transition-duration);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
  }
`,Ye=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.value=0,this.label=""}updated(t){if(super.updated(t),t.has("value")){const e=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),i=2*Math.PI*e,s=i-this.value/100*i;this.indicatorOffset=`${s}px`}}render(){return k`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value/100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <slot id="label" part="label" class="progress-ring__label"></slot>
      </div>
    `}};Ye.styles=[D,sh];a([S(".progress-ring__indicator")],Ye.prototype,"indicator",2);a([O()],Ye.prototype,"indicatorOffset",2);a([d({type:Number,reflect:!0})],Ye.prototype,"value",2);a([d()],Ye.prototype,"label",2);Ye.define("sl-progress-ring");var oh=M`
  :host {
    display: inline-block;
  }
`;let ka=null;class Ca{}Ca.render=function(t,e){ka(t,e)};self.QrCreator=Ca;(function(t){function e(l,c,u,f){var h={},p=t(u,c);p.u(l),p.J(),f=f||0;var m=p.h(),g=p.h()+2*f;return h.text=l,h.level=c,h.version=u,h.O=g,h.a=function(b,_){return b-=f,_-=f,0>b||b>=m||0>_||_>=m?!1:p.a(b,_)},h}function i(l,c,u,f,h,p,m,g,b,_){function C(w,x,v,y,E,T,R){w?(l.lineTo(x+T,v+R),l.arcTo(x,v,y,E,p)):l.lineTo(x,v)}m?l.moveTo(c+p,u):l.moveTo(c,u),C(g,f,u,f,h,-p,0),C(b,f,h,c,h,0,-p),C(_,c,h,c,u,p,0),C(m,c,u,f,u,0,p)}function s(l,c,u,f,h,p,m,g,b,_){function C(w,x,v,y){l.moveTo(w+v,x),l.lineTo(w,x),l.lineTo(w,x+y),l.arcTo(w,x,w+v,x,p)}m&&C(c,u,p,p),g&&C(f,u,-p,p),b&&C(f,h,-p,-p),_&&C(c,h,p,-p)}function o(l,c){var u=c.fill;if(typeof u=="string")l.fillStyle=u;else{var f=u.type,h=u.colorStops;if(u=u.position.map(m=>Math.round(m*c.size)),f==="linear-gradient")var p=l.createLinearGradient.apply(l,u);else if(f==="radial-gradient")p=l.createRadialGradient.apply(l,u);else throw Error("Unsupported fill");h.forEach(([m,g])=>{p.addColorStop(m,g)}),l.fillStyle=p}}function r(l,c){t:{var u=c.text,f=c.v,h=c.N,p=c.K,m=c.P;for(h=Math.max(1,h||1),p=Math.min(40,p||40);h<=p;h+=1)try{var g=e(u,f,h,m);break t}catch{}g=void 0}if(!g)return null;for(u=l.getContext("2d"),c.background&&(u.fillStyle=c.background,u.fillRect(c.left,c.top,c.size,c.size)),f=g.O,p=c.size/f,u.beginPath(),m=0;m<f;m+=1)for(h=0;h<f;h+=1){var b=u,_=c.left+h*p,C=c.top+m*p,w=m,x=h,v=g.a,y=_+p,E=C+p,T=w-1,R=w+1,L=x-1,I=x+1,Q=Math.floor(Math.min(.5,Math.max(0,c.R))*p),J=v(w,x),rt=v(T,L),tt=v(T,x);T=v(T,I);var xt=v(w,I);I=v(R,I),x=v(R,x),R=v(R,L),w=v(w,L),_=Math.round(_),C=Math.round(C),y=Math.round(y),E=Math.round(E),J?i(b,_,C,y,E,Q,!tt&&!w,!tt&&!xt,!x&&!xt,!x&&!w):s(b,_,C,y,E,Q,tt&&w&&rt,tt&&xt&&T,x&&xt&&I,x&&w&&R)}return o(u,c),u.fill(),l}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};ka=function(l,c){var u={};Object.assign(u,n,l),u.N=u.minVersion,u.K=u.maxVersion,u.v=u.ecLevel,u.left=u.left,u.top=u.top,u.size=u.size,u.fill=u.fill,u.background=u.background,u.text=u.text,u.R=u.radius,u.P=u.quiet,c instanceof HTMLCanvasElement?((c.width!==u.size||c.height!==u.size)&&(c.width=u.size,c.height=u.size),c.getContext("2d").clearRect(0,0,c.width,c.height),r(c,u)):(l=document.createElement("canvas"),l.width=u.size,l.height=u.size,u=r(l,u),c.appendChild(u))}})(function(){function t(c){var u=i.s(c);return{S:function(){return 4},b:function(){return u.length},write:function(f){for(var h=0;h<u.length;h+=1)f.put(u[h],8)}}}function e(){var c=[],u=0,f={B:function(){return c},c:function(h){return(c[Math.floor(h/8)]>>>7-h%8&1)==1},put:function(h,p){for(var m=0;m<p;m+=1)f.m((h>>>p-m-1&1)==1)},f:function(){return u},m:function(h){var p=Math.floor(u/8);c.length<=p&&c.push(0),h&&(c[p]|=128>>>u%8),u+=1}};return f}function i(c,u){function f(w,x){for(var v=-1;7>=v;v+=1)if(!(-1>=w+v||g<=w+v))for(var y=-1;7>=y;y+=1)-1>=x+y||g<=x+y||(m[w+v][x+y]=0<=v&&6>=v&&(y==0||y==6)||0<=y&&6>=y&&(v==0||v==6)||2<=v&&4>=v&&2<=y&&4>=y)}function h(w,x){for(var v=g=4*c+17,y=Array(v),E=0;E<v;E+=1){y[E]=Array(v);for(var T=0;T<v;T+=1)y[E][T]=null}for(m=y,f(0,0),f(g-7,0),f(0,g-7),v=r.G(c),y=0;y<v.length;y+=1)for(E=0;E<v.length;E+=1){T=v[y];var R=v[E];if(m[T][R]==null)for(var L=-2;2>=L;L+=1)for(var I=-2;2>=I;I+=1)m[T+L][R+I]=L==-2||L==2||I==-2||I==2||L==0&&I==0}for(v=8;v<g-8;v+=1)m[v][6]==null&&(m[v][6]=v%2==0);for(v=8;v<g-8;v+=1)m[6][v]==null&&(m[6][v]=v%2==0);for(v=r.w(p<<3|x),y=0;15>y;y+=1)E=!w&&(v>>y&1)==1,m[6>y?y:8>y?y+1:g-15+y][8]=E,m[8][8>y?g-y-1:9>y?15-y:14-y]=E;if(m[g-8][8]=!w,7<=c){for(v=r.A(c),y=0;18>y;y+=1)E=!w&&(v>>y&1)==1,m[Math.floor(y/3)][y%3+g-8-3]=E;for(y=0;18>y;y+=1)E=!w&&(v>>y&1)==1,m[y%3+g-8-3][Math.floor(y/3)]=E}if(b==null){for(w=l.I(c,p),v=e(),y=0;y<_.length;y+=1)E=_[y],v.put(4,4),v.put(E.b(),r.f(4,c)),E.write(v);for(y=E=0;y<w.length;y+=1)E+=w[y].j;if(v.f()>8*E)throw Error("code length overflow. ("+v.f()+">"+8*E+")");for(v.f()+4<=8*E&&v.put(0,4);v.f()%8!=0;)v.m(!1);for(;!(v.f()>=8*E)&&(v.put(236,8),!(v.f()>=8*E));)v.put(17,8);var Q=0;for(E=y=0,T=Array(w.length),R=Array(w.length),L=0;L<w.length;L+=1){var J=w[L].j,rt=w[L].o-J;for(y=Math.max(y,J),E=Math.max(E,rt),T[L]=Array(J),I=0;I<T[L].length;I+=1)T[L][I]=255&v.B()[I+Q];for(Q+=J,I=r.C(rt),J=s(T[L],I.b()-1).l(I),R[L]=Array(I.b()-1),I=0;I<R[L].length;I+=1)rt=I+J.b()-R[L].length,R[L][I]=0<=rt?J.c(rt):0}for(I=v=0;I<w.length;I+=1)v+=w[I].o;for(v=Array(v),I=Q=0;I<y;I+=1)for(L=0;L<w.length;L+=1)I<T[L].length&&(v[Q]=T[L][I],Q+=1);for(I=0;I<E;I+=1)for(L=0;L<w.length;L+=1)I<R[L].length&&(v[Q]=R[L][I],Q+=1);b=v}for(w=b,v=-1,y=g-1,E=7,T=0,x=r.F(x),R=g-1;0<R;R-=2)for(R==6&&--R;;){for(L=0;2>L;L+=1)m[y][R-L]==null&&(I=!1,T<w.length&&(I=(w[T]>>>E&1)==1),x(y,R-L)&&(I=!I),m[y][R-L]=I,--E,E==-1&&(T+=1,E=7));if(y+=v,0>y||g<=y){y-=v,v=-v;break}}}var p=o[u],m=null,g=0,b=null,_=[],C={u:function(w){w=t(w),_.push(w),b=null},a:function(w,x){if(0>w||g<=w||0>x||g<=x)throw Error(w+","+x);return m[w][x]},h:function(){return g},J:function(){for(var w=0,x=0,v=0;8>v;v+=1){h(!0,v);var y=r.D(C);(v==0||w>y)&&(w=y,x=v)}h(!1,x)}};return C}function s(c,u){if(typeof c.length>"u")throw Error(c.length+"/"+u);var f=function(){for(var p=0;p<c.length&&c[p]==0;)p+=1;for(var m=Array(c.length-p+u),g=0;g<c.length-p;g+=1)m[g]=c[g+p];return m}(),h={c:function(p){return f[p]},b:function(){return f.length},multiply:function(p){for(var m=Array(h.b()+p.b()-1),g=0;g<h.b();g+=1)for(var b=0;b<p.b();b+=1)m[g+b]^=n.i(n.g(h.c(g))+n.g(p.c(b)));return s(m,0)},l:function(p){if(0>h.b()-p.b())return h;for(var m=n.g(h.c(0))-n.g(p.c(0)),g=Array(h.b()),b=0;b<h.b();b+=1)g[b]=h.c(b);for(b=0;b<p.b();b+=1)g[b]^=n.i(n.g(p.c(b))+m);return s(g,0).l(p)}};return h}i.s=function(c){for(var u=[],f=0;f<c.length;f++){var h=c.charCodeAt(f);128>h?u.push(h):2048>h?u.push(192|h>>6,128|h&63):55296>h||57344<=h?u.push(224|h>>12,128|h>>6&63,128|h&63):(f++,h=65536+((h&1023)<<10|c.charCodeAt(f)&1023),u.push(240|h>>18,128|h>>12&63,128|h>>6&63,128|h&63))}return u};var o={L:1,M:0,Q:3,H:2},r=function(){function c(h){for(var p=0;h!=0;)p+=1,h>>>=1;return p}var u=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],f={w:function(h){for(var p=h<<10;0<=c(p)-c(1335);)p^=1335<<c(p)-c(1335);return(h<<10|p)^21522},A:function(h){for(var p=h<<12;0<=c(p)-c(7973);)p^=7973<<c(p)-c(7973);return h<<12|p},G:function(h){return u[h-1]},F:function(h){switch(h){case 0:return function(p,m){return(p+m)%2==0};case 1:return function(p){return p%2==0};case 2:return function(p,m){return m%3==0};case 3:return function(p,m){return(p+m)%3==0};case 4:return function(p,m){return(Math.floor(p/2)+Math.floor(m/3))%2==0};case 5:return function(p,m){return p*m%2+p*m%3==0};case 6:return function(p,m){return(p*m%2+p*m%3)%2==0};case 7:return function(p,m){return(p*m%3+(p+m)%2)%2==0};default:throw Error("bad maskPattern:"+h)}},C:function(h){for(var p=s([1],0),m=0;m<h;m+=1)p=p.multiply(s([1,n.i(m)],0));return p},f:function(h,p){if(h!=4||1>p||40<p)throw Error("mode: "+h+"; type: "+p);return 10>p?8:16},D:function(h){for(var p=h.h(),m=0,g=0;g<p;g+=1)for(var b=0;b<p;b+=1){for(var _=0,C=h.a(g,b),w=-1;1>=w;w+=1)if(!(0>g+w||p<=g+w))for(var x=-1;1>=x;x+=1)0>b+x||p<=b+x||(w!=0||x!=0)&&C==h.a(g+w,b+x)&&(_+=1);5<_&&(m+=3+_-5)}for(g=0;g<p-1;g+=1)for(b=0;b<p-1;b+=1)_=0,h.a(g,b)&&(_+=1),h.a(g+1,b)&&(_+=1),h.a(g,b+1)&&(_+=1),h.a(g+1,b+1)&&(_+=1),(_==0||_==4)&&(m+=3);for(g=0;g<p;g+=1)for(b=0;b<p-6;b+=1)h.a(g,b)&&!h.a(g,b+1)&&h.a(g,b+2)&&h.a(g,b+3)&&h.a(g,b+4)&&!h.a(g,b+5)&&h.a(g,b+6)&&(m+=40);for(b=0;b<p;b+=1)for(g=0;g<p-6;g+=1)h.a(g,b)&&!h.a(g+1,b)&&h.a(g+2,b)&&h.a(g+3,b)&&h.a(g+4,b)&&!h.a(g+5,b)&&h.a(g+6,b)&&(m+=40);for(b=_=0;b<p;b+=1)for(g=0;g<p;g+=1)h.a(g,b)&&(_+=1);return m+=Math.abs(100*_/p/p-50)/5*10}};return f}(),n=function(){for(var c=Array(256),u=Array(256),f=0;8>f;f+=1)c[f]=1<<f;for(f=8;256>f;f+=1)c[f]=c[f-4]^c[f-5]^c[f-6]^c[f-8];for(f=0;255>f;f+=1)u[c[f]]=f;return{g:function(h){if(1>h)throw Error("glog("+h+")");return u[h]},i:function(h){for(;0>h;)h+=255;for(;256<=h;)h-=255;return c[h]}}}(),l=function(){function c(h,p){switch(p){case o.L:return u[4*(h-1)];case o.M:return u[4*(h-1)+1];case o.Q:return u[4*(h-1)+2];case o.H:return u[4*(h-1)+3]}}var u=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],f={I:function(h,p){var m=c(h,p);if(typeof m>"u")throw Error("bad rs block @ typeNumber:"+h+"/errorCorrectLevel:"+p);h=m.length/3,p=[];for(var g=0;g<h;g+=1)for(var b=m[3*g],_=m[3*g+1],C=m[3*g+2],w=0;w<b;w+=1){var x=C,v={};v.o=_,v.j=x,p.push(v)}return p}};return f}();return i}());const rh=QrCreator;var Yt=class extends A{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){this.hasUpdated&&rh.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas)}render(){var t;return k`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${zt({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Yt.styles=[D,oh];a([S("canvas")],Yt.prototype,"canvas",2);a([d()],Yt.prototype,"value",2);a([d()],Yt.prototype,"label",2);a([d({type:Number})],Yt.prototype,"size",2);a([d()],Yt.prototype,"fill",2);a([d()],Yt.prototype,"background",2);a([d({type:Number})],Yt.prototype,"radius",2);a([d({attribute:"error-correction"})],Yt.prototype,"errorCorrection",2);a([$(["background","errorCorrection","fill","radius","size","value"])],Yt.prototype,"generate",1);Yt.define("sl-qr-code");var ah=M`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`,oe=class extends A{constructor(){super(),this.checked=!1,this.hasFocus=!1,this.size="medium",this.disabled=!1,this.handleBlur=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.handleClick=()=>{this.disabled||(this.checked=!0)},this.handleFocus=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return k`
      <span
        part="base"
        class=${P({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?k` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};oe.styles=[D,ah];oe.dependencies={"sl-icon":Y};a([O()],oe.prototype,"checked",2);a([O()],oe.prototype,"hasFocus",2);a([d()],oe.prototype,"value",2);a([d({reflect:!0})],oe.prototype,"size",2);a([d({type:Boolean,reflect:!0})],oe.prototype,"disabled",2);a([$("checked")],oe.prototype,"handleCheckedChange",1);a([$("disabled",{waitUntilFirstUpdate:!0})],oe.prototype,"handleDisabledChange",1);oe.define("sl-radio");W.define("sl-popup");var nh=M`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,Ht=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){customElements.whenDefined("sl-select").then(()=>{const t=this.closest("sl-select");t&&t.handleDefaultSlotChange()})}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const t=this.childNodes;let e="";return[...t].forEach(i=>{i.nodeType===Node.ELEMENT_NODE&&(i.hasAttribute("slot")||(e+=i.textContent)),i.nodeType===Node.TEXT_NODE&&(e+=i.textContent)}),e.trim()}render(){return k`
      <div
        part="base"
        class=${P({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Ht.styles=[D,nh];Ht.dependencies={"sl-icon":Y};a([S(".option__label")],Ht.prototype,"defaultSlot",2);a([O()],Ht.prototype,"current",2);a([O()],Ht.prototype,"selected",2);a([O()],Ht.prototype,"hasHover",2);a([d({reflect:!0})],Ht.prototype,"value",2);a([d({type:Boolean,reflect:!0})],Ht.prototype,"disabled",2);a([$("disabled")],Ht.prototype,"handleDisabledChange",1);a([$("selected")],Ht.prototype,"handleSelectedChange",1);a([$("value")],Ht.prototype,"handleValueChange",1);Ht.define("sl-option");var lh=M`
  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`,Ai=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return k`
      <div
        part="base"
        class=${P({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":this.localize.dir()==="rtl"})}
        role="progressbar"
        title=${z(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${zt({width:`${this.value}%`})}>
          ${this.indeterminate?"":k` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `}};Ai.styles=[D,lh];a([d({type:Number,reflect:!0})],Ai.prototype,"value",2);a([d({type:Boolean,reflect:!0})],Ai.prototype,"indeterminate",2);a([d()],Ai.prototype,"label",2);Ai.define("sl-progress-bar");var ch=M`
  :host {
    display: contents;
  }
`,re=class extends A{constructor(){super(...arguments),this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1,this.handleMutation=t=>{this.emit("sl-mutation",{detail:{mutationList:t}})}}connectedCallback(){super.connectedCallback(),this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){const t=typeof this.attr=="string"&&this.attr.length>0,e=t&&this.attr!=="*"?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:t,attributeFilter:e,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return k` <slot></slot> `}};re.styles=[D,ch];a([d({reflect:!0})],re.prototype,"attr",2);a([d({attribute:"attr-old-value",type:Boolean,reflect:!0})],re.prototype,"attrOldValue",2);a([d({attribute:"char-data",type:Boolean,reflect:!0})],re.prototype,"charData",2);a([d({attribute:"char-data-old-value",type:Boolean,reflect:!0})],re.prototype,"charDataOldValue",2);a([d({attribute:"child-list",type:Boolean,reflect:!0})],re.prototype,"childList",2);a([d({type:Boolean,reflect:!0})],re.prototype,"disabled",2);a([$("disabled")],re.prototype,"handleDisabledChange",1);a([$("attr",{waitUntilFirstUpdate:!0}),$("attr-old-value",{waitUntilFirstUpdate:!0}),$("char-data",{waitUntilFirstUpdate:!0}),$("char-data-old-value",{waitUntilFirstUpdate:!0}),$("childList",{waitUntilFirstUpdate:!0})],re.prototype,"handleChange",1);re.define("sl-mutation-observer");var dh=M`
  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
    -webkit-user-select: none;
  }
`,$a=class extends A{render(){return k` <slot part="base" class="menu-label"></slot> `}};$a.styles=[D,dh];$a.define("sl-menu-label");var hh=M`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,F=class extends A{constructor(){super(...arguments),this.formControlController=new de(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ct(this,"help-text","label"),this.localize=new N(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i)}setRangeText(t,e,i,s="preserve"){const o=e??this.input.selectionStart,r=i??this.input.selectionEnd;this.input.setRangeText(t,o,r,s),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?!0:!!t,s=this.helpText?!0:!!e,r=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return k`
      <div
        part="form-control"
        class=${P({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${P({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${z(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${z(this.placeholder)}
              minlength=${z(this.minlength)}
              maxlength=${z(this.maxlength)}
              min=${z(this.min)}
              max=${z(this.max)}
              step=${z(this.step)}
              .value=${ze(this.value)}
              autocapitalize=${z(this.autocapitalize)}
              autocomplete=${z(this.autocomplete)}
              autocorrect=${z(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${z(this.pattern)}
              enterkeyhint=${z(this.enterkeyhint)}
              inputmode=${z(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${r?k`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?k`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?k`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:k`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};F.styles=[D,Ee,hh];F.dependencies={"sl-icon":Y};a([S(".input__control")],F.prototype,"input",2);a([O()],F.prototype,"hasFocus",2);a([d()],F.prototype,"title",2);a([d({reflect:!0})],F.prototype,"type",2);a([d()],F.prototype,"name",2);a([d()],F.prototype,"value",2);a([Ke()],F.prototype,"defaultValue",2);a([d({reflect:!0})],F.prototype,"size",2);a([d({type:Boolean,reflect:!0})],F.prototype,"filled",2);a([d({type:Boolean,reflect:!0})],F.prototype,"pill",2);a([d()],F.prototype,"label",2);a([d({attribute:"help-text"})],F.prototype,"helpText",2);a([d({type:Boolean})],F.prototype,"clearable",2);a([d({type:Boolean,reflect:!0})],F.prototype,"disabled",2);a([d()],F.prototype,"placeholder",2);a([d({type:Boolean,reflect:!0})],F.prototype,"readonly",2);a([d({attribute:"password-toggle",type:Boolean})],F.prototype,"passwordToggle",2);a([d({attribute:"password-visible",type:Boolean})],F.prototype,"passwordVisible",2);a([d({attribute:"no-spin-buttons",type:Boolean})],F.prototype,"noSpinButtons",2);a([d({reflect:!0})],F.prototype,"form",2);a([d({type:Boolean,reflect:!0})],F.prototype,"required",2);a([d()],F.prototype,"pattern",2);a([d({type:Number})],F.prototype,"minlength",2);a([d({type:Number})],F.prototype,"maxlength",2);a([d()],F.prototype,"min",2);a([d()],F.prototype,"max",2);a([d()],F.prototype,"step",2);a([d()],F.prototype,"autocapitalize",2);a([d()],F.prototype,"autocorrect",2);a([d()],F.prototype,"autocomplete",2);a([d({type:Boolean})],F.prototype,"autofocus",2);a([d()],F.prototype,"enterkeyhint",2);a([d({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],F.prototype,"spellcheck",2);a([d()],F.prototype,"inputmode",2);a([$("disabled",{waitUntilFirstUpdate:!0})],F.prototype,"handleDisabledChange",1);a([$("step",{waitUntilFirstUpdate:!0})],F.prototype,"handleStepChange",1);a([$("value",{waitUntilFirstUpdate:!0})],F.prototype,"handleValueChange",1);F.define("sl-input");var uh=M`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,uo=class extends A{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(t){const e=["menuitem","menuitemcheckbox"],i=t.composedPath(),s=i.find(l=>{var c;return e.includes(((c=l==null?void 0:l.getAttribute)==null?void 0:c.call(l,"role"))||"")});if(!s||i.find(l=>{var c;return((c=l==null?void 0:l.getAttribute)==null?void 0:c.call(l,"role"))==="menu"})!==this)return;const n=s;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}})}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){const e=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),e==null||e.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){const e=this.getAllItems(),i=this.getCurrentItem();let s=i?e.indexOf(i):0;e.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?s++:t.key==="ArrowUp"?s--:t.key==="Home"?s=0:t.key==="End"&&(s=e.length-1),s<0&&(s=e.length-1),s>e.length-1&&(s=0),this.setCurrentItem(e[s]),e[s].focus())}}handleMouseDown(t){const e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){const t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0])}isMenuItem(t){var e;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((e=t.getAttribute("role"))!=null?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(i=>{i.setAttribute("tabindex",i===t?"0":"-1")})}render(){return k`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};uo.styles=[D,uh];a([S("slot")],uo.prototype,"defaultSlot",2);uo.define("sl-menu");var ph=M`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ui=(t,e)=>{var s;const i=t._$AN;if(i===void 0)return!1;for(const o of i)(s=o._$AO)==null||s.call(o,e,!1),ui(o,e);return!0},Zi=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e}while((i==null?void 0:i.size)===0)},Sa=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),gh(e)}};function fh(t){this._$AN!==void 0?(Zi(this),this._$AM=t,Sa(this)):this._$AM=t}function mh(t,e=!1,i=0){const s=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(s))for(let r=i;r<s.length;r++)ui(s[r],!1),Zi(s[r]);else s!=null&&(ui(s,!1),Zi(s));else ui(this,t)}const gh=t=>{t.type==Jt.CHILD&&(t._$AP??(t._$AP=mh),t._$AQ??(t._$AQ=fh))};class bh extends Ci{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,i,s){super._$AT(e,i,s),Sa(this),this.isConnected=e._$AU}_$AO(e,i=!0){var s,o;e!==this.isConnected&&(this.isConnected=e,e?(s=this.reconnected)==null||s.call(this):(o=this.disconnected)==null||o.call(this)),i&&(ui(this,e),Zi(this))}setValue(e){if(ya(this._$Ct))this._$Ct._$AI(e,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=e,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vh=()=>new yh;class yh{}const zs=new WeakMap,_h=ki(class extends bh{render(t){return X}update(t,[e]){var s;const i=e!==this.Y;return i&&this.Y!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.Y=e,this.ht=(s=t.options)==null?void 0:s.host,this.rt(this.ct=t.element)),X}rt(t){if(this.isConnected||(t=void 0),typeof this.Y=="function"){const e=this.ht??globalThis;let i=zs.get(e);i===void 0&&(i=new WeakMap,zs.set(e,i)),i.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),i.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){var t,e;return typeof this.Y=="function"?(t=zs.get(this.ht??globalThis))==null?void 0:t.get(this.Y):(e=this.Y)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var wh=class{constructor(t,e){this.popupRef=vh(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=i=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${i.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${i.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=i=>{switch(i.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":i.target!==this.host&&(i.preventDefault(),i.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(i);break}},this.handleClick=i=>{var s;i.target===this.host?(i.preventDefault(),i.stopPropagation()):i.target instanceof Element&&(i.target.tagName==="sl-menu-item"||(s=i.target.role)!=null&&s.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=i=>{i.relatedTarget&&i.relatedTarget instanceof Element&&this.host.contains(i.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=i=>{i.stopPropagation()},this.handlePopupReposition=()=>{const i=this.host.renderRoot.querySelector("slot[name='submenu']"),s=i==null?void 0:i.assignedElements({flatten:!0}).filter(u=>u.localName==="sl-menu")[0],o=getComputedStyle(this.host).direction==="rtl";if(!s)return;const{left:r,top:n,width:l,height:c}=s.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${o?r+l:r}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${o?r+l:r}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+c}px`)},(this.host=t).addController(this),this.hasSlotController=e}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(t){const e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let i=null;for(const s of e.assignedElements())if(i=s.querySelectorAll("sl-menu-item, [role^='menuitem']"),i.length!==0)break;if(!(!i||i.length===0)){i[0].setAttribute("tabindex","0");for(let s=1;s!==i.length;++s)i[s].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?i[0]instanceof HTMLElement&&i[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{i[0]instanceof HTMLElement&&i[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate())}enableSubmenu(t=!0){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;const e=this.host.parentElement.computedStyleMap(),s=["padding-top","border-top-width","margin-top"].reduce((o,r)=>{var n;const l=(n=e.get(r))!=null?n:new CSSUnitValue(0,"px"),u=(l instanceof CSSUnitValue?l:new CSSUnitValue(0,"px")).to("px");return o-u.value},0);this.skidding=s}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?k`
      <sl-popup
        ${_h(this.popupRef)}
        placement=${t?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:k` <slot name="submenu" hidden></slot> `}},Pt=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new Ct(this,"submenu"),this.submenuController=new wh(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleMouseOver=t=>{this.focus(),t.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return vd(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const t=this.localize.dir()==="rtl",e=this.submenuController.isExpanded();return k`
      <div
        id="anchor"
        part="base"
        class=${P({"menu-item":!0,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!e}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${t?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?k` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};Pt.styles=[D,ph];Pt.dependencies={"sl-icon":Y,"sl-popup":W,"sl-spinner":$i};a([S("slot:not([name])")],Pt.prototype,"defaultSlot",2);a([S(".menu-item")],Pt.prototype,"menuItem",2);a([d()],Pt.prototype,"type",2);a([d({type:Boolean,reflect:!0})],Pt.prototype,"checked",2);a([d()],Pt.prototype,"value",2);a([d({type:Boolean,reflect:!0})],Pt.prototype,"loading",2);a([d({type:Boolean,reflect:!0})],Pt.prototype,"disabled",2);a([$("checked")],Pt.prototype,"handleCheckedChange",1);a([$("disabled")],Pt.prototype,"handleDisabledChange",1);a([$("type")],Pt.prototype,"handleTypeChange",1);Pt.define("sl-menu-item");var xh=M`
  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    display: block;
    pointer-events: none;
  }

  .image-comparer__before::slotted(img),
  .image-comparer__after::slotted(img),
  .image-comparer__before::slotted(svg),
  .image-comparer__after::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    translate: calc(var(--divider-width) / -2);
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-700);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`,Oe=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.position=50}handleDrag(t){const{width:e}=this.base.getBoundingClientRect(),i=this.localize.dir()==="rtl";t.preventDefault(),hi(this.base,{onMove:s=>{this.position=parseFloat(at(s/e*100,0,100).toFixed(2)),i&&(this.position=100-this.position)},initialEvent:t})}handleKeyDown(t){const e=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl";if(["ArrowLeft","ArrowRight","Home","End"].includes(t.key)){const s=t.shiftKey?10:1;let o=this.position;t.preventDefault(),(e&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight")&&(o-=s),(e&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft")&&(o+=s),t.key==="Home"&&(o=0),t.key==="End"&&(o=100),o=at(o,0,100),this.position=o}}handlePositionChange(){this.emit("sl-change")}render(){const t=this.localize.dir()==="rtl";return k`
      <div
        part="base"
        id="image-comparer"
        class=${P({"image-comparer":!0,"image-comparer--rtl":t})}
        @keydown=${this.handleKeyDown}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${zt({clipPath:t?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${zt({left:t?`${100-this.position}%`:`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle">
              <sl-icon library="system" name="grip-vertical"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `}};Oe.styles=[D,xh];Oe.scopedElement={"sl-icon":Y};a([S(".image-comparer")],Oe.prototype,"base",2);a([S(".image-comparer__handle")],Oe.prototype,"handle",2);a([d({type:Number,reflect:!0})],Oe.prototype,"position",2);a([$("position",{waitUntilFirstUpdate:!0})],Oe.prototype,"handlePositionChange",1);Oe.define("sl-image-comparer");var kh=M`
  :host {
    display: block;
  }
`,As=new Map;function Ch(t,e="cors"){const i=As.get(t);if(i!==void 0)return Promise.resolve(i);const s=fetch(t,{mode:e}).then(async o=>{const r={ok:o.ok,status:o.status,html:await o.text()};return As.set(t,r),r});return As.set(t,s),s}var Xe=class extends A{constructor(){super(...arguments),this.mode="cors",this.allowScripts=!1}executeScript(t){const e=document.createElement("script");[...t.attributes].forEach(i=>e.setAttribute(i.name,i.value)),e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}async handleSrcChange(){try{const t=this.src,e=await Ch(t,this.mode);if(t!==this.src)return;if(!e.ok){this.emit("sl-error",{detail:{status:e.status}});return}this.innerHTML=e.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(i=>this.executeScript(i)),this.emit("sl-load")}catch{this.emit("sl-error",{detail:{status:-1}})}}render(){return k`<slot></slot>`}};Xe.styles=[D,kh];a([d()],Xe.prototype,"src",2);a([d()],Xe.prototype,"mode",2);a([d({attribute:"allow-scripts",type:Boolean})],Xe.prototype,"allowScripts",2);a([$("src")],Xe.prototype,"handleSrcChange",1);Xe.define("sl-include");ht.define("sl-icon-button");Y.define("sl-icon");var ns=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const t=["","kilo","mega","giga","tera"],e=["","kilo","mega","giga","tera","peta"],i=this.unit==="bit"?t:e,s=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),i.length-1)),o=i[s]+this.unit,r=parseFloat((this.value/Math.pow(1e3,s)).toPrecision(3));return this.localize.number(r,{style:"unit",unit:o,unitDisplay:this.display})}};a([d({type:Number})],ns.prototype,"value",2);a([d()],ns.prototype,"unit",2);a([d()],ns.prototype,"display",2);ns.define("sl-format-bytes");var Dt=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.date=new Date,this.hourFormat="auto"}render(){const t=new Date(this.date),e=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(!isNaN(t.getMilliseconds()))return k`
      <time datetime=${t.toISOString()}>
        ${this.localize.date(t,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e})}
      </time>
    `}};a([d()],Dt.prototype,"date",2);a([d()],Dt.prototype,"weekday",2);a([d()],Dt.prototype,"era",2);a([d()],Dt.prototype,"year",2);a([d()],Dt.prototype,"month",2);a([d()],Dt.prototype,"day",2);a([d()],Dt.prototype,"hour",2);a([d()],Dt.prototype,"minute",2);a([d()],Dt.prototype,"second",2);a([d({attribute:"time-zone-name"})],Dt.prototype,"timeZoneName",2);a([d({attribute:"time-zone"})],Dt.prototype,"timeZone",2);a([d({attribute:"hour-format"})],Dt.prototype,"hourFormat",2);Dt.define("sl-format-date");var Xt=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};a([d({type:Number})],Xt.prototype,"value",2);a([d()],Xt.prototype,"type",2);a([d({attribute:"no-grouping",type:Boolean})],Xt.prototype,"noGrouping",2);a([d()],Xt.prototype,"currency",2);a([d({attribute:"currency-display"})],Xt.prototype,"currencyDisplay",2);a([d({attribute:"minimum-integer-digits",type:Number})],Xt.prototype,"minimumIntegerDigits",2);a([d({attribute:"minimum-fraction-digits",type:Number})],Xt.prototype,"minimumFractionDigits",2);a([d({attribute:"maximum-fraction-digits",type:Number})],Xt.prototype,"maximumFractionDigits",2);a([d({attribute:"minimum-significant-digits",type:Number})],Xt.prototype,"minimumSignificantDigits",2);a([d({attribute:"maximum-significant-digits",type:Number})],Xt.prototype,"maximumSignificantDigits",2);Xt.define("sl-format-number");var $h=M`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,ls=class extends A{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};ls.styles=[D,$h];a([d({type:Boolean,reflect:!0})],ls.prototype,"vertical",2);a([$("vertical")],ls.prototype,"handleVerticalChange",1);ls.define("sl-divider");var Sh=M`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,Tr=new WeakMap;function za(t){let e=Tr.get(t);return e||(e=window.getComputedStyle(t,null),Tr.set(t,e)),e}function zh(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=za(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ah(t){const e=za(t),{overflowY:i,overflowX:s}=e;return i==="scroll"||s==="scroll"?!0:i!=="auto"||s!=="auto"?!1:t.scrollHeight>t.clientHeight&&i==="auto"||t.scrollWidth>t.clientWidth&&s==="auto"}function Eh(t){const e=t.tagName.toLowerCase(),i=Number(t.getAttribute("tabindex"));return t.hasAttribute("tabindex")&&(isNaN(i)||i<=-1)||t.hasAttribute("disabled")||t.closest("[inert]")||e==="input"&&t.getAttribute("type")==="radio"&&!t.hasAttribute("checked")||!zh(t)?!1:(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Ah(t)}function Th(t){var e,i;const s=Ks(t),o=(e=s[0])!=null?e:null,r=(i=s[s.length-1])!=null?i:null;return{start:o,end:r}}function Ih(t,e){var i;return((i=t.getRootNode({composed:!0}))==null?void 0:i.host)!==e}function Ks(t){const e=new WeakMap,i=[];function s(o){if(o instanceof Element){if(o.hasAttribute("inert")||o.closest("[inert]")||e.has(o))return;e.set(o,!0),!i.includes(o)&&Eh(o)&&i.push(o),o instanceof HTMLSlotElement&&Ih(o,t)&&o.assignedElements({flatten:!0}).forEach(r=>{s(r)}),o.shadowRoot!==null&&o.shadowRoot.mode==="open"&&s(o.shadowRoot)}for(const r of o.children)s(r)}return s(t),i.sort((o,r)=>{const n=Number(o.getAttribute("tabindex"))||0;return(Number(r.getAttribute("tabindex"))||0)-n})}function*po(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Zl(po(t.shadowRoot.activeElement))))}function Mh(){return[...po()].pop()}var si=[],Aa=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var i;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const s=Mh();if(this.previousFocus=s,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const o=Ks(this.element);let r=o.findIndex(l=>l===s);this.previousFocus=this.currentFocus;const n=this.tabDirection==="forward"?1:-1;for(;;){r+n>=o.length?r=0:r+n<0?r=o.length-1:r+=n,this.previousFocus=this.currentFocus;const l=o[r];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||l&&this.possiblyHasTabbableChildren(l))return;e.preventDefault(),this.currentFocus=l,(i=this.currentFocus)==null||i.focus({preventScroll:!1});const c=[...po()];if(c.includes(this.currentFocus)||!c.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){si.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){si=si.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return si[si.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=Ks(this.element);if(!this.element.matches(":focus-within")){const e=t[0],i=t[t.length-1],s=this.tabDirection==="forward"?e:i;typeof(s==null?void 0:s.focus)=="function"&&(this.currentFocus=s,s.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}};function Ir(t){return t.charAt(0).toUpperCase()+t.slice(1)}var Rt=class extends A{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"footer"),this.localize=new N(this),this.modal=new Aa(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=t=>{this.contained||t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),li(this)))}disconnectedCallback(){super.disconnectedCallback(),ci(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const i=G(this,"drawer.denyClose",{dir:this.localize.dir()});it(this.panel,i.keyframes,i.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;document.removeEventListener("keydown",this.handleDocumentKeyDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),li(this));const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([nt(this.drawer),nt(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=G(this,`drawer.show${Ir(this.placement)}`,{dir:this.localize.dir()}),i=G(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([it(this.panel,e.keyframes,e.options),it(this.overlay,i.keyframes,i.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),ci(this)),await Promise.all([nt(this.drawer),nt(this.overlay)]);const t=G(this,`drawer.hide${Ir(this.placement)}`,{dir:this.localize.dir()}),e=G(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([it(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),it(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;const i=this.originalTrigger;typeof(i==null?void 0:i.focus)=="function"&&setTimeout(()=>i.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),li(this)),this.open&&this.contained&&(this.modal.deactivate(),ci(this))}async show(){if(!this.open)return this.open=!0,kt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,kt(this,"sl-after-hide")}render(){return k`
      <div
        part="base"
        class=${P({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":this.localize.dir()==="rtl","drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${z(this.noHeader?this.label:void 0)}
          aria-labelledby=${z(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":k`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Rt.styles=[D,Sh];Rt.dependencies={"sl-icon-button":ht};a([S(".drawer")],Rt.prototype,"drawer",2);a([S(".drawer__panel")],Rt.prototype,"panel",2);a([S(".drawer__overlay")],Rt.prototype,"overlay",2);a([d({type:Boolean,reflect:!0})],Rt.prototype,"open",2);a([d({reflect:!0})],Rt.prototype,"label",2);a([d({reflect:!0})],Rt.prototype,"placement",2);a([d({type:Boolean,reflect:!0})],Rt.prototype,"contained",2);a([d({attribute:"no-header",type:Boolean,reflect:!0})],Rt.prototype,"noHeader",2);a([$("open",{waitUntilFirstUpdate:!0})],Rt.prototype,"handleOpenChange",1);a([$("contained",{waitUntilFirstUpdate:!0})],Rt.prototype,"handleNoModalChange",1);q("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});q("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}});q("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});q("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}});q("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});q("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}});q("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});q("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}});q("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}});q("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});q("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Rt.define("sl-drawer");var Oh=M`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,vt=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var i,s,o;const r=((i=this.containingElement)==null?void 0:i.getRootNode())instanceof ShadowRoot?(o=(s=document.activeElement)==null?void 0:s.shadowRoot)==null?void 0:o.activeElement:document.activeElement;(!this.containingElement||(r==null?void 0:r.closest(this.containingElement.tagName.toLowerCase()))!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{const e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const t=this.trigger.assignedElements({flatten:!0})[0];typeof(t==null?void 0:t.focus)=="function"&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}const e=this.getMenu();if(e){const i=e.getAllItems(),s=i[0],o=i[i.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),i.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(s),s.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(o),o.focus())}))}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const e=this.trigger.assignedElements({flatten:!0}).find(s=>Th(s).start);let i;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":i=e.button;break;default:i=e}i.setAttribute("aria-haspopup","true"),i.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,kt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,kt(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await nt(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=G(this,"dropdown.show",{dir:this.localize.dir()});await it(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await nt(this);const{keyframes:t,options:e}=G(this,"dropdown.hide",{dir:this.localize.dir()});await it(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return k`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${z(this.sync?this.sync:void 0)}
        class=${P({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};vt.styles=[D,Oh];vt.dependencies={"sl-popup":W};a([S(".dropdown")],vt.prototype,"popup",2);a([S(".dropdown__trigger")],vt.prototype,"trigger",2);a([S(".dropdown__panel")],vt.prototype,"panel",2);a([d({type:Boolean,reflect:!0})],vt.prototype,"open",2);a([d({reflect:!0})],vt.prototype,"placement",2);a([d({type:Boolean,reflect:!0})],vt.prototype,"disabled",2);a([d({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],vt.prototype,"stayOpenOnSelect",2);a([d({attribute:!1})],vt.prototype,"containingElement",2);a([d({type:Number})],vt.prototype,"distance",2);a([d({type:Number})],vt.prototype,"skidding",2);a([d({type:Boolean})],vt.prototype,"hoist",2);a([d({reflect:!0})],vt.prototype,"sync",2);a([$("open",{waitUntilFirstUpdate:!0})],vt.prototype,"handleOpenChange",1);q("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});q("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});vt.define("sl-dropdown");var Lh=M`
  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`,pt=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){const e=this.getRootNode(),i=this.from.includes("."),s=this.from.includes("[")&&this.from.includes("]");let o=this.from,r="";i?[o,r]=this.from.trim().split("."):s&&([o,r]=this.from.trim().replace(/\]$/,"").split("["));const n="getElementById"in e?e.getElementById(o):null;n?s?t=n.getAttribute(r)||"":i?t=n[r]||"":t=n.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(!t)this.showStatus("error"),this.emit("sl-error");else try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.emit("sl-copy",{detail:{value:t}})}catch{this.showStatus("error"),this.emit("sl-error")}}async showStatus(t){const e=this.copyLabel||this.localize.term("copy"),i=this.successLabel||this.localize.term("copied"),s=this.errorLabel||this.localize.term("error"),o=t==="success"?this.successIcon:this.errorIcon,r=G(this,"copy.in",{dir:"ltr"}),n=G(this,"copy.out",{dir:"ltr"});this.tooltip.content=t==="success"?i:s,await this.copyIcon.animate(n.keyframes,n.options).finished,this.copyIcon.hidden=!0,this.status=t,o.hidden=!1,await o.animate(r.keyframes,r.options).finished,setTimeout(async()=>{await o.animate(n.keyframes,n.options).finished,o.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(r.keyframes,r.options).finished,this.tooltip.content=e,this.isCopying=!1},this.feedbackDuration)}render(){const t=this.copyLabel||this.localize.term("copy");return k`
      <sl-tooltip
        class=${P({"copy-button":!0,"copy-button--success":this.status==="success","copy-button--error":this.status==="error"})}
        content=${t}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};pt.styles=[D,Lh];pt.dependencies={"sl-icon":Y,"sl-tooltip":ut};a([S('slot[name="copy-icon"]')],pt.prototype,"copyIcon",2);a([S('slot[name="success-icon"]')],pt.prototype,"successIcon",2);a([S('slot[name="error-icon"]')],pt.prototype,"errorIcon",2);a([S("sl-tooltip")],pt.prototype,"tooltip",2);a([O()],pt.prototype,"isCopying",2);a([O()],pt.prototype,"status",2);a([d()],pt.prototype,"value",2);a([d()],pt.prototype,"from",2);a([d({type:Boolean,reflect:!0})],pt.prototype,"disabled",2);a([d({attribute:"copy-label"})],pt.prototype,"copyLabel",2);a([d({attribute:"success-label"})],pt.prototype,"successLabel",2);a([d({attribute:"error-label"})],pt.prototype,"errorLabel",2);a([d({attribute:"feedback-duration",type:Number})],pt.prototype,"feedbackDuration",2);a([d({attribute:"tooltip-placement"})],pt.prototype,"tooltipPlacement",2);a([d({type:Boolean})],pt.prototype,"hoist",2);q("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}});q("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}});pt.define("sl-copy-button");var Ph=M`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`,Gt=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(const e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect()}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await nt(this.body);const{keyframes:e,options:i}=G(this,"details.show",{dir:this.localize.dir()});await it(this.body,Gi(e,this.body.scrollHeight),i),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await nt(this.body);const{keyframes:e,options:i}=G(this,"details.hide",{dir:this.localize.dir()});await it(this.body,Gi(e,this.body.scrollHeight),i),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!(this.open||this.disabled))return this.open=!0,kt(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,kt(this,"sl-after-hide")}render(){const t=this.localize.dir()==="rtl";return k`
      <details
        part="base"
        class=${P({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};Gt.styles=[D,Ph];Gt.dependencies={"sl-icon":Y};a([S(".details")],Gt.prototype,"details",2);a([S(".details__header")],Gt.prototype,"header",2);a([S(".details__body")],Gt.prototype,"body",2);a([S(".details__expand-icon-slot")],Gt.prototype,"expandIconSlot",2);a([d({type:Boolean,reflect:!0})],Gt.prototype,"open",2);a([d()],Gt.prototype,"summary",2);a([d({type:Boolean,reflect:!0})],Gt.prototype,"disabled",2);a([$("open",{waitUntilFirstUpdate:!0})],Gt.prototype,"handleOpenChange",1);q("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});q("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});Gt.define("sl-details");var Dh=M`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,ae=class extends A{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"footer"),this.localize=new N(this),this.modal=new Aa(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),li(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),ci(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const i=G(this,"dialog.denyClose",{dir:this.localize.dir()});it(this.panel,i.keyframes,i.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),li(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([nt(this.dialog),nt(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=G(this,"dialog.show",{dir:this.localize.dir()}),i=G(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([it(this.panel,e.keyframes,e.options),it(this.overlay,i.keyframes,i.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([nt(this.dialog),nt(this.overlay)]);const t=G(this,"dialog.hide",{dir:this.localize.dir()}),e=G(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([it(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),it(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,ci(this);const i=this.originalTrigger;typeof(i==null?void 0:i.focus)=="function"&&setTimeout(()=>i.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,kt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,kt(this,"sl-after-hide")}render(){return k`
      <div
        part="base"
        class=${P({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${z(this.noHeader?this.label:void 0)}
          aria-labelledby=${z(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":k`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};ae.styles=[D,Dh];ae.dependencies={"sl-icon-button":ht};a([S(".dialog")],ae.prototype,"dialog",2);a([S(".dialog__panel")],ae.prototype,"panel",2);a([S(".dialog__overlay")],ae.prototype,"overlay",2);a([d({type:Boolean,reflect:!0})],ae.prototype,"open",2);a([d({reflect:!0})],ae.prototype,"label",2);a([d({attribute:"no-header",type:Boolean,reflect:!0})],ae.prototype,"noHeader",2);a([$("open",{waitUntilFirstUpdate:!0})],ae.prototype,"handleOpenChange",1);q("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});q("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});q("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});q("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});q("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});ae.define("sl-dialog");dt.define("sl-checkbox");var Rh=M`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,K=class extends A{constructor(){super(...arguments),this.formControlController=new de(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Ct(this,"[default]","prefix","suffix"),this.localize=new N(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:es}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?Qi`a`:Qi`button`;return di`
      <${e}
        part="base"
        class=${P({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${z(t?void 0:this.disabled)}
        type=${z(t?void 0:this.type)}
        title=${this.title}
        name=${z(t?void 0:this.name)}
        value=${z(t?void 0:this.value)}
        href=${z(t&&!this.disabled?this.href:void 0)}
        target=${z(t?this.target:void 0)}
        download=${z(t?this.download:void 0)}
        rel=${z(t?this.rel:void 0)}
        role=${z(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?di` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?di`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};K.styles=[D,xa];K.dependencies={"sl-icon":Y,"sl-spinner":$i};a([S(".button")],K.prototype,"button",2);a([O()],K.prototype,"hasFocus",2);a([O()],K.prototype,"invalid",2);a([d()],K.prototype,"title",2);a([d({reflect:!0})],K.prototype,"variant",2);a([d({reflect:!0})],K.prototype,"size",2);a([d({type:Boolean,reflect:!0})],K.prototype,"caret",2);a([d({type:Boolean,reflect:!0})],K.prototype,"disabled",2);a([d({type:Boolean,reflect:!0})],K.prototype,"loading",2);a([d({type:Boolean,reflect:!0})],K.prototype,"outline",2);a([d({type:Boolean,reflect:!0})],K.prototype,"pill",2);a([d({type:Boolean,reflect:!0})],K.prototype,"circle",2);a([d()],K.prototype,"type",2);a([d()],K.prototype,"name",2);a([d()],K.prototype,"value",2);a([d()],K.prototype,"href",2);a([d()],K.prototype,"target",2);a([d()],K.prototype,"rel",2);a([d()],K.prototype,"download",2);a([d()],K.prototype,"form",2);a([d({attribute:"formaction"})],K.prototype,"formAction",2);a([d({attribute:"formenctype"})],K.prototype,"formEnctype",2);a([d({attribute:"formmethod"})],K.prototype,"formMethod",2);a([d({attribute:"formnovalidate",type:Boolean})],K.prototype,"formNoValidate",2);a([d({attribute:"formtarget"})],K.prototype,"formTarget",2);a([$("disabled",{waitUntilFirstUpdate:!0})],K.prototype,"handleDisabledChange",1);function mt(t,e){Fh(t)&&(t="100%");const i=Bh(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),i&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function Di(t){return Math.min(1,Math.max(0,t))}function Fh(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function Bh(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Ea(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Ri(t){return Number(t)<=1?`${Number(t)*100}%`:t}function ke(t){return t.length===1?"0"+t:String(t)}function Vh(t,e,i){return{r:mt(t,255)*255,g:mt(e,255)*255,b:mt(i,255)*255}}function Mr(t,e,i){t=mt(t,255),e=mt(e,255),i=mt(i,255);const s=Math.max(t,e,i),o=Math.min(t,e,i);let r=0,n=0;const l=(s+o)/2;if(s===o)n=0,r=0;else{const c=s-o;switch(n=l>.5?c/(2-s-o):c/(s+o),s){case t:r=(e-i)/c+(e<i?6:0);break;case e:r=(i-t)/c+2;break;case i:r=(t-e)/c+4;break}r/=6}return{h:r,s:n,l}}function Es(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+(e-t)*(6*i):i<1/2?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function Nh(t,e,i){let s,o,r;if(t=mt(t,360),e=mt(e,100),i=mt(i,100),e===0)o=i,r=i,s=i;else{const n=i<.5?i*(1+e):i+e-i*e,l=2*i-n;s=Es(l,n,t+1/3),o=Es(l,n,t),r=Es(l,n,t-1/3)}return{r:s*255,g:o*255,b:r*255}}function Or(t,e,i){t=mt(t,255),e=mt(e,255),i=mt(i,255);const s=Math.max(t,e,i),o=Math.min(t,e,i);let r=0;const n=s,l=s-o,c=s===0?0:l/s;if(s===o)r=0;else{switch(s){case t:r=(e-i)/l+(e<i?6:0);break;case e:r=(i-t)/l+2;break;case i:r=(t-e)/l+4;break}r/=6}return{h:r,s:c,v:n}}function Hh(t,e,i){t=mt(t,360)*6,e=mt(e,100),i=mt(i,100);const s=Math.floor(t),o=t-s,r=i*(1-e),n=i*(1-o*e),l=i*(1-(1-o)*e),c=s%6,u=[i,n,r,r,l,i][c],f=[l,i,i,n,r,r][c],h=[r,r,l,i,i,n][c];return{r:u*255,g:f*255,b:h*255}}function Lr(t,e,i,s){const o=[ke(Math.round(t).toString(16)),ke(Math.round(e).toString(16)),ke(Math.round(i).toString(16))];return s&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function Uh(t,e,i,s,o){const r=[ke(Math.round(t).toString(16)),ke(Math.round(e).toString(16)),ke(Math.round(i).toString(16)),ke(Wh(s))];return o&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))&&r[3].startsWith(r[3].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0)+r[3].charAt(0):r.join("")}function jh(t,e,i,s){const o=t/100,r=e/100,n=i/100,l=s/100,c=255*(1-o)*(1-l),u=255*(1-r)*(1-l),f=255*(1-n)*(1-l);return{r:c,g:u,b:f}}function Pr(t,e,i){let s=1-t/255,o=1-e/255,r=1-i/255,n=Math.min(s,o,r);return n===1?(s=0,o=0,r=0):(s=(s-n)/(1-n)*100,o=(o-n)/(1-n)*100,r=(r-n)/(1-n)*100),n*=100,{c:Math.round(s),m:Math.round(o),y:Math.round(r),k:Math.round(n)}}function Wh(t){return Math.round(parseFloat(t)*255).toString(16)}function Dr(t){return Et(t)/255}function Et(t){return parseInt(t,16)}function qh(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}const Ys={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Kh(t){let e={r:0,g:0,b:0},i=1,s=null,o=null,r=null,n=!1,l=!1;return typeof t=="string"&&(t=Gh(t)),typeof t=="object"&&(At(t.r)&&At(t.g)&&At(t.b)?(e=Vh(t.r,t.g,t.b),n=!0,l=String(t.r).substr(-1)==="%"?"prgb":"rgb"):At(t.h)&&At(t.s)&&At(t.v)?(s=Ri(t.s),o=Ri(t.v),e=Hh(t.h,s,o),n=!0,l="hsv"):At(t.h)&&At(t.s)&&At(t.l)?(s=Ri(t.s),r=Ri(t.l),e=Nh(t.h,s,r),n=!0,l="hsl"):At(t.c)&&At(t.m)&&At(t.y)&&At(t.k)&&(e=jh(t.c,t.m,t.y,t.k),n=!0,l="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(i=t.a)),i=Ea(i),{ok:n,format:t.format||l,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:i}}const Yh="[-\\+]?\\d+%?",Xh="[-\\+]?\\d*\\.\\d+%?",ue="(?:"+Xh+")|(?:"+Yh+")",Ts="[\\s|\\(]+("+ue+")[,|\\s]+("+ue+")[,|\\s]+("+ue+")\\s*\\)?",Fi="[\\s|\\(]+("+ue+")[,|\\s]+("+ue+")[,|\\s]+("+ue+")[,|\\s]+("+ue+")\\s*\\)?",Nt={CSS_UNIT:new RegExp(ue),rgb:new RegExp("rgb"+Ts),rgba:new RegExp("rgba"+Fi),hsl:new RegExp("hsl"+Ts),hsla:new RegExp("hsla"+Fi),hsv:new RegExp("hsv"+Ts),hsva:new RegExp("hsva"+Fi),cmyk:new RegExp("cmyk"+Fi),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Gh(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if(Ys[t])t=Ys[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let i=Nt.rgb.exec(t);return i?{r:i[1],g:i[2],b:i[3]}:(i=Nt.rgba.exec(t),i?{r:i[1],g:i[2],b:i[3],a:i[4]}:(i=Nt.hsl.exec(t),i?{h:i[1],s:i[2],l:i[3]}:(i=Nt.hsla.exec(t),i?{h:i[1],s:i[2],l:i[3],a:i[4]}:(i=Nt.hsv.exec(t),i?{h:i[1],s:i[2],v:i[3]}:(i=Nt.hsva.exec(t),i?{h:i[1],s:i[2],v:i[3],a:i[4]}:(i=Nt.cmyk.exec(t),i?{c:i[1],m:i[2],y:i[3],k:i[4]}:(i=Nt.hex8.exec(t),i?{r:Et(i[1]),g:Et(i[2]),b:Et(i[3]),a:Dr(i[4]),format:e?"name":"hex8"}:(i=Nt.hex6.exec(t),i?{r:Et(i[1]),g:Et(i[2]),b:Et(i[3]),format:e?"name":"hex"}:(i=Nt.hex4.exec(t),i?{r:Et(i[1]+i[1]),g:Et(i[2]+i[2]),b:Et(i[3]+i[3]),a:Dr(i[4]+i[4]),format:e?"name":"hex8"}:(i=Nt.hex3.exec(t),i?{r:Et(i[1]+i[1]),g:Et(i[2]+i[2]),b:Et(i[3]+i[3]),format:e?"name":"hex"}:!1))))))))))}function At(t){return typeof t=="number"?!Number.isNaN(t):Nt.CSS_UNIT.test(t)}class et{constructor(e="",i={}){if(e instanceof et)return e;typeof e=="number"&&(e=qh(e)),this.originalInput=e;const s=Kh(e);this.originalInput=e,this.r=s.r,this.g=s.g,this.b=s.b,this.a=s.a,this.roundA=Math.round(100*this.a)/100,this.format=i.format??s.format,this.gradientType=i.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=s.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){const e=this.toRgb();let i,s,o;const r=e.r/255,n=e.g/255,l=e.b/255;return r<=.03928?i=r/12.92:i=Math.pow((r+.055)/1.055,2.4),n<=.03928?s=n/12.92:s=Math.pow((n+.055)/1.055,2.4),l<=.03928?o=l/12.92:o=Math.pow((l+.055)/1.055,2.4),.2126*i+.7152*s+.0722*o}getAlpha(){return this.a}setAlpha(e){return this.a=Ea(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return e===0}toHsv(){const e=Or(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=Or(this.r,this.g,this.b),i=Math.round(e.h*360),s=Math.round(e.s*100),o=Math.round(e.v*100);return this.a===1?`hsv(${i}, ${s}%, ${o}%)`:`hsva(${i}, ${s}%, ${o}%, ${this.roundA})`}toHsl(){const e=Mr(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){const e=Mr(this.r,this.g,this.b),i=Math.round(e.h*360),s=Math.round(e.s*100),o=Math.round(e.l*100);return this.a===1?`hsl(${i}, ${s}%, ${o}%)`:`hsla(${i}, ${s}%, ${o}%, ${this.roundA})`}toHex(e=!1){return Lr(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return Uh(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),i=Math.round(this.g),s=Math.round(this.b);return this.a===1?`rgb(${e}, ${i}, ${s})`:`rgba(${e}, ${i}, ${s}, ${this.roundA})`}toPercentageRgb(){const e=i=>`${Math.round(mt(i,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=i=>Math.round(mt(i,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...Pr(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:i,y:s,k:o}=Pr(this.r,this.g,this.b);return`cmyk(${e}, ${i}, ${s}, ${o})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const e="#"+Lr(this.r,this.g,this.b,!1);for(const[i,s]of Object.entries(Ys))if(e===s)return i;return!1}toString(e){const i=!!e;e=e??this.format;let s=!1;const o=this.a<1&&this.a>=0;return!i&&o&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(s=this.toRgbString()),e==="prgb"&&(s=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(s=this.toHexString()),e==="hex3"&&(s=this.toHexString(!0)),e==="hex4"&&(s=this.toHex8String(!0)),e==="hex8"&&(s=this.toHex8String()),e==="name"&&(s=this.toName()),e==="hsl"&&(s=this.toHslString()),e==="hsv"&&(s=this.toHsvString()),e==="cmyk"&&(s=this.toCmykString()),s||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new et(this.toString())}lighten(e=10){const i=this.toHsl();return i.l+=e/100,i.l=Di(i.l),new et(i)}brighten(e=10){const i=this.toRgb();return i.r=Math.max(0,Math.min(255,i.r-Math.round(255*-(e/100)))),i.g=Math.max(0,Math.min(255,i.g-Math.round(255*-(e/100)))),i.b=Math.max(0,Math.min(255,i.b-Math.round(255*-(e/100)))),new et(i)}darken(e=10){const i=this.toHsl();return i.l-=e/100,i.l=Di(i.l),new et(i)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const i=this.toHsl();return i.s-=e/100,i.s=Di(i.s),new et(i)}saturate(e=10){const i=this.toHsl();return i.s+=e/100,i.s=Di(i.s),new et(i)}greyscale(){return this.desaturate(100)}spin(e){const i=this.toHsl(),s=(i.h+e)%360;return i.h=s<0?360+s:s,new et(i)}mix(e,i=50){const s=this.toRgb(),o=new et(e).toRgb(),r=i/100,n={r:(o.r-s.r)*r+s.r,g:(o.g-s.g)*r+s.g,b:(o.b-s.b)*r+s.b,a:(o.a-s.a)*r+s.a};return new et(n)}analogous(e=6,i=30){const s=this.toHsl(),o=360/i,r=[this];for(s.h=(s.h-(o*e>>1)+720)%360;--e;)s.h=(s.h+o)%360,r.push(new et(s));return r}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new et(e)}monochromatic(e=6){const i=this.toHsv(),{h:s}=i,{s:o}=i;let{v:r}=i;const n=[],l=1/e;for(;e--;)n.push(new et({h:s,s:o,v:r})),r=(r+l)%1;return n}splitcomplement(){const e=this.toHsl(),{h:i}=e;return[this,new et({h:(i+72)%360,s:e.s,l:e.l}),new et({h:(i+216)%360,s:e.s,l:e.l})]}onBackground(e){const i=this.toRgb(),s=new et(e).toRgb(),o=i.a+s.a*(1-i.a);return new et({r:(i.r*i.a+s.r*s.a*(1-i.a))/o,g:(i.g*i.a+s.g*s.a*(1-i.a))/o,b:(i.b*i.a+s.b*s.a*(1-i.a))/o,a:o})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const i=this.toHsl(),{h:s}=i,o=[this],r=360/e;for(let n=1;n<e;n++)o.push(new et({h:(s+n*r)%360,s:i.s,l:i.l}));return o}equals(e){const i=new et(e);return this.format==="cmyk"||i.format==="cmyk"?this.toCmykString()===i.toCmykString():this.toRgbString()===i.toRgbString()}}var Rr="EyeDropper"in window,V=class extends A{constructor(){super(),this.formControlController=new de(this),this.isSafeValue=!1,this.localize=new N(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!1,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.handleFocusOut=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity()})}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),i=e.querySelector(".color-picker__slider-handle"),{width:s}=e.getBoundingClientRect();let o=this.value,r=this.value;i.focus(),t.preventDefault(),hi(e,{onMove:n=>{this.alpha=at(n/s*100,0,100),this.syncValues(),this.value!==r&&(r=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==o&&(o=this.value,this.emit("sl-change"))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),i=e.querySelector(".color-picker__slider-handle"),{width:s}=e.getBoundingClientRect();let o=this.value,r=this.value;i.focus(),t.preventDefault(),hi(e,{onMove:n=>{this.hue=at(n/s*360,0,360),this.syncValues(),this.value!==r&&(r=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==o&&(o=this.value,this.emit("sl-change"))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".color-picker__grid"),i=e.querySelector(".color-picker__grid-handle"),{width:s,height:o}=e.getBoundingClientRect();let r=this.value,n=this.value;i.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,hi(e,{onMove:(l,c)=>{this.saturation=at(l/s*100,0,100),this.brightness=at(100-c/o*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==r&&(r=this.value,this.emit("sl-change"))},initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=at(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=at(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(t){const e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=at(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=at(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(t){const e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=at(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=at(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=at(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=at(this.brightness-e,0,100),this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(t){const e=t.target,i=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value):this.value="",this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0}}handleInputInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleTouchMove(t){t.preventDefault()}parseColor(t){const e=new et(t);if(!e.isValid)return null;const i=e.toHsl(),s={h:i.h,s:i.s*100,l:i.l*100,a:i.a},o=e.toRgb(),r=e.toHexString(),n=e.toHex8String(),l=e.toHsv(),c={h:l.h,s:l.s*100,v:l.v*100,a:l.a};return{hsl:{h:s.h,s:s.s,l:s.l,string:this.setLetterCase(`hsl(${Math.round(s.h)}, ${Math.round(s.s)}%, ${Math.round(s.l)}%)`)},hsla:{h:s.h,s:s.s,l:s.l,a:s.a,string:this.setLetterCase(`hsla(${Math.round(s.h)}, ${Math.round(s.s)}%, ${Math.round(s.l)}%, ${s.a.toFixed(2).toString()})`)},hsv:{h:c.h,s:c.s,v:c.v,string:this.setLetterCase(`hsv(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%)`)},hsva:{h:c.h,s:c.s,v:c.v,a:c.a,string:this.setLetterCase(`hsva(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%, ${c.a.toFixed(2).toString()})`)},rgb:{r:o.r,g:o.g,b:o.b,string:this.setLetterCase(`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`)},rgba:{r:o.r,g:o.g,b:o.b,a:o.a,string:this.setLetterCase(`rgba(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)}, ${o.a.toFixed(2).toString()})`)},hex:this.setLetterCase(r),hexa:this.setLetterCase(n)}}setColor(t){const e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!Rr)return;new EyeDropper().open().then(e=>{const i=this.value;this.setColor(e.sRGBHex),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}).catch(()=>{})}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(t,e,i,s=100){const o=new et(`hsva(${t}, ${e}%, ${i}%, ${s/100})`);return o.isValid?o.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const i=this.parseColor(e);i!==null?(this.inputValue=this.value,this.hue=i.hsva.h,this.saturation=i.hsva.s,this.brightness=i.hsva.v,this.alpha=i.hsva.a*100,this.syncValues()):this.inputValue=t??""}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t)}blur(){var t;const e=this.inline?this.base:this.trigger;this.hasFocus&&(e.focus({preventScroll:!0}),e.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide()}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:!0}),this.disabled||this.formControlController.emitInvalidEvent(),!1):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.saturation,e=100-this.brightness,i=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(o=>o.trim()!==""),s=k`
      <div
        part="base"
        class=${P({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?k`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${zt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${P({"color-picker__grid-handle":!0,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${zt({top:`${e}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${z(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${zt({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${z(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?k`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${zt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${zt({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${z(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${zt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":k`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${Rr?k`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${i.length>0?k`
              <div part="swatches" class="color-picker__swatches">
                ${i.map(o=>{const r=this.parseColor(o);return r?k`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${z(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${o}
                      @click=${()=>this.selectSwatch(o)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(r.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${zt({backgroundColor:r.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${o}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?s:k`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${P({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":!0})}
          style=${zt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${s}
      </sl-dropdown>
    `}};V.styles=[D,Rh];V.dependencies={"sl-button-group":Me,"sl-button":K,"sl-dropdown":vt,"sl-icon":Y,"sl-input":F,"sl-visually-hidden":eo};a([S('[part~="base"]')],V.prototype,"base",2);a([S('[part~="input"]')],V.prototype,"input",2);a([S(".color-dropdown")],V.prototype,"dropdown",2);a([S('[part~="preview"]')],V.prototype,"previewButton",2);a([S('[part~="trigger"]')],V.prototype,"trigger",2);a([O()],V.prototype,"hasFocus",2);a([O()],V.prototype,"isDraggingGridHandle",2);a([O()],V.prototype,"isEmpty",2);a([O()],V.prototype,"inputValue",2);a([O()],V.prototype,"hue",2);a([O()],V.prototype,"saturation",2);a([O()],V.prototype,"brightness",2);a([O()],V.prototype,"alpha",2);a([d()],V.prototype,"value",2);a([Ke()],V.prototype,"defaultValue",2);a([d()],V.prototype,"label",2);a([d()],V.prototype,"format",2);a([d({type:Boolean,reflect:!0})],V.prototype,"inline",2);a([d({reflect:!0})],V.prototype,"size",2);a([d({attribute:"no-format-toggle",type:Boolean})],V.prototype,"noFormatToggle",2);a([d()],V.prototype,"name",2);a([d({type:Boolean,reflect:!0})],V.prototype,"disabled",2);a([d({type:Boolean})],V.prototype,"hoist",2);a([d({type:Boolean})],V.prototype,"opacity",2);a([d({type:Boolean})],V.prototype,"uppercase",2);a([d()],V.prototype,"swatches",2);a([d({reflect:!0})],V.prototype,"form",2);a([d({type:Boolean,reflect:!0})],V.prototype,"required",2);a([wi({passive:!1})],V.prototype,"handleTouchMove",1);a([$("format",{waitUntilFirstUpdate:!0})],V.prototype,"handleFormatChange",1);a([$("opacity",{waitUntilFirstUpdate:!0})],V.prototype,"handleOpacityChange",1);a([$("value")],V.prototype,"handleValueChange",1);V.define("sl-color-picker");var Qh=M`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,Ta=class extends A{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"footer","header","image")}render(){return k`
      <div
        part="base"
        class=${P({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Ta.styles=[D,Qh];Ta.define("sl-card");var Zh=class{constructor(t,e){this.timerId=0,this.activeInteractions=0,this.paused=!1,this.stopped=!0,this.pause=()=>{this.activeInteractions++||(this.paused=!0,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=!1,this.host.requestUpdate())},t.addController(this),this.host=t,this.tickCallback=e}hostConnected(){this.host.addEventListener("mouseenter",this.pause),this.host.addEventListener("mouseleave",this.resume),this.host.addEventListener("focusin",this.pause),this.host.addEventListener("focusout",this.resume),this.host.addEventListener("touchstart",this.pause,{passive:!0}),this.host.addEventListener("touchend",this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener("mouseenter",this.pause),this.host.removeEventListener("mouseleave",this.resume),this.host.removeEventListener("focusin",this.pause),this.host.removeEventListener("focusout",this.resume),this.host.removeEventListener("touchstart",this.pause),this.host.removeEventListener("touchend",this.resume)}start(t){this.stop(),this.stopped=!1,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},t)}stop(){clearInterval(this.timerId),this.stopped=!0,this.host.requestUpdate()}},Jh=M`
  :host {
    --slide-gap: var(--sl-spacing-medium, 1rem);
    --aspect-ratio: 16 / 9;
    --scroll-hint: 0px;

    display: flex;
  }

  .carousel {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';
    gap: var(--sl-spacing-medium);
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }

  .carousel__pagination {
    grid-area: pagination;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sl-spacing-small);
  }

  .carousel__slides {
    grid-area: slides;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));
    border-radius: var(--sl-border-radius-small);

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.carousel__slides) {
      scroll-behavior: auto;
    }
  }

  .carousel__slides--horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--scroll-hint);
    padding-inline: var(--scroll-hint);
    overflow-y: hidden;
  }

  .carousel__slides--vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);
    scroll-snap-type: y mandatory;
    scroll-padding-block: var(--scroll-hint);
    padding-block: var(--scroll-hint);
    overflow-x: hidden;
  }

  .carousel__slides--dragging {
  }

  :host([vertical]) ::slotted(sl-carousel-item) {
    height: 100%;
  }

  .carousel__slides::-webkit-scrollbar {
    display: none;
  }

  .carousel__navigation {
    grid-area: navigation;
    display: contents;
    font-size: var(--sl-font-size-x-large);
  }

  .carousel__navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-small);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    appearance: none;
  }

  .carousel__navigation-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel__navigation-button--disabled::part(base) {
    pointer-events: none;
  }

  .carousel__navigation-button--previous {
    grid-column: 1;
    grid-row: 1;
  }

  .carousel__navigation-button--next {
    grid-column: 3;
    grid-row: 1;
  }

  .carousel__pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--sl-border-radius-circle);
    width: var(--sl-spacing-small);
    height: var(--sl-spacing-small);
    background-color: var(--sl-color-neutral-300);
    padding: 0;
    margin: 0;
  }

  .carousel__pagination-item--active {
    background-color: var(--sl-color-neutral-700);
    transform: scale(1.2);
  }

  /* Focus styles */
  .carousel__slides:focus-visible,
  .carousel__navigation-button:focus-visible,
  .carousel__pagination-item:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*tu(t,e){if(t!==void 0){let i=0;for(const s of t)yield e(s,i++)}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*eu(t,e,i=1){const s=e===void 0?0:t;e??(e=t);for(let o=s;i>0?o<e:e<o;o+=i)yield o}var ot=class extends A{constructor(){super(...arguments),this.loop=!1,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new Zh(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new N(this),this.pendingSlideChange=!1,this.handleMouseDrag=t=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=!0,this.dragStartPosition=[t.clientX,t.clientY]),this.scrollContainer.scrollBy({left:-t.movementX,top:-t.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{const t=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:!0});const e=t.scrollLeft,i=t.scrollTop;t.style.removeProperty("scroll-snap-type"),t.style.setProperty("overflow","hidden");const s=t.scrollLeft,o=t.scrollTop;t.style.removeProperty("overflow"),t.style.setProperty("scroll-snap-type","none"),t.scrollTo({left:e,top:i,behavior:"instant"}),requestAnimationFrame(async()=>{(e!==s||i!==o)&&(t.scrollTo({left:s,top:o,behavior:Vs()?"auto":"smooth"}),await kt(t,"scrollend")),t.style.removeProperty("scroll-snap-type"),this.dragging=!1,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=t=>{t.some(i=>[...i.addedNodes,...i.removedNodes].some(s=>this.isCarouselItem(s)&&!s.hasAttribute("data-clone")))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel"))}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}willUpdate(t){(t.has("slidesPerMove")||t.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){const t=this.getSlides().length,{slidesPerPage:e,slidesPerMove:i,loop:s}=this,o=s?t/i:(t-e)/i+1;return Math.ceil(o)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:t=!0}={}){return[...this.children].filter(e=>this.isCarouselItem(e)&&(!t||!e.hasAttribute("data-clone")))}handleClick(t){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){const e=Math.abs(this.dragStartPosition[0]-t.clientX),i=Math.abs(this.dragStartPosition[1]-t.clientY);Math.sqrt(e*e+i*i)>=10&&t.preventDefault()}}handleKeyDown(t){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=t.target,i=this.localize.dir()==="rtl",s=e.closest('[part~="pagination-item"]')!==null,o=t.key==="ArrowDown"||!i&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft",r=t.key==="ArrowUp"||!i&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight";t.preventDefault(),r&&this.previous(),o&&this.next(),t.key==="Home"&&this.goToSlide(0),t.key==="End"&&this.goToSlide(this.getSlides().length-1),s&&this.updateComplete.then(()=>{var n;const l=(n=this.shadowRoot)==null?void 0:n.querySelector('[part~="pagination-item--active"]');l&&l.focus()})}}handleMouseDragStart(t){this.mouseDragging&&t.button===0&&(t.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){const t=new IntersectionObserver(e=>{t.disconnect();for(const l of e){const c=l.target;c.toggleAttribute("inert",!l.isIntersecting),c.classList.toggle("--in-view",l.isIntersecting),c.setAttribute("aria-hidden",l.isIntersecting?"false":"true")}const i=e.find(l=>l.isIntersecting);if(!i)return;const s=this.getSlides({excludeClones:!1}),o=this.getSlides().length,r=s.indexOf(i.target),n=this.loop?r-this.slidesPerPage:r;if(this.activeSlide=(Math.ceil(n/this.slidesPerMove)*this.slidesPerMove+o)%o,!this.scrolling&&this.loop&&i.target.hasAttribute("data-clone")){const l=Number(i.target.getAttribute("data-clone"));this.goToSlide(l,"instant")}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(e=>{t.observe(e)})}handleScrollEnd(){!this.scrolling||this.dragging||(this.scrolling=!1,this.pendingSlideChange=!1,this.synchronizeSlides())}isCarouselItem(t){return t instanceof Element&&t.tagName.toLowerCase()==="sl-carousel-item"}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((t,e)=>{t.classList.remove("--in-view"),t.classList.remove("--is-active"),t.setAttribute("aria-label",this.localize.term("slideNum",e+1)),t.hasAttribute("data-clone")&&t.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,"auto"),this.synchronizeSlides()}createClones(){const t=this.getSlides(),e=this.slidesPerPage,i=t.slice(-e),s=t.slice(0,e);i.reverse().forEach((o,r)=>{const n=o.cloneNode(!0);n.setAttribute("data-clone",String(t.length-r-1)),this.prepend(n)}),s.forEach((o,r)=>{const n=o.cloneNode(!0);n.setAttribute("data-clone",String(r)),this.append(n)})}handleSlideChange(){const t=this.getSlides();t.forEach((e,i)=>{e.classList.toggle("--is-active",i===this.activeSlide)}),this.hasUpdated&&this.emit("sl-slide-change",{detail:{index:this.activeSlide,slide:t[this.activeSlide]}})}updateSlidesSnap(){const t=this.getSlides(),e=this.slidesPerMove;t.forEach((i,s)=>{(s+e)%e===0?i.style.removeProperty("scroll-snap-align"):i.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(t="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,t)}next(t="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,t)}goToSlide(t,e="smooth"){const{slidesPerPage:i,loop:s}=this,o=this.getSlides(),r=this.getSlides({excludeClones:!1});if(!o.length)return;const n=s?(t+o.length)%o.length:at(t,0,o.length-i);this.activeSlide=n;const l=this.localize.dir()==="rtl",c=at(t+(s?i:0)+(l?i-1:0),0,r.length-1),u=r[c];this.scrollToSlide(u,Vs()?"auto":e)}scrollToSlide(t,e="smooth"){this.pendingSlideChange=!0,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;const i=this.scrollContainer,s=i.getBoundingClientRect(),o=t.getBoundingClientRect(),r=o.left-s.left,n=o.top-s.top;r||n?(this.pendingSlideChange=!0,i.scrollTo({left:r+i.scrollLeft,top:n+i.scrollTop,behavior:e})):this.pendingSlideChange=!1})}render(){const{slidesPerMove:t,scrolling:e}=this,i=this.getPageCount(),s=this.getCurrentPage(),o=this.canScrollPrev(),r=this.canScrollNext(),n=this.localize.dir()==="ltr";return k`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${P({carousel__slides:!0,"carousel__slides--horizontal":this.orientation==="horizontal","carousel__slides--vertical":this.orientation==="vertical","carousel__slides--dragging":this.dragging})}"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-busy="${e?"true":"false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
          @click=${this.handleClick}
        >
          <slot></slot>
        </div>

        ${this.navigation?k`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${P({"carousel__navigation-button":!0,"carousel__navigation-button--previous":!0,"carousel__navigation-button--disabled":!o})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${o?"false":"true"}"
                  @click=${o?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <sl-icon library="system" name="${n?"chevron-left":"chevron-right"}"></sl-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button--next"
                  class=${P({"carousel__navigation-button":!0,"carousel__navigation-button--next":!0,"carousel__navigation-button--disabled":!r})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${r?"false":"true"}"
                  @click=${r?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${n?"chevron-right":"chevron-left"}"></sl-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?k`
              <div part="pagination" role="tablist" class="carousel__pagination" aria-controls="scroll-container">
                ${tu(eu(i),l=>{const c=l===s;return k`
                    <button
                      part="pagination-item ${c?"pagination-item--active":""}"
                      class="${P({"carousel__pagination-item":!0,"carousel__pagination-item--active":c})}"
                      role="tab"
                      aria-selected="${c?"true":"false"}"
                      aria-label="${this.localize.term("goToSlide",l+1,i)}"
                      tabindex=${c?"0":"-1"}
                      @click=${()=>this.goToSlide(l*t)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:""}
      </div>
    `}};ot.styles=[D,Jh];ot.dependencies={"sl-icon":Y};a([d({type:Boolean,reflect:!0})],ot.prototype,"loop",2);a([d({type:Boolean,reflect:!0})],ot.prototype,"navigation",2);a([d({type:Boolean,reflect:!0})],ot.prototype,"pagination",2);a([d({type:Boolean,reflect:!0})],ot.prototype,"autoplay",2);a([d({type:Number,attribute:"autoplay-interval"})],ot.prototype,"autoplayInterval",2);a([d({type:Number,attribute:"slides-per-page"})],ot.prototype,"slidesPerPage",2);a([d({type:Number,attribute:"slides-per-move"})],ot.prototype,"slidesPerMove",2);a([d()],ot.prototype,"orientation",2);a([d({type:Boolean,reflect:!0,attribute:"mouse-dragging"})],ot.prototype,"mouseDragging",2);a([S(".carousel__slides")],ot.prototype,"scrollContainer",2);a([S(".carousel__pagination")],ot.prototype,"paginationContainer",2);a([O()],ot.prototype,"activeSlide",2);a([O()],ot.prototype,"scrolling",2);a([O()],ot.prototype,"dragging",2);a([wi({passive:!0})],ot.prototype,"handleScroll",1);a([$("loop",{waitUntilFirstUpdate:!0}),$("slidesPerPage",{waitUntilFirstUpdate:!0})],ot.prototype,"initializeSlides",1);a([$("activeSlide")],ot.prototype,"handleSlideChange",1);a([$("slidesPerMove")],ot.prototype,"updateSlidesSnap",1);a([$("autoplay")],ot.prototype,"handleAutoplayChange",1);ot.define("sl-carousel");var iu=(t,e)=>{let i=0;return function(...s){window.clearTimeout(i),i=window.setTimeout(()=>{t.call(this,...s)},e)}},Fr=(t,e,i)=>{const s=t[e];t[e]=function(...o){s.call(this,...o),i.call(this,s,...o)}},su="onscrollend"in window;if(!su){const t=new Set,e=new WeakMap,i=o=>{for(const r of o.changedTouches)t.add(r.identifier)},s=o=>{for(const r of o.changedTouches)t.delete(r.identifier)};document.addEventListener("touchstart",i,!0),document.addEventListener("touchend",s,!0),document.addEventListener("touchcancel",s,!0),Fr(EventTarget.prototype,"addEventListener",function(o,r){if(r!=="scrollend")return;const n=iu(()=>{t.size?n():this.dispatchEvent(new Event("scrollend"))},100);o.call(this,"scroll",n,{passive:!0}),e.set(this,n)}),Fr(EventTarget.prototype,"removeEventListener",function(o,r){if(r!=="scrollend")return;const n=e.get(this);n&&o.call(this,"scroll",n,{passive:!0})})}var ou=M`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ::slotted(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`,Ia=class extends A{connectedCallback(){super.connectedCallback(),this.setAttribute("role","group")}render(){return k` <slot></slot> `}};Ia.styles=[D,ou];Ia.define("sl-carousel-item");K.define("sl-button");Me.define("sl-button-group");var ru=M`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`,Ge=class extends A{constructor(){super(...arguments),this.localize=new N(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){const e=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[e,...e.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),e.setAttribute("data-default",""),e.slot="separator",e}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>e.tagName.toLowerCase()==="sl-breadcrumb-item");t.forEach((e,i)=>{const s=e.querySelector('[slot="separator"]');s===null?e.append(this.getSeparator()):s.hasAttribute("data-default")&&s.replaceWith(this.getSeparator()),i===t.length-1?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),k`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <sl-icon name=${this.localize.dir()==="rtl"?"chevron-left":"chevron-right"} library="system"></sl-icon>
        </slot>
      </span>
    `}};Ge.styles=[D,ru];Ge.dependencies={"sl-icon":Y};a([S("slot")],Ge.prototype,"defaultSlot",2);a([S('slot[name="separator"]')],Ge.prototype,"separatorSlot",2);a([d()],Ge.prototype,"label",2);Ge.define("sl-breadcrumb");var au=M`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,Ei=class extends A{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return k`
      <span
        part="base"
        class=${P({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};Ei.styles=[D,au];a([d({reflect:!0})],Ei.prototype,"variant",2);a([d({type:Boolean,reflect:!0})],Ei.prototype,"pill",2);a([d({type:Boolean,reflect:!0})],Ei.prototype,"pulse",2);Ei.define("sl-badge");var nu=M`
  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
  }
`,ve=class extends A{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"prefix","suffix"),this.renderType="button",this.rel="noreferrer noopener"}setRenderType(){const t=this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.tagName.toLowerCase()==="sl-dropdown").length>0;if(this.href){this.renderType="link";return}if(t){this.renderType="dropdown";return}this.renderType="button"}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return k`
      <div
        part="base"
        class=${P({"breadcrumb-item":!0,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${this.renderType==="link"?k`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${z(this.target?this.target:void 0)}"
                rel=${z(this.target?this.rel:void 0)}
              >
                <slot @slotchange=${this.handleSlotChange}></slot>
              </a>
            `:""}
        ${this.renderType==="button"?k`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </button>
            `:""}
        ${this.renderType==="dropdown"?k`
              <div part="label" class="breadcrumb-item__label breadcrumb-item__label--drop-down">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            `:""}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};ve.styles=[D,nu];a([S("slot:not([name])")],ve.prototype,"defaultSlot",2);a([O()],ve.prototype,"renderType",2);a([d()],ve.prototype,"href",2);a([d()],ve.prototype,"target",2);a([d()],ve.prototype,"rel",2);a([$("href",{waitUntilFirstUpdate:!0})],ve.prototype,"hrefChanged",1);ve.define("sl-breadcrumb-item");var lu=M`
  :host {
    display: contents;
  }
`;const cu=[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],du=[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],hu=[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],uu=[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],pu=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],fu=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],mu=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],gu=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],bu=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],vu=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],yu=[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],_u=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],wu=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],xu=[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],ku=[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Cu=[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],$u=[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Su=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],zu=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],Au=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],Eu=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],Tu=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Iu=[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Mu=[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Ou=[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Lu=[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Pu=[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],Du=[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],Ru=[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],Fu=[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],Bu=[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],Vu=[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],Nu=[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Hu=[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Uu=[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ju=[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Wu=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],qu=[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Ku=[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Yu=[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Xu=[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Gu=[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Qu=[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Zu=[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Ju=[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],tp=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],ep=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],ip=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],sp=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],op=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],rp=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],ap=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],np=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],lp=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],cp=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],dp=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],hp=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],up=[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:"ease-out"},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:"ease-in"},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],pp=[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],fp=[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],mp=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],gp=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],bp=[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],vp=[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],yp=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],_p=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],wp=[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],xp=[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],kp=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Cp=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],$p=[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Sp=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],zp=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],Ap=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Ep=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Tp=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],Ip=[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Mp=[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Op=[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Lp=[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Pp=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],Dp=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],Rp=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],Fp=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],Bp=[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],Vp=[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],Np=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Hp=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],Up=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],jp=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Wp=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],qp=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Kp=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Yp=[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],Xp=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Gp=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],Qp=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],Zp=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Ma={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},Jp=Object.freeze(Object.defineProperty({__proto__:null,backInDown:xu,backInLeft:ku,backInRight:Cu,backInUp:$u,backOutDown:Su,backOutLeft:zu,backOutRight:Au,backOutUp:Eu,bounce:cu,bounceIn:Tu,bounceInDown:Iu,bounceInLeft:Mu,bounceInRight:Ou,bounceInUp:Lu,bounceOut:Pu,bounceOutDown:Du,bounceOutLeft:Ru,bounceOutRight:Fu,bounceOutUp:Bu,easings:Ma,fadeIn:Vu,fadeInBottomLeft:Nu,fadeInBottomRight:Hu,fadeInDown:Uu,fadeInDownBig:ju,fadeInLeft:Wu,fadeInLeftBig:qu,fadeInRight:Ku,fadeInRightBig:Yu,fadeInTopLeft:Xu,fadeInTopRight:Gu,fadeInUp:Qu,fadeInUpBig:Zu,fadeOut:Ju,fadeOutBottomLeft:tp,fadeOutBottomRight:ep,fadeOutDown:ip,fadeOutDownBig:sp,fadeOutLeft:op,fadeOutLeftBig:rp,fadeOutRight:ap,fadeOutRightBig:np,fadeOutTopLeft:lp,fadeOutTopRight:cp,fadeOutUp:dp,fadeOutUpBig:hp,flash:du,flip:up,flipInX:pp,flipInY:fp,flipOutX:mp,flipOutY:gp,headShake:hu,heartBeat:uu,hinge:Bp,jackInTheBox:Vp,jello:pu,lightSpeedInLeft:bp,lightSpeedInRight:vp,lightSpeedOutLeft:yp,lightSpeedOutRight:_p,pulse:fu,rollIn:Np,rollOut:Hp,rotateIn:wp,rotateInDownLeft:xp,rotateInDownRight:kp,rotateInUpLeft:Cp,rotateInUpRight:$p,rotateOut:Sp,rotateOutDownLeft:zp,rotateOutDownRight:Ap,rotateOutUpLeft:Ep,rotateOutUpRight:Tp,rubberBand:mu,shake:gu,shakeX:bu,shakeY:vu,slideInDown:Ip,slideInLeft:Mp,slideInRight:Op,slideInUp:Lp,slideOutDown:Pp,slideOutLeft:Dp,slideOutRight:Rp,slideOutUp:Fp,swing:yu,tada:_u,wobble:wu,zoomIn:Up,zoomInDown:jp,zoomInLeft:Wp,zoomInRight:qp,zoomInUp:Kp,zoomOut:Yp,zoomOutDown:Xp,zoomOutLeft:Gp,zoomOutRight:Qp,zoomOutUp:Zp},Symbol.toStringTag,{value:"Module"}));var ft=class extends A{constructor(){super(...arguments),this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-finish")},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-cancel")}}get currentTime(){var t,e;return(e=(t=this.animation)==null?void 0:t.currentTime)!=null?e:0}set currentTime(t){this.animation&&(this.animation.currentTime=t)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var t,e;const i=(t=Ma[this.easing])!=null?t:this.easing,s=(e=this.keyframes)!=null?e:Jp[this.name],r=(await this.defaultSlot).assignedElements()[0];return!r||!s?!1:(this.destroyAnimation(),this.animation=r.animate(s,{delay:this.delay,direction:this.direction,duration:this.duration,easing:i,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.emit("sl-start")):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){this.hasUpdated&&this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.emit("sl-start")),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){var t;(t=this.animation)==null||t.cancel()}finish(){var t;(t=this.animation)==null||t.finish()}render(){return k` <slot @slotchange=${this.handleSlotChange}></slot> `}};ft.styles=[D,lu];a([kc("slot")],ft.prototype,"defaultSlot",2);a([d()],ft.prototype,"name",2);a([d({type:Boolean,reflect:!0})],ft.prototype,"play",2);a([d({type:Number})],ft.prototype,"delay",2);a([d()],ft.prototype,"direction",2);a([d({type:Number})],ft.prototype,"duration",2);a([d()],ft.prototype,"easing",2);a([d({attribute:"end-delay",type:Number})],ft.prototype,"endDelay",2);a([d()],ft.prototype,"fill",2);a([d({type:Number})],ft.prototype,"iterations",2);a([d({attribute:"iteration-start",type:Number})],ft.prototype,"iterationStart",2);a([d({attribute:!1})],ft.prototype,"keyframes",2);a([d({attribute:"playback-rate",type:Number})],ft.prototype,"playbackRate",2);a([$(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],ft.prototype,"handleAnimationChange",1);a([$("play")],ft.prototype,"handlePlayChange",1);a([$("playbackRate")],ft.prototype,"handlePlaybackRateChange",1);ft.define("sl-animation");var tf=M`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,ne=class extends A{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.emit("sl-error")}render(){const t=k`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let e=k``;return this.initials?e=k`<div part="initials" class="avatar__initials">${this.initials}</div>`:e=k`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,k`
      <div
        part="base"
        class=${P({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};ne.styles=[D,tf];ne.dependencies={"sl-icon":Y};a([O()],ne.prototype,"hasError",2);a([d()],ne.prototype,"image",2);a([d()],ne.prototype,"label",2);a([d()],ne.prototype,"initials",2);a([d()],ne.prototype,"loading",2);a([d({reflect:!0})],ne.prototype,"shape",2);a([$("image")],ne.prototype,"handleImageChange",1);ne.define("sl-avatar");var ef=M`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`,Pe=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),Ft=class extends A{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"icon","suffix"),this.localize=new N(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0,this.remainingTime=this.duration}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){this.handleCountdownChange(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration),this.remainingTime=this.duration,this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100))}pauseAutoHide(){var t;(t=this.countdownAnimation)==null||t.pause(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval)}resumeAutoHide(){var t;this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.remainingTime),this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100),(t=this.countdownAnimation)==null||t.play())}handleCountdownChange(){if(this.open&&this.duration<1/0&&this.countdown){const{countdownElement:t}=this,e="100%",i="0";this.countdownAnimation=t.animate([{width:e},{width:i}],{duration:this.duration,easing:"linear"})}}handleCloseClick(){this.hide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await nt(this.base),this.base.hidden=!1;const{keyframes:t,options:e}=G(this,"alert.show",{dir:this.localize.dir()});await it(this.base,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),await nt(this.base);const{keyframes:t,options:e}=G(this,"alert.hide",{dir:this.localize.dir()});await it(this.base,t,e),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,kt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,kt(this,"sl-after-hide")}async toast(){return new Promise(t=>{this.handleCountdownChange(),Pe.parentElement===null&&document.body.append(Pe),Pe.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{Pe.removeChild(this),t(),Pe.querySelector("sl-alert")===null&&Pe.remove()},{once:!0})})}render(){return k`
      <div
        part="base"
        class=${P({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-countdown":!!this.countdown,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?k`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown?k`
              <div
                class=${P({alert__countdown:!0,"alert__countdown--ltr":this.countdown==="ltr"})}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            `:""}
      </div>
    `}};Ft.styles=[D,ef];Ft.dependencies={"sl-icon-button":ht};a([S('[part~="base"]')],Ft.prototype,"base",2);a([S(".alert__countdown-elapsed")],Ft.prototype,"countdownElement",2);a([d({type:Boolean,reflect:!0})],Ft.prototype,"open",2);a([d({type:Boolean,reflect:!0})],Ft.prototype,"closable",2);a([d({reflect:!0})],Ft.prototype,"variant",2);a([d({type:Number})],Ft.prototype,"duration",2);a([d({type:String,reflect:!0})],Ft.prototype,"countdown",2);a([O()],Ft.prototype,"remainingTime",2);a([$("open",{waitUntilFirstUpdate:!0})],Ft.prototype,"handleOpenChange",1);a([$("duration")],Ft.prototype,"handleDurationChange",1);q("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});q("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});Ft.define("sl-alert");var sf=M`
  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);

    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .animated-image__control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: var(--icon-size);
    background: none;
    border: solid 2px currentColor;
    background-color: rgb(0 0 0 /50%);
    border-radius: var(--sl-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: var(--sl-transition-fast) opacity;
  }

  :host([play]:hover) .animated-image__control-box {
    opacity: 1;
  }

  :host([play]:not(:hover)) .animated-image__control-box {
    opacity: 0;
  }

  :host([play]) slot[name='play-icon'],
  :host(:not([play])) slot[name='pause-icon'] {
    display: none;
  }
`,Qt=class extends A{constructor(){super(...arguments),this.isLoaded=!1}handleClick(){this.play=!this.play}handleLoad(){const t=document.createElement("canvas"),{width:e,height:i}=this.animatedImage;t.width=e,t.height=i,t.getContext("2d").drawImage(this.animatedImage,0,0,e,i),this.frozenFrame=t.toDataURL("image/gif"),this.isLoaded||(this.emit("sl-load"),this.isLoaded=!0)}handleError(){this.emit("sl-error")}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){return k`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?k`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                <slot name="play-icon"><sl-icon name="play-fill" library="system"></sl-icon></slot>
                <slot name="pause-icon"><sl-icon name="pause-fill" library="system"></sl-icon></slot>
              </div>
            `:""}
      </div>
    `}};Qt.styles=[D,sf];Qt.dependencies={"sl-icon":Y};a([S(".animated-image__animated")],Qt.prototype,"animatedImage",2);a([O()],Qt.prototype,"frozenFrame",2);a([O()],Qt.prototype,"isLoaded",2);a([d()],Qt.prototype,"src",2);a([d()],Qt.prototype,"alt",2);a([d({type:Boolean,reflect:!0})],Qt.prototype,"play",2);a([$("play",{waitUntilFirstUpdate:!0})],Qt.prototype,"handlePlayChange",1);a([$("src")],Qt.prototype,"handleSrcChange",1);Qt.define("sl-animated-image");ol(()=>U(Hl,{}),document.getElementById("root"));
