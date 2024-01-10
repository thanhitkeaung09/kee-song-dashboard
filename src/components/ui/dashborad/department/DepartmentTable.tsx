import { Department, Worker } from "@/redux/classes/response";
import { Delete, Edit } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import DepartmentTableActions from "./DepartmentTableActions";

type Props = {
  departments: Array<Department>;
};

const columns: GridColDef<Department>[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Full Name", flex: 1 },
  //   { field: "email", headerName: "E-mail", flex: 1 },
  //   {
  //     field: "user_level",
  //     headerName: "User Level",
  //     valueGetter: (params) => {
  //       return params.row?.user_level.user_level;
  //     },
  //     flex: 1,
  //   },
  //   {
  //     field: "deletedAt",
  //     headerName: "Status",
  //     renderCell: (params) => (
  //       <Chip
  //         variant="outlined"
  //         color={params.row?.deletedAt === null ? "success" : "error"}
  //         label={params.row?.deletedAt === null ? "Active" : "Inactive"}
  //       />
  //     ),
  //   },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => <DepartmentTableActions department={params.row} />,
  },
];

const DepartmentTable: React.FC<Props> = ({ departments }) => {
  return (
    <DataGrid
      rows={departments}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
};

export default DepartmentTable;
