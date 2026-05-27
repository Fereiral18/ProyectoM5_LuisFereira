import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { deleteProduct } from "../../../services/product.service";
import "./style.css";

export const AdminProductsPage = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm("¿Eliminar producto?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(productId);
      alert("Producto eliminado");
    } catch (error) {
      console.error(error);
      alert("Error eliminando producto");
    }
  };

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <h1 className="title">Panel de Productos</h1>

        <Link to="/admin/products/create">
          <button className="createButton">
            + Crear Producto
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    className="image"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </td>

                <td>{product.name}</td>
                <td>${product.price}</td>

                <td>
                  <div className="actions">
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <button className="editButton">Editar</button>
                    </Link>

                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(product.id)}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY */}
      {products.length === 0 && (
        <p className="empty">No hay productos todavía</p>
      )}
    </div>
  );
};