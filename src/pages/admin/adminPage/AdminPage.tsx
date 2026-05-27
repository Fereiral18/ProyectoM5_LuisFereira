import { useEffect, useState } from "react";

import { useAdminAnalytics } from "../../../hooks/useAnalitycs";
import { useAuthService } from "../../../hooks/useAuth";

import {
  approveOrder,
  cancelOrder,
  deleteOrder,
} from "../../../services/orders.service";

import "./style.css";

export const AdminPage = () => {
  const { orders, totalSales, ordersByDay, topProducts, loading } =
    useAdminAnalytics();

  const { user } = useAuthService();

  // =========================
  // FILTER STATE
  // =========================

  const [filter, setFilter] = useState<
    "all" | "pending" | "paid" | "cancelled"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);
  const pendingCount = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const paidCount = orders.filter((order) => order.status === "paid").length;

  const cancelledCount = orders.filter(
    (order) => order.status === "cancelled",
  ).length;

  const totalOrdersCount = orders.length;
  // =========================
  // ACTIONS
  // =========================

  const handleApprove = async (order) => {
    await approveOrder(order);
  };

  const handleCancel = async (order) => {
    await cancelOrder(order);
  };
  const handleDelete = async (orderId: string) => {
    const confirmDelete = window.confirm("¿Eliminar esta orden?");

    if (!confirmDelete) return;

    await deleteOrder(orderId);
  };
  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  if (loading) {
    return <div className="admin-loading">Cargando dashboard...</div>;
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* ========================= */}
      {/* TOTAL VENTAS */}
      {/* ========================= */}

      <section className="card highlight">
        <h2>Total ventas</h2>

        <h3>${totalSales.toFixed(2)}</h3>
      </section>

      {/* ========================= */}
      {/* ORDENES POR DIA */}
      {/* ========================= */}

      <section className="card">
        <h2>Órdenes por día</h2>

        <pre className="json-box">{JSON.stringify(ordersByDay, null, 2)}</pre>
      </section>

      {/* ========================= */}
      {/* TOP PRODUCTOS */}
      {/* ========================= */}

      <section className="card">
        <h2>Top productos</h2>

        <ul className="list">
          {topProducts.map((p) => (
            <li key={p.name} className="list-item">
              <span>{p.name}</span>

              <span className="badge">{p.count}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ========================= */}
      {/* ORDENES */}
      {/* ========================= */}

      <section className="card">
        <h2>Órdenes</h2>

        {/* ========================= */}
        {/* FILTERS */}
        {/* ========================= */}

        <div className="filters">
          <button
            className={filter === "all" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("all")}
          >
            {`📦 Todas ${totalOrdersCount}`}
          </button>

          <button
            className={
              filter === "pending" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setFilter("pending")}
          >
            {`⏳ Pendientes ${pendingCount}`}
          </button>

          <button
            className={filter === "paid" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("paid")}
          >
            {`✅ Paid ${paidCount}`}
          </button>

          <button
            className={
              filter === "cancelled" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setFilter("cancelled")}
          >
            {`❌ Cancelled ${cancelledCount}`}
          </button>
        </div>

        {/* ========================= */}
        {/* ORDERS GRID */}
        {/* ========================= */}

        <div className="orders-grid">
          {paginatedOrders.map((order) => (
            <div key={order.id} className="order-card">
              <p>
                <strong>ID:</strong> {order.id}
              </p>

              <p>
                <strong>Total:</strong> ${order.total}
              </p>

              <p>
                <strong>Cliente:</strong>{" "}
                {order.user?.displayName || "Sin nombre"}
              </p>
              <p>
                <strong>Email:</strong> {order.user?.email || "Sin email"}
              </p>
              {/* ========================= */}
              {/* ITEMS */}
              {/* ========================= */}

              <div className="order-items">
                {order.items?.map((item) => (
                  <div key={item.id} className="order-item">
                   
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="order-item-image"
                    />

                    <div className="order-item-info">
                      <p className="order-item-name">{item.name}</p>

                      <p className="order-item-qty">
                        Cantidad: {item.quantity}
                      </p>

                      <p className="order-item-price">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ========================= */}
              {/* STATUS */}
              {/* ========================= */}

              <span className={`status ${order.status}`}>
                {order.status === "pending" && "⏳ Pendiente"}

                {order.status === "paid" && "✅ Aprobada"}

                {order.status === "cancelled" && "❌ Cancelada"}
              </span>

              {/* ========================= */}
              {/* ACTIONS */}
              {/* ========================= */}

              {order.status === "pending" && (
                <div className="actions">
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(order)}
                  >
                    Aceptar
                  </button>

                  <button
                    className="btn-cancel"
                    onClick={() => handleCancel(order)}
                  >
                    Cancelar
                  </button>
                </div>
              )}
              {order.status === "cancelled" && (
                <div className="actions">
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(order.id)}
                  >
                    🗑 Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          <span className="page-info">
            Página {currentPage} de {totalPages}
          </span>

          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </section>
    </div>
  );
};
