import type { Tree } from '@nx/devkit';
import { generateFiles, joinPathFragments } from '@nx/devkit';
import type { NormalizedSchema } from '../schema';

export function createFiles(tree: Tree, options: NormalizedSchema): void {
  const templateOptions = {
    template: '',
  };
  generateFiles(
    tree,
    joinPathFragments(__dirname, '..', 'files/css/'),
    joinPathFragments(options.projectRoot, 'src'),
    templateOptions
  );
}
