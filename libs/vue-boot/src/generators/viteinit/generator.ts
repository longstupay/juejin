import {
  addDependenciesToPackageJson,
  convertNxGenerator,
  readJson,
  readNxJson,
  runTasksInSerial,
  Tree,
  updateJson,
  updateNxJson,
} from '@nrwl/devkit';

import {
  vitePluginVueVersion,
  viteVersion,
  vueVersion,
} from '../../utils/versions';
import { VitevueGeneratorSchema } from './schema';

function checkDependenciesInstalled(
  host: Tree,
  schema: VitevueGeneratorSchema
) {
  const packageJson = readJson(host, 'package.json');
  const devDependencies = {};
  const dependencies = {};
  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};

  // base deps
  devDependencies['vite'] = viteVersion;
  // devDependencies['vite-plugin-eslint'] = vitePluginEslintVersion;
  // devDependencies['vite-tsconfig-paths'] = viteTsConfigPathsVersion;
  // devDependencies['vitest'] = vitestVersion;
  // devDependencies['@vitest/ui'] = vitestUiVersion;

  if (schema.uiFramework === 'vue') {
    dependencies['vue'] = vueVersion;
    devDependencies['@vitejs/plugin-vue'] = vitePluginVueVersion;
  }

  return addDependenciesToPackageJson(host, dependencies, devDependencies);
}

function moveToDevDependencies(tree: Tree) {
  updateJson(tree, 'package.json', (packageJson) => {
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.devDependencies = packageJson.devDependencies || {};

    if (packageJson.dependencies['@vitejs/plugin-vue']) {
      packageJson.devDependencies['@vitejs/plugin-vue'] =
        packageJson.dependencies['@vitejs/plugin-vue'];
      delete packageJson.dependencies['@vitejs/plugin-vue'];
    }
    return packageJson;
  });
}

// export function createVitestConfig(tree: Tree) {
//   const nxJson = readNxJson(tree);

//   const productionFileSet = nxJson.namedInputs?.production;
//   if (productionFileSet) {
//     productionFileSet.push(
//       '!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)',
//       '!{projectRoot}/tsconfig.spec.json'
//     );

//     nxJson.namedInputs.production = Array.from(new Set(productionFileSet));
//   }

//   nxJson.targetDefaults ??= {};
//   nxJson.targetDefaults.test ??= {};
//   nxJson.targetDefaults.test.inputs ??= [
//     'default',
//     productionFileSet ? '^production' : '^default',
//   ];

//   updateNxJson(tree, nxJson);
// }

export async function viteInitGenerator(
  tree: Tree,
  schema: VitevueGeneratorSchema
) {
  moveToDevDependencies(tree);
  // createVitestConfig(tree);
  const tasks = [];

  tasks.push(checkDependenciesInstalled(tree, schema));
  return runTasksInSerial(...tasks);
}

export default viteInitGenerator;
export const initSchematic = convertNxGenerator(viteInitGenerator);
