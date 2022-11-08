import ".././index.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export function Home({ reDirectToPage, fields }) {
  let { fieldItemID } = useParams();
  console.log(fieldItemID);
  // console.log(fields, "at home 7line");
  let requiredField = fields.find((fieldItem) => {
    if (fieldItem.id === fieldItemID) {
      console.log("at Home", fieldItemID);
      return fieldItem;
    }
    return {};
  });

  return (
    <>
      <h3
        style={{
          color: "var(--secondary-green)",
          margin: "2rem",
          padding: "1rem",
        }}
      >
        {`Welcome Home! `}
        {`${requiredField.userName}`}
      </h3>
      <div
        style={{
          margin: "1rem",
          padding: "1rem",
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          className="link--primary"
          onClick={() => {
            reDirectToPage();
          }}
          to={`/login`}
        >
          Visit login page
        </Link>
        <Link
          className="link--primary"
          onClick={() => {
            reDirectToPage();
          }}
          to={`/signup`}
        >
          Visit signup page
        </Link>
      </div>
    </>
  );
}
