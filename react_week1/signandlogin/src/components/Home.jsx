import ".././index.css";
import { useParams } from "react-router";

export function Home({ fields }) {
  let { fieldItemID } = useParams();
  console.log(fieldItemID);
  console.log(fields, "at home 7line");
  let requiredField = fields.find((fieldItem) => {
    if (fieldItem.id === fieldItemID) {
      console.log("at Home", fieldItemID);
      return fieldItem;
    }
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
    </>
  );
}
