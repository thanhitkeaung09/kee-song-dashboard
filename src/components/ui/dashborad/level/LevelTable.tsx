import { Level } from "@/redux/classes/response";
import { Delete, Edit } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import LevelTableActions from "./LevelTableAction";

type Props = {
  levels: Array<Level>;
};

const columns: GridColDef<Level>[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Level Name", flex: 1 },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => <LevelTableActions level={params.row} />,
  },
];

const LevelTable: React.FC<Props> = ({ levels }) => {
  return (
    <DataGrid
      rows={levels}
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

export default LevelTable;
