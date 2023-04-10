export interface ViteconfigurationGeneratorSchema {
  uiFramework: 'vue' | 'none';
  project: string;
  newProject?: boolean;
  includeVitest?: boolean;
  inSourceTests?: boolean;
  includeLib?: boolean;
  buildTarget?: string;
  serveTarget?: string;
  testTarget?: string;
  skipFormat?: boolean;
}
