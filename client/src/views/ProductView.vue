<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";
import Button from "@/components/base/Button.vue";
import emitter from "@/utils/emitter";
import QuantitySelector from "@/components/base/QuantitySelector.vue";

const productStore = useProductStore();
const cartStore = useCartStore();
const route = useRoute();
const product = computed(() => productStore.singleProductDataGetter);

const qty = ref(1);

const addToCart = () => {
  cartStore
    .addToCart({
      productId: product.value._id,
      qty: qty.value
    })
    .then(() => {
      emitter.emit("alert", {
        text: "added_to_cart",
        apparence: "success",
      });
    })
    .catch((err) => {
      if (err.response.status === 400) {
        emitter.emit("alert", {
          text: "product_already_exists",
          apparence: "danger",
        });
      }
    });
};

const updateQty = (quantity: number) => {
  qty.value = quantity;
}

onMounted(async () => {
  await productStore.getSingleProduct({ id: route.params.id as string });
});
</script>

<template>
  <div class="product">
    <div class="product__image">
      <img :src="product.image" />
    </div>
    <div class="product__content">
      <h2 class="product__title">{{ product.title }}</h2>
      <span class="product__price">{{ product.price }} ₾</span>
      <QuantitySelector @change="updateQty"/>
      <div class="product__actions">
        <Button label="კალათაში დამატება" apparence="info" @click="addToCart" />
        <Button label="ყიდვა" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 30px 40px;
  gap: 30px;
  &__image {
    width: 40%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  &__content {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  &__actions {
    display: flex;
    justify-content: flex-start;
    gap: 40px;
    margin-top: 70px;
  }
  &__title {
    font-family: medium;
  }
}
</style>
