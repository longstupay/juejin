import type { preSetDefinition } from './prompt';

const preConfig = [
  {
    preSet: 'Pinia',
    packageNames: 'pinia',
    version: '^2.0.34',
    enableDefault: true,
    value: 'pinia',
  },
  {
    preSet: 'Tailwind',
    packageNames: 'tailwindcss',
    version: '^2.2.19',
    enableDefault: true,
    value: 'tailwind',
  },
  {
    preSet: 'Storybook',
    enableDefault: true,
    value: 'storybook',
  },
  {
    preSet: 'VueRouter',
    enableDefault: true,
    value: 'vueRouter',
  },
  {
    preSet: 'Cypress',
    enableDefault: true,
    value: 'cypress',
  },
  {
    preSet: 'EsLint',
    enableDefault: true,
    value: 'esLint',
  },
  {
    preSet: 'semver + changelog generation',
    enableDefault: false,
    value: 'semver',
  },
  {
    preSet: 'MotionOne',
  },
] as const;

export type preSetName = (typeof preConfig)[number]['preSet'];

export function listPresetConfig(): readonly preSetDefinition[] {
  const preSetupConfig = preConfig;

  return preSetupConfig;
}

export default listPresetConfig;
