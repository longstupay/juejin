import {
  convertNxGenerator,
  formatFiles,
  GeneratorCallback,
  runTasksInSerial,
  Tree,
} from '@nrwl/devkit';


import { Schema } from './schema';
import { createComponentFiles } from './lib/create-componentFiles';
import { addExportsToBarrel } from './lib/add-exports-to-barrel';
import { normalizeOptions } from './lib/normalize-options';

export async function componentGenerator(host: Tree, schema: Schema) {
  const options = await normalizeOptions(host, schema);
  createComponentFiles(host, options);

  const tasks: GeneratorCallback[] = [];

  addExportsToBarrel(host, options);

  await formatFiles(host);

  return runTasksInSerial(...tasks);
}



export default componentGenerator;

export const componentSchematic = convertNxGenerator(componentGenerator);
