import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { IResponse, Product, ProductPaginatedResp } from "../classes/response";
import { ProductFormInput } from "@/schema/product.schema";

interface InitialState {
  openFormDialog: boolean;
  selectedProduct: Product | null;
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    }
  },
});

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getProducts: builder.query<IResponse<ProductPaginatedResp<Product>>, void>({
        query: () => {
          return {
            url: "/product/getWithPagination?search=&pageSize=10&page=1",
          };
        },
        providesTags: ["PRODUCT-LIST"],
      }),
      createProduct: builder.mutation<IResponse<Product>, ProductFormInput>({
        query: (payload) => {
          return {
            url: "/product/create",
            body: payload,
            method: "POST",
          }
        },
        invalidatesTags: ["PRODUCT-LIST"]
      }),
      updateProduct: builder.mutation<IResponse<Product>, { id: string, data: ProductFormInput }>({
        query: (payload) => {
          return {
            url: `/product/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
          }
        },
        invalidatesTags: ["PRODUCT-LIST"]
      })
    };
  },
});

export const { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation } = extendedProductApi;
export const { toggleFormDialog, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
