import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function AdminDashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie"],
        datasets: [
          {
            label: "Ventas ($)",
            data: [120, 190, 300, 500, 200],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // IMPORTANTE para controlar altura
      },
    });
  }, []);

 return (
<div className="uk-container uk-margin-large-top">

  <h3 className="uk-text-center uk-text-bold uk-text-2xl uk-margin-bottom">
    Resumen General
  </h3>

  <div 
    className="uk-card uk-card-default uk-card-body uk-width-2-3 uk-margin-auto uk-box-shadow-large" 
    style={{ border: "2px solid #ccc", borderRadius: "12px" }}
  >

    <table 
      className="uk-table uk-table-divider uk-table-hover uk-table-middle" 
      style={{ fontSize: "1.15rem" }}
    >
      <thead>
        <tr style={{ borderBottom: "3px solid #333" }}>
          <th className="uk-text-bold uk-text-emphasis">MÉTRICA</th>
          <th className="uk-text-bold uk-text-emphasis">VALOR</th>
        </tr>
      </thead>

      <tbody>
        <tr style={{ background: "#f7f7f7" }}>
          <td className="uk-text-bold">Usuarios</td>
          <td className="uk-text-bold uk-text-primary">120</td>
        </tr>

        <tr>
          <td className="uk-text-bold">Ventas Hoy</td>
          <td className="uk-text-bold uk-text-primary">$1.2M</td>
        </tr>

        <tr style={{ background: "#f7f7f7" }}>
          <td className="uk-text-bold">Pendientes</td>
          <td className="uk-text-bold uk-text-primary">8</td>
        </tr>
      </tbody>
    </table>

  </div>

    {/* GRÁFICO */}
    <div className="mt-10 bg-white p-4 rounded shadow" style={{ height: "300px",padding:"60px" }}>
      <h3 className="text-xl font-semibold mb-2 text-center">Actividad Reciente</h3>
      <canvas ref={chartRef}></canvas>
    </div>

  </div>
);
}
