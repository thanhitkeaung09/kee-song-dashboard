import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./feature/apiSlice";
import appReducer from "./feature/appSlice";
import workerReducer from "./feature/workerSlice";
import customerReducer from "./feature/customerSlice";
import companyReducer from "./feature/companySlice";
import levelReducer from "./feature/levelSlice";
import binReducer from "./feature/binSlice";
import locationReducer from "./feature/locationSlice";
import productCategoryReducer from "./feature/productCategorySlice";
import productReducer from "./feature/productSlice";
import departmentReducer from "./feature/departmentSlice";
import userReducer from "./feature/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    app: appReducer,
    worker: workerReducer,
    user: userReducer,
    company: companyReducer,
    level: levelReducer,
    bin: binReducer,
    location: locationReducer,
    category: productCategoryReducer,
    product: productReducer,
    customer: customerReducer,
    department: departmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
