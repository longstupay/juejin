const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

// const typescript = require('@rollup/plugin-typescript');

const path = require('path');

module.exports = (config) => {
  const oldPlugins = config.plugins;
  const changePlugins = [
    postcss({
      plugins: [
        tailwindcss(path.join(__dirname, 'tailwind.config.js')),
        autoprefixer(),
      ],
      inject: true,
      extract: false,
      minimize: true,
      autoModules: false,
    }),
  ];

  const newPlugins = oldPlugins.map((item) => {
    const addPlugin = changePlugins.find((item2) => item2.name === item.name);
    return {
      ...item,
      ...addPlugin,
    };
  });

  const newConfig = {
    input: config.input,
    output: [
      config.output,
      {
        format: 'cjs',
        dir: 'C:\\software\\webapp\\space\\juejin/dist/libs/ui/taib-ui',
        name: 'UiTaibUi',
        entryFileNames: '[name].cjs',
        chunkFileNames: '[name].cjs',
      },
    ],
    plugins: [
      ...newPlugins,
      //   typescript({
      //     tsconfig: path.join(__dirname, 'tsconfig.lib.json'),
      //   }),
    ],
  };

  return newConfig;
};
