import type { ExecutorContext } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';
import { viteBuildExecutor } from '@nx/vite/executors';
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
