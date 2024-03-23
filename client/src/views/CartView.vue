<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { computed, onMounted } from "vue";
import CartList from "@/components/CartList.vue";

const route = useRoute();
const cartStore = useCartStore();
const cartId = computed(() => cartStore.cartId);
const products = computed(() => cartStore.products);
const totalPrice = computed(() => {
  let totalPrice = 0;
  for (const item of products.value) {
    totalPrice += item.product.price * item.quantity;
  }
  return totalPrice;
});

onMounted(async () => {
  if (cartId.value) await cartStore.getCart(cartId.value);
});
</script>

<template>
  <template v-if="cartId">
    <div class="cart">
      <div class="cart__products">
        <CartList :products="products" />
      </div>
      <div class="cart__checkout">
        <span>Sum:</span>
        <ul class="cart__list">
          <li class="cart__list-item" v-for="data in products">
            <span>{{ data.product.title }} x {{ data.quantity }}</span>
            <span>{{ data.product.price * data.quantity }} ₾</span>
          </li>
        </ul>
        <span>jamshi: {{ totalPrice }}</span>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="cart-is-empty">
      <h1>კალათა ცარიელია</h1>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.cart {
  display: flex;
  justify-content: space-between;
  padding: 40px;
  gap: 30px;
  &__list {
    padding: 0px;
    &-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__products {
    // width: 60%;
    display: flex;
    flex: 0 0 60%;
    flex-wrap: wrap;
    gap: 15px;
    &-item {
      display: flex;
      flex: 0 0 calc(33.333% - 15px);
      margin-bottom: 15px;
    }
  }
  &__checkout {
    width: 40%;
    height: 200px;
    box-shadow: 0px 0px 3px gray;
    border-radius: 8px;
    padding: 15px;
  }
}

.cart-is-empty {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>
