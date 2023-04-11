import type { ExecutorContext } from '@nrwl/devkit';
import { BuildExecutorSchema } from './schema';
import { viteBuildExecutor } from '@nrwl/vite/executors';
export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Build', options);
  viteBuildExecutor(options, context);
  return {
    success: true,
  };
}
