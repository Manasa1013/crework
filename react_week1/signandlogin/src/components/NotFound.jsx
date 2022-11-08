export function NotFound() {
  return (
    <>
      <section>
        <h3
          style={{
            color: "var(--secondary-green)",
            margin: "2rem",
            padding: "1rem",
          }}
        >
          {`Welcome User! `}
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
      </section>
    </>
  );
}
