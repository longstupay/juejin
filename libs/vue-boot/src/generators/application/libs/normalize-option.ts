import { getWorkspaceLayout, names } from '@nrwl/devkit';

import type { Tree } from '@nrwl/devkit';
import type { ApplicationGeneratorSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: ApplicationGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const appProjectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = appProjectDirectory.replace(new RegExp('/', 'g'), '-');
  const appProjectRoot = `${
    getWorkspaceLayout(tree).appsDir
  }/${appProjectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    appProjectRoot,
    appProjectDirectory,
    parsedTags,
  };
}

export default normalizeOptions;
