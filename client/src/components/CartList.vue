<script lang="ts" setup>
import CartListItem from './CartListItem.vue';
import type { CartProductType } from '@/types/cart';
defineProps<{
    products: CartProductType[];
}>();
</script>

<template>
    <div class="cart-list">
        <CartListItem v-for="product in products" :data="product.product" :qty="product.quantity"/>
    </div>
</template>

<style lang="scss" scoped>
.cart-list{
    width: 100%;
}
</style>


