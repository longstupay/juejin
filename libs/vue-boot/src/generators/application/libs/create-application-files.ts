import { names, offsetFromRoot, Tree, toJS, generateFiles } from '@nrwl/devkit';
import { getRelativePathToRootTsConfig } from '@nrwl/js';
import { join } from 'path';
import { createTsConfig } from '../../../utils/create-ts-config';
import type { NormalizedSchema } from '../schema';

export function createApplicationFiles(host: Tree, options: NormalizedSchema) {
  let styleSolutionSpecificAppFiles: string;
  if (options.style === 'css') {
    styleSolutionSpecificAppFiles = '../files/css-vite';
  } else if (options.style === 'scss') {
    styleSolutionSpecificAppFiles = '../files/scss-vite';
  } else if (options.style === 'less') {
    styleSolutionSpecificAppFiles = '../files/less-vite';
  } else {
    styleSolutionSpecificAppFiles = '../files/css-vite';
  }

  const relativePathToRootTsConfig = getRelativePathToRootTsConfig(
    host,
    options.appProjectRoot
  );
  const templateVariables = {
    ...names(options.name),
    ...options,
    tpl: '',
    offsetFromRoot: offsetFromRoot(options.appProjectRoot),
  };

  generateFiles(
    host,
    join(__dirname, '../files/base-vite'),
    options.appProjectRoot,
    templateVariables
  );

  // g index.html
  generateFiles(
    host,
    join(__dirname, '../files/root-file'),
    options.appProjectRoot,
    templateVariables
  );

  // g style sheet files
  if (options.style !== 'none') {
    generateFiles(
      host,
      join(__dirname, styleSolutionSpecificAppFiles),
      options.appProjectRoot,
      templateVariables
    );
  }

  if (options.type === 'js') {
    toJS(host);
  }

  createTsConfig(
    host,
    options.appProjectRoot,
    'app',
    options,
    relativePathToRootTsConfig
  );
}
