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
import {
  nxVersion,
  typesNodeVersion,
  viteVersion,
  vueVersion,
} from '../../utils/versions';

import { InitGeneratorSchema } from './schema';

function setDefault(host: Tree) {
  const workspace = readNxJson(host);

  workspace.generators = workspace.generators || {};
  const reactGenerators = workspace.generators['@longstupay/vue-nx-boot'] || {};
  const generators = {
    ...workspace.generators,
    '@longstupay/vue-nx-boot': {
      ...reactGenerators,
      application: {
        ...reactGenerators.application,
      },
    },
  };

  updateNxJson(host, { ...workspace, generators });
}

function updateDependencies(host: Tree) {
  removeDependenciesFromPackageJson(host, ['vue'], ['vite']);

  const dependencies = {
    vue: vueVersion,
  };

  return addDependenciesToPackageJson(host, dependencies, {
    // '@longstupay/vue-nx-boot': nxVersion,
    '@types/node': typesNodeVersion,
  });
}

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
