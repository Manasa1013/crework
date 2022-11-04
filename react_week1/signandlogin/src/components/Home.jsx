import ".././index.css";

export function Home({ info, fields }) {
  return (
    <>
      <h3>You are successfully {`${info}! ${fields[0].userName}`}</h3>
    </>
  );
}
