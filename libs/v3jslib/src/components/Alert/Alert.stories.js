import Alert from './Alert.vue';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Alert',
  component: Alert,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args">23333</Alert>',
  }),
  args: {
    primary: true,
    label: 'Alert',
  },
};
