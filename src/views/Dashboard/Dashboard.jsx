import s from "./style.module.css";
import { DataAPI } from "../../api/data.js";
import { LayoutMenu } from "../../components/LayoutMenu/LayoutMenu.jsx";
import { VerticalLayout } from "../../components/VerticalLayout/VerticalLayout.jsx";
import { USER12_URL, USER18_URL } from "../../config.js";
import { useEffect, useState } from "react";

export function Dashboard({ user }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const userFirstName = await DataAPI.getUsers(user);
        setUserName(userFirstName.data.userInfos.firstName);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <LayoutMenu />
      <VerticalLayout />
      <section className={s.section}>
        <h1 className={s.title}>
          Bonjour <span className={s.name}>{userName}</span>
        </h1>
        <p className={s.text}>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </section>
    </>
  );
}
