import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import Plotly from "plotly.js-dist-min";
import { Badge } from "react-bootstrap";

function GraphGauge(props) {
  const { id, type, data } = props;

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      if (type === "ph") {
        const currentValue = data[data.length - 1].ph;
        if (currentValue > 8) {
          setStatus("High");
        } else if (currentValue > 5) {
          setStatus("Good");
        } else {
          setStatus("Low");
        }
      } else if (type === "temperature") {
        const currentValue = data[data.length - 1].temperature;
        if (currentValue > 40) {
          setStatus("High");
        } else if (currentValue > 10) {
          setStatus("Good");
        } else {
          setStatus("Low");
        }
      } else if (type === "humidity") {
        const currentValue = data[data.length - 1].humidity;
        if (currentValue > 60) {
          setStatus("High");
        } else if (currentValue > 40) {
          setStatus("Good");
        } else {
          setStatus("Low");
        }
      }
    }
  }, [data.length]);

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
                color: "red",
                range: [0, 5],
              },
              {
                color: "pink",
                range: [5, 8],
              },
              {
                color: "purple",
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
                color: "red",
                range: [0, 10],
              },
              {
                color: "pink",
                range: [10, 40],
              },
              {
                color: "purple",
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
                color: "red",
                range: [0, 40],
              },
              {
                color: "pink",
                range: [40, 60],
              },
              {
                color: "purple",
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

  return (
    <div style={{ textAlign: "center" }}>
      <div id={props.id}></div>
      {status === "High" && (
        <h2>
          <Badge bg="danger">High</Badge>
        </h2>
      )}
      {status === "Good" && (
        <h2>
          <Badge bg="success">Good</Badge>
        </h2>
      )}
      {status === "Low" && (
        <h2>
          <Badge bg="warning">Low</Badge>
        </h2>
      )}
    </div>
  );
}

export default GraphGauge;

GraphGauge.propTypes = {
  id: Proptypes.string,
  type: Proptypes.string,
  data: Proptypes.array,
};
