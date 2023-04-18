import './import-tw.css';

import MyButton from './components/button/index';
import MyAlert from './components/alert/index';

const components = {
  MyButton,
  MyAlert,
};

const install = function (Vue, options) {
  if (install.installed) return;
  Object.keys(components).forEach((component) => {
    Vue.component(component, components[component]);
  });
};

export { default as MyButton } from './components/button/index';
export { default as MyAlert } from './components/alert/index';

export const MycpmUiVueResolver = () => {
  return [
    {
      type: 'component',
      resolve(name) {
        for (const [componentName, component] of Object.entries(components)) {
          if (name === componentName) {
            const resolvedComponent = {
              name: componentName,
              from: 'mycpm',
            };
            return resolvedComponent;
          }
        }
      },
    },
  ];
};

export default {
  install,
  ...components,
};
