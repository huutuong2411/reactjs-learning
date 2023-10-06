import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Home() {
  const { user } = useContext(UserContext);
  return <>{user && user.email && <h1>Wellcome {user.email}</h1>}</>;
}

export default Home;
