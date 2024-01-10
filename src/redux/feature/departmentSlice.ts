import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { Department, IResponse, User, Worker } from "../classes/response";
import { DepartmentFormInput } from "@/schema/department.schema";

interface InitialState {
  openFormDialog: boolean;
  selectedDepartment: null | Department;
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedDepartment: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedDepartment: (
      state,
      action: PayloadAction<null | Department>
    ) => {
      state.selectedDepartment = action.payload;
    },
  },
});

const extendedDepartmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDepartment: builder.query<IResponse<Array<Department>>, void>({
        query: () => {
          return {
            url: `/department/getAll`,
          };
        },
        providesTags: ["DEPARTMENT-LIST"],
      }),
      createDepartment: builder.mutation<IResponse<Department>, DepartmentFormInput>({
        query: (payload) => {
          return {
            url: "/department/create",
            body: payload,
            method: "POST",
          }
        },
        invalidatesTags: ["DEPARTMENT-LIST"],
      }),

      updateDepartment: builder.mutation<IResponse<Department>, { id: string; data: DepartmentFormInput }>({
        query: (payload) => {
          return {
            url: `/department/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
          };
        },
        invalidatesTags: ["DEPARTMENT-LIST"],
      }),
    };
  },
});

export const {
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} = extendedDepartmentApi;
export const { toggleFormDialog, setSelectedDepartment } =
  departmentSlice.actions;
export default departmentSlice.reducer;
