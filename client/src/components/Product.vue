<script lang="ts" setup>
import type { ProductType } from '@/types/product';

defineProps<{
  data: ProductType
}>();
</script>

<template>
  <div class="product">
    <div class="product__image">
      <router-link :to="`/product/${data._id}`">
        <img :src="data.image"/>
      </router-link>
    </div>
    <div class="product__desc">
      <div class="product__title">
        <router-link :to="`/product/${data._id}`">
          <span>{{ data.title }}</span>
        </router-link>
      </div>
      <div class="product__price">
          <span><span>{{ data.price }}</span> <span>₾</span></span>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  width: 100%;
  background: white;
  &__image {
    width: 100%;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 14px;
    }
  }
  &__title {
    span {
      font-weight: 600;
      color: black;
      font-family: medium;
    }
    a{
      text-decoration: none;
    }
  }

  &__price {
    margin-top: 10px;
  }

  &__desc {
    text-align: left;
    padding-top: 0px;
  }
}
</style>
