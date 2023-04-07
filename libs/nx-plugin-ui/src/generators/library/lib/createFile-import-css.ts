import type { Tree } from '@nrwl/devkit';
import { generateFiles, joinPathFragments } from '@nrwl/devkit';
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
