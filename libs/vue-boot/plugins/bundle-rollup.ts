import * as rollup from 'rollup';

function getRollupOptions(options: rollup.RollupOptions) {
  const extraGlobals = {
    vue: 'Vue',
  };

  if (Array.isArray(options.output)) {
    options.output.forEach((o) => {
      o.globals = { ...o.globals, ...extraGlobals };
    });
  } else {
    options.output = {
      ...options.output,
      globals: {
        ...options.output?.globals,
        ...extraGlobals,
      },
    };
  }

  try {
    // typescript({ tsconfig: path.resolve(__dirname, 'tsconfig.json') }),
    // vue({ css: true }),
    // terser(),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vue = require('rollup-plugin-vue');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const { terser } = require('rollup-plugin-terser')
    options.plugins = [
      vue({}),
      ...(options.plugins as unknown as []),
      // terser(),
    ];
  } catch {
    // Ignored for
  }

  return options;
}

module.exports = getRollupOptions;
