import {
  addProjectConfiguration,
  convertNxGenerator,
  formatFiles,
  GeneratorCallback,
  joinPathFragments,
  runTasksInSerial,
  Tree,
  updateJson,
} from '@nrwl/devkit';

import { updateRootTsConfig } from '@nrwl/js';

import initGenerator from '../init/generator';
import { Schema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { addRollupBuildTarget } from './lib/add-rollup-build-target';
// import { addLinting } from './lib/add-linting';
// import { updateAppRoutes } from './lib/update-app-routes';
import { createFiles } from './lib/create-files';
import { extractTsConfigBase } from '../../utils/create-ts-config';
import { installCommonDependencies } from './lib/install-common-dependencies';
import viteInitGenerator from '../viteinit/generator';
import setupTailwindGenerator from '../setup-tailwind/generator';
// import { setDefaults } from './lib/set-defaults';

export async function libraryGenerator(host: Tree, schema: Schema) {
  const tasks: GeneratorCallback[] = [];

  const options = normalizeOptions(host, schema);
  if (options.publishable === true && !schema.importPath) {
    throw new Error(
      `For publishable libs you have to provide a proper "--importPath" which needs to be a valid npm package name (e.g. my-awesome-lib or @myorg/my-lib)`
    );
  }
  if (!options.component) {
    options.style = 'none';
  }

  // Currently vite configuration for dummies, only install related dependencies, no configuration babel test etc.,
  // later webpack needs to be expanded
  const initTask = await initGenerator(host, {
    ...options,
    e2eTestRunner: 'none',
    skipFormat: true,
  });
  tasks.push(initTask);

  addProjectConfiguration(host, options.name, {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType: 'library',
    tags: options.parsedTags,
    targets: {},
  });

  // const lintTask = await addLinting(host, options);
  // tasks.push(lintTask);

  createFiles(host, options);

  // Set up build target
  if (options.buildable && options.bundler === 'vite') {
    const viteTask = await viteInitGenerator(host, {
      uiFramework: 'vue',
    });
    tasks.push(viteTask);
  } else if (options.buildable && options.bundler === 'rollup') {
    const rollupTask = await addRollupBuildTarget(host, options);
    tasks.push(rollupTask);
  }

  if (options.component) {
    const componentTask = await setupTailwindGenerator(host, {
      ...options,
      project: options.name,
    });
    tasks.push(componentTask);
  }

  if (options.publishable || options.buildable) {
    updateJson(host, `${options.projectRoot}/package.json`, (json) => {
      json.name = options.importPath;
      return json;
    });
  }

  if (!options.skipPackageJson) {
    const installReactTask = await installCommonDependencies(host, options);
    tasks.push(installReactTask);
  }

  // const routeTask = updateAppRoutes(host, options);
  // tasks.push(routeTask);
  // setDefaults(host, options);

  extractTsConfigBase(host);
  if (!options.skipTsConfig) {
    updateRootTsConfig(host, options);
  }

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(...tasks);
}

export default libraryGenerator;
export const librarySchematic = convertNxGenerator(libraryGenerator);
