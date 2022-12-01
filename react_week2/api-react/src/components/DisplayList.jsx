import "../index.css";
export function DisplayList({ pictures }) {
  console.log(pictures, "at display list");
  return (
    <>
      <div className="grid-container" style={{ marginBottom: "3rem" }}>
        {pictures !== undefined &&
          pictures.map((picture) => {
            return (
              <div key={picture.url}>
                <img
                  className="responsive-img"
                  src={picture.url}
                  alt="Cover pic"
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
