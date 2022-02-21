'use strict';

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

var index = createPlugin(
  function ({ addDynamic, theme, variants }) {
    addDynamic('filter', ({ Utility }) => {
      return Utility.handler
        .handleStatic(theme('filter'))
        .createProperty(['-webkit-filter', 'filter']);
    }, {
      variants: variants('filter'),
      group: 'filter',
      completions: [
        'blur-{static}',
      ],
    });

    addDynamic('backdrop', ({ Utility }) => {
      return Utility.handler
        .handleStatic(theme('backdropFilter'))
        .createProperty(['-webkit-backdrop-filter', 'backdrop-filter']);
    }, {
      variants: variants('backdropFilter'),
      group: 'backdropFilter',
      completions: [
        'backdrop-{static}',
      ],
    });

    addDynamic('blur', ({ Utility }) => {
      return Utility.handler
        .handleStatic(theme('blur'))
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'float', (number) => `${number}px`)
        .handleSize()
        .createProperty(
          ['-webkit-backdrop-filter', 'backdrop-filter'],
          (value) => {
            if (value === 'none') return 'none';
            return `blur(${value})`;
          }
        );
    }, {
      variants: variants('blur'),
      group: 'blur',
      completions: [
        'blur-{static}',
      ],
    });
  },
  {
    theme: {
      filter: {
        none: 'none',
        grayscale: 'grayscale(1)',
        invert: 'invert(1)',
        sepia: 'sepia(1)',
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(20px)',
      },
      blur: {
        none: 'none',
      },
    },
    variants: {
      filter: ['responsive'],
      backdropFilter: ['responsive'],
    },
  }
);

module.exports = index;
