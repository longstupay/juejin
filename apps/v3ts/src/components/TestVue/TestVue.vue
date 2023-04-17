<script setup lang="ts">
export interface Props {
  msg: string;
}
defineProps<Props>();
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="text-red-500">
    <p>
      Edit
      <code>components/.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped></style>
