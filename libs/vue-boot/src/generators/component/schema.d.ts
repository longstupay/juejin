import { SupportedStyles } from '../../../typings/style';

export interface Schema {
  name: string;
  project: string;
  style: SupportedStyles;
  skipTests?: boolean;
  directory?: string;
  export?: boolean;
  pascalCaseFiles?: boolean;
  pascalCaseDirectory?: boolean;
  routing?: boolean;
  js?: boolean;
  flat?: boolean;
  fileName?: string;
}

export interface NormalizedSchema extends Schema {
  projectSourceRoot: string;
  fileName: string;
  className: string;
  hasStyles: boolean;
}
