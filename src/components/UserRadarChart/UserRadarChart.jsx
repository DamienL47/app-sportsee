import s from "./style.module.css";
import { DataAPI } from "../../api/data.js";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { USER_PERFORMANCE } from "../../config";

export function UserRadarChart({ user }) {
  const [performance, setPerformance] = useState([]);
  useEffect(() => {
    async function getPerformance() {
      try {
        const userPerformance = await DataAPI.getDataInfos(
          user,
          USER_PERFORMANCE
        );
        setPerformance(userPerformance.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPerformance();
  }, [user]);

  const kindValue = [
    {
      1: "Cardio",
      2: "Energy",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité",
    },
  ];

  return (
    <>
      <div className={s.radarChart}>
        <ResponsiveContainer width="100%" height="90%">
          <RadarChart
            cx="49%"
            cy="55%"
            outerRadius={90}
            data={performance.data}
          >
            <PolarGrid radialLines={false} />
            <PolarAngleAxis
              dataKey="kind"
              tick={{ fontSize: 13 }}
              tickFormatter={(value) => kindValue[0][value]}
              stroke="#fff"
              axisLine={false}
              tickLine={false}
            />
            <PolarRadiusAxis domain={[0, 100]} axisLine={false} tick={false} />
            <Radar
              name=""
              dataKey="value"
              stroke="#FF0000"
              fill="#FF0000"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
