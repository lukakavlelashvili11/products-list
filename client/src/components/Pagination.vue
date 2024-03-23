<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}>();

const router = useRouter();
const route = useRoute();

const onClickHandler = (page: number) => {
  router.push({ path: route.path, query: { page } });
};

const currentPage = ref(props.currentPage || 1);

</script>

<template>
  <div class="pagination">
    <vue-awesome-paginate
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<style>
.pagination {
  display: flex;
  justify-content: center;
}
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
