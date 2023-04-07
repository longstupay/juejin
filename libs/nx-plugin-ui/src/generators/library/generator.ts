import {
  addDependenciesToPackageJson,
  extractLayoutDirectory,
  generateFiles,
  getProjects,
  getWorkspaceLayout,
  joinPathFragments,
  logger,
  names,
  normalizePath,
  offsetFromRoot,
  runTasksInSerial,
  Tree,
  workspaceRoot,
} from '@nrwl/devkit';

import type { GeneratorCallback } from '@nrwl/devkit';

import type { NormalizedSchema, Schema } from './schema';

import {
  libraryGenerator,
  componentGenerator,
  storybookConfigurationGenerator,
  setupTailwindGenerator,
} from '@nrwl/react';
import { createFiles } from './lib/createFile-import-css';
import addExportsToBarrel from './lib/addExportsToBarrel';
import updateProject from './lib/update-projece';

export function normalizeOptions(
  host: Tree,
  options: Schema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const { projectDirectory, layoutDirectory } = extractLayoutDirectory(
    options.directory
  );
  const fullProjectDirectory = projectDirectory
    ? `${names(projectDirectory).fileName}/${name}`
    : name;

  const projectName = fullProjectDirectory.replace(new RegExp('/', 'g'), '-');
  const fileName = projectName;
  const { libsDir: defaultLibsDir } = getWorkspaceLayout(host);
  const libsDir = layoutDirectory ?? defaultLibsDir;
  const projectRoot = joinPathFragments(libsDir, fullProjectDirectory);

  const normalized = {
    ...options,
    fileName,
    routePath: `/${name}`,
    name: projectName,
    projectRoot,
    projectDirectory: fullProjectDirectory,
    libsDir,
  } as NormalizedSchema;

  normalized.inSourceTests === normalized.minimal || normalized.inSourceTests;

  if (options.appProject) {
    const appProjectConfig = getProjects(host).get(options.appProject);

    if (appProjectConfig.projectType !== 'application') {
      throw new Error(
        `appProject expected type of "application" but got "${appProjectConfig.projectType}"`
      );
    }

    try {
      normalized.appMain = appProjectConfig.targets.build.options.main;
      normalized.appSourceRoot = normalizePath(appProjectConfig.sourceRoot);
    } catch (e) {
      throw new Error(
        `Could not locate project main for ${options.appProject}`
      );
    }
  }
  return normalized;
}

/**
 * 先生成一个React库，再默认生成一个React组件
 *
 * @export
 * @param {Tree} tree
 * @param {Schema} options
 * @return {*}  {Promise<GeneratorCallback>}
 */
export default async function (
  tree: Tree,
  options: Schema
): Promise<GeneratorCallback> {
  // 格式化参数
  const normOptions = normalizeOptions(tree, options);

  const initLibrary = await libraryGenerator(tree, {
    ...options,
    unitTestRunner: 'jest',
    bundler: 'rollup',
    publishable: true,
    buildable: true,
    component: false,
  });

  const genComponent = await componentGenerator(tree, {
    name: 'Test',
    project: options.name,
    style: 'none',
    //默认导出入口文件
    export: true,
  });

  // 以下改善官方插件set-storybook工作流

  // 首先照常根据官方插件为项目配置storybook
  const setStorybookForLib = await storybookConfigurationGenerator(tree, {
    name: options.name,
    configureCypress: false,
    // Automatically generate *.stories.ts files for components declared in this project
    generateStories: true,
    generateCypressSpecs: false,
    bundler: 'webpack',
    tsConfiguration: true,
  });

  // 在配置tailwindcss之前，先在项目src目录下创建一个styles.css文件
  createFiles(tree, normOptions);

  // 正常为lib配置tailwindcss
  const setTaikwindForLib = await setupTailwindGenerator(tree, {
    project: options.name,
    // The name of the target used to build the project. This option is not needed in most cases
    buildTarget: `${options.name}-build`,
  });

  // 为了改善官方插件set-storybook后工作流的问题
  // .storybook/preset.[js/ts]引入先前创建的styles.css文件
  // src的入口文件index.ts中引入styles.css文件

  // 更新文件
  addExportsToBarrel(tree, normOptions);

  // 新建 custom-rollup.config.js
  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files/rollup/'),
    joinPathFragments(normOptions.projectRoot),
    {
      template: '',
    }
  );

  // 更新project.json
  updateProject(tree, normOptions);


  const addPrettierTailwindPlugin = addDependenciesToPackageJson(
    tree,
    {},
    {
      'prettier-plugin-tailwindcss': '^0.2.7',
    }
  );

  // 删除原有的tailwindcss配置文件
  try {
    tree.exists(`${normOptions.projectRoot}/tailwind.config.js`) &&
      tree.delete(`${normOptions.projectRoot}/tailwind.config.js`);
  } catch (e) {
    throw new Error('删除原有的tailwindcss配置文件失败');
  }

  // 新建tailwind.config.js
  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files/taiwind/'),
    joinPathFragments(normOptions.projectRoot),
    {
      template: '',
      configRelativeUrl: offsetFromRoot(normOptions.projectRoot),
    }
  );

  // 检查工作区是否存在配置文件taiwind-worksapce-preset.config.js,否则创建
  if (
    !tree.exists(
      joinPathFragments(tree.root, 'taiwind-worksapce-preset.config.js')
    )
  ) {
    generateFiles(
      tree,
      joinPathFragments(__dirname, 'files/twpreset/'),
      joinPathFragments(workspaceRoot),
      {
        template: '',
      }
    );
    logger.warn("Don't forget to check the preset to your tailwind.config.js");
  }
  // const twConfigFile = tree.read(
  //   joinPathFragments(workspaceRoot, 'taiwind-worksapce-preset.config.js'),
  //   'utf-8'
  // );
  // console.log(twConfigFile);

  return runTasksInSerial(
    initLibrary,
    genComponent,
    setStorybookForLib,
    setTaikwindForLib,
    addPrettierTailwindPlugin
  );
}