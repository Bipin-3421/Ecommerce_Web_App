import Slider from "react-slick";
import bannerImgOne from "../assets/banner/bannerImgOne.jpg";
import bannerImgTwo from "../assets/banner/bannerImgTwo.jpg";
import bannerImgThree from "../assets/banner/bannerImgThree.jpg";
import bannerImgFour from "../assets/banner/bannerImgFour.jpg";
import bannerImgFive from "../assets/banner/bannerImgFive.jpg";
const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "45%",
          transform: "translate(-50% -50%)",
          width: "210px",
        }}
      >
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          background: "#131921",
          padding: "8px 0",
          cursor: "pointer",
          border: "1px solid #f3a847",
        }}
      >
        {i + 1}
      </div>
    ),
  };
  return (
    <div className="w-full">
      <div className="w-full h-full relative">
        <Slider {...settings}>
          <div>
            <img src={bannerImgOne} alt="bannerImgTwo" />
          </div>
          <div>
            <img src={bannerImgTwo} alt="bannerImgTwo" />
          </div>
          <div>
            <img src={bannerImgThree} alt="bannerImgThree" />
          </div>
          <div>
            <img src={bannerImgFour} alt="bannerImgFour" />
          </div>
          <div>
            <img src={bannerImgFive} alt="bannerImgFive" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Home;
