import { Tree } from 'nx/src/generators/tree';
import {
  addDependenciesToPackageJson,
  ensurePackage,
  getWorkspaceLayout,
  joinPathFragments,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { maybeJs } from './maybe-js';
import { NormalizedSchema } from '../schema';
import {
  nxVersion,
  rollupPluginUrlVersion,
  svgrRollupVersion,
} from '../../../utils/versions';

export async function addRollupBuildTarget(
  host: Tree,
  options: NormalizedSchema
) {
  const { rollupInitGenerator } = ensurePackage('@nrwl/rollup', nxVersion);

  // These are used in `@nrwl/react/plugins/bundle-rollup`
  addDependenciesToPackageJson(
    host,
    {},
    {
      '@rollup/plugin-url': rollupPluginUrlVersion,
      '@svgr/rollup': svgrRollupVersion,
    }
  );

  const { targets } = readProjectConfiguration(host, options.name);

  const { libsDir } = getWorkspaceLayout(host);
  const external: string[] = [];

  // 使用jsx/tsx时可能需要添加外置依赖
  external.push('vue');

  targets.build = {
    executor: '@nrwl/rollup:rollup',
    outputs: ['{options.outputPath}'],
    options: {
      outputPath:
        libsDir !== '.'
          ? `dist/${libsDir}/${options.projectDirectory}`
          : `dist/${options.projectDirectory}`,
      tsConfig: `${options.projectRoot}/tsconfig.lib.json`,
      project: `${options.projectRoot}/package.json`,
      entryFile: maybeJs(options, `${options.projectRoot}/src/index.ts`),
      external,
      // 这里可能需要预设值rollup
      rollupConfig: `@longstupay/vue-nx-boot/plugins/bundle-rollup`,
      compiler: options.compiler ?? 'babel',
      assets: [
        {
          glob: `${options.projectRoot}/README.md`,
          input: '.',
          output: '.',
        },
      ],
    },
  };

  updateProjectConfiguration(host, options.name, {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType: 'library',
    tags: options.parsedTags,
    targets,
  });

  return rollupInitGenerator(host, options);
}
