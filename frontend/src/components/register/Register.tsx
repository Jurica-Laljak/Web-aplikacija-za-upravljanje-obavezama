import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Button from "../other/Button";
import IconText from "../other/IconText";
import { FaRegUserCircle } from "react-icons/fa";
import CredentialsForm from "../login/CredentialsForm";
import { call } from "../../api/call";
import { UserContextType } from "../../types/user/UserContext";
import { UserDataCore } from "../../../../shared/auth/UserDataCore";
import { UserDataDto } from "../../../../shared/auth/UserData.dto";

function Register() {
  const userContext = useContext(UserContext) as UserContextType;
  const [sendReq, setSendReq] = useState<boolean>(false);

  useEffect(() => {
    if (sendReq) {
      call<UserDataCore, UserDataDto>("/auth/register", "post", {
        username: userContext.username,
        password: userContext.password,
      }).then((data) => {
        userContext.setAccessToken(data.accesstoken);
        userContext.setRefreshToken(data.refreshtoken);
        userContext.setToDoListIds(JSON.stringify(data.todoids));
      });
      setSendReq(false);
    }
  }, [sendReq]);

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
          username={userContext.username}
          setUsername={userContext.setUsername}
          password={userContext.password}
          setPassword={userContext.setPassword}
        ></CredentialsForm>
        <Button
          style={{ width: "fit-content", padding: "0.5rem" }}
          onClick={() => setSendReq(true)}
        >
          <span>Registriraj me</span>
        </Button>
      </div>
    </div>
  );
}

export default Register;
