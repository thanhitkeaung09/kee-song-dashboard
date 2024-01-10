import { Company } from "@/redux/classes/response";
import { setSelectedCompany, toggleFormDialog } from "@/redux/feature/companySlice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

type Props = {
  company: Company
}

const CompanyTableActions: React.FC<Props> = ({ company }) => {
  const dispatch = useDispatch();
  return <>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedCompany(company));
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

export default CompanyTableActions;