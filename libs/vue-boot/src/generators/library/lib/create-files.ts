import type { Tree } from '@nx/devkit';
import {
  generateFiles,
  joinPathFragments,
  names,
  offsetFromRoot,
  toJS,
} from '@nx/devkit';
import { getRelativePathToRootTsConfig } from '@nx/js';

import { NormalizedSchema } from '../schema';
import { createTsConfig } from '../../../utils/create-ts-config';

export function createFiles(host: Tree, options: NormalizedSchema) {
  const relativePathToRootTsConfig = getRelativePathToRootTsConfig(
    host,
    options.projectRoot
  );

  const substitutions = {
    ...options,
    ...names(options.name),
    tmpl: '',
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    tailWind: options.component,
    style: options.style === 'none' ? 'css' : options.style,
  };

  generateFiles(
    host,
    joinPathFragments(__dirname, '../files/common'),
    options.projectRoot,
    substitutions
  );

  if (options.bundler === 'vite' || options.unitTestRunner === 'vitest') {
    generateFiles(
      host,
      joinPathFragments(__dirname, '../files/vite'),
      options.projectRoot,
      substitutions
    );

    if (host.exists(joinPathFragments(options.projectRoot, '.babelrc'))) {
      host.delete(joinPathFragments(options.projectRoot, '.babelrc'));
    }
  }

  if (!options.component) {
    host.delete(
      joinPathFragments(
        options.projectRoot,
        'src',
        `import-tw.${options.style === 'none' ? 'css' : options.style}`
        // `import-tw.${options.style}`
      )
    );
  }

  if (!options.publishable && !options.buildable) {
    host.delete(`${options.projectRoot}/package.json`);
  }

  if (options.js) {
    toJS(host);
  }

  createTsConfig(
    host,
    options.projectRoot,
    'lib',
    options,
    relativePathToRootTsConfig
  );
}
