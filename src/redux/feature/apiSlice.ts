import { API_URL } from "@/lib/api";
import { getDecryptedToken } from "@/lib/utlis";
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IOptions, IResponse, User } from "../classes/response";
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = getDecryptedToken();
    if (!token || !token.data) {
      localStorage.clear();
      window.location.href = "http://localhost:3000";
      return;
    }
    const jsonToken = JSON.parse(token.data);
    if (!jsonToken.data) {
      localStorage.clear();
      window.location.href = "http://localhost:3000";
      return;
    }
    headers.set("Authorization", `Bearer ${jsonToken.data.token}`);
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    localStorage.clear();
    window.location.href = "http://localhost:3000";
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "PROFILE",
    "WORKER-LIST",
    "OPTIONS",
    "COMPANY-LIST",
    "LEVEL-LIST",
    "BIN-LIST",
    "LOCATION-LIST",
    "PRODUCT-CATEGORY-LIST",
    "CUSTOMER-LIST",
    "PRODUCT-LIST",
    "DEPARTMENT-LIST",
    "USER-LIST",
  ],
  endpoints: (builder) => ({
    getMe: builder.query<IResponse<User>, void>({
      query: () => ({
        url: `/user/getByAuth`,
      }),
      providesTags: ["PROFILE"],
    }),
    getOptions: builder.query<IResponse<Array<IOptions>>, string>({
      query: (url) => ({
        url: url,
      }),
      providesTags: ["OPTIONS"],
    }),
  }),
});

export const { useGetMeQuery, useGetOptionsQuery } = apiSlice;
