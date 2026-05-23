import { useProducts } from "../hooks/useProducts";

export const ListProducts = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <section>
      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <img src={product.imageUrl} width="200px" height="200px" alt="" />
              <p>{product.stock}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
