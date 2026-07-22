const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${i}--\x3e`,s=new RegExp(`${i}|${a}`),n="$lit$";class r{constructor(e,t){this.parts=[],this.element=t;const a=[],r=[],c=document.createTreeWalker(t.content,133,null,!1);let p=0,u=-1,h=0;const{strings:m,values:{length:b}}=e;for(;h<b;){const e=c.nextNode();if(null!==e){if(u++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let a=0;for(let e=0;e<i;e++)o(t[e].name,n)&&a++;for(;a-- >0;){const t=m[h],i=d.exec(t)[2],a=i.toLowerCase()+n,r=e.getAttribute(a);e.removeAttribute(a);const o=r.split(s);this.parts.push({type:"attribute",index:u,name:i,strings:o}),h+=o.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),c.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,r=t.split(s),c=r.length-1;for(let t=0;t<c;t++){let a,s=r[t];if(""===s)a=l();else{const e=d.exec(s);null!==e&&o(e[2],n)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),a=document.createTextNode(s)}i.insertBefore(a,e),this.parts.push({type:"node",index:++u})}""===r[c]?(i.insertBefore(l(),e),a.push(e)):e.data=r[c],h+=c}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&u!==p||(u++,t.insertBefore(l(),e)),p=u,this.parts.push({type:"node",index:u}),null===e.nextSibling?e.data="":(a.push(e),u--),h++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),h++}}else c.currentNode=r.pop()}for(const e of a)e.parentNode.removeChild(e)}}const o=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},c=e=>-1!==e.index,l=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(e,t){const{element:{content:i},parts:a}=e,s=document.createTreeWalker(i,133,null,!1);let n=h(a),r=a[n],o=-1,c=0;const l=[];let d=null;for(;s.nextNode();){o++;const e=s.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==r&&r.index===o;)r.index=null!==d?-1:r.index-c,n=h(a,n),r=a[n]}l.forEach(e=>e.parentNode.removeChild(e))}const u=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},h=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(c(t))return i}return-1};const m=new WeakMap,b=e=>"function"==typeof e&&m.has(e),_={},g={};class v{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],a=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let n,r=0,o=0,l=s.nextNode();for(;r<a.length;)if(n=a[r],c(n)){for(;o<n.index;)o++,"TEMPLATE"===l.nodeName&&(i.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=i.pop(),l=s.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),f=` ${i} `;class x{constructor(e,t,i,a){this.strings=e,this.values=t,this.type=i,this.processor=a}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let r=0;r<e;r++){const e=this.strings[r],o=e.lastIndexOf("\x3c!--");s=(o>-1||s)&&-1===e.indexOf("--\x3e",o+1);const c=d.exec(e);t+=null===c?e+(s?f:a):e.substr(0,c.index)+c[1]+c[2]+n+c[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==y&&(t=y.createHTML(t)),e.innerHTML=t,e}}const $=e=>null===e||!("object"==typeof e||"function"==typeof e),w=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new k(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!w(e))return e}let a="";for(let s=0;s<t;s++){a+=e[s];const t=i[s];if(void 0!==t){const e=t.value;if($(e)||!w(e))a+="string"==typeof e?e:String(e);else for(const t of e)a+="string"==typeof t?t:String(t)}}return a+=e[t],a}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class k{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||$(e)&&e===this.value||(this.value=e,b(e)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class P{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&($(e)?e!==this.value&&this.__commitText(e):e instanceof x?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):w(e)?this.__commitIterable(e):e===g?(this.value=g,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const i=new v(t,e.processor,this.options),a=i._clone();i.update(e.values),this.__commitNode(a),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,a=0;for(const s of e)i=t[a],void 0===i&&(i=new P(this.options),t.push(i),0===a?i.appendIntoPart(this):i.insertAfterPart(t[a-1])),i.setValue(s),i.commit(),a++;a<t.length&&(t.length=a,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class C{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class M extends S{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends k{}let T=!1;(()=>{try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class L{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),a=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=j(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const j=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function A(e){let t=q.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},q.set(e.type,t));let a=t.stringsArray.get(e.strings);if(void 0!==a)return a;const s=e.strings.join(i);return a=t.keyString.get(s),void 0===a&&(a=new r(e,e.getTemplateElement()),t.keyString.set(s,a)),t.stringsArray.set(e.strings,a),a}const q=new Map,I=new WeakMap;const z=new class{handleAttributeExpressions(e,t,i,a){const s=t[0];if("."===s){return new M(e,t.slice(1),i).parts}if("@"===s)return[new L(e,t.slice(1),a.eventContext)];if("?"===s)return[new C(e,t.slice(1),i)];return new S(e,t,i).parts}handleTextExpression(e){return new P(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const N=(e,...t)=>new x(e,t,"html",z),B=(e,t)=>`${e}--${t}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const H=e=>t=>{const a=B(t.type,e);let s=q.get(a);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},q.set(a,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(i);if(n=s.keyString.get(o),void 0===n){const i=t.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(i,e),n=new r(t,i),s.keyString.set(o,n)}return s.stringsArray.set(t.strings,n),n},D=["html","svg"],V=new Set,Q=(e,t,i)=>{V.add(e);const a=i?i.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(a,e);const r=document.createElement("style");for(let e=0;e<n;e++){const t=s[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{D.forEach(t=>{const i=q.get(B(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),p(e,i)})})})(e);const o=a.content;i?function(e,t,i=null){const{element:{content:a},parts:s}=e;if(null==i)return void a.appendChild(t);const n=document.createTreeWalker(a,133,null,!1);let r=h(s),o=0,c=-1;for(;n.nextNode();)for(c++,n.currentNode===i&&(o=u(t),i.parentNode.insertBefore(t,i));-1!==r&&s[r].index===c;){if(o>0){for(;-1!==r;)s[r].index+=o,r=h(s,r);return}r=h(s,r)}}(i,r,o.firstChild):o.insertBefore(r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(a,e);const c=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){o.insertBefore(r,o.firstChild);const e=new Set;e.add(r),p(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const R={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},O=(e,t)=>t!==e&&(t==t||e==e),F={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:O},W="finalized";class Y extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const a=this._attributeNameForProperty(i,t);void 0!==a&&(this._attributeToPropertyMap.set(a,i),e.push(a))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=F){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const s=this[e];this[t]=a,this.requestUpdateInternal(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||F}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(W)||e.finalize(),this[W]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=O){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,a=t.converter||R,s="function"==typeof a?a:a.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,a=t.converter;return(a&&a.toAttribute||R.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=F){const a=this.constructor,s=a._attributeNameForProperty(e,i);if(void 0!==s){const e=a._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,a=i._attributeToPropertyMap.get(e);if(void 0!==a){const e=i.getPropertyOptions(a);this._updateState=16|this._updateState,this[a]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let a=!0;if(void 0!==e){const s=this.constructor;i=i||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):a=!1}!this._hasRequestedUpdate&&a&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Y[W]=!0;const J=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class G{constructor(e,t){if(t!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(J?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=(e,...t)=>{const i=t.reduce((t,i,a)=>t+(e=>{if(e instanceof G)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[a+1],e[0]);return new G(i,X)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Z={};class ee extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),a=[];i.forEach(e=>a.unshift(e)),this._styles=a}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!J){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new G(String(t),X)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?J?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Z&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return Z}}function te(){return void 0!==import.meta&&import.meta.url?new URL("translations/",import.meta.url).href:"/local/universal-device-card/translations/"}ee.finalized=!0,ee.render=(e,i,a)=>{if(!a||"object"!=typeof a||!a.scopeName)throw new Error("The `scopeName` option is required.");const s=a.scopeName,n=I.has(i),r=U&&11===i.nodeType&&!!i.host,o=r&&!V.has(s),c=o?document.createDocumentFragment():i;if(((e,i,a)=>{let s=I.get(i);void 0===s&&(t(i,i.firstChild),I.set(i,s=new P(Object.assign({templateFactory:A},a))),s.appendInto(i)),s.setValue(e),s.commit()})(e,c,Object.assign({templateFactory:H(s)},a)),o){const e=I.get(c);I.delete(c);const a=e.value instanceof v?e.value.template:void 0;Q(s,c,a),t(i,i.firstChild),i.appendChild(c),I.set(i,e)}!n&&r&&window.ShadyCSS.styleElement(i.host)},ee.shadowRootOptions={mode:"open"};const ie={"zh-TW":{target_temp:"目標溫度",target_humidity:"目標濕度",position:"位置",tilt:"傾斜",open_tilt:"開啟傾斜",close_tilt:"關閉傾斜",open:"開啟",close:"關閉",stop:"停止",start:"開始",pause:"暫停",return_home:"回充",no_controls:"無其他控制項目",unavailable:"無法使用",device:"設備",cleaning:"清掃中",docked:"充電中",returning:"回充中",idle:"待機",paused:"已暫停",error:"錯誤",cool:"冷氣",heat:"暖氣",dry:"除濕",fan_only:"送風",auto:"自動",off:"關閉",click_to_view:"點擊查看完整內容",editor_entity:"實體 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"選擇實體...",editor_layout:"佈局模式 (Layout)",editor_layout_standard:"標準版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"長條型 (Bar)",editor_language:"語言 (Language)",editor_language_auto:"自動 (Auto)",editor_disable_popup:"禁用彈出面板",editor_animations:"啟用動畫",editor_performance_mode:"效能模式（關閉動畫）",editor_show_buttons:"主畫面顯示按鈕 (Button Entity IDs)",editor_show_buttons_desc:"輸入 button 實體 ID，用逗號分隔",editor_filters_title:"彈出面板過濾器 (Popup Filters)",editor_filters_desc:"使用逗號分隔多個值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"僅包含的 Domain",editor_exclude_entities:"排除的實體 ID",editor_include_entities:"僅包含的實體 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"僅包含的 Sensor Device Class",mass_queue_playlist:"播放清單",mass_queue_loading:"載入中…",mass_library:"音樂資料庫",mass_library_loading:"載入中…",mass_search:"搜尋",mass_search_placeholder:"藝人、專輯或曲目…",mass_search_loading:"載入中…",mass_search_button:"搜尋",fan_speed:"風速",state:"狀態",popup_sensors:"感測數據",popup_controls:"控制項目"},"zh-CN":{target_temp:"目标温度",target_humidity:"目标湿度",position:"位置",tilt:"倾斜",open_tilt:"开启倾斜",close_tilt:"关闭倾斜",open:"打开",close:"关闭",stop:"停止",start:"开始",pause:"暂停",return_home:"回充",no_controls:"无其他控制项目",unavailable:"不可用",device:"设备",cleaning:"清扫中",docked:"充电中",returning:"回充中",idle:"待机",paused:"已暂停",error:"错误",cool:"制冷",heat:"制热",dry:"除湿",fan_only:"送风",auto:"自动",off:"关闭",click_to_view:"点击查看完整内容",editor_entity:"实体 (Entity)",editor_entity_required:"* 必填",editor_entity_select:"选择实体...",editor_layout:"布局模式 (Layout)",editor_layout_standard:"标准版 (Standard)",editor_layout_mini:"迷你版 (Mini)",editor_layout_bar:"长条型 (Bar)",editor_language:"语言 (Language)",editor_language_auto:"自动 (Auto)",editor_disable_popup:"禁用弹出面板",editor_animations:"启用动画",editor_performance_mode:"性能模式（关闭动画）",editor_show_buttons:"主画面显示按钮 (Button Entity IDs)",editor_show_buttons_desc:"输入 button 实体 ID，用逗号分隔",editor_filters_title:"弹出面板过滤器 (Popup Filters)",editor_filters_desc:"使用逗号分隔多个值，例如: sensor,switch",editor_exclude_domains:"排除的 Domain",editor_include_domains:"仅包含的 Domain",editor_exclude_entities:"排除的实体 ID",editor_include_entities:"仅包含的实体 ID",editor_exclude_sensor_classes:"排除的 Sensor Device Class",editor_include_sensor_classes:"仅包含的 Sensor Device Class",mass_queue_playlist:"播放列表",mass_queue_loading:"加载中…",mass_library:"音乐资料库",mass_library_loading:"加载中…",mass_search:"搜索",mass_search_placeholder:"艺人、专辑或曲目…",mass_search_loading:"加载中…",mass_search_button:"搜索",fan_speed:"风速",state:"状态",popup_sensors:"传感器",popup_controls:"控制项"},en:{target_temp:"Target Temp",target_humidity:"Target Humidity",position:"Position",tilt:"Tilt",open_tilt:"Open Tilt",close_tilt:"Close Tilt",open:"Open",close:"Close",stop:"Stop",start:"Start",pause:"Pause",return_home:"Return",no_controls:"No additional controls",unavailable:"Unavailable",device:"Device",cleaning:"Cleaning",docked:"Docked",returning:"Returning",idle:"Idle",paused:"Paused",error:"Error",cool:"Cool",heat:"Heat",dry:"Dry",fan_only:"Fan",auto:"Auto",off:"Off",click_to_view:"Click to view full text",editor_entity:"Entity",editor_entity_required:"* Required",editor_entity_select:"Select entity...",editor_layout:"Layout",editor_layout_standard:"Standard",editor_layout_mini:"Mini",editor_layout_bar:"Bar",editor_language:"Language",editor_language_auto:"Auto",editor_disable_popup:"Disable Popup",editor_animations:"Enable Animations",editor_performance_mode:"Performance Mode (no animations)",editor_show_buttons:"Show Buttons on Main (Button Entity IDs)",editor_show_buttons_desc:"Enter button entity IDs, comma separated",editor_filters_title:"Popup Filters",editor_filters_desc:"Use comma to separate multiple values, e.g: sensor,switch",editor_exclude_domains:"Exclude Domains",editor_include_domains:"Include Domains Only",editor_exclude_entities:"Exclude Entity IDs",editor_include_entities:"Include Entity IDs Only",editor_exclude_sensor_classes:"Exclude Sensor Classes",editor_include_sensor_classes:"Include Sensor Classes Only",mass_queue_playlist:"Queue",mass_queue_loading:"Loading…",mass_library:"Library",mass_library_loading:"Loading…",mass_search:"Search",mass_search_placeholder:"Artist, album or track…",mass_search_loading:"Loading…",mass_search_button:"Search",fan_speed:"Fan Speed",state:"State",popup_sensors:"Sensors",popup_controls:"Controls"},ja:{target_temp:"目標温度",target_humidity:"目標湿度",position:"位置",tilt:"傾斜",open_tilt:"傾斜を開く",close_tilt:"傾斜を閉じる",open:"開く",close:"閉じる",stop:"停止",start:"スタート",pause:"一時停止",return_home:"帰還",no_controls:"他のコントロールなし",unavailable:"利用不可",device:"デバイス",cleaning:"掃除中",docked:"充電中",returning:"帰還中",idle:"待機",paused:"一時停止",error:"エラー",cool:"冷房",heat:"暖房",dry:"除湿",fan_only:"送風",auto:"自動",off:"オフ",click_to_view:"クリックして全文を表示",editor_entity:"エンティティ",editor_entity_required:"* 必須",editor_entity_select:"エンティティを選択...",editor_layout:"レイアウト",editor_layout_standard:"スタンダード",editor_layout_mini:"ミニ",editor_layout_bar:"バー",editor_language:"言語",editor_language_auto:"自動",editor_disable_popup:"ポップアップを無効化",editor_animations:"アニメーションを有効化",editor_performance_mode:"パフォーマンスモード（アニメーション無効）",editor_show_buttons:"メイン画面にボタン表示",editor_show_buttons_desc:"ボタンエンティティIDをカンマ区切りで入力",editor_filters_title:"ポップアップフィルター",editor_filters_desc:"カンマで複数の値を区切る",editor_exclude_domains:"除外するドメイン",editor_include_domains:"含めるドメインのみ",editor_exclude_entities:"除外するエンティティID",editor_include_entities:"含めるエンティティIDのみ",editor_exclude_sensor_classes:"除外するセンサークラス",editor_include_sensor_classes:"含めるセンサークラスのみ",mass_queue_playlist:"再生リスト",mass_queue_loading:"読み込み中…",mass_library:"音楽ライブラリ",mass_library_loading:"読み込み中…",mass_search:"検索",mass_search_placeholder:"アーティスト、アルバム、曲…",mass_search_loading:"読み込み中…",mass_search_button:"検索",fan_speed:"風速",popup_sensors:"感測數據",popup_controls:"控制項目"}},ae=K`
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
      .mass-queue-item-active {
        background: rgba(var(--rgb-primary-text-color), 0.18);
        box-shadow: 0 0 0 2px rgba(var(--rgb-primary-text-color), 0.25);
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

`,se=K`
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
          max-width: 820px;
          width: min(92vw, 820px);
          max-height: 86vh;
          max-height: 86dvh;
          border-radius: 24px;
          padding-bottom: 20px;
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.45);
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

      .popup-content {
        background: linear-gradient(165deg, rgba(32, 32, 38, 0.98) 0%, rgba(18, 18, 22, 0.99) 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.45);
        color-scheme: dark;
        /* Lock light-on-dark: do NOT inherit HA light-theme text colors */
        --primary-text-color: rgba(255, 255, 255, 0.94);
        --secondary-text-color: rgba(255, 255, 255, 0.68);
        --disabled-text-color: rgba(255, 255, 255, 0.42);
        --rgb-primary-text-color: 255, 255, 255;
        --rgb-secondary-text-color: 255, 255, 255;
        --divider-color: rgba(255, 255, 255, 0.1);
        --mdc-theme-on-surface: rgba(255, 255, 255, 0.94);
        --mdc-theme-text-primary-on-background: rgba(255, 255, 255, 0.94);
        --mdc-theme-text-secondary-on-background: rgba(255, 255, 255, 0.68);
        --mdc-icon-color: rgba(255, 255, 255, 0.88);
        --primary-text-color-rgb: 255, 255, 255;
        color: rgba(255, 255, 255, 0.94) !important;
      }

      .popup-content .popup-title,
      .popup-content .sensor-value,
      .popup-content .control-row-label,
      .popup-content .state-text,
      .popup-content .number-control span,
      .popup-content .chip {
        color: rgba(255, 255, 255, 0.94) !important;
      }

      .popup-content .popup-section-title,
      .popup-content .sensor-label {
        color: rgba(255, 255, 255, 0.62) !important;
        opacity: 1 !important;
      }

      .popup-content .close-btn {
        color: rgba(255, 255, 255, 0.78) !important;
        --mdc-icon-size: 22px;
      }

      .popup-content .close-btn:hover {
        color: rgba(255, 255, 255, 0.96) !important;
      }

      .popup-content ha-icon {
        color: rgba(255, 255, 255, 0.88);
      }

      .popup-content .select-opt {
        color: rgba(255, 255, 255, 0.88) !important;
      }

      .popup-content .select-opt.active {
        color: #fff !important;
        background: var(--accent-color, #03a9f4) !important;
        border-color: transparent;
      }

      .popup-content .number-control button {
        color: rgba(255, 255, 255, 0.9) !important;
      }

      .popup-content .action-btn {
        color: #fff !important;
      }

      .popup-content .unavailable-badge {
        background: rgba(255, 87, 34, 0.22) !important;
        color: #ffab91 !important;
      }

      .popup-content .no-controls {
        color: rgba(255, 255, 255, 0.55) !important;
      }
      /* ===== Mobile Device Panel v2.6.4 ===== */
      .popup-status {
        display: none;
      }

      @media (max-width: 767px) {
        .popup-overlay {
          align-items: flex-end !important;
          padding: 0 !important;
          background: rgba(0, 0, 0, 0.62) !important;
        }

        .popup-content {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: 100% !important;
          max-height: min(94dvh, 960px) !important;
          border-radius: 24px 24px 0 0 !important;
          padding: 4px 12px 0 !important;
          overflow: hidden !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-bottom: none !important;
          box-shadow: 0 -16px 56px rgba(0, 0, 0, 0.6) !important;
          will-change: transform;
          transition: transform 0.18s ease-out;
        }

        .popup-content.is-dragging {
          transition: none !important;
        }

        .popup-header {
          position: relative !important;
          z-index: 6 !important;
          flex-shrink: 0 !important;
          margin-bottom: 0 !important;
          padding: 2px 2px 10px !important;
          background: transparent !important;
          border-bottom: none !important;
          backdrop-filter: none !important;
        }

        .popup-drag-handle {
          width: 40px !important;
          height: 4px !important;
          margin-bottom: 8px !important;
          background: rgba(255, 255, 255, 0.32) !important;
          position: relative;
        }

        .popup-drag-handle::before {
          content: '';
          position: absolute;
          inset: -14px -48px;
        }

        .popup-title {
          font-size: 1.14rem !important;
          font-weight: 750 !important;
          line-height: 1.2 !important;
        }

        .popup-subtitle {
          display: block !important;
          text-align: left !important;
          font-size: 0.66rem !important;
          margin-top: 2px !important;
          color: rgba(255, 255, 255, 0.4) !important;
        }

        .popup-content .close-btn {
          width: 38px !important;
          height: 38px !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .popup-status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 2px 10px;
          padding: 10px 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .popup-status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.28);
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);
        }

        .popup-status.is-on .popup-status-dot {
          background: #4caf50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.22);
        }

        .popup-status.is-off .popup-status-dot {
          background: rgba(255, 255, 255, 0.28);
        }

        .popup-status.is-unavailable .popup-status-dot {
          background: #ff7043;
          box-shadow: 0 0 0 3px rgba(255, 112, 67, 0.2);
        }

        .popup-status-meta {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .popup-status-label {
          font-size: 0.62rem;
          font-weight: 650;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.42);
        }

        .popup-status-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.94);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .popup-status-action {
          flex-shrink: 0;
        }

        .popup-body {
          flex: 1 1 auto !important;
          min-height: 0 !important;
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          gap: 12px !important;
          padding: 2px 2px calc(18px + env(safe-area-inset-bottom, 0px)) !important;
          mask-image: linear-gradient(180deg, #000 0%, #000 calc(100% - 18px), transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 calc(100% - 18px), transparent 100%);
        }

        .popup-section-title {
          font-size: 0.6rem !important;
          letter-spacing: 0.14em !important;
          margin-bottom: 7px !important;
          opacity: 1 !important;
          color: rgba(255, 255, 255, 0.48) !important;
        }

        .sensor-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 7px !important;
        }

        .sensor-card {
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 6px !important;
          min-height: 0 !important;
          padding: 11px 11px 10px !important;
          border-radius: 15px !important;
          background: rgba(255, 255, 255, 0.055) !important;
          border: 1px solid rgba(255, 255, 255, 0.07) !important;
        }

        .sensor-card.is-on {
          background: rgba(76, 175, 80, 0.12) !important;
          border-color: rgba(76, 175, 80, 0.28) !important;
        }

        .sensor-card.is-on .sensor-value {
          color: #81c784 !important;
        }

        .sensor-card.is-off .sensor-value {
          color: rgba(255, 255, 255, 0.55) !important;
        }

        .sensor-card:active {
          background: rgba(255, 255, 255, 0.1) !important;
        }

        .sensor-card ha-icon {
          width: 17px !important;
          height: 17px !important;
          margin-top: 0 !important;
          opacity: 0.65 !important;
        }

        .sensor-card-body {
          display: flex !important;
          flex-direction: column !important;
          gap: 2px !important;
        }

        .sensor-value {
          order: -1 !important;
          font-size: 1.18rem !important;
          font-weight: 750 !important;
          letter-spacing: -0.02em !important;
          line-height: 1.12 !important;
        }

        .sensor-label {
          font-size: 0.66rem !important;
          font-weight: 600 !important;
          color: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sensor-grid .sensor-card:last-child:nth-child(odd) {
          grid-column: 1 / -1;
        }

        .controls-group {
          border-radius: 16px !important;
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.07) !important;
        }

        .control-row {
          min-height: 52px;
          padding: 10px 11px !important;
          gap: 9px !important;
        }

        .control-row:active:not(.control-row-unavailable) {
          background: rgba(255, 255, 255, 0.07) !important;
        }

        .control-row-icon {
          width: 32px !important;
          height: 32px !important;
          border-radius: 10px !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .control-row-label {
          font-size: 0.86rem !important;
          line-height: 1.25 !important;
        }

        .control-row:has(.select-grid),
        .control-row:has(.number-control) {
          flex-wrap: wrap;
        }

        .control-row:has(.select-grid) .control-row-action,
        .control-row:has(.number-control) .control-row-action {
          flex: 1 1 100%;
          margin-top: 5px;
          justify-content: stretch !important;
        }

        .control-row:has(.select-grid) .select-grid {
          max-width: 100% !important;
          width: 100% !important;
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)) !important;
          gap: 5px !important;
          justify-content: stretch !important;
        }

        .select-opt {
          min-height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 8px 5px !important;
          font-size: 0.72rem !important;
          font-weight: 650 !important;
          border-radius: 11px !important;
          -webkit-tap-highlight-color: transparent;
        }

        .select-opt:active {
          transform: scale(0.97);
        }

        .control-row:has(.number-control) .number-control {
          width: 100%;
          justify-content: space-between;
          padding: 5px 6px !important;
          border-radius: 12px !important;
        }

        .number-control button {
          width: 42px !important;
          height: 42px !important;
          border-radius: 12px !important;
          font-size: 1.15rem !important;
        }

        .number-control span {
          min-width: 52px !important;
          font-size: 1.08rem !important;
        }

        .action-btn {
          width: 44px !important;
          height: 44px !important;
          border-radius: 12px !important;
        }

        ha-switch {
          transform: scale(1.08);
          transform-origin: center right;
        }

        .no-controls {
          padding: 32px 14px !important;
        }
      }

      @media (max-width: 380px) {
        .sensor-grid {
          grid-template-columns: 1fr !important;
        }
        .sensor-grid .sensor-card:last-child:nth-child(odd) {
          grid-column: auto;
        }
        .popup-title {
          font-size: 1.02rem !important;
        }
      }

      @media (min-width: 381px) and (max-width: 767px) {
        .popup-content[data-sensors='1'] .sensor-grid {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 900px) and (max-height: 480px) and (orientation: landscape) {
        .popup-content {
          max-height: 96dvh !important;
          border-radius: 16px 16px 0 0 !important;
        }
        .popup-status {
          display: none !important;
        }
        .sensor-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }
        .popup-body {
          gap: 8px !important;
        }
      }

/* ===== Responsive Device Panel v2.6 ===== */
      .popup-title-wrap {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .popup-subtitle {
        display: none;
        font-size: 0.72rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.45) !important;
        letter-spacing: 0.01em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .popup-body {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .popup-section-sensors,
      .popup-section-controls {
        min-width: 0;
      }

      /* —— Mobile (default): bottom sheet —— */
      .popup-content {
        padding: 10px 16px calc(18px + env(safe-area-inset-bottom, 0px)) !important;
        max-height: 88vh !important;
        max-height: 88dvh !important;
      }

      .popup-header {
        display: grid !important;
        grid-template-columns: 1fr 40px !important;
        grid-template-rows: auto auto !important;
        align-items: center !important;
        column-gap: 8px !important;
        margin-bottom: 14px !important;
        padding-bottom: 0 !important;
        border-bottom: none !important;
      }

      .popup-drag-handle {
        grid-column: 1 / -1 !important;
        grid-row: 1 !important;
        justify-self: center !important;
        margin-bottom: 12px !important;
        display: block !important;
      }

      .popup-title-wrap {
        grid-column: 1 !important;
        grid-row: 2 !important;
      }

      .popup-title {
        text-align: left !important;
        font-size: 1.08rem !important;
      }

      .popup-content .close-btn {
        grid-column: 2 !important;
        grid-row: 2 !important;
        justify-self: end !important;
        align-self: center !important;
      }

      .sensor-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 8px !important;
      }

      .sensor-card {
        min-height: 64px !important;
        padding: 12px !important;
        border-radius: 14px !important;
      }

      .sensor-value {
        font-size: 0.98rem !important;
      }

      .control-row {
        min-height: 52px;
        padding: 12px 12px !important;
        gap: 10px !important;
      }

      .control-row-icon {
        width: 36px !important;
        height: 36px !important;
        border-radius: 11px !important;
      }

      /* Mobile: wide option grids wrap under label for touch */
      .control-row:has(.select-grid) {
        flex-wrap: wrap;
      }

      .control-row:has(.select-grid) .control-row-action {
        flex: 1 1 100%;
        margin-top: 4px;
        justify-content: flex-start !important;
      }

      .control-row:has(.select-grid) .select-grid {
        max-width: 100% !important;
        width: 100% !important;
        justify-content: flex-start !important;
      }

      @media (max-width: 380px) {
        .sensor-grid {
          grid-template-columns: 1fr !important;
        }
      }

      /* —— Desktop / tablet: centered dual-pane dialog —— */
      @media (min-width: 768px) {
        .popup-overlay {
          align-items: center !important;
          justify-content: center !important;
          padding: 28px !important;
        }

        .popup-content {
          width: min(92vw, 820px) !important;
          max-width: 820px !important;
          max-height: 86vh !important;
          max-height: 86dvh !important;
          border-radius: 24px !important;
          padding: 28px 32px 30px !important;
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55) !important;
        }

        .popup-drag-handle {
          display: none !important;
        }

        .popup-header {
          grid-template-columns: 1fr 44px !important;
          grid-template-rows: auto !important;
          margin-bottom: 22px !important;
          padding-bottom: 16px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }

        .popup-title-wrap {
          grid-column: 1 !important;
          grid-row: 1 !important;
        }

        .popup-title {
          font-size: 1.28rem !important;
          letter-spacing: -0.01em !important;
        }

        .popup-subtitle {
          display: block !important;
          text-align: left !important;
          margin-top: 4px;
        }

        .popup-content .close-btn {
          grid-column: 2 !important;
          grid-row: 1 !important;
          width: 40px !important;
          height: 40px !important;
        }

        .popup-content.has-both .popup-body {
          display: grid !important;
          grid-template-columns: minmax(240px, 0.92fr) minmax(300px, 1.18fr);
          gap: 28px;
          align-items: start;
        }

        .popup-section-title {
          position: sticky;
          top: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(24, 24, 28, 0.98) 60%, rgba(24, 24, 28, 0));
          padding-top: 2px;
          padding-bottom: 8px;
          margin-bottom: 8px !important;
        }

        .popup-section-controls .controls-group {
          max-height: calc(86dvh - 170px);
          overflow-y: auto;
          overscroll-behavior: contain;
        }

        .sensor-grid {
          gap: 12px !important;
        }

        .sensor-card {
          min-height: 78px !important;
          padding: 16px !important;
          border-radius: 16px !important;
        }

        .sensor-value {
          font-size: 1.12rem !important;
        }

        .control-row {
          min-height: 56px;
          padding: 14px 16px !important;
        }

        .control-row:has(.select-grid) {
          flex-wrap: nowrap;
        }

        .control-row:has(.select-grid) .control-row-action {
          flex: 0 0 auto;
          margin-top: 0;
          width: auto;
          justify-content: flex-end !important;
        }

        .control-row:has(.select-grid) .select-grid {
          max-width: 220px !important;
          width: auto !important;
          justify-content: flex-end !important;
        }

        .control-row:hover:not(.control-row-unavailable) {
          background: rgba(255, 255, 255, 0.055) !important;
        }

        .popup-content.has-sensors-only .sensor-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }

        .popup-content.has-controls-only .controls-group {
          max-height: calc(86dvh - 140px);
        }
      }

      @media (min-width: 1100px) {
        .popup-content {
          width: min(90vw, 960px) !important;
          max-width: 960px !important;
          padding: 32px 36px 34px !important;
        }

        .popup-content.has-both .popup-body {
          grid-template-columns: minmax(280px, 1fr) minmax(340px, 1.25fr);
          gap: 36px;
        }

        .popup-content.has-both .sensor-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }

        .popup-content.has-sensors-only .sensor-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        }
      }


      .popup-header {
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 4px;
      }

      .popup-title {
        font-size: 1.05rem;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0.01em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 4px;
      }

      .popup-drag-handle {
        grid-column: 2;
        justify-self: center;
        width: 40px;
        height: 4px;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 4px;
        margin-bottom: 10px;
      }

      .close-btn {
        grid-column: 3;
        grid-row: 1;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: background 0.2s, transform 0.15s;
      }

      .close-btn:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: scale(1.05);
      }

      .popup-section {
        margin-bottom: 20px;
      }

      .popup-section-title {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        opacity: 0.45;
        margin-bottom: 10px;
        padding-left: 2px;
      }

      .sensor-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .sensor-card {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 14px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.07);
        min-height: 72px;
      }

      .sensor-card ha-icon {
        width: 22px;
        height: 22px;
        opacity: 0.75;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .sensor-card-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      .sensor-label {
        font-size: 0.72rem;
        font-weight: 600;
        opacity: 0.55;
        line-height: 1.2;
        word-break: break-word;
      }

      .sensor-value {
        font-size: 1.02rem;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.01em;
      }

      .sensor-card-unavailable {
        opacity: 0.45;
      }

      .controls-group {
        border-radius: 18px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.07);
      }

      .control-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 13px 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        transition: background 0.15s;
      }

      .control-row:last-child {
        border-bottom: none;
      }

      .control-row:hover:not(.control-row-unavailable) {
        background: rgba(255, 255, 255, 0.03);
      }

      .control-row-icon {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.06);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .control-row-icon ha-icon {
        width: 20px;
        height: 20px;
        opacity: 0.85;
      }

      .control-row-label {
        flex: 1;
        font-weight: 600;
        font-size: 0.9rem;
        line-height: 1.25;
        min-width: 0;
        word-break: break-word;
      }

      .control-row-action {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .control-row-unavailable {
        opacity: 0.5;
        pointer-events: none;
      }

      .select-grid {
        display: flex !important;
        flex-wrap: wrap;
        gap: 6px !important;
        width: auto !important;
        max-width: 160px;
        justify-content: flex-end;
      }

      .select-opt {
        padding: 6px 10px !important;
        border-radius: 10px !important;
        font-size: 0.7rem !important;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.06) !important;
      }

      .select-opt.active {
        box-shadow: 0 2px 8px rgba(3, 169, 244, 0.35);
      }

      .number-control {
        gap: 8px !important;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        padding: 4px 6px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .number-control button {
        width: 32px !important;
        height: 32px !important;
        background: rgba(255, 255, 255, 0.08) !important;
      }

      .number-control span {
        min-width: 36px !important;
        font-size: 0.95rem;
        font-weight: 700;
      }

      .action-btn {
        width: 38px !important;
        height: 38px !important;
        border-radius: 12px !important;
        padding: 0 !important;
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

      :host([data-animations-off]) .main-container,
      :host([data-animations-off]) .header,
      :host([data-animations-off]) .temp-control,
      :host([data-animations-off]) .main-control,
      :host([data-animations-off]) .quick-modes,
      :host([data-animations-off]) .cover-controls,
      :host([data-animations-off]) .vacuum-controls,
      :host([data-animations-off]) .media-controls,
      :host([data-animations-off]) .mode-item,
      :host([data-animations-off]) .chip,
      :host([data-animations-off]) .control-card {
        animation: none !important;
      }

      @media (prefers-reduced-motion: reduce) {
        .main-container, .header, .temp-control, .main-control,
        .quick-modes, .cover-controls, .vacuum-controls, .media-controls,
        .mode-item, .chip, .control-card {
          animation: none !important;
        }
        .main-container {
          transition: none !important;
        }
      }
`;function ne(e){return{switch:"mdi:toggle-switch",light:"mdi:lightbulb",fan:"mdi:fan",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",select:"mdi:format-list-bulleted",number:"mdi:counter",button:"mdi:gesture-tap",climate:"mdi:thermostat",cover:"mdi:window-shutter",lock:"mdi:lock",humidifier:"mdi:air-humidifier",media_player:"mdi:play-circle",vacuum:"mdi:robot-vacuum",water_heater:"mdi:water-thermometer"}[e]||"mdi:circle-outline"}function re(e){return{cool:"mdi:snowflake",heat:"mdi:fire",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:brightness-auto",off:"mdi:power"}[e]}function oe(e,t){if(t&&typeof t._t=="function"){const i=t._t(e);if(i&&i!==e)return i}return{auto:"自動",low:"低速",medium:"中速",high:"高速",middle:"中速",favorite:"最愛",silent:"靜音",turbo:"強力"}[e]||e}const ce={climate:{cool:"rgba(3, 169, 244, 0.2)",heat:"rgba(255, 152, 0, 0.2)",dry:"rgba(156, 39, 176, 0.15)",fan_only:"rgba(76, 175, 80, 0.15)",auto:"rgba(0, 150, 136, 0.15)",off:"rgba(158, 158, 158, 0.1)"},light:{on:"rgba(255, 193, 7, 0.2)",off:"rgba(158, 158, 158, 0.1)"},fan:{on:"rgba(76, 175, 80, 0.2)",off:"rgba(158, 158, 158, 0.1)"},cover:{open:"rgba(3, 169, 244, 0.15)",opening:"rgba(3, 169, 244, 0.15)",closed:"rgba(158, 158, 158, 0.1)",closing:"rgba(158, 158, 158, 0.1)"},humidifier:{on:"rgba(33, 150, 243, 0.2)",off:"rgba(158, 158, 158, 0.1)"},media_player:{playing:"rgba(156, 39, 176, 0.2)",paused:"rgba(255, 152, 0, 0.15)",off:"rgba(158, 158, 158, 0.1)"},vacuum:{cleaning:"rgba(76, 175, 80, 0.2)",docked:"rgba(158, 158, 158, 0.1)",returning:"rgba(255, 152, 0, 0.15)"},water_heater:{electric:"rgba(255, 152, 0, 0.2)",gas:"rgba(255, 87, 34, 0.2)",off:"rgba(158, 158, 158, 0.1)"}};function le(e,t){return ce[e]?.[t]||"var(--ha-card-background)"}const de={climate:function(e,t,i="standard",a=!0){const{current_temperature:s,temperature:n,fan_mode:r,fan_modes:o}=t.attributes,c=t.state,l="mini"===i;return"bar"===i?N`
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
              <span>${e._t("fan_speed")}</span>
              <ha-icon class="expand-icon ${e._fanModeExpanded?"expanded":""}" 
                       icon="${e._fanModeExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
            </div>
            <div class="bar-fan-options ${e._fanModeExpanded?"expanded":"collapsed"}">
              ${o.map(t=>N`
                <div class="bar-fan-chip ${r===t?"active":""}"
                     @click="${()=>e._setFanMode(t)}">
                  ${oe(t,e)}
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
          <span class="device-value">${s}°C → ${n}°C</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="temp-control ${l?"temp-control-mini":""}">
        <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>e._adjustTemp(-.5)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${e._t("target_temp")}</span>
          <span class="value ${l?"value-mini":""}">${n}°C</span>
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
            ${l?"":N`<span>${e._t("fan_speed")}</span>`}
            <ha-icon class="expand-icon ${e._fanModeExpanded?"expanded":""}" 
                     icon="${e._fanModeExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
          </div>
          <div class="fan-mode-options ${l?"fan-mode-options-mini":""} ${e._fanModeExpanded?"expanded":"collapsed"}">
            ${o.map(t=>N`
              <div class="fan-mode-chip ${r===t?"active":""} ${l?"fan-mode-chip-mini":""}"
                   @click="${()=>e._setFanMode(t)}">
                ${oe(t,e)}
              </div>
            `)}
          </div>
        </div>
      `:""}
      
      ${e._renderMainButtons(i)}
    `},light:function(e,t,i="standard",a=!0){const s="on"===t.state,n=t.attributes.brightness||0,r=Math.round(n/255*100),o="bar"===i,c="mini"===i,l=void 0!==t.attributes.brightness;return o?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,s?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              ${s&&l?N`
                <div class="bar-slider-container" @click="${t=>{t.stopPropagation(),e._handleSliderClick(t,"light")}}" @pointerdown="${t=>{t.stopPropagation(),e._handleSliderPointerDown(t,"light")}}">
                  <div class="bar-slider-bg bar-slider-light" style="--slider-value: ${r}%"></div>
                  <div class="bar-slider-text">${r}%</div>
                </div>
              `:N`
                <div class="bar-state">${s?e._t("on"):e._t("off")}</div>
              `}
            </div>
          </div>
          <div class="bar-right">
            ${s&&l?N`
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
              <button class="bar-toggle ${s?"bar-toggle-on":""}" @click="${()=>e._toggleEntity()}">
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
          <span class="device-value">${s&&l?`${r}%`:s?e._t("on"):e._t("off")}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${s?"on":""} ${c?"power-btn-mini":""}" 
                @click="${()=>e._toggleEntity()}">
          <ha-icon icon="mdi:lightbulb${s?"":"-outline"}"></ha-icon>
          ${c?"":N`<span class="mode-label">${s?e._t("on"):e._t("off")}</span>`}
        </button>
      </div>

      ${s&&l?N`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustBrightness(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display" style="cursor: pointer;" @click="${t=>e._handleSliderClick(t,"light")}" @pointerdown="${t=>e._handleSliderPointerDown(t,"light")}">
            <span class="label">${e._t("brightness")}</span>
            <span class="value ${c?"value-mini":""}">${r}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustBrightness(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      
      ${e._renderMainButtons(i)}
    `},fan:function(e,t,i="standard",a=!0){const s="on"===t.state,n=t.attributes.percentage||0,r=t.attributes.preset_modes||[],o=t.attributes.preset_mode,c="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,s?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${s?`${n}%`:e._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            ${s&&void 0!==n?N`
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
              <button class="bar-toggle ${s?"bar-toggle-on":""}" @click="${()=>e._toggleEntity()}">
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
          <span class="device-value">${s?`${n}%`:e._t("off")}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="main-control ${c?"main-control-mini":""}">
        <button class="power-btn ${s?"on":""} ${c?"power-btn-mini":""}" @click="${()=>e._toggleEntity()}">
          <ha-icon icon="mdi:fan"></ha-icon>
          ${c?"":N`<span class="mode-label">${s?e._t("on"):e._t("off")}</span>`}
        </button>
      </div>

      ${s?N`
        <div class="temp-control ${c?"temp-control-mini":""}">
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustFanSpeed(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">${e._t("fan_speed")}</span>
            <span class="value ${c?"value-mini":""}">${n}%</span>
          </div>
          <button class="adj-btn ${c?"adj-btn-mini":""}" @click="${()=>e._adjustFanSpeed(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${e._renderMainButtons(i)}
    `},cover:function(e,t,i="standard",a=!0){const s=t.attributes.current_position||0,n=t.attributes.current_tilt_position??0,r=t.state,o=t.attributes.supported_features??0,c=!!(48&o),l=!!(128&o)&&void 0!==t.attributes.current_tilt_position,d="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${s}%${l?` / ${n}%`:""}</div>
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
          ${void 0!==t.attributes.current_position?N`<span class="device-value">${s}%${l?` / ${n}%`:""}</span>`:""}
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
            <span class="value ${d?"value-mini":""}">${s}%</span>
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
            <span class="value ${d?"value-mini":""}">${n}%</span>
          </div>
          <button class="adj-btn ${d?"adj-btn-mini":""}" @click="${()=>e._adjustCoverTiltPosition(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}
      ${e._renderMainButtons(i)}
    `},humidifier:function(e,t,i="standard",a=!0){const s="on"===t.state,n=t.attributes.humidity||0,r="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,s?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${s?`${n}%`:e._t("off")}</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-toggle ${s?"bar-toggle-on":""}" @click="${()=>e._toggleEntity()}">
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
          <span class="device-value">${s?`${n}%`:e._t("off")}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="main-control ${r?"main-control-mini":""}">
        <button class="power-btn ${s?"on":""} ${r?"power-btn-mini":""}" @click="${()=>e._toggleEntity()}">
          <ha-icon icon="mdi:air-humidifier"></ha-icon>
          ${r?"":N`<span class="mode-label">${s?e._t("on"):e._t("off")}</span>`}
        </button>
      </div>

      ${s?N`
        <div class="temp-control ${r?"temp-control-mini":""}">
          <div style="width: 64px;"></div>
          <div class="target-display">
            <span class="label">${e._t("target_humidity")}</span>
            <span class="value ${r?"value-mini":""}">${n}%</span>
          </div>
          <div style="width: 64px;"></div>
        </div>
      `:""}
      ${e._renderMainButtons(i)}
    `},media_player:function(e,t,i="standard",a=!0){const s=t.state,n=t.attributes||{},r=n.media_title||"No Media",o=n.media_artist||"",c="bar"===i,l="mini"===i,d=n.entity_picture_local||n.entity_picture||n.media_image||n.media_image_url||null,p=d?`--udc-media-bg-image: url("${d}")`:"",u=n.media_content_id||n.media_content_id_local||n.mass_queue_item_id||n.queue_item_id||null,h={artist:[],album:[],playlist:[],track:[]};if(Array.isArray(e._massLibraryItems)&&e._massLibraryItems.forEach(e=>{const t=e.media_type;h[t]&&h[t].push(e)}),c){const n=void 0!==t.attributes.volume_level?Math.round(100*t.attributes.volume_level):0,o=e._showMassPlaylistOrLibrary(t);return N`
        <div class="media-bg-root ${d?"media-bg-root-has":""}" style="${p}">
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"playing"===s?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i,15)}</div>
              <div class="bar-state">${e._renderTitle(r,i,25)}</div>
            </div>
          </div>
          <div class="bar-right">
            ${void 0!==t.attributes.volume_level?N`
              <div class="bar-controls">
                <button class="bar-btn" @click="${()=>e._adjustVolume(-5)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="bar-value">${n}%</span>
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
          <div class="bar-mode-chip ${"playing"===s?"active":""}"
               @click="${()=>e._callService("media_player","playing"===s?"media_pause":"media_play")}">
            <ha-icon icon="mdi:${"playing"===s?"pause":"play"}"></ha-icon>
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
              ${e._massQueueLoading&&0===e._massQueueItems.length?N`<div class="mass-queue-empty">${e._t("mass_queue_loading")}</div>`:0===e._massQueueItems.length?N`<div class="mass-queue-empty">—</div>`:e._massQueueItems.map(t=>{const i=u&&(t.media_content_id===u||t.uri===u||t.queue_item_id===u);return N`
                    <button class="mass-queue-item ${i?"mass-queue-item-active":""}" @click="${()=>e._playMassQueueItem(t)}">
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
                  `})}
            </div>
          </div>
        `:""}

        ${e._isMusicAssistant(t)&&e._hasMusicAssistantLibrary()&&e._massLibraryExpanded?N`
          <div class="mass-queue-foldable">
            <div class="mass-library-section">
              ${e._massLibraryLoading&&0===e._massLibraryItems.length?N`<div class="mass-queue-empty">${e._t("mass_library_loading")}</div>`:0===e._massLibraryItems.length?N`<div class="mass-queue-empty">—</div>`:["artist","album","playlist","track"].map(t=>{const i=h[t]||[];return i.length?N`
                        <div class="mass-library-row">
                          <div class="mass-library-row-title">${t.toUpperCase()}</div>
                          <div class="mass-library-row-scroll" @mousedown="${t=>e._onMassScrollDragStart(t)}">
                            ${i.map(t=>{const i=t.image||t.album?.image,a=t.artists?.map(e=>e.name).filter(Boolean).join(", ")||"",s=t.album?.name||"";return N`
                                <button class="mass-library-chip" @click="${()=>e._playMassLibraryItem(t)}">
                                  <div class="mass-library-chip-image">
                                    ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                  </div>
                                  <div class="mass-library-chip-text">
                                    <span class="mass-library-chip-title">${t.name||"—"}</span>
                                    ${a||s?N`
                                      <span class="mass-library-chip-sub">
                                        ${a||s}
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
              <div class="mass-search-input-wrap">
                <input type="text" class="mass-search-input" .value="${e._massSearchQuery||""}"
                       @input="${t=>e._onMassSearchInput(t)}"
                       @keydown="${t=>{"Enter"===t.key&&(t.preventDefault(),e._runMassSearch())}}"
                       @focus="${()=>e._openSearchSuggestions()}"
                       @blur="${()=>setTimeout(()=>e._closeSearchSuggestions(),150)}"
                       placeholder="${e._t("mass_search_placeholder")}" />
                ${e._massSearchSuggestionsOpen&&e._getFilteredSearchHistory().length?N`
                  <div class="mass-search-suggestions">
                    ${e._getFilteredSearchHistory().map(t=>N`
                      <button type="button" class="mass-search-suggestion-item"
                              @mousedown="${i=>{i.preventDefault(),e._selectSearchHistoryItem(t)}}">
                        ${t}
                      </button>
                    `)}
                  </div>
                `:""}
              </div>
              <button class="mass-search-btn" @click="${()=>e._runMassSearch()}" ?disabled="${e._massSearchLoading}">
                ${e._massSearchLoading?e._t("mass_search_loading"):e._t("mass_search_button")}
              </button>
            </div>
            <div class="mass-library-section">
              ${!e._massSearchLoading||e._massSearchResults?.artists?.length||e._massSearchResults?.albums?.length||e._massSearchResults?.tracks?.length||e._massSearchResults?.playlists?.length||e._massSearchResults?.podcasts?.length?["artists","albums","tracks","playlists","podcasts"].map(t=>{const i="artists"===t?"artist":"albums"===t?"album":"tracks"===t?"track":"playlists"===t?"playlist":"podcast",a=e._massSearchResults?.[t]??[];return a.length?N`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${i.toUpperCase()}</div>
                        <div class="mass-library-row-scroll" @mousedown="${t=>e._onMassScrollDragStart(t)}">
                          ${a.map(t=>{const i=t.image||t.album?.image,a=t.artists?.map(e=>e.name).filter(Boolean).join(", ")||"",s=t.album?.name||"";return N`
                              <button class="mass-library-chip" @click="${()=>e._playMassLibraryItem(t)}">
                                <div class="mass-library-chip-image">
                                  ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${t.name||"—"}</span>
                                  ${a||s?N`
                                    <span class="mass-library-chip-sub">${a||s}</span>
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
        </div>
        </div>
      `}const m=void 0!==t.attributes.volume_level?Math.round(100*t.attributes.volume_level):0,b=e._showMassPlaylistOrLibrary(t);return N`
      <div class="media-bg-root ${d?"media-bg-root-has":""}" style="${p}">
      <div class="header ${l?"header-mini":""}">
        ${e._renderHeaderIcon(t,l)}
        <div class="device-name ${l?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          ${N`<span class="device-value">${e._renderTitle(r,i,28)}</span>`}
        </div>
        ${b&&e._hasMassQueue()?N`
          <button class="header-action" @click="${()=>e._toggleMassQueueExpand()}">
            <ha-icon icon="mdi:playlist-music"></ha-icon>
          </button>
        `:""}
        ${b&&e._hasMusicAssistantLibrary()?N`
          <button class="header-action" @click="${()=>e._toggleMassLibraryExpand()}">
            <ha-icon icon="mdi:music-box-multiple"></ha-icon>
          </button>
        `:""}
        ${b&&e._hasMusicAssistantSearch()?N`
          <button class="header-action" @click="${()=>e._toggleMassSearchExpand()}">
            <ha-icon icon="mdi:magnify"></ha-icon>
          </button>
        `:""}
        ${e._renderHeaderAction(a)}
      </div>

      <div class="media-info ${l?"media-info-mini":""}">
        <div class="media-title ${l?"media-title-mini":""}">${e._renderTitle(r,i,30)}</div>
        ${o&&!l?N`<div class="media-artist">${e._renderTitle(o,i,30)}</div>`:""}
      </div>

      <div class="media-controls ${l?"media-controls-mini":""}">
        <button class="media-btn ${l?"media-btn-mini":""}" @click="${()=>e._callService("media_player","media_previous_track")}">
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        <button class="media-btn primary ${l?"media-btn-mini":""}" @click="${()=>e._callService("media_player","playing"===s?"media_pause":"media_play")}">
          <ha-icon icon="mdi:${"playing"===s?"pause":"play"}"></ha-icon>
        </button>
        <button class="media-btn ${l?"media-btn-mini":""}" @click="${()=>e._callService("media_player","media_next_track")}">
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>

      ${void 0!==t.attributes.volume_level?N`
        <div class="temp-control ${l?"temp-control-mini":""}">
          <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>e._adjustVolume(-5)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">音量</span>
            <span class="value ${l?"value-mini":""}">${m}%</span>
          </div>
          <button class="adj-btn ${l?"adj-btn-mini":""}" @click="${()=>e._adjustVolume(5)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `:""}

      ${e._isMusicAssistant(t)&&e._hasMassQueue()&&e._massQueueExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-queue-list">
            ${e._massQueueLoading&&0===e._massQueueItems.length?N`<div class="mass-queue-empty">${e._t("mass_queue_loading")}</div>`:0===e._massQueueItems.length?N`<div class="mass-queue-empty">—</div>`:e._massQueueItems.map(t=>{const i=u&&(t.media_content_id===u||t.uri===u||t.queue_item_id===u);return N`
                  <button class="mass-queue-item ${i?"mass-queue-item-active":""}" @click="${()=>e._playMassQueueItem(t)}">
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
                `})}
          </div>
        </div>
      `:""}

      ${e._isMusicAssistant(t)&&e._hasMusicAssistantLibrary()&&e._massLibraryExpanded?N`
        <div class="mass-queue-foldable">
          <div class="mass-library-section">
            ${e._massLibraryLoading&&0===e._massLibraryItems.length?N`<div class="mass-queue-empty">${e._t("mass_library_loading")}</div>`:0===e._massLibraryItems.length?N`<div class="mass-queue-empty">—</div>`:["artist","album","playlist","track"].map(t=>{const i=h[t]||[];return i.length?N`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${t.toUpperCase()}</div>
                        <div class="mass-library-row-scroll" @mousedown="${t=>e._onMassScrollDragStart(t)}">
                          ${i.map(t=>{const i=t.image||t.album?.image,a=t.artists?.map(e=>e.name).filter(Boolean).join(", ")||"",s=t.album?.name||"";return N`
                              <button class="mass-library-chip" @click="${()=>e._playMassLibraryItem(t)}">
                                <div class="mass-library-chip-image">
                                  ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${t.name||"—"}</span>
                                  ${a||s?N`
                                    <span class="mass-library-chip-sub">
                                      ${a||s}
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
            <div class="mass-search-input-wrap">
              <input type="text" class="mass-search-input" .value="${e._massSearchQuery||""}"
                     @input="${t=>e._onMassSearchInput(t)}"
                     @focus="${()=>e._openSearchSuggestions()}"
                     @blur="${()=>setTimeout(()=>e._closeSearchSuggestions(),150)}"
                     @keydown="${t=>{"Enter"===t.key&&e._runMassSearch()}}"
                     placeholder="${e._t("mass_search_placeholder")}" />
              ${e._massSearchSuggestionsOpen&&e._getFilteredSearchHistory().length?N`
                <div class="mass-search-suggestions">
                  ${e._getFilteredSearchHistory().map(t=>N`
                    <button type="button" class="mass-search-suggestion-item"
                            @mousedown="${i=>{i.preventDefault(),e._selectSearchHistoryItem(t)}}">
                      ${t}
                    </button>
                  `)}
                </div>
              `:""}
            </div>
            <button class="mass-search-btn" @click="${()=>e._runMassSearch()}" ?disabled="${e._massSearchLoading}">
              ${e._massSearchLoading?N`<span>
                    <span class="mass-search-spinner mass-search-spinner-inline"></span>
                    <span>${e._t("mass_search_loading")}</span>
                  </span>`:e._t("mass_search_button")}
            </button>
          </div>
          <div class="mass-library-section">
            ${!e._massSearchLoading||e._massSearchResults?.artists?.length||e._massSearchResults?.albums?.length||e._massSearchResults?.tracks?.length||e._massSearchResults?.playlists?.length||e._massSearchResults?.podcasts?.length?["artists","albums","tracks","playlists","podcasts"].map(t=>{const i="artists"===t?"artist":"albums"===t?"album":"tracks"===t?"track":"playlists"===t?"playlist":"podcast",a=e._massSearchResults?.[t]??[];return a.length?N`
                    <div class="mass-library-row">
                      <div class="mass-library-row-title">${i.toUpperCase()}</div>
                      <div class="mass-library-row-scroll" @mousedown="${t=>e._onMassScrollDragStart(t)}">
                        ${a.map(t=>{const i=t.image||t.album?.image,a=t.artists?.map(e=>e.name).filter(Boolean).join(", ")||"",s=t.album?.name||"";return N`
                            <button class="mass-library-chip" @click="${()=>e._playMassLibraryItem(t)}">
                              <div class="mass-library-chip-image">
                                ${i?N`<img src="${i}" alt="" />`:N`<ha-icon icon="mdi:music"></ha-icon>`}
                              </div>
                              <div class="mass-library-chip-text">
                                <span class="mass-library-chip-title">${t.name||"—"}</span>
                                ${a||s?N`
                                  <span class="mass-library-chip-sub">${a||s}</span>
                                `:""}
                              </div>
                            </button>
                          `})}
                      </div>
                    </div>
                  `:""}):N`
                  <div class="mass-queue-empty">
                    <div class="mass-search-spinner mass-search-spinner-center"></div>
                    <div>${e._t("mass_search_loading")}</div>
                  </div>
                `}
          </div>
        </div>
      `:""}

      ${e._renderMainButtons(i)}
      </div>
    `},vacuum:function(e,t,i="standard",a=!0){const s=t.state,n=t.attributes||{},r=n.battery_level??n.battery??n.battery_percent??n.batteryPercentage,o=null!=r&&Number.isFinite(Number(r))?Math.max(0,Math.min(100,Number(r))):null,c="mini"===i;return"bar"===i?N`
        <div class="bar-content">
          <div class="bar-left">
            ${e._renderBarIcon(t,"cleaning"===s?"bar-icon-on":"")}
            <div class="bar-info">
              <div class="bar-name">${e._renderTitle(t.attributes.friendly_name,i)}</div>
              <div class="bar-state">${e._getVacuumStateText(s)}${null!=o?` · ${o}%`:""}</div>
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
      <div class="header ${c?"header-mini":""}">
        ${e._renderHeaderIcon(t,c)}
        <div class="device-name ${c?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${e._getVacuumStateText(s)}${null!=o?` · ${o}%`:""}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="vacuum-status ${c?"vacuum-status-mini":""}">
        <div class="status-badge ${c?"status-badge-mini":""}">${e._getVacuumStateText(s)}</div>
        ${null!=o?N`
        <div class="battery-display ${c?"battery-display-mini":""}">
          <ha-icon icon="mdi:battery${o>90?"":o>50?"-50":"-20"}"></ha-icon>
          <span>${o}%</span>
        </div>
        `:""}
      </div>

      <div class="vacuum-controls ${c?"vacuum-controls-mini":""}">
        <button class="vacuum-btn ${c?"vacuum-btn-mini":""}" @click="${()=>e._callService("vacuum","start")}">
          <ha-icon icon="mdi:play"></ha-icon>
          <span>${e._t("start")}</span>
        </button>
        <button class="vacuum-btn ${c?"vacuum-btn-mini":""}" @click="${()=>e._callService("vacuum","pause")}">
          <ha-icon icon="mdi:pause"></ha-icon>
          <span>${e._t("pause")}</span>
        </button>
        <button class="vacuum-btn ${c?"vacuum-btn-mini":""}" @click="${()=>e._callService("vacuum","return_to_base")}">
          <ha-icon icon="mdi:home"></ha-icon>
          <span>${e._t("return_home")}</span>
        </button>
      </div>
      ${e._renderMainButtons(i)}
    `},water_heater:function(e,t,i="standard",a=!0){const s=t.attributes.temperature||0,n=t.attributes.current_temperature||0,r="mini"===i;return"bar"===i?N`
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
          <span class="device-value">${n}°C → ${s}°C</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="temp-control ${r?"temp-control-mini":""}">
        <button class="adj-btn ${r?"adj-btn-mini":""}" @click="${()=>e._adjustWaterTemp(-1)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${e._t("target_temp")}</span>
          <span class="value ${r?"value-mini":""}">${s}°C</span>
        </div>
        <button class="adj-btn ${r?"adj-btn-mini":""}" @click="${()=>e._adjustWaterTemp(1)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${e._renderMainButtons(i)}
    `},generic:function(e,t,i="standard",a=!0){const s="mini"===i;return"bar"===i?N`
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
      <div class="header ${s?"header-mini":""}">
        ${e._renderHeaderIcon(t,s)}
        <div class="device-name ${s?"device-name-mini":""}">
          ${e._renderTitle(t.attributes.friendly_name||e._t("device"),i)}
          <span class="device-value">${t.state}</span>
        </div>
        ${e._renderHeaderAction(a)}
      </div>

      <div class="temp-control ${s?"temp-control-mini":""}">
        <div style="width: 64px;"></div>
        <div class="target-display">
          <span class="label">${e._t("device")}</span>
          <span class="value ${s?"value-mini":""}">${t.state}</span>
        </div>
        <div style="width: 64px;"></div>
      </div>
      ${e._renderMainButtons(i)}
    `}};customElements.define("universal-device-card",class extends ee{static get properties(){return{hass:{},config:{},_showPopup:{type:Boolean},_showTextPopup:{type:Boolean},_popupText:{type:String},_translations:{type:Object},_fanModeExpanded:{type:Boolean},_massQueueItems:{type:Array},_massQueueExpanded:{type:Boolean},_massQueueLoading:{type:Boolean},_massLibraryItems:{type:Array},_massLibraryExpanded:{type:Boolean},_massLibraryLoading:{type:Boolean},_massSearchExpanded:{type:Boolean},_massSearchQuery:{type:String},_massSearchLoading:{type:Boolean},_massSearchResults:{type:Object}}}constructor(){super(),this._showPopup=!1,this._showTextPopup=!1,this._popupText="",this._translations={},this._fanModeExpanded=!1,this._iconLongPressTimer=null,this._iconLongPressFired=!1,this._iconLastTapTime=0,this._massQueueItems=[],this._massQueueExpanded=!1,this._massQueueLoading=!1,this._massLibraryItems=[],this._massLibraryExpanded=!1,this._massLibraryLoading=!1,this._massSearchExpanded=!1,this._massSearchQuery="",this._massSearchLoading=!1,this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]},this._massSearchSuggestionsOpen=!1,this._massSearchHistory=[],this._relatedEntitiesCache=null,this._relatedEntitiesDeviceId=null,this._servicesHass=null,this._servicesEntity=null,this._massSearchDebounceTimer=null,this._sliderDrag=null,this._massSearchCache={},this._deviceEntityIndex=null,this._deviceEntityIndexHass=null,this._stateColorKey="",this._stateColorCached=null,this._popupDirty=!1}async connectedCallback(){super.connectedCallback(),await this._loadTranslations(),this._loadSearchHistory()}disconnectedCallback(){super.disconnectedCallback(),this._removePopupPortal()}_createPopupPortal(){if(!0===this.config?.disable_popup)return;if(!this._popupPortal){this._popupPortal=document.createElement("div"),this._popupPortal.className="udc-popup-portal";const e=this._isInBubbleCardPopup(),t=e?1e4:1e3;this._popupPortal.style.cssText=`position: fixed; inset: 0; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh; min-height: -webkit-fill-available; pointer-events: none; z-index: ${t};`;if(!window.__udcPopupCssFn){window.__udcPopupCssFn=(function(){const css="      /* Popup Styles */\n      .popup-overlay {\n        position: fixed !important; \n        inset: 0 !important;\n        top: 0 !important; \n        left: 0 !important; \n        right: 0 !important; \n        bottom: 0 !important;\n        min-height: 100vh;\n        min-height: 100dvh;\n        padding:\n          env(safe-area-inset-top, 0px)\n          env(safe-area-inset-right, 0px)\n          env(safe-area-inset-bottom, 0px)\n          env(safe-area-inset-left, 0px);\n        background: rgba(0,0,0,0.7); \n        backdrop-filter: blur(12px);\n        -webkit-backdrop-filter: blur(12px);\n        display: flex; \n        align-items: flex-end;\n        justify-content: center; \n        z-index: 9999 !important;\n        animation: fadeIn 0.3s;\n        /* 重要：確保 popup 不受父元素的 transform/filter 影響 */\n        transform: none !important;\n        will-change: auto;\n        overscroll-behavior: contain;\n      }\n      \n      .popup-content {\n        width: 100%; \n        max-height: 85vh; \n        max-height: 85dvh;\n        background: var(--card-background-color);\n        border-radius: 36px 36px 0 0; \n        padding: 20px;\n        padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));\n        overflow-y: auto; \n        -webkit-overflow-scrolling: touch;\n        overscroll-behavior: contain;\n        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);\n      }\n\n      @supports (-webkit-touch-callout: none) {\n        .popup-overlay {\n          min-height: -webkit-fill-available;\n        }\n\n        .popup-content {\n          max-height: calc(100dvh - env(safe-area-inset-top, 0px) - 8px);\n          border-radius: 30px 30px 0 0;\n        }\n      }\n\n      /* 寬屏幕支持 - 在桌面設備上顯示為居中對話框 */\n      @media (min-width: 768px) {\n        .popup-overlay {\n          align-items: center;\n          padding: 20px;\n        }\n\n        .popup-content {\n          max-width: 820px;\n          width: min(92vw, 820px);\n          max-height: 86vh;\n          max-height: 86dvh;\n          border-radius: 24px;\n          padding-bottom: 20px;\n          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n          animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);\n        }\n\n        @keyframes scaleIn {\n          from {\n            opacity: 0;\n            transform: scale(0.9);\n          }\n          to {\n            opacity: 1;\n            transform: scale(1);\n          }\n        }\n      }\n      \n      .popup-header {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        margin-bottom: 24px;\n      }\n      \n      .popup-drag-handle { \n        width: 50px; \n        height: 5px; \n        background: rgba(var(--rgb-primary-text-color), 0.2); \n        border-radius: 3px; \n      }\n      \n      .close-btn {\n        position: absolute;\n        right: 0;\n        cursor: pointer;\n        color: var(--secondary-text-color);\n        padding: 4px;\n        transition: color 0.3s;\n      }\n\n      .close-btn:hover {\n        color: var(--primary-text-color);\n      }\n\n      /* Sensor Chips */\n      .chips-container { \n        display: flex; \n        flex-wrap: wrap; \n        gap: 10px; \n        margin-bottom: 24px; \n      }\n      \n      .chip { \n        display: flex; \n        align-items: center; \n        gap: 8px; \n        padding: 8px 16px; \n        background: rgba(var(--rgb-primary-text-color), 0.06); \n        border-radius: 100px; \n        font-size: 0.9rem; \n        font-weight: 600;\n      }\n\n      /* Control Cards */\n      .controls-list { \n        display: flex; \n        flex-direction: column; \n        gap: 14px; \n      }\n      \n      .control-card {\n        background: rgba(var(--rgb-primary-text-color), 0.04);\n        padding: 18px; \n        border-radius: 24px;\n        display: flex; \n        justify-content: space-between; \n        align-items: center;\n      }\n      \n      .control-header { \n        display: flex; \n        align-items: center; \n        gap: 14px; \n        font-weight: 700; \n      }\n      \n      .no-controls {\n        text-align: center;\n        padding: 32px;\n        opacity: 0.5;\n      }\n\n      /* Unavailable State Styles */\n      .chip-unavailable {\n        opacity: 0.5;\n        background: rgba(var(--rgb-primary-text-color), 0.03) !important;\n      }\n\n      .control-card-unavailable {\n        opacity: 0.6;\n        pointer-events: none;\n      }\n\n      .control-card-unavailable .control-action {\n        filter: grayscale(0.8);\n      }\n\n      .unavailable-badge {\n        font-size: 0.7rem;\n        padding: 2px 8px;\n        border-radius: 10px;\n        background: rgba(255, 87, 34, 0.15);\n        color: #ff5722;\n        margin-left: 8px;\n        font-weight: 600;\n      }\n\n      .unavailable-text {\n        opacity: 0.4;\n      }\n\n      /* Control Actions */\n      .select-grid { \n        display: grid; \n        grid-template-columns: repeat(2, 1fr); \n        gap: 8px; \n        width: 55%; \n      }\n      \n      .select-opt { \n        padding: 10px 4px; \n        text-align: center; \n        background: rgba(var(--rgb-primary-text-color), 0.06); \n        border-radius: 12px; \n        font-size: 0.75rem; \n        cursor: pointer; \n        font-weight: 500; \n        transition: all 0.2s;\n      }\n      \n      .select-opt:hover {\n        background: rgba(var(--rgb-primary-text-color), 0.12);\n      }\n      \n      .select-opt.active { \n        background: var(--accent-color); \n        color: white; \n      }\n\n      .select-opt.disabled {\n        opacity: 0.4;\n        cursor: not-allowed;\n        pointer-events: none;\n      }\n\n      .number-control {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n      }\n\n      .number-control button {\n        width: 36px;\n        height: 36px;\n        border-radius: 50%;\n        border: none;\n        background: rgba(var(--rgb-primary-text-color), 0.1);\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .number-control button:hover {\n        background: var(--accent-color);\n        color: white;\n      }\n\n      .number-control button:disabled {\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n\n      .action-btn {\n        padding: 8px 16px;\n        border-radius: 12px;\n        border: none;\n        background: var(--accent-color);\n        color: white;\n        cursor: pointer;\n        transition: all 0.2s;\n      }\n\n      .action-btn:hover {\n        transform: scale(1.05);\n      }\n\n      .action-btn:disabled {\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n\n      .state-text {\n        font-weight: 600;\n        opacity: 0.8;\n      }\n\n      .popup-content {\n        background: linear-gradient(165deg, rgba(32, 32, 38, 0.98) 0%, rgba(18, 18, 22, 0.99) 100%) !important;\n        border: 1px solid rgba(255, 255, 255, 0.08);\n        box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.45);\n        color-scheme: dark;\n        --primary-text-color: rgba(255, 255, 255, 0.94);\n        --secondary-text-color: rgba(255, 255, 255, 0.68);\n        --disabled-text-color: rgba(255, 255, 255, 0.42);\n        --rgb-primary-text-color: 255, 255, 255;\n        --rgb-secondary-text-color: 255, 255, 255;\n        --divider-color: rgba(255, 255, 255, 0.1);\n        --mdc-theme-on-surface: rgba(255, 255, 255, 0.94);\n        --mdc-theme-text-primary-on-background: rgba(255, 255, 255, 0.94);\n        --mdc-theme-text-secondary-on-background: rgba(255, 255, 255, 0.68);\n        --mdc-icon-color: rgba(255, 255, 255, 0.88);\n        --primary-text-color-rgb: 255, 255, 255;\n        color: rgba(255, 255, 255, 0.94) !important;\n      }\n\n      .popup-content .popup-title,\n      .popup-content .sensor-value,\n      .popup-content .control-row-label,\n      .popup-content .state-text,\n      .popup-content .number-control span,\n      .popup-content .chip {\n        color: rgba(255, 255, 255, 0.94) !important;\n      }\n\n      .popup-content .popup-section-title,\n      .popup-content .sensor-label {\n        color: rgba(255, 255, 255, 0.62) !important;\n        opacity: 1 !important;\n      }\n\n      .popup-content .close-btn {\n        color: rgba(255, 255, 255, 0.78) !important;\n      }\n\n      .popup-content .close-btn:hover {\n        color: rgba(255, 255, 255, 0.96) !important;\n      }\n\n      .popup-content ha-icon {\n        color: rgba(255, 255, 255, 0.88);\n      }\n\n      .popup-content .select-opt {\n        color: rgba(255, 255, 255, 0.88) !important;\n      }\n\n      .popup-content .select-opt.active {\n        color: #fff !important;\n        background: var(--accent-color, #03a9f4) !important;\n        border-color: transparent;\n      }\n\n      .popup-content .number-control button {\n        color: rgba(255, 255, 255, 0.9) !important;\n      }\n\n      .popup-content .action-btn {\n        color: #fff !important;\n      }\n\n      .popup-content .unavailable-badge {\n        background: rgba(255, 87, 34, 0.22) !important;\n        color: #ffab91 !important;\n      }\n\n      .popup-content .no-controls {\n        color: rgba(255, 255, 255, 0.55) !important;\n      }\n      /* ===== Mobile Device Panel v2.6.4 ===== */\n      .popup-status {\n        display: none;\n      }\n\n      @media (max-width: 767px) {\n        .popup-overlay {\n          align-items: flex-end !important;\n          padding: 0 !important;\n          background: rgba(0, 0, 0, 0.62) !important;\n        }\n\n        .popup-content {\n          display: flex !important;\n          flex-direction: column !important;\n          width: 100% !important;\n          max-width: 100% !important;\n          max-height: min(94dvh, 960px) !important;\n          border-radius: 24px 24px 0 0 !important;\n          padding: 4px 12px 0 !important;\n          overflow: hidden !important;\n          border: 1px solid rgba(255, 255, 255, 0.1) !important;\n          border-bottom: none !important;\n          box-shadow: 0 -16px 56px rgba(0, 0, 0, 0.6) !important;\n          will-change: transform;\n          transition: transform 0.18s ease-out;\n        }\n\n        .popup-content.is-dragging {\n          transition: none !important;\n        }\n\n        .popup-header {\n          position: relative !important;\n          z-index: 6 !important;\n          flex-shrink: 0 !important;\n          margin-bottom: 0 !important;\n          padding: 2px 2px 10px !important;\n          background: transparent !important;\n          border-bottom: none !important;\n          backdrop-filter: none !important;\n        }\n\n        .popup-drag-handle {\n          width: 40px !important;\n          height: 4px !important;\n          margin-bottom: 8px !important;\n          background: rgba(255, 255, 255, 0.32) !important;\n          position: relative;\n        }\n\n        .popup-drag-handle::before {\n          content: '';\n          position: absolute;\n          inset: -14px -48px;\n        }\n\n        .popup-title {\n          font-size: 1.14rem !important;\n          font-weight: 750 !important;\n          line-height: 1.2 !important;\n        }\n\n        .popup-subtitle {\n          display: block !important;\n          text-align: left !important;\n          font-size: 0.66rem !important;\n          margin-top: 2px !important;\n          color: rgba(255, 255, 255, 0.4) !important;\n        }\n\n        .popup-content .close-btn {\n          width: 38px !important;\n          height: 38px !important;\n          background: rgba(255, 255, 255, 0.08) !important;\n        }\n\n        .popup-status {\n          display: flex;\n          align-items: center;\n          gap: 10px;\n          margin: 0 2px 10px;\n          padding: 10px 12px;\n          border-radius: 14px;\n          background: rgba(255, 255, 255, 0.06);\n          border: 1px solid rgba(255, 255, 255, 0.08);\n          flex-shrink: 0;\n        }\n\n        .popup-status-dot {\n          width: 10px;\n          height: 10px;\n          border-radius: 50%;\n          background: rgba(255, 255, 255, 0.28);\n          flex-shrink: 0;\n          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);\n        }\n\n        .popup-status.is-on .popup-status-dot {\n          background: #4caf50;\n          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.22);\n        }\n\n        .popup-status.is-off .popup-status-dot {\n          background: rgba(255, 255, 255, 0.28);\n        }\n\n        .popup-status.is-unavailable .popup-status-dot {\n          background: #ff7043;\n          box-shadow: 0 0 0 3px rgba(255, 112, 67, 0.2);\n        }\n\n        .popup-status-meta {\n          flex: 1;\n          min-width: 0;\n          display: flex;\n          flex-direction: column;\n          gap: 1px;\n        }\n\n        .popup-status-label {\n          font-size: 0.62rem;\n          font-weight: 650;\n          letter-spacing: 0.08em;\n          text-transform: uppercase;\n          color: rgba(255, 255, 255, 0.42);\n        }\n\n        .popup-status-value {\n          font-size: 0.95rem;\n          font-weight: 700;\n          color: rgba(255, 255, 255, 0.94);\n          white-space: nowrap;\n          overflow: hidden;\n          text-overflow: ellipsis;\n        }\n\n        .popup-status-action {\n          flex-shrink: 0;\n        }\n\n        .popup-body {\n          flex: 1 1 auto !important;\n          min-height: 0 !important;\n          overflow-y: auto !important;\n          -webkit-overflow-scrolling: touch;\n          overscroll-behavior: contain;\n          gap: 12px !important;\n          padding: 2px 2px calc(18px + env(safe-area-inset-bottom, 0px)) !important;\n          mask-image: linear-gradient(180deg, #000 0%, #000 calc(100% - 18px), transparent 100%);\n          -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 calc(100% - 18px), transparent 100%);\n        }\n\n        .popup-section-title {\n          font-size: 0.6rem !important;\n          letter-spacing: 0.14em !important;\n          margin-bottom: 7px !important;\n          opacity: 1 !important;\n          color: rgba(255, 255, 255, 0.48) !important;\n        }\n\n        .sensor-grid {\n          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n          gap: 7px !important;\n        }\n\n        .sensor-card {\n          flex-direction: column !important;\n          align-items: stretch !important;\n          gap: 6px !important;\n          min-height: 0 !important;\n          padding: 11px 11px 10px !important;\n          border-radius: 15px !important;\n          background: rgba(255, 255, 255, 0.055) !important;\n          border: 1px solid rgba(255, 255, 255, 0.07) !important;\n        }\n\n        .sensor-card.is-on {\n          background: rgba(76, 175, 80, 0.12) !important;\n          border-color: rgba(76, 175, 80, 0.28) !important;\n        }\n\n        .sensor-card.is-on .sensor-value {\n          color: #81c784 !important;\n        }\n\n        .sensor-card.is-off .sensor-value {\n          color: rgba(255, 255, 255, 0.55) !important;\n        }\n\n        .sensor-card:active {\n          background: rgba(255, 255, 255, 0.1) !important;\n        }\n\n        .sensor-card ha-icon {\n          width: 17px !important;\n          height: 17px !important;\n          margin-top: 0 !important;\n          opacity: 0.65 !important;\n        }\n\n        .sensor-card-body {\n          display: flex !important;\n          flex-direction: column !important;\n          gap: 2px !important;\n        }\n\n        .sensor-value {\n          order: -1 !important;\n          font-size: 1.18rem !important;\n          font-weight: 750 !important;\n          letter-spacing: -0.02em !important;\n          line-height: 1.12 !important;\n        }\n\n        .sensor-label {\n          font-size: 0.66rem !important;\n          font-weight: 600 !important;\n          color: rgba(255, 255, 255, 0.5) !important;\n          opacity: 1 !important;\n          display: -webkit-box;\n          -webkit-line-clamp: 2;\n          -webkit-box-orient: vertical;\n          overflow: hidden;\n        }\n\n        .sensor-grid .sensor-card:last-child:nth-child(odd) {\n          grid-column: 1 / -1;\n        }\n\n        .controls-group {\n          border-radius: 16px !important;\n          background: rgba(255, 255, 255, 0.04) !important;\n          border: 1px solid rgba(255, 255, 255, 0.07) !important;\n        }\n\n        .control-row {\n          min-height: 52px;\n          padding: 10px 11px !important;\n          gap: 9px !important;\n        }\n\n        .control-row:active:not(.control-row-unavailable) {\n          background: rgba(255, 255, 255, 0.07) !important;\n        }\n\n        .control-row-icon {\n          width: 32px !important;\n          height: 32px !important;\n          border-radius: 10px !important;\n          background: rgba(255, 255, 255, 0.08) !important;\n        }\n\n        .control-row-label {\n          font-size: 0.86rem !important;\n          line-height: 1.25 !important;\n        }\n\n        .control-row:has(.select-grid),\n        .control-row:has(.number-control) {\n          flex-wrap: wrap;\n        }\n\n        .control-row:has(.select-grid) .control-row-action,\n        .control-row:has(.number-control) .control-row-action {\n          flex: 1 1 100%;\n          margin-top: 5px;\n          justify-content: stretch !important;\n        }\n\n        .control-row:has(.select-grid) .select-grid {\n          max-width: 100% !important;\n          width: 100% !important;\n          display: grid !important;\n          grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)) !important;\n          gap: 5px !important;\n          justify-content: stretch !important;\n        }\n\n        .select-opt {\n          min-height: 40px !important;\n          display: flex !important;\n          align-items: center !important;\n          justify-content: center !important;\n          padding: 8px 5px !important;\n          font-size: 0.72rem !important;\n          font-weight: 650 !important;\n          border-radius: 11px !important;\n          -webkit-tap-highlight-color: transparent;\n        }\n\n        .select-opt:active {\n          transform: scale(0.97);\n        }\n\n        .control-row:has(.number-control) .number-control {\n          width: 100%;\n          justify-content: space-between;\n          padding: 5px 6px !important;\n          border-radius: 12px !important;\n        }\n\n        .number-control button {\n          width: 42px !important;\n          height: 42px !important;\n          border-radius: 12px !important;\n          font-size: 1.15rem !important;\n        }\n\n        .number-control span {\n          min-width: 52px !important;\n          font-size: 1.08rem !important;\n        }\n\n        .action-btn {\n          width: 44px !important;\n          height: 44px !important;\n          border-radius: 12px !important;\n        }\n\n        ha-switch {\n          transform: scale(1.08);\n          transform-origin: center right;\n        }\n\n        .no-controls {\n          padding: 32px 14px !important;\n        }\n      }\n\n      @media (max-width: 380px) {\n        .sensor-grid {\n          grid-template-columns: 1fr !important;\n        }\n        .sensor-grid .sensor-card:last-child:nth-child(odd) {\n          grid-column: auto;\n        }\n        .popup-title {\n          font-size: 1.02rem !important;\n        }\n      }\n\n      @media (min-width: 381px) and (max-width: 767px) {\n        .popup-content[data-sensors='1'] .sensor-grid {\n          grid-template-columns: 1fr !important;\n        }\n      }\n\n      @media (max-width: 900px) and (max-height: 480px) and (orientation: landscape) {\n        .popup-content {\n          max-height: 96dvh !important;\n          border-radius: 16px 16px 0 0 !important;\n        }\n        .popup-status {\n          display: none !important;\n        }\n        .sensor-grid {\n          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;\n        }\n        .popup-body {\n          gap: 8px !important;\n        }\n      }\n\n/* ===== Responsive Device Panel v2.6 ===== */\n      .popup-title-wrap {\n        min-width: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n      }\n\n      .popup-subtitle {\n        display: none;\n        font-size: 0.72rem;\n        font-weight: 500;\n        color: rgba(255, 255, 255, 0.45) !important;\n        letter-spacing: 0.01em;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .popup-body {\n        display: flex;\n        flex-direction: column;\n        gap: 18px;\n      }\n\n      .popup-section-sensors,\n      .popup-section-controls {\n        min-width: 0;\n      }\n\n      /* —— Mobile (default): bottom sheet —— */\n      .popup-content {\n        padding: 10px 16px calc(18px + env(safe-area-inset-bottom, 0px)) !important;\n        max-height: 88vh !important;\n        max-height: 88dvh !important;\n      }\n\n      .popup-header {\n        display: grid !important;\n        grid-template-columns: 1fr 40px !important;\n        grid-template-rows: auto auto !important;\n        align-items: center !important;\n        column-gap: 8px !important;\n        margin-bottom: 14px !important;\n        padding-bottom: 0 !important;\n        border-bottom: none !important;\n      }\n\n      .popup-drag-handle {\n        grid-column: 1 / -1 !important;\n        grid-row: 1 !important;\n        justify-self: center !important;\n        margin-bottom: 12px !important;\n        display: block !important;\n      }\n\n      .popup-title-wrap {\n        grid-column: 1 !important;\n        grid-row: 2 !important;\n      }\n\n      .popup-title {\n        text-align: left !important;\n        font-size: 1.08rem !important;\n      }\n\n      .popup-content .close-btn {\n        grid-column: 2 !important;\n        grid-row: 2 !important;\n        justify-self: end !important;\n        align-self: center !important;\n      }\n\n      .sensor-grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n        gap: 8px !important;\n      }\n\n      .sensor-card {\n        min-height: 64px !important;\n        padding: 12px !important;\n        border-radius: 14px !important;\n      }\n\n      .sensor-value {\n        font-size: 0.98rem !important;\n      }\n\n      .control-row {\n        min-height: 52px;\n        padding: 12px 12px !important;\n        gap: 10px !important;\n      }\n\n      .control-row-icon {\n        width: 36px !important;\n        height: 36px !important;\n        border-radius: 11px !important;\n      }\n\n      /* Mobile: wide option grids wrap under label for touch */\n      .control-row:has(.select-grid) {\n        flex-wrap: wrap;\n      }\n\n      .control-row:has(.select-grid) .control-row-action {\n        flex: 1 1 100%;\n        margin-top: 4px;\n        justify-content: flex-start !important;\n      }\n\n      .control-row:has(.select-grid) .select-grid {\n        max-width: 100% !important;\n        width: 100% !important;\n        justify-content: flex-start !important;\n      }\n\n      @media (max-width: 380px) {\n        .sensor-grid {\n          grid-template-columns: 1fr !important;\n        }\n      }\n\n      /* —— Desktop / tablet: centered dual-pane dialog —— */\n      @media (min-width: 768px) {\n        .popup-overlay {\n          align-items: center !important;\n          justify-content: center !important;\n          padding: 28px !important;\n        }\n\n        .popup-content {\n          width: min(92vw, 820px) !important;\n          max-width: 820px !important;\n          max-height: 86vh !important;\n          max-height: 86dvh !important;\n          border-radius: 24px !important;\n          padding: 28px 32px 30px !important;\n          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55) !important;\n        }\n\n        .popup-drag-handle {\n          display: none !important;\n        }\n\n        .popup-header {\n          grid-template-columns: 1fr 44px !important;\n          grid-template-rows: auto !important;\n          margin-bottom: 22px !important;\n          padding-bottom: 16px !important;\n          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n        }\n\n        .popup-title-wrap {\n          grid-column: 1 !important;\n          grid-row: 1 !important;\n        }\n\n        .popup-title {\n          font-size: 1.28rem !important;\n          letter-spacing: -0.01em !important;\n        }\n\n        .popup-subtitle {\n          display: block !important;\n          text-align: left !important;\n          margin-top: 4px;\n        }\n\n        .popup-content .close-btn {\n          grid-column: 2 !important;\n          grid-row: 1 !important;\n          width: 40px !important;\n          height: 40px !important;\n        }\n\n        .popup-content.has-both .popup-body {\n          display: grid !important;\n          grid-template-columns: minmax(240px, 0.92fr) minmax(300px, 1.18fr);\n          gap: 28px;\n          align-items: start;\n        }\n\n        .popup-section-title {\n          position: sticky;\n          top: 0;\n          z-index: 1;\n          background: linear-gradient(180deg, rgba(24, 24, 28, 0.98) 60%, rgba(24, 24, 28, 0));\n          padding-top: 2px;\n          padding-bottom: 8px;\n          margin-bottom: 8px !important;\n        }\n\n        .popup-section-controls .controls-group {\n          max-height: calc(86dvh - 170px);\n          overflow-y: auto;\n          overscroll-behavior: contain;\n        }\n\n        .sensor-grid {\n          gap: 12px !important;\n        }\n\n        .sensor-card {\n          min-height: 78px !important;\n          padding: 16px !important;\n          border-radius: 16px !important;\n        }\n\n        .sensor-value {\n          font-size: 1.12rem !important;\n        }\n\n        .control-row {\n          min-height: 56px;\n          padding: 14px 16px !important;\n        }\n\n        .control-row:has(.select-grid) {\n          flex-wrap: nowrap;\n        }\n\n        .control-row:has(.select-grid) .control-row-action {\n          flex: 0 0 auto;\n          margin-top: 0;\n          width: auto;\n          justify-content: flex-end !important;\n        }\n\n        .control-row:has(.select-grid) .select-grid {\n          max-width: 220px !important;\n          width: auto !important;\n          justify-content: flex-end !important;\n        }\n\n        .control-row:hover:not(.control-row-unavailable) {\n          background: rgba(255, 255, 255, 0.055) !important;\n        }\n\n        .popup-content.has-sensors-only .sensor-grid {\n          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;\n        }\n\n        .popup-content.has-controls-only .controls-group {\n          max-height: calc(86dvh - 140px);\n        }\n      }\n\n      @media (min-width: 1100px) {\n        .popup-content {\n          width: min(90vw, 960px) !important;\n          max-width: 960px !important;\n          padding: 32px 36px 34px !important;\n        }\n\n        .popup-content.has-both .popup-body {\n          grid-template-columns: minmax(280px, 1fr) minmax(340px, 1.25fr);\n          gap: 36px;\n        }\n\n        .popup-content.has-both .sensor-grid {\n          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n        }\n\n        .popup-content.has-sensors-only .sensor-grid {\n          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;\n        }\n      }\n\n\n      .popup-header {\n        display: grid;\n        grid-template-columns: 40px 1fr 40px;\n        align-items: center;\n        margin-bottom: 20px;\n        padding-bottom: 4px;\n      }\n\n      .popup-title {\n        font-size: 1.05rem;\n        font-weight: 700;\n        text-align: center;\n        letter-spacing: 0.01em;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding: 0 4px;\n      }\n\n      .popup-drag-handle {\n        grid-column: 2;\n        justify-self: center;\n        width: 40px;\n        height: 4px;\n        background: rgba(255, 255, 255, 0.18);\n        border-radius: 4px;\n        margin-bottom: 10px;\n      }\n\n      .close-btn {\n        grid-column: 3;\n        grid-row: 1;\n        width: 36px;\n        height: 36px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        background: rgba(255, 255, 255, 0.06);\n        border: 1px solid rgba(255, 255, 255, 0.08);\n        transition: background 0.2s, transform 0.15s;\n      }\n\n      .close-btn:hover {\n        background: rgba(255, 255, 255, 0.12);\n        transform: scale(1.05);\n      }\n\n      .popup-section {\n        margin-bottom: 20px;\n      }\n\n      .popup-section-title {\n        font-size: 0.68rem;\n        font-weight: 700;\n        letter-spacing: 0.12em;\n        text-transform: uppercase;\n        opacity: 0.45;\n        margin-bottom: 10px;\n        padding-left: 2px;\n      }\n\n      .sensor-grid {\n        display: grid;\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n        gap: 10px;\n      }\n\n      .sensor-card {\n        display: flex;\n        align-items: flex-start;\n        gap: 10px;\n        padding: 14px;\n        border-radius: 16px;\n        background: rgba(255, 255, 255, 0.05);\n        border: 1px solid rgba(255, 255, 255, 0.07);\n        min-height: 72px;\n      }\n\n      .sensor-card ha-icon {\n        width: 22px;\n        height: 22px;\n        opacity: 0.75;\n        flex-shrink: 0;\n        margin-top: 2px;\n      }\n\n      .sensor-card-body {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        min-width: 0;\n      }\n\n      .sensor-label {\n        font-size: 0.72rem;\n        font-weight: 600;\n        opacity: 0.55;\n        line-height: 1.2;\n        word-break: break-word;\n      }\n\n      .sensor-value {\n        font-size: 1.02rem;\n        font-weight: 700;\n        line-height: 1.2;\n        letter-spacing: -0.01em;\n      }\n\n      .sensor-card-unavailable {\n        opacity: 0.45;\n      }\n\n      .controls-group {\n        border-radius: 18px;\n        overflow: hidden;\n        background: rgba(255, 255, 255, 0.04);\n        border: 1px solid rgba(255, 255, 255, 0.07);\n      }\n\n      .control-row {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 13px 14px;\n        border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n        transition: background 0.15s;\n      }\n\n      .control-row:last-child {\n        border-bottom: none;\n      }\n\n      .control-row:hover:not(.control-row-unavailable) {\n        background: rgba(255, 255, 255, 0.03);\n      }\n\n      .control-row-icon {\n        width: 38px;\n        height: 38px;\n        border-radius: 12px;\n        background: rgba(255, 255, 255, 0.07);\n        border: 1px solid rgba(255, 255, 255, 0.06);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n      }\n\n      .control-row-icon ha-icon {\n        width: 20px;\n        height: 20px;\n        opacity: 0.85;\n      }\n\n      .control-row-label {\n        flex: 1;\n        font-weight: 600;\n        font-size: 0.9rem;\n        line-height: 1.25;\n        min-width: 0;\n        word-break: break-word;\n      }\n\n      .control-row-action {\n        flex-shrink: 0;\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n      }\n\n      .control-row-unavailable {\n        opacity: 0.5;\n        pointer-events: none;\n      }\n\n      .select-grid {\n        display: flex !important;\n        flex-wrap: wrap;\n        gap: 6px !important;\n        width: auto !important;\n        max-width: 160px;\n        justify-content: flex-end;\n      }\n\n      .select-opt {\n        padding: 6px 10px !important;\n        border-radius: 10px !important;\n        font-size: 0.7rem !important;\n        border: 1px solid rgba(255, 255, 255, 0.08);\n        background: rgba(255, 255, 255, 0.06) !important;\n      }\n\n      .select-opt.active {\n        box-shadow: 0 2px 8px rgba(3, 169, 244, 0.35);\n      }\n\n      .number-control {\n        gap: 8px !important;\n        background: rgba(255, 255, 255, 0.06);\n        border-radius: 12px;\n        padding: 4px 6px;\n        border: 1px solid rgba(255, 255, 255, 0.08);\n      }\n\n      .number-control button {\n        width: 32px !important;\n        height: 32px !important;\n        background: rgba(255, 255, 255, 0.08) !important;\n      }\n\n      .number-control span {\n        min-width: 36px !important;\n        font-size: 0.95rem;\n        font-weight: 700;\n      }\n\n      .action-btn {\n        width: 38px !important;\n        height: 38px !important;\n        border-radius: 12px !important;\n        padding: 0 !important;\n      }\n\n      button:disabled,\n      ha-switch[disabled] {\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n\n      @keyframes fadeIn {\n        from { opacity: 0; }\n        to { opacity: 1; }\n      }\n      @keyframes slideUp {\n        from { transform: translateY(100%); }\n        to { transform: translateY(0); }\n      }\n      ha-switch {\n        --mdc-theme-secondary: var(--accent-color, #03a9f4);\n      }\n      ha-icon {\n        color: var(--primary-text-color, #fff);\n      }\n";return function(e=!1){const z=e?1e4:1e3;return css.replace("z-index: 9999 !important","z-index: "+z+" !important")}})()}if(!window.__udcPopupStyleEl){window.__udcPopupStyleEl=document.createElement("style"),window.__udcPopupStyleEl.id="udc-popup-styles",document.head.appendChild(window.__udcPopupStyleEl)}window.__udcPopupStyleEl.textContent=window.__udcPopupCssFn(e),document.body.appendChild(this._popupPortal)}}_isInBubbleCardPopup(){let e=this;for(;e&&e.parentNode;){if(e=e.parentNode,e.host&&(e=e.host),e.classList){if(Array.from(e.classList).some(e=>e.includes("bubble")||e.includes("popup-container")))return!0}if("BUBBLE-CARD"===e.tagName||"BUBBLE-POP-UP"===e.tagName)return!0}return!1}_removePopupPortal(){this._unbindPopupSheetGestures&&this._unbindPopupSheetGestures(),this._lockPopupScroll(!1),this._popupPortal&&this._popupPortal.parentNode&&(this._popupPortal.parentNode.removeChild(this._popupPortal),this._popupPortal=null)}async _loadTranslations(){const e=this.config?.language||this.hass?.language||"en",t={"zh-Hant":"zh-TW"}[e]||e;if(this._translations=ie[t]||ie[e]||ie.en,"auto"!==e)try{const i=te();let a=await fetch(`${i}${e}.json`);if(a.ok||e===t||(a=await fetch(`${i}${t}.json`)),a.ok){const e=await a.json();this._translations={...this._translations,...e}}}catch(e){}}_t(e){return this._translations[e]||ie.en[e]||e}static getConfigElement(){return document.createElement("universal-device-card-editor")}static getStubConfig(){return{entity:"",layout:"standard",language:"auto",disable_popup:!1,show_buttons:[],animations:!1,performance_mode:!1}}_getDeviceType(){return this.config.entity.split(".")[0]}_shouldFilterEntity(e){const t=this.config.popup_filters||{},i=e.entity_id,a=i.split(".")[0];if(t.exclude_domains&&t.exclude_domains.includes(a))return!0;if(t.include_domains&&!t.include_domains.includes(a))return!0;if(t.exclude_entities&&t.exclude_entities.includes(i))return!0;if(t.include_entities&&!t.include_entities.includes(i))return!0;if("sensor"===a&&t.exclude_sensor_classes){const i=e.attributes.device_class;if(i&&t.exclude_sensor_classes.includes(i))return!0}if("sensor"===a&&t.include_sensor_classes){const i=e.attributes.device_class;if(!i||!t.include_sensor_classes.includes(i))return!0}return!1}_getStateColor(){const e=this.config.entity,t=this.hass.states[e];if(!t)return"var(--ha-card-background)";const i=e+"|"+t.state;if(this._stateColorKey===i)return this._stateColorCached;const a=le(this._getDeviceType(),t.state);return this._stateColorKey=i,this._stateColorCached=a,a}_buildDeviceEntityIndex(){if(this._deviceEntityIndexHass===this.hass&&this._deviceEntityIndex)return;const e=new Map;for(const[t,i]of Object.entries(this.hass.entities||{})){const a=i.device_id;a&&(e.has(a)||e.set(a,[]),e.get(a).push(t))}this._deviceEntityIndex=e,this._deviceEntityIndexHass=this.hass}_getRelatedEntities(){if(!0===this.config.disable_popup)return[];const e=this.hass.entities[this.config.entity];if(!e)return[];const t=e.device_id;if(this._relatedEntitiesCache&&this._relatedEntitiesDeviceId===t)return this._relatedEntitiesCache;this._buildDeviceEntityIndex();const i=(this._deviceEntityIndex.get(t)||[]).map(e=>this.hass.states[e]).filter(e=>e&&e.entity_id!==this.config.entity).filter(e=>!this._shouldFilterEntity(e));return this._relatedEntitiesCache=i,this._relatedEntitiesDeviceId=t,i}_isEntityAvailable(e){return"unavailable"!==e.state&&"unknown"!==e.state}_getMainButtons(){return this.config.show_buttons&&Array.isArray(this.config.show_buttons)?this.config.show_buttons.map(e=>this.hass.states[e]).filter(e=>void 0!==e):[]}_ensureServices(){const e=this.hass,t=this.config?.entity;if(!e||!t){this._services=null;this._servicesHass=null;this._servicesEntity=null;return}if(this._services&&this._servicesHass===e&&this._servicesEntity===t)return;this._servicesHass=e;this._servicesEntity=t;this._services=function(e,t){if(!e||!t)return null;const i=t;return{callService(t,a,s={}){e.callService(t,a,{entity_id:i,...s})},toggle(t=i){e.callService("homeassistant","toggle",{entity_id:t})},setSelect(t,i){e.callService("select","select_option",{entity_id:t,option:i})},adjustNumber(t,i){const a=e.states[t];if(!a)return;const s=parseFloat(a.state),n=a.attributes.step||1,r=a.attributes.min,o=a.attributes.max;let c=s+i*n;void 0!==r&&(c=Math.max(r,c)),void 0!==o&&(c=Math.min(o,c));const l="number"===t.split(".")[0]?"number":"input_number";e.callService(l,"set_value",{entity_id:t,value:c})},pressButton(t){e.callService("button","press",{entity_id:t})},adjustTemp(t){const a=e.states[i].attributes.temperature+t;e.callService("climate","set_temperature",{entity_id:i,temperature:a})},setClimateMode(t){e.callService("climate","set_hvac_mode",{entity_id:i,hvac_mode:t})},setFanMode(t){e.callService("climate","set_fan_mode",{entity_id:i,fan_mode:t})},setBrightness(t){const a=Math.round(t/100*255);e.callService("light","turn_on",{entity_id:i,brightness:a})},setFanSpeed(t){e.callService("fan","set_percentage",{entity_id:i,percentage:parseInt(t)})},setCoverPosition(t){e.callService("cover","set_cover_position",{entity_id:i,position:parseInt(t)})},setCoverTiltPosition(t){e.callService("cover","set_cover_tilt_position",{entity_id:i,tilt_position:parseInt(t)})},setVolume(t){e.callService("media_player","volume_set",{entity_id:i,volume_level:t/100})},setFanPresetMode(t){e.callService("fan","set_preset_mode",{entity_id:i,preset_mode:t})},setWaterHeaterTemp(t){e.callService("water_heater","set_temperature",{entity_id:i,temperature:t})},adjustWaterTemp(t){const a=e.states[i].attributes.temperature+t;e.callService("water_heater","set_temperature",{entity_id:i,temperature:a})}}}(e,t)}_animationsDisabled(){return!1===this.config?.animations||!0===this.config?.performance_mode}static getCardSize(e,t){const i=t?.layout||"standard";return"bar"===i?1:"mini"===i?2:3}_invalidateRelatedCache(){this._relatedEntitiesCache=null;this._relatedEntitiesDeviceId=null;this._deviceEntityIndex=null;this._deviceEntityIndexHass=null;this._stateColorKey="";this._stateColorCached=null}shouldUpdate(e){if(e.has("config")){this._invalidateRelatedCache();return!0}for(const t of["_showPopup","_showTextPopup","_popupText","_fanModeExpanded","_massQueueExpanded","_massLibraryExpanded","_massSearchExpanded","_massSearchQuery","_massQueueItems","_massLibraryItems","_massSearchResults","_massSearchLoading","_massQueueLoading","_massLibraryLoading","_translations"])if(e.has(t))return!0;if(!this.hass||!this.config?.entity)return!1;if(!e.has("hass"))return!1;const t=this.config.entity,i=e.get("hass");if(!i)return!0;if(i.states[t]!==this.hass.states[t])return!0;for(const a of this.config.show_buttons||[])if(i.states[a]!==this.hass.states[a])return!0;if(this._showPopup){const a=i.entities?.[t]?.device_id,s=this.hass.entities?.[t]?.device_id;if(a!==s)return this._invalidateRelatedCache(),!0;if(this._relatedEntitiesCache)for(const n of this._relatedEntitiesCache)if(i.states[n.entity_id]!==this.hass.states[n.entity_id])return this._invalidateRelatedCache(),this._popupDirty=!0,!0}if(this._massQueueExpanded||this._massLibraryExpanded||this._massSearchExpanded){if(i.states[t]!==this.hass.states[t])return!0;for(const a of["_massQueueItems","_massLibraryItems","_massSearchResults","_massSearchLoading","_massQueueLoading","_massLibraryLoading","_massSearchQuery"])if(e.has(a))return!0;return!1}return!1}_showTextDialog(e){this._popupText=e,this._showTextPopup=!0}render(){const e=this.hass.states[this.config.entity];if(!e)return N`<ha-card>${this._t("unavailable")}</ha-card>`;const t=this._getStateColor(),i=this._getDeviceType(),a=this.config.layout||"standard",s=!0!==this.config.disable_popup;return N`
      <ha-card class="main-container ${a}-layout" 
               style="background-color: ${t}">
        ${this._renderDeviceSpecificContent(e,i,a,s)}
        ${this._showTextPopup?this._renderTextPopup():""}
      </ha-card>
    `}updated(e){super.updated(e),(e.has("config")||(e.has("hass")&&this.config?.entity))&&this._ensureServices(),e.has("config")&&this.toggleAttribute("data-animations-off",this._animationsDisabled()),this._showPopup&&!this.config?.disable_popup&&(e.has("_showPopup")?(this._popupDirty=!1,this._updatePopupPortal()):this._popupDirty&&(this._renderPopupToPortal(),this._popupDirty=!1)),!this._showPopup&&e.has("_showPopup")&&this._updatePopupPortal()}_closePopup(){this._showPopup=!1,this._lockPopupScroll(!1),this._unbindPopupSheetGestures(),this.requestUpdate()}_lockPopupScroll(e){try{document.documentElement.style.overflow=e?"hidden":"",document.body.style.overflow=e?"hidden":""}catch(e){}}_bindPopupSheetGestures(e,t){if(!e||window.matchMedia&&!window.matchMedia("(max-width: 767px)").matches)return;this._unbindPopupSheetGestures();const i=t||e.querySelector(".popup-header")||e;let a=0,s=0,n=!1;const r=t=>{const i=t.touches?t.touches[0]:t;a=i.clientY,s=0,n=!0,e.classList.add("is-dragging")},o=t=>{if(!n)return;const i=t.touches?t.touches[0]:t;s=Math.max(0,i.clientY-a),e.style.transform="translateY("+s+"px)"},c=()=>{if(!n)return;n=!1,e.classList.remove("is-dragging"),s>100||s>e.offsetHeight*.25?(e.style.transform="translateY(110%)",setTimeout(()=>this._closePopup(),150)):(e.style.transform="",s=0)};i.addEventListener("touchstart",r,{passive:!0}),window.addEventListener("touchmove",o,{passive:!0}),window.addEventListener("touchend",c),window.addEventListener("touchcancel",c),this._popupGestureCleanup=()=>{i.removeEventListener("touchstart",r),window.removeEventListener("touchmove",o),window.removeEventListener("touchend",c),window.removeEventListener("touchcancel",c),e.style.transform="",e.classList.remove("is-dragging")},this._popupEscHandler||(this._popupEscHandler=e=>{"Escape"===e.key&&this._showPopup&&this._closePopup()},document.addEventListener("keydown",this._popupEscHandler))}_unbindPopupSheetGestures(){this._popupGestureCleanup&&(this._popupGestureCleanup(),this._popupGestureCleanup=null)}_stripDevicePrefix(e,t){if(!e)return"";if(!t)return e;const i=String(e),a=String(t).trim();if(!a)return i;if(i.startsWith(a)){const e=i.slice(a.length).replace(/^[\s\-–—_·:：]+/,"").trim();return e||i}return i}_getPopupDeviceTitle(){const e=this.hass?.states?.[this.config?.entity];return e?.attributes?.friendly_name||this._t("device")}_updatePopupPortal(){if(!0!==this.config?.disable_popup&&!this._popupPortal&&this._showPopup&&this._createPopupPortal(),this._popupPortal)if(this._showPopup&&!this.config.disable_popup)this._popupPortal.style.pointerEvents="auto",this._renderPopupToPortal();else{this._popupPortal.style.pointerEvents="none";const e=this._popupPortal.querySelector(".popup-overlay");e&&e.remove()}}_renderPopupToPortal(){const e=this._getRelatedEntities(),t=e.filter(e=>e.entity_id.startsWith("sensor")||e.entity_id.startsWith("binary_sensor")),i=e.filter(e=>!e.entity_id.startsWith("sensor")&&!e.entity_id.startsWith("binary_sensor")),a=this._getPopupDeviceTitle(),m=this.hass?.states?.[this.config?.entity],n=document.createElement("div");n.className="popup-overlay",n.addEventListener("click",e=>{e.target===n&&this._closePopup()});const r=document.createElement("div"),o=!0===this.config?.hide_popup_scrollbar,s=t.length&&i.length?" has-both":t.length?" has-sensors-only":" has-controls-only";r.className=(o?"popup-content hide-scrollbar":"popup-content")+s,r.dataset.sensors=String(t.length),r.dataset.controls=String(i.length),r.addEventListener("click",e=>e.stopPropagation());const c=document.createElement("div");c.className="popup-header",c.innerHTML='<div class="popup-drag-handle"></div><div class="popup-title-wrap"><div class="popup-title"></div><div class="popup-subtitle"></div></div><ha-icon class="close-btn" icon="mdi:close"></ha-icon>',c.querySelector(".popup-title").textContent=a;const d=c.querySelector(".popup-subtitle"),p=[];t.length&&p.push(t.length+" "+this._t("popup_sensors")),i.length&&p.push(i.length+" "+this._t("popup_controls")),d.textContent=p.join(" · ")||this.config?.entity||"",c.querySelector(".close-btn").addEventListener("click",()=>this._closePopup()),r.appendChild(c);if(m){const e=document.createElement("div"),t=this._isEntityAvailable(m),i="on"===m.state||"open"===m.state||"home"===m.state||"playing"===m.state||"heat"===m.state||"cool"===m.state||"auto"===m.state,s=!t?" is-unavailable":i?" is-on":" is-off";e.className="popup-status"+s,e.innerHTML='<div class="popup-status-dot"></div><div class="popup-status-meta"><div class="popup-status-label">'+(this._t("state")||"State")+'</div><div class="popup-status-value"></div></div><div class="popup-status-action"></div>';const n=e.querySelector(".popup-status-value"),o=m.attributes.unit_of_measurement;n.textContent=t?("on"===m.state||"off"===m.state?this._t(m.state)||m.state:m.state)+(o?" "+o:""):this._t("unavailable");const c=this.config.entity.split(".")[0],l=e.querySelector(".popup-status-action");if(t&&["switch","light","fan","input_boolean"].includes(c)){const e=document.createElement("ha-switch");e.checked="on"===m.state,e.addEventListener("change",()=>this._toggleEntity(this.config.entity)),l.appendChild(e)}r.appendChild(e)}const u=document.createElement("div");if(u.className="popup-body",t.length>0){const e=document.createElement("div");e.className="popup-section popup-section-sensors";const i=document.createElement("div");i.className="popup-section-title",i.textContent=this._t("popup_sensors"),e.appendChild(i);const n=document.createElement("div");n.className="sensor-grid",t.forEach(e=>{const t=this._isEntityAvailable(e),i=e.entity_id.startsWith("binary_sensor"),s="on"===e.state,o=document.createElement("div");o.className="sensor-card"+(t?"":" sensor-card-unavailable")+(i&&t?s?" is-on":" is-off":"");const c=this._stripDevicePrefix(e.attributes.friendly_name,a),l=t?(i?this._t(e.state)||e.state:e.state)+(e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:""):this._t("unavailable");o.innerHTML='<ha-icon icon="'+(e.attributes.icon||(i?"mdi:checkbox-blank-circle":"mdi:chart-line"))+'"></ha-icon><div class="sensor-card-body"><span class="sensor-label">'+(c||e.entity_id)+'</span><span class="sensor-value">'+l+"</span></div>",n.appendChild(o)}),e.appendChild(n),u.appendChild(e)}if(i.length>0){const e=document.createElement("div");e.className="popup-section popup-section-controls";const t=document.createElement("div");t.className="popup-section-title",t.textContent=this._t("popup_controls"),e.appendChild(t);const n=document.createElement("div");n.className="controls-group",i.forEach(e=>{n.appendChild(this._createControlRowElement(e,a))}),e.appendChild(n),u.appendChild(e)}else if(0===t.length){const e=document.createElement("div");e.className="no-controls",e.textContent=this._t("no_controls"),u.appendChild(e)}r.appendChild(u),n.appendChild(r),this._bindPopupSheetGestures(r,c),this._lockPopupScroll(!0);const l=this._popupPortal.querySelector(".popup-overlay");l&&l.remove(),this._popupPortal.appendChild(n)}_createControlRowElement(e,t){const i=e.entity_id.split(".")[0],a=this._isEntityAvailable(e),n=document.createElement("div");n.className="control-row"+(a?"":" control-row-unavailable");const r=document.createElement("div");r.className="control-row-icon",r.innerHTML='<ha-icon icon="'+(e.attributes.icon||ne(i))+'"></ha-icon>';const o=document.createElement("div");o.className="control-row-label",o.textContent=this._stripDevicePrefix(e.attributes.friendly_name,t);const c=document.createElement("div");return c.className="control-row-action",a?this._populateControlAction(c,e,i):c.innerHTML='<span class="state-text unavailable-text">'+e.state+"</span>",n.appendChild(r),n.appendChild(o),n.appendChild(c),n}_createControlCardElement(e){return this._createControlRowElement(e,this._getPopupDeviceTitle())}_populateControlAction(e,t,i){!function(e,t,i,a){const s=a.isEntityAvailable(t);switch(i){case"switch":case"input_boolean":{const i=document.createElement("ha-switch");i.checked="on"===t.state,i.disabled=!s,i.addEventListener("change",()=>s&&a.toggle(t.entity_id)),e.appendChild(i);break}case"select":case"input_select":{const i=document.createElement("div");i.className="select-grid",(t.attributes.options||[]).forEach(e=>{const n=document.createElement("div");n.className=`select-opt ${t.state===e?"active":""} ${s?"":"disabled"}`,n.textContent=e,n.addEventListener("click",()=>s&&a.setSelect(t.entity_id,e)),i.appendChild(n)}),e.appendChild(i);break}case"number":case"input_number":{const i=document.createElement("div");i.className="number-control",i.innerHTML=`\n        <button ${s?"":"disabled"}><ha-icon icon="mdi:minus"></ha-icon></button>\n        <span>${t.state}</span>\n        <button ${s?"":"disabled"}><ha-icon icon="mdi:plus"></ha-icon></button>\n      `,i.querySelectorAll("button")[0].addEventListener("click",()=>s&&a.adjustNumber(t.entity_id,-1)),i.querySelectorAll("button")[1].addEventListener("click",()=>s&&a.adjustNumber(t.entity_id,1)),e.appendChild(i);break}case"button":{const i=document.createElement("button");i.className="action-btn",i.disabled=!s,i.innerHTML='<ha-icon icon="mdi:gesture-tap"></ha-icon>',i.addEventListener("click",()=>s&&a.pressButton(t.entity_id)),e.appendChild(i);break}default:e.innerHTML=`<span class="state-text">${t.state}</span>`}}(e,t,i,{toggle:e=>this._toggleEntity(e),setSelect:(e,t)=>this._setSelect(e,t),adjustNumber:(e,t)=>this._adjustNumber(e,t),pressButton:e=>this._pressButton(e),isEntityAvailable:e=>this._isEntityAvailable(e)})}_renderTextPopup(){return N`
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
    `:""}_setFanPresetMode(e){this._services?.setFanPresetMode(e)}_getVacuumStateText(e){return this._t(e)||e}_toggleEntity(e=this.config.entity){this._services?.toggle(e)}_callService(e,t){this._services?.callService(e,t)}_isMusicAssistant(e){return e&&e.attributes&&null!=e.attributes.mass_player_type}_hasMassQueue(){return null!=this.hass?.services?.mass_queue?.get_queue_items}_normalizeMassQueueItem(e){return e?{queue_item_id:e.queue_item_id,name:e.media_title,media_title:e.media_title,media_artist:e.media_artist,media_album_name:e.media_album_name,media_image:e.media_image||e.image||e.media_image_url,local_image_encoded:e.local_image_encoded||e.local_image,media_content_id:e.media_content_id,uri:e.media_content_id}:null}async _fetchMassQueue(){if(!this.config?.entity)return;this._massQueueLoading=!0,this._massQueueItems=[];const e=this.config.entity;try{const t={entity:e,limit_before:5,limit_after:100};let i=null;if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const e=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"mass_queue",service:"get_queue_items",service_data:t,return_response:!0});i=e?.result?.response??e?.response??e?.result}if(null==i&&"function"==typeof this.hass?.callService){const e=await this.hass.callService("mass_queue","get_queue_items",t,{},!0);i=e?.response??e?.result??e}const a=[];if(i&&"object"==typeof i){const t=i[e]||(Array.isArray(i)?i:null);Array.isArray(t)&&t.forEach(e=>{const t=this._normalizeMassQueueItem(e);t&&a.push(t)})}this._massQueueItems=a}catch(e){this._massQueueItems=[]}this._massQueueLoading=!1,this.requestUpdate(["_massQueueItems","_massQueueLoading"])}_toggleMassQueueExpand(){this._massQueueExpanded=!this._massQueueExpanded,this._massQueueExpanded&&0===this._massQueueItems.length&&!this._massQueueLoading&&this._fetchMassQueue(),this.requestUpdate("_massQueueExpanded")}_playMassQueueItem(e){if(!this.hass||!this.config?.entity||!e)return;const t=this.config.entity,i="string"==typeof e?e:e.queue_item_id;if(i&&this.hass.services?.mass_queue?.play_queue_item)return void this.hass.callService("mass_queue","play_queue_item",{entity:t,queue_item_id:i});const a="string"==typeof e?null:e.uri||e.media_content_id||e.media_item?.uri;a&&this.hass.services?.music_assistant?.play_media&&this.hass.callService("music_assistant","play_media",{entity_id:t,media_id:[a],media_type:"track"})}_hasMusicAssistantLibrary(){return null!=this.hass?.services?.music_assistant?.get_library}async _getMassConfigEntryId(){if(this.config?.mass_config_entry_id)return this.config.mass_config_entry_id;const e=this.config?.entity,t=this.hass?.entities?.[e];if(t?.device_id){const e=this.hass?.devices?.[t.device_id],i=e?.config_entries?.[0];if(i)return i}if("function"==typeof this.hass?.callApi)try{const e=await this.hass.callApi("GET","config/config_entries/entry"),t=(Array.isArray(e)?e:[]).find(e=>"music_assistant"===e?.domain&&"loaded"===e?.state);if(t?.entry_id)return t.entry_id}catch(e){}return null}async _fetchMassLibrary(){if(this.config?.entity){this._massLibraryLoading=!0,this._massLibraryItems=[],this.requestUpdate("_massLibraryLoading"),this.requestUpdate("_massLibraryItems");try{const e=await this._getMassConfigEntryId();if(!e)return void(this._massLibraryItems=[]);const t=[],i=["artist","album","playlist","track"],a={config_entry_id:e,limit:20,order_by:"last_played_desc"},s=async e=>{const t={...a,media_type:e};if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const i=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"get_library",service_data:t,return_response:!0}),a=i?.result?.response??i?.response??i?.result,s=a?.items??(Array.isArray(a)?a:[]);return Array.isArray(s)?s.map(t=>({...t,media_type:e})):[]}if("function"==typeof this.hass?.callService){const i=await this.hass.callService("music_assistant","get_library",t,{},!0),a=i?.response??i?.result??i,s=a?.items??(Array.isArray(a)?a:[]);return Array.isArray(s)?s.map(t=>({...t,media_type:e})):[]}return[]};try{const e=await Promise.all(i.map(e=>s(e).catch(()=>[])));e.forEach(e=>t.push(...e))}catch(e){}this._massLibraryItems=t}catch(e){this._massLibraryItems=[]}finally{this._massLibraryLoading=!1,this.requestUpdate("_massLibraryItems"),this.requestUpdate("_massLibraryLoading")}}}_toggleMassLibraryExpand(){this._massLibraryExpanded=!this._massLibraryExpanded,this._massLibraryExpanded&&0===this._massLibraryItems.length&&!this._massLibraryLoading&&this._fetchMassLibrary(),this.requestUpdate("_massLibraryExpanded")}_playMassLibraryItem(e){this.hass&&this.config?.entity&&e?.uri&&this.hass.callService("music_assistant","play_media",{entity_id:this.config.entity,media_id:[e.uri],media_type:e.media_type||"track"})}_hasMusicAssistantSearch(){return null!=this.hass?.services?.music_assistant?.search}async _fetchMassSearch(e){const t=(e||"").trim();if(t&&this.config?.entity){this._massSearchLoading=!0,this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]},this.requestUpdate("_massSearchLoading"),this.requestUpdate("_massSearchResults");try{const e=await this._getMassConfigEntryId();if(!e)return void(this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]});const i={config_entry_id:e,name:t,limit:50};let a=null;if(this.hass?.connection&&"function"==typeof this.hass.connection.sendMessagePromise){const e=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"music_assistant",service:"search",service_data:i,return_response:!0});a=e?.result?.response??e?.response??e?.result}if(null==a&&"function"==typeof this.hass?.callService){const e=await this.hass.callService("music_assistant","search",i,{},!0);a=e?.response??e?.result??e}const s=Array.isArray(a?.artists)?a.artists:[],n=Array.isArray(a?.albums)?a.albums:[],r=Array.isArray(a?.tracks)?a.tracks:[],o=Array.isArray(a?.playlists)?a.playlists:Array.isArray(a?.playlist)?a.playlist:[],c=Array.isArray(a?.podcasts)?a.podcasts:Array.isArray(a?.podcast)?a.podcast:[];this._massSearchResults={artists:s,albums:n,tracks:r,playlists:o,podcasts:c},this._massSearchCache||(this._massSearchCache={}),this._massSearchCache[t]=this._massSearchResults,t&&this._addToSearchHistory(t)}catch(e){this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]}}finally{this._massSearchLoading=!1,this.requestUpdate("_massSearchResults"),this.requestUpdate("_massSearchLoading")}}}_toggleMassSearchExpand(){this._massSearchExpanded=!this._massSearchExpanded,this._massSearchExpanded||(this._massSearchQuery="",this._massSearchResults={artists:[],albums:[],tracks:[],playlists:[],podcasts:[]},this._massSearchSuggestionsOpen=!1),this.requestUpdate("_massSearchExpanded"),this.requestUpdate("_massSearchQuery"),this.requestUpdate("_massSearchResults"),this.requestUpdate("_massSearchSuggestionsOpen")}_onMassSearchInput(e){this._massSearchQuery=e?.target?.value??"",this.requestUpdate("_massSearchQuery"),this._massSearchDebounceTimer&&clearTimeout(this._massSearchDebounceTimer)}_loadSearchHistory(){try{const e=localStorage.getItem("universal-device-card-search-history"),t=e?JSON.parse(e):[];this._massSearchHistory=Array.isArray(t)?t.slice(0,20):[]}catch(e){this._massSearchHistory=[]}}_addToSearchHistory(e){const t=(e||"").trim();if(!t)return;const i=[...this._massSearchHistory],a=i.indexOf(t);a>=0&&i.splice(a,1),i.unshift(t),this._massSearchHistory=i.slice(0,20);try{localStorage.setItem("universal-device-card-search-history",JSON.stringify(this._massSearchHistory))}catch(e){}this.requestUpdate("_massSearchHistory")}_getFilteredSearchHistory(){const e=(this._massSearchQuery||"").trim().toLowerCase();return e?this._massSearchHistory.filter(t=>t.toLowerCase().includes(e)).slice(0,10):this._massSearchHistory.slice(0,10)}_openSearchSuggestions(){this._massSearchSuggestionsOpen=!0,this.requestUpdate("_massSearchSuggestionsOpen")}_closeSearchSuggestions(){this._massSearchSuggestionsOpen=!1,this.requestUpdate("_massSearchSuggestionsOpen")}_selectSearchHistoryItem(e){this._massSearchQuery=e,this._closeSearchSuggestions(),this.requestUpdate("_massSearchQuery"),this._runMassSearch()}_runMassSearch(){const e=(this._massSearchQuery||"").trim();if(!e)return;if(this._massSearchCache&&this._massSearchCache[e]){this._massSearchResults=this._massSearchCache[e];this.requestUpdate("_massSearchResults");return}this._fetchMassSearch(e)}_onMassScrollDragStart(e){if(e.target.closest(".mass-library-chip"))return;const t=e.currentTarget;if(!t)return;e.preventDefault(),this._massScrollDrag={el:t,startX:e.clientX,startScrollLeft:t.scrollLeft};const i=e=>{this._massScrollDrag&&(this._massScrollDrag.el.scrollLeft=this._massScrollDrag.startScrollLeft+this._massScrollDrag.startX-e.clientX)},a=()=>{this._massScrollDrag=null,document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",a)}_showMassPlaylistOrLibrary(e){return this._isMusicAssistant(e)&&(this._hasMassQueue()||this._hasMusicAssistantLibrary()||this._hasMusicAssistantSearch())}_setSelect(e,t){this._services?.setSelect(e,t)}_adjustNumber(e,t){this._services?.adjustNumber(e,t)}_pressButton(e){this._services?.pressButton(e)}_openMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this.config.entity}}))}_fireHaptic(e="medium"){"undefined"!=typeof navigator&&navigator.vibrate&&navigator.vibrate("heavy"===e?[20,40,20]:[15,30,15]),this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:{type:e}}))}_onIconPointerDown(e){this._iconLongPressFired=!1,this._iconLongPressTarget=e.currentTarget,this._iconLongPressTimer=setTimeout(()=>{this._iconLongPressTimer=null,this._iconLongPressFired=!0,this._fireHaptic("medium"),this._iconLongPressTarget&&(this._iconLongPressTarget.classList.add("icon-longpress-active"),setTimeout(()=>{this._iconLongPressTarget&&this._iconLongPressTarget.classList.remove("icon-longpress-active")},200)),this._openMoreInfo()},500)}_onIconPointerUp(){if(this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null,this._iconLongPressFired)return void(this._iconLongPressFired=!1);const e=Date.now();if(this._iconLastTapTime&&e-this._iconLastTapTime<400)return this._iconLastTapTime=0,this._fireHaptic("light"),void this._openMoreInfo();this._iconLastTapTime=e,this._toggleEntity()}_onIconPointerLeave(){this._iconLongPressTimer&&(clearTimeout(this._iconLongPressTimer),this._iconLongPressTimer=null),this._iconLongPressTarget=null}_renderHeaderIcon(e,t=!1){if(!e)return"";const i=this._getDeviceType(),a=e.attributes?.icon||ne(i),s=le(i,e.state),n="var(--ha-card-background)"!==s&&s.startsWith("rgba")?s.replace(/[\d.]+\)$/,"1)"):"";return N`
      <div class="header-icon ${t?"header-icon-mini":""} entity-icon-action"
           style="${n?`color: ${n}`:""}"
           @pointerdown="${e=>this._onIconPointerDown(e)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${e=>{e.preventDefault(),e.stopPropagation()}}"
           title="${this._t("device")}">
        <ha-icon icon="${a}"></ha-icon>
      </div>
    `}_renderBarIcon(e,t=""){if(!e)return"";const i=this._getDeviceType(),a=e.attributes?.icon||ne(i);return N`
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
    `:""}_sliderValueFromEvent(e,t){const i=t.getBoundingClientRect(),a=e.clientX-i.left;return Math.max(0,Math.min(100,Math.round(a/i.width*100)))}_applySliderValue(e,t){switch(e){case"light":this._setBrightness(t);break;case"cover":this._setCoverPosition(t);break;case"media":this._setVolume(t);break;case"fan":this._setFanSpeed(t)}}_handleSliderClick(e,t){const i=this._sliderValueFromEvent(e,e.currentTarget);this._applySliderValue(t,i)}_handleSliderPointerDown(e,t){if(0!==e.button&&"mousedown"===e.type)return;e.preventDefault();const i=e.currentTarget,a=s=>{this._applySliderValue(t,this._sliderValueFromEvent(s,i))},s=()=>{document.removeEventListener("pointermove",a),document.removeEventListener("pointerup",s),document.removeEventListener("pointercancel",s)};document.addEventListener("pointermove",a),document.addEventListener("pointerup",s),document.addEventListener("pointercancel",s),a(e)}_adjustTemp(e){this._services?.adjustTemp(e)}_setClimateMode(e){this._services?.setClimateMode(e)}_setFanMode(e){this._services?.setFanMode(e)}_setBrightness(e){this._services?.setBrightness(e)}_adjustBrightness(e){const t=this.hass.states[this.config.entity].attributes.brightness||0,i=Math.round(t/255*100),a=Math.max(0,Math.min(100,i+e));this._setBrightness(a)}_setFanSpeed(e){this._services?.setFanSpeed(e)}_adjustFanSpeed(e){const t=this.hass.states[this.config.entity].attributes.percentage||0,i=Math.max(0,Math.min(100,t+e));this._setFanSpeed(i)}_setCoverPosition(e){this._services?.setCoverPosition(e)}_adjustCoverPosition(e){const t=this.hass.states[this.config.entity].attributes.current_position||0,i=Math.max(0,Math.min(100,t+e));this._setCoverPosition(i)}_adjustCoverTiltPosition(e){const t=this.hass.states[this.config.entity].attributes.current_tilt_position??50,i=Math.max(0,Math.min(100,t+e));this._services?.setCoverTiltPosition(i)}_setVolume(e){this._services?.setVolume(e)}_adjustVolume(e){const t=100*(this.hass.states[this.config.entity].attributes.volume_level||0),i=Math.max(0,Math.min(100,t+e));this._setVolume(i)}_adjustWaterTemp(e){this._services?.adjustWaterTemp(e)}setConfig(e){if(!e.entity)throw new Error("?ｇ????entity");this.config=e}static get styles(){return[ae,se]}}),customElements.define("universal-device-card-editor",class extends ee{static get properties(){return{hass:{},config:{},_translations:{type:Object}}}constructor(){super(),this._translations={}}async connectedCallback(){super.connectedCallback(),await this._loadTranslations()}async _loadTranslations(){const e=this.hass?.language||"en",t={"zh-Hant":"zh-TW"}[e]||e;this._translations=ie[t]||ie[e]||ie.en;try{const i=te();let a=await fetch(`${i}${e}.json`);if(a.ok||e===t||(a=await fetch(`${i}${t}.json`)),a.ok){const e=await a.json();this._translations={...this._translations,...e}}}catch(e){}this.requestUpdate()}_t(e){return this._translations[e]||ie.en[e]||e}setConfig(e){this.config=e}configChanged(e){const t=new Event("config-changed",{bubbles:!0,composed:!0});t.detail={config:e},this.dispatchEvent(t)}_valueChanged(e){const t=e.target,i=t.configValue,a=void 0!==t.checked?t.checked:t.value;if(this.config[i]===a)return;const s={...this.config};""===a||"checkbox"===t.type&&!a?delete s[i]:s[i]=a,this.configChanged(s)}_showButtonsChanged(e){const t=e.target.value,i={...this.config};""===t?delete i.show_buttons:i.show_buttons=t.split(",").map(e=>e.trim()).filter(e=>e),this.configChanged(i)}_filterChanged(e){const t=e.target,i=t.getAttribute("filter-type"),a=t.value,s={...this.config};s.popup_filters||(s.popup_filters={}),""===a?delete s.popup_filters[i]:s.popup_filters[i]=a.split(",").map(e=>e.trim()).filter(e=>e),this.configChanged(s)}render(){if(!this.hass||!this.config)return N``;const e=Object.keys(this.hass.states).filter(e=>{const t=e.split(".")[0];return["climate","light","fan","cover","humidifier","media_player","vacuum","water_heater"].includes(t)}),t=this.config.popup_filters||{};return N`
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
          <label class="checkbox-label">
            <input
              type="checkbox"
              .checked="${this.config.animations !== false}"
              .configValue="${"animations"}"
              @change="${this._valueChanged}">
            <span>${this._t("editor_animations")}</span>
          </label>
        </div>

        <div class="option">
          <label class="checkbox-label">
            <input
              type="checkbox"
              .checked="${this.config.performance_mode || false}"
              .configValue="${"performance_mode"}"
              @change="${this._valueChanged}">
            <span>${this._t("editor_performance_mode")}</span>
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
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"universal-device-card",name:"Universal Device Card",description:"通用設備卡片 - 支援 Climate、Light、Fan、Cover 等多種設備類型",preview:!0,documentationURL:"https://github.com/n71154plus/universal-device-card"}),console.info("%c UNIVERSAL-DEVICE-CARD %c v2.6.4 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");
