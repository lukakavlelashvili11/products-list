<script lang="ts" setup>
import QuantitySelector from "@/components/base/QuantitySelector.vue";
import type { ProductType } from "@/types/product";
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import { useCartStore } from "@/stores/cart";
import emitter from "@/utils/emitter";

const props = defineProps<{
  data: ProductType;
  qty: number;
}>();

const qty = ref(props.qty || 1);
const cartStore = useCartStore();

const updateQty = (quantity: number) => {
  qty.value = quantity;
};

const deleteProduct = async () => {
  return cartStore.deleteProduct(props.data._id)
  .then(() => {
    emitter.emit('alert',{
      apparence: 'success',
      text: 'product_deleted'
    })
  });
};

const askForDelete = () => {
  const agree = confirm("დარწმუნებული ხართ რომ გსურთ წაშლა?");
  if(agree)
    deleteProduct();
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
      <img class="cart-item__delete" src="@/assets/img/trash.svg" @click="askForDelete"/>
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
  transition: background .3s;
  &:hover{
    background: darken(#fff,3%);
  }
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
  }
  &__delete{
    cursor: pointer;
  }
}
</style>
