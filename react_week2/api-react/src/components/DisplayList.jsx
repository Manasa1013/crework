import "../index.css";
import uuid from "react-uuid";
export function DisplayList({ pictures }) {
  return (
    <>
      <div className="grid-container" style={{ marginBottom: "3rem" }}>
        {pictures !== undefined &&
          pictures.map((picture) => {
            return (
              <div key={`${picture.url} ${uuid()} `}>
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
