import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { IResponse, ProductCategory, ProductCategoryPaginatedResp } from "../classes/response";
import { ProductCategoryFormInput } from "@/schema/product-category.schema";

interface InitialState {
  openFormDialog: boolean;
  selectedProductCategory: ProductCategory | null;
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedProductCategory: null,
};

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedProductCategory: (state, action: PayloadAction<ProductCategory | null>) => {
      state.selectedProductCategory = action.payload;
    }
  },
});

const extendedProductCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getProductCategories: builder.query<IResponse<ProductCategoryPaginatedResp<ProductCategory>>, void>({
        query: () => {
          return {
            url: "/category/getWithPagination?search=&pageSize=10&page=1",
          };
        },
        providesTags: ["PRODUCT-CATEGORY-LIST"],
      }),
      createProductCategory: builder.mutation<IResponse<ProductCategory>, ProductCategoryFormInput>({
        query: (payload) => {
          return {
            url: "/category/create",
            body: payload,
            method: "POST",
          }
        },
        invalidatesTags: ["PRODUCT-CATEGORY-LIST"]
      }),
      updateProductCategory: builder.mutation<IResponse<ProductCategory>, { id: string, data: ProductCategoryFormInput }>({
        query: (payload) => {
          return {
            url: `/category/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
          }
        },
        invalidatesTags: ["PRODUCT-CATEGORY-LIST"]
      })
    };
  },
});

export const { useGetProductCategoriesQuery, useCreateProductCategoryMutation, useUpdateProductCategoryMutation } = extendedProductCategoryApi;
export const { toggleFormDialog, setSelectedProductCategory } = productCategorySlice.actions;
export default productCategorySlice.reducer;
