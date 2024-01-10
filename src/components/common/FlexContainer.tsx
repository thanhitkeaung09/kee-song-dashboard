import { Box, styled } from "@mui/material";

type Props = {
  justifyContent?: "flex-start" | "flex-end" | "space-between" | "space-evenly" | "center",
  alignItems?: "flex-start" | "flex-end" | "space-between" | "space-evenly" | "center"
}

export const FullFlex = styled(Box)(
  ({ justifyContent = "space-between", alignItems = "center" }: Props) => ({
    width: "100%",
    display: "flex",
    justifyContent: justifyContent,
    alignItems: alignItems,
  })
);
