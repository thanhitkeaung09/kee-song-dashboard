import { ProductCategory } from "@/redux/classes/response";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import ProductCategoryTableActions from "./ProductCategoryTableAction";

type Props = {
  productCategories: Array<ProductCategory>;
};

const columns: GridColDef<ProductCategory>[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Category Name", flex: 1 },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => <ProductCategoryTableActions category={params.row} />,
  },
];

const ProductCategoryTable: React.FC<Props> = ({ productCategories }) => {
  return (
    <DataGrid
      rows={productCategories}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 10]}
      checkboxSelection
    />
  );
};

export default ProductCategoryTable;
