import { BlogCard } from "../components/BlogCard";
import { blogSources } from "../utils/data";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
export const Blogs = ({ shopCategory, handleChangeCategory }) => {
  return (
    <>
      <Navbar
        shopCategory={shopCategory}
        handleChangeCategory={handleChangeCategory}
      />
      <main>
        <div className="grid-container">
          {blogSources.map((blogSource) => {
            return (
              <BlogCard
                blogger={blogSource.blogger}
                title={blogSource.title}
                imgSrc={blogSource.imgSrc}
                id={blogSource.id}
                altText={blogSource.altText}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
};
