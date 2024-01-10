import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { Company, IResponse } from "../classes/response";

interface InitialState {
  openFormDialog: boolean;
  selectedCompany: null | Company
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedCompany: null
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    toggleFormDialog: (state, action) => {
      state.openFormDialog = action.payload;
    },
    setSelectedCompany: (state, action: PayloadAction<Company | null>) => {
      state.selectedCompany = action.payload;
    }
  },
});

const extendedCompanyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCompanies: builder.query<IResponse<Array<Company>>, void>({
        query: () => {
          return {
            url: `/company/getAll`,
          };
        },
        providesTags: ["COMPANY-LIST"],
      }),
      createCompany: builder.mutation<IResponse<Company>, FormData>({
        query: (payload) => {
          return {
            url: "/company/create",
            body: payload,
            method: "POST",
            formData: true,
          }
        },
        invalidatesTags: ["COMPANY-LIST"]
      }),
      updateCompany: builder.mutation<IResponse<Company>, { id: string, data: FormData }>({
        query: (payload) => {
          return {
            url: `/company/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
            formData: true,
          }
        },
        invalidatesTags: ["COMPANY-LIST"]
      })
    };
  },
});

export const { useGetCompaniesQuery, useCreateCompanyMutation, useUpdateCompanyMutation } = extendedCompanyApi;
export const { toggleFormDialog, setSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
