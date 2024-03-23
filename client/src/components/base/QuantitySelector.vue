<script lang="ts" setup>
import { ref } from "vue";

const count = ref(1);

type ActionType = "inc" | "dec";

const changeCount = (action: ActionType) => {
  if (action === "dec" && count.value > 1) {
    count.value = --count.value;
  } else if (action === "inc") {
    count.value = ++count.value;
  }
};
</script>

<template>
  <div class="counter">
    <div class="counter__box counter__changer" @click="changeCount('dec')">
      <span>-</span>
    </div>
    <div class="counter__box">
      <span>{{ count }}</span>
    </div>
    <div
      class="counter__box counter__changer"
      role="button"
      @click="changeCount('inc')"
    >
      <span>+</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  width: 120px;
  border: 1px solid black;
  border-radius: 5px;
  background: #ffffff4f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  &__box {
    width: 30%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__changer {
    cursor: pointer;
  }
  *{
    user-select: none;
  }
}
</style>
