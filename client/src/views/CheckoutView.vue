<script lang="ts" setup>
import { useCartStore } from "@/stores/cart";
import { computed, onMounted } from "vue";
import Button from "@/components/base/Button.vue";

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
  <div class="cart">
    <div class="cart__checkout">
      <span>გადახდა:</span>
      <ul class="cart__list">
        <li class="cart__list-item" v-for="data in products">
          <div class="cart__list-item--left">
            <img :src="data.product.image" />
            <div class="cart__list-item-details">
              <span>{{ data.product.title }}</span>
              <div>
                <span>{{ data.product.price }}₾</span>
                <span class="cart__list-item-details-qty"
                  ><span>რაოდენობა:</span> {{ data.quantity }}</span
                >
              </div>
            </div>
          </div>
          <span>{{ data.product.price * data.quantity }} ₾</span>
        </li>
      </ul>
      <div class="cart__total">
        <span>ჯამში: {{ totalPrice }} ₾</span>
      </div>
      <div class="cart__pay">
        <Button full-width label="ყიდვა" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
  gap: 30px;
  &__list {
    padding: 0px;
    margin: 20px 0px;
    &-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      font-family: medium;
      font-size: 14px;
      &--left {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 12px;
        img {
          width: 50px;
          border-radius: 7px;
        }
      }
      &-details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // align-items: center;
        gap: 12px;
        &-qty {
          margin-left: 16px;
          span {
            font-size: 13px;
            color: rgb(96, 95, 95);
          }
        }
      }
    }
  }
  &__pay {
    margin-top: 30px;
  }
  &__total {
    margin-top: 30px;
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
    width: 70%;
    box-shadow: 0px 0px 5px rgb(199, 199, 199);
    border-radius: 8px;
    padding: 15px;
    margin-left: auto;
    margin-right: auto;
  }
}

.cart-is-empty {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>
