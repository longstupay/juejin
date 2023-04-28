import type { Tree } from 'nx/src/generators/tree';
import {
  addDependenciesToPackageJson,
  getWorkspaceLayout,
  joinPathFragments,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit';

import { NormalizedSchema } from '../schema';
import {
  cssInjectedByjs,
  nxVersion,
  unpluginVueComponentsVersion,
} from '../../../utils/versions';

export function addViteBuildTarget(host: Tree, options: NormalizedSchema) {
  //判断是js还是ts,添加对应的依赖
  const { js } = options;
  const jsDevDenpendencies = {};
  const tsDevDenpendencies = {};
  const devDependencies = js ? jsDevDenpendencies : tsDevDenpendencies;

  jsDevDenpendencies['vite-plugin-css-injected-by-js'] = cssInjectedByjs;
  jsDevDenpendencies['unplugin-vue-components'] = unpluginVueComponentsVersion;

  addDependenciesToPackageJson(
    host,
    {},
    {
      ...devDependencies,
      '@nx/vite': nxVersion,
    }
  );

  const { targets } = readProjectConfiguration(host, options.name);

  const { libsDir } = getWorkspaceLayout(host);
  const external: string[] = [];

  // 使用jsx/tsx时可能需要添加外置依赖
  external.push('vue');

  targets.build = {
    executor: '@nx/vite:build',
    outputs: ['{options.outputPath}'],
    defaultConfiguration: 'production',
    options: {
      outputPath:
        libsDir !== '.'
          ? `dist/${libsDir}/${options.projectDirectory}`
          : `dist/${options.projectDirectory}`,
    },
    configurations: {
      development: {},
      production: {},
    },
  };

  updateProjectConfiguration(host, options.name, {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType: 'library',
    tags: options.parsedTags,
    targets,
  });
}
