import { Location } from "@/redux/classes/response";
import { setSelectedLocation, toggleFormDialog } from "@/redux/feature/locationSlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  location: Location
}

const LocationTableActions: React.FC<Props> = ({ location }) => {
  const dispatch = useDispatch();
  return <>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedLocation(location));
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

export default LocationTableActions;