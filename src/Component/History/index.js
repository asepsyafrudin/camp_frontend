import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getDataLogApi, getMasterPlantApi } from "../../Config/API";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { round } from "../../Config/function";

function History() {
  const [tableLog, setTableLog] = useState([]);
  const [plantActive, setPlantActive] = useState("");

  useEffect(() => {
    setInterval(() => {
      axios.get(getDataLogApi).then((response) => {
        setTableLog(response.data.data);
      });

      axios.get(getMasterPlantApi).then((response) => {
        const data = response.data.data;
        if (data.length > 0) {
          const plant = data.find((item) => item.status === 1);
          if (plant) {
            setPlantActive(plant.plant_name);
          }
        }
      });
    }, 10000);
  }, []);

  useEffect(() => {
    axios.get(getDataLogApi).then((response) => {
      setTableLog(response.data.data);
    });

    axios.get(getMasterPlantApi).then((response) => {
      const data = response.data.data;
      if (data.length > 0) {
        const plant = data.find((item) => item.status === 1);
        if (plant) {
          setPlantActive(plant.plant_name);
        }
      }
    });
  }, []);

  const columns = [
    {
      field: "plant_name",
      headerName: "Plane Name",
      width: 200,
    },
    {
      field: "ph",
      headerName: "PH",
      width: 150,
    },
    {
      field: "temperature",
      headerName: "Temperature",
      width: 150,
      valueFormatter: (value) => {
        return round(value, 3);
      },
    },
    {
      field: "humidity",
      headerName: "Humidity",
      width: 150,
      valueFormatter: (value) => {
        return round(value, 3);
      },
    },
    {
      field: "create_date",
      headerName: "Create Date",
      width: 200,
      valueFormatter: (value) => {
        return moment(value.value).format("DD-MM-YYYY HH:mm:ss");
      },
    },
  ];
  return (
    <div>
      <Typography variant="h5"> Page History {plantActive}</Typography>
      <br />
      {tableLog && (
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          columns={columns}
          rows={tableLog}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      )}
    </div>
  );
}

export default History;
