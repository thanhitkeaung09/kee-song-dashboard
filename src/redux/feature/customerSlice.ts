import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { IResponse, User, Customer } from "../classes/response";

interface InitialState {
  openFormDialog: boolean;
  selectedCustomer: null | Customer;
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedCustomer: null
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedCustomer: (state, action: PayloadAction<null | Customer>) => {
      state.selectedCustomer = action.payload;
    }
  },
});

const extendedCustomerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCustomer: builder.query<IResponse<Array<Customer>>, void>({
        query: () => {
          return {
            url: `/customer/getAll`,
            // url: `customer/getWithPagination?search=com&pageSize=10&page=1`,
          };
        },
        providesTags: ["CUSTOMER-LIST"],
      }),
      createCustomer: builder.mutation<IResponse<User>, FormData>({
        query: (payload) => {
          return {
            url: "/customer/create",
            body: payload,
            method: "POST",
            formData: true,
          };
        },
        invalidatesTags: ["CUSTOMER-LIST"],
      }),
      updateCustomer: builder.mutation<IResponse<User>, { id: string, data: FormData }>({
        query: (payload) => {
          return {
            url: `/customer/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
            formData: true,
          };
        },
        invalidatesTags: ["CUSTOMER-LIST"],
      }),
    };
  },
});

export const { useGetCustomerQuery, useCreateCustomerMutation, useUpdateCustomerMutation } = extendedCustomerApi;
export const { toggleFormDialog, setSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
