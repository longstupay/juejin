import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  runTasksInSerial,
} from '@nrwl/devkit';

import type { Tree, GeneratorCallback } from '@nrwl/devkit';

import * as path from 'path';
import type { ApplicationGeneratorSchema, NormalizedSchema } from './schema';

import { createPrompt } from './libs/prompt';

import normalizeOptions from './libs/normalize-option';
import { listPresetConfig } from './libs/list-preset-config';

export default async function (
  tree: Tree,
  options: ApplicationGeneratorSchema
): Promise<GeneratorCallback> {
  const task: GeneratorCallback[] = [];
  const normalizedOptions = normalizeOptions(tree, options);

  // init task

  const preSet = listPresetConfig();

  const preSetListFromPrompt = await createPrompt(preSet);
  console.log(preSetListFromPrompt);

  await formatFiles(tree);

  return runTasksInSerial(...task);
}
