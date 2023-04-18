<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30"
  >
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-4">{{ content }}</p>
      <div class="flex justify-end">
        <Button type="primary" @click="onConfirm">{{ confirmText }}</Button>
        <Button class="primary" @click="onCancel">{{ cancelText }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../button/button.vue';

export default {
  name: 'Alert',
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      default: '提示',
    },
    content: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
  },
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
