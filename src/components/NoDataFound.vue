<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <p class="text-center text-black">No {{ title }} data available.</p>
  </div>
</template>

<style lang="scss" scoped></style>
