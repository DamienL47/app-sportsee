import s from "./style.module.css";
import { DataAPI } from "../../api/data.js";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export function UserPieChart({ user }) {
  const [userScore, setUserScore] = useState([]);
  useEffect(() => {
    async function getUserScore() {
      try {
        const userData = await DataAPI.getUsers(user);
        const score = userData.data.score
          ? userData.data.score
          : userData.data.todayScore;
        setUserScore(score);
      } catch (error) {
        console.log(error);
      }
    }
    getUserScore();
  }, [user]);
  const dataScore = [{ value: userScore }];
  const startAngle = 90;
  const endAngle = startAngle + userScore * 360;

  const customLabel = () => {
    const score = userScore ? userScore : 0;
    return (
      <>
        <p className={s.customLabel}>
          <span className={s.customScore}>{`${score * 100}%`}</span> de votre
          objectif
        </p>
      </>
    );
  };

  return (
    <>
      <div className={s.containerPieChart}>
        <h3 className={s.subtitle}>Score</h3>
        {customLabel()}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={358} height={358}>
            <Pie
              data={dataScore}
              cx="50%"
              cy="50%"
              outerRadius={65}
              innerRadius={55}
              startAngle={startAngle}
              endAngle={endAngle}
              dataKey="value"
              labelLine={false}
              clipPath="url(#rounded-mask)"
              cornerRadius={50}
            >
              <Cell fill="#E60000" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
