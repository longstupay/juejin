import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import {
  addDependenciesToPackageJson,
  convertNxGenerator,
  formatFiles,
  generateFiles,
  joinPathFragments,
  logger,
  readProjectConfiguration,
  runTasksInSerial,
} from '@nrwl/devkit';

import {
  autoprefixerVersion,
  postcssVersion,
  tailwindcssVersion,
} from '../../utils/versions';
import type { SetupTailwindOptions } from './schema';

export async function setupTailwindGenerator(
  tree: Tree,
  options: SetupTailwindOptions
) {
  const tasks: GeneratorCallback[] = [];
  const project = readProjectConfiguration(tree, options.project);

  if (
    tree.exists(joinPathFragments(project.root, 'postcss.config.js')) ||
    tree.exists(joinPathFragments(project.root, 'tailwind.config.js'))
  ) {
    logger.info(
      `Skipping setup since there are existing PostCSS or Tailwind configuration files. For manual setup instructions, see https://nx.dev/guides/using-tailwind-css-in-react.`
    );
    return;
  }

  generateFiles(
    tree,
    joinPathFragments(__dirname, './files/conf'),
    project.root,
    {
      tmpl: '',
    }
  );

  if (options.component) {
    generateFiles(
      tree,
      joinPathFragments(__dirname, './files/src'),
      project.sourceRoot,
      {
        tmpl: '',
      }
    );
  }

  if (!options.skipPackageJson) {
    tasks.push(
      addDependenciesToPackageJson(
        tree,
        {},
        {
          autoprefixer: autoprefixerVersion,
          postcss: postcssVersion,
          tailwindcss: tailwindcssVersion,
        }
      )
    );
  }

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default setupTailwindGenerator;

export const setupTailwindSchematic = convertNxGenerator(
  setupTailwindGenerator
);
