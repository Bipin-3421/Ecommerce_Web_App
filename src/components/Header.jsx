import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Ecommerce_logo.png";
import { PiSignIn } from "react-icons/pi";

const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  return (
    <header className=" h-[228.283px]">
      <nav className="w-full h-[56px]   bg-black py-4 font-serif text-yellow-50">
        <div className="m-auto px-3 max-w-[1329px]">
          <div className="flex justify-between items-center">
            <p className="flex justify-center gap-1 ">
              Need help?
              <a href="http://">01-5350440</a>| <a href="http://"> Contact</a>
            </p>
            <div>
              <span>Buy Lenovo </span>
              <span className="text-green-500">Legion GO</span>
            </div>
            <div className="flex gap-4 items-center">
              <PiSignIn className="w-[20px] h-[20px]" />
              <li className="text-white text-[20px] ">
                <Link to="/login">Login</Link>
              </li>
              <li className="text-white text-[20px]">
                <Link to={"/signup"}> SignUp</Link>
              </li>
            </div>
          </div>
        </div>
      </nav>

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

            {role && role === "admin" && (
              <>
                <li>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/product">Admin</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
