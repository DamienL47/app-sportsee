import s from "./style.module.css";
import { DataAPI } from "../../api/data.js";
import { useEffect, useState } from "react";
import calories from "../../assets/images/calorie.png";
import glucides from "../../assets/images/glucides.png";
import lipides from "../../assets/images/lipides.png";
import proteines from "../../assets/images/proteines.png";

export function UserEnergy({ user }) {
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    async function getUserInfos() {
      try {
        const userData = await DataAPI.getUsers(user);
        setUserInfos(userData.data.keyData);
        console.log(userInfos);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfos();
  }, [user]);
  const kCal = userInfos.calorieCount / 1000;
  function parsedData(data) {
    return parseFloat(data).toFixed(3);
  }
  return (
    <>
      <div className={s.container}>
        <div className={s.blocContainer}>
          <img className={s.iconeKcal} src={calories} alt="Calories" />
          <div className={s.containerEnergy}>
            <p className={`${s.energy}, ${s.paraf}`}>{parsedData(kCal)}kCal</p>
            <span className={s.subtitle}>Calories</span>
          </div>
        </div>
        <div className={s.blocContainer}>
          <img className={s.iconeProt} src={proteines} alt="proteines" />
          <div className={s.containerEnergy}>
            <p className={`${s.energy}, ${s.paraf}`}>
              {userInfos.proteinCount}g
            </p>
            <span className={s.subtitle}>Proteines</span>
          </div>
        </div>
        <div className={s.blocContainer}>
          <img className={s.iconeGlu} src={glucides} alt="glucides" />
          <div className={s.containerEnergy}>
            <p className={`${s.energy}, ${s.paraf}`}>
              {userInfos.carbohydrateCount}g
            </p>
            <span className={s.subtitle}>Glucides</span>
          </div>
        </div>
        <div className={s.blocContainer}>
          <img className={s.iconeLip} src={lipides} alt="lipides" />
          <div className={s.containerEnergy}>
            <p className={`${s.energy}, ${s.paraf}`}>{userInfos.lipidCount}g</p>
            <span className={s.subtitle}>Lipides</span>
          </div>
        </div>
      </div>
    </>
  );
}
