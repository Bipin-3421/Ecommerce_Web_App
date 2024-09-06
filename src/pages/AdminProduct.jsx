import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../app/cartSlice";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchProducts());
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-center text-slate-800 text-3xl text-bold">
        Products
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <h2 className="text-red-700 font-bold text-2xl">{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img
              src={`http://localhost:6001/${product.image}`}
              alt={product.name}
              className="w-40"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProduct;
