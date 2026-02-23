const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,a=new RegExp(`${i}|${n}`),o="$lit$";class r{constructor(t,e){this.parts=[],this.element=e;const n=[],r=[],c=document.createTreeWalker(e.content,133,null,!1);let p=0,u=-1,h=0;const{strings:m,values:{length:b}}=t;for(;h<b;){const t=c.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let n=0;for(let t=0;t<i;t++)s(e[t].name,o)&&n++;for(;n-- >0;){const e=m[h],i=d.exec(e)[2],n=i.toLowerCase()+o,r=t.getAttribute(n);t.removeAttribute(n);const s=r.split(a);this.parts.push({type:"attribute",index:u,name:i,strings:s}),h+=s.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),c.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(i)>=0){const i=t.parentNode,r=e.split(a),c=r.length-1;for(let e=0;e<c;e++){let n,a=r[e];if(""===a)n=l();else{const t=d.exec(a);null!==t&&s(t[2],o)&&(a=a.slice(0,t.index)+t[1]+t[2].slice(0,-5)+t[3]),n=document.createTextNode(a)}i.insertBefore(n,t),this.parts.push({type:"node",index:++u})}""===r[c]?(i.insertBefore(l(),t),n.push(t)):t.data=r[c],h+=c}}else if(8===t.nodeType)if(t.data===i){const e=t.parentNode;null!==t.previousSibling&&u!==p||(u++,e.insertBefore(l(),t)),p=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(n.push(t),u--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(i,e+1));)this.parts.push({type:"node",index:-1}),h++}}else c.currentNode=r.pop()}for(const t of n)t.parentNode.removeChild(t)}}const s=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},c=t=>-1!==t.index,l=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(t,e){const{element:{content:i},parts:n}=t,a=document.createTreeWalker(i,133,null,!1);let o=h(n),r=n[o],s=-1,c=0;const l=[];let d=null;for(;a.nextNode();){s++;const t=a.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(l.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==r&&r.index===s;)r.index=null!==d?-1:r.index-c,o=h(n,o),r=n[o]}l.forEach(t=>t.parentNode.removeChild(t))}const u=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},h=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(c(e))return i}return-1};const m=new WeakMap,b=t=>"function"==typeof t&&m.has(t),g={},v={};class _{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],n=this.template.parts,a=document.createTreeWalker(e,133,null,!1);let o,r=0,s=0,l=a.nextNode();for(;r<n.length;)if(o=n[r],c(o)){for(;s<o.index;)s++,"TEMPLATE"===l.nodeName&&(i.push(l),a.currentNode=l.content),null===(l=a.nextNode())&&(a.currentNode=i.pop(),l=a.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const f=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),y=` ${i} `;class x{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",a=!1;for(let r=0;r<t;r++){const t=this.strings[r],s=t.lastIndexOf("\x3c!--");a=(s>-1||a)&&-1===t.indexOf("--\x3e",s+1);const c=d.exec(t);e+=null===c?t+(a?y:n):t.substr(0,c.index)+c[1]+c[2]+o+c[3]+i}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==f&&(e=f.createHTML(e)),t.innerHTML=e,t}}const w=t=>null===t||!("object"==typeof t||"function"==typeof t),$=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class k{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!$(t))return t}let n="";for(let a=0;a<e;a++){n+=t[a];const e=i[a];if(void 0!==e){const t=e.value;if(w(t)||!$(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===g||w(t)&&t===this.value||(this.value=t,b(t)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const t=this.value;this.value=g,t(this)}this.value!==g&&this.committer.commit()}}class C{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}const t=this.__pendingValue;t!==g&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):$(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const i=new _(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const a of t)i=e[n],void 0===i&&(i=new C(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(a),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class P{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}if(this.__pendingValue===g)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=g}}class T extends k{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends S{}let j=!1;(()=>{try{const t={get capture(){return j=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class M{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}if(this.__pendingValue===g)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=N(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=g}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const N=t=>t&&(j?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function A(t){let e=z.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},z.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(i);return n=e.keyString.get(a),void 0===n&&(n=new r(t,t.getTemplateElement()),e.keyString.set(a,n)),e.stringsArray.set(t.strings,n),n}const z=new Map,B=new WeakMap;const I=new class{handleAttributeExpressions(t,e,i,n){const a=e[0];if("."===a){return new T(t,e.slice(1),i).parts}if("@"===a)return[new M(t,e.slice(1),n.eventContext)];if("?"===a)return[new P(t,e.slice(1),i)];return new k(t,e,i).parts}handleTextExpression(t){return new C(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const L=(t,...e)=>new x(t,e,"html",I),V=(t,e)=>`${t}--${e}`;let D=!0;void 0===window.ShadyCSS?D=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),D=!1);const U=t=>e=>{const n=V(e.type,t);let a=z.get(n);void 0===a&&(a={stringsArray:new WeakMap,keyString:new Map},z.set(n,a));let o=a.stringsArray.get(e.strings);if(void 0!==o)return o;const s=e.strings.join(i);if(o=a.keyString.get(s),void 0===o){const i=e.getTemplateElement();D&&window.ShadyCSS.prepareTemplateDom(i,t),o=new r(e,i),a.keyString.set(s,o)}return a.stringsArray.set(e.strings,o),o},H=["html","svg"],F=new Set,O=(t,e,i)=>{F.add(t);const n=i?i.element:document.createElement("template"),a=e.querySelectorAll("style"),{length:o}=a;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(n,t);const r=document.createElement("style");for(let t=0;t<o;t++){const e=a[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{H.forEach(e=>{const i=z.get(V(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),p(t,i)})})})(t);const s=n.content;i?function(t,e,i=null){const{element:{content:n},parts:a}=t;if(null==i)return void n.appendChild(e);const o=document.createTreeWalker(n,133,null,!1);let r=h(a),s=0,c=-1;for(;o.nextNode();)for(c++,o.currentNode===i&&(s=u(e),i.parentNode.insertBefore(e,i));-1!==r&&a[r].index===c;){if(s>0){for(;-1!==r;)a[r].index+=s,r=h(a,r);return}r=h(a,r)}}(i,r,s.firstChild):s.insertBefore(r,s.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const c=s.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(i){s.insertBefore(r,s.firstChild);const t=new Set;t.add(r),p(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const R={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},q=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:q},Y="finalized";class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const n=this._attributeNameForProperty(i,e);void 0!==n&&(this._attributeToPropertyMap.set(n,i),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const a=this[t];this[e]=n,this.requestUpdateInternal(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(Y)||t.finalize(),this[Y]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=q){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||R,a="function"==typeof n?n:n.fromAttribute;return a?a(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||R.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=W){const n=this.constructor,a=n._attributeNameForProperty(t,i);if(void 0!==a){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(a):this.setAttribute(a,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let n=!0;if(void 0!==t){const a=this.constructor;i=i||a.getPropertyOptions(t),a._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J[Y]=!0;const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol();class X{constructor(t,e){if(e!==Q)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=(t,...e)=>{const i=e.reduce((e,i,n)=>e+(t=>{if(t instanceof X)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[n+1],t[0]);return new X(i,Q)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Z={};class tt extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),n=[];i.forEach(t=>n.unshift(t)),this._styles=n}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!G){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new X(String(e),Q)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Z&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return Z}}function et(){return void 0!==import.meta&&import.meta.url?new URL("translations/",import.meta.url).href:"/local/universal-device-card/translations/"}tt.finalized=!0,tt.render=(t,i,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const a=n.scopeName,o=B.has(i),r=D&&11===i.nodeType&&!!i.host,s=r&&!F.has(a),c=s?document.createDocumentFragment():i;if(((t,i,n)=>{let a=B.get(i);void 0===a&&(e(i,i.firstChild),B.set(i,a=new C(Object.assign({templateFactory:A},n))),a.appendInto(i)),a.setValue(t),a.commit()})(t,c,Object.assign({templateFactory:U(a)},n)),s){const t=B.get(c);B.delete(c);const n=t.value instanceof _?t.value.template:void 0;O(a,c,n),e(i,i.firstChild),i.appendChild(c),B.set(i,t)}!o&&r&&window.ShadyCSS.styleElement(i.host)},tt.shadowRootOptions={mode:"open"};const it={"zh-TW":{target_temp:"目標溫度",target_humidity:"目標濕度",position:"位置",open:"開啟",close:"關閉",stop:"停止",start:"開始",pause:"暫停",return_home:"回充",no_controls:"無其他控制項目",unavailable:"無法使用",device:"設備",cleaning:"清掃中",docked:"充電中",returning:"回充中",idle:"待機",paused:"已暫停",error:"錯誤",cool:"冷氣",heat:"暖氣",dry:"除濕",fan_only:"送風",auto:"自動",off:"關閉",click_to_view:"點擊查看完整內容",editor_entity:"實體 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"選擇實體...",editor_layout:"佈局模式 (Layout)",editor_layout_standard:"標準版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"長條型 (Bar)",editor_language:"語言 (Language)",editor_language_auto:"自動 (Auto)",editor_disable_popup:"禁用彈出面板",editor_show_buttons:"主畫面顯示按鈕 (Button Entity IDs)",editor_show_buttons_desc:"輸入 button 實體 ID，用逗號分隔",editor_filters_title:"彈出面板過濾器 (Popup Filters)",editor_filters_desc:"使用逗號分隔多個值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"僅包含的 Domain",editor_exclude_entities:"排除的實體 ID",editor_include_entities:"僅包含的實體 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"僅包含的 Sensor Device Class"},"zh-CN":{target_temp:"目标温度",target_humidity:"目标湿度",position:"位置",open:"打开",close:"关闭",stop:"停止",start:"开始",pause:"暂停",return_home:"回充",no_controls:"无其他控制项目",unavailable:"不可用",device:"设备",cleaning:"清扫中",docked:"充电中",returning:"回充中",idle:"待机",paused:"已暂停",error:"错误",cool:"制冷",heat:"制热",dry:"除湿",fan_only:"送风",auto:"自动",off:"关闭",click_to_view:"点击查看完整内容",editor_entity:"实体 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"选择实体...",editor_layout:"布局模式 (Layout)",editor_layout_standard:"标准版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"长条型 (Bar)",editor_language:"语言 (Language)",editor_language_auto:"自动 (Auto)",editor_disable_popup:"禁用弹出面板",editor_show_buttons:"主画面显示按钮 (Button Entity IDs)",editor_show_buttons_desc:"输入 button 实体 ID，用逗号分隔",editor_filters_title:"弹出面板过滤器 (Popup Filters)",editor_filters_desc:"使用逗号分隔多个值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"仅包含的 Domain",editor_exclude_entities:"排除的实体 ID",editor_include_entities:"仅包含的实体 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"仅包含的 Sensor Device Class"},en:{target_temp:"Target Temp",target_humidity:"Target Humidity",position:"Position",open:"Open",close:"Close",stop:"Stop",start:"Start",pause:"Pause",return_home:"Return",no_controls:"No additional controls",unavailable:"Unavailable",device:"Device",cleaning:"Cleaning",docked:"Docked",returning:"Returning",idle:"Idle",paused:"Paused",error:"Error",cool:"Cool",heat:"Heat",dry:"Dry",fan_only:"Fan",auto:"Auto",off:"Off",click_to_view:"Click to view full text",editor_entity:"Entity",editor_entity_required:"* Required",editor_entity_select:"Select entity...",editor_layout:"Layout",editor_layout_standard:"Standard",editor_layout_mini:"Mini",editor_layout_bar:"Bar",editor_language:"Language",editor_language_auto:"Auto",editor_disable_popup:"Disable Popup",editor_show_buttons:"Show Buttons on Main (Button Entity IDs)",editor_show_buttons_desc:"Enter button entity IDs, comma separated",editor_filters_title:"Popup Filters",editor_filters_desc:"Use comma to separate multiple values, e.g: sensor,switch",editor_exclude_domains:"Exclude Domains",editor_include_domains:"Include Domains Only",editor_exclude_entities:"Exclude Entity IDs",editor_include_entities:"Include Entity IDs Only",editor_exclude_sensor_classes:"Exclude Sensor Classes",editor_include_sensor_classes:"Include Sensor Classes Only"},ja:{target_temp:"目標温度",target_humidity:"目標湿度",position:"位置",open:"開く",close:"閉じる",stop:"停止",start:"スタート",pause:"一時停止",return_home:"帰還",no_controls:"他のコントロールなし",unavailable:"利用不可",device:"デバイス",cleaning:"掃除中",docked:"充電中",returning:"帰還中",idle:"待機",paused:"一時停止",error:"エラー",cool:"冷房",heat:"暖房",dry:"除湿",fan_only:"送風",auto:"自動",off:"オフ",click_to_view:"クリックして全文を表示",editor_entity:"エンティティ",editor_entity_required:"* 必須",editor_entity_select:"エンティティを選択...",editor_layout:"レイアウト",editor_layout_standard:"スタンダード",editor_layout_mini:"ミニ",editor_layout_bar:"バー",editor_language:"言語",editor_language_auto:"自動",editor_disable_popup:"ポップアップを無効化",editor_show_buttons:"メイン画面にボタン表示",editor_show_buttons_desc:"ボタンエンティティIDをカンマ区切りで入力",editor_filters_title:"ポップアップフィルター",editor_filters_desc:"カンマで複数の値を区切る",editor_exclude_domains:"除外するドメイン",editor_include_domains:"含めるドメインのみ",editor_exclude_entities:"除外するエンティティID",editor_include_entities:"含めるエンティティIDのみ",editor_exclude_sensor_classes:"除外するセンサークラス",editor_include_sensor_classes:"含めるセンサークラスのみ"}},nt=K`
      :host { 
        --accent-color: #03a9f4;
        --text-primary: var(--primary-text-color);
        --text-secondary: var(--secondary-text-color);
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

      /* Text Popup */
      .text-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
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
        overflow-y: auto;
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

`,at=K`
      /* Popup Styles */
      .popup-overlay {
        position: fixed !important; 
        top: 0 !important; 
        left: 0 !important; 
        right: 0 !important; 
        bottom: 0 !important;
        background: rgba(0,0,0,0.7); 
        backdrop-filter: blur(12px);
        display: flex; 
        align-items: flex-end;
        justify-content: center; 
        z-index: 9999 !important;
        animation: fadeIn 0.3s;
        /* 重要：確保 popup 不受父元素的 transform/filter 影響 */
        transform: none !important;
        will-change: auto;
      }
      
      .popup-content {
        width: 100%; 
        max-height: 85vh; 
        background: var(--card-background-color);
        border-radius: 36px 36px 0 0; 
        padding: 20px;
        overflow-y: auto; 
        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);
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
          border-radius: 24px;
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
`;function ot(t){return{switch:"mdi:toggle-switch",light:"mdi:lightbulb",fan:"mdi:fan",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",select:"mdi:format-list-bulleted",number:"mdi:counter",button:"mdi:gesture-tap",climate:"mdi:thermostat",cover:"mdi:window-shutter",lock:"mdi:lock",humidifier:"mdi:air-humidifier",media_player:"mdi:play-circle",vacuum:"mdi:robot-vacuum",water_heater:"mdi:water-thermometer"}[t]||"mdi:circle-outline"}function rt(t){return{cool:"mdi:snowflake",heat:"mdi:fire",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:brightness-auto",off:"mdi:power"}[t]}function st(t){return{auto:"自動",low:"低速",medium:"中速",high:"高速",middle:"中速",favorite:"最愛",silent:"靜音",turbo:"強力"}[t]||t}const ct={climate:{cool:"rgba(3, 169, 244, 0.2)",heat:"rgba(255, 152, 0, 0.2)",dry:"rgba(156, 39, 176, 0.15)",fan_only:"rgba(76, 175, 80, 0.15)",auto:"rgba(0, 150, 136, 0.15)",off:"rgba(158, 158, 158, 0.1)"},light:{on:"rgba(255, 193, 7, 0.2)",off:"rgba(158, 158, 158, 0.1)"},fan:{on:"rgba(76, 175, 80, 0.2)",off:"rgba(158, 158, 158, 0.1)"},cover:{open:"rgba(3, 169, 244, 0.15)",opening:"rgba(3, 169, 244, 0.15)",closed:"rgba(158, 158, 158, 0.1)",closing:"rgba(158, 158, 158, 0.1)"},humidifier:{on:"rgba(33, 150, 243, 0.2)",off:"rgba(158, 158, 158, 0.1)"},media_player:{playing:"rgba(156, 39, 176, 0.2)",paused:"rgba(255, 152, 0, 0.15)",off:"rgba(158, 158, 158, 0.1)"},vacuum:{cleaning:"rgba(76, 175, 80, 0.2)",docked:"rgba(158, 158, 158, 0.1)",returning:"rgba(255, 152, 0, 0.15)"},water_heater:{electric:"rgba(255, 152, 0, 0.2)",gas:"rgba(255, 87, 34, 0.2)",off:"rgba(158, 158, 158, 0.1)"}};function lt(t,e){return ct[t]?.[e]||"var(--ha-card-background)"}const dt={climate:function(t,e,i="standard",n=!0){const{current_temperature:a,temperature:o,fan_mode:r,fan_modes:s}=e.attributes,c=e.state,l="mini"===i;return"bar"===i?L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${a}°C → ${o}°C</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn" @click="${()=>t._adjustTemp(-.5)}">
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button class="bar-btn" @click="${()=>t._adjustTemp(.5)}">
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
            ${n?L`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        
        <!-- HVAC Mode 快速切換 (Bar) -->
        <div class="bar-modes">
          ${["cool","heat","dry","fan_only","auto","off"].map(e=>L`
            <div class="bar-mode-chip ${c===e?"active":""}" 
                 @click="${()=>t._setClimateMode(e)}"
                 title="${t._t(e)}">
              <ha-icon icon="${rt(e)}"></ha-icon>
            </div>
          `)}
        </div>
        
        <!-- Fan Mode 快速切換 (Bar) -->
        ${s&&s.length>0?L`
          <div class="bar-fan-modes ${t._fanModeExpanded?"expanded":"collapsed"}">
            <div class="bar-fan-label" @click="${()=>t._fanModeExpanded=!t._fanModeExpanded}">
              <ha-icon icon="mdi:fan"></ha-icon>
              <span>風速</span>
              <ha-icon class="expand-icon ${t._fanModeExpanded?"expanded":""}" 
                       icon="${t._fanModeExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
            </div>
            <div class="bar-fan-options ${t._fanModeExpanded?"expanded":"collapsed"}">
              ${s.map(e=>L`
                <div class="bar-fan-chip ${r===e?"active":""}"
                     @click="${()=>t._setFanMode(e)}">
                  ${st(e)}
                </div>
              `)}
            </div>
          </div>
        `:""}
        
        ${t._renderMainButtons(i)}
      `:L`
      <div class="header ${l?"header-mini":""}">
        ${t._renderHeaderIcon(e,l)}
        <div class="device-name ${l?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${a}°C → ${o}°C</span>
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="temp-control ${l?"temp-control-mini":""}">
        <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>t._adjustTemp(-.5)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${t._t("target_temp")}</span>
          <span class="value ${l?"value-mini":""}">${o}°C</span>
        </div>
        <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>t._adjustTemp(.5)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>

      <div class="quick-modes ${l?"quick-modes-mini":""}">
        ${["cool","heat","dry","fan_only","auto","off"].map(e=>L`
          <div class="mode-item ${c===e?"active":""} ${l?"mode-item-mini":""}" 
               @click="${()=>t._setClimateMode(e)}">
            <ha-icon icon="${rt(e)}"></ha-icon>
            ${l?"":L`<span class="mode-label">${t._t(e)}</span>`}
          </div>
        `)}
      </div>
      
      <!-- Fan Mode 控制 (Standard/Mini) -->
      ${s&&s.length>0?L`
        <div class="fan-mode-section ${l?"fan-mode-mini":""}">
          <div class="fan-mode-label" @click="${()=>t._fanModeExpanded=!t._fanModeExpanded}">
            <ha-icon icon="mdi:fan"></ha-icon>
            ${l?"":L`<span>風速</span>`}
            <ha-icon class="expand-icon ${t._fanModeExpanded?"expanded":""}" 
                     icon="${t._fanModeExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
          </div>
          <div class="fan-mode-options ${l?"fan-mode-options-mini":""} ${t._fanModeExpanded?"expanded":"collapsed"}">
            ${s.map(e=>L`
              <div class="fan-mode-chip ${r===e?"active":""} ${l?"fan-mode-chip-mini":""}"
                   @click="${()=>t._setFanMode(e)}">
                ${st(e)}
              </div>
            `)}
          </div>
        </div>
      `:""}
      
      ${t._renderMainButtons(i)}
    `},light:function(t,e,i="standard",n=!0){const a="on"===e.state,o=e.attributes.brightness||0,r=Math.round(o/255*100),s="bar"===i,c="mini"===i,l=void 0!==e.attributes.brightness;return s?L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              ${a&&l?L`
                <div class="bar-slider-container" @click="${e=>{e.stopPropagation(),t._handleSliderClick(e,"light")}}">
                  <div class="bar-slider-bg bar-slider-light" style="--slider-value: ${r}%"></div>
                  <div class="bar-slider-text">${r}%</div>
                </div>
              `:L`
                <div class="bar-state">${a?t._t("on"):t._t("off")}</div>
              `}
            </div>
          </div>
          <div class="bar-right">
            ${a&&l?L`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>t._adjustBrightness(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>t._adjustBrightness(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            <div class="bar-controls">
              <button class="bar-toggle ${a?"bar-toggle-on":""}" @click="${()=>t._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${t._renderHeaderAction(n)}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:L`
      <div class="header ${c?"header-mini":""}">
        ${t._renderHeaderIcon(e,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${a&&l?`${r}%`:a?t._t("on"):t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${a?"on":""} ${c?"power-btn-mini":""}" 
                @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:lightbulb${a?"":"-outline"}"></ha-icon>
          ${c?"":L`<span class="mode-label">${a?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${a&&l?L`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>t._adjustBrightness(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display" style="cursor: pointer;" @click="${e=>t._handleSliderClick(e,"light")}">
            <span class="label">${t._t("brightness")}</span>
            <span class="value ${c?"value-mini":""}">${r}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>t._adjustBrightness(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      
      ${t._renderMainButtons(i)}
    `},fan:function(t,e,i="standard",n=!0){const a="on"===e.state,o=e.attributes.percentage||0,r=e.attributes.preset_modes||[],s=e.attributes.preset_mode,c="mini"===i;return"bar"===i?L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${a?`${o}%`:t._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            ${a&&void 0!==o?L`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>t._adjustFanSpeed(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>t._adjustFanSpeed(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            <div class="bar-controls">
              <button class="bar-toggle ${a?"bar-toggle-on":""}" @click="${()=>t._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${n?L`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        
        <!-- Fan Preset Modes (Bar) -->
        ${r.length>0?L`
          <div class="bar-modes">
            ${r.map(e=>{return L`
              <div class="bar-mode-chip ${s===e?"active":""}" 
                   @click="${()=>t._setFanPresetMode(e)}"
                   title="${e}">
                <span class="bar-mode-text">${i=e,{auto:"自動",smart:"智慧",sleep:"睡眠",nature:"自然",normal:"正常",low:"低速",medium:"中速",high:"高速",turbo:"強力",quiet:"靜音",breeze:"微風",favorite:"最愛"}[i]||i}</span>
              </div>
            `;var i})}
          </div>
        `:""}
        
        ${t._renderMainButtons(i)}
      `:L`
      <div class="header ${c?"header-mini":""}">
        ${t._renderHeaderIcon(e,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${a?`${o}%`:t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${a?"on":""} ${c?"power-btn-mini":""}" @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:fan"></ha-icon>
          ${c?"":L`<span class="mode-label">${a?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${a?L`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>t._adjustFanSpeed(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">風速</span>
            <span class="value ${c?"value-mini":""}">${o}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>t._adjustFanSpeed(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${t._renderMainButtons(i)}
    `},cover:function(t,e,i="standard",n=!0){const a=e.attributes.current_position||0;e.state;const o="mini"===i;return"bar"===i?L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${a}%</div>
            </div>
          </div>
          <div class="bar-right">
            ${void 0!==e.attributes.current_position?L`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>t._adjustCoverPosition(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>t._adjustCoverPosition(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            <div class="bar-controls">
              <button class="bar-btn-small" @click="${()=>t._callService("cover","open_cover")}">
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${()=>t._callService("cover","stop_cover")}">
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${()=>t._callService("cover","close_cover")}">
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </div>
            ${n?L`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:L`
      <div class="header ${o?"header-mini":""}">
        ${t._renderHeaderIcon(e,o)}
        <div class="device-name ${o?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          ${void 0!==e.attributes.current_position?L`<span class="device-value">${a}%</span>`:""}
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="cover-controls ${o?"cover-controls-mini":""}">
        <button class="cover-btn ${o?"cover-btn-mini":""}" @click="${()=>t._callService("cover","open_cover")}">
          <ha-icon icon="mdi:arrow-up"></ha-icon>
          <span>${t._t("open")}</span>
        </button>
        <button class="cover-btn ${o?"cover-btn-mini":""}" @click="${()=>t._callService("cover","stop_cover")}">
          <ha-icon icon="mdi:stop"></ha-icon>
          <span>${t._t("stop")}</span>
        </button>
        <button class="cover-btn ${o?"cover-btn-mini":""}" @click="${()=>t._callService("cover","close_cover")}">
          <ha-icon icon="mdi:arrow-down"></ha-icon>
          <span>${t._t("close")}</span>
        </button>
      </div>

      ${void 0!==e.attributes.current_position?L`
        <div class="temp-control ${o?"temp-control-mini":""}">
          <button class="adj-btn ${o?"adj-btn-mini":""}" @click="${()=>t._adjustCoverPosition(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">${t._t("position")}</span>
            <span class="value ${o?"value-mini":""}">${a}%</span>
          </div>
          <button class="adj-btn ${o?"adj-btn-mini":""}" @click="${()=>t._adjustCoverPosition(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${t._renderMainButtons(i)}
    `},humidifier:function(t,e,i="standard",n=!0){const a="on"===e.state,o=e.attributes.humidity||0,r="mini"===i;return"bar"===i?L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${a?`${o}%`:t._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-toggle ${a?"bar-toggle-on":""}" @click="${()=>t._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${n?L`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:L`
      <div class="header ${r?"header-mini":""}">
        ${t._renderHeaderIcon(e,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${a?`${o}%`:t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="main-control ${r?"main-control-mini":""}">
        <button class="power-btn ${a?"on":""} ${r?"power-btn-mini":""}" @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:air-humidifier"></ha-icon>
          ${r?"":L`<span class="mode-label">${a?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${a?L`
        <div class="temp-control ${r?"temp-control-mini":""}">
          <div style="width: 64px;"></div>
          <div class="target-display">
            <span class="label">${t._t("target_humidity")}</span>
            <span class="value ${r?"value-mini":""}">${o}%</span>
          </div>
          <div style="width: 64px;"></div>
        </div>
      `:""}
      ${t._renderMainButtons(i)}
    `},media_player:function(t,e,i="standard",n=!0){const a=e.state,o=e.attributes.media_title||"No Media",r=e.attributes.media_artist||"",s="mini"===i;if("bar"===i)return L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"playing"===a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i,15)}</div>
              <div class="bar-state">${t._renderTitle(o,i,25)}</div>
            </div>
          </div>
          <div class="bar-right">
            ${void 0!==e.attributes.volume_level?L`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>t._adjustVolume(-5)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="bar-value">${Math.round(100*e.attributes.volume_level)}%</span>
                <button class="bar-btn" @click="${()=>t._adjustVolume(5)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            <div class="bar-controls">
              <button class="bar-btn-small" @click="${()=>t._callService("media_player","media_previous_track")}">
                <ha-icon icon="mdi:skip-previous"></ha-icon>
              </button>
              <button class="bar-toggle ${"playing"===a?"bar-toggle-on":""}" 
                      @click="${()=>t._callService("media_player","playing"===a?"media_pause":"media_play")}">
                <ha-icon icon="mdi:${"playing"===a?"pause":"play"}"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${()=>t._callService("media_player","media_next_track")}">
                <ha-icon icon="mdi:skip-next"></ha-icon>
              </button>
            </div>
            ${n?L`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `;const c=void 0!==e.attributes.volume_level?Math.round(100*e.attributes.volume_level):0;return L`
      <div class="header ${s?"header-mini":""}">
        ${t._renderHeaderIcon(e,s)}
        <div class="device-name ${s?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          ${L`<span class="device-value">${t._renderTitle(o,i,28)}</span>`}
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="media-info ${s?"media-info-mini":""}">
        <div class="media-title ${s?"media-title-mini":""}">${t._renderTitle(o,i,30)}</div>
        ${r&&!s?L`<div class="media-artist">${t._renderTitle(r,i,30)}</div>`:""}
      </div>

      <div class="media-controls ${s?"media-controls-mini":""}">
        <button class="media-btn ${s?"media-btn-mini":""}" @click="${()=>t._callService("media_player","media_previous_track")}">
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        <button class="media-btn primary ${s?"media-btn-mini":""}" @click="${()=>t._callService("media_player","playing"===a?"media_pause":"media_play")}">
          <ha-icon icon="mdi:${"playing"===a?"pause":"play"}"></ha-icon>
        </button>
        <button class="media-btn ${s?"media-btn-mini":""}" @click="${()=>t._callService("media_player","media_next_track")}">
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>

      ${void 0!==e.attributes.volume_level?L`
        <div class="temp-control ${s?"temp-control-mini":""}">
          <button class="adj-btn ${s?"adj-btn-mini":""}" @click="${()=>t._adjustVolume(-5)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">音量</span>
            <span class="value ${s?"value-mini":""}">${c}%</span>
          </div>
          <button class="adj-btn ${s?"adj-btn-mini":""}" @click="${()=>t._adjustVolume(5)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}

      ${t._renderMainButtons(i)}
    `},vacuum:function(t,e,i="standard",n=!0){const a=e.state,o=e.attributes.battery_level||0,r="mini"===i;return"bar"===i?L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"cleaning"===a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${t._getVacuumStateText(a)} · ${o}%</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn-small" @click="${()=>t._callService("vacuum","start")}">
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${()=>t._callService("vacuum","pause")}">
                <ha-icon icon="mdi:pause"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${()=>t._callService("vacuum","return_to_base")}">
                <ha-icon icon="mdi:home"></ha-icon>
              </button>
            </div>
            ${n?L`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:L`
      <div class="header ${r?"header-mini":""}">
        ${t._renderHeaderIcon(e,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${t._getVacuumStateText(a)} · ${o}%</span>
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="vacuum-status ${r?"vacuum-status-mini":""}">
        <div class="status-badge ${r?"status-badge-mini":""}">${t._getVacuumStateText(a)}</div>
        <div class="battery-display ${r?"battery-display-mini":""}">
          <ha-icon icon="mdi:battery${o>90?"":o>50?"-50":"-20"}"></ha-icon>
          <span>${o}%</span>
        </div>
      </div>

      <div class="vacuum-controls ${r?"vacuum-controls-mini":""}">
        <button class="vacuum-btn ${r?"vacuum-btn-mini":""}" @click="${()=>t._callService("vacuum","start")}">
          <ha-icon icon="mdi:play"></ha-icon>
          <span>${t._t("start")}</span>
        </button>
        <button class="vacuum-btn ${r?"vacuum-btn-mini":""}" @click="${()=>t._callService("vacuum","pause")}">
          <ha-icon icon="mdi:pause"></ha-icon>
          <span>${t._t("pause")}</span>
        </button>
        <button class="vacuum-btn ${r?"vacuum-btn-mini":""}" @click="${()=>t._callService("vacuum","return_to_base")}">
          <ha-icon icon="mdi:home"></ha-icon>
          <span>${t._t("return_home")}</span>
        </button>
      </div>
      ${t._renderMainButtons(i)}
    `},water_heater:function(t,e,i="standard",n=!0){const a=e.attributes.temperature||0,o=e.attributes.current_temperature||0,r="mini"===i;return"bar"===i?L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${o}°C → ${a}°C</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn" @click="${()=>t._adjustWaterTemp(-1)}">
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button class="bar-btn" @click="${()=>t._adjustWaterTemp(1)}">
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
            ${n?L`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:L`
      <div class="header ${r?"header-mini":""}">
        ${t._renderHeaderIcon(e,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${o}°C → ${a}°C</span>
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="temp-control ${r?"temp-control-mini":""}">
        <button class="adj-btn ${r?"adj-btn-mini":""}" @click="${()=>t._adjustWaterTemp(-1)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${t._t("target_temp")}</span>
          <span class="value ${r?"value-mini":""}">${a}°C</span>
        </div>
        <button class="adj-btn ${r?"adj-btn-mini":""}" @click="${()=>t._adjustWaterTemp(1)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${t._renderMainButtons(i)}
    `},generic:function(t,e,i="standard",n=!0){const a="mini"===i;return"bar"===i?L`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${e.state}</div>
            </div>
          </div>
          <div class="bar-right">
            ${n?L`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:L`
      <div class="header ${a?"header-mini":""}">
        ${t._renderHeaderIcon(e,a)}
        <div class="device-name ${a?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${e.state}</span>
        </div>
        ${t._renderHeaderAction(n)}
      </div>

      <div class="temp-control ${a?"temp-control-mini":""}">
        <div style="width: 64px;"></div>
        <div class="target-display">
          <span class="label">${t._t("device")}</span>
          <span class="value ${a?"value-mini":""}">${e.state}</span>
        </div>
        <div style="width: 64px;"></div>
      </div>
      ${t._renderMainButtons(i)}
    `}};customElements.define("universal-device-card",class extends tt{static get properties(){return{hass:{},config:{},_showPopup:{type:Boolean},_showTextPopup:{type:Boolean},_popupText:{type:String},_translations:{type:Object},_fanModeExpanded:{type:Boolean}}}constructor(){super(),this._showPopup=!1,this._showTextPopup=!1,this._popupText="",this._translations={},this._fanModeExpanded=!1,this._iconLongPressTimer=null,this._iconLongPressFired=!1,this._iconLastTapTime=0}async connectedCallback(){super.connectedCallback(),await this._loadTranslations(),this._createPopupPortal()}disconnectedCallback(){super.disconnectedCallback(),this._removePopupPortal()}_createPopupPortal(){if(!this._popupPortal){this._popupPortal=document.createElement("div"),this._popupPortal.className="udc-popup-portal";const t=this._isInBubbleCardPopup(),e=t?1e4:1e3;this._popupPortal.style.cssText=`position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: ${e};`;const i=document.createElement("style");i.textContent=function(t=!1){return`\n      .popup-overlay {\n        position: fixed !important; \n        top: 0 !important; \n        left: 0 !important; \n        right: 0 !important; \n        bottom: 0 !important;\n        background: rgba(0,0,0,0.7); \n        backdrop-filter: blur(12px);\n        display: flex; \n        align-items: flex-end;\n        justify-content: center; \n        z-index: ${t?1e4:1e3} !important;\n        animation: fadeIn 0.3s;\n        transform: none !important;\n        will-change: auto;\n      }\n      \n      .popup-content {\n        width: 100%; \n        max-height: 85vh; \n        background: var(--card-background-color, #fff);\n        border-radius: 36px 36px 0 0; \n        padding: 20px;\n        overflow-y: auto; \n        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);\n        color: var(--primary-text-color, #000);\n        scrollbar-width: thin;\n        scrollbar-color: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.3) transparent;\n      }\n\n      .popup-content::-webkit-scrollbar {\n        width: 6px;\n      }\n\n      .popup-content::-webkit-scrollbar-track {\n        background: transparent;\n        border-radius: 10px;\n      }\n\n      .popup-content::-webkit-scrollbar-thumb {\n        background: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.3);\n        border-radius: 10px;\n        transition: background 0.3s;\n      }\n\n      .popup-content::-webkit-scrollbar-thumb:hover {\n        background: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.5);\n      }\n\n      .popup-content.hide-scrollbar {\n        scrollbar-width: none;\n        -ms-overflow-style: none;\n      }\n\n      .popup-content.hide-scrollbar::-webkit-scrollbar {\n        display: none;\n      }\n\n      @media (min-width: 768px) {\n        .popup-overlay {\n          align-items: center;\n          padding: 20px;\n        }\n\n        .popup-content {\n          max-width: 600px;\n          width: 90%;\n          max-height: 80vh;\n          border-radius: 24px;\n          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n          animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);\n        }\n\n        .popup-content::-webkit-scrollbar {\n          width: 8px;\n        }\n\n        @keyframes scaleIn {\n          from {\n            opacity: 0;\n            transform: scale(0.9);\n          }\n          to {\n            opacity: 1;\n            transform: scale(1);\n          }\n        }\n      }\n      \n      .popup-header {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        margin-bottom: 24px;\n      }\n      \n      .popup-drag-handle { \n        width: 50px; \n        height: 5px; \n        background: rgba(128, 128, 128, 0.2); \n        border-radius: 3px; \n      }\n      \n      .close-btn {\n        position: absolute;\n        right: 0;\n        cursor: pointer;\n        color: var(--secondary-text-color, #666);\n        padding: 4px;\n        transition: color 0.3s;\n        font-size: 24px;\n        width: 32px;\n        height: 32px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .close-btn:hover {\n        color: var(--primary-text-color, #000);\n      }\n\n      .chips-container { \n        display: flex; \n        flex-wrap: wrap; \n        gap: 10px; \n        margin-bottom: 20px;\n      }\n      \n      .chip { \n        padding: 10px 16px; \n        border-radius: 20px; \n        background: rgba(128, 128, 128, 0.1); \n        display: flex; \n        align-items: center; \n        gap: 8px; \n        font-size: 0.9rem;\n      }\n\n      .chip-unavailable {\n        opacity: 0.5;\n      }\n\n      .chip ha-icon {\n        width: 20px;\n        height: 20px;\n      }\n\n      .controls-list {\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n      }\n\n      .control-card {\n        background: rgba(128, 128, 128, 0.05);\n        border-radius: 16px;\n        padding: 16px;\n      }\n\n      .control-card-unavailable {\n        opacity: 0.5;\n      }\n\n      .control-header {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        margin-bottom: 12px;\n        font-weight: 600;\n      }\n\n      .control-header ha-icon {\n        width: 24px;\n        height: 24px;\n      }\n\n      .unavailable-badge {\n        margin-left: auto;\n        padding: 4px 12px;\n        background: rgba(255, 152, 0, 0.2);\n        color: #ff9800;\n        border-radius: 12px;\n        font-size: 0.75rem;\n      }\n\n      .control-action {\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n      }\n\n      .select-grid {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));\n        gap: 8px;\n      }\n\n      .select-opt {\n        padding: 10px;\n        border-radius: 12px;\n        background: rgba(128, 128, 128, 0.1);\n        text-align: center;\n        cursor: pointer;\n        transition: all 0.3s;\n        font-size: 0.9rem;\n      }\n\n      .select-opt:hover:not(.disabled) {\n        background: rgba(128, 128, 128, 0.2);\n      }\n\n      .select-opt.active {\n        background: var(--accent-color, #03a9f4);\n        color: white;\n      }\n\n      .select-opt.disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .number-control {\n        display: flex;\n        align-items: center;\n        gap: 16px;\n      }\n\n      .number-control button {\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        border: none;\n        background: rgba(128, 128, 128, 0.1);\n        cursor: pointer;\n        transition: all 0.3s;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .number-control button:hover:not(:disabled) {\n        background: rgba(128, 128, 128, 0.2);\n        transform: scale(1.1);\n      }\n\n      .number-control button:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .number-control button ha-icon {\n        width: 20px;\n        height: 20px;\n      }\n\n      .number-control span {\n        min-width: 50px;\n        text-align: center;\n        font-weight: 600;\n      }\n\n      .action-btn {\n        width: 48px;\n        height: 48px;\n        border-radius: 50%;\n        border: none;\n        background: var(--accent-color, #03a9f4);\n        color: white;\n        cursor: pointer;\n        transition: all 0.3s;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .action-btn:hover:not(:disabled) {\n        transform: scale(1.1);\n      }\n\n      .action-btn:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n        background: rgba(128, 128, 128, 0.3);\n      }\n\n      .action-btn ha-icon {\n        width: 24px;\n        height: 24px;\n      }\n\n      .state-text {\n        padding: 8px 16px;\n        background: rgba(128, 128, 128, 0.1);\n        border-radius: 12px;\n        font-size: 0.9rem;\n      }\n\n      .unavailable-text {\n        color: #ff9800;\n      }\n\n      .no-controls {\n        text-align: center;\n        padding: 40px 20px;\n        color: var(--secondary-text-color, #666);\n        font-size: 1rem;\n      }\n\n      @keyframes fadeIn {\n        from { opacity: 0; }\n        to { opacity: 1; }\n      }\n\n      @keyframes slideUp {\n        from {\n          transform: translateY(100%);\n        }\n        to {\n          transform: translateY(0);\n        }\n      }\n\n      ha-switch {\n        --mdc-theme-secondary: var(--accent-color, #03a9f4);\n      }\n\n      ha-icon {\n        color: var(--primary-text-color, #000);\n      }\n    `}(t),this._popupPortal.appendChild(i),document.body.appendChild(this._popupPortal)}}_isInBubbleCardPopup(){let t=this;for(;t&&t.parentNode;){if(t=t.parentNode,t.host&&(t=t.host),t.classList){if(Array.from(t.classList).some(t=>t.includes("bubble")||t.includes("popup-container")))return!0}if("BUBBLE-CARD"===t.tagName||"BUBBLE-POP-UP"===t.tagName)return!0}return!1}_removePopupPortal(){this._popupPortal&&this._popupPortal.parentNode&&(this._popupPortal.parentNode.removeChild(this._popupPortal),this._popupPortal=null)}async _loadTranslations(){const t=this.config?.language||this.hass?.language||"en";if(this._translations=it[t]||it.en,"auto"!==t)try{const e=await fetch(`${et()}${t}.json`);if(e.ok){const i=await e.json();this._translations={...this._translations,...i},console.log(`Loaded external translations for ${t}`)}}catch(e){console.log(`Using default translations for ${t}`)}}_t(t){return this._translations[t]||it.en[t]||t}static getConfigElement(){return document.createElement("universal-device-card-editor")}static getStubConfig(){return{entity:"",layout:"standard",language:"auto",disable_popup:!1,show_buttons:[]}}_getDeviceType(){return this.config.entity.split(".")[0]}_shouldFilterEntity(t){const e=this.config.popup_filters||{},i=t.entity_id,n=i.split(".")[0];if(e.exclude_domains&&e.exclude_domains.includes(n))return!0;if(e.include_domains&&!e.include_domains.includes(n))return!0;if(e.exclude_entities&&e.exclude_entities.includes(i))return!0;if(e.include_entities&&!e.include_entities.includes(i))return!0;if("sensor"===n&&e.exclude_sensor_classes){const i=t.attributes.device_class;if(i&&e.exclude_sensor_classes.includes(i))return!0}if("sensor"===n&&e.include_sensor_classes){const i=t.attributes.device_class;if(!i||!e.include_sensor_classes.includes(i))return!0}return!1}_getStateColor(){const t=this.hass.states[this.config.entity];return t?lt(this._getDeviceType(),t.state):"var(--ha-card-background)"}_getRelatedEntities(){if(!0===this.config.disable_popup)return[];const t=this.hass.entities[this.config.entity];if(!t)return[];const e=t.device_id;return Object.values(this.hass.states).filter(t=>{const i=this.hass.entities[t.entity_id];return i&&i.device_id===e&&t.entity_id!==this.config.entity}).filter(t=>!this._shouldFilterEntity(t))}_isEntityAvailable(t){return"unavailable"!==t.state&&"unknown"!==t.state}_getMainButtons(){return this.config.show_buttons&&Array.isArray(this.config.show_buttons)?this.config.show_buttons.map(t=>this.hass.states[t]).filter(t=>void 0!==t):[]}_showTextDialog(t){this._popupText=t,this._showTextPopup=!0}render(){const t=this.hass.states[this.config.entity];if(!t)return L`<ha-card>???????/ha-card>`;const e=this._getStateColor(),i=this._getDeviceType(),n=this.config.layout||"standard",a=!0!==this.config.disable_popup;return L`
      <ha-card class="main-container ${n}-layout" 
               style="background-color: ${e}">
        ${this._renderDeviceSpecificContent(t,i,n,a)}
        ${this._showTextPopup?this._renderTextPopup():""}
      </ha-card>
    `}updated(t){super.updated(t),this.hass&&this.config?.entity&&(this._services=function(t,e){if(!t||!e)return null;const i=e;return{callService(e,n,a={}){t.callService(e,n,{entity_id:i,...a})},toggle(e=i){t.callService("homeassistant","toggle",{entity_id:e})},setSelect(e,i){t.callService("select","select_option",{entity_id:e,option:i})},adjustNumber(e,i){const n=t.states[e];if(!n)return;const a=parseFloat(n.state),o=n.attributes.step||1,r=n.attributes.min,s=n.attributes.max;let c=a+i*o;void 0!==r&&(c=Math.max(r,c)),void 0!==s&&(c=Math.min(s,c));const l="number"===e.split(".")[0]?"number":"input_number";t.callService(l,"set_value",{entity_id:e,value:c})},pressButton(e){t.callService("button","press",{entity_id:e})},adjustTemp(e){const n=t.states[i].attributes.temperature+e;t.callService("climate","set_temperature",{entity_id:i,temperature:n})},setClimateMode(e){t.callService("climate","set_hvac_mode",{entity_id:i,hvac_mode:e})},setFanMode(e){t.callService("climate","set_fan_mode",{entity_id:i,fan_mode:e})},setBrightness(e){const n=Math.round(e/100*255);t.callService("light","turn_on",{entity_id:i,brightness:n})},setFanSpeed(e){t.callService("fan","set_percentage",{entity_id:i,percentage:parseInt(e)})},setCoverPosition(e){t.callService("cover","set_cover_position",{entity_id:i,position:parseInt(e)})},setVolume(e){t.callService("media_player","volume_set",{entity_id:i,volume_level:e/100})},setFanPresetMode(e){t.callService("fan","set_preset_mode",{entity_id:i,preset_mode:e})},setWaterHeaterTemp(e){t.callService("water_heater","set_temperature",{entity_id:i,temperature:e})},adjustWaterTemp(e){const n=t.states[i].attributes.temperature+e;t.callService("water_heater","set_temperature",{entity_id:i,temperature:n})}}}(this.hass,this.config.entity)),t.has("_showPopup")&&this._updatePopupPortal()}_updatePopupPortal(){if(this._popupPortal)if(this._showPopup&&!this.config.disable_popup)this._popupPortal.style.pointerEvents="auto",this._renderPopupToPortal();else{this._popupPortal.style.pointerEvents="none";const t=this._popupPortal.querySelector(".popup-overlay");t&&t.remove()}}_renderPopupToPortal(){const t=this._getRelatedEntities(),e=t.filter(t=>t.entity_id.startsWith("sensor")),i=t.filter(t=>!t.entity_id.startsWith("sensor")),n=document.createElement("div");n.className="popup-overlay",n.addEventListener("click",t=>{t.target===n&&(this._showPopup=!1,this.requestUpdate())});const a=document.createElement("div"),o=!0===this.config?.hide_popup_scrollbar;a.className=o?"popup-content hide-scrollbar":"popup-content",a.addEventListener("click",t=>t.stopPropagation());const r=document.createElement("div");if(r.className="popup-header",r.innerHTML='\n      <div class="popup-drag-handle"></div>\n      <ha-icon class="close-btn" icon="mdi:close"></ha-icon>\n    ',r.querySelector(".close-btn").addEventListener("click",()=>{this._showPopup=!1,this.requestUpdate()}),a.appendChild(r),e.length>0){const t=document.createElement("div");t.className="chips-container",e.forEach(e=>{const i=this._isEntityAvailable(e),n=document.createElement("div");n.className="chip "+(i?"":"chip-unavailable"),n.innerHTML=`\n          <ha-icon icon="${e.attributes.icon||"mdi:information-outline"}"></ha-icon>\n          <span>${i?`${e.state} ${e.attributes.unit_of_measurement||""}`:this._t("unavailable")}</span>\n        `,t.appendChild(n)}),a.appendChild(t)}if(i.length>0){const t=document.createElement("div");t.className="controls-list",i.forEach(e=>{const i=this._createControlCardElement(e);t.appendChild(i)}),a.appendChild(t)}else{const t=document.createElement("div");t.className="no-controls",t.textContent=this._t("no_controls"),a.appendChild(t)}n.appendChild(a);const s=this._popupPortal.querySelector(".popup-overlay");s&&s.remove(),this._popupPortal.appendChild(n)}_createControlCardElement(t){const e=t.entity_id.split(".")[0],i=this._isEntityAvailable(t),n=document.createElement("div");n.className="control-card "+(i?"":"control-card-unavailable");const a=document.createElement("div");a.className="control-header",a.innerHTML=`\n      <ha-icon icon="${t.attributes.icon||ot(e)}"></ha-icon>\n      <span>${t.attributes.friendly_name}</span>\n      ${i?"":`<span class="unavailable-badge">${this._t("unavailable")}</span>`}\n    `;const o=document.createElement("div");return o.className="control-action",i?this._populateControlAction(o,t,e):o.innerHTML=`<span class="state-text unavailable-text">${t.state}</span>`,n.appendChild(a),n.appendChild(o),n}_populateControlAction(t,e,i){!function(t,e,i,n){const a=n.isEntityAvailable(e);switch(i){case"switch":case"input_boolean":{const i=document.createElement("ha-switch");i.checked="on"===e.state,i.disabled=!a,i.addEventListener("change",()=>a&&n.toggle(e.entity_id)),t.appendChild(i);break}case"select":case"input_select":{const i=document.createElement("div");i.className="select-grid",(e.attributes.options||[]).forEach(t=>{const o=document.createElement("div");o.className=`select-opt ${e.state===t?"active":""} ${a?"":"disabled"}`,o.textContent=t,o.addEventListener("click",()=>a&&n.setSelect(e.entity_id,t)),i.appendChild(o)}),t.appendChild(i);break}case"number":case"input_number":{const i=document.createElement("div");i.className="number-control",i.innerHTML=`\n        <button ${a?"":"disabled"}><ha-icon icon="mdi:minus"></ha-icon></button>\n        <span>${e.state}</span>\n        <button ${a?"":"disabled"}><ha-icon icon="mdi:plus"></ha-icon></button>\n      `,i.querySelectorAll("button")[0].addEventListener("click",()=>a&&n.adjustNumber(e.entity_id,-1)),i.querySelectorAll("button")[1].addEventListener("click",()=>a&&n.adjustNumber(e.entity_id,1)),t.appendChild(i);break}case"button":{const i=document.createElement("button");i.className="action-btn",i.disabled=!a,i.innerHTML='<ha-icon icon="mdi:gesture-tap"></ha-icon>',i.addEventListener("click",()=>a&&n.pressButton(e.entity_id)),t.appendChild(i);break}default:t.innerHTML=`<span class="state-text">${e.state}</span>`}}(t,e,i,{toggle:t=>this._toggleEntity(t),setSelect:(t,e)=>this._setSelect(t,e),adjustNumber:(t,e)=>this._adjustNumber(t,e),pressButton:t=>this._pressButton(t),isEntityAvailable:t=>this._isEntityAvailable(t)})}_renderTextPopup(){return L`
      <div class="text-popup-overlay" @click="${()=>this._showTextPopup=!1}">
        <div class="text-popup-content" @click="${t=>t.stopPropagation()}">
          <div class="text-popup-header">
            <ha-icon class="close-btn" icon="mdi:close" @click="${()=>this._showTextPopup=!1}"></ha-icon>
          </div>
          <div class="text-popup-body">${this._popupText}</div>
        </div>
      </div>
    `}_renderDeviceSpecificContent(t,e,i="standard",n=!0){return(dt[e]||dt.generic)(this,t,i,n)}_renderMainButtons(t){const e=this._getMainButtons();if(0===e.length)return"";const i="bar"===t;return L`
      <div class="main-buttons ${i?"main-buttons-bar":""}">
        ${e.map(t=>{const e=this._isEntityAvailable(t);return L`
            <button 
              class="main-button ${e?"":"disabled"}"
              ?disabled="${!e}"
              @click="${()=>e&&this._pressButton(t.entity_id)}"
              title="${t.attributes.friendly_name}">
              <ha-icon icon="${t.attributes.icon||"mdi:gesture-tap"}"></ha-icon>
              ${i?"":L`<span>${t.attributes.friendly_name}</span>`}
            </button>
          `})}
      </div>
    `}_renderTitle(t,e,i=20){return t?L`
      <span class="title-scroll-wrap" title="${t}">
        <span class="title-text">${t}</span>
      </span>
    `:""}_renderPopup(){const t=this._getRelatedEntities(),e=t.filter(t=>t.entity_id.startsWith("sensor")),i=t.filter(t=>!t.entity_id.startsWith("sensor"));return L`
      <div class="popup-overlay" @click="${()=>this._showPopup=!1}">
        <div class="popup-content" @click="${t=>t.stopPropagation()}">
          <div class="popup-header">
            <div class="popup-drag-handle"></div>
            <ha-icon class="close-btn" icon="mdi:close" @click="${()=>this._showPopup=!1}"></ha-icon>
          </div>
          
          ${e.length>0?L`
            <div class="chips-container">
              ${e.map(t=>{const e=this._isEntityAvailable(t);return L`
                  <div class="chip ${e?"":"chip-unavailable"}">
                    <ha-icon icon="${t.attributes.icon||"mdi:information-outline"}"></ha-icon>
                    <span>${e?`${t.state} ${t.attributes.unit_of_measurement||""}`:this._t("unavailable")}</span>
                  </div>
                `})}
            </div>
          `:""}

          ${i.length>0?L`
            <div class="controls-list">
              ${i.map(t=>this._renderControlCard(t))}
            </div>
          `:L`<div class="no-controls">${this._t("no_controls")}</div>`}
        </div>
      </div>
    `}_renderControlCard(t){const e=t.entity_id.split(".")[0],i=this._isEntityAvailable(t);return L`
      <div class="control-card ${i?"":"control-card-unavailable"}">
        <div class="control-header">
          <ha-icon icon="${t.attributes.icon||ot(e)}"></ha-icon>
          <span>${t.attributes.friendly_name}</span>
          ${i?"":L`<span class="unavailable-badge">${this._t("unavailable")}</span>`}
        </div>
        
        <div class="control-action">
          ${i?this._renderControlAction(t,e):L`
            <span class="state-text unavailable-text">${t.state}</span>
          `}
        </div>
      </div>
    `}_renderControlAction(t,e){return function(t,e,i){const{html:n,toggle:a,setSelect:o,adjustNumber:r,pressButton:s,isEntityAvailable:c}=t,l=c(e);switch(i){case"switch":case"input_boolean":return n`
        <ha-switch 
          .checked="${"on"===e.state}"
          .disabled="${!l}"
          @change="${()=>l&&a(e.entity_id)}">
        </ha-switch>
      `;case"select":case"input_select":return n`
        <div class="select-grid">
          ${(e.attributes.options||[]).map(t=>n`
            <div class="select-opt ${e.state===t?"active":""} ${l?"":"disabled"}" 
                 @click="${()=>l&&o(e.entity_id,t)}">
              ${t}
            </div>
          `)}
        </div>
      `;case"number":case"input_number":return n`
        <div class="number-control">
          <button ?disabled="${!l}" @click="${()=>l&&r(e.entity_id,-1)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span>${e.state}</span>
          <button ?disabled="${!l}" @click="${()=>l&&r(e.entity_id,1)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `;case"button":return n`
        <button class="action-btn" ?disabled="${!l}" @click="${()=>l&&s(e.entity_id)}">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
        </button>
      `;default:return n`<span class="state-text">${e.state}</span>`}}({html:L,toggle:t=>this._toggleEntity(t),setSelect:(t,e)=>this._setSelect(t,e),adjustNumber:(t,e)=>this._adjustNumber(t,e),pressButton:t=>this._pressButton(t),isEntityAvailable:t=>this._isEntityAvailable(t)},t,e)}_setFanPresetMode(t){this._services?.setFanPresetMode(t)}_getVacuumStateText(t){return this._t(t)||t}_toggleEntity(t=this.config.entity){this._services?.toggle(t)}_callService(t,e){this._services?.callService(t,e)}_setSelect(t,e){this._services?.setSelect(t,e)}_adjustNumber(t,e){this._services?.adjustNumber(t,e)}_pressButton(t){this._services?.pressButton(t)}_openMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this.config.entity}}))}_fireHaptic(t="medium"){"undefined"!=typeof navigator&&navigator.vibrate&&navigator.vibrate("heavy"===t?[20,40,20]:[15,30,15]),this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:{type:t}}))}_onIconPointerDown(t){this._iconLongPressFired=!1,this._iconLongPressTarget=t.currentTarget,this._iconLongPressTimer=setTimeout(()=>{this._iconLongPressTimer=null,this._iconLongPressFired=!0,this._fireHaptic("medium"),this._iconLongPressTarget&&(this._iconLongPressTarget.classList.add("icon-longpress-active"),setTimeout(()=>{this._iconLongPressTarget&&this._iconLongPressTarget.classList.remove("icon-longpress-active")},200)),this._openMoreInfo()},500)}_onIconPointerUp(){if(this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null,this._iconLongPressFired)return void(this._iconLongPressFired=!1);const t=Date.now();if(this._iconLastTapTime&&t-this._iconLastTapTime<400)return this._iconLastTapTime=0,this._fireHaptic("light"),void this._openMoreInfo();this._iconLastTapTime=t,this._toggleEntity()}_onIconPointerLeave(){this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null}_renderHeaderIcon(t,e=!1){if(!t)return"";const i=this._getDeviceType(),n=t.attributes?.icon||ot(i),a=lt(i,t.state),o="var(--ha-card-background)"!==a&&a.startsWith("rgba")?a.replace(/[\d.]+\)$/,"1)"):"";return L`
      <div class="header-icon ${e?"header-icon-mini":""} entity-icon-action"
           style="${o?`color: ${o}`:""}"
           @pointerdown="${t=>this._onIconPointerDown(t)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${t=>{t.preventDefault(),t.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${n}"></ha-icon>
      </div>
    `}_renderBarIcon(t,e=""){if(!t)return"";const i=this._getDeviceType(),n=t.attributes?.icon||ot(i);return L`
      <div class="bar-icon entity-icon-action ${e}"
           @pointerdown="${t=>this._onIconPointerDown(t)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${t=>{t.preventDefault(),t.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${n}"></ha-icon>
      </div>
    `}_renderHeaderAction(t=!0){return t?L`
      <div class="header-action" 
           @click="${()=>this._showPopup=!0}"
           title="${this._t("device")}">
        <ha-icon icon="mdi:tune-variant"></ha-icon>
      </div>
    `:""}_handleSliderClick(t,e){const i=t.currentTarget.getBoundingClientRect(),n=t.clientX-i.left,a=Math.round(n/i.width*100),o=Math.max(0,Math.min(100,a));switch(e){case"light":this._setBrightness(o);break;case"cover":this._setCoverPosition(o);break;case"media":this._setVolume(o);break;case"fan":this._setFanSpeed(o)}}_adjustTemp(t){this._services?.adjustTemp(t)}_setClimateMode(t){this._services?.setClimateMode(t)}_setFanMode(t){this._services?.setFanMode(t)}_setBrightness(t){this._services?.setBrightness(t)}_adjustBrightness(t){const e=this.hass.states[this.config.entity].attributes.brightness||0,i=Math.round(e/255*100),n=Math.max(0,Math.min(100,i+t));this._setBrightness(n)}_setFanSpeed(t){this._services?.setFanSpeed(t)}_adjustFanSpeed(t){const e=this.hass.states[this.config.entity].attributes.percentage||0,i=Math.max(0,Math.min(100,e+t));this._setFanSpeed(i)}_setCoverPosition(t){this._services?.setCoverPosition(t)}_adjustCoverPosition(t){const e=this.hass.states[this.config.entity].attributes.current_position||0,i=Math.max(0,Math.min(100,e+t));this._setCoverPosition(i)}_setVolume(t){this._services?.setVolume(t)}_adjustVolume(t){const e=100*(this.hass.states[this.config.entity].attributes.volume_level||0),i=Math.max(0,Math.min(100,e+t));this._setVolume(i)}_adjustWaterTemp(t){this._services?.adjustWaterTemp(t)}setConfig(t){if(!t.entity)throw new Error("?ｇ????entity");this.config=t}static get styles(){return[nt,at]}}),customElements.define("universal-device-card-editor",class extends tt{static get properties(){return{hass:{},config:{},_translations:{type:Object}}}constructor(){super(),this._translations={}}async connectedCallback(){super.connectedCallback(),await this._loadTranslations()}async _loadTranslations(){const t=this.hass?.language||"en";this._translations=it[t]||it.en;try{const e=await fetch(`${et()}${t}.json`);if(e.ok){const t=await e.json();this._translations={...this._translations,...t}}}catch(t){}this.requestUpdate()}_t(t){return this._translations[t]||it.en[t]||t}setConfig(t){this.config=t}configChanged(t){const e=new Event("config-changed",{bubbles:!0,composed:!0});e.detail={config:t},this.dispatchEvent(e)}_valueChanged(t){const e=t.target,i=e.configValue,n=void 0!==e.checked?e.checked:e.value;if(this.config[i]===n)return;const a={...this.config};""===n||"checkbox"===e.type&&!n?delete a[i]:a[i]=n,this.configChanged(a)}_showButtonsChanged(t){const e=t.target.value,i={...this.config};""===e?delete i.show_buttons:i.show_buttons=e.split(",").map(t=>t.trim()).filter(t=>t),this.configChanged(i)}_filterChanged(t){const e=t.target,i=e.getAttribute("filter-type"),n=e.value,a={...this.config};a.popup_filters||(a.popup_filters={}),""===n?delete a.popup_filters[i]:a.popup_filters[i]=n.split(",").map(t=>t.trim()).filter(t=>t),this.configChanged(a)}render(){if(!this.hass||!this.config)return L``;const t=Object.keys(this.hass.states).filter(t=>{const e=t.split(".")[0];return["climate","light","fan","cover","humidifier","media_player","vacuum","water_heater"].includes(e)}),e=this.config.popup_filters||{};return L`
      <div class="card-config">
        <div class="option">
          <label>
            ${this._t("editor_entity")} ${this._t("editor_entity_required")}
            <select 
              .value="${this.config.entity||""}"
              .configValue="${"entity"}"
              @change="${this._valueChanged}">
              <option value="">${this._t("editor_entity_select")}</option>
              ${t.map(t=>L`
                <option value="${t}" ?selected="${this.config.entity===t}">
                  ${this.hass.states[t].attributes.friendly_name||t}
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
              .value="${e.exclude_domains?.join(", ")||""}"
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
              .value="${e.include_domains?.join(", ")||""}"
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
              .value="${e.exclude_entities?.join(", ")||""}"
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
              .value="${e.include_entities?.join(", ")||""}"
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
              .value="${e.exclude_sensor_classes?.join(", ")||""}"
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
              .value="${e.include_sensor_classes?.join(", ")||""}"
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
