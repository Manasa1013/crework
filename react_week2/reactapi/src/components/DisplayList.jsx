import "../index.css";
export function DisplayList({ pictures }) {
  return (
    <>
      <div className="grid-container">
        {pictures.length > 0 &&
          pictures.map((picture) => {
            return (
              <div key={picture.url}>
                <img
                  className="responsive-img"
                  src={picture.url}
                  alt="Artist singing"
                  width={250}
                  height={250}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
