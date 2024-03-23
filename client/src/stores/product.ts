import { defineStore } from "pinia";
import type { ProductType } from "@/types/product";
import type {
  PaginatedResponseType,
  PaginatedRequestType,
} from "@/types/paginate";
import { getProducts, getProductById } from "@/services";

interface State {
  productListData: PaginatedResponseType<ProductType[]>;
  singleProductData: ProductType;
}

export const useProductStore = defineStore("product", {
  state: (): State => ({
    productListData: {} as State["productListData"],
    singleProductData: {} as State["singleProductData"],
  }),

  getters: {
    productListDataGetter: (state) => state.productListData,
    productListGetter: (state) => state.productListData.data,
    singleProductDataGetter: (state)=> state.singleProductData,
  },

  actions: {
    async getProductsList(data: PaginatedRequestType) {
      return getProducts(data)
        .then((resp) => {
          this.$patch({
            productListData: resp,
          });
        })
        .catch((err) => console.error(err));
    },

    async getSingleProduct(data: { id: string }) {
      return getProductById(data)
        .then((resp) => {
          this.$patch({
            singleProductData: resp,
          });
        })
        .catch((err) => console.error(err));
    },
  },
});
