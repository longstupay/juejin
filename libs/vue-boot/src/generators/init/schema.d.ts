export interface InitGeneratorSchema {
  unitTestRunner?: 'jest' | 'vitest' | 'none';
  e2eTestRunner?: 'cypress' | 'none';
  skipFormat?: boolean;
  skipPackageJson?: boolean;
  skipBabelConfig?: boolean;
  js?: boolean;
}
