import s from "./style.module.css";
import meditation from "../../assets/images/meditation.png";
import natation from "../../assets/images/natation.png";
import velo from "../../assets/images/velo.png";
import muscu from "../../assets/images/muscu.png";

export function VerticalLayout() {
  return (
    <>
      <div className={s.container}>
        <div className={s.icones}>
          <img className={s.icone} src={meditation} alt="icone méditation" />
          <img className={s.icone} src={natation} alt="icone natation" />
          <img className={s.icone} src={velo} alt="icone velo" />
          <img className={s.icone} src={muscu} alt="icone musculation" />
        </div>
        <p className={s.copyright}>Copyright, SportSee 2020</p>
      </div>
    </>
  );
}
