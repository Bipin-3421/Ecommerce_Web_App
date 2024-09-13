import React, { useEffect, useState } from "react";
import { addItem, fetchProducts } from "../app/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const Products = () => {
  const items = useSelector((state) => state.cart.items);
  // console.log(items);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(items);
  // console.log("filtered", filteredItems);
  const [sortBy, setSortBy] = useState("price-low-to-high");

  const status = useSelector((state) => state.cart.status);

  const categories = [
    { id: 1, category: "All" },
    { id: 2, category: "Sanitary" },
    { id: 3, category: "Faucets" },
    { id: 4, category: "Tiles" },
  ];

  // const price = items.map((item) => item.price);

  const [minPrice, setMinPrice] = useState(1500);
  const [maxPrice, setMaxPrice] = useState(20000);
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

  useEffect(() => {
    applyFilter();
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status, selectedCategory, sortBy]);

  // useEffect(() => {
  //   applyFilter();
  // }, [selectedCategory, sortBy]);

  // const filteredProducts = items.filter((product) => {
  //   return product.price <= maxPrice;
  // });

  // if no minPrice then !minPrice evaluates to true and the operation ends so for maxm too
  const applyFilter = () => {
    const filteredProducts = items.filter((product) => {
      const inPriceRange =
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice);
      // console.log(inPriceRange);
      if (selectedCategory === "All") {
        return inPriceRange;
      } else {
        return product.category === selectedCategory && inPriceRange;
      }
    });
    let sortedProducts = [...filteredProducts];
    if (sortBy === "price-low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredItems(sortedProducts);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    applyFilter(); // Apply filter when the sort option changes
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilter();
  };

  const handleApplyFilter = () => {
    applyFilter();
  };
  // Event handler for range slider change
  // const handleRangeChange = (e) => {
  //   const [min, max] = e.target.value.split(",");
  //   setMinPrice(parseInt(min));
  //   setMaxPrice(parseInt(max));
  //   applyFilter();
  // };

  const handleMinPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };

  return (
    <>
      <div className="  w-full  px-4  flex flex-wrap gap-10 bg-white  ">
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
          <div className="text-right text-emerald-600">
            <label className="mr-2">Sort By:</label>
            <select
              id="sortBy"
              value={sortBy}
              className="px-2 py-1 rounded-lg border focus:outline-none"
              onChange={handleSortChange}
            >
              <option value="price-low-to-high">Price Low to High</option>
              <option value="price-high-to-low">Price High to Low</option>
            </select>
          </div>
        </nav>
        <div className=" fixed top-[5rem] left-0 w-[8rem] h-[30rem] bg-slate-200 ">
          <input
            type="number"
            name="minimum"
            className="w-[5rem] ml-4 mt-4"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            name="maximum"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-[5rem] ml-4 mt-4"
          />
          <Slider
            min={0}
            max={20000}
            range
            value={[minPrice, maxPrice]}
            onChange={([min, max]) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            trackStyle={[{ backgroundColor: "#4CAF50" }]} // Change track color
            handleStyle={[
              {
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                // width: "1.5rem",
                // height: "1.5rem",
              }, // Change handle color and size
            ]}
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
          </div>
        </div>
        {filteredItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center ml-[5rem]">
            <img
              className="w-[20rem] h-[20rem] object-cover"
              src={`http://localhost:6001/${item.image} `}
              alt="img"
            />
            <h2>{item.title}</h2>
            <h3>Rs {item.price}</h3>
            <h4>{item.description}</h4>

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
