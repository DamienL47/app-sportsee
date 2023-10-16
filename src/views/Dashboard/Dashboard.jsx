import s from "./style.module.css";
import { DataAPI } from "../../api/data.js";
import { LayoutMenu } from "../../components/LayoutMenu/LayoutMenu.jsx";
import { VerticalLayout } from "../../components/VerticalLayout/VerticalLayout.jsx";
import { useEffect, useState } from "react";
import { UserLineChart } from "../../components/UserLineChart/UserLineChart";
import { UserBarChart } from "../../components/UserBarChart/UserBarChart";
import { UserRadarChart } from "../../components/UserRadarChart/UserRadarChart";
import { UserPieChart } from "../../components/UserPieChart/UserPieChart";
import { UserEnergy } from "../../components/UserEnergy/UserEnergy";

export function Dashboard({ user }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getName() {
      try {
        const userFirstName = await DataAPI.getUsers(user);
        setUserName(userFirstName.data.userInfos.firstName);
      } catch (error) {
        console.error(error);
      }
    }

    getName();
  }, [user]);

  return (
    <>
      <LayoutMenu />
      <div className={s.dashboardContainer}>
        <VerticalLayout />
        <section className={s.section}>
          <h1 className={s.title}>
            Bonjour <span className={s.name}>{userName}</span>
          </h1>
          <p className={s.text}>
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
          <div className={s.containerCharts}>
            <div className={s.barChart}>
              <UserBarChart user={user} />
            </div>
            <div className={s.treeCharts}>
              <UserLineChart user={user} />
              <UserRadarChart user={user} />
              <UserPieChart user={user} />
            </div>
          </div>
        </section>
        <div className={s.energyCount}>
          <UserEnergy user={user} />
        </div>
      </div>
    </>
  );
}
