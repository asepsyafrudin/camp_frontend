import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import Plotly from "plotly.js-dist-min";
import { Badge } from "react-bootstrap";

function GraphGauge(props) {
  const { id, type, data } = props;

  if (data.length > 0) {
    if (type === "ph") {
      const currentValue = data[data.length - 1].ph;
      var dataGraph = [
        {
          type: "indicator",
          mode: "number+gauge",
          value: currentValue,
          gauge: {
            axis: {
              visible: true,
              range: [0, 14],
              dtick: 1,
              tickfont: {
                color: "green",
              },
              ticksuffix: "",
            },
            bar: {
              color: "blue",
            },
            steps: [
              {
                color: "yellow",
                range: [0, 5],
              },
              {
                color: "green",
                range: [5, 8],
              },
              {
                color: "red",
                range: [8, 14],
              },
            ],
          },
          number: {
            font: {
              color: "red",
            },
            suffix: "",
          },
        },
      ];

      var layout = {
        title: "PH Charts",
        margin: { t: 25, b: 25, l: 48, r: 48 },
        // annotations: [
        //   {
        //     showarrow: false,
        //     text: "<b>Text 1</b>",
        //     textangle: -62,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.068,
        //     y: 0.42,
        //   },
        //   {
        //     showarrow: false,
        //     text: "<b>Text 2</b>",
        //     textangle: 0,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.5,
        //     y: 0.8,
        //   },
        //   {
        //     showarrow: false,
        //     text: "<b>Text 3</b>",
        //     textangle: 62,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.935,
        //     y: 0.42,
        //   },
        // ],
      };

      Plotly.newPlot(id, dataGraph, layout);
    } else if (type === "temperature") {
      const currentValue = data[data.length - 1].temperature;

      var dataGraph = [
        {
          type: "indicator",
          mode: "number+gauge",
          value: currentValue,
          gauge: {
            axis: {
              visible: true,
              range: [0, 100],
              dtick: 10,
              tickfont: {
                color: "green",
              },
              ticksuffix: "",
            },
            bar: {
              color: "blue",
            },
            steps: [
              {
                color: "yellow",
                range: [0, 10],
              },
              {
                color: "green",
                range: [10, 40],
              },
              {
                color: "red",
                range: [40, 100],
              },
            ],
          },
          number: {
            font: {
              color: "red",
            },
            suffix: "",
          },
        },
      ];

      var layout = {
        title: "Temperature Charts (Celsius)",
        margin: { t: 25, b: 25, l: 48, r: 48 },
        // annotations: [
        //   {
        //     showarrow: false,
        //     text: "<b>Text 1</b>",
        //     textangle: -62,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.068,
        //     y: 0.42,
        //   },
        //   {
        //     showarrow: false,
        //     text: "<b>Text 2</b>",
        //     textangle: 0,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.5,
        //     y: 0.8,
        //   },
        //   {
        //     showarrow: false,
        //     text: "<b>Text 3</b>",
        //     textangle: 62,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.935,
        //     y: 0.42,
        //   },
        // ],
      };

      Plotly.newPlot(id, dataGraph, layout);
    } else if (type === "humidity") {
      const currentValue = data[data.length - 1].humidity;

      var dataGraph = [
        {
          type: "indicator",
          mode: "number+gauge",
          value: currentValue,
          gauge: {
            axis: {
              visible: true,
              range: [0, 100],
              dtick: 10,
              tickfont: {
                color: "green",
              },
              ticksuffix: "",
            },
            bar: {
              color: "blue",
            },
            steps: [
              {
                color: "yellow",
                range: [0, 40],
              },
              {
                color: "green",
                range: [40, 60],
              },
              {
                color: "red",
                range: [60, 100],
              },
            ],
          },
          number: {
            font: {
              color: "red",
            },
            suffix: "",
          },
        },
      ];

      var layout = {
        title: "Humidity Charts (%)",
        margin: { t: 25, b: 25, l: 48, r: 48 },
        // annotations: [
        //   {
        //     showarrow: false,
        //     text: "<b>Text 1</b>",
        //     textangle: -62,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.068,
        //     y: 0.42,
        //   },
        //   {
        //     showarrow: false,
        //     text: "<b>Text 2</b>",
        //     textangle: 0,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.5,
        //     y: 0.8,
        //   },
        //   {
        //     showarrow: false,
        //     text: "<b>Text 3</b>",
        //     textangle: 62,
        //     font: {
        //       color: "blue",
        //       size: 14,
        //     },
        //     bgcolor: "white",
        //     x: 0.935,
        //     y: 0.42,
        //   },
        // ],
      };

      Plotly.newPlot(id, dataGraph, layout);
    }
  }

  const statusFunction = () => {
    if (data.length > 0) {
      if (type === "ph") {
        const currentValue = data[data.length - 1].ph;
        if (currentValue > 8) {
          return (
            <h2>
              <Badge bg="danger">High</Badge>
            </h2>
          );
        } else if (currentValue > 5) {
          return (
            <h2>
              <Badge bg="success">Good</Badge>
            </h2>
          );
        } else {
          return (
            <h2>
              <Badge bg="warning">Low</Badge>
            </h2>
          );
        }
      } else if (type === "temperature") {
        const currentValue = data[data.length - 1].temperature;
        if (currentValue > 40) {
          return (
            <h2>
              <Badge bg="danger">High</Badge>
            </h2>
          );
        } else if (currentValue > 10) {
          return (
            <h2>
              <Badge bg="success">Good</Badge>
            </h2>
          );
        } else {
          return (
            <h2>
              <Badge bg="warning">Low</Badge>
            </h2>
          );
        }
      } else if (type === "humidity") {
        const currentValue = data[data.length - 1].humidity;
        if (currentValue > 60) {
          return (
            <h2>
              <Badge bg="danger">High</Badge>
            </h2>
          );
        } else if (currentValue > 40) {
          return (
            <h2>
              <Badge bg="success">Good</Badge>
            </h2>
          );
        } else {
          return (
            <h2>
              <Badge bg="warning">Low</Badge>
            </h2>
          );
        }
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div id={props.id}></div>
      {statusFunction()}
    </div>
  );
}

export default GraphGauge;

GraphGauge.propTypes = {
  id: Proptypes.string,
  type: Proptypes.string,
  data: Proptypes.array,
};
