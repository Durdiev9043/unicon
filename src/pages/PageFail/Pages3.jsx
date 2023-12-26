  import { useState, useEffect } from "react";
  import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
  import styled from "styled-components";
  import axios from "axios";


  export const UserPages = () => {
    const [item, setItem] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const handleProduct = async () => {
      await axios
        .get("https://unic1.pythonanywhere.com/api/todo/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
          },  
        })
        .then((res) => {
          console.log(res.data);
          setItem(res.data);
        })
        .catch((err) => {
          console.log("Err", err);
        });
    };

    useEffect(() => {
      handleProduct();
    }, []);
    return (
      <>
        <div style={{ backgroundColor: "white", height: 550, width: "100%" }}>
          <SityledTable
            className="demo"
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 25, 50, 100]}
            pagination
            rows={item.map((el) => ({
              id: el.id,
              card_id: el.organization,
              lastName: el.member,
              birth_date: el.location.latitude,
              code: el.task 
            }))}
            columns={[
              { field: "id", headerName: "N%", width: 70 },
              { field: "card_id", headerName: "Viloyat nomi", width:350 },
              { field: "lastName", headerName: "Xodimlar soni", width: 150 },
              { field: "birth_date", headerName: "INN", width: 180 },
              { field: "code", headerName: "code", width: 100 },
            ]}
            components={{
              Toolbar: GridToolbar,
            }}
            disableColumnMenu
          />
        </div>
      </>
    );
  };

  const SityledTable = styled(DataGridPro)`
    &&.css-1d97e6z-MuiDataGrid-root {
      border: 0px solid rgba(224, 224, 224, 1);
      border-radius: 4px;
      box-shadow: 0px 1px 4px #ccc;

      && img {
        width: 45px;
        height: 45px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  `;
