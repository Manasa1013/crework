import ".././index.css";

export function Home({ fields }) {
  return (
    <>
      <h3
        style={{
          color: "var(--secondary-green)",
          margin: "2rem",
          padding: "1rem",
        }}
      >
        {`Welcome Home! ${fields[0].userName}`}
      </h3>
    </>
  );
}
