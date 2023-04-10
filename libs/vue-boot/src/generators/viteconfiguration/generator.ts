import {
  convertNxGenerator,
  formatFiles,
  GeneratorCallback,
  runTasksInSerial,
  Tree,
} from '@nrwl/devkit';

import viteInitGenerator from '../viteinit/generator';
// import vitestGenerator from '../vitest/vitest-generator';
import type { ViteconfigurationGeneratorSchema } from './schema';

/**
 * The most initial version has no webpack configuration, just to initialize the vite projece
 * Later, when the bundler in a vue project is webpack, it needs to be extended,
 * such as modifying the project configuration when change bundler `webpack` to `vite`, etc.
 * @param tree
 * @param schema
 * @returns
 */
export async function viteConfigurationGenerator(
  tree: Tree,
  schema: ViteconfigurationGeneratorSchema
) {
  const tasks: GeneratorCallback[] = [];

  const initTask = await viteInitGenerator(tree, {
    uiFramework: schema.uiFramework,
  });
  tasks.push(initTask);

  // if (schema.includeVitest) {
  //   const vitestTask = await vitestGenerator(tree, {
  //     project: schema.project,
  //     uiFramework: schema.uiFramework,
  //     inSourceTests: schema.inSourceTests,
  //     coverageProvider: 'c8',
  //     skipViteConfig: true,
  //     testTarget: testTargetName,
  //     skipFormat: true,
  //   });
  //   tasks.push(vitestTask);
  // }

  if (!schema.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default viteConfigurationGenerator;
export const configurationSchematic = convertNxGenerator(
  viteConfigurationGenerator
);
