'use strict';

function uniq(array) {
  return Array.from(new Set(array));
}

function castArray(value) {
  if (!arguments.length) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function isUsableColor(color, values) {
  return Boolean(values && typeof values === 'object' && color !== 'gray' && values[600]);
}

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');

const rem = (px) => `${round(px / 16)}rem`;

const em = (px, base) => `${round(px / base)}em`;

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

const styles$2

 = (
  theme
) => ({
  DEFAULT: {
    css: [
      {
        color: theme('colors.gray.700', defaultColors.gray[700]),
        maxWidth: '65ch',
        '[class~="lead"]': {
          color: theme('colors.gray.600', defaultColors.gray[600]),
        },
        a: {
          color: theme('colors.gray.900', defaultColors.gray[900]),
          textDecoration: 'underline',
          fontWeight: '500',
        },
        strong: {
          color: theme('colors.gray.900', defaultColors.gray[900]),
          fontWeight: '600',
        },
        'ol[type="A"]': {
          '--list-counter-style': 'upper-alpha',
        },
        'ol[type="a"]': {
          '--list-counter-style': 'lower-alpha',
        },
        'ol[type="A s"]': {
          '--list-counter-style': 'upper-alpha',
        },
        'ol[type="a s"]': {
          '--list-counter-style': 'lower-alpha',
        },
        'ol[type="I"]': {
          '--list-counter-style': 'upper-roman',
        },
        'ol[type="i"]': {
          '--list-counter-style': 'lower-roman',
        },
        'ol[type="I s"]': {
          '--list-counter-style': 'upper-roman',
        },
        'ol[type="i s"]': {
          '--list-counter-style': 'lower-roman',
        },
        'ol[type="1"]': {
          '--list-counter-style': 'decimal',
        },
        'ol > li': {
          position: 'relative',
        },
        'ol > li::before': {
          content: 'counter(list-item, var(--list-counter-style, decimal)) "."',
          position: 'absolute',
          fontWeight: '400',
          color: theme('colors.gray.500', defaultColors.gray[500]),
        },
        'ul > li': {
          position: 'relative',
        },
        'ul > li::before': {
          content: '""',
          position: 'absolute',
          backgroundColor: theme('colors.gray.300', defaultColors.gray[300]),
          borderRadius: '50%',
        },
        hr: {
          borderColor: theme('colors.gray.200', defaultColors.gray[200]),
          borderTopWidth: 1,
        },
        blockquote: {
          fontWeight: '500',
          fontStyle: 'italic',
          color: theme('colors.gray.900', defaultColors.gray[900]),
          borderLeftWidth: '0.25rem',
          borderColor: theme('colors.gray.200', defaultColors.gray[200]),
          quotes: '"\\201C""\\201D""\\2018""\\2019"',
        },
        'blockquote p:first-of-type::before': {
          content: 'open-quote',
        },
        'blockquote p:last-of-type::after': {
          content: 'close-quote',
        },
        h1: {
          color: theme('colors.gray.900', defaultColors.gray[900]),
          fontWeight: '800',
        },
        h2: {
          color: theme('colors.gray.900', defaultColors.gray[900]),
          fontWeight: '700',
        },
        h3: {
          color: theme('colors.gray.900', defaultColors.gray[900]),
          fontWeight: '600',
        },
        h4: {
          color: theme('colors.gray.900', defaultColors.gray[900]),
          fontWeight: '600',
        },
        'figure figcaption': {
          color: theme('colors.gray.500', defaultColors.gray[500]),
        },
        code: {
          color: theme('colors.gray.900', defaultColors.gray[900]),
          fontWeight: '600',
        },
        'code::before': {
          content: '"`"',
        },
        'code::after': {
          content: '"`"',
        },
        'a code': {
          color: theme('colors.gray.900', defaultColors.gray[900]),
        },
        pre: {
          color: theme('colors.gray.200', defaultColors.gray[200]),
          backgroundColor: theme('colors.gray.800', defaultColors.gray[800]),
          overflowX: 'auto',
        },
        'pre code': {
          backgroundColor: 'transparent',
          borderWidth: '0',
          borderRadius: '0',
          padding: '0',
          fontWeight: '400',
          color: 'inherit',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          lineHeight: 'inherit',
        },
        'pre code::before': {
          content: 'none',
        },
        'pre code::after': {
          content: 'none',
        },
        table: {
          width: '100%',
          tableLayout: 'auto',
          textAlign: 'left',
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        thead: {
          color: theme('colors.gray.900', defaultColors.gray[900]),
          fontWeight: '600',
          borderBottomWidth: '1px',
          borderBottomColor: theme('colors.gray.300', defaultColors.gray[300]),
        },
        'thead th': {
          verticalAlign: 'bottom',
        },
        'tbody tr': {
          borderBottomWidth: '1px',
          borderBottomColor: theme('colors.gray.200', defaultColors.gray[200]),
        },
        'tbody tr:last-child': {
          borderBottomWidth: '0',
        },
        'tbody td': {
          verticalAlign: 'top',
        },
      },
      {
        fontSize: rem(16),
        lineHeight: round(28 / 16),
        p: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
        },
        '[class~="lead"]': {
          fontSize: em(20, 16),
          lineHeight: round(32 / 20),
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        blockquote: {
          marginTop: em(32, 20),
          marginBottom: em(32, 20),
          paddingLeft: em(20, 20),
        },
        h1: {
          fontSize: em(36, 16),
          marginTop: '0',
          marginBottom: em(32, 36),
          lineHeight: round(40 / 36),
        },
        h2: {
          fontSize: em(24, 16),
          marginTop: em(48, 24),
          marginBottom: em(24, 24),
          lineHeight: round(32 / 24),
        },
        h3: {
          fontSize: em(20, 16),
          marginTop: em(32, 20),
          marginBottom: em(12, 20),
          lineHeight: round(32 / 20),
        },
        h4: {
          marginTop: em(24, 16),
          marginBottom: em(8, 16),
          lineHeight: round(24 / 16),
        },
        img: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        video: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        figure: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(14, 16),
          lineHeight: round(20 / 14),
          marginTop: em(12, 14),
        },
        code: {
          fontSize: em(14, 16),
        },
        'h2 code': {
          fontSize: em(21, 24),
        },
        'h3 code': {
          fontSize: em(18, 20),
        },
        pre: {
          fontSize: em(14, 16),
          lineHeight: round(24 / 14),
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
          borderRadius: rem(6),
          paddingTop: em(12, 14),
          paddingRight: em(16, 14),
          paddingBottom: em(12, 14),
          paddingLeft: em(16, 14),
        },
        ol: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
          'list-style-type': 'none',
        },
        ul: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
          'list-style-type': 'none',
        },
        li: {
          marginTop: em(8, 16),
          marginBottom: em(8, 16),
        },
        'ol > li': {
          paddingLeft: em(28, 16),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(28, 16),
        },
        'ul > li::before': {
          width: em(6, 16),
          height: em(6, 16),
          top: `calc(${em(28 / 2, 16)} - ${em(3, 16)})`,
          left: em(4, 16),
        },
        '> ul > li p': {
          marginTop: em(12, 16),
          marginBottom: em(12, 16),
        },
        '> ul > li > *:first-child': {
          marginTop: em(20, 16),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(20, 16),
        },
        '> ol > li > *:first-child': {
          marginTop: em(20, 16),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(20, 16),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(12, 16),
          marginBottom: em(12, 16),
        },
        hr: {
          marginTop: em(48, 16),
          marginBottom: em(48, 16),
        },
        'hr + *': {
          marginTop: '0',
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
        table: {
          fontSize: em(14, 16),
          lineHeight: round(24 / 14),
        },
        'thead th': {
          paddingRight: em(8, 14),
          paddingBottom: em(8, 14),
          paddingLeft: em(8, 14),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(8, 14),
          paddingRight: em(8, 14),
          paddingBottom: em(8, 14),
          paddingLeft: em(8, 14),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },
  sm: {
    css: [
      {
        fontSize: rem(14),
        lineHeight: round(24 / 14),
        p: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        '[class~="lead"]': {
          fontSize: em(18, 14),
          lineHeight: round(28 / 18),
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        blockquote: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
          paddingLeft: em(20, 18),
        },
        h1: {
          fontSize: em(30, 14),
          marginTop: '0',
          marginBottom: em(24, 30),
          lineHeight: round(36 / 30),
        },
        h2: {
          fontSize: em(20, 14),
          marginTop: em(32, 20),
          marginBottom: em(16, 20),
          lineHeight: round(28 / 20),
        },
        h3: {
          fontSize: em(18, 14),
          marginTop: em(28, 18),
          marginBottom: em(8, 18),
          lineHeight: round(28 / 18),
        },
        h4: {
          marginTop: em(20, 14),
          marginBottom: em(8, 14),
          lineHeight: round(20 / 14),
        },
        img: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        video: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        figure: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(12, 14),
          lineHeight: round(16 / 12),
          marginTop: em(8, 12),
        },
        code: {
          fontSize: em(12, 14),
        },
        'h2 code': {
          fontSize: em(18, 20),
        },
        'h3 code': {
          fontSize: em(16, 18),
        },
        pre: {
          fontSize: em(12, 14),
          lineHeight: round(20 / 12),
          marginTop: em(20, 12),
          marginBottom: em(20, 12),
          borderRadius: rem(4),
          paddingTop: em(8, 12),
          paddingRight: em(12, 12),
          paddingBottom: em(8, 12),
          paddingLeft: em(12, 12),
        },
        ol: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        ul: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        li: {
          marginTop: em(4, 14),
          marginBottom: em(4, 14),
        },
        'ol > li': {
          paddingLeft: em(22, 14),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(22, 14),
        },
        'ul > li::before': {
          height: em(5, 14),
          width: em(5, 14),
          top: `calc(${em(24 / 2, 14)} - ${em(2.5, 14)})`,
          left: em(3, 14),
        },
        '> ul > li p': {
          marginTop: em(8, 14),
          marginBottom: em(8, 14),
        },
        '> ul > li > *:first-child': {
          marginTop: em(16, 14),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(16, 14),
        },
        '> ol > li > *:first-child': {
          marginTop: em(16, 14),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(16, 14),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(8, 14),
          marginBottom: em(8, 14),
        },
        hr: {
          marginTop: em(40, 14),
          marginBottom: em(40, 14),
        },
        'hr + *': {
          marginTop: '0',
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
        table: {
          fontSize: em(12, 14),
          lineHeight: round(18 / 12),
        },
        'thead th': {
          paddingRight: em(12, 12),
          paddingBottom: em(8, 12),
          paddingLeft: em(12, 12),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(8, 12),
          paddingRight: em(12, 12),
          paddingBottom: em(8, 12),
          paddingLeft: em(12, 12),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },
  lg: {
    css: [
      {
        fontSize: rem(18),
        lineHeight: round(32 / 18),
        p: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        '[class~="lead"]': {
          fontSize: em(22, 18),
          lineHeight: round(32 / 22),
          marginTop: em(24, 22),
          marginBottom: em(24, 22),
        },
        blockquote: {
          marginTop: em(40, 24),
          marginBottom: em(40, 24),
          paddingLeft: em(24, 24),
        },
        h1: {
          fontSize: em(48, 18),
          marginTop: '0',
          marginBottom: em(40, 48),
          lineHeight: round(48 / 48),
        },
        h2: {
          fontSize: em(30, 18),
          marginTop: em(56, 30),
          marginBottom: em(32, 30),
          lineHeight: round(40 / 30),
        },
        h3: {
          fontSize: em(24, 18),
          marginTop: em(40, 24),
          marginBottom: em(16, 24),
          lineHeight: round(36 / 24),
        },
        h4: {
          marginTop: em(32, 18),
          marginBottom: em(8, 18),
          lineHeight: round(28 / 18),
        },
        img: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        video: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        figure: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(16, 18),
          lineHeight: round(24 / 16),
          marginTop: em(16, 16),
        },
        code: {
          fontSize: em(16, 18),
        },
        'h2 code': {
          fontSize: em(26, 30),
        },
        'h3 code': {
          fontSize: em(21, 24),
        },
        pre: {
          fontSize: em(16, 18),
          lineHeight: round(28 / 16),
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
          borderRadius: rem(6),
          paddingTop: em(16, 16),
          paddingRight: em(24, 16),
          paddingBottom: em(16, 16),
          paddingLeft: em(24, 16),
        },
        ol: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        ul: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        li: {
          marginTop: em(12, 18),
          marginBottom: em(12, 18),
        },
        'ol > li': {
          paddingLeft: em(30, 18),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(30, 18),
        },
        'ul > li::before': {
          width: em(6, 18),
          height: em(6, 18),
          top: `calc(${em(32 / 2, 18)} - ${em(3, 18)})`,
          left: em(4, 18),
        },
        '> ul > li p': {
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        '> ul > li > *:first-child': {
          marginTop: em(24, 18),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(24, 18),
        },
        '> ol > li > *:first-child': {
          marginTop: em(24, 18),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(24, 18),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        hr: {
          marginTop: em(56, 18),
          marginBottom: em(56, 18),
        },
        'hr + *': {
          marginTop: '0',
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
        table: {
          fontSize: em(16, 18),
          lineHeight: round(24 / 16),
        },
        'thead th': {
          paddingRight: em(12, 16),
          paddingBottom: em(12, 16),
          paddingLeft: em(12, 16),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(12, 16),
          paddingRight: em(12, 16),
          paddingBottom: em(12, 16),
          paddingLeft: em(12, 16),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },
  xl: {
    css: [
      {
        fontSize: rem(20),
        lineHeight: round(36 / 20),
        p: {
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        '[class~="lead"]': {
          fontSize: em(24, 20),
          lineHeight: round(36 / 24),
          marginTop: em(24, 24),
          marginBottom: em(24, 24),
        },
        blockquote: {
          marginTop: em(48, 30),
          marginBottom: em(48, 30),
          paddingLeft: em(32, 30),
        },
        h1: {
          fontSize: em(56, 20),
          marginTop: '0',
          marginBottom: em(48, 56),
          lineHeight: round(56 / 56),
        },
        h2: {
          fontSize: em(36, 20),
          marginTop: em(56, 36),
          marginBottom: em(32, 36),
          lineHeight: round(40 / 36),
        },
        h3: {
          fontSize: em(30, 20),
          marginTop: em(48, 30),
          marginBottom: em(20, 30),
          lineHeight: round(40 / 30),
        },
        h4: {
          marginTop: em(36, 20),
          marginBottom: em(12, 20),
          lineHeight: round(32 / 20),
        },
        img: {
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
        },
        video: {
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
        },
        figure: {
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(18, 20),
          lineHeight: round(28 / 18),
          marginTop: em(18, 18),
        },
        code: {
          fontSize: em(18, 20),
        },
        'h2 code': {
          fontSize: em(31, 36),
        },
        'h3 code': {
          fontSize: em(27, 30),
        },
        pre: {
          fontSize: em(18, 20),
          lineHeight: round(32 / 18),
          marginTop: em(36, 18),
          marginBottom: em(36, 18),
          borderRadius: rem(8),
          paddingTop: em(20, 18),
          paddingRight: em(24, 18),
          paddingBottom: em(20, 18),
          paddingLeft: em(24, 18),
        },
        ol: {
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        ul: {
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        li: {
          marginTop: em(12, 20),
          marginBottom: em(12, 20),
        },
        'ol > li': {
          paddingLeft: em(36, 20),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(36, 20),
        },
        'ul > li::before': {
          width: em(7, 20),
          height: em(7, 20),
          top: `calc(${em(36 / 2, 20)} - ${em(3.5, 20)})`,
          left: em(5, 20),
        },
        '> ul > li p': {
          marginTop: em(16, 20),
          marginBottom: em(16, 20),
        },
        '> ul > li > *:first-child': {
          marginTop: em(24, 20),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(24, 20),
        },
        '> ol > li > *:first-child': {
          marginTop: em(24, 20),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(24, 20),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(16, 20),
          marginBottom: em(16, 20),
        },
        hr: {
          marginTop: em(56, 20),
          marginBottom: em(56, 20),
        },
        'hr + *': {
          marginTop: '0',
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
        table: {
          fontSize: em(18, 20),
          lineHeight: round(28 / 18),
        },
        'thead th': {
          paddingRight: em(12, 18),
          paddingBottom: em(16, 18),
          paddingLeft: em(12, 18),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(16, 18),
          paddingRight: em(12, 18),
          paddingBottom: em(16, 18),
          paddingLeft: em(12, 18),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },
  '2xl': {
    css: [
      {
        fontSize: rem(24),
        lineHeight: round(40 / 24),
        p: {
          marginTop: em(32, 24),
          marginBottom: em(32, 24),
        },
        '[class~="lead"]': {
          fontSize: em(30, 24),
          lineHeight: round(44 / 30),
          marginTop: em(32, 30),
          marginBottom: em(32, 30),
        },
        blockquote: {
          marginTop: em(64, 36),
          marginBottom: em(64, 36),
          paddingLeft: em(40, 36),
        },
        h1: {
          fontSize: em(64, 24),
          marginTop: '0',
          marginBottom: em(56, 64),
          lineHeight: round(64 / 64),
        },
        h2: {
          fontSize: em(48, 24),
          marginTop: em(72, 48),
          marginBottom: em(40, 48),
          lineHeight: round(52 / 48),
        },
        h3: {
          fontSize: em(36, 24),
          marginTop: em(56, 36),
          marginBottom: em(24, 36),
          lineHeight: round(44 / 36),
        },
        h4: {
          marginTop: em(40, 24),
          marginBottom: em(16, 24),
          lineHeight: round(36 / 24),
        },
        img: {
          marginTop: em(48, 24),
          marginBottom: em(48, 24),
        },
        video: {
          marginTop: em(48, 24),
          marginBottom: em(48, 24),
        },
        figure: {
          marginTop: em(48, 24),
          marginBottom: em(48, 24),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(20, 24),
          lineHeight: round(32 / 20),
          marginTop: em(20, 20),
        },
        code: {
          fontSize: em(20, 24),
        },
        'h2 code': {
          fontSize: em(42, 48),
        },
        'h3 code': {
          fontSize: em(32, 36),
        },
        pre: {
          fontSize: em(20, 24),
          lineHeight: round(36 / 20),
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
          borderRadius: rem(8),
          paddingTop: em(24, 20),
          paddingRight: em(32, 20),
          paddingBottom: em(24, 20),
          paddingLeft: em(32, 20),
        },
        ol: {
          marginTop: em(32, 24),
          marginBottom: em(32, 24),
        },
        ul: {
          marginTop: em(32, 24),
          marginBottom: em(32, 24),
        },
        li: {
          marginTop: em(12, 24),
          marginBottom: em(12, 24),
        },
        'ol > li': {
          paddingLeft: em(40, 24),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(40, 24),
        },
        'ul > li::before': {
          width: em(8, 24),
          height: em(8, 24),
          top: `calc(${em(40 / 2, 24)} - ${em(4, 24)})`,
          left: em(6, 24),
        },
        '> ul > li p': {
          marginTop: em(20, 24),
          marginBottom: em(20, 24),
        },
        '> ul > li > *:first-child': {
          marginTop: em(32, 24),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(32, 24),
        },
        '> ol > li > *:first-child': {
          marginTop: em(32, 24),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(32, 24),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(16, 24),
          marginBottom: em(16, 24),
        },
        hr: {
          marginTop: em(72, 24),
          marginBottom: em(72, 24),
        },
        'hr + *': {
          marginTop: '0',
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
        table: {
          fontSize: em(20, 24),
          lineHeight: round(28 / 20),
        },
        'thead th': {
          paddingRight: em(12, 20),
          paddingBottom: em(16, 20),
          paddingLeft: em(12, 20),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(16, 20),
          paddingRight: em(12, 20),
          paddingBottom: em(16, 20),
          paddingLeft: em(12, 20),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },

  // Add color modifiers
  ...Object.entries(theme('colors', defaultColors) ).reduce(
    (reduced, [color, values]) => {
      if (!isUsableColor(color, values)) {
        return reduced;
      }

      return {
        ...reduced,
        [color]: {
          css: [
            {
              a: { color: values[600] },
              'a code': { color: values[600] },
            },
          ],
        },
      };
    },
    {}
  ),
});

const styles$1 = () => ({
  DEFAULT: {
    css: [
      {
        'ol > li': {
          paddingLeft: 'initial',
          paddingRight: em(28, 16),
        },
        'ol > li::before': {
          left: 'initial',
          right: '0',
        },
        'ul > li': {
          paddingLeft: 'initial',
          paddingRight: em(28, 16),
        },
        'ul > li::before': {
          left: 'initial',
          right: em(4, 16),
        },
        blockquote: {
          borderLeftWidth: '0',
          borderRightWidth: '0.25rem',
          paddingLeft: 'initial',
          paddingRight: em(20, 20),
        },
        table: {
          textAlign: 'right',
        },
        'thead th:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'thead th:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
        'tbody td:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'tbody td:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
      },
    ],
  },
  sm: {
    css: [
      {
        blockquote: {
          paddingLeft: 'initial',
          paddingRight: em(20, 18),
        },
        'ol > li': {
          paddingLeft: 'initial',
          paddingRight: em(22, 14),
        },
        'ol > li::before': {
          left: 'initial',
          right: '0',
        },
        'ul > li': {
          paddingLeft: 'initial',
          paddingRight: em(22, 14),
        },
        'ul > li::before': {
          left: 'initial',
          right: em(3, 14),
        },
        'thead th:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'thead th:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
        'tbody td:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'tbody td:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
      },
    ],
  },
  lg: {
    css: [
      {
        blockquote: {
          paddingLeft: 'initial',
          paddingRight: em(24, 24),
        },
        'ol > li': {
          paddingLeft: 'initial',
          paddingRight: em(30, 18),
        },
        'ol > li::before': {
          left: 'initial',
          right: '0',
        },
        'ul > li': {
          paddingLeft: 'initial',
          paddingRight: em(30, 18),
        },
        'ul > li::before': {
          left: 'initial',
          right: em(4, 18),
        },
        'thead th:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'thead th:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
        'tbody td:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'tbody td:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
      },
    ],
  },
  xl: {
    css: [
      {
        blockquote: {
          paddingLeft: 'initial',
          paddingRight: em(32, 30),
        },
        'ol > li': {
          paddingLeft: 'initial',
          paddingRight: em(36, 20),
        },
        'ol > li::before': {
          left: 'initial',
          right: '0',
        },
        'ul > li': {
          paddingLeft: 'initial',
          paddingRight: em(36, 20),
        },
        'ul > li::before': {
          left: 'initial',
          right: em(5, 20),
        },
        'thead th:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'thead th:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
        'tbody td:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'tbody td:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
      },
    ],
  },
  '2xl': {
    css: [
      {
        blockquote: {
          paddingLeft: 'initial',
          paddingRight: em(40, 36),
        },
        'ol > li': {
          paddingLeft: 'initial',
          paddingRight: em(40, 24),
        },
        'ol > li::before': {
          left: 'initial',
          right: '0',
        },
        'ul > li': {
          paddingLeft: 'initial',
          paddingRight: em(40, 24),
        },
        'ul > li::before': {
          left: 'initial',
          right: em(6, 24),
        },
        'thead th:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'thead th:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
        'tbody td:first-child': {
          paddingLeft: 'initial',
          paddingRight: '0',
        },
        'tbody td:last-child': {
          paddingRight: 'initial',
          paddingLeft: '0',
        },
      },
    ],
  },
});

const styles

 = (
  theme
) => ({
  css: [
    {
      color: theme('colors.warm-gray.300', defaultColors['warm-gray'][300]),
      '[class~="lead"]': {
        color: theme('colors.warm-gray.200', defaultColors['warm-gray'][200]),
      },
      a: {
        color: theme('colors.warm-gray.200', defaultColors['warm-gray'][200]),
      },
      strong: {
        color: theme('colors.warm-gray.200', defaultColors['warm-gray'][200]),
      },
      'ol > li::before': {
        color: theme('colors.warm-gray.500', defaultColors['warm-gray'][500]),
      },
      'ul > li::before': {
        backgroundColor: theme('colors.warm-gray.500', defaultColors['warm-gray'][500]),
      },
      hr: {
        borderColor: theme('colors.warm-gray.800', defaultColors['warm-gray'][800]),
      },
      blockquote: {
        color: theme('colors.warm-gray.500', defaultColors['warm-gray'][500]),
        borderColor: theme('colors.warm-gray.700', defaultColors['warm-gray'][700]),
      },
      h1: {
        color: theme('colors.warm-gray.200', defaultColors['warm-gray'][200]),
      },
      h2: {
        color: theme('colors.warm-gray.200', defaultColors['warm-gray'][200]),
      },
      h3: {
        color: theme('colors.warm-gray.200', defaultColors['warm-gray'][200]),
      },
      h4: {
        color: theme('colors.warm-gray.200', defaultColors['warm-gray'][200]),
      },
      'figure figcaption': {
        color: theme('colors.warm-gray.400', defaultColors['warm-gray'][400]),
      },
      code: {
        color: theme('colors.warm-gray.300', defaultColors['warm-gray'][300]),
      },
      'a code': {
        color: theme('colors.warm-gray.100', defaultColors['warm-gray'][100]),
      },
      pre: {
        color: theme('colors.warm-gray.100', defaultColors['warm-gray'][100]),
        backgroundColor: theme('colors.warm-gray.900', defaultColors['warm-gray'][900]),
      },
      'pre code': {
        backgroundColor: 'transparent',
        color: 'inherit',
      },
      thead: {
        color: theme('colors.warm-gray.100', defaultColors['warm-gray'][100]),
        borderBottomColor: theme('colors.warm-gray.700', defaultColors['warm-gray'][700]),
      },
      'tbody tr': {
        borderBottomColor: theme('colors.warm-gray.800', defaultColors['warm-gray'][800]),
      },
    },
  ],
});

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

const computed

 = {
  // Reserved for future "magic properties", for example:
  // bulletColor: (color) => ({ 'ul > li::before': { backgroundColor: color } }),
};

function configToCss(config = {}) {
  return [
    ...Object.keys(config)
      .filter((key) => computed[key])
      .map((key) => computed[key](config[key])),
    ...(castArray(config.css || {}) ),
  ].reduce(
    (previous, current) => combineConfig(previous, current),
    {}
  ) ;
}

var index = createPlugin.withOptions




(
  ({
    modifiers,
    className = 'prose',
    rtl = false,
    dark = false,
  } = {}) => {
    return function ({ addDynamic, theme, config }) {
      const DEFAULT_MODIFIERS = [
        'DEFAULT',
        'sm',
        'lg',
        'xl',
        '2xl',
        ...Object.entries(
          theme('colors') 


        )
          .filter(([color, values]) => isUsableColor(color, values))
          .map(([color]) => color),
      ];
      modifiers = modifiers === undefined ? DEFAULT_MODIFIERS : modifiers;
      const pluginConfig = theme('typography') 





;

      const darkMode = config('darkMode', 'class') ;

      const all = uniq([
        'DEFAULT',
        ...modifiers,
        ...Object.keys(pluginConfig).filter(
          (modifier) => !DEFAULT_MODIFIERS.includes(modifier)
        ),
      ]).filter(i => !['RTL', 'DARK'].includes(i));

      addDynamic(className, ({ Utility, Style }) => {
        const isDefault = Utility.raw === className;
        const modifier = isDefault? 'DEFAULT' : Utility.body;
        if (!all.includes(modifier)) return;
        return [
          ...Style.generate(isDefault? `.${className}` : `.${className}-${modifier}`, configToCss(pluginConfig[modifier])),
          ...(dark && isDefault? Style.generate(`.${className}`, configToCss(pluginConfig['DARK'])).map(i => darkMode === 'class' ? i.parent('.dark') : i.atRule('@media (prefers-color-scheme: dark)')) : [] ),
          ...(rtl ? Style.generate(isDefault? `.${className}[dir="rtl"]` : `.${className}-${modifier}[dir="rtl"]`,
            configToCss(pluginConfig['RTL'][modifier])).map(i => {
            i.meta.respectSelector = true;
            return i;
          }) : []),
        ];
      }, {
        layer: 'components',
        order: 149,
        group: 'typography',
        completions: all.map(i => i === 'DEFAULT' ? className : `${className}-${i}`),
      });
    };
  },
  () => ({
    theme: { typography: (theme) => ({ ...styles$2(theme), RTL: styles$1(), DARK: styles(theme) }) },
    variants: { typography: ['responsive'] },
  })
);

module.exports = index;
