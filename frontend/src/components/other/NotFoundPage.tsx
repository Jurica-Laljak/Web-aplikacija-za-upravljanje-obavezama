import { Link } from "react-router";
import "../../styles/other/notfoundpage.css";

function NotFoundPage() {
  return (
    <>
      <div>
        <h1>404 Page not found.</h1>
        <Link className="link" to={"/"}>
          Go Home
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;
