import Products from "./Products";

export default function ProductsGrid({ products }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return <Products key={product.id} product={product} />;
      })}
    </div>
  );
}
