const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${i}--\x3e`,n=new RegExp(`${i}|${a}`),s="$lit$";class r{constructor(t,e){this.parts=[],this.element=e;const a=[],r=[],c=document.createTreeWalker(e.content,133,null,!1);let p=0,u=-1,m=0;const{strings:h,values:{length:b}}=t;for(;m<b;){const t=c.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let a=0;for(let t=0;t<i;t++)o(e[t].name,s)&&a++;for(;a-- >0;){const e=h[m],i=d.exec(e)[2],a=i.toLowerCase()+s,r=t.getAttribute(a);t.removeAttribute(a);const o=r.split(n);this.parts.push({type:"attribute",index:u,name:i,strings:o}),m+=o.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),c.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(i)>=0){const i=t.parentNode,r=e.split(n),c=r.length-1;for(let e=0;e<c;e++){let a,n=r[e];if(""===n)a=l();else{const t=d.exec(n);null!==t&&o(t[2],s)&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-5)+t[3]),a=document.createTextNode(n)}i.insertBefore(a,t),this.parts.push({type:"node",index:++u})}""===r[c]?(i.insertBefore(l(),t),a.push(t)):t.data=r[c],m+=c}}else if(8===t.nodeType)if(t.data===i){const e=t.parentNode;null!==t.previousSibling&&u!==p||(u++,e.insertBefore(l(),t)),p=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(a.push(t),u--),m++}else{let e=-1;for(;-1!==(e=t.data.indexOf(i,e+1));)this.parts.push({type:"node",index:-1}),m++}}else c.currentNode=r.pop()}for(const t of a)t.parentNode.removeChild(t)}}const o=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},c=t=>-1!==t.index,l=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(t,e){const{element:{content:i},parts:a}=t,n=document.createTreeWalker(i,133,null,!1);let s=m(a),r=a[s],o=-1,c=0;const l=[];let d=null;for(;n.nextNode();){o++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(l.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==r&&r.index===o;)r.index=null!==d?-1:r.index-c,s=m(a,s),r=a[s]}l.forEach(t=>t.parentNode.removeChild(t))}const u=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},m=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(c(e))return i}return-1};const h=new WeakMap,b=t=>"function"==typeof t&&h.has(t),_={},g={};class v{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],a=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let s,r=0,o=0,l=n.nextNode();for(;r<a.length;)if(s=a[r],c(s)){for(;o<s.index;)o++,"TEMPLATE"===l.nodeName&&(i.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=i.pop(),l=n.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,s.name,s.strings,this.options));r++}else this.__parts.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),f=` ${i} `;class x{constructor(t,e,i,a){this.strings=t,this.values=e,this.type=i,this.processor=a}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let r=0;r<t;r++){const t=this.strings[r],o=t.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===t.indexOf("--\x3e",o+1);const c=d.exec(t);e+=null===c?t+(n?f:a):t.substr(0,c.index)+c[1]+c[2]+s+c[3]+i}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==y&&(e=y.createHTML(e)),t.innerHTML=e,t}}const $=t=>null===t||!("object"==typeof t||"function"==typeof t),w=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class k{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!w(t))return t}let a="";for(let n=0;n<e;n++){a+=t[n];const e=i[n];if(void 0!==e){const t=e.value;if($(t)||!w(t))a+="string"==typeof t?t:String(t);else for(const e of t)a+="string"==typeof e?e:String(e)}}return a+=t[e],a}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===_||$(t)&&t===this.value||(this.value=t,b(t)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const t=this.value;this.value=_,t(this)}this.value!==_&&this.committer.commit()}}class P{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}const t=this.__pendingValue;t!==_&&($(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):w(t)?this.__commitIterable(t):t===g?(this.value=g,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const i=new v(e,t.processor,this.options),a=i._clone();i.update(t.values),this.__commitNode(a),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,a=0;for(const n of t)i=e[a],void 0===i&&(i=new P(this.options),e.push(i),0===a?i.appendIntoPart(this):i.insertAfterPart(e[a-1])),i.setValue(n),i.commit(),a++;a<e.length&&(e.length=a,this.clear(i&&i.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class C{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=_}}class M extends k{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends S{}let T=!1;(()=>{try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class L{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),a=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=j(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=_}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const j=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function A(t){let e=I.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},I.set(t.type,e));let a=e.stringsArray.get(t.strings);if(void 0!==a)return a;const n=t.strings.join(i);return a=e.keyString.get(n),void 0===a&&(a=new r(t,t.getTemplateElement()),e.keyString.set(n,a)),e.stringsArray.set(t.strings,a),a}const I=new Map,q=new WeakMap;const z=new class{handleAttributeExpressions(t,e,i,a){const n=e[0];if("."===n){return new M(t,e.slice(1),i).parts}if("@"===n)return[new L(t,e.slice(1),a.eventContext)];if("?"===n)return[new C(t,e.slice(1),i)];return new k(t,e,i).parts}handleTextExpression(t){return new P(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const N=(t,...e)=>new x(t,e,"html",z),B=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const V=t=>e=>{const a=B(e.type,t);let n=I.get(a);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},I.set(a,n));let s=n.stringsArray.get(e.strings);if(void 0!==s)return s;const o=e.strings.join(i);if(s=n.keyString.get(o),void 0===s){const i=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(i,t),s=new r(e,i),n.keyString.set(o,s)}return n.stringsArray.set(e.strings,s),s},Q=["html","svg"],D=new Set,R=(t,e,i)=>{D.add(t);const a=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:s}=n;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(a,t);const r=document.createElement("style");for(let t=0;t<s;t++){const e=n[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{Q.forEach(e=>{const i=I.get(B(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),p(t,i)})})})(t);const o=a.content;i?function(t,e,i=null){const{element:{content:a},parts:n}=t;if(null==i)return void a.appendChild(e);const s=document.createTreeWalker(a,133,null,!1);let r=m(n),o=0,c=-1;for(;s.nextNode();)for(c++,s.currentNode===i&&(o=u(e),i.parentNode.insertBefore(e,i));-1!==r&&n[r].index===c;){if(o>0){for(;-1!==r;)n[r].index+=o,r=m(n,r);return}r=m(n,r)}}(i,r,o.firstChild):o.insertBefore(r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(a,t);const c=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(i){o.insertBefore(r,o.firstChild);const t=new Set;t.add(r),p(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},F=(t,e)=>e!==t&&(e==e||t==t),O={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:F},W="finalized";class Y extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const a=this._attributeNameForProperty(i,e);void 0!==a&&(this._attributeToPropertyMap.set(a,i),t.push(a))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=O){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,a=this.getPropertyDescriptor(t,i,e);void 0!==a&&Object.defineProperty(this.prototype,t,a)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(a){const n=this[t];this[e]=a,this.requestUpdateInternal(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||O}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(W)||t.finalize(),this[W]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=F){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,a=e.converter||H,n="function"==typeof a?a:a.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,a=e.converter;return(a&&a.toAttribute||H.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=O){const a=this.constructor,n=a._attributeNameForProperty(t,i);if(void 0!==n){const t=a._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,a=i._attributeToPropertyMap.get(t);if(void 0!==a){const t=i.getPropertyOptions(a);this._updateState=16|this._updateState,this[a]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let a=!0;if(void 0!==t){const n=this.constructor;i=i||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):a=!1}!this._hasRequestedUpdate&&a&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Y[W]=!0;const J=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol();class X{constructor(t,e){if(e!==G)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(J?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=(t,...e)=>{const i=e.reduce((e,i,a)=>e+(t=>{if(t instanceof X)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[a+1],t[0]);return new X(i,G)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Z={};class tt extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),a=[];i.forEach(t=>a.unshift(t)),this._styles=a}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!J){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new X(String(e),G)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?J?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Z&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return Z}}function et(){return void 0!==import.meta&&import.meta.url?new URL("translations/",import.meta.url).href:"/local/universal-device-card/translations/"}tt.finalized=!0,tt.render=(t,i,a)=>{if(!a||"object"!=typeof a||!a.scopeName)throw new Error("The `scopeName` option is required.");const n=a.scopeName,s=q.has(i),r=U&&11===i.nodeType&&!!i.host,o=r&&!D.has(n),c=o?document.createDocumentFragment():i;if(((t,i,a)=>{let n=q.get(i);void 0===n&&(e(i,i.firstChild),q.set(i,n=new P(Object.assign({templateFactory:A},a))),n.appendInto(i)),n.setValue(t),n.commit()})(t,c,Object.assign({templateFactory:V(n)},a)),o){const t=q.get(c);q.delete(c);const a=t.value instanceof v?t.value.template:void 0;R(n,c,a),e(i,i.firstChild),i.appendChild(c),q.set(i,t)}!s&&r&&window.ShadyCSS.styleElement(i.host)},tt.shadowRootOptions={mode:"open"};const it={"zh-TW":{target_temp:"目標溫度",target_humidity:"目標濕度",position:"位置",tilt:"傾斜",open_tilt:"開啟傾斜",close_tilt:"關閉傾斜",open:"開啟",close:"關閉",stop:"停止",start:"開始",pause:"暫停",return_home:"回充",no_controls:"無其他控制項目",unavailable:"無法使用",device:"設備",cleaning:"清掃中",docked:"充電中",returning:"回充中",idle:"待機",paused:"已暫停",error:"錯誤",cool:"冷氣",heat:"暖氣",dry:"除濕",fan_only:"送風",auto:"自動",off:"關閉",click_to_view:"點擊查看完整內容",editor_entity:"實體 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"選擇實體...",editor_layout:"佈局模式 (Layout)",editor_layout_standard:"標準版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"長條型 (Bar)",editor_language:"語言 (Language)",editor_language_auto:"自動 (Auto)",editor_disable_popup:"禁用彈出面板",editor_show_buttons:"主畫面顯示按鈕 (Button Entity IDs)",editor_show_buttons_desc:"輸入 button 實體 ID，用逗號分隔",editor_filters_title:"彈出面板過濾器 (Popup Filters)",editor_filters_desc:"使用逗號分隔多個值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"僅包含的 Domain",editor_exclude_entities:"排除的實體 ID",editor_include_entities:"僅包含的實體 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"僅包含的 Sensor Device Class",mass_queue_playlist:"播放清單",mass_queue_loading:"載入中…",mass_library:"音樂資料庫",mass_library_loading:"載入中…",mass_search:"搜尋",mass_search_placeholder:"藝人、專輯或曲目…",mass_search_loading:"載入中…",mass_search_button:"搜尋"},"zh-CN":{target_temp:"目标温度",target_humidity:"目标湿度",position:"位置",tilt:"倾斜",open_tilt:"开启倾斜",close_tilt:"关闭倾斜",open:"打开",close:"关闭",stop:"停止",start:"开始",pause:"暂停",return_home:"回充",no_controls:"无其他控制项目",unavailable:"不可用",device:"设备",cleaning:"清扫中",docked:"充电中",returning:"回充中",idle:"待机",paused:"已暂停",error:"错误",cool:"制冷",heat:"制热",dry:"除湿",fan_only:"送风",auto:"自动",off:"关闭",click_to_view:"点击查看完整内容",editor_entity:"实体 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"选择实体...",editor_layout:"布局模式 (Layout)",editor_layout_standard:"标准版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"长条型 (Bar)",editor_language:"语言 (Language)",editor_language_auto:"自动 (Auto)",editor_disable_popup:"禁用弹出面板",editor_show_buttons:"主画面显示按钮 (Button Entity IDs)",editor_show_buttons_desc:"输入 button 实体 ID，用逗号分隔",editor_filters_title:"弹出面板过滤器 (Popup Filters)",editor_filters_desc:"使用逗号分隔多个值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"仅包含的 Domain",editor_exclude_entities:"排除的实体 ID",editor_include_entities:"仅包含的实体 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"仅包含的 Sensor Device Class",mass_queue_playlist:"播放列表",mass_queue_loading:"加载中…",mass_library:"音乐资料库",mass_library_loading:"加载中…",mass_search:"搜索",mass_search_placeholder:"艺人、专辑或曲目…",mass_search_loading:"加载中…",mass_search_button:"搜索"},en:{target_temp:"Target Temp",target_humidity:"Target Humidity",position:"Position",tilt:"Tilt",open_tilt:"Open Tilt",close_tilt:"Close Tilt",open:"Open",close:"Close",stop:"Stop",start:"Start",pause:"Pause",return_home:"Return",no_controls:"No additional controls",unavailable:"Unavailable",device:"Device",cleaning:"Cleaning",docked:"Docked",returning:"Returning",idle:"Idle",paused:"Paused",error:"Error",cool:"Cool",heat:"Heat",dry:"Dry",fan_only:"Fan",auto:"Auto",off:"Off",click_to_view:"Click to view full text",editor_entity:"Entity",editor_entity_required:"* Required",editor_entity_select:"Select entity...",editor_layout:"Layout",editor_layout_standard:"Standard",editor_layout_mini:"Mini",editor_layout_bar:"Bar",editor_language:"Language",editor_language_auto:"Auto",editor_disable_popup:"Disable Popup",editor_show_buttons:"Show Buttons on Main (Button Entity IDs)",editor_show_buttons_desc:"Enter button entity IDs, comma separated",editor_filters_title:"Popup Filters",editor_filters_desc:"Use comma to separate multiple values, e.g: sensor,switch",editor_exclude_domains:"Exclude Domains",editor_include_domains:"Include Domains Only",editor_exclude_entities:"Exclude Entity IDs",editor_include_entities:"Include Entity IDs Only",editor_exclude_sensor_classes:"Exclude Sensor Classes",editor_include_sensor_classes:"Include Sensor Classes Only",mass_queue_playlist:"Queue",mass_queue_loading:"Loading…",mass_library:"Library",mass_library_loading:"Loading…",mass_search:"Search",mass_search_placeholder:"Artist, album or track…",mass_search_loading:"Loading…",mass_search_button:"Search"},ja:{target_temp:"目標温度",target_humidity:"目標湿度",position:"位置",tilt:"傾斜",open_tilt:"傾斜を開く",close_tilt:"傾斜を閉じる",open:"開く",close:"閉じる",stop:"停止",start:"スタート",pause:"一時停止",return_home:"帰還",no_controls:"他のコントロールなし",unavailable:"利用不可",device:"デバイス",cleaning:"掃除中",docked:"充電中",returning:"帰還中",idle:"待機",paused:"一時停止",error:"エラー",cool:"冷房",heat:"暖房",dry:"除湿",fan_only:"送風",auto:"自動",off:"オフ",click_to_view:"クリックして全文を表示",editor_entity:"エンティティ",editor_entity_required:"* 必須",editor_entity_select:"エンティティを選択...",editor_layout:"レイアウト",editor_layout_standard:"スタンダード",editor_layout_mini:"ミニ",editor_layout_bar:"バー",editor_language:"言語",editor_language_auto:"自動",editor_disable_popup:"ポップアップを無効化",editor_show_buttons:"メイン画面にボタン表示",editor_show_buttons_desc:"ボタンエンティティIDをカンマ区切りで入力",editor_filters_title:"ポップアップフィルター",editor_filters_desc:"カンマで複数の値を区切る",editor_exclude_domains:"除外するドメイン",editor_include_domains:"含めるドメインのみ",editor_exclude_entities:"除外するエンティティID",editor_include_entities:"含めるエンティティIDのみ",editor_exclude_sensor_classes:"除外するセンサークラス",editor_include_sensor_classes:"含めるセンサークラスのみ",mass_queue_playlist:"再生リスト",mass_queue_loading:"読み込み中…",mass_library:"音楽ライブラリ",mass_library_loading:"読み込み中…",mass_search:"検索",mass_search_placeholder:"アーティスト、アルバム、曲…",mass_search_loading:"読み込み中…",mass_search_button:"検索"}},at=K`
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

`,nt=K`
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
`;function st(t){return{switch:"mdi:toggle-switch",light:"mdi:lightbulb",fan:"mdi:fan",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",select:"mdi:format-list-bulleted",number:"mdi:counter",button:"mdi:gesture-tap",climate:"mdi:thermostat",cover:"mdi:window-shutter",lock:"mdi:lock",humidifier:"mdi:air-humidifier",media_player:"mdi:play-circle",vacuum:"mdi:robot-vacuum",water_heater:"mdi:water-thermometer"}[t]||"mdi:circle-outline"}function rt(t){return{cool:"mdi:snowflake",heat:"mdi:fire",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:brightness-auto",off:"mdi:power"}[t]}function ot(t){return{auto:"自動",low:"低速",medium:"中速",high:"高速",middle:"中速",favorite:"最愛",silent:"靜音",turbo:"強力"}[t]||t}const ct={climate:{cool:"rgba(3, 169, 244, 0.2)",heat:"rgba(255, 152, 0, 0.2)",dry:"rgba(156, 39, 176, 0.15)",fan_only:"rgba(76, 175, 80, 0.15)",auto:"rgba(0, 150, 136, 0.15)",off:"rgba(158, 158, 158, 0.1)"},light:{on:"rgba(255, 193, 7, 0.2)",off:"rgba(158, 158, 158, 0.1)"},fan:{on:"rgba(76, 175, 80, 0.2)",off:"rgba(158, 158, 158, 0.1)"},cover:{open:"rgba(3, 169, 244, 0.15)",opening:"rgba(3, 169, 244, 0.15)",closed:"rgba(158, 158, 158, 0.1)",closing:"rgba(158, 158, 158, 0.1)"},humidifier:{on:"rgba(33, 150, 243, 0.2)",off:"rgba(158, 158, 158, 0.1)"},media_player:{playing:"rgba(156, 39, 176, 0.2)",paused:"rgba(255, 152, 0, 0.15)",off:"rgba(158, 158, 158, 0.1)"},vacuum:{cleaning:"rgba(76, 175, 80, 0.2)",docked:"rgba(158, 158, 158, 0.1)",returning:"rgba(255, 152, 0, 0.15)"},water_heater:{electric:"rgba(255, 152, 0, 0.2)",gas:"rgba(255, 87, 34, 0.2)",off:"rgba(158, 158, 158, 0.1)"}};function lt(t,e){return ct[t]?.[e]||"var(--ha-card-background)"}const dt={climate:function(t,e,i="standard",a=!0){const{current_temperature:n,temperature:s,fan_mode:r,fan_modes:o}=e.attributes,c=e.state,l="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${n}°C → ${s}°C</div>
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
            ${a?N`
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
        
        ${t._renderMainButtons(i)}
      `:N`
      <div class="header ${l?"header-mini":""}">
        ${t._renderHeaderIcon(e,l)}
        <div class="device-name ${l?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${n}°C → ${s}°C</span>
        </div>
        ${t._renderHeaderAction(a)}
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
      
      ${t._renderMainButtons(i)}
    `},light:function(t,e,i="standard",a=!0){const n="on"===e.state,s=e.attributes.brightness||0,r=Math.round(s/255*100),o="bar"===i,c="mini"===i,l=void 0!==e.attributes.brightness;return o?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              ${n&&l?N`
                <div class="bar-slider-container" @click="${e=>{e.stopPropagation(),t._handleSliderClick(e,"light")}}">
                  <div class="bar-slider-bg bar-slider-light" style="--slider-value: ${r}%"></div>
                  <div class="bar-slider-text">${r}%</div>
                </div>
              `:N`
                <div class="bar-state">${n?t._t("on"):t._t("off")}</div>
              `}
            </div>
          </div>
          <div class="bar-right">
            ${n&&l?N`
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
              <button class="bar-toggle ${n?"bar-toggle-on":""}" @click="${()=>t._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${t._renderHeaderAction(a)}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:N`
      <div class="header ${c?"header-mini":""}">
        ${t._renderHeaderIcon(e,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${n&&l?`${r}%`:n?t._t("on"):t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(a)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${n?"on":""} ${c?"power-btn-mini":""}" 
                @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:lightbulb${n?"":"-outline"}"></ha-icon>
          ${c?"":N`<span class="mode-label">${n?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${n&&l?N`
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
    `},fan:function(t,e,i="standard",a=!0){const n="on"===e.state,s=e.attributes.percentage||0,r=e.attributes.preset_modes||[],o=e.attributes.preset_mode,c="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${n?`${s}%`:t._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            ${n&&void 0!==s?N`
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
              <button class="bar-toggle ${n?"bar-toggle-on":""}" @click="${()=>t._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${a?N`
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
                <span class="bar-mode-text">${i=e,{auto:"自動",smart:"智慧",sleep:"睡眠",nature:"自然",normal:"正常",low:"低速",medium:"中速",high:"高速",turbo:"強力",quiet:"靜音",breeze:"微風",favorite:"最愛"}[i]||i}</span>
              </div>
            `;var i})}
          </div>
        `:""}
        
        ${t._renderMainButtons(i)}
      `:N`
      <div class="header ${c?"header-mini":""}">
        ${t._renderHeaderIcon(e,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${n?`${s}%`:t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(a)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${n?"on":""} ${c?"power-btn-mini":""}" @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:fan"></ha-icon>
          ${c?"":N`<span class="mode-label">${n?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${n?N`
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
      ${t._renderMainButtons(i)}
    `},cover:function(t,e,i="standard",a=!0){const n=e.attributes.current_position||0,s=e.attributes.current_tilt_position??0,r=e.state,o=e.attributes.supported_features??0,c=!!(48&o),l=!!(128&o)&&void 0!==e.attributes.current_tilt_position,d="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${n}%${l?` / ${s}%`:""}</div>
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
            ${a?N`
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

        ${t._renderMainButtons(i)}
      `:N`
      <div class="header ${d?"header-mini":""}">
        ${t._renderHeaderIcon(e,d)}
        <div class="device-name ${d?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          ${void 0!==e.attributes.current_position?N`<span class="device-value">${n}%${l?` / ${s}%`:""}</span>`:""}
        </div>
        ${t._renderHeaderAction(a)}
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
            <span class="value ${d?"value-mini":""}">${n}%</span>
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
      ${t._renderMainButtons(i)}
    `},humidifier:function(t,e,i="standard",a=!0){const n="on"===e.state,s=e.attributes.humidity||0,r="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${n?`${s}%`:t._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-toggle ${n?"bar-toggle-on":""}" @click="${()=>t._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${a?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:N`
      <div class="header ${r?"header-mini":""}">
        ${t._renderHeaderIcon(e,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${n?`${s}%`:t._t("off")}</span>
        </div>
        ${t._renderHeaderAction(a)}
      </div>

      <div class="main-control ${r?"main-control-mini":""}">
        <button class="power-btn ${n?"on":""} ${r?"power-btn-mini":""}" @click="${()=>t._toggleEntity()}">
          <ha-icon icon="mdi:air-humidifier"></ha-icon>
          ${r?"":N`<span class="mode-label">${n?t._t("on"):t._t("off")}</span>`}
        </button>
      </div>

      ${n?N`
        <div class="temp-control ${r?"temp-control-mini":""}">
          <div style="width: 64px;"></div>
          <div class="target-display">
            <span class="label">${t._t("target_humidity")}</span>
            <span class="value ${r?"value-mini":""}">${s}%</span>
          </div>
          <div style="width: 64px;"></div>
        </div>
      `:""}
      ${t._renderMainButtons(i)}
    `},media_player:function(t,e,i="standard",a=!0){const n=e.state,s=e.attributes.media_title||"No Media",r=e.attributes.media_artist||"",o="bar"===i,c="mini"===i,l={artist:[],album:[],playlist:[],track:[]};if(Array.isArray(t._massLibraryItems)&&t._massLibraryItems.forEach(t=>{const e=t.media_type;l[e]&&l[e].push(t)}),o){const r=void 0!==e.attributes.volume_level?Math.round(100*e.attributes.volume_level):0,o=t._showMassPlaylistOrLibrary(e);return N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"playing"===n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i,15)}</div>
              <div class="bar-state">${t._renderTitle(s,i,25)}</div>
            </div>
          </div>
          <div class="bar-right">
            ${void 0!==e.attributes.volume_level?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>t._adjustVolume(-5)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="bar-value">${r}%</span>
                <button class="bar-btn" @click="${()=>t._adjustVolume(5)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:""}
            ${a?N`
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
          <div class="bar-mode-chip ${"playing"===n?"active":""}"
               @click="${()=>t._callService("media_player","playing"===n?"media_pause":"media_play")}">
            <ha-icon icon="mdi:${"playing"===n?"pause":"play"}"></ha-icon>
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
              ${t._massLibraryLoading&&0===t._massLibraryItems.length?N`<div class="mass-queue-empty">${t._t("mass_library_loading")}</div>`:0===t._massLibraryItems.length?N`<div class="mass-queue-empty">—</div>`:["artist","album","playlist","track"].map(e=>{const i=l[e]||[];return i.length?N`
                        <div class="mass-library-row">
                          <div class="mass-library-row-title">${e.toUpperCase()}</div>
                          <div class="mass-library-row-scroll">
                            ${i.map(e=>{const i=e.image||e.album?.image,a=e.artists?.map(t=>t.name).filter(Boolean).join(", ")||"",n=e.album?.name||"";return N`
                                <button class="mass-library-chip" @click="${()=>t._playMassLibraryItem(e)}">
                                  <div class="mass-library-chip-image">
                                    ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                  </div>
                                  <div class="mass-library-chip-text">
                                    <span class="mass-library-chip-title">${e.name||"—"}</span>
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

        ${t._isMusicAssistant(e)&&t._hasMusicAssistantSearch()&&t._massSearchExpanded?N`
          <div class="mass-queue-foldable">
            <div class="mass-search-input-row">
              <input type="text" class="mass-search-input" .value="${t._massSearchQuery||""}"
                     @input="${e=>t._onMassSearchInput(e)}" @keydown="${e=>"Enter"===e.key&&t._runMassSearch()}"
                     placeholder="${t._t("mass_search_placeholder")}" />
              <button class="mass-search-btn" @click="${()=>t._runMassSearch()}" ?disabled="${t._massSearchLoading}">
                ${t._massSearchLoading?t._t("mass_search_loading"):t._t("mass_search_button")}
              </button>
            </div>
            <div class="mass-library-section">
              ${!t._massSearchLoading||t._massSearchResults?.artists?.length||t._massSearchResults?.albums?.length||t._massSearchResults?.tracks?.length?["artists","albums","tracks"].map(e=>{const i="artists"===e?"artist":"albums"===e?"album":"track",a=t._massSearchResults?.[e]??[];return a.length?N`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${i.toUpperCase()}</div>
                        <div class="mass-library-row-scroll">
                          ${a.map(e=>{const i=e.image||e.album?.image,a=e.artists?.map(t=>t.name).filter(Boolean).join(", ")||"",n=e.album?.name||"";return N`
                              <button class="mass-library-chip" @click="${()=>t._playMassLibraryItem(e)}">
                                <div class="mass-library-chip-image">
                                  ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${e.name||"—"}</span>
                                  ${a||n?N`
                                    <span class="mass-library-chip-sub">${a||n}</span>
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

        ${t._renderMainButtons(i)}
      `}const d=void 0!==e.attributes.volume_level?Math.round(100*e.attributes.volume_level):0,p=t._showMassPlaylistOrLibrary(e);return N`
      <div class="header ${c?"header-mini":""}">
        ${t._renderHeaderIcon(e,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          ${N`<span class="device-value">${t._renderTitle(s,i,28)}</span>`}
        </div>
        ${p&&t._hasMassQueue()?N`
          <button class="header-action" @click="${()=>t._toggleMassQueueExpand()}">
            <ha-icon icon="mdi:playlist-music"></ha-icon>
          </button>
        `:""}
        ${p&&t._hasMusicAssistantLibrary()?N`
          <button class="header-action" @click="${()=>t._toggleMassLibraryExpand()}">
            <ha-icon icon="mdi:music-box-multiple"></ha-icon>
          </button>
        `:""}
        ${p&&t._hasMusicAssistantSearch()?N`
          <button class="header-action" @click="${()=>t._toggleMassSearchExpand()}">
            <ha-icon icon="mdi:magnify"></ha-icon>
          </button>
        `:""}
        ${t._renderHeaderAction(a)}
      </div>

      <div class="media-info ${c?"media-info-mini":""}">
        <div class="media-title ${c?"media-title-mini":""}">${t._renderTitle(s,i,30)}</div>
        ${r&&!c?N`<div class="media-artist">${t._renderTitle(r,i,30)}</div>`:""}
      </div>

      <div class="media-controls ${c?"media-controls-mini":""}">
        <button class="media-btn ${c?"media-btn-mini":""}" @click="${()=>t._callService("media_player","media_previous_track")}">
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        <button class="media-btn primary ${c?"media-btn-mini":""}" @click="${()=>t._callService("media_player","playing"===n?"media_pause":"media_play")}">
          <ha-icon icon="mdi:${"playing"===n?"pause":"play"}"></ha-icon>
        </button>
        <button class="media-btn ${c?"media-btn-mini":""}" @click="${()=>t._callService("media_player","media_next_track")}">
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>

      ${void 0!==e.attributes.volume_level?N`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>t._adjustVolume(-5)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">音量</span>
            <span class="value ${c?"value-mini":""}">${d}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>t._adjustVolume(5)}">
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
            ${t._massLibraryLoading&&0===t._massLibraryItems.length?N`<div class="mass-queue-empty">${t._t("mass_library_loading")}</div>`:0===t._massLibraryItems.length?N`<div class="mass-queue-empty">—</div>`:["artist","album","playlist","track"].map(e=>{const i=l[e]||[];return i.length?N`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${e.toUpperCase()}</div>
                        <div class="mass-library-row-scroll">
                          ${i.map(e=>{const i=e.image||e.album?.image,a=e.artists?.map(t=>t.name).filter(Boolean).join(", ")||"",n=e.album?.name||"";return N`
                              <button class="mass-library-chip" @click="${()=>t._playMassLibraryItem(e)}">
                                <div class="mass-library-chip-image">
                                  ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${e.name||"—"}</span>
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

      ${t._isMusicAssistant(e)&&t._hasMusicAssistantSearch()&&t._massSearchExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-search-input-row">
            <input type="text" class="mass-search-input" .value="${t._massSearchQuery||""}"
                   @input="${e=>t._onMassSearchInput(e)}" @keydown="${e=>"Enter"===e.key&&t._runMassSearch()}"
                   placeholder="${t._t("mass_search_placeholder")}" />
            <button class="mass-search-btn" @click="${()=>t._runMassSearch()}" ?disabled="${t._massSearchLoading}">
              ${t._massSearchLoading?t._t("mass_search_loading"):t._t("mass_search_button")}
            </button>
          </div>
          <div class="mass-library-section">
            ${!t._massSearchLoading||t._massSearchResults?.artists?.length||t._massSearchResults?.albums?.length||t._massSearchResults?.tracks?.length?["artists","albums","tracks"].map(e=>{const i="artists"===e?"artist":"albums"===e?"album":"track",a=t._massSearchResults?.[e]??[];return a.length?N`
                    <div class="mass-library-row">
                      <div class="mass-library-row-title">${i.toUpperCase()}</div>
                      <div class="mass-library-row-scroll">
                        ${a.map(e=>{const i=e.image||e.album?.image,a=e.artists?.map(t=>t.name).filter(Boolean).join(", ")||"",n=e.album?.name||"";return N`
                            <button class="mass-library-chip" @click="${()=>t._playMassLibraryItem(e)}">
                              <div class="mass-library-chip-image">
                                ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                              </div>
                              <div class="mass-library-chip-text">
                                <span class="mass-library-chip-title">${e.name||"—"}</span>
                                ${a||n?N`
                                  <span class="mass-library-chip-sub">${a||n}</span>
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

      ${t._renderMainButtons(i)}
    `},vacuum:function(t,e,i="standard",a=!0){const n=e.state,s=e.attributes.battery_level||0,r="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"cleaning"===n?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${t._getVacuumStateText(n)} · ${s}%</div>
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
            ${a?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:N`
      <div class="header ${r?"header-mini":""}">
        ${t._renderHeaderIcon(e,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${t._getVacuumStateText(n)} · ${s}%</span>
        </div>
        ${t._renderHeaderAction(a)}
      </div>

      <div class="vacuum-status ${r?"vacuum-status-mini":""}">
        <div class="status-badge ${r?"status-badge-mini":""}">${t._getVacuumStateText(n)}</div>
        <div class="battery-display ${r?"battery-display-mini":""}">
          <ha-icon icon="mdi:battery${s>90?"":s>50?"-50":"-20"}"></ha-icon>
          <span>${s}%</span>
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
    `},water_heater:function(t,e,i="standard",a=!0){const n=e.attributes.temperature||0,s=e.attributes.current_temperature||0,r="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${s}°C → ${n}°C</div>
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
            ${a?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:N`
      <div class="header ${r?"header-mini":""}">
        ${t._renderHeaderIcon(e,r)}
        <div class="device-name ${r?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${s}°C → ${n}°C</span>
        </div>
        ${t._renderHeaderAction(a)}
      </div>

      <div class="temp-control ${r?"temp-control-mini":""}">
        <button class="adj-btn ${r?"adj-btn-mini":""}" @click="${()=>t._adjustWaterTemp(-1)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${t._t("target_temp")}</span>
          <span class="value ${r?"value-mini":""}">${n}°C</span>
        </div>
        <button class="adj-btn ${r?"adj-btn-mini":""}" @click="${()=>t._adjustWaterTemp(1)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${t._renderMainButtons(i)}
    `},generic:function(t,e,i="standard",a=!0){const n="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${t._renderBarIcon(e,"")}
            <div class="bar-info">
              <div class="bar-name">${t._renderTitle(e.attributes.friendly_name,i)}</div>
              <div class="bar-state">${e.state}</div>
            </div>
          </div>
          <div class="bar-right">
            ${a?N`
              <button class="bar-settings" @click="${()=>t._showPopup=!0}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            `:""}
          </div>
        </div>
        ${t._renderMainButtons(i)}
      `:N`
      <div class="header ${n?"header-mini":""}">
        ${t._renderHeaderIcon(e,n)}
        <div class="device-name ${n?"device-name-mini":""}">
          ${t._renderTitle(e.attributes.friendly_name||t._t("device"),i)}
          <span class="device-value">${e.state}</span>
        </div>
        ${t._renderHeaderAction(a)}
      </div>

      <div class="temp-control ${n?"temp-control-mini":""}">
        <div style="width: 64px;"></div>
        <div class="target-display">
          <span class="label">${t._t("device")}</span>
          <span class="value ${n?"value-mini":""}">${e.state}</span>
        </div>
        <div style="width: 64px;"></div>
      </div>
      ${t._renderMainButtons(i)}
    `}};customElements.define("universal-device-card",class extends tt{static get properties(){return{hass:{},config:{},_showPopup:{type:Boolean},_showTextPopup:{type:Boolean},_popupText:{type:String},_translations:{type:Object},_fanModeExpanded:{type:Boolean},_massQueueItems:{type:Array},_massQueueExpanded:{type:Boolean},_massQueueLoading:{type:Boolean},_massLibraryItems:{type:Array},_massLibraryExpanded:{type:Boolean},_massLibraryLoading:{type:Boolean},_massSearchExpanded:{type:Boolean},_massSearchQuery:{type:String},_massSearchLoading:{type:Boolean},_massSearchResults:{type:Object}}}constructor(){super(),this._showPopup=!1,this._showTextPopup=!1,this._popupText="",this._translations={},this._fanModeExpanded=!1,this._iconLongPressTimer=null,this._iconLongPressFired=!1,this._iconLastTapTime=0,this._massQueueItems=[],this._massQueueExpanded=!1,this._massQueueLoading=!1,this._massLibraryItems=[],this._massLibraryExpanded=!1,this._massLibraryLoading=!1,this._massSearchExpanded=!1,this._massSearchQuery="",this._massSearchLoading=!1,this._massSearchResults={artists:[],albums:[],tracks:[]}}async connectedCallback(){super.connectedCallback(),await this._loadTranslations(),this._createPopupPortal()}disconnectedCallback(){super.disconnectedCallback(),this._removePopupPortal()}_createPopupPortal(){if(!this._popupPortal){this._popupPortal=document.createElement("div"),this._popupPortal.className="udc-popup-portal";const t=this._isInBubbleCardPopup(),e=t?1e4:1e3;this._popupPortal.style.cssText=`position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: ${e};`;const i=document.createElement("style");i.textContent=function(t=!1){return`\n      .popup-overlay {\n        position: fixed !important; \n        top: 0 !important; \n        left: 0 !important; \n        right: 0 !important; \n        bottom: 0 !important;\n        background: rgba(0,0,0,0.7); \n        backdrop-filter: blur(12px);\n        display: flex; \n        align-items: flex-end;\n        justify-content: center; \n        z-index: ${t?1e4:1e3} !important;\n        animation: fadeIn 0.3s;\n        transform: none !important;\n        will-change: auto;\n      }\n      \n      .popup-content {\n        width: 100%; \n        max-height: 85vh; \n        background: var(--card-background-color, #fff);\n        border-radius: 36px 36px 0 0; \n        padding: 20px;\n        overflow-y: auto; \n        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);\n        color: var(--primary-text-color, #000);\n        scrollbar-width: thin;\n        scrollbar-color: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.3) transparent;\n      }\n\n      .popup-content::-webkit-scrollbar {\n        width: 6px;\n      }\n\n      .popup-content::-webkit-scrollbar-track {\n        background: transparent;\n        border-radius: 10px;\n      }\n\n      .popup-content::-webkit-scrollbar-thumb {\n        background: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.3);\n        border-radius: 10px;\n        transition: background 0.3s;\n      }\n\n      .popup-content::-webkit-scrollbar-thumb:hover {\n        background: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.5);\n      }\n\n      .popup-content.hide-scrollbar {\n        scrollbar-width: none;\n        -ms-overflow-style: none;\n      }\n\n      .popup-content.hide-scrollbar::-webkit-scrollbar {\n        display: none;\n      }\n\n      @media (min-width: 768px) {\n        .popup-overlay {\n          align-items: center;\n          padding: 20px;\n        }\n\n        .popup-content {\n          max-width: 600px;\n          width: 90%;\n          max-height: 80vh;\n          border-radius: 24px;\n          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n          animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);\n        }\n\n        .popup-content::-webkit-scrollbar {\n          width: 8px;\n        }\n\n        @keyframes scaleIn {\n          from {\n            opacity: 0;\n            transform: scale(0.9);\n          }\n          to {\n            opacity: 1;\n            transform: scale(1);\n          }\n        }\n      }\n      \n      .popup-header {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        margin-bottom: 24px;\n      }\n      \n      .popup-drag-handle { \n        width: 50px; \n        height: 5px; \n        background: rgba(128, 128, 128, 0.2); \n        border-radius: 3px; \n      }\n      \n      .close-btn {\n        position: absolute;\n        right: 0;\n        cursor: pointer;\n        color: var(--secondary-text-color, #666);\n        padding: 4px;\n        transition: color 0.3s;\n        font-size: 24px;\n        width: 32px;\n        height: 32px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .close-btn:hover {\n        color: var(--primary-text-color, #000);\n      }\n\n      .chips-container { \n        display: flex; \n        flex-wrap: wrap; \n        gap: 10px; \n        margin-bottom: 20px;\n      }\n      \n      .chip { \n        padding: 10px 16px; \n        border-radius: 20px; \n        background: rgba(128, 128, 128, 0.1); \n        display: flex; \n        align-items: center; \n        gap: 8px; \n        font-size: 0.9rem;\n      }\n\n      .chip-unavailable {\n        opacity: 0.5;\n      }\n\n      .chip ha-icon {\n        width: 20px;\n        height: 20px;\n      }\n\n      .controls-list {\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n      }\n\n      .control-card {\n        background: rgba(128, 128, 128, 0.05);\n        border-radius: 16px;\n        padding: 16px;\n      }\n\n      .control-card-unavailable {\n        opacity: 0.5;\n      }\n\n      .control-header {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        margin-bottom: 12px;\n        font-weight: 600;\n      }\n\n      .control-header ha-icon {\n        width: 24px;\n        height: 24px;\n      }\n\n      .unavailable-badge {\n        margin-left: auto;\n        padding: 4px 12px;\n        background: rgba(255, 152, 0, 0.2);\n        color: #ff9800;\n        border-radius: 12px;\n        font-size: 0.75rem;\n      }\n\n      .control-action {\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n      }\n\n      .select-grid {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));\n        gap: 8px;\n      }\n\n      .select-opt {\n        padding: 10px;\n        border-radius: 12px;\n        background: rgba(128, 128, 128, 0.1);\n        text-align: center;\n        cursor: pointer;\n        transition: all 0.3s;\n        font-size: 0.9rem;\n      }\n\n      .select-opt:hover:not(.disabled) {\n        background: rgba(128, 128, 128, 0.2);\n      }\n\n      .select-opt.active {\n        background: var(--accent-color, #03a9f4);\n        color: white;\n      }\n\n      .select-opt.disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .number-control {\n        display: flex;\n        align-items: center;\n        gap: 16px;\n      }\n\n      .number-control button {\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        border: none;\n        background: rgba(128, 128, 128, 0.1);\n        cursor: pointer;\n        transition: all 0.3s;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .number-control button:hover:not(:disabled) {\n        background: rgba(128, 128, 128, 0.2);\n        transform: scale(1.1);\n      }\n\n      .number-control button:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .number-control button ha-icon {\n        width: 20px;\n        height: 20px;\n      }\n\n      .number-control span {\n        min-width: 50px;\n        text-align: center;\n        font-weight: 600;\n      }\n\n      .action-btn {\n        width: 48px;\n        height: 48px;\n        border-radius: 50%;\n        border: none;\n        background: var(--accent-color, #03a9f4);\n        color: white;\n        cursor: pointer;\n        transition: all 0.3s;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .action-btn:hover:not(:disabled) {\n        transform: scale(1.1);\n      }\n\n      .action-btn:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n        background: rgba(128, 128, 128, 0.3);\n      }\n\n      .action-btn ha-icon {\n        width: 24px;\n        height: 24px;\n      }\n\n      .state-text {\n        padding: 8px 16px;\n        background: rgba(128, 128, 128, 0.1);\n        border-radius: 12px;\n        font-size: 0.9rem;\n      }\n\n      .unavailable-text {\n        color: #ff9800;\n      }\n\n      .no-controls {\n        text-align: center;\n        padding: 40px 20px;\n        color: var(--secondary-text-color, #666);\n        font-size: 1rem;\n      }\n\n      @keyframes fadeIn {\n        from { opacity: 0; }\n        to { opacity: 1; }\n      }\n\n      @keyframes slideUp {\n        from {\n          transform: translateY(100%);\n        }\n        to {\n          transform: translateY(0);\n        }\n      }\n\n      ha-switch {\n        --mdc-theme-secondary: var(--accent-color, #03a9f4);\n      }\n\n      ha-icon {\n        color: var(--primary-text-color, #000);\n      }\n    `}(t),this._popupPortal.appendChild(i),document.body.appendChild(this._popupPortal)}}_isInBubbleCardPopup(){let t=this;for(;t&&t.parentNode;){if(t=t.parentNode,t.host&&(t=t.host),t.classList){if(Array.from(t.classList).some(t=>t.includes("bubble")||t.includes("popup-container")))return!0}if("BUBBLE-CARD"===t.tagName||"BUBBLE-POP-UP"===t.tagName)return!0}return!1}_removePopupPortal(){this._popupPortal&&this._popupPortal.parentNode&&(this._popupPortal.parentNode.removeChild(this._popupPortal),this._popupPortal=null)}async _loadTranslations(){const t=this.config?.language||this.hass?.language||"en",e={"zh-Hant":"zh-TW"}[t]||t;if(this._translations=it[e]||it[t]||it.en,"auto"!==t)try{const i=et();let a=await fetch(`${i}${t}.json`);if(a.ok||t===e||(a=await fetch(`${i}${e}.json`)),a.ok){const t=await a.json();this._translations={...this._translations,...t}}}catch(t){}}_t(t){return this._translations[t]||it.en[t]||t}static getConfigElement(){return document.createElement("universal-device-card-editor")}static getStubConfig(){return{entity:"",layout:"standard",language:"auto",disable_popup:!1,show_buttons:[]}}_getDeviceType(){return this.config.entity.split(".")[0]}_shouldFilterEntity(t){const e=this.config.popup_filters||{},i=t.entity_id,a=i.split(".")[0];if(e.exclude_domains&&e.exclude_domains.includes(a))return!0;if(e.include_domains&&!e.include_domains.includes(a))return!0;if(e.exclude_entities&&e.exclude_entities.includes(i))return!0;if(e.include_entities&&!e.include_entities.includes(i))return!0;if("sensor"===a&&e.exclude_sensor_classes){const i=t.attributes.device_class;if(i&&e.exclude_sensor_classes.includes(i))return!0}if("sensor"===a&&e.include_sensor_classes){const i=t.attributes.device_class;if(!i||!e.include_sensor_classes.includes(i))return!0}return!1}_getStateColor(){const t=this.hass.states[this.config.entity];return t?lt(this._getDeviceType(),t.state):"var(--ha-card-background)"}_getRelatedEntities(){if(!0===this.config.disable_popup)return[];const t=this.hass.entities[this.config.entity];if(!t)return[];const e=t.device_id;return Object.values(this.hass.states).filter(t=>{const i=this.hass.entities[t.entity_id];return i&&i.device_id===e&&t.entity_id!==this.config.entity}).filter(t=>!this._shouldFilterEntity(t))}_isEntityAvailable(t){return"unavailable"!==t.state&&"unknown"!==t.state}_getMainButtons(){return this.config.show_buttons&&Array.isArray(this.config.show_buttons)?this.config.show_buttons.map(t=>this.hass.states[t]).filter(t=>void 0!==t):[]}_showTextDialog(t){this._popupText=t,this._showTextPopup=!0}render(){const t=this.hass.states[this.config.entity];if(!t)return N`<ha-card>???????/ha-card>`;const e=this._getStateColor(),i=this._getDeviceType(),a=this.config.layout||"standard",n=!0!==this.config.disable_popup;return N`
      <ha-card class="main-container ${a}-layout" 
               style="background-color: ${e}">
        ${this._renderDeviceSpecificContent(t,i,a,n)}
        ${this._showTextPopup?this._renderTextPopup():""}
      </ha-card>
    `}updated(t){super.updated(t),this.hass&&this.config?.entity&&(this._services=function(t,e){if(!t||!e)return null;const i=e;return{callService(e,a,n={}){t.callService(e,a,{entity_id:i,...n})},toggle(e=i){t.callService("homeassistant","toggle",{entity_id:e})},setSelect(e,i){t.callService("select","select_option",{entity_id:e,option:i})},adjustNumber(e,i){const a=t.states[e];if(!a)return;const n=parseFloat(a.state),s=a.attributes.step||1,r=a.attributes.min,o=a.attributes.max;let c=n+i*s;void 0!==r&&(c=Math.max(r,c)),void 0!==o&&(c=Math.min(o,c));const l="number"===e.split(".")[0]?"number":"input_number";t.callService(l,"set_value",{entity_id:e,value:c})},pressButton(e){t.callService("button","press",{entity_id:e})},adjustTemp(e){const a=t.states[i].attributes.temperature+e;t.callService("climate","set_temperature",{entity_id:i,temperature:a})},setClimateMode(e){t.callService("climate","set_hvac_mode",{entity_id:i,hvac_mode:e})},setFanMode(e){t.callService("climate","set_fan_mode",{entity_id:i,fan_mode:e})},setBrightness(e){const a=Math.round(e/100*255);t.callService("light","turn_on",{entity_id:i,brightness:a})},setFanSpeed(e){t.callService("fan","set_percentage",{entity_id:i,percentage:parseInt(e)})},setCoverPosition(e){t.callService("cover","set_cover_position",{entity_id:i,position:parseInt(e)})},setCoverTiltPosition(e){t.callService("cover","set_cover_tilt_position",{entity_id:i,tilt_position:parseInt(e)})},setVolume(e){t.callService("media_player","volume_set",{entity_id:i,volume_level:e/100})},setFanPresetMode(e){t.callService("fan","set_preset_mode",{entity_id:i,preset_mode:e})},setWaterHeaterTemp(e){t.callService("water_heater","set_temperature",{entity_id:i,temperature:e})},adjustWaterTemp(e){const a=t.states[i].attributes.temperature+e;t.callService("water_heater","set_temperature",{entity_id:i,temperature:a})}}}(this.hass,this.config.entity)),t.has("_showPopup")&&this._updatePopupPortal()}_updatePopupPortal(){if(this._popupPortal)if(this._showPopup&&!this.config.disable_popup)this._popupPortal.style.pointerEvents="auto",this._renderPopupToPortal();else{this._popupPortal.style.pointerEvents="none";const t=this._popupPortal.querySelector(".popup-overlay");t&&t.remove()}}_renderPopupToPortal(){const t=this._getRelatedEntities(),e=t.filter(t=>t.entity_id.startsWith("sensor")),i=t.filter(t=>!t.entity_id.startsWith("sensor")),a=document.createElement("div");a.className="popup-overlay",a.addEventListener("click",t=>{t.target===a&&(this._showPopup=!1,this.requestUpdate())});const n=document.createElement("div"),s=!0===this.config?.hide_popup_scrollbar;n.className=s?"popup-content hide-scrollbar":"popup-content",n.addEventListener("click",t=>t.stopPropagation());const r=document.createElement("div");if(r.className="popup-header",r.innerHTML='\n      <div class="popup-drag-handle"></div>\n      <ha-icon class="close-btn" icon="mdi:close"></ha-icon>\n    ',r.querySelector(".close-btn").addEventListener("click",()=>{this._showPopup=!1,this.requestUpdate()}),n.appendChild(r),e.length>0){const t=document.createElement("div");t.className="chips-container",e.forEach(e=>{const i=this._isEntityAvailable(e),a=document.createElement("div");a.className="chip "+(i?"":"chip-unavailable"),a.innerHTML=`\n          <ha-icon icon="${e.attributes.icon||"mdi:information-outline"}"></ha-icon>\n          <span>${i?`${e.state} ${e.attributes.unit_of_measurement||""}`:this._t("unavailable")}</span>\n        `,t.appendChild(a)}),n.appendChild(t)}if(i.length>0){const t=document.createElement("div");t.className="controls-list",i.forEach(e=>{const i=this._createControlCardElement(e);t.appendChild(i)}),n.appendChild(t)}else{const t=document.createElement("div");t.className="no-controls",t.textContent=this._t("no_controls"),n.appendChild(t)}a.appendChild(n);const o=this._popupPortal.querySelector(".popup-overlay");o&&o.remove(),this._popupPortal.appendChild(a)}_createControlCardElement(t){const e=t.entity_id.split(".")[0],i=this._isEntityAvailable(t),a=document.createElement("div");a.className="control-card "+(i?"":"control-card-unavailable");const n=document.createElement("div");n.className="control-header",n.innerHTML=`\n      <ha-icon icon="${t.attributes.icon||st(e)}"></ha-icon>\n      <span>${t.attributes.friendly_name}</span>\n      ${i?"":`<span class="unavailable-badge">${this._t("unavailable")}</span>`}\n    `;const s=document.createElement("div");return s.className="control-action",i?this._populateControlAction(s,t,e):s.innerHTML=`<span class="state-text unavailable-text">${t.state}</span>`,a.appendChild(n),a.appendChild(s),a}_populateControlAction(t,e,i){!function(t,e,i,a){const n=a.isEntityAvailable(e);switch(i){case"switch":case"input_boolean":{const i=document.createElement("ha-switch");i.checked="on"===e.state,i.disabled=!n,i.addEventListener("change",()=>n&&a.toggle(e.entity_id)),t.appendChild(i);break}case"select":case"input_select":{const i=document.createElement("div");i.className="select-grid",(e.attributes.options||[]).forEach(t=>{const s=document.createElement("div");s.className=`select-opt ${e.state===t?"active":""} ${n?"":"disabled"}`,s.textContent=t,s.addEventListener("click",()=>n&&a.setSelect(e.entity_id,t)),i.appendChild(s)}),t.appendChild(i);break}case"number":case"input_number":{const i=document.createElement("div");i.className="number-control",i.innerHTML=`\n        <button ${n?"":"disabled"}><ha-icon icon="mdi:minus"></ha-icon></button>\n        <span>${e.state}</span>\n        <button ${n?"":"disabled"}><ha-icon icon="mdi:plus"></ha-icon></button>\n      `,i.querySelectorAll("button")[0].addEventListener("click",()=>n&&a.adjustNumber(e.entity_id,-1)),i.querySelectorAll("button")[1].addEventListener("click",()=>n&&a.adjustNumber(e.entity_id,1)),t.appendChild(i);break}case"button":{const i=document.createElement("button");i.className="action-btn",i.disabled=!n,i.innerHTML='<ha-icon icon="mdi:gesture-tap"></ha-icon>',i.addEventListener("click",()=>n&&a.pressButton(e.entity_id)),t.appendChild(i);break}default:t.innerHTML=`<span class="state-text">${e.state}</span>`}}(t,e,i,{toggle:t=>this._toggleEntity(t),setSelect:(t,e)=>this._setSelect(t,e),adjustNumber:(t,e)=>this._adjustNumber(t,e),pressButton:t=>this._pressButton(t),isEntityAvailable:t=>this._isEntityAvailable(t)})}_renderTextPopup(){return N`
      <div class="text-popup-overlay" @click="${()=>this._showTextPopup=!1}">
        <div class="text-popup-content" @click="${t=>t.stopPropagation()}">
          <div class="text-popup-header">
            <ha-icon class="close-btn" icon="mdi:close" @click="${()=>this._showTextPopup=!1}"></ha-icon>
          </div>
          <div class="text-popup-body">${this._popupText}</div>
        </div>
      </div>
    `}_renderDeviceSpecificContent(t,e,i="standard",a=!0){return(dt[e]||dt.generic)(this,t,i,a)}_renderMainButtons(t){const e=this._getMainButtons();if(0===e.length)return"";const i="bar"===t;return N`
      <div class="main-buttons ${i?"main-buttons-bar":""}">
        ${e.map(t=>{const e=this._isEntityAvailable(t);return N`
            <button 
              class="main-button ${e?"":"disabled"}"
              ?disabled="${!e}"
              @click="${()=>e&&this._pressButton(t.entity_id)}"
              title="${t.attributes.friendly_name}">
              <ha-icon icon="${t.attributes.icon||"mdi:gesture-tap"}"></ha-icon>
              ${i?"":N`<span>${t.attributes.friendly_name}</span>`}
            </button>
          `})}
      </div>
    `}_renderTitle(t,e,i=20){return t?N`
      <span class="title-scroll-wrap" title="${t}">
        <span class="title-text">${t}</span>
      </span>
    `:""}_renderPopup(){const t=this._getRelatedEntities(),e=t.filter(t=>t.entity_id.startsWith("sensor")),i=t.filter(t=>!t.entity_id.startsWith("sensor"));return N`
      <div class="popup-overlay" @click="${()=>this._showPopup=!1}">
        <div class="popup-content" @click="${t=>t.stopPropagation()}">
          <div class="popup-header">
            <div class="popup-drag-handle"></div>
            <ha-icon class="close-btn" icon="mdi:close" @click="${()=>this._showPopup=!1}"></ha-icon>
          </div>
          
          ${e.length>0?N`
            <div class="chips-container">
              ${e.map(t=>{const e=this._isEntityAvailable(t);return N`
                  <div class="chip ${e?"":"chip-unavailable"}">
                    <ha-icon icon="${t.attributes.icon||"mdi:information-outline"}"></ha-icon>
                    <span>${e?`${t.state} ${t.attributes.unit_of_measurement||""}`:this._t("unavailable")}</span>
                  </div>
                `})}
            </div>
          `:""}

          ${i.length>0?N`
            <div class="controls-list">
              ${i.map(t=>this._renderControlCard(t))}
            </div>
          `:N`<div class="no-controls">${this._t("no_controls")}</div>`}
        </div>
      </div>
    `}_renderControlCard(t){const e=t.entity_id.split(".")[0],i=this._isEntityAvailable(t);return N`
      <div class="control-card ${i?"":"control-card-unavailable"}">
        <div class="control-header">
          <ha-icon icon="${t.attributes.icon||st(e)}"></ha-icon>
          <span>${t.attributes.friendly_name}</span>
          ${i?"":N`<span class="unavailable-badge">${this._t("unavailable")}</span>`}
        </div>
        
        <div class="control-action">
          ${i?this._renderControlAction(t,e):N`
            <span class="state-text unavailable-text">${t.state}</span>
          `}
        </div>
      </div>
    `}_renderControlAction(t,e){return function(t,e,i){const{html:a,toggle:n,setSelect:s,adjustNumber:r,pressButton:o,isEntityAvailable:c}=t,l=c(e);switch(i){case"switch":case"input_boolean":return a`
        <ha-switch 
          .checked="${"on"===e.state}"
          .disabled="${!l}"
          @change="${()=>l&&n(e.entity_id)}">
        </ha-switch>
      `;case"select":case"input_select":return a`
        <div class="select-grid">
          ${(e.attributes.options||[]).map(t=>a`
            <div class="select-opt ${e.state===t?"active":""} ${l?"":"disabled"}" 
                 @click="${()=>l&&s(e.entity_id,t)}">
              ${t}
            </div>
          `)}
        </div>
      `;case"number":case"input_number":return a`
        <div class="number-control">
          <button ?disabled="${!l}" @click="${()=>l&&r(e.entity_id,-1)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span>${e.state}</span>
          <button ?disabled="${!l}" @click="${()=>l&&r(e.entity_id,1)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `;case"button":return a`
        <button class="action-btn" ?disabled="${!l}" @click="${()=>l&&o(e.entity_id)}">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
        </button>
      `;default:return a`<span class="state-text">${e.state}</span>`}}({html:N,toggle:t=>this._toggleEntity(t),setSelect:(t,e)=>this._setSelect(t,e),adjustNumber:(t,e)=>this._adjustNumber(t,e),pressButton:t=>this._pressButton(t),isEntityAvailable:t=>this._isEntityAvailable(t)},t,e)}_setFanPresetMode(t){this._services?.setFanPresetMode(t)}_getVacuumStateText(t){return this._t(t)||t}_toggleEntity(t=this.config.entity){this._services?.toggle(t)}_callService(t,e){this._services?.callService(t,e)}_isMusicAssistant(t){return t&&t.attributes&&null!=t.attributes.mass_player_type}_hasMassQueue(){return null!=this.hass?.services?.music_assistant?.get_queue}_normalizeQueueItem(t){if(!t)return null;const e=t.media_item||t,i=e.artists,a=Array.isArray(i)&&i.length?i.map(t=>t?.name).filter(Boolean).join(", "):"";return{queue_item_id:t.queue_item_id,name:t.name||e?.name,media_title:t.name||e?.name,media_artist:a,media_album_name:e?.album?.name,media_image:e?.image,uri:e?.uri,media_item:e}}async _fetchMassQueue(){if(!this.config?.entity)return;this._massQueueLoading=!0,this._massQueueItems=[],this.requestUpdate("_massQueueLoading"),this.requestUpdate("_massQueueItems");const t=this.config.entity;try{let e=null;const i={entity_id:t},a={entity_id:t};if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"get_queue",service_data:a,target:i,return_response:!0});e=t?.result?.response??t?.response??t?.result}if(null==e&&"function"==typeof this.hass?.callService){const t=await this.hass.callService("music_assistant","get_queue",a,i,!0);e=t?.response??t?.result??t}const n=[];if(e&&"object"==typeof e){const i=e[t]||e;i&&"object"==typeof i&&(Array.isArray(i.items)?i.items.forEach(t=>{const e=this._normalizeQueueItem(t);e&&n.push(e)}):[i.current_item,i.next_item].forEach(t=>{const e=this._normalizeQueueItem(t);e&&n.push(e)}))}this._massQueueItems=n}catch(t){this._massQueueItems=[]}this._massQueueLoading=!1,this.requestUpdate("_massQueueItems"),this.requestUpdate("_massQueueLoading")}_toggleMassQueueExpand(){this._massQueueExpanded=!this._massQueueExpanded,this._massQueueExpanded&&0===this._massQueueItems.length&&!this._massQueueLoading&&this._fetchMassQueue(),this.requestUpdate("_massQueueExpanded")}_playMassQueueItem(t){if(!this.hass||!this.config?.entity)return;const e="string"==typeof t?null:t?.uri||t?.media_item?.uri;e&&this.hass.callService("music_assistant","play_media",{entity_id:this.config.entity,media_id:[e],media_type:"track"})}_hasMusicAssistantLibrary(){return null!=this.hass?.services?.music_assistant?.get_library}async _getMassConfigEntryId(){if(this.config?.mass_config_entry_id)return this.config.mass_config_entry_id;const t=this.config?.entity,e=this.hass?.entities?.[t];if(e?.config_entry_id)return e.config_entry_id;if("function"==typeof this.hass?.callApi)try{const t=await this.hass.callApi("GET","config/config_entries/entry"),e=(Array.isArray(t)?t:[]).find(t=>"music_assistant"===t?.domain&&"loaded"===t?.state);if(e?.entry_id)return e.entry_id}catch(t){}return null}async _fetchMassLibrary(){if(this.config?.entity){this._massLibraryLoading=!0,this._massLibraryItems=[],this.requestUpdate("_massLibraryLoading"),this.requestUpdate("_massLibraryItems");try{const t=await this._getMassConfigEntryId();if(!t)return void(this._massLibraryItems=[]);const e=[],i=["artist","album","playlist","track"],a={config_entry_id:t,limit:30},n=async t=>{const e={...a,media_type:t};if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const i=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"get_library",service_data:e,return_response:!0}),a=i?.result?.response??i?.response??i?.result,n=a?.items??(Array.isArray(a)?a:[]);return Array.isArray(n)?n.map(e=>({...e,media_type:t})):[]}if("function"==typeof this.hass?.callService){const i=await this.hass.callService("music_assistant","get_library",e,{},!0),a=i?.response??i?.result??i,n=a?.items??(Array.isArray(a)?a:[]);return Array.isArray(n)?n.map(e=>({...e,media_type:t})):[]}return[]};for(const t of i)try{const i=await n(t);e.push(...i)}catch(t){}this._massLibraryItems=e}catch(t){this._massLibraryItems=[]}finally{this._massLibraryLoading=!1,this.requestUpdate("_massLibraryItems"),this.requestUpdate("_massLibraryLoading")}}}_toggleMassLibraryExpand(){this._massLibraryExpanded=!this._massLibraryExpanded,this._massLibraryExpanded&&0===this._massLibraryItems.length&&!this._massLibraryLoading&&this._fetchMassLibrary(),this.requestUpdate("_massLibraryExpanded")}_playMassLibraryItem(t){this.hass&&this.config?.entity&&t?.uri&&this.hass.callService("music_assistant","play_media",{entity_id:this.config.entity,media_id:[t.uri],media_type:t.media_type||"track"})}_hasMusicAssistantSearch(){return null!=this.hass?.services?.music_assistant?.search}async _fetchMassSearch(t){const e=(t||"").trim();if(e&&this.config?.entity){this._massSearchLoading=!0,this._massSearchResults={artists:[],albums:[],tracks:[]},this.requestUpdate("_massSearchLoading"),this.requestUpdate("_massSearchResults");try{const t=await this._getMassConfigEntryId();if(!t)return void(this._massSearchResults={artists:[],albums:[],tracks:[]});const i={config_entry_id:t,name:e};let a=null;if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const t=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"search",service_data:i,return_response:!0});a=t?.result?.response??t?.response??t?.result}if(null==a&&"function"==typeof this.hass?.callService){const t=await this.hass.callService("music_assistant","search",i,{},!0);a=t?.response??t?.result??t}const n=Array.isArray(a?.artists)?a.artists:[],s=Array.isArray(a?.albums)?a.albums:[],r=Array.isArray(a?.tracks)?a.tracks:[];this._massSearchResults={artists:n,albums:s,tracks:r}}catch(t){this._massSearchResults={artists:[],albums:[],tracks:[]}}finally{this._massSearchLoading=!1,this.requestUpdate("_massSearchResults"),this.requestUpdate("_massSearchLoading")}}}_toggleMassSearchExpand(){this._massSearchExpanded=!this._massSearchExpanded,this._massSearchExpanded||(this._massSearchQuery="",this._massSearchResults={artists:[],albums:[],tracks:[]}),this.requestUpdate("_massSearchExpanded"),this.requestUpdate("_massSearchQuery"),this.requestUpdate("_massSearchResults")}_onMassSearchInput(t){this._massSearchQuery=t?.target?.value??"",this.requestUpdate("_massSearchQuery")}_runMassSearch(){const t=(this._massSearchQuery||"").trim();t&&this._fetchMassSearch(t)}_showMassPlaylistOrLibrary(t){return this._isMusicAssistant(t)&&(this._hasMassQueue()||this._hasMusicAssistantLibrary()||this._hasMusicAssistantSearch())}_setSelect(t,e){this._services?.setSelect(t,e)}_adjustNumber(t,e){this._services?.adjustNumber(t,e)}_pressButton(t){this._services?.pressButton(t)}_openMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this.config.entity}}))}_fireHaptic(t="medium"){"undefined"!=typeof navigator&&navigator.vibrate&&navigator.vibrate("heavy"===t?[20,40,20]:[15,30,15]),this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:{type:t}}))}_onIconPointerDown(t){this._iconLongPressFired=!1,this._iconLongPressTarget=t.currentTarget,this._iconLongPressTimer=setTimeout(()=>{this._iconLongPressTimer=null,this._iconLongPressFired=!0,this._fireHaptic("medium"),this._iconLongPressTarget&&(this._iconLongPressTarget.classList.add("icon-longpress-active"),setTimeout(()=>{this._iconLongPressTarget&&this._iconLongPressTarget.classList.remove("icon-longpress-active")},200)),this._openMoreInfo()},500)}_onIconPointerUp(){if(this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null,this._iconLongPressFired)return void(this._iconLongPressFired=!1);const t=Date.now();if(this._iconLastTapTime&&t-this._iconLastTapTime<400)return this._iconLastTapTime=0,this._fireHaptic("light"),void this._openMoreInfo();this._iconLastTapTime=t,this._toggleEntity()}_onIconPointerLeave(){this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null}_renderHeaderIcon(t,e=!1){if(!t)return"";const i=this._getDeviceType(),a=t.attributes?.icon||st(i),n=lt(i,t.state),s="var(--ha-card-background)"!==n&&n.startsWith("rgba")?n.replace(/[\d.]+\)$/,"1)"):"";return N`
      <div class="header-icon ${e?"header-icon-mini":""} entity-icon-action"
           style="${s?`color: ${s}`:""}"
           @pointerdown="${t=>this._onIconPointerDown(t)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${t=>{t.preventDefault(),t.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${a}"></ha-icon>
      </div>
    `}_renderBarIcon(t,e=""){if(!t)return"";const i=this._getDeviceType(),a=t.attributes?.icon||st(i);return N`
      <div class="bar-icon entity-icon-action ${e}"
           @pointerdown="${t=>this._onIconPointerDown(t)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${t=>{t.preventDefault(),t.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${a}"></ha-icon>
      </div>
    `}_renderHeaderAction(t=!0){return t?N`
      <div class="header-action" 
           @click="${()=>this._showPopup=!0}"
           title="${this._t("device")}">
        <ha-icon icon="mdi:tune-variant"></ha-icon>
      </div>
    `:""}_handleSliderClick(t,e){const i=t.currentTarget.getBoundingClientRect(),a=t.clientX-i.left,n=Math.round(a/i.width*100),s=Math.max(0,Math.min(100,n));switch(e){case"light":this._setBrightness(s);break;case"cover":this._setCoverPosition(s);break;case"media":this._setVolume(s);break;case"fan":this._setFanSpeed(s)}}_adjustTemp(t){this._services?.adjustTemp(t)}_setClimateMode(t){this._services?.setClimateMode(t)}_setFanMode(t){this._services?.setFanMode(t)}_setBrightness(t){this._services?.setBrightness(t)}_adjustBrightness(t){const e=this.hass.states[this.config.entity].attributes.brightness||0,i=Math.round(e/255*100),a=Math.max(0,Math.min(100,i+t));this._setBrightness(a)}_setFanSpeed(t){this._services?.setFanSpeed(t)}_adjustFanSpeed(t){const e=this.hass.states[this.config.entity].attributes.percentage||0,i=Math.max(0,Math.min(100,e+t));this._setFanSpeed(i)}_setCoverPosition(t){this._services?.setCoverPosition(t)}_adjustCoverPosition(t){const e=this.hass.states[this.config.entity].attributes.current_position||0,i=Math.max(0,Math.min(100,e+t));this._setCoverPosition(i)}_adjustCoverTiltPosition(t){const e=this.hass.states[this.config.entity].attributes.current_tilt_position??50,i=Math.max(0,Math.min(100,e+t));this._services?.setCoverTiltPosition(i)}_setVolume(t){this._services?.setVolume(t)}_adjustVolume(t){const e=100*(this.hass.states[this.config.entity].attributes.volume_level||0),i=Math.max(0,Math.min(100,e+t));this._setVolume(i)}_adjustWaterTemp(t){this._services?.adjustWaterTemp(t)}setConfig(t){if(!t.entity)throw new Error("?ｇ????entity");this.config=t}static get styles(){return[at,nt]}}),customElements.define("universal-device-card-editor",class extends tt{static get properties(){return{hass:{},config:{},_translations:{type:Object}}}constructor(){super(),this._translations={}}async connectedCallback(){super.connectedCallback(),await this._loadTranslations()}async _loadTranslations(){const t=this.hass?.language||"en",e={"zh-Hant":"zh-TW"}[t]||t;this._translations=it[e]||it[t]||it.en;try{const i=et();let a=await fetch(`${i}${t}.json`);if(a.ok||t===e||(a=await fetch(`${i}${e}.json`)),a.ok){const t=await a.json();this._translations={...this._translations,...t}}}catch(t){}this.requestUpdate()}_t(t){return this._translations[t]||it.en[t]||t}setConfig(t){this.config=t}configChanged(t){const e=new Event("config-changed",{bubbles:!0,composed:!0});e.detail={config:t},this.dispatchEvent(e)}_valueChanged(t){const e=t.target,i=e.configValue,a=void 0!==e.checked?e.checked:e.value;if(this.config[i]===a)return;const n={...this.config};""===a||"checkbox"===e.type&&!a?delete n[i]:n[i]=a,this.configChanged(n)}_showButtonsChanged(t){const e=t.target.value,i={...this.config};""===e?delete i.show_buttons:i.show_buttons=e.split(",").map(t=>t.trim()).filter(t=>t),this.configChanged(i)}_filterChanged(t){const e=t.target,i=e.getAttribute("filter-type"),a=e.value,n={...this.config};n.popup_filters||(n.popup_filters={}),""===a?delete n.popup_filters[i]:n.popup_filters[i]=a.split(",").map(t=>t.trim()).filter(t=>t),this.configChanged(n)}render(){if(!this.hass||!this.config)return N``;const t=Object.keys(this.hass.states).filter(t=>{const e=t.split(".")[0];return["climate","light","fan","cover","humidifier","media_player","vacuum","water_heater"].includes(e)}),e=this.config.popup_filters||{};return N`
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
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"universal-device-card",name:"Universal Device Card",description:"通用設備卡片 - 支援 Climate、Light、Fan、Cover 等多種設備類型",preview:!0,documentationURL:"https://github.com/your-repo/universal-device-card"}),console.info("%c UNIVERSAL-DEVICE-CARD %c v2.1 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");
