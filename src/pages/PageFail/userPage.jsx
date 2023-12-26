import * as React from "react";
import { DataGridPro, GridToolbar, GridOverlay } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import "./index.css";
export const User = () => {
  const { data } = useDemoData({
    // dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 10,
  });
  const item = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridPro
        rows={item.map((el) => ({
          id: el.id,
        }))}
        {...data}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};
