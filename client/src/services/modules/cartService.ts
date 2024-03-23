import { post, get, put, remove } from "../axios";
import type { ProductType } from "@/types/product";
import type { CartProductType } from "@/types/cart";

export const createCart = async () => {
  return post<{ _id: string }>("/cart/create");
};

export const addToCart = async (data: {
  cartId: string;
  productId: string;
  qty: number;
}) => {
  return post(`/cart/${data.cartId}/products/${data.productId}`, {
    qty: data.qty,
  });
};

export const updateCart = async (data: {
  cartId: string;
  productId: string;
  qty: number;
}) => {
  return put(`/cart/${data.cartId}/products/${data.productId}`, {
    qty: data.qty,
  });
};

export const getCart = async (id: string) => {
  return get<{ products: CartProductType[] }>(`/cart/${id}`);
};

export const deleteProductFromCart = async (data: {
  cartId: string;
  productId: string;
}) => {
  return remove(`/cart/${data.cartId}/products/${data.productId}`);
}