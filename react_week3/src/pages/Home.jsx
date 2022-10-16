import "../styles.css";
import { imageSources } from "../utils/data";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";
import { Footer } from "../components/Footer";

export const Home = ({
  slideIndex,
  setSlideIndex,
  increaseSlideIndex,
  shopCategory,
  setShopCategory,
  handleChangeCategory
}) => {
  useEffect(() => {
    let slideTimerID = setInterval(() => increaseSlideIndex(), 5000);
    return () => {
      clearInterval(slideTimerID);
    };
  });
  return (
    <>
      <Navbar
        shopCategory={shopCategory}
        handleChangeCategory={() => handleChangeCategory()}
      />
      <main>
        <div className="grid-container">
          <div className="slider">
            <div className="slide">
              <img
                src={
                  imageSources !== undefined &&
                  (imageSources[slideIndex].src || imageSources[0].src)
                }
                alt="left-handed accessories"
              />
            </div>

            <button
              className="btn btn-next"
              onClick={() => increaseSlideIndex()}
            >
              &gt;
            </button>
            <button
              className="btn btn-prev"
              onClick={() => {
                setSlideIndex((indexValue) => {
                  if (indexValue === 0) {
                    indexValue = imageSources.length - 1;
                  } else indexValue--;
                  return indexValue;
                });
              }}
            >
              &lt;
            </button>
          </div>
        </div>
        {/* <img
          src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/3/31/a6a1bba2-d8af-4feb-881d-325bd8545c071617211308576-Dk-banner.jpg"
          alt="banner"
          className="responsive-img"
        /> */}
        <section>
          <h1 className="heading">AWESOME DEALS</h1>
          <div className="grid-container">
            <div className="image-wrapper">
              <img
                src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/26/6eb8383c-070c-4415-b4cd-8440586a6a311658825896308-Roadster-_Pepe_Jeans_-_More.jpg"
                alt="deals "
                className="responsive-img"
              />
            </div>
            <div className="image-wrapper">
              <img
                src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/26/77c719bf-4877-438a-9776-40490ced12551658825896144-Max_-amp-_Pantaloons.jpg"
                alt="deals "
                className="responsive-img"
              />
            </div>
            <div className="image-wrapper">
              <img
                src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/26/ee2f5484-f2fe-44a2-9c7b-cc0e0dd246551658825895828-Dressberry-_Sassafras_and_More.jpg"
                alt="deals "
                className="responsive-img"
              />
            </div>
          </div>
          <h2 className="heading">BUDGET BUYS</h2>
          <div className="grid-container">
            <div className="image-wrapper">
              <img
                src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/26/680005ef-9ded-4c0e-bdc5-a9f6c3286fe01658829666609-Sweaters_Sweatshirts_Budgetbuys.jpg"
                alt="budget buys"
                className="responsive-img"
              />
            </div>
            <div className="image-wrapper">
              <img
                src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/26/3e1ec491-3a91-4503-8c69-bd4e3cd908bd1658829494246-Footwear_Budgetbuys.jpg"
                alt="budget buys"
                className="responsive-img"
              />
            </div>
            <div className="image-wrapper">
              <img
                src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/26/05179e2b-35de-4fa4-9546-d18d692efcb01658829494273-SportsShoes_Budgetbuys.jpg"
                alt="budget buys"
                className="responsive-img"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
