import { NormalizedSchema } from '../schema';
import { addProjectConfiguration, ProjectConfiguration } from '@nrwl/devkit';

export function addProject(host, options: NormalizedSchema) {
  const project: ProjectConfiguration = {
    root: options.appProjectRoot,
    sourceRoot: `${options.appProjectRoot}/src`,
    projectType: 'application',
    targets: {},
    tags: options.parsedTags,
  };

  addProjectConfiguration(host, options.projectName, {
    ...project,
  });
}

// function maybeJs(options: NormalizedSchema, path: string): string {
//   return options.type === 'js' &&
//     (path.endsWith('.ts') || path.endsWith('.tsx'))
//     ? path.replace(/\.tsx?$/, '.js')
//     : path;
// }
