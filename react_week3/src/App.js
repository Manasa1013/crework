import { useState } from "react";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { imageSources } from "./utils/data";
export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [shopCategory, setShopCategory] = useState("Uncategorized");
  function increaseSlideIndex() {
    setSlideIndex((indexValue) => {
      if (indexValue === imageSources.length - 1) {
        indexValue = 0;
      } else indexValue++;
      return indexValue;
    });
  }
  function handleChangeCategory() {}
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              slideIndex={slideIndex}
              setSlideIndex={setSlideIndex}
              increaseSlideIndex={() => increaseSlideIndex()}
              shopCategory={shopCategory}
              setShopCategory={setShopCategory}
              handleChangeCategory={() => handleChangeCategory()}
            />
          }
        ></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
}
