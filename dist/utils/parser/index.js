'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _nullishCoalesce$4(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$5(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


class HTMLParser {
  
  constructor(html) {
    this.html = html;
  }

  parseAttrs() {
    if (!this.html) return [];
    const output = [];
    const regex = /\S+\s*=\s*"[^"]+"|\S+\s*=\s*'[^']+'|\S+\s*=\s*[^>\s]+/igm;
    let match;
    while ((match = regex.exec(this.html ))) {
      if (match) {
        const raw = match[0];
        const sep = raw.indexOf('=');
        const key = raw.slice(0, sep).trim();
        let value = raw.slice(sep + 1).trim();
        if (['"', '\''].includes(value.charAt(0))) value = value.slice(1, -1);
        value = value.split(/\s/).filter(i => i);
        value = value[0] === undefined ? '' : value[1] === undefined ? value[0] : value;
        output.push({
          raw,
          key,
          value,
          start: match.index,
          end: regex.lastIndex,
        });
      }
    }
    return output;
  }

  parseClasses() {
    // Match all class properties
    if (!this.html) return [];
    const output = [];
    const regex = /class(Name)?\s*=\s*{`[^]+`}|class(Name)?\s*=\s*"[^"]+"|class(Name)?\s*=\s*'[^']+'|class(Name)?\s*=\s*[^>\s]+/igm;
    let match;
    while ((match = regex.exec(this.html ))) {
      if (match) {
        const raw = match[0];
        const sep = raw.indexOf('=');
        let value = raw.slice(sep + 1).trim();
        let start = match.index + sep + 1 + (_nullishCoalesce$4(_optionalChain$5([this, 'access', _ => _.html, 'access', _2 => _2.slice, 'call', _3 => _3(sep + 1), 'access', _4 => _4.match, 'call', _5 => _5(/[^'"]/), 'optionalAccess', _6 => _6.index]), () => ( 0)));
        let end = regex.lastIndex;
        let first = value.charAt(0);
        while (['"', '\'', '`', '{'].includes(first)) {
          value = value.slice(1, -1);
          first = value.charAt(0);
          end--;
          start++;
        }
        output.push({
          result: value,
          start,
          end,
        });
      }
    }
    return output;
  }

  parseTags() {
    // Match all html tags
    if (!this.html) return [];
    return Array.from(new Set(this.html.match(/<\w+/g))).map((i) =>
      i.substring(1)
    );
  }
}

function _nullishCoalesce$3(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }


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

function isSpace(str) {
  return /^\s*$/.test(str);
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
  return append ? [...(_nullishCoalesce$3(a, () => ( []))), ...(_nullishCoalesce$3(b, () => ( [])))] : [...(_nullishCoalesce$3(b, () => ( []))), ...(_nullishCoalesce$3(a, () => ( [])))];
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

function _nullishCoalesce$2(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$4(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }














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
          ? _optionalChain$4([css
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
    let selectors = (_nullishCoalesce$2(this.selector, () => ( ''))).trim().split(/\s*,\s*/g);
    this._parentSelectors && (selectors = selectors.map(i => `${_optionalChain$4([this, 'access', _8 => _8._parentSelectors, 'optionalAccess', _9 => _9.join, 'call', _10 => _10(' ')])} ${i}`));
    (_nullishCoalesce$2(this._wrapSelectors, () => ( []))).forEach((func) => (selectors = selectors.map(i => func(i))));
    this._pseudoClasses && (selectors = selectors.map(i => i + `:${_optionalChain$4([this, 'access', _11 => _11._pseudoClasses, 'optionalAccess', _12 => _12.join, 'call', _13 => _13(':')])}`));
    this._pseudoElements && (selectors = selectors.map(i => i + `::${_optionalChain$4([this, 'access', _14 => _14._pseudoElements, 'optionalAccess', _15 => _15.join, 'call', _16 => _16('::')])}`));
    this._brotherSelectors && (selectors = selectors.map(i => i + `.${_optionalChain$4([this, 'access', _17 => _17._brotherSelectors, 'optionalAccess', _18 => _18.join, 'call', _19 => _19('.')])}`));
    this._childSelectors && (selectors = selectors.map(i => i + ` ${_optionalChain$4([this, 'access', _20 => _20._childSelectors, 'optionalAccess', _21 => _21.join, 'call', _22 => _22(' ')])}`));
    (_nullishCoalesce$2(this._wrapRules, () => ( []))).forEach((func) => (selectors = selectors.map(i => func(i))));
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
      root = _optionalChain$4([parent, 'optionalAccess', _23 => _23.startsWith, 'call', _24 => _24('@')])
        ? new Style().atRule(parent)
        : new Style(parent);

    let output = [];

    for (const [key, value] of Object.entries(_nullishCoalesce$2(property, () => ( {})))) {
      let propertyValue = value;
      if (Array.isArray(propertyValue) && propertyValue.every(e => typeof e === 'object')) {
        propertyValue = Object.assign({}, ...propertyValue);
      }
      if (typeof propertyValue === 'string') {
        root.add(new Property(camelToDash(key), propertyValue));
      } else if (Array.isArray(propertyValue)) {
        propertyValue.map(i => _optionalChain$4([root, 'optionalAccess', _25 => _25.add, 'call', _26 => _26(new Property(camelToDash(key), i))]));
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
        _optionalChain$4([item, 'access', _27 => _27.wrapProperties, 'optionalAccess', _28 => _28.forEach, 'call', _29 => _29((wrap) => {
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

function _nullishCoalesce$1(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain$3(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

function getWeights(a) {
  const first = a.charAt(0);
  const second = a.charAt(1);
  if (first === ':' && second === ':') return 59; // ::moz ...
  if (first === '#') return 500; // #id ...
  if (first !== '.') return first.charCodeAt(0); // html, body ...
  return 499;
}

function sortMeta(a, b) {
  if (a.meta.type === 'base' && b.meta.type === 'base') return getWeights(_nullishCoalesce$1(a.selector, () => ( ''))) - getWeights(_nullishCoalesce$1(b.selector, () => ( '')));
  return sortMediaQuery(_optionalChain$3([a, 'access', _ => _.meta, 'access', _2 => _2.variants, 'optionalAccess', _3 => _3[0]]) || '', _optionalChain$3([b, 'access', _4 => _4.meta, 'access', _5 => _5.variants, 'optionalAccess', _6 => _6[0]]) || '') || (a.meta.order - b.meta.order) || (a.meta.offset - b.meta.offset) || +b.meta.corePlugin - +a.meta.corePlugin;
}

function _optionalChain$2(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

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
          if (style.wrapProperties) style.property.forEach(p => _optionalChain$2([style, 'access', _ => _.wrapProperties, 'optionalAccess', _2 => _2.forEach, 'call', _3 => _3(wrap => p.name = Array.isArray(p.name) ? p.name.map(i => wrap(i)) : wrap(p.name))]));
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

function _optionalChain$1(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

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
        if (_optionalChain$1([style, 'access', _ => _.atRules, 'optionalAccess', _2 => _2.includes, 'call', _3 => _3('@font-face')])) {
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

function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

class CSSParser {
  
  
  __init() {this.variables = {};}
   __init2() {this._cache = {};}
  constructor(css, processor) {CSSParser.prototype.__init.call(this);CSSParser.prototype.__init2.call(this);
    this.css = css;
    this.processor = processor;
  }

   _addCache(style) {
    const rule = style.rule;
    if (['.', '#'].includes(rule.charAt(0))) this._cache[rule] = (rule in this._cache) ? [...this._cache[rule], deepCopy(style)] : [ deepCopy(style) ];
  }

   _searchGroup(text, startIndex = 0) {
    let level = 1;
    let endBracket = searchFrom(text, '}', startIndex);
    while (endBracket !== -1) {
      const nextBracket = searchFrom(text, '{', startIndex);
      if (endBracket < nextBracket || nextBracket === -1) {
        level--;
        startIndex = endBracket + 1;
        if (level === 0) return endBracket;
      } else {
        level++;
        startIndex = nextBracket + 1;
      }
      endBracket = searchFrom(text, '}', startIndex);
    }
    return -1;
  }

   _loadTheme(prop) {
    if (!prop) return;
    if (!this.processor) return prop;
    let index = 0;
    const output = [];
    while (index < prop.length) {
      const matched = prop.slice(index,).match(/theme\([^)]*?\)/);
      if (!matched || matched.index === undefined) break;
      output.push(prop.slice(index, index + matched.index));
      const args = matched[0].slice(6, -1).split(/\s*,\s*/).map(i => i.trim().replace(/^['"]+|['"]+$/g, ''));
      output.push(this.processor.theme(args[0], args[1]) );
      index += matched.index + matched[0].length;
    }
    output.push(prop.slice(index,));
    return output.join('');
  }

   _handleDirectives(atrule) {
    if (!this.processor) return { atrule };
    const iatrule = InlineAtRule.parse(atrule);
    if (!iatrule) return;
    if (iatrule.name === 'apply') return { apply: iatrule.value, important: iatrule.important };
    if (iatrule.name === 'layer') return { layer: (_nullishCoalesce(iatrule.value, () => ( 'components')))  };
    if (iatrule.name === 'variants' && iatrule.value)
      return { variants: iatrule.value.split(',').map(i => i.trim().split(':')) };
    if (iatrule.name === 'screen' && iatrule.value) {
      const screens = this.processor.resolveVariants('screen');
      if (iatrule.value in screens) return { atrule: _nullishCoalesce(_optionalChain([screens, 'access', _ => _[iatrule.value], 'call', _2 => _2(), 'access', _3 => _3.atRules, 'optionalAccess', _4 => _4[0]]), () => ( atrule)) };
      if (['dark', 'light'].includes(iatrule.value)) return { atrule: `@media (prefers-color-scheme: ${iatrule.value})` };
    }
    return { atrule };
  }

   _generateNestProperty(props, parent, parentType) {
    const style = new Style(undefined, props);
    if (!parent || !parentType) return style;
    if (parentType === 'selector') {
      style.selector = parent;
      return style;
    }
    return style.atRule(parent);
  }

   _generateNestStyle(styles, parent, parentType) {
    let layer = 'utilities';
    let order = layerOrder['utilities'] + 1;
    let group = 'block';
    if (!parent) return styles;
    if (parentType === 'selector') {
      styles.forEach(i => {
        if (i instanceof Keyframes) return;
        if (!i.selector) {
          i.selector = parent;
        } else {
          let selector = i.selector;
          selector = selector.trim().split(/\s*,\s*/g).map(i => /&/.test(i) ? i : `& ${i}`).join(', ');
          i.selector = /\s*,\s*/.test(parent) ? parent.trim().split(/\s*,\s*/g).map(i => selector.replace(/&/g, i)).join(', ') : selector.replace(/&/g, parent);
        }
        i.updateMeta(layer, group, order);
        this._addCache(i);
      });
    } else if (parentType === 'atRule') {
      let atrule = parent;
      if (this.processor) {
        // handle directives
        const directives = this._handleDirectives(parent);
        if (directives) {
          if ('atrule' in directives) {
            // @screen
            atrule = directives.atrule;
          } else if ('layer' in directives) {
            // @layer
            atrule = undefined;
            layer = directives.layer;
            order = layerOrder[layer];
            group = 'layer-block';
          } else if ('variants' in directives) {
            // @variants
            let output = [];
            for (const variant of directives.variants) {
              const wrapper = this.processor.wrapWithVariants(variant, styles);
              if (wrapper) output = output.concat(wrapper);
            }
            output.map(i => {
              i.updateMeta(layer, group, order);
              this._addCache(i);
            });
            return output;
          }
        }
      }
      styles.filter(i => !(i instanceof Keyframes)).forEach(i => {
        i.atRule(atrule);
        i.updateMeta(layer, group, order);
        this._addCache(i);
      });
    }
    return styles;
  }

  parse(css = this.css, parent, parentType) {
    const styleSheet = new StyleSheet();
    if (!css || isSpace(css)) return styleSheet;
    let index = 0;
    let firstLetter = searchFrom(css, /\S/, index);
    const len = css.length;

    while (firstLetter !== -1) {
      const propEnd = searchPropEnd(css, index);
      const nestStart = searchFrom(css, '{', firstLetter);
      const firstChar = css.charAt(firstLetter);

      if (firstChar === '/') {
        // remove comment
        switch(css.charAt(firstLetter + 1)) {
        case '/':
          index = firstLetter + 2;
          while (index < len) {
            if (css.charAt(index) === '\n') break;
            index ++;
          }
          index += 1;
          break;
        case '*':
          index = firstLetter + 2;
          while (index < len) {
            if (css.charAt(index) === '*' && css.charAt(index + 1) === '/') break;
            index ++;
          }
          index += 2;
          break;
        }
      } else if (propEnd === -1 || (nestStart !== -1 && propEnd > nestStart)) {
        // nested AtRule or Selector
        const selector = css.substring(firstLetter, nestStart).trim();
        index = nestStart + 1;
        const nestEnd = this._searchGroup(css, index);
        if (nestEnd === -1) break; // doesn't close block

        // allow last rule without semicolon
        let rule = css.slice(index, nestEnd);
        if (!/[};]\s*$/.test(rule)) rule = rule + ';';
        const content = this.parse(rule, selector);

        index = nestEnd + 1;
        styleSheet.add(this._generateNestStyle(content.children, selector, firstChar === '@' ? 'atRule': 'selector'));
      } else if (firstChar === '$') {
        // define variable
        const prop = Property.parse(css.slice(firstLetter, propEnd));
        if (prop && !Array.isArray(prop) && !Array.isArray(prop.name) && prop.value) {
          this.variables[prop.name.slice(1,)] = prop.value;
        }
        index = propEnd + 1;
      } else if (firstChar === '@') {
        // inline AtRule
        const data = css.slice(firstLetter, propEnd);
        if (this.processor) {
          // handle directives
          const directives = this._handleDirectives(data.trim());
          if (directives) {
            if ('atrule' in directives) {
              const atRule = InlineAtRule.parse(directives.atrule);
              if (atRule) styleSheet.add(this._generateNestProperty(atRule, parent, parentType));
            } else if ('apply' in directives && directives.apply) {
              const result = this.processor.compile(directives.apply, undefined, false, false, (ignored) => {
                if (('.' + ignored) in this._cache) return this._cache['.' + ignored];
              });

              styleSheet.add(result.styleSheet.clone().children.map(i => {
                if (!(i instanceof Keyframes)) {
                  i.selector = undefined;
                  if (directives.important) {
                    i.property.map(i => i.important = true);
                  }
                }
                return i;
              }));
            }
          }
        } else {
          // normal atrule
          const atRule = InlineAtRule.parse(data);
          if (atRule) styleSheet.add(this._generateNestProperty(atRule, parent, parentType));
        }
        index = propEnd + 1;

      } else {
        // inline Property
        const prop = Property.parse(css.slice(firstLetter, propEnd));
        index = propEnd + 1;
        if (prop) {
          // handle theme function
          if (Array.isArray(prop)) {
            prop.filter(p => _optionalChain([p, 'access', _5 => _5.value, 'optionalAccess', _6 => _6.match, 'call', _7 => _7(/theme\([^)]*\)/)])).forEach(p => p.value = this._loadTheme(p.value));
          } else if (_optionalChain([prop, 'access', _8 => _8.value, 'optionalAccess', _9 => _9.match, 'call', _10 => _10(/theme\([^)]*\)/)])) {
            prop.value = this._loadTheme(prop.value);
          }
          styleSheet.add(this._generateNestProperty(prop, parent, parentType));
        }
      }

      firstLetter = searchFrom(css, /\S/, index);
    }
    if (!parent) this._cache = {};
    return styleSheet.combine();
  }
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

exports.CSSParser = CSSParser;
exports.ClassParser = ClassParser;
exports.HTMLParser = HTMLParser;
