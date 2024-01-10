import { setAppBarTitle } from "@/redux/feature/appSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useChangeAppTitle = (title: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppBarTitle(title));
  }, [dispatch, title]);
};
