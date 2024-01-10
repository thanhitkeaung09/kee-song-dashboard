import { Bin } from "@/redux/classes/response";
import { setSelectedBin, toggleFormDialog } from "@/redux/feature/binSlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  bin: Bin
}

const BinTableActions: React.FC<Props> = ({ bin }) => {
  const dispatch = useDispatch();
  return <>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedBin(bin));
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

export default BinTableActions;