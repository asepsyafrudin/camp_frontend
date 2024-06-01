import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getMasterSettingApi, updateMasterSettingApi } from "../../Config/API";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ControlPanel() {
  const [tableSetting, setTableSetting] = useState([]);
  const [autoMode, setAutoMode] = useState(true);
  const [actions, setActions] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(getMasterSettingApi, {
        headers: {
          ["authorization"]: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTableSetting(res.data.data);
        const data = res.data.data;
        if (data.length > 0) {
          const autoMode = data.find((item) => item.category === "auto_mode");
          setAutoMode(autoMode.status === 1 ? true : false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        navigate("/");
      });
  }, [actions]);

  const handleOnMode = (e) => {
    const id = e.target.id;

    const data = {
      id: id,
      status: 1,
    };
    try {
      axios
        .put(updateMasterSettingApi, data, {
          headers: {
            ["authorization"]: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setActions((prev) => prev + 1);
        });
    } catch (err) {
      console.log(err);
      localStorage.clear();
      navigate("/");
    }
  };

  const handleOffMode = (e) => {
    const id = e.target.id;
    const data = {
      id: id,
      status: 0,
    };
    try {
      axios
        .put(updateMasterSettingApi, data, {
          headers: {
            ["authorization"]: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setActions((prev) => prev + 1);
        });
    } catch (err) {
      console.log(err);
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <div>
      <Typography variant="h5"> Control Panel</Typography>
      {tableSetting && (
        <Table striped bordered hover style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Setting ID</th>
              <th>Key</th>
              <th>Status</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {tableSetting.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <th>{item.settings_id}</th>
                <td>{item.category}</td>
                <td>{item.status === 1 ? "ON" : "OFF"}</td>
                <td>
                  {item.category === "auto_mode" ? (
                    item.status === 1 ? (
                      <Button
                        onClick={handleOffMode}
                        variant="danger"
                        id={item.id}
                      >
                        OFF
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={handleOnMode}
                        id={item.id}
                      >
                        ON
                      </Button>
                    )
                  ) : item.status === 1 ? (
                    <Button
                      onClick={handleOffMode}
                      variant="danger"
                      disabled={autoMode ? true : false}
                      id={item.id}
                    >
                      OFF
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={handleOnMode}
                      disabled={autoMode ? true : false}
                      id={item.id}
                    >
                      ON
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ControlPanel;
