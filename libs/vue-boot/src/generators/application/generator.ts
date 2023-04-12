import {
  addProjectConfiguration,
  ensurePackage,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  offsetFromRoot,
  runTasksInSerial,
} from '@nrwl/devkit';

import type { Tree, GeneratorCallback } from '@nrwl/devkit';

import * as path from 'path';
import type { ApplicationGeneratorSchema, NormalizedSchema } from './schema';

import { createPrompt, createSelectBackend } from './libs/prompt';

import normalizeOptions from './libs/normalize-option';
import { listPresetConfig } from './libs/list-preset-config';
import vueInitGenerator from '../init/generator';
import { createApplicationFiles } from './libs/create-application-files';
import { addProject } from './libs/add-project';
import { viteVersion } from '../../utils/versions';
import viteConfigurationGenerator from '../viteconfiguration/generator';
import { addTypescript } from './libs/add-typescript';
import { installCommonDependencies } from './libs/install-common-dependencies';
import { presetFile } from './libs/preset-file';

export default async function (
  tree: Tree,
  options: ApplicationGeneratorSchema
): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = [];
  const normalizedOptions = normalizeOptions(tree, options);

  // init task, etc. add @longstupay/vue-nx-boot,add generator fild on nx.json
  const vueInitTask = await vueInitGenerator(tree, {
    ...normalizedOptions,
    skipPackageJson: false,
  });
  tasks.push(vueInitTask);

  createApplicationFiles(tree, normalizedOptions);
  addProject(tree, normalizedOptions);

  // vite start

  if (options.bundler === 'vite') {
    // We recommend users use `import.meta.env.MODE` and other variables in their code to differentiate between production and development.
    // See: https://vitejs.dev/guide/env-and-mode.html
    if (
      tree.exists(
        joinPathFragments(normalizedOptions.appProjectRoot, 'src/environments')
      )
    ) {
      tree.delete(
        joinPathFragments(normalizedOptions.appProjectRoot, 'src/environments')
      );
    }

    const stylePreprocessorTask = installCommonDependencies(
      tree,
      normalizedOptions
    );
    tasks.push(stylePreprocessorTask);

    const viteTask = await viteConfigurationGenerator(tree, {
      uiFramework: 'vue',
      project: normalizedOptions.projectName,
      newProject: true,
      // includeVitest: options.unitTestRunner === 'vitest',
    });
    tasks.push(viteTask);

    if (options.type === 'ts') {
      const viteTsTask = addTypescript(tree);
      tasks.push(viteTsTask);
    }
  }

  // if (options.bundler !== 'vite' && options.unitTestRunner === 'vitest') {
  //   const { vitestGenerator } = ensurePackage('@nrwl/vite', viteVersion);

  //   const vitestTask = await vitestGenerator(tree, {
  //     uiFramework: 'vue',
  //     coverageProvider: 'c8',
  //     project: normalizedOptions.projectName,
  //   });
  //   tasks.push(vitestTask);
  // }

  // vite end

  const preSet = listPresetConfig();

  const backList = ['node', 'nest', 'express', 'midway'];

  if (options.backend) {
    await createSelectBackend(backList);
  }

  const { preSetupConfig } = await createPrompt(preSet);
  // console.log(preSetupConfig);
  presetFile(tree, {
    ...normalizedOptions,
    router: true,
    tailwind: true,
    pinia: true,
  });
  if (options.type === 'js') {
    tree.delete(`${normalizedOptions.appProjectRoot}/tsconfig.json`);
    tree.delete(`${normalizedOptions.appProjectRoot}/tsconfig.app.json`);
  }
  await formatFiles(tree);

  return runTasksInSerial(...tasks);
}
