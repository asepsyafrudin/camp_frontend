import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import BallotIcon from "@mui/icons-material/Ballot";
import GraphLine from "../GraphLine";
import Plotly from "plotly.js-dist-min";
import GraphGauge from "../GraphGauge";
import axios from "axios";
import { getDataLogApi, getMasterPlantApi } from "../../Config/API";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState([]);
  const [plantActive, setPlantActive] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      axios
        .get(getDataLogApi, {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          localStorage.clear();
          navigate("/");
        });
    }, 10000);
  }, []);

  useEffect(() => {
    axios
      .get(getDataLogApi, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        navigate("/");
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
  return (
    <div>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        <span
          style={{
            backgroundColor: "grey",
            padding: 10,
            fontSize: 25,
            borderRadius: 5,
            color: "blue",
          }}
        >
          Monitoring Greenhouse {plantActive}
          {/* <Typography variant="h4">
         
          </Typography> */}
        </span>
      </div>
      <Row className="mb-5" style={{ padding: 20 }}>
        <Col sm={4}>
          <Card>
            <Card.Header>Current Humidity</Card.Header>
            <Card.Body>
              <GraphGauge
                id={"graphGauugeHumidity10"}
                type={"humidity"}
                data={data}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Header>Current Temperature</Card.Header>
            <Card.Body>
              <GraphGauge
                id={"graphGauugeTemperature11"}
                type={"temperature"}
                data={data}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Header>Current PH</Card.Header>
            <Card.Body>
              <GraphGauge id={"graphGauugePh12"} type={"ph"} data={data} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-5" style={{ padding: 20 }}>
        <Col sm={12}>
          <Card>
            <Card.Header>Humidity Control</Card.Header>
            <Card.Body>
              <GraphLine id={"graphWelcome13"} type={"humidity"} data={data} />
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12}>
          <Card>
            <Card.Header>PH Control</Card.Header>
            <Card.Body>
              <GraphLine id={"graphWelcome14"} type={"ph"} data={data} />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <Card.Header>Temperature Control</Card.Header>
            <Card.Body>
              <GraphLine
                id={"graphWelcome15"}
                type={"temperature"}
                data={data}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
