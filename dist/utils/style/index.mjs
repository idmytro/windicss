function _nullishCoalesce$2(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }


function toArray(v) {
  if (Array.isArray(v))
    return v;
  return [v];
}

function hash(str) {
  str = str.replace(/\r/g, '');
  let hash = 5381;
  let i = str.length;

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
  return (hash >>> 0).toString(36);
}

function indent(code, tab = 2) {
  const spaces = Array(tab).fill(' ').join('');
  return code
    .split('\n')
    .map((line) => spaces + line)
    .join('\n');
}

function wrapit(
  code,
  start = '{',
  end = '}',
  tab = 2,
  minify = false
) {
  if (minify) return `${start}${code}${end}`;
  return `${start}\n${indent(code, tab)}\n${end}`;
}

function camelToDash(str) {
  // Use exact the same regex as Post CSS
  return str.replace(/([A-Z])/g, '-$1').replace(/^ms-/, '-ms-').toLowerCase();
}

function searchFrom(
  text,
  target,
  startIndex = 0,
  endIndex
) {
  // search from partial of string
  const subText = text.substring(startIndex, endIndex);
  const relativeIndex = subText.search(target);
  return relativeIndex === -1 ? -1 : startIndex + relativeIndex;
}

function connectList(a, b, append = true) {
  return append ? [...(_nullishCoalesce$2(a, () => ( []))), ...(_nullishCoalesce$2(b, () => ( [])))] : [...(_nullishCoalesce$2(b, () => ( []))), ...(_nullishCoalesce$2(a, () => ( [])))];
}

function deepCopy(source) {
  return Array.isArray(source)
    ? (source ).map((item) => deepCopy(item))
    : source instanceof Date
      ? new Date(source.getTime())
      : source && typeof source === 'object'
        ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
          const descriptor = Object.getOwnPropertyDescriptor(source, prop);
          if (descriptor) {
            Object.defineProperty(o, prop, descriptor);
            if (source && typeof source === 'object') {
              o[prop] = deepCopy(
                ((source ) )[prop]
              );
            }
          }
          return o;
        }, Object.create(Object.getPrototypeOf(source)))
        : (source );
}

function isTagName(name) {
  return ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embd', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'].includes(name);
}

function searchPropEnd(text, startIndex = 0) {
  let index = startIndex;
  let output = -1;
  let openSingleQuote = false;
  let openDoubleQuote = false;
  let openBracket = false;
  let isEscaped = false;
  while (index < text.length) {
    switch (text.charAt(index)) {
    case '\\':
      isEscaped = !isEscaped;
      break;
    case '\'':
      if (!openDoubleQuote && !openBracket && !isEscaped) openSingleQuote = !openSingleQuote;
      isEscaped = false;
      break;
    case '"':
      if (!openSingleQuote && !openBracket && !isEscaped) openDoubleQuote = !openDoubleQuote;
      isEscaped = false;
      break;
    case '(':
      if (!openBracket && !openSingleQuote && !openDoubleQuote && !isEscaped) openBracket = true;
      isEscaped = false;
      break;
    case ')':
      if (openBracket && !isEscaped) openBracket = false;
      isEscaped = false;
      break;
    case ';':
      if (!isEscaped && !openSingleQuote && !openDoubleQuote && !openBracket) output = index;
      isEscaped = false;
      break;
    default:
      isEscaped = false;
      break;
    }
    if (output !== -1) break;
    index++;
  }
  return output;
}

function _nullishCoalesce$1(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$3(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }














class Property {
  __init() {this.meta = { type: 'utilities', group: 'plugin', order: 0, offset: 0, corePlugin: false };}
  
  
  
  

  constructor(
    name,
    value,
    comment,
    important = false
  ) {Property.prototype.__init.call(this);
    this.name = name;
    this.value = value;
    this.comment = comment;
    this.important = important;
  }

   static _singleParse(
    css
  ) {
    css = css.trim();
    if (!css) return;
    if (css.charAt(0) === '@') return InlineAtRule.parse(css);
    const split = css.search(':');
    const end = searchPropEnd(css);
    if (split === -1) return;
    let important = false;
    let prop = css.substring(split + 1, end === -1 ? undefined : end).trim();
    if (/!important;?$/.test(prop)) {
      important = true;
      prop = prop.replace(/!important/, '').trimRight();
    }
    return new Property(
      css.substring(0, split).trim(),
      prop,
      undefined,
      important
    );
  }

  static parse(
    css
  ) {
    if (!/;\s*$/.test(css)) css += ';'; // Fix for the situation where the last semicolon is omitted
    const properties = [];
    let index = 0;
    let end = searchPropEnd(css, index);
    while (end !== -1) {
      const parsed = this._singleParse(css.substring(searchFrom(css, /\S/, index), end + 1));
      if (parsed) properties.push(parsed);
      index = end + 1;
      end = searchPropEnd(css, index);
    }
    const count = properties.length;
    if (count > 1) return properties;
    if (count === 1) return properties[0];
  }

  clone() {
    return deepCopy(this);
  }

  toStyle(selector) {
    const style = new Style(selector, this, this.important);
    style.meta = this.meta;
    return style;
  }

  build(minify = false) {
    const createProperty = (name, value) => {
      if (minify) {
        return `${name}:${value}${this.important ? '!important' : ''};`;
      } else {
        const p = `${name}: ${value}${this.important ? ' !important' : ''};`;
        return this.comment ? p + ` /* ${this.comment} */` : p;
      }
    };
    if (!this.value) return '';
    return typeof this.name === 'string'
      ? createProperty(this.name, this.value)
      : this.name
        .map((i) => createProperty(i, this.value))
        .join(minify ? '' : '\n');
  }

  updateMeta(type, group, order, offset = 0, corePlugin = false) {
    this.meta = {
      type,
      group,
      order,
      offset,
      corePlugin,
    };
    return this;
  }
}

class InlineAtRule extends Property {
  
  constructor(name, value, important = false) {
    super(name, value, undefined, important);
    this.name = name;
  }
  static parse(css) {
    const matchName = css.match(/@[^\s;{}]+/);
    if (matchName) {
      const name = matchName[0].substring(1);
      let important = false;
      let expression =
        matchName.index !== undefined
          ? _optionalChain$3([css
, 'access', _ => _.substring, 'call', _2 => _2(matchName.index + name.length + 1)
, 'access', _3 => _3.match, 'call', _4 => _4(/(?:(['"]).*?\1|[^;])*/), 'optionalAccess', _5 => _5[0]
, 'access', _6 => _6.trim, 'call', _7 => _7()])
          : undefined;
      if (expression && /!important;?$/.test(expression)) {
        important = true;
        expression = expression.replace(/!important/, '').trimRight();
      }
      return new InlineAtRule(
        name,
        expression === '' ? undefined : expression,
        important
      );
    }
  }
  build() {
    return this.value
      ? `@${this.name} ${this.value}${this.important ? ' !important' : ''};`
      : `@${this.name}${this.important ? ' !important' : ''};`;
  }
}

class Style {
  __init2() {this.meta = { type: 'components', group: 'plugin', order: 0, offset: 0, corePlugin: false };}
  
  
  
  
  
  
  
  
  
  
  
  

  constructor(
    selector,
    property,
    important = false
  ) {Style.prototype.__init2.call(this);
    this.selector = selector;
    this.important = important;
    this.property = toArray(property || []);
  }

  get rule() {
    let selectors = (_nullishCoalesce$1(this.selector, () => ( ''))).trim().split(/\s*,\s*/g);
    this._parentSelectors && (selectors = selectors.map(i => `${_optionalChain$3([this, 'access', _8 => _8._parentSelectors, 'optionalAccess', _9 => _9.join, 'call', _10 => _10(' ')])} ${i}`));
    (_nullishCoalesce$1(this._wrapSelectors, () => ( []))).forEach((func) => (selectors = selectors.map(i => func(i))));
    this._pseudoClasses && (selectors = selectors.map(i => i + `:${_optionalChain$3([this, 'access', _11 => _11._pseudoClasses, 'optionalAccess', _12 => _12.join, 'call', _13 => _13(':')])}`));
    this._pseudoElements && (selectors = selectors.map(i => i + `::${_optionalChain$3([this, 'access', _14 => _14._pseudoElements, 'optionalAccess', _15 => _15.join, 'call', _16 => _16('::')])}`));
    this._brotherSelectors && (selectors = selectors.map(i => i + `.${_optionalChain$3([this, 'access', _17 => _17._brotherSelectors, 'optionalAccess', _18 => _18.join, 'call', _19 => _19('.')])}`));
    this._childSelectors && (selectors = selectors.map(i => i + ` ${_optionalChain$3([this, 'access', _20 => _20._childSelectors, 'optionalAccess', _21 => _21.join, 'call', _22 => _22(' ')])}`));
    (_nullishCoalesce$1(this._wrapRules, () => ( []))).forEach((func) => (selectors = selectors.map(i => func(i))));
    return selectors.join(', ');
  }

  get pseudoClasses() {
    return this._pseudoClasses;
  }

  get pseudoElements() {
    return this._pseudoElements;
  }

  get parentSelectors() {
    return this._parentSelectors;
  }

  get childSelectors() {
    return this._childSelectors;
  }

  get brotherSelectors() {
    return this._brotherSelectors;
  }

  get wrapProperties() {
    return this._wrapProperties;
  }

  get wrapSelectors() {
    return this._wrapSelectors;
  }

  get wrapRules() {
    return this._wrapRules;
  }

  get simple() {
    // is this style only has property and no wrap?
    return !(this.atRules || this._pseudoClasses || this._pseudoElements || this._parentSelectors || this._childSelectors || this._brotherSelectors || this._wrapProperties || this._wrapSelectors || this._wrapRules);
  }

  get isAtrule() {
    return !(this.atRules === undefined || this.atRules.length === 0);
  }

  static generate(
    parent,
    property,
    root,
  ) {
    if (!root)
      root = _optionalChain$3([parent, 'optionalAccess', _23 => _23.startsWith, 'call', _24 => _24('@')])
        ? new Style().atRule(parent)
        : new Style(parent);

    let output = [];

    for (const [key, value] of Object.entries(_nullishCoalesce$1(property, () => ( {})))) {
      let propertyValue = value;
      if (Array.isArray(propertyValue) && propertyValue.every(e => typeof e === 'object')) {
        propertyValue = Object.assign({}, ...propertyValue);
      }
      if (typeof propertyValue === 'string') {
        root.add(new Property(camelToDash(key), propertyValue));
      } else if (Array.isArray(propertyValue)) {
        propertyValue.map(i => _optionalChain$3([root, 'optionalAccess', _25 => _25.add, 'call', _26 => _26(new Property(camelToDash(key), i))]));
      } else {
        const wrap = deepCopy(root);
        wrap.property = [];
        let child;
        if (key.startsWith('@')) {
          child = wrap.atRule(key, false);
        } else {
          if (wrap.selector === undefined) {
            wrap.selector = key;
            child = wrap;
          } else {
            if (/^[a-z]+$/.test(key) && !isTagName(key)) {
              wrap.wrapProperty(property => `${key}-${property}`);
              child = wrap;
            } else {
              const _hKey = (selector, key) => (/&/.test(key) ? key : `& ${key}`).replace('&', selector);
              wrap.wrapSelector((selector) =>
                selector
                  .trim()
                  .split(/\s*,\s*/g)
                  .map((s) =>
                    key
                      .split(/\s*,\s*/g)
                      .map((i) => _hKey(s, i))
                      .join(', ')
                  )
                  .join(', ')
              );
              child = wrap;
            }
          }
        }
        output = output.concat(Style.generate(key.startsWith('@') ? undefined : key, propertyValue, child));
      }
    }
    if (root.property.length > 0) output.unshift(root);
    return output;
  }

  atRule(atrule, append = true) {
    if (!atrule) return this;
    if (this.atRules) {
      append ? this.atRules.push(atrule) : this.atRules.unshift(atrule);
    } else {
      this.atRules = [atrule];
    }
    return this;
  }

  pseudoClass(string) {
    if (this._pseudoClasses) {
      this._pseudoClasses.push(string);
    } else {
      this._pseudoClasses = [string];
    }
    return this;
  }

  pseudoElement(string) {
    if (this._pseudoElements) {
      this._pseudoElements.push(string);
    } else {
      this._pseudoElements = [string];
    }
    return this;
  }

  brother(string) {
    if (this._brotherSelectors) {
      this._brotherSelectors.push(string);
    } else {
      this._brotherSelectors = [string];
    }
    return this;
  }

  parent(string) {
    if (this._parentSelectors) {
      this._parentSelectors.push(string);
    } else {
      this._parentSelectors = [string];
    }
    return this;
  }

  child(string) {
    if (this._childSelectors) {
      this._childSelectors.push(string);
    } else {
      this._childSelectors = [string];
    }
    return this;
  }

  wrapProperty(func) {
    if (this._wrapProperties) {
      this._wrapProperties.push(func);
    } else {
      this._wrapProperties = [func];
    }
    return this;
  }

  wrapSelector(func) {
    if (this._wrapSelectors) {
      this._wrapSelectors.push(func);
    } else {
      this._wrapSelectors = [func];
    }
    return this;
  }

  wrapRule(func) {
    if (this._wrapRules) {
      this._wrapRules.push(func);
    } else {
      this._wrapRules = [func];
    }
    return this;
  }

  add(item) {
    item = toArray(item);
    if (this.important) item.forEach((i) => (i.important = true));
    this.property = [...this.property, ...item];
    return this;
  }

  extend(item, onlyProperty = false, append = true) {
    if (!item) return this;
    if (item.wrapProperties) {
      const props = [];
      item.property.forEach((p) => {
        const pc = new Property(p.name, p.value, p.comment);
        _optionalChain$3([item, 'access', _27 => _27.wrapProperties, 'optionalAccess', _28 => _28.forEach, 'call', _29 => _29((wrap) => {
          pc.name = Array.isArray(pc.name)
            ? pc.name.map((i) => wrap(i))
            : wrap(pc.name);
        })]);
        if (item.important) pc.important = true;
        props.push(pc);
      });
      this.property = connectList(this.property, props, append);
    } else {
      if (item.important) item.property.forEach((i) => (i.important = true));
      this.property = connectList(this.property, item.property, append);
    }
    if (onlyProperty) return this;
    item.selector && (this.selector = item.selector);
    this.meta = item.meta;
    item.atRules &&
      (this.atRules = connectList(item.atRules, this.atRules, append)); // atrule is build in reverse
    item._brotherSelectors &&
      (this._brotherSelectors = connectList(
        this._brotherSelectors,
        item._brotherSelectors,
        append
      ));
    item._childSelectors &&
      (this._childSelectors = connectList(
        this._childSelectors,
        item._childSelectors,
        append
      ));
    item._parentSelectors &&
      (this._parentSelectors = connectList(
        this._parentSelectors,
        item._parentSelectors,
        append
      ));
    item._pseudoClasses &&
      (this._pseudoClasses = connectList(
        this._pseudoClasses,
        item._pseudoClasses,
        append
      ));
    item._pseudoElements &&
      (this._pseudoElements = connectList(
        this._pseudoElements,
        item._pseudoElements,
        append
      ));
    item._wrapRules &&
      (this._wrapRules = connectList(this._wrapRules, item._wrapRules, append));
    item._wrapSelectors &&
      (this._wrapSelectors = connectList(
        this._wrapSelectors,
        item._wrapSelectors,
        append
      ));
    return this;
  }

  clean() {
    // remove duplicated property
    const property = [];
    const cache = [];
    this.property.forEach((i) => {
      const inline = i.build();
      if (!cache.includes(inline)) {
        cache.push(inline);
        property.push(i);
      }
    });
    this.property = property;
    return this;
  }

  flat() {
    const properties = [];
    this.property.forEach((p) => {
      if (Array.isArray(p.name)) {
        p.name.forEach((i) => {
          properties.push(new Property(i, p.value, p.comment));
        });
      } else {
        properties.push(p);
      }
    });
    this.property = properties;
    return this;
  }

  clone(selector, property) {
    const newStyle = deepCopy(this);
    if (selector) newStyle.selector = selector;
    if (property) newStyle.property = Array.isArray(property) ? property: [ property ];
    return newStyle;
  }

  sort() {
    // sort property
    this.property = this.property.sort((a, b) => {
      return `${a.name}`.substring(0, 2) > `${b.name}`.substring(0, 2) ? 1 : -1;
    });
    return this;
  }

  build(minify = false, prefixer = true) {
    let properties = this.property;
    if (!prefixer) properties = properties.filter(p => {
      if (p.value && /-(webkit|ms|moz|o)-/.test(p.value)) return false;
      if (Array.isArray(p.name)) {
        p.name = p.name.filter(i => !/^-(webkit|ms|moz|o)-/.test(i));
        return true;
      }
      return !/^-(webkit|ms|moz|o)-/.test(p.name);
    });
    let result = properties.map(p => {
      if (this._wrapProperties) {
        let name = p.name;
        this._wrapProperties.forEach(w => (name = Array.isArray(name) ? name.map(n => w(n)) : w(name)));
        return new Property(name, p.value, p.comment, this.important ? true : p.important).build(minify);
      }
      return this.important ? new Property(p.name, p.value, p.comment, true).build(minify) : p.build(minify);
    }).join(minify ? '' : '\n');
    if (!this.selector && !this.atRules) return result.replace(/;}/g, '}');
    if (this.selector) result = (minify ? this.rule.replace(/,\s/g, ',') : this.rule + ' ') + wrapit(result, undefined, undefined, undefined, result !== '' ? minify : true);
    if (this.atRules) {
      for (const rule of this.atRules) {
        result = minify ? `${rule.replace(/\s/g, '')}${wrapit(result, undefined, undefined, undefined, minify)}` : `${rule} ${wrapit(result, undefined, undefined, undefined, result !== '' ? minify : true)}`;
      }
    }
    return minify ? result.replace(/;}/g, '}') : result;
  }

  updateMeta(type, group, order, offset = 0, corePlugin = false, respectSelector = false) {
    this.meta = {
      type,
      group,
      order,
      offset,
      corePlugin,
      respectSelector,
    };
    return this;
  }
}

class GlobalStyle extends Style {
  constructor(
    selector,
    property,
    important,
  ) {
    super(selector, property, important);
  }
}

class Keyframes extends Style {
  constructor(
    selector,
    property,
    important,
  ) {
    super(selector, property, important);
  }

  // root param only for consist with style
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static generate(name, children, root = undefined, prefixer = true) {
    const styles = [];
    const webkitStyles = [];
    for (const [key, value] of Object.entries(children)) {
      const style = new Keyframes(key).atRule(`@keyframes ${name}`);
      const webkitStyle = new Keyframes(key).atRule(
        `@-webkit-keyframes ${name}`
      );
      for (const [pkey, pvalue] of Object.entries(value)) {
        let prop = pkey;
        if (pkey === 'transform') {
          prop = prefixer ? ['-webkit-transform', 'transform'] : 'transform';
        } else if (
          ['animationTimingFunction', 'animation-timing-function'].includes(pkey)
        ) {
          prop = prefixer ? [
            '-webkit-animation-timing-function',
            'animation-timing-function',
          ] : 'animation-timing-function';
        }
        style.add(new Property(prop, pvalue));
        webkitStyle.add(new Property(prop, pvalue));
      }
      styles.push(style);
      if (prefixer) webkitStyles.push(webkitStyle);
    }
    return [...styles, ...webkitStyles];
  }
}

class Container extends Style {
  constructor(
    selector,
    property,
    important,
  ) {
    super(selector, property, important);
  }
}

const minMaxWidth = /(!?\(\s*min(-device-)?-width).+\(\s*max(-device)?-width/i;
const minWidth = /\(\s*min(-device)?-width/i;
const maxMinWidth = /(!?\(\s*max(-device)?-width).+\(\s*min(-device)?-width/i;
const maxWidth = /\(\s*max(-device)?-width/i;

const isMinWidth = _testQuery(minMaxWidth, maxMinWidth, minWidth);
const isMaxWidth = _testQuery(maxMinWidth, minMaxWidth, maxWidth);

const minMaxHeight = /(!?\(\s*min(-device)?-height).+\(\s*max(-device)?-height/i;
const minHeight = /\(\s*min(-device)?-height/i;
const maxMinHeight = /(!?\(\s*max(-device)?-height).+\(\s*min(-device)?-height/i;
const maxHeight = /\(\s*max(-device)?-height/i;

const isMinHeight = _testQuery(minMaxHeight, maxMinHeight, minHeight);
const isMaxHeight = _testQuery(maxMinHeight, minMaxHeight, maxHeight);

const isPrint = /print/i;
const isPrintOnly = /^print\$/i;
const isAtRule = /^\s*@/i;
const isMedia = /^\s*@media/i;

const maxValue = Number.MAX_VALUE;

function _getQueryLength(length) {
  const result = /(-?\d*\.?\d+)(ch|em|ex|px|rpx|rem)/.exec(length);

  if (result === null) {
    return maxValue;
  }

  const number = result[1];
  const unit = result[2];

  switch (unit) {
  case 'ch':
    return parseFloat(number) * 8.8984375;
  case 'em':
  case 'rem':
    return parseFloat(number) * 16;
  case 'ex':
    return parseFloat(number) * 8.296875;
  case 'px':
  case 'rpx':
    return parseFloat(number);
  }

  return +number;
}

function _testQuery(
  doubleTestTrue,
  doubleTestFalse,
  singleTest
) {
  return function (query) {
    if (doubleTestTrue.test(query)) {
      return true;
    } else if (doubleTestFalse.test(query)) {
      return false;
    }
    return singleTest.test(query);
  };
}

function _testAtRule(a, b) {
  const isMediaA = isMedia.test(a);
  const isMediaB = isMedia.test(b);

  if (isMediaA && isMediaB) return null;

  const isAtRuleA = isAtRule.test(a);
  const isAtRuleB = isAtRule.test(b);

  if (isAtRuleA) return 1;
  if (isAtRuleB) return -1;

  return 0; // don't sort selector name, may cause overwrite bug.
}

function _testIsPrint(a, b) {
  const isPrintA = isPrint.test(a);
  const isPrintOnlyA = isPrintOnly.test(a);

  const isPrintB = isPrint.test(b);
  const isPrintOnlyB = isPrintOnly.test(b);

  if (isPrintA && isPrintB) {
    if (!isPrintOnlyA && isPrintOnlyB) {
      return 1;
    }
    if (isPrintOnlyA && !isPrintOnlyB) {
      return -1;
    }
    return a.localeCompare(b);
  }
  if (isPrintA) {
    return 1;
  }
  if (isPrintB) {
    return -1;
  }

  return null;
}

function sortMediaQuery(a, b) {
  const testAtRule = _testAtRule(a, b);
  if (testAtRule !== null) return testAtRule;
  const testIsPrint = _testIsPrint(a, b);
  if (testIsPrint !== null) return testIsPrint;

  const minA = isMinWidth(a) || isMinHeight(a);
  const maxA = isMaxWidth(a) || isMaxHeight(a);

  const minB = isMinWidth(b) || isMinHeight(b);
  const maxB = isMaxWidth(b) || isMaxHeight(b);

  if (minA && maxB) {
    return -1;
  }
  if (maxA && minB) {
    return 1;
  }

  const lengthA = _getQueryLength(a);
  const lengthB = _getQueryLength(b);

  if (lengthA === maxValue && lengthB === maxValue) {
    return a.localeCompare(b);
  } else if (lengthA === maxValue) {
    return 1;
  } else if (lengthB === maxValue) {
    return -1;
  }

  if (lengthA > lengthB) {
    if (maxA) {
      return -1;
    }
    return 1;
  }

  if (lengthA < lengthB) {
    if (maxA) {
      return 1;
    }
    return -1;
  }

  return a.localeCompare(b);
}

function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$2(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

function getWeights(a) {
  const first = a.charAt(0);
  const second = a.charAt(1);
  if (first === ':' && second === ':') return 59; // ::moz ...
  if (first === '#') return 500; // #id ...
  if (first !== '.') return first.charCodeAt(0); // html, body ...
  return 499;
}

function sortMeta(a, b) {
  if (a.meta.type === 'base' && b.meta.type === 'base') return getWeights(_nullishCoalesce(a.selector, () => ( ''))) - getWeights(_nullishCoalesce(b.selector, () => ( '')));
  return sortMediaQuery(_optionalChain$2([a, 'access', _ => _.meta, 'access', _2 => _2.variants, 'optionalAccess', _3 => _3[0]]) || '', _optionalChain$2([b, 'access', _4 => _4.meta, 'access', _5 => _5.variants, 'optionalAccess', _6 => _6[0]]) || '') || (a.meta.order - b.meta.order) || (a.meta.offset - b.meta.offset) || +b.meta.corePlugin - +a.meta.corePlugin;
}

function _optionalChain$1(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

function _buildAtrule(atrule, children, minify = false, prefixer = true) {
  return `${ atrule }${ minify ? '' : ' ' }${ wrapit(_buildStyleList(children, minify, prefixer), undefined, undefined, undefined, minify) }`;
}

function _buildStyleList(styleList, minify = false, prefixer = true) {
  let currentAtrule;
  let currentStyle;
  let styleStack = [];
  const output = [];
  for (const style of styleList) {
    if (style.isAtrule) {
      if (currentStyle) {
        output.push(currentStyle.clean().build(minify, prefixer));
        currentStyle = undefined;
      }
      const newAtrule = (style.atRules ).pop();
      if (currentAtrule) {
        if (currentAtrule === newAtrule && newAtrule !== '@font-face') { // @font-face shouldn't been combined
          styleStack.push(style);
        } else {
          output.push(_buildAtrule(currentAtrule, styleStack, minify, prefixer));
          currentAtrule = newAtrule;
          styleStack = [ style ];
        }
      } else {
        currentAtrule = newAtrule;
        styleStack = [ style ];
      }
    } else {
      if (currentAtrule) {
        output.push(_buildAtrule(currentAtrule, styleStack, minify, prefixer));
        currentAtrule = undefined;
        styleStack = [];
      }
      if (currentStyle) {
        if (style.rule === currentStyle.rule) {
          if (style.important) style.property.forEach(p => p.important = true);
          if (style.wrapProperties) style.property.forEach(p => _optionalChain$1([style, 'access', _ => _.wrapProperties, 'optionalAccess', _2 => _2.forEach, 'call', _3 => _3(wrap => p.name = Array.isArray(p.name) ? p.name.map(i => wrap(i)) : wrap(p.name))]));
          currentStyle.add(style.property);
        } else {
          output.push(currentStyle.clean().build(minify, prefixer));
          currentStyle = style;
        }
      } else {
        currentStyle = style;
      }
    }
  }
  if (currentAtrule) output.push(_buildAtrule(currentAtrule, styleStack, minify, prefixer));
  if (currentStyle) output.push(currentStyle.clean().build(minify, prefixer));
  return output.join(minify ? '' : '\n');
}

function compileStyleSheet (styleList, minify = false, prefixer = true) {
  return _buildStyleList(deepCopy(styleList), minify, prefixer);
}

function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

class StyleSheet {
  
  __init() {this.prefixer = true;}

  constructor(children) {StyleSheet.prototype.__init.call(this);
    this.children = children || [];
  }

  add(item) {
    if (!item) return this;
    if (Array.isArray(item)) {
      this.children = [...this.children, ...item];
    } else {
      this.children.push(item);
    }
    return this;
  }

  extend(styleSheet, append = true, dedup = false) {
    if (styleSheet) {
      let extended = styleSheet.children;
      if (dedup) {
        const hashes = extended.map(i => hash(i.build()));
        extended = extended.filter(i => !hashes.includes(hash(i.build())));
      }
      this.prefixer = styleSheet.prefixer;
      this.children = append? [...this.children, ...extended]: [...extended, ...this.children];
    }
    return this;
  }

  combine() {
    const styleMap = {};
    this.children.forEach((style, index) => {
      const hashValue = hash(style.atRules + style.meta.type + style.rule);
      if (hashValue in styleMap) {
        if (_optionalChain([style, 'access', _ => _.atRules, 'optionalAccess', _2 => _2.includes, 'call', _3 => _3('@font-face')])) {
          // keeps multiple @font-face
          styleMap[hashValue + index] = style;
        } else {
          styleMap[hashValue] = styleMap[hashValue].extend(style, true);
        }
      } else {
        styleMap[hashValue] = style;
      }
    });
    this.children = Object.values(styleMap).map((i) => i.clean());
    return this;
  }

  layer(type) {
    const styleSheet = new StyleSheet(this.children.filter(i => i.meta.type === type));
    styleSheet.prefixer = this.prefixer;
    return styleSheet;
  }

  split() {
    return {
      base: this.layer('base'),
      components: this.layer('components'),
      utilities: this.layer('utilities'),
    };
  }

  clone() {
    return deepCopy(this);
  }

  sort() {
    this.children = this.children.sort(sortMeta);
    return this;
  }

  sortby(compareFn) {
    this.children = this.children.sort(compareFn);
    return this;
  }

  build(minify = false) {
    return compileStyleSheet(this.children, minify, this.prefixer);
  }
}

function linearGradient(value) {
  // Stupid method, will be changed in the next version...
  const map = {
    'linear-gradient(to top, var(--tw-gradient-stops))': [
      '-o-linear-gradient(bottom, var(--tw-gradient-stops))',
      '-webkit-gradient(linear, left bottom, left top, from(var(--tw-gradient-stops)))',
      'linear-gradient(to top, var(--tw-gradient-stops))',
    ],
    'linear-gradient(to top right, var(--tw-gradient-stops))': [
      '-o-linear-gradient(bottom left, var(--tw-gradient-stops))',
      '-webkit-gradient(linear, left bottom, right top, from(var(--tw-gradient-stops)))',
      'linear-gradient(to top right, var(--tw-gradient-stops))',
    ],
    'linear-gradient(to right, var(--tw-gradient-stops))': [
      '-o-linear-gradient(left, var(--tw-gradient-stops))',
      '-webkit-gradient(linear, left top, right top, from(var(--tw-gradient-stops)))',
      'linear-gradient(to right, var(--tw-gradient-stops))',
    ],
    'linear-gradient(to bottom right, var(--tw-gradient-stops))': [
      '-o-linear-gradient(top left, var(--tw-gradient-stops))',
      '-webkit-gradient(linear, left top, right bottom, from(var(--tw-gradient-stops)))',
      'linear-gradient(to bottom right, var(--tw-gradient-stops))',
    ],
    'linear-gradient(to bottom, var(--tw-gradient-stops))': [
      '-o-linear-gradient(top, var(--tw-gradient-stops))',
      '-webkit-gradient(linear, left top, left bottom, from(var(--tw-gradient-stops)))',
      'linear-gradient(to bottom, var(--tw-gradient-stops))',
    ],
    'linear-gradient(to bottom left, var(--tw-gradient-stops))': [
      '-o-linear-gradient(top right, var(--tw-gradient-stops))',
      '-webkit-gradient(linear, right top, left bottom, from(var(--tw-gradient-stops)))',
      'linear-gradient(to bottom left, var(--tw-gradient-stops))',
    ],
    'linear-gradient(to left, var(--tw-gradient-stops))': [
      '-o-linear-gradient(right, var(--tw-gradient-stops))',
      '-webkit-gradient(linear, right top, left top, from(var(--tw-gradient-stops)))',
      'linear-gradient(to left, var(--tw-gradient-stops))',
    ],
    'linear-gradient(to top left, var(--tw-gradient-stops))': [
      '-o-linear-gradient(bottom right, var(--tw-gradient-stops))',
      '-webkit-gradient(linear, right bottom, left top, from(var(--tw-gradient-stops)))',
      'linear-gradient(to top left, var(--tw-gradient-stops))',
    ],
  };
  if (Object.keys(map).includes(value)) return map[value];
  return value;
}

function minMaxContent(value) {
  if (value === 'min-content') {
    return ['-webkit-min-content', 'min-content'];
  } else if (value === 'max-content') {
    return ['-webkit-max-content', 'max-content'];
  }
  return value;
}

export { Container, GlobalStyle, InlineAtRule, Keyframes, Property, Style, StyleSheet, linearGradient, minMaxContent };
