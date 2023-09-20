import Header from "./components/Header.js";
import TableUsers from "./components/TableUsers.js";
import Container from 'react-bootstrap/Container';
function App() {

  return (
    <>
      <Header />
      <Container >
        <div className="d-flex justify-content-between mb-3">
          <span className="mb-2"> List Users</span>
          <button className="btn btn-primary">Add User</button>
        </div>
        <TableUsers />
      </Container>
    </>
  );

}

export default App;
