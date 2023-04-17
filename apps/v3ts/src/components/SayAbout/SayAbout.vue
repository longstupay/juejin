<script setup lang="ts">
export interface SayAboutProps {
  msg: string;
}
defineProps<SayAboutProps>();
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="text-red-500">
    <p>
      Edit
      <code>components/SayAbout.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped></style>
