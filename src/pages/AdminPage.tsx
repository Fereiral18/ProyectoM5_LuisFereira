import { useAdminAnalytics } from "../hooks/useAnalitycs";


export const AdminPage = () => {
  const {
    orders,
    totalSales,
    ordersByDay,
    topProducts,
    loading,
  } = useAdminAnalytics();

  if (loading) return <p>Cargando dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* 💰 TOTAL VENTAS */}
      <div>
        <h2>Total ventas</h2>
        <h3>${totalSales.toFixed(2)}</h3>
      </div>

      {/* 📅 ÓRDENES POR DÍA */}
      <div>
        <h2>Órdenes por día</h2>
        <pre>{JSON.stringify(ordersByDay, null, 2)}</pre>
      </div>

      {/* 🔥 TOP PRODUCTOS */}
      <div>
        <h2>Top productos</h2>
        <ul>
          {topProducts.map((p) => (
            <li key={p.name}>
              {p.name} - {p.count}
            </li>
          ))}
        </ul>
      </div>

      {/* 📦 LISTA DE ORDENES */}
      <div>
        <h2>Órdenes</h2>

        {orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ddd", margin: 10 }}>
            <p>ID: {order.id}</p>
            <p>Total: ${order.total}</p>
            <p>Estado: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};