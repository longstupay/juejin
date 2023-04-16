import {
  Tree,
  getProjects,
  joinPathFragments,
  logger,
  names,
} from '@nrwl/devkit';
import { NormalizedSchema, Schema } from '../schema';
import { assertValidStyle } from '../../../utils/assertion';

export async function normalizeOptions(
  host: Tree,
  options: Schema
): Promise<NormalizedSchema> {
  assertValidOptions(options);

  const { className, fileName } = names(options.name);
  const componentFileName =
    options.fileName ?? (options.pascalCaseFiles ? className : fileName);
  const project = getProjects(host).get(options.project);

  if (!project) {
    logger.error(
      `Cannot find the ${options.project} project. Please double check the project name.`
    );
    throw new Error();
  }

  const { sourceRoot: projectSourceRoot, projectType } = project;

  const directory = await getDirectory(host, options);

  if (options.export && projectType === 'application') {
    logger.warn(
      `The "--export" option should not be used with applications and will do nothing.`
    );
  }

  options.routing = options.routing ?? false;

  return {
    ...options,
    directory,
    hasStyles: options.style !== 'none',
    className,
    fileName: componentFileName,
    projectSourceRoot,
  };
}

async function getDirectory(host: Tree, options: Schema) {
  const genNames = names(options.name);
  const fileName =
    options.pascalCaseDirectory === true
      ? genNames.className
      : genNames.fileName;

  let baseDir: string;
  // If the user specified a directory, use that.
  if (options.directory) {
    baseDir = options.directory;
  } else {
    baseDir = 'components';
  }

  return options.flat ? baseDir : joinPathFragments(baseDir, fileName);
}

function assertValidOptions(options: Schema) {
  assertValidStyle(options.style);

  const slashes = ['/', '\\'];
  slashes.forEach((s) => {
    if (options.name.indexOf(s) !== -1) {
      const [name, ...rest] = options.name.split(s).reverse();
      let suggestion = rest.map((x) => x.toLowerCase()).join(s);
      if (options.directory) {
        suggestion = `${options.directory}${s}${suggestion}`;
      }
      throw new Error(
        `Found "${s}" in the component name. Did you mean to use the --directory option (e.g. \`nx g c ${name} --directory ${suggestion}\`)?`
      );
    }
  });
}
