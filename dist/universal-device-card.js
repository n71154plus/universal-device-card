const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${i}--\x3e`,n=new RegExp(`${i}|${a}`),s="$lit$";class r{constructor(e,t){this.parts=[],this.element=t;const a=[],r=[],c=document.createTreeWalker(t.content,133,null,!1);let p=0,u=-1,h=0;const{strings:m,values:{length:b}}=e;for(;h<b;){const e=c.nextNode();if(null!==e){if(u++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let a=0;for(let e=0;e<i;e++)o(t[e].name,s)&&a++;for(;a-- >0;){const t=m[h],i=d.exec(t)[2],a=i.toLowerCase()+s,r=e.getAttribute(a);e.removeAttribute(a);const o=r.split(n);this.parts.push({type:"attribute",index:u,name:i,strings:o}),h+=o.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),c.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,r=t.split(n),c=r.length-1;for(let t=0;t<c;t++){let a,n=r[t];if(""===n)a=l();else{const e=d.exec(n);null!==e&&o(e[2],s)&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),a=document.createTextNode(n)}i.insertBefore(a,e),this.parts.push({type:"node",index:++u})}""===r[c]?(i.insertBefore(l(),e),a.push(e)):e.data=r[c],h+=c}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&u!==p||(u++,t.insertBefore(l(),e)),p=u,this.parts.push({type:"node",index:u}),null===e.nextSibling?e.data="":(a.push(e),u--),h++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),h++}}else c.currentNode=r.pop()}for(const e of a)e.parentNode.removeChild(e)}}const o=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},c=e=>-1!==e.index,l=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(e,t){const{element:{content:i},parts:a}=e,n=document.createTreeWalker(i,133,null,!1);let s=h(a),r=a[s],o=-1,c=0;const l=[];let d=null;for(;n.nextNode();){o++;const e=n.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==r&&r.index===o;)r.index=null!==d?-1:r.index-c,s=h(a,s),r=a[s]}l.forEach(e=>e.parentNode.removeChild(e))}const u=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},h=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(c(t))return i}return-1};const m=new WeakMap,b=e=>"function"==typeof e&&m.has(e),_={},g={};class v{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],a=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let s,r=0,o=0,l=n.nextNode();for(;r<a.length;)if(s=a[r],c(s)){for(;o<s.index;)o++,"TEMPLATE"===l.nodeName&&(i.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=i.pop(),l=n.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,s.name,s.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),f=` ${i} `;class x{constructor(e,t,i,a){this.strings=e,this.values=t,this.type=i,this.processor=a}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let r=0;r<e;r++){const e=this.strings[r],o=e.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===e.indexOf("--\x3e",o+1);const c=d.exec(e);t+=null===c?e+(n?f:a):e.substr(0,c.index)+c[1]+c[2]+s+c[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==y&&(t=y.createHTML(t)),e.innerHTML=t,e}}const $=e=>null===e||!("object"==typeof e||"function"==typeof e),w=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class k{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!w(e))return e}let a="";for(let n=0;n<t;n++){a+=e[n];const t=i[n];if(void 0!==t){const e=t.value;if($(e)||!w(e))a+="string"==typeof e?e:String(e);else for(const t of e)a+="string"==typeof t?t:String(t)}}return a+=e[t],a}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||$(e)&&e===this.value||(this.value=e,b(e)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class P{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&($(e)?e!==this.value&&this.__commitText(e):e instanceof x?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):w(e)?this.__commitIterable(e):e===g?(this.value=g,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const i=new v(t,e.processor,this.options),a=i._clone();i.update(e.values),this.__commitNode(a),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,a=0;for(const n of e)i=t[a],void 0===i&&(i=new P(this.options),t.push(i),0===a?i.appendIntoPart(this):i.insertAfterPart(t[a-1])),i.setValue(n),i.commit(),a++;a<t.length&&(t.length=a,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class C{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class M extends k{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends S{}let T=!1;(()=>{try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class L{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),a=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=j(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const j=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function A(e){let t=I.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},I.set(e.type,t));let a=t.stringsArray.get(e.strings);if(void 0!==a)return a;const n=e.strings.join(i);return a=t.keyString.get(n),void 0===a&&(a=new r(e,e.getTemplateElement()),t.keyString.set(n,a)),t.stringsArray.set(e.strings,a),a}const I=new Map,q=new WeakMap;const z=new class{handleAttributeExpressions(e,t,i,a){const n=t[0];if("."===n){return new M(e,t.slice(1),i).parts}if("@"===n)return[new L(e,t.slice(1),a.eventContext)];if("?"===n)return[new C(e,t.slice(1),i)];return new k(e,t,i).parts}handleTextExpression(e){return new P(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const N=(e,...t)=>new x(e,t,"html",z),B=(e,t)=>`${e}--${t}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const V=e=>t=>{const a=B(t.type,e);let n=I.get(a);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},I.set(a,n));let s=n.stringsArray.get(t.strings);if(void 0!==s)return s;const o=t.strings.join(i);if(s=n.keyString.get(o),void 0===s){const i=t.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(i,e),s=new r(t,i),n.keyString.set(o,s)}return n.stringsArray.set(t.strings,s),s},Q=["html","svg"],D=new Set,R=(e,t,i)=>{D.add(e);const a=i?i.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:s}=n;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(a,e);const r=document.createElement("style");for(let e=0;e<s;e++){const t=n[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{Q.forEach(t=>{const i=I.get(B(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),p(e,i)})})})(e);const o=a.content;i?function(e,t,i=null){const{element:{content:a},parts:n}=e;if(null==i)return void a.appendChild(t);const s=document.createTreeWalker(a,133,null,!1);let r=h(n),o=0,c=-1;for(;s.nextNode();)for(c++,s.currentNode===i&&(o=u(t),i.parentNode.insertBefore(t,i));-1!==r&&n[r].index===c;){if(o>0){for(;-1!==r;)n[r].index+=o,r=h(n,r);return}r=h(n,r)}}(i,r,o.firstChild):o.insertBefore(r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(a,e);const c=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){o.insertBefore(r,o.firstChild);const e=new Set;e.add(r),p(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const H={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},F=(e,t)=>t!==e&&(t==t||e==e),O={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:F},W="finalized";class Y extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const a=this._attributeNameForProperty(i,t);void 0!==a&&(this._attributeToPropertyMap.set(a,i),e.push(a))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=O){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const n=this[e];this[t]=a,this.requestUpdateInternal(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||O}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(W)||e.finalize(),this[W]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=F){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,a=t.converter||H,n="function"==typeof a?a:a.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,a=t.converter;return(a&&a.toAttribute||H.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=O){const a=this.constructor,n=a._attributeNameForProperty(e,i);if(void 0!==n){const e=a._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,a=i._attributeToPropertyMap.get(e);if(void 0!==a){const e=i.getPropertyOptions(a);this._updateState=16|this._updateState,this[a]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let a=!0;if(void 0!==e){const n=this.constructor;i=i||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):a=!1}!this._hasRequestedUpdate&&a&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Y[W]=!0;const J=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol();class X{constructor(e,t){if(t!==G)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(J?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=(e,...t)=>{const i=t.reduce((t,i,a)=>t+(e=>{if(e instanceof X)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[a+1],e[0]);return new X(i,G)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Z={};class ee extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),a=[];i.forEach(e=>a.unshift(e)),this._styles=a}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!J){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new X(String(t),G)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?J?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Z&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return Z}}function te(){return void 0!==import.meta&&import.meta.url?new URL("translations/",import.meta.url).href:"/local/universal-device-card/translations/"}ee.finalized=!0,ee.render=(e,i,a)=>{if(!a||"object"!=typeof a||!a.scopeName)throw new Error("The `scopeName` option is required.");const n=a.scopeName,s=q.has(i),r=U&&11===i.nodeType&&!!i.host,o=r&&!D.has(n),c=o?document.createDocumentFragment():i;if(((e,i,a)=>{let n=q.get(i);void 0===n&&(t(i,i.firstChild),q.set(i,n=new P(Object.assign({templateFactory:A},a))),n.appendInto(i)),n.setValue(e),n.commit()})(e,c,Object.assign({templateFactory:V(n)},a)),o){const e=q.get(c);q.delete(c);const a=e.value instanceof v?e.value.template:void 0;R(n,c,a),t(i,i.firstChild),i.appendChild(c),q.set(i,e)}!s&&r&&window.ShadyCSS.styleElement(i.host)},ee.shadowRootOptions={mode:"open"};const ie={"zh-TW":{target_temp:"目標溫度",target_humidity:"目標濕度",position:"位置",tilt:"傾斜",open_tilt:"開啟傾斜",close_tilt:"關閉傾斜",open:"開啟",close:"關閉",stop:"停止",start:"開始",pause:"暫停",return_home:"回充",no_controls:"無其他控制項目",unavailable:"無法使用",device:"設備",cleaning:"清掃中",docked:"充電中",returning:"回充中",idle:"待機",paused:"已暫停",error:"錯誤",cool:"冷氣",heat:"暖氣",dry:"除濕",fan_only:"送風",auto:"自動",off:"關閉",click_to_view:"點擊查看完整內容",editor_entity:"實體 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"選擇實體...",editor_layout:"佈局模式 (Layout)",editor_layout_standard:"標準版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"長條型 (Bar)",editor_language:"語言 (Language)",editor_language_auto:"自動 (Auto)",editor_disable_popup:"禁用彈出面板",editor_show_buttons:"主畫面顯示按鈕 (Button Entity IDs)",editor_show_buttons_desc:"輸入 button 實體 ID，用逗號分隔",editor_filters_title:"彈出面板過濾器 (Popup Filters)",editor_filters_desc:"使用逗號分隔多個值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"僅包含的 Domain",editor_exclude_entities:"排除的實體 ID",editor_include_entities:"僅包含的實體 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"僅包含的 Sensor Device Class",mass_queue_playlist:"播放清單",mass_queue_loading:"載入中…",mass_library:"音樂資料庫",mass_library_loading:"載入中…",mass_search:"搜尋",mass_search_placeholder:"藝人、專輯或曲目…",mass_search_loading:"載入中…",mass_search_button:"搜尋"},"zh-CN":{target_temp:"目标温度",target_humidity:"目标湿度",position:"位置",tilt:"倾斜",open_tilt:"开启倾斜",close_tilt:"关闭倾斜",open:"打开",close:"关闭",stop:"停止",start:"开始",pause:"暂停",return_home:"回充",no_controls:"无其他控制项目",unavailable:"不可用",device:"设备",cleaning:"清扫中",docked:"充电中",returning:"回充中",idle:"待机",paused:"已暂停",error:"错误",cool:"制冷",heat:"制热",dry:"除湿",fan_only:"送风",auto:"自动",off:"关闭",click_to_view:"点击查看完整内容",editor_entity:"实体 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"选择实体...",editor_layout:"布局模式 (Layout)",editor_layout_standard:"标准版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"长条型 (Bar)",editor_language:"语言 (Language)",editor_language_auto:"自动 (Auto)",editor_disable_popup:"禁用弹出面板",editor_show_buttons:"主画面显示按钮 (Button Entity IDs)",editor_show_buttons_desc:"输入 button 实体 ID，用逗号分隔",editor_filters_title:"弹出面板过滤器 (Popup Filters)",editor_filters_desc:"使用逗号分隔多个值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"仅包含的 Domain",editor_exclude_entities:"排除的实体 ID",editor_include_entities:"仅包含的实体 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"仅包含的 Sensor Device Class",mass_queue_playlist:"播放列表",mass_queue_loading:"加载中…",mass_library:"音乐资料库",mass_library_loading:"加载中…",mass_search:"搜索",mass_search_placeholder:"艺人、专辑或曲目…",mass_search_loading:"加载中…",mass_search_button:"搜索"},en:{target_temp:"Target Temp",target_humidity:"Target Humidity",position:"Position",tilt:"Tilt",open_tilt:"Open Tilt",close_tilt:"Close Tilt",open:"Open",close:"Close",stop:"Stop",start:"Start",pause:"Pause",return_home:"Return",no_controls:"No additional controls",unavailable:"Unavailable",device:"Device",cleaning:"Cleaning",docked:"Docked",returning:"Returning",idle:"Idle",paused:"Paused",error:"Error",cool:"Cool",heat:"Heat",dry:"Dry",fan_only:"Fan",auto:"Auto",off:"Off",click_to_view:"Click to view full text",editor_entity:"Entity",editor_entity_required:"* Required",editor_entity_select:"Select entity...",editor_layout:"Layout",editor_layout_standard:"Standard",editor_layout_mini:"Mini",editor_layout_bar:"Bar",editor_language:"Language",editor_language_auto:"Auto",editor_disable_popup:"Disable Popup",editor_show_buttons:"Show Buttons on Main (Button Entity IDs)",editor_show_buttons_desc:"Enter button entity IDs, comma separated",editor_filters_title:"Popup Filters",editor_filters_desc:"Use comma to separate multiple values, e.g: sensor,switch",editor_exclude_domains:"Exclude Domains",editor_include_domains:"Include Domains Only",editor_exclude_entities:"Exclude Entity IDs",editor_include_entities:"Include Entity IDs Only",editor_exclude_sensor_classes:"Exclude Sensor Classes",editor_include_sensor_classes:"Include Sensor Classes Only",mass_queue_playlist:"Queue",mass_queue_loading:"Loading…",mass_library:"Library",mass_library_loading:"Loading…",mass_search:"Search",mass_search_placeholder:"Artist, album or track…",mass_search_loading:"Loading…",mass_search_button:"Search"},ja:{target_temp:"目標温度",target_humidity:"目標湿度",position:"位置",tilt:"傾斜",open_tilt:"傾斜を開く",close_tilt:"傾斜を閉じる",open:"開く",close:"閉じる",stop:"停止",start:"スタート",pause:"一時停止",return_home:"帰還",no_controls:"他のコントロールなし",unavailable:"利用不可",device:"デバイス",cleaning:"掃除中",docked:"充電中",returning:"帰還中",idle:"待機",paused:"一時停止",error:"エラー",cool:"冷房",heat:"暖房",dry:"除湿",fan_only:"送風",auto:"自動",off:"オフ",click_to_view:"クリックして全文を表示",editor_entity:"エンティティ",editor_entity_required:"* 必須",editor_entity_select:"エンティティを選択...",editor_layout:"レイアウト",editor_layout_standard:"スタンダード",editor_layout_mini:"ミニ",editor_layout_bar:"バー",editor_language:"言語",editor_language_auto:"自動",editor_disable_popup:"ポップアップを無効化",editor_show_buttons:"メイン画面にボタン表示",editor_show_buttons_desc:"ボタンエンティティIDをカンマ区切りで入力",editor_filters_title:"ポップアップフィルター",editor_filters_desc:"カンマで複数の値を区切る",editor_exclude_domains:"除外するドメイン",editor_include_domains:"含めるドメインのみ",editor_exclude_entities:"除外するエンティティID",editor_include_entities:"含めるエンティティIDのみ",editor_exclude_sensor_classes:"除外するセンサークラス",editor_include_sensor_classes:"含めるセンサークラスのみ",mass_queue_playlist:"再生リスト",mass_queue_loading:"読み込み中…",mass_library:"音楽ライブラリ",mass_library_loading:"読み込み中…",mass_search:"検索",mass_search_placeholder:"アーティスト、アルバム、曲…",mass_search_loading:"読み込み中…",mass_search_button:"検索"}},ae=K`
      :host { 
        display: block;
        --accent-color: #03a9f4;
        --text-primary: var(--primary-text-color);
        --text-secondary: var(--secondary-text-color);
        -webkit-tap-highlight-color: transparent;
      }
      
      .main-container { 
        padding: 20px; 
        border-radius: 28px; 
        background: var(--ha-card-background);
        transition: background-color 0.8s ease;
        position: relative;
        overflow-x: hidden; /* 只隱藏水平溢出 */
        overflow-y: visible; /* 允許垂直溢出 */
      }

      /* Header */
      .header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center;
        margin-bottom: 16px;
        gap: 12px;
      }

      .header-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.2s, transform 0.2s;
      }

      .header-icon:hover {
        background: rgba(var(--rgb-primary-text-color), 0.08);
      }

      .header-icon:active {
        transform: scale(0.95);
      }

      .header-icon.icon-longpress-active,
      .bar-icon.icon-longpress-active {
        transform: scale(0.92);
        animation: icon-longpress-pulse 0.2s ease-out;
      }

      @keyframes icon-longpress-pulse {
        0% { opacity: 1; }
        50% { opacity: 0.85; }
        100% { opacity: 1; }
      }

      .header-icon ha-icon {
        width: 28px;
        height: 28px;
      }

      .header-icon-mini {
        width: 32px;
        height: 32px;
      }

      .header-icon-mini ha-icon {
        width: 22px;
        height: 22px;
      }

      .header > .current-temp,
      .header > .device-name,
      .header .title-scroll-wrap {
        flex: 1;
        min-width: 0;
      }
      
      .device-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        min-width: 0;
      }

      .device-value {
        font-size: 0.8rem;
        font-weight: 500;
        opacity: 0.78;
        display: block;
        margin-top: 2px;
      }

      /* 標題過長時水平捲動，不裁切 */
      .title-scroll-wrap {
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
        max-width: 100%;
        min-width: 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
      }

      .title-scroll-wrap::-webkit-scrollbar {
        display: none;
      }

      .title-text {
        white-space: nowrap;
        display: inline-block;
      }

      /* ===== 統一佈局系統 ===== */
      
      /* 第一行：Header with Slider */
      .unified-header {
        position: relative;
        padding: 16px;
        border-radius: 16px;
        margin-bottom: 16px;
        overflow: hidden;
        min-height: 60px;
      }

      .unified-header-mini {
        padding: 12px;
        min-height: 50px;
        margin-bottom: 12px;
      }

      /* 背景 Slider */
      .slider-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 16px;
      }

      .slider-background:hover {
        opacity: 0.9;
      }

      /* Light - 黃色漸變 */
      .slider-light {
        background: linear-gradient(
          to right,
          rgba(255, 165, 0, 0.25) 0%,
          rgba(255, 215, 0, 0.25) var(--slider-value),
          rgba(var(--rgb-primary-text-color), 0.05) var(--slider-value)
        );
      }

      /* Cover - 藍色漸變 */
      .slider-cover {
        background: linear-gradient(
          to right,
          rgba(25, 118, 210, 0.25) 0%,
          rgba(100, 181, 246, 0.25) var(--slider-value),
          rgba(var(--rgb-primary-text-color), 0.05) var(--slider-value)
        );
      }

      /* Media Player - 綠色漸變 */
      .slider-media {
        background: linear-gradient(
          to right,
          rgba(56, 142, 60, 0.25) 0%,
          rgba(102, 187, 106, 0.25) var(--slider-value),
          rgba(var(--rgb-primary-text-color), 0.05) var(--slider-value)
        );
      }

      /* Fan - 青色漸變 */
      .slider-fan {
        background: linear-gradient(
          to right,
          rgba(0, 172, 193, 0.25) 0%,
          rgba(77, 208, 225, 0.25) var(--slider-value),
          rgba(var(--rgb-primary-text-color), 0.05) var(--slider-value)
        );
      }

      /* Header 內容層 */
      .header-content {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
      }

      .header-content > * {
        pointer-events: auto;
      }

      .device-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
      }

      .device-info .device-name {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .device-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
      }

      .device-state {
        font-size: 1rem;
        font-weight: 500;
        opacity: 0.7;
      }

      /* 第二行：Primary Control */
      .unified-control-primary {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
      }

      .unified-control-mini {
        margin: 12px 0;
      }

      .power-btn {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }

      .power-btn ha-icon {
        font-size: 2.5rem;
      }

      .power-btn .btn-label {
        font-size: 0.85rem;
        font-weight: 500;
        opacity: 0.8;
      }

      .power-btn.on {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 8px 24px rgba(3, 169, 244, 0.4);
      }

      .power-btn-mini {
        width: 70px;
        height: 70px;
      }

      .power-btn-mini ha-icon {
        font-size: 2rem;
      }

      .power-btn-mini .btn-label {
        font-size: 0.75rem;
      }

      /* 第三行：Secondary Control */
      .unified-control-secondary {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin: 16px 0;
      }

      .control-label {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0.8;
      }

      .control-label ha-icon {
        width: 20px;
        height: 20px;
      }

      /* Bar Mode Slider */
      .bar-slider-container {
        position: relative;
        height: 20px;
        margin-top: 4px;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
      }

      .bar-slider-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 0.3s ease;
      }

      .bar-slider-text {
        position: relative;
        z-index: 1;
        font-size: 0.75rem;
        font-weight: 600;
        text-align: center;
        line-height: 20px;
      }

      .current-temp { 
        font-size: 3.5rem; 
        font-weight: 800; 
        letter-spacing: -2px; 
      }
      
      .unit { 
        font-size: 1.2rem; 
        margin-left: 4px; 
        opacity: 0.7; 
      }
      
      .header-action { 
        background: rgba(var(--rgb-primary-text-color), 0.05); 
        padding: 10px; 
        border-radius: 14px; 
        cursor: pointer;
        transition: background 0.3s;
      }
      
      .header-action:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
      }

      /* Temperature Control (Climate & Water Heater) */
      .temp-control { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin: 24px 0; 
      }
      
      .adj-btn { 
        width: 64px; 
        height: 64px; 
        border-radius: 22px; 
        border: none; 
        background: var(--accent-color); 
        color: white; 
        cursor: pointer; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .adj-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0,0,0,0.15);
      }
      
      .adj-btn:active {
        transform: scale(0.95);
      }
      
      .target-display { text-align: center; }
      .target-display .value { font-size: 2.2rem; font-weight: 800; display: block; }
      .target-display .label { font-size: 0.8rem; opacity: 0.6; }

      /* Value Control (Light brightness, Cover position, Media volume, etc.) */
      .value-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        gap: 16px;
      }

      .value-control-mini {
        margin: 12px 0;
        gap: 12px;
      }

      .value-display {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .value-display ha-icon {
        width: 32px;
        height: 32px;
        opacity: 0.7;
      }

      .value-display .value {
        font-size: 1.8rem;
        font-weight: 700;
      }

      .value-display .value-mini {
        font-size: 1.4rem;
      }

      /* Quick Modes (Climate) */
      .quick-modes { 
        display: grid; 
        grid-template-columns: repeat(3, 1fr); 
        gap: 10px; 
      }
      
      .mode-item { 
        padding: 12px; 
        border-radius: 20px; 
        background: rgba(var(--rgb-primary-text-color), 0.05); 
        text-align: center; 
        cursor: pointer; 
        transition: all 0.3s;
      }
      
      .mode-item:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
      }
      
      .mode-item.active { 
        background: var(--accent-color); 
        color: white; 
        box-shadow: 0 4px 12px rgba(3, 169, 244, 0.3);
      }

      .mode-label {
        font-size: 0.7rem;
        margin-top: 4px;
        display: block;
        opacity: 0.9;
      }

      /* Fan Mode Section (Standard/Mini) */
      .fan-mode-section {
        margin-top: 16px;
        padding: 12px;
        background: rgba(var(--rgb-primary-text-color), 0.03);
        border-radius: 16px;
      }

      .fan-mode-mini {
        margin-top: 12px;
        padding: 8px;
      }

      .fan-mode-label {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 0.85rem;
        font-weight: 600;
        opacity: 0.8;
        cursor: pointer;
        transition: opacity 0.3s;
        line-height: 1;
      }

      .fan-mode-label:hover {
        opacity: 1;
      }

      .fan-mode-label ha-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .fan-mode-label > span {
        display: inline-flex;
        align-items: center;
        line-height: 1;
      }

      .expand-icon {
        margin-left: auto;
        transition: transform 0.3s;
      }

      .expand-icon.expanded {
        transform: rotate(180deg);
      }

      .fan-mode-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
        gap: 8px;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
      }

      .fan-mode-options.expanded {
        max-height: 200px;
        opacity: 1;
        margin-top: 8px;
      }

      .fan-mode-options.collapsed {
        margin-top: 0;
      }

      .fan-mode-options-mini {
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: 6px;
      }

      .fan-mode-chip {
        padding: 10px 8px;
        border-radius: 12px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .fan-mode-chip-mini {
        padding: 8px 6px;
        font-size: 0.7rem;
      }

      .fan-mode-chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
        transform: translateY(-2px);
      }

      .fan-mode-chip.active {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 2px 8px rgba(3, 169, 244, 0.3);
      }

      /* Bar Mode - HVAC Mode Chips */
      .bar-modes {
        display: flex;
        gap: 8px;
        padding: 12px 16px;
        margin: 0 -20px; /* 負邊距延伸到父容器邊緣 */
        padding-left: 20px;
        padding-right: 20px;
        overflow-x: auto;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch; /* iOS 平滑滾動 */
      }

      .bar-modes::-webkit-scrollbar {
        display: none;
      }

      .bar-mode-chip {
        min-width: 44px;
        height: 44px;
        padding: 0 12px;
        border-radius: 12px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        flex-shrink: 0;
        gap: 6px;
      }

      .bar-mode-chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
        transform: scale(1.05);
      }

      .bar-mode-chip.active {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 2px 8px rgba(3, 169, 244, 0.3);
      }

      .bar-mode-chip ha-icon {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
      }
      }

      /* Bar Mode - Fan Mode */
      .bar-fan-modes {
        background: rgba(var(--rgb-primary-text-color), 0.02);
        border-top: 1px solid rgba(var(--rgb-primary-text-color), 0.05);
        transition: max-height 0.3s ease, padding 0.3s ease;
        overflow: hidden;
      }

      .bar-fan-modes.expanded {
        padding: 12px 16px;
        max-height: 200px;
      }

      .bar-fan-modes.collapsed {
        padding: 8px 16px;
        max-height: 40px;
      }

      .bar-fan-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        opacity: 0.7;
        cursor: pointer;
        transition: opacity 0.3s;
        line-height: 1;
      }

      .bar-fan-label:hover {
        opacity: 1;
      }

      .bar-fan-label ha-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .bar-fan-label > span {
        display: inline-flex;
        align-items: center;
        line-height: 1;
      }

      .bar-fan-options {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
      }

      .bar-fan-options.expanded {
        max-height: 150px;
        opacity: 1;
        margin-top: 10px;
      }

      .bar-fan-options.collapsed {
        margin-top: 0;
      }

      .bar-fan-chip {
        padding: 8px 14px;
        border-radius: 16px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        white-space: nowrap;
      }

      .bar-fan-chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
        transform: translateY(-1px);
      }

      .bar-fan-chip.active {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 2px 6px rgba(3, 169, 244, 0.3);
      }

      /* Main Control (Light, Fan, etc.) */
      .main-control {
        display: flex;
        justify-content: center;
        margin: 24px 0;
      }

      .power-btn {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }

      .power-btn.on {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 8px 24px rgba(3, 169, 244, 0.4);
      }

      .power-btn:hover {
        transform: scale(1.05);
      }

      .power-btn .mode-label {
        font-size: 0.7rem;
        margin-top: 0;
        opacity: 0.9;
      }

      /* Slider Control */
      .slider-control {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 16px 0;
      }

      .slider-control input[type="range"] {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        outline: none;
        -webkit-appearance: none;
      }

      .slider-control input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--accent-color);
        cursor: pointer;
      }

      .slider-value {
        min-width: 48px;
        text-align: right;
        font-weight: 700;
      }

      /* Cover Controls */
      .cover-controls {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 16px 0;
      }

      .cover-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        border: none;
        border-radius: 16px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.85rem;
      }

      .cover-btn:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
      }

      .position-display {
        text-align: center;
        margin-top: 16px;
        font-size: 1.1rem;
        font-weight: 600;
      }

      /* Media Player */
      .media-info {
        text-align: center;
        margin: 24px 0;
      }

      .media-title {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .media-artist {
        font-size: 0.9rem;
        opacity: 0.7;
      }

      .media-controls {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin: 16px 0;
      }

      .media-btn {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 1.5rem;
      }

      .media-btn.primary {
        width: 72px;
        height: 72px;
        background: var(--accent-color);
        color: white;
        font-size: 2rem;
      }

      .media-btn:hover {
        transform: scale(1.1);
      }

      /* Music Assistant 佇列 (music_assistant.get_queue) */
      .mass-queue-foldable {
        margin-top: 16px;
        border-radius: 12px;
        background: rgba(var(--rgb-primary-text-color), 0.06);
        overflow: hidden;
      }
      .mass-queue-header {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 12px 14px;
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        text-align: left;
        transition: background 0.2s;
      }
      .mass-queue-header:hover {
        background: rgba(var(--rgb-primary-text-color), 0.08);
      }
      .mass-queue-header ha-icon {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
      }
      .mass-queue-loading {
        margin-left: auto;
        font-size: 0.85rem;
        font-weight: 500;
        opacity: 0.7;
      }
      .mass-queue-list {
        max-height: 280px;
        overflow-y: auto;
        padding: 0 8px 8px;
      }
      .mass-queue-empty {
        padding: 16px;
        text-align: center;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
      .mass-queue-item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 10px 12px;
        margin-bottom: 4px;
        border: none;
        border-radius: 10px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        text-align: left;
        transition: background 0.2s;
      }
      .mass-queue-item:hover {
        background: rgba(var(--rgb-primary-text-color), 0.12);
      }
      .mass-queue-item-image {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        overflow: hidden;
        background: rgba(var(--rgb-primary-text-color), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .mass-queue-item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .mass-queue-item-image ha-icon {
        width: 28px;
        height: 28px;
        opacity: 0.6;
      }
      .mass-queue-item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .mass-queue-item-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mass-queue-item-artist,
      .mass-queue-item-album {
        font-size: 0.8rem;
        color: var(--text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mass-queue-item-play {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        opacity: 0.7;
      }

      /* Music Assistant 搜尋列 */
      .mass-search-input-row {
        display: flex;
        gap: 8px;
        padding: 8px 8px 4px;
        align-items: center;
      }
      .mass-search-input {
        flex: 1;
        min-width: 0;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid rgba(var(--rgb-primary-text-color), 0.2);
        background: rgba(var(--rgb-primary-text-color), 0.05);
        color: var(--primary-text-color);
        font-size: 0.9rem;
      }
      .mass-search-input::placeholder {
        color: var(--text-secondary);
      }
      .mass-search-btn {
        flex: 0 0 auto;
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        background: var(--primary-color);
        color: var(--text-primary-color);
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
      }
      .mass-search-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Music Assistant 資料庫列 (Library) */
      .mass-library-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 8px 8px 10px;
      }
      .mass-library-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .mass-library-row-title {
        font-size: 0.85rem;
        font-weight: 600;
        opacity: 0.7;
        padding: 0 4px;
      }
      .mass-library-row-scroll {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 2px 2px 6px;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      }
      .mass-library-row-scroll::-webkit-scrollbar {
        display: none;
      }
      .mass-library-chip {
        flex: 0 0 auto;
        min-width: 90px;
        max-width: 120px;
        border-radius: 12px;
        padding: 6px;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-align: left;
        transition: background 0.2s, transform 0.2s;
      }
      .mass-library-chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
        transform: translateY(-1px);
      }
      .mass-library-chip-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
        overflow: hidden;
        background: rgba(var(--rgb-primary-text-color), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .mass-library-chip-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .mass-library-chip-image ha-icon {
        width: 28px;
        height: 28px;
        opacity: 0.7;
      }
      .mass-library-chip-text {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .mass-library-chip-title {
        font-size: 0.8rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mass-library-chip-sub {
        font-size: 0.7rem;
        color: var(--text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Vacuum */
      .vacuum-status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
      }

      .status-badge {
        padding: 8px 16px;
        border-radius: 20px;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        font-weight: 600;
      }

      .battery-display {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.1rem;
        font-weight: 700;
      }

      .vacuum-controls {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 16px 0;
      }

      .vacuum-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        border: none;
        border-radius: 16px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.85rem;
      }

      .vacuum-btn:hover {
        background: var(--accent-color);
        color: white;
      }

      /* Generic */
      .generic-state {
        text-align: center;
        margin: 32px 0;
      }

      .state-value {
        font-size: 2rem;
        font-weight: 700;
      }

      /* Main Buttons */
      .main-buttons {
        display: flex;
        gap: 8px;
        margin-top: 12px;
        flex-wrap: wrap;
      }

      .main-buttons-bar {
        margin-top: 0;
        margin-left: 8px;
      }

      .main-button {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 16px;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s;
      }

      .main-button:hover {
        background: var(--accent-color);
        color: white;
      }

      .main-button.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      /* Bar Layout */
      .bar-layout {
        padding: 8px 16px !important;
      }

      .bar-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .bar-left {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
      }

      .bar-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        font-size: 1.5rem;
        flex-shrink: 0;
        transition: all 0.3s;
        cursor: pointer;
      }

      .bar-icon:hover {
        background: rgba(var(--rgb-primary-text-color), 0.12);
      }

      .bar-icon:active {
        transform: scale(0.95);
      }

      .bar-icon-on {
        background: var(--accent-color);
        color: white;
      }

      .bar-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        flex: 1;
      }

      .bar-name {
        font-weight: 700;
        font-size: 0.85rem;
        min-width: 0;
      }

      .bar-name .title-scroll-wrap {
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
      }

      .bar-name .title-scroll-wrap::-webkit-scrollbar {
        display: none;
      }

      .bar-name .title-text {
        white-space: nowrap;
        display: inline-block;
      }

      .bar-state {
        font-size: 0.85rem;
        opacity: 0.7;
      }

      .bar-right {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      .bar-controls {
        display: flex;
        gap: 4px;
      }

      .bar-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 1.2rem;
      }

      .bar-btn:hover {
        background: var(--accent-color);
        color: white;
      }

      .bar-btn-small {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 1rem;
      }

      .bar-btn-small:hover {
        background: var(--accent-color);
        color: white;
      }

      .bar-toggle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        cursor: pointer;
        transition: all 0.2s;
      }

      .bar-toggle-on {
        background: var(--accent-color);
        color: white;
      }

      .bar-settings {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        transition: all 0.2s;
      }

      .bar-settings:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
      }

      /* Bar 模式數值顯示 */
      .bar-value {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 45px;
        padding: 0 8px;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      /* Bar 模式 Mode 文字 */
      .bar-mode-text {
        font-size: 0.75rem;
        font-weight: 500;
        white-space: nowrap;
      }

      /* Mini Layout Styles */
      .mini-layout {
        padding: 14px !important;
      }

      .header-mini {
        margin-bottom: 10px !important;
      }

      .device-name-mini {
        font-size: 1rem !important;
      }

      .current-temp-mini {
        font-size: 2.5rem !important;
      }

      .temp-control-mini {
        margin: 14px 0 !important;
      }

      .adj-btn-mini {
        width: 48px !important;
        height: 48px !important;
        border-radius: 16px !important;
      }

      .value-mini {
        font-size: 1.6rem !important;
      }

      .quick-modes-mini {
        gap: 6px !important;
      }

      .mode-item-mini {
        padding: 8px !important;
        border-radius: 14px !important;
      }

      .mode-item-mini ha-icon {
        font-size: 1.2rem;
      }

      .main-control-mini {
        margin: 14px 0 !important;
      }

      .power-btn-mini {
        width: 80px !important;
        height: 80px !important;
        font-size: 2rem !important;
      }

      .slider-control-mini {
        margin: 10px 0 !important;
      }

      .cover-controls-mini,
      .vacuum-controls-mini {
        gap: 6px !important;
        margin: 10px 0 !important;
      }

      .cover-btn-mini,
      .vacuum-btn-mini {
        padding: 10px !important;
        font-size: 0.75rem !important;
      }

      .cover-btn-mini ha-icon,
      .vacuum-btn-mini ha-icon {
        font-size: 1.2rem !important;
      }

      .position-display-mini,
      .humidity-control-mini,
      .generic-state-mini {
        margin-top: 10px !important;
      }

      .media-info-mini {
        margin: 14px 0 !important;
      }

      .media-title-mini {
        font-size: 1rem !important;
      }

      .media-controls-mini {
        gap: 8px !important;
        margin: 10px 0 !important;
      }

      .media-btn-mini {
        width: 44px !important;
        height: 44px !important;
        font-size: 1.2rem !important;
      }

      .media-btn-mini.primary {
        width: 56px !important;
        height: 56px !important;
        font-size: 1.6rem !important;
      }

      .vacuum-status-mini {
        margin: 10px 0 !important;
      }

      .status-badge-mini,
      .battery-display-mini {
        font-size: 0.85rem !important;
      }

      .state-value-mini {
        font-size: 1.5rem !important;
      }

      /* iPhone 小螢幕優化 */
      @media screen and (max-width: 430px) {
        .main-container {
          padding: 16px;
          border-radius: 22px;
        }

        .unified-header {
          padding: 14px;
          border-radius: 14px;
          margin-bottom: 12px;
        }

        .bar-layout {
          padding: 8px 12px !important;
        }
      }

      /* Text Popup */
      .text-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        min-height: 100vh;
        min-height: 100dvh;
        padding:
          env(safe-area-inset-top, 0px)
          env(safe-area-inset-right, 0px)
          env(safe-area-inset-bottom, 0px)
          env(safe-area-inset-left, 0px);
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
        animation: fadeIn 0.2s;
      }

      .text-popup-content {
        background: var(--card-background-color);
        border-radius: 24px;
        padding: 20px;
        max-width: 90%;
        max-height: 80vh;
        max-height: 80dvh;
        padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .text-popup-header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 12px;
      }

      .text-popup-body {
        font-size: 1rem;
        line-height: 1.6;
        word-wrap: break-word;
      }

      .truncated-text {
        cursor: pointer;
        text-decoration: underline dotted;
        text-decoration-color: rgba(var(--rgb-primary-text-color), 0.3);
      }

      .truncated-text:hover {
        text-decoration-color: var(--accent-color);
      }

`,ne=K`
      /* Popup Styles */
      .popup-overlay {
        position: fixed !important; 
        inset: 0 !important;
        top: 0 !important; 
        left: 0 !important; 
        right: 0 !important; 
        bottom: 0 !important;
        min-height: 100vh;
        min-height: 100dvh;
        padding:
          env(safe-area-inset-top, 0px)
          env(safe-area-inset-right, 0px)
          env(safe-area-inset-bottom, 0px)
          env(safe-area-inset-left, 0px);
        background: rgba(0,0,0,0.7); 
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: flex; 
        align-items: flex-end;
        justify-content: center; 
        z-index: 9999 !important;
        animation: fadeIn 0.3s;
        /* 重要：確保 popup 不受父元素的 transform/filter 影響 */
        transform: none !important;
        will-change: auto;
        overscroll-behavior: contain;
      }
      
      .popup-content {
        width: 100%; 
        max-height: 85vh; 
        max-height: 85dvh;
        background: var(--card-background-color);
        border-radius: 36px 36px 0 0; 
        padding: 20px;
        padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
        overflow-y: auto; 
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);
      }

      @supports (-webkit-touch-callout: none) {
        .popup-overlay {
          min-height: -webkit-fill-available;
        }

        .popup-content {
          max-height: calc(100dvh - env(safe-area-inset-top, 0px) - 8px);
          border-radius: 30px 30px 0 0;
        }
      }

      /* 寬屏幕支持 - 在桌面設備上顯示為居中對話框 */
      @media (min-width: 768px) {
        .popup-overlay {
          align-items: center;
          padding: 20px;
        }

        .popup-content {
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          max-height: 80dvh;
          border-radius: 24px;
          padding-bottom: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
      
      .popup-header {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-bottom: 24px;
      }
      
      .popup-drag-handle { 
        width: 50px; 
        height: 5px; 
        background: rgba(var(--rgb-primary-text-color), 0.2); 
        border-radius: 3px; 
      }
      
      .close-btn {
        position: absolute;
        right: 0;
        cursor: pointer;
        color: var(--secondary-text-color);
        padding: 4px;
        transition: color 0.3s;
      }

      .close-btn:hover {
        color: var(--primary-text-color);
      }

      /* Sensor Chips */
      .chips-container { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 10px; 
        margin-bottom: 24px; 
      }
      
      .chip { 
        display: flex; 
        align-items: center; 
        gap: 8px; 
        padding: 8px 16px; 
        background: rgba(var(--rgb-primary-text-color), 0.06); 
        border-radius: 100px; 
        font-size: 0.9rem; 
        font-weight: 600;
      }

      /* Control Cards */
      .controls-list { 
        display: flex; 
        flex-direction: column; 
        gap: 14px; 
      }
      
      .control-card {
        background: rgba(var(--rgb-primary-text-color), 0.04);
        padding: 18px; 
        border-radius: 24px;
        display: flex; 
        justify-content: space-between; 
        align-items: center;
      }
      
      .control-header { 
        display: flex; 
        align-items: center; 
        gap: 14px; 
        font-weight: 700; 
      }
      
      .no-controls {
        text-align: center;
        padding: 32px;
        opacity: 0.5;
      }

      /* Unavailable State Styles */
      .chip-unavailable {
        opacity: 0.5;
        background: rgba(var(--rgb-primary-text-color), 0.03) !important;
      }

      .control-card-unavailable {
        opacity: 0.6;
        pointer-events: none;
      }

      .control-card-unavailable .control-action {
        filter: grayscale(0.8);
      }

      .unavailable-badge {
        font-size: 0.7rem;
        padding: 2px 8px;
        border-radius: 10px;
        background: rgba(255, 87, 34, 0.15);
        color: #ff5722;
        margin-left: 8px;
        font-weight: 600;
      }

      .unavailable-text {
        opacity: 0.4;
      }

      /* Control Actions */
      .select-grid { 
        display: grid; 
        grid-template-columns: repeat(2, 1fr); 
        gap: 8px; 
        width: 55%; 
      }
      
      .select-opt { 
        padding: 10px 4px; 
        text-align: center; 
        background: rgba(var(--rgb-primary-text-color), 0.06); 
        border-radius: 12px; 
        font-size: 0.75rem; 
        cursor: pointer; 
        font-weight: 500; 
        transition: all 0.2s;
      }
      
      .select-opt:hover {
        background: rgba(var(--rgb-primary-text-color), 0.12);
      }
      
      .select-opt.active { 
        background: var(--accent-color); 
        color: white; 
      }

      .select-opt.disabled {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .number-control {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .number-control button {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        cursor: pointer;
        transition: all 0.2s;
      }

      .number-control button:hover {
        background: var(--accent-color);
        color: white;
      }

      .number-control button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .action-btn {
        padding: 8px 16px;
        border-radius: 12px;
        border: none;
        background: var(--accent-color);
        color: white;
        cursor: pointer;
        transition: all 0.2s;
      }

      .action-btn:hover {
        transform: scale(1.05);
      }

      .action-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .state-text {
        font-weight: 600;
        opacity: 0.8;
      }

      button:disabled,
      ha-switch[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      /* Enhanced Animations */
      @keyframes fadeIn { 
        from { opacity: 0; } 
        to { opacity: 1; }
      }
      
      @keyframes slideUp { 
        from { transform: translateY(100%); } 
        to { transform: translateY(0); }
      }

      @keyframes slideDown {
        from { 
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes scaleIn {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      /* Apply animations */
      .main-container {
        animation: scaleIn 0.4s cubic-bezier(0.2, 1, 0.3, 1);
      }

      .header {
        animation: slideDown 0.5s ease-out;
      }

      .temp-control,
      .main-control {
        animation: slideDown 0.6s ease-out;
      }

      .quick-modes,
      .cover-controls,
      .vacuum-controls,
      .media-controls {
        animation: slideDown 0.7s ease-out;
      }

      .mode-item {
        animation: scaleIn 0.4s ease-out backwards;
      }

      .mode-item:nth-child(1) { animation-delay: 0.05s; }
      .mode-item:nth-child(2) { animation-delay: 0.1s; }
      .mode-item:nth-child(3) { animation-delay: 0.15s; }
      .mode-item:nth-child(4) { animation-delay: 0.2s; }
      .mode-item:nth-child(5) { animation-delay: 0.25s; }
      .mode-item:nth-child(6) { animation-delay: 0.3s; }

      .chip {
        animation: scaleIn 0.3s ease-out backwards;
      }

      .chip:nth-child(1) { animation-delay: 0.05s; }
      .chip:nth-child(2) { animation-delay: 0.1s; }
      .chip:nth-child(3) { animation-delay: 0.15s; }
      .chip:nth-child(4) { animation-delay: 0.2s; }
      .chip:nth-child(5) { animation-delay: 0.25s; }
      .chip:nth-child(6) { animation-delay: 0.3s; }

      .control-card {
        animation: slideDown 0.3s ease-out backwards;
      }

      .control-card:nth-child(1) { animation-delay: 0.05s; }
      .control-card:nth-child(2) { animation-delay: 0.1s; }
      .control-card:nth-child(3) { animation-delay: 0.15s; }
      .control-card:nth-child(4) { animation-delay: 0.2s; }
      .control-card:nth-child(5) { animation-delay: 0.25s; }

      .power-btn.on {
        animation: pulse 2s infinite;
      }

      .adj-btn:active,
      .power-btn:active,
      .media-btn:active,
      .cover-btn:active,
      .vacuum-btn:active {
        animation: bounce 0.3s;
      }

      /* Hover effects with animations */
      .mode-item:hover:not(.active) {
        animation: pulse 0.6s;
      }

      .header-action:active {
        animation: bounce 0.3s;
      }
`;function se(e){return{switch:"mdi:toggle-switch",light:"mdi:lightbulb",fan:"mdi:fan",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",select:"mdi:format-list-bulleted",number:"mdi:counter",button:"mdi:gesture-tap",climate:"mdi:thermostat",cover:"mdi:window-shutter",lock:"mdi:lock",humidifier:"mdi:air-humidifier",media_player:"mdi:play-circle",vacuum:"mdi:robot-vacuum",water_heater:"mdi:water-thermometer"}[e]||"mdi:circle-outline"}function re(e){return{cool:"mdi:snowflake",heat:"mdi:fire",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:brightness-auto",off:"mdi:power"}[e]}function oe(e){return{auto:"自動",low:"低速",medium:"中速",high:"高速",middle:"中速",favorite:"最愛",silent:"靜音",turbo:"強力"}[e]||e}const ce={climate:{cool:"rgba(3, 169, 244, 0.2)",heat:"rgba(255, 152, 0, 0.2)",dry:"rgba(156, 39, 176, 0.15)",fan_only:"rgba(76, 175, 80, 0.15)",auto:"rgba(0, 150, 136, 0.15)",off:"rgba(158, 158, 158, 0.1)"},light:{on:"rgba(255, 193, 7, 0.2)",off:"rgba(158, 158, 158, 0.1)"},fan:{on:"rgba(76, 175, 80, 0.2)",off:"rgba(158, 158, 158, 0.1)"},cover:{open:"rgba(3, 169, 244, 0.15)",opening:"rgba(3, 169, 244, 0.15)",closed:"rgba(158, 158, 158, 0.1)",closing:"rgba(158, 158, 158, 0.1)"},humidifier:{on:"rgba(33, 150, 243, 0.2)",off:"rgba(158, 158, 158, 0.1)"},media_player:{playing:"rgba(156, 39, 176, 0.2)",paused:"rgba(255, 152, 0, 0.15)",off:"rgba(158, 158, 158, 0.1)"},vacuum:{cleaning:"rgba(76, 175, 80, 0.2)",docked:"rgba(158, 158, 158, 0.1)",returning:"rgba(255, 152, 0, 0.15)"},water_heater:{electric:"rgba(255, 152, 0, 0.2)",gas:"rgba(255, 87, 34, 0.2)",off:"rgba(158, 158, 158, 0.1)"}};function le(e,t){return ce[e]?.[t]||"var(--ha-card-background)"}const de={climate:function(e,t,i="standard",a=!0){const{current_temperature:n,temperature:s,fan_mode:r,fan_modes:o}=t.attributes,c=t.state,l="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${n}°C → ${s}°C</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn" @click="${()=>e._adjustTemp(-.5)}">
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button class="bar-btn" @click="${()=>e._adjustTemp(.5)}">
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
            ${a?N`
              <button class="bar-settings" @click="${()=>e._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        
        <!-- HVAC Mode 快速切換 (Bar) -->
        <div class="bar-modes">
          ${["cool","heat","dry","fan_only","auto","off"].map(t=>N`
            <div class="bar-mode-chip ${c===t?"active":""}" 
                 @click="${()=>e._setClimateMode(t)}"
                 title="${e._t(t)}">
              <ha-icon icon="${re(t)}"></ha-icon>
            </div>
          `)}
        </div>
        
        <!-- Fan Mode 快速切換 (Bar) -->
        ${o&&o.length>0?N`
          <div class="bar-fan-modes ${e._fanModeExpanded?"expanded":"collapsed"}">
            <div class="bar-fan-label" @click="${()=>e._fanModeExpanded=!e._fanModeExpanded}">
              <ha-icon icon="mdi:fan"></ha-icon>
              <span>風速</span>
              <ha-icon class="expand-icon ${e._fanModeExpanded?"expanded":""}" 
                       icon="${e._fanModeExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
            </div>
            <div class="bar-fan-options ${e._fanModeExpanded?"expanded":"collapsed"}">
              ${o.map(t=>N`
                <div class="bar-fan-chip ${r===t?"active":""}"
                     @click="${()=>e._setFanMode(t)}">
                  ${oe(t)}
                </div>
              `)}
            </div>
          </div>
        `:""}
        
        ${e._renderMainButtons(i)}
      `:N`
      <div class="header ${l?"header-mini":""}">
        ${e._renderHeaderIcon(t,l)}
        <div class="device-name ${l?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${n}°C → ${s}°C</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="temp-control ${l?"temp-control-mini":""}">
        <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>e._adjustTemp(-.5)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${e._t("target_temp")}</span>
          <span class="value ${l?"value-mini":""}">${s}°C</span>
        </div>
        <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>e._adjustTemp(.5)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>

      <div class="quick-modes ${l?"quick-modes-mini":""}">
        ${["cool","heat","dry","fan_only","auto","off"].map(t=>N`
          <div class="mode-item ${c===t?"active":""} ${l?"mode-item-mini":""}" 
               @click="${()=>e._setClimateMode(t)}">
            <ha-icon icon="${re(t)}"></ha-icon>
            ${l?"":N`<span class="mode-label">${e._t(t)}</span>`}
          </div>
        `)}
      </div>
      
      <!-- Fan Mode 控制 (Standard/Mini) -->
      ${o&&o.length>0?N`
        <div class="fan-mode-section ${l?"fan-mode-mini":""}">
          <div class="fan-mode-label" @click="${()=>e._fanModeExpanded=!e._fanModeExpanded}">
            <ha-icon icon="mdi:fan"></ha-icon>
            ${l?"":N`<span>風速</span>`}
            <ha-icon class="expand-icon ${e._fanModeExpanded?"expanded":""}" 
                     icon="${e._fanModeExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
          </div>
          <div class="fan-mode-options ${l?"fan-mode-options-mini":""} ${e._fanModeExpanded?"expanded":"collapsed"}">
            ${o.map(t=>N`
              <div class="fan-mode-chip ${r===t?"active":""} ${l?"fan-mode-chip-mini":""}"
                   @click="${()=>e._setFanMode(t)}">
                ${oe(t)}
              </div>
            `)}
          </div>
        </div>
      `:""}
      
      ${e._renderMainButtons(i)}
    `},light:function(e,t,i="standard",a=!0){const n="on"===t.state,s=t.attributes.brightness||0,r=Math.round(s/255*100),o="bar"===i,c="mini"===i,l=void 0!==t.attributes.brightness;return o?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              ${n&&l?N`
                <div class="bar-slider-container" @click="${t=>{t.stopPropagation(),e._handleSliderClick(t,"light")}}">
                  <div class="bar-slider-bg bar-slider-light" style="--slider-value: ${r}%"></div>
                  <div class="bar-slider-text">${r}%</div>
                </div>
              `:N`
                <div class="bar-state">${n?e._t("on"):e._t("off")}</div>
              `}
            </div>
          </div>
          <div class="bar-right">
            ${n&&l?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>e._adjustBrightness(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>e._adjustBrightness(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            <div class="bar-controls">
              <button class="bar-toggle ${n?"bar-toggle-on":""}" @click="${()=>e._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${e._renderHeaderAction(a)}
          </div>
        </div>
        ${e._renderMainButtons(i)}
      `:N`
      <div class="header ${c?"header-mini":""}">
        ${e._renderHeaderIcon(t,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${n&&l?`${r}%`:n?e._t("on"):e._t("off")}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${n?"on":""} ${c?"power-btn-mini":""}" 
                @click="${()=>e._toggleEntity()}">
          <ha-icon icon="mdi:lightbulb${n?"":"-outline"}"></ha-icon>
          ${c?"":N`<span class="mode-label">${n?e._t("on"):e._t("off")}</span>`}
        </button>
      </div>

      ${n&&l?N`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustBrightness(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display" style="cursor: pointer;" @click="${t=>e._handleSliderClick(t,"light")}">
            <span class="label">${e._t("brightness")}</span>
            <span class="value ${c?"value-mini":""}">${r}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustBrightness(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      
      ${e._renderMainButtons(i)}
    `},fan:function(e,t,i="standard",a=!0){const n="on"===t.state,s=t.attributes.percentage||0,r=t.attributes.preset_modes||[],o=t.attributes.preset_mode,c="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${n?`${s}%`:e._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            ${n&&void 0!==s?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>e._adjustFanSpeed(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>e._adjustFanSpeed(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            <div class="bar-controls">
              <button class="bar-toggle ${n?"bar-toggle-on":""}" @click="${()=>e._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${a?N`
              <button class="bar-settings" @click="${()=>e._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        
        <!-- Fan Preset Modes (Bar) -->
        ${r.length>0?N`
          <div class="bar-modes">
            ${r.map(t=>{return N`
              <div class="bar-mode-chip ${o===t?"active":""}" 
                   @click="${()=>e._setFanPresetMode(t)}"
                   title="${t}">
                <span class="bar-mode-text">${i=t,{auto:"自動",smart:"智慧",sleep:"睡眠",nature:"自然",normal:"正常",low:"低速",medium:"中速",high:"高速",turbo:"強力",quiet:"靜音",breeze:"微風",favorite:"最愛"}[i]||i}</span>
              </div>
            `;var i})}
          </div>
        `:""}
        
        ${e._renderMainButtons(i)}
      `:N`
      <div class="header ${c?"header-mini":""}">
        ${e._renderHeaderIcon(t,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${n?`${s}%`:e._t("off")}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${n?"on":""} ${c?"power-btn-mini":""}" @click="${()=>e._toggleEntity()}">
          <ha-icon icon="mdi:fan"></ha-icon>
          ${c?"":N`<span class="mode-label">${n?e._t("on"):e._t("off")}</span>`}
        </button>
      </div>

      ${n?N`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustFanSpeed(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">風速</span>
            <span class="value ${c?"value-mini":""}">${s}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustFanSpeed(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${e._renderMainButtons(i)}
    `},cover:function(e,t,i="standard",a=!0){const n=t.attributes.current_position||0,s=t.attributes.current_tilt_position??0,r=t.state,o=t.attributes.supported_features??0,c=!!(48&o),l=!!(128&o)&&void 0!==t.attributes.current_tilt_position,d="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${n}%${l?` / ${s}%`:""}</div>
            </div>
          </div>
          <div class="bar-right">
            ${void 0!==t.attributes.current_position?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>e._adjustCoverPosition(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>e._adjustCoverPosition(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            ${l?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>e._adjustCoverTiltPosition(-10)}">
                  <ha-icon icon="mdi:blinds"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>e._adjustCoverTiltPosition(10)}">
                  <ha-icon icon="mdi:blinds-open"></ha-icon>
                </button>
              </div>
            `:""}
            ${a?N`
              <button class="bar-settings" @click="${()=>e._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>

        <div class="bar-modes">
          <div class="bar-mode-chip ${"open"===r||"opening"===r?"active":""}"
               @click="${()=>e._callService("cover","open_cover")}"
               title="${e._t("open")}">
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </div>
          <div class="bar-mode-chip ${"opening"===r||"closing"===r?"active":""}"
               @click="${()=>e._callService("cover","stop_cover")}"
               title="${e._t("stop")}">
            <ha-icon icon="mdi:stop"></ha-icon>
          </div>
          <div class="bar-mode-chip ${"closed"===r||"closing"===r?"active":""}"
               @click="${()=>e._callService("cover","close_cover")}"
               title="${e._t("close")}">
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </div>
        </div>

        ${c?N`
          <div class="bar-modes">
            <div class="bar-mode-chip"
                 @click="${()=>e._callService("cover","open_cover_tilt")}"
                 title="${e._t("open_tilt")}">
              <ha-icon icon="mdi:blinds-open"></ha-icon>
            </div>
            <div class="bar-mode-chip"
                 @click="${()=>e._callService("cover","close_cover_tilt")}"
                 title="${e._t("close_tilt")}">
              <ha-icon icon="mdi:blinds"></ha-icon>
            </div>
          </div>
        `:""}

        ${e._renderMainButtons(i)}
      `:N`
      <div class="header ${d?"header-mini":""}">
        ${e._renderHeaderIcon(t,d)}
        <div class="device-name ${d?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          ${void 0!==t.attributes.current_position?N`<span class="device-value">${n}%${l?` / ${s}%`:""}</span>`:""}
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="cover-controls ${d?"cover-controls-mini":""}">
        <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>e._callService("cover","open_cover")}">
          <ha-icon icon="mdi:arrow-up"></ha-icon>
          <span>${e._t("open")}</span>
        </button>
        <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>e._callService("cover","stop_cover")}">
          <ha-icon icon="mdi:stop"></ha-icon>
          <span>${e._t("stop")}</span>
        </button>
        <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>e._callService("cover","close_cover")}">
          <ha-icon icon="mdi:arrow-down"></ha-icon>
          <span>${e._t("close")}</span>
        </button>
        ${c?N`
          <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>e._callService("cover","open_cover_tilt")}">
            <ha-icon icon="mdi:blinds-open"></ha-icon>
            <span>${e._t("open_tilt")}</span>
          </button>
          <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>e._callService("cover","close_cover_tilt")}">
            <ha-icon icon="mdi:blinds"></ha-icon>
            <span>${e._t("close_tilt")}</span>
          </button>
        `:""}
      </div>

      ${void 0!==t.attributes.current_position?N`
        <div class="temp-control ${d?"temp-control-mini":""}">
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>e._adjustCoverPosition(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">${e._t("position")}</span>
            <span class="value ${d?"value-mini":""}">${n}%</span>
          </div>
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>e._adjustCoverPosition(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${l?N`
        <div class="temp-control ${d?"temp-control-mini":""}">
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>e._adjustCoverTiltPosition(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">${e._t("tilt")}</span>
            <span class="value ${d?"value-mini":""}">${s}%</span>
          </div>
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>e._adjustCoverTiltPosition(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${e._renderMainButtons(i)}
    `},humidifier:function(e,t,i="standard",a=!0){const n="on"===t.state,s=t.attributes.humidity||0,r="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${n?`${s}%`:e._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-toggle ${n?"bar-toggle-on":""}" @click="${()=>e._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${a?N`
              <button class="bar-settings" @click="${()=>e._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${e._renderMainButtons(i)}
      `:N`
      <div class="header ${r?"header-mini":""}">
        ${e._renderHeaderIcon(t,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${n?`${s}%`:e._t("off")}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="main-control ${r?"main-control-mini":""}">
        <button class="power-btn ${n?"on":""} ${r?"power-btn-mini":""}" @click="${()=>e._toggleEntity()}">
          <ha-icon icon="mdi:air-humidifier"></ha-icon>
          ${r?"":N`<span class="mode-label">${n?e._t("on"):e._t("off")}</span>`}
        </button>
      </div>

      ${n?N`
        <div class="temp-control ${r?"temp-control-mini":""}">
          <div style="width: 64px;"></div>
          <div class="target-display">
            <span class="label">${e._t("target_humidity")}</span>
            <span class="value ${r?"value-mini":""}">${s}%</span>
          </div>
          <div style="width: 64px;"></div>
        </div>
      `:""}
      ${e._renderMainButtons(i)}
    `},media_player:function(e,t,i="standard",a=!0){const n=t.state,s=t.attributes.media_title||"No Media",r=t.attributes.media_artist||"",o="bar"===i,c="mini"===i,l={artist:[],album:[],playlist:[],track:[]};if(Array.isArray(e._massLibraryItems)&&e._massLibraryItems.forEach(e=>{const t=e.media_type;l[t]&&l[t].push(e)}),o){const r=void 0!==t.attributes.volume_level?Math.round(100*t.attributes.volume_level):0,o=e._showMassPlaylistOrLibrary(t);return N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"playing"===n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i,15)}</div>
              <div class="bar-state">${e._renderTitle(s,i,25)}</div>
            </div>
          </div>
          <div class="bar-right">
            ${void 0!==t.attributes.volume_level?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>e._adjustVolume(-5)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="bar-value">${r}%</span>
                <button class="bar-btn" @click="${()=>e._adjustVolume(5)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            ${a?N`
              <button class="bar-settings" @click="${()=>e._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>

        <div class="bar-modes">
          <div class="bar-mode-chip" @click="${()=>e._callService("media_player","media_previous_track")}">
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </div>
          <div class="bar-mode-chip ${"playing"===n?"active":""}"
               @click="${()=>e._callService("media_player","playing"===n?"media_pause":"media_play")}">
            <ha-icon icon="mdi:${"playing"===n?"pause":"play"}"></ha-icon>
          </div>
          <div class="bar-mode-chip" @click="${()=>e._callService("media_player","media_next_track")}">
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </div>
          ${o&&e._hasMassQueue()?N`
            <div class="bar-mode-chip ${e._massQueueExpanded?"active":""}"
                 @click="${()=>e._toggleMassQueueExpand()}"
                 title="${e._t("mass_queue_playlist")}">
              <ha-icon icon="mdi:playlist-music"></ha-icon>
            </div>
          `:""}
          ${o&&e._hasMusicAssistantLibrary()?N`
            <div class="bar-mode-chip ${e._massLibraryExpanded?"active":""}"
                 @click="${()=>e._toggleMassLibraryExpand()}"
                 title="${e._t("mass_library")}">
              <ha-icon icon="mdi:music-box-multiple"></ha-icon>
            </div>
          `:""}
          ${o&&e._hasMusicAssistantSearch()?N`
            <div class="bar-mode-chip ${e._massSearchExpanded?"active":""}"
                 @click="${()=>e._toggleMassSearchExpand()}"
                 title="${e._t("mass_search")}">
              <ha-icon icon="mdi:magnify"></ha-icon>
            </div>
          `:""}
        </div>

        ${e._isMusicAssistant(t)&&e._hasMassQueue()&&e._massQueueExpanded?N`
          <div class="mass-queue-foldable">
            <div class="mass-queue-list">
              ${e._massQueueLoading&&0===e._massQueueItems.length?N`<div class="mass-queue-empty">${e._t("mass_queue_loading")}</div>`:0===e._massQueueItems.length?N`<div class="mass-queue-empty">—</div>`:e._massQueueItems.map(t=>N`
                    <button class="mass-queue-item" @click="${()=>e._playMassQueueItem(t)}">
                      <div class="mass-queue-item-image">
                        ${t.local_image_encoded?N`<img src="data:image/jpeg;base64,${t.local_image_encoded}" alt="" />`:t.media_image?N`<img src="${t.media_image}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                      </div>
                      <div class="mass-queue-item-info">
                        <span class="mass-queue-item-title">${t.media_title||t.name||"—"}</span>
                        ${t.media_artist?N`<span class="mass-queue-item-artist">${t.media_artist}</span>`:""}
                        ${t.media_album_name?N`<span class="mass-queue-item-album">${t.media_album_name}</span>`:""}
                      </div>
                      <ha-icon class="mass-queue-item-play" icon="mdi:play-circle-outline"></ha-icon>
                    </button>
                  `)}
            </div>
          </div>
        `:""}

        ${e._isMusicAssistant(t)&&e._hasMusicAssistantLibrary()&&e._massLibraryExpanded?N`
          <div class="mass-queue-foldable">
            <div class="mass-library-section">
              ${e._massLibraryLoading&&0===e._massLibraryItems.length?N`<div class="mass-queue-empty">${e._t("mass_library_loading")}</div>`:0===e._massLibraryItems.length?N`<div class="mass-queue-empty">—</div>`:["artist","album","playlist","track"].map(t=>{const i=l[t]||[];return i.length?N`
                        <div class="mass-library-row">
                          <div class="mass-library-row-title">${t.toUpperCase()}</div>
                          <div class="mass-library-row-scroll">
                            ${i.map(t=>{const i=t.image||t.album?.image,a=t.artists?.map(e=>e.name).filter(Boolean).join(", ")||"",n=t.album?.name||"";return N`
                                <button class="mass-library-chip" @click="${()=>e._playMassLibraryItem(t)}">
                                  <div class="mass-library-chip-image">
                                    ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                  </div>
                                  <div class="mass-library-chip-text">
                                    <span class="mass-library-chip-title">${t.name||"—"}</span>
                                    ${a||n?N`
                                      <span class="mass-library-chip-sub">
                                        ${a||n}
                                      </span>
                                    `:""}
                                  </div>
                                </button>
                              `})}
                          </div>
                        </div>
                      `:""})}
            </div>
          </div>
        `:""}

        ${e._isMusicAssistant(t)&&e._hasMusicAssistantSearch()&&e._massSearchExpanded?N`
          <div class="mass-queue-foldable">
            <div class="mass-search-input-row">
              <input type="text" class="mass-search-input" .value="${e._massSearchQuery||""}"
                     @input="${t=>e._onMassSearchInput(t)}" @keydown="${t=>"Enter"===t.key&&e._runMassSearch()}"
                     placeholder="${e._t("mass_search_placeholder")}" />
              <button class="mass-search-btn" @click="${()=>e._runMassSearch()}" ?disabled="${e._massSearchLoading}">
                ${e._massSearchLoading?e._t("mass_search_loading"):e._t("mass_search_button")}
              </button>
            </div>
            <div class="mass-library-section">
              ${!e._massSearchLoading||e._massSearchResults?.artists?.length||e._massSearchResults?.albums?.length||e._massSearchResults?.tracks?.length?["artists","albums","tracks"].map(t=>{const i="artists"===t?"artist":"albums"===t?"album":"track",a=e._massSearchResults?.[t]??[];return a.length?N`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${i.toUpperCase()}</div>
                        <div class="mass-library-row-scroll">
                          ${a.map(t=>{const i=t.image||t.album?.image,a=t.artists?.map(e=>e.name).filter(Boolean).join(", ")||"",n=t.album?.name||"";return N`
                              <button class="mass-library-chip" @click="${()=>e._playMassLibraryItem(t)}">
                                <div class="mass-library-chip-image">
                                  ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${t.name||"—"}</span>
                                  ${a||n?N`
                                    <span class="mass-library-chip-sub">${a||n}</span>
                                  `:""}
                                </div>
                              </button>
                            `})}
                        </div>
                      </div>
                    `:""}):N`<div class="mass-queue-empty">${e._t("mass_search_loading")}</div>`}
            </div>
          </div>
        `:""}

        ${e._renderMainButtons(i)}
      `}const d=void 0!==t.attributes.volume_level?Math.round(100*t.attributes.volume_level):0,p=e._showMassPlaylistOrLibrary(t);return N`
      <div class="header ${c?"header-mini":""}">
        ${e._renderHeaderIcon(t,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          ${N`<span class="device-value">${e._renderTitle(s,i,28)}</span>`}
        </div>
        ${p&&e._hasMassQueue()?N`
          <button class="header-action" @click="${()=>e._toggleMassQueueExpand()}">
            <ha-icon icon="mdi:playlist-music"></ha-icon>
          </button>
        `:""}
        ${p&&e._hasMusicAssistantLibrary()?N`
          <button class="header-action" @click="${()=>e._toggleMassLibraryExpand()}">
            <ha-icon icon="mdi:music-box-multiple"></ha-icon>
          </button>
        `:""}
        ${p&&e._hasMusicAssistantSearch()?N`
          <button class="header-action" @click="${()=>e._toggleMassSearchExpand()}">
            <ha-icon icon="mdi:magnify"></ha-icon>
          </button>
        `:""}
        ${e._renderHeaderAction(a)}
      </div>

      <div class="media-info ${c?"media-info-mini":""}">
        <div class="media-title ${c?"media-title-mini":""}">${e._renderTitle(s,i,30)}</div>
        ${r&&!c?N`<div class="media-artist">${e._renderTitle(r,i,30)}</div>`:""}
      </div>

      <div class="media-controls ${c?"media-controls-mini":""}">
        <button class="media-btn ${c?"media-btn-mini":""}" @click="${()=>e._callService("media_player","media_previous_track")}">
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        <button class="media-btn primary ${c?"media-btn-mini":""}" @click="${()=>e._callService("media_player","playing"===n?"media_pause":"media_play")}">
          <ha-icon icon="mdi:${"playing"===n?"pause":"play"}"></ha-icon>
        </button>
        <button class="media-btn ${c?"media-btn-mini":""}" @click="${()=>e._callService("media_player","media_next_track")}">
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>

      ${void 0!==t.attributes.volume_level?N`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustVolume(-5)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">音量</span>
            <span class="value ${c?"value-mini":""}">${d}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustVolume(5)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}

      ${e._isMusicAssistant(t)&&e._hasMassQueue()&&e._massQueueExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-queue-list">
            ${e._massQueueLoading&&0===e._massQueueItems.length?N`<div class="mass-queue-empty">${e._t("mass_queue_loading")}</div>`:0===e._massQueueItems.length?N`<div class="mass-queue-empty">—</div>`:e._massQueueItems.map(t=>N`
                  <button class="mass-queue-item" @click="${()=>e._playMassQueueItem(t)}">
                    <div class="mass-queue-item-image">
                      ${t.local_image_encoded?N`<img src="data:image/jpeg;base64,${t.local_image_encoded}" alt="" />`:t.media_image?N`<img src="${t.media_image}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                    </div>
                    <div class="mass-queue-item-info">
                      <span class="mass-queue-item-title">${t.media_title||t.name||"—"}</span>
                      ${t.media_artist?N`<span class="mass-queue-item-artist">${t.media_artist}</span>`:""}
                      ${t.media_album_name?N`<span class="mass-queue-item-album">${t.media_album_name}</span>`:""}
                    </div>
                    <ha-icon class="mass-queue-item-play" icon="mdi:play-circle-outline"></ha-icon>
                  </button>
                `)}
          </div>
        </div>
      `:""}

      ${e._isMusicAssistant(t)&&e._hasMusicAssistantLibrary()&&e._massLibraryExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-library-section">
            ${e._massLibraryLoading&&0===e._massLibraryItems.length?N`<div class="mass-queue-empty">${e._t("mass_library_loading")}</div>`:0===e._massLibraryItems.length?N`<div class="mass-queue-empty">—</div>`:["artist","album","playlist","track"].map(t=>{const i=l[t]||[];return i.length?N`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${t.toUpperCase()}</div>
                        <div class="mass-library-row-scroll">
                          ${i.map(t=>{const i=t.image||t.album?.image,a=t.artists?.map(e=>e.name).filter(Boolean).join(", ")||"",n=t.album?.name||"";return N`
                              <button class="mass-library-chip" @click="${()=>e._playMassLibraryItem(t)}">
                                <div class="mass-library-chip-image">
                                  ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${t.name||"—"}</span>
                                  ${a||n?N`
                                    <span class="mass-library-chip-sub">
                                      ${a||n}
                                    </span>
                                  `:""}
                                </div>
                              </button>
                            `})}
                        </div>
                      </div>
                    `:""})}
          </div>
        </div>
      `:""}

      ${e._isMusicAssistant(t)&&e._hasMusicAssistantSearch()&&e._massSearchExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-search-input-row">
            <input type="text" class="mass-search-input" .value="${e._massSearchQuery||""}"
                   @input="${t=>e._onMassSearchInput(t)}" @keydown="${t=>"Enter"===t.key&&e._runMassSearch()}"
                   placeholder="${e._t("mass_search_placeholder")}" />
            <button class="mass-search-btn" @click="${()=>e._runMassSearch()}" ?disabled="${e._massSearchLoading}">
              ${e._massSearchLoading?e._t("mass_search_loading"):e._t("mass_search_button")}
            </button>
          </div>
          <div class="mass-library-section">
            ${!e._massSearchLoading||e._massSearchResults?.artists?.length||e._massSearchResults?.albums?.length||e._massSearchResults?.tracks?.length?["artists","albums","tracks"].map(t=>{const i="artists"===t?"artist":"albums"===t?"album":"track",a=e._massSearchResults?.[t]??[];return a.length?N`
                    <div class="mass-library-row">
                      <div class="mass-library-row-title">${i.toUpperCase()}</div>
                      <div class="mass-library-row-scroll">
                        ${a.map(t=>{const i=t.image||t.album?.image,a=t.artists?.map(e=>e.name).filter(Boolean).join(", ")||"",n=t.album?.name||"";return N`
                            <button class="mass-library-chip" @click="${()=>e._playMassLibraryItem(t)}">
                              <div class="mass-library-chip-image">
                                ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                              </div>
                              <div class="mass-library-chip-text">
                                <span class="mass-library-chip-title">${t.name||"—"}</span>
                                ${a||n?N`
                                  <span class="mass-library-chip-sub">${a||n}</span>
                                `:""}
                              </div>
                            </button>
                          `})}
                      </div>
                    </div>
                  `:""}):N`<div class="mass-queue-empty">${e._t("mass_search_loading")}</div>`}
          </div>
        </div>
      `:""}

      ${e._renderMainButtons(i)}
    `},vacuum:function(e,t,i="standard",a=!0){const n=t.state,s=t.attributes.battery_level||0,r="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"cleaning"===n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${e._getVacuumStateText(n)} · ${s}%</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn-small" @click="${()=>e._callService("vacuum","start")}">
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${()=>e._callService("vacuum","pause")}">
                <ha-icon icon="mdi:pause"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${()=>e._callService("vacuum","return_to_base")}">
                <ha-icon icon="mdi:home"></ha-icon>
              </button>
            </div>
            ${a?N`
              <button class="bar-settings" @click="${()=>e._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${e._renderMainButtons(i)}
      `:N`
      <div class="header ${r?"header-mini":""}">
        ${e._renderHeaderIcon(t,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${e._getVacuumStateText(n)} · ${s}%</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="vacuum-status ${r?"vacuum-status-mini":""}">
        <div class="status-badge ${r?"status-badge-mini":""}">${e._getVacuumStateText(n)}</div>
        <div class="battery-display ${r?"battery-display-mini":""}">
          <ha-icon icon="mdi:battery${s>90?"":s>50?"-50":"-20"}"></ha-icon>
          <span>${s}%</span>
        </div>
      </div>

      <div class="vacuum-controls ${r?"vacuum-controls-mini":""}">
        <button class="vacuum-btn ${r?"vacuum-btn-mini":""}" @click="${()=>e._callService("vacuum","start")}">
          <ha-icon icon="mdi:play"></ha-icon>
          <span>${e._t("start")}</span>
        </button>
        <button class="vacuum-btn ${r?"vacuum-btn-mini":""}" @click="${()=>e._callService("vacuum","pause")}">
          <ha-icon icon="mdi:pause"></ha-icon>
          <span>${e._t("pause")}</span>
        </button>
        <button class="vacuum-btn ${r?"vacuum-btn-mini":""}" @click="${()=>e._callService("vacuum","return_to_base")}">
          <ha-icon icon="mdi:home"></ha-icon>
          <span>${e._t("return_home")}</span>
        </button>
      </div>
      ${e._renderMainButtons(i)}
    `},water_heater:function(e,t,i="standard",a=!0){const n=t.attributes.temperature||0,s=t.attributes.current_temperature||0,r="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${s}°C → ${n}°C</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn" @click="${()=>e._adjustWaterTemp(-1)}">
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button class="bar-btn" @click="${()=>e._adjustWaterTemp(1)}">
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
            ${a?N`
              <button class="bar-settings" @click="${()=>e._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${e._renderMainButtons(i)}
      `:N`
      <div class="header ${r?"header-mini":""}">
        ${e._renderHeaderIcon(t,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${s}°C → ${n}°C</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="temp-control ${r?"temp-control-mini":""}">
        <button class="adj-btn ${r?"adj-btn-mini":""}" @click="${()=>e._adjustWaterTemp(-1)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${e._t("target_temp")}</span>
          <span class="value ${r?"value-mini":""}">${n}°C</span>
        </div>
        <button class="adj-btn ${r?"adj-btn-mini":""}" @click="${()=>e._adjustWaterTemp(1)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${e._renderMainButtons(i)}
    `},generic:function(e,t,i="standard",a=!0){const n="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${t.state}</div>
            </div>
          </div>
          <div class="bar-right">
            ${a?N`
              <button class="bar-settings" @click="${()=>e._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${e._renderMainButtons(i)}
      `:N`
      <div class="header ${n?"header-mini":""}">
        ${e._renderHeaderIcon(t,n)}
        <div class="device-name ${n?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${t.state}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="temp-control ${n?"temp-control-mini":""}">
        <div style="width: 64px;"></div>
        <div class="target-display">
          <span class="label">${e._t("device")}</span>
          <span class="value ${n?"value-mini":""}">${t.state}</span>
        </div>
        <div style="width: 64px;"></div>
      </div>
      ${e._renderMainButtons(i)}
    `}};customElements.define("universal-device-card",class extends ee{static get properties(){return{hass:{},config:{},_showPopup:{type:Boolean},_showTextPopup:{type:Boolean},_popupText:{type:String},_translations:{type:Object},_fanModeExpanded:{type:Boolean},_massQueueItems:{type:Array},_massQueueExpanded:{type:Boolean},_massQueueLoading:{type:Boolean},_massLibraryItems:{type:Array},_massLibraryExpanded:{type:Boolean},_massLibraryLoading:{type:Boolean},_massSearchExpanded:{type:Boolean},_massSearchQuery:{type:String},_massSearchLoading:{type:Boolean},_massSearchResults:{type:Object}}}constructor(){super(),this._showPopup=!1,this._showTextPopup=!1,this._popupText="",this._translations={},this._fanModeExpanded=!1,this._iconLongPressTimer=null,this._iconLongPressFired=!1,this._iconLastTapTime=0,this._massQueueItems=[],this._massQueueExpanded=!1,this._massQueueLoading=!1,this._massLibraryItems=[],this._massLibraryExpanded=!1,this._massLibraryLoading=!1,this._massSearchExpanded=!1,this._massSearchQuery="",this._massSearchLoading=!1,this._massSearchResults={artists:[],albums:[],tracks:[]}}async connectedCallback(){super.connectedCallback(),await this._loadTranslations(),this._createPopupPortal()}disconnectedCallback(){super.disconnectedCallback(),this._removePopupPortal()}_createPopupPortal(){if(!this._popupPortal){this._popupPortal=document.createElement("div"),this._popupPortal.className="udc-popup-portal";const e=this._isInBubbleCardPopup(),t=e?1e4:1e3;this._popupPortal.style.cssText=`position: fixed; inset: 0; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh; min-height: -webkit-fill-available; pointer-events: none; z-index: ${t};`;const i=document.createElement("style");i.textContent=function(e=!1){return`\n      .popup-overlay {\n        position: fixed !important; \n        inset: 0 !important;\n        top: 0 !important; \n        left: 0 !important; \n        right: 0 !important; \n        bottom: 0 !important;\n        min-height: 100vh;\n        min-height: 100dvh;\n        padding:\n          env(safe-area-inset-top, 0px)\n          env(safe-area-inset-right, 0px)\n          env(safe-area-inset-bottom, 0px)\n          env(safe-area-inset-left, 0px);\n        background: rgba(0,0,0,0.7); \n        backdrop-filter: blur(12px);\n        -webkit-backdrop-filter: blur(12px);\n        display: flex; \n        align-items: flex-end;\n        justify-content: center; \n        z-index: ${e?1e4:1e3} !important;\n        animation: fadeIn 0.3s;\n        transform: none !important;\n        will-change: auto;\n        overscroll-behavior: contain;\n      }\n      \n      .popup-content {\n        width: 100%; \n        max-height: 85vh; \n        max-height: 85dvh;\n        background: var(--card-background-color, #fff);\n        border-radius: 36px 36px 0 0; \n        padding: 20px;\n        padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));\n        overflow-y: auto; \n        -webkit-overflow-scrolling: touch;\n        overscroll-behavior: contain;\n        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);\n        color: var(--primary-text-color, #000);\n        scrollbar-width: thin;\n        scrollbar-color: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.3) transparent;\n      }\n\n      .popup-content::-webkit-scrollbar {\n        width: 6px;\n      }\n\n      .popup-content::-webkit-scrollbar-track {\n        background: transparent;\n        border-radius: 10px;\n      }\n\n      .popup-content::-webkit-scrollbar-thumb {\n        background: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.3);\n        border-radius: 10px;\n        transition: background 0.3s;\n      }\n\n      .popup-content::-webkit-scrollbar-thumb:hover {\n        background: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.5);\n      }\n\n      .popup-content.hide-scrollbar {\n        scrollbar-width: none;\n        -ms-overflow-style: none;\n      }\n\n      .popup-content.hide-scrollbar::-webkit-scrollbar {\n        display: none;\n      }\n\n      @supports (-webkit-touch-callout: none) {\n        .popup-overlay {\n          min-height: -webkit-fill-available;\n        }\n\n        .popup-content {\n          max-height: calc(100dvh - env(safe-area-inset-top, 0px) - 8px);\n          border-radius: 30px 30px 0 0;\n        }\n      }\n\n      @media (min-width: 768px) {\n        .popup-overlay {\n          align-items: center;\n          padding: 20px;\n        }\n\n        .popup-content {\n          max-width: 600px;\n          width: 90%;\n          max-height: 80vh;\n          max-height: 80dvh;\n          border-radius: 24px;\n          padding-bottom: 20px;\n          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n          animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);\n        }\n\n        .popup-content::-webkit-scrollbar {\n          width: 8px;\n        }\n\n        @keyframes scaleIn {\n          from {\n            opacity: 0;\n            transform: scale(0.9);\n          }\n          to {\n            opacity: 1;\n            transform: scale(1);\n          }\n        }\n      }\n      \n      .popup-header {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        margin-bottom: 24px;\n      }\n      \n      .popup-drag-handle { \n        width: 50px; \n        height: 5px; \n        background: rgba(128, 128, 128, 0.2); \n        border-radius: 3px; \n      }\n      \n      .close-btn {\n        position: absolute;\n        right: 0;\n        cursor: pointer;\n        color: var(--secondary-text-color, #666);\n        padding: 4px;\n        transition: color 0.3s;\n        font-size: 24px;\n        width: 32px;\n        height: 32px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .close-btn:hover {\n        color: var(--primary-text-color, #000);\n      }\n\n      .chips-container { \n        display: flex; \n        flex-wrap: wrap; \n        gap: 10px; \n        margin-bottom: 20px;\n      }\n      \n      .chip { \n        padding: 10px 16px; \n        border-radius: 20px; \n        background: rgba(128, 128, 128, 0.1); \n        display: flex; \n        align-items: center; \n        gap: 8px; \n        font-size: 0.9rem;\n      }\n\n      .chip-unavailable {\n        opacity: 0.5;\n      }\n\n      .chip ha-icon {\n        width: 20px;\n        height: 20px;\n      }\n\n      .controls-list {\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n      }\n\n      .control-card {\n        background: rgba(128, 128, 128, 0.05);\n        border-radius: 16px;\n        padding: 16px;\n      }\n\n      .control-card-unavailable {\n        opacity: 0.5;\n      }\n\n      .control-header {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        margin-bottom: 12px;\n        font-weight: 600;\n      }\n\n      .control-header ha-icon {\n        width: 24px;\n        height: 24px;\n      }\n\n      .unavailable-badge {\n        margin-left: auto;\n        padding: 4px 12px;\n        background: rgba(255, 152, 0, 0.2);\n        color: #ff9800;\n        border-radius: 12px;\n        font-size: 0.75rem;\n      }\n\n      .control-action {\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n      }\n\n      .select-grid {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));\n        gap: 8px;\n      }\n\n      .select-opt {\n        padding: 10px;\n        border-radius: 12px;\n        background: rgba(128, 128, 128, 0.1);\n        text-align: center;\n        cursor: pointer;\n        transition: all 0.3s;\n        font-size: 0.9rem;\n      }\n\n      .select-opt:hover:not(.disabled) {\n        background: rgba(128, 128, 128, 0.2);\n      }\n\n      .select-opt.active {\n        background: var(--accent-color, #03a9f4);\n        color: white;\n      }\n\n      .select-opt.disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .number-control {\n        display: flex;\n        align-items: center;\n        gap: 16px;\n      }\n\n      .number-control button {\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        border: none;\n        background: rgba(128, 128, 128, 0.1);\n        cursor: pointer;\n        transition: all 0.3s;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .number-control button:hover:not(:disabled) {\n        background: rgba(128, 128, 128, 0.2);\n        transform: scale(1.1);\n      }\n\n      .number-control button:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .number-control button ha-icon {\n        width: 20px;\n        height: 20px;\n      }\n\n      .number-control span {\n        min-width: 50px;\n        text-align: center;\n        font-weight: 600;\n      }\n\n      .action-btn {\n        width: 48px;\n        height: 48px;\n        border-radius: 50%;\n        border: none;\n        background: var(--accent-color, #03a9f4);\n        color: white;\n        cursor: pointer;\n        transition: all 0.3s;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .action-btn:hover:not(:disabled) {\n        transform: scale(1.1);\n      }\n\n      .action-btn:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n        background: rgba(128, 128, 128, 0.3);\n      }\n\n      .action-btn ha-icon {\n        width: 24px;\n        height: 24px;\n      }\n\n      .state-text {\n        padding: 8px 16px;\n        background: rgba(128, 128, 128, 0.1);\n        border-radius: 12px;\n        font-size: 0.9rem;\n      }\n\n      .unavailable-text {\n        color: #ff9800;\n      }\n\n      .no-controls {\n        text-align: center;\n        padding: 40px 20px;\n        color: var(--secondary-text-color, #666);\n        font-size: 1rem;\n      }\n\n      @keyframes fadeIn {\n        from { opacity: 0; }\n        to { opacity: 1; }\n      }\n\n      @keyframes slideUp {\n        from {\n          transform: translateY(100%);\n        }\n        to {\n          transform: translateY(0);\n        }\n      }\n\n      ha-switch {\n        --mdc-theme-secondary: var(--accent-color, #03a9f4);\n      }\n\n      ha-icon {\n        color: var(--primary-text-color, #000);\n      }\n    `}(e),this._popupPortal.appendChild(i),document.body.appendChild(this._popupPortal)}}_isInBubbleCardPopup(){let e=this;for(;e&&e.parentNode;){if(e=e.parentNode,e.host&&(e=e.host),e.classList){if(Array.from(e.classList).some(e=>e.includes("bubble")||e.includes("popup-container")))return!0}if("BUBBLE-CARD"===e.tagName||"BUBBLE-POP-UP"===e.tagName)return!0}return!1}_removePopupPortal(){this._popupPortal&&this._popupPortal.parentNode&&(this._popupPortal.parentNode.removeChild(this._popupPortal),this._popupPortal=null)}async _loadTranslations(){const e=this.config?.language||this.hass?.language||"en",t={"zh-Hant":"zh-TW"}[e]||e;if(this._translations=ie[t]||ie[e]||ie.en,"auto"!==e)try{const i=te();let a=await fetch(`${i}${e}.json`);if(a.ok||e===t||(a=await fetch(`${i}${t}.json`)),a.ok){const e=await a.json();this._translations={...this._translations,...e}}}catch(e){}}_t(e){return this._translations[e]||ie.en[e]||e}static getConfigElement(){return document.createElement("universal-device-card-editor")}static getStubConfig(){return{entity:"",layout:"standard",language:"auto",disable_popup:!1,show_buttons:[]}}_getDeviceType(){return this.config.entity.split(".")[0]}_shouldFilterEntity(e){const t=this.config.popup_filters||{},i=e.entity_id,a=i.split(".")[0];if(t.exclude_domains&&t.exclude_domains.includes(a))return!0;if(t.include_domains&&!t.include_domains.includes(a))return!0;if(t.exclude_entities&&t.exclude_entities.includes(i))return!0;if(t.include_entities&&!t.include_entities.includes(i))return!0;if("sensor"===a&&t.exclude_sensor_classes){const i=e.attributes.device_class;if(i&&t.exclude_sensor_classes.includes(i))return!0}if("sensor"===a&&t.include_sensor_classes){const i=e.attributes.device_class;if(!i||!t.include_sensor_classes.includes(i))return!0}return!1}_getStateColor(){const e=this.hass.states[this.config.entity];return e?le(this._getDeviceType(),e.state):"var(--ha-card-background)"}_getRelatedEntities(){if(!0===this.config.disable_popup)return[];const e=this.hass.entities[this.config.entity];if(!e)return[];const t=e.device_id;return Object.values(this.hass.states).filter(e=>{const i=this.hass.entities[e.entity_id];return i&&i.device_id===t&&e.entity_id!==this.config.entity}).filter(e=>!this._shouldFilterEntity(e))}_isEntityAvailable(e){return"unavailable"!==e.state&&"unknown"!==e.state}_getMainButtons(){return this.config.show_buttons&&Array.isArray(this.config.show_buttons)?this.config.show_buttons.map(e=>this.hass.states[e]).filter(e=>void 0!==e):[]}_showTextDialog(e){this._popupText=e,this._showTextPopup=!0}render(){const e=this.hass.states[this.config.entity];if(!e)return N`<ha-card>???????/ha-card>`;const t=this._getStateColor(),i=this._getDeviceType(),a=this.config.layout||"standard",n=!0!==this.config.disable_popup;return N`
      <ha-card class="main-container ${a}-layout" 
               style="background-color: ${t}">
        ${this._renderDeviceSpecificContent(e,i,a,n)}
        ${this._showTextPopup?this._renderTextPopup():""}
      </ha-card>
    `}updated(e){super.updated(e),this.hass&&this.config?.entity&&(this._services=function(e,t){if(!e||!t)return null;const i=t;return{callService(t,a,n={}){e.callService(t,a,{entity_id:i,...n})},toggle(t=i){e.callService("homeassistant","toggle",{entity_id:t})},setSelect(t,i){e.callService("select","select_option",{entity_id:t,option:i})},adjustNumber(t,i){const a=e.states[t];if(!a)return;const n=parseFloat(a.state),s=a.attributes.step||1,r=a.attributes.min,o=a.attributes.max;let c=n+i*s;void 0!==r&&(c=Math.max(r,c)),void 0!==o&&(c=Math.min(o,c));const l="number"===t.split(".")[0]?"number":"input_number";e.callService(l,"set_value",{entity_id:t,value:c})},pressButton(t){e.callService("button","press",{entity_id:t})},adjustTemp(t){const a=e.states[i].attributes.temperature+t;e.callService("climate","set_temperature",{entity_id:i,temperature:a})},setClimateMode(t){e.callService("climate","set_hvac_mode",{entity_id:i,hvac_mode:t})},setFanMode(t){e.callService("climate","set_fan_mode",{entity_id:i,fan_mode:t})},setBrightness(t){const a=Math.round(t/100*255);e.callService("light","turn_on",{entity_id:i,brightness:a})},setFanSpeed(t){e.callService("fan","set_percentage",{entity_id:i,percentage:parseInt(t)})},setCoverPosition(t){e.callService("cover","set_cover_position",{entity_id:i,position:parseInt(t)})},setCoverTiltPosition(t){e.callService("cover","set_cover_tilt_position",{entity_id:i,tilt_position:parseInt(t)})},setVolume(t){e.callService("media_player","volume_set",{entity_id:i,volume_level:t/100})},setFanPresetMode(t){e.callService("fan","set_preset_mode",{entity_id:i,preset_mode:t})},setWaterHeaterTemp(t){e.callService("water_heater","set_temperature",{entity_id:i,temperature:t})},adjustWaterTemp(t){const a=e.states[i].attributes.temperature+t;e.callService("water_heater","set_temperature",{entity_id:i,temperature:a})}}}(this.hass,this.config.entity)),e.has("_showPopup")&&this._updatePopupPortal()}_updatePopupPortal(){if(this._popupPortal)if(this._showPopup&&!this.config.disable_popup)this._popupPortal.style.pointerEvents="auto",this._renderPopupToPortal();else{this._popupPortal.style.pointerEvents="none";const e=this._popupPortal.querySelector(".popup-overlay");e&&e.remove()}}_renderPopupToPortal(){const e=this._getRelatedEntities(),t=e.filter(e=>e.entity_id.startsWith("sensor")),i=e.filter(e=>!e.entity_id.startsWith("sensor")),a=document.createElement("div");a.className="popup-overlay",a.addEventListener("click",e=>{e.target===a&&(this._showPopup=!1,this.requestUpdate())});const n=document.createElement("div"),s=!0===this.config?.hide_popup_scrollbar;n.className=s?"popup-content hide-scrollbar":"popup-content",n.addEventListener("click",e=>e.stopPropagation());const r=document.createElement("div");if(r.className="popup-header",r.innerHTML='\n      <div class="popup-drag-handle"></div>\n      <ha-icon class="close-btn" icon="mdi:close"></ha-icon>\n    ',r.querySelector(".close-btn").addEventListener("click",()=>{this._showPopup=!1,this.requestUpdate()}),n.appendChild(r),t.length>0){const e=document.createElement("div");e.className="chips-container",t.forEach(t=>{const i=this._isEntityAvailable(t),a=document.createElement("div");a.className="chip "+(i?"":"chip-unavailable"),a.innerHTML=`\n          <ha-icon icon="${t.attributes.icon||"mdi:information-outline"}"></ha-icon>\n          <span>${i?`${t.state} ${t.attributes.unit_of_measurement||""}`:this._t("unavailable")}</span>\n        `,e.appendChild(a)}),n.appendChild(e)}if(i.length>0){const e=document.createElement("div");e.className="controls-list",i.forEach(t=>{const i=this._createControlCardElement(t);e.appendChild(i)}),n.appendChild(e)}else{const e=document.createElement("div");e.className="no-controls",e.textContent=this._t("no_controls"),n.appendChild(e)}a.appendChild(n);const o=this._popupPortal.querySelector(".popup-overlay");o&&o.remove(),this._popupPortal.appendChild(a)}_createControlCardElement(e){const t=e.entity_id.split(".")[0],i=this._isEntityAvailable(e),a=document.createElement("div");a.className="control-card "+(i?"":"control-card-unavailable");const n=document.createElement("div");n.className="control-header",n.innerHTML=`\n      <ha-icon icon="${e.attributes.icon||se(t)}"></ha-icon>\n      <span>${e.attributes.friendly_name}</span>\n      ${i?"":`<span class="unavailable-badge">${this._t("unavailable")}</span>`}\n    `;const s=document.createElement("div");return s.className="control-action",i?this._populateControlAction(s,e,t):s.innerHTML=`<span class="state-text unavailable-text">${e.state}</span>`,a.appendChild(n),a.appendChild(s),a}_populateControlAction(e,t,i){!function(e,t,i,a){const n=a.isEntityAvailable(t);switch(i){case"switch":case"input_boolean":{const i=document.createElement("ha-switch");i.checked="on"===t.state,i.disabled=!n,i.addEventListener("change",()=>n&&a.toggle(t.entity_id)),e.appendChild(i);break}case"select":case"input_select":{const i=document.createElement("div");i.className="select-grid",(t.attributes.options||[]).forEach(e=>{const s=document.createElement("div");s.className=`select-opt ${t.state===e?"active":""} ${n?"":"disabled"}`,s.textContent=e,s.addEventListener("click",()=>n&&a.setSelect(t.entity_id,e)),i.appendChild(s)}),e.appendChild(i);break}case"number":case"input_number":{const i=document.createElement("div");i.className="number-control",i.innerHTML=`\n        <button ${n?"":"disabled"}><ha-icon icon="mdi:minus"></ha-icon></button>\n        <span>${t.state}</span>\n        <button ${n?"":"disabled"}><ha-icon icon="mdi:plus"></ha-icon></button>\n      `,i.querySelectorAll("button")[0].addEventListener("click",()=>n&&a.adjustNumber(t.entity_id,-1)),i.querySelectorAll("button")[1].addEventListener("click",()=>n&&a.adjustNumber(t.entity_id,1)),e.appendChild(i);break}case"button":{const i=document.createElement("button");i.className="action-btn",i.disabled=!n,i.innerHTML='<ha-icon icon="mdi:gesture-tap"></ha-icon>',i.addEventListener("click",()=>n&&a.pressButton(t.entity_id)),e.appendChild(i);break}default:e.innerHTML=`<span class="state-text">${t.state}</span>`}}(e,t,i,{toggle:e=>this._toggleEntity(e),setSelect:(e,t)=>this._setSelect(e,t),adjustNumber:(e,t)=>this._adjustNumber(e,t),pressButton:e=>this._pressButton(e),isEntityAvailable:e=>this._isEntityAvailable(e)})}_renderTextPopup(){return N`
      <div class="text-popup-overlay" @click="${()=>this._showTextPopup=!1}">
        <div class="text-popup-content" @click="${e=>e.stopPropagation()}">
          <div class="text-popup-header">
            <ha-icon class="close-btn" icon="mdi:close" @click="${()=>this._showTextPopup=!1}"></ha-icon>
          </div>
          <div class="text-popup-body">${this._popupText}</div>
        </div>
      </div>
    `}_renderDeviceSpecificContent(e,t,i="standard",a=!0){return(de[t]||de.generic)(this,e,i,a)}_renderMainButtons(e){const t=this._getMainButtons();if(0===t.length)return"";const i="bar"===e;return N`
      <div class="main-buttons ${i?"main-buttons-bar":""}">
        ${t.map(e=>{const t=this._isEntityAvailable(e);return N`
            <button 
              class="main-button ${t?"":"disabled"}"
              ?disabled="${!t}"
              @click="${()=>t&&this._pressButton(e.entity_id)}"
              title="${e.attributes.friendly_name}">
              <ha-icon icon="${e.attributes.icon||"mdi:gesture-tap"}"></ha-icon>
              ${i?"":N`<span>${e.attributes.friendly_name}</span>`}
            </button>
          `})}
      </div>
    `}_renderTitle(e,t,i=20){return e?N`
      <span class="title-scroll-wrap" title="${e}">
        <span class="title-text">${e}</span>
      </span>
    `:""}_renderPopup(){const e=this._getRelatedEntities(),t=e.filter(e=>e.entity_id.startsWith("sensor")),i=e.filter(e=>!e.entity_id.startsWith("sensor"));return N`
      <div class="popup-overlay" @click="${()=>this._showPopup=!1}">
        <div class="popup-content" @click="${e=>e.stopPropagation()}">
          <div class="popup-header">
            <div class="popup-drag-handle"></div>
            <ha-icon class="close-btn" icon="mdi:close" @click="${()=>this._showPopup=!1}"></ha-icon>
          </div>
          
          ${t.length>0?N`
            <div class="chips-container">
              ${t.map(e=>{const t=this._isEntityAvailable(e);return N`
                  <div class="chip ${t?"":"chip-unavailable"}">
                    <ha-icon icon="${e.attributes.icon||"mdi:information-outline"}"></ha-icon>
                    <span>${t?`${e.state} ${e.attributes.unit_of_measurement||""}`:this._t("unavailable")}</span>
                  </div>
                `})}
            </div>
          `:""}

          ${i.length>0?N`
            <div class="controls-list">
              ${i.map(e=>this._renderControlCard(e))}
            </div>
          `:N`<div class="no-controls">${this._t("no_controls")}</div>`}
        </div>
      </div>
    `}_renderControlCard(e){const t=e.entity_id.split(".")[0],i=this._isEntityAvailable(e);return N`
      <div class="control-card ${i?"":"control-card-unavailable"}">
        <div class="control-header">
          <ha-icon icon="${e.attributes.icon||se(t)}"></ha-icon>
          <span>${e.attributes.friendly_name}</span>
          ${i?"":N`<span class="unavailable-badge">${this._t("unavailable")}</span>`}
        </div>
        
        <div class="control-action">
          ${i?this._renderControlAction(e,t):N`
            <span class="state-text unavailable-text">${e.state}</span>
          `}
        </div>
      </div>
    `}_renderControlAction(e,t){return function(e,t,i){const{html:a,toggle:n,setSelect:s,adjustNumber:r,pressButton:o,isEntityAvailable:c}=e,l=c(t);switch(i){case"switch":case"input_boolean":return a`
        <ha-switch 
          .checked="${"on"===t.state}"
          .disabled="${!l}"
          @change="${()=>l&&n(t.entity_id)}">
        </ha-switch>
      `;case"select":case"input_select":return a`
        <div class="select-grid">
          ${(t.attributes.options||[]).map(e=>a`
            <div class="select-opt ${t.state===e?"active":""} ${l?"":"disabled"}" 
                 @click="${()=>l&&s(t.entity_id,e)}">
              ${e}
            </div>
          `)}
        </div>
      `;case"number":case"input_number":return a`
        <div class="number-control">
          <button ?disabled="${!l}" @click="${()=>l&&r(t.entity_id,-1)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span>${t.state}</span>
          <button ?disabled="${!l}" @click="${()=>l&&r(t.entity_id,1)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `;case"button":return a`
        <button class="action-btn" ?disabled="${!l}" @click="${()=>l&&o(t.entity_id)}">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
        </button>
      `;default:return a`<span class="state-text">${t.state}</span>`}}({html:N,toggle:e=>this._toggleEntity(e),setSelect:(e,t)=>this._setSelect(e,t),adjustNumber:(e,t)=>this._adjustNumber(e,t),pressButton:e=>this._pressButton(e),isEntityAvailable:e=>this._isEntityAvailable(e)},e,t)}_setFanPresetMode(e){this._services?.setFanPresetMode(e)}_getVacuumStateText(e){return this._t(e)||e}_toggleEntity(e=this.config.entity){this._services?.toggle(e)}_callService(e,t){this._services?.callService(e,t)}_isMusicAssistant(e){return e&&e.attributes&&null!=e.attributes.mass_player_type}_hasMassQueue(){return null!=this.hass?.services?.music_assistant?.get_queue}_normalizeQueueItem(e){if(!e)return null;const t=e.media_item||e,i=t.artists,a=Array.isArray(i)&&i.length?i.map(e=>e?.name).filter(Boolean).join(", "):"";return{queue_item_id:e.queue_item_id,name:e.name||t?.name,media_title:e.name||t?.name,media_artist:a,media_album_name:t?.album?.name,media_image:t?.image,uri:t?.uri,media_item:t}}async _fetchMassQueue(){if(!this.config?.entity)return;this._massQueueLoading=!0,this._massQueueItems=[],this.requestUpdate("_massQueueLoading"),this.requestUpdate("_massQueueItems");const e=this.config.entity;try{let t=null;const i={entity_id:e},a={entity_id:e};if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const e=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"get_queue",service_data:a,target:i,return_response:!0});t=e?.result?.response??e?.response??e?.result}if(null==t&&"function"==typeof this.hass?.callService){const e=await this.hass.callService("music_assistant","get_queue",a,i,!0);t=e?.response??e?.result??e}const n=[];if(t&&"object"==typeof t){const i=t[e]||t;i&&"object"==typeof i&&(Array.isArray(i.items)?i.items.forEach(e=>{const t=this._normalizeQueueItem(e);t&&n.push(t)}):[i.current_item,i.next_item].forEach(e=>{const t=this._normalizeQueueItem(e);t&&n.push(t)}))}this._massQueueItems=n}catch(e){this._massQueueItems=[]}this._massQueueLoading=!1,this.requestUpdate("_massQueueItems"),this.requestUpdate("_massQueueLoading")}_toggleMassQueueExpand(){this._massQueueExpanded=!this._massQueueExpanded,this._massQueueExpanded&&0===this._massQueueItems.length&&!this._massQueueLoading&&this._fetchMassQueue(),this.requestUpdate("_massQueueExpanded")}_playMassQueueItem(e){if(!this.hass||!this.config?.entity)return;const t="string"==typeof e?null:e?.uri||e?.media_item?.uri;t&&this.hass.callService("music_assistant","play_media",{entity_id:this.config.entity,media_id:[t],media_type:"track"})}_hasMusicAssistantLibrary(){return null!=this.hass?.services?.music_assistant?.get_library}async _getMassConfigEntryId(){if(this.config?.mass_config_entry_id)return this.config.mass_config_entry_id;const e=this.config?.entity,t=this.hass?.entities?.[e];if(t?.config_entry_id)return t.config_entry_id;if("function"==typeof this.hass?.callApi)try{const e=await this.hass.callApi("GET","config/config_entries/entry"),t=(Array.isArray(e)?e:[]).find(e=>"music_assistant"===e?.domain&&"loaded"===e?.state);if(t?.entry_id)return t.entry_id}catch(e){}return null}async _fetchMassLibrary(){if(this.config?.entity){this._massLibraryLoading=!0,this._massLibraryItems=[],this.requestUpdate("_massLibraryLoading"),this.requestUpdate("_massLibraryItems");try{const e=await this._getMassConfigEntryId();if(!e)return void(this._massLibraryItems=[]);const t=[],i=["artist","album","playlist","track"],a={config_entry_id:e,limit:30},n=async e=>{const t={...a,media_type:e};if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const i=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"get_library",service_data:t,return_response:!0}),a=i?.result?.response??i?.response??i?.result,n=a?.items??(Array.isArray(a)?a:[]);return Array.isArray(n)?n.map(t=>({...t,media_type:e})):[]}if("function"==typeof this.hass?.callService){const i=await this.hass.callService("music_assistant","get_library",t,{},!0),a=i?.response??i?.result??i,n=a?.items??(Array.isArray(a)?a:[]);return Array.isArray(n)?n.map(t=>({...t,media_type:e})):[]}return[]};for(const e of i)try{const i=await n(e);t.push(...i)}catch(e){}this._massLibraryItems=t}catch(e){this._massLibraryItems=[]}finally{this._massLibraryLoading=!1,this.requestUpdate("_massLibraryItems"),this.requestUpdate("_massLibraryLoading")}}}_toggleMassLibraryExpand(){this._massLibraryExpanded=!this._massLibraryExpanded,this._massLibraryExpanded&&0===this._massLibraryItems.length&&!this._massLibraryLoading&&this._fetchMassLibrary(),this.requestUpdate("_massLibraryExpanded")}_playMassLibraryItem(e){this.hass&&this.config?.entity&&e?.uri&&this.hass.callService("music_assistant","play_media",{entity_id:this.config.entity,media_id:[e.uri],media_type:e.media_type||"track"})}_hasMusicAssistantSearch(){return null!=this.hass?.services?.music_assistant?.search}async _fetchMassSearch(e){const t=(e||"").trim();if(t&&this.config?.entity){this._massSearchLoading=!0,this._massSearchResults={artists:[],albums:[],tracks:[]},this.requestUpdate("_massSearchLoading"),this.requestUpdate("_massSearchResults");try{const e=await this._getMassConfigEntryId();if(!e)return void(this._massSearchResults={artists:[],albums:[],tracks:[]});const i={config_entry_id:e,name:t};let a=null;if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const e=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"search",service_data:i,return_response:!0});a=e?.result?.response??e?.response??e?.result}if(null==a&&"function"==typeof this.hass?.callService){const e=await this.hass.callService("music_assistant","search",i,{},!0);a=e?.response??e?.result??e}const n=Array.isArray(a?.artists)?a.artists:[],s=Array.isArray(a?.albums)?a.albums:[],r=Array.isArray(a?.tracks)?a.tracks:[];this._massSearchResults={artists:n,albums:s,tracks:r}}catch(e){this._massSearchResults={artists:[],albums:[],tracks:[]}}finally{this._massSearchLoading=!1,this.requestUpdate("_massSearchResults"),this.requestUpdate("_massSearchLoading")}}}_toggleMassSearchExpand(){this._massSearchExpanded=!this._massSearchExpanded,this._massSearchExpanded||(this._massSearchQuery="",this._massSearchResults={artists:[],albums:[],tracks:[]}),this.requestUpdate("_massSearchExpanded"),this.requestUpdate("_massSearchQuery"),this.requestUpdate("_massSearchResults")}_onMassSearchInput(e){this._massSearchQuery=e?.target?.value??"",this.requestUpdate("_massSearchQuery")}_runMassSearch(){const e=(this._massSearchQuery||"").trim();e&&this._fetchMassSearch(e)}_showMassPlaylistOrLibrary(e){return this._isMusicAssistant(e)&&(this._hasMassQueue()||this._hasMusicAssistantLibrary()||this._hasMusicAssistantSearch())}_setSelect(e,t){this._services?.setSelect(e,t)}_adjustNumber(e,t){this._services?.adjustNumber(e,t)}_pressButton(e){this._services?.pressButton(e)}_openMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this.config.entity}}))}_fireHaptic(e="medium"){"undefined"!=typeof navigator&&navigator.vibrate&&navigator.vibrate("heavy"===e?[20,40,20]:[15,30,15]),this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:{type:e}}))}_onIconPointerDown(e){this._iconLongPressFired=!1,this._iconLongPressTarget=e.currentTarget,this._iconLongPressTimer=setTimeout(()=>{this._iconLongPressTimer=null,this._iconLongPressFired=!0,this._fireHaptic("medium"),this._iconLongPressTarget&&(this._iconLongPressTarget.classList.add("icon-longpress-active"),setTimeout(()=>{this._iconLongPressTarget&&this._iconLongPressTarget.classList.remove("icon-longpress-active")},200)),this._openMoreInfo()},500)}_onIconPointerUp(){if(this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null,this._iconLongPressFired)return void(this._iconLongPressFired=!1);const e=Date.now();if(this._iconLastTapTime&&e-this._iconLastTapTime<400)return this._iconLastTapTime=0,this._fireHaptic("light"),void this._openMoreInfo();this._iconLastTapTime=e,this._toggleEntity()}_onIconPointerLeave(){this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null}_renderHeaderIcon(e,t=!1){if(!e)return"";const i=this._getDeviceType(),a=e.attributes?.icon||se(i),n=le(i,e.state),s="var(--ha-card-background)"!==n&&n.startsWith("rgba")?n.replace(/[\d.]+\)$/,"1)"):"";return N`
      <div class="header-icon ${t?"header-icon-mini":""} entity-icon-action"
           style="${s?`color: ${s}`:""}"
           @pointerdown="${e=>this._onIconPointerDown(e)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${e=>{e.preventDefault(),e.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${a}"></ha-icon>
      </div>
    `}_renderBarIcon(e,t=""){if(!e)return"";const i=this._getDeviceType(),a=e.attributes?.icon||se(i);return N`
      <div class="bar-icon entity-icon-action ${t}"
           @pointerdown="${e=>this._onIconPointerDown(e)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${e=>{e.preventDefault(),e.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${a}"></ha-icon>
      </div>
    `}_renderHeaderAction(e=!0){return e?N`
      <div class="header-action" 
           @click="${()=>this._showPopup=!0}"
           title="${this._t("device")}">
        <ha-icon icon="mdi:tune-variant"></ha-icon>
      </div>
    `:""}_handleSliderClick(e,t){const i=e.currentTarget.getBoundingClientRect(),a=e.clientX-i.left,n=Math.round(a/i.width*100),s=Math.max(0,Math.min(100,n));switch(t){case"light":this._setBrightness(s);break;case"cover":this._setCoverPosition(s);break;case"media":this._setVolume(s);break;case"fan":this._setFanSpeed(s)}}_adjustTemp(e){this._services?.adjustTemp(e)}_setClimateMode(e){this._services?.setClimateMode(e)}_setFanMode(e){this._services?.setFanMode(e)}_setBrightness(e){this._services?.setBrightness(e)}_adjustBrightness(e){const t=this.hass.states[this.config.entity].attributes.brightness||0,i=Math.round(t/255*100),a=Math.max(0,Math.min(100,i+e));this._setBrightness(a)}_setFanSpeed(e){this._services?.setFanSpeed(e)}_adjustFanSpeed(e){const t=this.hass.states[this.config.entity].attributes.percentage||0,i=Math.max(0,Math.min(100,t+e));this._setFanSpeed(i)}_setCoverPosition(e){this._services?.setCoverPosition(e)}_adjustCoverPosition(e){const t=this.hass.states[this.config.entity].attributes.current_position||0,i=Math.max(0,Math.min(100,t+e));this._setCoverPosition(i)}_adjustCoverTiltPosition(e){const t=this.hass.states[this.config.entity].attributes.current_tilt_position??50,i=Math.max(0,Math.min(100,t+e));this._services?.setCoverTiltPosition(i)}_setVolume(e){this._services?.setVolume(e)}_adjustVolume(e){const t=100*(this.hass.states[this.config.entity].attributes.volume_level||0),i=Math.max(0,Math.min(100,t+e));this._setVolume(i)}_adjustWaterTemp(e){this._services?.adjustWaterTemp(e)}setConfig(e){if(!e.entity)throw new Error("?ｇ????entity");this.config=e}static get styles(){return[ae,ne]}}),customElements.define("universal-device-card-editor",class extends ee{static get properties(){return{hass:{},config:{},_translations:{type:Object}}}constructor(){super(),this._translations={}}async connectedCallback(){super.connectedCallback(),await this._loadTranslations()}async _loadTranslations(){const e=this.hass?.language||"en",t={"zh-Hant":"zh-TW"}[e]||e;this._translations=ie[t]||ie[e]||ie.en;try{const i=te();let a=await fetch(`${i}${e}.json`);if(a.ok||e===t||(a=await fetch(`${i}${t}.json`)),a.ok){const e=await a.json();this._translations={...this._translations,...e}}}catch(e){}this.requestUpdate()}_t(e){return this._translations[e]||ie.en[e]||e}setConfig(e){this.config=e}configChanged(e){const t=new Event("config-changed",{bubbles:!0,composed:!0});t.detail={config:e},this.dispatchEvent(t)}_valueChanged(e){const t=e.target,i=t.configValue,a=void 0!==t.checked?t.checked:t.value;if(this.config[i]===a)return;const n={...this.config};""===a||"checkbox"===t.type&&!a?delete n[i]:n[i]=a,this.configChanged(n)}_showButtonsChanged(e){const t=e.target.value,i={...this.config};""===t?delete i.show_buttons:i.show_buttons=t.split(",").map(e=>e.trim()).filter(e=>e),this.configChanged(i)}_filterChanged(e){const t=e.target,i=t.getAttribute("filter-type"),a=t.value,n={...this.config};n.popup_filters||(n.popup_filters={}),""===a?delete n.popup_filters[i]:n.popup_filters[i]=a.split(",").map(e=>e.trim()).filter(e=>e),this.configChanged(n)}render(){if(!this.hass||!this.config)return N``;const e=Object.keys(this.hass.states).filter(e=>{const t=e.split(".")[0];return["climate","light","fan","cover","humidifier","media_player","vacuum","water_heater"].includes(t)}),t=this.config.popup_filters||{};return N`
      <div class="card-config">
        <div class="option">
          <label>
            ${this._t("editor_entity")} ${this._t("editor_entity_required")}
            <select 
              .value="${this.config.entity||""}"
              .configValue="${"entity"}"
              @change="${this._valueChanged}">
              <option value="">${this._t("editor_entity_select")}</option>
              ${e.map(e=>N`
                <option value="${e}" ?selected="${this.config.entity===e}">
                  ${this.hass.states[e].attributes.friendly_name||e}
                </option>
              `)}
            </select>
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t("editor_layout")}
            <select 
              .value="${this.config.layout||"standard"}"
              .configValue="${"layout"}"
              @change="${this._valueChanged}">
              <option value="standard">${this._t("editor_layout_standard")}</option>
              <option value="mini">${this._t("editor_layout_mini")}</option>
              <option value="bar">${this._t("editor_layout_bar")}</option>
            </select>
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t("editor_language")}
            <select 
              .value="${this.config.language||"auto"}"
              .configValue="${"language"}"
              @change="${this._valueChanged}">
              <option value="auto">${this._t("editor_language_auto")}</option>
              <option value="zh-TW">繁體中文</option>
              <option value="zh-CN">简体中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </label>
        </div>

        <div class="option">
          <label class="checkbox-label">
            <input 
              type="checkbox"
              .checked="${this.config.disable_popup||!1}"
              .configValue="${"disable_popup"}"
              @change="${this._valueChanged}">
            <span>${this._t("editor_disable_popup")}</span>
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t("editor_show_buttons")}
            <small>${this._t("editor_show_buttons_desc")}</small>
            <input
              type="text"
              .value="${(this.config.show_buttons||[]).join(", ")}"
              @change="${this._showButtonsChanged}"
              placeholder="button.eco_mode, button.self_clean">
          </label>
        </div>

        <hr>

        <h3>${this._t("editor_filters_title")}</h3>
        <p class="description">${this._t("editor_filters_desc")}</p>

        <div class="option">
          <label>
            ${this._t("editor_exclude_domains")}
            <input
              type="text"
              .value="${t.exclude_domains?.join(", ")||""}"
              filter-type="exclude_domains"
              @change="${this._filterChanged}"
              placeholder="binary_sensor, update">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t("editor_include_domains")}
            <input
              type="text"
              .value="${t.include_domains?.join(", ")||""}"
              filter-type="include_domains"
              @change="${this._filterChanged}"
              placeholder="sensor, switch, select">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t("editor_exclude_entities")}
            <input
              type="text"
              .value="${t.exclude_entities?.join(", ")||""}"
              filter-type="exclude_entities"
              @change="${this._filterChanged}"
              placeholder="sensor.wifi_signal, switch.test">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t("editor_include_entities")}
            <input
              type="text"
              .value="${t.include_entities?.join(", ")||""}"
              filter-type="include_entities"
              @change="${this._filterChanged}"
              placeholder="sensor.temperature, sensor.humidity">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t("editor_exclude_sensor_classes")}
            <input
              type="text"
              .value="${t.exclude_sensor_classes?.join(", ")||""}"
              filter-type="exclude_sensor_classes"
              @change="${this._filterChanged}"
              placeholder="timestamp, update, date">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t("editor_include_sensor_classes")}
            <input
              type="text"
              .value="${t.include_sensor_classes?.join(", ")||""}"
              filter-type="include_sensor_classes"
              @change="${this._filterChanged}"
              placeholder="temperature, humidity, battery">
          </label>
        </div>
      </div>
    `}static get styles(){return K`
      .card-config {
        padding: 16px;
      }

      .option {
        margin-bottom: 16px;
      }

      .option label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .option label small {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-weight: normal;
        margin-top: 2px;
      }

      .option select,
      .option input[type="text"] {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        box-sizing: border-box;
      }

      .option select:focus,
      .option input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .checkbox-label {
        display: flex !important;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .checkbox-label input[type="checkbox"] {
        width: auto;
        cursor: pointer;
      }

      h3 {
        margin: 20px 0 8px 0;
        font-size: 16px;
        color: var(--primary-text-color);
      }

      .description {
        margin: 0 0 12px 0;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      hr {
        border: none;
        border-top: 1px solid var(--divider-color);
        margin: 20px 0;
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"universal-device-card",name:"Universal Device Card",description:"通用設備卡片 - 支援 Climate、Light、Fan、Cover 等多種設備類型",preview:!0,documentationURL:"https://github.com/your-repo/universal-device-card"}),console.info("%c UNIVERSAL-DEVICE-CARD %c v2.1 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");
