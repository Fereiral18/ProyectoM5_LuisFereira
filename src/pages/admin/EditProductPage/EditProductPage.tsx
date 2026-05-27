import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../../types/products.type";
import {
  getProductById,
  updateProduct,
} from "../../../services/product.service";
import "./style.css";

export const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const data = await getProductById(id);

        if (!data) return;

        setProduct(data);
        setName(data.name);
        setPrice(String(data.price));
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      setSaving(true);

      await updateProduct(id, {
        name,
        price: Number(price),
        imageUrl,
      });

      alert("Producto actualizado");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Error actualizando producto");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="message">Cargando producto...</p>;
  }

  if (!product) {
    return <p className="message">Producto no encontrado</p>;
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Editar producto</h1>

        <form className="form" onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="field">
            <label className="label">Nombre</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* PRICE */}
          <div className="field">
            <label className="label">Precio</label>
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* IMAGE */}
          <div className="field imageWrapper">
            <label className="label">Imagen actual</label>
            <img className="image" src={imageUrl} alt={name} />
          </div>

          <button className="button" type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
};