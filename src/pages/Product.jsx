import React, { useEffect, useState } from "react";
import items from "../data/items";
import { addItem } from "../app/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Products = () => {
  const items = useSelector((state) => state.cart.items);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(items);

  const categories = [
    { id: 1, category: "All" },
    { id: 2, category: "Sanitary" },
    { id: 3, category: "Faucets" },
    { id: 4, category: "Tiles" },
  ];

  const price = items.map((item) => item.price);
  const [maxPrice, setMaxPrice] = useState("");

  const [minPrice, setMinPrice] = useState("");
  // const handleMaxPriceChange = (e) => {
  //   setMaxPrice(parseFloat(e.target.value));
  // };
  // console.log(price);
  // 1 way
  // console.log(Math.max.apply(Math, price));

  // // 2nd way
  // let maxprice = price.reduce(
  //   (accumulator, current) => Math.max(accumulator, current),
  //   0
  // );
  // console.log(maxprice);

  //3rd way

  // const maxPrice = Math.max(...price);
  // console.log(maxPrice);

  const dispatch = useDispatch();

  // const filteredProducts = items.filter((product) => {
  //   return product.price <= maxPrice;
  // });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilter(category);
  };

  const handleApplyFilter = () => {
    applyFilter(selectedCategory);
  };

  // if no minPrice then !minPrice evaluates to true and the operation ends so for maxm too
  const applyFilter = (selectedCategory) => {
    const filteredProducts = items.filter((product) => {
      const inPriceRange =
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice);
      console.log(inPriceRange);
      if (selectedCategory === "All") {
        return inPriceRange;
      } else {
        return product.category === selectedCategory && inPriceRange;
      }
    });
    setFilteredItems(filteredProducts);
  };

  return (
    <>
      <div className=" mt-[5rem] w-full  p-6  flex flex-wrap gap-10 bg-white  ">
        <nav className="w-[80vw] text-center text-red border-2 text-lime-800  text-2xl">
          <ul className="flex justify-between ml-[9rem]">
            {categories.map((product) => (
              <li
                key={product.id}
                onClick={() => handleCategoryChange(product.category)}
                className={`cursor-pointer ${
                  selectedCategory === product.category
                    ? "text-[salmon]  font-bold"
                    : ""
                }`}
              >
                {product.category}
              </li>
            ))}
          </ul>
        </nav>
        <div className=" fixed top-[5rem] left-0 w-[8rem] h-[30rem] bg-indigo-500 ">
          <input
            type="number"
            name="minimum"
            placeholder="minimum Value"
            className="w-[5rem] ml-4 mt-4"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            name="maximum"
            placeholder="maximum Value"
            className="w-[5rem] ml-4 mt-4"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button
            onClick={handleApplyFilter}
            className="m-2 p-2 bg-red-500 text-slate-100 "
          >
            Apply
          </button>
          <h2 className="text-slate-200 font-bold ml-2">Price</h2>
          <h3 className="text-slate-200 font-bold ml-2">{maxPrice}</h3>
          <div>
            <label className="text-slate-200 ml-2">Product</label>
            {/* <input
              type="range"
              id="range"
              name="Product_Range"
              min="0"
              max="20000"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="w-[5rem] block"
            /> */}
          </div>
        </div>
        {filteredItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center ml-[5rem]">
            <img className="w-[15rem] " src={item.img} alt="img" />
            <h2>{item.title}</h2>
            <h3>Rs {item.price}</h3>

            <button
              onClick={() => dispatch(addItem(item))}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
