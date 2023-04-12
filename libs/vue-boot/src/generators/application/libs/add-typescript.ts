import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import { addDependenciesToPackageJson } from '@nrwl/devkit';
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
