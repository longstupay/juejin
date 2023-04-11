export interface BuildExecutorSchema {
  outputPath: string;
  emptyOutDir?: boolean;
  base?: string;
  configFile?: string;
  fileReplacements?: [];
  force?: boolean;
  sourcemap?: boolean | 'inline' | 'hidden';
  minify?: boolean | 'esbuild' | 'terser';
  manifest?: boolean | string;
  ssrManifest?: boolean | string;
  logLevel?: 'info' | 'warn' | 'error' | 'silent';
  mode?: string;
  ssr?: boolean | string;
  watch?: object | boolean;
}
