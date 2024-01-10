import { FullFlex } from "@/components/common/FlexContainer";
import { Company } from "@/redux/classes/response";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import React from "react";
import CompanyTableActions from "./CompanyTableActions";

type Props = {
  companies: Array<Company>;
};

const columns: GridColDef<Company>[] = [
  {
    field: "name",
    headerName: "Company Name",
    // renderCell: (params) => (
    //   <FullFlex gap={1} justifyContent="flex-start">
    //     {!!params.row?.logo && <Image width={40} height={40} alt={params.row?.name} src={params.row.logo} style={{ borderRadius: "4px", width: 40, height: 40 }} />}
    //     <Typography>{params.row?.name}</Typography>
    //   </FullFlex>
    // ),
    flex: 1,
  },
  { field: "size", headerName: "Size", flex: 1 },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => <CompanyTableActions company={params.row} />,
  },
];

const CompanyTable: React.FC<Props> = ({ companies }) => {
  return (
    <DataGrid
      rows={companies}
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

export default CompanyTable;
