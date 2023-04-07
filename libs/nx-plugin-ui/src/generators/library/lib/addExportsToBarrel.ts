import {
  ChangeType,
  Tree,
  applyChangesToString,
  getProjects,
  joinPathFragments,
} from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';

import { ensureTypescript } from '@nrwl/js/src/utils/typescript/ensure-typescript';

let tsModule: typeof import('typescript');

export default function addExportsToBarrel(
  host: Tree,
  options: NormalizedSchema
) {
  if (!tsModule) {
    tsModule = ensureTypescript();
  }

  const project = getProjects(host).get(options.name);
  const {
    sourceRoot: projectSourceRoot,
    projectType,
    root: projectRoot,
  } = project;

  //   const workspace = getProjects(host);
  //   const isApp = workspace.get(options.name).projectType === 'application';
  const isApp = projectType === 'application';
  const indexFilePath = joinPathFragments(projectSourceRoot, 'index.ts');
  const indexSource = host.read(indexFilePath, 'utf-8');
  if (!isApp) {
    const cssFilePath = joinPathFragments(projectSourceRoot, 'styles.css');
    const cssSource = host.read(cssFilePath, 'utf-8');

    if (indexSource !== null && cssSource !== null) {
      const changes = applyChangesToString(indexSource, [
        {
          type: ChangeType.Insert,
          index: 0,
          text: `import './styles.css';\n`,
        },
      ]);
      host.write(indexFilePath, changes);
    }

    // 更新 ./storybook/previews.ts 或者 ./.storybook/preview.js
    const storybookConfigPath = joinPathFragments(
      projectRoot,
      options.storyTsConfiguration
        ? '.storybook/preview.ts'
        : '.storybook/preview.js'
    );
    const storybookConfigSource = host.read(storybookConfigPath, 'utf-8');
    if (storybookConfigSource !== null && cssSource !== null) {
      const changes = applyChangesToString(storybookConfigSource, [
        {
          type: ChangeType.Insert,
          index: 0,
          text: `import '../src/styles.css';\n`,
        },
      ]);
      host.write(storybookConfigPath, changes);
    }
  }
}
