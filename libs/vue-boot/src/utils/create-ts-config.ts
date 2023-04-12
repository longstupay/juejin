import { Tree } from 'nx/src/generators/tree';
import * as shared from '@nrwl/js/src/utils/typescript/create-ts-config';
import { updateJson, writeJson } from 'nx/src/generators/utils/json';

export function createTsConfig(
  host: Tree,
  projectRoot: string,
  type: 'app' | 'lib',
  options: {
    strict?: boolean;
    style?: string;
    bundler?: string;
    rootProject?: boolean;
    unitTestRunner?: string;
  },
  relativePathToRootTsConfig: string
) {
  const json = {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
      },
      lib: [
        // Should target at least ES2016 in Vue 3
        // Support for newer versions of language built-ins are
        // left for the users to include, because that would require:
        //   - either the project doesn't need to support older versions of browsers;
        //   - or the project has properly included the necessary polyfills.
        'ES2016',

        'DOM',
        'DOM.Iterable',

        // No `ScriptHost` because Vue 3 dropped support for IE
      ],
      strict: options.strict,
    },
    files: [],
    include: ['src/**/*', 'src/**/*.vue'],
    references: [
      {
        path: type === 'app' ? './tsconfig.app.json' : './tsconfig.lib.json',
      },
    ],
    extends: [''],
  } as any;

  if (options.bundler === 'vite') {
    json.compilerOptions.types =
      options.unitTestRunner === 'vitest'
        ? ['vite/client', 'vitest']
        : ['vite/client'];
  }

  // inline tsconfig.base.json into the project
  if (options.rootProject) {
    json.compileOnSave = false;
    json.compilerOptions = {
      ...shared.tsConfigBaseOptions,
      ...json.compilerOptions,
    };
    json.exclude = ['node_modules', 'tmp'];
  } else {
    json.extends = [relativePathToRootTsConfig];
  }

  writeJson(host, `${projectRoot}/tsconfig.json`, json);

  const tsconfigProjectPath = `${projectRoot}/tsconfig.${type}.json`;
  if (options.bundler === 'vite' && host.exists(tsconfigProjectPath)) {
    updateJson(host, tsconfigProjectPath, (json) => {
      json.compilerOptions ??= {};

      //确保'node'和'vite/client'类型被包含在json.compilerOptions.types数组中，而不添加重复的类型。
      const types = new Set(json.compilerOptions.types ?? []);
      types.add('node');
      types.add('vite/client');

      json.compilerOptions.types = Array.from(types);

      return json;
    });
  }
}

export function extractTsConfigBase(host: Tree) {
  shared.extractTsConfigBase(host);

  if (host.exists('vite.config.ts')) {
    const vite = host.read('vite.config.ts').toString();
    host.write(
      'vite.config.ts',
      vite.replace(`projects: []`, `projects: ['tsconfig.base.json']`)
    );
  }
}
