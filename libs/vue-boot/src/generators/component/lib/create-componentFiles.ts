import { Tree, joinPathFragments, toJS, generateFiles } from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';
// import { getComponentTests } from './get-component-tests';

export function createComponentFiles(host: Tree, options: NormalizedSchema) {

  const componentDir = joinPathFragments(
    options.projectSourceRoot,
    options.directory
  );

  // const componentTests = getComponentTests(options);

  generateFiles(host, joinPathFragments(__dirname, '../files/src/'), componentDir, {
    ...options,
    // componentTests,
    tpl: '',
    style: options.style,
    isTypeScript: options.js ? false : true,
  });

  for (const c of host.listChanges()) {
    let deleteFile = false;
    //del test file
    if (options.skipTests && /.*spec.tsx/.test(c.path)) {
      deleteFile = true;
    }
    //del style file
    if (!options.hasStyles && c.path.endsWith(`.${options.style}`)) {
      deleteFile = true;
    }

    if (deleteFile) {
      host.delete(c.path);
    }
  }

  if (options.js) {
    toJS(host);
  }
}
