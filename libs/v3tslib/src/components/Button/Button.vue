<template>
  <button
    v-bind="$attrs"
    class="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
};
</script>
