<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  label?: string;
  apparence?: "normal" | "info";
}>();

const classes = computed(() => [
  props.apparence ? props.apparence : "normal",
]);
</script>
<template>
  <button class="button" :class="classes">
    <span class="button__text">{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  border-radius: 12px;
  padding: 17px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  &__text {
    font-size: 14px;
    font-weight: 500;
  }
}

.info {
  background: #1e76a6;
  color: white;
  &:hover {
    background: darken(#1e76a6, 3%);
  }
}

.normal {
  background: #05b57b;
  color: white;
  &:hover {
    background: darken(#05b57b, 3%);
  }
}
</style>
