import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { createCart, addToCart, getCart, updateCart, deleteProductFromCart } from "@/services/modules/cartService";
import type { ProductType } from "@/types/product";
import type { CartProductType } from "@/types/cart";

interface State {
  cartId: string;
  products: CartProductType[];
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

    async addToCart(data: { productId: string; qty: number }) {
      if (!this.cartId) {
        try {
          await this.createCart();
        } catch (err) {
          console.error(err);
        }
      }

      return addToCart({
        productId: data.productId,
        qty: data.qty,
        cartId: this.cartId,
      }).then((resp) => console.log(resp));
    },

    async getCart(id: string) {
      return getCart(id)
        .then((resp) => {
          this.$patch({
            products: resp.products,
          });
        })
        .catch((resp) => {
          console.error(resp);
        });
    },

    async updateCart(data: { productId: string; qty: number }){
      try{
        await updateCart({
          productId: data.productId,
          qty: data.qty,
          cartId: this.cartId,
        });
        await this.getCart(this.cartId);
      }catch(err){
        console.log(err);
      }
    },

    async deleteProduct(productId: string){
      try{
        await deleteProductFromCart({
          productId: productId,
          cartId: this.cartId,
        });
        await this.getCart(this.cartId);
      }catch(err){
        console.log(err);
      }
    }
  },
});
