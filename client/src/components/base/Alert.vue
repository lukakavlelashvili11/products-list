<script lang="ts" setup>
import { ALERT_TEXTS } from "@/stores/staticTexts";
import { type AlertType } from "@/types/alert";
import emitter from "@/utils/emitter";
import { ref, watch } from "vue";

const alertTexts = ALERT_TEXTS;
const alertText = ref<AlertType | null>(null);
const apparence = ref("");

emitter.on("alert", (data) => {
  alertText.value = data.text;
  apparence.value = data.apparence;
});

watch(
  () => alertText.value,
  (val) => {
    if (val)
      setTimeout(() => {
        alertText.value = null;
      }, 3000);
  }
);
</script>

<template>
  <div
    class="alert"
    :class="apparence === 'success' ? 'success' : 'danger'"
    v-if="alertText"
  >
    {{ alertTexts[alertText] }}
  </div>
</template>

<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 0px 10px;
  height: 50px;
  color: white;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
}

.success {
  background: #05b57b;
}

.danger {
  background: rgb(241, 62, 62);
}
</style>
