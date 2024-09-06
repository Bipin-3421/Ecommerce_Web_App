import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:6001/api/products/admin/product")
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.product);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [products, newProduct]);

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files[0],
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }
    const token = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:6001/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success)
          setProducts([...products, response.data.product]);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: "",
        });
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border p-2 w-full mb-2"
            required
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border p-2 w-full mb-2"
            required
          />
          <button className="bg-blue-500 text-white p-2 rounded mt-2">
            Add Product
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <img
                src={`http://localhost:6001/${product.image}`}
                alt={product.name}
                className="w-full h-32 object-cover mb-2"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="font-semibold">Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
