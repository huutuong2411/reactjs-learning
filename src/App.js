import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import TableUsers from "./components/TableUsers.js";
import Players from "./components/Players.js";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" />
          <Route path="/users" element={<TableUsers />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
