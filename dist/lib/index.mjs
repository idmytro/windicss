function _nullishCoalesce$6(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$9(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

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
    if (( !square && !dot ) || ( _optionalChain$9([square, 'optionalAccess', _2 => _2.index]) === undefined && _optionalChain$9([dot, 'optionalAccess', _3 => _3.index]) === undefined )) return topValue;
    if (typeof topValue !== 'object') return;
    if (dot && dot.index !== undefined && (_optionalChain$9([square, 'optionalAccess', _4 => _4.index]) === undefined || dot.index < square.index)) {
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
  return append ? [...(_nullishCoalesce$6(a, () => ( []))), ...(_nullishCoalesce$6(b, () => ( [])))] : [...(_nullishCoalesce$6(b, () => ( []))), ...(_nullishCoalesce$6(a, () => ( [])))];
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
  const className = (_optionalChain$9([selector, 'access', _5 => _5.match, 'call', _6 => _6(/^\.([\w-]|(\\\W))+/), 'optionalAccess', _7 => _7[0], 'access', _8 => _8.slice, 'call', _9 => _9(1,)]) || '').replace(/\\/g, '');
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
  const value = _optionalChain$9([target, 'access', _10 => _10.match, 'call', _11 => _11(/^-?[0-9]+\.?[0-9]*/), 'optionalAccess', _12 => _12[0]]) || '';
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

function _nullishCoalesce$5(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$8(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }














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
          ? _optionalChain$8([css
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
    let selectors = (_nullishCoalesce$5(this.selector, () => ( ''))).trim().split(/\s*,\s*/g);
    this._parentSelectors && (selectors = selectors.map(i => `${_optionalChain$8([this, 'access', _8 => _8._parentSelectors, 'optionalAccess', _9 => _9.join, 'call', _10 => _10(' ')])} ${i}`));
    (_nullishCoalesce$5(this._wrapSelectors, () => ( []))).forEach((func) => (selectors = selectors.map(i => func(i))));
    this._pseudoClasses && (selectors = selectors.map(i => i + `:${_optionalChain$8([this, 'access', _11 => _11._pseudoClasses, 'optionalAccess', _12 => _12.join, 'call', _13 => _13(':')])}`));
    this._pseudoElements && (selectors = selectors.map(i => i + `::${_optionalChain$8([this, 'access', _14 => _14._pseudoElements, 'optionalAccess', _15 => _15.join, 'call', _16 => _16('::')])}`));
    this._brotherSelectors && (selectors = selectors.map(i => i + `.${_optionalChain$8([this, 'access', _17 => _17._brotherSelectors, 'optionalAccess', _18 => _18.join, 'call', _19 => _19('.')])}`));
    this._childSelectors && (selectors = selectors.map(i => i + ` ${_optionalChain$8([this, 'access', _20 => _20._childSelectors, 'optionalAccess', _21 => _21.join, 'call', _22 => _22(' ')])}`));
    (_nullishCoalesce$5(this._wrapRules, () => ( []))).forEach((func) => (selectors = selectors.map(i => func(i))));
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
      root = _optionalChain$8([parent, 'optionalAccess', _23 => _23.startsWith, 'call', _24 => _24('@')])
        ? new Style().atRule(parent)
        : new Style(parent);

    let output = [];

    for (const [key, value] of Object.entries(_nullishCoalesce$5(property, () => ( {})))) {
      let propertyValue = value;
      if (Array.isArray(propertyValue) && propertyValue.every(e => typeof e === 'object')) {
        propertyValue = Object.assign({}, ...propertyValue);
      }
      if (typeof propertyValue === 'string') {
        root.add(new Property(camelToDash(key), propertyValue));
      } else if (Array.isArray(propertyValue)) {
        propertyValue.map(i => _optionalChain$8([root, 'optionalAccess', _25 => _25.add, 'call', _26 => _26(new Property(camelToDash(key), i))]));
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
        _optionalChain$8([item, 'access', _27 => _27.wrapProperties, 'optionalAccess', _28 => _28.forEach, 'call', _29 => _29((wrap) => {
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

function _nullishCoalesce$4(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$7(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

function getWeights(a) {
  const first = a.charAt(0);
  const second = a.charAt(1);
  if (first === ':' && second === ':') return 59; // ::moz ...
  if (first === '#') return 500; // #id ...
  if (first !== '.') return first.charCodeAt(0); // html, body ...
  return 499;
}

function sortMeta(a, b) {
  if (a.meta.type === 'base' && b.meta.type === 'base') return getWeights(_nullishCoalesce$4(a.selector, () => ( ''))) - getWeights(_nullishCoalesce$4(b.selector, () => ( '')));
  return sortMediaQuery(_optionalChain$7([a, 'access', _ => _.meta, 'access', _2 => _2.variants, 'optionalAccess', _3 => _3[0]]) || '', _optionalChain$7([b, 'access', _4 => _4.meta, 'access', _5 => _5.variants, 'optionalAccess', _6 => _6[0]]) || '') || (a.meta.order - b.meta.order) || (a.meta.offset - b.meta.offset) || +b.meta.corePlugin - +a.meta.corePlugin;
}

function sortGroup(a, b) {
  return sortMediaQuery(_optionalChain$7([a, 'access', _7 => _7.meta, 'access', _8 => _8.variants, 'optionalAccess', _9 => _9[0]]) || '', _optionalChain$7([b, 'access', _10 => _10.meta, 'access', _11 => _11.variants, 'optionalAccess', _12 => _12[0]]) || '') || (a.meta.order - b.meta.order);
}

function _optionalChain$6(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

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
          if (style.wrapProperties) style.property.forEach(p => _optionalChain$6([style, 'access', _ => _.wrapProperties, 'optionalAccess', _2 => _2.forEach, 'call', _3 => _3(wrap => p.name = Array.isArray(p.name) ? p.name.map(i => wrap(i)) : wrap(p.name))]));
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

function _optionalChain$5(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

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
        if (_optionalChain$5([style, 'access', _ => _.atRules, 'optionalAccess', _2 => _2.includes, 'call', _3 => _3('@font-face')])) {
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

function isString(value) {
  return typeof value === 'string';
}

function negative(scale

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

function generateOrientations(orientations

) {
  const variants  = {};

  Object.entries(orientations).forEach(([name, orientation]) => {
    variants[name] = () => new Style().atRule(`@media (orientation: ${orientation})`);
  });

  return variants;
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

function _optionalChain$4(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

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
  return _optionalChain$4([colorString, 'access', _ => _.get, 'call', _2 => _2(color), 'optionalAccess', _3 => _3.value]);
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

function generateScreens(screens

) {
  const variants = {};

  const breakpoints = Object.entries(screens).sort(([, sizeA], [, sizeB]) =>
    sortWeight(sizeA) - sortWeight(sizeB)
  );

  breakpoints.forEach(([name, size], index) => {
    if (isString(size)) {
      const [, nextSize] = breakpoints[index + 1] || [];
      variants[name] = styleForBreakpoint({ min: size });
      variants[`<${name}`] = styleForBreakpoint({ max: increaseWithUnit(size, -0.1) });
      variants[`@${name}`] = styleForBreakpoint(
        nextSize ? { min: size, max: increaseWithUnit(nextSize , -0.1) } : { min: size }
      );
      variants[`-${name}`] = styleForBreakpoint({ max: size });
      variants[`+${name}`] = styleForBreakpoint(
        nextSize ? { min: size, max: nextSize  } : { min: size }
      );
    } else {
      variants[name] = styleForBreakpoint(size);
    }
  });

  return variants;
}

function styleForBreakpoint(rule) {
  const mediaConditions = 'raw' in rule ? rule.raw : [
    rule.min && `(min-width: ${rule.min})`,
    rule.max && `(max-width: ${rule.max})`,
  ].filter(condition => condition).join(' and ');
  return () => new Style().atRule(`@media ${mediaConditions}`);
}

// NOTE: Non-size breakpoints should come first, to avoid using them in the
// +breakpoint definition.
function sortWeight(breakpoint) {
  return isString(breakpoint) ? parseInt(breakpoint) : Number.NEGATIVE_INFINITY;
}

function generateThemes (
  darkMode
) {
  if (!darkMode) return {};
  return {
    '@dark': () => new Style().atRule('@media (prefers-color-scheme: dark)'),
    '@light': () => new Style().atRule('@media (prefers-color-scheme: light)'),
    '.dark': () => new Style().parent('.dark'),
    '.light': () => new Style().parent('.light'),
    dark: () => darkMode === 'media'? new Style().atRule('@media (prefers-color-scheme: dark)'): new Style().parent('.dark'),
    light: () => darkMode === 'media'? new Style().atRule('@media (prefers-color-scheme: light)'): new Style().parent('.light'),
  } ;
}

/*
 * See MDN web docs for more information
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
 */

function generateStates(
  variantOrder
) {
  const states = {
    // Interactive links/buttons
    hover: () => new Style().pseudoClass('hover'),
    focus: () => new Style().pseudoClass('focus'),
    active: () => new Style().pseudoClass('active'),
    visited: () => new Style().pseudoClass('visited'),
    link: () => new Style().pseudoClass('link'),
    target: () => new Style().pseudoClass('target'),
    'focus-visible': () => new Style().pseudoClass('focus-visible'),
    'focus-within': () => new Style().pseudoClass('focus-within'),

    // Form element states
    checked: () => new Style().pseudoClass('checked'),
    'not-checked': () => new Style().pseudoClass('not(:checked)'),
    default: () => new Style().pseudoClass('default'),
    disabled: () => new Style().pseudoClass('disabled'),
    enabled: () => new Style().pseudoClass('enabled'),
    indeterminate: () => new Style().pseudoClass('indeterminate'),
    invalid: () => new Style().pseudoClass('invalid'),
    valid: () => new Style().pseudoClass('valid'),
    optional: () => new Style().pseudoClass('optional'),
    required: () => new Style().pseudoClass('required'),
    'placeholder-shown': () => new Style().pseudoClass('placeholder-shown'),
    'read-only': () => new Style().pseudoClass('read-only'),
    'read-write': () => new Style().pseudoClass('read-write'),

    // Child selectors
    'not-disabled': () => new Style().pseudoClass('not(:disabled)'),
    'first-of-type': () => new Style().pseudoClass('first-of-type'),
    'not-first-of-type': () => new Style().pseudoClass('not(:first-of-type)'),
    'last-of-type': () => new Style().pseudoClass('last-of-type'),
    'not-last-of-type': () => new Style().pseudoClass('not(:last-of-type)'),
    first: () => new Style().pseudoClass('first-child'),
    last: () => new Style().pseudoClass('last-child'),
    'not-first': () => new Style().pseudoClass('not(:first-child)'),
    'not-last': () => new Style().pseudoClass('not(:last-child)'),
    'only-child': () => new Style().pseudoClass('only-child'),
    'not-only-child': () => new Style().pseudoClass('not(:only-child)'),
    'only-of-type': () => new Style().pseudoClass('only-of-type'),
    'not-only-of-type': () => new Style().pseudoClass('not(:only-of-type)'),
    even: () => new Style().pseudoClass('nth-child(even)'),
    odd: () => new Style().pseudoClass('nth-child(odd)'),
    'even-of-type': () => new Style().pseudoClass('nth-of-type(even)'),
    'odd-of-type': () => new Style().pseudoClass('nth-of-type(odd)'),
    root: () => new Style().pseudoClass('root'),
    empty: () => new Style().pseudoClass('empty'),

    // Pseudo elements
    before: () => new Style().pseudoElement('before'),
    after: () => new Style().pseudoElement('after'),
    'first-letter': () => new Style().pseudoElement('first-letter'),
    'first-line': () => new Style().pseudoElement('first-line'),
    'file-selector-button': () => new Style().pseudoElement('file-selector-button'),
    file: () => new Style().pseudoElement('file-selector-button'),
    selection: () => new Style().wrapSelector(selector => `${selector} *::selection, ${selector}::selection`),
    marker: () => new Style().wrapSelector(selector => `${selector} *::marker, ${selector}::marker`),

    svg: () => new Style().child('svg'),
    all: () => new Style().child('*'),
    children: () => new Style().child('> *'),
    siblings: () => new Style().child('~ *'),
    sibling: () => new Style().child('+ *'),
    // https://www.w3schools.com/CSS/css_pseudo_elements.asp

    // Directions
    ltr: () => new Style().wrapSelector(selector => `[dir='ltr'] ${selector}, [dir='ltr']${selector}`),
    rtl: () => new Style().wrapSelector(selector => `[dir='rtl'] ${selector}, [dir='rtl']${selector}`),

    // Group states
    // You'll need to add className="group" to an ancestor to make these work
    // https://github.com/ben-rogerson/twin.macro/blob/master/docs/group.md
    'group-hover': () => new Style().parent('.group:hover'),
    'group-focus': () => new Style().parent('.group:focus'),
    'group-active': () => new Style().parent('.group:active'),
    'group-visited': () => new Style().parent('.group:visited'),

    // Motion control
    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
    'motion-safe': () => new Style().atRule('@media (prefers-reduced-motion: no-preference)'),
    'motion-reduce': () => new Style().atRule('@media (prefers-reduced-motion: reduce)'),
  };
  const orderedStates = {};
  variantOrder.forEach((v) => {
    if (v in states) {
      orderedStates[v] = states[v];
    }
  });
  return orderedStates;
}

function _nullishCoalesce$3(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$3(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }










function resolveVariants(config) {
  return {
    orientation: generateOrientations((_nullishCoalesce$3(_optionalChain$3([(config.theme ), 'optionalAccess', _ => _.orientation]), () => ( {})))),
    screen: generateScreens((_nullishCoalesce$3(_optionalChain$3([(config.theme ), 'optionalAccess', _2 => _2.screens]), () => ( {}))) ),
    theme: generateThemes(config.darkMode),
    state: generateStates(_nullishCoalesce$3(config.variantOrder, () => ( []))),
  };
}

function _optionalChain$2(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// (Last Update: Aug 22 2020) [https://github.com/sindresorhus/modern-normalize/blob/master/modern-normalize.css]


const preflights






 = [

  /*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */

  /*
Document
========
*/

  /**
Use a better box model (opinionated).
*/
  // {
  //   keys: ['*'],
  //   global: true,
  //   selector: '*, *::before, *::after',
  //   properties: {
  //     '-webkit-box-sizing': 'border-box',
  //     'box-sizing': 'border-box'
  //   }
  // },
  // overwrite by windi

  /**
Use a more readable tab size (opinionated).
*/

  {
    keys: ['root'],
    global: true,
    selector: ':root',
    properties: {
      '-moz-tab-size': (theme) => theme('tabSize.DEFAULT', '4'),
      '-o-tab-size': (theme) => theme('tabSize.DEFAULT', '4'),
      'tab-size': (theme) => theme('tabSize.DEFAULT', '4'),
    },
  },

  /**
1. Correct the line height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
*/

  {
    keys: ['html'],
    global: true,
    selector: 'html',
    properties: {
    // 'line-height': '1.15', /* 1 */ overwrite by windi
      '-webkit-text-size-adjust': '100%', /* 2 */
    },
  },

  /*
Sections
========
*/

  /**
Remove the margin in all browsers.
*/

  {
    keys: ['body'],
    global: true,
    selector: 'body',
    properties: {
      'margin': '0', /* 1 */
    },
  },

  /**
Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
*/

  // {
  //   keys: ['body'],
  //   global: true,
  //   selector: 'body',
  //   properties: {
  //     'font-family': "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"
  //   }
  // },
  // overide by windi

  /*
Grouping content
================
*/

  /**
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
*/

  {
    keys: ['hr'],
    properties: {
      'height': '0', /* 1 */
      'color': 'inherit', /* 2 */
    },
  },

  /*
Text-level semantics
====================
*/

  /**
Add the correct text decoration in Chrome, Edge, and Safari.
*/

  {
    keys: ['title'],
    global: true,
    selector: 'abbr[title]',
    properties: {
      '-webkit-text-decoration': 'underline dotted',
      'text-decoration': 'underline dotted',
    },
  },

  /**
Add the correct font weight in Edge and Safari.
*/

  {
    keys: ['b', 'strong'],
    properties: {
      'font-weight': 'bolder',
    },
  },

  /**
1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
2. Correct the odd 'em' font sizing in all browsers.
*/

  {
    keys: ['code', 'kbd', 'samp', 'pre'],
    properties: {
    // 'font-family': "ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace", /* 1 */ overwrite by windi
      'font-size': '1em', /* 2 */
    },
  },

  /**
Add the correct font size in all browsers.
*/

  {
    keys: ['small'],
    properties: {
      'font-size': '80%',
    },
  },

  /**
Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
*/

  {
    keys: ['sub', 'sup'],
    properties: {
      'font-size': '75%',
      'line-height': '0',
      'position': 'relative',
      'vertical-align': 'baseline',
    },
  },

  {
    keys: ['sub'],
    properties: {
      'bottom': '-0.25em',
    },
  },

  {
    keys: ['sup'],
    properties: {
      'top': '-0.5em',
    },
  },

  /*
Tabular data
============
*/

  /**
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
*/

  {
    keys: ['table'],
    properties: {
      'text-indent': '0', /* 1 */
      'border-color': 'inherit', /* 2 */
    },
  },

  /*
Forms
=====
*/

  /**
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
*/

  {
    keys: ['button', 'input', 'optgroup', 'select', 'textarea'],
    properties: {
      'font-family': 'inherit', /* 1 */
      'font-size': '100%', /* 1 */
      'line-height': '1.15', /* 1 */
      'margin': '0', /* 2 */
    },
  },

  /**
Remove the inheritance of text transform in Edge and Firefox.
1. Remove the inheritance of text transform in Firefox.
*/

  {
    keys: ['button', 'select'],
    properties: {
      'text-transform': 'none', /* 1 */
    },
  },

  /**
Correct the inability to style clickable types in iOS and Safari.
*/

  {
    keys: ['button'],
    selector: 'button, [type=\'button\'], [type=\'reset\'], [type=\'submit\']',
    properties: {
      '-webkit-appearance': 'button', /* 1 */
    },
  },

  /**
Remove the inner border and padding in Firefox.
*/

  {
    keys: ['inner'],
    global: true,
    selector: '::moz-focus-inner',
    properties: {
      'border-style': 'none',
      'padding': '0',
    },
  },

  /**
Restore the focus styles unset by the previous rule.
*/

  {
    keys: ['focusring'],
    global: true,
    selector: ':-moz-focusring',
    properties: {
      'outline': '1px dotted ButtonText',
    },
  },

  /**
Remove the additional ':invalid' styles in Firefox.
See: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737
*/

  {
    keys: ['invalid'],
    global: true,
    selector: ':-moz-ui-invalid',
    properties: {
      'box-shadow': 'none',
    },
  },

  /**
Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
*/

  {
    keys: ['legend'],
    properties: {
      'padding': '0',
    },
  },

  /**
Add the correct vertical alignment in Chrome and Firefox.
*/

  {
    keys: ['progress'],
    properties: {
      'vertical-align': 'baseline',
    },
  },

  /**
Correct the cursor style of increment and decrement buttons in Safari.
*/

  {
    keys: ['spin'],
    global: true,
    selector: '::-webkit-inner-spin-button, ::-webkit-outer-spin-button',
    properties: {
      'height': 'auto',
    },
  },

  /**
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

  {
    keys: ['search'],
    global: true,
    selector: '[type=\'search\']',
    properties: {
      '-webkit-appearance': 'textfield', /* 1 */
      'outline-offset': '-2px', /* 2 */

    },
  },

  /**
Remove the inner padding in Chrome and Safari on macOS.
*/

  {
    keys: ['search'],
    global: true,
    selector: '::-webkit-search-decoration',
    properties: {
      '-webkit-appearance': 'none',
    },
  },

  /**
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to 'inherit' in Safari.
*/

  {
    keys: ['file'],
    global: true,
    selector: '::-webkit-file-upload-button',
    properties: {
      '-webkit-appearance': 'button',
      'font': 'inherit',
    },
  },

  /*
Interactive
===========
*/

  /*
Add the correct display in Chrome and Safari.
*/

  {
    keys: ['summary'],
    properties: {
      'display': 'list-item',
    },
  },

  /**
 * Manually forked from SUIT CSS Base: https://github.com/suitcss/base
 * A thin layer on top of normalize.css that provides a starting point more
 * suitable for web applications.
 */

  /**
 * Removes the default spacing and border for appropriate elements.
 */

  {
    keys: ['blockquote', 'dl', 'dd', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'figure', 'p', 'pre'],
    properties: {
      'margin': '0',
    },
  },

  {
    keys: ['button'],
    properties: {
      'background-color': 'transparent',
      'background-image': 'none' },
  },

  /**
 * Work around a Firefox/IE bug where the transparent `button` background
 * results in a loss of the default `button` focus styles.
 */

  {
    keys: ['fieldset'],
    properties: {
      'margin': '0',
      'padding': '0',
    },
  },

  {
    keys: ['ol', 'ul'],
    properties: {
      'list-style': 'none',
      'margin': '0',
      'padding': '0',
    },
  },

  /**
 * Tailwind custom reset styles
 */

  /**
 * 1. Use the user's configured `sans` font-family (with Tailwind's default
 *    sans-serif font stack as a fallback) as a sane default.
 * 2. Use Tailwind's default "normal" line-height so the user isn't forced
 *    to override it to ensure consistency even when using the default theme.
 */

  {
    keys: ['html'],
    global: true,
    selector: 'html',
    properties: {
      'font-family': (theme) => theme('fontFamily.sans', 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"') , /* 1 */
      'line-height': '1.5', /* 2 */
    },
  },

  /**
 * Inherit font-family and line-height from `html` so users can set them as
 * a class directly on the `html` element.
 */

  {
    keys: ['body'],
    global: true,
    selector: 'body',
    properties: {
      'font-family': 'inherit',
      'line-height': 'inherit',
    },
  },

  /**
 * 1. Prevent padding and border from affecting element width.
 *
 *    We used to set this in the html element and inherit from
 *    the parent element for everything else. This caused issues
 *    in shadow-dom-enhanced elements like <details> where the content
 *    is wrapped by a div with box-sizing set to `content-box`.
 *
 *    https://github.com/mozdevs/cssremedy/issues/4
 *
 *
 * 2. Allow adding a border to an element by just adding a border-width.
 *
 *    By default, the way the browser specifies that an element should have no
 *    border is by setting it's border-style to `none` in the user-agent
 *    stylesheet.
 *
 *    In order to easily add borders to elements by just setting the `border-width`
 *    property, we change the default border-style for all elements to `solid`, and
 *    use border-width to hide them instead. This way our `border` utilities only
 *    need to set the `border-width` property instead of the entire `border`
 *    shorthand, making our border utilities much more straightforward to compose.
 *
 */

  {
    keys: ['*'],
    global: true,
    selector: '*, ::before, ::after',
    properties: {
      '-webkit-box-sizing': 'border-box',
      'box-sizing': 'border-box',
      'border-width': '0',
      'border-style': 'solid',
      'border-color': (theme) => theme('borderColor.DEFAULT', 'currentColor') ,
    },
  },

  /*
 * Ensure horizontal rules are visible by default
 */

  {
    keys: ['hr'],
    properties: {
      'border-top-width': '1px',
    },
  },

  /**
 * Undo the `border-style: none` reset that Normalize applies to images so that
 * our `border-{width}` utilities have the expected effect.
 *
 * The Normalize reset is unnecessary for us since we default the border-width
 * to 0 on all elements.
 *
 */

  {
    keys: ['img'],
    properties: {
      'border-style': 'solid',
    },
  },

  {
    keys: ['textarea'],
    properties: {
      'resize': 'vertical',
    },
  },

  // input::placeholder,
  // textarea::placeholder {
  //   color: theme('colors.gray.400', #a1a1aa);
  // }
  // support prefixer

  {
    keys: ['input'],
    selector: 'input::placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['input'],
    selector: 'input::webkit-input-placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['input'],
    selector: 'input::-moz-placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['input'],
    selector: 'input:-ms-input-placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['input'],
    selector: 'input::-ms-input-placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['textarea'],
    selector: 'textarea::placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['textarea'],
    selector: 'textarea::webkit-input-placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['textarea'],
    selector: 'textarea::-moz-placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['textarea'],
    selector: 'textarea:-ms-input-placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['textarea'],
    selector: 'textarea::-ms-input-placeholder',
    properties: {
      'opacity': '1',
      'color': (theme) => theme('colors.gray.400', '#a1a1aa') ,
    },
  },

  {
    keys: ['button'],
    selector: 'button, [role="button"]',
    properties: {
      'cursor': 'pointer',
    },
  },

  {
    keys: ['table'],
    properties: {
      'border-collapse': 'collapse',
    },
  },

  {
    keys: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    properties: {
      'font-size': 'inherit',
      'font-weight': 'inherit',
    },
  },

  /**
 * Reset links to optimize for opt-in styling instead of
 * opt-out.
 */

  {
    keys: ['a'],
    properties: {
      'color': 'inherit',
      'text-decoration': 'inherit',
    },
  },

  /**
 * Reset form element properties that are easy to forget to
 * style explicitly so you don't inadvertently introduce
 * styles that deviate from your design system. These styles
 * supplement a partial reset that is already applied by
 * normalize.css.
 */

  {
    keys: ['button', 'input', 'optgroup', 'select', 'textarea'],
    properties: {
      'padding': '0',
      'line-height': 'inherit',
      'color': 'inherit',
    },
  },

  /**
 * Use the configured 'mono' font family for elements that
 * are expected to be rendered with a monospace font, falling
 * back to the system monospace stack if there is no configured
 * 'mono' font family.
 */

  {
    keys: ['pre', 'code', 'kbd', 'samp'],
    properties: {
      'font-family': (theme) => theme('fontFamily.mono', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace') ,
    },
  },

  /**
 * Make replaced elements `display: block` by default as that's
 * the behavior you want almost all of the time. Inspired by
 * CSS Remedy, with `svg` added as well.
 *
 * https://github.com/mozdevs/cssremedy/issues/14
 */

  {
    keys: ['img', 'svg', 'video', 'canvas', 'audio', 'iframe', 'embed', 'object'],
    properties: {
      'display': 'block',
      'vertical-align': 'middle',
    },
  },

  /**
 * Constrain images and videos to the parent width and preserve
 * their instrinsic aspect ratio.
 *
 * https://github.com/mozdevs/cssremedy/issues/14
 */

  {
    keys: ['img', 'video'],
    properties: {
      'max-width': '100%',
      'height': 'auto',
    },
  },

  // added by ringWidth
  // https://windicss.org/utilities/borders.html#ring-width
  {
    keys: ['*'],
    global: true,
    selector: '*',
    properties: {
      '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-ring-offset-width': theme => theme('ringOffsetWidth.DEFAULT', '0px') ,
      '--tw-ring-offset-color': theme => theme('ringOffsetColor.DEFAULT', '#fff') ,
      '--tw-ring-color': theme => `rgba(${_optionalChain$2([hex2RGB, 'call', _ => _(theme('ringColor.DEFAULT', '#93C5FD') ), 'optionalAccess', _2 => _2.join, 'call', _3 => _3(', ')])}, ${theme('ringOpacity.DEFAULT', '0.5') })`,
      '--tw-ring-offset-shadow': '0 0 #0000',
      '--tw-ring-shadow': '0 0 #0000',
    },
  },

  // added by boxShadow
  // https://windicss.org/utilities/effects.html#box-shadow
  {
    keys: ['*'],
    global: true,
    selector: '*',
    properties: {
      '--tw-shadow': '0 0 #0000',
    },
  },
];

const fontVariants = {
  '--tw-ordinal': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-slashed-zero': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-numeric-figure': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-numeric-spacing': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-numeric-fraction': 'var(--tw-empty,/*!*/ /*!*/)',
  'font-variant-numeric': 'var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)',
};

const staticUtilities = {
  // https://windicss.org/utilities/behaviors.html#box-decoration-break
  'decoration-slice': {
    'utility': {
      '-webkit-box-decoration-break': 'slice',
      'box-decoration-break': 'slice',
    },
    'meta': {
      'group': 'boxDecorationBreak',
      'order': 1,
    },
  },

  'decoration-clone': {
    'utility': {
      '-webkit-box-decoration-break': 'clone',
      'box-decoration-break': 'clone',
    },
    'meta': {
      'group': 'boxDecorationBreak',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/flexbox.html#flex-basis
  'basis-auto' : {
    'utility': {
      'flex-basis': 'auto',
    },
    'meta': {
      'group': 'flexBasis',
      'order': 1,
    },
  },
  'basis-full' : {
    'utility': {
      'flex-basis': '100%',
    },
    'meta': {
      'group': 'flexBasis',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/sizing.html#box-sizing
  'box-border': {
    'utility': {
      '-webkit-box-sizing': 'border-box',
      'box-sizing': 'border-box',
    },
    'meta': {
      'group': 'boxSizing',
      'order': 1,
    },
  },
  'box-content': {
    'utility': {
      '-webkit-box-sizing': 'content-box',
      'box-sizing': 'content-box',
    },
    'meta': {
      'group': 'boxSizing',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/display.html
  'block': {
    'utility': {
      'display': 'block',
    },
    'meta': {
      'group': 'display',
      'order': 1,
    },
  },
  'inline-block': {
    'utility': {
      'display': 'inline-block',
    },
    'meta': {
      'group': 'display',
      'order': 2,
    },
  },
  'inline': {
    'utility': {
      'display': 'inline',
    },
    'meta': {
      'group': 'display',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/flexbox.html
  'flex': {
    'utility': {
      'display': [
        '-webkit-box',
        '-ms-flexbox',
        '-webkit-flex',
        'flex',
      ],
    },
    'meta': {
      'group': 'display',
      'order': 4,
    },
  },
  'inline-flex': {
    'utility': {
      'display': [
        '-webkit-inline-box',
        '-ms-inline-flexbox',
        '-webkit-inline-flex',
        'inline-flex',
      ],
    },
    'meta': {
      'group': 'display',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/tables.html
  'table': {
    'utility': {
      'display': 'table',
    },
    'meta': {
      'group': 'display',
      'order': 6,
    },
  },
  'inline-table': {
    'utility': {
      'display': 'inline-table',
    },
    'meta': {
      'group': 'display',
      'order': 7,
    },
  },
  'table-caption': {
    'utility': {
      'display': 'table-caption',
    },
    'meta': {
      'group': 'display',
      'order': 8,
    },
  },
  'table-cell': {
    'utility': {
      'display': 'table-cell',
    },
    'meta': {
      'group': 'display',
      'order': 9,
    },
  },
  'table-column': {
    'utility': {
      'display': 'table-column',
    },
    'meta': {
      'group': 'display',
      'order': 10,
    },
  },
  'table-column-group': {
    'utility': {
      'display': 'table-column-group',
    },
    'meta': {
      'group': 'display',
      'order': 11,
    },
  },
  'table-footer-group': {
    'utility': {
      'display': 'table-footer-group',
    },
    'meta': {
      'group': 'display',
      'order': 12,
    },
  },
  'table-header-group': {
    'utility': {
      'display': 'table-header-group',
    },
    'meta': {
      'group': 'display',
      'order': 13,
    },
  },
  'table-row-group': {
    'utility': {
      'display': 'table-row-group',
    },
    'meta': {
      'group': 'display',
      'order': 14,
    },
  },
  'table-row': {
    'utility': {
      'display': 'table-row',
    },
    'meta': {
      'group': 'display',
      'order': 15,
    },
  },
  'flow-root': {
    'utility': {
      'display': 'flow-root',
    },
    'meta': {
      'group': 'display',
      'order': 16,
    },
  },

  // https://windicss.org/utilities/grid.html
  'grid': {
    'utility': {
      'display': [
        '-ms-grid',
        'grid',
      ],
    },
    'meta': {
      'group': 'display',
      'order': 17,
    },
  },
  'inline-grid': {
    'utility': {
      'display': [
        '-ms-inline-grid',
        'inline-grid',
      ],
    },
    'meta': {
      'group': 'display',
      'order': 18,
    },
  },
  'contents': {
    'utility': {
      'display': 'contents',
    },
    'meta': {
      'group': 'display',
      'order': 19,
    },
  },
  'list-item': {
    'utility': {
      'display': 'list-item',
    },
    'meta': {
      'group': 'display',
      'order': 20,
    },
  },
  'hidden': {
    'utility': {
      'display': 'none',
    },
    'meta': {
      'group': 'display',
      'order': 21,
    },
  },

  // https://windicss.org/utilities/columns.html
  'break-after-auto': {
    'utility': {
      'break-after': 'auto',
    },
    'meta': {
      'group': 'columns',
      'order': 1,
    },
  },
  'break-after-avoid': {
    'utility': {
      'break-after': 'avoid',
    },
    'meta': {
      'group': 'columns',
      'order': 2,
    },
  },
  'break-after-all': {
    'utility': {
      'break-after': 'all',
    },
    'meta': {
      'group': 'columns',
      'order': 3,
    },
  },
  'break-after-avoid-page': {
    'utility': {
      'break-after': 'avoid-page',
    },
    'meta': {
      'group': 'columns',
      'order': 4,
    },
  },
  'break-after-page': {
    'utility': {
      'break-after': 'page',
    },
    'meta': {
      'group': 'columns',
      'order': 5,
    },
  },
  'break-after-left': {
    'utility': {
      'break-after': 'left',
    },
    'meta': {
      'group': 'columns',
      'order': 6,
    },
  },
  'break-after-right': {
    'utility': {
      'break-after': 'right',
    },
    'meta': {
      'group': 'columns',
      'order': 7,
    },
  },
  'break-after-column': {
    'utility': {
      'break-after': 'column',
    },
    'meta': {
      'group': 'columns',
      'order': 8,
    },
  },
  'break-before-auto': {
    'utility': {
      'break-before': 'auto',
    },
    'meta': {
      'group': 'columns',
      'order': 9,
    },
  },
  'break-before-avoid': {
    'utility': {
      'break-before': 'avoid',
    },
    'meta': {
      'group': 'columns',
      'order': 10,
    },
  },
  'break-before-all': {
    'utility': {
      'break-before': 'all',
    },
    'meta': {
      'group': 'columns',
      'order': 11,
    },
  },
  'break-before-avoid-page': {
    'utility': {
      'break-before': 'avoid-page',
    },
    'meta': {
      'group': 'columns',
      'order': 12,
    },
  },
  'break-before-page': {
    'utility': {
      'break-before': 'page',
    },
    'meta': {
      'group': 'columns',
      'order': 13,
    },
  },
  'break-before-left': {
    'utility': {
      'break-before': 'left',
    },
    'meta': {
      'group': 'columns',
      'order': 14,
    },
  },
  'break-before-right': {
    'utility': {
      'break-before': 'right',
    },
    'meta': {
      'group': 'columns',
      'order': 15,
    },
  },
  'break-before-column': {
    'utility': {
      'break-before': 'column',
    },
    'meta': {
      'group': 'columns',
      'order': 16,
    },
  },
  'break-inside-auto': {
    'utility': {
      'break-inside': 'auto',
    },
    'meta': {
      'group': 'columns',
      'order': 17,
    },
  },
  'break-inside-avoid': {
    'utility': {
      'break-inside': 'avoid',
    },
    'meta': {
      'group': 'columns',
      'order': 18,
    },
  },
  'break-inside-avoid-page': {
    'utility': {
      'break-inside': 'avoid-page',
    },
    'meta': {
      'group': 'columns',
      'order': 19,
    },
  },
  'break-inside-avoid-column': {
    'utility': {
      'break-inside': 'avoid-column',
    },
    'meta': {
      'group': 'columns',
      'order': 20,
    },
  },

  // https://windicss.org/utilities/positioning.html#floats
  'float-right': {
    'utility': {
      'float': 'right',
    },
    'meta': {
      'group': 'float',
      'order': 1,
    },
  },
  'float-left': {
    'utility': {
      'float': 'left',
    },
    'meta': {
      'group': 'float',
      'order': 2,
    },
  },
  'float-none': {
    'utility': {
      'float': 'none',
    },
    'meta': {
      'group': 'float',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/positioning.html#clear
  'clear-left': {
    'utility': {
      'clear': 'left',
    },
    'meta': {
      'group': 'clear',
      'order': 1,
    },
  },
  'clear-right': {
    'utility': {
      'clear': 'right',
    },
    'meta': {
      'group': 'clear',
      'order': 2,
    },
  },
  'clear-both': {
    'utility': {
      'clear': 'both',
    },
    'meta': {
      'group': 'clear',
      'order': 3,
    },
  },
  'clear-none': {
    'utility': {
      'clear': 'none',
    },
    'meta': {
      'group': 'clear',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/positioning.html#isolation
  'isolate': {
    'utility': {
      'isolation': 'isolate',
    },
    'meta': {
      'group': 'isolation',
      'order': 1,
    },
  },
  'isolation-auto': {
    'utility': {
      'isolation': 'auto',
    },
    'meta': {
      'group': 'isolation',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/positioning.html#object-fit
  'object-contain': {
    'utility': {
      '-o-object-fit': 'contain',
      'object-fit': 'contain',
    },
    'meta': {
      'group': 'objectFit',
      'order': 1,
    },
  },
  'object-cover': {
    'utility': {
      '-o-object-fit': 'cover',
      'object-fit': 'cover',
    },
    'meta': {
      'group': 'objectFit',
      'order': 2,
    },
  },
  'object-fill': {
    'utility': {
      '-o-object-fit': 'fill',
      'object-fit': 'fill',
    },
    'meta': {
      'group': 'objectFit',
      'order': 3,
    },
  },
  'object-none': {
    'utility': {
      '-o-object-fit': 'none',
      'object-fit': 'none',
    },
    'meta': {
      'group': 'objectFit',
      'order': 4,
    },
  },
  'object-scale-down': {
    'utility': {
      '-o-object-fit': 'scale-down',
      'object-fit': 'scale-down',
    },
    'meta': {
      'group': 'objectFit',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/behaviors.html#overflow
  'overflow-auto': {
    'utility': {
      'overflow': 'auto',
    },
    'meta': {
      'group': 'overflow',
      'order': 1,
    },
  },
  'overflow-hidden': {
    'utility': {
      'overflow': 'hidden',
    },
    'meta': {
      'group': 'overflow',
      'order': 2,
    },
  },
  'overflow-visible': {
    'utility': {
      'overflow': 'visible',
    },
    'meta': {
      'group': 'overflow',
      'order': 3,
    },
  },
  'overflow-scroll': {
    'utility': {
      'overflow': 'scroll',
    },
    'meta': {
      'group': 'overflow',
      'order': 4,
    },
  },
  'overflow-x-auto': {
    'utility': {
      'overflow-x': 'auto',
    },
    'meta': {
      'group': 'overflow',
      'order': 5,
    },
  },
  'overflow-y-auto': {
    'utility': {
      'overflow-y': 'auto',
    },
    'meta': {
      'group': 'overflow',
      'order': 6,
    },
  },
  'overflow-x-hidden': {
    'utility': {
      'overflow-x': 'hidden',
    },
    'meta': {
      'group': 'overflow',
      'order': 7,
    },
  },
  'overflow-y-hidden': {
    'utility': {
      'overflow-y': 'hidden',
    },
    'meta': {
      'group': 'overflow',
      'order': 8,
    },
  },
  'overflow-x-visible': {
    'utility': {
      'overflow-x': 'visible',
    },
    'meta': {
      'group': 'overflow',
      'order': 9,
    },
  },
  'overflow-y-visible': {
    'utility': {
      'overflow-y': 'visible',
    },
    'meta': {
      'group': 'overflow',
      'order': 10,
    },
  },
  'overflow-x-scroll': {
    'utility': {
      'overflow-x': 'scroll',
    },
    'meta': {
      'group': 'overflow',
      'order': 11,
    },
  },
  'overflow-y-scroll': {
    'utility': {
      'overflow-y': 'scroll',
    },
    'meta': {
      'group': 'overflow',
      'order': 12,
    },
  },

  // https://windicss.org/utilities/behaviors.html#overscroll-behavior
  'overscroll-auto': {
    'utility': {
      'overscroll-behavior': 'auto',
      '-ms-scroll-chaining': 'chained',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 1,
    },
  },
  'overscroll-contain': {
    'utility': {
      'overscroll-behavior': 'contain',
      '-ms-scroll-chaining': 'none',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 2,
    },
  },
  'overscroll-none': {
    'utility': {
      'overscroll-behavior': 'none',
      '-ms-scroll-chaining': 'none',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 3,
    },
  },
  'overscroll-y-auto': {
    'utility': {
      'overscroll-behavior-y': 'auto',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 4,
    },
  },
  'overscroll-y-contain': {
    'utility': {
      'overscroll-behavior-y': 'contain',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 5,
    },
  },
  'overscroll-y-none': {
    'utility': {
      'overscroll-behavior-y': 'none',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 6,
    },
  },
  'overscroll-x-auto': {
    'utility': {
      'overscroll-behavior-x': 'auto',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 7,
    },
  },
  'overscroll-x-contain': {
    'utility': {
      'overscroll-behavior-x': 'contain',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 8,
    },
  },
  'overscroll-x-none': {
    'utility': {
      'overscroll-behavior-x': 'none',
    },
    'meta': {
      'group': 'overscrollBehavior',
      'order': 9,
    },
  },

  // https://windicss.org/utilities/positioning.html#position
  'static': {
    'utility': {
      'position': 'static',
    },
    'meta': {
      'group': 'position',
      'order': 1,
    },
  },
  'fixed': {
    'utility': {
      'position': 'fixed',
    },
    'meta': {
      'group': 'position',
      'order': 2,
    },
  },
  'absolute': {
    'utility': {
      'position': 'absolute',
    },
    'meta': {
      'group': 'position',
      'order': 3,
    },
  },
  'relative': {
    'utility': {
      'position': 'relative',
    },
    'meta': {
      'group': 'position',
      'order': 4,
    },
  },
  'sticky': {
    'utility': {
      'position': [
        '-webkit-sticky',
        'sticky',
      ],
    },
    'meta': {
      'group': 'position',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/display.html#visibility
  'visible': {
    'utility': {
      'visibility': 'visible',
    },
    'meta': {
      'group': 'visibility',
      'order': 1,
    },
  },
  'invisible': {
    'utility': {
      'visibility': 'hidden',
    },
    'meta': {
      'group': 'visibility',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/display.html#backface-visibility
  'backface-visible': {
    'utility': {
      '-webkit-backface-visibility': 'visible',
      'backface-visibility': 'visible',
    },
    'meta': {
      'group': 'backfaceVisibility',
      'order': 1,
    },
  },
  'backface-hidden': {
    'utility': {
      '-webkit-backface-visibility': 'hidden',
      'backface-visibility': 'hidden',
    },
    'meta': {
      'group': 'backfaceVisibility',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/flexbox.html#flex-direction
  'flex-row': {
    'utility': {
      '-webkit-box-orient': 'horizontal',
      '-webkit-box-direction': 'normal',
      '-ms-flex-direction': 'row',
      '-webkit-flex-direction': 'row',
      'flex-direction': 'row',
    },
    'meta': {
      'group': 'flexDirection',
      'order': 1,
    },
  },
  'flex-row-reverse': {
    'utility': {
      '-webkit-box-orient': 'horizontal',
      '-webkit-box-direction': 'reverse',
      '-ms-flex-direction': 'row-reverse',
      '-webkit-flex-direction': 'row-reverse',
      'flex-direction': 'row-reverse',
    },
    'meta': {
      'group': 'flexDirection',
      'order': 2,
    },
  },
  'flex-col': {
    'utility': {
      '-webkit-box-orient': 'vertical',
      '-webkit-box-direction': 'normal',
      '-ms-flex-direction': 'column',
      '-webkit-flex-direction': 'column',
      'flex-direction': 'column',
    },
    'meta': {
      'group': 'flexDirection',
      'order': 3,
    },
  },
  'flex-col-reverse': {
    'utility': {
      '-webkit-box-orient': 'vertical',
      '-webkit-box-direction': 'reverse',
      '-ms-flex-direction': 'column-reverse',
      '-webkit-flex-direction': 'column-reverse',
      'flex-direction': 'column-reverse',
    },
    'meta': {
      'group': 'flexDirection',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/flexbox.html#flex-wrap
  'flex-wrap': {
    'utility': {
      '-ms-flex-wrap': 'wrap',
      '-webkit-flex-wrap': 'wrap',
      'flex-wrap': 'wrap',
    },
    'meta': {
      'group': 'flexWrap',
      'order': 1,
    },
  },
  'flex-wrap-reverse': {
    'utility': {
      '-ms-flex-wrap': 'wrap-reverse',
      '-webkit-flex-wrap': 'wrap-reverse',
      'flex-wrap': 'wrap-reverse',
    },
    'meta': {
      'group': 'flexWrap',
      'order': 2,
    },
  },
  'flex-nowrap': {
    'utility': {
      '-ms-flex-wrap': 'nowrap',
      '-webkit-flex-wrap': 'nowrap',
      'flex-wrap': 'nowrap',
    },
    'meta': {
      'group': 'flexWrap',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/grid.html#grid-column-span
  'col-auto': {
    'utility': {
      'grid-column': 'auto',
    },
    'meta': {
      'group': 'gridColumn',
      'order': 1,
    },
  },

  // https://windicss.org/utilities/grid.html#grid-row-span
  'row-auto': {
    'utility': {
      'grid-row': 'auto',
    },
    'meta': {
      'group': 'gridRow',
      'order': 1,
    },
  },

  // https://windicss.org/utilities/grid.html#grid-auto-flow
  'grid-flow-row': {
    'utility': {
      'grid-auto-flow': 'row',
    },
    'meta': {
      'group': 'gridAutoFlow',
      'order': 1,
    },
  },
  'grid-flow-col': {
    'utility': {
      'grid-auto-flow': 'column',
    },
    'meta': {
      'group': 'gridAutoFlow',
      'order': 2,
    },
  },
  'grid-flow-row-dense': {
    'utility': {
      'grid-auto-flow': 'row dense',
    },
    'meta': {
      'group': 'gridAutoFlow',
      'order': 3,
    },
  },
  'grid-flow-col-dense': {
    'utility': {
      'grid-auto-flow': 'column dense',
    },
    'meta': {
      'group': 'gridAutoFlow',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/positioning.html#justify-content
  'justify-start': {
    'utility': {
      '-webkit-box-pack': 'start',
      '-ms-flex-pack': 'start',
      '-webkit-justify-content': 'flex-start',
      'justify-content': 'flex-start',
    },
    'meta': {
      'group': 'justifyContent',
      'order': 1,
    },
  },
  'justify-end': {
    'utility': {
      '-webkit-box-pack': 'end',
      '-ms-flex-pack': 'end',
      '-webkit-justify-content': 'flex-end',
      'justify-content': 'flex-end',
    },
    'meta': {
      'group': 'justifyContent',
      'order': 2,
    },
  },
  'justify-center': {
    'utility': {
      '-webkit-box-pack': 'center',
      '-ms-flex-pack': 'center',
      '-webkit-justify-content': 'center',
      'justify-content': 'center',
    },
    'meta': {
      'group': 'justifyContent',
      'order': 3,
    },
  },
  'justify-between': {
    'utility': {
      '-webkit-box-pack': 'justify',
      '-ms-flex-pack': 'justify',
      '-webkit-justify-content': 'space-between',
      'justify-content': 'space-between',
    },
    'meta': {
      'group': 'justifyContent',
      'order': 4,
    },
  },
  'justify-around': {
    'utility': {
      '-ms-flex-pack': 'distribute',
      '-webkit-justify-content': 'space-around',
      'justify-content': 'space-around',
    },
    'meta': {
      'group': 'justifyContent',
      'order': 5,
    },
  },
  'justify-evenly': {
    'utility': {
      '-webkit-box-pack': 'space-evenly',
      '-ms-flex-pack': 'space-evenly',
      '-webkit-justify-content': 'space-evenly',
      'justify-content': 'space-evenly',
    },
    'meta': {
      'group': 'justifyContent',
      'order': 6,
    },
  },

  // https://windicss.org/utilities/positioning.html#justify-items
  'justify-items-auto': {
    'utility': {
      'justify-items': 'auto',
    },
    'meta': {
      'group': 'justifyItems',
      'order': 1,
    },
  },
  'justify-items-start': {
    'utility': {
      'justify-items': 'start',
    },
    'meta': {
      'group': 'justifyItems',
      'order': 2,
    },
  },
  'justify-items-end': {
    'utility': {
      'justify-items': 'end',
    },
    'meta': {
      'group': 'justifyItems',
      'order': 3,
    },
  },
  'justify-items-center': {
    'utility': {
      'justify-items': 'center',
    },
    'meta': {
      'group': 'justifyItems',
      'order': 4,
    },
  },
  'justify-items-stretch': {
    'utility': {
      'justify-items': 'stretch',
    },
    'meta': {
      'group': 'justifyItems',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/positioning.html#justify-self
  'justify-self-auto': {
    'utility': {
      '-ms-grid-column-align': 'auto',
      'justify-self': 'auto',
    },
    'meta': {
      'group': 'justifySelf',
      'order': 1,
    },
  },
  'justify-self-start': {
    'utility': {
      '-ms-grid-column-align': 'start',
      'justify-self': 'start',
    },
    'meta': {
      'group': 'justifySelf',
      'order': 2,
    },
  },
  'justify-self-end': {
    'utility': {
      '-ms-grid-column-align': 'end',
      'justify-self': 'end',
    },
    'meta': {
      'group': 'justifySelf',
      'order': 3,
    },
  },
  'justify-self-center': {
    'utility': {
      '-ms-grid-column-align': 'center',
      'justify-self': 'center',
    },
    'meta': {
      'group': 'justifySelf',
      'order': 4,
    },
  },
  'justify-self-stretch': {
    'utility': {
      '-ms-grid-column-align': 'stretch',
      'justify-self': 'stretch',
    },
    'meta': {
      'group': 'justifySelf',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/positioning.html#align-content
  'content-center': {
    'utility': {
      '-ms-flex-line-pack': 'center',
      '-webkit-align-content': 'center',
      'align-content': 'center',
    },
    'meta': {
      'group': 'alignContent',
      'order': 1,
    },
  },
  'content-start': {
    'utility': {
      '-ms-flex-line-pack': 'start',
      '-webkit-align-content': 'flex-start',
      'align-content': 'flex-start',
    },
    'meta': {
      'group': 'alignContent',
      'order': 2,
    },
  },
  'content-end': {
    'utility': {
      '-ms-flex-line-pack': 'end',
      '-webkit-align-content': 'flex-end',
      'align-content': 'flex-end',
    },
    'meta': {
      'group': 'alignContent',
      'order': 3,
    },
  },
  'content-between': {
    'utility': {
      '-ms-flex-line-pack': 'justify',
      '-webkit-align-content': 'space-between',
      'align-content': 'space-between',
    },
    'meta': {
      'group': 'alignContent',
      'order': 4,
    },
  },
  'content-around': {
    'utility': {
      '-ms-flex-line-pack': 'distribute',
      '-webkit-align-content': 'space-around',
      'align-content': 'space-around',
    },
    'meta': {
      'group': 'alignContent',
      'order': 5,
    },
  },
  'content-evenly': {
    'utility': {
      '-ms-flex-line-pack': 'space-evenly',
      '-webkit-align-content': 'space-evenly',
      'align-content': 'space-evenly',
    },
    'meta': {
      'group': 'alignContent',
      'order': 6,
    },
  },

  // https://windicss.org/utilities/positioning.html#align-items
  'items-start': {
    'utility': {
      '-webkit-box-align': 'start',
      '-ms-flex-align': 'start',
      '-webkit-align-items': 'flex-start',
      'align-items': 'flex-start',
    },
    'meta': {
      'group': 'alignItems',
      'order': 1,
    },
  },
  'items-end': {
    'utility': {
      '-webkit-box-align': 'end',
      '-ms-flex-align': 'end',
      '-webkit-align-items': 'flex-end',
      'align-items': 'flex-end',
    },
    'meta': {
      'group': 'alignItems',
      'order': 2,
    },
  },
  'items-center': {
    'utility': {
      '-webkit-box-align': 'center',
      '-ms-flex-align': 'center',
      '-webkit-align-items': 'center',
      'align-items': 'center',
    },
    'meta': {
      'group': 'alignItems',
      'order': 3,
    },
  },
  'items-baseline': {
    'utility': {
      '-webkit-box-align': 'baseline',
      '-ms-flex-align': 'baseline',
      '-webkit-align-items': 'baseline',
      'align-items': 'baseline',
    },
    'meta': {
      'group': 'alignItems',
      'order': 4,
    },
  },
  'items-stretch': {
    'utility': {
      '-webkit-box-align': 'stretch',
      '-ms-flex-align': 'stretch',
      '-webkit-align-items': 'stretch',
      'align-items': 'stretch',
    },
    'meta': {
      'group': 'alignItems',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/positioning.html#align-self
  'self-auto': {
    'utility': {
      '-ms-flex-item-align': 'auto',
      '-ms-grid-row-align': 'auto',
      '-webkit-align-self': 'auto',
      'align-self': 'auto',
    },
    'meta': {
      'group': 'alignSelf',
      'order': 1,
    },
  },
  'self-start': {
    'utility': {
      '-ms-flex-item-align': 'start',
      '-webkit-align-self': 'flex-start',
      'align-self': 'flex-start',
    },
    'meta': {
      'group': 'alignSelf',
      'order': 2,
    },
  },
  'self-end': {
    'utility': {
      '-ms-flex-item-align': 'end',
      '-webkit-align-self': 'flex-end',
      'align-self': 'flex-end',
    },
    'meta': {
      'group': 'alignSelf',
      'order': 3,
    },
  },
  'self-center': {
    'utility': {
      '-ms-flex-item-align': 'center',
      '-ms-grid-row-align': 'center',
      '-webkit-align-self': 'center',
      'align-self': 'center',
    },
    'meta': {
      'group': 'alignSelf',
      'order': 4,
    },
  },
  'self-stretch': {
    'utility': {
      '-ms-flex-item-align': 'stretch',
      '-ms-grid-row-align': 'stretch',
      '-webkit-align-self': 'stretch',
      'align-self': 'stretch',
    },
    'meta': {
      'group': 'alignSelf',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/positioning.html#place-content
  'place-content-center': {
    'utility': {
      'place-content': 'center',
    },
    'meta': {
      'group': 'placeContent',
      'order': 1,
    },
  },
  'place-content-start': {
    'utility': {
      'place-content': 'start',
    },
    'meta': {
      'group': 'placeContent',
      'order': 2,
    },
  },
  'place-content-end': {
    'utility': {
      'place-content': 'end',
    },
    'meta': {
      'group': 'placeContent',
      'order': 3,
    },
  },
  'place-content-between': {
    'utility': {
      'place-content': 'space-between',
    },
    'meta': {
      'group': 'placeContent',
      'order': 4,
    },
  },
  'place-content-around': {
    'utility': {
      'place-content': 'space-around',
    },
    'meta': {
      'group': 'placeContent',
      'order': 5,
    },
  },
  'place-content-evenly': {
    'utility': {
      'place-content': 'space-evenly',
    },
    'meta': {
      'group': 'placeContent',
      'order': 6,
    },
  },
  'place-content-stretch': {
    'utility': {
      'place-content': 'stretch',
    },
    'meta': {
      'group': 'placeContent',
      'order': 7,
    },
  },

  // https://windicss.org/utilities/positioning.html#place-items
  'place-items-auto': {
    'utility': {
      'place-items': 'auto',
    },
    'meta': {
      'group': 'placeItems',
      'order': 1,
    },
  },
  'place-items-start': {
    'utility': {
      'place-items': 'start',
    },
    'meta': {
      'group': 'placeItems',
      'order': 2,
    },
  },
  'place-items-end': {
    'utility': {
      'place-items': 'end',
    },
    'meta': {
      'group': 'placeItems',
      'order': 3,
    },
  },
  'place-items-center': {
    'utility': {
      'place-items': 'center',
    },
    'meta': {
      'group': 'placeItems',
      'order': 4,
    },
  },
  'place-items-stretch': {
    'utility': {
      'place-items': 'stretch',
    },
    'meta': {
      'group': 'placeItems',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/positioning.html#place-self
  'place-self-auto': {
    'utility': {
      '-ms-grid-row-align': 'auto',
      '-ms-grid-column-align': 'auto',
      'place-self': 'auto',
    },
    'meta': {
      'group': 'placeSelf',
      'order': 1,
    },
  },
  'place-self-start': {
    'utility': {
      '-ms-grid-row-align': 'start',
      '-ms-grid-column-align': 'start',
      'place-self': 'start',
    },
    'meta': {
      'group': 'placeSelf',
      'order': 2,
    },
  },
  'place-self-end': {
    'utility': {
      '-ms-grid-row-align': 'end',
      '-ms-grid-column-align': 'end',
      'place-self': 'end',
    },
    'meta': {
      'group': 'placeSelf',
      'order': 3,
    },
  },
  'place-self-center': {
    'utility': {
      '-ms-grid-row-align': 'center',
      '-ms-grid-column-align': 'center',
      'place-self': 'center',
    },
    'meta': {
      'group': 'placeSelf',
      'order': 4,
    },
  },
  'place-self-stretch': {
    'utility': {
      '-ms-grid-row-align': 'stretch',
      '-ms-grid-column-align': 'stretch',
      'place-self': 'stretch',
    },
    'meta': {
      'group': 'placeSelf',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/typography.html#font-smoothing
  'antialiased': {
    'utility': {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    },
    'meta': {
      'group': 'fontSmoothing',
      'order': 1,
    },
  },
  'subpixel-antialiased': {
    'utility': {
      '-webkit-font-smoothing': 'auto',
      '-moz-osx-font-smoothing': 'auto',
    },
    'meta': {
      'group': 'fontSmoothing',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/typography.html#font-style
  'italic': {
    'utility': {
      'font-style': 'italic',
    },
    'meta': {
      'group': 'fontStyle',
      'order': 1,
    },
  },
  'not-italic': {
    'utility': {
      'font-style': 'normal',
    },
    'meta': {
      'group': 'fontStyle',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/typography.html#font-variant-numeric
  'normal-nums': {
    'utility': {
      'font-variant-numeric': 'normal',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 1,
    },
  },
  'ordinal': {
    'utility': {
      ...fontVariants,
      '--tw-ordinal': 'ordinal',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 2,
    },
  },
  'slashed-zero': {
    'utility': {
      ...fontVariants,
      '--tw-slashed-zero': 'slashed-zero',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 3,
    },
  },
  'lining-nums': {
    'utility': {
      ...fontVariants,
      '--tw-numeric-figure': 'lining-nums',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 4,
    },
  },
  'oldstyle-nums': {
    'utility': {
      ...fontVariants,
      '--tw-numeric-figure': 'oldstyle-nums',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 5,
    },
  },
  'proportional-nums': {
    'utility': {
      ...fontVariants,
      '--tw-numeric-spacing': 'proportional-nums',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 6,
    },
  },
  'tabular-nums': {
    'utility': {
      ...fontVariants,
      '--tw-numeric-spacing': 'tabular-nums',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 7,
    },
  },
  'diagonal-fractions': {
    'utility': {
      ...fontVariants,
      '--tw-numeric-fraction': 'diagonal-fractions',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 8,
    },
  },
  'stacked-fractions': {
    'utility': {
      ...fontVariants,
      '--tw-numeric-fraction': 'stacked-fractions',
    },
    'meta': {
      'group': 'fontVariantNumeric',
      'order': 9,
    },
  },

  // https://windicss.org/utilities/behaviors.html#list-style-position
  'list-inside': {
    'utility': {
      'list-style-position': 'inside',
    },
    'meta': {
      'group': 'listStylePosition',
      'order': 1,
    },
  },
  'list-outside': {
    'utility': {
      'list-style-position': 'outside',
    },
    'meta': {
      'group': 'listStylePosition',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/typography.html#text-alignment
  'text-left': {
    'utility': {
      'text-align': 'left',
    },
    'meta': {
      'group': 'textAlign',
      'order': 1,
    },
  },
  'text-center': {
    'utility': {
      'text-align': 'center',
    },
    'meta': {
      'group': 'textAlign',
      'order': 2,
    },
  },
  'text-right': {
    'utility': {
      'text-align': 'right',
    },
    'meta': {
      'group': 'textAlign',
      'order': 3,
    },
  },
  'text-justify': {
    'utility': {
      'text-align': 'justify',
    },
    'meta': {
      'group': 'textAlign',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/typography.html#text-decoration
  'underline': {
    'utility': {
      '-webkit-text-decoration-line': 'underline',
      'text-decoration-line': 'underline',
    },
    'meta': {
      'group': 'textDecoration',
      'order': 1,
    },
  },
  'overline': {
    'utility': {
      '-webkit-text-decoration-line': 'overline',
      'text-decoration-line': 'overline',
    },
    'meta': {
      'group': 'textDecoration',
      'order': 2,
    },
  },
  'line-through': {
    'utility': {
      '-webkit-text-decoration-line': 'line-through',
      'text-decoration-line': 'line-through',
    },
    'meta': {
      'group': 'textDecoration',
      'order': 3,
    },
  },
  'no-underline': {
    'utility': {
      'text-decoration': 'none',
    },
    'meta': {
      'group': 'textDecoration',
      'order': 4,
    },
  },

  // http://localhost:3001/utilities/typography.html#text-decoration-style
  'decoration-solid': {
    'utility': {
      '-webkit-text-decoration-style': 'solid',
      'text-decoration-style': 'solid',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 1,
    },
  },
  'decoration-double': {
    'utility': {
      '-webkit-text-decoration-style': 'double',
      'text-decoration-style': 'double',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 2,
    },
  },
  'decoration-dotted': {
    'utility': {
      '-webkit-text-decoration-style': 'dotted',
      'text-decoration-style': 'dotted',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 3,
    },
  },
  'decoration-dashed': {
    'utility': {
      '-webkit-text-decoration-style': 'dashed',
      'text-decoration-style': 'dashed',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 4,
    },
  },
  'decoration-wavy': {
    'utility': {
      '-webkit-text-decoration-style': 'wavy',
      'text-decoration-style': 'wavy',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 5,
    },
  },

  // http://localhost:3001/utilities/typography.html#text-decoration-style - Fallback to .decoration-{style}
  'underline-solid': {
    'utility': {
      '-webkit-text-decoration-style': 'solid',
      'text-decoration-style': 'solid',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 1,
    },
  },
  'underline-double': {
    'utility': {
      '-webkit-text-decoration-style': 'double',
      'text-decoration-style': 'double',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 2,
    },
  },
  'underline-dotted': {
    'utility': {
      '-webkit-text-decoration-style': 'dotted',
      'text-decoration-style': 'dotted',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 3,
    },
  },
  'underline-dashed': {
    'utility': {
      '-webkit-text-decoration-style': 'dashed',
      'text-decoration-style': 'dashed',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 4,
    },
  },
  'underline-wavy': {
    'utility': {
      '-webkit-text-decoration-style': 'wavy',
      'text-decoration-style': 'wavy',
    },
    'meta': {
      'group': 'textDecorationStyle',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/typography.html#text-transform
  'uppercase': {
    'utility': {
      'text-transform': 'uppercase',
    },
    'meta': {
      'group': 'textTransform',
      'order': 1,
    },
  },
  'lowercase': {
    'utility': {
      'text-transform': 'lowercase',
    },
    'meta': {
      'group': 'textTransform',
      'order': 2,
    },
  },
  'capitalize': {
    'utility': {
      'text-transform': 'capitalize',
    },
    'meta': {
      'group': 'textTransform',
      'order': 3,
    },
  },
  'normal-case': {
    'utility': {
      'text-transform': 'none',
    },
    'meta': {
      'group': 'textTransform',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/typography.html#text-overflow
  'truncate': {
    'utility': {
      'overflow': 'hidden',
      '-o-text-overflow': 'ellipsis',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
    },
    'meta': {
      'group': 'textOverflow',
      'order': 1,
    },
  },
  'overflow-ellipsis': {
    'utility': {
      '-o-text-overflow': 'ellipsis',
      'text-overflow': 'ellipsis',
    },
    'meta': {
      'group': 'textOverflow',
      'order': 2,
    },
  },
  'overflow-clip': {
    'utility': {
      '-o-text-overflow': 'clip',
      'text-overflow': 'clip',
    },
    'meta': {
      'group': 'textOverflow',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/typography.html#vertical-alignment
  'align-baseline': {
    'utility': {
      'vertical-align': 'baseline',
    },
    'meta': {
      'group': 'verticalAlign',
      'order': 1,
    },
  },
  'align-top': {
    'utility': {
      'vertical-align': 'top',
    },
    'meta': {
      'group': 'verticalAlign',
      'order': 2,
    },
  },
  'align-middle': {
    'utility': {
      'vertical-align': 'middle',
    },
    'meta': {
      'group': 'verticalAlign',
      'order': 3,
    },
  },
  'align-bottom': {
    'utility': {
      'vertical-align': 'bottom',
    },
    'meta': {
      'group': 'verticalAlign',
      'order': 4,
    },
  },
  'align-text-top': {
    'utility': {
      'vertical-align': 'text-top',
    },
    'meta': {
      'group': 'verticalAlign',
      'order': 5,
    },
  },
  'align-text-bottom': {
    'utility': {
      'vertical-align': 'text-bottom',
    },
    'meta': {
      'group': 'verticalAlign',
      'order': 6,
    },
  },

  // https://windicss.org/utilities/typography.html#whitespace
  'whitespace-normal': {
    'utility': {
      'white-space': 'normal',
    },
    'meta': {
      'group': 'whitespace',
      'order': 1,
    },
  },
  'whitespace-nowrap': {
    'utility': {
      'white-space': 'nowrap',
    },
    'meta': {
      'group': 'whitespace',
      'order': 2,
    },
  },
  'whitespace-pre': {
    'utility': {
      'white-space': 'pre',
    },
    'meta': {
      'group': 'whitespace',
      'order': 3,
    },
  },
  'whitespace-pre-line': {
    'utility': {
      'white-space': 'pre-line',
    },
    'meta': {
      'group': 'whitespace',
      'order': 4,
    },
  },
  'whitespace-pre-wrap': {
    'utility': {
      'white-space': 'pre-wrap',
    },
    'meta': {
      'group': 'whitespace',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/typography.html#word-break
  'break-normal': {
    'utility': {
      'word-break': 'normal',
      'overflow-wrap': 'normal',
    },
    'meta': {
      'group': 'wordBreak',
      'order': 1,
    },
  },
  'break-words': {
    'utility': {
      'overflow-wrap': 'break-word',
    },
    'meta': {
      'group': 'wordBreak',
      'order': 2,
    },
  },
  'break-all': {
    'utility': {
      'word-break': 'break-all',
    },
    'meta': {
      'group': 'wordBreak',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/typography.html#writing-mode
  'write-normal': {
    'utility': {
      '-webkit-writing-mode': 'horizontal-tb',
      '-ms-writing-mode': 'lr-tb',
      'writing-mode': 'horizontal-tb',
    },
    'meta': {
      'group': 'writingMode',
      'order': 1,
    },
  },

  'write-vertical-right': {
    'utility': {
      '-webkit-writing-mode': 'vertical-rl',
      '-ms-writing-mode': 'tb-rl',
      'writing-mode': 'vertical-rl',
    },
    'meta': {
      'group': 'writingMode',
      'order': 2,
    },
  },

  'write-vertical-left': {
    'utility': {
      '-webkit-writing-mode': 'vertical-lr',
      '-ms-writing-mode': 'tb-lr',
      'writing-mode': 'vertical-lr',
    },
    'meta': {
      'group': 'writingMode',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/typography.html#writing-orientation
  'write-orient-mixed': {
    'utility': {
      '-webkit-text-orientation': 'mixed',
      'text-orientation': 'mixed',
    },
    'meta': {
      'group': 'writingMode',
      'order': 4,
    },
  },

  'write-orient-upright': {
    'utility': {
      '-webkit-text-orientation': 'upright',
      'text-orientation': 'upright',
    },
    'meta': {
      'group': 'writingMode',
      'order': 5,
    },
  },

  'write-orient-sideways': {
    'utility': {
      '-webkit-text-orientation': 'sideways',
      'text-orientation': 'sideways',
    },
    'meta': {
      'group': 'writingMode',
      'order': 6,
    },
  },

  // https://windicss.org/utilities/typography.html#hyphens
  'hyphens-none': {
    'utility': {
      '-webkit-hyphens': 'none',
      '-ms-hyphens': 'none',
      'hyphens': 'none',
    },
    'meta': {
      'group': 'hyphens',
      'order': 1,
    },
  },
  'hyphens-manual': {
    'utility': {
      '-webkit-hyphens': 'manual',
      '-ms-hyphens': 'manual',
      'hyphens': 'manual',
    },
    'meta': {
      'group': 'hyphens',
      'order': 2,
    },
  },
  'hyphens-auto': {
    'utility': {
      '-webkit-hyphens': 'auto',
      '-ms-hyphens': 'auto',
      'hyphens': 'auto',
    },
    'meta': {
      'group': 'hyphens',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/backgrounds.html#background-attachment
  'bg-fixed': {
    'utility': {
      'background-attachment': 'fixed',
    },
    'meta': {
      'group': 'backgroundAttachment',
      'order': 1,
    },
  },
  'bg-local': {
    'utility': {
      'background-attachment': 'local',
    },
    'meta': {
      'group': 'backgroundAttachment',
      'order': 2,
    },
  },
  'bg-scroll': {
    'utility': {
      'background-attachment': 'scroll',
    },
    'meta': {
      'group': 'backgroundAttachment',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/backgrounds.html#background-clip
  'bg-clip-border': {
    'utility': {
      '-webkit-background-clip': 'border-box',
      'background-clip': 'border-box',
    },
    'meta': {
      'group': 'backgroundClip',
      'order': 1,
    },
  },
  'bg-clip-padding': {
    'utility': {
      '-webkit-background-clip': 'padding-box',
      'background-clip': 'padding-box',
    },
    'meta': {
      'group': 'backgroundClip',
      'order': 2,
    },
  },
  'bg-clip-content': {
    'utility': {
      '-webkit-background-clip': 'content-box',
      'background-clip': 'content-box',
    },
    'meta': {
      'group': 'backgroundClip',
      'order': 3,
    },
  },
  'bg-clip-text': {
    'utility': {
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
    },
    'meta': {
      'group': 'backgroundClip',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/backgrounds.html#background-repeat
  'bg-repeat': {
    'utility': {
      'background-repeat': 'repeat',
    },
    'meta': {
      'group': 'backgroundRepeat',
      'order': 1,
    },
  },
  'bg-no-repeat': {
    'utility': {
      'background-repeat': 'no-repeat',
    },
    'meta': {
      'group': 'backgroundRepeat',
      'order': 2,
    },
  },
  'bg-repeat-x': {
    'utility': {
      'background-repeat': 'repeat-x',
    },
    'meta': {
      'group': 'backgroundRepeat',
      'order': 3,
    },
  },
  'bg-repeat-y': {
    'utility': {
      'background-repeat': 'repeat-y',
    },
    'meta': {
      'group': 'backgroundRepeat',
      'order': 4,
    },
  },
  'bg-repeat-round': {
    'utility': {
      'background-repeat': 'round',
    },
    'meta': {
      'group': 'backgroundRepeat',
      'order': 5,
    },
  },
  'bg-repeat-space': {
    'utility': {
      'background-repeat': 'space',
    },
    'meta': {
      'group': 'backgroundRepeat',
      'order': 6,
    },
  },

  // https://windicss.org/utilities/backgrounds.html#background-origin
  'bg-origin-border': {
    'utility': {
      'background-origin': 'border-box',
    },
    'meta': {
      'group': 'backgroundOrigin',
      'order': 1,
    },
  },
  'bg-origin-padding': {
    'utility': {
      'background-origin': 'padding-box',
    },
    'meta': {
      'group': 'backgroundOrigin',
      'order': 2,
    },
  },
  'bg-origin-content': {
    'utility': {
      'background-origin': 'content-box',
    },
    'meta': {
      'group': 'backgroundOrigin',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/borders.html#border-style
  'border-solid': {
    'utility': {
      'border-style': 'solid',
    },
    'meta': {
      'group': 'borderStyle',
      'order': 1,
    },
  },
  'border-dashed': {
    'utility': {
      'border-style': 'dashed',
    },
    'meta': {
      'group': 'borderStyle',
      'order': 2,
    },
  },
  'border-dotted': {
    'utility': {
      'border-style': 'dotted',
    },
    'meta': {
      'group': 'borderStyle',
      'order': 3,
    },
  },
  'border-double': {
    'utility': {
      'border-style': 'double',
    },
    'meta': {
      'group': 'borderStyle',
      'order': 4,
    },
  },
  'border-none': {
    'utility': {
      'border-style': 'none',
    },
    'meta': {
      'group': 'borderStyle',
      'order': 5,
    },
  },

  // https://windicss.org/utilities/behaviors.html#image-rendering
  'image-render-auto': {
    'utility': {
      'image-rendering': 'auto',
    },
    'meta': {
      'group': 'imageRendering',
      'order': 1,
    },
  },
  'image-render-pixel': {
    'utility': {
      '-ms-interpolation-mode': 'nearest-neighbor',
      'image-rendering': ['-webkit-optimize-contrast', '-moz-crisp-edges', '-o-pixelated', 'pixelated'],
    },
    'meta': {
      'group': 'imageRendering',
      'order': 2,
    },
  },
  'image-render-edge': {
    'utility': {
      'image-rendering': 'crisp-edges',
    },
    'meta': {
      'group': 'imageRendering',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/effects.html#mix-blend-mode
  'mix-blend-normal': {
    'utility': {
      'mix-blend-mode': 'normal',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 1,
    },
  },
  'mix-blend-multiply': {
    'utility': {
      'mix-blend-mode': 'multiply',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 2,
    },
  },
  'mix-blend-screen': {
    'utility': {
      'mix-blend-mode': 'screen',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 3,
    },
  },
  'mix-blend-overlay': {
    'utility': {
      'mix-blend-mode': 'overlay',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 4,
    },
  },
  'mix-blend-darken': {
    'utility': {
      'mix-blend-mode': 'darken',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 5,
    },
  },
  'mix-blend-lighten': {
    'utility': {
      'mix-blend-mode': 'lighten',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 6,
    },
  },
  'mix-blend-color-dodge': {
    'utility': {
      'mix-blend-mode': 'color-dodge',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 7,
    },
  },
  'mix-blend-color-burn': {
    'utility': {
      'mix-blend-mode': 'color-burn',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 8,
    },
  },
  'mix-blend-hard-light': {
    'utility': {
      'mix-blend-mode': 'hard-light',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 9,
    },
  },
  'mix-blend-soft-light': {
    'utility': {
      'mix-blend-mode': 'soft-light',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 10,
    },
  },
  'mix-blend-difference': {
    'utility': {
      'mix-blend-mode': 'difference',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 11,
    },
  },
  'mix-blend-exclusion': {
    'utility': {
      'mix-blend-mode': 'exclusion',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 12,
    },
  },
  'mix-blend-hue': {
    'utility': {
      'mix-blend-mode': 'hue',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 13,
    },
  },
  'mix-blend-saturation': {
    'utility': {
      'mix-blend-mode': 'saturation',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 14,
    },
  },
  'mix-blend-color': {
    'utility': {
      'mix-blend-mode': 'color',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 15,
    },
  },
  'mix-blend-luminosity': {
    'utility': {
      'mix-blend-mode': 'luminosity',
    },
    'meta': {
      'group': 'mixBlendMode',
      'order': 16,
    },
  },
  // https://windicss.org/utilities/backgrounds.html#background-blend-mode
  'bg-blend-normal': {
    'utility': {
      'background-blend-mode': 'normal',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 1,
    },
  },
  'bg-blend-multiply': {
    'utility': {
      'background-blend-mode': 'multiply',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 2,
    },
  },
  'bg-blend-screen': {
    'utility': {
      'background-blend-mode': 'screen',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 3,
    },
  },
  'bg-blend-overlay': {
    'utility': {
      'background-blend-mode': 'overlay',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 4,
    },
  },
  'bg-blend-darken': {
    'utility': {
      'background-blend-mode': 'darken',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 5,
    },
  },
  'bg-blend-lighten': {
    'utility': {
      'background-blend-mode': 'lighten',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 6,
    },
  },
  'bg-blend-color-dodge': {
    'utility': {
      'background-blend-mode': 'color-dodge',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 7,
    },
  },
  'bg-blend-color-burn': {
    'utility': {
      'background-blend-mode': 'color-burn',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 8,
    },
  },
  'bg-blend-hard-light': {
    'utility': {
      'background-blend-mode': 'hard-light',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 9,
    },
  },
  'bg-blend-soft-light': {
    'utility': {
      'background-blend-mode': 'soft-light',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 10,
    },
  },
  'bg-blend-difference': {
    'utility': {
      'background-blend-mode': 'difference',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 11,
    },
  },
  'bg-blend-exclusion': {
    'utility': {
      'background-blend-mode': 'exclusion',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 12,
    },
  },
  'bg-blend-hue': {
    'utility': {
      'background-blend-mode': 'hue',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 13,
    },
  },
  'bg-blend-saturation': {
    'utility': {
      'background-blend-mode': 'saturation',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 14,
    },
  },
  'bg-blend-color': {
    'utility': {
      'background-blend-mode': 'color',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 15,
    },
  },
  'bg-blend-luminosity': {
    'utility': {
      'background-blend-mode': 'luminosity',
    },
    'meta': {
      'group': 'backgroundBlendMode',
      'order': 16,
    },
  },

  // https://windicss.org/utilities/filters.html#filter
  'filter': {
    'utility': {
      '--tw-blur': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-brightness': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-contrast': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-grayscale': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-hue-rotate': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-invert': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-saturate': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-sepia': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-drop-shadow': 'var(--tw-empty,/*!*/ /*!*/)',
      '-webkit-filter': 'var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)',
      'filter': 'var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)',
    },
    'meta': {
      'group': 'filter',
      'order': 1,
    },
  },

  'filter-none': {
    'utility': {
      '-webkit-filter': 'none',
      'filter': 'none',
    },
    'meta': {
      'group': 'filter',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/filters.html#backdrop-filter
  'backdrop-filter': {
    'utility': {
      '--tw-backdrop-blur': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-backdrop-brightness': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-backdrop-contrast': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-backdrop-grayscale': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-backdrop-hue-rotate': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-backdrop-invert': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-backdrop-opacity': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-backdrop-saturate': 'var(--tw-empty,/*!*/ /*!*/)',
      '--tw-backdrop-sepia': 'var(--tw-empty,/*!*/ /*!*/)',
      '-webkit-backdrop-filter': 'var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)',
      'backdrop-filter': 'var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)',
    },
    'meta': {
      'group': 'backdropFilter',
      'order': 1,
    },
  },

  'backdrop-filter-none': {
    'utility': {
      '-webkit-backdrop-filter': 'none',
      'backdrop-filter': 'none',
    },
    'meta': {
      'group': 'backdropFilter',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/tables.html#table-border-collapse
  'border-collapse': {
    'utility': {
      'border-collapse': 'collapse',
    },
    'meta': {
      'group': 'borderCollapse',
      'order': 1,
    },
  },
  'border-separate': {
    'utility': {
      'border-collapse': 'separate',
    },
    'meta': {
      'group': 'borderCollapse',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/tables.html#table-caption-side
  'caption-top': {
    'utility': {
      'caption-side': 'top',
    },
    'meta': {
      'group': 'captionSide',
      'order': 1,
    },
  },

  'caption-bottom': {
    'utility': {
      'caption-side': 'bottom',
    },
    'meta': {
      'group': 'captionSide',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/tables.html#table-empty-cells
  'empty-cells-visible': {
    'utility': {
      'empty-cells': 'show',
    },
    'meta': {
      'group': 'emptyCells',
      'order': 1,
    },
  },

  'empty-cells-hidden': {
    'utility': {
      'empty-cells': 'hide',
    },
    'meta': {
      'group': 'emptyCells',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/tables.html#table-layout
  'table-auto': {
    'utility': {
      'table-layout': 'auto',
    },
    'meta': {
      'group': 'tableLayout',
      'order': 1,
    },
  },
  'table-fixed': {
    'utility': {
      'table-layout': 'fixed',
    },
    'meta': {
      'group': 'tableLayout',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/transforms.html
  'transform': {
    'utility': {
      '--tw-translate-x': '0',
      '--tw-translate-y': '0',
      '--tw-translate-z': '0',
      '--tw-rotate': '0',
      '--tw-rotate-x': '0',
      '--tw-rotate-y': '0',
      '--tw-rotate-z': '0',
      '--tw-skew-x': '0',
      '--tw-skew-y': '0',
      '--tw-scale-x': '1',
      '--tw-scale-y': '1',
      '--tw-scale-z': '1',
      '-webkit-transform': 'translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
      '-ms-transform': 'translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
      'transform': 'translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
    },
    'meta': {
      'group': 'transform',
      'order': 1,
    },
  },
  'transform-gpu': {
    'utility': {
      '--tw-translate-x': '0',
      '--tw-translate-y': '0',
      '--tw-translate-z': '0',
      '--tw-rotate': '0',
      '--tw-rotate-x': '0',
      '--tw-rotate-y': '0',
      '--tw-rotate-z': '0',
      '--tw-skew-x': '0',
      '--tw-skew-y': '0',
      '--tw-scale-x': '1',
      '--tw-scale-y': '1',
      '--tw-scale-z': '1',
      '-webkit-transform': 'translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
      '-ms-transform': 'translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
      'transform': 'translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
    },
    'meta': {
      'group': 'transform',
      'order': 2,
    },
  },
  'transform-none': {
    'utility': {
      '-webkit-transform': 'none',
      '-ms-transform': 'none',
      'transform': 'none',
    },
    'meta': {
      'group': 'transform',
      'order': 3,
    },
  },

  // https://windicss.org/utilities/transforms.html#transform-type
  'preserve-flat': {
    'utility': {
      '-webkit-transform-style': 'flat',
      'transform-style': 'flat',
    },
    'meta': {
      'group': 'transform',
      'order': 4,
    },
  },

  'preserve-3d': {
    'utility': {
      '-webkit-transform-style': 'preserve-3d',
      'transform-style': 'preserve-3d',
    },
    'meta': {
      'group': 'transform',
      'order': 5,
    },
  },

  'animated': {
    'utility': {
      '-webkit-animation-duration': '1000ms',
      '-webkit-animation-fill-mode': 'both',
      'animation-duration': '1000ms',
      'animation-fill-mode': 'both',
    },
    'meta': {
      'group': 'animation',
      'order': 3,
    },
  },

  'animate-reverse': {
    'utility': {
      '-webkit-animation-direction': 'reverse',
      'animation-direction': 'reverse',
    },
    'meta': {
      'group': 'animation',
      'order': 4,
    },
  },

  'animate-alternate': {
    'utility': {
      '-webkit-animation-direction': 'alternate',
      'animation-direction': 'alternate',
    },
    'meta': {
      'group': 'animation',
      'order': 5,
    },
  },

  'animate-alternate-reverse': {
    'utility': {
      '-webkit-animation-direction': 'alternate-reverse',
      'animation-direction': 'alternate-reverse',
    },
    'meta': {
      'group': 'animation',
      'order': 6,
    },
  },

  'animate-fill-none': {
    'utility': {
      '-webkit-animation-fill-mode': 'none',
      'animation-fill-mode': 'none',
    },
    'meta': {
      'group': 'animation',
      'order': 7,
    },
  },

  'animate-fill-forwards': {
    'utility': {
      '-webkit-animation-fill-mode': 'forwards',
      'animation-fill-mode': 'forwards',
    },
    'meta': {
      'group': 'animation',
      'order': 8,
    },
  },

  'animate-fill-backwards': {
    'utility': {
      '-webkit-animation-fill-mode': 'backwards',
      'animation-fill-mode': 'backwards',
    },
    'meta': {
      'group': 'animation',
      'order': 9,
    },
  },

  'animate-fill-both': {
    'utility': {
      '-webkit-animation-fill-mode': 'both',
      'animation-fill-mode': 'both',
    },
    'meta': {
      'group': 'animation',
      'order': 10,
    },
  },

  'animate-paused': {
    'utility': {
      '-webkit-animation-play-state': 'paused',
      'animation-play-state': 'paused',
    },
    'meta': {
      'group': 'animation',
      'order': 11,
    },
  },

  'animate-running': {
    'utility': {
      '-webkit-animation-play-state': 'running',
      'animation-play-state': 'running',
    },
    'meta': {
      'group': 'animation',
      'order': 12,
    },
  },

  // https://windicss.org/utilities/behaviors.html#appearance
  'appearance-none': {
    'utility': {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      'appearance': 'none',
    },
    'meta': {
      'group': 'appearance',
      'order': 1,
    },
  },

  // https://windicss.org/utilities/behaviors.html#pointer-events
  'pointer-events-none': {
    'utility': {
      'pointer-events': 'none',
    },
    'meta': {
      'group': 'pointerEvents',
      'order': 1,
    },
  },
  'pointer-events-auto': {
    'utility': {
      'pointer-events': 'auto',
    },
    'meta': {
      'group': 'pointerEvents',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/behaviors.html#resize
  'resize-none': {
    'utility': {
      'resize': 'none',
    },
    'meta': {
      'group': 'resize',
      'order': 1,
    },
  },
  'resize-y': {
    'utility': {
      'resize': 'vertical',
    },
    'meta': {
      'group': 'resize',
      'order': 2,
    },
  },
  'resize-x': {
    'utility': {
      'resize': 'horizontal',
    },
    'meta': {
      'group': 'resize',
      'order': 3,
    },
  },
  'resize': {
    'utility': {
      'resize': 'both',
    },
    'meta': {
      'group': 'resize',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/behaviors.html#user-select
  'select-none': {
    'utility': {
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',
    },
    'meta': {
      'group': 'userSelect',
      'order': 1,
    },
  },
  'select-text': {
    'utility': {
      '-webkit-user-select': 'text',
      '-moz-user-select': 'text',
      '-ms-user-select': 'text',
      'user-select': 'text',
    },
    'meta': {
      'group': 'userSelect',
      'order': 2,
    },
  },
  'select-all': {
    'utility': {
      '-webkit-user-select': 'all',
      '-moz-user-select': 'all',
      '-ms-user-select': 'all',
      'user-select': 'all',
    },
    'meta': {
      'group': 'userSelect',
      'order': 3,
    },
  },
  'select-auto': {
    'utility': {
      '-webkit-user-select': 'auto',
      '-moz-user-select': 'auto',
      '-ms-user-select': 'auto',
      'user-select': 'auto',
    },
    'meta': {
      'group': 'userSelect',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/svg.html#fill-color
  // https://windicss.org/utilities/svg.html#stroke-color
  'fill-current': {
    'utility': {
      'fill': 'currentColor',
    },
    'meta': {
      'group': 'fill',
      'order': 1,
    },
  },
  'stroke-current': {
    'utility': {
      'stroke': 'currentColor',
    },
    'meta': {
      'group': 'stroke',
      'order': 1,
    },
  },
  // https://windicss.org/utilities/svg.html#stroke-linecap
  'stroke-cap-auto': {
    'utility': {
      'stroke-linecap': 'butt',
    },
    'meta': {
      'group': 'stroke',
      'order': 2,
    },
  },
  'stroke-cap-square': {
    'utility': {
      'stroke-linecap': 'square',
    },
    'meta': {
      'group': 'stroke',
      'order': 3,
    },
  },
  'stroke-cap-round': {
    'utility': {
      'stroke-linecap': 'round',
    },
    'meta': {
      'group': 'stroke',
      'order': 4,
    },
  },
  // https://windicss.org/utilities/svg.html#stroke-linejoin
  'stroke-join-auto': {
    'utility': {
      'stroke-linejoin': 'miter',
    },
    'meta': {
      'group': 'stroke',
      'order': 5,
    },
  },
  'stroke-join-arcs': {
    'utility': {
      'stroke-linejoin': 'arcs',
    },
    'meta': {
      'group': 'stroke',
      'order': 6,
    },
  },
  'stroke-join-bevel': {
    'utility': {
      'stroke-linejoin': 'bevel',
    },
    'meta': {
      'group': 'stroke',
      'order': 7,
    },
  },
  'stroke-join-clip': {
    'utility': {
      'stroke-linejoin': 'miter-clip',
    },
    'meta': {
      'group': 'stroke',
      'order': 8,
    },
  },
  'stroke-join-round': {
    'utility': {
      'stroke-linejoin': 'round',
    },
    'meta': {
      'group': 'stroke',
      'order': 9,
    },
  },
  // https://windicss.org/utilities/behaviors.html#screen-readers-access
  'sr-only': {
    'utility': {
      'position': 'absolute',
      'width': '1px',
      'height': '1px',
      'padding': '0',
      'margin': '-1px',
      'overflow': 'hidden',
      'clip': 'rect(0, 0, 0, 0)',
      'white-space': 'nowrap',
      'border-width': '0',
    },
    'meta': {
      'group': 'accessibility',
      'order': 1,
    },
  },
  'not-sr-only': {
    'utility': {
      'position': 'static',
      'width': 'auto',
      'height': 'auto',
      'padding': '0',
      'margin': '0',
      'overflow': 'visible',
      'clip': 'auto',
      'white-space': 'normal',
    },
    'meta': {
      'group': 'accessibility',
      'order': 2,
    },
  },

  // https://windicss.org/utilities/behaviors.html#will-change
  'will-change-auto': {
    'utility': {
      'will-change': 'auto',
    },
    'meta': {
      'group': 'willChange',
      'order': 1,
    },
  },
  'will-change-scroll': {
    'utility': {
      'will-change': 'scroll',
    },
    'meta': {
      'group': 'willChange',
      'order': 2,
    },
  },
  'will-change-contents': {
    'utility': {
      'will-change': 'contents',
    },
    'meta': {
      'group': 'willChange',
      'order': 3,
    },
  },
  'will-change-transform': {
    'utility': {
      'will-change': 'transform',
    },
    'meta': {
      'group': 'willChange',
      'order': 4,
    },
  },

  // https://windicss.org/utilities/behaviors.html#touch-action
  'touch-auto': {
    'utility': {
      'touch-action': 'auto',
    },
    'meta': {
      'group': 'touchAction',
      'order': 1,
    },
  },
  'touch-none': {
    'utility': {
      'touch-action': 'none',
    },
    'meta': {
      'group': 'touchAction',
      'order': 2,
    },
  },
  'touch-pan-x': {
    'utility': {
      'touch-action': 'pan-x',
    },
    'meta': {
      'group': 'touchAction',
      'order': 3,
    },
  },
  'touch-pan-left': {
    'utility': {
      'touch-action': 'pan-left',
    },
    'meta': {
      'group': 'touchAction',
      'order': 4,
    },
  },
  'touch-pan-right': {
    'utility': {
      'touch-action': 'pan-right',
    },
    'meta': {
      'group': 'touchAction',
      'order': 5,
    },
  },
  'touch-pan-y': {
    'utility': {
      'touch-action': 'pan-y',
    },
    'meta': {
      'group': 'touchAction',
      'order': 6,
    },
  },
  'touch-pan-up': {
    'utility': {
      'touch-action': 'pan-up',
    },
    'meta': {
      'group': 'touchAction',
      'order': 7,
    },
  },
  'touch-pan-down': {
    'utility': {
      'touch-action': 'pan-down',
    },
    'meta': {
      'group': 'touchAction',
      'order': 8,
    },
  },
  'touch-pinch-zoom': {
    'utility': {
      'touch-action': 'pinch-zoom',
    },
    'meta': {
      'group': 'touchAction',
      'order': 9,
    },
  },
  'touch-manipulation': {
    'utility': {
      'touch-action': 'manipulation',
    },
    'meta': {
      'group': 'touchAction',
      'order': 10,
    },
  },

  // https://windicss.org/utilities/behaviors.html#scroll-behavior
  'scroll-auto': {
    'utility': {
      'scroll-behavior': 'auto',
    },
    'meta': {
      'group': 'scrollBehavior',
      'order': 1,
    },
  },
  'scroll-smooth': {
    'utility': {
      'scroll-behavior': 'smooth',
    },
    'meta': {
      'group': 'scrollBehavior',
      'order': 2,
    },
  },
};

const variantOrder = [
  'hover',
  'focus',
  'active',
  'visited',
  'link',
  'target',
  'focus-visible',
  'focus-within',
  'checked',
  'not-checked',
  'default',
  'disabled',
  'enabled',
  'indeterminate',
  'invalid',
  'valid',
  'optional',
  'required',
  'placeholder-shown',
  'read-only',
  'read-write',
  'not-disabled',
  'first-of-type',
  'not-first-of-type',
  'last-of-type',
  'not-last-of-type',
  'first',
  'last',
  'not-first',
  'not-last',
  'only-child',
  'not-only-child',
  'only-of-type',
  'not-only-of-type',
  'even',
  'odd',
  'even-of-type',
  'odd-of-type',
  'root',
  'empty',
  'before',
  'after',
  'first-letter',
  'first-line',
  'file-selector-button',
  'file',
  'selection',
  'marker',
  'svg',
  'all',
  'children',
  'siblings',
  'sibling',
  'ltr',
  'rtl',
  'group-hover',
  'group-focus',
  'group-active',
  'group-visited',
  'motion-safe',
  'motion-reduce',
];

var layerOrder; (function (layerOrder) {
  const base = 10; layerOrder[layerOrder["base"] = base] = "base";
  const components = 150; layerOrder[layerOrder["components"] = components] = "components";
  const shortcuts = 160; layerOrder[layerOrder["shortcuts"] = shortcuts] = "shortcuts";
  const utilities = 20000; layerOrder[layerOrder["utilities"] = utilities] = "utilities";
})(layerOrder || (layerOrder = {}));

var pluginOrder; (function (pluginOrder) {
  const columns = 80; pluginOrder[pluginOrder['columns'] = columns] = 'columns';
  const container = 100; pluginOrder[pluginOrder['container'] = container] = 'container';
  const space = 200; pluginOrder[pluginOrder['space'] = space] = 'space';
  const divideWidth = 300; pluginOrder[pluginOrder['divideWidth'] = divideWidth] = 'divideWidth';
  const divideColor = 400; pluginOrder[pluginOrder['divideColor'] = divideColor] = 'divideColor';
  const divideStyle = 500; pluginOrder[pluginOrder['divideStyle'] = divideStyle] = 'divideStyle';
  const divideOpacity = 600; pluginOrder[pluginOrder['divideOpacity'] = divideOpacity] = 'divideOpacity';
  const accessibility = 700; pluginOrder[pluginOrder['accessibility'] = accessibility] = 'accessibility';
  const appearance = 800; pluginOrder[pluginOrder['appearance'] = appearance] = 'appearance';
  const backgroundAttachment = 900; pluginOrder[pluginOrder['backgroundAttachment'] = backgroundAttachment] = 'backgroundAttachment';
  const backgroundClip = 1000; pluginOrder[pluginOrder['backgroundClip'] = backgroundClip] = 'backgroundClip';
  const backgroundColor = 1100; pluginOrder[pluginOrder['backgroundColor'] = backgroundColor] = 'backgroundColor';
  const backgroundImage = 1200; pluginOrder[pluginOrder['backgroundImage'] = backgroundImage] = 'backgroundImage';
  const gradientColorStops = 1300; pluginOrder[pluginOrder['gradientColorStops'] = gradientColorStops] = 'gradientColorStops';
  const backgroundOpacity = 1400; pluginOrder[pluginOrder['backgroundOpacity'] = backgroundOpacity] = 'backgroundOpacity';
  const backgroundPosition = 1500; pluginOrder[pluginOrder['backgroundPosition'] = backgroundPosition] = 'backgroundPosition';
  const backgroundRepeat = 1600; pluginOrder[pluginOrder['backgroundRepeat'] = backgroundRepeat] = 'backgroundRepeat';
  const backgroundSize = 1700; pluginOrder[pluginOrder['backgroundSize'] = backgroundSize] = 'backgroundSize';
  const backgroundOrigin = 1750; pluginOrder[pluginOrder['backgroundOrigin'] = backgroundOrigin] = 'backgroundOrigin';
  const borderCollapse = 1800; pluginOrder[pluginOrder['borderCollapse'] = borderCollapse] = 'borderCollapse';
  const borderColor = 1900; pluginOrder[pluginOrder['borderColor'] = borderColor] = 'borderColor';
  const borderOpacity = 2000; pluginOrder[pluginOrder['borderOpacity'] = borderOpacity] = 'borderOpacity';
  const borderRadius = 2100; pluginOrder[pluginOrder['borderRadius'] = borderRadius] = 'borderRadius';
  const borderStyle = 2200; pluginOrder[pluginOrder['borderStyle'] = borderStyle] = 'borderStyle';
  const borderWidth = 2300; pluginOrder[pluginOrder['borderWidth'] = borderWidth] = 'borderWidth';
  const boxDecorationBreak = 2350; pluginOrder[pluginOrder['boxDecorationBreak'] = boxDecorationBreak] = 'boxDecorationBreak';
  const boxSizing = 2400; pluginOrder[pluginOrder['boxSizing'] = boxSizing] = 'boxSizing';
  const cursor = 2500; pluginOrder[pluginOrder['cursor'] = cursor] = 'cursor';
  const captionSide = 2550; pluginOrder[pluginOrder['captionSide'] = captionSide] = 'captionSide';
  const emptyCells = 2560; pluginOrder[pluginOrder['emptyCells'] = emptyCells] = 'emptyCells';
  const display = 2600; pluginOrder[pluginOrder['display'] = display] = 'display';
  const flexBasis = 2699; pluginOrder[pluginOrder['flexBasis'] = flexBasis] = 'flexBasis';
  const flexDirection = 2700; pluginOrder[pluginOrder['flexDirection'] = flexDirection] = 'flexDirection';
  const flexWrap = 2800; pluginOrder[pluginOrder['flexWrap'] = flexWrap] = 'flexWrap';
  const placeItems = 2900; pluginOrder[pluginOrder['placeItems'] = placeItems] = 'placeItems';
  const placeContent = 3000; pluginOrder[pluginOrder['placeContent'] = placeContent] = 'placeContent';
  const placeSelf = 3100; pluginOrder[pluginOrder['placeSelf'] = placeSelf] = 'placeSelf';
  const alignItems = 3200; pluginOrder[pluginOrder['alignItems'] = alignItems] = 'alignItems';
  const alignContent = 3300; pluginOrder[pluginOrder['alignContent'] = alignContent] = 'alignContent';
  const alignSelf = 3400; pluginOrder[pluginOrder['alignSelf'] = alignSelf] = 'alignSelf';
  const justifyItems = 3500; pluginOrder[pluginOrder['justifyItems'] = justifyItems] = 'justifyItems';
  const justifyContent = 3600; pluginOrder[pluginOrder['justifyContent'] = justifyContent] = 'justifyContent';
  const justifySelf = 3700; pluginOrder[pluginOrder['justifySelf'] = justifySelf] = 'justifySelf';
  const flex = 3800; pluginOrder[pluginOrder['flex'] = flex] = 'flex';
  const flexGrow = 3900; pluginOrder[pluginOrder['flexGrow'] = flexGrow] = 'flexGrow';
  const flexShrink = 4000; pluginOrder[pluginOrder['flexShrink'] = flexShrink] = 'flexShrink';
  const order = 4100; pluginOrder[pluginOrder['order'] = order] = 'order';
  const float = 4200; pluginOrder[pluginOrder['float'] = float] = 'float';
  const clear = 4300; pluginOrder[pluginOrder['clear'] = clear] = 'clear';
  const fontFamily = 4400; pluginOrder[pluginOrder['fontFamily'] = fontFamily] = 'fontFamily';
  const fontWeight = 4500; pluginOrder[pluginOrder['fontWeight'] = fontWeight] = 'fontWeight';
  const height = 4600; pluginOrder[pluginOrder['height'] = height] = 'height';
  const fontSize = 4700; pluginOrder[pluginOrder['fontSize'] = fontSize] = 'fontSize';
  const lineHeight = 4800; pluginOrder[pluginOrder['lineHeight'] = lineHeight] = 'lineHeight';
  const listStylePosition = 4900; pluginOrder[pluginOrder['listStylePosition'] = listStylePosition] = 'listStylePosition';
  const listStyleType = 5000; pluginOrder[pluginOrder['listStyleType'] = listStyleType] = 'listStyleType';
  const margin = 5100; pluginOrder[pluginOrder['margin'] = margin] = 'margin';
  const maxHeight = 5200; pluginOrder[pluginOrder['maxHeight'] = maxHeight] = 'maxHeight';
  const maxWidth = 5300; pluginOrder[pluginOrder['maxWidth'] = maxWidth] = 'maxWidth';
  const minHeight = 5400; pluginOrder[pluginOrder['minHeight'] = minHeight] = 'minHeight';
  const minWidth = 5500; pluginOrder[pluginOrder['minWidth'] = minWidth] = 'minWidth';
  const objectFit = 5600; pluginOrder[pluginOrder['objectFit'] = objectFit] = 'objectFit';
  const objectPosition = 5700; pluginOrder[pluginOrder['objectPosition'] = objectPosition] = 'objectPosition';
  const opacity = 5800; pluginOrder[pluginOrder['opacity'] = opacity] = 'opacity';
  const outline = 5900; pluginOrder[pluginOrder['outline'] = outline] = 'outline';
  const overflow = 6000; pluginOrder[pluginOrder['overflow'] = overflow] = 'overflow';
  const overscrollBehavior = 6100; pluginOrder[pluginOrder['overscrollBehavior'] = overscrollBehavior] = 'overscrollBehavior';
  const padding = 6200; pluginOrder[pluginOrder['padding'] = padding] = 'padding';
  const placeholderColor = 6300; pluginOrder[pluginOrder['placeholderColor'] = placeholderColor] = 'placeholderColor';
  const placeholderOpacity = 6400; pluginOrder[pluginOrder['placeholderOpacity'] = placeholderOpacity] = 'placeholderOpacity';
  const caretColor = 6450; pluginOrder[pluginOrder['caretColor'] = caretColor] = 'caretColor';
  const caretOpacity = 6460; pluginOrder[pluginOrder['caretOpacity'] = caretOpacity] = 'caretOpacity';
  const tabSize = 6470; pluginOrder[pluginOrder['tabSize'] = tabSize] = 'tabSize';
  const pointerEvents = 6500; pluginOrder[pluginOrder['pointerEvents'] = pointerEvents] = 'pointerEvents';
  const position = 6600; pluginOrder[pluginOrder['position'] = position] = 'position';
  const inset = 6700; pluginOrder[pluginOrder['inset'] = inset] = 'inset';
  const resize = 6800; pluginOrder[pluginOrder['resize'] = resize] = 'resize';
  const boxShadow = 6900; pluginOrder[pluginOrder['boxShadow'] = boxShadow] = 'boxShadow';
  const boxShadowColor = 6950; pluginOrder[pluginOrder['boxShadowColor'] = boxShadowColor] = 'boxShadowColor';
  const ringWidth = 7000; pluginOrder[pluginOrder['ringWidth'] = ringWidth] = 'ringWidth';
  const ringOffsetColor = 7100; pluginOrder[pluginOrder['ringOffsetColor'] = ringOffsetColor] = 'ringOffsetColor';
  const ringOffsetWidth = 7200; pluginOrder[pluginOrder['ringOffsetWidth'] = ringOffsetWidth] = 'ringOffsetWidth';
  const ringColor = 7300; pluginOrder[pluginOrder['ringColor'] = ringColor] = 'ringColor';
  const ringOpacity = 7400; pluginOrder[pluginOrder['ringOpacity'] = ringOpacity] = 'ringOpacity';
  const fill = 7500; pluginOrder[pluginOrder['fill'] = fill] = 'fill';
  const stroke = 7600; pluginOrder[pluginOrder['stroke'] = stroke] = 'stroke';
  const strokeWidth = 7700; pluginOrder[pluginOrder['strokeWidth'] = strokeWidth] = 'strokeWidth';
  const strokeDashArray = 7750; pluginOrder[pluginOrder['strokeDashArray'] = strokeDashArray] = 'strokeDashArray';
  const strokeDashOffset = 7760; pluginOrder[pluginOrder['strokeDashOffset'] = strokeDashOffset] = 'strokeDashOffset';
  const tableLayout = 7800; pluginOrder[pluginOrder['tableLayout'] = tableLayout] = 'tableLayout';
  const textAlign = 7900; pluginOrder[pluginOrder['textAlign'] = textAlign] = 'textAlign';
  const textColor = 8000; pluginOrder[pluginOrder['textColor'] = textColor] = 'textColor';
  const textOpacity = 8100; pluginOrder[pluginOrder['textOpacity'] = textOpacity] = 'textOpacity';
  const textOverflow = 8200; pluginOrder[pluginOrder['textOverflow'] = textOverflow] = 'textOverflow';
  const textShadow = 8250; pluginOrder[pluginOrder['textShadow'] = textShadow] = 'textShadow';
  const fontStyle = 8300; pluginOrder[pluginOrder['fontStyle'] = fontStyle] = 'fontStyle';
  const textTransform = 8400; pluginOrder[pluginOrder['textTransform'] = textTransform] = 'textTransform';
  const textDecorationStyle = 8450; pluginOrder[pluginOrder['textDecorationStyle'] = textDecorationStyle] = 'textDecorationStyle';
  const textDecorationLength = 8455; pluginOrder[pluginOrder['textDecorationLength'] = textDecorationLength] = 'textDecorationLength';
  const textDecorationColor = 8460; pluginOrder[pluginOrder['textDecorationColor'] = textDecorationColor] = 'textDecorationColor';
  const textDecorationOpacity = 8470; pluginOrder[pluginOrder['textDecorationOpacity'] = textDecorationOpacity] = 'textDecorationOpacity';
  const textDecorationOffset = 8480; pluginOrder[pluginOrder['textDecorationOffset'] = textDecorationOffset] = 'textDecorationOffset';
  const textDecorationThickness = 8490; pluginOrder[pluginOrder['textDecorationThickness'] = textDecorationThickness] = 'textDecorationThickness';
  const textDecoration = 8500; pluginOrder[pluginOrder['textDecoration'] = textDecoration] = 'textDecoration';
  const textIndent = 8550; pluginOrder[pluginOrder['textIndent'] = textIndent] = 'textIndent';
  const textStrokeColor = 8560; pluginOrder[pluginOrder['textStrokeColor'] = textStrokeColor] = 'textStrokeColor';
  const textStrokeWidth = 8570; pluginOrder[pluginOrder['textStrokeWidth'] = textStrokeWidth] = 'textStrokeWidth';
  const content = 8580; pluginOrder[pluginOrder['content'] = content] = 'content';
  const fontSmoothing = 8600; pluginOrder[pluginOrder['fontSmoothing'] = fontSmoothing] = 'fontSmoothing';
  const fontVariantNumeric = 8700; pluginOrder[pluginOrder['fontVariantNumeric'] = fontVariantNumeric] = 'fontVariantNumeric';
  const letterSpacing = 8800; pluginOrder[pluginOrder['letterSpacing'] = letterSpacing] = 'letterSpacing';
  const userSelect = 8900; pluginOrder[pluginOrder['userSelect'] = userSelect] = 'userSelect';
  const verticalAlign = 9000; pluginOrder[pluginOrder['verticalAlign'] = verticalAlign] = 'verticalAlign';
  const visibility = 9100; pluginOrder[pluginOrder['visibility'] = visibility] = 'visibility';
  const backfaceVisibility = 9150; pluginOrder[pluginOrder['backfaceVisibility'] = backfaceVisibility] = 'backfaceVisibility';
  const whitespace = 9200; pluginOrder[pluginOrder['whitespace'] = whitespace] = 'whitespace';
  const wordBreak = 9300; pluginOrder[pluginOrder['wordBreak'] = wordBreak] = 'wordBreak';
  const writingMode = 9340; pluginOrder[pluginOrder['writingMode'] = writingMode] = 'writingMode';
  const hyphens = 9350; pluginOrder[pluginOrder['hyphens'] = hyphens] = 'hyphens';
  const width = 9400; pluginOrder[pluginOrder['width'] = width] = 'width';
  const zIndex = 9500; pluginOrder[pluginOrder['zIndex'] = zIndex] = 'zIndex';
  const isolation = 9550; pluginOrder[pluginOrder['isolation'] = isolation] = 'isolation';
  const gap = 9600; pluginOrder[pluginOrder['gap'] = gap] = 'gap';
  const gridAutoFlow = 9700; pluginOrder[pluginOrder['gridAutoFlow'] = gridAutoFlow] = 'gridAutoFlow';
  const gridTemplateColumns = 9800; pluginOrder[pluginOrder['gridTemplateColumns'] = gridTemplateColumns] = 'gridTemplateColumns';
  const gridAutoColumns = 9900; pluginOrder[pluginOrder['gridAutoColumns'] = gridAutoColumns] = 'gridAutoColumns';
  const gridColumn = 10000; pluginOrder[pluginOrder['gridColumn'] = gridColumn] = 'gridColumn';
  const gridColumnStart = 10100; pluginOrder[pluginOrder['gridColumnStart'] = gridColumnStart] = 'gridColumnStart';
  const gridColumnEnd = 10200; pluginOrder[pluginOrder['gridColumnEnd'] = gridColumnEnd] = 'gridColumnEnd';
  const gridTemplateRows = 10300; pluginOrder[pluginOrder['gridTemplateRows'] = gridTemplateRows] = 'gridTemplateRows';
  const gridAutoRows = 10400; pluginOrder[pluginOrder['gridAutoRows'] = gridAutoRows] = 'gridAutoRows';
  const gridRow = 10500; pluginOrder[pluginOrder['gridRow'] = gridRow] = 'gridRow';
  const gridRowStart = 10600; pluginOrder[pluginOrder['gridRowStart'] = gridRowStart] = 'gridRowStart';
  const gridRowEnd = 10700; pluginOrder[pluginOrder['gridRowEnd'] = gridRowEnd] = 'gridRowEnd';
  const transform = 10800; pluginOrder[pluginOrder['transform'] = transform] = 'transform';
  const transformOrigin = 10900; pluginOrder[pluginOrder['transformOrigin'] = transformOrigin] = 'transformOrigin';
  const scale = 11000; pluginOrder[pluginOrder['scale'] = scale] = 'scale';
  const rotate = 11100; pluginOrder[pluginOrder['rotate'] = rotate] = 'rotate';
  const translate = 11200; pluginOrder[pluginOrder['translate'] = translate] = 'translate';
  const skew = 11300; pluginOrder[pluginOrder['skew'] = skew] = 'skew';
  const perspective = 11350; pluginOrder[pluginOrder['perspective'] = perspective] = 'perspective';
  const perspectiveOrigin = 11360; pluginOrder[pluginOrder['perspectiveOrigin'] = perspectiveOrigin] = 'perspectiveOrigin';
  const transitionProperty = 11400; pluginOrder[pluginOrder['transitionProperty'] = transitionProperty] = 'transitionProperty';
  const transitionTimingFunction = 11500; pluginOrder[pluginOrder['transitionTimingFunction'] = transitionTimingFunction] = 'transitionTimingFunction';
  const transitionDuration = 11600; pluginOrder[pluginOrder['transitionDuration'] = transitionDuration] = 'transitionDuration';
  const transitionDelay = 11700; pluginOrder[pluginOrder['transitionDelay'] = transitionDelay] = 'transitionDelay';
  const keyframes = 11800; pluginOrder[pluginOrder['keyframes'] = keyframes] = 'keyframes';
  const animation = 11900; pluginOrder[pluginOrder['animation'] = animation] = 'animation';
  const imageRendering = 11950; pluginOrder[pluginOrder['imageRendering'] = imageRendering] = 'imageRendering';
  const mixBlendMode = 12000; pluginOrder[pluginOrder['mixBlendMode'] = mixBlendMode] = 'mixBlendMode';
  const backgroundBlendMode = 12100; pluginOrder[pluginOrder['backgroundBlendMode'] = backgroundBlendMode] = 'backgroundBlendMode';
  const filter = 12200; pluginOrder[pluginOrder['filter'] = filter] = 'filter';
  const blur = 12300; pluginOrder[pluginOrder['blur'] = blur] = 'blur';
  const brightness = 12400; pluginOrder[pluginOrder['brightness'] = brightness] = 'brightness';
  const contrast = 12500; pluginOrder[pluginOrder['contrast'] = contrast] = 'contrast';
  const dropShadow = 12600; pluginOrder[pluginOrder['dropShadow'] = dropShadow] = 'dropShadow';
  const grayscale = 12700; pluginOrder[pluginOrder['grayscale'] = grayscale] = 'grayscale';
  const hueRotate = 12800; pluginOrder[pluginOrder['hueRotate'] = hueRotate] = 'hueRotate';
  const invert = 12900; pluginOrder[pluginOrder['invert'] = invert] = 'invert';
  const saturate = 13000; pluginOrder[pluginOrder['saturate'] = saturate] = 'saturate';
  const sepia = 13100; pluginOrder[pluginOrder['sepia'] = sepia] = 'sepia';
  const backdropFilter = 13200; pluginOrder[pluginOrder['backdropFilter'] = backdropFilter] = 'backdropFilter';
  const backdropBlur = 13300; pluginOrder[pluginOrder['backdropBlur'] = backdropBlur] = 'backdropBlur';
  const backdropBrightness = 13400; pluginOrder[pluginOrder['backdropBrightness'] = backdropBrightness] = 'backdropBrightness';
  const backdropContrast = 13500; pluginOrder[pluginOrder['backdropContrast'] = backdropContrast] = 'backdropContrast';
  const backdropGrayscale = 13600; pluginOrder[pluginOrder['backdropGrayscale'] = backdropGrayscale] = 'backdropGrayscale';
  const backdropHueRotate = 13700; pluginOrder[pluginOrder['backdropHueRotate'] = backdropHueRotate] = 'backdropHueRotate';
  const backdropInvert = 13800; pluginOrder[pluginOrder['backdropInvert'] = backdropInvert] = 'backdropInvert';
  const backdropOpacity = 13900; pluginOrder[pluginOrder['backdropOpacity'] = backdropOpacity] = 'backdropOpacity';
  const backdropSaturate = 14000; pluginOrder[pluginOrder['backdropSaturate'] = backdropSaturate] = 'backdropSaturate';
  const backdropSepia = 14100; pluginOrder[pluginOrder['backdropSepia'] = backdropSepia] = 'backdropSepia';
  const willChange = 14200; pluginOrder[pluginOrder['willChange'] = willChange] = 'willChange';
  const touchAction = 14300; pluginOrder[pluginOrder['touchAction'] = touchAction] = 'touchAction';
  const scrollBehavior = 14400; pluginOrder[pluginOrder['scrollBehavior'] = scrollBehavior] = 'scrollBehavior';
  const accentColor = 14500; pluginOrder[pluginOrder['accentColor'] = accentColor] = 'accentColor';
})(pluginOrder || (pluginOrder = {}));

function _nullishCoalesce$2(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$1(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



function isNumberLead(i) {
  return /^\d/.test(i) ? i : undefined;
}

function notNumberLead(i) {
  return /^\d/.test(i) ? undefined : i;
}

// https://windicss.org/utilities/container.html
function container(utility, { theme }) {
  if (utility.raw === 'container') {
    const className = utility.class;
    const baseStyle = new Container(utility.class, new Property('width', '100%'));
    const paddingDefault = toType(theme('container.padding'), 'string') ? toType(theme('container.padding'), 'string') : toType(theme('container.padding.DEFAULT'), 'string');

    if (paddingDefault) {
      baseStyle.add(new Property('padding-left', paddingDefault));
      baseStyle.add(new Property('padding-right', paddingDefault));
    }

    const center = theme('container.center');

    if (center && typeof center === 'boolean'){
      baseStyle.add(new Property(['margin-left', 'margin-right'], 'auto'));
    }

    const output = [baseStyle];
    const screens = toType(theme('container.screens', theme('screens')), 'object');

    for (const [screen, size] of Object.entries(screens)) {
      if (!isString(size)) continue;
      const props = [new Property('max-width', `${size}`)];
      const padding = theme(`container.padding.${screen}`);
      if (padding && typeof padding === 'string') {
        props.push(new Property('padding-left', padding));
        props.push(new Property('padding-right', padding));
      }
      output.push(new Container(className, props).atRule(`@media (min-width: ${size})`));
    }

    output.forEach(style => style.updateMeta('utilities', 'container', pluginOrder.container, 0, true));

    return output;
  }
}

// https://windicss.org/utilities/positioning.html#object-position
function objectPosition(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _ => _.handler
, 'access', _2 => _2.handleBody, 'call', _3 => _3(theme('objectPosition'))
, 'access', _4 => _4.createProperty, 'call', _5 => _5(['-o-object-position', 'object-position'])
, 'optionalAccess', _6 => _6.updateMeta, 'call', _7 => _7('utilities', 'objectPosition', pluginOrder.objectPosition, 0, true)]);
}

// https://windicss.org/utilities/positioning.html#top-right-bottom-left
function inset(utility, { theme }) {
  return utility.handler
    .handleStatic(theme('inset'))
    .handleSquareBrackets()
    .handleSpacing()
    .handleFraction()
    .handleSize()
    .handleNegative()
    .handleVariable()
    .callback(value => {
      switch (utility.identifier) {
      case 'top':
      case 'right':
      case 'bottom':
      case 'left':
        return new Property(utility.identifier, value).updateMeta('utilities', 'inset', pluginOrder.inset, 4, true);
      case 'inset':
        if (utility.raw.match(/^-?inset-x/)) return new Property(['right', 'left'], value).updateMeta('utilities', 'inset', pluginOrder.inset, 3, true);
        if (utility.raw.match(/^-?inset-y/)) return new Property(['top', 'bottom'], value).updateMeta('utilities', 'inset', pluginOrder.inset, 2, true);
        return new Property(['top', 'right', 'bottom', 'left'], value).updateMeta('utilities', 'inset', pluginOrder.inset, 1, true);
      }
    });
}

// https://windicss.org/utilities/positioning.html#z-index
function zIndex(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _8 => _8.handler
, 'access', _9 => _9.handleStatic, 'call', _10 => _10(theme('zIndex'))
, 'access', _11 => _11.handleNumber, 'call', _12 => _12(0, 99999, 'int')
, 'access', _13 => _13.handleNegative, 'call', _14 => _14()
, 'access', _15 => _15.handleVariable, 'call', _16 => _16()
, 'access', _17 => _17.createProperty, 'call', _18 => _18('z-index')
, 'optionalAccess', _19 => _19.updateMeta, 'call', _20 => _20('utilities', 'zIndex', pluginOrder.zIndex, 0, true)]);
}

// https://windicss.org/utilities/flexbox.html#flex
// https://windicss.org/utilities/flexbox.html#flex-grow
// https://windicss.org/utilities/flexbox.html#flex-shrink
function flex(utility, { theme }) {
  const className = utility.raw;
  if (className.startsWith('flex-grow')) {
    const map = toType(theme('flexGrow'), 'object') ;
    const amount = className.replace(/flex-grow-?/, '') || 'DEFAULT';
    if (Object.keys(map).includes(amount)) return new Property(['-webkit-box-flex', '-ms-flex-positive', '-webkit-flex-grow', 'flex-grow'], map[amount]).toStyle(utility.class).updateMeta('utilities', 'flexGrow', pluginOrder.flexGrow, 0, true);
    return _optionalChain$1([utility, 'access', _21 => _21.handler, 'access', _22 => _22.handleSquareBrackets, 'call', _23 => _23(), 'access', _24 => _24.createProperty, 'call', _25 => _25(['-webkit-box-flex', '-ms-flex-positive', '-webkit-flex-grow', 'flex-grow']), 'optionalAccess', _26 => _26.updateMeta, 'call', _27 => _27('utilities', 'flexGrow', pluginOrder.flexGrow, 1, true)]);
  } else if (className.startsWith('flex-shrink')) {
    const map = toType(theme('flexShrink'), 'object') ;
    const amount = className.replace(/flex-shrink-?/, '') || 'DEFAULT';
    if (Object.keys(map).includes(amount)) return new Property(['-ms-flex-negative', '-webkit-flex-shrink', 'flex-shrink'], map[amount]).toStyle(utility.class).updateMeta('utilities', 'flexShrink', pluginOrder.flexShrink, 0, true);
    return _optionalChain$1([utility, 'access', _28 => _28.handler, 'access', _29 => _29.handleSquareBrackets, 'call', _30 => _30(), 'access', _31 => _31.createProperty, 'call', _32 => _32(['-ms-flex-negative', '-webkit-flex-shrink', 'flex-shrink']), 'optionalAccess', _33 => _33.updateMeta, 'call', _34 => _34('utilities', 'flexShrink', pluginOrder.flexShrink, 1, true)]);
  } else {
    return _optionalChain$1([utility, 'access', _35 => _35.handler, 'access', _36 => _36.handleStatic, 'call', _37 => _37(theme('flex')), 'access', _38 => _38.handleSquareBrackets, 'call', _39 => _39(), 'access', _40 => _40.createStyle, 'call', _41 => _41(utility.class, value => {
      value = value.trim();
      return [
        new Property('-webkit-box-flex', value.startsWith('0') || value === 'none' ? '0' : '1'),
        new Property(['-ms-flex', '-webkit-flex', 'flex'], value),
      ];
    }), 'optionalAccess', _42 => _42.updateMeta, 'call', _43 => _43('utilities', 'flex', pluginOrder.flex, 0, true)]);
  }
}

// https://windicss.org/utilities/flexbox.html#flex-basis
function basis(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _44 => _44.handler
, 'access', _45 => _45.handleStatic, 'call', _46 => _46(theme('spacing'))
, 'access', _47 => _47.handleNumber, 'call', _48 => _48(1, Infinity, undefined, number => `${number / 4}rem`)
, 'access', _49 => _49.handleSize, 'call', _50 => _50()
, 'access', _51 => _51.handleFraction, 'call', _52 => _52()
, 'access', _53 => _53.handleVariable, 'call', _54 => _54()
, 'access', _55 => _55.handleSquareBrackets, 'call', _56 => _56()
, 'access', _57 => _57.createProperty, 'call', _58 => _58('flex-basis')
, 'optionalAccess', _59 => _59.updateMeta, 'call', _60 => _60('utilities', 'flexBasis', pluginOrder.flexBasis, 1, true)]);
}

// https://windicss.org/utilities/positioning.html#order
function order(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _61 => _61.handler
, 'access', _62 => _62.handleStatic, 'call', _63 => _63(theme('order'))
, 'access', _64 => _64.handleNumber, 'call', _65 => _65(1, 9999, 'int')
, 'access', _66 => _66.handleNegative, 'call', _67 => _67()
, 'access', _68 => _68.handleVariable, 'call', _69 => _69()
, 'access', _70 => _70.createStyle, 'call', _71 => _71(utility.class, (value) => [
      new Property('-webkit-box-ordinal-group', value.includes('var') ? `calc(${value}+1)` : (parseInt(value) + 1).toString()),
      new Property(['-webkit-order', '-ms-flex-order', 'order'], value),
    ])
, 'optionalAccess', _72 => _72.updateMeta, 'call', _73 => _73('utilities', 'order', pluginOrder.order, utility.raw.charAt(0) === '-' ? 2 : 1, true)]);
}

// https://windicss.org/utilities/grid.html#grid-template-columns
// https://windicss.org/utilities/grid.html#grid-template-rows
function gridTemplate(utility, { theme }) {
  const type = utility.raw.match(/^grid-rows-/) ? 'rows' : utility.raw.match(/^grid-cols-/) ? 'columns' : undefined;
  if (!type) return;
  const group = type === 'rows'? 'gridTemplateRows' : 'gridTemplateColumns';
  return _optionalChain$1([utility, 'access', _74 => _74.handler
, 'access', _75 => _75.handleStatic, 'call', _76 => _76(theme(group))
, 'access', _77 => _77.handleSquareBrackets, 'call', _78 => _78(i => i.replace(/\(.*?\)|,/g, (r) => r === ',' ? ' ' : r /* ignore content inside nested-brackets */ ))
, 'access', _79 => _79.createProperty, 'call', _80 => _80(`grid-template-${type}`, (value) => value === 'none' ? 'none' : value)
, 'optionalAccess', _81 => _81.updateMeta, 'call', _82 => _82('utilities', group, pluginOrder[group], 1, true)])
  || _optionalChain$1([utility, 'access', _83 => _83.handler
, 'access', _84 => _84.handleNumber, 'call', _85 => _85(1, undefined, 'int')
, 'access', _86 => _86.handleVariable, 'call', _87 => _87()
, 'access', _88 => _88.createProperty, 'call', _89 => _89(`grid-template-${type}`, (value) => `repeat(${value}, minmax(0, 1fr))`)
, 'optionalAccess', _90 => _90.updateMeta, 'call', _91 => _91('utilities', group, pluginOrder[group], 2, true)]);
}

// https://windicss.org/utilities/grid.html#grid-column-span
// https://windicss.org/utilities/grid.html#grid-column-start
// https://windicss.org/utilities/grid.html#grid-column-end
function gridColumn(utility, { theme }) {
  const body = utility.body;
  // col span
  const spans = toType(theme('gridColumn'), 'object') ;
  if (Object.keys(spans).includes(body)) return new Property(['-ms-grid-column-span', 'grid-column'], spans[body]).updateMeta('utilities', 'gridColumn', pluginOrder.gridColumn, 1, true);
  if (utility.raw.startsWith('col-span')) {
    return _optionalChain$1([utility, 'access', _92 => _92.handler
, 'access', _93 => _93.handleNumber, 'call', _94 => _94(1, undefined, 'int')
, 'access', _95 => _95.handleVariable, 'call', _96 => _96()
, 'access', _97 => _97.createProperty, 'call', _98 => _98(['-ms-grid-column-span', 'grid-column'], (value) => `span ${value} / span ${value}`)
, 'optionalAccess', _99 => _99.updateMeta, 'call', _100 => _100('utilities', 'gridColumn', pluginOrder.gridColumn, 1, true)]);
  }
  // col end
  if (utility.raw.startsWith('col-end')) {
    return _optionalChain$1([utility, 'access', _101 => _101.handler
, 'access', _102 => _102.handleStatic, 'call', _103 => _103(theme('gridColumnEnd'))
, 'access', _104 => _104.handleSquareBrackets, 'call', _105 => _105()
, 'access', _106 => _106.handleNumber, 'call', _107 => _107(1, undefined, 'int')
, 'access', _108 => _108.handleVariable, 'call', _109 => _109()
, 'access', _110 => _110.createProperty, 'call', _111 => _111('grid-column-end')
, 'optionalAccess', _112 => _112.updateMeta, 'call', _113 => _113('utilities', 'gridColumnEnd', pluginOrder.gridColumnEnd, 1, true)]);
  }
  // col start
  if (utility.raw.startsWith('col-start')) {
    return _optionalChain$1([utility, 'access', _114 => _114.handler
, 'access', _115 => _115.handleStatic, 'call', _116 => _116(theme('gridColumnStart'))
, 'access', _117 => _117.handleSquareBrackets, 'call', _118 => _118()
, 'access', _119 => _119.handleNumber, 'call', _120 => _120(1, undefined, 'int')
, 'access', _121 => _121.handleVariable, 'call', _122 => _122()
, 'access', _123 => _123.createProperty, 'call', _124 => _124('grid-column-start')
, 'optionalAccess', _125 => _125.updateMeta, 'call', _126 => _126('utilities', 'gridColumnStart', pluginOrder.gridColumnStart, 1, true)]);
  }
  return _optionalChain$1([utility, 'access', _127 => _127.handler
, 'access', _128 => _128.handleSquareBrackets, 'call', _129 => _129()
, 'access', _130 => _130.createProperty, 'call', _131 => _131(['-ms-grid-column-span', 'grid-column'], (value) => `span ${value} / span ${value}`)
, 'optionalAccess', _132 => _132.updateMeta, 'call', _133 => _133('utilities', 'gridColumn', pluginOrder.gridColumn, 1, true)]);
}

// https://windicss.org/utilities/grid.html#grid-row-span
// https://windicss.org/utilities/grid.html#grid-row-start
// https://windicss.org/utilities/grid.html#grid-row-end
function gridRow(utility, { theme }) {
  const body = utility.body;
  // row span
  const spans = toType(theme('gridRow'), 'object') ;
  if (Object.keys(spans).includes(body)) return new Property(['-ms-grid-row-span', 'grid-row'], spans[body]).updateMeta('utilities', 'gridRow', pluginOrder.gridRow, 1, true);
  if (utility.raw.startsWith('row-span')) {
    return _optionalChain$1([utility, 'access', _134 => _134.handler
, 'access', _135 => _135.handleNumber, 'call', _136 => _136(1, undefined, 'int')
, 'access', _137 => _137.handleVariable, 'call', _138 => _138()
, 'access', _139 => _139.createProperty, 'call', _140 => _140(['-ms-grid-row-span', 'grid-row'], (value) => `span ${value} / span ${value}`)
, 'optionalAccess', _141 => _141.updateMeta, 'call', _142 => _142('utilities', 'gridRow', pluginOrder.gridRow, 2, true)]);
  }
  // row end
  if (utility.raw.startsWith('row-end')) {
    return _optionalChain$1([utility, 'access', _143 => _143.handler
, 'access', _144 => _144.handleStatic, 'call', _145 => _145(theme('gridRowEnd'))
, 'access', _146 => _146.handleSquareBrackets, 'call', _147 => _147()
, 'access', _148 => _148.handleNumber, 'call', _149 => _149(1, undefined, 'int')
, 'access', _150 => _150.handleVariable, 'call', _151 => _151()
, 'access', _152 => _152.createProperty, 'call', _153 => _153('grid-row-end')
, 'optionalAccess', _154 => _154.updateMeta, 'call', _155 => _155('utilities', 'gridRowEnd', pluginOrder.gridRowEnd, 1, true)]);
  }
  // row start
  if (utility.raw.startsWith('row-start')) {
    return _optionalChain$1([utility, 'access', _156 => _156.handler
, 'access', _157 => _157.handleStatic, 'call', _158 => _158(theme('gridRowStart'))
, 'access', _159 => _159.handleSquareBrackets, 'call', _160 => _160()
, 'access', _161 => _161.handleNumber, 'call', _162 => _162(1, undefined, 'int')
, 'access', _163 => _163.handleVariable, 'call', _164 => _164()
, 'access', _165 => _165.createProperty, 'call', _166 => _166('grid-row-start')
, 'optionalAccess', _167 => _167.updateMeta, 'call', _168 => _168('utilities', 'gridRowStart', pluginOrder.gridRowStart, 1, true)]);
  }
  return _optionalChain$1([utility, 'access', _169 => _169.handler
, 'access', _170 => _170.handleSquareBrackets, 'call', _171 => _171()
, 'access', _172 => _172.createProperty, 'call', _173 => _173(['-ms-grid-row-span', 'grid-row'], (value) => `span ${value} / span ${value}`)
, 'optionalAccess', _174 => _174.updateMeta, 'call', _175 => _175('utilities', 'gridRow', pluginOrder.gridRow, 2, true)]);
}

// https://windicss.org/utilities/grid.html#grid-auto-columns
// https://windicss.org/utilities/grid.html#grid-auto-rows
function gridAuto(utility, { theme }) {
  const type = utility.raw.startsWith('auto-cols') ? 'columns' : utility.raw.startsWith('auto-rows') ? 'rows' : undefined;
  if (!type) return;
  const group = type === 'columns' ? 'gridAutoColumns' : 'gridAutoRows';
  const value = utility.handler.handleStatic(theme(group)).value;
  if (value) {
    const prefixer = minMaxContent(value);
    if (typeof prefixer === 'string') return new Property(`grid-auto-${type}`, prefixer).updateMeta('utilities', group, pluginOrder[group], 1, true);
    return new Style(utility.class, prefixer.map((i) => new Property(`grid-auto-${type}`, i))).updateMeta('utilities', group, pluginOrder[group], 2, true);
  }
}

// https://windicss.org/utilities/grid.html#gap
function gap(utility, { theme, config }) {
  return utility.handler
    .handleStatic(theme('gap'))
    .handleSquareBrackets()
    .handleSpacing()
    .handleSize()
    .handleVariable()
    .callback(value => {
      if (utility.raw.match(/^gap-x-/)) return new Property(config('prefixer') ? ['-webkit-column-gap', '-moz-column-gap', 'grid-column-gap', 'column-gap'] : 'column-gap', value).updateMeta('utilities', 'gap', pluginOrder.gap, 2, true);
      if (utility.raw.match(/^gap-y-/)) return new Property(config('prefixer') ? ['-webkit-row-gap', '-moz-row-gap', 'grid-row-gap', 'row-gap'] : 'row-gap', value).updateMeta('utilities', 'gap', pluginOrder.gap, 3, true);
      return new Property(config('prefixer') ? ['grid-gap', 'gap'] : 'gap', value).updateMeta('utilities', 'gap', pluginOrder.gap, 1, true);
    });
}

// https://windicss.org/utilities/columns.html
function columns(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _176 => _176.handler
, 'access', _177 => _177.handleStatic, 'call', _178 => _178(theme('columns'))
, 'access', _179 => _179.handleSquareBrackets, 'call', _180 => _180()
, 'access', _181 => _181.handleSize, 'call', _182 => _182()
, 'access', _183 => _183.handleNxl, 'call', _184 => _184((number) => `${(number - 3) * 8 + 48}rem`)
, 'access', _185 => _185.handleVariable, 'call', _186 => _186()
, 'access', _187 => _187.createProperty, 'call', _188 => _188('columns')
, 'optionalAccess', _189 => _189.updateMeta, 'call', _190 => _190('utilities', 'columns', pluginOrder.columns, 1, true)]);
}

// https://windicss.org/utilities/spacing.html#padding
function padding(utility, { theme }) {
  return utility.handler
    .handleStatic(theme('padding'))
    .handleSquareBrackets()
    .handleSpacing()
    .handleFraction()
    .handleSize()
    .handleVariable()
    .callback(value => {
      const directions = expandDirection(utility.identifier.substring(1), false);
      if (directions) {
        if (directions[0] === '*') return new Property('padding', value).updateMeta('utilities', 'padding', pluginOrder.padding, -4, true);
        return new Property(directions.map((i) => `padding-${i}`), value).updateMeta('utilities', 'padding', pluginOrder.padding, -directions.length, true);
      }
    });
}

// https://windicss.org/utilities/spacing.html#margin
function margin(utility, { theme }) {
  return utility.handler
    .handleStatic(theme('margin'))
    .handleSquareBrackets()
    .handleSpacing()
    .handleFraction()
    .handleSize()
    .handleNegative()
    .handleVariable()
    .callback(value => {
      const directions = expandDirection(utility.identifier.substring(1), false);
      if (directions) {
        if (directions[0] === '*') return new Property('margin', value).updateMeta('utilities', 'margin', pluginOrder.margin, -4, true);
        return new Property(directions.map((i) => `margin-${i}`), value).updateMeta('utilities', 'margin', pluginOrder.margin, -directions.length, true);
      }
    });
}

// https://windicss.org/utilities/spacing.html#space-between-y
function space(utility, { theme }) {
  if (utility.raw === 'space-x-reverse') {
    return new Style(utility.class, [
      new Property('--tw-space-x-reverse', '1'),
    ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'space', pluginOrder.space, 6, true);
  }
  if (utility.raw === 'space-y-reverse') {
    return new Style(utility.class, [
      new Property('--tw-space-y-reverse', '1'),
    ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'space', pluginOrder.space, 5, true);
  }
  return utility.handler
    .handleStatic(theme('space'))
    .handleSquareBrackets()
    .handleSpacing()
    .handleSize()
    .handleNegative()
    .handleVariable()
    .callback(value => {
      if (utility.raw.match(/^-?space-x-/)) {
        return new Style(utility.class, [
          new Property('--tw-space-x-reverse', '0'),
          new Property('margin-right', `calc(${value} * var(--tw-space-x-reverse))`),
          new Property('margin-left', `calc(${value} * calc(1 - var(--tw-space-x-reverse)))`),
        ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'space', pluginOrder.space, (utility.raw.charAt(0) === '-' ? 4 : 2), true);
      }
      if (utility.raw.match(/^-?space-y-/)) {
        return new Style(utility.class, [
          new Property('--tw-space-y-reverse', '0'),
          new Property('margin-top', `calc(${value} * calc(1 - var(--tw-space-y-reverse)))`),
          new Property('margin-bottom', `calc(${value} * var(--tw-space-y-reverse))`),
        ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'space', pluginOrder.space, (utility.raw.charAt(0) === '-' ? 3 : 1), true);
      }
    });
}

// https://windicss.org/utilities/sizing.html#width
// https://windicss.org/utilities/sizing.html#height
function size(utility, { theme }) {
  const name = utility.identifier === 'w' ? 'width' : 'height';
  const body = utility.body;
  const sizes = toType(theme(name), 'object') ;
  // handle static
  if (Object.keys(sizes).includes(body)) {
    const value = sizes[body];
    if (value === 'min-content') {
      return new Style(utility.class, [
        new Property(name, '-webkit-min-content'),
        new Property(name, '-moz-min-content'),
        new Property(name, 'min-content'),
      ]).updateMeta('utilities', name, pluginOrder[name], 2, true);
    }
    if (value === 'max-content') {
      return new Style(utility.class, [
        new Property(name, '-webkit-max-content'),
        new Property(name, '-moz-max-content'),
        new Property(name, 'max-content'),
      ]).updateMeta('utilities', name, pluginOrder[name], 3, true);
    }
    return new Style(utility.class, new Property(name, value)).updateMeta('utilities', name, pluginOrder[name], 1, true);
  }
  return _optionalChain$1([utility, 'access', _191 => _191.handler
, 'access', _192 => _192.handleSquareBrackets, 'call', _193 => _193()
, 'access', _194 => _194.handleSpacing, 'call', _195 => _195()
, 'access', _196 => _196.handleFraction, 'call', _197 => _197()
, 'access', _198 => _198.handleSize, 'call', _199 => _199()
, 'access', _200 => _200.handleNxl, 'call', _201 => _201((number) => `${(number - 3) * 8 + 48}rem`)
, 'access', _202 => _202.handleVariable, 'call', _203 => _203()
, 'access', _204 => _204.createProperty, 'call', _205 => _205(name)
, 'optionalAccess', _206 => _206.updateMeta, 'call', _207 => _207('utilities', name, pluginOrder[name], 4, true)]);
}

// https://windicss.org/utilities/sizing.html#min-width
// https://windicss.org/utilities/sizing.html#min-height
// https://windicss.org/utilities/sizing.html#max-width
// https://windicss.org/utilities/sizing.html#max-height
function minMaxSize(utility, { theme }) {
  if (!utility.raw.match(/^(min|max)-[w|h]-/))
    return;
  const body = utility.raw.replace(/^(min|max)-[w|h]-/, '');
  const prop = utility.raw.substring(0, 5).replace('h', 'height').replace('w', 'width');
  const group = dashToCamel(prop) ;
  const sizes = toType(theme(group), 'object') ;
  // handle static
  if (Object.keys(sizes).includes(body)) {
    const value = sizes[body];
    if (value === 'min-content') {
      return new Style(utility.class, [
        new Property(prop, '-webkit-min-content'),
        new Property(prop, '-moz-min-content'),
        new Property(prop, 'min-content'),
      ]).updateMeta('utilities', group, pluginOrder[group], 2, true);
    }
    if (value === 'max-content') {
      return new Style(utility.class, [
        new Property(prop, '-webkit-max-content'),
        new Property(prop, '-moz-max-content'),
        new Property(prop, 'max-content'),
      ]).updateMeta('utilities', group, pluginOrder[group], 3, true);
    }
    return new Style(utility.class, new Property(prop, value)).updateMeta('utilities', group, pluginOrder[group], 1, true);
  }

  return _optionalChain$1([utility, 'access', _208 => _208.handler
, 'access', _209 => _209.handleSquareBrackets, 'call', _210 => _210()
, 'access', _211 => _211.handleSpacing, 'call', _212 => _212()
, 'access', _213 => _213.handleFraction, 'call', _214 => _214()
, 'access', _215 => _215.handleSize, 'call', _216 => _216()
, 'access', _217 => _217.handleNxl, 'call', _218 => _218((number) => `${(number - 3) * 8 + 48}rem`)
, 'access', _219 => _219.handleVariable, 'call', _220 => _220()
, 'access', _221 => _221.createProperty, 'call', _222 => _222(prop)
, 'optionalAccess', _223 => _223.updateMeta, 'call', _224 => _224('utilities', group, pluginOrder[group], 4, true)]);
}

// https://windicss.org/utilities/typography.html#text-opacity
// https://windicss.org/utilities/typography.html#text-shadow
// https://windicss.org/utilities/typography.html#text-stroke
// https://windicss.org/utilities/typography.html#text-color
// https://windicss.org/utilities/typography.html#font-size
function text(utility, { theme }) {
  // handle font opacity
  if (utility.raw.startsWith('text-opacity')) {
    return _optionalChain$1([utility, 'access', _225 => _225.handler
, 'access', _226 => _226.handleStatic, 'call', _227 => _227(theme('textOpacity'))
, 'access', _228 => _228.handleNumber, 'call', _229 => _229(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _230 => _230.handleVariable, 'call', _231 => _231()
, 'access', _232 => _232.createProperty, 'call', _233 => _233('--tw-text-opacity')
, 'optionalAccess', _234 => _234.updateMeta, 'call', _235 => _235('utilities', 'textOpacity', pluginOrder.textOpacity, 1, true)]);
  }
  if (utility.raw.startsWith('text-shadow')) {
    return _optionalChain$1([(utility.raw === 'text-shadow'
      ? new Property('text-shadow', theme('textShadow.DEFAULT', '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)') )
      : utility.handler
        .handleStatic(theme('textShadow'))
        .createProperty('text-shadow')
    ), 'optionalAccess', _236 => _236.updateMeta, 'call', _237 => _237('utilities', 'textShadow', pluginOrder.textShadow, 1, true)]);
  }
  if (utility.raw.startsWith('text-stroke')) {
    if (utility.raw === 'text-stroke') return new Style('text-stroke', [
      new Property('-webkit-text-stroke-color', theme('textStrokeColor.DEFAULT', '#e4e4e7') ),
      new Property('-webkit-text-stroke-width', theme('textStrokeWidth.DEFAULT', 'medium') ),
    ]).updateMeta('utilities', 'textStrokeColor', pluginOrder.textStrokeColor, 1, true);

    if (utility.raw.startsWith('text-stroke-opacity')) {
      return _optionalChain$1([utility, 'access', _238 => _238.handler
, 'access', _239 => _239.handleStatic, 'call', _240 => _240(theme('opacity'))
, 'access', _241 => _241.handleNumber, 'call', _242 => _242(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _243 => _243.handleVariable, 'call', _244 => _244()
, 'access', _245 => _245.createProperty, 'call', _246 => _246('--tw-ring-offset-opacity')
, 'optionalAccess', _247 => _247.updateMeta, 'call', _248 => _248('utilities', 'textStrokeColor', pluginOrder.textStrokeColor, 3, true)]);
    }

    return _optionalChain$1([utility, 'access', _249 => _249.clone, 'call', _250 => _250('textStroke' + utility.raw.slice(11)), 'access', _251 => _251.handler
, 'access', _252 => _252.handleColor, 'call', _253 => _253(theme('textStrokeColor'))
, 'access', _254 => _254.handleOpacity, 'call', _255 => _255(theme('opacity'))
, 'access', _256 => _256.handleVariable, 'call', _257 => _257()
, 'access', _258 => _258.createColorStyle, 'call', _259 => _259(utility.class, '-webkit-text-stroke-color', '--tw-text-stroke-opacity')
, 'optionalAccess', _260 => _260.updateMeta, 'call', _261 => _261('utilities', 'textStrokeColor', pluginOrder.textStrokeColor, 2, true)])
  || _optionalChain$1([utility, 'access', _262 => _262.handler
, 'access', _263 => _263.handleStatic, 'call', _264 => _264(theme('textStrokeWidth'))
, 'access', _265 => _265.handleNumber, 'call', _266 => _266(0, undefined, 'int', (number) => `${number}px`)
, 'access', _267 => _267.handleSize, 'call', _268 => _268()
, 'access', _269 => _269.createProperty, 'call', _270 => _270('-webkit-text-stroke-width')
, 'optionalAccess', _271 => _271.updateMeta, 'call', _272 => _272('utilities', 'textStrokeWidth', pluginOrder.textStrokeWidth, 1, true)]);
  }
  // handle text colors
  const textColor = _optionalChain$1([utility, 'access', _273 => _273.handler
, 'access', _274 => _274.handleColor, 'call', _275 => _275(theme('textColor'))
, 'access', _276 => _276.handleOpacity, 'call', _277 => _277(theme('textOpacity'))
, 'access', _278 => _278.handleSquareBrackets, 'call', _279 => _279(notNumberLead)
, 'access', _280 => _280.handleVariable, 'call', _281 => _281()
, 'access', _282 => _282.createColorStyle, 'call', _283 => _283(utility.class, 'color', '--tw-text-opacity')
, 'optionalAccess', _284 => _284.updateMeta, 'call', _285 => _285('utilities', 'textColor', pluginOrder.textColor, 0, true)]);
  if (textColor) return textColor;

  // handle font sizes
  const amount = utility.amount;
  const fontSizes = toType(theme('fontSize'), 'object') ;
  if (Object.keys(fontSizes).includes(amount)) return new Style(utility.class, generateFontSize(fontSizes[amount])).updateMeta('utilities', 'fontSize', pluginOrder.fontSize, 1, true);
  let value = utility.handler
    .handleSquareBrackets(isNumberLead)
    .handleNxl((number) => `${number}rem`)
    .handleSize()
    .value;
  if (utility.raw.startsWith('text-size-$')) value = utility.handler.handleVariable().value;
  if (value) return new Style(utility.class, [ new Property('font-size', value), new Property('line-height', '1') ]).updateMeta('utilities', 'fontSize', pluginOrder.fontSize, 2, true);
}

// https://windicss.org/utilities/typography.html#font-family
// https://windicss.org/utilities/typography.html#font-weight
function font(utility, { theme }) {
  const fonts = theme('fontFamily') ;
  const map = {};
  for (const [key, value] of Object.entries(fonts)) {
    map[key] = Array.isArray(value)? value.join(',') : value;
  }
  return (
    _optionalChain$1([utility, 'access', _286 => _286.handler
, 'access', _287 => _287.handleStatic, 'call', _288 => _288(map)
, 'access', _289 => _289.createProperty, 'call', _290 => _290('font-family')
, 'optionalAccess', _291 => _291.updateMeta, 'call', _292 => _292('utilities', 'fontFamily', pluginOrder.fontFamily, 1, true)])
    || _optionalChain$1([utility, 'access', _293 => _293.handler
, 'access', _294 => _294.handleStatic, 'call', _295 => _295(theme('fontWeight'))
, 'access', _296 => _296.handleNumber, 'call', _297 => _297(0, 900, 'int')
, 'access', _298 => _298.handleVariable, 'call', _299 => _299()
, 'access', _300 => _300.createProperty, 'call', _301 => _301('font-weight')
, 'optionalAccess', _302 => _302.updateMeta, 'call', _303 => _303('utilities', 'fontWeight', pluginOrder.fontWeight, 1, true)])
  );
}

// https://windicss.org/utilities/typography.html#letter-spacing
function letterSpacing(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _304 => _304.handler
, 'access', _305 => _305.handleStatic, 'call', _306 => _306(theme('letterSpacing'))
, 'access', _307 => _307.handleSquareBrackets, 'call', _308 => _308()
, 'access', _309 => _309.handleSize, 'call', _310 => _310()
, 'access', _311 => _311.handleNegative, 'call', _312 => _312()
, 'access', _313 => _313.handleVariable, 'call', _314 => _314()
, 'access', _315 => _315.createProperty, 'call', _316 => _316('letter-spacing')
, 'optionalAccess', _317 => _317.updateMeta, 'call', _318 => _318('utilities', 'letterSpacing', pluginOrder.letterSpacing, 1, true)]);
}

// https://windicss.org/utilities/typography.html#text-decoration
function textDecoration(utility, { theme }) {
  return (
    // .decoration-{color}/{opacity}
    _optionalChain$1([utility, 'access', _319 => _319.handler
, 'access', _320 => _320.handleColor, 'call', _321 => _321(theme('textDecorationColor'))
, 'access', _322 => _322.handleOpacity, 'call', _323 => _323(theme('textDecorationOpacity'))
, 'access', _324 => _324.handleSquareBrackets, 'call', _325 => _325(notNumberLead)
, 'access', _326 => _326.handleVariable, 'call', _327 => _327()
, 'access', _328 => _328.createColorStyle, 'call', _329 => _329(utility.class, ['-webkit-text-decoration-color', 'text-decoration-color'], '--tw-text-decoration-opacity')
, 'optionalAccess', _330 => _330.updateMeta, 'call', _331 => _331('utilities', 'textDecorationColor', pluginOrder.textDecorationColor, 1, true)])
    // .decoration-{thickness}
    || _optionalChain$1([utility, 'access', _332 => _332.handler
, 'access', _333 => _333.handleStatic, 'call', _334 => _334(theme('textDecorationThickness'))
, 'access', _335 => _335.handleNumber, 'call', _336 => _336(0, undefined, 'int', number => `${number}px`)
, 'access', _337 => _337.handleSize, 'call', _338 => _338()
, 'access', _339 => _339.createProperty, 'call', _340 => _340('text-decoration-thickness')
, 'optionalAccess', _341 => _341.updateMeta, 'call', _342 => _342('utilities', 'textDecorationThickness', pluginOrder.textDecorationThickness, 1, true)])
  );
}

// https://windicss.org/utilities/typography.html#text-decoration
function textUnderline(utility, { theme }) {
  // .underline-offset-{offset}
  if (utility.raw.startsWith('underline-offset')) {
    return _optionalChain$1([utility, 'access', _343 => _343.handler
, 'access', _344 => _344.handleStatic, 'call', _345 => _345(theme('textDecorationOffset'))
, 'access', _346 => _346.handleNumber, 'call', _347 => _347(0, undefined, 'int', number => `${number}px`)
, 'access', _348 => _348.handleSize, 'call', _349 => _349()
, 'access', _350 => _350.createProperty, 'call', _351 => _351('text-underline-offset')
, 'optionalAccess', _352 => _352.updateMeta, 'call', _353 => _353('utilities', 'textDecorationOffset', pluginOrder.textDecorationOffset, 1, true)]);
  }

  // .underline-opacity-{opacity} - This is a fallback for .decoration-{color}/{opacity}
  if (utility.raw.startsWith('underline-opacity')) {
    return _optionalChain$1([utility, 'access', _354 => _354.handler
, 'access', _355 => _355.handleStatic, 'call', _356 => _356(theme('textDecorationOpacity'))
, 'access', _357 => _357.handleNumber, 'call', _358 => _358(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _359 => _359.handleVariable, 'call', _360 => _360()
, 'access', _361 => _361.createProperty, 'call', _362 => _362('--tw-line-opacity')
, 'optionalAccess', _363 => _363.updateMeta, 'call', _364 => _364('utilities', 'textDecorationOpacity', pluginOrder.textDecorationOpacity, 1, true)]);
  }

  // .underline-{color} - This is a fallback for .decoration-{color} to avoid breaking changes
  // .underline-{thickness} - This is a fallback for .decoration-{thickness} to avoid breaking changes
  return _optionalChain$1([utility, 'access', _365 => _365.handler
, 'access', _366 => _366.handleColor, 'call', _367 => _367(theme('textDecorationColor'))
, 'access', _368 => _368.handleOpacity, 'call', _369 => _369(theme('opacity'))
, 'access', _370 => _370.handleVariable, 'call', _371 => _371()
, 'access', _372 => _372.createColorStyle, 'call', _373 => _373(utility.class, ['-webkit-text-decoration-color', 'text-decoration-color'], '--tw-line-opacity')
, 'optionalAccess', _374 => _374.updateMeta, 'call', _375 => _375('utilities', 'textDecorationColor', pluginOrder.textDecorationColor, 0, true)])
  || _optionalChain$1([utility, 'access', _376 => _376.handler
, 'access', _377 => _377.handleStatic, 'call', _378 => _378(theme('textDecorationLength'))
, 'access', _379 => _379.handleNumber, 'call', _380 => _380(0, undefined, 'int', (number) => `${number}px`)
, 'access', _381 => _381.handleSize, 'call', _382 => _382()
, 'access', _383 => _383.createProperty, 'call', _384 => _384('text-decoration-thickness')
, 'optionalAccess', _385 => _385.updateMeta, 'call', _386 => _386('utilities', 'textDecorationLength', pluginOrder.textDecorationLength, 1, true)]);
}

// https://windicss.org/utilities/typography.html#line-height
function lineHeight(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _387 => _387.handler
, 'access', _388 => _388.handleStatic, 'call', _389 => _389(theme('lineHeight'))
, 'access', _390 => _390.handleNumber, 'call', _391 => _391(0, undefined, 'int', (number) => `${number * 0.25}rem`)
, 'access', _392 => _392.handleSquareBrackets, 'call', _393 => _393()
, 'access', _394 => _394.handleSize, 'call', _395 => _395()
, 'access', _396 => _396.handleVariable, 'call', _397 => _397()
, 'access', _398 => _398.createProperty, 'call', _399 => _399('line-height')
, 'optionalAccess', _400 => _400.updateMeta, 'call', _401 => _401('utilities', 'lineHeight', pluginOrder.lineHeight, 1, true)]);
}

// https://windicss.org/utilities/behaviors.html#list-style-type
function listStyleType(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _402 => _402.handler
, 'access', _403 => _403.handleBody, 'call', _404 => _404(theme('listStyleType'))
, 'access', _405 => _405.createProperty, 'call', _406 => _406('list-style-type')
, 'optionalAccess', _407 => _407.updateMeta, 'call', _408 => _408('utilities', 'listStyleType', pluginOrder.listStyleType, 1, true)]);
}

// https://windicss.org/utilities/behaviors.html#placeholder-color
// https://windicss.org/utilities/behaviors.html#placeholder-opacity
function placeholder(utility, { theme, config }) {
  // handle placeholder opacity
  if (utility.raw.startsWith('placeholder-opacity')) {
    return utility.handler
      .handleStatic(theme('placeholderOpacity'))
      .handleSquareBrackets()
      .handleNumber(0, 100, 'int', (number) => (number / 100).toString())
      .handleVariable()
      .callback(value => generatePlaceholder(utility.class, new Property('--tw-placeholder-opacity', value), config('prefixer') )
        .map(style => style.updateMeta('utilities', 'placeholderOpacity', pluginOrder.placeholderOpacity, 1, true)));
  }
  const color = utility.handler
    .handleColor(theme('placeholderColor'))
    .handleOpacity(theme('placeholderOpacity'))
    .handleSquareBrackets()
    .handleVariable()
    .createColorStyle(utility.class, 'color', '--tw-placeholder-opacity');
  if (color) return generatePlaceholder(color.selector || '', color.property, config('prefixer') ).map(i => i.updateMeta('utilities', 'placeholderColor', pluginOrder.placeholderColor, 2, true));
}

// https://windicss.org/utilities/behaviors.html#caret-color
// https://windicss.org/utilities/behaviors.html#caret-opacity
function caret(utility, { theme }) {
  // handle caret opacity
  if (utility.raw.startsWith('caret-opacity')) {
    return _optionalChain$1([utility, 'access', _409 => _409.handler
, 'access', _410 => _410.handleStatic, 'call', _411 => _411(theme('caretOpacity'))
, 'access', _412 => _412.handleNumber, 'call', _413 => _413(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _414 => _414.handleVariable, 'call', _415 => _415()
, 'access', _416 => _416.createProperty, 'call', _417 => _417('--tw-caret-opacity')
, 'optionalAccess', _418 => _418.updateMeta, 'call', _419 => _419('utilities', 'caretOpacity', pluginOrder.caretOpacity, 1, true)]);
  }
  return _optionalChain$1([utility, 'access', _420 => _420.handler
, 'access', _421 => _421.handleColor, 'call', _422 => _422(theme('caretColor'))
, 'access', _423 => _423.handleOpacity, 'call', _424 => _424(theme('caretOpacity'))
, 'access', _425 => _425.handleVariable, 'call', _426 => _426()
, 'access', _427 => _427.createColorStyle, 'call', _428 => _428(utility.class, 'caret-color', '--tw-caret-opacity')
, 'optionalAccess', _429 => _429.updateMeta, 'call', _430 => _430('utilities', 'caretColor', pluginOrder.caretColor, 0, true)]);
}

// https://windicss.org/utilities/typography.html#tab-size
function tabSize(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _431 => _431.handler
, 'access', _432 => _432.handleStatic, 'call', _433 => _433(theme('tabSize'))
, 'access', _434 => _434.handleNumber, 'call', _435 => _435(0, undefined, 'int')
, 'access', _436 => _436.handleSize, 'call', _437 => _437()
, 'access', _438 => _438.createProperty, 'call', _439 => _439(['-moz-tab-size', '-o-tab-size', 'tab-size'])
, 'optionalAccess', _440 => _440.updateMeta, 'call', _441 => _441('utilities', 'tabSize', pluginOrder.tabSize, 1, true)]);
}

// https://windicss.org/utilities/typography.html#text-indent
function textIndent(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _442 => _442.handler
, 'access', _443 => _443.handleStatic, 'call', _444 => _444(theme('textIndent'))
, 'access', _445 => _445.handleSize, 'call', _446 => _446()
, 'access', _447 => _447.handleFraction, 'call', _448 => _448()
, 'access', _449 => _449.handleNegative, 'call', _450 => _450()
, 'access', _451 => _451.createProperty, 'call', _452 => _452('text-indent')
, 'optionalAccess', _453 => _453.updateMeta, 'call', _454 => _454('utilities', 'textIndent', pluginOrder.textIndent, 1, true)]);
}

// https://windicss.org/utilities/backgrounds.html#background-color
// https://windicss.org/utilities/backgrounds.html#background-opacity
// https://windicss.org/utilities/backgrounds.html#background-position
// https://windicss.org/utilities/backgrounds.html#background-size
// https://windicss.org/utilities/backgrounds.html#background-image
function background(utility, { theme }) {
  const body = utility.body;
  // handle background positions
  const positions = toType(theme('backgroundPosition'), 'object') ;
  if (Object.keys(positions).includes(body)) return new Property('background-position', positions[body]).updateMeta('utilities', 'backgroundPosition', pluginOrder.backgroundPosition, 1, true);
  // handle background sizes
  const sizes = toType(theme('backgroundSize'), 'object') ;
  if (Object.keys(sizes).includes(body)) return new Property('background-size', sizes[body]).updateMeta('utilities', 'backgroundSize', pluginOrder.backgroundSize, 1, true);
  // handle background image
  const images = toType(theme('backgroundImage'), 'object') ;
  if (Object.keys(images).includes(body)) {
    const prefixer = linearGradient(images[body]);
    if (Array.isArray(prefixer)) return new Style(utility.class, prefixer.map((i) => new Property('background-image', i))).updateMeta('utilities', 'backgroundImage', pluginOrder.backgroundImage, 2, true);
    return new Property('background-image', prefixer).updateMeta('utilities', 'backgroundImage', pluginOrder.backgroundImage, 1, true);
  }
  // handle background opacity
  if (utility.raw.startsWith('bg-opacity'))
    return _optionalChain$1([utility, 'access', _455 => _455.handler
, 'access', _456 => _456.handleStatic, 'call', _457 => _457(theme('backgroundOpacity'))
, 'access', _458 => _458.handleSquareBrackets, 'call', _459 => _459()
, 'access', _460 => _460.handleNumber, 'call', _461 => _461(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _462 => _462.handleVariable, 'call', _463 => _463()
, 'access', _464 => _464.createProperty, 'call', _465 => _465('--tw-bg-opacity')
, 'optionalAccess', _466 => _466.updateMeta, 'call', _467 => _467('utilities', 'backgroundOpacity', pluginOrder.backgroundOpacity, 1, true)]);

  // handle background color
  return _optionalChain$1([utility, 'access', _468 => _468.handler
, 'access', _469 => _469.handleColor, 'call', _470 => _470(theme('backgroundColor'))
, 'access', _471 => _471.handleOpacity, 'call', _472 => _472(theme('backgroundOpacity'))
, 'access', _473 => _473.handleSquareBrackets, 'call', _474 => _474(notNumberLead)
, 'access', _475 => _475.handleVariable, 'call', _476 => _476()
, 'access', _477 => _477.createColorStyle, 'call', _478 => _478(utility.class, 'background-color', '--tw-bg-opacity')
, 'optionalAccess', _479 => _479.updateMeta, 'call', _480 => _480('utilities', 'backgroundColor', pluginOrder.backgroundColor, 0, true)]);
}

// https://windicss.org/utilities/backgrounds.html#gradient-from
function gradientColorFrom(utility, { theme }) {
  if (utility.raw.startsWith('from-opacity')) {
    return _optionalChain$1([utility, 'access', _481 => _481.handler
, 'access', _482 => _482.handleStatic, 'call', _483 => _483(theme('opacity'))
, 'access', _484 => _484.handleNumber, 'call', _485 => _485(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _486 => _486.handleVariable, 'call', _487 => _487()
, 'access', _488 => _488.createProperty, 'call', _489 => _489('--tw-from-opacity')
, 'optionalAccess', _490 => _490.updateMeta, 'call', _491 => _491('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 2, true)]);
  }
  const handler = utility.handler.handleColor(theme('gradientColorStops')).handleOpacity(theme('opacity')).handleVariable().handleSquareBrackets();
  if (handler.color || handler.value) {
    return new Style(utility.class, [
      new Property('--tw-gradient-from', handler.createColorValue('var(--tw-from-opacity, 1)')),
      new Property('--tw-gradient-stops', 'var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0))'),
    ]).updateMeta('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 1, true);
  }
}

// https://windicss.org/utilities/backgrounds.html#gradient-via
function gradientColorVia(utility, { theme }) {
  if (utility.raw.startsWith('via-opacity')) {
    return _optionalChain$1([utility, 'access', _492 => _492.handler
, 'access', _493 => _493.handleStatic, 'call', _494 => _494(theme('opacity'))
, 'access', _495 => _495.handleNumber, 'call', _496 => _496(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _497 => _497.handleVariable, 'call', _498 => _498()
, 'access', _499 => _499.createProperty, 'call', _500 => _500('--tw-via-opacity')
, 'optionalAccess', _501 => _501.updateMeta, 'call', _502 => _502('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 4, true)]);
  }
  const handler = utility.handler.handleColor(theme('gradientColorStops')).handleOpacity(theme('opacity')).handleVariable().handleSquareBrackets();
  if (handler.color || handler.value) {
    return _optionalChain$1([new Style(utility.class,
      new Property('--tw-gradient-stops', `var(--tw-gradient-from), ${handler.createColorValue('var(--tw-via-opacity, 1)')}, var(--tw-gradient-to, rgba(255, 255, 255, 0))`)
    ), 'optionalAccess', _503 => _503.updateMeta, 'call', _504 => _504('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 3, true)]);
  }
}

// https://windicss.org/utilities/backgrounds.html#gradient-to
function gradientColorTo(utility, { theme }) {
  if (utility.raw.startsWith('to-opacity')) {
    return _optionalChain$1([utility, 'access', _505 => _505.handler
, 'access', _506 => _506.handleStatic, 'call', _507 => _507(theme('opacity'))
, 'access', _508 => _508.handleNumber, 'call', _509 => _509(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _510 => _510.handleVariable, 'call', _511 => _511()
, 'access', _512 => _512.createProperty, 'call', _513 => _513('--tw-to-opacity')
, 'optionalAccess', _514 => _514.updateMeta, 'call', _515 => _515('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 6, true)]);
  }
  const handler = utility.handler.handleColor(theme('gradientColorStops')).handleOpacity(theme('opacity')).handleVariable().handleSquareBrackets();
  if (handler.color || handler.value) {
    return _optionalChain$1([new Style(utility.class,
      new Property('--tw-gradient-to', handler.createColorValue('var(--tw-to-opacity, 1)'))
    ), 'optionalAccess', _516 => _516.updateMeta, 'call', _517 => _517('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 5, true)]);
  }
}

// https://windicss.org/utilities/borders.html#border-radius
function borderRadius(utility, { theme }) {
  const raw = [ 'rounded', 'rounded-t', 'rounded-l', 'rounded-r', 'rounded-b', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl' ].includes(utility.raw) ? utility.raw + '-DEFAULT' : utility.raw;
  utility = utility.clone(raw);
  const directions = expandDirection(_optionalChain$1([raw, 'access', _518 => _518.match, 'call', _519 => _519(/rounded-[trbl][trbl]?-/), 'optionalAccess', _520 => _520[0], 'access', _521 => _521.slice, 'call', _522 => _522(8, -1)]) || '', true);
  if (!directions) return;
  return _optionalChain$1([utility, 'access', _523 => _523.handler
, 'access', _524 => _524.handleStatic, 'call', _525 => _525(theme('borderRadius'))
, 'access', _526 => _526.handleSquareBrackets, 'call', _527 => _527()
, 'access', _528 => _528.handleFraction, 'call', _529 => _529()
, 'access', _530 => _530.handleNxl, 'call', _531 => _531((number) => `${number * 0.5}rem`)
, 'access', _532 => _532.handleSize, 'call', _533 => _533()
, 'access', _534 => _534.handleVariable, 'call', _535 => _535()
, 'access', _536 => _536.createProperty, 'call', _537 => _537(directions[0] === '*' ? 'border-radius' : directions.map((i) => `border-${i}-radius`))
, 'optionalAccess', _538 => _538.updateMeta, 'call', _539 => _539('utilities', 'borderRadius', pluginOrder.borderRadius, -(directions[0] === '*' ? 3 : directions.length), true)]);
}

// https://windicss.org/utilities/borders.html#border-width
// https://windicss.org/utilities/borders.html#border-color
// https://windicss.org/utilities/borders.html#border-opacity
function border(utility, { theme }) {
  // handle border opacity
  if (utility.raw.startsWith('border-opacity')) {
    return _optionalChain$1([utility, 'access', _540 => _540.handler
, 'access', _541 => _541.handleStatic, 'call', _542 => _542(theme('borderOpacity'))
, 'access', _543 => _543.handleNumber, 'call', _544 => _544(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _545 => _545.handleVariable, 'call', _546 => _546()
, 'access', _547 => _547.createProperty, 'call', _548 => _548('--tw-border-opacity')
, 'optionalAccess', _549 => _549.updateMeta, 'call', _550 => _550('utilities', 'borderOpacity', pluginOrder.borderOpacity, 1, true)]);
  }

  // handle border color
  const borderColor = _optionalChain$1([utility, 'access', _551 => _551.handler
, 'access', _552 => _552.handleColor, 'call', _553 => _553(theme('borderColor'))
, 'access', _554 => _554.handleOpacity, 'call', _555 => _555(theme('borderOpacity'))
, 'access', _556 => _556.handleSquareBrackets, 'call', _557 => _557(notNumberLead)
, 'access', _558 => _558.handleVariable, 'call', _559 => _559((variable) => utility.raw.startsWith('border-$') ? `var(--${variable})` : undefined)
, 'access', _560 => _560.createColorStyle, 'call', _561 => _561(utility.class, 'border-color', '--tw-border-opacity')
, 'optionalAccess', _562 => _562.updateMeta, 'call', _563 => _563('utilities', 'borderColor', pluginOrder.borderColor, 2, true)]);
  if (borderColor) return borderColor;

  // handle border width
  const directions = _nullishCoalesce$2(expandDirection(utility.raw.substring(7, 8), false), () => ( [ '*' ]));
  const borders = toType(theme('borderWidth'), 'object') ;
  const raw = [ 'border', 'border-t', 'border-r', 'border-b', 'border-l' ].includes(utility.raw) ? `${utility.raw}-${_nullishCoalesce$2(borders.DEFAULT, () => ( '1px'))}` : utility.raw;

  // handle border side color
  const borderSide = utility.clone(raw.slice(7)).handler
    .handleColor(theme('borderColor'))
    .handleOpacity(theme('borderOpacity'));

  if (borderSide.value || borderSide.color) {
    if (borderSide.opacity) {
      return new Property(`border-${directions[0]}-color`, borderSide.createColorValue(borderSide.opacity)).updateMeta('utilities', 'borderColor', pluginOrder.borderColor, 4, true);
    }
    return _optionalChain$1([borderSide, 'access', _564 => _564.createColorStyle, 'call', _565 => _565(utility.class, `border-${directions[0]}-color`, '--tw-border-opacity'), 'optionalAccess', _566 => _566.updateMeta, 'call', _567 => _567('utilities', 'borderColor', pluginOrder.borderColor, 3, true)]);
  }

  utility = utility.clone(raw);
  return _optionalChain$1([utility, 'access', _568 => _568.handler
, 'access', _569 => _569.handleStatic, 'call', _570 => _570(borders)
, 'access', _571 => _571.handleSquareBrackets, 'call', _572 => _572()
, 'access', _573 => _573.handleNumber, 'call', _574 => _574(0, undefined, 'int', (number) => /^border(-[tlbr])?$/.test(utility.key)? `${number}px`: undefined)
, 'access', _575 => _575.handleSize, 'call', _576 => _576()
, 'access', _577 => _577.handleVariable, 'call', _578 => _578()
, 'access', _579 => _579.createProperty, 'call', _580 => _580(directions[0] === '*' ? 'border-width' : directions.map((i) => `border-${i}-width`))
, 'optionalAccess', _581 => _581.updateMeta, 'call', _582 => _582('utilities', 'borderWidth', pluginOrder.borderWidth, (directions[0] === '*' ? 1 : (directions.length + 1)), true)]);
}

// https://windicss.org/utilities/borders.html#divide-width
// https://windicss.org/utilities/borders.html#divide-color
// https://windicss.org/utilities/borders.html#divide-opacity
// https://windicss.org/utilities/borders.html#divide-style
function divide(utility, { theme }) {
  // handle divide style
  if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(utility.amount)) return new Property('border-style', utility.amount).toStyle(utility.class).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideStyle', pluginOrder.divideStyle, 1, true);
  // handle divide opacity
  if (utility.raw.startsWith('divide-opacity'))
    return _optionalChain$1([utility, 'access', _583 => _583.handler
, 'access', _584 => _584.handleStatic, 'call', _585 => _585(theme('divideOpacity'))
, 'access', _586 => _586.handleNumber, 'call', _587 => _587(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _588 => _588.handleVariable, 'call', _589 => _589()
, 'access', _590 => _590.createProperty, 'call', _591 => _591('--tw-divide-opacity')
, 'optionalAccess', _592 => _592.toStyle, 'call', _593 => _593(utility.class)
, 'access', _594 => _594.child, 'call', _595 => _595('> :not([hidden]) ~ :not([hidden])')
, 'access', _596 => _596.updateMeta, 'call', _597 => _597('utilities', 'divideOpacity', pluginOrder.divideOpacity, 1, true)]);
  // handle divide color
  const divideColor = _optionalChain$1([utility, 'access', _598 => _598.handler
, 'access', _599 => _599.handleColor, 'call', _600 => _600(theme('divideColor'))
, 'access', _601 => _601.handleOpacity, 'call', _602 => _602(theme('divideOpacity'))
, 'access', _603 => _603.handleVariable, 'call', _604 => _604((variable) => utility.raw.startsWith('divide-$') ? `var(--${variable})` : undefined)
, 'access', _605 => _605.createColorStyle, 'call', _606 => _606(utility.class, 'border-color', '--tw-divide-opacity')
, 'optionalAccess', _607 => _607.child, 'call', _608 => _608('> :not([hidden]) ~ :not([hidden])')
, 'access', _609 => _609.updateMeta, 'call', _610 => _610('utilities', 'divideColor', pluginOrder.divideColor, 0, true)]);
  if (divideColor) return divideColor;
  // handle divide width
  switch (utility.raw) {
  case 'divide-x-reverse':
    return new Style(utility.class, new Property('--tw-divide-x-reverse', '1')).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 6, true);
  case 'divide-y-reverse':
    return new Style(utility.class, new Property('--tw-divide-y-reverse', '1')).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 5, true);
  case 'divide-y':
    return new Style(utility.class, [
      new Property('--tw-divide-y-reverse', '0'),
      new Property('border-top-width', 'calc(1px * calc(1 - var(--tw-divide-y-reverse)))'),
      new Property('border-bottom-width', 'calc(1px * var(--tw-divide-y-reverse))'),
    ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 3, true);
  case 'divide-x':
    return new Style(utility.class, [
      new Property('--tw-divide-x-reverse', '0'),
      new Property('border-right-width', 'calc(1px * var(--tw-divide-x-reverse))'),
      new Property('border-left-width', 'calc(1px * calc(1 - var(--tw-divide-x-reverse)))'),
    ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 4, true);
  }
  return utility.handler
    .handleSquareBrackets()
    .handleNumber(0, undefined, 'float', (number) => `${number}px`)
    .handleSize()
    .handleVariable()
    .callback(value => {
      const centerMatch = utility.raw.match(/^-?divide-[x|y]/);
      if (centerMatch) {
        const center = centerMatch[0].replace(/^-?divide-/, '');
        switch (center) {
        case 'x':
          return new Style(utility.class, [
            new Property('--tw-divide-x-reverse', '0'),
            new Property('border-right-width', `calc(${value} * var(--tw-divide-x-reverse))`),
            new Property('border-left-width', `calc(${value} * calc(1 - var(--tw-divide-x-reverse)))`),
          ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 2, true);
        case 'y':
          return new Style(utility.class, [
            new Property('--tw-divide-y-reverse', '0'),
            new Property('border-top-width', `calc(${value} * calc(1 - var(--tw-divide-y-reverse)))`),
            new Property('border-bottom-width', `calc(${value} * var(--tw-divide-y-reverse))`),
          ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 1, true);
        }
      }
    });
}

// https://windicss.org/utilities/borders.html#ring-offset-width
// https://windicss.org/utilities/borders.html#ring-offset-color
function ringOffset(utility, { theme }) {
  let value;
  // handle ring offset width variable
  if (utility.raw.startsWith('ringOffset-width-$')) {
    value = utility.handler.handleVariable().value;
    if (value) return new Property('--tw-ring-offset-width', value).toStyle(utility.class.replace('ringOffset', 'ring-offset')).updateMeta('utilities', 'ringOffsetWidth', pluginOrder.ringOffsetWidth, 2, true);
  }

  if (utility.raw.startsWith('ringOffset-opacity')) {
    return _optionalChain$1([utility, 'access', _611 => _611.handler
, 'access', _612 => _612.handleStatic, 'call', _613 => _613(theme('opacity'))
, 'access', _614 => _614.handleNumber, 'call', _615 => _615(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _616 => _616.handleVariable, 'call', _617 => _617()
, 'access', _618 => _618.createProperty, 'call', _619 => _619('--tw-ring-offset-opacity')
, 'optionalAccess', _620 => _620.updateMeta, 'call', _621 => _621('utilities', 'ringOffsetColor', pluginOrder.ringOffsetColor, 2, true)]);
  }

  // handle ring offset color || ring offset width
  return _optionalChain$1([utility, 'access', _622 => _622.handler
, 'access', _623 => _623.handleColor, 'call', _624 => _624(theme('ringOffsetColor'))
, 'access', _625 => _625.handleOpacity, 'call', _626 => _626('ringOpacity')
, 'access', _627 => _627.handleVariable, 'call', _628 => _628()
, 'access', _629 => _629.handleSquareBrackets, 'call', _630 => _630()
, 'access', _631 => _631.createColorStyle, 'call', _632 => _632(utility.class.replace('ringOffset', 'ring-offset'), '--tw-ring-offset-color', '--tw-ring-offset-opacity')
, 'optionalAccess', _633 => _633.updateMeta, 'call', _634 => _634('utilities', 'ringOffsetColor', pluginOrder.ringOffsetColor, 1, true)])
  || _optionalChain$1([utility, 'access', _635 => _635.handler
, 'access', _636 => _636.handleStatic, 'call', _637 => _637(theme('ringOffsetWidth'))
, 'access', _638 => _638.handleSquareBrackets, 'call', _639 => _639(isNumberLead)
, 'access', _640 => _640.handleNumber, 'call', _641 => _641(0, undefined, 'float', (number) => `${number}px`)
, 'access', _642 => _642.handleSize, 'call', _643 => _643()
, 'access', _644 => _644.createStyle, 'call', _645 => _645(utility.class.replace('ringOffset', 'ring-offset'), value => new Property('--tw-ring-offset-width', value))
, 'optionalAccess', _646 => _646.updateMeta, 'call', _647 => _647('utilities', 'ringOffsetWidth', pluginOrder.ringOffsetWidth, 1, true)]);
}

// https://windicss.org/utilities/borders.html#ring-width
// https://windicss.org/utilities/borders.html#ring-color
// https://windicss.org/utilities/borders.html#ring-opacity
function ring(utility, utils) {
  // handle ring offset
  if (utility.raw.startsWith('ring-offset')) return ringOffset(utility.clone(utility.raw.replace('ring-offset', 'ringOffset')), utils);
  // handle ring opacity
  if (utility.raw.startsWith('ring-opacity'))
    return _optionalChain$1([utility, 'access', _648 => _648.handler
, 'access', _649 => _649.handleStatic, 'call', _650 => _650(utils.theme('ringOpacity'))
, 'access', _651 => _651.handleSquareBrackets, 'call', _652 => _652()
, 'access', _653 => _653.handleNumber, 'call', _654 => _654(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _655 => _655.handleVariable, 'call', _656 => _656()
, 'access', _657 => _657.createProperty, 'call', _658 => _658('--tw-ring-opacity')
, 'optionalAccess', _659 => _659.updateMeta, 'call', _660 => _660('utilities', 'ringOpacity', pluginOrder.ringOpacity, 1, true)]);
  // handle ring color
  const ringColor = _optionalChain$1([utility, 'access', _661 => _661.handler
, 'access', _662 => _662.handleColor, 'call', _663 => _663(utils.theme('ringColor'))
, 'access', _664 => _664.handleOpacity, 'call', _665 => _665(utils.theme('ringOpacity'))
, 'access', _666 => _666.handleSquareBrackets, 'call', _667 => _667(notNumberLead)
, 'access', _668 => _668.handleVariable, 'call', _669 => _669((variable) => utility.raw.startsWith('ring-$') ? `var(--${variable})` : undefined)
, 'access', _670 => _670.createColorStyle, 'call', _671 => _671(utility.class, '--tw-ring-color', '--tw-ring-opacity')
, 'optionalAccess', _672 => _672.updateMeta, 'call', _673 => _673('utilities', 'ringColor', pluginOrder.ringColor, 0, true)]);

  if (ringColor) return ringColor;
  // handle ring width
  if (utility.raw === 'ring-inset') return new Property('--tw-ring-inset', 'inset').updateMeta('utilities', 'ringWidth', pluginOrder.ringWidth, 3, true);
  const value = utility.raw === 'ring'
    ? (_nullishCoalesce$2(toType(utils.theme('ringWidth.DEFAULT'), 'string'), () => ( '3px')))
    : utility.handler
      .handleStatic(utils.theme('ringWidth'))
      .handleSquareBrackets()
      .handleNumber(0, undefined, 'float', (number) => `${number}px`)
      .handleSize()
      .handleVariable()
      .value;
  if (!value) return;
  return new Style(utility.class, [
    new Property('--tw-ring-offset-shadow', 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)'),
    new Property('--tw-ring-shadow', `var(--tw-ring-inset) 0 0 0 calc(${value} + var(--tw-ring-offset-width)) var(--tw-ring-color)`),
    new Property(['-webkit-box-shadow', 'box-shadow'], 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)'),
  ]).updateMeta('utilities', 'ringWidth', pluginOrder.ringWidth, (utility.raw === 'ring' ? 1 : 2), true);
}

// https://windicss.org/utilities/filters.html#filter-blur
function blur(utility, { theme }) {
  if (utility.raw === 'blur') utility.raw = 'blur-DEFAULT';
  return _optionalChain$1([utility, 'access', _674 => _674.handler
, 'access', _675 => _675.handleBody, 'call', _676 => _676(theme('blur'))
, 'access', _677 => _677.handleSquareBrackets, 'call', _678 => _678()
, 'access', _679 => _679.handleNumber, 'call', _680 => _680(0, undefined, 'int', (number) => `${number}px`)
, 'access', _681 => _681.handleSize, 'call', _682 => _682()
, 'access', _683 => _683.createProperty, 'call', _684 => _684('--tw-blur', value => `blur(${value})`)
, 'optionalAccess', _685 => _685.updateMeta, 'call', _686 => _686('utilities', 'blur', pluginOrder.blur, 1, true)]);
}

// https://windicss.org/utilities/filters.html#filter-brightness
function brightness(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _687 => _687.handler
, 'access', _688 => _688.handleBody, 'call', _689 => _689(theme('brightness'))
, 'access', _690 => _690.handleSquareBrackets, 'call', _691 => _691()
, 'access', _692 => _692.handleNumber, 'call', _693 => _693(0, undefined, 'int', (number) => `${number/100}`)
, 'access', _694 => _694.createProperty, 'call', _695 => _695('--tw-brightness', value => `brightness(${value})`)
, 'optionalAccess', _696 => _696.updateMeta, 'call', _697 => _697('utilities', 'brightness', pluginOrder.brightness, 1, true)]);
}

// https://windicss.org/utilities/filters.html#filter-contrast
function contrast(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _698 => _698.handler
, 'access', _699 => _699.handleBody, 'call', _700 => _700(theme('contrast'))
, 'access', _701 => _701.handleSquareBrackets, 'call', _702 => _702()
, 'access', _703 => _703.handleNumber, 'call', _704 => _704(0, undefined, 'int', (number) => `${number/100}`)
, 'access', _705 => _705.createProperty, 'call', _706 => _706('--tw-contrast', value => `contrast(${value})`)
, 'optionalAccess', _707 => _707.updateMeta, 'call', _708 => _708('utilities', 'contrast', pluginOrder.contrast, 1, true)]);
}

// https://windicss.org/utilities/filters.html#filter-drop-shadow
function dropShadow(utility, { theme }) {
  let value;
  if (utility.raw === 'drop-shadow') {
    value = theme('dropShadow.DEFAULT', ['0 1px 2px rgba(0, 0, 0, 0.1)', '0 1px 1px rgba(0, 0, 0, 0.06)']) ;
  } else {
    const dropShadows = theme('dropShadow') ;
    const amount = utility.amount;
    if (utility.raw.startsWith('drop-shadow') && amount in dropShadows) value = dropShadows[amount];
  }
  if (value) return new Property('--tw-drop-shadow', Array.isArray(value)? value.map(i => `drop-shadow(${i})`).join(' '): `drop-shadow(${value})`).updateMeta('utilities', 'dropShadow', pluginOrder.dropShadow, 1, true);
}

// https://windicss.org/utilities/filters.html#filter-grayscale
function grayscale(utility, { theme }) {
  if (utility.raw === 'grayscale') utility.raw = 'grayscale-DEFAULT';
  return _optionalChain$1([utility, 'access', _709 => _709.handler
, 'access', _710 => _710.handleBody, 'call', _711 => _711(theme('grayscale'))
, 'access', _712 => _712.handleSquareBrackets, 'call', _713 => _713()
, 'access', _714 => _714.handleNumber, 'call', _715 => _715(0, 100, 'int', (number) => `${number/100}`)
, 'access', _716 => _716.createProperty, 'call', _717 => _717('--tw-grayscale', value => `grayscale(${value})`)
, 'optionalAccess', _718 => _718.updateMeta, 'call', _719 => _719('utilities', 'grayscale', pluginOrder.grayscale, 1, true)]);
}

// https://windicss.org/utilities/filters.html#filter-hue-rotate
function hueRotate(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _720 => _720.handler
, 'access', _721 => _721.handleBody, 'call', _722 => _722(theme('hueRotate'))
, 'access', _723 => _723.handleSquareBrackets, 'call', _724 => _724()
, 'access', _725 => _725.handleNumber, 'call', _726 => _726(0, undefined, 'float', (number) => `${number}deg`)
, 'access', _727 => _727.handleNegative, 'call', _728 => _728()
, 'access', _729 => _729.createProperty, 'call', _730 => _730('--tw-hue-rotate', value => `hue-rotate(${value})`)
, 'optionalAccess', _731 => _731.updateMeta, 'call', _732 => _732('utilities', 'hueRotate', pluginOrder.hueRotate, 1, true)]);
}

// https://windicss.org/utilities/filters.html#filter-invert
function invert(utility, { theme }) {
  if (utility.raw === 'invert') utility.raw = 'invert-DEFAULT';
  return _optionalChain$1([utility, 'access', _733 => _733.handler
, 'access', _734 => _734.handleBody, 'call', _735 => _735(theme('invert'))
, 'access', _736 => _736.handleSquareBrackets, 'call', _737 => _737()
, 'access', _738 => _738.handleNumber, 'call', _739 => _739(0, 100, 'int', (number) => `${number/100}`)
, 'access', _740 => _740.createProperty, 'call', _741 => _741('--tw-invert', value => `invert(${value})`)
, 'optionalAccess', _742 => _742.updateMeta, 'call', _743 => _743('utilities', 'invert', pluginOrder.invert, 1, true)]);
}

// https://windicss.org/utilities/filters.html#filter-saturate
function saturate(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _744 => _744.handler
, 'access', _745 => _745.handleBody, 'call', _746 => _746(theme('saturate'))
, 'access', _747 => _747.handleSquareBrackets, 'call', _748 => _748()
, 'access', _749 => _749.handleNumber, 'call', _750 => _750(0, undefined, 'int', (number) => `${number/100}`)
, 'access', _751 => _751.createProperty, 'call', _752 => _752('--tw-saturate', value => `saturate(${value})`)
, 'optionalAccess', _753 => _753.updateMeta, 'call', _754 => _754('utilities', 'saturate', pluginOrder.saturate, 1, true)]);
}

// https://windicss.org/utilities/filters.html#filter-sepia
function sepia(utility, { theme }) {
  if (utility.raw === 'sepia') utility.raw = 'sepia-DEFAULT';
  return _optionalChain$1([utility, 'access', _755 => _755.handler
, 'access', _756 => _756.handleBody, 'call', _757 => _757(theme('sepia'))
, 'access', _758 => _758.handleSquareBrackets, 'call', _759 => _759()
, 'access', _760 => _760.handleNumber, 'call', _761 => _761(0, 100, 'int', (number) => `${number/100}`)
, 'access', _762 => _762.createProperty, 'call', _763 => _763('--tw-sepia', value => `sepia(${value})`)
, 'optionalAccess', _764 => _764.updateMeta, 'call', _765 => _765('utilities', 'sepia', pluginOrder.sepia, 1, true)]);
}

// https://windicss.org/utilities/filters.html#backdrop-filter
// https://windicss.org/utilities/filters.html#backdrop-blur
// https://windicss.org/utilities/filters.html#backdrop-brightness
// https://windicss.org/utilities/filters.html#backdrop-contrast
// https://windicss.org/utilities/filters.html#backdrop-grayscale
// https://windicss.org/utilities/filters.html#backdrop-hue-rotate
// https://windicss.org/utilities/filters.html#backdrop-invert
// https://windicss.org/utilities/filters.html#backdrop-opacity
// https://windicss.org/utilities/filters.html#backdrop-saturate
// https://windicss.org/utilities/filters.html#backdrop-sepia
function backdrop(utility, { theme }) {
  utility = utility.clone(utility.raw.slice(9));
  switch (utility.match(/[^-]+/)) {
  case 'blur':
    if (utility.raw === 'blur') utility.raw = 'blur-DEFAULT';
    return _optionalChain$1([utility, 'access', _766 => _766.handler
, 'access', _767 => _767.handleBody, 'call', _768 => _768(theme('backdropBlur'))
, 'access', _769 => _769.handleSquareBrackets, 'call', _770 => _770()
, 'access', _771 => _771.handleNumber, 'call', _772 => _772(0, undefined, 'int', (number) => `${number}px`)
, 'access', _773 => _773.handleSize, 'call', _774 => _774()
, 'access', _775 => _775.createProperty, 'call', _776 => _776('--tw-backdrop-blur', value => `blur(${value})`)
, 'optionalAccess', _777 => _777.updateMeta, 'call', _778 => _778('utilities', 'backdropBlur', pluginOrder.backdropBlur, 1, true)]);
  case 'brightness':
    return _optionalChain$1([utility, 'access', _779 => _779.handler
, 'access', _780 => _780.handleBody, 'call', _781 => _781(theme('backdropBrightness'))
, 'access', _782 => _782.handleSquareBrackets, 'call', _783 => _783()
, 'access', _784 => _784.handleNumber, 'call', _785 => _785(0, undefined, 'int', (number) => `${number/100}`)
, 'access', _786 => _786.createProperty, 'call', _787 => _787('--tw-backdrop-brightness', value => `brightness(${value})`)
, 'optionalAccess', _788 => _788.updateMeta, 'call', _789 => _789('utilities', 'backdropBrightness', pluginOrder.backdropBrightness, 1, true)]);
  case 'contrast':
    return _optionalChain$1([utility, 'access', _790 => _790.handler
, 'access', _791 => _791.handleBody, 'call', _792 => _792(theme('backdropContrast'))
, 'access', _793 => _793.handleSquareBrackets, 'call', _794 => _794()
, 'access', _795 => _795.handleNumber, 'call', _796 => _796(0, undefined, 'int', (number) => `${number/100}`)
, 'access', _797 => _797.createProperty, 'call', _798 => _798('--tw-backdrop-contrast', value => `contrast(${value})`)
, 'optionalAccess', _799 => _799.updateMeta, 'call', _800 => _800('utilities', 'backdropContrast', pluginOrder.backdropContrast, 1, true)]);
  case 'grayscale':
    if (utility.raw === 'grayscale') utility.raw = 'grayscale-DEFAULT';
    return _optionalChain$1([utility, 'access', _801 => _801.handler
, 'access', _802 => _802.handleBody, 'call', _803 => _803(theme('backdropGrayscale'))
, 'access', _804 => _804.handleSquareBrackets, 'call', _805 => _805()
, 'access', _806 => _806.handleNumber, 'call', _807 => _807(0, 100, 'int', (number) => `${number/100}`)
, 'access', _808 => _808.createProperty, 'call', _809 => _809('--tw-backdrop-grayscale', value => `grayscale(${value})`)
, 'optionalAccess', _810 => _810.updateMeta, 'call', _811 => _811('utilities', 'backdropGrayscale', pluginOrder.backdropGrayscale, 1, true)]);
  case 'hue':
    return _optionalChain$1([utility, 'access', _812 => _812.handler
, 'access', _813 => _813.handleBody, 'call', _814 => _814(theme('backdropHueRotate'))
, 'access', _815 => _815.handleSquareBrackets, 'call', _816 => _816()
, 'access', _817 => _817.handleNumber, 'call', _818 => _818(0, undefined, 'float', (number) => `${number}deg`)
, 'access', _819 => _819.handleNegative, 'call', _820 => _820()
, 'access', _821 => _821.createProperty, 'call', _822 => _822('--tw-backdrop-hue-rotate', value => `hue-rotate(${value})`)
, 'optionalAccess', _823 => _823.updateMeta, 'call', _824 => _824('utilities', 'backdropHueRotate', pluginOrder.backdropHueRotate, 1, true)]);
  case 'invert':
    if (utility.raw === 'invert') utility.raw = 'invert-DEFAULT';
    return _optionalChain$1([utility, 'access', _825 => _825.handler
, 'access', _826 => _826.handleBody, 'call', _827 => _827(theme('backdropInvert'))
, 'access', _828 => _828.handleSquareBrackets, 'call', _829 => _829()
, 'access', _830 => _830.handleNumber, 'call', _831 => _831(0, 100, 'int', (number) => `${number/100}`)
, 'access', _832 => _832.createProperty, 'call', _833 => _833('--tw-backdrop-invert', value => `invert(${value})`)
, 'optionalAccess', _834 => _834.updateMeta, 'call', _835 => _835('utilities', 'backdropInvert', pluginOrder.backdropInvert, 1, true)]);
  case 'opacity':
    return _optionalChain$1([utility, 'access', _836 => _836.handler
, 'access', _837 => _837.handleBody, 'call', _838 => _838(theme('backdropOpacity'))
, 'access', _839 => _839.handleSquareBrackets, 'call', _840 => _840()
, 'access', _841 => _841.handleNumber, 'call', _842 => _842(0, 100, 'int', (number) => `${number/100}`)
, 'access', _843 => _843.createProperty, 'call', _844 => _844('--tw-backdrop-opacity', value => `opacity(${value})`)
, 'optionalAccess', _845 => _845.updateMeta, 'call', _846 => _846('utilities', 'backdropOpacity', pluginOrder.backdropOpacity, 1, true)]);
  case 'saturate':
    return _optionalChain$1([utility, 'access', _847 => _847.handler
, 'access', _848 => _848.handleBody, 'call', _849 => _849(theme('backdropSaturate'))
, 'access', _850 => _850.handleSquareBrackets, 'call', _851 => _851()
, 'access', _852 => _852.handleNumber, 'call', _853 => _853(0, undefined, 'int', (number) => `${number/100}`)
, 'access', _854 => _854.createProperty, 'call', _855 => _855('--tw-backdrop-saturate', value => `saturate(${value})`)
, 'optionalAccess', _856 => _856.updateMeta, 'call', _857 => _857('utilities', 'backdropSaturate', pluginOrder.backdropSaturate, 1, true)]);
  case 'sepia':
    if (utility.raw === 'sepia') utility.raw = 'sepia-DEFAULT';
    return _optionalChain$1([utility, 'access', _858 => _858.handler
, 'access', _859 => _859.handleBody, 'call', _860 => _860(theme('backdropSepia'))
, 'access', _861 => _861.handleSquareBrackets, 'call', _862 => _862()
, 'access', _863 => _863.handleNumber, 'call', _864 => _864(0, 100, 'int', (number) => `${number/100}`)
, 'access', _865 => _865.createProperty, 'call', _866 => _866('--tw-backdrop-sepia', value => `sepia(${value})`)
, 'optionalAccess', _867 => _867.updateMeta, 'call', _868 => _868('utilities', 'backdropSepia', pluginOrder.backdropSepia, 1, true)]);
  }
}

// https://windicss.org/utilities/effects.html#box-shadow
function boxShadow(utility, { theme }) {
  const body = utility.body || 'DEFAULT';
  const shadows = toType(theme('boxShadow'), 'object') ;

  if (Object.keys(shadows).includes(body)) {
    const coloredShadow = shadows[body].replace(/rgba?\([0-9.,/\s]*\)/g, 'var(--tw-shadow-color)');
    return new Style(utility.class, [
      new Property('--tw-shadow', shadows[body]),
      new Property('--tw-shadow-colored', coloredShadow),
      new Property('-webkit-box-shadow', 'var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)'),
      new Property('box-shadow', 'var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)'),
    ]).updateMeta('utilities', 'boxShadow', pluginOrder.boxShadow, 0, true);
  }

  const color = utility.handler
    .handleColor(theme('boxShadowColor'))
    .handleOpacity(theme('opacity'))
    .handleSquareBrackets()
    .handleVariable()
    .createColorValue('1');

  return new Style(utility.class, [
    new Property('--tw-shadow-color', color),
    new Property('--tw-shadow', 'var(--tw-shadow-colored)'),
  ]).updateMeta('utilities', 'boxShadowColor', pluginOrder.boxShadowColor, 0, true);
}

// https://windicss.org/utilities/effects.html#opacity
function opacity(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _869 => _869.handler
, 'access', _870 => _870.handleStatic, 'call', _871 => _871(theme('opacity'))
, 'access', _872 => _872.handleSquareBrackets, 'call', _873 => _873()
, 'access', _874 => _874.handleNumber, 'call', _875 => _875(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _876 => _876.handleVariable, 'call', _877 => _877()
, 'access', _878 => _878.createProperty, 'call', _879 => _879('opacity')
, 'optionalAccess', _880 => _880.updateMeta, 'call', _881 => _881('utilities', 'opacity', pluginOrder.opacity, 0, true)]);
}

// https://windicss.org/utilities/transitions.html#transition-property
function transition(utility, { theme }) {
  const body = utility.body;
  const props = toType(theme('transitionProperty'), 'object') ;
  for (const [key, value] of Object.entries(props)) {
    if (body === key || (body === '' && key === 'DEFAULT')) {
      if (value === 'none') return new Property(['-webkit-transition-property', '-o-transition-property', 'transition-property'], 'none').updateMeta('utilities', 'transitionProperty', pluginOrder.transitionProperty, 1, true);
      return new Style(utility.class, [
        new Property('-webkit-transition-property', value.replace(/(?=(transform|box-shadow))/g, '-webkit-')),
        new Property('-o-transition-property', value),
        new Property('transition-property', value.replace(/transform/g, 'transform, -webkit-transform').replace(/box-shadow/g, 'box-shadow, -webkit-box-shadow')),
        new Property(['-webkit-transition-timing-function', '-o-transition-timing-function', 'transition-timing-function'], _nullishCoalesce$2(toType(theme('transitionTimingFunction.DEFAULT'), 'string'), () => ( 'cubic-bezier(0.4, 0, 0.2, 1)'))),
        new Property(['-webkit-transition-duration', '-o-transition-duration', 'transition-duration' ], _nullishCoalesce$2(toType(theme('transitionDuration.DEFAULT'), 'string'), () => ( '150ms'))),
      ]).updateMeta('utilities', 'transitionProperty', pluginOrder.transitionProperty, 2, true);
    }
  }
}

// https://windicss.org/utilities/transitions.html#transition-duration
function duration(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _882 => _882.handler
, 'access', _883 => _883.handleStatic, 'call', _884 => _884(theme('transitionDuration'))
, 'access', _885 => _885.handleSquareBrackets, 'call', _886 => _886()
, 'access', _887 => _887.handleTime, 'call', _888 => _888(0, undefined, 'float')
, 'access', _889 => _889.handleNumber, 'call', _890 => _890(0, undefined, 'int', (number) => `${number}ms`)
, 'access', _891 => _891.handleVariable, 'call', _892 => _892()
, 'access', _893 => _893.createProperty, 'call', _894 => _894(['-webkit-transition-duration', '-o-transition-duration', 'transition-duration'])
, 'optionalAccess', _895 => _895.updateMeta, 'call', _896 => _896('utilities', 'transitionDuration', pluginOrder.transitionDuration, 1, true)]);
}

// https://windicss.org/utilities/transitions.html#transition-timing-function
function transitionTimingFunction(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _897 => _897.handler
, 'access', _898 => _898.handleBody, 'call', _899 => _899(theme('transitionTimingFunction'))
, 'access', _900 => _900.createProperty, 'call', _901 => _901(['-webkit-transition-timing-function', '-o-transition-timing-function', 'transition-timing-function'])
, 'optionalAccess', _902 => _902.updateMeta, 'call', _903 => _903('utilities', 'transitionTimingFunction', pluginOrder.transitionTimingFunction, 1, true)]);
}

// https://windicss.org/utilities/transitions.html#transition-delay
function delay(utility, { theme }) {
  return _optionalChain$1([utility, 'access', _904 => _904.handler
, 'access', _905 => _905.handleStatic, 'call', _906 => _906(theme('transitionDelay'))
, 'access', _907 => _907.handleSquareBrackets, 'call', _908 => _908()
, 'access', _909 => _909.handleTime, 'call', _910 => _910(0, undefined, 'float')
, 'access', _911 => _911.handleNumber, 'call', _912 => _912(0, undefined, 'int', (number) => `${number}ms`)
, 'access', _913 => _913.handleVariable, 'call', _914 => _914()
, 'access', _915 => _915.createProperty, 'call', _916 => _916(['-webkit-transition-delay', '-o-transition-delay', 'transition-delay'])
, 'optionalAccess', _917 => _917.updateMeta, 'call', _918 => _918('utilities', 'transitionDelay', pluginOrder.transitionDelay, 0, true)]);
}

// https://windicss.org/utilities/behaviors.html#animation
function animation(utility, { theme, config }) {
  const body = utility.body;
  if (utility.raw.startsWith('animate-ease')) {
    return _optionalChain$1([utility, 'access', _919 => _919.clone, 'call', _920 => _920(utility.raw.slice(8)), 'access', _921 => _921.handler
, 'access', _922 => _922.handleBody, 'call', _923 => _923(theme('animationTimingFunction'))
, 'access', _924 => _924.handleSquareBrackets, 'call', _925 => _925()
, 'access', _926 => _926.createProperty, 'call', _927 => _927(['-webkit-animation-timing-function', 'animation-timing-function'])
, 'optionalAccess', _928 => _928.updateMeta, 'call', _929 => _929('utilities', 'animation', pluginOrder.animation, 20, true)]);
  }
  if (utility.raw.startsWith('animate-duration')) {
    return _optionalChain$1([utility, 'access', _930 => _930.clone, 'call', _931 => _931(utility.raw.slice(8)), 'access', _932 => _932.handler
, 'access', _933 => _933.handleStatic, 'call', _934 => _934(theme('animationDuration'))
, 'access', _935 => _935.handleSquareBrackets, 'call', _936 => _936()
, 'access', _937 => _937.handleTime, 'call', _938 => _938(0, undefined, 'float')
, 'access', _939 => _939.handleNumber, 'call', _940 => _940(0, undefined, 'int', (number) => `${number}ms`)
, 'access', _941 => _941.handleVariable, 'call', _942 => _942()
, 'access', _943 => _943.createProperty, 'call', _944 => _944(['-webkit-animation-duration', 'animation-duration'])
, 'optionalAccess', _945 => _945.updateMeta, 'call', _946 => _946('utilities', 'animation', pluginOrder.animation, 21, true)]);
  }
  if (utility.raw.startsWith('animate-delay')) {
    return _optionalChain$1([utility, 'access', _947 => _947.clone, 'call', _948 => _948(utility.raw.slice(8)), 'access', _949 => _949.handler
, 'access', _950 => _950.handleStatic, 'call', _951 => _951(theme('animationDelay'))
, 'access', _952 => _952.handleSquareBrackets, 'call', _953 => _953()
, 'access', _954 => _954.handleTime, 'call', _955 => _955(0, undefined, 'float')
, 'access', _956 => _956.handleNumber, 'call', _957 => _957(0, undefined, 'int', (number) => `${number}ms`)
, 'access', _958 => _958.handleVariable, 'call', _959 => _959()
, 'access', _960 => _960.createProperty, 'call', _961 => _961(['-webkit-animation-delay', 'animation-delay'])
, 'optionalAccess', _962 => _962.updateMeta, 'call', _963 => _963('utilities', 'animation', pluginOrder.animation, 22, true)]);
  }
  const animateIterationCount = utility.handler.handleBody(theme('animationIterationCount')).handleNumber(0, undefined, 'int').handleSquareBrackets().value;
  if (animateIterationCount) return new Property(['-webkit-animation-iteration-count', 'animation-iteration-count'], animateIterationCount).updateMeta('utilities', 'animation', pluginOrder.animation, 23, true);
  const animations = toType(theme('animation'), 'object') ;
  if (Object.keys(animations).includes(body)) {
    let value = animations[body];
    const prop = config('prefixer') ? ['-webkit-animation', 'animation'] : 'animation';
    if (value === 'none') return new Property(prop, 'none').updateMeta('utilities', 'animation', pluginOrder.animation, 1, true);
    let styles, keyframe;
    if (typeof value === 'string') {
      keyframe = _optionalChain$1([value, 'access', _964 => _964.match, 'call', _965 => _965(/^\w+/), 'optionalAccess', _966 => _966[0]]);
      styles = [ new Style(utility.class, new Property(prop, value)) ];
    } else {
      keyframe = value['animation'] || value['animationName'] || value['animation-name'];
      if (config('prefixer')) {
        const props = {};
        for (const [k, v] of Object.entries(value)) {
          if (k.startsWith('animation') || k.startsWith('backface')) {
            props['-webkit-' + k] = v;
          } else if (k.startsWith('transform')) {
            props['-webkit-' + k] = v;
            props['-ms-' + k] = v;
          }
          props[k] = v;
        }
        value = props;
      }
      styles = Style.generate(utility.class, value).map(i => i.updateMeta('utilities', 'animation', pluginOrder.animation, 2, true));
    }

    if (styles) {
      return [
        ...styles.map(i => i.updateMeta('utilities', 'animation', pluginOrder.animation, 2, true)),
        ... keyframe ? Keyframes.generate(
          keyframe,
        (_nullishCoalesce$2(theme(`keyframes.${keyframe}`), () => ( {}))) ,
        undefined,
        config('prefixer', false) 
        ).map(i => i.updateMeta('utilities', 'keyframes', pluginOrder.keyframes, 1, true)) : [],
      ];
    }
  }
}

// https://windicss.org/utilities/transforms.html#transform-origin
function transformOrigin(utility, { theme }) {
  const body = utility.body;
  const origins = toType(theme('transformOrigin'), 'object') ;
  if (Object.keys(origins).includes(body)) return new Property(['-webkit-transform-origin', '-ms-transform-origin', 'transform-origin'], origins[body]).updateMeta('utilities', 'transformOrigin', pluginOrder.transformOrigin, 0, true);
}

// https://windicss.org/utilities/transforms.html#transform-scale
function scale(utility, { theme }) {
  return utility.handler
    .handleStatic(theme('scale'))
    .handleNumber(0, undefined, 'int', (number) => (number / 100).toString())
    .handleVariable()
    .callback(value => {
      if (utility.raw.startsWith('scale-x')) return new Property('--tw-scale-x', value).updateMeta('utilities', 'scale', pluginOrder.scale, 2, true);
      if (utility.raw.startsWith('scale-y')) return new Property('--tw-scale-y', value).updateMeta('utilities', 'scale', pluginOrder.scale, 3, true);
      if (utility.raw.startsWith('scale-z')) return new Property('--tw-scale-z', value).updateMeta('utilities', 'scale', pluginOrder.scale, 4, true);
      return new Property(['--tw-scale-x', '--tw-scale-y', '--tw-scale-z'], value).updateMeta('utilities', 'scale', pluginOrder.scale, 1, true);
    });
}

// https://windicss.org/utilities/transforms.html#transform-rotate
function rotate(utility, { theme }) {
  return utility.handler
    .handleStatic(theme('rotate'))
    .handleSquareBrackets()
    .handleNumber(0, undefined, 'float', (number) => `${number}deg`)
    .handleNegative()
    .handleVariable()
    .callback(value => {
      const abs = utility.absolute;
      if (abs.startsWith('rotate-x')) return new Property('--tw-rotate-x', value).updateMeta('utilities', 'rotate', pluginOrder.rotate, 2, true);
      if (abs.startsWith('rotate-y')) return new Property('--tw-rotate-y', value).updateMeta('utilities', 'rotate', pluginOrder.rotate, 3, true);
      if (abs.startsWith('rotate-z')) return new Property('--tw-rotate-z', value).updateMeta('utilities', 'rotate', pluginOrder.rotate, 4, true);
      return new Property('--tw-rotate', value).updateMeta('utilities', 'rotate', pluginOrder.rotate, 1, true);
    });
}

// https://windicss.org/utilities/transforms.html#transform-translate
function translate(utility, { theme }) {
  const centerMatch = utility.raw.match(/^-?translate-[x|y|z]/);
  if (centerMatch) {
    const center = centerMatch[0].replace(/^-?translate-/, '');
    return _optionalChain$1([utility, 'access', _967 => _967.handler
, 'access', _968 => _968.handleStatic, 'call', _969 => _969(theme('translate'))
, 'access', _970 => _970.handleSquareBrackets, 'call', _971 => _971()
, 'access', _972 => _972.handleSpacing, 'call', _973 => _973()
, 'access', _974 => _974.handleFraction, 'call', _975 => _975()
, 'access', _976 => _976.handleSize, 'call', _977 => _977()
, 'access', _978 => _978.handleNegative, 'call', _979 => _979()
, 'access', _980 => _980.handleVariable, 'call', _981 => _981()
, 'access', _982 => _982.createProperty, 'call', _983 => _983(`--tw-translate-${center}`)
, 'optionalAccess', _984 => _984.updateMeta, 'call', _985 => _985('utilities', 'translate', pluginOrder.translate, utility.raw.charAt(0) === '-' ? 2 : 1, true)]);
  }
}

// https://windicss.org/utilities/transforms.html#transform-skew
function skew(utility, { theme }) {
  const centerMatch = utility.raw.match(/^-?skew-[x|y]/);
  if (centerMatch) {
    const center = centerMatch[0].replace(/^-?skew-/, '');
    return _optionalChain$1([utility, 'access', _986 => _986.handler
, 'access', _987 => _987.handleStatic, 'call', _988 => _988(theme('skew'))
, 'access', _989 => _989.handleSquareBrackets, 'call', _990 => _990()
, 'access', _991 => _991.handleNumber, 'call', _992 => _992(0, undefined, 'float', (number) => `${number}deg`)
, 'access', _993 => _993.handleNegative, 'call', _994 => _994()
, 'access', _995 => _995.handleVariable, 'call', _996 => _996()
, 'access', _997 => _997.createProperty, 'call', _998 => _998(`--tw-skew-${center}`)
, 'optionalAccess', _999 => _999.updateMeta, 'call', _1000 => _1000('utilities', 'skew', pluginOrder.skew, utility.raw.charAt(0) === '-' ? 2 : 1, true)]);
  }
}

// https://windicss.org/utilities/transforms.html#perspective
function perspective(utility, { theme }) {
  if (utility.raw.startsWith('perspect-origin')) {
    const origin = _optionalChain$1([utility, 'access', _1001 => _1001.clone, 'call', _1002 => _1002('perspectOrigin' + utility.raw.slice(15)), 'access', _1003 => _1003.handler
, 'access', _1004 => _1004.handleBody, 'call', _1005 => _1005(theme('perspectiveOrigin'))
, 'access', _1006 => _1006.handleSquareBrackets, 'call', _1007 => _1007()
, 'access', _1008 => _1008.createProperty, 'call', _1009 => _1009(['-webkit-perspective-origin', 'perspective-origin'])
, 'optionalAccess', _1010 => _1010.updateMeta, 'call', _1011 => _1011('utilities', 'perspectiveOrigin', pluginOrder.perspectiveOrigin, 0, true)]);
    if (origin) return origin;
  }
  return _optionalChain$1([utility, 'access', _1012 => _1012.handler
, 'access', _1013 => _1013.handleStatic, 'call', _1014 => _1014(theme('perspective'))
, 'access', _1015 => _1015.handleNumber, 'call', _1016 => _1016(0, undefined, 'int', number => `${number}px`)
, 'access', _1017 => _1017.handleSize, 'call', _1018 => _1018()
, 'access', _1019 => _1019.handleSquareBrackets, 'call', _1020 => _1020()
, 'access', _1021 => _1021.createProperty, 'call', _1022 => _1022(['-webkit-perspective', 'perspective'])
, 'optionalAccess', _1023 => _1023.updateMeta, 'call', _1024 => _1024('utilities', 'perspective', pluginOrder.perspective, 0, true)]);
}

// https://windicss.org/utilities/behaviors.html#cursor
function cursor(utility, { theme }) {
  const body = utility.body;
  const cursors = toType(theme('cursor'), 'object') ;
  if (Object.keys(cursors).includes(body)) return new Property('cursor', cursors[body]).updateMeta('utilities', 'cursor', pluginOrder.cursor, 1, true);
}

// https://windicss.org/utilities/behaviors.html#outline
function outline(utility, { theme }) {
  const amount = utility.amount;
  const staticMap = toType(theme('outline'), 'object') ;
  if (Object.keys(staticMap).includes(amount))
    return new Style(utility.class, [ new Property('outline', staticMap[amount][0]), new Property('outline-offset', staticMap[amount][1]) ]).updateMeta('utilities', 'outline', pluginOrder.outline, 1, true);

  if (utility.raw.startsWith('outline-opacity')) {
    return _optionalChain$1([utility, 'access', _1025 => _1025.handler
, 'access', _1026 => _1026.handleStatic, 'call', _1027 => _1027(theme('opacity'))
, 'access', _1028 => _1028.handleNumber, 'call', _1029 => _1029(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _1030 => _1030.handleVariable, 'call', _1031 => _1031()
, 'access', _1032 => _1032.createProperty, 'call', _1033 => _1033('--tw-outline-opacity')
, 'optionalAccess', _1034 => _1034.updateMeta, 'call', _1035 => _1035('utilities', 'outline', pluginOrder.outline, 4, true)]);
  }

  if (utility.raw.match(/^outline-(solid|dotted)/)) {
    const newUtility = utility.clone(utility.raw.replace('outline-', ''));
    const outlineColor = newUtility.handler
      .handleStatic({ none: 'transparent', white: 'white', black: 'black' })
      .handleColor()
      .handleOpacity(theme('opacity'))
      .handleVariable()
      .createColorValue('var(--tw-outline-opacity, 1)');

    if (outlineColor) return new Style(utility.class, [
      new Property('outline', `2px ${newUtility.identifier} ${outlineColor}`),
      new Property('outline-offset', '2px') ]
    ).updateMeta('utilities', 'outline', pluginOrder.outline, 3, true);
  }

  const handler = utility.handler.handleColor().handleOpacity(theme('opacity')).handleSquareBrackets().handleVariable((variable) => utility.raw.startsWith('outline-$') ? `var(--${variable})` : undefined);
  const color = handler.createColorValue();
  if (color) return _optionalChain$1([new Style(utility.class, [
    new Property('outline', `2px ${ handler.value === 'transparent' ? 'solid' : 'dotted'} ${color}`),
    new Property('outline-offset', '2px'),
  ]), 'optionalAccess', _1036 => _1036.updateMeta, 'call', _1037 => _1037('utilities', 'outline', pluginOrder.outline, 2, true)]);
}

// https://windicss.org/utilities/svg.html#fill-color
function fill(utility, { theme }) {
  if (utility.raw.startsWith('fill-opacity')) {
    return _optionalChain$1([utility, 'access', _1038 => _1038.handler
, 'access', _1039 => _1039.handleStatic, 'call', _1040 => _1040(theme('opacity'))
, 'access', _1041 => _1041.handleNumber, 'call', _1042 => _1042(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _1043 => _1043.handleVariable, 'call', _1044 => _1044()
, 'access', _1045 => _1045.createProperty, 'call', _1046 => _1046('--tw-fill-opacity')
, 'optionalAccess', _1047 => _1047.updateMeta, 'call', _1048 => _1048('utilities', 'fill', pluginOrder.ringOffsetColor, 2, true)]);
  }
  return _optionalChain$1([utility, 'access', _1049 => _1049.handler
, 'access', _1050 => _1050.handleColor, 'call', _1051 => _1051(theme('fill'))
, 'access', _1052 => _1052.handleOpacity, 'call', _1053 => _1053(theme('opacity'))
, 'access', _1054 => _1054.handleSquareBrackets, 'call', _1055 => _1055()
, 'access', _1056 => _1056.handleVariable, 'call', _1057 => _1057()
, 'access', _1058 => _1058.createColorStyle, 'call', _1059 => _1059(utility.class, 'fill', '--tw-fill-opacity')
, 'optionalAccess', _1060 => _1060.updateMeta, 'call', _1061 => _1061('utilities', 'fill', pluginOrder.fill, 1, true)]);
}

// https://windicss.org/utilities/svg.html#stroke-color
// https://windicss.org/utilities/svg.html#stroke-width
function stroke(utility, { theme }) {
  if (utility.raw.startsWith('stroke-dash')) {
    return _optionalChain$1([utility, 'access', _1062 => _1062.handler, 'access', _1063 => _1063.handleNumber, 'call', _1064 => _1064(), 'access', _1065 => _1065.createProperty, 'call', _1066 => _1066('stroke-dasharray'), 'optionalAccess', _1067 => _1067.updateMeta, 'call', _1068 => _1068('utilities', 'strokeDashArray', pluginOrder.strokeDashArray, 0, true)]);
  }
  if (utility.raw.startsWith('stroke-offset')) {
    return _optionalChain$1([utility, 'access', _1069 => _1069.handler, 'access', _1070 => _1070.handleNumber, 'call', _1071 => _1071(), 'access', _1072 => _1072.createProperty, 'call', _1073 => _1073('stroke-dashoffset'), 'optionalAccess', _1074 => _1074.updateMeta, 'call', _1075 => _1075('utilities', 'strokeDashOffset', pluginOrder.strokeDashOffset, 0, true)]);
  }

  if (utility.raw.startsWith('stroke-opacity')) {
    return _optionalChain$1([utility, 'access', _1076 => _1076.handler
, 'access', _1077 => _1077.handleStatic, 'call', _1078 => _1078(theme('opacity'))
, 'access', _1079 => _1079.handleNumber, 'call', _1080 => _1080(0, 100, 'int', (number) => (number / 100).toString())
, 'access', _1081 => _1081.handleVariable, 'call', _1082 => _1082()
, 'access', _1083 => _1083.createProperty, 'call', _1084 => _1084('--tw-stroke-opacity')
, 'optionalAccess', _1085 => _1085.updateMeta, 'call', _1086 => _1086('utilities', 'stroke', pluginOrder.stroke, 2, true)]);
  }
  return _optionalChain$1([utility, 'access', _1087 => _1087.handler
, 'access', _1088 => _1088.handleColor, 'call', _1089 => _1089(theme('stroke'))
, 'access', _1090 => _1090.handleOpacity, 'call', _1091 => _1091(theme('opacity'))
, 'access', _1092 => _1092.handleVariable, 'call', _1093 => _1093()
, 'access', _1094 => _1094.handleSquareBrackets, 'call', _1095 => _1095()
, 'access', _1096 => _1096.createColorStyle, 'call', _1097 => _1097(utility.class, 'stroke', '--tw-stroke-opacity')
, 'optionalAccess', _1098 => _1098.updateMeta, 'call', _1099 => _1099('utilities', 'stroke', pluginOrder.stroke, 1, true)])
  || (utility.raw.startsWith('stroke-$')
    ? _optionalChain$1([utility, 'access', _1100 => _1100.handler
, 'access', _1101 => _1101.handleVariable, 'call', _1102 => _1102()
, 'access', _1103 => _1103.createProperty, 'call', _1104 => _1104('stroke-width')
, 'optionalAccess', _1105 => _1105.updateMeta, 'call', _1106 => _1106('utilities', 'strokeWidth', pluginOrder.strokeWidth, 2, true)])
    : _optionalChain$1([utility, 'access', _1107 => _1107.handler
, 'access', _1108 => _1108.handleStatic, 'call', _1109 => _1109(theme('strokeWidth'))
, 'access', _1110 => _1110.handleNumber, 'call', _1111 => _1111(0, undefined, 'int')
, 'access', _1112 => _1112.createProperty, 'call', _1113 => _1113('stroke-width')
, 'optionalAccess', _1114 => _1114.updateMeta, 'call', _1115 => _1115('utilities', 'strokeWidth', pluginOrder.strokeWidth, 1, true)])
  );
}

function content(utility, { theme }) {
  if (!/^content-(?!$)/.test(utility.raw))
    return;
  return _optionalChain$1([utility, 'access', _1116 => _1116.handler
, 'access', _1117 => _1117.handleBody, 'call', _1118 => _1118(theme('content'))
, 'access', _1119 => _1119.handleSquareBrackets, 'call', _1120 => _1120()
, 'access', _1121 => _1121.handleVariable, 'call', _1122 => _1122()
, 'access', _1123 => _1123.handleString, 'call', _1124 => _1124((string) => `"${string}"`)
, 'access', _1125 => _1125.createProperty, 'call', _1126 => _1126('content')
, 'optionalAccess', _1127 => _1127.updateMeta, 'call', _1128 => _1128('utilities', 'content', pluginOrder.content, 1, true)]);
}

// https://windicss.org/utilities/behaviors.html#accent-color
function accent(utility, { theme }) {
  const color = utility.handler
    .handleColor(theme('boxShadowColor'))
    .handleOpacity(theme('opacity'))
    .handleSquareBrackets()
    .handleVariable()
    .createColorValue('1');

  return new Style(utility.class, new Property('accent-color', color))
    .updateMeta('utilities', 'accentColor', pluginOrder.accentColor, 0, true);
}

const dynamicUtilities = {
  columns: columns,
  container: container,
  space: space,
  divide: divide,
  bg: background,
  basis: basis,
  from: gradientColorFrom,
  via: gradientColorVia,
  to: gradientColorTo,
  border: border,
  rounded: borderRadius,
  cursor: cursor,
  flex: flex,
  order: order,
  font: font,
  h: size,
  leading: lineHeight,
  list: listStyleType,
  m: margin,
  my: margin,
  mx: margin,
  mt: margin,
  mr: margin,
  mb: margin,
  ml: margin,
  min: minMaxSize,
  max: minMaxSize,
  object: objectPosition,
  opacity: opacity,
  outline: outline,
  p: padding,
  py: padding,
  px: padding,
  pt: padding,
  pr: padding,
  pb: padding,
  pl: padding,
  placeholder: placeholder,
  caret: caret,
  tab: tabSize,
  indent: textIndent,
  inset: inset,
  top: inset,
  right: inset,
  bottom: inset,
  left: inset,
  shadow: boxShadow,
  ring: ring,
  blur: blur,
  brightness: brightness,
  contrast: contrast,
  drop: dropShadow,
  grayscale: grayscale,
  hue: hueRotate,
  invert: invert,
  saturate: saturate,
  sepia: sepia,
  backdrop: backdrop,
  fill: fill,
  stroke: stroke,
  text: text,
  tracking: letterSpacing,
  decoration: textDecoration,
  underline: textUnderline,
  w: size,
  z: zIndex,
  gap: gap,
  auto: gridAuto,
  grid: gridTemplate,
  col: gridColumn,
  row: gridRow,
  origin: transformOrigin,
  scale: scale,
  rotate: rotate,
  translate: translate,
  skew: skew,
  perspect: perspective,
  transition: transition,
  ease: transitionTimingFunction,
  duration: duration,
  delay: delay,
  content: content,
  animate: animation,
  accent: accent,
};

const sky = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
};

let warned = false;

const colors =  {
  black: '#000',
  white: '#fff',
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  sky,
  get lightBlue() {
    if (!warned) {
      Console.log('warn - `lightBlue` has been renamed to `sky`.');
      Console.log('warn - Please update your color palette to eliminate this warning.');
      warned = true;
    }
    return sky;
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  warmGray: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  trueGray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  coolGray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  blueGray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  zink: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },
  light: {
    50:  '#fdfdfd',
    100: '#fcfcfc',
    200: '#fafafa',
    300: '#f8f9fa',
    400: '#f6f6f6',
    500: '#f2f2f2',
    600: '#f1f3f5',
    700: '#e9ecef',
    800: '#dee2e6',
    900: '#dde1e3',
  },
  dark: {
    50: '#4a4a4a',
    100: '#3c3c3c',
    200: '#323232',
    300: '#2d2d2d',
    400: '#222222',
    500: '#1f1f1f',
    600: '#1c1c1e',
    700: '#1b1b1b',
    800: '#181818',
    900: '#0f0f0f',
  },
};

const keyframes = {
  spin: {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  ping: {
    '0%': {
      transform: 'scale(1)',
      opacity: '1',
    },
    '75%, 100%': {
      transform: 'scale(2)',
      opacity: '0',
    },
  },
  pulse: {
    '0%, 100%': {
      opacity: '1',
    },
    '50%': {
      opacity: '.5',
    },
  },
  bounce: {
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
    },
    '50%': {
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
    },
  },
  shock: {
    'from, 20%, 53%, 80%, to': {
      animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      transform: 'translate3d(0, 0, 0)',
    },
    '40%, 43%': {
      animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
      transform: 'translate3d(0, -30px, 0)',
    },
    '70%': {
      animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
      transform: 'translate3d(0, -15px, 0)',
    },
    '90%': {
      transform: 'translate3d(0, -4px, 0)',
    },
  },
  flash: {
    'from, 50%, to': {
      opacity: '1',
    },
    '25%, 75%': {
      opacity: '0',
    },
  },
  bubble: {
    'from': {
      transform: 'scale3d(1, 1, 1)',
    },
    '50%': {
      transform: 'scale3d(1.05, 1.05, 1.05)',
    },
    'to': {
      transform: 'scale3d(1, 1, 1)',
    },
  },
  rubberBand: {
    'from': {
      transform: 'scale3d(1, 1, 1)',
    },
    '30%': {
      transform: 'scale3d(1.25, 0.75, 1)',
    },
    '40%': {
      transform: 'scale3d(0.75, 1.25, 1)',
    },
    '50%': {
      transform: 'scale3d(1.15, 0.85, 1)',
    },
    '65%': {
      transform: 'scale3d(0.95, 1.05, 1)',
    },
    '75%': {
      transform: 'scale3d(1.05, 0.95, 1)',
    },
    'to': {
      transform: 'scale3d(1, 1, 1)',
    },
  },
  shakeX: {
    'from, to': {
      transform: 'translate3d(0, 0, 0)',
    },
    '10%, 30%, 50%, 70%, 90%': {
      transform: 'translate3d(-10px, 0, 0)',
    },
    '20%, 40%, 60%, 80%': {
      transform: 'translate3d(10px, 0, 0)',
    },
  },
  shakeY: {
    'from, to': {
      transform: 'translate3d(0, 0, 0)',
    },
    '10%, 30%, 50%, 70%, 90%': {
      transform: 'translate3d(0, -10px, 0)',
    },
    '20%, 40%, 60%, 80%': {
      transform: 'translate3d(0, 10px, 0)',
    },
  },
  headShake: {
    '0%': {
      transform: 'translateX(0)',
    },
    '6.5%': {
      transform: 'translateX(-6px) rotateY(-9deg)',
    },
    '18.5%': {
      transform: 'translateX(5px) rotateY(7deg)',
    },
    '31.5%': {
      transform: 'translateX(-3px) rotateY(-5deg)',
    },
    '43.5%': {
      transform: 'translateX(2px) rotateY(3deg)',
    },
    '50%': {
      transform: 'translateX(0)',
    },
  },
  swing: {
    '20%': {
      transform: 'rotate3d(0, 0, 1, 15deg)',
    },
    '40%': {
      transform: 'rotate3d(0, 0, 1, -10deg)',
    },
    '60%': {
      transform: 'rotate3d(0, 0, 1, 5deg)',
    },
    '80%': {
      transform: 'rotate3d(0, 0, 1, -5deg)',
    },
    'to': {
      transform: 'rotate3d(0, 0, 1, 0deg)',
    },
  },
  tada: {
    'from': {
      transform: 'scale3d(1, 1, 1)',
    },
    '10%, 20%': {
      transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
    },
    '30%, 50%, 70%, 90%': {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
    },
    '40%, 60%, 80%': {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
    },
    'to': {
      transform: 'scale3d(1, 1, 1)',
    },
  },
  wobble: {
    'from': {
      transform: 'translate3d(0, 0, 0)',
    },
    '15%': {
      transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
    },
    '30%': {

      transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
    },
    '45%': {
      transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
    },
    '60%': {
      transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
    },
    '75%': {
      transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  jello: {
    'from, 11.1% to': {
      transform: 'translate3d(0, 0, 0)',
    },
    '22.2%': {
      transform: 'skewX(-12.5deg) skewY(-12.5deg)',
    },
    '33.3%': {

      transform: 'skewX(6.25deg) skewY(6.25deg)',
    },
    '44.4%': {
      transform: 'skewX(-3.125deg) skewY(-3.125deg)',
    },
    '55.5%': {
      transform: 'skewX(1.5625deg) skewY(1.5625deg)',
    },
    '66.6%': {
      transform: 'skewX(-0.78125deg) skewY(-0.78125deg)',
    },
    '77.7%': {
      transform: 'skewX(0.390625deg) skewY(0.390625deg)',
    },
    '88.8%': {
      transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
    },
  },
  heartBeat: {
    '0%': {
      transform: 'scale(1)',
    },
    '14%': {
      transform: 'scale(1.3)',
    },
    '28%': {
      transform: 'scale(1)',
    },
    '42%': {
      transform: 'scale(1.3)',
    },
    '70%': {
      transform: 'scale(1)',
    },
  },
  hinge: {
    '0%': {
      transformOrigin: 'top left',
      animationTimingFunction: 'ease-in-out',
    },
    '20%, 60%': {
      transform: 'rotate3d(0, 0, 1, 80deg)',
      transformOrigin: 'top left',
      animationTimingFunction: 'ease-in-out',
    },
    '40%, 80%': {
      transform: 'rotate3d(0, 0, 1, 60deg)',
      transformOrigin: 'top left',
      animationTimingFunction: 'ease-in-out',
    },
    'to': {
      transform: 'translate3d(0, 700px, 0)',
      opacity: '0',
    },
  },
  jackInTheBox: {
    'from': {
      opacity: '0',
      transformOrigin: 'center bottom',
      transform: 'scale(0.1) rotate(30deg)',
    },
    '50%': {
      transform: 'rotate(-10deg)',
    },
    '70%': {
      transform: 'rotate(3deg)',
    },
    'to': {
      transform: 'scale(1)',
    },
  },

  // light speed
  lightSpeedInRight: {
    'from': {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
    },
    '60%': {
      opacity: '1',
      transform: 'skewX(20deg)',
    },
    '80%': {
      transform: 'skewX(-5deg)',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  lightSpeedInLeft: {
    'from': {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
    },
    '60%': {
      opacity: '1',
      transform: 'skewX(20deg)',
    },
    '80%': {
      transform: 'skewX(-5deg)',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  lightSpeedOutLeft: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0) skewX(30deg)',
    },
  },
  lightSpeedOutRight: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0) skewX(30deg)',
    },
  },
  // flip
  flip: {
    'from': {
      transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)',
      animationTimingFunction: 'ease-out',
    },
    '40%': {
      transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)',
      animationTimingFunction: 'ease-out',
    },
    '50%': {
      transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)',
      animationTimingFunction: 'ease-in',
    },
    '80%': {
      transform: 'perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)',
      animationTimingFunction: 'ease-in',
    },
    'to': {
      transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)',
      animationTimingFunction: 'ease-in',
    },
  },
  flipInX: {
    'from': {
      transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
      animationTimingFunction: 'ease-in',
      opacity: '0',
    },
    '40%': {
      transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
      animationTimingFunction: 'ease-in',
    },
    '60%': {
      transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
      opacity: '1',
    },
    '80%': {
      transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
    },
    'to': {
      transform: 'perspective(400px)',
    },
  },
  flipInY: {
    'from': {
      transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
      animationTimingFunction: 'ease-in',
      opacity: '0',
    },
    '40%': {
      transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
      animationTimingFunction: 'ease-in',
    },
    '60%': {
      transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
      opacity: '1',
    },
    '80%': {
      transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
    },
    'to': {
      transform: 'perspective(400px)',
    },
  },
  flipOutX: {
    'from': {
      transform: 'perspective(400px)',
    },
    '30%': {
      transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
      opacity: '1',
    },
    'to': {
      transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
      opacity: '0',
    },
  },
  flipOutY: {
    'from': {
      transform: 'perspective(400px)',
    },
    '30%': {
      transform: 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
      opacity: '1',
    },
    'to': {
      transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
      opacity: '0',
    },
  },
  // rotate in
  rotateIn: {
    'from': {
      transformOrigin: 'center',
      transform: 'rotate3d(0, 0, 1, -200deg)',
      opacity: '0',
    },
    'to': {
      transformOrigin: 'center',
      transform: 'translate3d(0, 0, 0)',
      opacity: '1',
    },
  },
  rotateInDownLeft: {
    'from': {
      transformOrigin: 'left bottom',
      transform: 'rotate3d(0, 0, 1, -45deg)',
      opacity: '0',
    },
    'to': {
      transformOrigin: 'left bottom',
      transform: 'translate3d(0, 0, 0)',
      opacity: '1',
    },
  },
  rotateInDownRight: {
    'from': {
      transformOrigin: 'right bottom',
      transform: 'rotate3d(0, 0, 1, 45deg)',
      opacity: '0',
    },
    'to': {
      transformOrigin: 'right bottom',
      transform: 'translate3d(0, 0, 0)',
      opacity: '1',
    },
  },
  rotateInUpLeft: {
    'from': {
      transformOrigin: 'left top',
      transform: 'rotate3d(0, 0, 1, 45deg)',
      opacity: '0',
    },
    'to': {
      transformOrigin: 'left top',
      transform: 'translate3d(0, 0, 0)',
      opacity: '1',
    },
  },
  rotateInUpRight: {
    'from': {
      transformOrigin: 'right bottom',
      transform: 'rotate3d(0, 0, 1, -90deg)',
      opacity: '0',
    },
    'to': {
      transformOrigin: 'right bottom',
      transform: 'translate3d(0, 0, 0)',
      opacity: '1',
    },
  },
  rotateOut: {
    'from': {
      transformOrigin: 'center',
      opacity: '1',
    },
    'to': {
      transformOrigin: 'center',
      transform: 'rotate3d(0, 0, 1, 200deg)',
      opacity: '0',
    },
  },
  rotateOutDownLeft: {
    'from': {
      transformOrigin: 'left bottom',
      opacity: '1',
    },
    'to': {
      transformOrigin: 'left bottom',
      transform: 'rotate3d(0, 0, 1, 45deg)',
      opacity: '0',
    },
  },
  rotateOutDownRight: {
    'from': {
      transformOrigin: 'right bottom',
      opacity: '1',
    },
    'to': {
      transformOrigin: 'right bottom',
      transform: 'rotate3d(0, 0, 1, -45deg)',
      opacity: '0',
    },
  },
  rotateOutUpLeft: {
    'from': {
      transformOrigin: 'left bottom',
      opacity: '1',
    },
    'to': {
      transformOrigin: 'left bottom',
      transform: 'rotate3d(0, 0, 1, -45deg)',
      opacity: '0',
    },
  },
  rotateOutUpRight: {
    'from': {
      transformOrigin: 'right bottom',
      opacity: '1',
    },
    'to': {
      transformOrigin: 'left bottom',
      transform: 'rotate3d(0, 0, 1, 90deg)',
      opacity: '0',
    },
  },
  // roll
  rollIn: {
    'from': {
      opacity: '0',
      transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  rollOut: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)',
    },
  },
  // zoom in
  zoomIn: {
    'from': {
      opacity: '0',
      transform: 'scale3d(0.3, 0.3, 0.3)',
    },
    '50%': {
      opacity: '1',
    },
  },
  zoomInDown: {
    'from': {
      opacity: '0',
      transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)',
      animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
    '60%': {
      opacity: '1',
      transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
      animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    },
  },
  zoomInLeft: {
    'from': {
      opacity: '0',
      transform: 'scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)',
      animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
    '60%': {
      opacity: '1',
      transform: 'scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)',
      animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    },
  },
  zoomInRight: {
    'from': {
      opacity: '0',
      transform: 'scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)',
      animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
    '60%': {
      opacity: '1',
      transform: 'scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)',
      animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    },
  },
  zoomInUp: {
    'from': {
      opacity: '0',
      transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)',
      animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
    '60%': {
      opacity: '1',
      transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
      animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    },
  },
  // bounce in
  bounceIn: {
    'from, 20%, 40%, 60%, 80%, to': {
      animationTimingFunction: 'ease-in-out',
    },
    '0%': {
      opacity: '0',
      transform: 'scale3d(0.3, 0.3, 0.3)',
    },
    '20%': {
      transform: 'scale3d(1.1, 1.1, 1.1)',
    },
    '40%': {
      transform: 'scale3d(0.9, 0.9, 0.9)',
    },
    '60%': {
      transform: 'scale3d(1.03, 1.03, 1.03)',
      opacity: '1',
    },
    '80%': {
      transform: 'scale3d(0.97, 0.97, 0.97)',
    },
    'to': {
      opacity: '1',
      transform: 'scale3d(1, 1, 1)',
    },
  },
  bounceInDown: {
    'from, 60%, 75%, 90%, to': {
      animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    },
    '0%': {
      opacity: '0',
      transform: 'translate3d(0, -3000px, 0)',
    },
    '60%': {
      opacity: '1',
      transform: 'translate3d(0, 25px, 0)',
    },
    '75%': {
      transform: 'translate3d(0, -10px, 0)',
    },
    '90%': {
      transform: 'translate3d(0, 5px, 0)',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  bounceInLeft: {
    'from, 60%, 75%, 90%, to': {
      animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    },
    '0%': {
      opacity: '0',
      transform: 'translate3d(-3000px, 0, 0)',
    },
    '60%': {
      opacity: '1',
      transform: 'translate3d(25px, 0, 0)',
    },
    '75%': {
      transform: 'translate3d(-10px, 0, 0)',
    },
    '90%': {
      transform: 'translate3d(5px, 0, 0)',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  bounceInRight: {
    'from, 60%, 75%, 90%, to': {
      animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    },
    '0%': {
      opacity: '0',
      transform: 'translate3d(3000px, 0, 0)',
    },
    '60%': {
      opacity: '1',
      transform: 'translate3d(-25px, 0, 0)',
    },
    '75%': {
      transform: 'translate3d(10px, 0, 0)',
    },
    '90%': {
      transform: 'translate3d(-5px, 0, 0)',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  bounceInUp: {
    'from, 60%, 75%, 90%, to': {
      animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    },
    '0%': {
      opacity: '0',
      transform: 'translate3d(0, 3000px, 0)',
    },
    '60%': {
      opacity: '1',
      transform: 'translate3d(0, -20px, 0)',
    },
    '75%': {
      transform: 'translate3d(0, 10px, 0)',
    },
    '90%': {
      transform: 'translate3d(0, -5px, 0)',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  // bounce out
  bounceOut: {
    '20%': {
      transform: 'scale3d(0.9, 0.9, 0.9)',
    },
    '50%, 55%': {
      opacity: '1',
      transform: 'scale3d(1.1, 1.1, 1.1)',
    },
    'to': {
      opacity: '0',
      transform: 'scale3d(0.3, 0.3, 0.3)',
    },
  },
  bounceOutDown: {
    '20%': {
      transform: 'translate3d(0, 10px, 0)',
    },
    '40%, 45%': {
      opacity: '1',
      transform: 'translate3d(0, -20px, 0)',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(0, 2000px, 0)',
    },
  },
  bounceOutLeft: {
    '20%': {
      opacity: '1',
      transform: 'translate3d(20px, 0, 0)',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(-2000px, 0, 0)',
    },
  },
  bounceOutRight: {
    '20%': {
      opacity: '1',
      transform: 'translate3d(-20px, 0, 0)',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(2000px, 0, 0)',
    },
  },
  bounceOutUp: {
    '20%': {
      transform: 'translate3d(0, -10px, 0)',
    },
    '40%, 45%': {
      opacity: '1',
      transform: 'translate3d(0, 20px, 0)',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(0, -2000px, 0)',
    },
  },
  // zoom out
  zoomOut: {
    'from': {
      opacity: '1',
    },
    '50%': {
      opacity: '0',
      transform: 'scale3d(0.3, 0.3, 0.3)',
    },
    'to': {
      opacity: '0',
    },
  },
  zoomOutDown: {
    '40%': {
      opacity: '1',
      transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
      animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
    'to': {
      opacity: '0',
      transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)',
      transformOrigin: 'center bottom',
      animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    },
  },
  zoomOutLeft: {
    '40%': {
      opacity: '1',
      transform: 'scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)',
    },
    'to': {
      opacity: '0',
      transform: 'scale(0.1) translate3d(-2000px, 0, 0)',
      transformOrigin: 'left center',
    },
  },
  zoomOutRight: {
    '40%': {
      opacity: '1',
      transform: 'scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)',
    },
    'to': {
      opacity: '0',
      transform: 'scale(0.1) translate3d(2000px, 0, 0)',
      transformOrigin: 'right center',
    },
  },
  zoomOutUp: {
    '40%': {
      opacity: '1',
      transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
      animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
    'to': {
      opacity: '0',
      transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)',
      transformOrigin: 'center bottom',
      animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    },
  },
  // slide in
  slideInDown: {
    'from': {
      transform: 'translate3d(0, -100%, 0)',
      visibility: 'visible',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  slideInLeft: {
    'from': {
      transform: 'translate3d(-100%, 0, 0)',
      visibility: 'visible',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  slideInRight: {
    'from': {
      transform: 'translate3d(100%, 0, 0)',
      visibility: 'visible',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  slideInUp: {
    'from': {
      transform: 'translate3d(0, 100%, 0)',
      visibility: 'visible',
    },
    'to': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  // slide out
  slideOutDown: {
    'from': {
      transform: 'translate3d(0, 0, 0)',
    },
    'to': {
      visibility: 'hidden',
      transform: 'translate3d(0, 100%, 0)',
    },
  },
  slideOutLeft: {
    'from': {
      transform: 'translate3d(0, 0, 0)',
    },
    'to': {
      visibility: 'hidden',
      transform: 'translate3d(-100%, 0, 0)',
    },
  },
  slideOutRight: {
    'from': {
      transform: 'translate3d(0, 0, 0)',
    },
    'to': {
      visibility: 'hidden',
      transform: 'translate3d(100%, 0, 0)',
    },
  },
  slideOutUp: {
    'from': {
      transform: 'translate3d(0, 0, 0)',
    },
    'to': {
      visibility: 'hidden',
      transform: 'translate3d(0, -100%, 0)',
    },
  },
  // fade in
  fadeIn: {
    'from': {
      opacity: '0',
    },
    'to': {
      opacity: '1',
    },
  },
  fadeInDown: {
    'from': {
      opacity: '0',
      transform: 'translate3d(0, -100%, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInDownBig: {
    'from': {
      opacity: '0',
      transform: 'translate3d(0, -2000px, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInLeft: {
    'from': {
      opacity: '0',
      transform: 'translate3d(-100%, 0, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInLeftBig: {
    'from': {
      opacity: '0',
      transform: 'translate3d(-2000px, 0, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInRight: {
    'from': {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInRightBig: {
    'from': {
      opacity: '0',
      transform: 'translate3d(2000px, 0, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInUp: {
    'from': {
      opacity: '0',
      transform: 'translate3d(0, 100%, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInUpBig: {
    'from': {
      opacity: '0',
      transform: 'translate3d(0, 2000px, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInTopLeft: {
    'from': {
      opacity: '0',
      transform: 'translate3d(-100%, -100%, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInTopRight: {
    'from': {
      opacity: '0',
      transform: 'translate3d(100%, -100%, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInBottomLeft: {
    'from': {
      opacity: '0',
      transform: 'translate3d(-100%, 100%, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  fadeInBottomRight: {
    'from': {
      opacity: '0',
      transform: 'translate3d(100%, 100%, 0)',
    },
    'to': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
    },
  },
  // fade out
  fadeOut: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
    },
  },
  fadeOutDown: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(0, 100%, 0)',
    },
  },
  fadeOutDownBig: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(0, 2000px, 0)',
    },
  },
  fadeOutLeft: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(-100%, 0, 0)',
    },
  },
  fadeOutLeftBig: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(-2000px, 0, 0)',
    },
  },
  fadeOutRight: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0)',
    },
  },
  fadeOutRightBig: {
    'from': {
      opacity: '1',

    },
    'to': {
      opacity: '0',
      transform: 'translate3d(2000px, 0, 0)',
    },
  },
  fadeOutUp: {
    'from': {
      opacity: '1',
    },
    'to': {
      opacity: '0',
      transform: 'translate3d(0, -100%, 0)',
    },
  },
  fadeOutUpBig: {
    'from': {
      opacity: '1',

    },
    'to': {
      opacity: '0',
      transform: 'translate3d(0, -2000px, 0)',
    },
  },
  fadeOutTopLeft: {
    'from': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',

    },
    'to': {
      opacity: '0',
      transform: 'translate3d(-100%, -100%, 0)',
    },
  },
  fadeOutTopRight: {
    'from': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',

    },
    'to': {
      opacity: '0',
      transform: 'translate3d(100%, -100%, 0)',
    },
  },
  fadeOutBottomLeft: {
    'from': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',

    },
    'to': {
      opacity: '0',
      transform: 'translate3d(-100%, 100%, 0)',
    },
  },
  fadeOutBottomRight: {
    'from': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',

    },
    'to': {
      opacity: '0',
      transform: 'translate3d(100%, 100%, 0)',
    },
  },
  // back in
  backInUp: {
    '0%': {
      opacity: '0.7',
      transform: 'translateY(1200px) scale(0.7)',
    },
    '80%': {
      opacity: '0.7',
      transform: 'translateY(0px) scale(0.7)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
  backInDown: {
    '0%': {
      opacity: '0.7',
      transform: 'translateY(-1200px) scale(0.7)',
    },
    '80%': {
      opacity: '0.7',
      transform: 'translateY(0px) scale(0.7)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
  backInLeft: {
    '0%': {
      opacity: '0.7',
      transform: 'translateX(-2000px) scale(0.7)',
    },
    '80%': {
      opacity: '0.7',
      transform: 'translateX(0px) scale(0.7)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
  backInRight: {
    '0%': {
      opacity: '0.7',
      transform: 'translateX(2000px) scale(0.7)',
    },
    '80%': {
      opacity: '0.7',
      transform: 'translateY(0px) scale(0.7)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
  // back out
  backOutUp: {
    '0%': {
      opacity: '1',
      transform: 'scale(1)',
    },
    '80%': {
      opacity: '0.7',
      transform: 'translateY(0px) scale(0.7)',
    },
    '100%': {
      opacity: '0.7',
      transform: 'translateY(-700px) scale(0.7)',
    },
  },
  backOutDown: {
    '0%': {
      opacity: '1',
      transform: 'scale(1)',
    },
    '80%': {
      opacity: '0.7',
      transform: 'translateY(0px) scale(0.7)',
    },
    '100%': {
      opacity: '0.7',
      transform: 'translateY(700px) scale(0.7)',
    },
  },
  backOutLeft: {
    '0%': {
      opacity: '1',
      transform: 'scale(1)',
    },
    '80%': {
      opacity: '0.7',
      transform: 'translateX(-2000px) scale(0.7)',
    },
    '100%': {
      opacity: '0.7',
      transform: 'translateY(-700px) scale(0.7)',
    },
  },
  backOutRight: {
    '0%': {
      opacity: '1',
      transform: 'scale(1)',
    },
    '80%': {
      opacity: '0.7',
      transform: 'translateY(0px) scale(0.7)',
    },
    '100%': {
      opacity: '0.7',
      transform: 'translateX(2000px) scale(0.7)',
    },
  },
};

const createPlugin = (
  plugin,
  config
) => {
  return {
    handler: plugin,
    config,
  };
};

createPlugin.withOptions = function(
  pluginFunction,
  configFunction = () => ({}),
) {
  const optionsFunction = function (options= {} ) {
    return {
      __options: options,
      handler: pluginFunction(options),
      config: configFunction(options),
    };
  };

  optionsFunction.__isOptionsFunction = true ;

  // Expose plugin dependencies so that `object-hash` returns a different
  // value if anything here changes, to ensure a rebuild is triggered.
  optionsFunction.__pluginFunction = pluginFunction;
  optionsFunction.__configFunction = configFunction;

  return optionsFunction;
};

function _nullishCoalesce$1(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

const defaultColors = {
  transparent: 'transparent',
  current: 'currentColor',
  inherit: 'inherit',
  light: colors.light,
  dark: colors.dark,
  black: colors.black,
  white: colors.white,
  gray: colors.coolGray,
  red: colors.red,
  yellow: colors.amber,
  green: colors.emerald,
  blue: colors.blue,
  indigo: colors.indigo,
  purple: colors.violet,
  pink: colors.pink,
  rose: colors.rose,
  fuchsia: colors.fuchsia,
  violet: colors.violet,
  cyan: colors.cyan,
  teal: colors.teal,
  emerald: colors.emerald,
  lime: colors.lime,
  amber: colors.amber,
  orange: colors.orange,
  sky: colors.sky,
  'light-blue': colors.sky,
  'warm-gray': colors.warmGray,
  'true-gray': colors.trueGray,
  'cool-gray': colors.coolGray,
  'blue-gray': colors.blueGray,
};

// tShirtScale describes the sizes xs - 7xl
const tShirtScale = {
  'xs': '20rem',
  'sm': '24rem',
  'md': '28rem',
  'lg': '32rem',
  'xl': '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
};

const baseConfig = {
  // purge: [],
  presets: [],
  prefixer: true,
  attributify: false,
  darkMode: 'class', // or 'media'
  theme: {
    orientation: {
      portrait: 'portrait',
      landscape: 'landscape',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: defaultColors,
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
      // float -> float/4 rem
    },
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
      'shock': {
        animation: 'shock',
        transformOrigin: 'center bottom',
      },
      'flash': 'flash',
      'bubble': 'bubble',
      'rubber-band': 'rubberBand',
      'shake-x': 'shakeX',
      'shake-y': 'shakeY',
      'head-shake': 'headShake 1s ease-in-out',
      'swing': {
        animation: 'swing',
        transformOrigin: 'top center',
      },
      'tada': 'tada',
      'wobble': 'wobble',
      'jello': 'jello',
      'heart-beat': 'heartBeat 1s ease-in-out',
      'hinge': 'hinge 2s',
      'jack-in': 'jackInTheBox',
      'light-speed-in-left': 'lightSpeedInLeft',
      'light-speed-in-right': 'lightSpeedInRight',
      'light-speed-out-left': 'lightSpeedOutLeft',
      'light-speed-out-right': 'lightSpeedOutRight',
      'flip': {
        animation: 'flip',
        backfaceVisibility: 'visible',
      },
      'flip-in-x': {
        animation: 'flipInX',
        backfaceVisibility: 'visible',
      },
      'flip-in-y': {
        animation: 'flipInY',
        backfaceVisibility: 'visible',
      },
      'flip-out-x': {
        animation: 'flipOutX',
        backfaceVisibility: 'visible',
      },
      'flip-out-y': {
        animation: 'flipOutY',
        backfaceVisibility: 'visible',
      },
      'rotate-in': 'rotateIn',
      'rotate-in-down-left': 'rotateInDownLeft',
      'rotate-in-down-right': 'rotateInDownRight',
      'rotate-in-up-left': 'rotateInUpLeft',
      'rotate-in-up-right': 'rotateInUpRight',
      'rotate-out': 'rotateOut',
      'rotate-out-down-left': 'rotateOutDownLeft',
      'rotate-out-down-right': 'rotateOutDownRight',
      'rotate-out-up-left': 'rotateOutUpLeft',
      'rotate-out-up-right': 'rotateOutUpRight',
      'roll-in': 'rollIn',
      'roll-out': 'rollOut',
      'zoom-in': 'zoomIn',
      'zoom-in-down': 'zoomInDown',
      'zoom-in-left': 'zoomInLeft',
      'zoom-in-right': 'zoomInRight',
      'zoom-in-up': 'zoomInUp',
      'bounce-in': 'bounceIn 750ms',
      'bounce-in-down': 'bounceInDown',
      'bounce-in-left': 'bounceInLeft',
      'bounce-in-right': 'bounceInRight',
      'bounce-in-up': 'bounceInUp',
      'bounce-out': 'bounceOut 750ms',
      'bounce-out-down': 'bounceOutDown',
      'bounce-out-left': 'bounceOutLeft',
      'bounce-out-right': 'bounceOutRight',
      'bounce-out-up': 'bounceOutUp',
      'zoom-out': 'zoomOut',
      'zoom-out-down': 'zoomOutDown',
      'zoom-out-left': 'zoomOutLeft',
      'zoom-out-right': 'zoomOutRight',
      'zoom-out-up': 'zoomOutUp',
      'slide-in-down': 'slideInDown',
      'slide-in-left': 'slideInLeft',
      'slide-in-right': 'slideInRight',
      'slide-in-up': 'slideInUp',
      'slide-out-down': 'slideOutDown',
      'slide-out-left': 'slideOutLeft',
      'slide-out-right': 'slideOutRight',
      'slide-out-up': 'slideOutUp',
      'fade-in': 'fadeIn',
      'fade-in-down': 'fadeInDown',
      'fade-in-down-big': 'fadeInDownBig',
      'fade-in-left': 'fadeInLeft',
      'fade-in-left-big': 'fadeInLeftBig',
      'fade-in-right': 'fadeInRight',
      'fade-in-right-big': 'fadeInRightBig',
      'fade-in-up': 'fadeInUp',
      'fade-in-up-big': 'fadeInUpBig',
      'fade-in-top-left': 'fadeInTopLeft',
      'fade-in-top-right': 'fadeInTopRight',
      'fade-in-bottom-left': 'fadeInBottomLeft',
      'fade-in-bottom-right': 'fadeInBottomRight',
      'fade-out': 'fadeOut',
      'fade-out-down': 'fadeOutDown',
      'fade-out-down-big': 'fadeOutDownBig',
      'fade-out-left': 'fadeOutLeft',
      'fade-out-left-big': 'fadeOutLeftBig',
      'fade-out-right': 'fadeOutRight',
      'fade-out-right-big': 'fadeOutRightBig',
      'fade-out-up': 'fadeOutUp',
      'fade-out-up-big': 'fadeOutUpBig',
      'back-in-up': 'backInUp',
      'back-in-down': 'backInDown',
      'back-in-left': 'backInLeft',
      'back-in-right': 'backInRight',
      'back-out-up': 'backOutUp',
      'back-out-down': 'backOutDown',
      'back-out-left': 'backOutLeft',
      'back-out-right': 'backOutRight',
    },
    animationDuration: {
      DEFAULT: '1000ms',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
      1500: '1500ms',
      2000: '2000ms',
      2500: '2500ms',
      3000: '3000ms',
      // int >=0 -> int ms
    },
    animationDelay: {
      DEFAULT: '500ms',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
      1500: '1500ms',
      2000: '2000ms',
      2500: '2500ms',
      3000: '3000ms',
      // int >=0 -> int ms
    },
    animationIterationCount: {
      DEFAULT: '1',
      loop: 'infinite',
      'repeat-1': '1',
      'repeat-2': '2',
      'repeat-3': '3',
      'repeat-4': '4',
      'repeat-5': '5',
      'repeat-6': '6',
      'repeat-7': '7',
      'repeat-8': '8',
      'repeat-9': '9',
      'repeat-10': '10',
      'repeat-11': '11',
      'repeat-12': '12',
    },
    animationTimingFunction: {
      DEFAULT: 'ease',
      linear: 'linear',
      in: 'ease-in',
      out: 'ease-out',
      'in-out': 'ease-in-out',
    },
    backdropBlur: (theme) => theme('blur'),
    backdropBrightness: (theme) => theme('brightness'),
    backdropContrast: (theme) => theme('contrast'),
    backdropGrayscale: (theme) => theme('grayscale'),
    backdropHueRotate: (theme) => theme('hueRotate'),
    backdropInvert: (theme) => theme('invert'),
    backdropOpacity: (theme) => theme('opacity'),
    backdropSaturate: (theme) => theme('saturate'),
    backdropSepia: (theme) => theme('sepia'),
    backgroundColor: (theme) => theme('colors'),
    backgroundImage: {
      none: 'none',
      'gradient-1': 'linear-gradient(135deg, #FDEB71 10%, #F8D800 100%)',
      'gradient-2': 'linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)',
      'gradient-3': 'linear-gradient(135deg, #FEB692 10%, #EA5455 100%)',
      'gradient-4': 'linear-gradient(135deg, #CE9FFC 10%, #7367F0 100%)',
      'gradient-5': 'linear-gradient(135deg, #90F7EC 10%, #32CCBC 100%)',
      'gradient-6': 'linear-gradient(135deg, #FFF6B7 10%, #F6416C 100%)',
      'gradient-7': 'linear-gradient(135deg, #81FBB8 10%, #28C76F 100%)',
      'gradient-8': 'linear-gradient(135deg, #E2B0FF 10%, #9F44D3 100%)',
      'gradient-9': 'linear-gradient(135deg, #F97794 10%, #623AA2 100%)',
      'gradient-10': 'linear-gradient(135deg, #FCCF31 10%, #F55555 100%)',
      'gradient-11': 'linear-gradient(135deg, #F761A1 10%, #8C1BAB 100%)',
      'gradient-12': 'linear-gradient(135deg, #43CBFF 10%, #9708CC 100%)',
      'gradient-13': 'linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%)',
      'gradient-14': 'linear-gradient(135deg, #FAD7A1 10%, #E96D71 100%)',
      'gradient-15': 'linear-gradient(135deg, #FFD26F 10%, #3677FF 100%)',
      'gradient-16': 'linear-gradient(135deg, #A0FE65 10%, #FA016D 100%)',
      'gradient-17': 'linear-gradient(135deg, #FFDB01 10%, #0E197D 100%)',
      'gradient-18': 'linear-gradient(135deg, #FEC163 10%, #DE4313 100%)',
      'gradient-19': 'linear-gradient(135deg, #92FFC0 10%, #002661 100%)',
      'gradient-20': 'linear-gradient(135deg, #EEAD92 10%, #6018DC 100%)',
      'gradient-21': 'linear-gradient(135deg, #F6CEEC 10%, #D939CD 100%)',
      'gradient-22': 'linear-gradient(135deg, #52E5E7 10%, #130CB7 100%)',
      'gradient-23': 'linear-gradient(135deg, #F1CA74 10%, #A64DB6 100%)',
      'gradient-24': 'linear-gradient(135deg, #E8D07A 10%, #5312D6 100%)',
      'gradient-25': 'linear-gradient(135deg, #EECE13 10%, #B210FF 100%)',
      'gradient-26': 'linear-gradient(135deg, #79F1A4 10%, #0E5CAD 100%)',
      'gradient-27': 'linear-gradient(135deg, #FDD819 10%, #E80505 100%)',
      'gradient-28': 'linear-gradient(135deg, #FFF3B0 10%, #CA26FF 100%)',
      'gradient-29': 'linear-gradient(135deg, #FFF5C3 10%, #9452A5 100%)',
      'gradient-30': 'linear-gradient(135deg, #F05F57 10%, #360940 100%)',
      'gradient-31': 'linear-gradient(135deg, #2AFADF 10%, #4C83FF 100%)',
      'gradient-32': 'linear-gradient(135deg, #FFF886 10%, #F072B6 100%)',
      'gradient-33': 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
      'gradient-34': 'linear-gradient(135deg, #F5CBFF 10%, #C346C2 100%)',
      'gradient-35': 'linear-gradient(135deg, #FFF720 10%, #3CD500 100%)',
      'gradient-36': 'linear-gradient(135deg, #FF6FD8 10%, #3813C2 100%)',
      'gradient-37': 'linear-gradient(135deg, #EE9AE5 10%, #5961F9 100%)',
      'gradient-38': 'linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%)',
      'gradient-39': 'linear-gradient(135deg, #C2FFD8 10%, #465EFB 100%)',
      'gradient-40': 'linear-gradient(135deg, #FD6585 10%, #0D25B9 100%)',
      'gradient-41': 'linear-gradient(135deg, #FD6E6A 10%, #FFC600 100%)',
      'gradient-42': 'linear-gradient(135deg, #65FDF0 10%, #1D6FA3 100%)',
      'gradient-43': 'linear-gradient(135deg, #6B73FF 10%, #000DFF 100%)',
      'gradient-44': 'linear-gradient(135deg, #FF7AF5 10%, #513162 100%)',
      'gradient-45': 'linear-gradient(135deg, #F0FF00 10%, #58CFFB 100%)',
      'gradient-46': 'linear-gradient(135deg, #FFE985 10%, #FA742B 100%)',
      'gradient-47': 'linear-gradient(135deg, #FFA6B7 10%, #1E2AD2 100%)',
      'gradient-48': 'linear-gradient(135deg, #FFAA85 10%, #B3315F 100%)',
      'gradient-49': 'linear-gradient(135deg, #72EDF2 10%, #5151E5 100%)',
      'gradient-50': 'linear-gradient(135deg, #FF9D6C 10%, #BB4E75 100%)',
      'gradient-51': 'linear-gradient(135deg, #F6D242 10%, #FF52E5 100%)',
      'gradient-52': 'linear-gradient(135deg, #69FF97 10%, #00E4FF 100%)',
      'gradient-53': 'linear-gradient(135deg, #3B2667 10%, #BC78EC 100%)',
      'gradient-54': 'linear-gradient(135deg, #70F570 10%, #49C628 100%)',
      'gradient-55': 'linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%)',
      'gradient-56': 'linear-gradient(135deg, #FAB2FF 10%, #1904E5 100%)',
      'gradient-57': 'linear-gradient(135deg, #81FFEF 10%, #F067B4 100%)',
      'gradient-58': 'linear-gradient(135deg, #FFA8A8 10%, #FCFF00 100%)',
      'gradient-59': 'linear-gradient(135deg, #FFCF71 10%, #2376DD 100%)',
      'gradient-60': 'linear-gradient(135deg, #FF96F9 10%, #C32BAC 100%)',

      'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
      'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    },
    backgroundOpacity: (theme) => theme('opacity'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    blur: {
      DEFAULT: '8px',
      0: '0',
      sm: '4px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '40px',
      '3xl': '64px',
    },
    borderColor: (theme) => ({
      DEFAULT: theme('colors.gray.200', 'currentColor'),
      ...(_nullishCoalesce$1(theme('colors'), () => ( {}))),
    }),
    borderOpacity: (theme) => theme('opacity'),
    borderRadius: {
      DEFAULT: '0.25rem',
      none: '0px',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      '1': '100%',
      full: '9999px',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
      // int >=0 -> int px
    },
    boxShadow: {
      DEFAULT: '0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1)',
      sm: '0 1px 2px 0 rgb(0 0 0/0.05)',
      md: '0 4px 6px -1px rgb(0 0 0/0.1),0 2px 4px -2px rgb(0 0 0/0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0/0.1),0 4px 6px -4px rgb(0 0 0/0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0/0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0/0.05)',
      none: '0 0 #0000',
    },
    boxShadowColor: (theme) => theme('colors'),
    brightness: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    caretColor: (theme) => ({
      auto: 'auto',
      ...(_nullishCoalesce$1(theme('colors'), () => ( {}))),
    }),
    caretOpacity: (theme) => theme('opacity'),
    columns: {
      ...tShirtScale,
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      '3xs': '16rem',
      '2xs': '18rem',
    },
    container: {},
    content: {
      DEFAULT: '""',
      'open-quote': 'open-quote',
      'close-quote': 'close-quote',
      'open-square': '"["',
      'close-square': '"]"',
      'open-curly': '"{"',
      'close-curly': '"}"',
      'open-bracket': '"("',
      'close-bracket': '")"',
    },
    contrast: {
      0: '0',
      50: '.5',
      75: '.75',
      100: '1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      help: 'help',
      'not-allowed': 'not-allowed',
    },
    divideColor: (theme) => theme('borderColor'),
    divideOpacity: (theme) => theme('borderOpacity'),
    divideWidth: (theme) => theme('borderWidth'),
    dropShadow: {
      DEFAULT: ['0 1px 2px rgba(0, 0, 0, 0.1)', '0 1px 1px rgba(0, 0, 0, 0.06)'],
      sm: '0 1px 1px rgba(0,0,0,0.05)',
      md: ['0 4px 3px rgba(0, 0, 0, 0.07)', '0 2px 2px rgba(0, 0, 0, 0.06)'],
      lg: ['0 10px 8px rgba(0, 0, 0, 0.04)', '0 4px 3px rgba(0, 0, 0, 0.1)'],
      xl: ['0 20px 13px rgba(0, 0, 0, 0.03)', '0 8px 5px rgba(0, 0, 0, 0.08)'],
      '2xl': '0 25px 25px rgba(0, 0, 0, 0.15)',
      none: '0 0 #0000',
    },
    fill: (theme) => ({
      ...(_nullishCoalesce$1(theme('colors'), () => ( {}))),
      none: 'none',
    }),
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      DEFAULT: '1',
      0: '0',
    },
    flexShrink: {
      DEFAULT: '1',
      0: '0',
    },
    fontFamily: {
      sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
      // nxl -> [n rem, lineHeight: 1]
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
      // int[0, 900] -> int
    },
    gap: (theme) => theme('spacing'),
    gradientColorStops: (theme) => theme('colors'),
    grayscale: {
      DEFAULT: '100%',
      0: '0',
    },
    gridAutoColumns: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
    },
    gridAutoRows: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
    },
    gridColumn: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
      // span-int(>=1) -> span int / span int
      'span-full': '1 / -1',
    },
    gridColumnEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      // int >=1 -> int
    },
    gridColumnStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      // int >=1 -> int
    },
    gridRow: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      // span-int(>=1) -> span int / span int
      'span-full': '1 / -1',
    },
    gridRowStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      // int >=1 -> int
    },
    gridRowEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      // int >=1 -> int
    },
    gridTemplateColumns: {
      none: 'none',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
      // int >=1 -> repeat(int, minmax(0, 1fr))
    },
    gridTemplateRows: {
      none: 'none',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      // int >=1 -> repeat(int, minmax(0, 1fr))
    },
    height: (theme, { breakpoints }) => ({
      ...(_nullishCoalesce$1(theme('spacing'), () => ( {}))),
      ...tShirtScale,
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      // fraction -> percent
      auto: 'auto',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      prose: '65ch',
      screen: '100vh',
      ...breakpoints(_nullishCoalesce$1(theme('screens'), () => ( {}))),
    }),
    hueRotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-60': '-60deg',
      '-30': '-30deg',
      '-15': '-15deg',
      0: '0deg',
      15: '15deg',
      30: '30deg',
      60: '60deg',
      90: '90deg',
      180: '180deg',
    },
    inset: (theme, { negative }) => ({
      auto: 'auto',
      ...(_nullishCoalesce$1(theme('spacing'), () => ( {}))),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%',
      // fraction -> percent
      // ...negative
    }),
    invert: {
      DEFAULT: '100%',
      0: '0',
    },
    keyframes,
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      // int>=0 -> int/4 rem
    },
    listStyleType: {
      none: 'none',
      circle: 'circle',
      square: 'square',
      disc: 'disc',
      decimal: 'decimal',
      'zero-decimal': 'decimal-leading-zero',
      greek: 'lower-greek',
      roman: 'lower-roman',
      alpha: 'lower-alpha',
      'upper-roman': 'upper-roman',
      'upper-alpha': 'upper-alpha',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...(_nullishCoalesce$1(theme('spacing'), () => ( {}))),
      ...negative(theme('spacing')),
      // ...negative
    }),
    maxHeight: (theme, { breakpoints }) => ({
      ...breakpoints(_nullishCoalesce$1(theme('screens'), () => ( {}))),
      ...(_nullishCoalesce$1(theme('spacing'), () => ( {}))),
      ...tShirtScale,
      none: 'none',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      prose: '65ch',
      screen: '100vh',
    }),
    maxWidth: (theme, { breakpoints }) => ({
      ...breakpoints(_nullishCoalesce$1(theme('screens'), () => ( {}))),
      ...(_nullishCoalesce$1(theme('spacing'), () => ( {}))),
      ...tShirtScale,
      none: 'none',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      prose: '65ch',
      screen: '100vw',
    }),
    minHeight: (theme) => theme('maxHeight'),
    minWidth: (theme) => theme('maxWidth'),
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1',
      // float -> float/100
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      // int[1, 9999]
    },
    outline: {
      none: ['2px solid transparent', '2px'],
      // white: ['2px dotted white', '2px'],
      // black: ['2px dotted black', '2px'],
    },
    outlineColor: (theme) => theme('colors'),
    padding: (theme) => theme('spacing'),
    perspective: (theme) => ({
      ...(_nullishCoalesce$1(theme('spacing'), () => ( {}))),
      ...tShirtScale,
      none: 'none',
    }),
    perspectiveOrigin: {
      center: 'center',
      top: 'top',
      'top-right': 'top right',
      right: 'right',
      'bottom-right': 'bottom right',
      bottom: 'bottom',
      'bottom-left': 'bottom left',
      left: 'left',
      'top-left': 'top left',
    },
    placeholderColor: (theme) => theme('colors'),
    placeholderOpacity: (theme) => theme('opacity'),
    ringColor: (theme) => ({
      DEFAULT: theme('colors.blue.500', '#3b82f6'),
      ...(_nullishCoalesce$1(theme('colors'), () => ( {}))),
    }),
    ringOffsetColor: (theme) => theme('colors'),
    ringOffsetWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
      // float -> float px
    },
    ringOpacity: (theme) => ({
      DEFAULT: '0.5',
      ...(_nullishCoalesce$1(theme('opacity'), () => ( {}))),
    }),
    ringWidth: {
      DEFAULT: '3px',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
      // float -> float px
    },
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '-2': '-2deg',
      '-1': '-1deg',
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
      45: '45deg',
      90: '90deg',
      180: '180deg',
      // float[0, 360] -> float[0deg, 360deg]
      // ...negative
    },
    saturate: {
      DEFAULT: '0',
      0: '0',
      50: '.5',
      100: '1',
      150: '1.5',
      200: '2',
    },
    scale: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      // int >=0 -> int/100
    },
    sepia: {
      DEFAULT: '100%',
      0: '0',
    },
    skew: {
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '-2': '-2deg',
      '-1': '-1deg',
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
      // float[0, 360] -> float[0deg, 360deg]
      // ...negative
    },
    space: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    stroke: (theme) => ({
      ...(_nullishCoalesce$1(theme('colors'), () => ( {}))),
      none: 'none',
    }),
    strokeWidth: {
      0: '0',
      1: '1',
      2: '2',
    },
    strokeDashArray: {
      0: '0',
      1: '1',
      2: '2',
    },
    strokeDashOffset: {
      0: '0',
      1: '1',
      2: '2',
    },
    tabSize: {
      DEFAULT: '4',
      0: '0',
      2: '2',
      4: '4',
      8: '8',
      // int >=0 -> int px
    },
    textColor: (theme) => theme('colors'),
    textOpacity: (theme) => theme('opacity'),
    textShadow: {
      DEFAULT: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
      sm: '1px 1px 3px rgb(36 37 47 / 25%)',
      md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
      lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
      xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
      none: 'none',
    },
    textDecorationColor: (theme) => theme('colors'),
    textDecorationOpacity: (theme) => theme('opacity'),
    textDecorationLength: {
      'auto': 'auto',
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    textDecorationOffset: {
      'auto': 'auto',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    textDecorationThickness: {
      'auto': 'auto',
      'from-font': 'from-font',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    textIndent: {
      DEFAULT: '1.5rem',
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    textStrokeColor: (theme) => ({
      DEFAULT: theme('colors.gray.200', 'currentColor'),
      ...(_nullishCoalesce$1(theme('colors'), () => ( {}))),
    }),
    textStrokeWidth: {
      DEFAULT: 'medium',
      'none': '0',
      'sm': 'thin',
      'md': 'medium',
      'lg': 'thick',
    },
    transformOrigin: {
      center: 'center',
      top: 'top',
      'top-right': 'top right',
      right: 'right',
      'bottom-right': 'bottom right',
      bottom: 'bottom',
      'bottom-left': 'bottom left',
      left: 'left',
      'top-left': 'top left',
    },
    transitionDuration: {
      DEFAULT: '150ms',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
      // int >=0 -> int ms
    },
    transitionDelay: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
      // int >=0 -> int ms
    },
    transitionProperty: {
      DEFAULT: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      none: 'none',
      all: 'all',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    translate: (theme, { negative }) => ({
      ...(_nullishCoalesce$1(theme('spacing'), () => ( {}))),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%',
      // fraction -> percent
      // ...negative
    }),
    width: (theme, { breakpoints }) => ({
      ...(_nullishCoalesce$1(theme('spacing'), () => ( {}))),
      ...tShirtScale,
      // fraction -> percent
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      auto: 'auto',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      prose: '65ch',
      screen: '100vw',
      ...breakpoints(_nullishCoalesce$1(theme('screens'), () => ( {}))),
    }),
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      // int[0, 99999] ->  int[0, 99999]
      // ...negative
    },
  },
  variantOrder: variantOrder,
  plugins: [
    createPlugin(({ addUtilities }) => {
      addUtilities({
        '.before\\:contents': {
          '&::before': {
            content: '""',
            display: 'contents',
          },
        },
        '.after\\:contents': {
          '&::after': {
            content: '""',
            display: 'contents',
          },
        },
      });
    }),
  ],
  handlers: {
    static : true,
    time: true,
    color: true,
    opacity: true,
    number : true,
    string: true,
    bracket: true,
    hex: true,
    nxl: true,
    fraction: true,
    size: true,
    variable: true,
    negative: true,
  },
};

// https://drafts.csswg.org/cssom/#serialize-an-identifier

function cssEscape(str) {
  const length = str.length;
  let index = -1;
  let codeUnit;
  let result = '';
  const firstCodeUnit = str.charCodeAt(0);
  while (++index < length) {
    codeUnit = str.charCodeAt(index);
    // Note: there’s no need to special-case astral symbols, surrogate
    // pairs, or lone surrogates.

    // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
    // (U+FFFD).
    if (codeUnit === 0x0000) {
      result += '\uFFFD';
      continue;
    }

    // Comma
    if (codeUnit === 44){
      result += '\\2c ';
      continue;
    }

    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      (codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
      codeUnit === 0x007f ||
      // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      (index === 1 &&
        codeUnit >= 0x0030 &&
        codeUnit <= 0x0039 &&
        firstCodeUnit === 0x002d)
    ) {
      // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
      result += '\\' + codeUnit.toString(16) + ' ';
      continue;
    }

    if (
      // If the character is the first character and is a `-` (U+002D), and
      // there is no second character, […]
      index === 0 &&
      length === 1 &&
      codeUnit === 0x002d
    ) {
      result += '\\' + str.charAt(index);
      continue;
    }

    // If the character is not handled by one of the above rules and is
    // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
    // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
    // U+005A), or [a-z] (U+0061 to U+007A), […]
    if (
      codeUnit >= 0x0080 ||
      codeUnit === 0x002d ||
      codeUnit === 0x005f ||
      (codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
      (codeUnit >= 0x0061 && codeUnit <= 0x007a)
    ) {
      // the character itself
      result += str.charAt(index);
      continue;
    }

    // Otherwise, the escaped character.
    // https://drafts.csswg.org/cssom/#escape-a-character
    result += '\\' + str.charAt(index);
  }
  return result;
}

function combineConfig(
  a,
  b,
  arrayMergeDepth = Infinity,
) {
  const output = { ...a };
  for (const [key_of_b, value_of_b] of Object.entries(b)) {
    if (key_of_b in a) {
      const value_of_a = a[key_of_b];
      if (value_of_a !== value_of_b) {
        if (value_of_b !== null && (value_of_b ).constructor !== Object) {
          if (arrayMergeDepth > 0 && Array.isArray(value_of_a) && Array.isArray(value_of_b)) {
            output[key_of_b] = [...value_of_a, ...value_of_b];
          } else {
            output[key_of_b] = value_of_b;
          }
        } else if (value_of_a !== null && (value_of_a ).constructor === Object) {
          output[key_of_b] = combineConfig(
            value_of_a ,
            value_of_b ,
            arrayMergeDepth - 1
          );
        } else if (Array.isArray(value_of_a)){
          output[key_of_b] = [
            ...value_of_a,
            ...Array.isArray(value_of_b) ? value_of_b : [value_of_b],
          ];
        } else {
          output[key_of_b] = {
            DEFAULT: value_of_a,
            ...value_of_b ,
          };
        }
      }
    } else {
      output[key_of_b] = value_of_b;
    }
  }
  return output;
}

function diffConfig(
  a,
  b,
) {
  if (typeof a !== typeof b) return b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (JSON.stringify(a) !== JSON.stringify(b)) return b;
    return;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const output = {};
    for (const [key, value] of Object.entries(b)) {
      if (key in a) {
        const diff = diffConfig((a )[key], (b )[key]);
        if (diff) output[key] = diff;
      } else {
        output[key] = value;
      }
    }
    if (Object.keys(output).length === 0) return;
    return output;
  }
  if (a !== b) return b;
}

function createHandler(handlers = { static: true }) {
  return (utility, value, color) => {
    const handler = {
      utility,
      value,
      color,
      _amount: utility.amount,

      handleStatic: handlers.static ? (map, callback) => {
        if (handler.value) return handler;
        if (map && typeof map === 'object') {
          const knownMap = map ;
          if (knownMap.DEFAULT) knownMap[handler.utility.raw] = knownMap.DEFAULT;
          if (handler._amount in knownMap)
            handler.value = callback
              ? callback(handler._amount)
              : `${knownMap[handler._amount]}`;
        }
        return handler;
      } : () => handler,

      handleBody: handlers.static ? (map, callback) => {
        if (handler.value) return handler;
        if (map && typeof map === 'object') {
          const knownMap = map ;
          if (knownMap.DEFAULT) knownMap[''] = knownMap.DEFAULT;
          const body = handler.utility.body;
          if (body in knownMap)
            handler.value = callback ? callback(body) : `${knownMap[body]}`;
        }
        return handler;
      } : () => handler,

      handleNumber: handlers.number ? (start = -Infinity, end = Infinity, type = 'int', callback) => {
        if (handler.value) return handler;
        if (isNumber(handler._amount, start, end, type))
          handler.value = callback ? callback(+handler._amount) : handler._amount;
        return handler;
      } : () => handler,

      handleTime: handlers.time ? (start = -Infinity, end = Infinity, type = 'int', callback) => {
        if (handler.value) return handler;
        let unit = 'ms';
        let amount = handler._amount;
        if (amount.endsWith('ms')) {
          amount = amount.slice(0, -2);
        } else if (amount.endsWith('s')) {
          unit = 's';
          amount = amount.slice(0, -1);
        } else {
          return handler;
        }
        if (isNumber(amount, start, end, type))
          handler.value = callback ? callback(unit === 's' ? +amount * 1000 : +amount) : handler._amount;
        return handler;
      } : () => handler,

      handleString: handlers.string ? (callback) => {
        if (handler.value) return handler;
        handler.value = callback(handler.utility.body);
        return handler;
      } : () => handler,

      handleSquareBrackets: handlers.bracket ? (callback) => {
        if (handler.value) return handler;
        if (handler._amount[0] === '[' && handler._amount[handler._amount.length-1] === ']') {
          let value = handler._amount.slice(1, -1).replace(/_/g, ' '); // replace _ to space
          if (value.indexOf('calc(') > -1) {
            value = value.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, '$1 $2 ');
          }
          handler.value = callback
            ? callback(value)
            : value;
        }
        return handler;
      } : () => handler,

      handleSpacing: handlers.number ? () => {
        // just a short-hand for handle spacing.
        return handler.handleNumber(0, undefined, 'float', (number) =>
          number === 0 ? '0px' : `${roundUp(number / 4, 6)}rem`
        );
      }: () => handler,

      handleNxl: handlers.nxl ? (callback) => {
        if (handler.value) return handler;
        if (/^\d*xl$/.test(handler._amount))
          handler.value = callback
            ? callback(handler._amount === 'xl' ? 1 : parseInt(handler._amount))
            : parseInt(handler._amount).toString();
        return handler;
      }: () => handler,

      handleFraction: handlers.fraction ? (callback) => {
        if (handler.value) return handler;
        if (isFraction(handler._amount))
          handler.value = callback
            ? callback(handler._amount)
            : fracToPercent(handler._amount);
        return handler;
      } : () => handler,

      handleSize: handlers.size ? (callback) => {
        if (handler.value) return handler;
        if (isSize(handler._amount))
          handler.value = callback ? callback(handler._amount) : handler._amount;
        return handler;
      } : () => handler,

      handleVariable: handlers.variable ? (callback) => {
        if (handler.value) return handler;
        const matchVariable = handler.utility.raw.match(/-\$[\w-]+/);
        if (matchVariable) {
          const variableName = matchVariable[0].substring(2);
          handler.value = callback ? callback(variableName) : `var(--${variableName})`;
        }
        return handler;
      } : () => handler,

      handleColor: handlers.color ? (map = defaultColors) => {
        if (handler.value) return handler;
        let color;
        if (map && typeof map === 'object') {
          const colors = flatColors(map );
          const body = handler.utility.raw.replace(/^ring-offset|outline-solid|outline-dotted/, 'head').replace(/^\w+-/, '');
          const [ key, opacity ] = splitColorGroup(body);
          handler.opacity = opacity;
          if (key in colors) {
            color = colors[key];
          } else if (handlers.hex && key.startsWith('hex-')) {
            const hex = key.slice(4);
            if(hex2RGB(hex)) color = '#' + hex;
          }
          if (typeof color === 'string') {
            handler.value = color;
          } else if (typeof color === 'function') {
            handler.color = color;
          }
        }
        return handler;
      }: () => handler,

      handleOpacity: handlers.opacity ? (map) => {
        if (handler.opacity && typeof map === 'object') {
          const _map = map ;
          if (handlers.static && handler.opacity in _map) {
            handler.opacity = _map[handler.opacity];
          } else if (handlers.number && isNumber(handler.opacity, 0, 100, 'int')) {
            handler.opacity = (+handler.opacity / 100).toString();
          } else if (handlers.variable && handler.opacity.charAt(0) === '$') {
            handler.opacity = `var(--${handler.opacity.slice(1)})`;
          } else if (handlers.bracket && handler.opacity.charAt(0) === '[' && handler.opacity.charAt(handler.opacity.length - 1) === ']') {
            handler.opacity = handler.opacity.slice(1, -1).replace(/_/g, ' ');
          } else {
            handler.opacity = undefined;
          }
        }
        return handler;
      }: () => handler,

      handleNegative: handlers.negative ? (callback = negateValue) => {
        if (!handler.value) return handler;
        handler.value = handler.utility.isNegative ? callback(handler.value) : handler.value;
        return handler;
      }: () => handler,

      createProperty: (name, callback) => {
        if (!handler.value) return;
        const value = callback ? callback(handler.value) : handler.value;
        return new Property(name, value);
      },

      createStyle: (selector, callback) => {
        if (!handler.value) return;
        const value = callback ? callback(handler.value) : undefined;
        return new Style(selector, value);
      },

      createColorValue: (opacityValue) => {
        if (handler.color) return handler.color({ opacityValue });
        if (handler.value) {
          if (['transparent', 'currentColor', 'inherit', 'auto', 'none'].includes(handler.value)) return handler.value;
          if (handler.value.includes('var') && opacityValue) return `rgba(${handler.value}, ${handler.opacity || opacityValue})`;
          return opacityValue ? `rgba(${toColor(handler.value).color}, ${handler.opacity || opacityValue})` : `rgb(${toColor(handler.value).color})`;
        }
      },

      createColorStyle: (selector, property, opacityVariable, wrapRGB = true) => {
        if (handler.color) {
          const value = handler.color({ opacityVariable, opacityValue: opacityVariable ? `var(${opacityVariable})`: undefined });
          if (opacityVariable) {
            return new Style(selector, [
              new Property(opacityVariable, handler.opacity || '1'),
              new Property(property, value),
            ]);
          }
          return new Style(selector, new Property(property, value));
        }
        const color = handler.value;
        if (!color) return;
        if (['transparent', 'currentColor', 'inherit', 'auto', 'none'].includes(color) || color.includes('var')) return new Style(selector, new Property(property, color));
        const rgb = toColor(color);
        if (opacityVariable) {
          return new Style(selector, [
            new Property(opacityVariable, handler.opacity || rgb.opacity),
            new Property(property, `rgba(${rgb.color}, var(${opacityVariable}))`),
          ]);
        }
        return new Style(selector, new Property(property, wrapRGB ? `rgb(${rgb.color})` : rgb.color));
      },

      callback: (func) => {
        if (!handler.value) return;
        return func(handler.value);
      },
    };
    return handler;
  };
}

class Utility {
  
  
  constructor(raw, _h) {
    this.raw = raw; // -placeholder-real-gray-300
    this._h = _h;
  }
  match(expression) {
    const match = this.absolute.match(expression);
    return match ? match[0] : '';
  }
  clone(raw) {
    return new Utility(raw || this.raw, this._h);
  }
  get class() {
    return '.' + cssEscape(this.raw); // .-placeholder-real-gray-300
  }
  get isNegative() {
    return this.raw[0] === '-'; // true
  }
  get absolute() {
    return this.isNegative ? this.raw.substring(1) : this.raw;
  }
  get identifier() {
    return this.match(/[^-]+/); // placeholder
  }
  get key() {
    return this.match(/^\w[-\w]+(?=-)/); // placeholder-real-gray
  }
  get center() {
    return this.match(/-.+(?=-)/).substring(1); // real-gray
  }
  get amount() {
    return this.match(/(?:[^-]+|\[[\s\S]*?\])$/); // 300
  }
  get body() {
    return this.match(/-.+/).substring(1); // real-gray-300
  }
  get handler() {
    return this._h(this);
  }
}

function generateStaticStyle(processor, className, addComment = false) {
  // eslint-disable-next-line no-prototype-builtins
  if (!staticUtilities.hasOwnProperty(className))
    return;

  const style = new Style('.' + className);
  const comment = addComment ? className : undefined;
  const { utility, meta } = staticUtilities[className];
  for (const [key, value] of Object.entries(utility)) {
    style.add(
      Array.isArray(value)
        ? value.map((i) => new Property(key, i, comment))
        : new Property(key, value, comment)
    );
  }
  if (processor._plugin.core && !processor._plugin.core[meta.group]) return;
  return style.updateMeta('utilities', meta.group, pluginOrder[meta.group ], meta.order, true);
}

function extract(
  processor,
  className,
  addComment = false,
  prefix,
) {
  if (prefix && !className.startsWith(prefix)) return;

  // handle static base utilities
  if (!prefix && className in staticUtilities) return generateStaticStyle(processor, className, addComment);
  if (prefix && className.startsWith(prefix)) {
    className = className.replace(new RegExp(`^${prefix}`), '');
    if (className in staticUtilities) return generateStaticStyle(processor, className, addComment);
  }
  // handle static plugin utilities & components
  const staticPlugins = { ...processor._plugin.utilities, ...processor._plugin.components, ...processor._plugin.shortcuts };
  if (className in staticPlugins) return deepCopy(staticPlugins[className]);

  const utility = new Utility(className, processor._handler);


  // handle dynamic plugin utilities
  for (const [key, generator] of Object.entries(processor._plugin.dynamic)) {
    if (className.match(new RegExp(`^-?${key}`))) {
      let style = generator(utility);
      if (style instanceof Property) style = style.toStyle(utility.class);
      if (style && addComment)
        Array.isArray(style)
          ? style.map((i) => i.property.forEach((p) => (p.comment = className)))
          : style.property.forEach((p) => (p.comment = className));
      if (style) return style;
    }
  }

  // handle dynamic base utilities
  const matches = className.match(/\w+/);
  const key = matches ? matches[0] : undefined;
  // eslint-disable-next-line no-prototype-builtins
  if (key && dynamicUtilities.hasOwnProperty(key)) {
    let style = dynamicUtilities[key](utility, processor.pluginUtils);
    if (!style) return;
    if (processor._plugin.core && !processor._plugin.core[Array.isArray(style) ? style[0].meta.group : style.meta.group]) return;
    if (style instanceof Property) style = style.toStyle(utility.class);
    if (addComment) Array.isArray(style)? style.map((i) => i.property.forEach((p) => (p.comment = className))): style.property.forEach((p) => (p.comment = className));
    return style;
  }
}

function testStatic(processor, className) {
  // eslint-disable-next-line no-prototype-builtins
  if (!staticUtilities.hasOwnProperty(className)) return false;
  const { meta } = staticUtilities[className];
  if (processor._plugin.core && !processor._plugin.core[meta.group]) return false;
  return true;
}

function test(
  processor,
  className,
  prefix,
) {

  // handle static base utilities
  if (!prefix && className in staticUtilities) return testStatic(processor, className);
  if (prefix && className.startsWith(prefix)) {
    className = className.replace(new RegExp(`^${prefix}`), '');
    if (className in staticUtilities) return testStatic(processor, className);
  }
  // handle static plugin utilities & components
  const staticPlugins = { ...processor._plugin.utilities, ...processor._plugin.components, ...processor._plugin.shortcuts };
  if (className in staticPlugins) return true;

  const utility = new Utility(className, processor._handler);


  // handle dynamic plugin utilities
  for (const [key, generator] of Object.entries(processor._plugin.dynamic)) {
    if (className.match(new RegExp(`^-?${key}`))) {
      if (generator(utility)) return true;
    }
  }

  // handle dynamic base utilities
  const matches = className.match(/\w+/);
  const key = matches ? matches[0] : undefined;
  // eslint-disable-next-line no-prototype-builtins
  if (key && dynamicUtilities.hasOwnProperty(key)) {
    const style = dynamicUtilities[key](utility, processor.pluginUtils);
    if (!style) return false;
    if (processor._plugin.core && !processor._plugin.core[Array.isArray(style) ? style[0].meta.group : style.meta.group]) return false;
    return true;
  }
  return false;
}

function preflight(
  processor,
  html,
  includeBase = true,
  includeGlobal = true,
  includePlugins = true,
) {
  // Generate preflight style based on html tags.
  const globalSheet = new StyleSheet();
  const styleSheet = new StyleSheet();

  const createStyle = (
    selector,
    properties

,
    isGlobal = false
  ) => {
    const style = new Style(selector, undefined, false);
    for (const [key, value] of Object.entries(properties)) {
      style.add(
        Array.isArray(value)
          ? value.map((v) => new Property(key, v))
          : new Property(key, typeof value === 'function' ? value((path, defaultValue) => processor.theme(path, defaultValue)) : value)
      );
    }
    style.updateMeta('base', 'preflight', 0, isGlobal? 1 : 2, true);
    return style;
  };

  const tags = html ? Array.from(new Set(html.match(/<\w+/g))).map((i) => i.substring(1)) : undefined;

  // handle base style
  includeBase && (processor.config('prefixer') ? preflights : preflights.filter(i => !i.selector || !/::?(webkit-input|-moz|-ms-input)-placeholder$/.test(i.selector))).forEach(p => {
    if (includeGlobal && p.global) {
      // global style, such as * or html, body
      globalSheet.add(createStyle(p.selector, p.properties, true));
    } else if (tags !== undefined) {
      // only generate matched styles
      const includeTags = tags.filter((i) => p.keys.includes(i));
      if (includeTags.length > 0) styleSheet.add(createStyle(p.selector ? p.selector : includeTags.join(', '), p.properties));
    } else {
      // if no tags input, generate all styles
      styleSheet.add(createStyle(p.selector ? p.selector : p.keys.join(', '), p.properties));
    }
  });

  // handle plugin style
  if (includePlugins) {
    // base Styles
    let preflightList = [];
    Object.values(processor._plugin.preflights).forEach((styles) => {
      preflightList = preflightList.concat(styles);
    });
    styleSheet.add(preflightList);

    // always generated styles
    let staticList = [];
    Object.values(processor._plugin.static).forEach((styles) => {
      staticList = staticList.concat(styles);
    });
    styleSheet.add(staticList);
  }

  const result = styleSheet.combine().sort();
  return includeGlobal ? result.extend(globalSheet.combine().sort(), false) : result;
}

class ClassParser {
  
  
  
  

  constructor(classNames, separator = ':', variants) {
    this.classNames = classNames;
    this.separator = separator;
    this.variants = variants || [];
    this.index = 0;
  }

   _handle_group(removeDuplicated = true) {
    if (!this.classNames) return [];
    let preChar;
    let char;
    let group;
    let func;
    let variant;
    let variants = [];
    let variantStart = this.index + 1;
    let classStart = this.index + 1;
    let groupStart = this.index + 1;
    let important = false;
    let ignoreSpace = false;
    let ignoreBracket = false;
    let insideSquareBracket = false;
    let brackets = 0;
    const sepLength = this.separator.length;
    const parts = [];
    const length = this.classNames.length;

    while (this.index < length) {
      this.index++;
      char = this.classNames.charAt(this.index);
      // ignore parsing and leave content inside square brackets as-is
      if (insideSquareBracket) {
        if(' \n\t\r'.includes(char)) {
          insideSquareBracket = false;
        } else {
          if (char === ']')
            insideSquareBracket = false;
          continue;
        }
      }
      // handle chars
      switch (char) {
      case '!':
        important = true;
        break;
      case this.separator[0]:
        if (this.classNames.slice(this.index, this.index + sepLength) === this.separator) {
          variant = this.classNames.slice(variantStart, this.index);
          if (variant.charAt(0) === '!') variant = variant.slice(1,);
          if (this.variants.includes(variant)) {
            variants.push(variant);
            this.index += sepLength - 1;
            variantStart = this.index + 1;
            ignoreSpace = true;
          }
        }
        break;
      case '[':
        insideSquareBracket = true;
        break;
      case '(':
        preChar = this.classNames.charAt(this.index - 1);
        if (preChar === '-' || (!ignoreSpace && preChar === ' ')) {
          ignoreBracket = true;
        } else if (ignoreSpace) {
          group = this._handle_group();
        } else {
          brackets += 1;
          func = this.classNames.slice(groupStart, this.index);
          while (!isSpace(this.classNames.charAt(this.index))) {
            this.index++;
          }
          this.index--;
        }
        ignoreSpace = false;
        break;
      case '"':
      case '`':
      case '\'':
      case ')':
      case ' ':
      case '\n':
      case '\t':
      case '\r':
        if (!ignoreSpace) {
          if (groupStart !== this.index) {
            const raw = this.classNames.slice(classStart, this.index);
            const start = classStart - 1;
            const end = this.index - 1;
            if (Array.isArray(group)) {
              parts.push({ raw, start, end, variants, content: group, type: 'group', important });
              group = undefined;
            } else if (func) {
              const utility = this.classNames.slice(variantStart, this.index);
              parts.push({ raw: raw, start, end, variants, content: utility, type: 'utility', important });
              func = undefined;
            } else if (ignoreBracket && char === ')') {
              // utility with bracket
              const utility = this.classNames.slice(variantStart, this.index + 1);
              parts.push({ raw: raw + ')', start, end: this.index, variants, content: important ? utility.slice(1,): utility, type: 'utility', important });
            } else {
              const utility = this.classNames.slice(variantStart, this.index);
              if (utility.charAt(0) === '*') {
                parts.push({ raw, start, end, variants, content: utility.slice(1,), type: 'alias', important });
              } else {
                parts.push({ raw, start, end, variants, content: utility.charAt(0) === '!' ? utility.slice(1,): utility, type: 'utility', important });
              }
            }
            variants = [];
            important = false;
          }
          groupStart = this.index + 1;
          classStart = this.index + 1;
        }
        variantStart = this.index + 1;
        break;
      default:
        ignoreSpace = false;
      }
      if (char === ')') {
        brackets -= 1;
        if (!ignoreBracket && brackets < 0) break; // end group
        ignoreBracket = false;
      }
    }

    if (removeDuplicated) {
      const newParts = [];
      const cache = [];
      parts.forEach((item) => {
        if (!cache.includes(item.raw)) {
          cache.push(item.raw);
          newParts.push(item);
        }
      });
      return newParts;
    }
    return parts;
  }

  parse(removeDuplicated = true) {
    if (!this.classNames) return [];
    // Turn classes into group;
    this.classNames = '(' + this.classNames + ')';
    const elements = this._handle_group(removeDuplicated);
    // Initialization, convenient for next call
    this.index = 0;
    this.classNames = this.classNames.slice(1, -1);
    return elements;
  }
}

/* toSource by Marcello Bastea-Forte - zlib license */
function toSource(object, replacer, indent = '  ', startingIndent = '') {
    const seen = [];
    return walk(object, replacer, indent === false ? '' : indent, startingIndent, seen);
    function walk(object, replacer, indent, currentIndent, seen) {
        const nextIndent = currentIndent + indent;
        object = replacer ? replacer(object) : object;
        switch (typeof object) {
            case 'string':
                return JSON.stringify(object);
            case 'number':
                if (Object.is(object, -0)) {
                    return '-0';
                }
                return String(object);
            case 'boolean':
            case 'undefined':
                return String(object);
            case 'function':
                return object.toString();
        }
        if (object === null) {
            return 'null';
        }
        if (object instanceof RegExp) {
            return object.toString();
        }
        if (object instanceof Date) {
            return `new Date(${object.getTime()})`;
        }
        if (object instanceof Set) {
            return `new Set(${walk(Array.from(object.values()), replacer, indent, nextIndent, seen)})`;
        }
        if (object instanceof Map) {
            return `new Map(${walk(Array.from(object.entries()), replacer, indent, nextIndent, seen)})`;
        }
        if (seen.indexOf(object) >= 0) {
            return '{$circularReference:1}';
        }
        seen.push(object);
        function join(elements) {
            return (indent.slice(1) +
                elements.join(',' + (indent && '\n') + nextIndent) +
                (indent ? ' ' : ''));
        }
        if (Array.isArray(object)) {
            return `[${join(object.map((element) => walk(element, replacer, indent, nextIndent, seen.slice())))}]`;
        }
        const keys = Object.keys(object);
        if (keys.length) {
            return `{${join(keys.map((key) => (legalKey(key) ? key : JSON.stringify(key)) +
                ':' +
                walk(object[key], replacer, indent, nextIndent, seen.slice())))}}`;
        }
        return '{}';
    }
}
const KEYWORD_REGEXP = /^(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with)$/;
function legalKey(key) {
    return (/^([a-z_$][0-9a-z_$]*|[0-9]+)$/gi.test(key) && !KEYWORD_REGEXP.test(key));
}

function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }































class Processor {
  
  
   __init() {this._variants = {};}
   __init2() {this._cache = {
    count: 0,
    html: [],
    attrs: [],
    classes: [],
    utilities: [],
    variants: [],
  };}
  
   __init3() {this._plugin = {
    static: {},
    dynamic: {},
    utilities: {},
    components: {},
    preflights: {},
    shortcuts: {},
    alias: {},
    completions: {},
  };}

   __init4() {this.pluginUtils = {
    addDynamic: (...args) => this.addDynamic(...args),
    addUtilities: (...args) => this.addUtilities(...args),
    addComponents: (...args) => this.addComponents(...args),
    addBase: (...args) => this.addBase(...args),
    addVariant: (...args) => this.addVariant(...args),
    e: (...args) => this.e(...args),
    prefix: (...args) => this.prefix(...args),
    config: (...args) => this.config(...args),
    theme: (...args) => this.theme(...args),
    variants: (...args) => this.variants(...args),
  };}

   __init5() {this.variantUtils = {
    modifySelectors: (modifier) =>
      new Style().wrapSelector((selector) =>
        modifier({
          className: /^[.#]/.test(selector) ? selector.substring(1) : selector,
        })),
    atRule: (name) => new Style().atRule(name),
    pseudoClass: (name) => new Style().pseudoClass(name),
    pseudoElement: (name) => new Style().pseudoElement(name),
    parent: (name) => new Style().parent(name),
    child: (name) => new Style().child(name),
  };}

  constructor(config) {Processor.prototype.__init.call(this);Processor.prototype.__init2.call(this);Processor.prototype.__init3.call(this);Processor.prototype.__init4.call(this);Processor.prototype.__init5.call(this);
    this._config = this.resolveConfig(config, baseConfig);
    this._theme = this._config.theme;
    this._handler = createHandler(this._config.handlers);
    this._config.shortcuts && this.loadShortcuts(this._config.shortcuts);
    this._config.alias && this.loadAlias(this._config.alias);
  }

   _resolveConfig(userConfig, presets = {}) {
    if (userConfig.presets) {
      const resolved = this._resolvePresets(userConfig.presets);
      presets = this._resolveConfig(resolved, presets);
      delete userConfig.presets;
    }
    const userTheme = userConfig.theme;
    if (userTheme) delete userConfig.theme;
    const extendTheme = userTheme && 'extend' in userTheme ? _nullishCoalesce(userTheme.extend, () => ( {})) : {};
    const theme = (presets.theme || {}) ;
    if (userTheme) {
      if ('extend' in userTheme) delete userTheme.extend;
      for (const [key, value] of Object.entries(userTheme)) {
        theme[key] = typeof value === 'function' ? value : { ...value };
      }
    }
    if (extendTheme && typeof extendTheme === 'object') this._reduceFunction(theme, extendTheme);
    return { ...presets, ...userConfig, theme };
  }

   _reduceFunction(theme, extendTheme) {
    for (const [key, value] of Object.entries(extendTheme)) {
      const themeValue = theme[key];
      switch (typeof themeValue) {
      case 'function':
        theme[key] = (theme, { negative, breakpoints }) => combineConfig(
          (themeValue )(theme, { negative, breakpoints }),
          (typeof value === 'function' ? value(theme, { negative, breakpoints }) : _nullishCoalesce(value, () => ( {}))),
        );
        break;
      case 'object':
        theme[key] = (theme, { negative, breakpoints }) => combineConfig(themeValue, (typeof value === 'function' ? value(theme, { negative, breakpoints }) : _nullishCoalesce(value, () => ( {}))), 0 /* prevent fontfamily merge */);
        break;
      default:
        theme[key] = value;
      }
    }
  }

   _resolvePresets(presets) {
    let config = {};
    const extend = {};
    presets.forEach(p => {
      if (p.theme && 'extend' in p.theme && p.theme.extend) {
        this._reduceFunction(extend, p.theme.extend);
        delete p.theme.extend;
      }
      config = this._resolveConfig(p, config);
    });
    if (config.theme) {
      (config.theme ).extend = extend;
    } else {
      config.theme = { extend };
    }
    return config;
  }

   _resolveFunction(config) {
    if (!config.theme) return config;
    const theme = (path, defaultValue) => this.theme(path, defaultValue);
    for (const dict of [config.theme, 'extend' in config.theme ? _nullishCoalesce(config.theme.extend, () => ( {})) : {}]) {
      for (const [key, value] of Object.entries(dict)) {
        if (typeof value === 'function') {
          (dict )[key] = value(theme, {
            negative,
            breakpoints,
          }) ;
        }
      }
    }
    return config;
  }

   _replaceStyleVariants(styles) {
    // @screen sm -> @screen (min-width: 640px)
    styles.forEach(style => {
      style.atRules = _optionalChain([style, 'access', _ => _.atRules, 'optionalAccess', _2 => _2.map, 'call', _3 => _3(i => {
        if (i.match(/@screen/)) {
          const variant = i.replace(/\s*@screen\s*/, '');
          const atRule = _optionalChain([this, 'access', _4 => _4._variants, 'access', _5 => _5[variant], 'call', _6 => _6(), 'access', _7 => _7.atRules, 'optionalAccess', _8 => _8[0]]);
          return _nullishCoalesce(atRule, () => ( i));
        }
        return i;
      })]);
    });
  }

   _addPluginProcessorCache(type, key, styles) {
    styles = toArray(styles);
    this._plugin[type][key] = key in this._plugin[type]
      ? [...this._plugin[type][key], ...styles]
      : styles;
  }

   _loadVariables() {
    const config = this.theme('vars') ;
    if (!config) return;
    this.addBase({ ':root': Object.assign({}, ...Object.keys(config).map(i => ({ [`--${i}`]: config[i] })))  });
  }

  loadConfig(config) {
    this._config = this.resolveConfig(config, baseConfig);
    this._theme = this._config.theme;
    this._handler = createHandler(this._config.handlers);
    this._config.shortcuts && this.loadShortcuts(this._config.shortcuts);
    this._config.alias && this.loadAlias(this._config.alias);
    return this._config;
  }

  resolveConfig(config, presets) {
    this._config = this._resolveConfig({ ...deepCopy(config ? config : {}), exclude: _optionalChain([config, 'optionalAccess', _9 => _9.exclude]) }, deepCopy(presets)); // deep copy
    this._theme = this._config.theme; // update theme to make sure theme() function works.
    _optionalChain([this, 'access', _10 => _10._config, 'access', _11 => _11.plugins, 'optionalAccess', _12 => _12.map, 'call', _13 => _13(i => typeof i === 'function' ? ('__isOptionsFunction' in i ? this.loadPluginWithOptions(i): this.loadPlugin(createPlugin(i))) : this.loadPlugin(i))]);
    this._config = this._resolveFunction(this._config);
    this._variants = { ...this._variants, ... this.resolveVariants() };
    this._cache.variants = Object.keys(this._variants);
    this._loadVariables();
    if (this._config.corePlugins) this._plugin.core = Array.isArray(this._config.corePlugins) ? Object.assign({}, ...(this._config.corePlugins ).map(i => ({ [i]: true }))) : { ...Object.assign({}, ...Object.keys(pluginOrder).slice(Object.keys(pluginOrder).length/2).map(i => ({ [i]: true }))), ...this._config.corePlugins };
    return this._config;
  }

  resolveVariants(
    type
  ) {
    const variants = resolveVariants(this._config);
    if (type) {
      return variants[type];
    }
    return { ...variants.screen, ...variants.theme, ...variants.state, ...variants.orientation };
  }

  resolveStaticUtilities(includePlugins = false) {
    const staticStyles = {};
    for (const key in staticUtilities) {
      const style = generateStaticStyle(this, key, true);
      if (style) staticStyles[key] = [ style ];
    }
    if (!includePlugins) return staticStyles;
    return { ...staticStyles, ...this._plugin.utilities, ...this._plugin.components };
  }

  resolveDynamicUtilities(includePlugins = false) {
    if (!includePlugins) return dynamicUtilities;
    return { ...dynamicUtilities, ...this._plugin.dynamic };
  }

  get allConfig() {
    return this._config ;
  }

  get allTheme() {
    return (_nullishCoalesce(this._theme, () => ( {}))) ;
  }

  get allVariant() {
    return this._cache.variants;
  }

  wrapWithVariants(variants, styles) {
    // apply variant to style
    if (!Array.isArray(styles)) styles = [styles];
    if (variants.length === 0) return styles;

    return styles.map(style => {
      if (style instanceof Keyframes) return style;
      const atrules = [];
      let wrapped = variants
        .filter(i => _optionalChain([this, 'access', _14 => _14._variants, 'optionalAccess', _15 => _15[i]]))
        .map(i => this._variants[i]())
        .reduce((previousValue, currentValue) => {
          const output = previousValue.extend(currentValue);
          if (previousValue.isAtrule) atrules.push((previousValue.atRules )[0]);
          return output;
        }, new Style())
        .extend(style);
      if (style instanceof Container) wrapped = new Container().extend(wrapped);
      if (atrules.length > 0) wrapped.meta.variants = atrules;
      return wrapped;
    });
  }

  removePrefix(className) {
    const prefix = this.config('prefix') ;
    return prefix ? className.replace(new RegExp(`^${prefix}`), '') : className;
  }

  markAsImportant(style, force = false) {
    const _important = force ? force : this.config('important', false);
    const important = typeof _important === 'string' ? (_important ) : (_important );
    if (important) {
      if (typeof important === 'string') {
        style.parent(important);
      } else {
        style.important = true;
        style.property.forEach(i => i.important = true);
      }
    }
    return style;
  }

  extract(className, addComment = false, prefix) {
    return extract(this, className, addComment, prefix);
  }

  test(className, prefix) {
    return test(this, className, prefix);
  }

  preflight(
    html,
    includeBase = true,
    includeGlobal = true,
    includePlugins = true,
    ignoreProcessed = false
  ) {
    let id;
    if (html) {
      id = hash(html);
      if (ignoreProcessed && this._cache.html.includes(id)) return new StyleSheet();
    }
    id && ignoreProcessed && this._cache.html.push(id);
    return preflight(this, html, includeBase, includeGlobal, includePlugins);
  }

  interpret(
    classNames,
    ignoreProcessed = false,
    handleIgnored
  ) {
    const ast = new ClassParser(classNames, this.config('separator', ':') , this._cache.variants).parse();
    const success = [];
    const ignored = [];
    const styleSheet = new StyleSheet();

    const _hIgnored = (className) => {
      if (handleIgnored) {
        const style = handleIgnored(className);
        if (style) {
          styleSheet.add(style);
          success.push(className);
        } else {
          ignored.push(className);
        }
      }
      ignored.push(className);
    };

    const _gStyle = (
      baseClass,
      variants,
      selector,
      important = false,
      prefix,
    ) => {
      if (this._config.exclude && testRegexr(selector, this._config.exclude)) {
        // filter exclude className
        ignored.push(selector);
        return;
      }
      if (variants[0] && selector in { ...this._plugin.utilities, ...this._plugin.components }) {
        // handle special selector that conflict with class parser, such as 'hover:abc'
        success.push(selector);
        styleSheet.add(deepCopy(this._plugin.utilities[selector]));
        return;
      }
      let result = this.extract(baseClass, false, prefix);
      if (result) {
        const escapedSelector = '.' + cssEscape(selector);
        if (result instanceof Style) {
          if(!result.meta.respectSelector) result.selector = escapedSelector;
          this.markAsImportant(result, important);
        } else if (Array.isArray(result)) {
          result = result.map(i => {
            if (i instanceof Keyframes) return i;
            if(!i.meta.respectSelector) i.selector = escapedSelector;
            this.markAsImportant(i, important);
            return i;
          });
        }
        const wrapped = this.wrapWithVariants(variants, result);
        if (wrapped) {
          success.push(selector);
          styleSheet.add(wrapped);
        } else {
          _hIgnored(selector);
        }
      } else {
        _hIgnored(selector);
      }
    };

    const _hGroup = (obj, parentVariants = []) => {
      const _eval = (u) => {
        if (u.type === 'group') {
          _hGroup(u, obj.variants);
        } else if (u.type === 'alias' && (u.content ) in this._plugin.alias) {
          this._plugin.alias[u.content ].forEach(i => _eval(i));
        } else {
          // utility
          const variants = [
            ...parentVariants,
            ...obj.variants,
            ...u.variants,
          ];
          const important = obj.important || u.important;
          const selector = (important ? '!' : '') + [...variants, u.content].join(':');
          typeof u.content === 'string' &&
            _gStyle(u.content, variants, selector, important, this.config('prefix') );
        }
      };
      Array.isArray(obj.content) && obj.content.forEach(u => _eval(u));
    };

    const _gAst = (ast) => {
      ast.forEach(obj => {
        if (!(ignoreProcessed && this._cache.utilities.includes(obj.raw))) {
          if (ignoreProcessed) this._cache.utilities.push(obj.raw);
          if (obj.type === 'utility') {
            if (Array.isArray(obj.content)) ; else if (obj.content) {
              _gStyle(obj.content, obj.variants, obj.raw, obj.important, this.config('prefix') );
            }
          } else if (obj.type === 'group') {
            _hGroup(obj);
          } else if (obj.type === 'alias' && (obj.content ) in this._plugin.alias) {
            _gAst(this._plugin.alias[obj.content ]);
          } else {
            _hIgnored(obj.raw);
          }
        }
      });
    };

    _gAst(ast);

    if (!this.config('prefixer')) styleSheet.prefixer = false;

    return {
      success,
      ignored,
      styleSheet: styleSheet.sort(),
    };
  }

  validate(classNames) {
    const ast = new ClassParser(classNames, this.config('separator', ':') , this._cache.variants).parse();
    const success = [];
    const ignored = [];

    const _hSuccess = (className, self, parent) => {
      success.push({
        className,
        ...self,
        parent,
      });
    };

    const _hIgnored = (className, self, parent) => {
      ignored.push({
        className,
        ...self,
        parent,
      });
    };

    const _gStyle = (
      baseClass,
      variants,
      selector,
      self,
      parent,
      prefix,
    ) => {
      if (this._config.exclude && testRegexr(selector, this._config.exclude)) {
        // filter exclude className
        _hIgnored(selector, self, parent);
        return;
      }
      if (variants[0] && selector in { ...this._plugin.utilities, ...this._plugin.components }) {
        // handle special selector that conflict with class parser, such as 'hover:abc'
        _hSuccess(selector, self, parent);
        return;
      }
      if (this.test(baseClass, prefix) && variants.filter(i => !(i in this._variants)).length === 0) {
        _hSuccess(selector, self, parent);
      } else {
        _hIgnored(selector, self, parent);
      }
    };

    const _hGroup = (obj, parentVariants = []) => {
      const _eval = (u, parent) => {
        if (u.type === 'group') {
          _hGroup(u, obj.variants);
        } else if (u.type === 'alias' && (u.content ) in this._plugin.alias) {
          this._plugin.alias[u.content ].forEach(i => _eval(i, u));
        } else {
          // utility
          const variants = [
            ...parentVariants,
            ...obj.variants,
            ...u.variants,
          ];
          const important = obj.important || u.important;
          const selector = (important ? '!' : '') + [...variants, u.content].join(':');
          typeof u.content === 'string' &&
            _gStyle(u.content, variants, selector, u, parent, this.config('prefix') );
        }
      };
      Array.isArray(obj.content) && obj.content.forEach(u => _eval(u, obj));
    };

    const _gAst = (ast) => {
      ast.forEach(obj => {
        if (obj.type === 'utility') {
          if (Array.isArray(obj.content)) ; else if (obj.content) {
            _gStyle(obj.content, obj.variants, obj.raw, obj, undefined, this.config('prefix') );
          }
        } else if (obj.type === 'group') {
          _hGroup(obj);
        } else if (obj.type === 'alias' && (obj.content ) in this._plugin.alias) {
          _gAst(this._plugin.alias[obj.content ]);
        } else {
          _hIgnored(obj.raw, obj);
        }
      });
    };

    _gAst(ast);

    return {
      success,
      ignored,
    };
  }

  compile(
    classNames,
    prefix = 'windi-',
    showComment = false,
    ignoreGenerated = false,
    handleIgnored,
    outputClassName
  )




 {
    const ast = new ClassParser(classNames, this.config('separator', ':') , this._cache.variants).parse();
    const success = [];
    const ignored = [];
    const styleSheet = new StyleSheet();
    let className = _nullishCoalesce(outputClassName, () => ( prefix + hash(classNames.trim().split(/\s+/g).join(' '))));
    if (ignoreGenerated && this._cache.classes.includes(className)) return { success, ignored, styleSheet, className };
    const buildSelector = '.' + className;

    const _hIgnored = (className) => {
      if (handleIgnored) {
        const style = handleIgnored(className);
        if (style) {
          styleSheet.add(style);
          success.push(className);
        } else {
          ignored.push(className);
        }
      }
      ignored.push(className);
    };

    const _gStyle = (
      baseClass,
      variants,
      selector,
      important = false
    ) => {
      if (this._config.exclude && testRegexr(selector, this._config.exclude)) {
        // filter exclude className
        ignored.push(selector);
        return;
      }
      if (variants[0] && selector in { ...this._plugin.utilities, ...this._plugin.components }) {
        // handle special selector that conflict with class parser, such as 'hover:abc'
        success.push(selector);
        styleSheet.add(deepCopy(this._plugin.utilities[selector]));
        return;
      }
      const result = this.extract(baseClass, showComment);
      if (result) {
        if (Array.isArray(result)) {
          result.forEach(i => {
            if (i instanceof Keyframes) {
              i.meta.order = 20;
              return i;
            }
            i.selector = buildSelector;
            this.markAsImportant(i, important);
          });
        } else {
          result.selector = buildSelector;
          this.markAsImportant(result, important);
        }
        const wrapped = this.wrapWithVariants(variants, result);
        if (wrapped) {
          success.push(selector);
          styleSheet.add(wrapped);
        } else {
          _hIgnored(selector);
        }
      } else {
        _hIgnored(selector);
      }
    };

    const _hGroup = (obj, parentVariants = []) => {
      Array.isArray(obj.content) &&
        obj.content.forEach((u) => {
          if (u.type === 'group') {
            _hGroup(u, obj.variants);
          } else {
            // utility
            const variants = [
              ...parentVariants,
              ...obj.variants,
              ...u.variants,
            ];
            const selector = [...variants, u.content].join(':');
            typeof u.content === 'string' &&
              _gStyle(this.removePrefix(u.content), variants, selector, obj.important || u.important);
          }
        });
    };

    ast.forEach((obj) => {
      if (obj.type === 'utility') {
        if (Array.isArray(obj.content)) ; else if (obj.content) {
          _gStyle(this.removePrefix(obj.content), obj.variants, obj.raw, obj.important);
        }
      } else if (obj.type === 'group') {
        _hGroup(obj);
      } else {
        _hIgnored(obj.raw);
      }
    });

    className = success.length > 0 ? className : undefined;
    if (ignoreGenerated && className) this._cache.classes.push(className);
    if (!this.config('prefixer')) styleSheet.prefixer = false;
    return {
      success,
      ignored,
      className,
      styleSheet: styleSheet.sortby(sortGroup).combine(),
    };
  }

  attributify(attrs, ignoreProcessed = false) {
    const success = [];
    const ignored = [];
    const styleSheet = new StyleSheet();
    const { prefix, separator, disable } = (this._config.attributify && typeof this._config.attributify === 'boolean') ? {} : this._config.attributify || {};

    const _gStyle = (
      key,
      value,
      equal = false,
      notAllow = false,
      ignoreProcessed = false,
    ) => {
      const buildSelector = `[${this.e((prefix || '') + key)}${equal?'=':'~='}"${value}"]`;
      if (notAllow || (ignoreProcessed && this._cache.attrs.includes(buildSelector))) {
        ignored.push(buildSelector);
        return;
      }
      const importantValue = value.startsWith('!');
      if (importantValue) value = value.slice(1);
      const importantKey = key.startsWith('!');
      if (importantKey) key = key.slice(1);
      const id = _nullishCoalesce(_optionalChain([key, 'access', _16 => _16.match, 'call', _17 => _17(/\w+$/), 'optionalAccess', _18 => _18[0]]), () => ( ''));
      const splits = value.split(separator || ':');
      let variants = splits.slice(0, -1);
      let utility = splits.slice(-1)[0];
      let keys = key.split(separator || ':');
      const lastKey = keys.slice(-1)[0];

      if (lastKey in this._variants && lastKey !== 'svg') {
        variants = [...keys, ...variants];
      } else if (id in this._variants && id !== 'svg') {
        // sm = ... || sm:hover = ... || sm-hover = ...
        const matches = key.match(/[@<\w]+/g);
        if (!matches) {
          ignored.push(buildSelector);
          return;
        }
        variants = [...matches, ...variants];
      } else {
        // text = ... || sm:text = ... || sm-text = ... || sm-hover-text = ...
        if (!keys) {
          ignored.push(buildSelector);
          return;
        }
        if (keys.length === 1) keys = key.split('-');
        let last;
        // handle min-h || max-w ...
        if (['min', 'max'].includes(keys.slice(-2, -1)[0])) {
          variants = [...keys.slice(0, -2), ...variants];
          last = keys.slice(-2,).join('-');
        } else {
          variants = [...keys.slice(0, -1), ...variants];
          last = keys[keys.length - 1];
        }
        // handle negative, such as m = -x-2
        const negative = utility.charAt(0) === '-';
        if (negative) utility = utility.slice(1,);
        utility = ['m', 'p'].includes(last) && ['t', 'l', 'b', 'r', 'x', 'y'].includes(utility.charAt(0)) ? last + utility : last + '-' + utility;
        if (negative) utility = '-' + utility;
        utility !== 'cursor-default' && (utility = utility.replace(/-(~|default)$/, ''));
        // handle special cases
        switch(last) {
        case 'w':
          if (['w-min', 'w-max', 'w-min-content', 'w-max-content'].includes(utility)) {
            utility = utility.slice(0, 5);
          } else if (utility.startsWith('w-min')) {
            utility = 'min-w' + utility.slice(5);
          } else if (utility.startsWith('w-max')) {
            utility = 'max-w' + utility.slice(5);
          }
          break;
        case 'h':
          if (['h-min', 'h-max', 'h-min-content', 'h-max-content'].includes(utility)) {
            utility = utility.slice(0, 5);
          } else if (utility.startsWith('h-min')) {
            utility = 'min-h' + utility.slice(5);
          } else if (utility.startsWith('h-max')) {
            utility = 'max-h' + utility.slice(5);
          }
          break;
        case 'flex':
          switch (utility) {
          case 'flex-default':
            utility = 'flex';
            break;
          case 'flex-inline':
            utility = 'inline-flex';
            break;
          default:
            if (/^flex-gap-/.test(utility)) utility = utility.slice(5);
          }
          break;
        case 'grid':
          switch(utility) {
          case 'grid-default':
            utility = 'grid';
            break;
          case 'grid-inline':
            utility = 'inline-grid';
            break;
          default:
            if (/^grid-(auto|gap|col|row)-/.test(utility)) utility = utility.slice(5);
          }
          break;
        case 'justify':
          if (utility.startsWith('justify-content-')) {
            utility = 'justify-' + utility.slice(16);
          }
          break;
        case 'align':
          if (/^align-(items|self|content)-/.test(utility)) {
            utility = utility.slice(6);
          } else {
            utility = 'content-' + utility.slice(6);
          }
          break;
        case 'place':
          if (!/^place-(items|self|content)-/.test(utility)) {
            utility = 'place-content-' + utility.slice(6);
          }
          break;
        case 'font':
          if (/^font-(tracking|leading)-/.test(utility) || ['font-italic', 'font-not-italic', 'font-antialiased', 'font-subpixel-antialiased', 'font-normal-nums', 'font-ordinal', 'font-slashed-zero', 'font-lining-nums', 'font-oldstyle-nums', 'font-proportional-nums', 'font-tabular-nums', 'font-diagonal-fractions', 'font-stacked-fractions'].includes(utility))
            utility = utility.slice(5);
          break;
        case 'text':
          if (['text-baseline', 'text-top', 'text-middle', 'text-bottom', 'text-text-top', 'text-text-bottom'].includes(utility)) {
            utility = 'align-' + utility.slice(5);
          } else if (utility.startsWith('text-placeholder') || utility.startsWith('text-underline') || utility.startsWith('text-tab') || utility.startsWith('text-indent') || utility.startsWith('text-hyphens') || utility.startsWith('text-write')) {
            utility = utility.slice(5);
          } else if (['text-underline', 'text-overline', 'text-line-through', 'text-no-underline', 'text-uppercase', 'text-lowercase', 'text-capitalize', 'text-normal-case', 'text-truncate', 'text-overflow-ellipsis', 'text-overflow-clip', 'text-break-normal', 'text-break-words', 'text-break-all'].includes(utility)) {
            utility = utility.slice(5);
          } else if (utility.startsWith('text-space')) {
            utility = 'white' + utility.slice(5);
          }
          break;
        case 'underline':
          if (utility === 'underline-none') {
            utility = 'no-underline';
          } else if (utility === 'underline-line-through') {
            utility = 'line-through';
          }
          break;
        case 'svg':
          if (utility.startsWith('svg-fill') || utility.startsWith('svg-stroke')) utility = utility.slice(4);
          break;
        case 'border':
          if (utility.startsWith('border-rounded')) {
            utility = utility.slice(7);
          }
          break;
        case 'gradient':
          if (utility === 'gradient-none') {
            utility = 'bg-none';
          } else if (/^gradient-to-[trbl]{1,2}$/.test(utility)) {
            utility = 'bg-' + utility;
          } else if (/^gradient-(from|via|to)-/.test(utility)) {
            utility = utility.slice(9);
          }
          break;
        case 'display':
          utility = utility.slice(8);
          break;
        case 'pos':
          utility = utility.slice(4);
          break;
        case 'position':
          utility = utility.slice(9);
          break;
        case 'box':
          if (/^box-(decoration|shadow)/.test(utility)) {
            utility = utility.slice(4,);
          }
          break;
        case 'filter':
          if (utility !== 'filter-none' && utility !== 'filter') {
            utility = utility.slice(7);
          }
          break;
        case 'backdrop':
          if (utility === 'backdrop') {
            utility = 'backdrop-filter';
          } else if (utility === 'backdrop-none') {
            utility = 'backdrop-filter-none';
          }
          break;
        case 'transition':
          if (/transition-(duration|ease|delay)-/.test(utility)) {
            utility = utility.slice(11);
          }
          break;
        case 'transform':
          if (!['transform-gpu', 'transform-none', 'transform'].includes(utility)) {
            utility = utility.slice(10);
          }
          break;
        case 'isolation':
          if (utility === 'isolation-isolate') utility = 'isolate';
          break;
        case 'table':
          if (utility === 'table-inline') {
            utility = 'inline-table';
          } else if (utility.startsWith('table-caption-') || utility.startsWith('table-empty-cells')) {
            utility = utility.slice(6);
          }
          break;
        case 'pointer':
          utility = 'pointer-events' + utility.slice(7);
          break;
        case 'resize':
          if (utility === 'resize-both') utility = 'resize';
          break;
        case 'ring':
          break;
        case 'blend':
          utility = 'mix-' + utility;
          break;
        case 'sr':
          if (utility === 'sr-not-only') utility = 'not-sr-only';
          break;
        }
      }
      const style = this.extract(utility, false);
      if (style) {
        const important = importantKey || importantValue;
        if (Array.isArray(style)) {
          style.forEach(i => {
            if (i instanceof Keyframes) return i;
            i.selector = buildSelector;
            this.markAsImportant(i, important);
          });
        } else {
          style.selector = buildSelector;
          this.markAsImportant(style, important);
        }
        if (variants.find(i => !(i in this._variants))) {
          ignored.push(buildSelector);
        } else {
          const wrapped = this.wrapWithVariants(variants, style);
          if (wrapped) {
            ignoreProcessed && this._cache.attrs.push(buildSelector);
            success.push(buildSelector);
            styleSheet.add(wrapped);
          } else {
            ignored.push(buildSelector);
          }
        }
      } else {
        ignored.push(buildSelector);
      }
    };

    // eslint-disable-next-line prefer-const
    for (let [key, value] of Object.entries(attrs)) {
      let notAllow = false;
      if (prefix) {
        if (key.startsWith(prefix)) {
          key = key.slice(prefix.length);
        } else {
          notAllow = true;
        }
      }
      if (_optionalChain([disable, 'optionalAccess', _19 => _19.includes, 'call', _20 => _20(key)])) notAllow = true;
      if (Array.isArray(value)) {
        value.forEach(i => _gStyle(key, i, false, notAllow, ignoreProcessed));
      } else {
        _gStyle(key, value, true, notAllow, ignoreProcessed);
      }
    }

    return {
      success,
      ignored,
      styleSheet: styleSheet.sort().combine(),
    };
  }

  loadPlugin({
    handler,
    config,
  }) {
    if (config) {
      config = this._resolveFunction(config);
      config = combineConfig(
        config ,
        this._config 
      );
      const pluginTheme = config.theme ;
      const extendTheme = _optionalChain([pluginTheme, 'optionalAccess', _21 => _21.extend]) ;
      if (pluginTheme && extendTheme && typeof extendTheme === 'object') {
        for (const [key, value] of Object.entries(extendTheme)) {
          const themeValue = pluginTheme[key];
          if (themeValue && typeof themeValue === 'object') {
            pluginTheme[key] = { ...(_nullishCoalesce(themeValue, () => ( {}))), ...value  };
          } else if (value && typeof value === 'object' ){
            pluginTheme[key] = value ;
          }
        }
      }
      this._config = { ...config, theme: pluginTheme };
      this._theme = pluginTheme;
    }
    this._config = this._resolveFunction(this._config);
    this._theme = this._config.theme;
    this._variants = { ...this._variants, ...this.resolveVariants() };
    handler(this.pluginUtils);
  }

  loadPluginWithOptions(optionsFunction, userOptions) {
    const plugin = optionsFunction(_nullishCoalesce(userOptions, () => ( {})));
    this.loadPlugin(plugin);
  }

  loadShortcuts(shortcuts) {
    for (const [key, value] of Object.entries(shortcuts)) {
      const prefix = this.config('prefix', '');
      if (typeof value === 'string') {
        this._plugin.shortcuts[key] = this.compile(value, undefined, undefined, false, undefined, cssEscape(prefix + key)).styleSheet.children.map(i => i.updateMeta('components', 'shortcuts', layerOrder['shortcuts'], ++this._cache.count));
      } else {
        let styles = [];
        Style.generate('.' + cssEscape(key), value).forEach(style => {
          for (const prop of style.property) {
            if (!prop.value) continue;
            if (prop.name === '@apply') {
              styles = styles.concat(this.compile(Array.isArray(prop.value)? prop.value.join(' ') : prop.value).styleSheet.children.map(i => {
                const newStyle = deepCopy(style);
                newStyle.property = [];
                return newStyle.extend(i);
              }));
            } else {
              const newStyle = deepCopy(style);
              newStyle.property = [ prop ];
              styles.push(newStyle);
            }
          }
        });
        this._plugin.shortcuts[key] = styles.map(i => i.updateMeta('components', 'shortcuts', layerOrder['shortcuts'], ++this._cache.count));
      }
    }
  }

  loadAlias(alias) {
    for (const [key, value] of Object.entries(alias)) {
      this._plugin.alias[key] = new ClassParser(value, undefined, this._cache.variants).parse();
    }
  }

  config(path, defaultValue) {
    if (path === 'corePlugins') return this._plugin.core ? Object.keys(this._plugin.core).filter(i => _optionalChain([this, 'access', _22 => _22._plugin, 'access', _23 => _23.core, 'optionalAccess', _24 => _24[i]])) : Object.keys(pluginOrder).slice(Object.keys(pluginOrder).length/2);
    return _nullishCoalesce(getNestedValue(this._config, path), () => ( defaultValue));
  }

  theme(path, defaultValue) {
    return this._theme ? _nullishCoalesce(getNestedValue(this._theme, path), () => ( defaultValue)) : undefined;
  }

  corePlugins(path) {
    if (Array.isArray(this._config.corePlugins)) {
      return (this._config.corePlugins ).includes(path);
    }
    return _nullishCoalesce((this.config(`corePlugins.${path}`, true) ), () => ( false));
  }

  variants(path, defaultValue = []) {
    if (Array.isArray(this._config.variants)) {
      return this._config.variants;
    }
    return this.config(`variants.${path}`, defaultValue) ;
  }

  e(selector) {
    return cssEscape(selector);
  }

  prefix(selector) {
    return selector.replace(/(?=[\w])/, _nullishCoalesce(this._config.prefix, () => ( '')));
  }

  addUtilities(
    utilities,
    options = {
      layer: 'utilities',
      variants: [],
      respectPrefix: true,
      respectImportant: true,
    }
  ) {
    if (Array.isArray(options)) options = { variants: options };
    if (Array.isArray(utilities)) utilities = utilities.reduce((previous, current) => combineConfig(previous, current), {}) ;
    let output = [];
    const layer = _nullishCoalesce(options.layer, () => ( 'utilities'));
    const order = layerOrder[layer] + 1;
    for (const [key, value] of Object.entries(utilities)) {
      let propertyValue = value;
      if (Array.isArray(value)) {
        propertyValue = Object.assign({}, ...value);
      }
      const styles = Style.generate(key.startsWith('.') && options.respectPrefix ? this.prefix(key) : key, propertyValue);
      if (options.layer) styles.forEach(style => style.updateMeta(layer, 'plugin', order, ++this._cache.count));
      if (options.respectImportant && this._config.important) styles.forEach(style => style.important = true);
      let className = guessClassName(key);
      if (key.charAt(0) === '@') {
        styles.forEach(style => {
          if (style.selector) className = guessClassName(style.selector);
          if (Array.isArray(className)) {
            className.filter(i => i.isClass).forEach(({ selector, pseudo }) => this._addPluginProcessorCache('utilities', selector, pseudo? style.clone('.' + cssEscape(selector)).wrapSelector(selector => selector + pseudo) : style.clone()));
            const base = className.filter(i => !i.isClass).map(i => i.selector).join(', ');
            if (base) this._addPluginProcessorCache('static', base, style.clone(base));
          } else {
            this._addPluginProcessorCache(className.isClass? 'utilities' : 'static', className.selector, className.pseudo? style.clone('.' + cssEscape(className.selector)).wrapSelector(selector => selector + (className ).pseudo) : style.clone());
          }
        });
      } else if (Array.isArray(className)) {
        className.filter(i => i.isClass).forEach(({ selector, pseudo }) => this._addPluginProcessorCache('utilities', selector, pseudo ? styles.map(i => i.clone('.' + cssEscape(selector)).wrapSelector(selector => selector + pseudo)): deepCopy(styles)));
        const base = className.filter(i => !i.isClass).map(i => i.selector).join(', ');
        if (base) this._addPluginProcessorCache('static', base, styles.map(i => i.clone(base)));
      } else {
        this._addPluginProcessorCache(className.isClass? 'utilities': 'static', className.selector, className.pseudo ? styles.map(style => style.clone('.' + cssEscape((className ).selector)).wrapSelector(selector => selector + (className ).pseudo)) : styles);
      }
      output = [...output, ...styles];
    }
    return output;
  }

  addDynamic(
    key,
    generator,
    options = {
      layer: 'utilities',
      group: 'plugin',
      variants: [],
      completions: [],
      respectPrefix: true,
      respectImportant: true,
      respectSelector: false,
    }
  ) {
    const uOptions = Array.isArray(options)? { variants:options } : options;
    const layer = uOptions.layer || 'utilities';
    const group = uOptions.group || 'plugin';
    const order = uOptions.order || layerOrder[layer] + 1;
    if (uOptions.completions) this._plugin.completions[group] = group in this._plugin.completions ? [...this._plugin.completions[group], ...uOptions.completions] : uOptions.completions;
    const style = (selector, property, important = uOptions.respectImportant && this._config.important ? true : false) => new Style(selector, property, important);
    const prop = (name, value, comment, important = uOptions.respectImportant && this._config.important ? true : false) => new Property(name, value, comment, important);
    const keyframes = (selector, property, important = uOptions.respectImportant && this._config.important ? true : false) => new Keyframes(selector, property, important);
    keyframes.generate = Keyframes.generate;
    style.generate = Style.generate;
    prop.parse = Property.parse;
    this._plugin.dynamic[key] = (key in this._plugin.dynamic)
      ? (Utility) => deepCopy(this._plugin.dynamic[key])(Utility) || generator({ Utility, Style: style, Property: prop, Keyframes: keyframes })
      : (Utility) => {
        const output = generator({ Utility, Style: style, Property: prop, Keyframes: keyframes });
        if (!output) return;
        if (Array.isArray(output)) return output.map(i => i.updateMeta(layer, group, order, ++this._cache.count, false, i.meta.respectSelector || uOptions.respectSelector));
        return output.updateMeta(layer, group, order, ++this._cache.count, false, output.meta.respectSelector || uOptions.respectSelector);
      };
    return generator;
  }

  addComponents(
    components,
    options = { layer: 'components', variants: [], respectPrefix: false }
  ) {
    if (Array.isArray(options)) options = { variants: options };
    if (Array.isArray(components)) components = components.reduce((previous, current) => combineConfig(previous, current), {}) ;
    let output = [];
    const layer = _nullishCoalesce(options.layer, () => ( 'components'));
    const order = layerOrder[layer] + 1;
    for (const [key, value] of Object.entries(components)) {
      let propertyValue = value;
      if (Array.isArray(value)) {
        propertyValue = Object.assign({}, ...value);
      }
      const styles = Style.generate(key.startsWith('.') && options.respectPrefix ? this.prefix(key) : key, propertyValue);
      styles.forEach(style => style.updateMeta(layer, 'plugin', order, ++this._cache.count));
      if (options.respectImportant && this._config.important) styles.forEach(style => style.important = true);
      let className = guessClassName(key);
      if (key.charAt(0) === '@') {
        styles.forEach(style => {
          if (style.selector) className = guessClassName(style.selector);
          if (Array.isArray(className)) {
            className.filter(i => i.isClass).forEach(({ selector, pseudo }) => this._addPluginProcessorCache('components', selector, pseudo? style.clone('.' + cssEscape(selector)).wrapSelector(selector => selector + pseudo) : style.clone()));
            const base = className.filter(i => !i.isClass).map(i => i.selector).join(', ');
            if (base) this._addPluginProcessorCache('static', base, style.clone(base));
          } else {
            this._addPluginProcessorCache(className.isClass? 'components' : 'static', className.selector, className.pseudo? style.clone('.' + cssEscape(className.selector)).wrapSelector(selector => selector + (className ).pseudo) : style.clone());
          }
        });
      } else if (Array.isArray(className)) {
        // one of the selector are not class, treat the entire as static to avoid duplication
        if (className.some(i => !i.isClass)) {
          const base = className.map(i => i.selector).join(', ');
          if (base) this._addPluginProcessorCache('static', base, styles.map(i => i.clone(base)));
        }
        // class
        else {
          className.forEach(({ selector, pseudo }) => this._addPluginProcessorCache('components', selector, pseudo ? styles.map(i => i.clone('.' + cssEscape(selector)).wrapSelector(selector => selector + pseudo)): deepCopy(styles)));
        }
      } else {
        this._addPluginProcessorCache(className.isClass? 'components': 'static', className.selector, className.pseudo ? styles.map(style => style.clone('.' + cssEscape((className ).selector)).wrapSelector(selector => selector + (className ).pseudo)) : styles);
      }
      output = [...output, ...styles];
    }
    return output;
  }

  addBase(baseStyles) {
    let output = [];
    for (const [key, value] of Object.entries(baseStyles)) {
      let propertyValue = value;
      if (Array.isArray(value)) {
        propertyValue = Object.assign({}, ...value);
      }
      const styles = Style.generate(key, propertyValue).map(i => i.updateMeta('base', 'plugin', 10, ++this._cache.count));
      this._replaceStyleVariants(styles);
      this._addPluginProcessorCache('preflights', key, styles);
      output = [...output, ...styles];
    }
    return output;
  }

  addVariant(
    name,
    generator,
  ) {
    // name && generator && options;
    const style = generator({
      ...this.variantUtils,
      separator: this.config('separator', ':') ,
      style: new Style(),
    });
    this._variants[name] = () => style;
    this._cache.variants.push(name);
    return style;
  }

  dumpConfig() {
    const processor = new Processor();
    const diff = diffConfig(processor._config, this._config) ;
    let output = { theme: { extend: {} }, plugins: [] } ;
    if (diff.theme) {
      for (const [key, value] of Object.entries(diff.theme)) {
        if (key !== 'extend') {
          (output.theme.extend )[key] = value;
        }
      }
      delete diff.theme;
    }
    if (diff.plugins) {
      for (const plugin of diff.plugins) {
        if ('config' in plugin) {
          delete plugin.config;
        }
        output.plugins.push(plugin);
      }
      delete diff.plugins;
    }
    output = { ...diff, ...output };

    return `module.exports = ${toSource(output)}`;
  }
}

export { Processor };
