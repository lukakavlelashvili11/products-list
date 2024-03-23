import { get } from "../axios";
import type { ProductType } from "@/types/product";
import type {
  PaginatedResponseType,
  PaginatedRequestType,
} from "@/types/paginate";

export const getProducts = async (data: PaginatedRequestType) => {
  return get<PaginatedResponseType<ProductType[]>>(
    `/products?limit=${data.limit}&page=${data.page}`
  );
};

export const getProductById = async (data: { id: string }) => {
  return get<ProductType>(`/products/get/${data.id}`);
};
