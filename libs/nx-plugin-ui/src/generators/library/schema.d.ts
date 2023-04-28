import type { Linter } from '@nx/linter';

export interface Schema {
  appProject?: string;
  buildable?: boolean;
  compiler?: 'babel' | 'swc';
  storyTsConfiguration?: boolean;
  component?: boolean;
  directory?: string;
  globalCss?: boolean;
  importPath?: string;
  inSourceTests?: boolean;
  js?: boolean;
  linter: Linter;
  name: string;
  pascalCaseFiles?: boolean;
  routing?: boolean;
  setParserOptionsProject?: boolean;
  skipFormat?: boolean;
  skipPackageJson?: boolean;
  skipTsConfig?: boolean;
  standaloneConfig?: boolean;
  strict?: boolean;
  style: SupportedStyles;
  tags?: string;
  minimal?: boolean;
}

export interface NormalizedSchema extends Schema {
  js: boolean;
  name: string;
  fileName: string;
  projectRoot: string;
  routePath: string;
  projectDirectory: string;
  parsedTags: string[];
  appMain?: string;
  appSourceRoot?: string;
  libsDir?: string;
}
