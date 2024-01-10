import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { IResponse, Level, LevelPaginatedResp } from "../classes/response";
import { LevelFormInput } from "@/schema/level.schema";

interface InitialState {
  openFormDialog: boolean;
  selectedLevel: null | Level
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedLevel: null
};

const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedLevel: (state, action: PayloadAction<Level | null>) => {
      state.selectedLevel = action.payload
    }
  },
});

const extendedLevelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getLevels: builder.query<IResponse<LevelPaginatedResp<Level>>, void>({
        query: () => {
          return {
            url: `/location_level/getWithPagination?search=&pageSize=10&page=1`,
          };
        },
        providesTags: ["LEVEL-LIST"],
      }),
      createLevel: builder.mutation<IResponse<Level>, LevelFormInput>({
        query: (payload) => {
          return {
            url: "/location_level/create",
            body: payload,
            method: "POST",
          }
        },
        invalidatesTags: ["LEVEL-LIST"]
      }),
      updateLevel: builder.mutation<IResponse<Level>, { id: string, data: LevelFormInput }>({
        query: (payload) => {
          return {
            url: `/location_level/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
          }
        },
        invalidatesTags: ["LEVEL-LIST"]
      })
    };
  },
});

export const { useGetLevelsQuery, useCreateLevelMutation, useUpdateLevelMutation } = extendedLevelApi;
export const { toggleFormDialog, setSelectedLevel } = levelSlice.actions;
export default levelSlice.reducer;
