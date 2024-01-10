import { Customer } from "@/redux/classes/response";
import { setSelectedCustomer, toggleFormDialog } from "@/redux/feature/customerSlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  customer: Customer
}

const CustomerTableActions: React.FC<Props> = ({ customer }) => {
  const dispatch = useDispatch();
  return <>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedCustomer(customer));
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

export default CustomerTableActions;