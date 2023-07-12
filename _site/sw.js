try{self["workbox:core:6.5.4"]&&_()}catch(e){}const e=(e,...i)=>{let r=e;return i.length>0&&(r+=` :: ${JSON.stringify(i)}`),r};class i extends Error{constructor(i,r){super(e(i,r)),this.name=i,this.details=r}}try{self["workbox:routing:6.5.4"]&&_()}catch(e){}const r=e=>e&&"object"==typeof e?e:{handle:e};class a{constructor(e,i,a="GET"){this.handler=r(i),this.match=e,this.method=a}setCatchHandler(e){this.catchHandler=r(e)}}class t extends a{constructor(e,i,r){super((({url:i})=>{const r=e.exec(i.href);if(r&&(i.origin===location.origin||0===r.index))return r.slice(1)}),i,r)}}class n{constructor(){this.i=new Map,this.t=new Map}get routes(){return this.i}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:i}=e,r=this.handleRequest({request:i,event:e});r&&e.respondWith(r)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:i}=e.data,r=Promise.all(i.urlsToCache.map((i=>{"string"==typeof i&&(i=[i]);const r=new Request(...i);return this.handleRequest({request:r,event:e})})));e.waitUntil(r),e.ports&&e.ports[0]&&r.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:i}){const r=new URL(e.url,location.href);if(!r.protocol.startsWith("http"))return;const a=r.origin===location.origin,{params:t,route:n}=this.findMatchingRoute({event:i,request:e,sameOrigin:a,url:r});let c=n&&n.handler;const s=e.method;if(!c&&this.t.has(s)&&(c=this.t.get(s)),!c)return;let o;try{o=c.handle({url:r,request:e,event:i,params:t})}catch(e){o=Promise.reject(e)}const f=n&&n.catchHandler;return o instanceof Promise&&(this.o||f)&&(o=o.catch((async a=>{if(f)try{return await f.handle({url:r,request:e,event:i,params:t})}catch(e){e instanceof Error&&(a=e)}if(this.o)return this.o.handle({url:r,request:e,event:i});throw a}))),o}findMatchingRoute({url:e,sameOrigin:i,request:r,event:a}){const t=this.i.get(r.method)||[];for(const n of t){let t;const c=n.match({url:e,sameOrigin:i,request:r,event:a});if(c)return t=c,(Array.isArray(t)&&0===t.length||c.constructor===Object&&0===Object.keys(c).length||"boolean"==typeof c)&&(t=void 0),{route:n,params:t}}return{}}setDefaultHandler(e,i="GET"){this.t.set(i,r(e))}setCatchHandler(e){this.o=r(e)}registerRoute(e){this.i.has(e.method)||this.i.set(e.method,[]),this.i.get(e.method).push(e)}unregisterRoute(e){if(!this.i.has(e.method))throw new i("unregister-route-but-not-found-with-method",{method:e.method});const r=this.i.get(e.method).indexOf(e);if(!(r>-1))throw new i("unregister-route-route-not-registered");this.i.get(e.method).splice(r,1)}}let c;const s=()=>(c||(c=new n,c.addFetchListener(),c.addCacheListener()),c);function o(e,r,n){let c;if("string"==typeof e){const i=new URL(e,location.href);c=new a((({url:e})=>e.href===i.href),r,n)}else if(e instanceof RegExp)c=new t(e,r,n);else if("function"==typeof e)c=new a(e,r,n);else{if(!(e instanceof a))throw new i("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}return s().registerRoute(c),c}try{self["workbox:strategies:6.5.4"]&&_()}catch(e){}const f={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null},b={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},d=e=>[b.prefix,e,b.suffix].filter((e=>e&&e.length>0)).join("-"),l=e=>{(e=>{for(const i of Object.keys(b))e(i)})((i=>{"string"==typeof e[i]&&(b[i]=e[i])}))},u=e=>e||d(b.precache),w=e=>e||d(b.runtime);function h(e,i){const r=new URL(e);for(const e of i)r.searchParams.delete(e);return r.href}class g{constructor(){this.promise=new Promise(((e,i)=>{this.resolve=e,this.reject=i}))}}const p=new Set;function v(e){return"string"==typeof e?new Request(e):e}class m{constructor(e,i){this.l={},Object.assign(this,i),this.event=i.event,this.u=e,this.h=new g,this.g=[],this.p=[...e.plugins],this.v=new Map;for(const e of this.p)this.v.set(e,{});this.event.waitUntil(this.h.promise)}async fetch(e){const{event:r}=this;let a=v(e);if("navigate"===a.mode&&r instanceof FetchEvent&&r.preloadResponse){const e=await r.preloadResponse;if(e)return e}const t=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:r})}catch(e){if(e instanceof Error)throw new i("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const n=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this.u.fetchOptions);for(const i of this.iterateCallbacks("fetchDidSucceed"))e=await i({event:r,request:n,response:e});return e}catch(e){throw t&&await this.runCallbacks("fetchDidFail",{error:e,event:r,originalRequest:t.clone(),request:n.clone()}),e}}async fetchAndCachePut(e){const i=await this.fetch(e),r=i.clone();return this.waitUntil(this.cachePut(e,r)),i}async cacheMatch(e){const i=v(e);let r;const{cacheName:a,matchOptions:t}=this.u,n=await this.getCacheKey(i,"read"),c=Object.assign(Object.assign({},t),{cacheName:a});r=await caches.match(n,c);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))r=await e({cacheName:a,matchOptions:t,cachedResponse:r,request:n,event:this.event})||void 0;return r}async cachePut(e,r){const a=v(e);var t;await(t=0,new Promise((e=>setTimeout(e,t))));const n=await this.getCacheKey(a,"write");if(!r)throw new i("cache-put-with-no-response",{url:(c=n.url,new URL(String(c),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var c;const s=await this.m(r);if(!s)return!1;const{cacheName:o,matchOptions:f}=this.u,b=await self.caches.open(o),d=this.hasCallback("cacheDidUpdate"),l=d?await async function(e,i,r,a){const t=h(i.url,r);if(i.url===t)return e.match(i,a);const n=Object.assign(Object.assign({},a),{ignoreSearch:!0}),c=await e.keys(i,n);for(const i of c)if(t===h(i.url,r))return e.match(i,a)}(b,n.clone(),["__WB_REVISION__"],f):null;try{await b.put(n,d?s.clone():s)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:l,newResponse:s.clone(),request:n,event:this.event});return!0}async getCacheKey(e,i){const r=`${e.url} | ${i}`;if(!this.l[r]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=v(await e({mode:i,request:a,event:this.event,params:this.params}));this.l[r]=a}return this.l[r]}hasCallback(e){for(const i of this.u.plugins)if(e in i)return!0;return!1}async runCallbacks(e,i){for(const r of this.iterateCallbacks(e))await r(i)}*iterateCallbacks(e){for(const i of this.u.plugins)if("function"==typeof i[e]){const r=this.v.get(i),a=a=>{const t=Object.assign(Object.assign({},a),{state:r});return i[e](t)};yield a}}waitUntil(e){return this.g.push(e),e}async doneWaiting(){let e;for(;e=this.g.shift();)await e}destroy(){this.h.resolve(null)}async m(e){let i=e,r=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(i=await e({request:this.request,response:i,event:this.event})||void 0,r=!0,!i)break;return r||i&&200!==i.status&&(i=void 0),i}}class y{constructor(e={}){this.cacheName=w(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[i]=this.handleAll(e);return i}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const i=e.event,r="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,t=new m(this,{event:i,request:r,params:a}),n=this.R(t,r,i);return[n,this.j(n,t,r,i)]}async R(e,r,a){let t;await e.runCallbacks("handlerWillStart",{event:a,request:r});try{if(t=await this.q(r,e),!t||"error"===t.type)throw new i("no-response",{url:r.url})}catch(i){if(i instanceof Error)for(const n of e.iterateCallbacks("handlerDidError"))if(t=await n({error:i,event:a,request:r}),t)break;if(!t)throw i}for(const i of e.iterateCallbacks("handlerWillRespond"))t=await i({event:a,request:r,response:t});return t}async j(e,i,r,a){let t,n;try{t=await e}catch(n){}try{await i.runCallbacks("handlerDidRespond",{event:a,request:r,response:t}),await i.doneWaiting()}catch(e){e instanceof Error&&(n=e)}if(await i.runCallbacks("handlerDidComplete",{event:a,request:r,response:t,error:n}),i.destroy(),n)throw n}}class R extends y{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(f)}async q(e,r){const a=r.fetchAndCachePut(e).catch((()=>{}));r.waitUntil(a);let t,n=await r.cacheMatch(e);if(n);else try{n=await a}catch(e){e instanceof Error&&(t=e)}if(!n)throw new i("no-response",{url:e.url,error:t});return n}}function j(e,i){const r=i();return e.waitUntil(r),r}try{self["workbox:precaching:6.5.4"]&&_()}catch(e){}function q(e){if(!e)throw new i("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const i=new URL(e,location.href);return{cacheKey:i.href,url:i.href}}const{revision:r,url:a}=e;if(!a)throw new i("add-to-cache-list-unexpected-type",{entry:e});if(!r){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const t=new URL(a,location.href),n=new URL(a,location.href);return t.searchParams.set("__WB_REVISION__",r),{cacheKey:t.href,url:n.href}}class U{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:i})=>{i&&(i.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:i,cachedResponse:r})=>{if("install"===e.type&&i&&i.originalRequest&&i.originalRequest instanceof Request){const e=i.originalRequest.url;r?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return r}}}class L{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:i})=>{const r=(null==i?void 0:i.cacheKey)||this.U.getCacheKeyForURL(e.url);return r?new Request(r,{headers:e.headers}):e},this.U=e}}let E,k;async function x(e,r){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new i("cross-origin-copy-response",{origin:a});const t=e.clone(),n={headers:new Headers(t.headers),status:t.status,statusText:t.statusText},c=r?r(n):n,s=function(){if(void 0===E){const e=new Response("");if("body"in e)try{new Response(e.body),E=!0}catch(e){E=!1}E=!1}return E}()?t.body:await t.blob();return new Response(s,c)}class C extends y{constructor(e={}){e.cacheName=u(e.cacheName),super(e),this.L=!1!==e.fallbackToNetwork,this.plugins.push(C.copyRedirectedCacheableResponsesPlugin)}async q(e,i){const r=await i.cacheMatch(e);return r||(i.event&&"install"===i.event.type?await this._(e,i):await this.k(e,i))}async k(e,r){let a;const t=r.params||{};if(!this.L)throw new i("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const i=t.integrity,n=e.integrity,c=!n||n===i;a=await r.fetch(new Request(e,{integrity:"no-cors"!==e.mode?n||i:void 0})),i&&c&&"no-cors"!==e.mode&&(this.C(),await r.cachePut(e,a.clone()))}return a}async _(e,r){this.C();const a=await r.fetch(e);if(!await r.cachePut(e,a.clone()))throw new i("bad-precaching-response",{url:e.url,status:a.status});return a}C(){let e=null,i=0;for(const[r,a]of this.plugins.entries())a!==C.copyRedirectedCacheableResponsesPlugin&&(a===C.defaultPrecacheCacheabilityPlugin&&(e=r),a.cacheWillUpdate&&i++);0===i?this.plugins.push(C.defaultPrecacheCacheabilityPlugin):i>1&&null!==e&&this.plugins.splice(e,1)}}C.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},C.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await x(e):e};class O{constructor({cacheName:e,plugins:i=[],fallbackToNetwork:r=!0}={}){this.O=new Map,this.N=new Map,this.T=new Map,this.u=new C({cacheName:u(e),plugins:[...i,new L({precacheController:this})],fallbackToNetwork:r}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.u}precache(e){this.addToCacheList(e),this.W||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.W=!0)}addToCacheList(e){const r=[];for(const a of e){"string"==typeof a?r.push(a):a&&void 0===a.revision&&r.push(a.url);const{cacheKey:e,url:t}=q(a),n="string"!=typeof a&&a.revision?"reload":"default";if(this.O.has(t)&&this.O.get(t)!==e)throw new i("add-to-cache-list-conflicting-entries",{firstEntry:this.O.get(t),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this.T.has(e)&&this.T.get(e)!==a.integrity)throw new i("add-to-cache-list-conflicting-integrities",{url:t});this.T.set(e,a.integrity)}if(this.O.set(t,e),this.N.set(t,n),r.length>0){const e=`Workbox is precaching URLs without revision info: ${r.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return j(e,(async()=>{const i=new U;this.strategy.plugins.push(i);for(const[i,r]of this.O){const a=this.T.get(r),t=this.N.get(i),n=new Request(i,{integrity:a,cache:t,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:n,event:e}))}const{updatedURLs:r,notUpdatedURLs:a}=i;return{updatedURLs:r,notUpdatedURLs:a}}))}activate(e){return j(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),i=await e.keys(),r=new Set(this.O.values()),a=[];for(const t of i)r.has(t.url)||(await e.delete(t),a.push(t.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this.O}getCachedURLs(){return[...this.O.keys()]}getCacheKeyForURL(e){const i=new URL(e,location.href);return this.O.get(i.href)}getIntegrityForCacheKey(e){return this.T.get(e)}async matchPrecache(e){const i=e instanceof Request?e.url:e,r=this.getCacheKeyForURL(i);if(r){return(await self.caches.open(this.strategy.cacheName)).match(r)}}createHandlerBoundToURL(e){const r=this.getCacheKeyForURL(e);if(!r)throw new i("non-precached-url",{url:e});return i=>(i.request=new Request(e),i.params=Object.assign({cacheKey:r},i.params),this.strategy.handle(i))}}const N=()=>(k||(k=new O),k);class T extends a{constructor(e,i){super((({request:r})=>{const a=e.getURLsToCacheKeys();for(const t of function*(e,{ignoreURLParametersMatching:i=[/^utm_/,/^fbclid$/],directoryIndex:r="index.html",cleanURLs:a=!0,urlManipulation:t}={}){const n=new URL(e,location.href);n.hash="",yield n.href;const c=function(e,i=[]){for(const r of[...e.searchParams.keys()])i.some((e=>e.test(r)))&&e.searchParams.delete(r);return e}(n,i);if(yield c.href,r&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=r,yield e.href}if(a){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(t){const e=t({url:n});for(const i of e)yield i.href}}(r.url,i)){const i=a.get(t);if(i){return{cacheKey:i,integrity:e.getIntegrityForCacheKey(i)}}}}),e.strategy)}}var W;l({prefix:"eleventy-plugin-pwa-v2"}),self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),W={},function(e){N().precache(e)}([{url:"about.html",revision:"48e73212b8abf3f2606e914562a01f68"},{url:"about/community.html",revision:"bfbabc6a0689fb4ab0c0f66da20a240a"},{url:"about/impact.html",revision:"e4acc53cbcc9a274f08bfb06592ea3e6"},{url:"about/our-work.html",revision:"c44cd5c694ff7719a9418c6366a49bed"},{url:"about/partners.html",revision:"c10804dfda9ca8984a5d0c611d507847"},{url:"apple-touch-icon.png",revision:"4c66bed483919ccf271ff9ce82830505"},{url:"contact.html",revision:"8bfe12d57a28d141bc0bdb095b16a300"},{url:"donate.html",revision:"144d6e4f603b1925ad73dce1c77b7cd5"},{url:"favicon.ico",revision:"6d1bc673897ecbcb78d64ece3cd15876"},{url:"favicon.svg",revision:"6eb55243c6daaa8618cb77d910310bc0"},{url:"get-involved.html",revision:"a20101b7e5b1116e12afbd72d56d8d90"},{url:"icon-192.png",revision:"ab3065338fe43dd07c68401016360b12"},{url:"icon-512.png",revision:"2cf35209f7a27f0e1288c9f79439fedb"},{url:"icons/wave.svg",revision:"d084af1b0834edbd6c989e2a75df2b53"},{url:"img/anatomy-1024w.webp",revision:"37d8e5b110a4d56fb7fc209cf8b4ba6b"},{url:"img/anatomy-400w.webp",revision:"c3eee735786026614b4802f9c5370126"},{url:"img/anatomy-800w.webp",revision:"648e79ac171bed95dacdbe8e94cc3d32"},{url:"img/anatomy.png",revision:"f0ebe30b7a742475c34b7c0faa0ee530"},{url:"img/become-a-partner-400w.webp",revision:"a0b9eedbf6fa06f486fff2f980a5b6d2"},{url:"img/become-a-partner-800w.webp",revision:"72ce045e368f7ca360cd7e23c3d8fc43"},{url:"img/become-a-partner-896w.webp",revision:"1c81fe96a7bbac4265c9748f8fc221ef"},{url:"img/become-a-partner.png",revision:"f9c46a3804e45126d20d4c777d81f582"},{url:"img/bee-friend-400w.webp",revision:"64bf3713e57c0818f0470e27d08daac2"},{url:"img/bee-friend-800w.webp",revision:"dc7503e30e7cd856cd9474d54f4c0230"},{url:"img/bee-friend-896w.webp",revision:"7ff6e559402e5dac86bf0dacf217e71e"},{url:"img/bee-friend.png",revision:"29e0615839fb1b82058b9516e74f73ff"},{url:"img/bee-hero-400w.webp",revision:"d5102fea9c9b2b31f9f1a9bff97477d3"},{url:"img/bee-hero-800w.webp",revision:"288abd96d05cadc5404f61e9fb62f8a5"},{url:"img/bee-hero-896w.webp",revision:"f55f5167f1c1ba46ed390829b17c502c"},{url:"img/bee-hero.png",revision:"9019939a55bf03e088bc2704235a800c"},{url:"img/beeleaf-logo.png",revision:"4dac8e23186c1e3d084f803ea85390e6"},{url:"img/bees-thrive-400w.webp",revision:"5f30967d690427f894fd7c032892feff"},{url:"img/bees-thrive-800w.webp",revision:"982b98829f7eec71036c6bf4446a7f19"},{url:"img/bees-thrive-896w.webp",revision:"2feab2f4738d7f3868da2ab9f1024e10"},{url:"img/bees-thrive.png",revision:"eaba8e5485c634b39d68d9d6b82f48d4"},{url:"img/behavior-1024w.webp",revision:"9ed1341aa092ae675853e23c62c3b34c"},{url:"img/behavior-400w.webp",revision:"0d2ab1abd24eb3add198ac3929d2ca13"},{url:"img/behavior-800w.webp",revision:"355ee903aba49e91f48c8b2542e417f2"},{url:"img/behavior.png",revision:"b3b3b9db65c65792043112887dcb79fa"},{url:"img/bumble-bee-1024w.webp",revision:"fc444ac58b03db73ffc86b862d9bb01e"},{url:"img/bumble-bee-400w.webp",revision:"e91ad6b41fb923e96fa462b8d9ad626b"},{url:"img/bumble-bee-800w.webp",revision:"38bd68dbcd74834c354701db0e581589"},{url:"img/bumble-bee.png",revision:"735aff13f07298a113714bfbdfa743ba"},{url:"img/carpenter-bee-1024w.webp",revision:"a22b48dd0768856b669e94af53c53f72"},{url:"img/carpenter-bee-400w.webp",revision:"23010dcff1d8b36a60a11c8049752c96"},{url:"img/carpenter-bee-800w.webp",revision:"02da98de2631339978e497d246885e24"},{url:"img/carpenter-bee.png",revision:"21f498df262d0f73e14e7ac6b73f02bf"},{url:"img/cityroots-logo-400w.webp",revision:"94c732d9a5a51d501d119acee258903a"},{url:"img/cityroots-logo-512w.webp",revision:"2171e0e551ab6afdb0cd51910fe26af3"},{url:"img/cityroots-logo.png",revision:"ac64d0e576ef6dc11787765b7d791de4"},{url:"img/collaboration-1024w.webp",revision:"9c5bf3dd388e07a7cc7d763756438c37"},{url:"img/collaboration-400w.webp",revision:"63a79132942af878588a9cbda3280a5f"},{url:"img/collaboration-800w.webp",revision:"2a24622271cde9ec4a9c29f54985cc58"},{url:"img/collaboration.png",revision:"257006fee5e01440918b2dc7a8fb4c11"},{url:"img/community-1024w.webp",revision:"31eeba121449efe15a70798792240bf8"},{url:"img/community-400w.webp",revision:"fabcb6c28d41e7c836000a239af1fddf"},{url:"img/community-800w.webp",revision:"2421ef0cb0f0f729dbb701a6b7014109"},{url:"img/connect-400w.webp",revision:"f9dce60557b97619b08fd4ec847194f2"},{url:"img/connect-800w.webp",revision:"9d707917a1eb43ce3aa217f939042e0a"},{url:"img/connect-848w.webp",revision:"95dd8bde1268899180f724f961087b3d"},{url:"img/connect.png",revision:"c27b082276de8d41e16c1f2a464ba82e"},{url:"img/desertbloom-logo-400w.webp",revision:"c3181726280f002013720ddec7faf9f9"},{url:"img/desertbloom-logo-512w.webp",revision:"b7434f4d254e09ace6d38d969a9795a7"},{url:"img/desertbloom-logo.png",revision:"98e3361a4ecf60d71f61ffa971a806a2"},{url:"img/distress-400w.webp",revision:"0746e1529f1594fa8f5169145c4901d4"},{url:"img/distress-800w.webp",revision:"6e7b90a163be1181546be8176f006673"},{url:"img/distress-896w.webp",revision:"71e9853fee6fea6e399973f4a5da3aa9"},{url:"img/donate-400w.webp",revision:"a37095a3035aab61ab5cea603355ec59"},{url:"img/donate-800w.webp",revision:"72521944dabcb1bf45a4700ec1bce791"},{url:"img/donate-848w.webp",revision:"5934b9ff5e36e8b63de67d48a4a7338a"},{url:"img/donate.png",revision:"72c524da12bc4979138201388d449687"},{url:"img/education-1024w.webp",revision:"3fa8e3cbeb7da686ca2bc9c5eb72769c"},{url:"img/education-400w.webp",revision:"39d6478239fd0e968ab91488a9e1a5e0"},{url:"img/education-800w.webp",revision:"6603c566d5c5bb3bbb9309d5997f0392"},{url:"img/education.png",revision:"d13fa09fbbf3261c97e1f059a2f4b3be"},{url:"img/farming-1024w.webp",revision:"0da46a1161dd2c8e9e092fbebddeaf10"},{url:"img/farming-400w.webp",revision:"56c33920855a7c5e50dadfcba0730687"},{url:"img/farming-800w.webp",revision:"b0b9b68d0ca4c8bbcfc85852601eeb5a"},{url:"img/farming.png",revision:"0b7cee1bf310fd70e95cf866e4e7cf29"},{url:"img/future-400w.webp",revision:"395b4057063e2a9ffdb2002fe1abf9a5"},{url:"img/future-800w.webp",revision:"e06631af17612a861c01b781dfb93f97"},{url:"img/future-896w.webp",revision:"aea39a9f1f3eb59ace066fd4a0b8c68c"},{url:"img/future.png",revision:"167a6b9df9e64103cd68dc1fdcdaf490"},{url:"img/get-involved-400w.webp",revision:"0a778c1abdfb1954f456d755d451d19c"},{url:"img/get-involved-800w.webp",revision:"2027d4d881f219237ad7fc15b305acee"},{url:"img/get-involved-896w.webp",revision:"3ac3fe89b2b903b48ee2fab073e8555d"},{url:"img/get-involved.png",revision:"d04946a798fb707265989c86bda7aefa"},{url:"img/guide-1024w.webp",revision:"bafcbc59bb4daa4fa2f3a3d781ba25d3"},{url:"img/guide-400w.webp",revision:"98f6908a74be85ea63714eaa38c9063a"},{url:"img/guide-800w.webp",revision:"21a6deaee39fc970058eecca81f4e4f5"},{url:"img/guide.png",revision:"e8f17feebdf29a8c56350526956a74f6"},{url:"img/habitat-1024w.webp",revision:"e647bc5b020425f128ce447c56ed176f"},{url:"img/habitat-400w.webp",revision:"9ca0a575503ff225a575b86717115301"},{url:"img/habitat-800w.webp",revision:"3eacffed9b8f480b254d88c682c4551e"},{url:"img/habitat.png",revision:"6081068996508cdfeb8861e321fe03dd"},{url:"img/honey-bee-1024w.webp",revision:"b2e0d86ec1bb663f5ffe1ec985669e17"},{url:"img/honey-bee-400w.webp",revision:"c686562ea5f7ea6dcdad536d60217e66"},{url:"img/honey-bee-800w.webp",revision:"6651868481ba64a53649697c65f3eea0"},{url:"img/honey-bee.png",revision:"9254319cd7495f7e7bfd7a4e5efbe513"},{url:"img/how-you-can-help-400w.webp",revision:"7921a6449990e2ba41308f3bec17f2fa"},{url:"img/how-you-can-help-800w.webp",revision:"9f6e899d4df6a4f4aa9718985c1f5685"},{url:"img/how-you-can-help-896w.webp",revision:"9e9d61716a3d6589f53439940bde097b"},{url:"img/how-you-can-help.png",revision:"f4b2611163c47e2990caffb2452a286f"},{url:"img/impact-1024w.webp",revision:"00f8d55d3acb1869c41d40c7a95eecb2"},{url:"img/impact-400w.webp",revision:"3f30cad897720fef330be7c4ce371e12"},{url:"img/impact-800w.webp",revision:"68eb5097dbea93135157ddb5c8911cae"},{url:"img/impact.png",revision:"e2f9654a9310467acd51609b6490929e"},{url:"img/importance-1024w.webp",revision:"6589ef93469b37b34ca392a8fdc8a60b"},{url:"img/importance-400w.webp",revision:"7398a1a73fb47e0d2db80f112c31cca1"},{url:"img/importance-800w.webp",revision:"4cdce803af9e7f50041a099553d6b8f0"},{url:"img/importance.png",revision:"e613ff2a9ceab0184ce9381004607105"},{url:"img/jane-doe-1024w.webp",revision:"cab775497bb3d5bb2fe5617c0f4c39a6"},{url:"img/jane-doe-400w.webp",revision:"bf0f312fbf4afd63bfb3f4f3a0b03fe3"},{url:"img/jane-doe-800w.webp",revision:"f54035802f6d0a1e6d41946147b4e00c"},{url:"img/jane-jones-1024w.webp",revision:"ecb06f234e3257fcc2556bee674f0fbe"},{url:"img/jane-jones-400w.webp",revision:"897b7f83b0139d88c6eb9e7a9ba95ab6"},{url:"img/jane-jones-800w.webp",revision:"0009921a6a8abc7f5f1413caf2f561a1"},{url:"img/jane-smith-1024w.webp",revision:"9a7497514f290d835d041859c4c6f722"},{url:"img/jane-smith-400w.webp",revision:"ff966635c7879849ba0a5552dd079d2e"},{url:"img/jane-smith-800w.webp",revision:"aec2ed23598859b2282dce694fabfda3"},{url:"img/jessica-1024w.webp",revision:"80ab912742f798eca6293a8ab0ef4b19"},{url:"img/jessica-400w.webp",revision:"ef1e349f657d16085e657e316c26a151"},{url:"img/jessica-800w.webp",revision:"529c8bbfa2cd234700798dd900709d83"},{url:"img/john-doe-1024w.webp",revision:"903c79f67494a7f303d8a160503912f7"},{url:"img/john-doe-400w.webp",revision:"73846a99c77de8ccb1ee364ae9cf84d8"},{url:"img/john-doe-800w.webp",revision:"873271b405f663001068c3856bc6e044"},{url:"img/john-jones-1024w.webp",revision:"ff359176f7bb14293f0cb9d7d33b4473"},{url:"img/john-jones-400w.webp",revision:"241bdf46da5dc9216902604c236bd04f"},{url:"img/john-jones-800w.webp",revision:"554d683884d111d16b35676411423f05"},{url:"img/john-smith-1024w.webp",revision:"49763313ff729ca8f202fec6ebc451ac"},{url:"img/john-smith-400w.webp",revision:"1b807a0e6848e919017e4463d536c2ac"},{url:"img/john-smith-800w.webp",revision:"898a08235ad37088509cfcff175c4c82"},{url:"img/learning-400w.webp",revision:"bd93f1b9c57a0d637c1820c5cdc77328"},{url:"img/learning-800w.webp",revision:"d6e5e7466aa5564012d8c4a901a4eabf"},{url:"img/learning-896w.webp",revision:"f8562d2228543afb76481c335d640b11"},{url:"img/learning.png",revision:"516aa682b3c18faa3c50ea7b35d3e063"},{url:"img/lush-bee-habitat-400w.webp",revision:"1101c53948df0a64b6dc7e16fad6b399"},{url:"img/lush-bee-habitat-800w.webp",revision:"99776c69c6feb990b42e1ba702b3eaaf"},{url:"img/lush-bee-habitat-896w.webp",revision:"5ce9863969130736133d1ba19644a107"},{url:"img/lush-bee-habitat.png",revision:"0381af2ceaed081ca9e87de2f1a9fc9f"},{url:"img/making-a-difference-1024w.webp",revision:"2af7dfb330ec9324bbae8c519340351a"},{url:"img/making-a-difference-400w.webp",revision:"002e73d0cc0548a58c35261e2037cdac"},{url:"img/making-a-difference-800w.webp",revision:"46bf6b8c6a38445ae2a7a0635713c36e"},{url:"img/making-a-difference.png",revision:"b04928064195055620743040bf36170a"},{url:"img/mission-1024w.webp",revision:"3cf20417da1dee77ddf72c3f65428707"},{url:"img/mission-400w.webp",revision:"46f33c503ce6a7db4ca5c7c82628e64b"},{url:"img/mission-800w.webp",revision:"e15fd64c54ee6f8bea63b081cfe907f8"},{url:"img/mission.png",revision:"d7135a1217efa7a6a349152617784fdb"},{url:"img/oceansvoice-logo-400w.webp",revision:"a29813a87f97c2530ce02955a812a452"},{url:"img/oceansvoice-logo-512w.webp",revision:"30f9b6093dc8342f1372d16fc0eec2d9"},{url:"img/oceansvoice-logo.png",revision:"12b35784684124f94ecd67ae913b6b8f"},{url:"img/our-work-1024w.webp",revision:"5891d36622e5a7788d70f9c560df1e6e"},{url:"img/our-work-400w.webp",revision:"c0956b31afbab3b7c48087415973523b"},{url:"img/our-work-800w.webp",revision:"c98143a2886adbd8b16e3291e55d4de0"},{url:"img/our-work.png",revision:"9fb89cb7afb5a6b6bccde7a9948c06f3"},{url:"img/positive-1024w.webp",revision:"acf8a8c4849a3bc0700c3aac9e89bda0"},{url:"img/positive-400w.webp",revision:"d36b9e86df48882657d3097f72163761"},{url:"img/positive-800w.webp",revision:"105c4be9c03db69a4d8ff30bf812e4c8"},{url:"img/positive.png",revision:"7f0a053e3215c0f48e3004e87741700a"},{url:"img/protection-1024w.webp",revision:"e30a24ae70c7b0c2b778acffb7e286b0"},{url:"img/protection-400w.webp",revision:"cbe02cd89ff94f0e6785e5734eaeb84a"},{url:"img/protection-800w.webp",revision:"8f6150982f9eda316400def97fb3698c"},{url:"img/protection.png",revision:"5552707aabe1241e007f6f538f747ec7"},{url:"img/research-1024w.webp",revision:"df92d794e9aaf8a96dc26e4754a47e6a"},{url:"img/research-400w.webp",revision:"5472cd119b126942914624065b1953c4"},{url:"img/research-800w.webp",revision:"8ae4cb7707971495ce43e97cc2b5c3cb"},{url:"img/research.png",revision:"fd69fb7fc956cbea2655d950f05f966d"},{url:"img/solution-400w.webp",revision:"103abe02af39f30cc95ff1f64121a309"},{url:"img/solution-800w.webp",revision:"02ef307c057ee5f377c8e22f4c6048dd"},{url:"img/solution-896w.webp",revision:"080ec64226d7e8d03b57dba56d9c3d1d"},{url:"img/solution.png",revision:"a9b136a1a4283d6c5387907da34d0032"},{url:"img/thriving-bee-habitat-1024w.webp",revision:"7ebeb634f0b9546be6e1870b3fbd5bde"},{url:"img/thriving-bee-habitat-400w.webp",revision:"4dbabef5191fc5c5f7826f9313465160"},{url:"img/thriving-bee-habitat-800w.webp",revision:"437420b79b62f7be56c5e51f92b75a24"},{url:"img/thriving-bee-habitat.png",revision:"ceeed3127bbceeb17a3bf3d20bea4052"},{url:"img/wasteland-1024w.webp",revision:"47ed1e4e79e413ffc05149d808a95e33"},{url:"img/wasteland-400w.webp",revision:"2de2797a44f8d89d3008e1234e058e74"},{url:"img/wasteland-800w.webp",revision:"f8a1d2021a9a0b9d0a08f7bdc64f9c1e"},{url:"img/wasteland.png",revision:"8473bf96ffbc0b3d3c6350950535666c"},{url:"img/wave.png",revision:"1e2e97c6c804457c420d30dff39e2983"},{url:"img/world-1024w.webp",revision:"4f614be54615e2f652f1b07ba109bbe3"},{url:"img/world-400w.webp",revision:"484cc3142ad20e391728210ca3b8a793"},{url:"img/world-800w.webp",revision:"eaa7a6fd5452fea7e417bf6c018ace91"},{url:"img/world.png",revision:"1030cae8a8b00f4b1cd2753eedac7a3a"},{url:"index.html",revision:"09e1b32c5bc0d92338f0c0e5fb49c681"},{url:"index.min.css",revision:"5a78f60ef14189c16743b568238764c9"},{url:"index.min.js",revision:"c742d76b6ef3b5848e5d56fa84a7e4fb"},{url:"learn.html",revision:"15dc106ff15df697f27764ddd06f2e40"},{url:"learn/bee-facts.html",revision:"afb4994353ef6b6f4c23f690341aca36"},{url:"learn/conservation-techniques.html",revision:"b4100c863db315803349706c5c7d4df0"},{url:"overrides.css",revision:"b8290f6c1db28a9a37f9fac74357c060"},{url:"overrides.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"style.min.css",revision:"5a78f60ef14189c16743b568238764c9"},{url:"svg/footer-background.svg",revision:"d82330bce4e2c4c7d2b3ce9fc82383f0"},{url:"svg/logo.svg",revision:"0da355afe1bc559c6aad84f23e1907b3"},{url:"theme.css",revision:"b8290f6c1db28a9a37f9fac74357c060"},{url:"wave.svg",revision:"d084af1b0834edbd6c989e2a75df2b53"}]),function(e){const i=N();o(new T(i,e))}(W),o(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,new R,"GET"),o(/^https?:\/\/fonts\.googleapis\.com\/css/,new R,"GET");
