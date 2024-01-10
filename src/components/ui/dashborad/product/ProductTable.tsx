import { Product } from "@/redux/classes/response";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import ProductTableActions from "./ProductTableAction";

type Props = {
  products: Array<Product>;
};

const columns: GridColDef<Product>[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Product Name", flex: 1 },
  { field: "sku", headerName: "SKU", flex: 1 },
  {
    field: "category",
    headerName: "Category",
    valueGetter: (params) => {
      return params.row?.category.name;
    },
    flex: 1
  },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => <ProductTableActions product={params.row} />,
  },
];

const ProductTable: React.FC<Props> = ({ products }) => {
  return (
    <DataGrid
      rows={products}
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

export default ProductTable;
