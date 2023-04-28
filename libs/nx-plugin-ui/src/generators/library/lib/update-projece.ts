import {
  Tree,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit';
import { NormalizedSchema } from '../schema';

export default function updateProject(tree: Tree, options: NormalizedSchema) {
  const project = readProjectConfiguration(tree, options.name);

  project.targets = project.targets || {};
  project.targets.build = {
    ...project.targets.build,
    options: {
      ...project.targets.build.options,
      rollupConfig: `${options.projectRoot}/custom-rollup.config.js`,
    },
  };

  updateProjectConfiguration(tree, options.name, project);
}
