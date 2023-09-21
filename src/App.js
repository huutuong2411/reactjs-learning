import Header from "./components/Header.js";
import TableUsers from "./components/TableUsers.js";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <Container>
        <TableUsers />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
