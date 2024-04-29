import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCartTotal } from "../app/cartSlice";
const Header = () => {
  const navigate = useNavigate();
  const product = useSelector((state) => state.cart.item);
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [product]);
  return (
    <header className=" bg-[#000000] fixed top-0  w-full  h-[5rem] ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <h1
          onClick={() => navigate("/")}
          className="ml-3 text-[#DDE6ED] font-bold text-3xl cursor-pointer "
        >
          Pahari Traders
        </h1>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to="/product"
            className="mr-5 hover:text-[#ff0000] text-xl text-[#DDE6ED]"
          >
            Product
          </Link>
          <Link
            to="/cart"
            className="mr-5 text-xl  hover:text-[#ff0000] text-[#DDE6ED]"
          >
            Cart
          </Link>
        </nav>

        <span className=" ml-4 text-[#DDE6ED] text-2xl font-bold">
          Cart Count:{totalQuantity}
        </span>
      </div>
    </header>
  );
};

export default Header;
