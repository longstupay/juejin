import type { preSetDefinition } from './prompt';

export function listPresetConfig(): preSetDefinition[] {
  const preSetupConfig: preSetDefinition[] = [
    {
      preSet: 'Pinia',
      packageNames: 'pinia',
      version: '^2.0.34',
    },
    {
      preSet: 'Tailwind',
      packageNames: 'tailwindcss',
      version: '^2.2.19',
    },
    {
      preSet: 'Storybook',
    },
    {
      preSet: 'VueRouter',
    },
  ];

  return preSetupConfig;
}

export default listPresetConfig;
