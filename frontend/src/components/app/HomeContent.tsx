import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";

function HomeContent() {
  const userContext = useContext(UserContext) as UserContextType;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "var(--secondary-color)",
        fontSize: "xx-large",
        textAlign: "center",
      }}
    >
      {userContext.lists.length == 0 ? (
        <>
          Nemate niti jedan popis obaveza. Kreirajte Vaš prvi popis obaveza
          koristeći opciju na izborniku.
        </>
      ) : (
        <>
          Vašim popisima obaveza možete pristupiti preko izbornika.<br></br>
        </>
      )}
    </div>
  );
}

export default HomeContent;
