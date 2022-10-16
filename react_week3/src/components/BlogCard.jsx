export const BlogCard = ({ blogger, imgSrc, title, id, altText }) => {
  return (
    <>
      <div className="">
        <div key={id}>
          <img className="blog--img" src={imgSrc} alt={altText}>
        </div>
      </div>
    </>
  );
};
