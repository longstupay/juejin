import {
  Tree,
  applyChangesToString,
  getProjects,
  joinPathFragments,
} from '@nx/devkit';
import { NormalizedSchema } from '../schema';
import { ensureTypescript } from '@nx/js/src/utils/typescript/ensure-typescript';
import { addImport } from '../../../utils/ast-utils';

let tsModule: typeof import('typescript');

export function addExportsToBarrel(host: Tree, options: NormalizedSchema) {
  if (!tsModule) {
    tsModule = ensureTypescript();
  }
  const workspace = getProjects(host);
  const isApp = workspace.get(options.project).projectType === 'application';

  if (options.export && !isApp) {
    const indexFilePath = joinPathFragments(
      options.projectSourceRoot,
      options.js ? 'index.js' : 'index.ts'
    );
    const indexSource = host.read(indexFilePath, 'utf-8');
    if (indexSource !== null) {
      const indexSourceFile = tsModule.createSourceFile(
        indexFilePath,
        indexSource,
        tsModule.ScriptTarget.Latest,
        true
      );
      const changes = applyChangesToString(
        indexSource,
        addImport(
          indexSourceFile,
          `export * from './${options.directory}/${options.fileName}';`
        )
      );
      host.write(indexFilePath, changes);
    }
  }
}
