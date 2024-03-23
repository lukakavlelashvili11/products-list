import { post, get } from "../axios";
import type { ProductType } from "@/types/product";

export const createCart = async () => {
  return post<{ _id: string }>("/cart/create");
};

export const addToCart = async (data: {
  cartId: string;
  productId: string;
}) => {
  return post(`/cart/${data.cartId}/products/${data.productId}`, data);
};

export const getCart = async (id : string) => {
    return get<ProductType[]>(`/cart/${id}`);
};