import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { IResponse, User, Worker } from "../classes/response";

interface InitialState {
  openFormDialog: boolean;
  selectedWorker: null | Worker;
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedWorker: null
};

const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedWorker: (state, action: PayloadAction<null | Worker>) => {
      state.selectedWorker = action.payload;
    }
  },
});

const extendedWorkerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getWorkers: builder.query<IResponse<Array<Worker>>, void>({
        query: () => {
          return {
            url: `/user/getAll`,
          };
        },
        providesTags: ["WORKER-LIST"],
      }),
      createWorker: builder.mutation<IResponse<User>, FormData>({
        query: (payload) => {
          return {
            url: "/user/create",
            body: payload,
            method: "POST",
            formData: true,
          }
        },
        invalidatesTags: ["WORKER-LIST"]
      }),
      updateWorker: builder.mutation<IResponse<User>, { id: string, data: FormData }>({
        query: (payload) => {
          return {
            url: `/user/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
            formData: true,
          }
        },
        invalidatesTags: ["WORKER-LIST"]
      })
    };
  },
});

export const { useGetWorkersQuery, useCreateWorkerMutation, useUpdateWorkerMutation } = extendedWorkerApi;
export const { toggleFormDialog, setSelectedWorker } = workerSlice.actions;
export default workerSlice.reducer;
