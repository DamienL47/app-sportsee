import s from "./style.module.css";
import { DataAPI } from "../../api/data.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { USER_ACTIVITY } from "../../config";

export function UserBarChart({ user }) {
  const [activity, setActivity] = useState([]);
  useEffect(() => {
    async function getActivity() {
      try {
        const userActivity = await DataAPI.getDataInfos(user, USER_ACTIVITY);
        setActivity(userActivity.data.sessions);
      } catch (error) {
        console.log(error);
      }
    }
    getActivity();
  }, [user]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={s.customTooltip}>
          <p className={s.labelTooltip}>{` ${payload[0].value}kg`}</p>
          <p className={s.labelTooltip}>{` ${payload[1].value}Kcal`}</p>
        </div>
      );
    }

    return null;
  };
  const legend = ["Poids (Kg)", "Calorie brûlées (Kcal)"];
  const customLegend = () => {
    return (
      <>
        <div className={s.containerKg}>
          <span className={s.dotKg}></span>
          <p className={s.labelLegendKg}>{legend[0]}</p>
        </div>
        <div className={s.containerKcal}>
          <span className={s.dotKcal}></span>
          <p className={s.labelLegendKcal}>{legend[1]}</p>
        </div>
      </>
    );
  };
  const customAxisX = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <>
      <div className={s.barchart}>
        <h3 className={s.subtitle}>Activité quotidienne</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={activity} barGap={10}>
            <CartesianGrid strokeDasharray="1" vertical={false} />
            <XAxis
              dataKey={customAxisX.value}
              stroke="#9B9EAC"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              tickFormatter={(index) => customAxisX[index]}
            />
            <YAxis
              stroke="#9B9EAC"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              style={{ fontSize: "12px" }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              content={customLegend}
              wrapperStyle={{
                position: "absolute",
                top: "-40px",
                right: "30px",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="kilogram"
              fill="#282D30"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="calories"
              fill="#E60000"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* <BarChart width={580} height={180} data={activity} barGap={10}>
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <XAxis
            dataKey={customAxisX.value}
            stroke="#9B9EAC"
            tickLine={false}
            axisLine={false}
            tickMargin={15}
            tickFormatter={(index) => customAxisX[index]}
          />
          <YAxis
            stroke="#9B9EAC"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={15}
            style={{ fontSize: "12px" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            content={customLegend}
            wrapperStyle={{
              position: "absolute",
              top: "-40px",
              right: "30px",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            barSize={10}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            barSize={10}
            radius={[10, 10, 0, 0]}
          />
        </BarChart> */}
      </div>
    </>
  );
}
