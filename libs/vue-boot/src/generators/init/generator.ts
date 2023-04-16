import {
  addDependenciesToPackageJson,
  convertNxGenerator,
  ensurePackage,
  GeneratorCallback,
  readNxJson,
  removeDependenciesFromPackageJson,
  runTasksInSerial,
  Tree,
  updateNxJson,
} from '@nrwl/devkit';

import { initGenerator as jsInitGenerator } from '@nrwl/js';
import { nxVersion, typesNodeVersion, vueVersion } from '../../utils/versions';

import { InitGeneratorSchema } from './schema';

// function setDefault(host: Tree) {
//   const workspace = readNxJson(host);

//   workspace.generators = workspace.generators || {};
//   const reactGenerators = workspace.generators['@longstupay/vue-nx-boot'] || {};
//   const generators = {
//     ...workspace.generators,
//     '@longstupay/vue-nx-boot': {
//       ...reactGenerators,
//       application: {
//         ...reactGenerators.application,
//       },
//     },
//   };

//   updateNxJson(host, { ...workspace, generators });
// }

function updateDependencies(host: Tree) {
  // 国内使用，npm配置不对很可能造成安装超时,原因可能是删除依赖后，registry地址配置原因
  // removeDependenciesFromPackageJson(host, ['vue'], ['vite']);

  const dependencies = {
    vue: vueVersion,
  };

  return addDependenciesToPackageJson(host, dependencies, {
    // '@longstupay/vue-nx-boot': nxVersion,
    '@types/node': typesNodeVersion,
  });
}

/**
 * install vve dependencies and initial js lib task
 * @param host 
 * @param schema 
 * @returns 
 */
export async function vueInitGenerator(
  host: Tree,
  schema: InitGeneratorSchema
) {
  const tasks: GeneratorCallback[] = [];

  // setDefault(host);

  const jsInitTask = await jsInitGenerator(host, {
    ...schema,
    skipFormat: true,
  });
  tasks.push(jsInitTask);

  // 统一在init生成器中配置测试框架，而不是viteinit 或 webpackinit配置测试框架
  if (!schema.e2eTestRunner || schema.e2eTestRunner === 'cypress') {
    ensurePackage('@nrwl/cypress', nxVersion);
    const { cypressInitGenerator } = await import(
      '@nrwl/cypress/src/generators/init/init'
    );
    const cypressTask = await cypressInitGenerator(host, {});
    tasks.push(cypressTask);
  }

  if (!schema.skipPackageJson) {
    const installTask = updateDependencies(host);
    tasks.push(installTask);
  }

  return runTasksInSerial(...tasks);
}

export default vueInitGenerator;

export const vueInitSchematic = convertNxGenerator(vueInitGenerator);
