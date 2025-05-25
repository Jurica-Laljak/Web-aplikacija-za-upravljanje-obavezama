import ButtonLink from "../other/ButtonLink";

function NotFoundPage() {
  return (
    <>
      <div className="page-wrapper">
        <h1>Stranica nije pronađena.</h1>
        <ButtonLink to={"/"}>Početna stranica</ButtonLink>
      </div>
    </>
  );
}

export default NotFoundPage;
