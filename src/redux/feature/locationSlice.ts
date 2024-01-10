import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { IResponse, Location, LocationPaginatedResp } from "../classes/response";
import { LocationFormInput } from "@/schema/location.schema";

interface InitialState {
  openFormDialog: boolean;
  selectedLocation: null | Location
}

const initialState: InitialState = {
  openFormDialog: false,
  selectedLocation: null
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    toggleFormDialog: (state, action: PayloadAction<boolean>) => {
      state.openFormDialog = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    }
  },
});

const extendedLocationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getLocations: builder.query<IResponse<LocationPaginatedResp<Location>>, void>({
        query: () => {
          return {
            url: `/location/getWithPagination?search=&pageSize=10&page=1`,
          };
        },
        providesTags: ["LOCATION-LIST"],
      }),
      createLocation: builder.mutation<IResponse<Location>, { bin: string, column: number, row: number }>({
        query: (payload) => {
          return {
            url: "/location/create",
            body: payload,
            method: "POST",
          }
        },
        invalidatesTags: ["LOCATION-LIST"]
      }),
      updateLocation: builder.mutation<IResponse<Location>, { id: string, data: { bin: string, column: number, row: number } }>({
        query: (payload) => {
          return {
            url: `/location/update/${payload.id}`,
            body: payload.data,
            method: "PATCH",
          }
        },
        invalidatesTags: ["LOCATION-LIST"]
      })
    };
  },
});

export const { useGetLocationsQuery, useCreateLocationMutation, useUpdateLocationMutation } = extendedLocationApi;
export const { toggleFormDialog, setSelectedLocation } = locationSlice.actions;
export default locationSlice.reducer;
