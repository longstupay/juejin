
import TestVue from '../components/TestVue/TestVue.vue';

<template>
  <div class="about">
    <h1>This is an about page </h1>
    <br/>
    <SayAbout msg="hello about77" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import SayAbout from '../components/SayAbout/SayAbout.vue';
</script>
