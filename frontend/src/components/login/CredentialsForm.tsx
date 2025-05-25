import { FaKey, FaRegUserCircle } from "react-icons/fa";
import IconText from "../other/IconText";

function CredentialsForm(props: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <div>
        <label className="login-label" htmlFor="username">
          <IconText
            icon={<FaRegUserCircle></FaRegUserCircle>}
            iconStyle={{ size: "1.25rem" }}
          >
            Korisničko ime
          </IconText>
        </label>
        <input
          id="username"
          type="text"
          value={props.username}
          onChange={(e) => {
            props.setUsername(e.target.value);
          }}
          maxLength={20}
        ></input>
      </div>
      <div>
        <label htmlFor="password">
          <IconText icon={<FaKey />} iconStyle={{ size: "1.25rem" }}>
            Lozinka
          </IconText>
        </label>
        <input
          id="password"
          type="text"
          value={props.password}
          maxLength={40}
          onChange={(e) => {
            props.setPassword(e.target.value);
          }}
        ></input>
      </div>
    </>
  );
}

export default CredentialsForm;
