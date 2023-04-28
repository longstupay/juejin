import type { GeneratorCallback, Tree } from '@nx/devkit';
import { addDependenciesToPackageJson } from '@nx/devkit';
import { typeScriptVersion } from '../../../utils/versions';

export function addTypescript(tree: Tree): GeneratorCallback {
  return addDependenciesToPackageJson(
    tree,
    {},
    {
      // '@vue/tsconfig': vueTsConfigVersion,
      typescript: typeScriptVersion,
    }
  );
}
