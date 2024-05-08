import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Ecommerce_logo.png";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-[7rem]">
      <div>
        <span className="bg-[#f26526] block text-center text-white">
          One Stop Construction Solution
        </span>
      </div>

      <nav className="flex justify-evenly items-center">
        <img
          src={logo}
          alt="logo"
          className="w-[6rem] cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div>
          <input
            type="text"
            className="w-[20rem] h-[2rem] mr-4 border-2 border-black"
          />
          <button className="p-2 border-2 border-slate-100 text-slate-800">
            search
          </button>
        </div>

        <div className="text-2xl text-slate-900 ">
          <ul className="flex gap-8">
            <li>
              <Link to="/product">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
