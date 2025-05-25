import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Button from "../other/Button";
import IconText from "../other/IconText";
import { FaRegUserCircle } from "react-icons/fa";
import CredentialsForm from "../login/CredentialsForm";

function Register() {
  const userContext = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleRegister() {
    alert(username);
  }

  return (
    <div className="page-wrapper" id="login-wrapper">
      <div className="login-header-wrapper">
        <IconText
          style={{ gap: "0.5em" }}
          icon={<FaRegUserCircle></FaRegUserCircle>}
          iconStyle={{ size: "2.5rem" }}
        >
          <h1>Registrirajte se</h1>
        </IconText>
        <span style={{ color: "black" }}>
          Unesite korisničko ime dugo barem 5 znakova i lozinku dugu barem 10
          znakova
        </span>
      </div>
      <div className="login-form-wrapper">
        <CredentialsForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        ></CredentialsForm>
        <Button
          style={{ width: "fit-content", padding: "0.5rem" }}
          onClick={() => handleRegister()}
        >
          <span>Registriraj me</span>
        </Button>
      </div>
    </div>
  );
}

export default Register;
