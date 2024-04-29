import React, { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
const Carousel = ({ imageUrls }) => {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === imageUrls.length - 1) return 0;

      return index + 1;
    });
  }

  function showPreviousImage() {
    setImageIndex((index) => {
      if (index === 0) return imageUrls.length - 1;
      return index - 1;
    });
  }
  return (
    <div className=" w-full h-full relative ">
      <div className="w-full h-full flex overflow-hidden">
        {imageUrls.map((url) => (
          <img
            key={url}
            style={{ translate: `${-100 * imageIndex}%` }}
            src={url}
            className={`img-slider-img `}
          />
        ))}
      </div>
      <button
        onClick={showPreviousImage}
        className="img-slider-button"
        style={{ left: 0 }}
      >
        <ArrowBigLeft />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-button"
        style={{ right: 0 }}
      >
        <ArrowBigRight />
      </button>
      <div
        style={{ translate: "-50%", display: "flex", gap: ".25rem" }}
        className=" absolute bottom-[0.5rem] left-[50%] "
      >
        {imageUrls.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? <CircleDot /> : <Circle />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
