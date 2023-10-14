import s from "./style.module.css";
import { DataAPI } from "../../api/data.js";
import { LineChart, Line, Tooltip, XAxis } from "recharts";
import { useEffect, useState } from "react";
import { USER_AVERAGE } from "../../config";

export function UserLineChart({ user }) {
  const [average, setAverage] = useState([]);
  const day = ["L", "M", "M", "J", "V", "S", "D"];
  useEffect(() => {
    async function getAverage() {
      try {
        const userAverage = await DataAPI.getDataInfos(user, USER_AVERAGE);
        setAverage(userAverage.data.sessions);
      } catch (error) {
        console.log(error);
      }
    }
    getAverage();
  }, [user]);

  if (average) {
    average.map((item, index) => {
      item.day = day[index];
    });
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={s.customTooltip}>
          <p className={s.labelTooltip}>{` ${payload[0].value} min`}</p>
        </div>
      );
    }

    return null;
  };
  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={5}
          y={0}
          dy={20}
          textAnchor="end"
          fill="white"
          className={s.customXAxis}
          style={{ letterSpacing: "2px" }}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <>
      <div className={s.linechart}>
        <h3 className={s.subtitle}>Durée moyenne des sessions</h3>
        <LineChart
          width={300}
          height={160}
          data={average}
          style={{ marginTop: "50px" }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "white", stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "white", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <Line
            type="basis"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={false}
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
            tick={<CustomXAxisTick />}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </div>
    </>
  );
}
