import { useNavigate } from "react-router-dom";

// material-ui
import Grid from "@mui/material/Grid";

// project import

import { Button, Card, Col, Row } from "react-bootstrap";
import GraphLine from "../../Component/GraphLine";
import AuthBackground from "../../Component/AuthBackground";
import { Box } from "@mui/material";
import Logo from "../../Component/Logo";
import AuthFooter from "../../Component/AuthFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDataLogApi, getMasterPlantApi } from "../../Config/API";
import GraphGauge from "../../Component/GraphGauge";

// ================================|| LOGIN ||================================ //

export default function Welcome() {
  const [data, setData] = useState([]);
  const [plantActive, setPlantActive] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      axios
        .get(getDataLogApi, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
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
    axios
      .get(getDataLogApi, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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

  const toLoginForm = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AuthBackground />
      {/* <Grid container sx={{ minHeight: "100vh" }}> */}
      <Grid
        item
        xs={12}
        sx={{ ml: 3, mt: 3, mr: 3 }}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Logo />
        <Button onClick={toLoginForm}>Login</Button>
      </Grid>

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
                id={"graphGauugeHumidity"}
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
                id={"graphGauugeTemperature"}
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
              <GraphGauge id={"graphGauugePh"} type={"ph"} data={data} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-5" style={{ padding: 20 }}>
        <Col sm={12}>
          <Card>
            <Card.Header>Humidity Control</Card.Header>
            <Card.Body>
              <GraphLine id={"graphWelcome1"} type={"humidity"} data={data} />
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12}>
          <Card>
            <Card.Header>PH Control</Card.Header>
            <Card.Body>
              <GraphLine id={"graphWelcome3"} type={"ph"} data={data} />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <Card.Header>Temperature Control</Card.Header>
            <Card.Body>
              <GraphLine
                id={"graphWelcome2"}
                type={"temperature"}
                data={data}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
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
          Table Log
          {/* <Typography variant="h4">

          </Typography> */}
        </span>
      </div>
      {/* </Grid> */}
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Box>
  );
}
