import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { IResponse, Worker } from "../classes/response";

interface InitialState {
  openFormDialog: boolean;
  selectedUser: null | Worker;
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedUser: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<null | Worker>) => {
      state.selectedUser = action.payload;
    }
  },
});

const extendedUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUsers: builder.query<IResponse<Array<Worker>>, void>({
        query: () => {
          return {
            url: `/user/getAll`,
          };
        },
        providesTags: ["USER-LIST"],
      }),
      createUser: builder.mutation<IResponse<Worker>, FormData>({
        query: (payload) => {
          return {
            url: "/user/create",
            body: payload,
            method: "POST",
            formData: true,
          }
        },
        invalidatesTags: ["USER-LIST"]
      }),
      updateUser: builder.mutation<IResponse<Worker>, { id: string, data: FormData }>({
        query: (payload) => {
          return {
            url: `/user/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
            formData: true,
          }
        },
        invalidatesTags: ["USER-LIST"]
      })
    };
  },
});

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } = extendedUserApi;
export const { toggleFormDialog, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
