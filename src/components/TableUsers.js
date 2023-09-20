import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [total_pages, setTotalPages] = useState(0);

    useEffect(() => {
        // call API
        getUsers(1)
    }, [])

    const getUsers = (page) => {
        fetchAllUser(page).then((response) => {
            if (response && response.data && response.data.data) {
                setListUsers(response.data.data);
                setTotalPages(response.data.total_pages);
            }
        });
    }

    const handlePageClick = (event) => {
        getUsers(event.selected + 1)
    }


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index, listUsers) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
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
}

export default TableUsers;