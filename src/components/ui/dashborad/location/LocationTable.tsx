import { Location } from "@/redux/classes/response";
import { Delete, Edit } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import LocationTableActions from "./LocationTableActions";

type Props = {
  locations: Array<Location>;
};

const columns: GridColDef<Location>[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "bin",
    headerName: "Bin Name",
    valueGetter: (params) => {
      return params.row?.bin.name;
    },
    flex: 1
  },
  { field: "row", headerName: "Row", flex: 1 },
  { field: "column", headerName: "Column", flex: 1 },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => <LocationTableActions location={params.row} />,
  },
];

const LocationTable: React.FC<Props> = ({ locations }) => {
  return (
    <DataGrid
      rows={locations}
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

export default LocationTable;
