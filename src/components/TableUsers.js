import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser.js";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import "./Table.css";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [listUsers2, setListUsers2] = useState([]);
  const [total_pages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [DataModal, setDataModal] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleClose = () => {
    setShow(false);
    setShowModalEdit(false);
    setShowModalDelete(false);
  };
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowModalEdit(true);
  const handleShowDelete = () => setShowModalDelete(true);

  useEffect(() => {
    // call API
    getUsers(1);
  }, []);

  useEffect(() => {
    const cloneListUsers = _.orderBy(listUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  }, [sortBy]);

  function getUsers(page) {
    fetchAllUser(page).then((response) => {
      if (response && response.data && response.data.data) {
        setListUsers(response.data.data);
        setListUsers2(response.data.data);
        setTotalPages(response.data.total_pages);
      }
    });
  }
  const handlePageClick = (event) => {
    getUsers(event.selected + 1);
  };

  const handleEditTable = (user) => {
    setDataModal(user);
    handleShowEdit();
  };

  const handleDeleteTable = (user) => {
    setDataModal(user);
    handleShowDelete();
  };
  //ham nay de render lai du lieu co record vua them
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleTableAfterEdit = (user) => {
    const thisUser = listUsers.find((obj) => {
      return obj.id === user.id;
    });
    thisUser.first_name = user.first_name;
    thisUser.last_name = user.last_name;
    setDataModal({});
  };

  const handleTableAfterDelete = (id) => {
    const cloneListUsers = listUsers.filter((obj) => obj.id !== id);
    setListUsers(cloneListUsers);
  };

  const handleSearch = debounce((event) => {
    let keyword = event.target.value;
    if (keyword) {
      const resultUsers = listUsers2.filter((item) =>
        item.email.includes(keyword)
      );
      setListUsers(resultUsers);
    } else {
      setListUsers(listUsers2);
    }
  }, 700);
  const headers = [
    { label: "email", key: "email" },
    { label: "first name", key: "first_name" },
    { label: "last name", key: "last_name" },
  ];
  return (
    <>
      <ModalAddNewUser
        show={show}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={showModalEdit}
        handleClose={handleClose}
        DataModal={DataModal}
        handleTableAfterEdit={handleTableAfterEdit}
      />

      <ModalDeleteUser
        show={showModalDelete}
        handleClose={handleClose}
        DataModal={DataModal}
        handleTableAfterDelete={handleTableAfterDelete}
      />
      <div className="d-flex justify-content-between mb-2">
        <h2 className="mb-2"> List Users:</h2>
        <div>
          <CSVLink
            data={listUsers}
            headers={headers}
            asyncOnClick={true}
            className="btn btn-warning mx-2"
          >
            Export
          </CSVLink>
          <button onClick={handleShow} className="btn btn-primary">
            Add User
          </button>
        </div>
      </div>
      <div className="col-3 mb-2">
        <input
          className="form-control"
          type="text"
          placeholder="Search user by Email"
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <div className="scrollbar scrollbar-secondary ">
        <Table striped bordered hover className="force-overflow">
          <thead>
            <tr className="text-center">
              <th>
                ID
                <span
                  className="sort-header"
                  onClick={() => {
                    setSortBy(sortBy === "asc" ? "desc" : "asc");
                    setSortField("id");
                  }}
                >
                  <i className="fa-solid fa-arrow-up-long text-success"></i>
                  <i className="fa-solid fa-arrow-down-long text-success"></i>
                </span>
              </th>
              <th>Image</th>
              <th>Email</th>
              <th>
                <span>First Name</span>
                <span
                  className="sort-header"
                  onClick={() => {
                    setSortBy(sortBy === "asc" ? "desc" : "asc");
                    setSortField("first_name");
                  }}
                >
                  <i className="fa-solid fa-arrow-up-long text-success"></i>
                  <i className="fa-solid fa-arrow-down-long text-success"></i>
                </span>
              </th>
              <th>
                Last Name
                <span
                  className="sort-header"
                  onClick={() => {
                    setSortBy(sortBy === "asc" ? "desc" : "asc");
                    setSortField("last_name");
                  }}
                >
                  <i className="fa-solid fa-arrow-up-long text-success"></i>
                  <i className="fa-solid fa-arrow-down-long text-success"></i>
                </span>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((item, index, listUsers) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={item.avatar}
                        alt={`Avatar of ${item.first_name}`}
                      />
                    </td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <button
                        className="mx-3 btn btn-warning"
                        onClick={() => handleEditTable(item)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTable(item)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={total_pages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="pagea-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default TableUsers;
