import * as inquirer from 'inquirer';
import { preSetName } from './list-preset-config';

export interface preSetDefinition {
  readonly preSet: string;
  readonly packageNames?: string;
  readonly version?: string;
}

export async function createPrompt(
  preSetupConfig: readonly preSetDefinition[]
): Promise<{ preSetupConfig: preSetName[] }> {
  return inquirer.prompt({
    // The name to use when storing the answer in the answers hash. If the name contains periods, it will define a path in the answers hash.
    name: 'preSetupConfig',
    type: 'checkbox',
    message: 'Which startup pre-configuration ?',
    choices: preSetupConfig.map(({ preSet }) => ({
      name: preSet,
      checked: true,
    })),
  });
}

export async function createSelectBackend(
  backendList: readonly string[]
): Promise<{ backend: string }> {
  return inquirer.prompt({
    name: 'backend',
    type: 'list',
    message: 'Which backend ?',
    choices: backendList.map((backend) => ({
      name: backend,
    })),
  });
} 
