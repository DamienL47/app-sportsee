// Importation des modules et composants nécessaires depuis les bibliothèques et fichiers locaux
import s from "./style.module.css"; // Styles spécifiques au composant
import { DataAPI } from "../../api/data.js"; // Module d'API pour récupérer les données
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts"; // Composants de la bibliothèque Recharts pour créer le graphique
import { useEffect, useState } from "react"; // Hooks React pour gérer les effets et états
import { USER_AVERAGE } from "../../config"; // Constantes de configuration

// Composant principal pour le graphique en ligne
export function UserLineChart({ user }) {
  // État pour stocker la durée moyenne des sessions
  const [average, setAverage] = useState([]);

  // Jours de la semaine pour l'axe X du graphique
  const day = ["L", "M", "M", "J", "V", "S", "D"];

  // Effet secondaire pour récupérer les données de durée moyenne des sessions utilisateur
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

  // Assignation des jours de la semaine aux données de durée moyenne
  if (average) {
    average.map((item, index) => {
      item.day = day[index];
    });
  }

  // Composant personnalisé pour l'affichage du tooltip du graphique
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

  // Composant personnalisé pour l'affichage des étiquettes de l'axe X
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

  // État pour stocker les données du point survolé sur le graphique
  const [hoveredData, setHoveredData] = useState(null);

  // Gestionnaire d'événement pour suivre le mouvement de la souris sur le graphique
  const handleMouseMove = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const containerHeight = event.currentTarget.clientHeight;

    setHoveredData({ x, y, overlayHeight: containerHeight - y });
  };

  // Rendu du composant
  return (
    <>
      <div className={s.linechart} onMouseDown={handleMouseMove}>
        {/* Overlay pour mettre en surbrillance la partie du graphique survolée */}
        <div
          className={s.overlay}
          style={{
            background: hoveredData ? "rgba(0, 0, 0, 0.5)" : "transparent",
            width: hoveredData ? `calc(100% - ${hoveredData.x}px)` : "100%",
            left: hoveredData ? `${hoveredData.x}px` : 0,
          }}
        />
        {/* Titre du graphique */}
        <h3 className={s.subtitle}>Durée moyenne des sessions</h3>
        {/* Conteneur réactif pour le graphique */}
        <ResponsiveContainer width="100%" height="50%">
          {/* Composant principal du graphique en ligne avec ses composants internes */}
          <LineChart data={average} style={{ marginTop: "30px" }}>
            {/* Définition du dégradé pour la ligne du graphique */}
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
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
            {/* Ligne du graphique avec ses propriétés et options */}
            <Line
              type="natural"
              dataKey="sessionLength"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
            {/* Point de référence sur la ligne du graphique */}
            <ReferenceDot />
            {/* Axe X du graphique avec les jours de la semaine comme étiquettes */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
              tick={<CustomXAxisTick />}
            />
            {/* Tooltip personnalisé pour afficher les informations au survol */}
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
