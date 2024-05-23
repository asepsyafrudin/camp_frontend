import React, { useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import PropTypes from "prop-types";

function GraphLine(props) {
  const { id, type, data } = props;
  if (data.length > 0) {
    const xData = data.map((item) => item.id);
    if (type === "ph") {
      const yData = data.map((item) => item.ph);

      let layout = {
        title: "PH Charts",
        yaxis: {
          range: [0, 14],
          type: "linear",
        },
      };

      Plotly.newPlot(
        props.id,
        [
          {
            x: xData,
            y: yData,
            type: "scatter",
            mode: "lines",
          },
        ],
        layout
      );
    } else if (type === "temperature") {
      const yData = data.map((item) => item.temperature);
      let layout = {
        title: "Temperature Charts",
        yaxis: {
          range: [0, 80],
          type: "linear",
        },
      };
      Plotly.newPlot(
        props.id,
        [
          {
            x: xData,
            y: yData,
            type: "scatter",
            mode: "lines",
          },
        ],
        layout
      );
    } else if (type === "humidity") {
      const yData = data.map((item) => item.humidity);
      let layout = {
        title: "Humidity Charts",
        yaxis: {
          range: [0, 100],
          type: "linear",
        },
      };
      Plotly.newPlot(
        props.id,
        [
          {
            x: xData,
            y: yData,
            type: "scatter",
            mode: "lines",
          },
        ],
        layout
      );
    }
  }

  return (
    <div>
      <div id={id}></div>
    </div>
  );
}

export default GraphLine;

GraphLine.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
};
