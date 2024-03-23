<script lang="ts" setup>
import QuantitySelector from "@/components/base/QuantitySelector.vue";
import type { ProductType } from "@/types/product";
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{
  data: ProductType;
  qty: number;
}>();

const qty = ref(props.qty || 1);
const cartStore = useCartStore();

const updateQty = (quantity: number) => {
  qty.value = quantity;
};

watch(
  () => qty.value,
  debounce(() => {
    cartStore.updateCart({
      qty: qty.value,
      productId: props.data._id,
    });
  }, 500)
);
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__info">
      <div class="cart-item__image">
        <img :src="data.image" />
      </div>
      <div class="cart-item__details">
        <span class="cart-item__title">{{ data.title }}</span>
        <span class="cart-item__price">{{ data.price }} ₾</span>
      </div>
    </div>
    <div class="cart-item__actions">
      <QuantitySelector :qty="qty" @change="updateQty" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  width: 100%;
  box-shadow: 0px 0px 3px rgb(204, 204, 204);
  // border: 1px solid gray;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  &__image {
    width: 60px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 7px;
    }
  }
  &__details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
  }
  &__title {
    font-family: medium;
  }
  &__info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
  }
  &__actions {
  }
}
</style>
