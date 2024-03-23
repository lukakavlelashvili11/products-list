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
        <router-link :to="''">
          <span>{{ data.title }}</span>
        </router-link>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div class="product__price">
          <span><span>{{ data.price }}</span> <span>₾</span></span>
        </div>
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
    a {
      position: relative;
    }
    &:hover .product__description {
      display: block !important;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 14px;
    }
  }

//   &__description {
//     display: none;
//     position: absolute;
//     top: 0px;
//     width: 100%;
//     height: 100%;
//     color: white;
//     transition: display 0.7s;
//   }

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
    span {
      font-family: "Roboto Condensed", sans-serif;
    }
  }

  &__desc {
    text-align: left;
    padding-top: 0px;
  }

  &__actions {
    margin-top: 8px;

    // @include flex(flex-end, center);

    img {
      width: 22px;
      cursor: pointer;
    }

    &--right {
    //   @include flex(flex-start, center);
      gap: 15px;
    }
  }
}
</style>
