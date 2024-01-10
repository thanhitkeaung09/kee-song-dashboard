import { Worker, Customer } from "@/redux/classes/response";
import { Delete, Edit } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import CustomerTableActions from "./CustomerTableActions";

type Props = {
  customer: Array<Customer>;
};

const columns: GridColDef<Customer>[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Full Name", flex: 1 },
  { field: "email", headerName: "E-mail", flex: 1 },
  {
    field: "company",
    headerName: "Company",
    valueGetter: (params) => {
      return params.row?.company ? params.row.company.name : "-";
    },
    flex: 1,
  },
  { field: "dateOfBirth", headerName: "Date of Birth", flex: 1 },
  { field: "address", headerName: "Address", flex: 1 },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => <CustomerTableActions customer={params.row} />,
  },
];

const CustomerTable: React.FC<Props> = ({ customer }) => {
  return (
    <DataGrid
      rows={customer}
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

export default CustomerTable;
