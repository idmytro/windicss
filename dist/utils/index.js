'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _nullishCoalesce$1(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$2(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

class Console {
  static log(...message) {
    // eslint-disable-next-line no-console
    console.log(...message);
  }
  static error(...message) {
    // eslint-disable-next-line no-console
    console.error(...message);
  }
  static time(label) {
    // eslint-disable-next-line no-console
    console.time(label);
  }
  static timeEnd(label) {
    // eslint-disable-next-line no-console
    console.timeEnd(label);
  }
}



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

function type(val) {
  return val === null
    ? 'Null'
    : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1);
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

function isNumber(
  amount,
  start = -Infinity,
  end = Infinity,
  type = 'int'
) {
  const isInt = /^-?\d+$/.test(amount);
  if (type === 'int') {
    if (!isInt) return false;
  } else {
    const isFloat = /^-?\d+\.\d+$/.test(amount);
    if (!(isInt || isFloat)) return false;
  }
  const num = parseFloat(amount);
  return num >= start && num <= end;
}

function isFraction(amount) {
  return /^\d+\/\d+$/.test(amount);
}

function isSize(amount) {
  return /^-?(\d+(\.\d+)?)+(rem|em|px|rpx|vh|vw|ch|ex|cm|mm|in|pt|pc)$/.test(amount);
}

function isSpace(str) {
  return /^\s*$/.test(str);
}

function roundUp(num, precision = 0) {
  precision = Math.pow(10, precision);
  return Math.round(num * precision) / precision;
}

function fracToPercent(amount) {
  const matches = amount.match(/[^/]+/g);
  if (!matches || matches.length < 2) return;
  const a = +matches[0];
  const b = +matches[1];
  return roundUp((a / b) * 100, 6) + '%';
}

function hex2RGB(hex) {
  const RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i;
  const [, short, long] = String(hex).match(RGB_HEX) || [];

  if (long) {
    const value = Number.parseInt(long, 16);
    return [value >> 16, (value >> 8) & 0xff, value & 0xff];
  } else if (short) {
    return Array.from(short, (s) => Number.parseInt(s, 16)).map(
      (n) => (n << 4) | n
    );
  }
}

function camelToDash(str) {
  // Use exact the same regex as Post CSS
  return str.replace(/([A-Z])/g, '-$1').replace(/^ms-/, '-ms-').toLowerCase();
}

function dashToCamel(str) {
  if (!/-/.test(str)) return str;
  return str.toLowerCase().replace(/-(.)/g, (_, group) => group.toUpperCase());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj, key) {
  const topKey = key.match(/^[^.[]+/);
  if (!topKey) return;
  let topValue = obj[topKey[0]];
  if (!topValue) return;
  let index = topKey[0].length;
  while(index < key.length) {
    const square = key.slice(index, ).match(/\[[^\s\]]+?\]/);
    const dot = key.slice(index, ).match(/\.[^.[]+$|\.[^.[]+(?=\.)/);
    if (( !square && !dot ) || ( _optionalChain$2([square, 'optionalAccess', _2 => _2.index]) === undefined && _optionalChain$2([dot, 'optionalAccess', _3 => _3.index]) === undefined )) return topValue;
    if (typeof topValue !== 'object') return;
    if (dot && dot.index !== undefined && (_optionalChain$2([square, 'optionalAccess', _4 => _4.index]) === undefined || dot.index < square.index)) {
      const arg = dot[0].slice(1,);
      topValue = topValue[arg];
      index += dot.index + dot[0].length;
    } else if (square && square.index !== undefined) {
      const arg = square[0].slice(1, -1).trim().replace(/^['"]+|['"]+$/g, '');
      topValue = topValue[arg];
      index += square.index + square[0].length;
    }
  }
  return topValue;
}

function negateValue(value) {
  if (/(^0\w)|(^-)|(^0$)/.test(value)) return value;
  return '-' + value;
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
  return append ? [...(_nullishCoalesce$1(a, () => ( []))), ...(_nullishCoalesce$1(b, () => ( [])))] : [...(_nullishCoalesce$1(b, () => ( []))), ...(_nullishCoalesce$1(a, () => ( [])))];
}







function toType(
  value,
  type
) {
  switch (type) {
  case 'object':
    return value && typeof value === 'object' ? value : {};
  case 'string':
    if (typeof value === 'string') return value ;
    break;
  case 'number':
    if (typeof value === 'number') return value ;
    break;
  }
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

function flatColors(colors, head) {
  let flatten = {};
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string' || typeof value === 'function') {
      flatten[(head && key === 'DEFAULT') ? head : head ? `${head}-${key}`: key] = value;
    } else {
      flatten = { ...flatten, ...flatColors(value, head ? `${head}-${key}`: key) };
    }
  }
  return flatten;
}

function testRegexr(text, expressions) {
  for (const exp of expressions) {
    if (exp.test(text)) return true;
  }
  return false;
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

function searchNotEscape(text, chars = ['{']) {
  if (!Array.isArray(chars)) chars = [ chars ];
  let i = 0;
  while (i < text.length) {
    if (chars.includes(text.charAt(i)) && text.charAt(i - 1) !== '\\') {
      return i;
    }
    i ++;
  }
  return -1;
}

function splitSelectors(selectors) {
  const splitted = [];
  let parens = 0;
  let angulars = 0;
  let soFar = '';
  for (let i = 0, len = selectors.length; i < len; i++) {
    const char = selectors[i];
    if (char === '(') {
      parens += 1;
    } else if (char === ')') {
      parens -= 1;
    } else if (char === '[') {
      angulars += 1;
    } else if (char === ']') {
      angulars -= 1;
    } else if (char === ',') {
      if (!parens && !angulars) {
        splitted.push(soFar.trim());
        soFar = '';
        continue;
      }
    }
    soFar += char;
  }
  splitted.push(soFar.trim());
  return splitted;
}

function guessClassName(selector) {
  if (selector.indexOf(',') >= 0) {
    const splittedSelectors = splitSelectors(selector);
    if (splittedSelectors.length !== 1)
      return splittedSelectors.map(
        (i) => guessClassName(i) 
      );
  }
  // not classes, contains attribute selectors, nested selectors - treat as static
  if (selector.charAt(0) !== '.' || searchNotEscape(selector, ['[', '>', '+', '~']) >= 0 || selector.trim().indexOf(' ') >= 0 || searchNotEscape(selector.slice(1), '.') >=0)
    return { selector, isClass: false };
  const pseudo = searchNotEscape(selector, ':');
  const className = (_optionalChain$2([selector, 'access', _5 => _5.match, 'call', _6 => _6(/^\.([\w-]|(\\\W))+/), 'optionalAccess', _7 => _7[0], 'access', _8 => _8.slice, 'call', _9 => _9(1,)]) || '').replace(/\\/g, '');
  if (pseudo === -1) return { selector: className, isClass: true };
  return { selector: className, isClass: true, pseudo: selector.slice(pseudo,) };
}
/**
 * Increase string a value with unit
 *
 * @example '2px' + 1 = '3px'
 * @example '15em' + (-2) = '13em'
 */



function increaseWithUnit(target, delta) {
  if (typeof target === 'number')
    return target + delta;
  const value = _optionalChain$2([target, 'access', _10 => _10.match, 'call', _11 => _11(/^-?[0-9]+\.?[0-9]*/), 'optionalAccess', _12 => _12[0]]) || '';
  const unit = target.slice(value.length);
  const result = (parseFloat(value) + delta);
  if (Number.isNaN(result))
    return target;
  return result + unit;
}


function splitColorGroup(color) {
  const sep = color.indexOf('/');
  if (sep === -1) return [ color, undefined ];
  return [ color.slice(0, sep), color.slice(sep+1) ];
}

function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$1(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }














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
          ? _optionalChain$1([css
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
    let selectors = (_nullishCoalesce(this.selector, () => ( ''))).trim().split(/\s*,\s*/g);
    this._parentSelectors && (selectors = selectors.map(i => `${_optionalChain$1([this, 'access', _8 => _8._parentSelectors, 'optionalAccess', _9 => _9.join, 'call', _10 => _10(' ')])} ${i}`));
    (_nullishCoalesce(this._wrapSelectors, () => ( []))).forEach((func) => (selectors = selectors.map(i => func(i))));
    this._pseudoClasses && (selectors = selectors.map(i => i + `:${_optionalChain$1([this, 'access', _11 => _11._pseudoClasses, 'optionalAccess', _12 => _12.join, 'call', _13 => _13(':')])}`));
    this._pseudoElements && (selectors = selectors.map(i => i + `::${_optionalChain$1([this, 'access', _14 => _14._pseudoElements, 'optionalAccess', _15 => _15.join, 'call', _16 => _16('::')])}`));
    this._brotherSelectors && (selectors = selectors.map(i => i + `.${_optionalChain$1([this, 'access', _17 => _17._brotherSelectors, 'optionalAccess', _18 => _18.join, 'call', _19 => _19('.')])}`));
    this._childSelectors && (selectors = selectors.map(i => i + ` ${_optionalChain$1([this, 'access', _20 => _20._childSelectors, 'optionalAccess', _21 => _21.join, 'call', _22 => _22(' ')])}`));
    (_nullishCoalesce(this._wrapRules, () => ( []))).forEach((func) => (selectors = selectors.map(i => func(i))));
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
      root = _optionalChain$1([parent, 'optionalAccess', _23 => _23.startsWith, 'call', _24 => _24('@')])
        ? new Style().atRule(parent)
        : new Style(parent);

    let output = [];

    for (const [key, value] of Object.entries(_nullishCoalesce(property, () => ( {})))) {
      let propertyValue = value;
      if (Array.isArray(propertyValue) && propertyValue.every(e => typeof e === 'object')) {
        propertyValue = Object.assign({}, ...propertyValue);
      }
      if (typeof propertyValue === 'string') {
        root.add(new Property(camelToDash(key), propertyValue));
      } else if (Array.isArray(propertyValue)) {
        propertyValue.map(i => _optionalChain$1([root, 'optionalAccess', _25 => _25.add, 'call', _26 => _26(new Property(camelToDash(key), i))]));
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
        _optionalChain$1([item, 'access', _27 => _27.wrapProperties, 'optionalAccess', _28 => _28.forEach, 'call', _29 => _29((wrap) => {
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

function isString(value) {
  return typeof value === 'string';
}

function negative$1(scale

) {
  return Object.keys(scale)
    .filter((key) => scale[key] !== '0')
    .reduce(
      (negativeScale, key) => ({
        ...negativeScale,
        [`-${key}`]: negateValue(scale[key]),
      }),
      {}
    );
}

function breakpoints(
  screens = {}
) {
  return Object.keys(screens)
    .filter((key) => typeof screens[key] === 'string')
    .reduce(
      (breakpoints, key) => ({
        ...breakpoints,
        [`screen-${key}`]: screens[key],
      }),
      {}
    );
}

function generateFontSize(font) {
  if (typeof font === 'string') return [ new Property('font-size', font) ];
  const properties = [];
  if (font[0]) properties.push(new Property('font-size', font[0]));
  if (typeof font[1] === 'string') {
    properties.push(new Property('line-height', font[1]));
  } else if (font[1]){
    if (font[1].lineHeight) properties.push(new Property('line-height', font[1].lineHeight));
    if (font[1].letterSpacing) properties.push(new Property('letter-spacing', font[1].letterSpacing));
  }
  return properties;
}

function expandDirection(
  value,
  divide = false
) {
  const map = {
    '': ['*'],
    y: ['top', 'bottom'],
    x: ['left', 'right'],
    t: divide ? ['top-left', 'top-right'] : ['top'],
    r: divide ? ['top-right', 'bottom-right'] : ['right'],
    b: divide ? ['bottom-right', 'bottom-left'] : ['bottom'],
    l: divide ? ['top-left', 'bottom-left'] : ['left'],
    tl: ['top-left'],
    tr: ['top-right'],
    br: ['bottom-right'],
    bl: ['bottom-left'],
  };
  if (value in map) return map[value];
}

function generatePlaceholder(selector, property, prefixer = false)  {
  if (!prefixer) return [ new Style(selector, property).pseudoElement('placeholder') ];
  return [
    new Style(selector, property).pseudoElement('-webkit-input-placeholder'),
    new Style(selector, property).pseudoElement('-moz-placeholder'),
    new Style(selector, property).pseudoClass('-ms-input-placeholder'),
    new Style(selector, property).pseudoElement('-ms-input-placeholder'),
    new Style(selector, property).pseudoElement('placeholder'),
  ];
}



function toDarkStyle(style, mode) {
  if (!mode) return style;
  if (Array.isArray(style)) {
    if (mode === 'media') return style.map(i => new Style().atRule('@media (prefers-color-scheme: dark)').extend(i));
    return style.map(i => new Style().parent('.dark').extend(i));
  }
  if (mode === 'media') return new Style().atRule('@media (prefers-color-scheme: dark)').extend(style);
  return new Style().parent('.dark').extend(style);
}

var colorString$1 = {exports: {}};

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

var simpleSwizzle = {exports: {}};

var isArrayish$1 = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};

var isArrayish = isArrayish$1;

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle$1 = simpleSwizzle.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle$1.wrap = function (fn) {
	return function () {
		return fn(swizzle$1(arguments));
	};
};

/* MIT license */

var colorNames = colorName;
var swizzle = simpleSwizzle.exports;
var hasOwnProperty = Object.hasOwnProperty;

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (hasOwnProperty.call(colorNames, name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = colorString$1.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
	var keyword = /^(\w+)$/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = parseInt(hexAlpha, 16) / 255;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			if (match[5]) {
				rgb[3] = parseFloat(match[4]) * 0.01;
			} else {
				rgb[3] = parseFloat(match[4]);
			}
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			if (match[5]) {
				rgb[3] = parseFloat(match[4]) * 0.01;
			} else {
				rgb[3] = parseFloat(match[4]);
			}
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		if (!hasOwnProperty.call(colorNames, match[1])) {
			return null;
		}

		rgb = colorNames[match[1]];
		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = Math.round(num).toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}

var colorString = colorString$1.exports;

function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

function hsl2rgb(h, s, l) {
  s = s / 100,
  l = l / 100;
  if (h >= 360)
    h %= 360;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c/2;
  let  r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return [r, g, b];
}

function hwb2rgb(h, w, b) {
  const rgb = hsl2rgb(h, 100, 50);

  for (let i = 0; i < 3; ++i) {
    let c = rgb[i] / 255;

    c *= 1 - w/100 - b/100;
    c += w/100;

    rgb[i] = Math.round(c * 255);
  }

  return rgb;
}

function toRGBA(color) {
  if (/^hsla?/.test(color)) {
    const colorTuple = colorString.get.hsl(color);
    if (!colorTuple) return;
    return [...hsl2rgb(colorTuple[0], colorTuple[1], colorTuple[2]), colorTuple[3]];
  } else if (/^rgba?/.test(color)) {
    const colorTuple = colorString.get.rgb(color);
    if (!colorTuple) return;
    return colorTuple;
  } else if (color.startsWith('hwb')) {
    const colorTuple = colorString.get.hwb(color);
    if (!colorTuple) return;
    return [...hwb2rgb(colorTuple[0], colorTuple[1], colorTuple[2]), colorTuple[3]];
  }
  return _optionalChain([colorString, 'access', _ => _.get, 'call', _2 => _2(color), 'optionalAccess', _3 => _3.value]);
}

function toRGB(color) {
  return _optionalChain([toRGBA, 'call', _4 => _4(color), 'optionalAccess', _5 => _5.slice, 'call', _6 => _6(0, 3)]);
}

function toColor(colorStr)  {
  const rgba = toRGBA(colorStr);
  const color = rgba ? rgba.slice(0, 3).join(', ') : colorStr;
  const opacity = rgba ? rgba[3].toString() : '1';

  return {
    color,
    opacity,
  };
}

const utilities = {
  // Layout
  columns: [
    'columns-${static}',
    'columns-${float}',
    'columns-${size}',
    'columns-${int}xl',
  ],
  container: [
    'container',
  ],
  objectPosition: [
    'object-${static}',
  ],
  inset: [
    'inset-${static}',
    'inset-${float}',
    'inset-${fraction}',
    'inset-${size}',

    'inset-y-${static}',
    'inset-y-${float}',
    'inset-y-${fraction}',
    'inset-y-${size}',

    'inset-x-${static}',
    'inset-x-${float}',
    'inset-x-${fraction}',
    'inset-x-${size}',

    'top-${static}',
    'top-${float}',
    'top-${fraction}',
    'top-${size}',

    'right-${static}',
    'right-${float}',
    'right-${fraction}',
    'right-${size}',

    'bottom-${static}',
    'bottom-${float}',
    'bottom-${fraction}',
    'bottom-${size}',

    'left-${static}',
    'left-${float}',
    'left-${fraction}',
    'left-${size}',
  ],
  zIndex: [
    'z-${static}',
    'z-${int}',
  ],
  // Flexbox
  flex: [
    'flex-${static}',
  ],
  flexGrow: [
    'flex-grow-${static}',
  ],
  flexShrink: [
    'flex-shrink-${static}',
  ],
  order: [
    'order-${static}',
    'order-${int}',
  ],
  // Grid
  gridTemplateColumns: [
    'grid-cols-${static}',
    'grid-cols-${int}',
  ],
  gridTemplateRows: [
    'grid-rows-${static}',
    'grid-rows-${int}',
  ],
  gridColumn: [
    'col-${static}',
    'col-span-${int}',
  ],
  gridColumnEnd: [
    'col-end-${static}',
    'col-end-${int}',
  ],
  gridColumnStart: [
    'col-start-${static}',
    'col-start-${int}',
  ],
  gridRow: [
    'row-${static}',
    'row-span-${int}',
  ],
  gridRowEnd: [
    'row-end-${static}',
    'row-end-${int}',
  ],
  gridRowStart: [
    'row-start-${static}',
    'row-start-${int}',
  ],
  gap: [
    'gap-${static}',
    'gap-x-${static}',
    'gap-y-${static}',

    'gap-${float}',
    'gap-x-${float}',
    'gap-y-${float}',

    'gap-${size}',
    'gap-x-${size}',
    'gap-y-${size}',
  ],
  // Box Alignment
  // Spacing
  padding: [
    'p-${static}',
    'py-${static}',
    'px-${static}',
    'pt-${static}',
    'pr-${static}',
    'pb-${static}',
    'pl-${static}',

    'p-${float}',
    'py-${float}',
    'px-${float}',
    'pt-${float}',
    'pr-${float}',
    'pb-${float}',
    'pl-${float}',

    'p-${size}',
    'py-${size}',
    'px-${size}',
    'pt-${size}',
    'pr-${size}',
    'pb-${size}',
    'pl-${size}',
  ],
  margin: [
    'm-${static}',
    'my-${static}',
    'mx-${static}',
    'mt-${static}',
    'mr-${static}',
    'mb-${static}',
    'ml-${static}',

    'm-${float}',
    'my-${float}',
    'mx-${float}',
    'mt-${float}',
    'mr-${float}',
    'mb-${float}',
    'ml-${float}',

    'm-${size}',
    'my-${size}',
    'mx-${size}',
    'mt-${size}',
    'mr-${size}',
    'mb-${size}',
    'ml-${size}',
  ],
  space: [
    'space-y-${static}',
    'space-y-reverse',
    'space-x-${static}',
    'space-x-reverse',
    'space-y-${float}',
    'space-x-${float}',
  ],
  width: [
    'w-${static}',
    'w-${float}',
    'w-${fraction}',
    'w-${int}xl',
    'w-${size}',
  ],
  minWidth: [
    'min-w-${static}',
    'min-w-${float}',
    'min-w-${fraction}',
    'min-w-${int}xl',
    'min-w-${size}',
  ],
  maxWidth: [
    'max-w-${static}',
    'max-w-${float}',
    'max-w-${fraction}',
    'max-w-${int}xl',
    'max-w-${size}',
  ],
  height: [
    'h-${static}',
    'h-${float}',
    'h-${fraction}',
    'h-${int}xl',
    'h-${size}',
  ],
  minHeight: [
    'min-h-${static}',
    'min-h-${float}',
    'min-h-${fraction}',
    'min-h-${int}xl',
    'min-h-${size}',
  ],
  maxHeight: [
    'max-h-${static}',
    'max-h-${float}',
    'max-h-${fraction}',
    'max-h-${int}xl',
    'max-h-${size}',
  ],
  // Typography
  fontSize: [
    'text-${static}',
    'text-${int}xl',
  ],
  textOpacity: [
    'text-opacity-${static}',
    'text-opacity-${int<=100}',
  ],
  textColor: [
    'text-${color}',
  ],
  fontFamily: [
    'font-${static}',
  ],
  fontWeight: [
    'font-${static}',
    'font-${int}',
  ],
  letterSpacing: [
    'tracking-${static}',
    'tracking-${size}',
  ],
  lineHeight: [
    'leading-${static}',
    'leading-${int}',
    'leading-${size}',
  ],
  listStyleType: [
    'list-${static}',
  ],
  placeholderColor: [
    'placeholder-${color}',
  ],
  placeholderOpacity: [
    'placeholder-opacity-${static}',
    'placeholder-opacity-${int<=100}',
  ],
  // Backgrounds
  backgroundColor: [
    'bg-${color}',
  ],
  backgroundOpacity: [
    'bg-opacity-${static}',
    'bg-opacity-${int<=100}',
  ],
  backgroundPosition: [
    'bg-${static}',
  ],
  backgroundSize: [
    'bg-${static}',
  ],
  backgroundImage: [
    'bg-${static}',
  ],
  gradientColorStops: [
    'from-${color}',
    'via-${color}',
    'to-${color}',
  ],
  // Borders
  borderRadius: [
    'rounded-${static}',
    'rounded-t-${static}',
    'rounded-l-${static}',
    'rounded-r-${static}',
    'rounded-b-${static}',
    'rounded-tl-${static}',
    'rounded-tr-${static}',
    'rounded-br-${static}',
    'rounded-bl-${static}',

    'rounded-${int}xl',
    'rounded-${size}',
    'rounded-t-${int}xl',
    'rounded-t-${size}',
    'rounded-l-${int}xl',
    'rounded-l-${size}',
    'rounded-r-${int}xl',
    'rounded-r-${size}',
    'rounded-b-${int}xl',
    'rounded-b-${size}',
    'rounded-tl-${int}xl',
    'rounded-tl-${size}',
    'rounded-tr-${int}xl',
    'rounded-tr-${size}',
    'rounded-br-${int}xl',
    'rounded-br-${size}',
    'rounded-bl-${int}xl',
    'rounded-bl-${size}',
  ],
  borderWidth: [
    'border-${static}',
    'border-${int}',
    'border-${size}',
    'border-t-${int}',
    'border-t-${size}',
    'border-r-${int}',
    'border-r-${size}',
    'border-b-${int}',
    'border-b-${size}',
    'border-l-${int}',
    'border-l-${size}',
  ],
  borderColor: [
    'border-${color}',
  ],
  borderOpacity: [
    'border-opacity-${static}',
    'border-opacity-${int<=100}',
  ],
  divideWidth: [
    'divide-y-reverse',
    'divide-x-reverse',
    'divide-y-${int}',
    'divide-x-${int}',
  ],
  divideColor: [
    'divide-${color}',
  ],
  divideOpacity: [
    'divide-${static}',
    'divide-opacity-${int<=100}',
  ],
  ringOffsetWidth: [
    'ring-offset-${static}',
    'ring-offset-${int}',
  ],
  ringOffsetColor: [
    'ring-offset-${color}',
  ],
  ringWidth: [
    'ring-${static}',
    'ring-${int}',
  ],
  ringColor: [
    'ring-${color}',
  ],
  ringOpacity: [
    'ring-${static}',
    'ring-opacity-${int<=100}',
  ],
  // Effects
  boxShadow: [
    'shadow-${static}',
  ],
  opacity: [
    'opacity-${static}',
    'opacity-${int<=100}',
  ],
  transition: [
    'transition-${static}',
  ],
  transitionDuration: [
    'duration-${static}',
    'duration-${int}',
  ],
  transitionTimingFunction: [
    'ease-${static}',
  ],
  transitionDelay: [
    'delay-${static}',
    'delay-${int}',
  ],
  animation: [
    'animate-${static}',
  ],
  // Transforms
  transformOrigin: [
    'origin-${static}',
  ],
  scale: [
    'scale-${static}',
    'scale-${int}',
    'scale-x-${static}',
    'scale-x-${int}',
    'scale-y-${static}',
    'scale-y-${int}',
  ],
  rotate: [
    'rotate-${static}',
    'rotate-${float}',
  ],
  translate: [
    'translate-${static}',
    'translate-x-${static}',
    'translate-y-${static}',
    'translate-x-${float}',
    'translate-x-${fraction}',
    'translate-x-${size}',
    'translate-y-${float}',
    'translate-y-${fraction}',
    'translate-y-${size}',
  ],
  skew: [
    'skew-x-${static}',
    'skew-x-${float}',
    'skew-y-${static}',
    'skew-y-${float}',
  ],
  cursor: [
    'cursor-${static}',
  ],
  // Interactivity
  outline: [
    'outline-${static}',
  ],
  outlineColor: [
    'outline-${color}',
    'outline-solid-${color}',
    'outline-dotted-${color}',
  ],
  // SVG
  fill: [
    'fill-${color}',
  ],
  // Stroke
  stroke: [
    'stroke-${color}',
  ],
  strokeWidth: [
    'stroke-${int}',
  ],

  // Plugins
  typography: [
    'prose-sm',
    'prose',
    'prose-lg',
    'prose-xl',
    'prose-2xl',
    'prose-red',
    'prose-yellow',
    'prose-green',
    'prose-blue',
    'prose-indigo',
    'prose-purple',
    'prose-pink',
  ],
  aspectRatio: [
    'aspect-none',
    'aspect-auto',
    'aspect-square',
    'aspect-video',
    'aspect-w-${float}',
    'aspect-h-${float}',
    'aspect-${fraction}',
  ],
  lineClamp: [
    'line-clamp-none',
    'line-clamp-${int}',
  ],
  filter: [
    'filter-${static}',
  ],
  backdropFilter: [
    'backdrop-${static}',
  ],
  basis: [
    'basis-${static}',
    'basis-${float}',
    'basis-${size}',
    'basis-${fraction}',
  ],
  blur: [
    'blur-${static}',
    'blur-${float}',
    'blur-${size}',
  ],
  willChange: [
    'will-change-auto',
    'will-change-scroll',
    'will-change-contents',
    'will-change-transform',
  ],
  touchAction: [
    'touch-auto',
    'touch-none',
    'touch-pan-x',
    'touch-pan-left',
    'touch-pan-right',
    'touch-pan-y',
    'touch-pan-up',
    'touch-pan-down',
    'touch-pinch-zoom',
    'touch-manipulation',
  ],
  scrollBehavior: [
    'scroll-auto',
    'scroll-smooth',
  ],
  shadow: [
    'shadow-${static}',
  ],
};

const negative = {
  inset: true,
  zIndex: true,
  order: true,
  margin: true,
  space: true,
  letterSpacing: true,
  rotate: true,
  translate: true,
  skew: true,
};

function generateCompletions(processor) {
  const completions 



 = { static: [], color: [], dynamic: [] };
  const colors = flatColors(processor.theme('colors') );
  for (const [config, list] of Object.entries(utilities)) {
    list.forEach(utility => {
      const mark = utility.search(/\$/);
      if (mark === -1) {
        completions.static.push(utility);
      } else {
        const prefix = utility.slice(0, mark-1);
        const suffix = utility.slice(mark);
        switch(suffix) {
        case '${static}':
          completions.static = completions.static.concat(Object.keys(processor.theme(config, {}) ).map(i => i === 'DEFAULT' ? prefix : i.charAt(0) === '-' ? `-${prefix}${i}` : `${prefix}-${i}`));
          break;
        case '${color}':
          for (const key of Object.keys(flatColors(processor.theme(config, colors) ))) {
            if (key !== 'DEFAULT')
              completions.color.push(`${prefix}-${key}`);
          }
          break;
        default:
          completions.dynamic.push(utility);
          if (config in negative) completions.dynamic.push(`-${utility}`);
          break;
        }
      }
    });
  }
  return completions;
}

exports.Console = Console;
exports.breakpoints = breakpoints;
exports.camelToDash = camelToDash;
exports.connectList = connectList;
exports.dashToCamel = dashToCamel;
exports.deepCopy = deepCopy;
exports.expandDirection = expandDirection;
exports.flatColors = flatColors;
exports.fracToPercent = fracToPercent;
exports.generateCompletions = generateCompletions;
exports.generateFontSize = generateFontSize;
exports.generatePlaceholder = generatePlaceholder;
exports.getNestedValue = getNestedValue;
exports.guessClassName = guessClassName;
exports.hash = hash;
exports.hex2RGB = hex2RGB;
exports.hsl2rgb = hsl2rgb;
exports.hwb2rgb = hwb2rgb;
exports.increaseWithUnit = increaseWithUnit;
exports.indent = indent;
exports.isFraction = isFraction;
exports.isNumber = isNumber;
exports.isSize = isSize;
exports.isSpace = isSpace;
exports.isString = isString;
exports.isTagName = isTagName;
exports.negateValue = negateValue;
exports.negative = negative$1;
exports.roundUp = roundUp;
exports.searchFrom = searchFrom;
exports.searchNotEscape = searchNotEscape;
exports.searchPropEnd = searchPropEnd;
exports.splitColorGroup = splitColorGroup;
exports.splitSelectors = splitSelectors;
exports.testRegexr = testRegexr;
exports.toArray = toArray;
exports.toColor = toColor;
exports.toDarkStyle = toDarkStyle;
exports.toRGB = toRGB;
exports.toRGBA = toRGBA;
exports.toType = toType;
exports.type = type;
exports.wrapit = wrapit;
