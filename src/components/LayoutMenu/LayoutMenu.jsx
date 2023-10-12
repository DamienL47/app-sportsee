import s from "./style.module.css";
import logo from "../../assets/images/logo.png";

export function LayoutMenu() {
  return (
    <>
      <div className={s.container}>
        <div className={s.logo}>
          <img src={logo} alt="Logo SportSee" />
        </div>
        <nav className={s.nav}>
          <ul className={s.menu}>
            <li className={s.item}>Accueil</li>
            <li className={s.item}>Profil</li>
            <li className={s.item}>Réglage</li>
            <li className={s.item}>Communauté</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
