import { Level } from "@/redux/classes/response";
import { setSelectedLevel, toggleFormDialog } from "@/redux/feature/levelSlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  level: Level
}

const LevelTableActions: React.FC<Props> = ({ level }) => {
  const dispatch = useDispatch();
  return <>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedLevel(level));
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

export default LevelTableActions;