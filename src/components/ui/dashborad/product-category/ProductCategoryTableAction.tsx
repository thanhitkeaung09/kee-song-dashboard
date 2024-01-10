import { ProductCategory } from "@/redux/classes/response";
import { setSelectedProductCategory, toggleFormDialog } from "@/redux/feature/productCategorySlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  category: ProductCategory
}

const ProductCategoryTableActions: React.FC<Props> = ({ category }) => {
  const dispatch = useDispatch();
  return <>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedProductCategory(category));
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

export default ProductCategoryTableActions;