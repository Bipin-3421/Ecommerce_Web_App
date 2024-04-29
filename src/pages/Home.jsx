import React from "react";
import Carousel from "../components/Carousel";
import car1 from "../assets/car-1.jpg";
import car2 from "../assets/car-2.jpg";
import car3 from "../assets/car-3.jpg";
import car4 from "../assets/car-4.jpg";
import car5 from "../assets/car-5.jpg";

const Images = [car1, car2, car3, car4, car5];

const Home = () => {
  return (
    <div
      className="mt-[10rem] mx-auto"
      style={{
        maxWidth: "1200px",
        width: "100%",
        aspectRatio: "10/6",
      }}
    >
      <Carousel imageUrls={Images} />
    </div>
  );
};

export default Home;
