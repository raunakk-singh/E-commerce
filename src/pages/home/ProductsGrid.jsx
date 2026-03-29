import { Product } from "./product";
export function ProductGrid({ products, setCart ,loadCart}) {
  return (
    <>
      <div className="products-grid">
        {products.map((product) => {
          
          return (
           <Product key={product.id} product={product} loadCart={loadCart}/>
          );

        })}
      </div>
    </>
  );

}
