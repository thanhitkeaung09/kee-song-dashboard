import { Product } from "@/redux/classes/response";
import { setSelectedProduct, toggleFormDialog } from "@/redux/feature/productSlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  product: Product
}

const ProductTableActions: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  return <>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedProduct(product));
        dispatch(toggleFormDialog(true));
      }}
    >
      <Edit color="primary" />
    </IconButton>
    <IconButton>
      <Delete color="error" />
    </IconButton>
  </>
}

export default ProductTableActions;