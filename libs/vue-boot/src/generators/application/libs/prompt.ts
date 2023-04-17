import * as inquirer from 'inquirer';
import { preSetName } from './list-preset-config';

export interface preSetDefinition {
  readonly preSet: string;
  readonly packageNames?: string;
  readonly version?: string;
}

export async function createPrompt(
  hasBack: boolean,
  backendList: readonly string[],
  preSetupConfig: readonly preSetDefinition[]
): Promise<{ preSetupConfig: preSetName[] }> {
  const questions = [];
  
  // 添加backend选项
  if (hasBack) {
    questions.push({
      name: 'backend',
      type: 'list',
      message: 'Which backend ?',
      choices: backendList.map((backend) => ({
        name: backend,
      })),
    });
  }

  // 添加preSetupConfig选项
  questions.push({
    name: 'preSetupConfig',
    type: 'checkbox',
    message: 'Which startup pre-configuration ?',
    choices: preSetupConfig.map(({ preSet }) => ({
      name: preSet,
      checked: true,
    })),
  });
  return inquirer.prompt(questions);
}

// export async function createSelectBackend(
//   backendList: readonly string[]
// ): Promise<{ backend: string }> {
//   return inquirer.prompt({
//     name: 'backend',
//     type: 'list',
//     message: 'Which backend ?',
//     choices: backendList.map((backend) => ({
//       name: backend,
//     })),
//   });
// } 
