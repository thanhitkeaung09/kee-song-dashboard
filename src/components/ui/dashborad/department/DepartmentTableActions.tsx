import { Department, Worker } from "@/redux/classes/response";
import {
  setSelectedDepartment,
  toggleFormDialog,
} from "@/redux/feature/departmentSlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  department: Department;
};

const DepartmentTableActions: React.FC<Props> = ({ department }) => {
  const dispatch = useDispatch();
  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setSelectedDepartment(department));
          dispatch(toggleFormDialog(true));
        }}
      >
        <Edit color="primary" />
      </IconButton>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </>
  );
};

export default DepartmentTableActions;
