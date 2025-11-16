// src/componentes/ClimaFooter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClimaFooter() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=2.93&longitude=-75.28&current_weather=true"
        );
        setClima(response.data.current_weather);
      } catch (error) {
        console.error("Error al obtener el clima:", error);
      }
    };

    fetchClima();
  }, []);

  return (
    <div className="uk-text-right">
      {clima ? (
        <p style={{ margin: "0", fontSize: "14px" }}>
          {clima.temperature}°C en Neiva | Venio: {clima.windspeed} km/h
        </p>
      ) : (
        <p style={{ margin: "0", fontSize: "14px" }}>Cargando clima...</p>
      )}
    </div>
  );
}