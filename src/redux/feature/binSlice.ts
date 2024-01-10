import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { Bin, BinPaginatedResp, IResponse, User, Worker } from "../classes/response";
import { BinFormInput } from "@/schema/bin.schema";

interface InitialState {
  openFormDialog: boolean;
  selectedBin: null | Bin
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedBin: null
};

const binSlice = createSlice({
  name: "bin",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedBin: (state, action: PayloadAction<Bin | null>) => {
      state.selectedBin = action.payload;
    }
  },
});

const extendedBinApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getBins: builder.query<IResponse<BinPaginatedResp<Bin>>, void>({
        query: () => {
          return {
            url: `/bin/getWithPagination?search=&pageSize=10&page=1`,
          };
        },
        providesTags: ["WORKER-LIST"],
      }),
      createBin: builder.mutation<IResponse<Bin>, BinFormInput>({
        query: (payload) => {
          return {
            url: "/bin/create",
            body: payload,
            method: "POST",
          }
        },
        invalidatesTags: ["WORKER-LIST"]
      }),
      updateBin: builder.mutation<IResponse<Bin>, { id: string, data: BinFormInput }>({
        query: (payload) => {
          return {
            url: `/bin/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
          }
        },
        invalidatesTags: ["WORKER-LIST"]
      })
    };
  },
});

export const { useGetBinsQuery, useCreateBinMutation, useUpdateBinMutation } = extendedBinApi;
export const { toggleFormDialog, setSelectedBin } = binSlice.actions;
export default binSlice.reducer;
