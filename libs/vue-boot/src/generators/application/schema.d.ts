import type { SupportedStyles } from '../../../typings/style';
import type { Linter } from '@nrwl/linter';

export interface ApplicationGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  style?: SupportedStyles | 'none';
  linter?: Linter;
  skipFormat?: boolean;
  e2eTestRunner?: 'cypress' | 'none';
  strict?: boolean;
  setParserOptionsProject?: boolean;
  standaloneConfig?: boolean;
  jsx?: boolean;
  unitTestRunner?: 'jest' | 'vitest' | 'none';
  type?: 'ts' | 'js';
  skipPackageJson?: boolean;
  bundler?: 'vite';
}

export interface NormalizedSchema extends ApplicationGeneratorSchema {
  projectName: string;
  appProjectRoot: string;
  appProjectDirectory: string;
  parsedTags: string[];
  e2eProjectName?: string;
  unitTestRunner?: 'jest' | 'vitest' | 'none';
  hasStyles?: boolean;
}
