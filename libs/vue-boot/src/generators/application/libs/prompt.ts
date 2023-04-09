import * as inquirer from 'inquirer';

export interface preSetDefinition {
  preSet: string;
  packageNames?: string;
  version?: string;
}

export function createPrompt(
  preSetupConfig: preSetDefinition[]
): Promise<{ preSetupConfig: string[] }> {
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
