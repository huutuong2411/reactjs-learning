import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import TableUsers from "./components/TableUsers.js";
import Players from "./components/Players.js";
import Login from "./components/Login.js";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Home from "./components/Home.js";
function App() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  console.log("///đây là user: ", user);
  const isLoginPage = location.pathname === "/login";
  return (
    <>
      {!isLoginPage && <Header />}

      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<TableUsers />} />
          <Route path="/players" element={<Players />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
