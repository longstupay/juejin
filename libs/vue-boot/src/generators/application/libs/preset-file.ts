import type { Tree } from '@nrwl/devkit';
import type { NormalizedSchema } from '../schema';

import { generateFiles, names, offsetFromRoot } from '@nrwl/devkit';
import { getRelativePathToRootTsConfig } from '@nrwl/js';

export interface PresetFileOptions extends NormalizedSchema {
  router: boolean;
  tailwind: boolean;
  pinia: boolean;
}
export function presetFile(tree: Tree, options: PresetFileOptions) {
  const relativePathToRootTsConfig = getRelativePathToRootTsConfig(
    tree,
    options.appProjectRoot
  );

  const templateVariables = {
    ...names(options.name),
    ...options,
    tpl: '',
    offsetFromRoot: offsetFromRoot(options.appProjectRoot),
    isTypeScript: options.type === 'ts',
    router: true,
  };

  if (!options.router) {
    tree.delete(`${options.appProjectRoot}/src/router`);
    //del views dir
    tree.delete(`${options.appProjectRoot}/src/views`);
  }
  if (!options.pinia) {
    tree.delete(`${options.appProjectRoot}/src/stores`);
  }
}
