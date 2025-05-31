import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import "../../styles/login/login.css";
import Button from "../element/Button";
import ButtonLink from "../element/ButtonLink";
import CredentialsForm from "./CredentialsForm";
import { CiLogin } from "react-icons/ci";
import IconText from "../element/IconText";

function Login() {
  const userContext = useContext(UserContext) as UserContextType;

  return (
    <div className="page-wrapper" id="login-wrapper">
      <div className="login-header-wrapper">
        <IconText icon={<CiLogin />} iconStyle={{ size: "3rem" }}>
          <h1>Prijavite se</h1>
        </IconText>
        <span className="login-description">
          Potrebno je unijeti vaše <b>korisničko ime</b> i <b>lozinku</b> kako
          biste pristupili resursu.
        </span>
      </div>
      <div className="login-form-wrapper">
        <CredentialsForm
          username={userContext.username}
          setUsername={userContext.setUsername}
          password={userContext.password}
          setPassword={userContext.setPassword}
        ></CredentialsForm>
        <Button style={{ width: "fit-content", padding: "0.5rem" }}>
          <span>Prijavi me</span>
        </Button>
      </div>
      <div className="register-wrapper">
        <h2>Niste registrirani?</h2>
        <ButtonLink to="/register">Registriraj me</ButtonLink>
      </div>
    </div>
  );
}

export default Login;
