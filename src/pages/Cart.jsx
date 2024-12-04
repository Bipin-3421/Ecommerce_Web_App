import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCartTotal,
} from "../app/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cart.item);
  const totalAmount = useSelector((state) => state.cart.totalPrice);
  console.log(totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  console.log(totalQuantity);

  // console.log(product);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [product]);

  return (
    <div className="w-full p-8  bg-white">
      {product.map((item) => (
        <div
          key={item.id}
          className=" border-2 flex justify-between items-center"
        >
          <div>
            <img className="w-[150px]" src={item.img} alt="img" />
            <h2>{item.title}</h2>
            <h3>Rs {item.price}</h3>
            <button
              onClick={() => dispatch(removeItem(item.id))}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-2"
            >
              Remove
            </button>
          </div>
          <div>
            <button
              onClick={() => dispatch(increaseItemQuantity(item.id))}
              className="p-2 bg-rose-800 rounded-2xl text-slate-200 mr-2"
            >
              +
            </button>
            {item.quantity}
            <button
              onClick={() => dispatch(decreaseItemQuantity(item.id))}
              className="p-2 bg-rose-800 rounded-2xl text-slate-200 ml-2"
            >
              -
            </button>
          </div>
        </div>
      ))}
      <div className="bg-slate-800 text-red-400 w-full  ">
        <div className=" w-full mx-auto">
          <h2>Summary</h2>
          <h3>TotalPrice: {totalAmount}</h3>
          <h3>TotalQuantity: {totalQuantity}</h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
