import { Bin, Worker } from "@/redux/classes/response";
import { Delete, Edit } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import BinTableActions from "./BinTableActions";

type Props = {
  bins: Array<Bin>;
};

const columns: GridColDef<Bin>[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Bin Name", flex: 1 },
  {
    field: "location_level",
    headerName: "Location Level",
    valueGetter: (params) => {
      return params.row?.location_level.name;
    },
    flex: 1
  },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => <BinTableActions bin={params.row} />,
  },
];

const BinTable: React.FC<Props> = ({ bins }) => {
  return (
    <DataGrid
      rows={bins}
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

export default BinTable;
