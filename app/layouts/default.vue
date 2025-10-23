<template>
  <UContainer>
    <slot />
  </Ucontainer>
</template>

<script setup lang="ts">
useState('accordionState', () => [])
</script>

<style scoped>

</style>
