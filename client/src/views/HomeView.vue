<script setup lang="ts">
import Product from "@/components/Product.vue";
import { useProductStore } from "@/stores/product";
import { watch, computed, onMounted } from "vue";
import Pagination from "@/components/Pagination.vue";
import { useRoute } from "vue-router";
import type { PaginatedRequestType } from "@/types/paginate";

const productStore = useProductStore();
const products = computed(() => productStore.productListGetter);
const productData = computed(() => productStore.productListDataGetter);
const route = useRoute();

const paginateData = computed(
  (): PaginatedRequestType => ({
    limit: 10,
    page: parseInt(route.query.page as string) || 1,
  })
);

const getProducts = async (data: PaginatedRequestType) => {
  return productStore.getProductsList(data);
};

watch(
  () => paginateData.value,
  async (value) => {
    await getProducts(value);
  }
);

onMounted(async () => {
  await getProducts(paginateData.value);
});
</script>

<template>
  <template v-if="products.length">
    <div class="products">
      <div class="products__inner">
        <div class="products__item" v-for="(product, i) in products" :key="i">
          <Product :data="product" />
        </div>
      </div>
      <Pagination
        :current-page="paginateData.page"
        :items-per-page="paginateData.limit"
        :total-items="productData.totalItems"
      />
    </div>
  </template>
  <template v-else>
    <div class="products-is-empty">
      <h1>Run api to see products</h1>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.products {
  width: 100%;
  padding-bottom: 60px;
  &__inner {
    display: flex;
    flex: 0 0 100%;
    flex-wrap: wrap;
    gap: 15px;
    padding: 40px;
  }
  &__item {
    display: flex;
    flex: 0 0 calc(20% - 15px);
    margin-bottom: 15px;
  }
}

.products-is-empty {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  font-family: medium;
}
</style>
