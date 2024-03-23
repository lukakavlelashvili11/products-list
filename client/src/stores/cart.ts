import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { createCart, addToCart, getCart } from "@/services/modules/cartService";
import type { ProductType } from "@/types/product";

interface State {
  cartId: string;
  products: ProductType[];
}

export const useCartStore = defineStore("cart", {
  state: (): State => ({
    cartId: Cookies.get("cart_id") || "",
    products: [],
  }),

  actions: {
    async createCart() {
      return await createCart()
        .then((resp) => {
          Cookies.set("cart_id", resp._id);
          this.$patch({
            cartId: resp._id,
          });
        })
        .catch((err) => console.error(err));
    },

    async addToCart(productId: string) {
      if (!this.cartId) {
        try {
          await this.createCart();
        } catch (err) {
          console.error(err);
        }
      }

      return addToCart({ productId, cartId: this.cartId }).then((resp) =>
        console.log(resp)
      );
    },

    async getCart(id: string) {
      return getCart(id).then((resp) => {
        this.$patch({
          products: resp,
        });
      })
      .catch(resp => {
        console.error(resp);
      });
    },
  },
});
