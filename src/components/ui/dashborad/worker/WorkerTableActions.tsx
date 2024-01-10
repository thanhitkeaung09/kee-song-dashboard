import { Worker } from "@/redux/classes/response";
import { setSelectedWorker, toggleFormDialog } from "@/redux/feature/workerSlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  worker: Worker
}

const WorkerTableActions: React.FC<Props> = ({ worker }) => {
  const dispatch = useDispatch();
  return <>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedWorker(worker));
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

export default WorkerTableActions;