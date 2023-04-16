import { readNxJson, Tree, updateNxJson } from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';

/**
 * update nx.json
 * @param host
 * @param options
 */
export function setDefaults(host: Tree, options: NormalizedSchema) {
  const nxJson = readNxJson(host);

  nxJson.generators = nxJson.generators || {};
  nxJson.generators['@longstupay/vue-nx-boot'] =
    nxJson.generators['@longstupay/vue-nx-boot'] || {};

  const prev = { ...nxJson.generators['@longstupay/vue-nx-boot'] };

  const libDefaults = {
    ...prev.library,
    unitTestRunner: prev.library?.unitTestRunner ?? options.unitTestRunner,
  };

  nxJson.generators = {
    ...nxJson.generators,
    '@longstupay/vue-nx-boot': {
      ...prev,
      library: libDefaults,
    },
  };

  updateNxJson(host, nxJson);
}
