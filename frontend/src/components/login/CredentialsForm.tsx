import {
  FaKey,
  FaRegUserCircle,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import IconText from "../element/IconText";
import { useState } from "react";

function CredentialsForm(props: {
  username: string;
  setUsername: any;
  password: string;
  setPassword: any;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
        <span className="password-wrapper">
          <IconText
            style={{ visibility: "hidden" }}
            icon={<FaRegEyeSlash />}
            iconStyle={{ size: "1.5rem" }}
          ></IconText>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={props.password}
            maxLength={40}
            onChange={(e) => {
              props.setPassword(e.target.value);
            }}
          ></input>
          {showPassword ? (
            <IconText
              style={{ cursor: "pointer" }}
              icon={<FaRegEyeSlash />}
              iconStyle={{ size: "1.5rem" }}
              onClick={() => setShowPassword(false)}
            ></IconText>
          ) : (
            <IconText
              style={{ cursor: "pointer" }}
              icon={<FaRegEye />}
              iconStyle={{ size: "1.5rem" }}
              onClick={() => setShowPassword(true)}
            ></IconText>
          )}
        </span>
      </div>
    </>
  );
}

export default CredentialsForm;
