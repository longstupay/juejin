import { NormalizedSchema } from '../schema';
import {
  addProjectConfiguration,
  joinPathFragments,
  ProjectConfiguration,
} from '@nrwl/devkit';

import type { Tree } from '@nrwl/devkit';

export function addProject(host: Tree, options: NormalizedSchema) {
  const targets: Record<string, any> = {};

  targets.build = {
    executor: '@nrwl/vite:build',
    outputs: ['{options.outputPath}'],
    defaultConfiguration: 'production',
    options: {
      root: options.appProjectRoot,
      outputPath: joinPathFragments('dist', options.appProjectRoot),
    },
    configurations: {
      development: {
        outputPath: options.appProjectRoot,
      },
      production: {},
    },
  };

  targets.serve = {
    executor: '@nrwl/vite:dev-server',
    defaultConfiguration: 'development',
    options: {
      buildTarget: `${options.projectName}:build`,
      dev: true,
    },
    configurations: {
      development: {
        buildTarget: `${options.projectName}:build:development`,
        dev: true,
      },
      production: {
        buildTarget: `${options.projectName}:build:production`,
        dev: false,
      },
    },
  };

  targets.preview = {
    executor: '@nrwl/vite:preview-server',
    defaultConfiguration: 'development',
    options: {
      buildTarget: `${options.projectName}:build`,
    },
    configurations: {},
  };

  const project: ProjectConfiguration = {
    root: options.appProjectRoot,
    sourceRoot: `${options.appProjectRoot}/src`,
    projectType: 'application',
    targets,
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
