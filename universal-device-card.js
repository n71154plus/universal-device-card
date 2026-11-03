const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},n=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${n}--\x3e`,a=new RegExp(`${n}|${i}`),s="$lit$";class r{constructor(t,e){this.parts=[],this.element=e;const i=[],r=[],c=document.createTreeWalker(e.content,133,null,!1);let p=0,u=-1,m=0;const{strings:h,values:{length:g}}=t;for(;m<g;){const t=c.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let i=0;for(let t=0;t<n;t++)o(e[t].name,s)&&i++;for(;i-- >0;){const e=h[m],n=d.exec(e)[2],i=n.toLowerCase()+s,r=t.getAttribute(i);t.removeAttribute(i);const o=r.split(a);this.parts.push({type:"attribute",index:u,name:n,strings:o}),m+=o.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),c.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(n)>=0){const n=t.parentNode,r=e.split(a),c=r.length-1;for(let e=0;e<c;e++){let i,a=r[e];if(""===a)i=l();else{const t=d.exec(a);null!==t&&o(t[2],s)&&(a=a.slice(0,t.index)+t[1]+t[2].slice(0,-5)+t[3]),i=document.createTextNode(a)}n.insertBefore(i,t),this.parts.push({type:"node",index:++u})}""===r[c]?(n.insertBefore(l(),t),i.push(t)):t.data=r[c],m+=c}}else if(8===t.nodeType)if(t.data===n){const e=t.parentNode;null!==t.previousSibling&&u!==p||(u++,e.insertBefore(l(),t)),p=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(i.push(t),u--),m++}else{let e=-1;for(;-1!==(e=t.data.indexOf(n,e+1));)this.parts.push({type:"node",index:-1}),m++}}else c.currentNode=r.pop()}for(const t of i)t.parentNode.removeChild(t)}}const o=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},c=t=>-1!==t.index,l=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(t,e){const{element:{content:n},parts:i}=t,a=document.createTreeWalker(n,133,null,!1);let s=m(i),r=i[s],o=-1,c=0;const l=[];let d=null;for(;a.nextNode();){o++;const t=a.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(l.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==r&&r.index===o;)r.index=null!==d?-1:r.index-c,s=m(i,s),r=i[s]}l.forEach(t=>t.parentNode.removeChild(t))}const u=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,133,null,!1);for(;n.nextNode();)e++;return e},m=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(c(e))return n}return-1};const h=new WeakMap,g=t=>"function"==typeof t&&h.has(t),b={},_={};class v{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=[],i=this.template.parts,a=document.createTreeWalker(e,133,null,!1);let s,r=0,o=0,l=a.nextNode();for(;r<i.length;)if(s=i[r],c(s)){for(;o<s.index;)o++,"TEMPLATE"===l.nodeName&&(n.push(l),a.currentNode=l.content),null===(l=a.nextNode())&&(a.currentNode=n.pop(),l=a.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,s.name,s.strings,this.options));r++}else this.__parts.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const f=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),x=` ${n} `;class y{constructor(t,e,n,i){this.strings=t,this.values=e,this.type=n,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",a=!1;for(let r=0;r<t;r++){const t=this.strings[r],o=t.lastIndexOf("\x3c!--");a=(o>-1||a)&&-1===t.indexOf("--\x3e",o+1);const c=d.exec(t);e+=null===c?t+(a?x:i):t.substr(0,c.index)+c[1]+c[2]+s+c[3]+n}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==f&&(e=f.createHTML(e)),t.innerHTML=e,t}}const w=t=>null===t||!("object"==typeof t||"function"==typeof t),$=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class k{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1,n=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=n[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!$(t))return t}let i="";for(let a=0;a<e;a++){i+=t[a];const e=n[a];if(void 0!==e){const t=e.value;if(w(t)||!$(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===b||w(t)&&t===this.value||(this.value=t,g(t)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const t=this.value;this.value=b,t(this)}this.value!==b&&this.committer.commit()}}class C{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}const t=this.__pendingValue;t!==b&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof y?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):$(t)?this.__commitIterable(t):t===_?(this.value=_,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const n=new v(e,t.processor,this.options),i=n._clone();n.update(t.values),this.__commitNode(i),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,i=0;for(const a of t)n=e[i],void 0===n&&(n=new C(this.options),e.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(e[i-1])),n.setValue(a),n.commit(),i++;i<e.length&&(e.length=i,this.clear(n&&n.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class P{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}if(this.__pendingValue===b)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=b}}class E extends k{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new M(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class M extends S{}let L=!1;(()=>{try{const t={get capture(){return L=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class T{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}if(this.__pendingValue===b)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=j(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=b}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const j=t=>t&&(L?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function A(t){let e=z.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},z.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const a=t.strings.join(n);return i=e.keyString.get(a),void 0===i&&(i=new r(t,t.getTemplateElement()),e.keyString.set(a,i)),e.stringsArray.set(t.strings,i),i}const z=new Map,I=new WeakMap;const q=new class{handleAttributeExpressions(t,e,n,i){const a=e[0];if("."===a){return new E(t,e.slice(1),n).parts}if("@"===a)return[new T(t,e.slice(1),i.eventContext)];if("?"===a)return[new P(t,e.slice(1),n)];return new k(t,e,n).parts}handleTextExpression(t){return new C(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const N=(t,...e)=>new y(t,e,"html",q),B=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const D=t=>e=>{const i=B(e.type,t);let a=z.get(i);void 0===a&&(a={stringsArray:new WeakMap,keyString:new Map},z.set(i,a));let s=a.stringsArray.get(e.strings);if(void 0!==s)return s;const o=e.strings.join(n);if(s=a.keyString.get(o),void 0===s){const n=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(n,t),s=new r(e,n),a.keyString.set(o,s)}return a.stringsArray.set(e.strings,s),s},H=["html","svg"],V=new Set,Q=(t,e,n)=>{V.add(t);const i=n?n.element:document.createElement("template"),a=e.querySelectorAll("style"),{length:s}=a;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(i,t);const r=document.createElement("style");for(let t=0;t<s;t++){const e=a[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{H.forEach(e=>{const n=z.get(B(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),p(t,n)})})})(t);const o=i.content;n?function(t,e,n=null){const{element:{content:i},parts:a}=t;if(null==n)return void i.appendChild(e);const s=document.createTreeWalker(i,133,null,!1);let r=m(a),o=0,c=-1;for(;s.nextNode();)for(c++,s.currentNode===n&&(o=u(e),n.parentNode.insertBefore(e,n));-1!==r&&a[r].index===c;){if(o>0){for(;-1!==r;)a[r].index+=o,r=m(a,r);return}r=m(a,r)}}(n,r,o.firstChild):o.insertBefore(r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const c=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(n){o.insertBefore(r,o.firstChild);const t=new Set;t.add(r),p(n,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const R={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},O=(t,e)=>e!==t&&(e==e||t==t),F={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:O},W="finalized";class Y extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const i=this._attributeNameForProperty(n,e);void 0!==i&&(this._attributeToPropertyMap.set(i,n),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=F){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,n,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(i){const a=this[t];this[e]=i,this.requestUpdateInternal(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||F}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(W)||t.finalize(),this[W]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=O){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,i=e.converter||R,a="function"==typeof i?i:i.fromAttribute;return a?a(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,i=e.converter;return(i&&i.toAttribute||R.toAttribute)(t,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=F){const i=this.constructor,a=i._attributeNameForProperty(t,n);if(void 0!==a){const t=i._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(a):this.setAttribute(a,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const n=this.constructor,i=n._attributeToPropertyMap.get(t);if(void 0!==i){const t=n.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=n._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,n){let i=!0;if(void 0!==t){const a=this.constructor;n=n||a.getPropertyOptions(t),a._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Y[W]=!0;const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol();class X{constructor(t,e){if(e!==J)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=(t,...e)=>{const n=e.reduce((e,n,i)=>e+(t=>{if(t instanceof X)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[i+1],t[0]);return new X(n,J)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Z={};class tt extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,n)=>t.reduceRight((t,n)=>Array.isArray(n)?e(n,t):(t.add(n),t),n),n=e(t,new Set),i=[];n.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!G){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new X(String(e),J)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Z&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return Z}}function et(){return void 0!==import.meta&&import.meta.url?new URL("translations/",import.meta.url).href:"/local/universal-device-card/translations/"}tt.finalized=!0,tt.render=(t,n,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const a=i.scopeName,s=I.has(n),r=U&&11===n.nodeType&&!!n.host,o=r&&!V.has(a),c=o?document.createDocumentFragment():n;if(((t,n,i)=>{let a=I.get(n);void 0===a&&(e(n,n.firstChild),I.set(n,a=new C(Object.assign({templateFactory:A},i))),a.appendInto(n)),a.setValue(t),a.commit()})(t,c,Object.assign({templateFactory:D(a)},i)),o){const t=I.get(c);I.delete(c);const i=t.value instanceof v?t.value.template:void 0;Q(a,c,i),e(n,n.firstChild),n.appendChild(c),I.set(n,t)}!s&&r&&window.ShadyCSS.styleElement(n.host)},tt.shadowRootOptions={mode:"open"};const nt={"zh-TW":{target_temp:"目標溫度",target_humidity:"目標濕度",position:"位置",tilt:"傾斜",open_tilt:"開啟傾斜",close_tilt:"關閉傾斜",open:"開啟",close:"關閉",stop:"停止",start:"開始",pause:"暫停",return_home:"回充",no_controls:"無其他控制項目",on:"開啟",state:"狀態",popup_controls:"控制",popup_sensors:"感測器",unavailable:"無法使用",device:"設備",cleaning:"清掃中",docked:"充電中",returning:"回充中",idle:"待機",paused:"已暫停",error:"錯誤",cool:"冷氣",heat:"暖氣",dry:"除濕",fan_only:"送風",auto:"自動",off:"關閉",click_to_view:"點擊查看完整內容",editor_entity:"實體 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"選擇實體...",editor_layout:"佈局模式 (Layout)",editor_layout_standard:"標準版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"長條型 (Bar)",editor_language:"語言 (Language)",editor_language_auto:"自動 (Auto)",editor_disable_popup:"禁用彈出面板",editor_show_buttons:"主畫面顯示按鈕 (Button Entity IDs)",editor_show_buttons_desc:"輸入 button 實體 ID，用逗號分隔",editor_filters_title:"彈出面板過濾器 (Popup Filters)",editor_filters_desc:"使用逗號分隔多個值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"僅包含的 Domain",editor_exclude_entities:"排除的實體 ID",editor_include_entities:"僅包含的實體 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"僅包含的 Sensor Device Class",mass_queue_playlist:"播放清單",mass_queue_loading:"載入中…",mass_library:"音樂資料庫",mass_library_loading:"載入中…",mass_search:"搜尋",mass_search_placeholder:"藝人、專輯或曲目…",mass_search_loading:"載入中…",mass_search_button:"搜尋"},"zh-CN":{target_temp:"目标温度",target_humidity:"目标湿度",position:"位置",tilt:"倾斜",open_tilt:"开启倾斜",close_tilt:"关闭倾斜",open:"打开",close:"关闭",stop:"停止",start:"开始",pause:"暂停",return_home:"回充",no_controls:"无其他控制项目",on:"开启",state:"状态",popup_controls:"控制",popup_sensors:"传感器",unavailable:"不可用",device:"设备",cleaning:"清扫中",docked:"充电中",returning:"回充中",idle:"待机",paused:"已暂停",error:"错误",cool:"制冷",heat:"制热",dry:"除湿",fan_only:"送风",auto:"自动",off:"关闭",click_to_view:"点击查看完整内容",editor_entity:"实体 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"选择实体...",editor_layout:"布局模式 (Layout)",editor_layout_standard:"标准版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"长条型 (Bar)",editor_language:"语言 (Language)",editor_language_auto:"自动 (Auto)",editor_disable_popup:"禁用弹出面板",editor_show_buttons:"主画面显示按钮 (Button Entity IDs)",editor_show_buttons_desc:"输入 button 实体 ID，用逗号分隔",editor_filters_title:"弹出面板过滤器 (Popup Filters)",editor_filters_desc:"使用逗号分隔多个值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"仅包含的 Domain",editor_exclude_entities:"排除的实体 ID",editor_include_entities:"仅包含的实体 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"仅包含的 Sensor Device Class",mass_queue_playlist:"播放列表",mass_queue_loading:"加载中…",mass_library:"音乐资料库",mass_library_loading:"加载中…",mass_search:"搜索",mass_search_placeholder:"艺人、专辑或曲目…",mass_search_loading:"加载中…",mass_search_button:"搜索"},en:{target_temp:"Target Temp",target_humidity:"Target Humidity",position:"Position",tilt:"Tilt",open_tilt:"Open Tilt",close_tilt:"Close Tilt",open:"Open",close:"Close",stop:"Stop",start:"Start",pause:"Pause",return_home:"Return",no_controls:"No additional controls",on:"On",state:"State",popup_controls:"Controls",popup_sensors:"Sensors",unavailable:"Unavailable",device:"Device",cleaning:"Cleaning",docked:"Docked",returning:"Returning",idle:"Idle",paused:"Paused",error:"Error",cool:"Cool",heat:"Heat",dry:"Dry",fan_only:"Fan",auto:"Auto",off:"Off",click_to_view:"Click to view full text",editor_entity:"Entity",editor_entity_required:"* Required",editor_entity_select:"Select entity...",editor_layout:"Layout",editor_layout_standard:"Standard",editor_layout_mini:"Mini",editor_layout_bar:"Bar",editor_language:"Language",editor_language_auto:"Auto",editor_disable_popup:"Disable Popup",editor_show_buttons:"Show Buttons on Main (Button Entity IDs)",editor_show_buttons_desc:"Enter button entity IDs, comma separated",editor_filters_title:"Popup Filters",editor_filters_desc:"Use comma to separate multiple values, e.g: sensor,switch",editor_exclude_domains:"Exclude Domains",editor_include_domains:"Include Domains Only",editor_exclude_entities:"Exclude Entity IDs",editor_include_entities:"Include Entity IDs Only",editor_exclude_sensor_classes:"Exclude Sensor Classes",editor_include_sensor_classes:"Include Sensor Classes Only",mass_queue_playlist:"Queue",mass_queue_loading:"Loading…",mass_library:"Library",mass_library_loading:"Loading…",mass_search:"Search",mass_search_placeholder:"Artist, album or track…",mass_search_loading:"Loading…",mass_search_button:"Search"},ja:{target_temp:"目標温度",target_humidity:"目標湿度",position:"位置",tilt:"傾斜",open_tilt:"傾斜を開く",close_tilt:"傾斜を閉じる",open:"開く",close:"閉じる",stop:"停止",start:"スタート",pause:"一時停止",return_home:"帰還",no_controls:"他のコントロールなし",on:"オン",state:"状態",popup_controls:"操作",popup_sensors:"センサー",unavailable:"利用不可",device:"デバイス",cleaning:"掃除中",docked:"充電中",returning:"帰還中",idle:"待機",paused:"一時停止",error:"エラー",cool:"冷房",heat:"暖房",dry:"除湿",fan_only:"送風",auto:"自動",off:"オフ",click_to_view:"クリックして全文を表示",editor_entity:"エンティティ",editor_entity_required:"* 必須",editor_entity_select:"エンティティを選択...",editor_layout:"レイアウト",editor_layout_standard:"スタンダード",editor_layout_mini:"ミニ",editor_layout_bar:"バー",editor_language:"言語",editor_language_auto:"自動",editor_disable_popup:"ポップアップを無効化",editor_show_buttons:"メイン画面にボタン表示",editor_show_buttons_desc:"ボタンエンティティIDをカンマ区切りで入力",editor_filters_title:"ポップアップフィルター",editor_filters_desc:"カンマで複数の値を区切る",editor_exclude_domains:"除外するドメイン",editor_include_domains:"含めるドメインのみ",editor_exclude_entities:"除外するエンティティID",editor_include_entities:"含めるエンティティIDのみ",editor_exclude_sensor_classes:"除外するセンサークラス",editor_include_sensor_classes:"含めるセンサークラスのみ",mass_queue_playlist:"再生リスト",mass_queue_loading:"読み込み中…",mass_library:"音楽ライブラリ",mass_library_loading:"読み込み中…",mass_search:"検索",mass_search_placeholder:"アーティスト、アルバム、曲…",mass_search_loading:"読み込み中…",mass_search_button:"検索"}},it=K`
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
      .media-bg-root {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
      }
      .media-bg-root-has::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.85)), var(--udc-media-bg-image);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 0;
      }
      .media-bg-root > * {
        position: relative;
        z-index: 1;
      }

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
      .mass-search-input-wrap {
        flex: 1;
        min-width: 0;
        position: relative;
      }
      .mass-search-input {
        width: 100%;
        min-width: 0;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid rgba(var(--rgb-primary-text-color), 0.2);
        background: rgba(var(--rgb-primary-text-color), 0.05);
        color: var(--primary-text-color);
        font-size: 0.9rem;
      }
      .mass-search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 4px;
        max-height: 200px;
        overflow-y: auto;
        border-radius: 8px;
        background: var(--card-background-color, var(--ha-card-background));
        border: 1px solid rgba(var(--rgb-primary-text-color), 0.2);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10;
      }
      .mass-search-suggestion-item {
        display: block;
        width: 100%;
        padding: 8px 12px;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 0.9rem;
        text-align: left;
        cursor: pointer;
        transition: background 0.15s;
      }
      .mass-search-suggestion-item:hover {
        background: rgba(var(--rgb-primary-text-color), 0.08);
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

      .mass-search-spinner {
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid rgba(var(--rgb-primary-text-color), 0.3);
        border-top-color: var(--primary-color);
        animation: mass-search-spin 0.7s linear infinite;
      }

      .mass-search-spinner-inline {
        display: inline-block;
        margin-right: 6px;
        vertical-align: middle;
      }

      .mass-search-spinner-center {
        display: block;
        margin: 6px auto 4px;
      }

      @keyframes mass-search-spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
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
        cursor: grab;
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

`,at=K`
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
`;function st(t){return{switch:"mdi:toggle-switch",light:"mdi:lightbulb",fan:"mdi:fan",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",select:"mdi:format-list-bulleted",number:"mdi:counter",button:"mdi:gesture-tap",climate:"mdi:thermostat",cover:"mdi:window-shutter",lock:"mdi:lock",humidifier:"mdi:air-humidifier",media_player:"mdi:play-circle",vacuum:"mdi:robot-vacuum",water_heater:"mdi:water-thermometer"}[t]||"mdi:circle-outline"}function rt(t){return{cool:"mdi:snowflake",heat:"mdi:fire",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:brightness-auto",off:"mdi:power"}[t]}function ot(t){return{auto:"自動",low:"低速",medium:"中速",high:"高速",middle:"中速",favorite:"最愛",silent:"靜音",turbo:"強力"}[t]||t}const ct={climate:{cool:"rgba(3, 169, 244, 0.2)",heat:"rgba(255, 152, 0, 0.2)",dry:"rgba(156, 39, 176, 0.15)",fan_only:"rgba(76, 175, 80, 0.15)",auto:"rgba(0, 150, 136, 0.15)",off:"rgba(158, 158, 158, 0.1)"},light:{on:"rgba(255, 193, 7, 0.2)",off:"rgba(158, 158, 158, 0.1)"},fan:{on:"rgba(76, 175, 80, 0.2)",off:"rgba(158, 158, 158, 0.1)"},cover:{open:"rgba(3, 169, 244, 0.15)",opening:"rgba(3, 169, 244, 0.15)",closed:"rgba(158, 158, 158, 0.1)",closing:"rgba(158, 158, 158, 0.1)"},humidifier:{on:"rgba(33, 150, 243, 0.2)",off:"rgba(158, 158, 158, 0.1)"},media_player:{playing:"rgba(156, 39, 176, 0.2)",paused:"rgba(255, 152, 0, 0.15)",off:"rgba(158, 158, 158, 0.1)"},vacuum:{cleaning:"rgba(76, 175, 80, 0.2)",docked:"rgba(158, 158, 158, 0.1)",returning:"rgba(255, 152, 0, 0.15)"},water_heater:{electric:"rgba(255, 152, 0, 0.2)",gas:"rgba(255, 87, 34, 0.2)",off:"rgba(158, 158, 158, 0.1)"}};function lt(t,e){return ct[t]?.[e]||"var(--ha-card-background)"}function dt(t){const e=document.createElement("ha-icon");return t&&e.setAttribute("icon",t),e}function pt(t){const e=document.createElement("ha-icon");return t&&e.setAttribute("icon",t),e}function ut(t,e,n,i){const a=document.createElement(e);return n&&(a.className=n),a.textContent=null==i?"":String(i),t.appendChild(a),a}function mt(t,e){if(!t)return"";if(!e)return t;const n=String(t),i=String(e).trim();if(!i)return n;if(n.startsWith(i)){return n.slice(i.length).replace(/^[\s\-–—_·:：]+/,"").trim()||n}return n}function ht(t){const e=t.hass?.states?.[t.config?.entity];return e?.attributes?.friendly_name||t._t("device")}function gt(t,e){const n=t._getRelatedEntities(),i=n.filter(t=>t.entity_id.startsWith("sensor")||t.entity_id.startsWith("binary_sensor")),a=n.filter(t=>!t.entity_id.startsWith("sensor")&&!t.entity_id.startsWith("binary_sensor")),s=ht(t),r=t.hass?.states?.[t.config?.entity],o=document.createElement("div");o.className="popup-overlay",o.addEventListener("click",e=>{e.target===o&&t._closePopup()});const c=document.createElement("div"),l=!0===t.config?.hide_popup_scrollbar,d=i.length&&a.length?" has-both":i.length?" has-sensors-only":" has-controls-only";c.className=(l?"popup-content hide-scrollbar":"popup-content")+d,c.dataset.sensors=String(i.length),c.dataset.controls=String(a.length),c.addEventListener("click",t=>t.stopPropagation());const p=document.createElement("div");p.className="popup-header";const u=document.createElement("div");u.className="popup-drag-handle",p.appendChild(u);const m=document.createElement("div");m.className="popup-title-wrap",ut(m,"div","popup-title",s);const h=[];i.length&&h.push(`${i.length} ${t._t("popup_sensors")}`),a.length&&h.push(`${a.length} ${t._t("popup_controls")}`),ut(m,"div","popup-subtitle",h.join(" · ")||t.config?.entity||""),p.appendChild(m);const g=pt("mdi:close");if(g.className="close-btn",g.addEventListener("click",()=>t._closePopup()),p.appendChild(g),c.appendChild(p),r){const e=t._isEntityAvailable(r),n=["on","open","home","playing","heat","cool","auto"].includes(r.state),i=document.createElement("div");i.className="popup-status"+(e?n?" is-on":" is-off":" is-unavailable");const a=document.createElement("div");a.className="popup-status-dot",i.appendChild(a);const s=document.createElement("div");s.className="popup-status-meta",ut(s,"div","popup-status-label",t._t("state")||"State");const o=r.attributes.unit_of_measurement;let l;l=e?"on"===r.state||"off"===r.state?(t._t(r.state)||r.state)+(o?` ${o}`:""):r.state+(o?` ${o}`:""):t._t("unavailable"),ut(s,"div","popup-status-value",l),i.appendChild(s);const d=document.createElement("div");d.className="popup-status-action";const p=t.config.entity.split(".")[0];if(e&&["switch","light","fan","input_boolean"].includes(p)){const e=document.createElement("ha-switch");e.checked="on"===r.state,e.addEventListener("change",()=>t._toggleEntity(t.config.entity)),d.appendChild(e)}i.appendChild(d),c.appendChild(i)}const b=document.createElement("div");if(b.className="popup-body",i.length>0){const e=document.createElement("div");e.className="popup-section popup-section-sensors",ut(e,"div","popup-section-title",t._t("popup_sensors"));const n=document.createElement("div");n.className="sensor-grid",i.forEach(e=>{n.appendChild(function(t,e,n){const i=t._isEntityAvailable(e),a=e.entity_id.startsWith("binary_sensor"),s="on"===e.state,r=document.createElement("div");r.className="sensor-card"+(i?"":" sensor-card-unavailable")+(a&&i?s?" is-on":" is-off":"");const o=e.attributes.icon||(a?"mdi:checkbox-blank-circle":"mdi:chart-line");r.appendChild(pt(o));const c=document.createElement("div");c.className="sensor-card-body";const l=mt(e.attributes.friendly_name,n)||e.entity_id;let d;ut(c,"span","sensor-label",l),d=i?a?t._t(e.state)||e.state:e.state+(e.attributes.unit_of_measurement?` ${e.attributes.unit_of_measurement}`:""):t._t("unavailable");return ut(c,"span","sensor-value",d),r.appendChild(c),r}(t,e,s))}),e.appendChild(n),b.appendChild(e)}if(a.length>0){const n=document.createElement("div");n.className="popup-section popup-section-controls",ut(n,"div","popup-section-title",t._t("popup_controls"));const i=document.createElement("div");i.className="controls-group",a.forEach(n=>{i.appendChild(bt(t,n,s,e.getDomainIcon))}),n.appendChild(i),b.appendChild(n)}else 0===i.length&&ut(b,"div","no-controls",t._t("no_controls"));c.appendChild(b),o.appendChild(c),t._bindPopupSheetGestures(c,p),t._lockPopupScroll(!0);const _=t._popupPortal.querySelector(".popup-overlay");_&&_.remove(),t._popupPortal.appendChild(o)}function bt(t,e,n,i){const a=e.entity_id.split(".")[0],s=t._isEntityAvailable(e),r=document.createElement("div");r.className="control-row"+(s?"":" control-row-unavailable");const o=document.createElement("div");o.className="control-row-icon",o.appendChild(pt(e.attributes.icon||i(a))),r.appendChild(o),ut(r,"div","control-row-label",mt(e.attributes.friendly_name,n));const c=document.createElement("div");return c.className="control-row-action",s?t._populateControlAction(c,e,a):ut(c,"span","state-text unavailable-text",e.state),r.appendChild(c),r}const _t={climate:function(t,e,n="standard",i=!0){const{current_temperature:a,temperature:s,fan_mode:r,fan_modes:o}=e.attributes,c=e.state,l="mini"===n;return"bar"===n?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n)}</div>
              <div class="bar-state">${a}°C → ${s}°C</div>
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
            ${i?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        
        <!-- HVAC Mode 快速切換 (Bar) -->
        <div class="bar-modes">
          ${["cool","heat","dry","fan_only","auto","off"].map(e=>N`
            <div class="bar-mode-chip ${c===e?"active":""}" 
                 @click="${()=>t._setClimateMode(e)}"
                 title="${t._t(e)}">
              <ha-icon icon="${rt(e)}"></ha-icon>
            </div>
          `)}
        </div>
        
        <!-- Fan Mode 快速切換 (Bar) -->
        ${o&&o.length>0?N`
          <div class="bar-fan-modes ${t._fanModeExpanded?"expanded":"collapsed"}">
            <div class="bar-fan-label" @click="${()=>t._fanModeExpanded=!t._fanModeExpanded}">
              <ha-icon icon="mdi:fan"></ha-icon>
              <span>風速</span>
              <ha-icon class="expand-icon ${t._fanModeExpanded?"expanded":""}" 
                       icon="${t._fanModeExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
            </div>
            <div class="bar-fan-options ${t._fanModeExpanded?"expanded":"collapsed"}">
              ${o.map(e=>N`
                <div class="bar-fan-chip ${r===e?"active":""}"
                     @click="${()=>t._setFanMode(e)}">
                  ${ot(e)}
                </div>
              `)}
            </div>
          </div>
        `:""}
        
        ${t._renderMainButtons(n)}
      `:N`
      <div class="header ${l?"header-mini":""}">
        ${t._renderHeaderIcon(e,l)}
        <div class="device-name ${l?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          <span class="device-value">${a}°C → ${s}°C</span>
        </div>
        ${t._renderHeaderAction(i)}
      </div>

      <div class="temp-control ${l?"temp-control-mini":""}">
        <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>t._adjustTemp(-.5)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${t._t("target_temp")}</span>
          <span class="value ${l?"value-mini":""}">${s}°C</span>
        </div>
        <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>t._adjustTemp(.5)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>

      <div class="quick-modes ${l?"quick-modes-mini":""}">
        ${["cool","heat","dry","fan_only","auto","off"].map(e=>N`
          <div class="mode-item ${c===e?"active":""} ${l?"mode-item-mini":""}" 
               @click="${()=>t._setClimateMode(e)}">
            <ha-icon icon="${rt(e)}"></ha-icon>
            ${l?"":N`<span class="mode-label">${t._t(e)}</span>`}
          </div>
        `)}
      </div>
      
      <!-- Fan Mode 控制 (Standard/Mini) -->
      ${o&&o.length>0?N`
        <div class="fan-mode-section ${l?"fan-mode-mini":""}">
          <div class="fan-mode-label" @click="${()=>t._fanModeExpanded=!t._fanModeExpanded}">
            <ha-icon icon="mdi:fan"></ha-icon>
            ${l?"":N`<span>風速</span>`}
            <ha-icon class="expand-icon ${t._fanModeExpanded?"expanded":""}" 
                     icon="${t._fanModeExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
          </div>
          <div class="fan-mode-options ${l?"fan-mode-options-mini":""} ${t._fanModeExpanded?"expanded":"collapsed"}">
            ${o.map(e=>N`
              <div class="fan-mode-chip ${r===e?"active":""} ${l?"fan-mode-chip-mini":""}"
                   @click="${()=>t._setFanMode(e)}">
                ${ot(e)}
              </div>
            `)}
          </div>
        </div>
      `:""}
      
      ${t._renderMainButtons(n)}
    `},light:function(t,e,n="standard",i=!0){const a="on"===e.state,s=e.attributes.brightness||0,r=Math.round(s/255*100),o="bar"===n,c="mini"===n,l=void 0!==e.attributes.brightness;return o?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n)}</div>
              ${a&&l?N`
                <div class="bar-slider-container" @click="${e=>{e.stopPropagation(),t._handleSliderClick(e,"light")}}">
                  <div class="bar-slider-bg bar-slider-light" style="--slider-value: ${r}%"></div>
                  <div class="bar-slider-text">${r}%</div>
                </div>
              `:N`
                <div class="bar-state">${a?t._t("on"):t._t("off")}</div>
              `}
            </div>
          </div>
          <div class="bar-right">
            ${a&&l?N`
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
            ${t._renderHeaderAction(i)}
          </div>
        </div>
        ${t._renderMainButtons(n)}
      `:N`
      <div class="header ${c?"header-mini":""}">
        ${t._renderHeaderIcon(e,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          <span class="device-value">${a&&l?`${r}%`:a?t._t("on"):t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(i)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${a?"on":""} ${c?"power-btn-mini":""}" 
                @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:lightbulb${a?"":"-outline"}"></ha-icon>
          ${c?"":N`<span class="mode-label">${a?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${a&&l?N`
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
      
      ${t._renderMainButtons(n)}
    `},fan:function(t,e,n="standard",i=!0){const a="on"===e.state,s=e.attributes.percentage||0,r=e.attributes.preset_modes||[],o=e.attributes.preset_mode,c="mini"===n;return"bar"===n?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n)}</div>
              <div class="bar-state">${a?`${s}%`:t._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            ${a&&void 0!==s?N`
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
            ${i?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        
        <!-- Fan Preset Modes (Bar) -->
        ${r.length>0?N`
          <div class="bar-modes">
            ${r.map(e=>{return N`
              <div class="bar-mode-chip ${o===e?"active":""}" 
                   @click="${()=>t._setFanPresetMode(e)}"
                   title="${e}">
                <span class="bar-mode-text">${n=e,{auto:"自動",smart:"智慧",sleep:"睡眠",nature:"自然",normal:"正常",low:"低速",medium:"中速",high:"高速",turbo:"強力",quiet:"靜音",breeze:"微風",favorite:"最愛"}[n]||n}</span>
              </div>
            `;var n})}
          </div>
        `:""}
        
        ${t._renderMainButtons(n)}
      `:N`
      <div class="header ${c?"header-mini":""}">
        ${t._renderHeaderIcon(e,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          <span class="device-value">${a?`${s}%`:t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(i)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${a?"on":""} ${c?"power-btn-mini":""}" @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:fan"></ha-icon>
          ${c?"":N`<span class="mode-label">${a?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${a?N`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>t._adjustFanSpeed(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">風速</span>
            <span class="value ${c?"value-mini":""}">${s}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>t._adjustFanSpeed(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${t._renderMainButtons(n)}
    `},cover:function(t,e,n="standard",i=!0){const a=e.attributes.current_position||0,s=e.attributes.current_tilt_position??0,r=e.state,o=e.attributes.supported_features??0,c=!!(48&o),l=!!(128&o)&&void 0!==e.attributes.current_tilt_position,d="mini"===n;return"bar"===n?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n)}</div>
              <div class="bar-state">${a}%${l?` / ${s}%`:""}</div>
            </div>
          </div>
          <div class="bar-right">
            ${void 0!==e.attributes.current_position?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>t._adjustCoverPosition(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>t._adjustCoverPosition(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            ${l?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>t._adjustCoverTiltPosition(-10)}">
                  <ha-icon icon="mdi:blinds"></ha-icon>
                </button>
                <button class="bar-btn" @click="${()=>t._adjustCoverTiltPosition(10)}">
                  <ha-icon icon="mdi:blinds-open"></ha-icon>
                </button>
              </div>
            `:""}
            ${i?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>

        <div class="bar-modes">
          <div class="bar-mode-chip ${"open"===r||"opening"===r?"active":""}"
               @click="${()=>t._callService("cover","open_cover")}"
               title="${t._t("open")}">
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </div>
          <div class="bar-mode-chip ${"opening"===r||"closing"===r?"active":""}"
               @click="${()=>t._callService("cover","stop_cover")}"
               title="${t._t("stop")}">
            <ha-icon icon="mdi:stop"></ha-icon>
          </div>
          <div class="bar-mode-chip ${"closed"===r||"closing"===r?"active":""}"
               @click="${()=>t._callService("cover","close_cover")}"
               title="${t._t("close")}">
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </div>
        </div>

        ${c?N`
          <div class="bar-modes">
            <div class="bar-mode-chip"
                 @click="${()=>t._callService("cover","open_cover_tilt")}"
                 title="${t._t("open_tilt")}">
              <ha-icon icon="mdi:blinds-open"></ha-icon>
            </div>
            <div class="bar-mode-chip"
                 @click="${()=>t._callService("cover","close_cover_tilt")}"
                 title="${t._t("close_tilt")}">
              <ha-icon icon="mdi:blinds"></ha-icon>
            </div>
          </div>
        `:""}

        ${t._renderMainButtons(n)}
      `:N`
      <div class="header ${d?"header-mini":""}">
        ${t._renderHeaderIcon(e,d)}
        <div class="device-name ${d?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          ${void 0!==e.attributes.current_position?N`<span class="device-value">${a}%${l?` / ${s}%`:""}</span>`:""}
        </div>
        ${t._renderHeaderAction(i)}
      </div>

      <div class="cover-controls ${d?"cover-controls-mini":""}">
        <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>t._callService("cover","open_cover")}">
          <ha-icon icon="mdi:arrow-up"></ha-icon>
          <span>${t._t("open")}</span>
        </button>
        <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>t._callService("cover","stop_cover")}">
          <ha-icon icon="mdi:stop"></ha-icon>
          <span>${t._t("stop")}</span>
        </button>
        <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>t._callService("cover","close_cover")}">
          <ha-icon icon="mdi:arrow-down"></ha-icon>
          <span>${t._t("close")}</span>
        </button>
        ${c?N`
          <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>t._callService("cover","open_cover_tilt")}">
            <ha-icon icon="mdi:blinds-open"></ha-icon>
            <span>${t._t("open_tilt")}</span>
          </button>
          <button class="cover-btn ${d?"cover-btn-mini":""}" @click="${()=>t._callService("cover","close_cover_tilt")}">
            <ha-icon icon="mdi:blinds"></ha-icon>
            <span>${t._t("close_tilt")}</span>
          </button>
        `:""}
      </div>

      ${void 0!==e.attributes.current_position?N`
        <div class="temp-control ${d?"temp-control-mini":""}">
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>t._adjustCoverPosition(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">${t._t("position")}</span>
            <span class="value ${d?"value-mini":""}">${a}%</span>
          </div>
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>t._adjustCoverPosition(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${l?N`
        <div class="temp-control ${d?"temp-control-mini":""}">
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>t._adjustCoverTiltPosition(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">${t._t("tilt")}</span>
            <span class="value ${d?"value-mini":""}">${s}%</span>
          </div>
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>t._adjustCoverTiltPosition(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${t._renderMainButtons(n)}
    `},humidifier:function(t,e,n="standard",i=!0){const a="on"===e.state,s=e.attributes.humidity||0,r="mini"===n;return"bar"===n?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n)}</div>
              <div class="bar-state">${a?`${s}%`:t._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-toggle ${a?"bar-toggle-on":""}" @click="${()=>t._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${i?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(n)}
      `:N`
      <div class="header ${r?"header-mini":""}">
        ${t._renderHeaderIcon(e,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          <span class="device-value">${a?`${s}%`:t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(i)}
      </div>

      <div class="main-control ${r?"main-control-mini":""}">
        <button class="power-btn ${a?"on":""} ${r?"power-btn-mini":""}" @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:air-humidifier"></ha-icon>
          ${r?"":N`<span class="mode-label">${a?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${a?N`
        <div class="temp-control ${r?"temp-control-mini":""}">
          <div style="width: 64px;"></div>
          <div class="target-display">
            <span class="label">${t._t("target_humidity")}</span>
            <span class="value ${r?"value-mini":""}">${s}%</span>
          </div>
          <div style="width: 64px;"></div>
        </div>
      `:""}
      ${t._renderMainButtons(n)}
    `},media_player:function(t,e,n="standard",i=!0){const a=e.state,s=e.attributes||{},r=s.media_title||"No Media",o=s.media_artist||"",c="bar"===n,l="mini"===n,d=s.entity_picture_local||s.entity_picture||s.media_image||s.media_image_url||null,p=d?`--udc-media-bg-image: url("${d}")`:"",u={artist:[],album:[],playlist:[],track:[]};if(Array.isArray(t._massLibraryItems)&&t._massLibraryItems.forEach(t=>{const e=t.media_type;u[e]&&u[e].push(t)}),c){const s=void 0!==e.attributes.volume_level?Math.round(100*e.attributes.volume_level):0,o=t._showMassPlaylistOrLibrary(e);return N`
        <div class="media-bg-root ${d?"media-bg-root-has":""}" style="${p}">
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"playing"===a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n,15)}</div>
              <div class="bar-state">${t._renderTitle(r,n,25)}</div>
            </div>
          </div>
          <div class="bar-right">
            ${void 0!==e.attributes.volume_level?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>t._adjustVolume(-5)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="bar-value">${s}%</span>
                <button class="bar-btn" @click="${()=>t._adjustVolume(5)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            ${i?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>

        <div class="bar-modes">
          <div class="bar-mode-chip" @click="${()=>t._callService("media_player","media_previous_track")}">
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </div>
          <div class="bar-mode-chip ${"playing"===a?"active":""}"
               @click="${()=>t._callService("media_player","playing"===a?"media_pause":"media_play")}">
            <ha-icon icon="mdi:${"playing"===a?"pause":"play"}"></ha-icon>
          </div>
          <div class="bar-mode-chip" @click="${()=>t._callService("media_player","media_next_track")}">
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </div>
          ${o&&t._hasMassQueue()?N`
            <div class="bar-mode-chip ${t._massQueueExpanded?"active":""}"
                 @click="${()=>t._toggleMassQueueExpand()}"
                 title="${t._t("mass_queue_playlist")}">
              <ha-icon icon="mdi:playlist-music"></ha-icon>
            </div>
          `:""}
          ${o&&t._hasMusicAssistantLibrary()?N`
            <div class="bar-mode-chip ${t._massLibraryExpanded?"active":""}"
                 @click="${()=>t._toggleMassLibraryExpand()}"
                 title="${t._t("mass_library")}">
              <ha-icon icon="mdi:music-box-multiple"></ha-icon>
            </div>
          `:""}
          ${o&&t._hasMusicAssistantSearch()?N`
            <div class="bar-mode-chip ${t._massSearchExpanded?"active":""}"
                 @click="${()=>t._toggleMassSearchExpand()}"
                 title="${t._t("mass_search")}">
              <ha-icon icon="mdi:magnify"></ha-icon>
            </div>
          `:""}
        </div>

        ${t._isMusicAssistant(e)&&t._hasMassQueue()&&t._massQueueExpanded?N`
          <div class="mass-queue-foldable">
            <div class="mass-queue-list">
              ${t._massQueueLoading&&0===t._massQueueItems.length?N`<div class="mass-queue-empty">${t._t("mass_queue_loading")}</div>`:0===t._massQueueItems.length?N`<div class="mass-queue-empty">—</div>`:t._massQueueItems.map(e=>N`
                    <button class="mass-queue-item" @click="${()=>t._playMassQueueItem(e)}">
                      <div class="mass-queue-item-image">
                        ${e.local_image_encoded?N`<img src="data:image/jpeg;base64,${e.local_image_encoded}" alt="" />`:e.media_image?N`<img src="${e.media_image}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                      </div>
                      <div class="mass-queue-item-info">
                        <span class="mass-queue-item-title">${e.media_title||e.name||"—"}</span>
                        ${e.media_artist?N`<span class="mass-queue-item-artist">${e.media_artist}</span>`:""}
                        ${e.media_album_name?N`<span class="mass-queue-item-album">${e.media_album_name}</span>`:""}
                      </div>
                      <ha-icon class="mass-queue-item-play" icon="mdi:play-circle-outline"></ha-icon>
                    </button>
                  `)}
            </div>
          </div>
        `:""}

        ${t._isMusicAssistant(e)&&t._hasMusicAssistantLibrary()&&t._massLibraryExpanded?N`
          <div class="mass-queue-foldable">
            <div class="mass-library-section">
              ${t._massLibraryLoading&&0===t._massLibraryItems.length?N`<div class="mass-queue-empty">${t._t("mass_library_loading")}</div>`:0===t._massLibraryItems.length?N`<div class="mass-queue-empty">—</div>`:["artist","album","playlist","track"].map(e=>{const n=u[e]||[];return n.length?N`
                        <div class="mass-library-row">
                          <div class="mass-library-row-title">${e.toUpperCase()}</div>
                          <div class="mass-library-row-scroll" @mousedown="${e=>t._onMassScrollDragStart(e)}">
                            ${n.map(e=>{const n=e.image||e.album?.image,i=e.artists?.map(t=>t.name).filter(Boolean).join(", ")||"",a=e.album?.name||"";return N`
                                <button class="mass-library-chip" @click="${()=>t._playMassLibraryItem(e)}">
                                  <div class="mass-library-chip-image">
                                    ${n?N`<img src="${n}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                  </div>
                                  <div class="mass-library-chip-text">
                                    <span class="mass-library-chip-title">${e.name||"—"}</span>
                                    ${i||a?N`
                                      <span class="mass-library-chip-sub">
                                        ${i||a}
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

        ${t._isMusicAssistant(e)&&t._hasMusicAssistantSearch()&&t._massSearchExpanded?N`
          <div class="mass-queue-foldable">
            <div class="mass-search-input-row">
              <div class="mass-search-input-wrap">
                <input type="text" class="mass-search-input" .value="${t._massSearchQuery||""}"
                       @input="${e=>t._onMassSearchInput(e)}"
                       @focus="${()=>t._openSearchSuggestions()}"
                       @blur="${()=>setTimeout(()=>t._closeSearchSuggestions(),150)}"
                       @keydown="${e=>{"Enter"===e.key&&t._runMassSearch()}}"
                       placeholder="${t._t("mass_search_placeholder")}" />
                ${t._massSearchSuggestionsOpen&&t._getFilteredSearchHistory().length?N`
                  <div class="mass-search-suggestions">
                    ${t._getFilteredSearchHistory().map(e=>N`
                      <button type="button" class="mass-search-suggestion-item"
                              @mousedown="${n=>{n.preventDefault(),t._selectSearchHistoryItem(e)}}">
                        ${e}
                      </button>
                    `)}
                  </div>
                `:""}
              </div>
              <button class="mass-search-btn" @click="${()=>t._runMassSearch()}" ?disabled="${t._massSearchLoading}">
                ${t._massSearchLoading?t._t("mass_search_loading"):t._t("mass_search_button")}
              </button>
            </div>
            <div class="mass-library-section">
              ${!t._massSearchLoading||t._massSearchResults?.artists?.length||t._massSearchResults?.albums?.length||t._massSearchResults?.tracks?.length||t._massSearchResults?.playlists?.length||t._massSearchResults?.podcasts?.length?["artists","albums","tracks","playlists","podcasts"].map(e=>{const n="artists"===e?"artist":"albums"===e?"album":"tracks"===e?"track":"playlists"===e?"playlist":"podcast",i=t._massSearchResults?.[e]??[];return i.length?N`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${n.toUpperCase()}</div>
                        <div class="mass-library-row-scroll" @mousedown="${e=>t._onMassScrollDragStart(e)}">
                          ${i.map(e=>{const n=e.image||e.album?.image,i=e.artists?.map(t=>t.name).filter(Boolean).join(", ")||"",a=e.album?.name||"";return N`
                              <button class="mass-library-chip" @click="${()=>t._playMassLibraryItem(e)}">
                                <div class="mass-library-chip-image">
                                  ${n?N`<img src="${n}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${e.name||"—"}</span>
                                  ${i||a?N`
                                    <span class="mass-library-chip-sub">${i||a}</span>
                                  `:""}
                                </div>
                              </button>
                            `})}
                        </div>
                      </div>
                    `:""}):N`<div class="mass-queue-empty">${t._t("mass_search_loading")}</div>`}
            </div>
          </div>
        `:""}

        ${t._renderMainButtons(n)}
        </div>
        </div>
      `}const m=void 0!==e.attributes.volume_level?Math.round(100*e.attributes.volume_level):0,h=t._showMassPlaylistOrLibrary(e);return N`
      <div class="media-bg-root ${d?"media-bg-root-has":""}" style="${p}">
      <div class="header ${l?"header-mini":""}">
        ${t._renderHeaderIcon(e,l)}
        <div class="device-name ${l?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          ${N`<span class="device-value">${t._renderTitle(r,n,28)}</span>`}
        </div>
        ${h&&t._hasMassQueue()?N`
          <button class="header-action" @click="${()=>t._toggleMassQueueExpand()}">
            <ha-icon icon="mdi:playlist-music"></ha-icon>
          </button>
        `:""}
        ${h&&t._hasMusicAssistantLibrary()?N`
          <button class="header-action" @click="${()=>t._toggleMassLibraryExpand()}">
            <ha-icon icon="mdi:music-box-multiple"></ha-icon>
          </button>
        `:""}
        ${h&&t._hasMusicAssistantSearch()?N`
          <button class="header-action" @click="${()=>t._toggleMassSearchExpand()}">
            <ha-icon icon="mdi:magnify"></ha-icon>
          </button>
        `:""}
        ${t._renderHeaderAction(i)}
      </div>

      <div class="media-info ${l?"media-info-mini":""}">
        <div class="media-title ${l?"media-title-mini":""}">${t._renderTitle(r,n,30)}</div>
        ${o&&!l?N`<div class="media-artist">${t._renderTitle(o,n,30)}</div>`:""}
      </div>

      <div class="media-controls ${l?"media-controls-mini":""}">
        <button class="media-btn ${l?"media-btn-mini":""}" @click="${()=>t._callService("media_player","media_previous_track")}">
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        <button class="media-btn primary ${l?"media-btn-mini":""}" @click="${()=>t._callService("media_player","playing"===a?"media_pause":"media_play")}">
          <ha-icon icon="mdi:${"playing"===a?"pause":"play"}"></ha-icon>
        </button>
        <button class="media-btn ${l?"media-btn-mini":""}" @click="${()=>t._callService("media_player","media_next_track")}">
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>

      ${void 0!==e.attributes.volume_level?N`
        <div class="temp-control ${l?"temp-control-mini":""}">
          <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>t._adjustVolume(-5)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">音量</span>
            <span class="value ${l?"value-mini":""}">${m}%</span>
          </div>
          <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>t._adjustVolume(5)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}

      ${t._isMusicAssistant(e)&&t._hasMassQueue()&&t._massQueueExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-queue-list">
            ${t._massQueueLoading&&0===t._massQueueItems.length?N`<div class="mass-queue-empty">${t._t("mass_queue_loading")}</div>`:0===t._massQueueItems.length?N`<div class="mass-queue-empty">—</div>`:t._massQueueItems.map(e=>N`
                  <button class="mass-queue-item" @click="${()=>t._playMassQueueItem(e)}">
                    <div class="mass-queue-item-image">
                      ${e.local_image_encoded?N`<img src="data:image/jpeg;base64,${e.local_image_encoded}" alt="" />`:e.media_image?N`<img src="${e.media_image}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                    </div>
                    <div class="mass-queue-item-info">
                      <span class="mass-queue-item-title">${e.media_title||e.name||"—"}</span>
                      ${e.media_artist?N`<span class="mass-queue-item-artist">${e.media_artist}</span>`:""}
                      ${e.media_album_name?N`<span class="mass-queue-item-album">${e.media_album_name}</span>`:""}
                    </div>
                    <ha-icon class="mass-queue-item-play" icon="mdi:play-circle-outline"></ha-icon>
                  </button>
                `)}
          </div>
        </div>
      `:""}

      ${t._isMusicAssistant(e)&&t._hasMusicAssistantLibrary()&&t._massLibraryExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-library-section">
            ${t._massLibraryLoading&&0===t._massLibraryItems.length?N`<div class="mass-queue-empty">${t._t("mass_library_loading")}</div>`:0===t._massLibraryItems.length?N`<div class="mass-queue-empty">—</div>`:["artist","album","playlist","track"].map(e=>{const n=u[e]||[];return n.length?N`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${e.toUpperCase()}</div>
                        <div class="mass-library-row-scroll" @mousedown="${e=>t._onMassScrollDragStart(e)}">
                          ${n.map(e=>{const n=e.image||e.album?.image,i=e.artists?.map(t=>t.name).filter(Boolean).join(", ")||"",a=e.album?.name||"";return N`
                              <button class="mass-library-chip" @click="${()=>t._playMassLibraryItem(e)}">
                                <div class="mass-library-chip-image">
                                  ${n?N`<img src="${n}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${e.name||"—"}</span>
                                  ${i||a?N`
                                    <span class="mass-library-chip-sub">
                                      ${i||a}
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

      ${t._isMusicAssistant(e)&&t._hasMusicAssistantSearch()&&t._massSearchExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-search-input-row">
            <div class="mass-search-input-wrap">
              <input type="text" class="mass-search-input" .value="${t._massSearchQuery||""}"
                     @input="${e=>t._onMassSearchInput(e)}"
                     @focus="${()=>t._openSearchSuggestions()}"
                     @blur="${()=>setTimeout(()=>t._closeSearchSuggestions(),150)}"
                     @keydown="${e=>{"Enter"===e.key&&t._runMassSearch()}}"
                     placeholder="${t._t("mass_search_placeholder")}" />
              ${t._massSearchSuggestionsOpen&&t._getFilteredSearchHistory().length?N`
                <div class="mass-search-suggestions">
                  ${t._getFilteredSearchHistory().map(e=>N`
                    <button type="button" class="mass-search-suggestion-item"
                            @mousedown="${n=>{n.preventDefault(),t._selectSearchHistoryItem(e)}}">
                      ${e}
                    </button>
                  `)}
                </div>
              `:""}
            </div>
            <button class="mass-search-btn" @click="${()=>t._runMassSearch()}" ?disabled="${t._massSearchLoading}">
              ${t._massSearchLoading?N`<span>
                    <span class="mass-search-spinner mass-search-spinner-inline"></span>
                    <span>${t._t("mass_search_loading")}</span>
                  </span>`:t._t("mass_search_button")}
            </button>
          </div>
          <div class="mass-library-section">
            ${!t._massSearchLoading||t._massSearchResults?.artists?.length||t._massSearchResults?.albums?.length||t._massSearchResults?.tracks?.length||t._massSearchResults?.playlists?.length||t._massSearchResults?.podcasts?.length?["artists","albums","tracks","playlists","podcasts"].map(e=>{const n="artists"===e?"artist":"albums"===e?"album":"tracks"===e?"track":"playlists"===e?"playlist":"podcast",i=t._massSearchResults?.[e]??[];return i.length?N`
                    <div class="mass-library-row">
                      <div class="mass-library-row-title">${n.toUpperCase()}</div>
                      <div class="mass-library-row-scroll" @mousedown="${e=>t._onMassScrollDragStart(e)}">
                        ${i.map(e=>{const n=e.image||e.album?.image,i=e.artists?.map(t=>t.name).filter(Boolean).join(", ")||"",a=e.album?.name||"";return N`
                            <button class="mass-library-chip" @click="${()=>t._playMassLibraryItem(e)}">
                              <div class="mass-library-chip-image">
                                ${n?N`<img src="${n}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                              </div>
                              <div class="mass-library-chip-text">
                                <span class="mass-library-chip-title">${e.name||"—"}</span>
                                ${i||a?N`
                                  <span class="mass-library-chip-sub">${i||a}</span>
                                `:""}
                              </div>
                            </button>
                          `})}
                      </div>
                    </div>
                  `:""}):N`
                  <div class="mass-queue-empty">
                    <div class="mass-search-spinner mass-search-spinner-center"></div>
                    <div>${t._t("mass_search_loading")}</div>
                  </div>
                `}
          </div>
        </div>
      `:""}

      ${t._renderMainButtons(n)}
      </div>
    `},vacuum:function(t,e,n="standard",i=!0){const a=e.state,s=e.attributes||{},r=s.battery_level??s.battery??s.battery_percent??s.batteryPercentage,o=null!=r&&Number.isFinite(Number(r))?Math.max(0,Math.min(100,Number(r))):null,c="mini"===n;return"bar"===n?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"cleaning"===a?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n)}</div>
              <div class="bar-state">${t._getVacuumStateText(a)}${null!=o?` · ${o}%`:""}</div>
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
            ${i?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(n)}
      `:N`
      <div class="header ${c?"header-mini":""}">
        ${t._renderHeaderIcon(e,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          <span class="device-value">${t._getVacuumStateText(a)}${null!=o?` · ${o}%`:""}</span>
        </div>
        ${t._renderHeaderAction(i)}
      </div>

      <div class="vacuum-status ${c?"vacuum-status-mini":""}">
        <div class="status-badge ${c?"status-badge-mini":""}">${t._getVacuumStateText(a)}</div>
        ${null!=o?N`
        <div class="battery-display ${c?"battery-display-mini":""}">
          <ha-icon icon="mdi:battery${o>90?"":o>50?"-50":"-20"}"></ha-icon>
          <span>${o}%</span>
        </div>
        `:""}
      </div>

      <div class="vacuum-controls ${c?"vacuum-controls-mini":""}">
        <button class="vacuum-btn ${c?"vacuum-btn-mini":""}" @click="${()=>t._callService("vacuum","start")}">
          <ha-icon icon="mdi:play"></ha-icon>
          <span>${t._t("start")}</span>
        </button>
        <button class="vacuum-btn ${c?"vacuum-btn-mini":""}" @click="${()=>t._callService("vacuum","pause")}">
          <ha-icon icon="mdi:pause"></ha-icon>
          <span>${t._t("pause")}</span>
        </button>
        <button class="vacuum-btn ${c?"vacuum-btn-mini":""}" @click="${()=>t._callService("vacuum","return_to_base")}">
          <ha-icon icon="mdi:home"></ha-icon>
          <span>${t._t("return_home")}</span>
        </button>
      </div>
      ${t._renderMainButtons(n)}
    `},water_heater:function(t,e,n="standard",i=!0){const a=e.attributes.temperature||0,s=e.attributes.current_temperature||0,r="mini"===n;return"bar"===n?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n)}</div>
              <div class="bar-state">${s}°C → ${a}°C</div>
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
            ${i?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(n)}
      `:N`
      <div class="header ${r?"header-mini":""}">
        ${t._renderHeaderIcon(e,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          <span class="device-value">${s}°C → ${a}°C</span>
        </div>
        ${t._renderHeaderAction(i)}
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
      ${t._renderMainButtons(n)}
    `},generic:function(t,e,n="standard",i=!0){const a="mini"===n;return"bar"===n?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,n)}</div>
              <div class="bar-state">${e.state}</div>
            </div>
          </div>
          <div class="bar-right">
            ${i?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(n)}
      `:N`
      <div class="header ${a?"header-mini":""}">
        ${t._renderHeaderIcon(e,a)}
        <div class="device-name ${a?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),n)}
          <span class="device-value">${e.state}</span>
        </div>
        ${t._renderHeaderAction(i)}
      </div>

      <div class="temp-control ${a?"temp-control-mini":""}">
        <div style="width: 64px;"></div>
        <div class="target-display">
          <span class="label">${t._t("device")}</span>
          <span class="value ${a?"value-mini":""}">${e.state}</span>
        </div>
        <div style="width: 64px;"></div>
      </div>
      ${t._renderMainButtons(n)}
    `}};class vt extends tt{static get properties(){return{hass:{},config:{},_showPopup:{type:Boolean},_showTextPopup:{type:Boolean},_popupText:{type:String},_translations:{type:Object},_fanModeExpanded:{type:Boolean},_massQueueItems:{type:Array},_massQueueExpanded:{type:Boolean},_massQueueLoading:{type:Boolean},_massLibraryItems:{type:Array},_massLibraryExpanded:{type:Boolean},_massLibraryLoading:{type:Boolean},_massSearchExpanded:{type:Boolean},_massSearchQuery:{type:String},_massSearchLoading:{type:Boolean},_massSearchResults:{type:Object}}}constructor(){super(),this._showPopup=!1,this._showTextPopup=!1,this._popupText="",this._translations={},this._fanModeExpanded=!1,this._iconLongPressTimer=null,this._iconLongPressFired=!1,this._iconLastTapTime=0,this._massQueueItems=[],this._massQueueExpanded=!1,this._massQueueLoading=!1,this._massLibraryItems=[],this._massLibraryExpanded=!1,this._massLibraryLoading=!1,this._massSearchExpanded=!1,this._massSearchQuery="",this._massSearchLoading=!1,this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]},this._massSearchSuggestionsOpen=!1,this._massSearchHistory=[]}async connectedCallback(){super.connectedCallback(),await this._loadTranslations(),this._createPopupPortal(),this._loadSearchHistory()}disconnectedCallback(){super.disconnectedCallback(),this._removePopupPortal()}_createPopupPortal(){if(!0!==this.config?.disable_popup&&!this._popupPortal){this._popupPortal=document.createElement("div"),this._popupPortal.className="udc-popup-portal";const t=this._isInBubbleCardPopup(),e=t?1e4:1e3;this._popupPortal.style.cssText=`position: fixed; inset: 0; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh; min-height: -webkit-fill-available; pointer-events: none; z-index: ${e};`;const n=document.createElement("style");n.textContent=function(t=!1){return`\n      /* Popup Styles */\n      .popup-overlay {\n        position: fixed !important; \n        inset: 0 !important;\n        top: 0 !important; \n        left: 0 !important; \n        right: 0 !important; \n        bottom: 0 !important;\n        min-height: 100vh;\n        min-height: 100dvh;\n        padding:\n          env(safe-area-inset-top, 0px)\n          env(safe-area-inset-right, 0px)\n          env(safe-area-inset-bottom, 0px)\n          env(safe-area-inset-left, 0px);\n        background: rgba(0,0,0,0.7); \n        backdrop-filter: blur(12px);\n        -webkit-backdrop-filter: blur(12px);\n        display: flex; \n        align-items: flex-end;\n        justify-content: center; \n        z-index: 9999 !important;\n        animation: fadeIn 0.3s;\n        /* 重要：確保 popup 不受父元素的 transform/filter 影響 */\n        transform: none !important;\n        will-change: auto;\n        overscroll-behavior: contain;\n      }\n      \n      .popup-content {\n        width: 100%; \n        max-height: 85vh; \n        max-height: 85dvh;\n        background: var(--card-background-color);\n        border-radius: 36px 36px 0 0; \n        padding: 20px;\n        padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));\n        overflow-y: auto; \n        -webkit-overflow-scrolling: touch;\n        overscroll-behavior: contain;\n        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);\n      }\n\n      @supports (-webkit-touch-callout: none) {\n        .popup-overlay {\n          min-height: -webkit-fill-available;\n        }\n\n        .popup-content {\n          max-height: calc(100dvh - env(safe-area-inset-top, 0px) - 8px);\n          border-radius: 30px 30px 0 0;\n        }\n      }\n\n      /* 寬屏幕支持 - 在桌面設備上顯示為居中對話框 */\n      @media (min-width: 768px) {\n        .popup-overlay {\n          align-items: center;\n          padding: 20px;\n        }\n\n        .popup-content {\n          max-width: 820px;\n          width: min(92vw, 820px);\n          max-height: 86vh;\n          max-height: 86dvh;\n          border-radius: 24px;\n          padding-bottom: 20px;\n          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n          animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);\n        }\n\n        @keyframes scaleIn {\n          from {\n            opacity: 0;\n            transform: scale(0.9);\n          }\n          to {\n            opacity: 1;\n            transform: scale(1);\n          }\n        }\n      }\n      \n      .popup-header {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        margin-bottom: 24px;\n      }\n      \n      .popup-drag-handle { \n        width: 50px; \n        height: 5px; \n        background: rgba(var(--rgb-primary-text-color), 0.2); \n        border-radius: 3px; \n      }\n      \n      .close-btn {\n        position: absolute;\n        right: 0;\n        cursor: pointer;\n        color: var(--secondary-text-color);\n        padding: 4px;\n        transition: color 0.3s;\n      }\n\n      .close-btn:hover {\n        color: var(--primary-text-color);\n      }\n\n      /* Sensor Chips */\n      .chips-container { \n        display: flex; \n        flex-wrap: wrap; \n        gap: 10px; \n        margin-bottom: 24px; \n      }\n      \n      .chip { \n        display: flex; \n        align-items: center; \n        gap: 8px; \n        padding: 8px 16px; \n        background: rgba(var(--rgb-primary-text-color), 0.06); \n        border-radius: 100px; \n        font-size: 0.9rem; \n        font-weight: 600;\n      }\n\n      /* Control Cards */\n      .controls-list { \n        display: flex; \n        flex-direction: column; \n        gap: 14px; \n      }\n      \n      .control-card {\n        background: rgba(var(--rgb-primary-text-color), 0.04);\n        padding: 18px; \n        border-radius: 24px;\n        display: flex; \n        justify-content: space-between; \n        align-items: center;\n      }\n      \n      .control-header { \n        display: flex; \n        align-items: center; \n        gap: 14px; \n        font-weight: 700; \n      }\n      \n      .no-controls {\n        text-align: center;\n        padding: 32px;\n        opacity: 0.5;\n      }\n\n      /* Unavailable State Styles */\n      .chip-unavailable {\n        opacity: 0.5;\n        background: rgba(var(--rgb-primary-text-color), 0.03) !important;\n      }\n\n      .control-card-unavailable {\n        opacity: 0.6;\n        pointer-events: none;\n      }\n\n      .control-card-unavailable .control-action {\n        filter: grayscale(0.8);\n      }\n\n      .unavailable-badge {\n        font-size: 0.7rem;\n        padding: 2px 8px;\n        border-radius: 10px;\n        background: rgba(255, 87, 34, 0.15);\n        color: #ff5722;\n        margin-left: 8px;\n        font-weight: 600;\n      }\n\n      .unavailable-text {\n        opacity: 0.4;\n      }\n\n      /* Control Actions */\n      .select-grid { \n        display: grid; \n        grid-template-columns: repeat(2, 1fr); \n        gap: 8px; \n        width: 55%; \n      }\n      \n      .select-opt { \n        padding: 10px 4px; \n        text-align: center; \n        background: rgba(var(--rgb-primary-text-color), 0.06); \n        border-radius: 12px; \n        font-size: 0.75rem; \n        cursor: pointer; \n        font-weight: 500; \n        transition: all 0.2s;\n      }\n      \n      .select-opt:hover {\n        background: rgba(var(--rgb-primary-text-color), 0.12);\n      }\n      \n      .select-opt.active { \n        background: var(--accent-color); \n        color: white; \n      }\n\n      .select-opt.disabled {\n        opacity: 0.4;\n        cursor: not-allowed;\n        pointer-events: none;\n      }\n\n      .number-control {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n      }\n\n      .number-control button {\n        width: 36px;\n        height: 36px;\n        border-radius: 50%;\n        border: none;\n        background: rgba(var(--rgb-primary-text-color), 0.1);\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .number-control button:hover {\n        background: var(--accent-color);\n        color: white;\n      }\n\n      .number-control button:disabled {\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n\n      .action-btn {\n        padding: 8px 16px;\n        border-radius: 12px;\n        border: none;\n        background: var(--accent-color);\n        color: white;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .action-btn:hover {\n        transform: scale(1.05);\n      }\n\n      .action-btn:disabled {\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n\n      .state-text {\n        font-weight: 600;\n        opacity: 0.8;\n      }\n\n      .popup-content {\n        background: linear-gradient(165deg, rgba(32, 32, 38, 0.98) 0%, rgba(18, 18, 22, 0.99) 100%) !important;\n        border: 1px solid rgba(255, 255, 255, 0.08);\n        box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.45);\n        color-scheme: dark;\n        --primary-text-color: rgba(255, 255, 255, 0.94);\n        --secondary-text-color: rgba(255, 255, 255, 0.68);\n        --disabled-text-color: rgba(255, 255, 255, 0.42);\n        --rgb-primary-text-color: 255, 255, 255;\n        --rgb-secondary-text-color: 255, 255, 255;\n        --divider-color: rgba(255, 255, 255, 0.1);\n        --mdc-theme-on-surface: rgba(255, 255, 255, 0.94);\n        --mdc-theme-text-primary-on-background: rgba(255, 255, 255, 0.94);\n        --mdc-theme-text-secondary-on-background: rgba(255, 255, 255, 0.68);\n        --mdc-icon-color: rgba(255, 255, 255, 0.88);\n        --primary-text-color-rgb: 255, 255, 255;\n        color: rgba(255, 255, 255, 0.94) !important;\n      }\n\n      .popup-content .popup-title,\n      .popup-content .sensor-value,\n      .popup-content .control-row-label,\n      .popup-content .state-text,\n      .popup-content .number-control span,\n      .popup-content .chip {\n        color: rgba(255, 255, 255, 0.94) !important;\n      }\n\n      .popup-content .popup-section-title,\n      .popup-content .sensor-label {\n        color: rgba(255, 255, 255, 0.62) !important;\n        opacity: 1 !important;\n      }\n\n      .popup-content .close-btn {\n        color: rgba(255, 255, 255, 0.78) !important;\n      }\n\n      .popup-content .close-btn:hover {\n        color: rgba(255, 255, 255, 0.96) !important;\n      }\n\n      .popup-content ha-icon {\n        color: rgba(255, 255, 255, 0.88);\n      }\n\n      .popup-content .select-opt {\n        color: rgba(255, 255, 255, 0.88) !important;\n      }\n\n      .popup-content .select-opt.active {\n        color: #fff !important;\n        background: var(--accent-color, #03a9f4) !important;\n        border-color: transparent;\n      }\n\n      .popup-content .number-control button {\n        color: rgba(255, 255, 255, 0.9) !important;\n      }\n\n      .popup-content .action-btn {\n        color: #fff !important;\n      }\n\n      .popup-content .unavailable-badge {\n        background: rgba(255, 87, 34, 0.22) !important;\n        color: #ffab91 !important;\n      }\n\n      .popup-content .no-controls {\n        color: rgba(255, 255, 255, 0.55) !important;\n      }\n      /* ===== Mobile Device Panel v2.6.4 ===== */\n      .popup-status {\n        display: none;\n      }\n\n      @media (max-width: 767px) {\n        .popup-overlay {\n          align-items: flex-end !important;\n          padding: 0 !important;\n          background: rgba(0, 0, 0, 0.62) !important;\n        }\n\n        .popup-content {\n          display: flex !important;\n          flex-direction: column !important;\n          width: 100% !important;\n          max-width: 100% !important;\n          max-height: min(94dvh, 960px) !important;\n          border-radius: 24px 24px 0 0 !important;\n          padding: 4px 12px 0 !important;\n          overflow: hidden !important;\n          border: 1px solid rgba(255, 255, 255, 0.1) !important;\n          border-bottom: none !important;\n          box-shadow: 0 -16px 56px rgba(0, 0, 0, 0.6) !important;\n          will-change: transform;\n          transition: transform 0.18s ease-out;\n        }\n\n        .popup-content.is-dragging {\n          transition: none !important;\n        }\n\n        .popup-header {\n          position: relative !important;\n          z-index: 6 !important;\n          flex-shrink: 0 !important;\n          margin-bottom: 0 !important;\n          padding: 2px 2px 10px !important;\n          background: transparent !important;\n          border-bottom: none !important;\n          backdrop-filter: none !important;\n        }\n\n        .popup-drag-handle {\n          width: 40px !important;\n          height: 4px !important;\n          margin-bottom: 8px !important;\n          background: rgba(255, 255, 255, 0.32) !important;\n          position: relative;\n        }\n\n        .popup-drag-handle::before {\n          content: '';\n          position: absolute;\n          inset: -14px -48px;\n        }\n\n        .popup-title {\n          font-size: 1.14rem !important;\n          font-weight: 750 !important;\n          line-height: 1.2 !important;\n        }\n\n        .popup-subtitle {\n          display: block !important;\n          text-align: left !important;\n          font-size: 0.66rem !important;\n          margin-top: 2px !important;\n          color: rgba(255, 255, 255, 0.4) !important;\n        }\n\n        .popup-content .close-btn {\n          width: 38px !important;\n          height: 38px !important;\n          background: rgba(255, 255, 255, 0.08) !important;\n        }\n\n        .popup-status {\n          display: flex;\n          align-items: center;\n          gap: 10px;\n          margin: 0 2px 10px;\n          padding: 10px 12px;\n          border-radius: 14px;\n          background: rgba(255, 255, 255, 0.06);\n          border: 1px solid rgba(255, 255, 255, 0.08);\n          flex-shrink: 0;\n        }\n\n        .popup-status-dot {\n          width: 10px;\n          height: 10px;\n          border-radius: 50%;\n          background: rgba(255, 255, 255, 0.28);\n          flex-shrink: 0;\n          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);\n        }\n\n        .popup-status.is-on .popup-status-dot {\n          background: #4caf50;\n          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.22);\n        }\n\n        .popup-status.is-off .popup-status-dot {\n          background: rgba(255, 255, 255, 0.28);\n        }\n\n        .popup-status.is-unavailable .popup-status-dot {\n          background: #ff7043;\n          box-shadow: 0 0 0 3px rgba(255, 112, 67, 0.2);\n        }\n\n        .popup-status-meta {\n          flex: 1;\n          min-width: 0;\n          display: flex;\n          flex-direction: column;\n          gap: 1px;\n        }\n\n        .popup-status-label {\n          font-size: 0.62rem;\n          font-weight: 650;\n          letter-spacing: 0.08em;\n          text-transform: uppercase;\n          color: rgba(255, 255, 255, 0.42);\n        }\n\n        .popup-status-value {\n          font-size: 0.95rem;\n          font-weight: 700;\n          color: rgba(255, 255, 255, 0.94);\n          white-space: nowrap;\n          overflow: hidden;\n          text-overflow: ellipsis;\n        }\n\n        .popup-status-action {\n          flex-shrink: 0;\n        }\n\n        .popup-body {\n          flex: 1 1 auto !important;\n          min-height: 0 !important;\n          overflow-y: auto !important;\n          -webkit-overflow-scrolling: touch;\n          overscroll-behavior: contain;\n          gap: 12px !important;\n          padding: 2px 2px calc(18px + env(safe-area-inset-bottom, 0px)) !important;\n          mask-image: linear-gradient(180deg, #000 0%, #000 calc(100% - 18px), transparent 100%);\n          -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 calc(100% - 18px), transparent 100%);\n        }\n\n        .popup-section-title {\n          font-size: 0.6rem !important;\n          letter-spacing: 0.14em !important;\n          margin-bottom: 7px !important;\n          opacity: 1 !important;\n          color: rgba(255, 255, 255, 0.48) !important;\n        }\n\n        .sensor-grid {\n          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n          gap: 7px !important;\n        }\n\n        .sensor-card {\n          flex-direction: column !important;\n          align-items: stretch !important;\n          gap: 6px !important;\n          min-height: 0 !important;\n          padding: 11px 11px 10px !important;\n          border-radius: 15px !important;\n          background: rgba(255, 255, 255, 0.055) !important;\n          border: 1px solid rgba(255, 255, 255, 0.07) !important;\n        }\n\n        .sensor-card.is-on {\n          background: rgba(76, 175, 80, 0.12) !important;\n          border-color: rgba(76, 175, 80, 0.28) !important;\n        }\n\n        .sensor-card.is-on .sensor-value {\n          color: #81c784 !important;\n        }\n\n        .sensor-card.is-off .sensor-value {\n          color: rgba(255, 255, 255, 0.55) !important;\n        }\n\n        .sensor-card:active {\n          background: rgba(255, 255, 255, 0.1) !important;\n        }\n\n        .sensor-card ha-icon {\n          width: 17px !important;\n          height: 17px !important;\n          margin-top: 0 !important;\n          opacity: 0.65 !important;\n        }\n\n        .sensor-card-body {\n          display: flex !important;\n          flex-direction: column !important;\n          gap: 2px !important;\n        }\n\n        .sensor-value {\n          order: -1 !important;\n          font-size: 1.18rem !important;\n          font-weight: 750 !important;\n          letter-spacing: -0.02em !important;\n          line-height: 1.12 !important;\n        }\n\n        .sensor-label {\n          font-size: 0.66rem !important;\n          font-weight: 600 !important;\n          color: rgba(255, 255, 255, 0.5) !important;\n          opacity: 1 !important;\n          display: -webkit-box;\n          -webkit-line-clamp: 2;\n          -webkit-box-orient: vertical;\n          overflow: hidden;\n        }\n\n        .sensor-grid .sensor-card:last-child:nth-child(odd) {\n          grid-column: 1 / -1;\n        }\n\n        .controls-group {\n          border-radius: 16px !important;\n          background: rgba(255, 255, 255, 0.04) !important;\n          border: 1px solid rgba(255, 255, 255, 0.07) !important;\n        }\n\n        .control-row {\n          min-height: 52px;\n          padding: 10px 11px !important;\n          gap: 9px !important;\n        }\n\n        .control-row:active:not(.control-row-unavailable) {\n          background: rgba(255, 255, 255, 0.07) !important;\n        }\n\n        .control-row-icon {\n          width: 32px !important;\n          height: 32px !important;\n          border-radius: 10px !important;\n          background: rgba(255, 255, 255, 0.08) !important;\n        }\n\n        .control-row-label {\n          font-size: 0.86rem !important;\n          line-height: 1.25 !important;\n        }\n\n        .control-row:has(.select-grid),\n        .control-row:has(.number-control) {\n          flex-wrap: wrap;\n        }\n\n        .control-row:has(.select-grid) .control-row-action,\n        .control-row:has(.number-control) .control-row-action {\n          flex: 1 1 100%;\n          margin-top: 5px;\n          justify-content: stretch !important;\n        }\n\n        .control-row:has(.select-grid) .select-grid {\n          max-width: 100% !important;\n          width: 100% !important;\n          display: grid !important;\n          grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)) !important;\n          gap: 5px !important;\n          justify-content: stretch !important;\n        }\n\n        .select-opt {\n          min-height: 40px !important;\n          display: flex !important;\n          align-items: center !important;\n          justify-content: center !important;\n          padding: 8px 5px !important;\n          font-size: 0.72rem !important;\n          font-weight: 650 !important;\n          border-radius: 11px !important;\n          -webkit-tap-highlight-color: transparent;\n        }\n\n        .select-opt:active {\n          transform: scale(0.97);\n        }\n\n        .control-row:has(.number-control) .number-control {\n          width: 100%;\n          justify-content: space-between;\n          padding: 5px 6px !important;\n          border-radius: 12px !important;\n        }\n\n        .number-control button {\n          width: 42px !important;\n          height: 42px !important;\n          border-radius: 12px !important;\n          font-size: 1.15rem !important;\n        }\n\n        .number-control span {\n          min-width: 52px !important;\n          font-size: 1.08rem !important;\n        }\n\n        .action-btn {\n          width: 44px !important;\n          height: 44px !important;\n          border-radius: 12px !important;\n        }\n\n        ha-switch {\n          transform: scale(1.08);\n          transform-origin: center right;\n        }\n\n        .no-controls {\n          padding: 32px 14px !important;\n        }\n      }\n\n      @media (max-width: 380px) {\n        .sensor-grid {\n          grid-template-columns: 1fr !important;\n        }\n        .sensor-grid .sensor-card:last-child:nth-child(odd) {\n          grid-column: auto;\n        }\n        .popup-title {\n          font-size: 1.02rem !important;\n        }\n      }\n\n      @media (min-width: 381px) and (max-width: 767px) {\n        .popup-content[data-sensors='1'] .sensor-grid {\n          grid-template-columns: 1fr !important;\n        }\n      }\n\n      @media (max-width: 900px) and (max-height: 480px) and (orientation: landscape) {\n        .popup-content {\n          max-height: 96dvh !important;\n          border-radius: 16px 16px 0 0 !important;\n        }\n        .popup-status {\n          display: none !important;\n        }\n        .sensor-grid {\n          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;\n        }\n        .popup-body {\n          gap: 8px !important;\n        }\n      }\n\n/* ===== Responsive Device Panel v2.6 ===== */\n      .popup-title-wrap {\n        min-width: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n      }\n\n      .popup-subtitle {\n        display: none;\n        font-size: 0.72rem;\n        font-weight: 500;\n        color: rgba(255, 255, 255, 0.45) !important;\n        letter-spacing: 0.01em;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .popup-body {\n        display: flex;\n        flex-direction: column;\n        gap: 18px;\n      }\n\n      .popup-section-sensors,\n      .popup-section-controls {\n        min-width: 0;\n      }\n\n      /* —— Mobile (default): bottom sheet —— */\n      .popup-content {\n        padding: 10px 16px calc(18px + env(safe-area-inset-bottom, 0px)) !important;\n        max-height: 88vh !important;\n        max-height: 88dvh !important;\n      }\n\n      .popup-header {\n        display: grid !important;\n        grid-template-columns: 1fr 40px !important;\n        grid-template-rows: auto auto !important;\n        align-items: center !important;\n        column-gap: 8px !important;\n        margin-bottom: 14px !important;\n        padding-bottom: 0 !important;\n        border-bottom: none !important;\n      }\n\n      .popup-drag-handle {\n        grid-column: 1 / -1 !important;\n        grid-row: 1 !important;\n        justify-self: center !important;\n        margin-bottom: 12px !important;\n        display: block !important;\n      }\n\n      .popup-title-wrap {\n        grid-column: 1 !important;\n        grid-row: 2 !important;\n      }\n\n      .popup-title {\n        text-align: left !important;\n        font-size: 1.08rem !important;\n      }\n\n      .popup-content .close-btn {\n        grid-column: 2 !important;\n        grid-row: 2 !important;\n        justify-self: end !important;\n        align-self: center !important;\n      }\n\n      .sensor-grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n        gap: 8px !important;\n      }\n\n      .sensor-card {\n        min-height: 64px !important;\n        padding: 12px !important;\n        border-radius: 14px !important;\n      }\n\n      .sensor-value {\n        font-size: 0.98rem !important;\n      }\n\n      .control-row {\n        min-height: 52px;\n        padding: 12px 12px !important;\n        gap: 10px !important;\n      }\n\n      .control-row-icon {\n        width: 36px !important;\n        height: 36px !important;\n        border-radius: 11px !important;\n      }\n\n      /* Mobile: wide option grids wrap under label for touch */\n      .control-row:has(.select-grid) {\n        flex-wrap: wrap;\n      }\n\n      .control-row:has(.select-grid) .control-row-action {\n        flex: 1 1 100%;\n        margin-top: 4px;\n        justify-content: flex-start !important;\n      }\n\n      .control-row:has(.select-grid) .select-grid {\n        max-width: 100% !important;\n        width: 100% !important;\n        justify-content: flex-start !important;\n      }\n\n      @media (max-width: 380px) {\n        .sensor-grid {\n          grid-template-columns: 1fr !important;\n        }\n      }\n\n      /* —— Desktop / tablet: centered dual-pane dialog —— */\n      @media (min-width: 768px) {\n        .popup-overlay {\n          align-items: center !important;\n          justify-content: center !important;\n          padding: 28px !important;\n        }\n\n        .popup-content {\n          width: min(92vw, 820px) !important;\n          max-width: 820px !important;\n          max-height: 86vh !important;\n          max-height: 86dvh !important;\n          border-radius: 24px !important;\n          padding: 28px 32px 30px !important;\n          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55) !important;\n        }\n\n        .popup-drag-handle {\n          display: none !important;\n        }\n\n        .popup-header {\n          grid-template-columns: 1fr 44px !important;\n          grid-template-rows: auto !important;\n          margin-bottom: 22px !important;\n          padding-bottom: 16px !important;\n          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n        }\n\n        .popup-title-wrap {\n          grid-column: 1 !important;\n          grid-row: 1 !important;\n        }\n\n        .popup-title {\n          font-size: 1.28rem !important;\n          letter-spacing: -0.01em !important;\n        }\n\n        .popup-subtitle {\n          display: block !important;\n          text-align: left !important;\n          margin-top: 4px;\n        }\n\n        .popup-content .close-btn {\n          grid-column: 2 !important;\n          grid-row: 1 !important;\n          width: 40px !important;\n          height: 40px !important;\n        }\n\n        .popup-content.has-both .popup-body {\n          display: grid !important;\n          grid-template-columns: minmax(240px, 0.92fr) minmax(300px, 1.18fr);\n          gap: 28px;\n          align-items: start;\n        }\n\n        .popup-section-title {\n          position: sticky;\n          top: 0;\n          z-index: 1;\n          background: linear-gradient(180deg, rgba(24, 24, 28, 0.98) 60%, rgba(24, 24, 28, 0));\n          padding-top: 2px;\n          padding-bottom: 8px;\n          margin-bottom: 8px !important;\n        }\n\n        .popup-section-controls .controls-group {\n          max-height: calc(86dvh - 170px);\n          overflow-y: auto;\n          overscroll-behavior: contain;\n        }\n\n        .sensor-grid {\n          gap: 12px !important;\n        }\n\n        .sensor-card {\n          min-height: 78px !important;\n          padding: 16px !important;\n          border-radius: 16px !important;\n        }\n\n        .sensor-value {\n          font-size: 1.12rem !important;\n        }\n\n        .control-row {\n          min-height: 56px;\n          padding: 14px 16px !important;\n        }\n\n        .control-row:has(.select-grid) {\n          flex-wrap: nowrap;\n        }\n\n        .control-row:has(.select-grid) .control-row-action {\n          flex: 0 0 auto;\n          margin-top: 0;\n          width: auto;\n          justify-content: flex-end !important;\n        }\n\n        .control-row:has(.select-grid) .select-grid {\n          max-width: 220px !important;\n          width: auto !important;\n          justify-content: flex-end !important;\n        }\n\n        .control-row:hover:not(.control-row-unavailable) {\n          background: rgba(255, 255, 255, 0.055) !important;\n        }\n\n        .popup-content.has-sensors-only .sensor-grid {\n          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;\n        }\n\n        .popup-content.has-controls-only .controls-group {\n          max-height: calc(86dvh - 140px);\n        }\n      }\n\n      @media (min-width: 1100px) {\n        .popup-content {\n          width: min(90vw, 960px) !important;\n          max-width: 960px !important;\n          padding: 32px 36px 34px !important;\n        }\n\n        .popup-content.has-both .popup-body {\n          grid-template-columns: minmax(280px, 1fr) minmax(340px, 1.25fr);\n          gap: 36px;\n        }\n\n        .popup-content.has-both .sensor-grid {\n          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n        }\n\n        .popup-content.has-sensors-only .sensor-grid {\n          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;\n        }\n      }\n\n\n      .popup-header {\n        display: grid;\n        grid-template-columns: 40px 1fr 40px;\n        align-items: center;\n        margin-bottom: 20px;\n        padding-bottom: 4px;\n      }\n\n      .popup-title {\n        font-size: 1.05rem;\n        font-weight: 700;\n        text-align: center;\n        letter-spacing: 0.01em;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding: 0 4px;\n      }\n\n      .popup-drag-handle {\n        grid-column: 2;\n        justify-self: center;\n        width: 40px;\n        height: 4px;\n        background: rgba(255, 255, 255, 0.18);\n        border-radius: 4px;\n        margin-bottom: 10px;\n      }\n\n      .close-btn {\n        grid-column: 3;\n        grid-row: 1;\n        width: 36px;\n        height: 36px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        background: rgba(255, 255, 255, 0.06);\n        border: 1px solid rgba(255, 255, 255, 0.08);\n        transition: background 0.2s, transform 0.15s;\n      }\n\n      .close-btn:hover {\n        background: rgba(255, 255, 255, 0.12);\n        transform: scale(1.05);\n      }\n\n      .popup-section {\n        margin-bottom: 20px;\n      }\n\n      .popup-section-title {\n        font-size: 0.68rem;\n        font-weight: 700;\n        letter-spacing: 0.12em;\n        text-transform: uppercase;\n        opacity: 0.45;\n        margin-bottom: 10px;\n        padding-left: 2px;\n      }\n\n      .sensor-grid {\n        display: grid;\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n        gap: 10px;\n      }\n\n      .sensor-card {\n        display: flex;\n        align-items: flex-start;\n        gap: 10px;\n        padding: 14px;\n        border-radius: 16px;\n        background: rgba(255, 255, 255, 0.05);\n        border: 1px solid rgba(255, 255, 255, 0.07);\n        min-height: 72px;\n      }\n\n      .sensor-card ha-icon {\n        width: 22px;\n        height: 22px;\n        opacity: 0.75;\n        flex-shrink: 0;\n        margin-top: 2px;\n      }\n\n      .sensor-card-body {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        min-width: 0;\n      }\n\n      .sensor-label {\n        font-size: 0.72rem;\n        font-weight: 600;\n        opacity: 0.55;\n        line-height: 1.2;\n        word-break: break-word;\n      }\n\n      .sensor-value {\n        font-size: 1.02rem;\n        font-weight: 700;\n        line-height: 1.2;\n        letter-spacing: -0.01em;\n      }\n\n      .sensor-card-unavailable {\n        opacity: 0.45;\n      }\n\n      .controls-group {\n        border-radius: 18px;\n        overflow: hidden;\n        background: rgba(255, 255, 255, 0.04);\n        border: 1px solid rgba(255, 255, 255, 0.07);\n      }\n\n      .control-row {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 13px 14px;\n        border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n        transition: background 0.15s;\n      }\n\n      .control-row:last-child {\n        border-bottom: none;\n      }\n\n      .control-row:hover:not(.control-row-unavailable) {\n        background: rgba(255, 255, 255, 0.03);\n      }\n\n      .control-row-icon {\n        width: 38px;\n        height: 38px;\n        border-radius: 12px;\n        background: rgba(255, 255, 255, 0.07);\n        border: 1px solid rgba(255, 255, 255, 0.06);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n      }\n\n      .control-row-icon ha-icon {\n        width: 20px;\n        height: 20px;\n        opacity: 0.85;\n      }\n\n      .control-row-label {\n        flex: 1;\n        font-weight: 600;\n        font-size: 0.9rem;\n        line-height: 1.25;\n        min-width: 0;\n        word-break: break-word;\n      }\n\n      .control-row-action {\n        flex-shrink: 0;\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n      }\n\n      .control-row-unavailable {\n        opacity: 0.5;\n        pointer-events: none;\n      }\n\n      .select-grid {\n        display: flex !important;\n        flex-wrap: wrap;\n        gap: 6px !important;\n        width: auto !important;\n        max-width: 160px;\n        justify-content: flex-end;\n      }\n\n      .select-opt {\n        padding: 6px 10px !important;\n        border-radius: 10px !important;\n        font-size: 0.7rem !important;\n        border: 1px solid rgba(255, 255, 255, 0.08);\n        background: rgba(255, 255, 255, 0.06) !important;\n      }\n\n      .select-opt.active {\n        box-shadow: 0 2px 8px rgba(3, 169, 244, 0.35);\n      }\n\n      .number-control {\n        gap: 8px !important;\n        background: rgba(255, 255, 255, 0.06);\n        border-radius: 12px;\n        padding: 4px 6px;\n        border: 1px solid rgba(255, 255, 255, 0.08);\n      }\n\n      .number-control button {\n        width: 32px !important;\n        height: 32px !important;\n        background: rgba(255, 255, 255, 0.08) !important;\n      }\n\n      .number-control span {\n        min-width: 36px !important;\n        font-size: 0.95rem;\n        font-weight: 700;\n      }\n\n      .action-btn {\n        width: 38px !important;\n        height: 38px !important;\n        border-radius: 12px !important;\n        padding: 0 !important;\n      }\n\n      button:disabled,\n      ha-switch[disabled] {\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n\n      @keyframes fadeIn {\n        from { opacity: 0; }\n        to { opacity: 1; }\n      }\n      @keyframes slideUp {\n        from { transform: translateY(100%); }\n        to { transform: translateY(0); }\n      }\n      ha-switch {\n        --mdc-theme-secondary: var(--accent-color, #03a9f4);\n      }\n      ha-icon {\n        color: var(--primary-text-color, #fff);\n      }\n\n      .popup-overlay { z-index: ${t?1e4:1e3} !important; }\n`}(t),this._popupPortal.appendChild(n),document.body.appendChild(this._popupPortal)}}_isInBubbleCardPopup(){let t=this;for(;t&&t.parentNode;){if(t=t.parentNode,t.host&&(t=t.host),t.classList){if(Array.from(t.classList).some(t=>t.includes("bubble")||t.includes("popup-container")))return!0}if("BUBBLE-CARD"===t.tagName||"BUBBLE-POP-UP"===t.tagName)return!0}return!1}_removePopupPortal(){this._lockPopupScroll(!1),this._unbindPopupSheetGestures(),this._popupPortal&&this._popupPortal.parentNode&&(this._popupPortal.parentNode.removeChild(this._popupPortal),this._popupPortal=null)}_closePopup(){this._showPopup=!1,this._lockPopupScroll(!1),this._unbindPopupSheetGestures(),this.requestUpdate()}_lockPopupScroll(t){try{document.documentElement.style.overflow=t?"hidden":"",document.body.style.overflow=t?"hidden":""}catch(t){}}_bindPopupSheetGestures(t,e){if(!t||window.matchMedia&&!window.matchMedia("(max-width: 767px)").matches)return;this._unbindPopupSheetGestures();const n=e||t.querySelector(".popup-header")||t;let i=0,a=0,s=!1;const r=e=>{const n=e.touches?e.touches[0]:e;i=n.clientY,a=0,s=!0,t.classList.add("is-dragging")},o=e=>{if(!s)return;const n=e.touches?e.touches[0]:e;a=Math.max(0,n.clientY-i),t.style.transform=`translateY(${a}px)`},c=()=>{s&&(s=!1,t.classList.remove("is-dragging"),a>100||a>.25*t.offsetHeight?(t.style.transform="translateY(110%)",setTimeout(()=>this._closePopup(),150)):(t.style.transform="",a=0))};n.addEventListener("touchstart",r,{passive:!0}),window.addEventListener("touchmove",o,{passive:!0}),window.addEventListener("touchend",c),window.addEventListener("touchcancel",c),this._popupGestureCleanup=()=>{n.removeEventListener("touchstart",r),window.removeEventListener("touchmove",o),window.removeEventListener("touchend",c),window.removeEventListener("touchcancel",c)}}_unbindPopupSheetGestures(){"function"==typeof this._popupGestureCleanup&&(this._popupGestureCleanup(),this._popupGestureCleanup=null)}async _loadTranslations(){const t=this.config?.language||this.hass?.language||"en",e={"zh-Hant":"zh-TW"}[t]||t;if(this._translations=nt[e]||nt[t]||nt.en,"auto"!==t)try{const n=et();let i=await fetch(`${n}${t}.json`);if(i.ok||t===e||(i=await fetch(`${n}${e}.json`)),i.ok){const t=await i.json();this._translations={...this._translations,...t}}}catch(t){}}_t(t){return this._translations[t]||nt.en[t]||t}static getConfigElement(){return document.createElement("device-hub-card-editor")}static getStubConfig(){return{entity:"",layout:"standard",language:"auto",disable_popup:!1,show_buttons:[],animations:!1,performance_mode:!1}}getCardSize(){const t=this.config?.layout||"standard";return"bar"===t?1:"mini"===t?2:3}shouldUpdate(t){if(t.has("config"))return this._relatedEntitiesCache=null,!0;for(const e of["_showPopup","_showTextPopup","_popupText","_fanModeExpanded","_massQueueExpanded","_massLibraryExpanded","_massSearchExpanded","_massSearchQuery","_massQueueItems","_massLibraryItems","_massSearchResults","_massSearchLoading","_massQueueLoading","_massLibraryLoading","_translations"])if(t.has(e))return!0;if(!this.hass||!this.config?.entity)return!1;if(!t.has("hass"))return!1;const e=this.config.entity,n=t.get("hass");if(!n)return!0;if(n.states[e]!==this.hass.states[e])return!0;for(const t of this.config.show_buttons||[])if(n.states[t]!==this.hass.states[t])return!0;if(this._showPopup&&this._relatedEntitiesCache)for(const t of this._relatedEntitiesCache)if(n.states[t.entity_id]!==this.hass.states[t.entity_id])return!0;return!1}_getDeviceType(){return this.config.entity.split(".")[0]}_shouldFilterEntity(t){const e=this.config.popup_filters||{},n=t.entity_id,i=n.split(".")[0];if(e.exclude_domains&&e.exclude_domains.includes(i))return!0;if(e.include_domains&&!e.include_domains.includes(i))return!0;if(e.exclude_entities&&e.exclude_entities.includes(n))return!0;if(e.include_entities&&!e.include_entities.includes(n))return!0;if("sensor"===i&&e.exclude_sensor_classes){const n=t.attributes.device_class;if(n&&e.exclude_sensor_classes.includes(n))return!0}if("sensor"===i&&e.include_sensor_classes){const n=t.attributes.device_class;if(!n||!e.include_sensor_classes.includes(n))return!0}return!1}_getStateColor(){const t=this.hass.states[this.config.entity];return t?lt(this._getDeviceType(),t.state):"var(--ha-card-background)"}_getRelatedEntities(){if(!0===this.config.disable_popup)return[];const t=this.hass.entities[this.config.entity];if(!t)return[];const e=t.device_id;return Object.values(this.hass.states).filter(t=>{const n=this.hass.entities[t.entity_id];return n&&n.device_id===e&&t.entity_id!==this.config.entity}).filter(t=>!this._shouldFilterEntity(t))}_isEntityAvailable(t){return"unavailable"!==t.state&&"unknown"!==t.state}_getMainButtons(){return this.config.show_buttons&&Array.isArray(this.config.show_buttons)?this.config.show_buttons.map(t=>this.hass.states[t]).filter(t=>void 0!==t):[]}_showTextDialog(t){this._popupText=t,this._showTextPopup=!0}render(){const t=this.hass.states[this.config.entity];if(!t)return N`<ha-card>???????/ha-card>`;const e=this._getStateColor(),n=this._getDeviceType(),i=this.config.layout||"standard",a=!0!==this.config.disable_popup;return N`
      <ha-card class="main-container ${i}-layout" 
               style="background-color: ${e}">
        ${this._renderDeviceSpecificContent(t,n,i,a)}
        ${this._showTextPopup?this._renderTextPopup():""}
      </ha-card>
    `}updated(t){super.updated(t),this.hass&&this.config?.entity&&(this._services=function(t,e){if(!t||!e)return null;const n=e;return{callService(e,i,a={}){t.callService(e,i,{entity_id:n,...a})},toggle(e=n){t.callService("homeassistant","toggle",{entity_id:e})},setSelect(e,n){t.callService("select","select_option",{entity_id:e,option:n})},adjustNumber(e,n){const i=t.states[e];if(!i)return;const a=parseFloat(i.state),s=i.attributes.step||1,r=i.attributes.min,o=i.attributes.max;let c=a+n*s;void 0!==r&&(c=Math.max(r,c)),void 0!==o&&(c=Math.min(o,c));const l="number"===e.split(".")[0]?"number":"input_number";t.callService(l,"set_value",{entity_id:e,value:c})},pressButton(e){t.callService("button","press",{entity_id:e})},adjustTemp(e){const i=t.states[n].attributes.temperature+e;t.callService("climate","set_temperature",{entity_id:n,temperature:i})},setClimateMode(e){t.callService("climate","set_hvac_mode",{entity_id:n,hvac_mode:e})},setFanMode(e){t.callService("climate","set_fan_mode",{entity_id:n,fan_mode:e})},setBrightness(e){const i=Math.round(e/100*255);t.callService("light","turn_on",{entity_id:n,brightness:i})},setFanSpeed(e){t.callService("fan","set_percentage",{entity_id:n,percentage:parseInt(e)})},setCoverPosition(e){t.callService("cover","set_cover_position",{entity_id:n,position:parseInt(e)})},setCoverTiltPosition(e){t.callService("cover","set_cover_tilt_position",{entity_id:n,tilt_position:parseInt(e)})},setVolume(e){t.callService("media_player","volume_set",{entity_id:n,volume_level:e/100})},setFanPresetMode(e){t.callService("fan","set_preset_mode",{entity_id:n,preset_mode:e})},setWaterHeaterTemp(e){t.callService("water_heater","set_temperature",{entity_id:n,temperature:e})},adjustWaterTemp(e){const i=t.states[n].attributes.temperature+e;t.callService("water_heater","set_temperature",{entity_id:n,temperature:i})}}}(this.hass,this.config.entity)),t.has("_showPopup")&&this._updatePopupPortal()}_updatePopupPortal(){if(!0!==this.config?.disable_popup&&(!this._popupPortal&&this._showPopup&&this._createPopupPortal(),this._popupPortal))if(this._showPopup&&!this.config.disable_popup)this._popupPortal.style.pointerEvents="auto",this._renderPopupToPortal();else{this._popupPortal.style.pointerEvents="none",this._lockPopupScroll(!1),this._unbindPopupSheetGestures();const t=this._popupPortal.querySelector(".popup-overlay");t&&t.remove()}}_renderPopupToPortal(){gt(this,{getDomainIcon:st})}_createControlCardElement(t){return bt(this,t,ht(this),st)}_populateControlAction(t,e,n){!function(t,e,n,i){const a=i.isEntityAvailable(e);switch(n){case"switch":case"input_boolean":{const n=document.createElement("ha-switch");n.checked="on"===e.state,n.disabled=!a,n.addEventListener("change",()=>a&&i.toggle(e.entity_id)),t.appendChild(n);break}case"select":case"input_select":{const n=document.createElement("div");n.className="select-grid",(e.attributes.options||[]).forEach(t=>{const s=document.createElement("div");s.className=`select-opt ${e.state===t?"active":""} ${a?"":"disabled"}`,s.textContent=t,s.addEventListener("click",()=>a&&i.setSelect(e.entity_id,t)),n.appendChild(s)}),t.appendChild(n);break}case"number":case"input_number":{const n=document.createElement("div");n.className="number-control";const s=document.createElement("button");a||(s.disabled=!0),s.appendChild(dt("mdi:minus")),s.addEventListener("click",()=>a&&i.adjustNumber(e.entity_id,-1));const r=document.createElement("span");r.textContent=null==e.state?"":String(e.state);const o=document.createElement("button");a||(o.disabled=!0),o.appendChild(dt("mdi:plus")),o.addEventListener("click",()=>a&&i.adjustNumber(e.entity_id,1)),n.appendChild(s),n.appendChild(r),n.appendChild(o),t.appendChild(n);break}case"button":{const n=document.createElement("button");n.className="action-btn",n.disabled=!a,n.appendChild(dt("mdi:gesture-tap")),n.addEventListener("click",()=>a&&i.pressButton(e.entity_id)),t.appendChild(n);break}default:{const n=document.createElement("span");n.className="state-text",n.textContent=null==e.state?"":String(e.state),t.appendChild(n)}}}(t,e,n,{toggle:t=>this._toggleEntity(t),setSelect:(t,e)=>this._setSelect(t,e),adjustNumber:(t,e)=>this._adjustNumber(t,e),pressButton:t=>this._pressButton(t),isEntityAvailable:t=>this._isEntityAvailable(t)})}_renderTextPopup(){return N`
      <div class="text-popup-overlay" @click="${()=>this._showTextPopup=!1}">
        <div class="text-popup-content" @click="${t=>t.stopPropagation()}">
          <div class="text-popup-header">
            <ha-icon class="close-btn" icon="mdi:close" @click="${()=>this._showTextPopup=!1}"></ha-icon>
          </div>
          <div class="text-popup-body">${this._popupText}</div>
        </div>
      </div>
    `}_renderDeviceSpecificContent(t,e,n="standard",i=!0){return(_t[e]||_t.generic)(this,t,n,i)}_renderMainButtons(t){const e=this._getMainButtons();if(0===e.length)return"";const n="bar"===t;return N`
      <div class="main-buttons ${n?"main-buttons-bar":""}">
        ${e.map(t=>{const e=this._isEntityAvailable(t);return N`
            <button 
              class="main-button ${e?"":"disabled"}"
              ?disabled="${!e}"
              @click="${()=>e&&this._pressButton(t.entity_id)}"
              title="${t.attributes.friendly_name}">
              <ha-icon icon="${t.attributes.icon||"mdi:gesture-tap"}"></ha-icon>
              ${n?"":N`<span>${t.attributes.friendly_name}</span>`}
            </button>
          `})}
      </div>
    `}_renderTitle(t,e,n=20){return t?N`
      <span class="title-scroll-wrap" title="${t}">
        <span class="title-text">${t}</span>
      </span>
    `:""}_renderControlCard(t){const e=t.entity_id.split(".")[0],n=this._isEntityAvailable(t);return N`
      <div class="control-card ${n?"":"control-card-unavailable"}">
        <div class="control-header">
          <ha-icon icon="${t.attributes.icon||st(e)}"></ha-icon>
          <span>${t.attributes.friendly_name}</span>
          ${n?"":N`<span class="unavailable-badge">${this._t("unavailable")}</span>`}
        </div>
        
        <div class="control-action">
          ${n?this._renderControlAction(t,e):N`
            <span class="state-text unavailable-text">${t.state}</span>
          `}
        </div>
      </div>
    `}_renderControlAction(t,e){return function(t,e,n){const{html:i,toggle:a,setSelect:s,adjustNumber:r,pressButton:o,isEntityAvailable:c}=t,l=c(e);switch(n){case"switch":case"input_boolean":return i`
        <ha-switch 
          .checked="${"on"===e.state}"
          .disabled="${!l}"
          @change="${()=>l&&a(e.entity_id)}">
        </ha-switch>
      `;case"select":case"input_select":return i`
        <div class="select-grid">
          ${(e.attributes.options||[]).map(t=>i`
            <div class="select-opt ${e.state===t?"active":""} ${l?"":"disabled"}" 
                 @click="${()=>l&&s(e.entity_id,t)}">
              ${t}
            </div>
          `)}
        </div>
      `;case"number":case"input_number":return i`
        <div class="number-control">
          <button ?disabled="${!l}" @click="${()=>l&&r(e.entity_id,-1)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span>${e.state}</span>
          <button ?disabled="${!l}" @click="${()=>l&&r(e.entity_id,1)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `;case"button":return i`
        <button class="action-btn" ?disabled="${!l}" @click="${()=>l&&o(e.entity_id)}">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
        </button>
      `;default:return i`<span class="state-text">${e.state}</span>`}}({html:N,toggle:t=>this._toggleEntity(t),setSelect:(t,e)=>this._setSelect(t,e),adjustNumber:(t,e)=>this._adjustNumber(t,e),pressButton:t=>this._pressButton(t),isEntityAvailable:t=>this._isEntityAvailable(t)},t,e)}_setFanPresetMode(t){this._services?.setFanPresetMode(t)}_getVacuumStateText(t){return this._t(t)||t}_toggleEntity(t=this.config.entity){this._services?.toggle(t)}_callService(t,e){this._services?.callService(t,e)}_isMusicAssistant(t){return t&&t.attributes&&null!=t.attributes.mass_player_type}_hasMassQueue(){return null!=this.hass?.services?.mass_queue?.get_queue_items}_normalizeMassQueueItem(t){return t?{queue_item_id:t.queue_item_id,name:t.media_title,media_title:t.media_title,media_artist:t.media_artist,media_album_name:t.media_album_name,media_image:t.media_image,media_content_id:t.media_content_id,uri:t.media_content_id}:null}async _fetchMassQueue(){if(!this.config?.entity)return;this._massQueueLoading=!0,this._massQueueItems=[],this.requestUpdate("_massQueueLoading"),this.requestUpdate("_massQueueItems");const t=this.config.entity;try{const e={entity:t,limit_before:5,limit_after:100};let n=null;if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"mass_queue",service:"get_queue_items",service_data:e,return_response:!0});n=t?.result?.response??t?.response??t?.result}if(null==n&&"function"==typeof this.hass?.callService){const t=await this.hass.callService("mass_queue","get_queue_items",e,{},!0);n=t?.response??t?.result??t}const i=[];if(n&&"object"==typeof n){const e=n[t]||(Array.isArray(n)?n:null);Array.isArray(e)&&e.forEach(t=>{const e=this._normalizeMassQueueItem(t);e&&i.push(e)})}this._massQueueItems=i}catch(t){this._massQueueItems=[]}this._massQueueLoading=!1,this.requestUpdate("_massQueueItems"),this.requestUpdate("_massQueueLoading")}_toggleMassQueueExpand(){this._massQueueExpanded=!this._massQueueExpanded,this._massQueueExpanded&&0===this._massQueueItems.length&&!this._massQueueLoading&&this._fetchMassQueue(),this.requestUpdate("_massQueueExpanded")}_playMassQueueItem(t){if(!this.hass||!this.config?.entity)return;const e="string"==typeof t?null:t?.uri||t?.media_content_id||t?.media_item?.uri;e&&this.hass.callService("music_assistant","play_media",{entity_id:this.config.entity,media_id:[e],media_type:"track"})}_hasMusicAssistantLibrary(){return null!=this.hass?.services?.music_assistant?.get_library}async _getMassConfigEntryId(){if(this.config?.mass_config_entry_id)return this.config.mass_config_entry_id;const t=this.config?.entity,e=this.hass?.entities?.[t];if(e?.device_id){const t=this.hass?.devices?.[e.device_id],n=t?.config_entries?.[0];if(n)return n}if("function"==typeof this.hass?.callApi)try{const t=await this.hass.callApi("GET","config/config_entries/entry"),e=(Array.isArray(t)?t:[]).find(t=>"music_assistant"===t?.domain&&"loaded"===t?.state);if(e?.entry_id)return e.entry_id}catch(t){}return null}async _fetchMassLibrary(){if(this.config?.entity){this._massLibraryLoading=!0,this._massLibraryItems=[],this.requestUpdate("_massLibraryLoading"),this.requestUpdate("_massLibraryItems");try{const t=await this._getMassConfigEntryId();if(!t)return void(this._massLibraryItems=[]);const e=[],n=["artist","album","playlist","track"],i={config_entry_id:t,limit:50,order_by:"last_played_desc"},a=async t=>{const e={...i,media_type:t};if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const n=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"get_library",service_data:e,return_response:!0}),i=n?.result?.response??n?.response??n?.result,a=i?.items??(Array.isArray(i)?i:[]);return Array.isArray(a)?a.map(e=>({...e,media_type:t})):[]}if("function"==typeof this.hass?.callService){const n=await this.hass.callService("music_assistant","get_library",e,{},!0),i=n?.response??n?.result??n,a=i?.items??(Array.isArray(i)?i:[]);return Array.isArray(a)?a.map(e=>({...e,media_type:t})):[]}return[]};for(const t of n)try{const n=await a(t);e.push(...n)}catch(t){}this._massLibraryItems=e}catch(t){this._massLibraryItems=[]}finally{this._massLibraryLoading=!1,this.requestUpdate("_massLibraryItems"),this.requestUpdate("_massLibraryLoading")}}}_toggleMassLibraryExpand(){this._massLibraryExpanded=!this._massLibraryExpanded,this._massLibraryExpanded&&0===this._massLibraryItems.length&&!this._massLibraryLoading&&this._fetchMassLibrary(),this.requestUpdate("_massLibraryExpanded")}_playMassLibraryItem(t){this.hass&&this.config?.entity&&t?.uri&&this.hass.callService("music_assistant","play_media",{entity_id:this.config.entity,media_id:[t.uri],media_type:t.media_type||"track"})}_hasMusicAssistantSearch(){return null!=this.hass?.services?.music_assistant?.search}async _fetchMassSearch(t){const e=(t||"").trim();if(e&&this.config?.entity){this._massSearchLoading=!0,this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]},this.requestUpdate("_massSearchLoading"),this.requestUpdate("_massSearchResults");try{const t=await this._getMassConfigEntryId();if(!t)return void(this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]});const n={config_entry_id:t,name:e,limit:50};let i=null;if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"search",service_data:n,return_response:!0});i=t?.result?.response??t?.response??t?.result}if(null==i&&"function"==typeof this.hass?.callService){const t=await this.hass.callService("music_assistant","search",n,{},!0);i=t?.response??t?.result??t}const a=Array.isArray(i?.artists)?i.artists:[],s=Array.isArray(i?.albums)?i.albums:[],r=Array.isArray(i?.tracks)?i.tracks:[],o=Array.isArray(i?.playlists)?i.playlists:Array.isArray(i?.playlist)?i.playlist:[],c=Array.isArray(i?.podcasts)?i.podcasts:Array.isArray(i?.podcast)?i.podcast:[];this._massSearchResults={artists:a,albums:s,tracks:r,playlists:o,podcasts:c},e&&this._addToSearchHistory(e)}catch(t){this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]}}finally{this._massSearchLoading=!1,this.requestUpdate("_massSearchResults"),this.requestUpdate("_massSearchLoading")}}}_toggleMassSearchExpand(){this._massSearchExpanded=!this._massSearchExpanded,this._massSearchExpanded||(this._massSearchQuery="",this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]},this._massSearchSuggestionsOpen=!1),this.requestUpdate("_massSearchExpanded"),this.requestUpdate("_massSearchQuery"),this.requestUpdate("_massSearchResults"),this.requestUpdate("_massSearchSuggestionsOpen")}_onMassSearchInput(t){this._massSearchQuery=t?.target?.value??"",this.requestUpdate("_massSearchQuery")}_loadSearchHistory(){try{const t=localStorage.getItem("universal-device-card-search-history"),e=t?JSON.parse(t):[];this._massSearchHistory=Array.isArray(e)?e.slice(0,20):[]}catch(t){this._massSearchHistory=[]}}_addToSearchHistory(t){const e=(t||"").trim();if(!e)return;const n=[...this._massSearchHistory],i=n.indexOf(e);i>=0&&n.splice(i,1),n.unshift(e),this._massSearchHistory=n.slice(0,20);try{localStorage.setItem("universal-device-card-search-history",JSON.stringify(this._massSearchHistory))}catch(t){}this.requestUpdate("_massSearchHistory")}_getFilteredSearchHistory(){const t=(this._massSearchQuery||"").trim().toLowerCase();return t?this._massSearchHistory.filter(e=>e.toLowerCase().includes(t)).slice(0,10):this._massSearchHistory.slice(0,10)}_openSearchSuggestions(){this._massSearchSuggestionsOpen=!0,this.requestUpdate("_massSearchSuggestionsOpen")}_closeSearchSuggestions(){this._massSearchSuggestionsOpen=!1,this.requestUpdate("_massSearchSuggestionsOpen")}_selectSearchHistoryItem(t){this._massSearchQuery=t,this._closeSearchSuggestions(),this.requestUpdate("_massSearchQuery"),this._runMassSearch()}_runMassSearch(){const t=(this._massSearchQuery||"").trim();t&&this._fetchMassSearch(t)}_onMassScrollDragStart(t){if(t.target.closest(".mass-library-chip"))return;const e=t.currentTarget;if(!e)return;t.preventDefault(),this._massScrollDrag={el:e,startX:t.clientX,startScrollLeft:e.scrollLeft};const n=t=>{this._massScrollDrag&&(this._massScrollDrag.el.scrollLeft=this._massScrollDrag.startScrollLeft+this._massScrollDrag.startX-t.clientX)},i=()=>{this._massScrollDrag=null,document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",i)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",i)}_showMassPlaylistOrLibrary(t){return this._isMusicAssistant(t)&&(this._hasMassQueue()||this._hasMusicAssistantLibrary()||this._hasMusicAssistantSearch())}_setSelect(t,e){this._services?.setSelect(t,e)}_adjustNumber(t,e){this._services?.adjustNumber(t,e)}_pressButton(t){this._services?.pressButton(t)}_openMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this.config.entity}}))}_fireHaptic(t="medium"){"undefined"!=typeof navigator&&navigator.vibrate&&navigator.vibrate("heavy"===t?[20,40,20]:[15,30,15]),this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:{type:t}}))}_onIconPointerDown(t){this._iconLongPressFired=!1,this._iconLongPressTarget=t.currentTarget,this._iconLongPressTimer=setTimeout(()=>{this._iconLongPressTimer=null,this._iconLongPressFired=!0,this._fireHaptic("medium"),this._iconLongPressTarget&&(this._iconLongPressTarget.classList.add("icon-longpress-active"),setTimeout(()=>{this._iconLongPressTarget&&this._iconLongPressTarget.classList.remove("icon-longpress-active")},200)),this._openMoreInfo()},500)}_onIconPointerUp(){if(this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null,this._iconLongPressFired)return void(this._iconLongPressFired=!1);const t=Date.now();if(this._iconLastTapTime&&t-this._iconLastTapTime<400)return this._iconLastTapTime=0,this._fireHaptic("light"),void this._openMoreInfo();this._iconLastTapTime=t,this._toggleEntity()}_onIconPointerLeave(){this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null}_renderHeaderIcon(t,e=!1){if(!t)return"";const n=this._getDeviceType(),i=t.attributes?.icon||st(n),a=lt(n,t.state),s="var(--ha-card-background)"!==a&&a.startsWith("rgba")?a.replace(/[\d.]+\)$/,"1)"):"";return N`
      <div class="header-icon ${e?"header-icon-mini":""} entity-icon-action"
           style="${s?`color: ${s}`:""}"
           @pointerdown="${t=>this._onIconPointerDown(t)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${t=>{t.preventDefault(),t.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${i}"></ha-icon>
      </div>
    `}_renderBarIcon(t,e=""){if(!t)return"";const n=this._getDeviceType(),i=t.attributes?.icon||st(n);return N`
      <div class="bar-icon entity-icon-action ${e}"
           @pointerdown="${t=>this._onIconPointerDown(t)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${t=>{t.preventDefault(),t.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${i}"></ha-icon>
      </div>
    `}_renderHeaderAction(t=!0){return t?N`
      <div class="header-action" 
           @click="${()=>this._showPopup=!0}"
           title="${this._t("device")}">
        <ha-icon icon="mdi:tune-variant"></ha-icon>
      </div>
    `:""}_handleSliderClick(t,e){const n=t.currentTarget.getBoundingClientRect(),i=t.clientX-n.left,a=Math.round(i/n.width*100),s=Math.max(0,Math.min(100,a));switch(e){case"light":this._setBrightness(s);break;case"cover":this._setCoverPosition(s);break;case"media":this._setVolume(s);break;case"fan":this._setFanSpeed(s)}}_adjustTemp(t){this._services?.adjustTemp(t)}_setClimateMode(t){this._services?.setClimateMode(t)}_setFanMode(t){this._services?.setFanMode(t)}_setBrightness(t){this._services?.setBrightness(t)}_adjustBrightness(t){const e=this.hass.states[this.config.entity].attributes.brightness||0,n=Math.round(e/255*100),i=Math.max(0,Math.min(100,n+t));this._setBrightness(i)}_setFanSpeed(t){this._services?.setFanSpeed(t)}_adjustFanSpeed(t){const e=this.hass.states[this.config.entity].attributes.percentage||0,n=Math.max(0,Math.min(100,e+t));this._setFanSpeed(n)}_setCoverPosition(t){this._services?.setCoverPosition(t)}_adjustCoverPosition(t){const e=this.hass.states[this.config.entity].attributes.current_position||0,n=Math.max(0,Math.min(100,e+t));this._setCoverPosition(n)}_adjustCoverTiltPosition(t){const e=this.hass.states[this.config.entity].attributes.current_tilt_position??50,n=Math.max(0,Math.min(100,e+t));this._services?.setCoverTiltPosition(n)}_setVolume(t){this._services?.setVolume(t)}_adjustVolume(t){const e=100*(this.hass.states[this.config.entity].attributes.volume_level||0),n=Math.max(0,Math.min(100,e+t));this._setVolume(n)}_adjustWaterTemp(t){this._services?.adjustWaterTemp(t)}setConfig(t){if(!t.entity)throw new Error("?ｇ????entity");this.config=t}static get styles(){return[it,at]}}class ft extends tt{static get properties(){return{hass:{},config:{},_translations:{type:Object}}}constructor(){super(),this._translations={}}async connectedCallback(){super.connectedCallback(),await this._loadTranslations()}async _loadTranslations(){const t=this.hass?.language||"en",e={"zh-Hant":"zh-TW"}[t]||t;this._translations=nt[e]||nt[t]||nt.en;try{const n=et();let i=await fetch(`${n}${t}.json`);if(i.ok||t===e||(i=await fetch(`${n}${e}.json`)),i.ok){const t=await i.json();this._translations={...this._translations,...t}}}catch(t){}this.requestUpdate()}_t(t){return this._translations[t]||nt.en[t]||t}setConfig(t){this.config=t}configChanged(t){const e=new Event("config-changed",{bubbles:!0,composed:!0});e.detail={config:t},this.dispatchEvent(e)}_valueChanged(t){const e=t.target,n=e.configValue,i=void 0!==e.checked?e.checked:e.value;if(this.config[n]===i)return;const a={...this.config};""===i||"checkbox"===e.type&&!i?delete a[n]:a[n]=i,this.configChanged(a)}_showButtonsChanged(t){const e=t.target.value,n={...this.config};""===e?delete n.show_buttons:n.show_buttons=e.split(",").map(t=>t.trim()).filter(t=>t),this.configChanged(n)}_filterChanged(t){const e=t.target,n=e.getAttribute("filter-type"),i=e.value,a={...this.config};a.popup_filters||(a.popup_filters={}),""===i?delete a.popup_filters[n]:a.popup_filters[n]=i.split(",").map(t=>t.trim()).filter(t=>t),this.configChanged(a)}render(){if(!this.hass||!this.config)return N``;const t=Object.keys(this.hass.states).filter(t=>{const e=t.split(".")[0];return["climate","light","fan","cover","humidifier","media_player","vacuum","water_heater"].includes(e)}),e=this.config.popup_filters||{};return N`
      <div class="card-config">
        <div class="option">
          <label>
            ${this._t("editor_entity")} ${this._t("editor_entity_required")}
            <select 
              .value="${this.config.entity||""}"
              .configValue="${"entity"}"
              @change="${this._valueChanged}">
              <option value="">${this._t("editor_entity_select")}</option>
              ${t.map(t=>N`
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
    `}}customElements.get("device-hub-card")||customElements.define("device-hub-card",vt),customElements.get("device-hub-card-editor")||customElements.define("device-hub-card-editor",ft),window.customCards=window.customCards||[],window.customCards.push({type:"device-hub-card",name:"Device Hub Card",description:"Universal Lovelace card with a same-device popup for sensors and controls (climate, light, fan, cover, media, vacuum, and more).",preview:!0,documentationURL:"https://github.com/n71154plus/universal-device-card"}),console.info("%c DEVICE-HUB-CARD %c v2.7.1 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");
