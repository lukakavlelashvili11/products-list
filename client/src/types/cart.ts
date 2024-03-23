import type { ProductType } from "./product";

export type CartProductType = {
  product: ProductType;
  quantity: number;
};
